# NKKR/RACE - Dynamic User Interface: Designsystem fra Figma til kode - 29-10-2026

## Formål

I dag kobler vi design og kode gennem et designsystem. Vi går fra beslutninger i Figma til tokens og genbrugelige komponenter i Next.js med Tailwind CSS og shadcn/ui.

Målet er, at din Next.js-app fra sidst bruger dine egne tokens for farve, typografi og spacing og et par genbrugelige komponenter. Tokens for motion, timing og easing kommer til i undervisningsgangen om motion 12. november.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at din Next.js-app fra 26. oktober kører lokalt.
- Hav en Figma-fil klar med et simpelt udgangspunkt for din Next.js-app, fx en side med farver, typografi og et par komponenter.
- Opdatér Figma, så du kan afprøve Figma MCP-serveren.

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Tokens → komponenter → sider. Vi arbejder fra Figma til kode og kontrollerer resultatet i browseren.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Hvad er et designsystem i kode?</strong></summary>
<ul>
<li>Tokens er navngivne designbeslutninger, fx <code>--color-primary</code> eller <code>--spacing-4</code>, som både design og kode bruger.</li>
<li>Komponenter bygges af tokens, og sider bygges af komponenter.</li>
<li>Skeln mellem primitive tokens (fx en konkret blå) og semantiske tokens (fx <code>primary</code> eller <code>background</code>).</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Fra Figma variables til CSS variables</strong></summary>
<ul>
<li>Opret eller gennemgå variables i Figma for farve, typografi og spacing.</li>
<li>Tilføj Tailwind CSS til din Next.js-app: Installér <code>tailwindcss</code>, <code>@tailwindcss/postcss</code> og <code>postcss</code>, opret <code>postcss.config.mjs</code>, og importér Tailwind i <code>app/globals.css</code>.</li>
<li>Omsæt dine Figma variables til CSS variables i <code>app/globals.css</code>, og gør dem tilgængelige i Tailwind med <code>@theme</code>.</li>
<li>Brug samme navne i Figma og kode, så designer og udvikler taler om det samme.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. shadcn/ui i et JavaScript-projekt</strong></summary>
<ul>
<li>Kør <code>npx shadcn@latest init</code>, og kontrollér, at <code>components.json</code> har <code>"tsx": false</code>, så komponenterne genereres som JSX.</li>
<li>Tilføj et par komponenter, fx <code>button</code> og <code>card</code>. Komponenterne kopieres ind i dit projekt, så det er din kode, som du selv kan tilpasse.</li>
<li>Kobl shadcn/ui's tema-variabler, fx <code>--primary</code> og <code>--background</code>, til dine egne tokens.</li>
<li>Brug komponenterne i listen og på detaljesiden fra sidst.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Tilgængelighed i tokens og komponenter</strong></summary>
<ul>
<li>Kontrollér kontrasten mellem dine tekst- og baggrundstokens.</li>
<li>Gør fokus-states til en del af designsystemet, så fokus altid er synligt.</li>
<li>Test tastaturbetjening i shadcn/ui-komponenterne, og undersøg, hvad de håndterer for dig, og hvad du selv skal sørge for.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Figma MCP: fra design til kode med AI</strong></summary>
<ul>
<li>Forbind din AI-agent til Figma MCP-serveren, og lad den læse et frame eller en komponent.</li>
<li>Bed agenten bygge komponenten med dine tokens og eksisterende komponenter – ikke med hardcodede værdier.</li>
<li>Gennemgå koden kritisk: Bruger den dine tokens, semantisk HTML og dine eksisterende komponenter?</li>
<li>Du har ansvaret for at forstå, rette og forklare koden.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Arbejd videre</strong></summary>
<ul>
<li>Gør din Next.js-app konsekvent: Erstat hardcodede farver, størrelser og afstande med tokens.</li>
<li>Byg eller tilpas to-tre genbrugelige komponenter.</li>
<li>Overvej jeres projekt: Hvilke tokens og komponenter skal jeres designsystem have fra start?</li>
<li>Commit og push dit arbejde.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:** Vil blive tilgængelige her
- **Opgaver:** Vil blive tilgængelige her
- **Tailwind CSS:**
  - [Install Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
  - [Theme variables](https://tailwindcss.com/docs/theme)
- **shadcn/ui:**
  - [Installation: Next.js](https://ui.shadcn.com/docs/installation/next)
  - [components.json](https://ui.shadcn.com/docs/components-json)
  - [Theming](https://ui.shadcn.com/docs/theming)
- **Figma:**
  - [Guide to variables in Figma](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
  - [Guide to the Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- **Tilgængelighed:**
  - [WebAIM: Contrast Checker](https://webaim.org/resources/contrastchecker/)
