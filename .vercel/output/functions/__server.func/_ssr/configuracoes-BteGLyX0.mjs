import { i as __toESM } from "../_runtime.mjs";
import { D as require_jsx_runtime, O as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as useBella, i as brl } from "./bella-store-DnYRuEPP.mjs";
import { r as cn, t as Button } from "./button-BoWAuMqT.mjs";
import { A as Bell, f as Plus, s as Trash2 } from "../_libs/lucide-react.mjs";
import { n as Card, t as AppLayout } from "./AppLayout-DKPDuPqH.mjs";
import { n as Label, t as Input } from "./label-BMq4SpPA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/configuracoes-BteGLyX0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function ConfiguracoesPage() {
	const { perfil, servicos, salvarPerfil, salvarServico, removerServico } = useBella();
	const [p, setP] = (0, import_react.useState)(perfil);
	const [novo, setNovo] = (0, import_react.useState)({
		nome: "",
		preco: 0,
		duracao: 60
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, {
		titulo: "Configurações",
		descricao: "Seu perfil e sua tabela de serviços.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "perfil",
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "h-auto w-full justify-start gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1.5 sm:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "perfil",
							children: "Perfil"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "servicos",
							children: "Serviços"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "preferencias",
							children: "Preferências"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "perfil",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold",
								children: "Perfil da profissional"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: p.nome,
											onChange: (e) => setP({
												...p,
												nome: e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Estúdio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: p.estudio,
											onChange: (e) => setP({
												...p,
												estudio: e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Telefone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: p.telefone,
										onChange: (e) => setP({
											...p,
											telefone: e.target.value
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Instagram" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: p.instagram,
										onChange: (e) => setP({
											...p,
											instagram: e.target.value
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "E-mail" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: p.email,
											onChange: (e) => setP({
												...p,
												email: e.target.value
											})
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-5",
								onClick: () => {
									salvarPerfil(p);
									toast.success("Perfil atualizado");
								},
								children: "Salvar perfil"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "servicos",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Serviços"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-2",
							children: servicos.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-2xl bg-nude/50 px-4 py-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: s.nome,
										onChange: (e) => salvarServico({
											...s,
											nome: e.target.value
										}),
										className: "min-w-0 flex-1 bg-transparent font-medium outline-none"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: s.preco,
										onChange: (e) => salvarServico({
											...s,
											preco: Number(e.target.value)
										}),
										className: "w-20 rounded-lg border border-border bg-card px-2 py-1 text-right"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: s.duracao,
										onChange: (e) => salvarServico({
											...s,
											duracao: Number(e.target.value)
										}),
										className: "w-16 rounded-lg border border-border bg-card px-2 py-1 text-right"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "min"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										className: "size-8",
										onClick: () => removerServico(s.id),
										"aria-label": "Remover serviço",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
									})
								]
							}, s.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Novo serviço" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: novo.nome,
									placeholder: "Ex.: Banho de Fibra",
									onChange: (e) => setNovo({
										...novo,
										nome: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Preço" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									className: "w-24",
									value: novo.preco,
									onChange: (e) => setNovo({
										...novo,
										preco: Number(e.target.value)
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Min" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									className: "w-20",
									value: novo.duracao,
									onChange: (e) => setNovo({
										...novo,
										duracao: Number(e.target.value)
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => {
										if (!novo.nome.trim()) {
											toast.error("Informe o nome do serviço");
											return;
										}
										salvarServico(novo);
										setNovo({
											nome: "",
											preco: 0,
											duracao: 60
										});
										toast.success("Serviço adicionado");
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs text-muted-foreground",
							children: ["Tabela atual: ", servicos.map((s) => `${s.nome} ${brl(s.preco)}`).join(" · ")]
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "preferencias",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "max-w-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 items-center justify-center rounded-xl bg-accent text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold",
								children: "Preferências básicas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Ajustes para a rotina do seu estúdio."
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 divide-y divide-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center justify-between gap-4 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: "Lembretes de agendamento"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Destacar compromissos do dia na agenda."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: true,
										className: "size-4 accent-primary"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center justify-between gap-4 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: "Resumo financeiro"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Exibir comparações com o período anterior."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: true,
										className: "size-4 accent-primary"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center justify-between gap-4 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: "Semana começa no domingo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Usado na visualização semanal da agenda."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: true,
										className: "size-4 accent-primary"
									})]
								})
							]
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { ConfiguracoesPage as component };
