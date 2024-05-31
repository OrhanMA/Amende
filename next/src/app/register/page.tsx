"use client";

import { useRouter } from "next/navigation";
import { register } from "../lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function Register() {
  const [message, dispatch] = useFormState(register, undefined);
  const router = useRouter();

  console.log(message);
  if (message === "Inscription réussie") {
    router.push("/login");
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
      <RegisterButton />
    </form>
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
    <button
      aria-disabled={pending}
      disabled={pending}
      type="submit"
      onClick={handleClick}
    >
      {pending ? "Inscription en cours..." : "Inscription"}
    </button>
  );
}
