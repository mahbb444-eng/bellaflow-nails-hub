import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/callback")({
  head: () => ({ meta: [
    { title: "Entrando — BellaFlow" },
    { name: "description", content: "Concluindo seu acesso ao BellaFlow." },
    { property: "og:title", content: "Entrando — BellaFlow" },
    { property: "og:description", content: "Concluindo seu acesso ao BellaFlow." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    const finish = async () => {
      for (let attempt = 0; attempt < 20; attempt += 1) {
        const { data } = await supabase.auth.getUser();
        if (!active) return;
        if (data.user) {
          await navigate({ to: "/", replace: true });
          return;
        }
        await new Promise((resolve) => window.setTimeout(resolve, 250));
      }
      await navigate({ to: "/auth", replace: true });
    };
    void finish();
    return () => { active = false; };
  }, [navigate]);

  return <main className="flex min-h-screen items-center justify-center bg-background px-5"><div className="text-center"><LoaderCircle className="mx-auto size-8 animate-spin text-primary" /><h1 className="mt-4 text-xl font-semibold">Concluindo seu acesso</h1><p className="mt-1 text-sm text-muted-foreground">Só mais um instante...</p></div></main>;
}