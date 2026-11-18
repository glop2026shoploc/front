import * as React from "react"
import { InfoIcon } from "lucide-react"
import { cn } from "cn"

function Field({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="field"
            className={cn("flex flex-col gap-1.5", className)}
            {...props}
        />
    )
}

function FieldHint({
                       className,
                       children,
                       ...props
                   }: React.ComponentProps<"p">) {
    return (
        <p
            data-slot="field-hint"
            className={cn(
                "flex items-start gap-1.5 text-xs text-muted-foreground",
                className
            )}
            {...props}
        >
            <InfoIcon aria-hidden className="mt-px size-3.5 shrink-0" />
            <span>{children}</span>
        </p>
    )
}

export { Field, FieldHint }