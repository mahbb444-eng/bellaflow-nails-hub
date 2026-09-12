import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppLayout, Card } from "@/components/AppLayout";
import { StatusBadge } from "@/components/StatusBadge";
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
import { useBella } from "@/lib/bella-store";
import { brl, dataBR, toISO, type Agendamento, type Status } from "@/lib/bella-data";
import { inicioDaSemana } from "@/lib/bella-metrics";
import { cn } from "@/lib/utils";
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

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda — BellaFlow" },
      {
        name: "description",
        content: "Visualize sua semana, crie agendamentos e marque atendimentos como realizados.",
      },
      { property: "og:title", content: "Agenda — BellaFlow" },
      { property: "og:description", content: "Sua semana de atendimentos, organizada e elegante." },
    ],
  }),
  component: AgendaPage,
});

const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const STATUS: Status[] = ["Agendado", "Confirmado", "Realizado", "Cancelado"];
const SLOTS = ["08:00", "09:00", "10:30", "13:00", "14:30", "16:00", "17:30", "19:00"];

function AgendaPage() {
  const {
    clientes,
    servicos,
    agendamentos,
    hoje,
    nomeCliente,
    salvarAgendamento,
    removerAgendamento,
    marcarRealizado,
  } = useBella();
  const [modo, setModo] = useState<"semana" | "dia">("semana");
  const [offset, setOffset] = useState(0);
  const [form, setForm] = useState<(Omit<Agendamento, "id"> & { id?: string }) | null>(null);
  const [excluir, setExcluir] = useState<Agendamento | null>(null);

  const base = useMemo(() => {
    const d = new Date(hoje + "T00:00:00");
    d.setDate(d.getDate() + offset * (modo === "semana" ? 7 : 1));
    return d;
  }, [hoje, offset, modo]);

  const dias = useMemo(() => {
    if (modo === "dia") return [toISO(base)];
    const ini = inicioDaSemana(base);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(ini);
      d.setDate(ini.getDate() + i);
      return toISO(d);
    });
  }, [base, modo]);

  const novo = (data: string, hora: string) =>
    setForm({
      clienteId: clientes[0]?.id ?? "",
      servico: servicos[0]?.nome ?? "",
      data,
      hora,
      duracao: servicos[0]?.duracao ?? 60,
      valor: servicos[0]?.preco ?? 0,
      observacoes: "",
      status: "Agendado",
    });

  const periodo =
    modo === "dia"
      ? dataBR(dias[0]!)
      : `${dataBR(dias[0]!)} — ${dataBR(dias[dias.length - 1]!)}`;

  return (
    <AppLayout
      titulo="Agenda"
      descricao={periodo}
      acoes={
          <div className="flex flex-wrap items-center justify-end gap-2">
          <div className="flex rounded-lg border border-border bg-card p-1">
            {(["semana", "dia"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setModo(m);
                  setOffset(0);
                }}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
                  modo === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent",
                )}
              >
                {m}
              </button>
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={() => setOffset((o) => o - 1)}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setOffset((o) => o + 1)}>
            <ChevronRight className="size-4" />
          </Button>
          <Button onClick={() => novo(dias[0]!, "09:00")}>
            <Plus className="size-4" /> Novo agendamento
          </Button>
        </div>
      }
    >
      <div
        className={cn(
          "grid gap-4",
          modo === "semana" ? "md:grid-cols-2 xl:grid-cols-4" : "max-w-2xl grid-cols-1",
        )}
      >
        {dias.map((dia) => {
          const doDia = agendamentos
            .filter((a) => a.data === dia)
            .sort((a, b) => a.hora.localeCompare(b.hora));
          const d = new Date(dia + "T00:00:00");
          return (
            <Card key={dia} className={cn("p-4", dia === hoje && "border-primary/40 ring-2 ring-primary/10")}>
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg font-semibold">
                  {DIAS[d.getDay()]} {d.getDate()}
                </h2>
                {dia === hoje && <span className="text-xs text-primary">hoje</span>}
              </div>
              <div className="mt-3 space-y-2">
                {(modo === "dia" ? SLOTS : []).map((slot) =>
                  doDia.some((a) => a.hora === slot) ? null : (
                    <button
                      key={slot}
                      onClick={() => novo(dia, slot)}
                      className="w-full rounded-xl border border-dashed border-border px-4 py-2 text-left text-xs text-muted-foreground hover:bg-nude/40"
                    >
                      {slot} · livre
                    </button>
                  ),
                )}
                {doDia.map((a) => (
                    <div key={a.id} className={cn("rounded-lg border-l-4 bg-nude/55 p-3", a.status === "Confirmado" && "border-l-primary", a.status === "Agendado" && "border-l-gold", a.status === "Realizado" && "border-l-chart-4", a.status === "Cancelado" && "border-l-destructive opacity-65")}>
                    <div className="flex items-start justify-between gap-2">
                      <button
                        onClick={() => setForm(a)}
                        className="min-w-0 text-left"
                        aria-label="Editar agendamento"
                      >
                        <p className="text-xs text-muted-foreground">
                          {a.hora} · {a.duracao}min
                        </p>
                        <p className="truncate text-sm font-medium">{nomeCliente(a.clienteId)}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {a.servico} · {brl(a.valor)}
                        </p>
                      </button>
                      <StatusBadge status={a.status} />
                    </div>
                    <div className="mt-2 flex gap-2">
                      {a.status !== "Realizado" && a.status !== "Cancelado" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => {
                            marcarRealizado(a.id);
                            toast.success("Atendimento registrado no histórico");
                          }}
                        >
                          Marcar realizado
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-7"
                        onClick={() => setExcluir(a)}
                        aria-label="Excluir agendamento"
                      >
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
                {doDia.length === 0 && modo === "semana" && (
                  <button
                    onClick={() => novo(dia, "09:00")}
                    className="w-full rounded-xl border border-dashed border-border px-4 py-6 text-xs text-muted-foreground hover:bg-nude/40"
                  >
                    Sem agendamentos — clique para criar
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!form} onOpenChange={(o) => !o && setForm(null)}>
        <DialogContent className="rounded-2xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{form?.id ? "Editar agendamento" : "Novo agendamento"}</DialogTitle>
          </DialogHeader>
          {form && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label>Cliente</Label>
                <select
                  value={form.clienteId}
                  onChange={(e) => setForm({ ...form, clienteId: e.target.value })}
                  className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                >
                  {clientes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label>Serviço</Label>
                <select
                  value={form.servico}
                  onChange={(e) => {
                    const s = servicos.find((x) => x.nome === e.target.value);
                    setForm({
                      ...form,
                      servico: e.target.value,
                      valor: s?.preco ?? form.valor,
                      duracao: s?.duracao ?? form.duracao,
                    });
                  }}
                  className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                >
                  {servicos.map((s) => (
                    <option key={s.id} value={s.nome}>
                      {s.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Data</Label>
                <Input
                  type="date"
                  value={form.data}
                  onChange={(e) => setForm({ ...form, data: e.target.value })}
                />
              </div>
              <div>
                <Label>Horário</Label>
                <Input
                  type="time"
                  value={form.hora}
                  onChange={(e) => setForm({ ...form, hora: e.target.value })}
                />
              </div>
              <div>
                <Label>Duração (min)</Label>
                <Input
                  type="number"
                  value={form.duracao}
                  onChange={(e) => setForm({ ...form, duracao: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Valor (R$)</Label>
                <Input
                  type="number"
                  value={form.valor}
                  onChange={(e) => setForm({ ...form, valor: Number(e.target.value) })}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Status</Label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
                  className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                >
                  {STATUS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
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
                if (!form) return;
                if (!form.clienteId) {
                  toast.error("Cadastre uma cliente primeiro");
                  return;
                }
                salvarAgendamento(form);
                setForm(null);
                toast.success("Agendamento salvo");
              }}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={!!excluir} onOpenChange={(open) => !open && setExcluir(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Excluir este agendamento?</AlertDialogTitle><AlertDialogDescription>O horário de {excluir?.hora} será removido da agenda. Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => { if (!excluir) return; removerAgendamento(excluir.id); setExcluir(null); toast.success("Agendamento removido"); }}>Excluir agendamento</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
