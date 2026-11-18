"use client";

import { useEffect, useId, useState } from "react";
import { searchAddresses, type AddressSuggestion } from "@/shared/api/geoplateforme";
import { Input } from "@/shared/ui/input";

/** Attente après la dernière frappe avant d'interroger l'API  */
const DEBOUNCE_MS = 300;
const MIN_LENGTH = 3;

interface AddressAutocompleteProps {
    id: string;
    /** Texte affiché dans le champ. */
    value: string;
    placeholder?: string;
    required?: boolean;
    onTextChange: (text: string) => void;
    /** L'utilisateur choisit une suggestion coordonnées connues. */
    onSelect: (suggestion: AddressSuggestion) => void;
}

/**
 * Champ adresse avec suggestions de la Géoplateforme (IGN).
 */
export function AddressAutocomplete({ id, value, placeholder, required, onTextChange, onSelect }: AddressAutocompleteProps) {
    const listId = useId();
    const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (query.trim().length < MIN_LENGTH) return;

        const controller = new AbortController();
        const timer = setTimeout(() => {
            searchAddresses(query, controller.signal)
                .then((results) => {
                    setSuggestions(results);
                    setActiveIndex(-1);
                    setIsOpen(true);
                })
                // API indisponible : on garde la saisie libre, sans suggestions.
                .catch(() => setSuggestions([]));
        }, DEBOUNCE_MS);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [query]);

    // Texte trop court (ou suggestion déjà choisie) : on n'affiche pas les anciennes suggestions.
    const showList = isOpen && query.trim().length >= MIN_LENGTH && suggestions.length > 0;

    function choose(suggestion: AddressSuggestion) {
        onSelect(suggestion);
        setQuery("");
        setIsOpen(false);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (!showList) return;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((index) => (index + 1) % suggestions.length);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
        } else if (event.key === "Enter" && activeIndex >= 0) {
            event.preventDefault();
            choose(suggestions[activeIndex]);
        } else if (event.key === "Escape") {
            setIsOpen(false);
        }
    }

    return (
        <div className="relative">
            <Input
                id={id}
                role="combobox"
                aria-expanded={showList}
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={showList && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
                autoComplete="off"
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={(event) => {
                    onTextChange(event.target.value);
                    setQuery(event.target.value);
                }}
                onKeyDown={handleKeyDown}
                onBlur={() => setIsOpen(false)}
                onFocus={() => setIsOpen(true)}
            />
            <p className="mt-1 text-xs text-muted-foreground">
                Suggestions :{" "}
                <a
                    href="https://adresse.data.gouv.fr/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4"
                >
                    Base Adresse Nationale
                </a>{" "}
                (IGN, Licence Ouverte 2.0)
            </p>
            {showList && (
                <ul
                    id={listId}
                    role="listbox"
                    className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border bg-popover text-sm text-popover-foreground shadow-md"
                >
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={`${suggestion.label}-${index}`}
                            id={`${listId}-${index}`}
                            role="option"
                            aria-selected={index === activeIndex}
                            className="cursor-pointer px-2.5 py-1.5 aria-selected:bg-accent hover:bg-accent"
                            onMouseDown={(event) => {
                                event.preventDefault();
                                choose(suggestion);
                            }}
                        >
                            {suggestion.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
