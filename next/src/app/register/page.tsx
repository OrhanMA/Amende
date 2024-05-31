"use client";

import { useRouter } from "next/navigation";
import { register } from "../lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Alert, Button, Link, TextInput } from "@dataesr/react-dsfr";

export default function Register() {
  const [message, dispatch] = useFormState(register, undefined);
  const router = useRouter();

  console.log(message);
  if (message === "Inscription réussie") {
    router.push("/login");
  }

  return (
    <div className="py-6 sm:py-8 md:py-12 flex flex-col items-center">
      <h3>Création de compte sur Payer vos amendes!</h3>
      <p className="max-w-[600px]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae,
        voluptates. Possimus ratione nulla dolorum eveniet asperiores alias quam
        reiciendis deleniti.
      </p>
      {message && (
        <Alert
          className="w-full max-w-[600px] mb-6 lg:mb-12"
          description={
            message == "Inscription réussie"
              ? "Vous allez être redirigé vers la page de connexion."
              : message
          }
          onClose={function noRefCheck() {}}
          title={
            message == "Inscription réussie"
              ? "Inscription réussie"
              : "Une erreur est survenue"
          }
          type={message == "Inscription réussie" ? "success" : "error"}
        />
      )}

      <form
        action={dispatch}
        className="max-w-[800px] bg-sand-50 p-6 sm:p-8 md:p-12 lg:px-24"
      >
        <div className="pb-6 lg:pb-8 mb-6 border-b-2 border-sand-200">
          <TextInput
            type="email"
            label="Email"
            hint={"format attendu: nom@domaine.fr"}
            name="email"
            onBlur={function noRefCheck() {}}
            placeholder="Email"
            required
            defaultValue={"test@test.com"}
          />
          <TextInput
            type="password"
            name="password"
            label="Mot de passe"
            onBlur={function noRefCheck() {}}
            placeholder="Mot de passe"
            required
            defaultValue={"test1234"}
          />
          <RegisterButton />
        </div>
        <h5>Vous avez déjà un compte?</h5>
        <Button secondary={true}>
          <Link href="/login">Me connecter</Link>
        </Button>
      </form>
    </div>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <Button
      submit={true}
      className="w-full"
      aria-disabled={pending}
      disabled={pending}
      onClick={handleClick}
    >
      {pending ? "Inscription en cours..." : "Inscription"}
    </Button>
  );
}
