import authConfig from "@/auth.config";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import images from "./images";
import users from "./users";

export const runtine = "nodejs";

const getAuthConfig = (c: Context): AuthConfig => {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig,
  };
};

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

const routes = app.route("/images", images).route("/users", users);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
