export type Status = "Agendado" | "Confirmado" | "Realizado" | "Cancelado";

export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  instagram: string;
  nascimento: string;
  preferencia: string;
  observacoes: string;
}

export interface Servico {
  id: string;
  nome: string;
  preco: number;
  duracao: number;
}

export interface Agendamento {
  id: string;
  clienteId: string;
  servico: string;
  data: string; // yyyy-mm-dd
  hora: string; // HH:mm
  duracao: number;
  valor: number;
  observacoes: string;
  status: Status;
}

export interface Atendimento {
  id: string;
  clienteId: string;
  servico: string;
  data: string;
  hora: string;
  valor: number;
  observacoes: string;
}

export interface Perfil {
  nome: string;
  estudio: string;
  telefone: string;
  instagram: string;
  email: string;
}

export const SERVICOS_PADRAO: Servico[] = [
  { id: "s1", nome: "Alongamento", preco: 180, duracao: 120 },
  { id: "s2", nome: "Manutenção", preco: 120, duracao: 90 },
  { id: "s3", nome: "Esmaltação em Gel", preco: 90, duracao: 60 },
  { id: "s4", nome: "Blindagem", preco: 80, duracao: 60 },
  { id: "s5", nome: "Spa dos Pés", preco: 70, duracao: 50 },
];

export const PERFIL_PADRAO: Perfil = {
  nome: "Camila Rocha",
  estudio: "BellaFlow Nail Studio",
  telefone: "(11) 98812-4477",
  instagram: "@camila.nails",
  email: "camila@bellaflow.com.br",
};

const NOMES = [
  "Ana Beatriz Moura",
  "Juliana Ferreira",
  "Patrícia Almeida",
  "Larissa Gonçalves",
  "Fernanda Ribeiro",
  "Camila Duarte",
  "Bruna Carvalho",
  "Mariana Teixeira",
  "Tatiane Souza",
  "Renata Pacheco",
  "Vanessa Lima",
  "Gabriela Nunes",
];

const PREFERENCIAS = [
  "Alongamento",
  "Manutenção",
  "Esmaltação em Gel",
  "Blindagem",
  "Spa dos Pés",
];

const OBS_CLIENTE = [
  "Prefere tons nude e francesinha.",
  "Alergia a acetona — usar removedor suave.",
  "Gosta de atendimento no fim da tarde.",
  "Sempre pede decoração na unha anelar.",
  "Unhas sensíveis, cutícula delicada.",
  "Cliente fiel desde 2023.",
];

export const pad = (n: number) => String(n).padStart(2, "0");

export const toISO = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const dataBR = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

export const MESES = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export function gerarClientes(): Cliente[] {
  return NOMES.map((nome, i) => ({
    id: `c${i + 1}`,
    nome,
    telefone: `(11) 9${pad(8 + (i % 2))}${String(1000 + i * 137).slice(0, 3)}-${String(
      2000 + i * 311,
    ).slice(0, 4)}`,
    instagram: `@${nome.split(" ")[0].toLowerCase()}.${nome.split(" ")[1].toLowerCase()}`,
    nascimento: `19${85 + (i % 12)}-${pad(((i * 3) % 12) + 1)}-${pad(((i * 5) % 27) + 1)}`,
    preferencia: PREFERENCIAS[i % PREFERENCIAS.length],
    observacoes: OBS_CLIENTE[i % OBS_CLIENTE.length],
  }));
}

const HORAS = ["09:00", "10:30", "13:00", "14:30", "16:00", "17:30"];

export function gerarAgendamentos(hoje: Date): Agendamento[] {
  const lista: Agendamento[] = [];
  const statusCiclo: Status[] = ["Agendado", "Confirmado", "Confirmado", "Agendado", "Cancelado"];
  for (let i = 0; i < 18; i++) {
    const s = SERVICOS_PADRAO[i % SERVICOS_PADRAO.length];
    const d = new Date(hoje);
    // 6 hoje, os demais espalhados nos próximos 12 dias
    d.setDate(hoje.getDate() + (i < 6 ? 0 : ((i - 6) % 12) + 1));
    lista.push({
      id: `a${i + 1}`,
      clienteId: `c${(i % 12) + 1}`,
      servico: s.nome,
      data: toISO(d),
      hora: HORAS[i % HORAS.length],
      duracao: s.duracao,
      valor: s.preco,
      observacoes: i % 4 === 0 ? "Trazer referência de decoração." : "",
      status: i < 3 ? "Confirmado" : statusCiclo[i % statusCiclo.length],
    });
  }
  return lista;
}

export function gerarAtendimentos(hoje: Date): Atendimento[] {
  const lista: Atendimento[] = [];
  for (let i = 0; i < 24; i++) {
    const s = SERVICOS_PADRAO[(i * 2 + 1) % SERVICOS_PADRAO.length];
    const d = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    d.setDate(d.getDate() - (3 + i * 7)); // últimos ~6 meses
    lista.push({
      id: `at${i + 1}`,
      clienteId: `c${((i * 5) % 12) + 1}`,
      servico: s.nome,
      data: toISO(d),
      hora: HORAS[i % HORAS.length],
      valor: s.preco + (i % 3) * 10,
      observacoes: i % 5 === 0 ? "Cliente elogiou o acabamento." : "",
    });
  }
  return lista;
}
