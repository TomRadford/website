import { defineLinks, layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { HomePage } from "@/app/pages/home";
import { AppLayout } from "./layout";
import { NotFoundPage } from "./pages/not-found";
import { PostsPage } from "./pages/posts";
import { FilmPage } from "./pages/film";
import { CreativeEngineerPage } from "./pages/creative-engineer";

export type AppContext = {};

/** Source of truth for all paths! */
const ROUTES = [
  { path: "/", component: HomePage },
  { path: "/posts", component: PostsPage },
  { path: "/film", component: FilmPage },
  { path: "/creative-engineer", component: CreativeEngineerPage },
] as const;

export type RouteType = (typeof ROUTES)[number]["path"];

export const link = defineLinks<RouteType[]>(ROUTES.map((r) => r.path));

const app = defineApp([
  setCommonHeaders(),
  render(Document, [
    layout(AppLayout, [...ROUTES.map((r) => route(r.path, r.component)), route("*", NotFoundPage)]),
  ]),
]);

export default app;
