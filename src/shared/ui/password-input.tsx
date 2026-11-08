"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { cn } from "cn"

function PasswordInput({
                           className,
                           ...props
                       }: Omit<React.ComponentProps<"input">, "type">) {
    const [visible, setVisible] = React.useState(false)

    return (
        <div className="relative">
            <Input
                {...props}
                type={visible ? "text" : "password"}
                className={cn("pr-9", className)}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                onClick={() => setVisible((current) => !current)}
                className="absolute inset-y-0 right-1 my-auto"
            >
                {visible ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
        </div>
    )
}

export { PasswordInput }