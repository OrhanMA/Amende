"use client";

import { useRouter } from "next/navigation";
import { authenticate } from "../lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function Page() {
  const [message, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter();

  console.log(message);
  if (message === "Connexion réussie") {
    router.push("/profil");
  }

  return (
    <form action={dispatch}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        defaultValue={"test@test.com"}
      />
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        required
        defaultValue={"test1234"}
      />
      <div>{message && <p>{message}</p>}</div>
      <LoginButton />
    </form>
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
    <button
      aria-disabled={pending}
      disabled={pending}
      type="submit"
      onClick={handleClick}
    >
      {pending ? "Vérifications..." : "Connexion"}
    </button>
  );
}
