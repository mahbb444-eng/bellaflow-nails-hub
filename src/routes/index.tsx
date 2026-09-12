import { createFileRoute, Link } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppLayout, Card, Metric } from "@/components/AppLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { useBella } from "@/lib/bella-store";
import { brl } from "@/lib/bella-data";
import { faturamentoPorMes } from "@/lib/bella-metrics";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — BellaFlow" },
      {
        name: "description",
        content:
          "Acompanhe clientes, agendamentos do dia, receita do mês e ticket médio do seu estúdio de unhas.",
      },
      { property: "og:title", content: "Dashboard — BellaFlow" },
      {
        property: "og:description",
        content: "Indicadores do seu estúdio de unhas em tempo real.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { clientes, agendamentos, atendimentos, hoje, nomeCliente, marcarRealizado } = useBella();
  const mes = hoje.slice(0, 7);

  const doDia = agendamentos
    .filter((a) => a.data === hoje && a.status !== "Cancelado")
    .sort((a, b) => a.hora.localeCompare(b.hora));
  const doMes = atendimentos.filter((a) => a.data.slice(0, 7) === mes);
  const receita = doMes.reduce((s, a) => s + a.valor, 0);
  const ticket = doMes.length ? receita / doMes.length : 0;
  const dados = faturamentoPorMes(atendimentos);

  return (
    <AppLayout titulo="Dashboard" descricao="Um resumo carinhoso do seu dia de trabalho.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Metric label="Clientes" value={String(clientes.length)} hint="cadastradas" />
        <Metric label="Agendamentos hoje" value={String(doDia.length)} hint="ativos" />
        <Metric label="Atendimentos do mês" value={String(doMes.length)} hint="realizados" />
        <Metric label="Receita do mês" value={brl(receita)} />
        <Metric label="Ticket médio" value={brl(ticket)} hint="no mês" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Próximos atendimentos</h2>
            <Link to="/agenda" className="text-xs text-primary hover:underline">
              ver agenda
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {doDia.length === 0 && (
              <p className="text-sm text-muted-foreground">Nenhum atendimento para hoje.</p>
            )}
            {doDia.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between gap-3 rounded-2xl bg-nude/50 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{nomeCliente(a.clienteId)}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.hora} · {a.servico} · {brl(a.valor)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <StatusBadge status={a.status} />
                  {a.status !== "Realizado" && (
                    <Button size="sm" variant="outline" onClick={() => marcarRealizado(a.id)}>
                      Realizado
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <h2 className="text-xl font-semibold">Faturamento dos últimos 6 meses</h2>
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dados}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} width={60} />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  formatter={(v: number) => brl(v)}
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid var(--border)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="valor" fill="var(--gold)" radius={[10, 10, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
