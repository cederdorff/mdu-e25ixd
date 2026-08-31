# RACE - Product optimization: Case 1 · Arkitektur, styling og accessibility - 26-08-2026

## Formål

I dag begynder du på en teknisk audit af Mellemrum-løsningen. Du afgrænser undersøgelsen, etablerer en baseline og dokumenterer konkrete fund, før du ændrer koden. Tilmeldingsflowet og den deployede version skal altid indgå i auditten.

Undervejs får du faglige indspark med hovedvægt på React-arkitektur. Vi repeterer også styling i React og centrale accessibility-principper, herunder de særlige udfordringer med routing, sidetitler og fokus i en SPA. Du bruger indsparkene til at undersøge løsningen fra flere faglige perspektiver. Dine dokumenterede fund samles som en prioriteret teknisk backlog, og du begynder til sidst på én afgrænset forbedring.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at starter-løsningen og forbindelsen til Supabase fungerer lokalt og online.
- Læs [casebeskrivelsen](https://eaaa.instructure.com/courses/30922/pages/case-1-fra-prototype-til-produktionsklar-react-losning) igen, og medbring eventuelle spørgsmål eller observationer fra opsætningen.
- Du behøver ikke have gennemført auditten eller ændret løsningen på forhånd.

<hr style="margin: 2rem 0;">

## Agenda

Vi introducerer auditten af Mellemrum, får faglige perspektiver på løsningen og bruger dem i arbejdet med Case 1.

**Dagens arbejdsrytme:** Start auditten → få et fagligt indspark → undersøg Mellemrum igen → saml fundene som en prioriteret backlog → implementér og verificér én afgrænset forbedring.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Introduktion til teknisk audit</strong></summary>
<ul>
<li>Hvad er en teknisk audit, og hvordan adskiller den sig fra personlige kodepræferencer?</li>
<li><strong>Auditobjekt:</strong> Undersøg Mellemrum lokalt og online; tilmeldingsflowet og den deployede løsning skal altid indgå.</li>
<li><strong>Kom i gang:</strong> Åbn audit-skabelonen og Mellemrum lokalt og online, kontrollér at begge versioner virker, og vælg tilmeldingsflowet samt mindst ét ekstra flow.</li>
<li>Dokumentér udgangspunktet med relevant evidens, før du ændrer koden. Evidens er noget, andre kan efterprøve, fx en kodehenvisning, et skærmbillede, konsol/Network eller et keyboard-flow.</li>
<li>Registrér ét fund pr. række med område, fund og evidens, konsekvens, løsningsforslag, prioritet og planlagt verifikation.</li>
<li><strong>Første leverance efter 20–25 minutter:</strong> Gennemfør mindst to flows, og registrér tre fund eller hypoteser med evidens og konsekvens. Du behøver ikke dække alle seks fokusområder.</li>
<li>Foretag ingen kodeændringer i det første arbejdspas. Det bevarer din baseline, adskiller observation fra løsning og gør det muligt at prioritere fundene, før du implementerer.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Fagligt indspark: React-arkitektur</strong></summary>
<ul>
<li>Definér arkitektur som de valg, der placerer ansvar og forbinder delene – ikke blot som et bestemt mappetræ.</li>
<li>Start med et overblik over seks beslutninger i samme rækkefølge som indsparket: routes/pages, navne/struktur, requests/side effects, komponentansvar/composition, state/dataflow samt adskillelse/genbrug.</li>
<li>Vi bruger <strong>Post App med Supabase</strong> som fælles reference, så du senere kan overføre principperne til din egen audit af Mellemrum.</li>
<li><strong>Routes og pages:</strong> En route kobler en URL til en page-komponent. Page-komponenten samler det, brugeren skal se og gøre på den URL.</li>
<li><strong>Komponenter og ansvar:</strong> Brug <em>single responsibility</em> til at formulere ét hovedansvar pr. del og <em>component composition</em> til at bygge større UI af mindre komponenter. Brug HomePage, Header, PostCard og App som konkrete eksempler. Genbrugelige dele på tværs af pages – fx Header, Footer og Sidebar – hører naturligt hjemme i <code>components/</code>.</li>
<li><strong>Mulig forbedring af HomePage:</strong> Skeln mellem det, der med fordel kan udtrækkes nu, og det der kun skal udtrækkes ved et konkret behov. Gentagne Supabase-detaljer er et stærkt signal til en service; en <code>PostList</code> er først relevant, hvis listen genbruges eller får et tydeligere selvstændigt ansvar. Page-komponenten koordinerer fortsat sidens UI-states.</li>
<li><strong>State og dataflow:</strong> Placér state hos den nærmeste ejer. Vis konkret, hvordan en parent sender en værdi ned gennem props, og hvordan en child sender ændringen tilbage gennem en callback-prop. Beregn <em>derived state</em> som <code>postCount = posts.length</code> frem for at gemme en ekstra kopi.</li>
<li><strong>Side effects og Effects:</strong> Skeln mellem <em>side effect</em> som det generelle begreb og <em>Effect</em> som Reacts navn for synkroniseringen, der deklareres med <code>useEffect</code>. Hold renderingen pure, og følg et request gennem Supabase REST API og tilbage til UI'et.</li>
<li><strong>Adskillelse og genbrug:</strong> Sammenlign page, component, util og service som forskellige slags ansvar. Vis hvordan <code>postService.js</code> definerer URL og headers én gang. Hver domænefunktion – fx <code>getAll()</code>, <code>getById()</code>, <code>create()</code> og <code>update()</code> – har derefter sit eget synlige <code>fetch</code>-kald med endpoint, HTTP-metode, body og behandling af data. Pages importerer funktionerne og behøver ikke kende Supabase-opsætningen. Fejlhåndtering er udeladt i dette eksempel, fordi den gennemgås på en anden branch.</li>
<li><strong>Create og Update:</strong> Vis en mulig kontrolleret <code>PostForm</code>, der genbruger formularens markup, mens hver page fortsat ejer state, request og navigation.</li>
<li><strong>Util-eksempel:</strong> Vis hvordan en ren <code>formatPostDate()</code>-util kan formatere <code>createdAt</code> ens i både <code>PostCard</code> og <code>PostDetailPage</code>. Komponenten sender en værdi ind, og utilen returnerer en ny værdi uden React-state, JSX eller API-kald.</li>
<li><strong>Struktur før og efter:</strong> Sammenlign Post Apps nuværende struktur med en mulig forbedret struktur med <code>components/</code>, <code>services/</code> og <code>utils/</code>. Understreg, at mapperne er muligheder, som skal begrundes i konkrete ansvar eller gentagelser – ikke en obligatorisk startstruktur.</li>
<li><strong>Navne og struktur:</strong> Brug domænenære navne og den mindste mappestruktur, der gør ansvar og ændringer tydelige. Navngiv komponenter med PascalCase, fordi JSX bruger det store begyndelsesbogstav til at skelne egne React-komponenter som <code>&lt;PostCard /&gt;</code> fra indbyggede HTML-tags som <code>&lt;article&gt;</code>. Brug camelCase til værdier og funktioner, formulér booleans som spørgsmål, og navngiv event handlers efter den handling, de udfører.</li>
<li>Forklar løbende, hvorfor en grænse hjælper, og dokumentér derefter ét konkret arkitekturfund i Mellemrum.</li>
<li><strong>Se et implementeret eksempel:</strong> <a href="https://github.com/cederdorff/post-app-supabase/tree/refactor/architecture">Post App · branch: <code>refactor/architecture</code></a>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Repetition: styling i React</strong></summary>
<ul>
<li>Sammenlign klassisk CSS, CSS Modules og inline styles ud fra rækkevidde og ansvar.</li>
<li>Brug klassisk CSS til relevante globale regler og fælles mønstre, og importér det globale stylesheet ét sted, fx i <code>main.jsx</code>.</li>
<li>Brug CSS Modules, når komponentnære styles skal have lokal scope, navnekollisioner skal undgås, og afhængigheden mellem component og stylesheet skal være tydelig.</li>
<li>Brug primært inline styles til værdier, der faktisk beregnes i JavaScript, fx fremdrift i procent eller størrelse fra en prop.</li>
<li>Definér genbrugelige farver, spacing og andre designvalg som CSS custom properties i <code>:root</code>. Placér dem enten øverst i den globale CSS eller i en tydelig <code>variables.css</code>, som importeres globalt én gang.</li>
<li>Vurdér placering, gentagelser, konflikter og konsistens i løsningens styling.</li>
<li><strong>Se et implementeret eksempel:</strong> <a href="https://github.com/cederdorff/post-app-supabase/tree/refactor/react-styling">Post App · branch: <code>refactor/react-styling</code></a>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Repetition: accessibility i React</strong></summary>
<ul>
<li>Brug semantisk HTML og et logisk heading-hierarki; brug ARIA, når HTML ikke er tilstrækkeligt.</li>
<li>Brug de to komplette oversigter over semantiske HTML-elementer som appendix og opslag – ikke som slides, der skal læses element for element i undervisningen.</li>
<li>Kontrollér keyboard navigation, logisk rækkefølge og synligt fokus.</li>
<li><strong>Fokus-styring i React:</strong> Undersøg SPA-problemet, hvor fokus kan blive i navigationen efter et sideskift, og vis separat hvordan fokus kan flyttes til den nye sides <code>h1</code>.</li>
<li><strong>Routing og sideskift:</strong> Vis separat hvordan hver route opdaterer <code>document.title</code>. Saml derefter titel- og fokusløsningen i en <code>PageHeading</code>, hvor én <code>title</code>-prop bruges til både sidens <code>h1</code> og <code>document.title</code>.</li>
<li>Vurdér billeder, ikoner, medier og alt-tekster ud fra deres funktion i den konkrete kontekst: informativ, dekorativ, funktionel eller tidsbaseret.</li>
<li>Kontrollér farver, kontrast og states, så information ikke kommunikeres med farve alene. Mål tekst, controls, fokus og grafiske objekter mod deres faktiske tilstødende farver.</li>
<li>Undersøg formularernes labels, inputtyper, krav, validering, fejlbeskeder og feedback.</li>
<li><strong>Se et implementeret eksempel:</strong> <a href="https://github.com/cederdorff/post-app-supabase/tree/refactor/react-a11y">Post App · branch: <code>refactor/react-a11y</code></a>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Arbejd videre med auditten</strong></summary>
<ul>
<li>Gennemfør de vigtigste brugerflows i Mellemrum, og undersøg relevante filer og komponenter.</li>
<li>Brug audit-skabelonen til at dokumentere fund og evidens.</li>
<li>Beskriv konsekvensen for brugeren, produktet eller den videre udvikling.</li>
<li>Lav en realistisk, prioriteret liste over forbedringer.</li>
<li>Behandl de dokumenterede fund som en teknisk backlog: Hvert item skal have evidens, konsekvens, prioritet og planlagt verifikation.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Begynd på en afgrænset forbedring</strong></summary>
<ul>
<li>Opret en tydeligt navngivet branch til hver afgrænset forbedring. Start branchen fra en opdateret <code>main</code>.</li>
<li>Arbejd i små, kontrollerbare skridt uden at ændre anden funktionalitet.</li>
<li>Verificér forbedringen med relevant evidens.</li>
<li>Merge den færdige og verificerede branch tilbage i <code>main</code>.</li>
<li>Dokumentér resultatet, og start den næste forbedring i en ny branch fra den opdaterede <code>main</code>.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

De komplette oversigter over semantiske HTML-elementer og de faglige reference-links ligger som appendix efter afslutningssliden. De er opslag og behøver ikke gennemgås lineært i undervisningen.

- **Slides:**
  - [Case 1 · Teknisk audit, arkitektur, styling og accessibility](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-04/)
- **Materialer til dagens arbejde:**
  - [Mellemrum · repository](https://github.com/cederdorff/mellemrum)
  - [Mellemrum · deployet løsning](https://cederdorff.com/mellemrum/)
  - [Teknisk audit af en React-løsning](https://eaaa.instructure.com/courses/30922/pages/teknisk-audit-af-en-react-losning)
  - [Casebeskrivelse: Fra prototype til produktionsklar React-løsning](https://eaaa.instructure.com/courses/30922/pages/case-1-fra-prototype-til-produktionsklar-react-losning)
- **Fælles arkitektureksempel:**
  - [Post App med Supabase](https://github.com/cederdorff/post-app-supabase)
- **Implementerede eksempler i Post App:**
  - [Arkitektur · `refactor/architecture`](https://github.com/cederdorff/post-app-supabase/tree/refactor/architecture)
  - [Styling i React · `refactor/react-styling`](https://github.com/cederdorff/post-app-supabase/tree/refactor/react-styling)
  - [Accessibility i React · `refactor/react-a11y`](https://github.com/cederdorff/post-app-supabase/tree/refactor/react-a11y)
- **Faglige referencer til styling og accessibility:**
  - [React styling approaches og a11y · tidligere undervisningsside](https://eaaa.instructure.com/courses/30922/pages/race-6-react-styling-approaches-and-a11y-accessibility-11-02-2026?module_item_id=947733)
  - [Styling i React](https://race.notion.site/Styling-i-React-268bc239db11806c82a9f2e25fdc5ccc)
  - [React og Accessibility (a11y)](https://race.notion.site/React-og-Accessibility-a11y-302bc239db1180bba2b8c5bb9639664c)
  - [Product Grid with React · Del 3: Styling og a11y](https://race.notion.site/Product-Grid-with-React-Del-3-Styling-a11y-303bc239db11803fb655fa7d1b994daf)
