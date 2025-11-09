import { layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { HomePage } from "@/app/pages/home";
import { AppLayout } from "./layout";
import { NotFoundPage } from "./pages/not-found";
import { AboutPage } from "./pages/about";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  render(Document, [
    layout(AppLayout, [route("/", HomePage), route("/about", AboutPage), route("*", NotFoundPage)]),
  ]),
]);
