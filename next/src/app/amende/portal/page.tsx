"use client";

import { useRouter } from "next/navigation";
import { checkFine } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

import { useState } from "react";
import Notice from "@/components/Notice";
import {
  Form,
  FormGroup,
  FormHint,
  FormInput,
  FormLabel,
} from "@/components/Form";
import Button from "@/components/Buttons/Button";
export default function AmendePortal() {
  const [message, dispatch] = useFormState(checkFine, undefined);
  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  const router = useRouter();

  const messageValid = message && message.startsWith("Code valide");

  if (message && typeof message === "string") {
    const code = message.slice(13, message.length);
    if (messageValid) {
      router.push(`/amende/${code}/regularisation`);
    }
  }

  return (
    <main>
      <h1>Amende portal</h1>
      {message && (
        <Notice
          text={
            messageValid
              ? "Vous allez être redirigé vers la page de paiement."
              : message
          }
          title={messageValid ? "Code valide" : "Une erreur est survenue"}
          variant={messageValid ? "success" : "danger"}
        />
      )}
      <Form action={dispatch}>
        <FormGroup>
          <FormLabel htmlFor="code" text="Code de l'amende" />
          <FormHint text="format: AB_2024_17_83" />
          <FormInput
            type="text"
            name="code"
            placeholder="ex: AB2024_01_99"
            defaultValue={"AB2024_01_99"}
            required
          />
        </FormGroup>
        <Button
          type="submit"
          className="w-full"
          aria-disabled={pending}
          disabled={pending}
          onClick={handleClick}
          text={pending ? "Vérifications..." : "Payer mon amende"}
        />
      </Form>
    </main>
  );
}
