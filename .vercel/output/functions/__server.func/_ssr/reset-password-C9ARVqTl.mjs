import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DrXTX-Bw.mjs";
import { D as require_jsx_runtime, O as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BoWAuMqT.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as KeyRound } from "../_libs/lucide-react.mjs";
import { n as Label, t as Input } from "./label-BMq4SpPA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-C9ARVqTl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPasswordPage() {
	const navigate = useNavigate();
	const [password, setPassword] = (0, import_react.useState)("");
	const [ready, setReady] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const hash = new URLSearchParams(window.location.hash.slice(1));
		setReady(hash.get("type") === "recovery" || hash.has("access_token"));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center bg-background px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-card)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-11 items-center justify-center rounded-xl bg-accent text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 text-3xl font-semibold",
					children: "Crie uma nova senha"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Use pelo menos 6 caracteres."
				}),
				ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "new-password",
						children: "Nova senha"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "new-password",
						type: "password",
						value: password,
						onChange: (e) => setPassword(e.target.value)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						disabled: busy,
						onClick: async () => {
							if (password.length < 6) {
								toast.error("Use pelo menos 6 caracteres");
								return;
							}
							setBusy(true);
							const { error } = await supabase.auth.updateUser({ password });
							setBusy(false);
							if (error) {
								toast.error(error.message);
								return;
							}
							toast.success("Senha atualizada");
							await navigate({
								to: "/",
								replace: true
							});
						},
						children: "Salvar nova senha"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-destructive",
					children: "Este link é inválido ou expirou."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					variant: "outline",
					onClick: () => navigate({ to: "/auth" }),
					children: "Voltar para entrar"
				})] })
			]
		})
	});
}
//#endregion
export { ResetPasswordPage as component };
