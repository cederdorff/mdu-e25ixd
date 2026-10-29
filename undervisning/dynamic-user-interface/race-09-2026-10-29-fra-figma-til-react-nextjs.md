# NKKR/RACE - Dynamic User Interface: Fra Figma til React/Next.js - 29-10-2026

## Formål

I dag følger vi én komponent hele vejen fra design til kode: en pill, der kan folde sig ud til en modal. Først designer du den i Figma med NKKR. Derefter bygger du den i Next.js med RACE og ser, hvordan begreberne i Figma svarer til begreberne i React.

Du bygger komponenten to gange. Først oversætter du selv designet med Dev Mode: den simpleste `PillModal` først, og så designet ovenpå. Så forbinder du din egen AI-agent til Figma MCP-serveren og bygger den samme komponent igen i små iterationer, hvor du validerer agentens kode og retter med præcise prompts. Til sidst retter du designet i Figma og lader agenten opdatere din kode. Figma MCP virker begge veje, så agenten kan også opdatere designet i Figma, når du ændrer koden.

<hr style="margin: 2rem 0;">

## Forberedelse

- Hent [starteren](https://github.com/cederdorff/nextjs-figma-pill-modal) med **Use this template**, klon dit nye repo med GitHub Desktop eller VS Code, og kør `npm i` og `npm run dev`. Det er et nyt projekt, ikke din WordPress-app.
- Sæt Figma MCP op i VS Code med GitHub Copilot, Codex eller Claude Code. Har du et andet setup, der kan bruge MCP, er det også fint. Følg [tool-guiden i opgaven](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-2026-10-29-fra-figma-til-react-nextjs.md#tool-guide). Vi tager opsætningen sammen i timen, hvis du ikke når det.
- Læg din Figma-fil i dit Education-team, ikke i _Drafts_. Så har du Dev Mode og Education-planens grænser for Figma MCP.

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Én komponent hele dagen: design i Figma → samme begreber i React → byg i hånden, den simpleste version først → byg igen med Figma MCP i iterationer → ret i Figma, og lad agenten opdatere koden.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Design en pill, der bliver til en modal, i Figma</strong></summary>
<ul>
<li>Byg en pill ved brug af auto-layout. byg 2 versioner med hver sin hover variant.</li>
<li>Lav et 'component set' der indeholder de 2 typer af pills med hver sin hover variant</li>
<li>Sørg for at lave en variant-property med navnet "type" og navngiv så de 2 versioner af din pill under denne property. Sørg også for at lave variant-property med navnet "state" og tildel derefter stadierne "default" og "hover" til de relevante udgaver af dine pill's</li>
<li>Sørg for at gøre din pill interaktiv med en hover interaktion.</li>
<li>Byg et modal komponent med divider linje, rubrik og text. Lav en boolean-property der hhv. viser og skjuler divider linjen</li>
<li>Opsæt variabler med udgangspunkt i dit design – brug number variabel til variabler med numeriske værdier, string variable til variabler med tekstværdier og brug color variable til variabler med hex-koder. Sørg for at lave logiske grupperinger ved at bruge '/' som gruppe-divider</li>
<li>Lav nu instances af dine komponenter og gør dem interaktive: Klik på pillen åbner modal-varianten som overlay, og klik udenfor modalen skifter tilbage. Brug Smart Animate til overgangen.</li>
<li>Navngiv komponenter, variants, properties og layers, så de beskriver indholdet. Navnene følger med over i koden.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Samme komponent, to sprog: Figma og React</strong></summary>
<ul>
<li>Variables → tokens som custom properties i <code>globals.css</code>, fx <code>--color-primary</code>.</li>
<li>Component set og component → en komponent i React med sin egen CSS Module, fx <code>Pill.js</code> og <code>Pill.module.css</code>. Instance med overrides → komponenten brugt med props, fx <code>&lt;Pill type="secondary"&gt;</code>.</li>
<li>Prop, state eller CSS? Spørg, hvem der bestemmer værdien. Variant <code>Type</code> → en prop, der vælger en klasse. Variant <code>State</code> → <code>:hover</code> og <code>:focus-visible</code> i CSS. Åben/lukket → state.</li>
<li>Boolean property → betinget rendering, fx <code>{showSeparator &amp;&amp; &lt;hr /&gt;}</code>. Tekst → props eller <code>children</code>.</li>
<li>Auto layout → flexbox i CSS: direction, gap og padding hedder næsten det samme. Hug, fill og fixed bliver til bredder.</li>
<li>Interaktion i prototypen → <code>useState</code> og <code>onClick</code> med en <code>&lt;dialog&gt;</code>. Smart Animate → CSS transition.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Rul 1: Byg i hånden – den simpleste version først</strong></summary>
<ul>
<li>Byg <code>Pill</code> som en <code>&lt;button&gt;</code> og <code>Modal</code> som en <code>&lt;dialog&gt;</code> med <code>showModal()</code>, så fokus og <kbd>Esc</kbd> virker uden ekstra kode.</li>
<li>Sæt dem sammen i <code>PillModal</code> med <code>"use client"</code> og <code>useState</code>. Nu virker den simpleste version. Kun komponenter, der selv bruger state, effects eller event handlers, skal være client components – siden forbliver en server component.</li>
<li>Overfør dine variables til tokens i <code>globals.css</code>, og style komponenterne med CSS Modules og værdierne fra Dev Mode.</li>
<li>Gør <code>Type</code> til en prop, hover til CSS og <code>showSeparator</code> til betinget rendering.</li>
<li>Lav Smart Animate om til transitions, og test med tastaturet: Kan du åbne og lukke modalen, og er fokus synligt?</li>
<li>Ekstra: Lad pillen folde sig ud, ligesom Smart Animate i din prototype – som overlay fra pillen eller på stedet, så resten af siden flytter sig.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Rul 2: Byg igen med Figma MCP – i iterationer</strong></summary>
<ul>
<li>Forbind din egen AI-agent til Figma MCP-serveren, og giv den adgang til designet: filen i dit Education-team, et link til en node og et tjek med <code>whoami</code>.</li>
<li>Send de faste regler først. De fortæller agenten det, den ikke kan se i Figma: JavaScript, tokens og CSS Modules, <code>&lt;button&gt;</code> og <code>&lt;dialog&gt;</code>.</li>
<li>Byg i små iterationer: prompt → kør → validér → ret, og tag en runde mere, til det er rigtigt. Én iteration pr. komponent: <code>Pill</code> → <code>Modal</code> → <code>PillModal</code>.</li>
<li>Ret designet i Figma, og bed agenten opdatere din eksisterende komponent. Læs diffen, før du committer.</li>
<li>Du har ansvaret for at forstå, rette og forklare koden.</li>
<li>Ekstra: MCP virker begge veje. Ændr noget i koden, og lad agenten opdatere designet i Figma.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:**
  - [Fra Figma til React/Next.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/)
  - [PDF-version: Fra Figma til React/Next.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/?print-pdf)
- **Opgaver:**
  - [Overblik i slides](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgaver)
  - [Opgaver med ekstra hjælp og løsninger](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-2026-10-29-fra-figma-til-react-nextjs.md) – trin for trin, opsætning og adgang, alle prompts og den fulde løsning
- **Starterrepo:** [nextjs-figma-pill-modal](https://github.com/cederdorff/nextjs-figma-pill-modal)
- **Figma:**
  - [Guide to auto layout](https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout)
  - [Create and use variants](https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants)
  - [Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
  - [Create interactive components with variants](https://help.figma.com/hc/en-us/articles/360061175334-Create-interactive-components-with-variants)
  - [Guide to Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)
  - [Guide to the Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
  - [Remote server installation](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)
  - [Rate limits & access](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)
- **React og Next.js:**
  - [Passing props to a component](https://react.dev/learn/passing-props-to-a-component)
  - [Conditional rendering](https://react.dev/learn/conditional-rendering)
  - [State: a component's memory](https://react.dev/learn/state-a-components-memory)
  - [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- **HTML:**
  - [MDN: The dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
  - [MDN: @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)
