import {cn} from "@/shared/lib/utils"
function Loader({ className }: { className?: string }) {
    return (
    <div
  className={cn("inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]", className)}
  role="status">
  <span className="sr-only">Chargement...</span>
</div>)
}

export {Loader};
