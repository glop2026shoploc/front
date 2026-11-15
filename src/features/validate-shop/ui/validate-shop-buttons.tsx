"use client";

import { Button } from "@/shared/ui/button";
import { validateShopAction } from "../model/validate-shop-action";

export function ValidateShopButtons({ shopId }: { shopId: string }) {
    return (
        <div className="flex gap-2">
            <Button type="button" onClick={() => validateShopAction(shopId, "VALIDATED")}>
                Accepter
            </Button>
            <Button type="button" variant="destructive" onClick={() => validateShopAction(shopId, "REJECTED")}>
                Refuser
            </Button>
        </div>
    );
}
