"use server";

import { redirect } from "next/navigation";
import { signIn } from "../../auth";

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    const result = await signIn(formData);
    return result.message;
  } catch (error: any) {
    // if (error) {
    //   switch (error.type) {
    //     case "CredentialsSignin":
    //       return "Identifiants incorrects.";
    //     case "MissingCredentials":
    //       return "Identifiants manquants.";
    //     default:
    //       return "Un erreur interne est survenue.";
    //   }
    // }
    console.log(error);
    // Le return de la fonction sera le state envoyé à message dans le useFormState de la page login
    throw error;
  }
}
