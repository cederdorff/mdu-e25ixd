# RACE - Dynamic User Interface: Next.js og headless WordPress - 26-10-2026

## Formål

I dag går vi fra React med Vite og React Router til Next.js. Du opretter selv et nyt Next.js-projekt, gennemgår strukturen og bruger din egen WordPress-løsning som headless CMS.

Målet er en Next.js-app, der henter indhold fra din WordPress via REST API'et og viser det i en liste og på en detaljeside. Appen er din lab-app i forløbet: Vi bygger videre på den med designsystem, login, brugere og motion, og principperne overfører du til jeres gruppeprojekt.

<hr style="margin: 2rem 0;">

## Forberedelse

- Opret nogle **posts og pages** i din WordPress på Simply.com. Giv dem gerne et fremhævet billede, en kategori og nok indhold til både en liste og en detaljeside.
- Åbn `https://<dit-domæne>/wp-json/wp/v2/posts` i browseren, og tjek, at du får JSON tilbage.
  - Får du en fejl, så tjek, at **Permalinks** under *Indstillinger* ikke står til *Plain*.
  - Tjek også, at et sikkerhedsplugin ikke blokerer REST API'et.
- Sørg for, at du har en opdateret LTS-version af [Node.js](https://nodejs.org/) installeret.

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Kort input → opret og forstå projektet → hent data fra WordPress → byg liste og detaljeside → overfør til jeres projektidé.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Fra Vite og React Router til Next.js</strong></summary>
<ul>
<li>Hvorfor et framework? Next.js giver routing, rendering på serveren, datahentning og build i én samlet løsning.</li>
<li>Sammenlign med det, du kender: Komponenter, props, state og hooks virker som før – men routing og datahentning ændrer sig.</li>
<li>Filbaseret routing: Mapper i <code>app/</code> bliver til routes, og <code>page.js</code> er siden.</li>
<li>Server components er standard. Kun komponenter med state, events eller browser-API'er skal have <code>"use client"</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Opret dit Next.js-projekt</strong></summary>
<ul>
<li>Kør <code>npx create-next-app@latest</code>, og svar <strong>No</strong> til TypeScript, <strong>Yes</strong> til Tailwind CSS og <strong>Yes</strong> til App Router. Brug standardvalget til resten.</li>
<li>Kør <code>npm run dev</code>, og åbn appen i browseren.</li>
<li>Gennemgå den genererede struktur: <code>app/layout.js</code>, <code>app/page.js</code>, <code>app/globals.css</code>, <code>public/</code>, <code>next.config.mjs</code> og <code>package.json</code>.</li>
<li>Ryd op i templaten: Fjern demoindhold, og opdatér titel, beskrivelse og <code>lang</code> i <code>layout.js</code>.</li>
<li>Opret et GitHub-repository, og commit dit udgangspunkt.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Routing og layouts</strong></summary>
<ul>
<li>Opret en ny route, fx <code>app/om/page.js</code>, og navigér mellem siderne med <code>Link</code> fra <code>next/link</code>.</li>
<li>Brug <code>layout.js</code> til det, der går igen på alle sider, fx header, navigation og footer.</li>
<li>Tilføj en <code>not-found.js</code>, så ukendte routes får en forståelig side.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. WordPress som headless CMS</strong></summary>
<ul>
<li>Headless betyder, at WordPress kun håndterer indholdet, mens Next.js står for præsentationen.</li>
<li>Undersøg REST API'et i browseren: <code>/wp-json/wp/v2/posts</code>, <code>/wp-json/wp/v2/pages</code> og <code>/wp-json/wp/v2/posts?slug=...</code>.</li>
<li>Find de felter, du skal bruge: <code>id</code>, <code>slug</code>, <code>date</code>, <code>title.rendered</code>, <code>excerpt.rendered</code> og <code>content.rendered</code>.</li>
<li>Tilføj <code>?_embed</code> for at få fremhævet billede og kategorier med i samme request.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Hent posts i en server component</strong></summary>
<ul>
<li>Gem din WordPress-URL i <code>.env.local</code>, fx <code>WORDPRESS_URL=https://dit-domæne.dk</code>, og dokumentér variablen i <code>.env.example</code>.</li>
<li>Variabler uden <code>NEXT_PUBLIC_</code> kan kun læses på serveren. Sammenlign med <code>VITE_</code>-variablerne fra Product optimization, som kunne læses i frontend.</li>
<li>Gør din page-komponent <code>async</code>, og hent posts med <code>fetch</code> direkte i komponenten – uden <code>useEffect</code> og <code>useState</code>.</li>
<li>Vis posts i en liste med titel, uddrag, dato og link til detaljesiden.</li>
<li>Håndtér fejl og tomme svar, ligesom du gjorde med robuste UI-states i Case 1.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Detaljeside med dynamisk route</strong></summary>
<ul>
<li>Opret <code>app/posts/[slug]/page.js</code>, og læs <code>slug</code> fra <code>params</code>. Husk, at <code>params</code> skal <code>await</code>'es.</li>
<li>Hent den enkelte post med <code>?slug=</code>, og kald <code>notFound()</code>, hvis den ikke findes.</li>
<li>WordPress returnerer indholdet som HTML. Vis det med <code>dangerouslySetInnerHTML</code>, og diskutér, hvorfor det kun er i orden, når du selv kontrollerer kilden.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>7. Arbejd videre</strong></summary>
<ul>
<li>Vis også pages, fremhævede billeder eller kategorier.</li>
<li>Sammenlign din løsning med referencerepoet, hvis du sidder fast.</li>
<li>Overvej jeres projektidé: Hvilket indhold kunne komme fra et CMS, og hvad giver ikke mening at lægge der?</li>
<li>Commit og push dit arbejde. Du skal bruge appen næste gang.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:** Vil blive tilgængelige her
- **Opgaver:** Vil blive tilgængelige her
- **Next.js:**
  - [Installation](https://nextjs.org/docs/app/getting-started/installation)
  - [Project structure](https://nextjs.org/docs/app/getting-started/project-structure)
  - [Layouts and pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
  - [Server and client components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
  - [Fetching data](https://nextjs.org/docs/app/getting-started/fetching-data)
- **WordPress:**
  - [REST API Handbook](https://developer.wordpress.org/rest-api/)
  - [Reference: Posts](https://developer.wordpress.org/rest-api/reference/posts/)
  - [Reference: Pages](https://developer.wordpress.org/rest-api/reference/pages/)
