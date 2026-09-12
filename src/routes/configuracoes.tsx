import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppLayout, Card } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBella } from "@/lib/bella-store";
import { brl } from "@/lib/bella-data";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — BellaFlow" },
      {
        name: "description",
        content: "Edite o perfil da profissional e gerencie a tabela de serviços do estúdio.",
      },
      { property: "og:title", content: "Configurações — BellaFlow" },
      { property: "og:description", content: "Perfil e tabela de serviços do seu estúdio." },
    ],
  }),
  component: ConfiguracoesPage,
});

function ConfiguracoesPage() {
  const { perfil, servicos, salvarPerfil, salvarServico, removerServico } = useBella();
  const [p, setP] = useState(perfil);
  const [novo, setNovo] = useState({ nome: "", preco: 0, duracao: 60 });

  return (
    <AppLayout titulo="Configurações" descricao="Seu perfil e sua tabela de serviços.">
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold">Perfil da profissional</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label>Nome</Label>
              <Input value={p.nome} onChange={(e) => setP({ ...p, nome: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <Label>Estúdio</Label>
              <Input value={p.estudio} onChange={(e) => setP({ ...p, estudio: e.target.value })} />
            </div>
            <div>
              <Label>Telefone</Label>
              <Input
                value={p.telefone}
                onChange={(e) => setP({ ...p, telefone: e.target.value })}
              />
            </div>
            <div>
              <Label>Instagram</Label>
              <Input
                value={p.instagram}
                onChange={(e) => setP({ ...p, instagram: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>E-mail</Label>
              <Input value={p.email} onChange={(e) => setP({ ...p, email: e.target.value })} />
            </div>
          </div>
          <Button
            className="mt-5"
            onClick={() => {
              salvarPerfil(p);
              toast.success("Perfil atualizado");
            }}
          >
            Salvar perfil
          </Button>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Serviços</h2>
          <div className="mt-4 space-y-2">
            {servicos.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-3 rounded-2xl bg-nude/50 px-4 py-3 text-sm"
              >
                <input
                  value={s.nome}
                  onChange={(e) => salvarServico({ ...s, nome: e.target.value })}
                  className="min-w-0 flex-1 bg-transparent font-medium outline-none"
                />
                <input
                  type="number"
                  value={s.preco}
                  onChange={(e) => salvarServico({ ...s, preco: Number(e.target.value) })}
                  className="w-20 rounded-lg border border-border bg-card px-2 py-1 text-right"
                />
                <input
                  type="number"
                  value={s.duracao}
                  onChange={(e) => salvarServico({ ...s, duracao: Number(e.target.value) })}
                  className="w-16 rounded-lg border border-border bg-card px-2 py-1 text-right"
                />
                <span className="text-xs text-muted-foreground">min</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-8"
                  onClick={() => removerServico(s.id)}
                  aria-label="Remover serviço"
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end">
            <div>
              <Label>Novo serviço</Label>
              <Input
                value={novo.nome}
                placeholder="Ex.: Banho de Fibra"
                onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
              />
            </div>
            <div>
              <Label>Preço</Label>
              <Input
                type="number"
                className="w-24"
                value={novo.preco}
                onChange={(e) => setNovo({ ...novo, preco: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Min</Label>
              <Input
                type="number"
                className="w-20"
                value={novo.duracao}
                onChange={(e) => setNovo({ ...novo, duracao: Number(e.target.value) })}
              />
            </div>
            <Button
              onClick={() => {
                if (!novo.nome.trim()) {
                  toast.error("Informe o nome do serviço");
                  return;
                }
                salvarServico(novo);
                setNovo({ nome: "", preco: 0, duracao: 60 });
                toast.success("Serviço adicionado");
              }}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Tabela atual: {servicos.map((s) => `${s.nome} ${brl(s.preco)}`).join(" · ")}
          </p>
        </Card>
      </div>
    </AppLayout>
  );
}
