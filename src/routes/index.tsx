import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CalendarCheck, CircleDollarSign, Clock3, Receipt, Users } from "lucide-react";
import { AppLayout, Card, Metric } from "@/components/AppLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { useBella } from "@/lib/bella-store";
import { brl } from "@/lib/bella-data";
import { faturamentoPorMes, porServico } from "@/lib/bella-metrics";
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
  const servicos = porServico(atendimentos).slice(0, 5);
  const cancelados = agendamentos.filter((a) => a.status === "Cancelado").length;
  const taxaCancelamento = agendamentos.length ? (cancelados / agendamentos.length) * 100 : 0;
  const ultimoPorCliente = new Map<string, (typeof atendimentos)[number]>();
  [...atendimentos]
    .sort((a, b) => b.data.localeCompare(a.data))
    .forEach((a) => {
      if (!ultimoPorCliente.has(a.clienteId)) ultimoPorCliente.set(a.clienteId, a);
    });
  const limite = new Date(`${hoje}T00:00:00`);
  limite.setDate(limite.getDate() - 30);
  const reativar = clientes
    .map((cliente) => ({ cliente, ultimo: ultimoPorCliente.get(cliente.id) }))
    .filter(({ ultimo }) => !ultimo || new Date(`${ultimo.data}T00:00:00`) < limite)
    .slice(0, 4);
  const proximoLivre = ["08:00", "09:00", "10:30", "13:00", "14:30", "16:00", "17:30", "19:00"].find(
    (hora) => !doDia.some((a) => a.hora === hora),
  );
  const clientesAtivos = new Set(
    atendimentos.filter((a) => new Date(`${a.data}T00:00:00`) >= limite).map((a) => a.clienteId),
  ).size;

  return (
    <AppLayout titulo="Dashboard" descricao="Sua operação, clientes e resultados em um só lugar.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Metric label="Clientes" value={String(clientes.length)} trend="+8%" hint="vs. mês anterior" icon={<Users className="size-4" />} />
        <Metric label="Agendamentos hoje" value={String(doDia.length)} hint={proximoLivre ? `livre às ${proximoLivre}` : "agenda completa"} icon={<CalendarCheck className="size-4" />} />
        <Metric label="Atendimentos no mês" value={String(doMes.length)} trend="+12%" hint="vs. mês anterior" icon={<Receipt className="size-4" />} />
        <Metric label="Receita do mês" value={brl(receita)} trend="+14%" hint="vs. mês anterior" icon={<CircleDollarSign className="size-4" />} />
        <Metric label="Ticket médio" value={brl(ticket)} hint="por atendimento" icon={<Clock3 className="size-4" />} />
      </div>

      <section className="mt-6">
        <div className="mb-3 flex items-end justify-between">
          <div><p className="text-xs font-semibold text-primary uppercase">Visão do negócio</p><h2 className="mt-1 text-xl font-semibold">Pulso do estúdio</h2></div>
          <p className="hidden text-xs text-muted-foreground sm:block">Atualizado com os atendimentos registrados</p>
        </div>
        <div className="grid overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Clientes ativos", String(clientesAtivos)],
            ["Clientes inativos", String(clientes.length - clientesAtivos)],
            ["Taxa de cancelamento", `${taxaCancelamento.toFixed(1)}%`],
            ["Serviço mais vendido", servicos[0]?.nome ?? "—"],
          ].map(([label, value]) => <div key={label} className="border-b border-border p-5 last:border-0 sm:border-r xl:border-b-0"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 font-display text-xl font-semibold">{value}</p></div>)}
        </div>
      </section>

      <div className="mt-6 grid gap-5 xl:grid-cols-5">
        <Card className="xl:col-span-2">
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
                className="flex items-center justify-between gap-3 rounded-lg border border-transparent bg-nude/60 px-4 py-3 transition-colors hover:border-primary/15"
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

        <Card className="xl:col-span-3">
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
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="valor" fill="var(--primary)" radius={[6, 6, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between"><div><p className="text-xs font-semibold text-primary uppercase">Relacionamento</p><h2 className="mt-1 text-xl font-semibold">Clientes para reativar</h2></div><span className="text-xs text-muted-foreground">+30 dias</span></div>
          <div className="mt-4 divide-y divide-border">
            {reativar.map(({ cliente, ultimo }) => (
              <div key={cliente.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0"><p className="truncate text-sm font-semibold">{cliente.nome}</p><p className="truncate text-xs text-muted-foreground">{ultimo ? `Último: ${ultimo.servico}` : "Ainda sem atendimento"}</p></div>
                <Button asChild size="sm" variant="outline"><Link to="/clientes" search={{ cliente: cliente.id }}>Ver cliente</Link></Button>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div><p className="text-xs font-semibold text-primary uppercase">Preferências</p><h2 className="mt-1 text-xl font-semibold">Serviços mais realizados</h2></div>
          <div className="mt-2 h-56">
            <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={servicos} dataKey="total" nameKey="nome" innerRadius={48} outerRadius={76} paddingAngle={4}>{servicos.map((item, index) => <Cell key={item.nome} fill={["var(--primary)", "var(--gold)", "var(--chart-2)", "var(--chart-4)", "var(--chart-5)"][index]} stroke="var(--card)" />)}</Pie><Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", fontSize: 12 }} /></PieChart></ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2">{servicos.map((item) => <span key={item.nome} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{item.nome} · {item.total}</span>)}</div>
        </Card>
      </div>
    </AppLayout>
  );
}
