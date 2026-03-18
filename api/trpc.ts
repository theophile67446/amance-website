import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "../../server/routers";
import { createContext } from "../../server/_core/context";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.all(
  "/api/trpc/:path*",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default function handler(req: VercelRequest, res: VercelResponse): void {
  app(req as any, res as any);
}
