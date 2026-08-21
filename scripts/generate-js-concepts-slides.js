import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { marked } from "marked";

const sourcePath = resolve("undervisning/product-optimization/js-concepts.md");
const outputPath = resolve("slides/product-optimization-02/index.html");
const textMaterialUrl =
  "https://github.com/cederdorff/MDU-E25IXD/blob/main/undervisning/product-optimization/js-concepts.md";
const source = readFileSync(sourcePath, "utf8");

const escapeHtml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const slugify = (value) =>
  value
    .toLowerCase()
    .replaceAll(/[`'’]/g, "")
    .replaceAll(/[^a-z0-9æøå]+/g, "-")
    .replaceAll(/^-|-$/g, "");

const compactSimpleObjectsInCode = (value) =>
  value.replaceAll(/```([^\n]*)\n([\s\S]*?)```/g, (fence, language, code) => {
    const compacted = code.replaceAll(
      /\{\n((?:[ \t]+[A-Za-z_$][\w$]*:\s*[^\n]+,?\n){2,})[ \t]*\}/g,
      (_object, properties) => `{ ${properties.trim().split("\n").map((line) => line.trim()).join(" ")} }`
    );
    return `\`\`\`${language}\n${compacted}\`\`\``;
  });

const render = (value) =>
  marked
    .parse(compactSimpleObjectsInCode(value.trim()), { mangle: false, headerIds: false })
    .replaceAll(
      /<pre><code class="language-(js|javascript)">/g,
      '<pre class="po-code"><code class="language-javascript">'
    )
    .replaceAll(/<pre><code class="language-jsx">/g, '<pre class="po-code"><code class="language-javascript jsx">')
    .replaceAll(/<pre><code class="language-json">/g, '<pre class="po-code"><code class="language-json">')
    .replaceAll(/<pre><code class="language-text">/g, '<pre class="po-code"><code class="language-plaintext">');
const renderInline = (value) => marked.parseInline(value);

const cleanNarrativeLead = (value) => {
  const withoutColon = value.trim().replace(/:\s*$/, "");
  return withoutColon.replace(/^(kan|eller|og|bruger|vises|vil)\b/u, (word) =>
    `${word.charAt(0).toUpperCase()}${word.slice(1)}`
  );
};

const renderNarrativeBlocks = (blocks) => {
  const cleaned = blocks.map(cleanNarrativeLead);
  const simpleProse = cleaned.every((block) => !/^(?:#{1,6}|[-*]|\d+\.|>|```)/m.test(block));

  if (simpleProse && cleaned.length > 1) {
    return `<ul class="concept-points">${cleaned.map((block) => `<li>${renderInline(block)}</li>`).join("")}</ul>`;
  }

  return render(cleaned.join("\n\n"));
};

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
  if (block.startsWith("```")) return block.split("\n").length * 28 + 48;
  if (/^(?:[-*]|\d+\.)\s/m.test(block)) return block.split("\n").length * 34 + 24;
  const renderedLines = Math.max(1, Math.ceil(block.length / 64));
  return renderedLines * 36 + 16;
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
    if (
      chunkHeight(combined) <= targetHeight + 40 &&
      codeCount(combined) <= maxCodeBlocks
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
  let parentTitle = "";
  let content = [];
  let inCode = false;

  const push = () => {
    const body = content.join("\n").trim();
    if (body) sections.push({ title, content: body });
  };

  for (const line of lines) {
    if (line.startsWith("```")) inCode = !inCode;
    const heading = !inCode && line.match(/^(###|####) (.+)$/);
    if (heading) {
      push();
      if (heading[1] === "###") {
        parentTitle = heading[2];
        title = parentTitle;
      } else {
        title = parentTitle ? `${parentTitle} · ${heading[2]}` : heading[2];
      }
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
  const narrativeHeight = estimateChunkHeight(narrativeBlocks);
  const narrativeDensityClass =
    narrativeHeight <= 190
      ? "concept-copy--roomy"
      : narrativeHeight <= 320
        ? "concept-copy--comfortable"
        : "concept-copy--dense";

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
    return `<div class="concept-copy concept-copy--focus"><div class="concept-narrative">${renderNarrativeBlocks(narrativeBlocks)}</div><div class="concept-code-stack">${render(codeBlocks[0])}</div></div>`;
  }
  return `<div class="concept-copy concept-copy--split ${narrativeDensityClass}"><div class="concept-narrative">${renderNarrativeBlocks(narrativeBlocks)}</div><div class="concept-code-stack">${render(codeBlocks.join("\n\n"))}</div></div>`;
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
    const taskContext =
      stage === "task" && /^(JavaScript|React)(?: · Ekstra)?$/.test(piece.subtitle) ? ` · ${piece.subtitle}` : "";
    const isTaskExtra = stage === "task" && piece.subtitle.endsWith(" · Ekstra");
    const continuation = pieces.length > 1 ? ` · ${index + 1}/${pieces.length}` : "";
    const subtitle = taskContext ? "" : piece.subtitle;
    return contentSlide({
      concept,
      label: `${label}${taskContext}${continuation}`,
      subtitle,
      content: piece.content,
      stage,
      className: `${className}${isTaskExtra ? " concept-stage--task-extra" : ""}`,
      id: index === 0 ? id : ""
    });
  });
};

const selectNarrative = (value, maxBlocks = 2, maxCharacters = 520) => {
  const selected = [];
  let characters = 0;

  for (const block of markdownBlocks(value).filter((item) => !item.startsWith("```"))) {
    if (selected.length >= maxBlocks) break;
    if (selected.length && characters + block.length > maxCharacters) break;
    selected.push(block);
    characters += block.length;
  }

  return selected.join("\n\n");
};

const selectCode = (value, maxBlocks = 1, maxLines = 20) => {
  const selected = [];
  let lines = 0;

  for (const block of markdownBlocks(value).filter((item) => item.startsWith("```"))) {
    const blockLines = block.split("\n").length;
    if (selected.length >= maxBlocks) break;
    if (selected.length && lines + blockLines > maxLines) break;
    selected.push(block);
    lines += blockLines;
  }

  return selected.join("\n\n");
};

const taskSection = (value, title) => {
  const section = splitSubsections(value).find((item) => item.title === title);
  return section ? section.content.trim().replace(/\n---\s*$/u, "") : "";
};

const conceptSection = (concept, content, className, id = "", stage = "overview") =>
  slide(content, className, id).replace(
    "<section ",
    `<section data-concept-number="${concept.number}" data-concept-stage="${stage}" `
  );

const conceptFoundationSlide = (concept) => {
  const content = [
    selectNarrative(concept.what, 2, 500),
    selectNarrative(concept.why, 1, 320),
    selectCode(concept.what, 2, 18)
  ]
    .filter(Boolean)
    .join("\n\n");
  return contentSlide({
    concept,
    label: "Forstå",
    content,
    stage: "what",
    id: concept.slug
  });
};

const conceptComparisonSlide = (concept) => {
  const javascriptExample = [selectNarrative(concept.how, 2, 300), selectCode(concept.how, 2, 16)]
    .filter(Boolean)
    .join("\n\n");
  const reactExample = [selectNarrative(concept.react, 2, 300), selectCode(concept.react, 2, 16)]
    .filter(Boolean)
    .join("\n\n");

  return conceptSection(
    concept,
    `${conceptHeading(concept, "JavaScript → React")}<div class="concept-example-pair"><article><span>JavaScript</span>${render(javascriptExample)}</article><article><span>React</span>${render(reactExample)}</article></div>`,
    "po-slide mode-shared concept-stage concept-stage--react concept-comparison-slide",
    "",
    "comparison"
  );
};

const conceptExampleSlide = (concept, type) => {
  const isReact = type === "react";
  const source = isReact ? concept.react : concept.how;
  const content = [selectNarrative(source, 3, 540), selectCode(source, 3, 28)]
    .filter(Boolean)
    .join("\n\n");

  return contentSlide({
    concept,
    label: isReact ? "I React" : concept.number === 1 ? "Named og default export" : "JavaScript-eksempler",
    content,
    stage: isReact ? "react" : "how",
    className: isReact ? "po-slide mode-shared concept-example-detail" : "po-slide concept-example-detail"
  });
};

const conceptTaskSlides = (concept, language) => {
  const task = taskSection(concept.task, language);
  const isReact = language === "React";
  const chunks = markdownChunks(task, 720, 5);

  return chunks.map((chunk, index) => {
    const isLast = index === chunks.length - 1;
    const continuation = chunks.length > 1 ? ` · ${index + 1}/${chunks.length}` : "";
    const componentTestNote =
      isLast && isReact && !/HomePage\.jsx|<main>/.test(task)
        ? '<p class="component-test-note"><strong>Test komponenten i appen:</strong> Importér den i <code>HomePage.jsx</code>, og tilføj den nederst inden for sidens <code>&lt;main&gt;</code>-tag.</p>'
        : "";
    const materialLink = isLast
      ? `<p class="concept-material-link"><a href="${textMaterialUrl}" target="_blank" rel="noopener noreferrer">Se også Ekstra-opgaven i <code>js-concepts.md</code> ↗</a></p>`
      : "";

    return conceptSection(
      concept,
      `${conceptHeading(concept, `Prøv selv · ${language}${continuation}`)}${renderContentLayout(chunk)}${componentTestNote}${materialLink}`,
      `po-slide mode-work concept-stage concept-stage--task concept-task-slide concept-task-slide--${isReact ? "react" : "javascript"}`,
      index === 0 ? (isReact ? `opgave-${concept.number}-react` : `opgave-${concept.number}`) : "",
      "task"
    );
  });
};

const introSlides = [
  slide(
    `${eyebrow("Product Optimization · 3. semester")}<h1>JavaScript for <span>React</span></h1><p class="lead">Fra små JavaScript-koncepter til læsbar React-kode</p><p class="date"><span>RACE</span><time datetime="2026-08-21">21. august 2026</time></p><aside class="notes">[Sources] - slides/assets/semesterstart-react.webp · user-provided asset [/Sources]</aside>`,
    "po-slide po-title po-title-photo"
  ),
  slide(
    `${eyebrow("Fokus for de to undervisningsgange")}<h2>To undervisningsgange — to lag</h2><div class="focus-split"><article class="focus-today"><time datetime="2026-08-19">Sidste gang · 19. august</time><h3>Rundt om koden</h3><p>Konfiguration, udviklingsflow, deployment, miljøvariabler, metadata og accessibility.</p><strong>Hvordan hænger løsningen sammen?</strong></article><article class="focus-friday"><time datetime="2026-08-21">I dag · 21. august</time><h3>Inde i koden</h3><p>JavaScript-koncepter, syntaks og mønstre — først isoleret og derefter i React.</p><strong>Hvordan skriver og læser vi koden?</strong></article></div><p class="focus-footnote">Sidste gang arbejdede vi med rammerne omkring appen. I dag zoomer vi ind på det sprog, React-koden er skrevet i.</p>`,
    "po-slide",
    "rammen-for-dagen"
  ),
  slide(
    `${eyebrow("Hvorfor JavaScript for React?")}<h2>Når React føles svært, er det ofte JavaScript-delen</h2><p class="react-foundation-lead">React er et <strong>JavaScript-bibliotek</strong>. Det giver os en måde at organisere UI som komponenter og forbinde data med det, brugeren ser.</p><div class="react-equation"><article class="equation-js"><span>Sproget</span><h3>JavaScript</h3><p>Functions · objects · arrays · conditionals · events · async</p></article><b>+</b><article class="equation-react"><span>React tilfører</span><h3>En model for UI</h3><p>Components · props · state · JSX</p></article><b>→</b><article class="equation-ui"><span>Resultatet</span><h3>Et UI, der følger data</h3><p>Når state ændres, renderes komponenten igen.</p></article></div><p class="react-thesis"><strong>Inde i en React-komponent skriver vi stadig JavaScript.</strong> React organiserer koden og holder UI’et synkroniseret med state.</p>`
  ),
  slide(
    `${eyebrow("Eksempler fra 2. semester")}<h2>Kan I forklare koden sammen?</h2><p class="pair-review-lead">Find det kodeeksempel frem, du valgte som forberedelse.</p><div class="pair-review"><article><span>01</span><h3>Præsenter</h3><p>Vis eksemplet, giv kort kontekst, og fortæl, hvad du tror, koden gør.</p></article><article><span>02</span><h3>Peg på tvivlen</h3><p>Markér den linje eller syntaks, du har svært ved at forklare.</p></article><article><span>03</span><h3>Undersøg sammen</h3><p>Lad din sidemakker stille spørgsmål og hjælpe med at forklare koden.</p></article><article><span>04</span><h3>Vurder</h3><p>Kan du nu forklare eksemplet med dine egne ord? Byt derefter roller.</p></article></div><div class="pair-outcomes"><p><strong>Afklaret?</strong> Behold forklaringen i dine egne noter.</p><p><strong>Stadig uklart?</strong> Del kode eller link, din nuværende forklaring og dit konkrete spørgsmål i <a href="https://padlet.com/race_js/js_react_eksempler" target="_blank" rel="noreferrer">Padlet</a>.</p></div>`,
    "po-slide mode-work",
    "eksempler-fra-andet-semester"
  ),
  slide(
    `${eyebrow("Arbejdsmåde")}<h2>Hvert koncept følger den samme rytme</h2><div class="concept-rhythm-flow"><article><span class="rhythm-node">01</span><small>Forstå idéen</small><h3>Forstå</h3><p>Hvad er konceptet — og hvorfor bruger vi det?</p></article><article><span class="rhythm-node">02</span><small>Se det i brug</small><h3>JavaScript</h3><p>Se, hvordan konceptet bruges i almindelig JavaScript.</p></article><article><span class="rhythm-node">03</span><small>Se det igen</small><h3>React</h3><p>Se, hvordan det samme koncept bruges i React.</p></article><article><span class="rhythm-node">04</span><small>Brug det selv</small><h3>Prøv selv</h3><p>Arbejd med konceptet i en JavaScript- og React-opgave.</p></article></div><div class="concept-rhythm-foot"><strong>Kerne først</strong><span>De tonede <b>Ekstra</b>-koncepter er fordybelse, hvis tiden og behovet er der.</span></div>`,
    "po-slide po-rhythm-slide",
    "arbejdsrytme"
  ),
  slide(
    `${eyebrow("Setup · Sandbox · 1/2")}<h2>Opret en sandbox i <code>web-app-optimization</code></h2><div class="sandbox-setup-grid"><article><h3>Hold øvelserne samlet</h3><p>Vi arbejder videre i React-projektet <strong><code>web-app-optimization</code></strong>.</p><p>Opret en <code>sandbox</code>-mappe, så JavaScript- og React-øvelserne ikke bliver blandet sammen med resten af projektet.</p>${render("```text\nsrc/\n├── App.jsx\n└── sandbox/\n    └── sandbox.js\n```")}</article><article><h3>Opret <code>sandbox.js</code></h3><p><code>sandbox.js</code> bliver vores entry point til JavaScript-øvelser.</p>${render('```js\n// src/sandbox/sandbox.js\n\nconsole.log("Sandbox is running 🚀");\n```')}</article></div>`,
    "po-slide",
    "sandbox"
  ),
  slide(
    `${eyebrow("Setup · Sandbox · 2/2")}<h2>Kobl sandboxen til <code>App.jsx</code></h2><div class="sandbox-run-grid"><article><span>01</span><h3>Importér filen</h3><p>Importér <code>sandbox.js</code> i <code>App.jsx</code>, så filen bliver kørt.</p>${render('```jsx\n// src/App.jsx\n\nimport "./sandbox/sandbox.js";\n```')}</article><article><span>02</span><h3>Kør og kontrollér</h3><ol><li>Start projektet.</li><li>Åbn browserens console.</li><li>Kontrollér, at du kan se:</li></ol>${render("```text\nSandbox is running 🚀\n```")}</article></div><p class="sandbox-note"><strong>Sandboxen er til eksperimenter.</strong> Her kan du frit oprette, ændre og slette filer og kode undervejs.</p>`
  )
];

const conceptSlides = concepts.flatMap((concept) => {
  const chapter = chapterFor(concept.number);
  const chapterSlide =
    concept.number === 1 || chapterFor(concept.number - 1) !== chapter
      ? slide(
          `<span class="chapter-index">${String(concept.number).padStart(2, "0")}</span>${eyebrow(chapter)}<h2>${chapter}</h2><p class="kicker">Her arbejder vi med ét lille JavaScript-koncept ad gangen og kobler det straks til React.</p>`,
          "chapter po-chapter po-slide",
          chapterId(chapter)
        )
      : "";
  const javascriptSlides =
    concept.number === 1
      ? stageSlides({
          concept,
          source: concept.how,
          stage: "how",
          label: "Named og default export",
          targetHeight: 690,
          maxCodeBlocks: 2
        })
      : [conceptExampleSlide(concept, "javascript")];

  return concept.extra
    ? [
        chapterSlide,
        conceptFoundationSlide(concept),
        conceptComparisonSlide(concept),
        ...conceptTaskSlides(concept, "JavaScript"),
        ...conceptTaskSlides(concept, "React")
      ]
    : [
        chapterSlide,
        conceptFoundationSlide(concept),
        ...javascriptSlides,
        conceptExampleSlide(concept, "react"),
        ...conceptTaskSlides(concept, "JavaScript"),
        ...conceptTaskSlides(concept, "React")
      ];
});

const agenda = slide(
  `${eyebrow("Agenda")}<h2>Fra egne eksempler til React-kode, I kan forklare</h2><div class="agenda-columns"><div class="agenda-column"><h3>Dagens forløb</h3><ol class="agenda-track"><li><a href="#/rammen-for-dagen"><strong>Rammen for dagen</strong><small>Hvorfor vi tager et skridt tilbage til JavaScript</small></a></li><li><a href="#/eksempler-fra-andet-semester"><strong>Eksempler fra 2. semester</strong><small>Hvad virker, men er stadig svært at forklare?</small></a></li><li><a href="#/modules"><strong>Koncept for koncept</strong><small>Forstå → JavaScript → React → prøv selv</small></a></li><li><a href="#/opsamling"><strong>Opsamling</strong><small>Genbesøg egen kode, og vælg dit næste spørgsmål</small></a></li></ol></div><div class="agenda-column"><h3>Konceptbank</h3><ol class="agenda-track concept-groups"><li><a href="#/modules"><strong>Modules og functions</strong><small>1–7</small></a></li><li><a href="#/objects"><strong>Objects</strong><small>8–13</small></a></li><li><a href="#/arrays"><strong>Arrays</strong><small>14–18</small></a></li><li><a href="#/array-methods"><strong>Array methods</strong><small>19–25</small></a></li><li><a href="#/strings-og-conditionals"><strong>Strings og conditionals</strong><small>26–32</small></a></li><li><a href="#/events"><strong>Events</strong><small>33–34</small></a></li><li><a href="#/${chapterId("Asynkron JavaScript og API'er")}"><strong>Async og API’er</strong><small>35–40</small></a></li></ol></div></div><p class="agenda-note"><strong>40 koncepter er en modulbank.</strong> Vi prioriterer kernekoncepterne og bruger de markerede ekstra-emner efter behov.</p><p class="agenda-material"><strong>Vil du hellere følge dagen som tekst?</strong> <a href="${textMaterialUrl}" target="_blank" rel="noopener noreferrer">Åbn det samlede JavaScript-materiale ↗</a></p>`,
  "po-slide po-agenda",
  "agenda"
);

const conceptIndexSlides = [
  slide(
    `${eyebrow("Indeks · 1/2")}<h2>JavaScript-koncept</h2><div class="concept-index">${concepts.slice(0, 21).map((concept) => `<a class="${concept.extra ? "is-extra" : ""}" href="#/${concept.slug}"><span class="concept-number">${String(concept.number).padStart(2, "0")}</span><span class="concept-label">${renderInline(concept.title)}</span></a>`).join("")}</div><p class="index-material"><a href="${textMaterialUrl}" target="_blank" rel="noopener noreferrer">Følg hele materialet i <code>js-concepts.md</code> ↗</a></p>`,
    "po-slide po-concept-index",
    "konceptindeks"
  ),
  slide(
    `${eyebrow("Indeks · 2/2")}<h2>JavaScript-koncept</h2><div class="concept-index">${concepts.slice(21).map((concept) => `<a class="${concept.extra ? "is-extra" : ""}" href="#/${concept.slug}"><span class="concept-number">${String(concept.number).padStart(2, "0")}</span><span class="concept-label">${renderInline(concept.title)}</span></a>`).join("")}</div><div class="index-footer"><p class="index-note">De tonede emner er <strong>Ekstra</strong>: brug dem til fordybelse eller som opslagsværk.</p><p class="index-material"><a href="${textMaterialUrl}" target="_blank" rel="noopener noreferrer">Følg hele materialet i <code>js-concepts.md</code> ↗</a></p></div>`,
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
