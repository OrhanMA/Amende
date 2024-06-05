"use client";

import { useRouter } from "next/navigation";
import { register } from "../lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import Notice from "@/components/Notice";
import {
  Form,
  FormGroup,
  FormHint,
  FormInput,
  FormLabel,
} from "@/components/Form";
import Button from "@/components/Buttons/Button";
import Link from "next/link";

export default function Register() {
  const [message, dispatch] = useFormState(register, undefined);
  const router = useRouter();

  console.log(message);
  if (message === "Inscription réussie") {
    router.push("/login");
  }

  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <div className="py-6 sm:py-8 md:py-12 flex flex-col items-center gap-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        Création de compte sur Payer vos amendes!
      </h1>
      <p className="max-w-[600px]">
        La création d&apos;un compte est nécessaire pour pouvoir payer votre
        amende.
      </p>
      {message && (
        <Notice
          text={
            message == "Inscription réussie"
              ? "Vous allez être redirigé vers la page de connexion."
              : message
          }
          title={
            message == "Inscription réussie"
              ? "Inscription réussie"
              : "Une erreur est survenue"
          }
          variant={message == "Inscription réussie" ? "success" : "danger"}
        />
      )}

      <div className="w-full max-w-[800px] bg-sand-50 p-6 sm:p-8 md:p-12 lg:px-24">
        <Form action={dispatch}>
          <FormGroup>
            <FormLabel htmlFor="email" text="Email" />
            <FormHint text="format attendu: nom@domaine.fr" />
            <FormInput
              type="email"
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
            ariaDisabled={pending}
            disabled={pending}
            onClick={handleClick}
            text={pending ? "Inscription en cours..." : "Inscription"}
          ></Button>
        </Form>
        <div className="flex flex-col items-center gap-4">
          <p>Vous avez déjà un compte?</p>
          <Link href="/login">
            <Button variant="secondary" text="Me connecter" />
          </Link>
        </div>
      </div>
    </div>
  );
}
