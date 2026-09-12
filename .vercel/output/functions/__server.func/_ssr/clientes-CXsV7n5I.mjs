import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clientes-CXsV7n5I.js
var $$splitComponentImporter = () => import("./clientes-BWD-QH-y.mjs");
var Route = createFileRoute("/_authenticated/clientes")({
	validateSearch: (search) => ({ cliente: typeof search["cliente"] === "string" ? search["cliente"] : void 0 }),
	head: () => ({ meta: [
		{ title: "Clientes — BellaFlow" },
		{
			name: "description",
			content: "Cadastro completo das suas clientes com histórico de atendimentos e total gasto."
		},
		{
			property: "og:title",
			content: "Clientes — BellaFlow"
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
			content: "Gerencie suas clientes com carinho e organização."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
