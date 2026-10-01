import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppLayout, Card } from "@/components/AppLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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

export const Route = createFileRoute("/_authenticated/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda — BellaFlow" },
      {
        name: "description",
        content: "Visualize sua semana, crie agendamentos e marque atendimentos como realizados.",
      },
      { property: "og:title", content: "Agenda — BellaFlow" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "Sua semana de atendimentos, organizada e elegante." },
    ],
  }),
  component: AgendaPage,
});

const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const STATUS: Status[] = ["Agendado", "Confirmado", "Realizado", "Cancelado"];
const SLOTS = ["08:00", "09:00", "10:30", "13:00", "14:30", "16:00", "17:30", "19:00"];

const minutos = (hora: string) => {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(hora)) return NaN;
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
};

const horarioTermino = (inicio: string, duracao: number) => {
  const total = minutos(inicio) + duracao;
  if (!Number.isFinite(total) || total < 0 || total >= 24 * 60) return "";
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
};

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
  const [modo, setModo] = useState<"mês" | "semana" | "dia">("mês");
  const [offset, setOffset] = useState(0);
  const [diaSelecionado, setDiaSelecionado] = useState(hoje);
  const [form, setForm] = useState<(Omit<Agendamento, "id"> & { id?: string }) | null>(null);
  const [termino, setTermino] = useState("");
  const [excluir, setExcluir] = useState<Agendamento | null>(null);

  const base = useMemo(() => {
    const d = new Date(hoje + "T00:00:00");
    if (modo === "mês") return new Date(d.getFullYear(), d.getMonth() + offset, 1);
    d.setDate(d.getDate() + offset * (modo === "semana" ? 7 : 1));
    return d;
  }, [hoje, offset, modo]);

  const dias = useMemo(() => {
    if (modo === "mês") return [diaSelecionado];
    if (modo === "dia") return [toISO(base)];
    const ini = inicioDaSemana(base);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(ini);
      d.setDate(ini.getDate() + i);
      return toISO(d);
    });
  }, [base, modo, diaSelecionado]);

  const agendamentosDoDia = agendamentos
    .filter((a) => a.data === diaSelecionado)
    .sort((a, b) => a.hora.localeCompare(b.hora));
  const horariosDoDia = [...new Set([...SLOTS, ...agendamentosDoDia.map((a) => a.hora)])].sort();
  const diasComAgendamento = new Set(agendamentos.map((a) => a.data));

  const mudarMes = (mes: Date) => {
    const hojeData = new Date(hoje + "T00:00:00");
    setOffset((mes.getFullYear() - hojeData.getFullYear()) * 12 + mes.getMonth() - hojeData.getMonth());
    setDiaSelecionado(toISO(new Date(mes.getFullYear(), mes.getMonth(), 1)));
  };

  const novo = (data: string, hora: string) => {
    const duracao = servicos[0]?.duracao ?? 60;
    setTermino(horarioTermino(hora, duracao));
    setForm({
      clienteId: clientes[0]?.id ?? "",
      servico: servicos[0]?.nome ?? "",
      data,
      hora,
      duracao,
      valor: servicos[0]?.preco ?? 0,
      observacoes: "",
      status: "Agendado",
    });
  };

  const editar = (agendamento: Agendamento) => {
    setTermino(horarioTermino(agendamento.hora, agendamento.duracao));
    setForm(agendamento);
  };

  const periodo =
    modo === "mês"
      ? base.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
      : modo === "dia"
      ? dataBR(dias[0]!)
      : `${dataBR(dias[0]!)} — ${dataBR(dias[dias.length - 1]!)}`;

  return (
    <AppLayout
      titulo="Agenda"
      descricao={periodo}
      acoes={
          <div className="flex flex-wrap items-center justify-end gap-2">
          <div className="flex rounded-lg border border-border bg-card p-1">
            {(["mês", "semana", "dia"] as const).map((m) => (
              <Button
                key={m}
                variant="ghost"
                size="sm"
                onClick={() => {
                  setModo(m);
                  setOffset(0);
                  setDiaSelecionado(hoje);
                }}
                className={cn(
                  "h-8 rounded-md px-3 text-xs capitalize",
                  modo === m ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {m}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="icon" aria-label={modo === "mês" ? "Mês anterior" : "Período anterior"} onClick={() => modo === "mês" ? mudarMes(new Date(base.getFullYear(), base.getMonth() - 1, 1)) : setOffset((o) => o - 1)}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label={modo === "mês" ? "Próximo mês" : "Próximo período"} onClick={() => modo === "mês" ? mudarMes(new Date(base.getFullYear(), base.getMonth() + 1, 1)) : setOffset((o) => o + 1)}>
            <ChevronRight className="size-4" />
          </Button>
          <Button onClick={() => novo(dias[0]!, modo === "mês" ? SLOTS.find((slot) => !agendamentosDoDia.some((a) => a.hora === slot)) ?? "09:00" : "09:00")}>
            <Plus className="size-4" /> Novo agendamento
          </Button>
        </div>
      }
    >
      {modo === "mês" && (
        <div className="grid gap-5 xl:grid-cols-[minmax(0,430px)_minmax(0,1fr)]">
          <Card className="min-w-0 p-3 sm:p-5">
            <Calendar
              mode="single"
              month={base}
              onMonthChange={mudarMes}
              selected={new Date(diaSelecionado + "T00:00:00")}
              onSelect={(date) => date && setDiaSelecionado(toISO(date))}
              locale={ptBR}
              showOutsideDays={false}
              modifiers={{ booked: (date) => diasComAgendamento.has(toISO(date)) }}
              modifiersClassNames={{ booked: "[&>button]:relative [&>button]:after:absolute [&>button]:after:bottom-0.5 [&>button]:after:size-1 [&>button]:after:rounded-full [&>button]:after:bg-primary data-[selected=true]:[&>button]:after:bg-primary-foreground" }}
              className="w-full bg-transparent p-0 [--cell-size:clamp(2rem,7vw,2.75rem)] [&_.rdp-months]:w-full [&_.rdp-month]:w-full"
            />
            <p className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-xs text-muted-foreground"><span className="size-1.5 rounded-full bg-primary" /> Dia com agendamento</p>
          </Card>
          <div className="min-w-0">
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <h2 className="font-display text-lg font-semibold capitalize">{new Date(diaSelecionado + "T00:00:00").toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}</h2>
              <span className="shrink-0 text-xs text-muted-foreground">{agendamentosDoDia.length} {agendamentosDoDia.length === 1 ? "agendamento" : "agendamentos"}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 2xl:grid-cols-4">
              {horariosDoDia.map((hora) => {
                const ocupante = agendamentosDoDia.find((a) => a.hora === hora);
                return (
                  <Button
                    key={hora}
                    variant="outline"
                    aria-label={ocupante ? `${hora} ocupado, editar agendamento de ${nomeCliente(ocupante.clienteId)}` : `${hora} disponível`}
                    aria-pressed={form?.data === diaSelecionado && form?.hora === hora}
                    onClick={() => ocupante ? editar(ocupante) : novo(diaSelecionado, hora)}
                    className={cn(
                      "h-16 min-w-0 flex-col items-start gap-0.5 px-3 text-left text-xs",
                      ocupante ? "border-primary/25 bg-accent/60 hover:bg-accent" : "border-border hover:border-primary/40",
                      form?.data === diaSelecionado && form?.hora === hora && "ring-2 ring-primary",
                    )}
                  >
                    <span className="text-sm font-semibold">{hora}</span>
                    <span className="max-w-full truncate font-normal text-muted-foreground">{ocupante ? `Ocupado · ${nomeCliente(ocupante.clienteId)}` : "Disponível"}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {modo !== "mês" && (
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
                          onClick={() => editar(a)}
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
      )}

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
                    setTermino(horarioTermino(form.hora, s?.duracao ?? form.duracao));
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
                <Label htmlFor="hora-inicio">Horário de início</Label>
                <Input
                  id="hora-inicio"
                  type="time"
                  step="60"
                  value={form.hora}
                  onChange={(e) => {
                    const hora = e.target.value;
                    const duracao = minutos(termino) - minutos(hora);
                    setForm({ ...form, hora, duracao: duracao > 0 ? duracao : form.duracao });
                  }}
                />
              </div>
              <div>
                <Label htmlFor="hora-termino">Horário de término</Label>
                <Input
                  id="hora-termino"
                  type="time"
                  step="60"
                  value={termino}
                  onChange={(e) => {
                    const hora = e.target.value;
                    const duracao = minutos(hora) - minutos(form.hora);
                    setTermino(hora);
                    if (duracao > 0) setForm({ ...form, duracao });
                  }}
                />
              </div>
              <div>
                <Label>Duração (min)</Label>
                <Input
                  type="number"
                  value={form.duracao}
                  onChange={(e) => {
                    const duracao = Number(e.target.value);
                    setForm({ ...form, duracao });
                    setTermino(horarioTermino(form.hora, duracao));
                  }}
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
                if (!Number.isFinite(minutos(form.hora)) || !Number.isFinite(minutos(termino)) || minutos(termino) <= minutos(form.hora)) {
                  toast.error("Informe horários válidos: o término deve ser após o início");
                  return;
                }
                const duracao = minutos(termino) - minutos(form.hora);
                if (agendamentos.some((a) => a.id !== form.id && a.data === form.data && a.status !== "Cancelado" && form.status !== "Cancelado" && minutos(form.hora) < minutos(a.hora) + a.duracao && minutos(a.hora) < minutos(termino))) {
                  toast.error("Este horário conflita com outro agendamento");
                  return;
                }
                salvarAgendamento({ ...form, duracao });
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
