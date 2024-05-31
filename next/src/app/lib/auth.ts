import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function signIn(formData: FormData) {
  // #1 Récup les champs
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  // #2 Vérifier si tous les champs sont fournis
  if (!email || !password) {
    return {
      success: false,
      message: "Identifiant(s) manquant(s).",
    };
  }

  // #3 Vérifier si le format des données est ok
  validateCredentialsFormat(email, password);

  // #4 Vérifier si un utilisateur correspond à ces identifiants
  const credentialsMatch = await verifyUserCredentials(email, password);

  if (!credentialsMatch.success) {
    return {
      success: false,
      message: credentialsMatch.message,
    };
  }
  return { success: true, message: "Connexion réussie" };
}

export async function registerAccount(formData: FormData) {
  // #1 Récup les champs
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  // #2 Vérifier si tous les champs sont fournis
  if (!email || !password) {
    return {
      success: false,
      message: "Identifiant(s) manquant(s).",
    };
  }

  // #3 Vérifier si le format des données est ok
  validateCredentialsFormat(email, password);

  // vérifier si un compte existe déjà cette adresse
  const response = await checkExistingEmail(email);

  if (!response.success) {
    return {
      success: false,
      message: response.message,
    };
  }

  // créer le compte
  const creationResponse = await createAccount(email, password);

  if (!creationResponse.success) {
    return {
      success: false,
      message:
        creationResponse.code === 400
          ? "Champs envoyés non valides"
          : "Impossible de traier les données envoyées",
    };
  }

  return {
    success: true,
    message: "Inscription réussie",
  };
}

export async function updateUserInfos(formData: FormData) {
  // #1 Récupérer les champs
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const first_name = formData.get("first_name")?.toString();
  const last_name = formData.get("last_name")?.toString();
  const sexe = formData.get("sexe")?.toString();
  const address = formData.get("address")?.toString();
  const additional_address = formData.get("additional_address")?.toString();
  const common = formData.get("common")?.toString();
  const city = formData.get("city")?.toString();
  const postal_code = formData.get("postal_code")?.toString();
  const phone_number = formData.get("phone_number")?.toString();
  // #2 Vérifier que toutes les infos sont présentes
  // #3 Vérifier que toutes les infos ont le format correct
  // #4 Vérifier si l'email n'est pas déjà utilisé par un autre utilisateur
  // #5 Mettre à jour les informations

  return { success: true, message: "Informations mises à jour" };
}

async function checkExistingEmail(email: string) {
  const response = await fetch("http://localhost:8000/email_check", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  return { success: data.success, message: data.message };
}

async function createAccount(email: string, password: string) {
  const response = await fetch("http://localhost:8000/api/users", {
    headers: {
      "Content-Type": "application/ld+json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      created_at: new Date(),
    }),
  });

  const data = await response.json();

  if (response.status !== 201) {
    return {
      success: false,
      code: response.status === 400 ? "invalid input" : "unprocessable entity",
    };
  }

  return { success: true, code: response.status };
}

async function verifyUserCredentials(email: string, password: string) {
  const response = await fetch(`http://localhost:8000/api/login_check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ username: email, password }),
  });
  if (response.ok) {
    const data: { token: string; refresh_token: string } =
      await response.json();
    //stocker les tokens dans les cookies
    const cookieStore = cookies();
    cookieStore.set("token", data.token, { httpOnly: true });
    cookieStore.set("refresh_token", data.refresh_token, { httpOnly: true });
    return { success: true };
  } else {
    const data = await response.json();
    if (data.code === 401) {
      return { success: false, message: "Identifiants incorrects." };
    } else if (data.code === 400) {
      return { sucess: false, message: "Identifiants manquants." };
    } else if (data.code === 500) {
      return {
        sucess: false,
        message:
          "Une erreur interne est survenue empêchant votre connexion. Veuillez réessayer.",
      };
    } else {
      return { success: false, message: "Identifiants incorrects." };
    }
  }
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

function validateCredentialsFormat(email: string, password: string) {
  const isEmailValid = isValidEmailFormat(email);
  if (!isEmailValid) {
    return { success: false, message: "Format de l'email incorrect." };
  }

  const isPasswordValid = isValidPasswordFormat(password);
  if (!isPasswordValid) {
    return { success: false, message: "Mot de passe trop long." };
  }
}

function isValidEmailFormat(email: string) {
  if (email.length > 180) {
    return false;
  }
  // https://ui.dev/validate-email-address-javascript
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPasswordFormat(password: string) {
  if (password.length > 255) {
    return false;
  }
}
