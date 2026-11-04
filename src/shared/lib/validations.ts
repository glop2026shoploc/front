const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/;

export function isValidEmail(email: string): boolean {
    return emailPattern.test(email);
}

export function isStrongPassword(password: string): boolean {
    return passwordPattern.test(password);
}

export const validationMessages = {
    allFieldsRequired: "Tous les champs sont obligatoires.",
    emailFormat: "Le format de l'e-mail n'est pas valide.",
    passwordStrength:
        "Le mot de passe doit contenir au moins 12 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial.",
    consentRequired: "Vous devez accepter l'utilisation de vos données personnelles pour créer un compte.",
};