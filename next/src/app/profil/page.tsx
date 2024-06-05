"use client";

import {
  Form,
  FormGroup,
  FormHint,
  FormInput,
  FormLabel,
} from "@/components/Form";
import { update } from "../lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/Buttons/Button";
import Notice from "@/components/Notice";

export default function Profil() {
  const [message, dispatch] = useFormState(update, undefined);

  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <div className="py-6 sm:py-8 md:py-12 flex flex-col items-center gap-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        Profil
      </h1>

      {message && (
        <Notice
          text={
            message == "Informations mises à jour"
              ? "Vous allez être redirigé vers la page de connexion."
              : message
          }
          title={
            message == "Informations mises à jour"
              ? "Informations mises à jour"
              : "Une erreur est survenue"
          }
          variant={
            message == "Informations mises à jour" ? "success" : "danger"
          }
        />
      )}
      <Notice
        variant={"info"}
        title="Important"
        text="Pour des raisons légales, votre adresse et mot de passe ne sont pas
          modifiables depuis votre espace."
      />

      <Form action={dispatch}>
        {/* <TextInput
          type="email"
          label="Email"
          hint={"format attendu: nom@domaine.fr"}
          name="email"
          onBlur={function noRefCheck() {}}
          placeholder="Email"
          required
          defaultValue={"test@test.com"}
        /> */}
        {/* <TextInput
          type="password"
          name="password"
          label="Mot de passe"
          onBlur={function noRefCheck() {}}
          placeholder="Mot de passe"
          required
          defaultValue={"test1234"}
        /> */}
        <FormGroup>
          <FormLabel htmlFor="first_name" text="Prénom" />
          <FormInput
            type="text"
            name="first_name"
            placeholder="Votre prénom"
            required
            defaultValue={"Orhan"}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="last_name" text="Nom de famille" />
          <FormInput
            type="text"
            name="last_name"
            placeholder="Votre nom de famille"
            required
            defaultValue={"Madi Assani"}
          />
        </FormGroup>
        {/* <RadioGroup
          isInline
          legend="Sexe"
          name="sexe"
          onChange={function noRefCheck() {}}
          required
        >
          <Radio label="Homme" value="0" defaultChecked />
          <Radio label="Femme" value="1" />
        </RadioGroup> */}
        <FormGroup>
          <FormLabel htmlFor="addresse" text="Adresse" />
          <FormInput
            type="text"
            name="address"
            placeholder="1 rue de chemin"
            required
            defaultValue={"18 Allée du Léman"}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel
            htmlFor="additional_address"
            text="Complément d'adresse"
            optional
          />
          <FormInput
            type="text"
            name="additional_address"
            placeholder="1er étage"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="common" text="Commune" optional />
          <FormInput type="text" name="common" />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="city" text="Ville" />
          <FormInput
            type="text"
            name="city"
            placeholder="Paris"
            required
            defaultValue={"Chambéry"}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="postal_code" text="Code postal" />
          <FormInput
            type="text"
            name="postal_code"
            placeholder="75000"
            required
            defaultValue={"74000"}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel
            htmlFor="phone_number"
            text="Numéro de téléphone"
            optional
          />
          <FormInput
            type="text"
            name="phone_number"
            placeholder="0612345678"
            defaultValue={"0612345678"}
          />
        </FormGroup>
        <Button
          type="submit"
          className="w-full"
          aria-disabled={pending}
          disabled={pending}
          onClick={handleClick}
          text={pending ? "Sauvegarde..." : "Sauvegarder"}
        />
      </Form>
    </div>
  );
}
