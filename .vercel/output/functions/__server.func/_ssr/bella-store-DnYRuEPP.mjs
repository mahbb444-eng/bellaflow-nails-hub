import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DrXTX-Bw.mjs";
import { D as require_jsx_runtime, O as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bella-store-DnYRuEPP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SERVICOS_PADRAO = [
	{
		id: "s1",
		nome: "Alongamento",
		preco: 180,
		duracao: 120
	},
	{
		id: "s2",
		nome: "Manutenção",
		preco: 120,
		duracao: 90
	},
	{
		id: "s3",
		nome: "Esmaltação em Gel",
		preco: 90,
		duracao: 60
	},
	{
		id: "s4",
		nome: "Blindagem",
		preco: 80,
		duracao: 60
	},
	{
		id: "s5",
		nome: "Spa dos Pés",
		preco: 70,
		duracao: 50
	}
];
var PERFIL_PADRAO = {
	nome: "Camila Rocha",
	estudio: "BellaFlow Nail Studio",
	telefone: "(11) 98812-4477",
	instagram: "@camila.nails",
	email: "camila@bellaflow.com.br"
};
var NOMES = [
	"Ana Beatriz Moura",
	"Juliana Ferreira",
	"Patrícia Almeida",
	"Larissa Gonçalves",
	"Fernanda Ribeiro",
	"Camila Duarte",
	"Bruna Carvalho",
	"Mariana Teixeira",
	"Tatiane Souza",
	"Renata Pacheco",
	"Vanessa Lima",
	"Gabriela Nunes"
];
var PREFERENCIAS = [
	"Alongamento",
	"Manutenção",
	"Esmaltação em Gel",
	"Blindagem",
	"Spa dos Pés"
];
var OBS_CLIENTE = [
	"Prefere tons nude e francesinha.",
	"Alergia a acetona — usar removedor suave.",
	"Gosta de atendimento no fim da tarde.",
	"Sempre pede decoração na unha anelar.",
	"Unhas sensíveis, cutícula delicada.",
	"Cliente fiel desde 2023."
];
var pad = (n) => String(n).padStart(2, "0");
var toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
var brl = (v) => v.toLocaleString("pt-BR", {
	style: "currency",
	currency: "BRL"
});
var dataBR = (iso) => {
	const [y, m, d] = iso.split("-");
	return `${d}/${m}/${y}`;
};
var MESES = [
	"Jan",
	"Fev",
	"Mar",
	"Abr",
	"Mai",
	"Jun",
	"Jul",
	"Ago",
	"Set",
	"Out",
	"Nov",
	"Dez"
];
function gerarClientes() {
	return NOMES.map((nome, i) => ({
		id: `c${i + 1}`,
		nome,
		telefone: `(11) 9${pad(8 + i % 2)}${String(1e3 + i * 137).slice(0, 3)}-${String(2e3 + i * 311).slice(0, 4)}`,
		instagram: `@${nome.split(" ")[0].toLowerCase()}.${nome.split(" ")[1].toLowerCase()}`,
		nascimento: `19${85 + i % 12}-${pad(i * 3 % 12 + 1)}-${pad(i * 5 % 27 + 1)}`,
		preferencia: PREFERENCIAS[i % PREFERENCIAS.length],
		observacoes: OBS_CLIENTE[i % OBS_CLIENTE.length]
	}));
}
var HORAS = [
	"09:00",
	"10:30",
	"13:00",
	"14:30",
	"16:00",
	"17:30"
];
function gerarAgendamentos(hoje) {
	const lista = [];
	const statusCiclo = [
		"Agendado",
		"Confirmado",
		"Confirmado",
		"Agendado",
		"Cancelado"
	];
	for (let i = 0; i < 18; i++) {
		const s = SERVICOS_PADRAO[i % SERVICOS_PADRAO.length];
		const d = new Date(hoje);
		d.setDate(hoje.getDate() + (i < 6 ? 0 : (i - 6) % 12 + 1));
		lista.push({
			id: `a${i + 1}`,
			clienteId: `c${i % 12 + 1}`,
			servico: s.nome,
			data: toISO(d),
			hora: HORAS[i % HORAS.length],
			duracao: s.duracao,
			valor: s.preco,
			observacoes: i % 4 === 0 ? "Trazer referência de decoração." : "",
			status: i < 3 ? "Confirmado" : statusCiclo[i % statusCiclo.length]
		});
	}
	return lista;
}
function gerarAtendimentos(hoje) {
	const lista = [];
	for (let i = 0; i < 24; i++) {
		const s = SERVICOS_PADRAO[(i * 2 + 1) % SERVICOS_PADRAO.length];
		const d = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
		d.setDate(d.getDate() - (3 + i * 7));
		lista.push({
			id: `at${i + 1}`,
			clienteId: `c${i * 5 % 12 + 1}`,
			servico: s.nome,
			data: toISO(d),
			hora: HORAS[i % HORAS.length],
			valor: s.preco + i % 3 * 10,
			observacoes: i % 5 === 0 ? "Cliente elogiou o acabamento." : ""
		});
	}
	return lista;
}
var AuthContext = (0, import_react.createContext)({
	user: null,
	loading: true
});
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let active = true;
		supabase.auth.getUser().then(({ data }) => {
			if (!active) return;
			setUser(data.user);
			setLoading(false);
		});
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			setUser(session?.user ?? null);
			setLoading(false);
		});
		return () => {
			active = false;
			data.subscription.unsubscribe();
		};
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		user,
		loading
	}), [user, loading]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	return (0, import_react.useContext)(AuthContext);
}
var Ctx = (0, import_react.createContext)(null);
var KEY = "bellaflow:v1";
function estadoInicial(hoje) {
	return {
		clientes: gerarClientes(),
		agendamentos: gerarAgendamentos(hoje),
		atendimentos: gerarAtendimentos(hoje),
		servicos: SERVICOS_PADRAO,
		perfil: PERFIL_PADRAO,
		despesas: []
	};
}
var novoId = (p) => `${p}${Math.random().toString(36).slice(2, 9)}`;
function BellaProvider({ children }) {
	const { user, loading: authLoading } = useAuth();
	const hojeDate = (0, import_react.useMemo)(() => /* @__PURE__ */ new Date(), []);
	const [estado, setEstado] = (0, import_react.useState)(() => estadoInicial(hojeDate));
	const [carregando, setCarregando] = (0, import_react.useState)(true);
	const [prontoParaSalvar, setProntoParaSalvar] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		if (!user) {
			setCarregando(false);
			setProntoParaSalvar(false);
			return;
		}
		let active = true;
		const load = async () => {
			setCarregando(true);
			setProntoParaSalvar(false);
			const { data, error } = await supabase.from("app_states").select("state").eq("user_id", user.id).maybeSingle();
			if (!active) return;
			if (error) {
				console.error(error);
				setCarregando(false);
				return;
			}
			let next = estadoInicial(hojeDate);
			if (data?.state && typeof data.state === "object") next = {
				...next,
				...data.state,
				despesas: data.state.despesas ?? []
			};
			else {
				try {
					const raw = localStorage.getItem(KEY);
					if (raw) next = {
						...next,
						...JSON.parse(raw),
						despesas: JSON.parse(raw).despesas ?? []
					};
				} catch {}
				const { error: saveError } = await supabase.from("app_states").insert({
					user_id: user.id,
					state: next,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				});
				if (saveError) console.error(saveError);
				else localStorage.removeItem(KEY);
			}
			setEstado(next);
			setCarregando(false);
			setProntoParaSalvar(true);
		};
		load();
		return () => {
			active = false;
		};
	}, [
		authLoading,
		hojeDate,
		user
	]);
	(0, import_react.useEffect)(() => {
		if (!user || !prontoParaSalvar) return;
		const timer = window.setTimeout(() => {
			supabase.from("app_states").upsert({
				user_id: user.id,
				state: estado,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).then(({ error }) => {
				if (error) console.error(error);
			});
		}, 250);
		return () => window.clearTimeout(timer);
	}, [
		estado,
		prontoParaSalvar,
		user
	]);
	const nomeCliente = (0, import_react.useCallback)((id) => estado.clientes.find((c) => c.id === id)?.nome ?? "Cliente removida", [estado.clientes]);
	const value = {
		...estado,
		hoje: toISO(hojeDate),
		carregando,
		nomeCliente,
		salvarCliente: (c) => setEstado((e) => ({
			...e,
			clientes: c.id ? e.clientes.map((x) => x.id === c.id ? {
				...x,
				...c
			} : x) : [...e.clientes, {
				...c,
				id: novoId("c")
			}]
		})),
		removerCliente: (id) => setEstado((e) => ({
			...e,
			clientes: e.clientes.filter((c) => c.id !== id)
		})),
		salvarAgendamento: (a) => setEstado((e) => ({
			...e,
			agendamentos: a.id ? e.agendamentos.map((x) => x.id === a.id ? {
				...x,
				...a
			} : x) : [...e.agendamentos, {
				...a,
				id: novoId("a")
			}]
		})),
		removerAgendamento: (id) => setEstado((e) => ({
			...e,
			agendamentos: e.agendamentos.filter((a) => a.id !== id)
		})),
		alterarStatus: (id, status) => setEstado((e) => ({
			...e,
			agendamentos: e.agendamentos.map((a) => a.id === id ? {
				...a,
				status
			} : a)
		})),
		marcarRealizado: (id) => setEstado((e) => {
			const ag = e.agendamentos.find((a) => a.id === id);
			if (!ag || ag.status === "Realizado") return e;
			const novo = {
				id: novoId("at"),
				clienteId: ag.clienteId,
				servico: ag.servico,
				data: ag.data,
				hora: ag.hora,
				valor: ag.valor,
				observacoes: ag.observacoes
			};
			return {
				...e,
				agendamentos: e.agendamentos.map((a) => a.id === id ? {
					...a,
					status: "Realizado"
				} : a),
				atendimentos: [novo, ...e.atendimentos]
			};
		}),
		salvarServico: (s) => setEstado((e) => ({
			...e,
			servicos: s.id ? e.servicos.map((x) => x.id === s.id ? {
				...x,
				...s
			} : x) : [...e.servicos, {
				...s,
				id: novoId("s")
			}]
		})),
		removerServico: (id) => setEstado((e) => ({
			...e,
			servicos: e.servicos.filter((s) => s.id !== id)
		})),
		salvarPerfil: (p) => setEstado((e) => ({
			...e,
			perfil: p
		})),
		salvarDespesa: (d) => setEstado((e) => ({
			...e,
			despesas: d.id ? e.despesas.map((x) => x.id === d.id ? {
				...x,
				...d
			} : x) : [{
				...d,
				id: novoId("d")
			}, ...e.despesas]
		})),
		removerDespesa: (id) => setEstado((e) => ({
			...e,
			despesas: e.despesas.filter((d) => d.id !== id)
		}))
	};
	if (user && carregando) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto size-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "Preparando seu BellaFlow..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useBella() {
	const ctx = (0, import_react.useContext)(Ctx);
	if (!ctx) throw new Error("useBella precisa estar dentro de BellaProvider");
	return ctx;
}
//#endregion
export { dataBR as a, useBella as c, brl as i, BellaProvider as n, toISO as o, MESES as r, useAuth as s, AuthProvider as t };
