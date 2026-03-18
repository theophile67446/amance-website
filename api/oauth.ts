import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { registerOAuthRoutes } from "../../server/_core/oauth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

registerOAuthRoutes(app);

export default function handler(req: VercelRequest, res: VercelResponse): void {
  app(req as any, res as any);
}
