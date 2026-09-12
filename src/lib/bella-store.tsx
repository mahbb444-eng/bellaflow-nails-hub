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
  type Perfil,
  type Servico,
  type Status,
} from "./bella-data";

interface Estado {
  clientes: Cliente[];
  agendamentos: Agendamento[];
  atendimentos: Atendimento[];
  servicos: Servico[];
  perfil: Perfil;
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
  };
}

const novoId = (p: string) => `${p}${Math.random().toString(36).slice(2, 9)}`;

export function BellaProvider({ children }: { children: ReactNode }) {
  const hojeDate = useMemo(() => new Date(), []);
  const [estado, setEstado] = useState<Estado>(() => estadoInicial(hojeDate));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setEstado(JSON.parse(raw) as Estado);
    } catch {
      /* ignora */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(estado));
    } catch {
      /* ignora */
    }
  }, [estado]);

  const nomeCliente = useCallback(
    (id: string) => estado.clientes.find((c) => c.id === id)?.nome ?? "Cliente removida",
    [estado.clientes],
  );

  const value: StoreValue = {
    ...estado,
    hoje: toISO(hojeDate),
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
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBella() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBella precisa estar dentro de BellaProvider");
  return ctx;
}
