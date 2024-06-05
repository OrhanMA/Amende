"use client";
import { getFine } from "@/app/lib/auth";
import { TextInput } from "@dataesr/react-dsfr";
import { useEffect, useState } from "react";

export default function Regularisation({ params }: { params: { id: string } }) {
  const [fine, setFine] = useState(null);
  const code = params.id;

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `http://localhost:8000/api/fines?code=${code}`,
        { mode: "no-cors" }
      );
      const data = await response.json();
      setFine(data);
    }
    getData();
  }, [code]);

  console.log(fine);
  return (
    <main>
      <h1>Régularisation amende {code}</h1>
      <p>
        Veuillez remplir le formulaire avec vos informations de paiements pour
        payer votre amende.
      </p>
      <form
        action=""
        className="max-w-[800px] bg-sand-50 p-6 sm:p-8 md:p-12 lg:px-24"
      >
        <TextInput
          type="text"
          label="Numéro de carte"
          hint={"format classique à 16 chiffres"}
          name="card_number"
          onBlur={function noRefCheck() {}}
          placeholder="1111 1111 1111 1111"
          required
        />
        <TextInput
          type="text"
          label="Date d'expiration"
          hint={"format: MM/AAAA"}
          name="expiration"
          onBlur={function noRefCheck() {}}
          placeholder="ex: 10/2025"
          required
        />
        <TextInput
          type="text"
          label="Cryptogramme"
          hint={"Le nombre à 3 chiffres derrière votre carte"}
          name="cryptogram"
          onBlur={function noRefCheck() {}}
          placeholder="ex: 833"
          required
        />
      </form>
    </main>
  );
}
