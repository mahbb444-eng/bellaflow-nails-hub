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
    <div className="flex h-full flex-col bg-sidebar px-5 py-7">
      <div className="flex items-center gap-2 px-2">
        <span className="flex size-9 items-center justify-center rounded-2xl bg-rose">
          <Sparkles className="size-4 text-primary" />
        </span>
        <div className="leading-tight">
          <p className="font-display text-xl font-semibold">BellaFlow</p>
          <p className="text-[11px] tracking-widest text-muted-foreground uppercase">Nail Studio</p>
        </div>
      </div>

      <nav className="mt-9 flex flex-1 flex-col gap-1">
        {itens.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            activeOptions={{ exact: to === "/" }}
            className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-nude/70 data-[status=active]:bg-nude data-[status=active]:font-medium data-[status=active]:text-foreground"
          >
            <Icon className="size-[18px] group-data-[status=active]:text-primary" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-nude/60 p-3">
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
        <header className="flex flex-wrap items-center justify-between gap-4 px-5 pt-8 pb-2 sm:px-9">
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border border-border p-2 lg:hidden"
              onClick={() => setAberto(true)}
              aria-label="Abrir menu"
            >
              <Menu className="size-4" />
            </button>
            <div>
              <h1 className="text-3xl font-semibold">{titulo}</h1>
              {descricao && <p className="text-sm text-muted-foreground">{descricao}</p>}
            </div>
          </div>
          {acoes}
        </header>
        <div className="px-5 pt-4 pb-12 sm:px-9">{children}</div>
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
        "rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]",
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
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card>
      <p className="text-xs tracking-wider text-muted-foreground uppercase">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </Card>
  );
}
