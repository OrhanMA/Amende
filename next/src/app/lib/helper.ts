import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export function isValidEmailFormat(email: string) {
  if (email.length > 180) {
    return false;
  }
  // https://ui.dev/validate-email-address-javascript
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPasswordFormat(password: string) {
  if (password.length > 255) {
    return false;
  }
}

export function validateCredentialsFormat(email: string, password: string) {
  const isEmailValid = isValidEmailFormat(email);
  if (!isEmailValid) {
    return { success: false, message: "Format de l'email incorrect." };
  }

  const isPasswordValid = isValidPasswordFormat(password);
  if (!isPasswordValid) {
    return { success: false, message: "Mot de passe trop long." };
  }
}

export function checkCodeFormat(code: string) {
  // implémenter le code de vérification ici

  return true;
}

export async function verifyCode(formData: FormData) {
  const code = formData.get("code")?.toString();
  if (code === "" || code === undefined) {
    return {
      success: false,
      message: "Veuillez fournir un code pour accéder à la page de paiement",
    };
  }

  const formatValid = checkCodeFormat(code);

  const codeExists = await checkExistingCode(code);

  if (!codeExists) {
    return {
      succes: false,
      message:
        "Le code d'amende n'existe pas ou le token d'authentification n'a pas pu être récupéré.",
    };
  }

  return {
    success: true,
    message: "Code valide",
  };
}

async function checkExistingCode(code: string) {
  const token = cookies().get("token")?.value;
  if (!token) {
    return false;
  }

  const fine = await getFine(code);

  if (!fine) {
    return false;
  }
  return true;
}

export async function getFine(code: string) {
  const token = cookies().get("token")?.value;
  if (!token) {
    return null;
  }
  const response = await fetch(`http://localhost:8000/api/fines?code=${code}`, {
    headers: {
      "Content-Type": "application/ld+json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data["hydra:member"][0];
}

export function isTokenExpired(token: string) {
  const decoded = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  const tokenExpiration = decoded.exp;
  if (tokenExpiration && tokenExpiration < currentTime) {
    return true;
  }
  return false;
}
