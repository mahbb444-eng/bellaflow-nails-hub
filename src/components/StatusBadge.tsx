import type { Status } from "@/lib/bella-data";
import { cn } from "@/lib/utils";

const estilos: Record<Status, string> = {
  Agendado: "bg-nude text-foreground/80 border-border",
  Confirmado: "bg-rose text-foreground border-rose",
  Realizado: "bg-primary/15 text-primary border-primary/30",
  Cancelado: "bg-destructive/10 text-destructive border-destructive/20",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        estilos[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
