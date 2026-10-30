/**
 * npm run ui  → browse problems and progress at http://localhost:4321
 * Reads the repo on every request, so refresh to see new problems/attempts.
 */
import { createServer } from "node:http";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT, readLog, topicState, CLEAN_SOLVES_TO_LEVEL_UP } from "../lib/progress.ts";
import { TOPICS } from "../lib/topics.ts";

const PORT = Number(process.env.PORT ?? 4321);
const PROBLEMS = join(ROOT, "problems");
const dirs = (p: string) => (existsSync(p) ? readdirSync(p, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort() : []);

function data() {
  const log = readLog();
  const folders = dirs(PROBLEMS);
  const topics = TOPICS.map((t) => {
    const folder = folders.find((f) => f.replace(/^\d+-/, "") === t.id);
    const levels = t.levels.map((description, i) => {
      const levelDir = folder ? join(PROBLEMS, folder, `level-${i + 1}`) : "";
      const problems = dirs(levelDir).map((slug) => {
        const dir = join(levelDir, slug);
        const read = (f: string) => (existsSync(join(dir, f)) ? readFileSync(join(dir, f), "utf8") : null);
        const meta = JSON.parse(read("meta.json") ?? "{}");
        const attempts = log.filter((a) => a.problem === `${t.id}/${slug}`);
        return { slug, path: `problems/${folder}/level-${i + 1}/${slug}`, meta, markdown: read("problem.md") ?? "", attempts };
      });
      return { level: i + 1, description, problems };
    });
    return { id: t.id, name: t.name, folder, levels, state: topicState(log, t.id) };
  });
  return { topics, log, cleanToLevelUp: CLEAN_SOLVES_TO_LEVEL_UP };
}

createServer((req, res) => {
  try {
    if (req.url === "/api/data") {
      res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify(data()));
    } else if (req.url === "/" || req.url === "/index.html") {
      res.writeHead(200, { "content-type": "text/html" }).end(readFileSync(join(ROOT, "ui", "index.html")));
    } else {
      res.writeHead(404).end("Not found");
    }
  } catch (e) {
    res.writeHead(500, { "content-type": "text/plain" }).end(String(e));
  }
}).listen(PORT, "127.0.0.1", () => console.log(`DSA Dojo UI → http://localhost:${PORT}`));
