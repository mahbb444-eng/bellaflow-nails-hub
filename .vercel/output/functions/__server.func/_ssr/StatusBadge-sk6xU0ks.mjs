import { D as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as cn } from "./button-BoWAuMqT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatusBadge-sk6xU0ks.js
var import_jsx_runtime = require_jsx_runtime();
var estilos = {
	Agendado: "bg-nude text-foreground/80 border-border",
	Confirmado: "bg-rose text-foreground border-rose",
	Realizado: "bg-primary/15 text-primary border-primary/30",
	Cancelado: "bg-destructive/10 text-destructive border-destructive/20"
};
function StatusBadge({ status, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium", estilos[status], className),
		children: status
	});
}
//#endregion
export { StatusBadge as t };
