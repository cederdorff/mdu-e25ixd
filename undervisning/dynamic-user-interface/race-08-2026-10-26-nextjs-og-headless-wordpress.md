# RACE - Dynamic User Interface: Next.js og headless WordPress - 26-10-2026

## Formål

Indtil nu har vi arbejdet med React og Vite. I dag kaster vi os over React-frameworket Next.js, som vi arbejder med resten af semesteret. Det er stadig React, men med routing, server components og data fetching indbygget. Vi opretter et nyt Next.js-projekt og bruger vores egne WordPress-løsninger som headless CMS.

Målet er en Next.js-app, der henter indhold fra vores WordPress via REST API'et og viser det som en liste eller et grid af cards og på en detaljeside. Appen følger dig resten af forløbet: Vi bygger videre på den med designsystem, login, brugere og motion, og principperne tager vi med over i gruppeprojekterne.

<hr style="margin: 2rem 0;">

## Forberedelse

- Se og kod med på første del af [Learn Next.js på Scrimba](https://scrimba.com/learn-nextjs-c02moisq6a) (gratis): **Build a Next.js App** (ca. 2 timer).
- Opret testindhold i din WordPress på Simply.com:
  - **Mindst 5 posts** med tekst, et **fremhævet billede** og en **kategori**. Brug mindst 2 forskellige kategorier.
  - **1 page** med titlen _About_ og slug `about`.
  - Sørg for, at indholdet er **udgivet**. Kladder kommer ikke med i REST API'et.
- Åbn `https://<dit-domæne>/wp-json/wp/v2/posts` i browseren, og tjek, at du får JSON tilbage. Får du en fejl, så tjek, at **Permalinks** ikke står til _Plain_. Brug test-URL'en [`https://headless.cederdorff.dk`](https://headless.cederdorff.dk/wp-json/wp/v2/posts), mens du fejlfinder.
- Sørg for, at du har en opdateret LTS-version af [Node.js](https://nodejs.org/) installeret.

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Kort input → opret projektet → routing og layouts → hent posts fra WordPress → detaljeside → forside, About og fælles datalag. Trin, CSS-links og fejlfinding til hver opgave finder du i slides og i opgavefilen under [Materialer](#materialer).

<details style="margin-left: 1.5rem;">
<summary><strong>1. Fra React og Vite til Next.js</strong></summary>
<ul>
<li>Client-server og rendering: I Vite laves HTML'en i browseren (CSR). I Next.js laves den på serveren (SSR), og JavaScript gør den interaktiv bagefter (<em>hydration</em>).</li>
<li>Se forskellen selv: Åbn Post App bygget med <a href="https://cederdorff.com/post-app-supabase/">React og Vite</a> og med <a href="https://nextjs-post-app-supabase.vercel.app/">Next.js</a>, og sammenlign <em>Vis sidekilde</em> (<code>⌥⌘U</code>).</li>
<li>Library vs. framework: Next.js bestemmer strukturen og kalder din kode – <em>inversion of control</em>.</li>
<li>Filbaseret routing, og server components er standard. Kun komponenter med state, events eller browser-API'er skal have <code>"use client"</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Opret dit Next.js-projekt</strong></summary>
<ul>
<li>Opret projektet i en tom mappe med små bogstaver og bindestreger, fx <code>nextjs-wordpress</code>:
<pre><code class="language-bash">npx create-next-app@latest . --js --no-tailwind --eslint --app --no-src-dir --import-alias "@/*" --no-react-compiler --cache-components</code></pre>
</li>
<li>Gennemgå strukturen, ryd op i templaten, og kopiér <code>app/globals.css</code> fra referencerepoet.</li>
<li>Publicér repositoriet på GitHub, og commit og push efter hver opgave.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Routing og layouts</strong></summary>
<ul>
<li>Mappen er URL'en, og filen hedder <code>page.js</code>: Opret <code>/posts</code> og <code>/about</code>.</li>
<li>Lav <code>Header</code> og <code>Footer</code> i <code>components/</code>, brug <code>Link</code> fra <code>next/link</code>, og vis dem i <code>layout.js</code> rundt om <code>{children}</code>.</li>
<li>Tilføj en <code>not-found.js</code> til ukendte routes.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. WordPress som headless CMS</strong></summary>
<ul>
<li>Headless: Next.js er det nye "hoved" og henter indholdet som JSON fra WordPress' REST API. Redaktøren skriver i admin, du bestemmer brugeroplevelsen.</li>
<li>Undersøg <code>/wp-json/wp/v2/posts</code>, <code>?slug=...</code> og <code>/pages?slug=about</code>. Svaret er altid et array.</li>
<li>Følg stien: <code>posts[0].title.rendered</code>. <code>.rendered</code>-felterne indeholder HTML.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Hent posts i en server component</strong></summary>
<ul>
<li>Gem <code>WORDPRESS_URL</code> i <code>.env.local</code>. Uden <code>NEXT_PUBLIC_</code> kan variablen kun læses på serveren.</li>
<li>Gør <code>app/posts/page.js</code> <code>async</code>, og hent posts med <code>fetch</code> direkte i komponenten – uden <code>useEffect</code> og <code>useState</code>.</li>
<li>Vis posts som et grid af <code>PostCard</code>s med titel, uddrag, dato og link.</li>
<li>Hver route, der henter data, får sin egen <code>loading.js</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Detaljeside med dynamisk route</strong></summary>
<ul>
<li>Opret <code>app/posts/[slug]/page.js</code>, og <code>await</code> <code>params</code>.</li>
<li>Hent posten med <code>?slug=</code>, brug det første element, og kald <code>notFound()</code>, hvis arrayet er tomt.</li>
<li>Vis indholdet med <code>dangerouslySetInnerHTML</code>, og diskutér, hvorfor det kun er i orden, når du selv kontrollerer kilden.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>7. Forside, About og et fælles datalag</strong></summary>
<ul>
<li>Vis de 3 seneste posts på forsiden, og genbrug griddet i en <code>PostList</code>-komponent.</li>
<li>Hent din <em>About</em>-page med <code>/pages?slug=about</code> – samme mønster som detaljesiden.</li>
<li>Saml dine <code>fetch</code>-kald i <code>lib/wordpress.js</code> og datoformatet i <code>lib/format.js</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>8. Arbejd videre</strong></summary>
<ul>
<li>Tilføj <code>_embed</code>, og vis fremhævede billeder og kategorier.</li>
<li>Tjek <code>response.ok</code>, og tilføj en <code>app/error.js</code> med <code>retry()</code>.</li>
<li>Commit og push dit arbejde. Du skal bruge appen næste gang.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:**
  - [Next.js og headless WordPress](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/)
  - [PDF-version: Next.js og headless WordPress](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/?print-pdf)
- **Opgaver:**
  - [Opgaveoversigt i slides](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/opgaver)
  - [Opgaver med ekstra hjælp og løsninger](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-2026-10-26-nextjs-og-headless-wordpress.md) – forklaringer, fejlfinding og den fulde løsning
  - [Produktionsdag 28. oktober](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/2026-10-28-produktionsdag-nextjs-og-headless-wordpress.md)
- **Referencerepo:** [nextjs-headless-wordpress](https://github.com/cederdorff/nextjs-headless-wordpress) – commits følger trinene i opgaverne
- **Next.js:**
  - [Next.js in 100 Seconds](https://www.youtube.com/watch?v=Sklc_fQBmcs) (Fireship) – de første ca. 2 minutter. Resten af videoen bruger den ældre Pages Router.
  - [Learn Next.js på Scrimba](https://scrimba.com/learn-nextjs-c02moisq6a) (gratis kursus) – første del: _Build a Next.js App_
  - [Installation](https://nextjs.org/docs/app/getting-started/installation)
  - [Project structure](https://nextjs.org/docs/app/getting-started/project-structure)
  - [Layouts and pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
  - [Server and client components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
  - [Fetching data](https://nextjs.org/docs/app/getting-started/fetching-data)
  - [Inversion of Control](https://martinfowler.com/bliki/InversionOfControl.html) (Martin Fowler)
- **WordPress:**
  - [REST API Handbook](https://developer.wordpress.org/rest-api/)
  - [Reference: Posts](https://developer.wordpress.org/rest-api/reference/posts/)
  - [Reference: Pages](https://developer.wordpress.org/rest-api/reference/pages/)
