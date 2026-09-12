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
import { CircleDollarSign, Pencil, PiggyBank, Plus, Receipt, Trash2, TrendingDown, TrendingUp, WalletCards } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppLayout, Card, Metric } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useBella } from "@/lib/bella-store";
import { brl, dataBR, type CategoriaDespesa, type Despesa } from "@/lib/bella-data";
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
  const { atendimentos, despesas, hoje, nomeCliente, salvarDespesa, removerDespesa } = useBella();
  const [form, setForm] = useState<(Omit<Despesa, "id"> & { id?: string }) | null>(null);
  const [excluir, setExcluir] = useState<Despesa | null>(null);
  const ref = new Date(hoje + "T00:00:00");
  const iniSemana = inicioDaSemana(ref);
  const iniSemanaISO = `${iniSemana.getFullYear()}-${String(iniSemana.getMonth() + 1).padStart(2, "0")}-${String(iniSemana.getDate()).padStart(2, "0")}`;

  const soma = (l: typeof atendimentos) => l.reduce((s, a) => s + a.valor, 0);
  const doDia = atendimentos.filter((a) => a.data === hoje);
  const daSemana = atendimentos.filter((a) => a.data >= iniSemanaISO && a.data <= hoje);
  const doMes = atendimentos.filter((a) => a.data.slice(0, 7) === hoje.slice(0, 7));
  const receitaMes = soma(doMes);
  const despesasMes = despesas.filter((d) => d.data.slice(0, 7) === hoje.slice(0, 7));
  const totalDespesasMes = despesasMes.reduce((s, d) => s + d.valor, 0);
  const lucroLiquido = receitaMes - totalDespesasMes;

  const barras = faturamentoPorMes(atendimentos);
  const pizza = porServico(atendimentos);
  const recentes = [...atendimentos].sort((a, b) => b.data.localeCompare(a.data)).slice(0, 10);

  return (
    <AppLayout titulo="Financeiro" descricao="O resultado do seu talento, em números." acoes={<Button onClick={() => setForm({ descricao: "", categoria: "Materiais", data: hoje, valor: 0, observacoes: "" })}><Plus className="size-4" /> Nova despesa</Button>}>
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

      <div className="mt-5 grid overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] sm:grid-cols-3">
        <div className="border-b border-border p-5 sm:border-r sm:border-b-0"><div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase text-muted-foreground">Faturamento no mês</p><TrendingUp className="size-4 text-primary" /></div><p className="mt-2 font-display text-3xl font-semibold">{brl(receitaMes)}</p></div>
        <div className="border-b border-border p-5 sm:border-r sm:border-b-0"><div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase text-muted-foreground">Despesas no mês</p><TrendingDown className="size-4 text-destructive" /></div><p className="mt-2 font-display text-3xl font-semibold text-destructive">{brl(totalDespesasMes)}</p></div>
        <div className="p-5"><div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase text-muted-foreground">Lucro líquido</p><PiggyBank className="size-4 text-gold" /></div><p className="mt-2 font-display text-3xl font-semibold">{brl(lucroLiquido)}</p><p className="mt-1 text-xs text-muted-foreground">faturamento menos despesas</p></div>
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

      <Card className="mt-6 overflow-x-auto p-0">
        <div className="flex items-center justify-between px-5 pt-5"><div><p className="text-xs font-semibold uppercase text-primary">Custos do estúdio</p><h2 className="mt-1 text-xl font-semibold">Despesas</h2></div><Button size="sm" variant="outline" onClick={() => setForm({ descricao: "", categoria: "Materiais", data: hoje, valor: 0, observacoes: "" })}><Plus className="size-4" /> Adicionar</Button></div>
        {despesas.length ? <table className="mt-4 w-full text-sm"><thead><tr className="text-left text-xs uppercase text-muted-foreground"><th className="px-5 py-3 font-medium">Data</th><th className="px-5 py-3 font-medium">Descrição</th><th className="hidden px-5 py-3 font-medium sm:table-cell">Categoria</th><th className="px-5 py-3 text-right font-medium">Valor</th><th className="px-5 py-3 text-right font-medium">Ações</th></tr></thead><tbody>{[...despesas].sort((a,b) => b.data.localeCompare(a.data)).map((d) => <tr key={d.id} className="border-t border-border"><td className="px-5 py-4 whitespace-nowrap">{dataBR(d.data)}</td><td className="px-5 py-4"><p className="font-medium">{d.descricao}</p>{d.observacoes && <p className="max-w-xs truncate text-xs text-muted-foreground">{d.observacoes}</p>}</td><td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">{d.categoria}</td><td className="px-5 py-4 text-right font-medium text-destructive">− {brl(d.valor)}</td><td className="px-5 py-4 text-right whitespace-nowrap"><Button size="icon" variant="ghost" onClick={() => setForm(d)} aria-label="Editar despesa"><Pencil className="size-4" /></Button><Button size="icon" variant="ghost" onClick={() => setExcluir(d)} aria-label="Excluir despesa"><Trash2 className="size-4 text-destructive" /></Button></td></tr>)}</tbody></table> : <div className="px-6 py-10 text-center"><span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-accent text-primary"><PiggyBank className="size-5" /></span><p className="mt-3 text-sm font-semibold">Nenhuma despesa lançada</p><p className="mt-1 text-xs text-muted-foreground">Cadastre materiais, aluguel e outros custos para acompanhar seu lucro real.</p></div>}
      </Card>

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

      <Dialog open={!!form} onOpenChange={(open) => !open && setForm(null)}><DialogContent className="rounded-xl sm:max-w-lg"><DialogHeader><DialogTitle>{form?.id ? "Editar despesa" : "Nova despesa"}</DialogTitle></DialogHeader>{form && <div className="grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><Label>Descrição</Label><Input value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="Ex.: Kit de esmaltes" /></div><div><Label>Categoria</Label><select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value as CategoriaDespesa })} className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">{(["Materiais", "Aluguel", "Marketing", "Taxas", "Outros"] as CategoriaDespesa[]).map((c) => <option key={c}>{c}</option>)}</select></div><div><Label>Data</Label><Input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} /></div><div className="sm:col-span-2"><Label>Valor (R$)</Label><Input type="number" min="0" step="0.01" value={form.valor} onChange={(e) => setForm({ ...form, valor: Number(e.target.value) })} /></div><div className="sm:col-span-2"><Label>Observações</Label><Textarea value={form.observacoes} onChange={(e) => setForm({ ...form, observacoes: e.target.value })} /></div></div>}<DialogFooter><Button variant="outline" onClick={() => setForm(null)}>Cancelar</Button><Button onClick={() => { if (!form?.descricao.trim() || form.valor <= 0) { toast.error("Informe a descrição e um valor maior que zero"); return; } salvarDespesa(form); setForm(null); toast.success("Despesa salva"); }}>Salvar despesa</Button></DialogFooter></DialogContent></Dialog>
      <AlertDialog open={!!excluir} onOpenChange={(open) => !open && setExcluir(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir esta despesa?</AlertDialogTitle><AlertDialogDescription>O lançamento de {excluir?.descricao} será removido do cálculo de lucro.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => { if (!excluir) return; removerDespesa(excluir.id); setExcluir(null); toast.success("Despesa removida"); }}>Excluir despesa</AlertDialogAction></AlertDialogFooter></AlertDialog>
    </AppLayout>
  );
}
