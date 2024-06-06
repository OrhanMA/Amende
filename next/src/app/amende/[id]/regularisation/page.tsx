"use client";
import Button from "@/components/Buttons/Button";
import {
  Form,
  FormGroup,
  FormHint,
  FormInput,
  FormLabel,
} from "@/components/Form";
import { useRouter } from "next/navigation";
import { submitPayment } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Notice from "@/components/Notice";
import { Fine } from "@/types";

export default function Regularisation({ params }: { params: { id: string } }) {
  const code = params.id;
  const [fine, setFine] = useState<Fine | null>(null);
  const [message, dispatch] = useFormState(submitPayment, undefined);
  const { pending } = useFormStatus();
  const router = useRouter();

  useEffect(() => {
    async function getFineData() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/fine?code=${code}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFine(data.fine);
      } catch (error) {
        console.error("Error fetching fine data:", error);
      }
    }
    getFineData();
  }, [code]);

  console.log("FINE: ", fine);

  const paymentValid = message && message.startsWith("Paiement confirmé");

  if (message && typeof message === "string") {
    const code = message.slice(17, message.length);
    if (paymentValid) {
      router.push(`/amende/${code}/confirmation`);
    } else {
      router.push(`/amende/${code}/erreur`);
    }
  }

  return (
    <div className="py-6 sm:py-8 md:py-12 flex flex-col items-center gap-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        Régularisation amende {code}
      </h1>
      {fine && (
        <p className="font-bold text-xl sm::text-2xl md:text-3xl">
          Montant de l&apos;amende{" "}
          <span className="text-red-500">{fine.amount}€</span>
        </p>
      )}
      {message && (
        <Notice
          text={
            paymentValid
              ? "Vous allez être redirigé vers la page confirmation."
              : message
          }
          title={paymentValid ? "Paiement confirmé" : "Une erreur est survenue"}
          variant={paymentValid ? "success" : "danger"}
        />
      )}
      <p>
        Veuillez remplir le formulaire avec vos informations de paiements pour
        payer votre amende.
      </p>
      <Form action={dispatch}>
        <FormGroup>
          <FormLabel htmlFor="card_number" text="Numéro de carte" />
          <FormHint text="format classique à 16 chiffres" />
          <FormInput
            type="text"
            name="card_number"
            placeholder="1111 1111 1111 1111"
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="expiration" text="Date d'expiration" />
          <FormHint text="format: MM/AAAA" />
          <FormInput
            type="text"
            name="expiration"
            placeholder="10/2025"
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="cryptogram" text="Cryptogramme" />
          <FormHint text="Le nombre à 3 chiffres derrière votre carte" />
          <FormInput type="text" name="cryptogram" placeholder="833" required />
        </FormGroup>
        <Button
          text="Payer mon amende"
          type="submit"
          disabled={fine === null || pending}
        />
      </Form>
    </div>
  );
}
