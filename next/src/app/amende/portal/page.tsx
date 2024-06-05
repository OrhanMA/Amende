"use client";

import { useRouter } from "next/navigation";
import { checkFine } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Alert, Badge, Button, Link, TextInput } from "@dataesr/react-dsfr";
import { useState } from "react";
export default function AmendePortal() {
  const [code, setCode] = useState<string | null>(null);
  const [message, dispatch] = useFormState(checkFine, undefined);
  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  const router = useRouter();

  if (message === "Code valide") {
    router.push(`/amende/${code}/regularisation`);
  }

  return (
    <main>
      <h1>Amende portal</h1>
      {message && (
        <Alert
          className="w-full max-w-[600px] mb-6 lg:mb-12"
          description={
            message == "Code valide"
              ? "Vous allez être redirigé vers la page de paiement."
              : message
          }
          onClose={function noRefCheck() {}}
          title={
            message == "Code valide" ? "Code valide" : "Une erreur est survenue"
          }
          type={message == "Code valide" ? "success" : "error"}
        />
      )}
      <form
        action={dispatch}
        className="max-w-[800px] bg-sand-50 p-6 sm:p-8 md:p-12 lg:px-24"
      >
        <TextInput
          hint={"format: AB_2024_17_83"}
          type="text"
          name="code"
          label="Code de l'amende"
          onBlur={function noRefCheck() {}}
          onChange={(e) => setCode(e.target.value)}
          placeholder="ex: AB2024_01_99"
          required
          defaultValue={"AB2024_01_99"}
        />
        <Button
          submit={true}
          className="w-full"
          aria-disabled={pending}
          disabled={pending}
          onClick={handleClick}
        >
          {pending ? "Vérifications..." : "Payer mon amende"}
        </Button>
      </form>
    </main>
  );
}
