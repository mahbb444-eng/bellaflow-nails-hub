import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DrXTX-Bw.mjs";
import { D as require_jsx_runtime, O as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.callback-BM5weTYb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthCallbackPage() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		let active = true;
		const finish = async () => {
			for (let attempt = 0; attempt < 20; attempt += 1) {
				const { data } = await supabase.auth.getUser();
				if (!active) return;
				if (data.user) {
					await navigate({
						to: "/",
						replace: true
					});
					return;
				}
				await new Promise((resolve) => window.setTimeout(resolve, 250));
			}
			await navigate({
				to: "/auth",
				replace: true
			});
		};
		finish();
		return () => {
			active = false;
		};
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center bg-background px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto size-8 animate-spin text-primary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-xl font-semibold",
					children: "Concluindo seu acesso"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Só mais um instante..."
				})
			]
		})
	});
}
//#endregion
export { AuthCallbackPage as component };
