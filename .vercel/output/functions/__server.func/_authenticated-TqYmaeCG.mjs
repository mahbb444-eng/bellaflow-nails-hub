import { D as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as useBella, i as brl } from "./_ssr/bella-store-DnYRuEPP.mjs";
import { t as Button } from "./_ssr/button-BoWAuMqT.mjs";
import { h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { S as Clock3, d as Receipt, i as Users, k as CalendarCheck, w as CircleDollarSign } from "./_libs/lucide-react.mjs";
import { n as Card, r as Metric, t as AppLayout } from "./_ssr/AppLayout-DKPDuPqH.mjs";
import { t as StatusBadge } from "./_ssr/StatusBadge-sk6xU0ks.mjs";
import { r as porServico, t as faturamentoPorMes } from "./_ssr/bella-metrics-DrdByzhS.mjs";
import { a as CartesianGrid, c as Cell, i as XAxis, l as ResponsiveContainer, n as BarChart, o as Bar, r as YAxis, s as Pie, t as PieChart, u as Tooltip } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated-TqYmaeCG.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { clientes, agendamentos, atendimentos, hoje, nomeCliente, marcarRealizado } = useBella();
	const mes = hoje.slice(0, 7);
	const doDia = agendamentos.filter((a) => a.data === hoje && a.status !== "Cancelado").sort((a, b) => a.hora.localeCompare(b.hora));
	const doMes = atendimentos.filter((a) => a.data.slice(0, 7) === mes);
	const receita = doMes.reduce((s, a) => s + a.valor, 0);
	const ticket = doMes.length ? receita / doMes.length : 0;
	const dados = faturamentoPorMes(atendimentos);
	const servicos = porServico(atendimentos).slice(0, 5);
	const cancelados = agendamentos.filter((a) => a.status === "Cancelado").length;
	const taxaCancelamento = agendamentos.length ? cancelados / agendamentos.length * 100 : 0;
	const ultimoPorCliente = /* @__PURE__ */ new Map();
	[...atendimentos].sort((a, b) => b.data.localeCompare(a.data)).forEach((a) => {
		if (!ultimoPorCliente.has(a.clienteId)) ultimoPorCliente.set(a.clienteId, a);
	});
	const limite = /* @__PURE__ */ new Date(`${hoje}T00:00:00`);
	limite.setDate(limite.getDate() - 30);
	const reativar = clientes.map((cliente) => ({
		cliente,
		ultimo: ultimoPorCliente.get(cliente.id)
	})).filter(({ ultimo }) => !ultimo || /* @__PURE__ */ new Date(`${ultimo.data}T00:00:00`) < limite).slice(0, 4);
	const proximoLivre = [
		"08:00",
		"09:00",
		"10:30",
		"13:00",
		"14:30",
		"16:00",
		"17:30",
		"19:00"
	].find((hora) => !doDia.some((a) => a.hora === hora));
	const clientesAtivos = new Set(atendimentos.filter((a) => /* @__PURE__ */ new Date(`${a.data}T00:00:00`) >= limite).map((a) => a.clienteId)).size;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		titulo: "Dashboard",
		descricao: "Sua operação, clientes e resultados em um só lugar.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Clientes",
						value: String(clientes.length),
						trend: "+8%",
						hint: "vs. mês anterior",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Agendamentos hoje",
						value: String(doDia.length),
						hint: proximoLivre ? `livre às ${proximoLivre}` : "agenda completa",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Atendimentos no mês",
						value: String(doMes.length),
						trend: "+12%",
						hint: "vs. mês anterior",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Receita do mês",
						value: brl(receita),
						trend: "+14%",
						hint: "vs. mês anterior",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDollarSign, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Ticket médio",
						value: brl(ticket),
						hint: "por atendimento",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-primary uppercase",
						children: "Visão do negócio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-xl font-semibold",
						children: "Pulso do estúdio"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden text-xs text-muted-foreground sm:block",
						children: "Atualizado com os atendimentos registrados"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] sm:grid-cols-2 xl:grid-cols-4",
					children: [
						["Clientes ativos", String(clientesAtivos)],
						["Clientes inativos", String(clientes.length - clientesAtivos)],
						["Taxa de cancelamento", `${taxaCancelamento.toFixed(1)}%`],
						["Serviço mais vendido", servicos[0]?.nome ?? "—"]
					].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border p-5 last:border-0 sm:border-r xl:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-xl font-semibold",
							children: value
						})]
					}, label))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-5 xl:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "xl:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Próximos atendimentos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/agenda",
							className: "text-xs text-primary hover:underline",
							children: "ver agenda"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3",
						children: [doDia.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Nenhum atendimento para hoje."
						}), doDia.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 rounded-lg border border-transparent bg-nude/60 px-4 py-3 transition-colors hover:border-primary/15",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: nomeCliente(a.clienteId)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										a.hora,
										" · ",
										a.servico,
										" · ",
										brl(a.valor)
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.status }), a.status !== "Realizado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => marcarRealizado(a.id),
									children: "Realizado"
								})]
							})]
						}, a.id))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "xl:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: "Faturamento dos últimos 6 meses"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 h-72 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: dados,
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
											borderRadius: 10,
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
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-5 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-primary uppercase",
						children: "Relacionamento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-xl font-semibold",
						children: "Clientes para reativar"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: "+30 dias"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 divide-y divide-border",
					children: reativar.map(({ cliente, ultimo }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-semibold",
								children: cliente.nome
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: ultimo ? `Último: ${ultimo.servico}` : "Ainda sem atendimento"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/clientes",
								search: { cliente: cliente.id },
								children: "Ver cliente"
							})
						})]
					}, cliente.id))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-primary uppercase",
						children: "Preferências"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-xl font-semibold",
						children: "Serviços mais realizados"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: servicos,
								dataKey: "total",
								nameKey: "nome",
								innerRadius: 48,
								outerRadius: 76,
								paddingAngle: 4,
								children: servicos.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									fill: [
										"var(--primary)",
										"var(--gold)",
										"var(--chart-2)",
										"var(--chart-4)",
										"var(--chart-5)"
									][index],
									stroke: "var(--card)"
								}, item.nome))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								borderRadius: 10,
								border: "1px solid var(--border)",
								fontSize: 12
							} })] })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: servicos.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground",
							children: [
								item.nome,
								" · ",
								item.total
							]
						}, item.nome))
					})
				] })]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
