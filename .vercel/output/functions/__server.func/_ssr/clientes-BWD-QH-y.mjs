import { i as __toESM } from "../_runtime.mjs";
import { D as require_jsx_runtime, O as require_react, d as DialogContent, f as DialogDescription, h as DialogTitle, l as Dialog, m as DialogPortal, p as DialogOverlay, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as dataBR, c as useBella, i as brl } from "./bella-store-DnYRuEPP.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn, t as Button } from "./button-BoWAuMqT.mjs";
import { O as CalendarClock, c as Sparkles, f as Plus, m as Pencil, s as Trash2, t as X, u as Search } from "../_libs/lucide-react.mjs";
import { n as Card, t as AppLayout } from "./AppLayout-DKPDuPqH.mjs";
import { n as Label, t as Input } from "./label-BMq4SpPA.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, d as DialogFooter, f as DialogHeader, i as AlertDialogContent, l as Dialog$1, m as Textarea, n as AlertDialogAction, o as AlertDialogFooter, p as DialogTitle$1, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog, u as DialogContent$1 } from "./alert-dialog--KVQC1BC.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./clientes-CXsV7n5I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clientes-BWD-QH-y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var vazio = {
	nome: "",
	telefone: "",
	instagram: "",
	nascimento: "",
	preferencia: "",
	observacoes: ""
};
function ClientesPage() {
	const { clientes, atendimentos, salvarCliente, removerCliente } = useBella();
	const [busca, setBusca] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)(null);
	const [detalhe, setDetalhe] = (0, import_react.useState)(null);
	const [excluir, setExcluir] = (0, import_react.useState)(null);
	const { cliente: clienteBusca } = Route.useSearch();
	(0, import_react.useEffect)(() => {
		if (!clienteBusca) return;
		setDetalhe(clientes.find((cliente) => cliente.id === clienteBusca) ?? null);
	}, [clienteBusca, clientes]);
	const lista = (0, import_react.useMemo)(() => {
		const q = busca.trim().toLowerCase();
		return clientes.filter((c) => !q || c.nome.toLowerCase().includes(q) || c.telefone.includes(q) || c.instagram.toLowerCase().includes(q));
	}, [clientes, busca]);
	const historico = detalhe ? atendimentos.filter((a) => a.clienteId === detalhe.id).sort((a, b) => b.data.localeCompare(a.data)) : [];
	const totalGasto = historico.reduce((s, a) => s + a.valor, 0);
	const ultimo = historico[0];
	const servicoMaisUsado = historico.reduce((acc, item) => {
		acc[item.servico] = (acc[item.servico] ?? 0) + 1;
		return acc;
	}, {});
	const favorito = Object.entries(servicoMaisUsado).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
	const resumoCliente = (id) => {
		const itens = atendimentos.filter((a) => a.clienteId === id).sort((a, b) => b.data.localeCompare(a.data));
		return {
			ultimo: itens[0],
			total: itens.reduce((s, a) => s + a.valor, 0)
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		titulo: "Clientes",
		descricao: "Tudo sobre quem senta na sua cadeira.",
		acoes: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: () => setForm(vazio),
			className: "rounded-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Nova cliente"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: busca,
						onChange: (e) => setBusca(e.target.value),
						placeholder: "Buscar por nome, telefone ou instagram",
						className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-left text-xs tracking-wider text-muted-foreground uppercase",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 font-medium",
									children: "Cliente"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 font-medium",
									children: "Telefone"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "hidden px-5 py-3 font-medium md:table-cell",
									children: "Instagram"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "hidden px-5 py-3 font-medium lg:table-cell",
									children: "Última visita · gasto"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 text-right font-medium",
									children: "Ações"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [lista.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							onClick: () => setDetalhe(c),
							className: "cursor-pointer border-t border-border transition-colors hover:bg-accent/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary",
											children: c.nome.split(" ").slice(0, 2).map((n) => n[0]).join("")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold",
											children: c.nome
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("text-[11px] font-semibold", resumoCliente(c.id).ultimo ? "text-primary" : "text-muted-foreground"),
											children: resumoCliente(c.id).ultimo ? "Ativa" : "Nova"
										})] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-4 text-muted-foreground",
									children: c.telefone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "hidden px-5 py-4 text-muted-foreground md:table-cell",
									children: c.instagram
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "hidden px-5 py-4 text-muted-foreground lg:table-cell",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: resumoCliente(c.id).ultimo ? dataBR(resumoCliente(c.id).ultimo?.data ?? "") : "—" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-primary",
										children: brl(resumoCliente(c.id).total)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-5 py-4 text-right whitespace-nowrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										onClick: (e) => {
											e.stopPropagation();
											setForm(c);
										},
										"aria-label": "Editar",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										onClick: (e) => {
											e.stopPropagation();
											setExcluir(c);
										},
										"aria-label": "Excluir",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
									})]
								})
							]
						}, c.id)), lista.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 5,
							className: "px-5 py-10 text-center text-muted-foreground",
							children: "Nenhuma cliente encontrada."
						}) })] })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!form,
				onOpenChange: (o) => !o && setForm(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
					className: "rounded-2xl sm:max-w-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, { children: form?.id ? "Editar cliente" : "Nova cliente" }) }),
						form && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.nome,
										onChange: (e) => setForm({
											...form,
											nome: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Telefone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.telefone,
									onChange: (e) => setForm({
										...form,
										telefone: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Instagram" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.instagram,
									onChange: (e) => setForm({
										...form,
										instagram: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nascimento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: form.nascimento,
									onChange: (e) => setForm({
										...form,
										nascimento: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Preferência de serviço" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.preferencia,
									onChange: (e) => setForm({
										...form,
										preferencia: e.target.value
									})
								})] }),
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
								if (!form?.nome.trim()) {
									toast.error("Informe o nome da cliente");
									return;
								}
								salvarCliente(form);
								setForm(null);
								toast.success("Cliente salva");
							},
							children: "Salvar"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: !!detalhe,
				onOpenChange: (o) => !o && setDetalhe(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					className: "w-full overflow-y-auto sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
						className: "font-display text-2xl",
						children: detalhe?.nome
					}) }), detalhe && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 px-4 pb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-nude/60 p-4 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: detalhe.telefone }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: detalhe.instagram
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted-foreground",
										children: ["Nascimento: ", detalhe.nascimento ? dataBR(detalhe.nascimento) : "—"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted-foreground",
										children: ["Preferência: ", detalhe.preferencia || "—"]
									}),
									detalhe.observacoes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 italic",
										children: detalhe.observacoes
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground uppercase",
											children: "Total gasto"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-2xl font-semibold",
											children: brl(totalGasto)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground uppercase",
											children: "Atendimentos"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-2xl font-semibold",
											children: historico.length
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "mb-2 size-4 text-primary" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground uppercase",
												children: "Última visita"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm font-semibold",
												children: ultimo ? dataBR(ultimo.data) : "—"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mb-2 size-4 text-primary" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground uppercase",
												children: "Mais usado"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 truncate text-sm font-semibold",
												children: favorito
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-semibold",
								children: "Histórico"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 space-y-2",
								children: [historico.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: a.servico
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											dataBR(a.data),
											" · ",
											a.hora
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: brl(a.valor)
									})]
								}, a.id)), historico.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Sem atendimentos registrados."
								})]
							})] })
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!excluir,
				onOpenChange: (open) => !open && setExcluir(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Excluir esta cliente?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
					"O cadastro de ",
					excluir?.nome,
					" será removido. Esta ação não pode ser desfeita."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					onClick: () => {
						if (!excluir) return;
						removerCliente(excluir.id);
						setExcluir(null);
						toast.success("Cliente removida");
					},
					children: "Excluir cliente"
				})] })] })
			})
		]
	});
}
//#endregion
export { ClientesPage as component };
