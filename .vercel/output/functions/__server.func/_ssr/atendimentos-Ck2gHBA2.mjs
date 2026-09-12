import { i as __toESM } from "../_runtime.mjs";
import { D as require_jsx_runtime, O as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as dataBR, c as useBella, i as brl } from "./bella-store-DnYRuEPP.mjs";
import { t as Button } from "./button-BoWAuMqT.mjs";
import { n as Card, t as AppLayout } from "./AppLayout-DKPDuPqH.mjs";
import { n as Label, t as Input } from "./label-BMq4SpPA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atendimentos-Ck2gHBA2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AtendimentosPage() {
	const { atendimentos, clientes, servicos, nomeCliente } = useBella();
	const [de, setDe] = (0, import_react.useState)("");
	const [ate, setAte] = (0, import_react.useState)("");
	const [cliente, setCliente] = (0, import_react.useState)("");
	const [servico, setServico] = (0, import_react.useState)("");
	const lista = (0, import_react.useMemo)(() => atendimentos.filter((a) => (!de || a.data >= de) && (!ate || a.data <= ate) && (!cliente || a.clienteId === cliente) && (!servico || a.servico === servico)).sort((a, b) => b.data.localeCompare(a.data)), [
		atendimentos,
		de,
		ate,
		cliente,
		servico
	]);
	const total = lista.reduce((s, a) => s + a.valor, 0);
	const selectCls = "mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		titulo: "Atendimentos",
		descricao: "Histórico completo dos serviços realizados.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "De" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: de,
						onChange: (e) => setDe(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Até" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: ate,
						onChange: (e) => setAte(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cliente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: cliente,
						onChange: (e) => setCliente(e.target.value),
						className: selectCls,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Todas"
						}), clientes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.nome
						}, c.id))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Serviço" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: servico,
						onChange: (e) => setServico(e.target.value),
						className: selectCls,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Todos"
						}), servicos.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.nome,
							children: s.nome
						}, s.id))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "w-full",
							onClick: () => {
								setDe("");
								setAte("");
								setCliente("");
								setServico("");
							},
							children: "Limpar filtros"
						})
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border p-5 sm:border-r sm:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wider text-muted-foreground uppercase",
							children: "Total filtrado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl font-semibold",
							children: brl(total)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border p-5 sm:border-r sm:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wider text-muted-foreground uppercase",
							children: "Atendimentos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl font-semibold",
							children: lista.length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wider text-muted-foreground uppercase",
							children: "Ticket médio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl font-semibold",
							children: brl(lista.length ? total / lista.length : 0)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mt-5 overflow-x-auto p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-left text-xs tracking-wider text-muted-foreground uppercase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 font-medium",
								children: "Data"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 font-medium",
								children: "Cliente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 font-medium",
								children: "Serviço"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "hidden px-5 py-3 font-medium lg:table-cell",
								children: "Observações"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 text-right font-medium",
								children: "Valor"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [lista.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-5 py-4 whitespace-nowrap",
								children: [
									dataBR(a.data),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: a.hora
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 font-medium",
								children: nomeCliente(a.clienteId)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-muted-foreground",
								children: a.servico
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "hidden px-5 py-4 text-muted-foreground lg:table-cell",
								children: a.observacoes || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-right text-primary",
								children: brl(a.valor)
							})
						]
					}, a.id)), lista.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 5,
						className: "px-5 py-10 text-center text-muted-foreground",
						children: "Nenhum atendimento no período."
					}) })] })]
				})
			})
		]
	});
}
//#endregion
export { AtendimentosPage as component };
