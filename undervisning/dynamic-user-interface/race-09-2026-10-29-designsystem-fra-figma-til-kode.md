# NKKR/RACE - Dynamic User Interface: Designsystem fra Figma til kode - 29-10-2026

## Formål

I dag kobler vi design og kode gennem et designsystem. Først designer vi systemet i Figma med NKKR: Vi omsætter designbeslutninger til variables og bygger komponenter med variants og states. Derefter tager vi det med over i Next.js med RACE: Variables bliver til CSS variables i Tailwind CSS, og komponenterne bygges med shadcn/ui.

Du kender designsystemer fra Case 3 i Product optimization. Det nye i dag er, at systemet skal kunne overføres til kode. Derfor bruger vi de samme navne og beslutninger og bygger de samme komponenter i Figma og i browseren.

Målet er et lille designsystem til din Next.js-app fra sidst – i Figma og i kode – med tokens for farve, typografi og spacing og et par genbrugelige komponenter. Tokens for motion, timing og easing kommer til i undervisningsgangen om motion 12. november.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at din Next.js-app fra 26. oktober kører lokalt.
- Opret en Figma-fil til din app, og indsæt skærmbilleder af listen og detaljesiden som udgangspunkt.
- Find gerne dit designsystem fra Case 3 frem, hvis du vil genbruge farver eller typografi derfra.
- Opdatér Figma, så du kan afprøve Figma MCP-serveren.

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Beslutninger → tokens → komponenter → sider. Først i Figma, derefter i kode. Navnene er broen mellem de to: `primary` i Figma er `--primary` i CSS og `bg-primary` i Tailwind.

### Del 1: Designsystemet i Figma (NKKR)

<details style="margin-left: 1.5rem;">
<summary><strong>1. Fra designbeslutninger til tokens</strong></summary>
<ul>
<li>Et designsystem er et sæt fælles beslutninger om farver, typografi, spacing og komponenter, som både design og kode bruger.</li>
<li>Tokens er navngivne designbeslutninger, fx <code>primary</code> eller <code>spacing/4</code>. Navnet beskriver formålet, så værdien kan ændres ét sted.</li>
<li>Skeln mellem primitive tokens, der beskriver en værdi (fx <code>blue/600</code>), og semantiske tokens, der beskriver brugen (fx <code>primary</code> eller <code>background</code>). Komponenter bruger kun semantiske tokens.</li>
<li>Tag udgangspunkt i din app: Hvilke farver, tekststørrelser og afstande bruger du allerede – og hvilke er tilfældige?</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Variables og text styles i Figma</strong></summary>
<ul>
<li>Opret en collection med primitive farver og en collection med semantiske farver, der peger på de primitive.</li>
<li>Navngiv de semantiske farver i par af baggrund og tekst: <code>background</code>/<code>foreground</code>, <code>primary</code>/<code>primary-foreground</code> og <code>muted</code>/<code>muted-foreground</code> samt <code>border</code> og <code>ring</code> til fokus. Det er de samme navne, som shadcn/ui bruger i kode.</li>
<li>Brug modes, fx light og dark: Samme semantiske navn, forskellig værdi.</li>
<li>Opret spacing og radius som number variables på en skala med 4 px som base, fx 4, 8, 12, 16, 24 og 32. Skalaen matcher Tailwind CSS.</li>
<li>Opret text styles til typografien, fx <code>heading/1</code>, <code>heading/2</code>, <code>body</code> og <code>small</code>. Vælg en skrifttype fra Google Fonts, så den kan indlæses i Next.js.</li>
<li>Sæt scopes på dine variables, så farver kun kan bruges til fill og stroke, og spacing kun til gap og padding.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Komponenter med variants og states</strong></summary>
<ul>
<li>Byg en Button med variants og states. Navngiv dine variants som i shadcn/ui, fx <code>default</code>, <code>secondary</code>, <code>outline</code> og <code>ghost</code>, og dine states som <code>default</code>, <code>hover</code>, <code>focus</code> og <code>disabled</code>.</li>
<li>Byg et Card til dine posts med billede, kategori, titel og uddrag. Brug auto layout med dine spacing variables, så kortet tilpasser sig indholdet.</li>
<li>Brug component properties til tekst og til at vise eller skjule fx billedet.</li>
<li>Bind farver, afstande og radius til variables – ingen hardcodede værdier. Tjek i Dev Mode, at værdierne vises som variables og ikke som hex-koder.</li>
<li>Sæt listen og detaljesiden sammen af dine komponenter.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Tilgængelighed i designsystemet</strong></summary>
<ul>
<li>Kontrollér kontrasten i hvert farvepar i alle modes: mindst 4,5:1 for brødtekst og 3:1 for stor tekst og UI-elementer.</li>
<li>Design fokus-state som en variant med <code>ring</code>-farven, så fokus altid er synligt.</li>
<li>Gør klikflader mindst 24 × 24 px.</li>
<li>Farve må ikke være eneste bærer af information, fx ved fejl eller disabled.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Klar til overlevering</strong></summary>
<ul>
<li>Navngiv frames og layers, så de beskriver indholdet. Både udviklere og AI-agenter læser navnene.</li>
<li>Byt fil med en sidemand: Kan en udvikler bygge dit Card ud fra Figma-filen alene? Hvad mangler?</li>
<li>Lav en token-oversigt i Figma-filen med navn, værdi og brug for hver token. Den bruger vi i kode.</li>
</ul>
</details>

### Del 2: Fra Figma til Next.js (RACE)

<details style="margin-left: 1.5rem;">
<summary><strong>6. Tokens i kode med Tailwind CSS</strong></summary>
<ul>
<li>Tilføj Tailwind CSS til din Next.js-app: Installér <code>tailwindcss</code>, <code>@tailwindcss/postcss</code> og <code>postcss</code>, opret <code>postcss.config.mjs</code>, og importér Tailwind i <code>app/globals.css</code>.</li>
<li>Omsæt dine Figma variables til CSS variables i <code>app/globals.css</code>: <code>:root</code> til light mode og <code>.dark</code> til dark mode.</li>
<li>Gør dem tilgængelige som Tailwind-klasser med <code>@theme</code>: <code>primary</code> i Figma → <code>--primary</code> i CSS → <code>bg-primary</code> i Tailwind.</li>
<li>Indlæs skrifttypen med <code>next/font</code>, og omsæt dine text styles til klasser.</li>
<li>Overfør værdierne manuelt i dag, så du forstår sammenhængen, før du lader en AI-agent gøre det.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>7. Komponenter med shadcn/ui</strong></summary>
<ul>
<li>Kør <code>npx shadcn@latest init</code>, og kontrollér, at <code>components.json</code> har <code>"tsx": false</code>, så komponenterne genereres som JSX.</li>
<li>Tilføj <code>button</code> og <code>card</code>. Komponenterne kopieres ind i dit projekt, så det er din kode, som du selv kan tilpasse.</li>
<li>Indsæt værdierne fra dine Figma variables i shadcn/ui's tema-variabler. Når navnene matcher, skal du kun skifte værdierne.</li>
<li>Byg dit Card fra Figma som en komponent, og brug den i listen og på detaljesiden fra sidst.</li>
<li>Test med tastaturet: Kan du tabbe gennem siden, og er fokus synligt? Hvad håndterer shadcn/ui for dig, og hvad skal du selv sørge for, fx alt-tekst og overskriftsniveauer?</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>8. Figma MCP: fra design til kode med AI</strong></summary>
<ul>
<li>Forbind din AI-agent til Figma MCP-serveren, og lad den læse dit Card i Figma. Agenten kan også læse dine variables – derfor betyder navngivningen i Figma noget.</li>
<li>Bed agenten bygge komponenten med dine tokens og eksisterende komponenter – ikke med hardcodede værdier.</li>
<li>Gennemgå koden kritisk: Bruger den dine tokens, semantisk HTML og dine eksisterende komponenter?</li>
<li>Du har ansvaret for at forstå, rette og forklare koden.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>9. Arbejd videre</strong></summary>
<ul>
<li>Sammenlign Figma og browser side om side: Hvor afviger de, og skal designet eller koden rettes?</li>
<li>Erstat hardcodede farver, størrelser og afstande i din app med tokens.</li>
<li>Overvej jeres projekt til kick-off 2. november: Hvilke tokens og komponenter skal jeres designsystem have fra start, og hvordan holder I Figma og kode i sync?</li>
<li>Commit og push dit arbejde.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:** Vil blive tilgængelige her
- **Opgaver:** Vil blive tilgængelige her
- **Figma:**
  - [Guide to variables in Figma](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
  - [Create and use variants](https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants)
  - [Guide to auto layout in Figma](https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout)
  - [Guide to the Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- **Tailwind CSS:**
  - [Install Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
  - [Theme variables](https://tailwindcss.com/docs/theme)
- **shadcn/ui:**
  - [Installation: Next.js](https://ui.shadcn.com/docs/installation/next)
  - [components.json](https://ui.shadcn.com/docs/components-json)
  - [Theming](https://ui.shadcn.com/docs/theming)
- **Tilgængelighed:**
  - [WebAIM: Contrast Checker](https://webaim.org/resources/contrastchecker/)
