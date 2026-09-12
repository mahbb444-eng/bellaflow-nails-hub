import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [
    { title: "Nova senha — BellaFlow" },
    { name: "description", content: "Defina uma nova senha para sua conta BellaFlow." },
    { property: "og:title", content: "Nova senha — BellaFlow" },
    { property: "og:description", content: "Defina uma nova senha para sua conta BellaFlow." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    setReady(hash.get("type") === "recovery" || hash.has("access_token"));
  }, []);

  return <main className="flex min-h-screen items-center justify-center bg-background px-5"><div className="w-full max-w-md rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"><span className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary"><KeyRound className="size-5" /></span><h1 className="mt-5 text-3xl font-semibold">Crie uma nova senha</h1><p className="mt-2 text-sm text-muted-foreground">Use pelo menos 6 caracteres.</p>{ready ? <div className="mt-6 space-y-4"><div><Label htmlFor="new-password">Nova senha</Label><Input id="new-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div><Button className="w-full" disabled={busy} onClick={async () => { if (password.length < 6) { toast.error("Use pelo menos 6 caracteres"); return; } setBusy(true); const { error } = await supabase.auth.updateUser({ password }); setBusy(false); if (error) { toast.error(error.message); return; } toast.success("Senha atualizada"); await navigate({ to: "/", replace: true }); }}>Salvar nova senha</Button></div> : <><p className="mt-6 text-sm text-destructive">Este link é inválido ou expirou.</p><Button className="mt-4 w-full" variant="outline" onClick={() => navigate({ to: "/auth" })}>Voltar para entrar</Button></>}</div></main>;
}