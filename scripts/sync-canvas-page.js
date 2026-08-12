#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";
import { marked } from "marked";

const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith("--")));
const fileArgument = args.find((arg) => !arg.startsWith("--"));

if (!fileArgument || flags.has("--help")) {
  console.log(`
Brug:
  npm run canvas:preview -- <markdown-fil>
  npm run canvas:sync -- <markdown-fil> [--publish] [--notify]

Standardadfærd:
  preview       Udskriver titel og Canvas-HTML uden API-kald.
  sync          Opretter siden som kladde eller opdaterer en eksisterende side.
                Opdaterer også et entydigt tilknyttet modul og modulpunkt.
  --publish     Publicerer siden. Uden flaget bevares status på eksisterende sider.
  --notify      Beder Canvas om at sende opdateringsnotifikation.
`);
  process.exit(flags.has("--help") ? 0 : 1);
}

await loadLocalEnv(resolve(".env"));

const sourcePath = resolve(fileArgument);
const markdown = await readFile(sourcePath, "utf8");
const { title, bodyMarkdown } = splitTitle(markdown);
const body = await marked.parse(bodyMarkdown, {
  gfm: true,
  breaks: false,
});

if (!flags.has("--push")) {
  console.log(`Titel: ${title}\n`);
  console.log(body.trim());
  process.exit(0);
}

const baseUrl = requiredEnv("CANVAS_BASE_URL").replace(/\/$/, "");
const courseId = requiredEnv("CANVAS_COURSE_ID");
const token = requiredEnv("CANVAS_ACCESS_TOKEN");
const pagesUrl = `${baseUrl}/api/v1/courses/${encodeURIComponent(courseId)}/pages`;

const matches = await findPagesByTitle(pagesUrl, title, token);
if (matches.length > 1) {
  throw new Error(`Canvas har flere sider med titlen "${title}". Omdøb dubletterne, før du synkroniserer.`);
}

const existingPage = matches[0];
const endpoint = existingPage
  ? `${pagesUrl}/${encodeURIComponent(existingPage.url)}`
  : pagesUrl;
const method = existingPage ? "PUT" : "POST";
const form = new URLSearchParams();

form.set("wiki_page[title]", title);
form.set("wiki_page[body]", body);
form.set("wiki_page[notify_of_update]", String(flags.has("--notify")));

if (!existingPage) {
  form.set("wiki_page[editing_roles]", "teachers");
}

if (!existingPage || flags.has("--publish")) {
  form.set("wiki_page[published]", String(flags.has("--publish")));
}

const page = await canvasRequest(endpoint, token, {
  method,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: form,
});

const action = existingPage ? "Opdateret" : "Oprettet";
console.log(`${action}: ${page.title}`);
console.log(`${baseUrl}/courses/${courseId}/pages/${page.url}`);
console.log(`Status: ${page.published ? "publiceret" : "kladde"}`);

if (flags.has("--sync-module")) {
  await syncLinkedModule({ baseUrl, courseId, page, token });
}

function splitTitle(source) {
  const lines = source.replace(/^\uFEFF/, "").split(/\r?\n/);
  const titleIndex = lines.findIndex((line) => /^#\s+\S/.test(line));

  if (titleIndex === -1) {
    throw new Error("Markdown-filen skal have en H1-titel (# Titel). Titel bruges som Canvas-sidens navn.");
  }

  const title = lines[titleIndex].replace(/^#\s+/, "").trim();
  lines.splice(titleIndex, 1);
  return { title, bodyMarkdown: lines.join("\n").trim() };
}

async function findPagesByTitle(pagesUrl, title, token) {
  const searchUrl = new URL(pagesUrl);
  searchUrl.searchParams.set("search_term", title);
  searchUrl.searchParams.set("per_page", "100");
  const pages = await canvasRequest(searchUrl, token);
  return pages.filter((page) => page.title.trim() === title);
}

async function syncLinkedModule({ baseUrl, courseId, page, token }) {
  const sequenceUrl = new URL(`${baseUrl}/api/v1/courses/${encodeURIComponent(courseId)}/module_item_sequence`);
  sequenceUrl.searchParams.set("asset_type", "Page");
  sequenceUrl.searchParams.set("asset_id", page.url);

  const sequence = await canvasRequest(sequenceUrl, token);
  const linkedItems = sequence.items
    .map((entry) => entry.current)
    .filter((item) => item?.type === "Page" && item.page_url === page.url);
  const moduleIds = [...new Set(linkedItems.map((item) => item.module_id))];

  if (moduleIds.length === 0) {
    console.log("Modul: Siden er endnu ikke tilføjet til et modul; intet modulnavn blev ændret.");
    return;
  }

  if (moduleIds.length > 1) {
    throw new Error(`Siden findes i ${moduleIds.length} moduler. Modulnavne blev ikke ændret automatisk.`);
  }

  const moduleId = moduleIds[0];
  const linkedModule = sequence.modules.find((module) => module.id === moduleId);
  if (!linkedModule) {
    throw new Error(`Canvas returnerede modulpunktet, men ikke modul ${moduleId}.`);
  }

  if (linkedModule.name !== page.title) {
    const form = new URLSearchParams();
    form.set("module[name]", page.title);
    await canvasRequest(
      `${baseUrl}/api/v1/courses/${encodeURIComponent(courseId)}/modules/${encodeURIComponent(moduleId)}`,
      token,
      {
        method: "PUT",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form,
      },
    );
    console.log(`Modulnavn opdateret: ${page.title}`);
  } else {
    console.log("Modulnavn: allerede synkroniseret.");
  }

  for (const item of linkedItems) {
    if (item.title === page.title) continue;
    const form = new URLSearchParams();
    form.set("module_item[title]", page.title);
    await canvasRequest(
      `${baseUrl}/api/v1/courses/${encodeURIComponent(courseId)}/modules/${encodeURIComponent(moduleId)}/items/${encodeURIComponent(item.id)}`,
      token,
      {
        method: "PUT",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form,
      },
    );
    console.log(`Modulpunkt opdateret: ${page.title}`);
  }
}

async function canvasRequest(url, token, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const responseText = await response.text();
  let data;
  try {
    data = responseText ? JSON.parse(responseText) : null;
  } catch {
    data = responseText;
  }

  if (!response.ok) {
    const message = typeof data === "string" ? data : JSON.stringify(data);
    throw new Error(`Canvas API ${response.status} ${response.statusText}: ${message}`);
  }

  return data;
}

function requiredEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} mangler. Kopiér .env.example til .env, og udfyld værdien.`);
  }
  return value;
}

async function loadLocalEnv(path) {
  let source;
  try {
    source = await readFile(path, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }

  for (const line of source.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match || line.trimStart().startsWith("#")) continue;

    const [, name, rawValue] = match;
    const value = rawValue.replace(/^(['"])(.*)\1$/, "$2");
    if (process.env[name] === undefined) process.env[name] = value;
  }
}
