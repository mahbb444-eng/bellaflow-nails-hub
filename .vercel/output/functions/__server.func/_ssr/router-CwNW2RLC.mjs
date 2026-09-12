import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DrXTX-Bw.mjs";
import { D as require_jsx_runtime, O as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as BellaProvider, t as AuthProvider } from "./bella-store-DnYRuEPP.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, k as redirect, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$10 } from "./clientes-CXsV7n5I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CwNW2RLC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-D_yZ6H6O.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "BellaFlow — Gestão para Nail Designers" },
			{
				name: "description",
				content: "Agenda, clientes, atendimentos e financeiro em um só lugar para nail designers e manicures."
			},
			{
				name: "author",
				content: "BellaFlow"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BellaProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-right" })] }) })
	});
}
var $$splitComponentImporter$8 = () => import("./route-Di7iQBCH.mjs");
var Route$8 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./auth-Ct2epC77.mjs");
var Route$7 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Entrar — BellaFlow" },
		{
			name: "description",
			content: "Acesse sua conta BellaFlow com segurança."
		},
		{
			property: "og:title",
			content: "Entrar — BellaFlow"
		},
		{
			property: "og:description",
			content: "Acesse sua conta BellaFlow com segurança."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./reset-password-C9ARVqTl.mjs");
var Route$6 = createFileRoute("/reset-password")({
	head: () => ({ meta: [
		{ title: "Nova senha — BellaFlow" },
		{
			name: "description",
			content: "Defina uma nova senha para sua conta BellaFlow."
		},
		{
			property: "og:title",
			content: "Nova senha — BellaFlow"
		},
		{
			property: "og:description",
			content: "Defina uma nova senha para sua conta BellaFlow."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_authenticated-TqYmaeCG.mjs");
var Route$5 = createFileRoute("/_authenticated/")({
	head: () => ({ meta: [
		{ title: "Dashboard — BellaFlow" },
		{
			name: "description",
			content: "Acompanhe clientes, agendamentos do dia, receita do mês e ticket médio do seu estúdio de unhas."
		},
		{
			property: "og:title",
			content: "Dashboard — BellaFlow"
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			property: "og:description",
			content: "Indicadores do seu estúdio de unhas em tempo real."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./agenda-DX5-ANyi.mjs");
var Route$4 = createFileRoute("/_authenticated/agenda")({
	head: () => ({ meta: [
		{ title: "Agenda — BellaFlow" },
		{
			name: "description",
			content: "Visualize sua semana, crie agendamentos e marque atendimentos como realizados."
		},
		{
			property: "og:title",
			content: "Agenda — BellaFlow"
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			property: "og:description",
			content: "Sua semana de atendimentos, organizada e elegante."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./atendimentos-Ck2gHBA2.mjs");
var Route$3 = createFileRoute("/_authenticated/atendimentos")({
	head: () => ({ meta: [
		{ title: "Atendimentos — BellaFlow" },
		{
			name: "description",
			content: "Histórico completo de atendimentos com filtros por período, cliente e serviço."
		},
		{
			property: "og:title",
			content: "Atendimentos — BellaFlow"
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			property: "og:description",
			content: "Todo o histórico do seu estúdio em um só lugar."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./configuracoes-BteGLyX0.mjs");
var Route$2 = createFileRoute("/_authenticated/configuracoes")({
	head: () => ({ meta: [
		{ title: "Configurações — BellaFlow" },
		{
			name: "description",
			content: "Edite o perfil da profissional e gerencie a tabela de serviços do estúdio."
		},
		{
			property: "og:title",
			content: "Configurações — BellaFlow"
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			property: "og:description",
			content: "Perfil e tabela de serviços do seu estúdio."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./financeiro-DVosVuHC.mjs");
var Route$1 = createFileRoute("/_authenticated/financeiro")({
	head: () => ({ meta: [
		{ title: "Financeiro — BellaFlow" },
		{
			name: "description",
			content: "Receita do dia, da semana e do mês, ticket médio e serviços mais populares."
		},
		{
			property: "og:title",
			content: "Financeiro — BellaFlow"
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			property: "og:description",
			content: "Acompanhe o faturamento do seu estúdio de unhas."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./auth.callback-BM5weTYb.mjs");
var Route = createFileRoute("/auth/callback")({
	head: () => ({ meta: [
		{ title: "Entrando — BellaFlow" },
		{
			name: "description",
			content: "Concluindo seu acesso ao BellaFlow."
		},
		{
			property: "og:title",
			content: "Entrando — BellaFlow"
		},
		{
			property: "og:description",
			content: "Concluindo seu acesso ao BellaFlow."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var AuthenticatedRouteRoute = Route$8.update({
	id: "/_authenticated",
	getParentRoute: () => Route$9
});
var AuthRoute = Route$7.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$9
});
var ResetPasswordRoute = Route$6.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$9
});
var AuthenticatedIndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAgendaRoute = Route$4.update({
	id: "/agenda",
	path: "/agenda",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAtendimentosRoute = Route$3.update({
	id: "/atendimentos",
	path: "/atendimentos",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedClientesRoute = Route$10.update({
	id: "/clientes",
	path: "/clientes",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedConfiguracoesRoute = Route$2.update({
	id: "/configuracoes",
	path: "/configuracoes",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFinanceiroRoute = Route$1.update({
	id: "/financeiro",
	path: "/financeiro",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthCallbackRoute = Route.update({
	id: "/callback",
	path: "/callback",
	getParentRoute: () => AuthRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAgendaRoute,
	AuthenticatedAtendimentosRoute,
	AuthenticatedClientesRoute,
	AuthenticatedConfiguracoesRoute,
	AuthenticatedFinanceiroRoute,
	AuthenticatedIndexRoute
};
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var AuthRouteChildren = { AuthCallbackRoute };
var rootRouteChildren = {
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	AuthRoute: AuthRoute._addFileChildren(AuthRouteChildren),
	ResetPasswordRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
