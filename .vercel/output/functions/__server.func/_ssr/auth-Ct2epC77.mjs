import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DrXTX-Bw.mjs";
import { D as require_jsx_runtime, O as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BoWAuMqT.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as LoaderCircle, b as Eye, c as Sparkles, x as EyeOff } from "../_libs/lucide-react.mjs";
import { n as Label, t as Input } from "./label-BMq4SpPA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Ct2epC77.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		...opts,
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("login");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [confirmationSent, setConfirmationSent] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => {
			if (data.user) navigate({
				to: "/",
				replace: true
			});
		});
	}, [navigate]);
	const submit = async () => {
		if (!email.trim() || mode !== "forgot" && password.length < 6) {
			toast.error(mode === "forgot" ? "Informe seu e-mail" : "Use um e-mail válido e uma senha com 6 caracteres");
			return;
		}
		setBusy(true);
		try {
			if (mode === "forgot") {
				const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
				if (error) throw error;
				setConfirmationSent(true);
				return;
			}
			if (mode === "signup") {
				const { data, error } = await supabase.auth.signUp({
					email: email.trim(),
					password,
					options: { emailRedirectTo: window.location.origin }
				});
				if (error) throw error;
				if (!data.session) {
					setConfirmationSent(true);
					return;
				}
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email: email.trim(),
					password
				});
				if (error) throw error;
			}
			await navigate({
				to: "/",
				replace: true
			});
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Não foi possível continuar");
		} finally {
			setBusy(false);
		}
	};
	const signInGoogle = async () => {
		setBusy(true);
		const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/auth/callback` });
		if (result.error) {
			toast.error(result.error.message);
			setBusy(false);
			return;
		}
		if (!result.redirected) await navigate({
			to: "/",
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "grid min-h-screen bg-background lg:grid-cols-[1.05fr_0.95fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hidden bg-foreground p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-11 items-center justify-center rounded-xl bg-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-semibold",
						children: "BellaFlow"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase text-primary",
						children: "Nail Studio"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold uppercase text-primary",
							children: "Seu estúdio, seus dados"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 font-display text-5xl font-semibold leading-tight",
							children: "Gestão leve para uma rotina cheia de beleza."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-lg text-base text-primary-foreground/70",
							children: "Agenda, clientes e resultados organizados em uma conta segura e exclusiva."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-primary-foreground/50",
					children: "BellaFlow · Feito para nail designers"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex items-center justify-center px-5 py-10 sm:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-9 flex items-center gap-3 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-semibold",
						children: "BellaFlow"
					})]
				}), confirmationSent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-card)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-semibold",
							children: "Confira seu e-mail"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								"Enviamos as instruções para ",
								email,
								". Abra a mensagem para continuar."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-6 w-full",
							variant: "outline",
							onClick: () => {
								setConfirmationSent(false);
								setMode("login");
							},
							children: "Voltar para entrar"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-primary",
						children: "Bem-vinda ao BellaFlow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-3xl font-semibold",
						children: mode === "login" ? "Entre na sua conta" : mode === "signup" ? "Crie sua conta" : "Recupere sua senha"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: mode === "login" ? "Seus dados ficam separados e protegidos." : mode === "signup" ? "Comece com sua agenda e dados exclusivos." : "Você receberá um link seguro por e-mail."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "E-mail"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							autoComplete: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "voce@exemplo.com"
						})] }),
						mode !== "forgot" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "password",
								children: "Senha"
							}), mode === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "link",
								className: "h-auto p-0 text-xs",
								onClick: () => setMode("forgot"),
								children: "Esqueci minha senha"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: showPassword ? "text" : "password",
								autoComplete: mode === "signup" ? "new-password" : "current-password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "pr-11"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "icon",
								variant: "ghost",
								className: "absolute right-1 top-1 size-8",
								onClick: () => setShowPassword((v) => !v),
								"aria-label": showPassword ? "Ocultar senha" : "Mostrar senha",
								children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full",
							disabled: busy,
							onClick: submit,
							children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), mode === "login" ? "Entrar" : mode === "signup" ? "Criar conta" : "Enviar link"]
						}),
						mode !== "forgot" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
								"ou",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							variant: "outline",
							disabled: busy,
							onClick: signInGoogle,
							children: "Continuar com Google"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-center text-sm text-muted-foreground",
							children: [
								mode === "login" ? "Ainda não tem conta?" : "Já tem uma conta?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "link",
									className: "h-auto p-0",
									onClick: () => setMode(mode === "login" ? "signup" : "login"),
									children: mode === "login" ? "Criar conta" : "Entrar"
								})
							]
						})
					]
				})] })]
			})
		})]
	});
}
//#endregion
export { AuthPage as component };
