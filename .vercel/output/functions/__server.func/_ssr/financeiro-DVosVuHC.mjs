import { i as __toESM } from "../_runtime.mjs";
import { D as require_jsx_runtime, O as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as dataBR, c as useBella, i as brl } from "./bella-store-DnYRuEPP.mjs";
import { t as Button } from "./button-BoWAuMqT.mjs";
import { a as TrendingUp, d as Receipt, f as Plus, m as Pencil, o as TrendingDown, p as PiggyBank, r as WalletCards, s as Trash2, w as CircleDollarSign } from "../_libs/lucide-react.mjs";
import { n as Card, r as Metric, t as AppLayout } from "./AppLayout-DKPDuPqH.mjs";
import { n as inicioDaSemana, r as porServico, t as faturamentoPorMes } from "./bella-metrics-DrdByzhS.mjs";
import { a as CartesianGrid, c as Cell, d as Legend, i as XAxis, l as ResponsiveContainer, n as BarChart, o as Bar, r as YAxis, s as Pie, t as PieChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
import { n as Label, t as Input } from "./label-BMq4SpPA.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, d as DialogFooter, f as DialogHeader, i as AlertDialogContent, l as Dialog, m as Textarea, n as AlertDialogAction, o as AlertDialogFooter, p as DialogTitle, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog, u as DialogContent } from "./alert-dialog--KVQC1BC.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/financeiro-DVosVuHC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CORES = [
	"var(--gold)",
	"var(--rose)",
	"var(--nude)",
	"var(--chart-4)",
	"var(--chart-5)"
];
function FinanceiroPage() {
	const { atendimentos, despesas, hoje, nomeCliente, salvarDespesa, removerDespesa } = useBella();
	const [form, setForm] = (0, import_react.useState)(null);
	const [excluir, setExcluir] = (0, import_react.useState)(null);
	const ref = /* @__PURE__ */ new Date(hoje + "T00:00:00");
	const iniSemana = inicioDaSemana(ref);
	const iniSemanaISO = `${iniSemana.getFullYear()}-${String(iniSemana.getMonth() + 1).padStart(2, "0")}-${String(iniSemana.getDate()).padStart(2, "0")}`;
	const soma = (l) => l.reduce((s, a) => s + a.valor, 0);
	const doDia = atendimentos.filter((a) => a.data === hoje);
	const daSemana = atendimentos.filter((a) => a.data >= iniSemanaISO && a.data <= hoje);
	const doMes = atendimentos.filter((a) => a.data.slice(0, 7) === hoje.slice(0, 7));
	const receitaMes = soma(doMes);
	const totalDespesasMes = despesas.filter((d) => d.data.slice(0, 7) === hoje.slice(0, 7)).reduce((s, d) => s + d.valor, 0);
	const lucroLiquido = receitaMes - totalDespesasMes;
	const barras = faturamentoPorMes(atendimentos);
	const pizza = porServico(atendimentos);
	const recentes = [...atendimentos].sort((a, b) => b.data.localeCompare(a.data)).slice(0, 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		titulo: "Financeiro",
		descricao: "O resultado do seu talento, em números.",
		acoes: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: () => setForm({
				descricao: "",
				categoria: "Materiais",
				data: hoje,
				valor: 0,
				observacoes: ""
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Nova despesa"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Receita hoje",
						value: brl(soma(doDia)),
						trend: "+6%",
						hint: "vs. ontem",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDollarSign, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Receita da semana",
						value: brl(soma(daSemana)),
						trend: "+11%",
						hint: "vs. semana anterior",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Receita do mês",
						value: brl(receitaMes),
						trend: "+14%",
						hint: "vs. mês anterior",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletCards, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Ticket médio",
						value: brl(doMes.length ? receitaMes / doMes.length : 0),
						hint: "no mês",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PiggyBank, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Total atendimentos",
						value: String(atendimentos.length),
						hint: "histórico",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border p-5 sm:border-r sm:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase text-muted-foreground",
								children: "Faturamento no mês"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4 text-primary" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl font-semibold",
							children: brl(receitaMes)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border p-5 sm:border-r sm:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase text-muted-foreground",
								children: "Despesas no mês"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "size-4 text-destructive" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl font-semibold text-destructive",
							children: brl(totalDespesasMes)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase text-muted-foreground",
									children: "Lucro líquido"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PiggyBank, { className: "size-4 text-gold" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-3xl font-semibold",
								children: brl(lucroLiquido)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "faturamento menos despesas"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-5 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: "Faturamento mensal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 h-72 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: barras,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										vertical: false,
										stroke: "var(--border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "mes",
										tickLine: false,
										axisLine: false,
										fontSize: 12
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tickLine: false,
										axisLine: false,
										fontSize: 12,
										width: 60
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										cursor: { fill: "var(--muted)" },
										formatter: (v) => brl(v),
										contentStyle: {
											borderRadius: 16,
											border: "1px solid var(--border)",
											fontSize: 12
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "valor",
										fill: "var(--primary)",
										radius: [
											6,
											6,
											0,
											0
										],
										maxBarSize: 48
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: "Serviços mais populares"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-72 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: pizza,
									dataKey: "total",
									nameKey: "nome",
									innerRadius: 55,
									outerRadius: 85,
									paddingAngle: 3,
									children: pizza.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
										fill: CORES[i % CORES.length],
										stroke: "var(--card)"
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									borderRadius: 16,
									border: "1px solid var(--border)",
									fontSize: 12
								} })
							] })
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-6 overflow-x-auto p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-5 pt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase text-primary",
						children: "Custos do estúdio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-xl font-semibold",
						children: "Despesas"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setForm({
							descricao: "",
							categoria: "Materiais",
							data: hoje,
							valor: 0,
							observacoes: ""
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Adicionar"]
					})]
				}), despesas.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "mt-4 w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-left text-xs uppercase text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 font-medium",
								children: "Data"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 font-medium",
								children: "Descrição"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "hidden px-5 py-3 font-medium sm:table-cell",
								children: "Categoria"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 text-right font-medium",
								children: "Valor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 text-right font-medium",
								children: "Ações"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [...despesas].sort((a, b) => b.data.localeCompare(a.data)).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 whitespace-nowrap",
								children: dataBR(d.data)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-5 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: d.descricao
								}), d.observacoes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-xs truncate text-xs text-muted-foreground",
									children: d.observacoes
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "hidden px-5 py-4 text-muted-foreground sm:table-cell",
								children: d.categoria
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-5 py-4 text-right font-medium text-destructive",
								children: ["− ", brl(d.valor)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-5 py-4 text-right whitespace-nowrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									onClick: () => setForm(d),
									"aria-label": "Editar despesa",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									onClick: () => setExcluir(d),
									"aria-label": "Excluir despesa",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
								})]
							})
						]
					}, d.id)) })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-6 py-10 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-auto flex size-11 items-center justify-center rounded-xl bg-accent text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PiggyBank, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm font-semibold",
							children: "Nenhuma despesa lançada"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Cadastre materiais, aluguel e outros custos para acompanhar seu lucro real."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-6 overflow-x-auto p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "px-5 pt-5 text-xl font-semibold",
					children: "Movimentações recentes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "mt-4 w-full text-sm",
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
								className: "px-5 py-3 text-right font-medium",
								children: "Valor"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: recentes.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 whitespace-nowrap",
								children: dataBR(a.data)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 font-medium",
								children: nomeCliente(a.clienteId)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-muted-foreground",
								children: a.servico
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-5 py-4 text-right text-primary",
								children: ["+ ", brl(a.valor)]
							})
						]
					}, a.id)) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!form,
				onOpenChange: (open) => !open && setForm(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "rounded-xl sm:max-w-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: form?.id ? "Editar despesa" : "Nova despesa" }) }),
						form && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descrição" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.descricao,
										onChange: (e) => setForm({
											...form,
											descricao: e.target.value
										}),
										placeholder: "Ex.: Kit de esmaltes"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoria" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: form.categoria,
									onChange: (e) => setForm({
										...form,
										categoria: e.target.value
									}),
									className: "mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm",
									children: [
										"Materiais",
										"Aluguel",
										"Marketing",
										"Taxas",
										"Outros"
									].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Data" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: form.data,
									onChange: (e) => setForm({
										...form,
										data: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Valor (R$)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: "0",
										step: "0.01",
										value: form.valor,
										onChange: (e) => setForm({
											...form,
											valor: Number(e.target.value)
										})
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
								if (!form?.descricao.trim() || form.valor <= 0) {
									toast.error("Informe a descrição e um valor maior que zero");
									return;
								}
								salvarDespesa(form);
								setForm(null);
								toast.success("Despesa salva");
							},
							children: "Salvar despesa"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!excluir,
				onOpenChange: (open) => !open && setExcluir(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Excluir esta despesa?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
					"O lançamento de ",
					excluir?.descricao,
					" será removido do cálculo de lucro."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					onClick: () => {
						if (!excluir) return;
						removerDespesa(excluir.id);
						setExcluir(null);
						toast.success("Despesa removida");
					},
					children: "Excluir despesa"
				})] })] })
			})
		]
	});
}
//#endregion
export { FinanceiroPage as component };
