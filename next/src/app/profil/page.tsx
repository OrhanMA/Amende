"use client";

import { update } from "../lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import {
  Alert,
  Badge,
  Button,
  Link,
  Radio,
  RadioGroup,
  TextInput,
} from "@dataesr/react-dsfr";

export default function Profil() {
  const [message, dispatch] = useFormState(update, undefined);

  return (
    <div className="py-6 sm:py-8 md:py-12 flex flex-col items-center">
      <h1>Profil</h1>
      {message && (
        <Alert
          className="w-full max-w-[600px] mb-6 lg:mb-12"
          description={
            message == "Informations mises à jour"
              ? "Vous allez être redirigé vers la page de connexion."
              : message
          }
          onClose={function noRefCheck() {}}
          title={
            message == "Informations mises à jour"
              ? "Informations mises à jour"
              : "Une erreur est survenue"
          }
          type={message == "Informations mises à jour" ? "success" : "error"}
        />
      )}
      <h2>Mes informations:</h2>
      <form
        action={dispatch}
        className="w-full max-w-[800px] bg-sand-50 p-6 sm:p-8 md:p-12 lg:px-24"
      >
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
        <TextInput
          type="text"
          name="first_name"
          label="Prénom"
          onBlur={function noRefCheck() {}}
          placeholder="Votre prénom"
          required
        />
        <TextInput
          type="text"
          name="last_name"
          label="Nom de famille"
          onBlur={function noRefCheck() {}}
          placeholder="Votre nom de famille"
          required
        />
        <RadioGroup
          isInline
          legend="Sexe"
          name="sexe"
          onChange={function noRefCheck() {}}
          required
        >
          <Radio label="Homme" value="0" />
          <Radio label="Femme" value="1" />
        </RadioGroup>
        <TextInput
          type="text"
          name="address"
          label="Adresse"
          onBlur={function noRefCheck() {}}
          placeholder="1 rue de chemin"
          required
        />
        <TextInput
          type="text"
          name="addtional_address"
          label="Complément d'adresse"
          onBlur={function noRefCheck() {}}
          placeholder="1er étage"
        />
        <TextInput
          type="text"
          name="common"
          label="Commune"
          onBlur={function noRefCheck() {}}
        />
        <TextInput
          type="text"
          name="city"
          label="Ville"
          onBlur={function noRefCheck() {}}
          placeholder="Paris"
          required
        />
        <TextInput
          type="text"
          name="postal_code"
          label="Code postal"
          onBlur={function noRefCheck() {}}
          placeholder="75000"
          required
        />
        <TextInput
          type="text"
          name="phone_number"
          label="Numéro de téléphone"
          onBlur={function noRefCheck() {}}
          placeholder="0612345678"
        />
        <UpdateButton />
      </form>
    </div>
  );
}

function UpdateButton() {
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
      {pending ? "Sauvegarde..." : "Sauvegarder"}
    </Button>
  );
}
