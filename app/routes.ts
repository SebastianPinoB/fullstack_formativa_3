import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/mainLayout.tsx", [
    index("routes/home.tsx"),
    route("crearEnvio", "components/organisms/crearEnvio.tsx"),
    route("misEnvios", "components/organisms/misEnvios.tsx"),
    route("configuracion", "components/organisms/configuracion.tsx"),
  ]),
] satisfies RouteConfig;
