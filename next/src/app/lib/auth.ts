import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { validateCredentialsFormat } from "./helper";

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
  // const email = formData.get("email")?.toString();
  // const password = formData.get("password")?.toString();
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

  for (let data of formData.entries()) {
    if ((!data[0].startsWith("$") && data[1] === "") || data[1] === undefined) {
      if (
        data[0] !== "additional_address" &&
        data[0] !== "common" &&
        data[0] !== "phone_number"
      ) {
        return { success: false, message: `${data[0]} est vide` };
      }
    }
    // console.log(data);
  }
  // #3 Vérifier que toutes les infos ont le format correct
  // if (email) {
  //   const emailIsValid = isValidEmailFormat(email);
  //   if (!emailIsValid) {
  //     return {
  //       sucess: false,
  //       message: "Le format de l'email n'est pas correct",
  //     };
  //   }
  // }

  // if (password) {
  //   const passwordValid = isValidPasswordFormat(password);
  //   if (!passwordValid) {
  //     return {
  //       sucess: false,
  //       message: "Votre mot de passe est trop long",
  //     };
  //   }
  // }

  if (first_name && first_name.length > 255) {
    return {
      sucess: false,
      message: "Le champ prénom est trop long",
    };
  }
  if (last_name && last_name.length > 255) {
    return {
      sucess: false,
      message: "Le champ nom de famille est trop long",
    };
  }
  if (address && address.length > 255) {
    return {
      sucess: false,
      message: "Le champ adresse est trop long",
    };
  }
  if (
    additional_address &&
    additional_address !== "" &&
    additional_address.length > 255
  ) {
    return {
      sucess: false,
      message: "Le champ adresse complémentaire est trop long",
    };
  }
  if (common && common !== "" && common.length > 255) {
    return {
      sucess: false,
      message: "Le champ commune complémentaire est trop long",
    };
  }
  if (city && city.length > 255) {
    return {
      sucess: false,
      message: "Le champ ville complémentaire est trop long",
    };
  }

  if (postal_code && postal_code.length > 5) {
    return {
      sucess: false,
      message: "Le champ code postal ne peut dépasser 5 chiffres",
    };
  }

  if (phone_number && phone_number.length !== 10) {
    return {
      sucess: false,
      message: "Le champ téléphone doit composé d'un numéro à 10 chiffres",
    };
  }

  if (sexe) {
    if (sexe !== "0") {
      if (sexe !== "1") {
        return {
          success: false,
          message: "La valeur pour le champ sexe n'est pas correcte",
        };
      }
    }
  }
  // #3 Mettre à jour les informations
  const userID = getUserId();

  return { success: true, message: "Informations mises à jour" };
}

function getUserId(): string | undefined {
  return cookies().get("user_id")?.value;
  // const token = cookies().get("token")?.value;
  // if (token) {
  //   try {
  //     const response = await fetch("http://localhost:8000/me", {
  //       headers: {
  //         "Authorization": `Bearer ${token}`,
  //       },
  //     });
  //     const data = await response.json();
  //     console.log("getUserId: ", data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } else {
  //   return null;
  // }
}

async function updateUserProfile(
  first_name: string,
  last_name: string,
  sexe: string,
  address: string,
  additional_address: string,
  common: string,
  city: string,
  postal_code: string,
  phone_number: string,
  userId: string
) {
  const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
    headers: { "Content-Type": "application/merge-patch+json" },
    method: "PATCH",
    body: JSON.stringify({
      first_name,
      last_name,
      sexe,
      address,
      additional_address,
      common,
      city,
      postal_code,
      phone_number,
    }),
  });

  const data = await response.json();
  return { success: data.success, message: data.message };
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
    const data: { token: string; id: number; refresh_token: string } =
      await response.json();
    //stocker les tokens dans les cookies
    const cookieStore = cookies();
    cookieStore.set("token", data.token, { httpOnly: true });
    cookieStore.set("user_id", data.id.toString(), { httpOnly: true });
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

export async function verifyCode(formData: FormData) {
  const code = formData.get("code")?.toString();
  if (!code) {
    return {
      success: false,
      message: "Impossible de récupérer le code dans le formulaire",
    };
  }

  const response = await getFine(code);
  console.log(response);

  if (response.success === false) {
    return {
      success: false,
      message: response.message,
    };
  }
  const fineId: string = response.fine.id.toString();

  const paymentStatus = await verifyFinePaymentStatus(fineId);

  if ((paymentStatus.success = false)) {
    return { success: false, message: paymentStatus.message };
  }

  if (paymentStatus.exists === true) {
    return {
      success: false,
      message: "Un paiement existe déjà pour cette amende",
    };
  }
  return { success: true, message: `Code valide: ${code}` };
}

async function getFine(code: string) {
  const token = cookies().get("token")?.value;
  const response = await fetch(`http://localhost:8000/api/fine/check/${code}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

async function verifyFinePaymentStatus(fineId: string) {
  const token = cookies().get("token")?.value;
  const response = await fetch(
    `http://localhost:8000/api/fine/${fineId}/payment`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function processPayment(formData: FormData) {
  // Vérifier:

  // le format des données est valide avant soumission à l'API

  // l'amende existe pour le code soumis en hidden input

  // un paiement n'existe pas encore

  // prendre l'id du user dans cookies

  // envoyer la demande de paiement à l'API

  // gérer les cas de réponses

  return {
    success: true,
    message: "Paiement confirmé",
  };
}
