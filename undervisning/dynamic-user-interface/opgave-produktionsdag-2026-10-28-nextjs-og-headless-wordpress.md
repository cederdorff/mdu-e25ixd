# Produktionsdag: Next.js og headless WordPress – fra start til slut - 28-10-2026

## Formål

I dag bruger du dagen på at forstå Next.js og headless WordPress. Opgaven tager dig fra en tom mappe til en færdig Next.js-app, der henter posts og en About-page fra din egen WordPress via REST API'et.

Opgaven bygger på slides og opgaver fra 26. oktober. Hvert trin linker til de slides, trinnet bygger på, og til det commit i referencerepoet, der viser en løsning.

Målet er ikke kun en app, der virker. Du skal kunne forklare, hvad der sker i den. Derfor slutter hvert trin med et par spørgsmål under **Forstå det**. Svar på dem med dine egne ord, gerne skriftligt eller højt for en sidemakker, før du går videre.

<hr style="margin: 2rem 0;">

## Sådan bruger du opgaven

- **Nåede du ikke så langt mandag?** Fortsæt i dit projekt fra det trin, du kom til. Læs **Forstå det** for de trin, du allerede har lavet.
- **Nåede du det meste?** Byg appen forfra i en ny mappe uden at kigge i din gamle kode. Det er den bedste test af, om du har forstået det. Brug slides og referencerepo, når du sidder fast.
- **Ikke set Scrimba endnu?** Start med [trin 0](#trin-0-scrimba).
- Commit og push efter hvert trin. Så kan du altid gå tilbage, og commits følger samme trin som referencerepoet.
- CSS er ikke dagens fokus. Kopiér CSS-filerne fra referencerepoet via linkene, og brug de samme `className`s som i repoets komponenter.

<hr style="margin: 2rem 0;">

## Før du starter

- Du har en opdateret LTS-version af [Node.js](https://nodejs.org/) installeret. Tjek med `node -v` i terminalen.
- Din WordPress på Simply.com har:
  - **Mindst 5 udgivne posts** med titel, et par afsnit tekst, et **fremhævet billede** og en **kategori**. Brug mindst 2 forskellige kategorier.
  - **1 udgivet page** med titlen _About_ og slug `about`.
- `https://<dit-domæne>/wp-json/wp/v2/posts` giver JSON i browseren.
- **Får du en fejl?** Tjek, at **Permalinks** under _Indstillinger_ ikke står til _Plain_, og at et sikkerhedsplugin ikke blokerer REST API'et. Brug test-URL'en [`https://headless.cederdorff.dk`](https://headless.cederdorff.dk/wp-json/wp/v2/posts), mens du fejlfinder.

<hr style="margin: 2rem 0;">

## Trin 0: Scrimba

Se og kod med på første del af [Learn Next.js på Scrimba](https://scrimba.com/learn-nextjs-c02moisq6a) (gratis): **Build a Next.js App** (ca. 2 timer). Kurset viser de samme grundbegreber, som du bruger i resten af opgaven: routes som mapper, layouts, server components og datahentning.

Har du allerede set den, så spring trinnet over, og fortsæt med de næste dele af kurset, når du er færdig med trin 7.

**Forstå det:**

- Hvilke begreber fra Scrimba genkender du fra slides fra mandag?
- Hvad gør kurset anderledes end vores app? Fx et andet API end WordPress eller en anden måde at style på.

<hr style="margin: 2rem 0;">

## Trin 1: Opret dit Next.js-projekt

1. Opret en tom mappe med små bogstaver og bindestreger, fx `nextjs-wordpress`, og åbn den i VS Code.
2. Kør kommandoen i terminalen i VS Code. Punktummet betyder, at projektet oprettes i den mappe, du står i:

   ```bash
   npx create-next-app@latest . --js --no-tailwind --eslint --app --no-src-dir --import-alias "@/*" --no-react-compiler --cache-components
   ```

3. Kør `npm run dev`, og åbn appen i browseren.
4. Find filen til forsiden og den fil, hvor `<html>` og `<body>` står.
5. Ryd op: Lad `app/page.js` vise en `<h1>`, slet `app/page.module.css` og SVG-filerne i `public/`, ret `metadata` og `lang` i `app/layout.js`, og kopiér [`app/globals.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/app/globals.css) fra referencerepoet.
6. Commit, og publicér repositoriet på GitHub:
   - **Source Control i VS Code:** Skriv en besked, klik på _Commit_ og derefter på _Publish Branch_.
   - **GitHub Desktop:** Vælg _File → Add Local Repository_ og projektmappen, klik på _Commit to main_ og derefter på _Publish repository_.

   Efter de næste trin committer du og pusher med _Sync Changes_ i VS Code eller _Push origin_ i GitHub Desktop.

**Forstå det:**

- Hvad betyder det, at Next.js er et _framework_ og React et _library_? Hvem kalder din kode?
- `npm run dev` starter en rigtig server. Hvad gjorde Vite, og hvad gør Next.js anderledes?
- Hvor bliver HTML'en lavet med CSR, og hvor bliver den lavet med SSR?

**Sidder du fast?** Får du en fejl om _npm naming restrictions_, så omdøb mappen til små bogstaver og bindestreger, og kør kommandoen igen. Mangler _Publish Branch_ eller _Publish repository_, så log ind på GitHub i VS Code under _Accounts_ eller i GitHub Desktop under _Settings → Accounts_.

**Du er klar, når:** Appen kører lokalt med din egen titel, og udgangspunktet ligger på GitHub.

**Slides:** [Fra Vite til Next.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/fra-vite) · [CSR og SSR](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/csr-ssr-definition) · [Inversion of control](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/inversion-of-control) · [Kommandoen](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/kommando) · [Strukturen](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/struktur)<br>
**Referencerepo:** [Oprydning af templaten](https://github.com/cederdorff/nextjs-headless-wordpress/commit/6fc6d02)

<hr style="margin: 2rem 0;">

## Trin 2: Routes, layout og navigation

1. Opret `app/posts/page.js` og `app/about/page.js` med en overskrift hver. Giv også forsiden en kort intro i en `<section className={styles.hero}>`, og opret `app/page.module.css` igen med CSS fra repoet: [`app/page.js`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/89c1be4/app/page.js) og [`app/page.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/89c1be4/app/page.module.css).
2. Opret `components/` i roden ved siden af `app/`. Lav `Header.js` med navigation med `Link` fra `next/link` og `Footer.js`. Kopiér komponenterne og deres CSS fra repoet: [`Header.js`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/Header.js), [`Header.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/Header.module.css), [`Footer.js`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/Footer.js) og [`Footer.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/Footer.module.css).
3. Vis `Header` og `Footer` rundt om `{children}` i `app/layout.js`:

   ```jsx
   <body>
     <Header />
     {children}
     <Footer />
   </body>
   ```

4. Tilføj `app/not-found.js`, og test den på `/findes-ikke`.
5. Commit og push.

**Forstå det:**

- Hvordan bliver en mappe i `app/` til en route? Hvad skal der til, for at en mappe _ikke_ bliver en route?
- Hvad er `{children}` i `layout.js`, og hvorfor bliver header og footer stående, når du navigerer?
- Hvad gør `Link` anderledes end `<a>`?

**Sidder du fast?** Virker en route ikke, skal mappen hedde det samme som URL'en, og filen skal hedde `page.js`. Kan `Header` ikke findes, så tjek, at `components/` ligger i roden, og at importen er `@/components/Header`.

**Du er klar, når:** Du kan navigere mellem `/`, `/posts` og `/about` uden fuld reload, `/findes-ikke` viser din not-found-side, og arbejdet er pushet.

**Slides:** [Routes som mapper](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/routes-som-mapper) · [Layout](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/layout-model) · [Link](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/link) · [Not found](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/not-found)<br>
**Referencerepo:** [Header, footer, routes og not-found](https://github.com/cederdorff/nextjs-headless-wordpress/commit/89c1be4)

<hr style="margin: 2rem 0;">

## Trin 3: Undersøg dit eget REST API

Før du skriver kode, skal du kende de data, du henter. Brug browseren med _Pretty print_ slået til eller Thunder Client i VS Code.

1. Åbn `https://<dit-domæne>/wp-json/wp/v2/posts`. Starter svaret med `[`?
2. Find de seks felter i første post: `id`, `slug`, `date`, `title.rendered`, `excerpt.rendered` og `content.rendered`.
3. Skriv stien til titlen: `posts` → `posts[0]` → `posts[0].title` → `posts[0].title.rendered`.
4. Åbn `/wp-json/wp/v2/posts?slug=<en-slug>`. Prøv også en slug, der ikke findes.
5. Åbn `/wp-json/wp/v2/pages?slug=about`.
6. Notér din WordPress-URL uden `/` til sidst.

**Forstå det:**

- Hvad betyder _headless_? Hvad er "hovedet", og hvad er "kroppen"?
- Hvad er fordelen for en redaktør og for dig som udvikler? Hvad er prisen?
- Hvorfor er svaret fra `?slug=` et array, selvom der kun er ét match? Hvad får du, når slug'en ikke findes?
- Hvorfor får du fejlen _Objects are not valid as a React child_, hvis du skriver `{post.title}`?

**Sidder du fast?** Får du en fejl, så tjek Permalinks og sikkerhedsplugins som under [Før du starter](#før-du-starter), og brug test-URL'en, mens du fejlfinder.

**Du er klar, når:** Du kan forklare, hvad de seks felter skal bruges til, og har noteret din WordPress-URL.

**Slides:** [WordPress uden hoved](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/wp-headless) · [Hvorfor headless?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/hvorfor-headless) · [Endpoints](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/endpoints) · [Felterne](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/felter) · [Datastrukturen](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/datastruktur)

<hr style="margin: 2rem 0;">

## Trin 4: Hent og vis dine posts

1. Gem URL'en i `.env.local` i projektets rod ved siden af `package.json`, og genstart `npm run dev`:

   ```bash
   WORDPRESS_URL=https://dit-domæne.dk
   ```

2. Dokumentér variablen i `.env.example`, og tilføj `!.env.example` under `.env*` i `.gitignore`, så eksempelfilen kommer med i dit commit.
3. Gør `app/posts/page.js` `async`, hent posts med `fetch` direkte i komponenten, log dem med `console.log`, og vis titlerne i en `<ul>`:

   ```jsx
   export default async function PostsPage() {
     const response = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts`);
     const posts = await response.json();
     console.log(posts);

     return (
       <main>
         <h1>Posts</h1>
         <ul>
           {posts.map((post) => (
             <li key={post.id}>{post.title.rendered}</li>
           ))}
         </ul>
       </main>
     );
   }
   ```

4. Lav en `PostCard`-komponent med titel, uddrag, dato og link til `/posts/<slug>`, og vis dine posts som et grid af cards. Kopiér [`PostCard.js`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/88e6baee8faef5e90bb2a1c0718e381c48fc8a56/components/PostCard.js), [`PostCard.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/PostCard.module.css) og [`app/posts/page.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/88e6baee8faef5e90bb2a1c0718e381c48fc8a56/app/posts/page.module.css).
5. Tilføj `app/posts/loading.js`, kør `npm run build`, og push.

**Forstå det:**

- Hvorfor står outputtet fra `console.log` i terminalen og ikke i browserens console?
- Hvorfor skal du ikke bruge `useEffect` og `useState` til at hente data her?
- Hvorfor kan `WORDPRESS_URL` ikke læses i browseren? Sammenlign med `VITE_`-variablerne fra Product optimization.
- Hvorfor fejler `npm run build` uden `loading.js`? Og hvorfor får hver route, der henter data, sin egen `loading.js`?

**Sidder du fast?** Står der `undefined` i URL'en, så tjek stavning og placering af `.env.local`, og genstart `npm run dev`. Er `posts` ikke et array, så log det. Får du _Module not found_, så opret den `.module.css`, du importerer.

**Du er klar, når:** `/posts` viser dine posts som cards, `npm run build` går igennem, og arbejdet er pushet.

**Slides:** [Dataflow](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/dataflow) · [.env.local](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/env) · [Hent og log](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/hent-log) · [PostCard](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/postcard) · [loading.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/loading)<br>
**Referencerepo:** [Hent posts](https://github.com/cederdorff/nextjs-headless-wordpress/commit/dc5fac6) · [Grid af cards](https://github.com/cederdorff/nextjs-headless-wordpress/commit/88e6bae) · [loading.js](https://github.com/cederdorff/nextjs-headless-wordpress/commit/e7b510e)

<hr style="margin: 2rem 0;">

## Trin 5: Byg detaljesiden

1. Opret `app/posts/[slug]/page.js`, og læs `slug` fra `params` med `await`.
2. Hent posten med `?slug=`, brug det første element i arrayet, og kald `notFound()`, hvis det mangler:

   ```jsx
   const { slug } = await params;
   const response = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts?slug=${slug}`);
   const posts = await response.json();
   const post = posts[0];

   if (!post) {
     notFound();
   }
   ```

3. Vis titel, dato og `content.rendered` i en `<div className="wp-content">` med `dangerouslySetInnerHTML`, og tilføj et `Link` tilbage til `/posts`. Kopiér [`app/posts/[slug]/page.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/app/posts/%5Bslug%5D/page.module.css).
4. Tilføj `app/posts/[slug]/loading.js`, test `/posts/findes-ikke`, og push.

**Forstå det:**

- Hvordan kan én `page.js` vise alle dine posts? Hvor kommer `slug` fra?
- Hvorfor hedder funktionen `dangerouslySetInnerHTML`, og hvorfor er den i orden at bruge her?

**Sidder du fast?** Er `slug` `undefined`, skal mappen hedde `[slug]` med firkantede parenteser, og `params` skal `await`'es. Får du 404, selvom posten findes, så log `slug` og URL'en, og sammenlign med din WordPress.

**Du er klar, når:** Et klik på et card åbner detaljesiden, `/posts/findes-ikke` viser din not-found-side, og arbejdet er pushet.

**Slides:** [Fra URL til slug](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/slug-flow) · [Hent én post](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/hent-en) · [Vis posten](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/vis-post) · [Stol på kilden](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/trust)<br>
**Referencerepo:** [Detaljeside med dynamisk route](https://github.com/cederdorff/nextjs-headless-wordpress/commit/2bb0e75)

<hr style="margin: 2rem 0;">

## Trin 6: Forside, About og et fælles datalag

1. Vis de 3 seneste posts på forsiden med `?per_page=3`. Flyt griddet til en `PostList`-komponent, så forsiden og `/posts` kan genbruge den, og omdøb `app/posts/page.module.css` til `components/PostList.module.css`. Udvid `app/page.module.css` med CSS fra repoet: [`app/page.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/15e6817b4edd1177205001de40bd33b5e10d67e7/app/page.module.css).
2. Hent din About-page med `/pages?slug=about`, og vis den på `/about`. Det er samme mønster som detaljesiden.
3. Giv forsiden og About hver sin `loading.js`: `app/loading.js` og `app/about/loading.js`.
4. Nu henter fire sider data fra den samme URL. Flyt dine `fetch`-kald til fire funktioner i `lib/wordpress.js`: `getPosts()`, `getLatestPosts()`, `getPostBySlug(slug)` og `getPageBySlug(slug)`:

   ```js
   const API_URL = `${process.env.WORDPRESS_URL}/wp-json/wp/v2`;

   export async function getPostBySlug(slug) {
     const response = await fetch(`${API_URL}/posts?slug=${slug}`);
     const posts = await response.json();
     return posts[0];
   }
   ```

5. Flyt `toLocaleDateString` til en `formatDate()`-funktion i `lib/format.js`, kør `npm run build`, og push.

**Forstå det:**

- Hvad vinder du ved et fælles datalag? Hvad skulle du ellers rette, hvis URL'en ændrede sig?
- Hvorfor kalder siden selv `notFound()` i stedet for funktionen i `lib/wordpress.js`?

**Sidder du fast?** Ser alt ens ud efter flytningen, er det meningen – datalaget ændrer ikke det, brugeren ser. Får du en fejl om import, så tjek, at funktionerne er `export`'et, og at importen er `@/lib/wordpress`.

**Du er klar, når:** Ingen sider kalder `fetch` direkte, datoen formateres ét sted, `npm run build` går igennem, og arbejdet er pushet.

**Slides:** [PostList](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/postlist) · [About](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/about) · [Datalaget](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/datalag-model) · [lib/wordpress.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/datalag-kode) · [formatDate()](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/format)<br>
**Referencerepo:** [Forside, About og PostList](https://github.com/cederdorff/nextjs-headless-wordpress/commit/15e6817) · [Fælles datalag](https://github.com/cederdorff/nextjs-headless-wordpress/commit/8c165b0)

<hr style="margin: 2rem 0;">

## Trin 7: Billeder, kategorier og fejlhåndtering

1. Find `_embedded` i JSON'en med `?_embed`, og tilføj `_embed` til URL'erne i `lib/wordpress.js`. Kun den første parameter får `?`, resten får `&`, fx `?per_page=3&_embed`.
2. Vis fremhævet billede og kategorier på dine cards. Følg stien, og brug `?.` hele vejen:

   ```js
   const image = post._embedded?.["wp:featuredmedia"]?.[0];
   const categories = post._embedded?.["wp:term"]?.[0] ?? [];
   ```

3. Vis det fremhævede billede på detaljesiden og About med `className="featured-image"` fra `globals.css`. Brug et almindeligt `<img>`.
4. Tjek `response.ok` i funktionerne i `lib/wordpress.js`, og kast en fejl, hvis WordPress ikke svarer med en status i 200-serien. Tilføj `app/error.js` med en knap, der kalder `retry()`.
5. Stav et endpoint forkert, se din fejlside, ret det igen, og push.

**Forstå det:**

- Hvorfor får du kun `"featured_media": 8` uden `_embed`?
- Hvorfor skal `error.js` have `"use client"`, når de andre sider ikke skal?
- Hvilke UI-states har din app nu, og hvilke filer står for dem?

**Sidder du fast?** Viser forsiden 10 posts, står der `?_embed` i stedet for `&_embed` efter `?per_page=3`. Får du _Cannot read properties of undefined_, så brug `?.` hele vejen ned ad stien. Intet billede? Tjek, at posten har et fremhævet billede i WordPress.

**Du er klar, når:** Dine cards har billede og kategori, en forkert URL giver din fejlside med en knap, der virker, og arbejdet er pushet.

**Slides:** [_embed i JSON'en](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/embed-json) · [Vis billede og kategori](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/embed-vis) · [response.ok](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/response-ok) · [error.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/error-js)<br>
**Referencerepo:** [Billeder og kategorier](https://github.com/cederdorff/nextjs-headless-wordpress/commit/1a96d45) · [Fejlhåndtering](https://github.com/cederdorff/nextjs-headless-wordpress/commit/222b6e4)

<hr style="margin: 2rem 0;">

## Afslutning: Forklar det med dine egne ord

Slut dagen af med at forklare begreberne for en sidemakker eller skrive et par linjer om hvert. Kan du ikke forklare et begreb, så gå tilbage til det trin, der står i parentes.

- **Framework** – hvad betyder det, at Next.js kalder din kode? (trin 1)
- **Client og server** – hvad sker der fra request til response i din app? (trin 1 og 4)
- **CSR og SSR** – hvor bliver HTML'en lavet i din app? (trin 1)
- **Route og layout** – hvad er forskellen på `page.js` og `layout.js`? (trin 2)
- **Headless CMS** – hvem gør hvad, WordPress eller Next.js? (trin 3)
- **Server component** – hvorfor kan din side være `async` og hente data uden `useEffect`? (trin 4)
- **Dynamisk route** – hvordan viser én `page.js` mange posts? (trin 5)
- **Datalag og UI-states** – hvad samler `lib/wordpress.js`, og hvad gør `loading.js`, `error.js` og `not-found.js`? (trin 6 og 7)

Har du tid tilbage, så fortsæt med de næste dele af [Learn Next.js på Scrimba](https://scrimba.com/learn-nextjs-c02moisq6a).

<hr style="margin: 2rem 0;">

## Klar til torsdag

- Din Next.js-app kører lokalt og er pushet til GitHub. Torsdag bygger vi et designsystem ovenpå den.
- Du har en Figma-fil med et simpelt udgangspunkt for appen, fx farver, typografi og et par komponenter.

<hr style="margin: 2rem 0;">

## Materialer

- [Slides: Next.js og headless WordPress](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/)
- [Opgaveoversigt fra 26. oktober](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/opgaver)
- [Referencerepo: nextjs-headless-wordpress](https://github.com/cederdorff/nextjs-headless-wordpress) – [commits](https://github.com/cederdorff/nextjs-headless-wordpress/commits/main) følger trinene
- [Learn Next.js på Scrimba](https://scrimba.com/learn-nextjs-c02moisq6a) (gratis)
- [Next.js: Layouts and pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Next.js: Fetching data](https://nextjs.org/docs/app/getting-started/fetching-data)
- [WordPress: REST API Handbook](https://developer.wordpress.org/rest-api/)
