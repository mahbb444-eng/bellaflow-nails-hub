import { MESES, type Atendimento } from "./bella-data";

export function faturamentoPorMes(atendimentos: Atendimento[], meses = 6, ref = new Date()) {
  const out: { mes: string; valor: number }[] = [];
  for (let i = meses - 1; i >= 0; i--) {
    const d = new Date(ref.getFullYear(), ref.getMonth() - i, 1);
    const chave = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const valor = atendimentos
      .filter((a) => a.data.slice(0, 7) === chave)
      .reduce((s, a) => s + a.valor, 0);
    out.push({ mes: MESES[d.getMonth()]!, valor });
  }
  return out;
}

export function porServico(atendimentos: Atendimento[]) {
  const mapa = new Map<string, number>();
  atendimentos.forEach((a) => mapa.set(a.servico, (mapa.get(a.servico) ?? 0) + 1));
  return [...mapa.entries()]
    .map(([nome, total]) => ({ nome, total }))
    .sort((a, b) => b.total - a.total);
}

export function inicioDaSemana(ref: Date) {
  const d = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate());
  d.setDate(d.getDate() - d.getDay());
  return d;
}
