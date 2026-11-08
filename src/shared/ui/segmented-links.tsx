import type { ReactNode } from "react"
import Link from "next/link"
import { CheckIcon } from "lucide-react"
import { cn } from "cn"

interface SegmentedLinksItem {
    label: string
    href: string
    active: boolean
    icon?: ReactNode
}

interface SegmentedLinksProps {
    label: string
    items: SegmentedLinksItem[]
    className?: string
}

function SegmentedLinks({ label, items, className }: SegmentedLinksProps) {
    return (
        <nav
            aria-label={label}
            data-slot="segmented-links"
            className={cn("flex gap-1 rounded-xl bg-muted p-1", className)}
        >
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    aria-current={item.active ? "true" : undefined}
                    className={cn(
                        "flex h-10 flex-1 items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                        item.active
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-background/60"
                    )}
                >
                    {item.icon}
                    {item.label}
                    {item.active && <CheckIcon aria-hidden className="size-4" />}
                </Link>
            ))}
        </nav>
    )
}

export { SegmentedLinks }