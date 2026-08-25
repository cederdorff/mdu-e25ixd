# RACE - Product optimization: Case 1 · Arkitektur, styling og accessibility - 26-08-2026

## Formål

I dag begynder du på en teknisk audit af Mellemrum-løsningen. Du afgrænser undersøgelsen, etablerer en baseline og dokumenterer konkrete fund, før du ændrer koden. Tilmeldingsflowet og den deployede version skal altid indgå i auditten.

Undervejs får du faglige indspark med hovedvægt på React-arkitektur. Vi repeterer også styling i React og centrale accessibility-principper, herunder de særlige udfordringer med routing, sidetitler og fokus i en SPA. Du bruger indsparkene som nye faglige linser på løsningen, prioriterer dine fund og begynder til sidst på én afgrænset forbedring.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at starter-løsningen og forbindelsen til Supabase fungerer lokalt og online.
- Læs [casebeskrivelsen](https://eaaa.instructure.com/courses/30922/pages/case-1-fra-prototype-til-produktionsklar-react-losning) igen, og medbring eventuelle spørgsmål eller observationer fra opsætningen.
- Du behøver ikke have gennemført auditten eller ændret løsningen på forhånd.

<hr style="margin: 2rem 0;">

## Agenda

Vi introducerer auditten af Mellemrum, får faglige perspektiver på løsningen og bruger dem i arbejdet med Case 1.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Introduktion til teknisk audit</strong></summary>
<ul>
<li>Hvad er en teknisk audit, og hvordan adskiller den sig fra personlige kodepræferencer?</li>
<li><strong>Auditobjekt:</strong> Undersøg Mellemrum lokalt og online; tilmeldingsflowet og den deployede løsning skal altid indgå.</li>
<li>Afgræns løsningens primære og sekundære målgrupper, vigtigste brugerflows og tekniske områder.</li>
<li>Dokumentér udgangspunktet, før du ændrer koden.</li>
<li>Registrér konkrete fund, beskriv deres betydning, og prioritér dem efter effekt og indsats.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Fagligt indspark: React-arkitektur</strong></summary>
<ul>
<li>Definér arkitektur som de valg, der placerer ansvar og forbinder delene – ikke blot som et bestemt mappetræ.</li>
<li>Start med et overblik over seks beslutninger: routes/pages, komponenter, state/dataflow, effects/data, adskillelse/genbrug samt navne/struktur.</li>
<li>Brug <strong>Post App med Supabase</strong> som fælles reference, og overfør derefter principperne til din egen audit af Mellemrum.</li>
<li><strong>Routes og pages:</strong> Brug routes som grænser for brugeropgaver, og lad pages koordinere sidens data, UI-states og komponenter.</li>
<li><strong>Komponenter og ansvar:</strong> Brug <em>single responsibility</em> og <em>component composition</em> til at skabe forståelige UI-dele med tydelige prop-kontrakter.</li>
<li><strong>State og dataflow:</strong> Placér state hos den nærmeste ejer, følg det ensrettede dataflow, og beregn <em>derived state</em> frem for at gemme kopier.</li>
<li><strong>Effects og data:</strong> Hold renderingen pure, brug Effects til synkronisering med omverdenen, og følg et request gennem Supabase REST API og tilbage til UI'et.</li>
<li><strong>Adskillelse og genbrug:</strong> Udtræk services, utils eller hooks, når gentagelse eller kompleksitet skaber et konkret behov – ikke på forhånd.</li>
<li><strong>Navne og struktur:</strong> Brug domænenære navne og den mindste mappestruktur, der gør ansvar og ændringer tydelige.</li>
<li>Forklar løbende, hvorfor en grænse hjælper, og dokumentér derefter ét konkret arkitekturfund i Mellemrum.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Repetition: styling i React</strong></summary>
<ul>
<li>Sammenlign klassisk CSS, CSS Modules og inline styles ud fra rækkevidde og ansvar.</li>
<li>Brug klassisk CSS til relevante globale regler og fælles mønstre.</li>
<li>Brug CSS Modules, når komponentnære styles skal have lokal scope.</li>
<li>Brug primært inline styles til værdier, der faktisk beregnes i JavaScript.</li>
<li>Definér genbrugelige farver, spacing og andre designvalg som CSS custom properties i <code>:root</code>.</li>
<li>Vurdér placering, gentagelser, konflikter og konsistens i løsningens styling.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Repetition: accessibility i React</strong></summary>
<ul>
<li>Brug semantisk HTML og et logisk heading-hierarki; brug ARIA, når HTML ikke er tilstrækkeligt.</li>
<li>Kontrollér keyboard navigation, logisk rækkefølge og synligt fokus.</li>
<li><strong>Fokus-styring i React:</strong> Undersøg SPA-problemet, hvor fokus kan blive i navigationen efter et sideskift.</li>
<li><strong>Routing og sideskift:</strong> Opdatér <code>document.title</code>, og flyt fokus meningsfuldt til den nye sides indhold.</li>
<li>Vurdér billeder, ikoner, medier og alt-tekster ud fra deres formål.</li>
<li>Kontrollér farver, kontrast og states, så information ikke kommunikeres med farve alene.</li>
<li>Undersøg formularernes labels, inputtyper, krav, validering, fejlbeskeder og feedback.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Arbejd videre med auditten</strong></summary>
<ul>
<li>Gennemfør de vigtigste brugerflows i Mellemrum, og undersøg relevante filer og komponenter.</li>
<li>Brug audit-skabelonen til at dokumentere fund og evidens.</li>
<li>Beskriv konsekvensen for brugeren, produktet eller den videre udvikling.</li>
<li>Lav en realistisk, prioriteret liste over forbedringer.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Begynd på en afgrænset forbedring</strong></summary>
<ul>
<li>Opret en tydeligt navngivet feature branch til den valgte forbedring.</li>
<li>Arbejd i små, kontrollerbare skridt uden at ændre anden funktionalitet.</li>
<li>Verificér forbedringen med relevant evidens.</li>
<li>Dokumentér resultatet og det næste prioriterede fund.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:**
  - [Case 1 · Teknisk audit, arkitektur, styling og accessibility](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-04/)
- **Startprojekt:**
  - [Mellemrum](https://github.com/cederdorff/mellemrum)
- **Fælles arkitektur-reference:**
  - [Post App med Supabase](https://github.com/cederdorff/post-app-supabase)
- **Case 1:**
  - [Casebeskrivelse: Fra prototype til produktionsklar React-løsning](https://eaaa.instructure.com/courses/30922/pages/case-1-fra-prototype-til-produktionsklar-react-losning)
- **Audit:**
  - [Teknisk audit af en React-løsning](https://eaaa.instructure.com/courses/30922/pages/teknisk-audit-af-en-react-losning)
- **Accessibility:**
  - [React og Accessibility (a11y)](https://race.notion.site/React-og-Accessibility-a11y-302bc239db1180bba2b8c5bb9639664c)
- **Styling og tidligere React-eksempel:**
  - [Styling i React](https://race.notion.site/Styling-i-React-268bc239db11806c82a9f2e25fdc5ccc)
  - [Product Grid with React · Del 3: Styling og a11y](https://race.notion.site/Product-Grid-with-React-Del-3-Styling-a11y-303bc239db11803fb655fa7d1b994daf)
