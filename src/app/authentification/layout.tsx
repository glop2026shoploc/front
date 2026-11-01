import { AuthIllustration } from "@/shared/ui/auth-illustration";

export default function AuthentificationLayout({ children }: { children: React.ReactNode }) {
    return (
        // 3.5rem = hauteur du header du layout racine (h-14)
        <div className="flex min-h-[calc(100vh-3.5rem)]">
            <div className="hidden flex-1 items-center justify-center p-10 lg:flex">
                <AuthIllustration className="w-full max-w-md" />
            </div>
            <div className="flex w-full items-center justify-center bg-muted lg:w-1/2">
                <div className="w-full max-w-md p-6">{children}</div>
            </div>
        </div>
    );
}
