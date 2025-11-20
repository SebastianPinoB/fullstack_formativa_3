import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/mainLayout.tsx", [
    index("routes/home.tsx"),
    route("crearEnvio", "components/layouts/crearEnvio.tsx"),
    route("misEnvios", "components/layouts/misEnvios.tsx"),
    route("configuracion", "components/layouts/actualizarEncomienda.tsx"),
  ]),
] satisfies RouteConfig;
