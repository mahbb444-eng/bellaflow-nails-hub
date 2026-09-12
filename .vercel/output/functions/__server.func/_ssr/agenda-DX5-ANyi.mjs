import { i as __toESM } from "../_runtime.mjs";
import { D as require_jsx_runtime, O as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as dataBR, c as useBella, i as brl, o as toISO } from "./bella-store-DnYRuEPP.mjs";
import { r as cn, t as Button } from "./button-BoWAuMqT.mjs";
import { E as ChevronLeft, T as ChevronRight, f as Plus, s as Trash2 } from "../_libs/lucide-react.mjs";
import { n as Card, t as AppLayout } from "./AppLayout-DKPDuPqH.mjs";
import { t as StatusBadge } from "./StatusBadge-sk6xU0ks.mjs";
import { n as inicioDaSemana } from "./bella-metrics-DrdByzhS.mjs";
import { n as Label, t as Input } from "./label-BMq4SpPA.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, d as DialogFooter, f as DialogHeader, i as AlertDialogContent, l as Dialog, m as Textarea, n as AlertDialogAction, o as AlertDialogFooter, p as DialogTitle, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog, u as DialogContent } from "./alert-dialog--KVQC1BC.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agenda-DX5-ANyi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DIAS = [
	"Dom",
	"Seg",
	"Ter",
	"Qua",
	"Qui",
	"Sex",
	"Sáb"
];
var STATUS = [
	"Agendado",
	"Confirmado",
	"Realizado",
	"Cancelado"
];
var SLOTS = [
	"08:00",
	"09:00",
	"10:30",
	"13:00",
	"14:30",
	"16:00",
	"17:30",
	"19:00"
];
function AgendaPage() {
	const { clientes, servicos, agendamentos, hoje, nomeCliente, salvarAgendamento, removerAgendamento, marcarRealizado } = useBella();
	const [modo, setModo] = (0, import_react.useState)("semana");
	const [offset, setOffset] = (0, import_react.useState)(0);
	const [form, setForm] = (0, import_react.useState)(null);
	const [excluir, setExcluir] = (0, import_react.useState)(null);
	const base = (0, import_react.useMemo)(() => {
		const d = /* @__PURE__ */ new Date(hoje + "T00:00:00");
		d.setDate(d.getDate() + offset * (modo === "semana" ? 7 : 1));
		return d;
	}, [
		hoje,
		offset,
		modo
	]);
	const dias = (0, import_react.useMemo)(() => {
		if (modo === "dia") return [toISO(base)];
		const ini = inicioDaSemana(base);
		return Array.from({ length: 7 }, (_, i) => {
			const d = new Date(ini);
			d.setDate(ini.getDate() + i);
			return toISO(d);
		});
	}, [base, modo]);
	const novo = (data, hora) => setForm({
		clienteId: clientes[0]?.id ?? "",
		servico: servicos[0]?.nome ?? "",
		data,
		hora,
		duracao: servicos[0]?.duracao ?? 60,
		valor: servicos[0]?.preco ?? 0,
		observacoes: "",
		status: "Agendado"
	});
	const periodo = modo === "dia" ? dataBR(dias[0]) : `${dataBR(dias[0])} — ${dataBR(dias[dias.length - 1])}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		titulo: "Agenda",
		descricao: periodo,
		acoes: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-end gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex rounded-lg border border-border bg-card p-1",
					children: ["semana", "dia"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setModo(m);
							setOffset(0);
						},
						className: cn("rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-colors", modo === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"),
						children: m
					}, m))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "icon",
					onClick: () => setOffset((o) => o - 1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "icon",
					onClick: () => setOffset((o) => o + 1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => novo(dias[0], "09:00"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Novo agendamento"]
				})
			]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("grid gap-4", modo === "semana" ? "md:grid-cols-2 xl:grid-cols-4" : "max-w-2xl grid-cols-1"),
				children: dias.map((dia) => {
					const doDia = agendamentos.filter((a) => a.data === dia).sort((a, b) => a.hora.localeCompare(b.hora));
					const d = /* @__PURE__ */ new Date(dia + "T00:00:00");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: cn("p-4", dia === hoje && "border-primary/40 ring-2 ring-primary/10"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-lg font-semibold",
								children: [
									DIAS[d.getDay()],
									" ",
									d.getDate()
								]
							}), dia === hoje && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-primary",
								children: "hoje"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-2",
							children: [
								(modo === "dia" ? SLOTS : []).map((slot) => doDia.some((a) => a.hora === slot) ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => novo(dia, slot),
									className: "w-full rounded-xl border border-dashed border-border px-4 py-2 text-left text-xs text-muted-foreground hover:bg-nude/40",
									children: [slot, " · livre"]
								}, slot)),
								doDia.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("rounded-lg border-l-4 bg-nude/55 p-3", a.status === "Confirmado" && "border-l-primary", a.status === "Agendado" && "border-l-gold", a.status === "Realizado" && "border-l-chart-4", a.status === "Cancelado" && "border-l-destructive opacity-65"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setForm(a),
											className: "min-w-0 text-left",
											"aria-label": "Editar agendamento",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted-foreground",
													children: [
														a.hora,
														" · ",
														a.duracao,
														"min"
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "truncate text-sm font-medium",
													children: nomeCliente(a.clienteId)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "truncate text-xs text-muted-foreground",
													children: [
														a.servico,
														" · ",
														brl(a.valor)
													]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.status })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex gap-2",
										children: [a.status !== "Realizado" && a.status !== "Cancelado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											className: "h-7 text-xs",
											onClick: () => {
												marcarRealizado(a.id);
												toast.success("Atendimento registrado no histórico");
											},
											children: "Marcar realizado"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											className: "size-7",
											onClick: () => setExcluir(a),
											"aria-label": "Excluir agendamento",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 text-destructive" })
										})]
									})]
								}, a.id)),
								doDia.length === 0 && modo === "semana" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => novo(dia, "09:00"),
									className: "w-full rounded-xl border border-dashed border-border px-4 py-6 text-xs text-muted-foreground hover:bg-nude/40",
									children: "Sem agendamentos — clique para criar"
								})
							]
						})]
					}, dia);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!form,
				onOpenChange: (o) => !o && setForm(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "rounded-2xl sm:max-w-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: form?.id ? "Editar agendamento" : "Novo agendamento" }) }),
						form && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cliente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: form.clienteId,
										onChange: (e) => setForm({
											...form,
											clienteId: e.target.value
										}),
										className: "mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm",
										children: clientes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c.id,
											children: c.nome
										}, c.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Serviço" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: form.servico,
										onChange: (e) => {
											const s = servicos.find((x) => x.nome === e.target.value);
											setForm({
												...form,
												servico: e.target.value,
												valor: s?.preco ?? form.valor,
												duracao: s?.duracao ?? form.duracao
											});
										},
										className: "mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm",
										children: servicos.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: s.nome,
											children: s.nome
										}, s.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Data" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: form.data,
									onChange: (e) => setForm({
										...form,
										data: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Horário" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "time",
									value: form.hora,
									onChange: (e) => setForm({
										...form,
										hora: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Duração (min)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: form.duracao,
									onChange: (e) => setForm({
										...form,
										duracao: Number(e.target.value)
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Valor (R$)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: form.valor,
									onChange: (e) => setForm({
										...form,
										valor: Number(e.target.value)
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: form.status,
										onChange: (e) => setForm({
											...form,
											status: e.target.value
										}),
										className: "mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm",
										children: STATUS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Observações" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										value: form.observacoes,
										onChange: (e) => setForm({
											...form,
											observacoes: e.target.value
										})
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setForm(null),
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								if (!form) return;
								if (!form.clienteId) {
									toast.error("Cadastre uma cliente primeiro");
									return;
								}
								salvarAgendamento(form);
								setForm(null);
								toast.success("Agendamento salvo");
							},
							children: "Salvar"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!excluir,
				onOpenChange: (open) => !open && setExcluir(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Excluir este agendamento?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
					"O horário de ",
					excluir?.hora,
					" será removido da agenda. Esta ação não pode ser desfeita."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					onClick: () => {
						if (!excluir) return;
						removerAgendamento(excluir.id);
						setExcluir(null);
						toast.success("Agendamento removido");
					},
					children: "Excluir agendamento"
				})] })] })
			})
		]
	});
}
//#endregion
export { AgendaPage as component };
