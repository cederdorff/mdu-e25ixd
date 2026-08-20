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
const renderInline = (value) => marked.parseInline(value);

const markdownBlocks = (value) => {
  const lines = value.trim().split("\n");
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
  return blocks;
};

const estimateBlockHeight = (block) => {
  if (block.startsWith("```")) return block.split("\n").length * 22 + 38;
  if (/^(?:[-*]|\d+\.)\s/m.test(block)) return block.split("\n").length * 29 + 22;
  const renderedLines = Math.max(1, Math.ceil(block.length / 92));
  return renderedLines * 29 + 14;
};

const estimateChunkHeight = (blocks) => {
  const codeHeight = blocks
    .filter((block) => block.startsWith("```"))
    .reduce((sum, block) => sum + estimateBlockHeight(block), 0);
  const narrativeHeight = blocks
    .filter((block) => !block.startsWith("```"))
    .reduce((sum, block) => sum + estimateBlockHeight(block), 0);
  return codeHeight && narrativeHeight ? Math.max(codeHeight, narrativeHeight) : codeHeight + narrativeHeight;
};

const markdownChunks = (value, targetHeight = 720, maxCodeBlocks = 4) => {
  const blocks = markdownBlocks(value);
  const codeCount = (chunk) => chunk.filter((block) => block.startsWith("```")).length;

  const chunks = [];
  let current = [];

  for (const currentBlock of blocks) {
    const candidate = [...current, currentBlock];
    const wouldOverflow =
      current.length && (estimateChunkHeight(candidate) > targetHeight || codeCount(candidate) > maxCodeBlocks);

    if (wouldOverflow) {
      chunks.push(current);
      current = [];
    }

    current.push(currentBlock);
  }

  if (current.length) chunks.push(current);

  const chunkHeight = (chunk) => estimateChunkHeight(chunk);
  for (let index = chunks.length - 1; index > 0; index--) {
    const currentChunk = chunks[index];
    const previousChunk = chunks[index - 1];
    if (chunkHeight(currentChunk) >= 230) continue;

    const combined = [...previousChunk, ...currentChunk];
    const allowedCodeBlocks = chunkHeight(currentChunk) < 140 ? maxCodeBlocks + 1 : maxCodeBlocks;

    if (
      chunkHeight(combined) <= targetHeight + 150 &&
      codeCount(combined) <= allowedCodeBlocks
    ) {
      chunks.splice(index - 1, 2, combined);
      continue;
    }

    const movable = previousChunk.at(-1);
    const previousWithoutMovable = previousChunk.slice(0, -1);
    if (
      previousWithoutMovable.length &&
      chunkHeight(previousWithoutMovable) >= 230 &&
      chunkHeight(currentChunk) + estimateBlockHeight(movable) <= targetHeight + 140 &&
      codeCount([movable, ...currentChunk]) <= maxCodeBlocks
    ) {
      chunks[index - 1] = previousWithoutMovable;
      chunks[index] = [movable, ...currentChunk];
    }
  }

  return chunks.map((chunk) => chunk.join("\n\n"));
};

const splitSubsections = (value) => {
  const lines = value.trim().split("\n");
  const sections = [];
  let title = "";
  let content = [];
  let inCode = false;

  const push = () => {
    const body = content.join("\n").trim();
    if (body) sections.push({ title, content: body });
  };

  for (const line of lines) {
    if (line.startsWith("```")) inCode = !inCode;
    const heading = !inCode && line.match(/^### (.+)$/);
    if (heading) {
      push();
      title = heading[1];
      content = [];
    } else {
      content.push(line);
    }
  }
  push();
  return sections.length ? sections : [{ title: "", content: value.trim() }];
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
  if (number >= 8 && number <= 13) return "Objects";
  if (number >= 14 && number <= 18) return "Arrays";
  if (number >= 19 && number <= 25) return "Array methods";
  if (number >= 26 && number <= 32) return "Strings og conditionals";
  if (number >= 33 && number <= 34) return "Events";
  return "Asynkron JavaScript og API'er";
};

const slide = (content, className = "po-slide", id = "") =>
  `<section class="${className}"${id ? ` id="${id}"` : ""}>${content}</section>`;
const eyebrow = (text) => `<span class="eyebrow">${text}</span>`;
const conceptHeading = (concept, label, subtitle = "") =>
  `${eyebrow(`${concept.number} · ${label}`)}<h2>${renderInline(concept.title)}</h2>${subtitle ? `<p class="concept-subtitle">${renderInline(subtitle)}</p>` : ""}`;
const chapterId = (chapter) => slugify(chapter);

const renderContentLayout = (content) => {
  const blocks = markdownBlocks(content);
  const codeBlocks = blocks.filter((block) => block.startsWith("```"));
  const narrativeBlocks = blocks.filter((block) => !block.startsWith("```"));

  if (!codeBlocks.length) {
    return `<div class="concept-copy concept-copy--prose">${render(content)}</div>`;
  }
  if (!narrativeBlocks.length) {
    return `<div class="concept-copy concept-copy--code-only">${render(content)}</div>`;
  }
  if (
    codeBlocks.length === 1 &&
    narrativeBlocks.join(" ").length < 160 &&
    codeBlocks[0].split("\n").length <= 10
  ) {
    return `<div class="concept-copy concept-copy--focus"><div class="concept-narrative">${render(narrativeBlocks.join("\n\n"))}</div><div class="concept-code-stack">${render(codeBlocks[0])}</div></div>`;
  }
  return `<div class="concept-copy concept-copy--split"><div class="concept-narrative">${render(narrativeBlocks.join("\n\n"))}</div><div class="concept-code-stack">${render(codeBlocks.join("\n\n"))}</div></div>`;
};

const contentSlide = ({ concept, label, subtitle = "", content, stage, className = "po-slide", id = "" }) =>
  slide(`${conceptHeading(concept, label, subtitle)}${renderContentLayout(content)}`, `${className} concept-stage concept-stage--${stage}`, id).replace(
    "<section ",
    `<section data-concept-number="${concept.number}" data-concept-stage="${stage}" `
  );

const stageSlides = ({
  concept,
  source,
  stage,
  label,
  className = "po-slide",
  id = "",
  targetHeight = 720,
  maxCodeBlocks = 4
}) => {
  const pieces = splitSubsections(source).flatMap((subsection) =>
    markdownChunks(subsection.content, targetHeight, maxCodeBlocks).map((content) => ({
      subtitle: subsection.title,
      content
    }))
  );

  return pieces.map((piece, index) => {
    const taskContext = stage === "task" && /^(JavaScript|React)$/.test(piece.subtitle) ? ` · ${piece.subtitle}` : "";
    const continuation = pieces.length > 1 ? ` · ${index + 1}/${pieces.length}` : "";
    const subtitle = taskContext ? "" : piece.subtitle;
    return contentSlide({
      concept,
      label: `${label}${taskContext}${continuation}`,
      subtitle,
      content: piece.content,
      stage,
      className,
      id: index === 0 ? id : ""
    });
  });
};

const introSlides = [
  slide(
    `${eyebrow("Product Optimization · 3. semester")}<h1>JavaScript for <span>React</span></h1><p class="lead">Fra små JavaScript-koncepter til læsbar React-kode</p><p class="date"><span>RACE</span><time datetime="2026-08-21">21. august 2026</time></p>`,
    "po-slide po-title"
  ),
  slide(
    `${eyebrow("Rammen for dagen")}<h2>React er JavaScript med et komponentlag ovenpå</h2><div class="focus-split"><article class="focus-today"><h3>Det vi træner</h3><p>At læse, forklare og ændre den JavaScript-kode, som React bygger på.</p><strong>Gør JavaScript synligt</strong></article><article class="focus-friday"><h3>Det vi ikke gør</h3><p>Vi forsøger ikke at lære 40 koncepter udenad eller nå alle slides i samme tempo.</p><strong>Forstå mønstrene</strong></article></div><p class="focus-footnote">Målet er ikke mere kode. Målet er, at den kode I allerede møder i React, bliver lettere at gennemskue.</p>`,
    "po-slide",
    "rammen-for-dagen"
  ),
  slide(
    `${eyebrow("Dagens forløb")}<h2>Vi begynder i jeres kode — og bygger derfra</h2><div class="day-flow"><article><span>01</span><h3>Sæt rammen</h3><p>Hvorfor JavaScript er nøglen til at forstå React.</p></article><article><span>02</span><h3>Se tilbage</h3><p>Korte eksempler fra jeres projekter på 2. semester.</p></article><article><span>03</span><h3>Arbejd fremad</h3><p>Ét koncept ad gangen: JavaScript, React og en lille opgave.</p></article></div>`
  ),
  slide(
    `${eyebrow("Eksempler fra 2. semester")}<h2>Kan I forklare koden sammen?</h2><p class="pair-review-lead">Find det kodeeksempel frem, du valgte som forberedelse.</p><div class="pair-review"><article><span>01</span><h3>Præsenter</h3><p>Vis eksemplet, giv kort kontekst, og fortæl, hvad du tror, koden gør.</p></article><article><span>02</span><h3>Peg på tvivlen</h3><p>Markér den linje eller syntaks, du har svært ved at forklare.</p></article><article><span>03</span><h3>Undersøg sammen</h3><p>Lad din sidemakker stille spørgsmål og hjælpe med at forklare koden.</p></article><article><span>04</span><h3>Vurder</h3><p>Kan du nu forklare eksemplet med dine egne ord? Byt derefter roller.</p></article></div><div class="pair-outcomes"><p><strong>Afklaret?</strong> Behold forklaringen i dine egne noter.</p><p><strong>Stadig uklart?</strong> Del kode eller link, din nuværende forklaring og dit konkrete spørgsmål i <a href="https://padlet.com/race_js/js_react_eksempler" target="_blank" rel="noreferrer">Padlet</a>.</p></div>`,
    "po-slide mode-work",
    "eksempler-fra-andet-semester"
  ),
  slide(
    `${eyebrow("Når vi læser eksemplerne")}<h2>Vi leder efter seks tilbagevendende spørgsmål</h2><div class="reading-lenses"><article><span>01</span><h3>Hvor kommer koden fra?</h3><p>Modules</p></article><article><span>02</span><h3>Hvad bliver kørt?</h3><p>Functions</p></article><article><span>03</span><h3>Hvordan ser data ud?</h3><p>Objects og arrays</p></article><article><span>04</span><h3>Hvordan ændres data?</h3><p>Array methods</p></article><article><span>05</span><h3>Hvad bliver vist?</h3><p>Conditionals og events</p></article><article><span>06</span><h3>Hvornår kommer data?</h3><p>Async og API’er</p></article></div>`
  ),
  slide(
    `${eyebrow("Arbejdsmåde")}<h2>Hvert koncept følger den samme rytme</h2><div class="code-comparison concept-rhythm"><article><h3>1 · Forstå</h3><p>Hvad gør konceptet, og hvorfor findes det?</p></article><article><h3>2 · JavaScript</h3><p>Læs og afprøv et lille, isoleret eksempel.</p></article><article><h3>3 · React</h3><p>Genkend den samme idé i en komponent.</p></article><article><h3>4 · Prøv selv</h3><p>Brug konceptet i dit eget projekt.</p></article></div><p class="reflection">Kerne først. Slides markeret <strong>Ekstra</strong> er fordybelse, hvis tiden og behovet er der.</p>`
  ),
  slide(
    `${eyebrow("Setup · Sandbox")}<h2>Et sikkert sted at eksperimentere</h2><div class="sandbox-layout">${render("```text\nsrc/\n├── App.jsx\n└── sandbox/\n    └── sandbox.js\n```")}<div><p>Importér <code>./sandbox/sandbox.js</code> i <code>App.jsx</code>, så filen bliver kørt.</p><pre class="po-code"><code class="language-javascript jsx">// App.jsx\nimport \"./sandbox/sandbox.js\";</code></pre></div></div><p class="reflection">Sandboxen er til eksperimenter. Opret, ændr og slet frit undervejs.</p>`
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

  return [
    chapterSlide,
    ...stageSlides({ concept, source: concept.what, stage: "what", label: "Forstå", id: concept.slug, targetHeight: 650, maxCodeBlocks: 3 }),
    ...stageSlides({ concept, source: concept.why, stage: "why", label: "Hvorfor", targetHeight: 650, maxCodeBlocks: 3 }),
    ...stageSlides({ concept, source: concept.how, stage: "how", label: "JavaScript", targetHeight: 690 }),
    ...stageSlides({ concept, source: concept.react, stage: "react", label: "React", className: "po-slide mode-shared", targetHeight: 690 }),
    ...stageSlides({ concept, source: concept.task, stage: "task", label: "Prøv selv", className: "po-slide mode-work", id: taskId, targetHeight: 620 })
  ];
});

const agenda = slide(
  `${eyebrow("Agenda")}<h2>Fra egne eksempler til React-kode, I kan forklare</h2><div class="agenda-columns"><div class="agenda-column"><h3>Fælles start</h3><ol class="agenda-track"><li><a href="#/rammen-for-dagen"><strong>Rammen for dagen</strong><small>Hvorfor vi tager et skridt tilbage til JavaScript</small></a></li><li><a href="#/eksempler-fra-andet-semester"><strong>Eksempler fra 2. semester</strong><small>Hvad virker, men er stadig svært at forklare?</small></a></li><li><a href="#/modules"><strong>Koncept for koncept</strong><small>Forstå → JavaScript → React → prøv selv</small></a></li></ol></div><div class="agenda-column"><h3>Konceptbank</h3><ol class="agenda-track concept-groups"><li><a href="#/modules"><strong>Modules og functions</strong><small>1–7</small></a></li><li><a href="#/objects"><strong>Objects</strong><small>8–13</small></a></li><li><a href="#/arrays"><strong>Arrays</strong><small>14–18</small></a></li><li><a href="#/array-methods"><strong>Array methods</strong><small>19–25</small></a></li><li><a href="#/strings-og-conditionals"><strong>Strings og conditionals</strong><small>26–32</small></a></li><li><a href="#/events"><strong>Events</strong><small>33–34</small></a></li><li><a href="#/${chapterId("Asynkron JavaScript og API'er")}"><strong>Async og API’er</strong><small>35–40</small></a></li></ol></div></div><p class="agenda-note"><strong>40 koncepter er en modulbank.</strong> Vi prioriterer kernekoncepterne og bruger de markerede ekstra-emner efter behov.</p>`,
  "po-slide po-agenda",
  "agenda"
);

const conceptIndexSlides = [
  slide(
    `${eyebrow("Indeks · 1/2")}<h2>Find hurtigt et koncept</h2><div class="concept-index">${concepts.slice(0, 21).map((concept) => `<a class="${concept.extra ? "is-extra" : ""}" href="#/${concept.slug}"><span class="concept-number">${String(concept.number).padStart(2, "0")}</span><span class="concept-label">${renderInline(concept.title)}</span></a>`).join("")}</div>`,
    "po-slide po-concept-index",
    "konceptindeks"
  ),
  slide(
    `${eyebrow("Indeks · 2/2")}<h2>Strings, events og async</h2><div class="concept-index">${concepts.slice(21).map((concept) => `<a class="${concept.extra ? "is-extra" : ""}" href="#/${concept.slug}"><span class="concept-number">${String(concept.number).padStart(2, "0")}</span><span class="concept-label">${renderInline(concept.title)}</span></a>`).join("")}</div><p class="index-note">De tonede emner er <strong>Ekstra</strong>: brug dem til fordybelse eller som opslagsværk.</p>`,
    "po-slide po-concept-index"
  )
];

const closingSlides = [
  slide(
    `${eyebrow("Opsamling")}<h2>Kan du nu forklare dit eget kodeeksempel?</h2><div class="closing-review"><article><span>01</span><h3>Find mønstrene</h3><p>Markér de JavaScript-koncepter, du kan genkende i koden.</p></article><article><span>02</span><h3>Forklar flowet</h3><p>Fortæl med dine egne ord, hvad der sker – linje for linje.</p></article><article><span>03</span><h3>Vælg næste spørgsmål</h3><p>Notér præcist, hvad du stadig mangler at forstå.</p></article></div><p class="closing-padlet"><strong>Stadig i tvivl?</strong> Opdatér dit opslag eller tilføj spørgsmålet i <a href="https://padlet.com/race_js/js_react_eksempler" target="_blank" rel="noreferrer">Padlet</a>.</p>`,
    "po-slide mode-work",
    "opsamling"
  )
];

const slides = [introSlides[0], introSlides[1], introSlides[2], agenda, ...introSlides.slice(3), ...conceptIndexSlides, ...conceptSlides, ...closingSlides]
  .filter(Boolean)
  .join("\n\n");

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
