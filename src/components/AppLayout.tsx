import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
  Wallet,
  ClipboardList,
  Menu,
  LogOut,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useBella } from "@/lib/bella-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";

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
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const nomeExibido = perfil.nome.trim() || "Minha conta";
  const iniciais = nomeExibido
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

  return (
    <div className="flex h-full flex-col bg-sidebar px-4 py-6 text-sidebar-foreground">
      <div className="flex items-center gap-3 px-2 py-1">
        <span className="flex size-10 items-center justify-center rounded-xl bg-sidebar-primary shadow-[var(--shadow-lift)]">
          <Sparkles className="size-4 text-primary-foreground" />
        </span>
        <div className="leading-tight">
          <p className="font-display text-xl font-semibold">BellaFlow</p>
          <p className="text-[10px] font-semibold tracking-[0.16em] text-sidebar-foreground/55 uppercase">Nail Studio</p>
        </div>
      </div>

      <nav className="mt-9 flex flex-1 flex-col gap-1">
        {itens.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            activeOptions={{ exact: to === "/" }}
            className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm font-medium text-sidebar-foreground/62 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:border-sidebar-border data-[status=active]:bg-sidebar-primary data-[status=active]:text-sidebar-primary-foreground data-[status=active]:shadow-[var(--shadow-lift)]"
          >
            <Icon className="size-[18px]" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-6 flex items-center gap-3 rounded-xl border border-sidebar-border bg-sidebar-accent p-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
          {iniciais}
        </span>
        <div className="min-w-0 flex-1">
           <p className="truncate text-sm font-medium">{nomeExibido}</p>
          <p className="truncate text-xs text-sidebar-foreground/50">{user?.email ?? perfil.instagram}</p>
        </div>
        <Button size="icon" variant="ghost" className="size-8 shrink-0 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground" aria-label="Sair" title="Sair" onClick={async () => { await queryClient.cancelQueries(); queryClient.clear(); await supabase.auth.signOut(); onNavigate?.(); await navigate({ to: "/auth", replace: true }); }}><LogOut className="size-4" /></Button>
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
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border lg:block">
        <Nav />
      </aside>

      {aberto && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setAberto(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 w-[min(19rem,88vw)] border-r border-sidebar-border shadow-soft">
            <Nav onNavigate={() => setAberto(false)} />
          </div>
        </div>
      )}

      <main className={cn("lg:pl-64")}>
        <header className="sticky top-0 z-20 flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-border/70 bg-background/85 px-4 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="outline"
              className="lg:hidden"
              onClick={() => setAberto(true)}
              aria-label="Abrir menu"
            >
              <Menu className="size-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold sm:text-2xl">{titulo}</h1>
              {descricao && <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{descricao}</p>}
            </div>
          </div>
          {acoes}
        </header>
        <div className="px-4 pt-5 pb-12 sm:px-8 sm:pt-7 lg:px-10">{children}</div>
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
        "rounded-xl border border-border/85 bg-card p-5 shadow-[var(--shadow-card)] transition-[border-color,box-shadow,transform] duration-200 hover:border-primary/20 hover:shadow-[var(--shadow-soft)]",
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
    <Card className="relative overflow-hidden">
      <span className="absolute inset-x-0 top-0 h-0.5 bg-primary" />
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-bold text-muted-foreground uppercase">{label}</p>
        {icon && <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-primary ring-1 ring-primary/10">{icon}</span>}
      </div>
      <p className="mt-4 font-display text-2xl font-semibold sm:text-3xl">{value}</p>
      <div className="mt-1 flex items-center gap-2 text-xs">
        {trend && <span className="font-semibold text-primary">{trend}</span>}
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </div>
    </Card>
  );
}
