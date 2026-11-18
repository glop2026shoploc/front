import { logoutAction } from "../model/logout-action";
import { Button } from "@/shared/ui/button";

export function LogoutButton() {
    return (
        <form action={logoutAction}>
            <Button type="submit" size="lg" className="h-10 w-full">
                Se déconnecter
            </Button>
        </form>
    );
}
