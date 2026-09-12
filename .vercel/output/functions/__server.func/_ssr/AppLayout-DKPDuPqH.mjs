import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DrXTX-Bw.mjs";
import { D as require_jsx_runtime, O as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as useBella, s as useAuth } from "./bella-store-DnYRuEPP.mjs";
import { r as cn, t as Button } from "./button-BoWAuMqT.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { C as ClipboardList, D as CalendarDays, c as Sparkles, g as LogOut, h as Menu, i as Users, l as Settings, n as Wallet, v as LayoutDashboard } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppLayout-DKPDuPqH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var itens = [
	{
		to: "/",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/clientes",
		label: "Clientes",
		icon: Users
	},
	{
		to: "/agenda",
		label: "Agenda",
		icon: CalendarDays
	},
	{
		to: "/atendimentos",
		label: "Atendimentos",
		icon: ClipboardList
	},
	{
		to: "/financeiro",
		label: "Financeiro",
		icon: Wallet
	},
	{
		to: "/configuracoes",
		label: "Configurações",
		icon: Settings
	}
];
function Nav({ onNavigate }) {
	const { perfil } = useBella();
	const { user } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const iniciais = perfil.nome.split(" ").slice(0, 2).map((p) => p[0]).join("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-sidebar px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 px-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-10 items-center justify-center rounded-xl bg-primary shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary-foreground" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "leading-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl font-semibold",
						children: "BellaFlow"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-semibold tracking-[0.18em] text-primary uppercase",
						children: "Nail Studio"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mt-9 flex flex-1 flex-col gap-1",
				children: itens.map(({ to, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to,
					onClick: onNavigate,
					activeOptions: { exact: to === "/" },
					className: "group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent/60 hover:text-foreground data-[status=active]:border-primary/10 data-[status=active]:bg-accent data-[status=active]:text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-[18px] group-data-[status=active]:text-primary" }), label]
				}, to))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-card)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground",
						children: iniciais
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: perfil.nome
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: user?.email ?? perfil.instagram
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						className: "size-8 shrink-0",
						"aria-label": "Sair",
						title: "Sair",
						onClick: async () => {
							await queryClient.cancelQueries();
							queryClient.clear();
							await supabase.auth.signOut();
							onNavigate?.();
							await navigate({
								to: "/auth",
								replace: true
							});
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
					})
				]
			})
		]
	});
}
function AppLayout({ titulo, descricao, acoes, children }) {
	const [aberto, setAberto] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "fixed inset-y-0 left-0 hidden w-64 border-r border-border lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {})
			}),
			aberto && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-40 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-foreground/30",
					onClick: () => setAberto(false),
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-y-0 left-0 w-64 border-r border-border shadow-soft",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, { onNavigate: () => setAberto(false) })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: cn("lg:pl-64"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex flex-wrap items-center justify-between gap-4 border-b border-border/70 px-5 py-6 sm:px-9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded-xl border border-border p-2 lg:hidden",
							onClick: () => setAberto(true),
							"aria-label": "Abrir menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-semibold sm:text-3xl",
							children: titulo
						}), descricao && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: descricao
						})] })]
					}), acoes]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5 pt-6 pb-12 sm:px-9",
					children
				})]
			})
		]
	});
}
function Card({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]", className),
		children
	});
}
function Metric({ label, value, hint, trend, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold text-muted-foreground uppercase",
				children: label
			}), icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-8 items-center justify-center rounded-lg bg-accent text-primary",
				children: icon
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 font-display text-3xl font-semibold",
			children: value
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-1 flex items-center gap-2 text-xs",
			children: [trend && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold text-primary",
				children: trend
			}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: hint
			})]
		})
	] });
}
//#endregion
export { Card as n, Metric as r, AppLayout as t };
