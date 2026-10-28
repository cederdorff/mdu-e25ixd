# NKKR/RACE - Dynamic User Interface: Fra Figma til React/Next.js - 29-10-2026

## Formål

I dag følger vi én komponent hele vejen fra design til kode: en pill, der kan folde sig ud til en modal. Først designer du den i Figma med NKKR. Derefter bygger vi den i din Next.js-app med RACE og ser, hvordan begreberne i Figma svarer til begreberne i React.

Til sidst viser RACE, hvordan Figma MCP kan holde koden opdateret, når designet ændrer sig i Figma.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at din Next.js-app fra 26. oktober kører lokalt.
- Opdatér Figma, så du kan afprøve Figma MCP-serveren.

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Én komponent hele dagen: design i Figma → samme begreber i React → byg i Next.js → ret i Figma, og hold koden i sync med Figma MCP.

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
<li>Component i Figma → komponent i React, fx <code>PillModal.js</code>.</li>
<li>Instance i Figma → brug af komponenten, fx <code>&lt;PillModal label="Om" /&gt;</code>.</li>
<li>Component properties → props: tekst bliver til en string, boolean til <code>true</code>/<code>false</code> og nested indhold til <code>children</code>.</li>
<li>Variants → en prop eller state, fx <code>isOpen</code>.</li>
<li>Interaktion i prototypen → event handler og state: <code>onClick</code> skifter <code>isOpen</code> med <code>useState</code>.</li>
<li>Auto layout → flexbox i CSS: direction, gap og padding hedder næsten det samme.</li>
<li>Smart Animate → CSS transition.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Byg pill og modal i din Next.js-app med Figma ved siden af</strong></summary>
<ul>
<li>Opret komponenten, og markér den med <code>"use client"</code>, fordi den bruger state og events.</li>
<li>Byg pillen som en <code>&lt;button&gt;</code>, og brug den i en side fra sidst.</li>
<li>Byg modalen med <code>&lt;dialog&gt;</code>, så fokus og <kbd>Esc</kbd> virker uden ekstra kode.</li>
<li>Overfør farver, afstande og typografi fra Dev Mode i Figma til CSS.</li>
<li>Test med tastaturet: Kan du åbne og lukke modalen, og er fokus synligt?</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Ret i Figma, og hold koden opdateret med Figma MCP</strong></summary>
<ul>
<li>Forbind din AI-agent til Figma MCP-serveren, og lad den læse komponenten i Figma.</li>
<li>Ret designet i Figma, og bed agenten opdatere den eksisterende komponent i stedet for at bygge en ny.</li>
<li>Gennemgå ændringerne kritisk: Matcher koden designet, og er HTML'en stadig semantisk og tilgængelig?</li>
<li>Du har ansvaret for at forstå, rette og forklare koden.</li>
<li>Commit og push dit arbejde.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:** Vil blive tilgængelige her
- **Opgaver:** Vil blive tilgængelige her
- **Figma:**
  - [Guide to auto layout](https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout)
  - [Create and use variants](https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants)
  - [Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
  - [Create interactive components with variants](https://help.figma.com/hc/en-us/articles/360061175334-Create-interactive-components-with-variants)
  - [Guide to the Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- **React og Next.js:**
  - [Passing props to a component](https://react.dev/learn/passing-props-to-a-component)
  - [State: a component's memory](https://react.dev/learn/state-a-components-memory)
  - [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- **HTML:**
  - [MDN: The dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
