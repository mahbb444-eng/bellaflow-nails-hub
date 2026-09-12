import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, LoaderCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Entrar — BellaFlow" },
    { name: "description", content: "Acesse sua conta BellaFlow com segurança." },
    { property: "og:title", content: "Entrar — BellaFlow" },
    { property: "og:description", content: "Acesse sua conta BellaFlow com segurança." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AuthPage,
});

type Mode = "login" | "signup" | "forgot";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const submit = async () => {
    if (!email.trim() || (mode !== "forgot" && password.length < 6)) {
      toast.error(mode === "forgot" ? "Informe seu e-mail" : "Use um e-mail válido e uma senha com 6 caracteres");
      return;
    }
    setBusy(true);
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setConfirmationSent(true);
        return;
      }
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        if (!data.session) {
          setConfirmationSent(true);
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
      }
      await navigate({ to: "/", replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível continuar");
    } finally {
      setBusy(false);
    }
  };

  const signInGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) {
      toast.error(result.error.message);
      setBusy(false);
      return;
    }
    if (!result.redirected) await navigate({ to: "/", replace: true });
  };

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[1.05fr_0.95fr]">
      <section className="hidden bg-foreground p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-xl bg-primary"><Sparkles className="size-5" /></span><div><p className="font-display text-2xl font-semibold">BellaFlow</p><p className="text-xs font-semibold uppercase text-primary">Nail Studio</p></div></div>
        <div className="max-w-xl"><p className="text-sm font-semibold uppercase text-primary">Seu estúdio, seus dados</p><h1 className="mt-4 font-display text-5xl font-semibold leading-tight">Gestão leve para uma rotina cheia de beleza.</h1><p className="mt-5 max-w-lg text-base text-primary-foreground/70">Agenda, clientes e resultados organizados em uma conta segura e exclusiva.</p></div>
        <p className="text-xs text-primary-foreground/50">BellaFlow · Feito para nail designers</p>
      </section>
      <section className="flex items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-9 flex items-center gap-3 lg:hidden"><span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Sparkles className="size-4" /></span><p className="font-display text-2xl font-semibold">BellaFlow</p></div>
          {confirmationSent ? <div className="rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"><h1 className="text-2xl font-semibold">Confira seu e-mail</h1><p className="mt-2 text-sm text-muted-foreground">Enviamos as instruções para {email}. Abra a mensagem para continuar.</p><Button className="mt-6 w-full" variant="outline" onClick={() => { setConfirmationSent(false); setMode("login"); }}>Voltar para entrar</Button></div> : <>
            <div><p className="text-sm font-semibold text-primary">Bem-vinda ao BellaFlow</p><h1 className="mt-2 text-3xl font-semibold">{mode === "login" ? "Entre na sua conta" : mode === "signup" ? "Crie sua conta" : "Recupere sua senha"}</h1><p className="mt-2 text-sm text-muted-foreground">{mode === "login" ? "Seus dados ficam separados e protegidos." : mode === "signup" ? "Comece com sua agenda e dados exclusivos." : "Você receberá um link seguro por e-mail."}</p></div>
            <div className="mt-7 space-y-4">
              <div><Label htmlFor="email">E-mail</Label><Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@exemplo.com" /></div>
              {mode !== "forgot" && <div><div className="flex items-center justify-between"><Label htmlFor="password">Senha</Label>{mode === "login" && <Button variant="link" className="h-auto p-0 text-xs" onClick={() => setMode("forgot")}>Esqueci minha senha</Button>}</div><div className="relative"><Input id="password" type={showPassword ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} className="pr-11" /><Button type="button" size="icon" variant="ghost" className="absolute right-1 top-1 size-8" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</Button></div></div>}
              <Button className="w-full" disabled={busy} onClick={submit}>{busy && <LoaderCircle className="size-4 animate-spin" />}{mode === "login" ? "Entrar" : mode === "signup" ? "Criar conta" : "Enviar link"}</Button>
              {mode !== "forgot" && <><div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />ou<span className="h-px flex-1 bg-border" /></div><Button className="w-full" variant="outline" disabled={busy} onClick={signInGoogle}>Continuar com Google</Button></>}
              <p className="text-center text-sm text-muted-foreground">{mode === "login" ? "Ainda não tem conta?" : "Já tem uma conta?"} <Button variant="link" className="h-auto p-0" onClick={() => setMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? "Criar conta" : "Entrar"}</Button></p>
            </div>
          </>}
        </div>
      </section>
    </main>
  );
}