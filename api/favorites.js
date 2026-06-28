import path from "path";
import fs from "fs/promises";
import { readJsonBody } from "../server.js";

const DATA_DIR = path.join(process.cwd(), "data");
const FAVORITES_FILE = path.join(DATA_DIR, "favorites.json");

async function ensureFavoritesStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(FAVORITES_FILE);
  } catch {
    await fs.writeFile(FAVORITES_FILE, "[]\n");
  }
}

export async function handler(req, res) {
  await ensureFavoritesStore();
  if (req.method === "GET") {
    const raw = await fs.readFile(FAVORITES_FILE, "utf8");
    const favorites = JSON.parse(raw || "[]");
    return { status: 200, body: { favorites } };
  }
  if (req.method === "POST") {
    const payload = await readJsonBody(req);
    if (!Array.isArray(payload.favorites)) {
      return { status: 400, body: { error: "Invalid payload, expected { favorites: [] }" } };
    }
    await fs.writeFile(FAVORITES_FILE, `${JSON.stringify(payload.favorites, null, 2)}\n`);
    return { status: 200, body: { success: true } };
  }
  return { status: 405, body: { error: "Method not allowed" } };
}
