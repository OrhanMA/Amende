"use server";

import { redirect } from "next/navigation";
import {
  signIn,
  registerAccount,
  updateUserInfos,
  verifyCode,
  processPayment,
} from "./auth";

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

export async function checkFine(_currentState: unknown, formData: FormData) {
  try {
    const result = await verifyCode(formData);
    return result.message;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function submitPayment(
  _currentState: unknown,
  formData: FormData
) {
  try {
    const result = await processPayment(formData);
    return result.message;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function register(_currentState: unknown, formData: FormData) {
  try {
    const result = await registerAccount(formData);
    return result.message;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function update(_currentState: unknown, formData: FormData) {
  try {
    const result = await updateUserInfos(formData);
    return result.message;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
