import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  gerarAgendamentos,
  gerarAtendimentos,
  gerarClientes,
  PERFIL_PADRAO,
  SERVICOS_PADRAO,
  toISO,
  type Agendamento,
  type Atendimento,
  type Cliente,
  type Despesa,
  type Perfil,
  type Servico,
  type Status,
} from "./bella-data";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { useAuth } from "./auth-context";

interface Estado {
  clientes: Cliente[];
  agendamentos: Agendamento[];
  atendimentos: Atendimento[];
  servicos: Servico[];
  perfil: Perfil;
  despesas: Despesa[];
}

interface StoreValue extends Estado {
  hoje: string;
  nomeCliente: (id: string) => string;
  salvarCliente: (c: Omit<Cliente, "id"> & { id?: string }) => void;
  removerCliente: (id: string) => void;
  salvarAgendamento: (a: Omit<Agendamento, "id"> & { id?: string }) => void;
  removerAgendamento: (id: string) => void;
  marcarRealizado: (id: string) => void;
  alterarStatus: (id: string, status: Status) => void;
  salvarServico: (s: Omit<Servico, "id"> & { id?: string }) => void;
  removerServico: (id: string) => void;
  salvarPerfil: (p: Perfil) => void;
  salvarDespesa: (d: Omit<Despesa, "id"> & { id?: string }) => void;
  removerDespesa: (id: string) => void;
  carregando: boolean;
}

const Ctx = createContext<StoreValue | null>(null);
const KEY = "bellaflow:v1";

function estadoInicial(hoje: Date): Estado {
  return {
    clientes: gerarClientes(),
    agendamentos: gerarAgendamentos(hoje),
    atendimentos: gerarAtendimentos(hoje),
    servicos: SERVICOS_PADRAO,
    perfil: PERFIL_PADRAO,
    despesas: [],
  };
}

function removerNomeDemonstrativo(estado: Estado): Estado {
  if (estado.perfil.nome !== "Camila Rocha") return estado;
  return { ...estado, perfil: { ...estado.perfil, nome: "" } };
}

const novoId = (p: string) => `${p}${Math.random().toString(36).slice(2, 9)}`;

export function BellaProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const hojeDate = useMemo(() => new Date(), []);
  const [estado, setEstado] = useState<Estado>(() => estadoInicial(hojeDate));
  const [carregando, setCarregando] = useState(true);
  const [prontoParaSalvar, setProntoParaSalvar] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setCarregando(false);
      setProntoParaSalvar(false);
      return;
    }

    let active = true;
    const load = async () => {
      setCarregando(true);
      setProntoParaSalvar(false);
      const { data, error } = await supabase
        .from("app_states")
        .select("state")
        .eq("user_id", user.id)
        .maybeSingle();
      if (!active) return;
      if (error) {
        console.error(error);
        setCarregando(false);
        return;
      }

      let next = estadoInicial(hojeDate);
      if (data?.state && typeof data.state === "object") {
        next = { ...next, ...(data.state as unknown as Partial<Estado>), despesas: (data.state as unknown as Partial<Estado>).despesas ?? [] };
      } else {
        try {
          const raw = localStorage.getItem(KEY);
          if (raw) next = { ...next, ...(JSON.parse(raw) as Partial<Estado>), despesas: (JSON.parse(raw) as Partial<Estado>).despesas ?? [] };
        } catch {
          // A conta nova começa com os dados demonstrativos.
        }
        const { error: saveError } = await supabase.from("app_states").insert({
          user_id: user.id,
          state: next as unknown as Json,
          updated_at: new Date().toISOString(),
        });
        if (saveError) console.error(saveError);
        else localStorage.removeItem(KEY);
      }
      setEstado(removerNomeDemonstrativo(next));
      setCarregando(false);
      setProntoParaSalvar(true);
    };
    void load();
    return () => { active = false; };
  }, [authLoading, hojeDate, user]);

  useEffect(() => {
    if (!user || !prontoParaSalvar) return;
    const timer = window.setTimeout(() => {
      void supabase.from("app_states").upsert({
        user_id: user.id,
        state: estado as unknown as Json,
        updated_at: new Date().toISOString(),
      }).then(({ error }) => { if (error) console.error(error); });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [estado, prontoParaSalvar, user]);

  const nomeCliente = useCallback(
    (id: string) => estado.clientes.find((c) => c.id === id)?.nome ?? "Cliente removida",
    [estado.clientes],
  );

  const value: StoreValue = {
    ...estado,
    hoje: toISO(hojeDate),
    carregando,
    nomeCliente,
    salvarCliente: (c) =>
      setEstado((e) => ({
        ...e,
        clientes: c.id
          ? e.clientes.map((x) => (x.id === c.id ? ({ ...x, ...c } as Cliente) : x))
          : [...e.clientes, { ...c, id: novoId("c") } as Cliente],
      })),
    removerCliente: (id) =>
      setEstado((e) => ({ ...e, clientes: e.clientes.filter((c) => c.id !== id) })),
    salvarAgendamento: (a) =>
      setEstado((e) => ({
        ...e,
        agendamentos: a.id
          ? e.agendamentos.map((x) => (x.id === a.id ? ({ ...x, ...a } as Agendamento) : x))
          : [...e.agendamentos, { ...a, id: novoId("a") } as Agendamento],
      })),
    removerAgendamento: (id) =>
      setEstado((e) => ({ ...e, agendamentos: e.agendamentos.filter((a) => a.id !== id) })),
    alterarStatus: (id, status) =>
      setEstado((e) => ({
        ...e,
        agendamentos: e.agendamentos.map((a) => (a.id === id ? { ...a, status } : a)),
      })),
    marcarRealizado: (id) =>
      setEstado((e) => {
        const ag = e.agendamentos.find((a) => a.id === id);
        if (!ag || ag.status === "Realizado") return e;
        const novo: Atendimento = {
          id: novoId("at"),
          clienteId: ag.clienteId,
          servico: ag.servico,
          data: ag.data,
          hora: ag.hora,
          valor: ag.valor,
          observacoes: ag.observacoes,
        };
        return {
          ...e,
          agendamentos: e.agendamentos.map((a) =>
            a.id === id ? { ...a, status: "Realizado" as Status } : a,
          ),
          atendimentos: [novo, ...e.atendimentos],
        };
      }),
    salvarServico: (s) =>
      setEstado((e) => ({
        ...e,
        servicos: s.id
          ? e.servicos.map((x) => (x.id === s.id ? ({ ...x, ...s } as Servico) : x))
          : [...e.servicos, { ...s, id: novoId("s") } as Servico],
      })),
    removerServico: (id) =>
      setEstado((e) => ({ ...e, servicos: e.servicos.filter((s) => s.id !== id) })),
    salvarPerfil: (p) => setEstado((e) => ({ ...e, perfil: p })),
    salvarDespesa: (d) =>
      setEstado((e) => ({
        ...e,
        despesas: d.id
          ? e.despesas.map((x) => (x.id === d.id ? ({ ...x, ...d } as Despesa) : x))
          : [{ ...d, id: novoId("d") } as Despesa, ...e.despesas],
      })),
    removerDespesa: (id) =>
      setEstado((e) => ({ ...e, despesas: e.despesas.filter((d) => d.id !== id) })),
  };

  if (user && carregando) {
    return <div className="flex min-h-screen items-center justify-center bg-background"><div className="text-center"><div className="mx-auto size-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" /><p className="mt-3 text-sm text-muted-foreground">Preparando seu BellaFlow...</p></div></div>;
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBella() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBella precisa estar dentro de BellaProvider");
  return ctx;
}
