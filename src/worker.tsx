import { WorkerEntrypoint } from "cloudflare:workers";
import app from "./app";

export default class TomRadfordWebsite extends WorkerEntrypoint<Env> {
  constructor(ctx: ExecutionContext, env: Env) {
    super(ctx, env);
  }

  fetch(request: Request) {
    return app.fetch(request, this.env, this.ctx);
  }
}
