import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CalendarClock, Pencil, Plus, Search, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppLayout, Card } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useBella } from "@/lib/bella-store";
import { brl, dataBR, type Cliente } from "@/lib/bella-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/clientes")({
  validateSearch: (search: Record<string, unknown>) => ({
    cliente: typeof search["cliente"] === "string" ? search["cliente"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Clientes — BellaFlow" },
      {
        name: "description",
        content: "Cadastro completo das suas clientes com histórico de atendimentos e total gasto.",
      },
      { property: "og:title", content: "Clientes — BellaFlow" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "Gerencie suas clientes com carinho e organização." },
    ],
  }),
  component: ClientesPage,
});

const vazio: Omit<Cliente, "id"> = {
  nome: "",
  telefone: "",
  instagram: "",
  nascimento: "",
  preferencia: "",
  observacoes: "",
};

function ClientesPage() {
  const { clientes, atendimentos, salvarCliente, removerCliente } = useBella();
  const [busca, setBusca] = useState("");
  const [form, setForm] = useState<(Omit<Cliente, "id"> & { id?: string }) | null>(null);
  const [detalhe, setDetalhe] = useState<Cliente | null>(null);
  const [excluir, setExcluir] = useState<Cliente | null>(null);
  const { cliente: clienteBusca } = Route.useSearch();

  useEffect(() => {
    if (!clienteBusca) return;
    setDetalhe(clientes.find((cliente) => cliente.id === clienteBusca) ?? null);
  }, [clienteBusca, clientes]);

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return clientes.filter(
      (c) =>
        !q ||
        c.nome.toLowerCase().includes(q) ||
        c.telefone.includes(q) ||
        c.instagram.toLowerCase().includes(q),
    );
  }, [clientes, busca]);

  const historico = detalhe
    ? atendimentos
        .filter((a) => a.clienteId === detalhe.id)
        .sort((a, b) => b.data.localeCompare(a.data))
    : [];
  const totalGasto = historico.reduce((s, a) => s + a.valor, 0);
  const ultimo = historico[0];
  const servicoMaisUsado = historico.reduce<Record<string, number>>((acc, item) => {
    acc[item.servico] = (acc[item.servico] ?? 0) + 1;
    return acc;
  }, {});
  const favorito = Object.entries(servicoMaisUsado).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  const resumoCliente = (id: string) => {
    const itens = atendimentos.filter((a) => a.clienteId === id).sort((a, b) => b.data.localeCompare(a.data));
    return { ultimo: itens[0], total: itens.reduce((s, a) => s + a.valor, 0) };
  };

  return (
    <AppLayout
      titulo="Clientes"
      descricao="Tudo sobre quem senta na sua cadeira."
      acoes={
        <Button onClick={() => setForm(vazio)} className="rounded-xl">
          <Plus className="size-4" /> Nova cliente
        </Button>
      }
    >
      <Card className="p-0">
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, telefone ou instagram"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs tracking-wider text-muted-foreground uppercase">
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium">Telefone</th>
                <th className="hidden px-5 py-3 font-medium md:table-cell">Instagram</th>
                <th className="hidden px-5 py-3 font-medium lg:table-cell">Última visita · gasto</th>
                <th className="px-5 py-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setDetalhe(c)}
                  className="cursor-pointer border-t border-border transition-colors hover:bg-accent/40"
                >
                  <td className="px-5 py-4"><div className="flex items-center gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary">{c.nome.split(" ").slice(0, 2).map((n) => n[0]).join("")}</span><div><p className="font-semibold">{c.nome}</p><span className={cn("text-[11px] font-semibold", resumoCliente(c.id).ultimo ? "text-primary" : "text-muted-foreground")}>{resumoCliente(c.id).ultimo ? "Ativa" : "Nova"}</span></div></div></td>
                  <td className="px-5 py-4 text-muted-foreground">{c.telefone}</td>
                  <td className="hidden px-5 py-4 text-muted-foreground md:table-cell">
                    {c.instagram}
                  </td>
                  <td className="hidden px-5 py-4 text-muted-foreground lg:table-cell"><p>{resumoCliente(c.id).ultimo ? dataBR(resumoCliente(c.id).ultimo?.data ?? "") : "—"}</p><p className="text-xs text-primary">{brl(resumoCliente(c.id).total)}</p></td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setForm(c);
                      }}
                      aria-label="Editar"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExcluir(c);
                      }}
                      aria-label="Excluir"
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
              {lista.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                    Nenhuma cliente encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={!!form} onOpenChange={(o) => !o && setForm(null)}>
        <DialogContent className="rounded-2xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{form?.id ? "Editar cliente" : "Nova cliente"}</DialogTitle>
          </DialogHeader>
          {form && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label>Nome</Label>
                <Input
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
              </div>
              <div>
                <Label>Telefone</Label>
                <Input
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                />
              </div>
              <div>
                <Label>Instagram</Label>
                <Input
                  value={form.instagram}
                  onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                />
              </div>
              <div>
                <Label>Nascimento</Label>
                <Input
                  type="date"
                  value={form.nascimento}
                  onChange={(e) => setForm({ ...form, nascimento: e.target.value })}
                />
              </div>
              <div>
                <Label>Preferência de serviço</Label>
                <Input
                  value={form.preferencia}
                  onChange={(e) => setForm({ ...form, preferencia: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Observações</Label>
                <Textarea
                  value={form.observacoes}
                  onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setForm(null)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                if (!form?.nome.trim()) {
                  toast.error("Informe o nome da cliente");
                  return;
                }
                salvarCliente(form);
                setForm(null);
                toast.success("Cliente salva");
              }}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={!!detalhe} onOpenChange={(o) => !o && setDetalhe(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display text-2xl">{detalhe?.nome}</SheetTitle>
          </SheetHeader>
          {detalhe && (
            <div className="space-y-6 px-4 pb-8">
              <div className="rounded-2xl bg-nude/60 p-4 text-sm">
                <p>{detalhe.telefone}</p>
                <p className="text-muted-foreground">{detalhe.instagram}</p>
                <p className="text-muted-foreground">
                  Nascimento: {detalhe.nascimento ? dataBR(detalhe.nascimento) : "—"}
                </p>
                <p className="text-muted-foreground">Preferência: {detalhe.preferencia || "—"}</p>
                {detalhe.observacoes && <p className="mt-2 italic">{detalhe.observacoes}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs text-muted-foreground uppercase">Total gasto</p>
                  <p className="font-display text-2xl font-semibold">{brl(totalGasto)}</p>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs text-muted-foreground uppercase">Atendimentos</p>
                  <p className="font-display text-2xl font-semibold">{historico.length}</p>
                </div>
                <div className="rounded-xl border border-border p-4"><CalendarClock className="mb-2 size-4 text-primary" /><p className="text-xs text-muted-foreground uppercase">Última visita</p><p className="mt-1 text-sm font-semibold">{ultimo ? dataBR(ultimo.data) : "—"}</p></div>
                <div className="rounded-xl border border-border p-4"><Sparkles className="mb-2 size-4 text-primary" /><p className="text-xs text-muted-foreground uppercase">Mais usado</p><p className="mt-1 truncate text-sm font-semibold">{favorito}</p></div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Histórico</h3>
                <div className="mt-3 space-y-2">
                  {historico.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm"
                    >
                      <div>
                        <p className="font-medium">{a.servico}</p>
                        <p className="text-xs text-muted-foreground">
                          {dataBR(a.data)} · {a.hora}
                        </p>
                      </div>
                      <span className="text-primary">{brl(a.valor)}</span>
                    </div>
                  ))}
                  {historico.length === 0 && (
                    <p className="text-sm text-muted-foreground">Sem atendimentos registrados.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!excluir} onOpenChange={(open) => !open && setExcluir(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Excluir esta cliente?</AlertDialogTitle><AlertDialogDescription>O cadastro de {excluir?.nome} será removido. Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => { if (!excluir) return; removerCliente(excluir.id); setExcluir(null); toast.success("Cliente removida"); }}>Excluir cliente</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
