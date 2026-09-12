import { r as MESES } from "./bella-store-DnYRuEPP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bella-metrics-DrdByzhS.js
function faturamentoPorMes(atendimentos, meses = 6, ref = /* @__PURE__ */ new Date()) {
	const out = [];
	for (let i = meses - 1; i >= 0; i--) {
		const d = new Date(ref.getFullYear(), ref.getMonth() - i, 1);
		const chave = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
		const valor = atendimentos.filter((a) => a.data.slice(0, 7) === chave).reduce((s, a) => s + a.valor, 0);
		out.push({
			mes: MESES[d.getMonth()],
			valor
		});
	}
	return out;
}
function porServico(atendimentos) {
	const mapa = /* @__PURE__ */ new Map();
	atendimentos.forEach((a) => mapa.set(a.servico, (mapa.get(a.servico) ?? 0) + 1));
	return [...mapa.entries()].map(([nome, total]) => ({
		nome,
		total
	})).sort((a, b) => b.total - a.total);
}
function inicioDaSemana(ref) {
	const d = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate());
	d.setDate(d.getDate() - d.getDay());
	return d;
}
//#endregion
export { inicioDaSemana as n, porServico as r, faturamentoPorMes as t };
