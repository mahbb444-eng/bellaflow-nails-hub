import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
  Wallet,
  ClipboardList,
  Menu,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useBella } from "@/lib/bella-store";
import { cn } from "@/lib/utils";

const itens = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/agenda", label: "Agenda", icon: CalendarDays },
  { to: "/atendimentos", label: "Atendimentos", icon: ClipboardList },
  { to: "/financeiro", label: "Financeiro", icon: Wallet },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
] as const;

function Nav({ onNavigate }: { onNavigate?: () => void }) {
  const { perfil } = useBella();
  const iniciais = perfil.nome
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

  return (
    <div className="flex h-full flex-col bg-sidebar px-4 py-6">
      <div className="flex items-center gap-3 px-2">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary shadow-sm">
          <Sparkles className="size-4 text-primary-foreground" />
        </span>
        <div className="leading-tight">
          <p className="font-display text-xl font-semibold">BellaFlow</p>
          <p className="text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">Nail Studio</p>
        </div>
      </div>

      <nav className="mt-9 flex flex-1 flex-col gap-1">
        {itens.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            activeOptions={{ exact: to === "/" }}
            className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent/60 hover:text-foreground data-[status=active]:border-primary/10 data-[status=active]:bg-accent data-[status=active]:text-primary"
          >
            <Icon className="size-[18px] group-data-[status=active]:text-primary" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
        <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
          {iniciais}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{perfil.nome}</p>
          <p className="truncate text-xs text-muted-foreground">{perfil.instagram}</p>
        </div>
      </div>
    </div>
  );
}

export function AppLayout({
  titulo,
  descricao,
  acoes,
  children,
}: {
  titulo: string;
  descricao?: string;
  acoes?: ReactNode;
  children: ReactNode;
}) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border lg:block">
        <Nav />
      </aside>

      {aberto && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setAberto(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 w-64 border-r border-border shadow-soft">
            <Nav onNavigate={() => setAberto(false)} />
          </div>
        </div>
      )}

      <main className={cn("lg:pl-64")}>
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 px-5 py-6 sm:px-9">
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border border-border p-2 lg:hidden"
              onClick={() => setAberto(true)}
              aria-label="Abrir menu"
            >
              <Menu className="size-4" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold sm:text-3xl">{titulo}</h1>
              {descricao && <p className="text-sm text-muted-foreground">{descricao}</p>}
            </div>
          </div>
          {acoes}
        </header>
        <div className="px-5 pt-6 pb-12 sm:px-9">{children}</div>
      </main>
    </div>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Metric({
  label,
  value,
  hint,
  trend,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  trend?: string;
  icon?: ReactNode;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase">{label}</p>
        {icon && <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-primary">{icon}</span>}
      </div>
      <p className="mt-3 font-display text-3xl font-semibold">{value}</p>
      <div className="mt-1 flex items-center gap-2 text-xs">
        {trend && <span className="font-semibold text-primary">{trend}</span>}
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </div>
    </Card>
  );
}
