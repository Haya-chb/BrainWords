import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("game", "routes/game.jsx"),
  route("end", "routes/end.jsx"),

] satisfies RouteConfig;