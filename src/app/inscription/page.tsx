"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { apiConfig } from "@/shared/config/api";

export default function InscriptionPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setMessage("");
    setLoading(true);
    const form = new FormData(formElement);
    const body = {
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      email: String(form.get("email")).trim().toLowerCase(),
      password: form.get("password"),
      dataUsageConsent: form.get("dataUsageConsent") === "on",
    };

    try {
      const response = await fetch(`${apiConfig.gateway}/api/users/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => null);
        let errorMessage = "";

        if (error && error.errors && error.errors.length > 0) {
          const firstError = error.errors[0];
          if (firstError.defaultMessage) {
            errorMessage = firstError.defaultMessage;
          } else if (firstError.message) {
            errorMessage = firstError.message;
          }
        }
        if (errorMessage === "" && error && error.detail) {
          errorMessage = error.detail;
        }
        if (errorMessage === "" && error && error.message) {
          errorMessage = error.message;
        }
        if (errorMessage === "") {
          if (response.status === 409) {
            errorMessage = "Cette adresse e-mail est déjà utilisée. Connecte-toi ou utilise une autre adresse.";
          } else if (response.status >= 500) {
            errorMessage = `Erreur au niveau des services serveur. `;
          } else {
            errorMessage = "L'inscription a échoué. Vérifie les informations.";
          }
        }

        throw new Error(errorMessage);
      }
      setMessage("Compte créé avec succès.");
      formElement.reset();
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  }

  let buttonText = "Créer mon compte";
  if (loading) {
    buttonText = "Création…";
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Créer un compte</h1>
      <form onSubmit={register} className="space-y-4">
        <label className="block">Prénom<input name="firstName" required className="mt-1 w-full rounded border p-2" /></label>
        <label className="block">Nom<input name="lastName" required className="mt-1 w-full rounded border p-2" /></label>
        <label className="block">Adresse e-mail<input name="email" type="email" required autoComplete="email" className="mt-1 w-full rounded border p-2" /></label>
        <label className="block">Mot de passe<input name="password" type="password" required minLength={12} pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{12,}" aria-describedby="password-help" autoComplete="new-password" className="mt-1 w-full rounded border p-2" /><span id="password-help" className="mt-1 block text-sm text-gray-600">Au moins 12 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial.</span></label>
        <label className="flex items-start gap-2">
          <input name="dataUsageConsent" type="checkbox" required className="mt-1" />
          <span>J’accepte l’utilisation de mes données personnelles pour créer et gérer mon compte. <Link className="underline" href="/politique-confidentialite" target="_blank" rel="noopener noreferrer">En savoir plus sur l’utilisation de mes données</Link>.</span>
        </label>
        <p className="text-sm text-gray-600">Vous pouvez aussi consulter les <Link className="underline" href="/confidentialite" target="_blank" rel="noopener noreferrer">conditions générales d’utilisation</Link>.</p>
        <button disabled={loading} className="rounded bg-black px-4 py-2 text-white disabled:opacity-50">
          {buttonText}
        </button>
        {message && <p role="status">{message}</p>}
      </form>
    </main>
  );
}
