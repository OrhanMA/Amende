"use client";

import { useRouter } from "next/navigation";
import { authenticate } from "../lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Alert, Badge, Button, Link, TextInput } from "@dataesr/react-dsfr";

export default function Login() {
  const [message, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter();

  console.log(message);
  if (message === "Connexion réussie") {
    router.push("/profil");
  }

  return (
    <div className="py-6 sm:py-8 md:py-12 flex flex-col items-center">
      <h1>Connexion à Payez vos amendes!</h1>
      {message && (
        <Alert
          className="w-full max-w-[600px] mb-6 lg:mb-12"
          description={
            message == "Connexion réussie"
              ? "Vous allez être redirigé vers la page de connexion."
              : message
          }
          onClose={function noRefCheck() {}}
          title={
            message == "Connexion réussie"
              ? "Connexion réussie"
              : "Une erreur est survenue"
          }
          type={message == "Connexion réussie" ? "success" : "error"}
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
          <LoginButton />
        </div>
        <h4>Vous n&apos;avez pas de compte?</h4>
        <Button secondary={true}>
          <Link href="/register">Créer un compte</Link>
        </Button>
      </form>
    </div>
  );
}

function LoginButton() {
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
      {pending ? "Vérifications..." : "Se connecter"}
    </Button>
  );
}
