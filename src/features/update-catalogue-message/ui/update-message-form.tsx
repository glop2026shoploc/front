"use client";

import { useRef } from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { updateCatalogueAction } from "../model/update-catalogue-action";

export function UpdateMessageForm() {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form
            ref={formRef}
            action={async (formData) => {
                await updateCatalogueAction(formData);
                formRef.current?.reset();
            }}
            className="flex gap-2"
        >
            <Input name="message" placeholder="Nouveau message..." aria-label="Nouveau message du service catalogue" />
            <Button type="submit">Envoyer</Button>
        </form>
    );
}