import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout, Card } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useBella } from "@/lib/bella-store";
import { brl, dataBR } from "@/lib/bella-data";

export const Route = createFileRoute("/_authenticated/atendimentos")({
  head: () => ({
    meta: [
      { title: "Atendimentos — BellaFlow" },
      {
        name: "description",
        content: "Histórico completo de atendimentos com filtros por período, cliente e serviço.",
      },
      { property: "og:title", content: "Atendimentos — BellaFlow" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "Todo o histórico do seu estúdio em um só lugar." },
    ],
  }),
  component: AtendimentosPage,
});

function AtendimentosPage() {
  const { atendimentos, clientes, servicos, nomeCliente } = useBella();
  const [de, setDe] = useState("");
  const [ate, setAte] = useState("");
  const [cliente, setCliente] = useState("");
  const [servico, setServico] = useState("");

  const lista = useMemo(
    () =>
      atendimentos
        .filter(
          (a) =>
            (!de || a.data >= de) &&
            (!ate || a.data <= ate) &&
            (!cliente || a.clienteId === cliente) &&
            (!servico || a.servico === servico),
        )
        .sort((a, b) => b.data.localeCompare(a.data)),
    [atendimentos, de, ate, cliente, servico],
  );

  const total = lista.reduce((s, a) => s + a.valor, 0);
  const selectCls = "mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm";

  return (
    <AppLayout titulo="Atendimentos" descricao="Histórico completo dos serviços realizados.">
      <Card>
        <div className="grid gap-4 md:grid-cols-5">
          <div>
            <Label>De</Label>
            <Input type="date" value={de} onChange={(e) => setDe(e.target.value)} />
          </div>
          <div>
            <Label>Até</Label>
            <Input type="date" value={ate} onChange={(e) => setAte(e.target.value)} />
          </div>
          <div>
            <Label>Cliente</Label>
            <select
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className={selectCls}
            >
              <option value="">Todas</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Serviço</Label>
            <select
              value={servico}
              onChange={(e) => setServico(e.target.value)}
              className={selectCls}
            >
              <option value="">Todos</option>
              {servicos.map((s) => (
                <option key={s.id} value={s.nome}>
                  {s.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setDe("");
                setAte("");
                setCliente("");
                setServico("");
              }}
            >
              Limpar filtros
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-5 grid overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] sm:grid-cols-3">
        <div className="border-b border-border p-5 sm:border-r sm:border-b-0">
          <p className="text-xs tracking-wider text-muted-foreground uppercase">
            Total filtrado
          </p>
          <p className="mt-2 font-display text-3xl font-semibold">{brl(total)}</p>
        </div>
        <div className="border-b border-border p-5 sm:border-r sm:border-b-0">
          <p className="text-xs tracking-wider text-muted-foreground uppercase">Atendimentos</p>
          <p className="mt-2 font-display text-3xl font-semibold">{lista.length}</p>
        </div>
        <div className="p-5">
          <p className="text-xs tracking-wider text-muted-foreground uppercase">Ticket médio</p>
          <p className="mt-2 font-display text-3xl font-semibold">
            {brl(lista.length ? total / lista.length : 0)}
          </p>
        </div>
      </div>

      <Card className="mt-5 overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs tracking-wider text-muted-foreground uppercase">
              <th className="px-5 py-3 font-medium">Data</th>
              <th className="px-5 py-3 font-medium">Cliente</th>
              <th className="px-5 py-3 font-medium">Serviço</th>
              <th className="hidden px-5 py-3 font-medium lg:table-cell">Observações</th>
              <th className="px-5 py-3 text-right font-medium">Valor</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((a) => (
              <tr key={a.id} className="border-t border-border">
                <td className="px-5 py-4 whitespace-nowrap">
                  {dataBR(a.data)} <span className="text-muted-foreground">{a.hora}</span>
                </td>
                <td className="px-5 py-4 font-medium">{nomeCliente(a.clienteId)}</td>
                <td className="px-5 py-4 text-muted-foreground">{a.servico}</td>
                <td className="hidden px-5 py-4 text-muted-foreground lg:table-cell">
                  {a.observacoes || "—"}
                </td>
                <td className="px-5 py-4 text-right text-primary">{brl(a.valor)}</td>
              </tr>
            ))}
            {lista.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                  Nenhum atendimento no período.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </AppLayout>
  );
}
