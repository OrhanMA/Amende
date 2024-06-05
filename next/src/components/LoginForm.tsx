"use client";
import { useRouter } from "next/navigation";
import { authenticate } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import Button from "./Buttons/Button";
import Link from "next/link";
import { Form, FormGroup, FormHint, FormInput, FormLabel } from "./Form";
import Notice from "./Notice";

export default function LoginForm() {
  const [message, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter();

  console.log(message);
  if (message === "Connexion réussie") {
    router.push("/profil");
  }

  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <div className="w-full max-w-[800px] bg-sand-50 p-6 sm:p-8 md:p-12 lg:px-24">
      {message && (
        <Notice
          text={
            message == "Connexion réussie"
              ? "Vous allez être redirigé vers la page de connexion."
              : message
          }
          title={
            message == "Connexion réussie"
              ? "Connexion réussie"
              : "Une erreur est survenue"
          }
          variant={message == "Connexion réussie" ? "success" : "danger"}
        />
      )}
      <Form action={dispatch}>
        <FormGroup>
          <FormLabel htmlFor="email" text="Email" />
          <FormHint text=" format attendu: nom@domaine.fr" />
          <FormInput
            type="text"
            name="email"
            placeholder="Email"
            required
            defaultValue={"test@test.com"}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="password" text="Mot de passe" />
          <FormInput
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            defaultValue={"test1234"}
          />
        </FormGroup>

        <Button
          type="submit"
          className="w-full"
          aria-disabled={pending}
          disabled={pending}
          onClick={handleClick}
        >
          {pending ? "Vérifications..." : "Se connecter"}
        </Button>
      </Form>
      <div className="flex flex-col items-center gap-4">
        <p>Vous n&apos;avez pas de compte?</p>
        <Link href="/register">
          <Button variant="secondary">Créer un compte</Button>
        </Link>
      </div>
    </div>
  );
}
