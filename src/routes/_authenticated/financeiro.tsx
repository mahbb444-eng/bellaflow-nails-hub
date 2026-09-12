import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CircleDollarSign, PiggyBank, Receipt, TrendingUp, WalletCards } from "lucide-react";
import { AppLayout, Card, Metric } from "@/components/AppLayout";
import { useBella } from "@/lib/bella-store";
import { brl, dataBR } from "@/lib/bella-data";
import { faturamentoPorMes, inicioDaSemana, porServico } from "@/lib/bella-metrics";

export const Route = createFileRoute("/_authenticated/financeiro")({
  head: () => ({
    meta: [
      { title: "Financeiro — BellaFlow" },
      {
        name: "description",
        content: "Receita do dia, da semana e do mês, ticket médio e serviços mais populares.",
      },
      { property: "og:title", content: "Financeiro — BellaFlow" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "Acompanhe o faturamento do seu estúdio de unhas." },
    ],
  }),
  component: FinanceiroPage,
});

const CORES = ["var(--gold)", "var(--rose)", "var(--nude)", "var(--chart-4)", "var(--chart-5)"];

function FinanceiroPage() {
  const { atendimentos, hoje, nomeCliente } = useBella();
  const ref = new Date(hoje + "T00:00:00");
  const iniSemana = inicioDaSemana(ref);
  const iniSemanaISO = `${iniSemana.getFullYear()}-${String(iniSemana.getMonth() + 1).padStart(2, "0")}-${String(iniSemana.getDate()).padStart(2, "0")}`;

  const soma = (l: typeof atendimentos) => l.reduce((s, a) => s + a.valor, 0);
  const doDia = atendimentos.filter((a) => a.data === hoje);
  const daSemana = atendimentos.filter((a) => a.data >= iniSemanaISO && a.data <= hoje);
  const doMes = atendimentos.filter((a) => a.data.slice(0, 7) === hoje.slice(0, 7));
  const receitaMes = soma(doMes);

  const barras = faturamentoPorMes(atendimentos);
  const pizza = porServico(atendimentos);
  const recentes = [...atendimentos].sort((a, b) => b.data.localeCompare(a.data)).slice(0, 10);

  return (
    <AppLayout titulo="Financeiro" descricao="O resultado do seu talento, em números.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Metric label="Receita hoje" value={brl(soma(doDia))} trend="+6%" hint="vs. ontem" icon={<CircleDollarSign className="size-4" />} />
        <Metric label="Receita da semana" value={brl(soma(daSemana))} trend="+11%" hint="vs. semana anterior" icon={<TrendingUp className="size-4" />} />
        <Metric label="Receita do mês" value={brl(receitaMes)} trend="+14%" hint="vs. mês anterior" icon={<WalletCards className="size-4" />} />
        <Metric
          label="Ticket médio"
          value={brl(doMes.length ? receitaMes / doMes.length : 0)}
          hint="no mês"
          icon={<PiggyBank className="size-4" />}
        />
        <Metric label="Total atendimentos" value={String(atendimentos.length)} hint="histórico" icon={<Receipt className="size-4" />} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <h2 className="text-xl font-semibold">Faturamento mensal</h2>
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barras}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} width={60} />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  formatter={(v: number) => brl(v)}
                  contentStyle={{ borderRadius: 16, border: "1px solid var(--border)", fontSize: 12 }}
                />
                <Bar dataKey="valor" fill="var(--primary)" radius={[6, 6, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold">Serviços mais populares</h2>
          <div className="mt-2 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pizza}
                  dataKey="total"
                  nameKey="nome"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {pizza.map((_, i) => (
                    <Cell key={i} fill={CORES[i % CORES.length]} stroke="var(--card)" />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 16, border: "1px solid var(--border)", fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <section className="mt-6 rounded-xl border border-dashed border-primary/25 bg-accent/25 px-6 py-8 text-center">
        <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-accent text-primary"><PiggyBank className="size-5" /></span>
        <h2 className="mt-3 text-lg font-semibold">Despesas e lucro estimado</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">Nenhuma despesa foi lançada ainda. Quando houver registros, o lucro estimado aparecerá aqui.</p>
      </section>

      <Card className="mt-6 overflow-x-auto p-0">
        <h2 className="px-5 pt-5 text-xl font-semibold">Movimentações recentes</h2>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="text-left text-xs tracking-wider text-muted-foreground uppercase">
              <th className="px-5 py-3 font-medium">Data</th>
              <th className="px-5 py-3 font-medium">Cliente</th>
              <th className="px-5 py-3 font-medium">Serviço</th>
              <th className="px-5 py-3 text-right font-medium">Valor</th>
            </tr>
          </thead>
          <tbody>
            {recentes.map((a) => (
              <tr key={a.id} className="border-t border-border">
                <td className="px-5 py-4 whitespace-nowrap">{dataBR(a.data)}</td>
                <td className="px-5 py-4 font-medium">{nomeCliente(a.clienteId)}</td>
                <td className="px-5 py-4 text-muted-foreground">{a.servico}</td>
                <td className="px-5 py-4 text-right text-primary">+ {brl(a.valor)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppLayout>
  );
}
