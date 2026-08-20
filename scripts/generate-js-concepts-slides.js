import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { marked } from "marked";

const sourcePath = resolve("slides/product-optimization-02/js-concepts.md");
const outputPath = resolve("slides/product-optimization-02/index.html");
const source = readFileSync(sourcePath, "utf8");

const escapeHtml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const slugify = (value) =>
  value
    .toLowerCase()
    .replaceAll(/[`'’]/g, "")
    .replaceAll(/[^a-z0-9æøå]+/g, "-")
    .replaceAll(/^-|-$/g, "");

const render = (value) =>
  marked
    .parse(value.trim(), { mangle: false, headerIds: false })
    .replaceAll(
      /<pre><code class="language-(js|javascript)">/g,
      '<pre class="po-code"><code class="language-javascript">'
    )
    .replaceAll(/<pre><code class="language-jsx">/g, '<pre class="po-code"><code class="language-javascript jsx">')
    .replaceAll(/<pre><code class="language-text">/g, '<pre class="po-code"><code class="language-plaintext">');

const markdownChunks = (value) => {
  const lines = value
    .replaceAll(/^### (JavaScript|React)\s*$/gm, "")
    .trim()
    .split("\n");
  const blocks = [];
  let block = [];
  let inCode = false;

  for (const line of lines) {
    if (line.startsWith("```")) inCode = !inCode;
    if (!line.trim() && !inCode) {
      if (block.length) blocks.push(block.join("\n"));
      block = [];
      continue;
    }
    block.push(line);
  }
  if (block.length) blocks.push(block.join("\n"));

  const chunks = [];
  let current = [];
  let textLength = 0;
  let codeBlocks = 0;

  for (const currentBlock of blocks) {
    const isCode = currentBlock.startsWith("```");
    const tooLong = textLength + currentBlock.length > 1450;
    const wouldOverflow =
      current.length && ((tooLong && !isCode) || codeBlocks + (isCode ? 1 : 0) > 3);

    if (wouldOverflow) {
      chunks.push(current.join("\n\n"));
      current = [];
      textLength = 0;
      codeBlocks = 0;
    }

    current.push(currentBlock);
    textLength += currentBlock.length;
    codeBlocks += isCode ? 1 : 0;
  }

  if (current.length) chunks.push(current.join("\n\n"));
  return chunks;
};

const getSection = (lines, heading) => {
  const start = lines.findIndex((line) => line === heading);
  if (start < 0) return "";
  const end = lines.findIndex((line, index) => index > start && /^##? /.test(line));
  return lines
    .slice(start + 1, end < 0 ? lines.length : end)
    .join("\n")
    .trim();
};

const concepts = source
  .split(/^# (?=\d+ · )/m)
  .slice(1)
  .map((block) => {
    const lines = block.split("\n");
    const match = lines[0].match(/^(\d+) · (.+)$/);
    const number = Number(match[1]);
    const title = match[2];
    return {
      number,
      title,
      extra: title.includes("Ekstra"),
      slug: slugify(`${number}-${title}`),
      intro: lines.slice(1).join("\n"),
      what: getSection(lines, "## Hvad er det?"),
      why: getSection(lines, "## Hvorfor bruger vi det?"),
      how: getSection(lines, "## Hvordan bruges det?"),
      react: getSection(lines, "## I React"),
      task: getSection(lines, "## Prøv selv")
    };
  });

const chapterFor = (number) => {
  if (number === 1) return "Modules";
  if (number >= 2 && number <= 7) return "Functions";
  if (number >= 8 && number <= 18) return "Objects og arrays";
  if (number >= 19 && number <= 25) return "Array methods";
  if (number >= 26 && number <= 32) return "Strings og conditionals";
  if (number >= 33 && number <= 34) return "Events";
  return "Asynkron JavaScript og API'er";
};

const slide = (content, className = "po-slide", id = "") =>
  `<section class="${className}"${id ? ` id="${id}"` : ""}>${content}</section>`;
const eyebrow = (text) => `<span class="eyebrow">${text}</span>`;
const conceptHeading = (concept, label) => `${eyebrow(`${concept.number} · ${label}`)}<h2>${concept.title}</h2>`;
const chapterId = (chapter) => slugify(chapter);
const contentSlide = (concept, label, content, className = "po-slide", id = "") =>
  slide(`${conceptHeading(concept, label)}<div class="concept-copy">${render(content)}</div>`, className, id).replace(
    "<section ",
    `<section data-concept-number="${concept.number}" `
  );

const introSlides = [
  slide(
    `${eyebrow("Product Optimization · 3. semester")}<h1>JavaScript for <span>React</span></h1><p class="lead">Fra små JavaScript-koncepter til læsbar React-kode</p><p class="date"><span>RACE</span><time datetime="2026-08-21">21. august 2026</time></p>`,
    "po-slide po-title"
  ),
  slide(
    `${eyebrow("Dagens fokus")}<h2>React bliver lettere, når JavaScript er synligt</h2><div class="focus-split"><article class="focus-today"><h3>Først</h3><p>Forstå og afprøv ét JavaScript-koncept i en sandbox.</p><strong>Hvad gør koden?</strong></article><article class="focus-friday"><h3>Derefter</h3><p>Se det samme koncept i en React-komponent.</p><strong>Hvor bruger vi det?</strong></article></div>`
  ),
  slide(
    `${eyebrow("Arbejdsmåde")}<h2>Sådan er decket bygget</h2><div class="code-comparison"><article><h3>1 · Forstå</h3><p>Hvad er konceptet, og hvorfor findes det?</p></article><article><h3>2 · JavaScript</h3><p>Se konceptet i små, isolerede kodeeksempler.</p></article><article><h3>3 · React</h3><p>Kobl den samme idé til komponenter og props.</p></article><article><h3>4 · Opgave</h3><p>Brug konceptet i dit eget projekt.</p></article></div><p class="reflection">Kapitlerne går fra Functions til objekter, arrays, rendering, events og async kode. Brug decket som en modulbank: I når så langt, som tiden rækker.</p>`
  ),
  slide(
    `${eyebrow("Setup · Sandbox")}<h2>Et sikkert sted at eksperimentere</h2>${render("```text\nsrc/\n├── App.jsx\n└── sandbox/\n    └── sandbox.js\n```\n\nImportér `./sandbox/sandbox.js` i `App.jsx`, så filen bliver kørt.")}<p class="reflection">Sandboxen er til eksperimenter. Opret, ændr og slet frit undervejs.</p>`
  )
];

const conceptSlides = concepts.flatMap((concept) => {
  const chapter = chapterFor(concept.number);
  const taskId = `opgave-${concept.number}`;
  const chapterSlide =
    concept.number === 1 || chapterFor(concept.number - 1) !== chapter
      ? slide(
          `<span class="chapter-index">${String(concept.number).padStart(2, "0")}</span>${eyebrow(chapter)}<h2>${chapter}</h2><p class="kicker">Her arbejder vi med ét lille JavaScript-koncept ad gangen og kobler det straks til React.</p>`,
          "chapter po-chapter po-slide",
          chapterId(chapter)
        )
      : "";

  if (concept.extra) {
    return [
      chapterSlide,
      ...markdownChunks(`${concept.what}\n\n${concept.why}`).map((chunk, index) =>
        contentSlide(concept, index === 0 ? "Forstå" : "Forklaring", chunk, "po-slide", index === 0 ? concept.slug : "")
      ),
      ...markdownChunks(concept.how).map((chunk) => contentSlide(concept, "JavaScript", chunk)),
      ...markdownChunks(concept.task).map((chunk, index) =>
        contentSlide(
          concept,
          index === 0 ? "Prøv selv" : "Opgave",
          chunk,
          "po-slide mode-work",
          index === 0 ? taskId : ""
        )
      )
    ];
  }

  return [
    chapterSlide,
    ...markdownChunks(`${concept.what}\n\n${concept.why}`).map((chunk, index) =>
      contentSlide(concept, index === 0 ? "Forstå" : "Forklaring", chunk, "po-slide", index === 0 ? concept.slug : "")
    ),
    ...markdownChunks(concept.how).map((chunk) => contentSlide(concept, "JavaScript", chunk)),
    ...markdownChunks(concept.react).map((chunk) => contentSlide(concept, "React", chunk)),
    ...markdownChunks(concept.task).map((chunk, index) =>
      contentSlide(
        concept,
        index === 0 ? "Prøv selv" : "Opgave",
        chunk,
        "po-slide mode-work",
        index === 0 ? taskId : ""
      )
    )
  ];
});

const agenda = slide(
  `${eyebrow("Indhold")}<h2>40 koncepter · én oversigt</h2><div class="topic-cloud"><a href="#/modules">Moduler</a><a href="#/functions">Functions · 2–7</a><a href="#/objects-og-arrays">Objects og arrays · 8–18</a><a href="#/array-methods">Array methods · 19–25</a><a href="#/strings-og-conditionals">Strings og conditionals · 26–32</a><a href="#/events">Events · 33–34</a><a href="#/${chapterId("Asynkron JavaScript og API'er")}">Async og API’er · 35–40</a></div><div class="concept-index">${concepts.map((concept) => `<a href="#/${concept.slug}">${concept.number} · ${escapeHtml(concept.title)}</a>`).join("")}</div>`,
  "po-slide po-agenda"
);
const slides = [...introSlides, agenda, ...conceptSlides].filter(Boolean).join("\n\n");

const html = `<!doctype html>
<html lang="da">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="RACE · Product Optimization · JavaScript for React · 21. august 2026." />
    <title>JavaScript for React · RACE · 21.08.2026</title>
    <link rel="stylesheet" href="../vendor/reveal/reveal.css" />
    <link rel="stylesheet" href="../shared/theme.css" />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <div class="reveal"><div class="slides">${slides}</div></div>
    <script type="module" src="../shared/deck.js"></script>
  </body>
</html>`;

writeFileSync(outputPath, html);
console.log(`Generated ${concepts.length} concepts and ${slides.match(/<section /g).length} slides.`);
