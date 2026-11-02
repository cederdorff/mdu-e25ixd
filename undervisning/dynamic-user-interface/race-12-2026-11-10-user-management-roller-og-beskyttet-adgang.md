# RACE - Dynamic User Interface: User management, roller og beskyttet adgang - 10-11-2026

## Formål

Sidst fik Next.js-appen login. I dag zoomer vi først ud: Hvad får du forærende, når du bruger et framework som Next.js – routes, loading, fejl- og 404-sider og meget mere? Derefter bygger vi videre med user management, brugerroller og beskyttet adgang til data. Vi kobler også de to datakilder: Indholdet kommer fra WordPress, mens brugerdata gemmes i Supabase.

Målet er, at Next.js-appen har profiler, at brugere kan gemme eller tilføje noget til WordPress-indholdet, og at data er beskyttet med Row Level Security. Bagefter overfører I principperne til jeres gruppeprojekt.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at din Next.js-app kører lokalt med login fra 30. oktober.
- Overvej, hvilke brugerdata jeres gruppeprojekt har brug for, og hvem der må se og ændre dem.
- Genbesøg gerne relationen mellem `users` og `posts` fra Case 1 i Product optimization.

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Kort recap af login-flowet → hvorfor Next.js er et framework → profiler → kobl WordPress og Supabase → beskyt data med RLS → roller → overfør til jeres projekt.

<details style="margin-left: 1.5rem;">
<summary><strong>0. Kort recap af login-flowet</strong></summary>
<ul>
<li>Følg en bruger fra sign in over cookie og session til en beskyttet side.</li>
<li>Hvor tjekker vi brugeren, og hvorfor sker det på serveren?</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>1. Hvorfor Next.js? Det, et framework giver dig</strong></summary>
<ul>
<li>Et framework er ikke bare kode, du kalder. Det kommer med funktionalitet, der allerede virker, og kalder selv din kode på de rigtige tidspunkter – <em>inversion of control</em> fra 26. oktober.</li>
<li>Hvad skulle du selv bygge i React og Vite? Routing med React Router, loading-state med <code>useState</code> og <code>useEffect</code>, fejlhåndtering, en 404-side, en server til hemmelige nøgler og HTML, som søgemaskiner kan læse. I Next.js er det en mappe, en fil eller en funktion.</li>
<li>Filkonventionerne i <code>app/</code>: <code>page.js</code> er siden, <code>layout.js</code> er rammen, der bliver stående, <code>loading.js</code> vises, mens data hentes, <code>error.js</code>, når noget fejler, og <code>not-found.js</code>, når noget ikke findes. <code>route.js</code> er et API-endpoint uden UI.</li>
<li>Next.js pakker filerne ind i hinanden i en fast rækkefølge: <code>layout.js</code> → <code>error.js</code> → <code>loading.js</code> → <code>not-found.js</code> → <code>page.js</code>. Derfor står header og footer stadig, når siden loader eller fejler.</li>
<li>Filerne gælder for mappen og alle undermapper, og den nærmeste vinder. <code>/posts/[slug]</code> kan få sin egen <code>loading.js</code>, mens resten af appen bruger den fælles.</li>
<li>Funktionerne, der passer til filerne: <code>notFound()</code> viser <code>not-found.js</code>, en fejl, du kaster, viser <code>error.js</code>, og <code>redirect()</code> sender brugeren videre. Dem bruger vi til at beskytte sider i dag.</li>
<li>Mere, du får forærende: <code>Link</code> henter siden, før du klikker, koden deles op pr. route, <code>next/image</code> og <code>next/font</code> optimerer billeder og fonte, <code>metadata</code> giver titler til SEO, og <code>proxy.js</code> og Server Actions kører på serveren.</li>
<li>Prisen: Du skal følge frameworkets regler. Filnavne, mapper og grænsen mellem server og client er bestemt på forhånd – til gengæld ser alle Next.js-projekter ens ud.</li>
<li>Tjek din egen app: Hvilke tilstande mangler? Tilføj <code>loading.js</code>, <code>error.js</code> og <code>not-found.js</code>, hvor de mangler, og test dem med en post, der ikke findes, og en forkert <code>WORDPRESS_URL</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Profiler: auth.users og profiles</strong></summary>
<ul>
<li><code>auth.users</code> håndteres af Supabase og kan ikke tilgås direkte fra appen. Brugerdata som navn og billede gemmes derfor i en <code>profiles</code>-tabel.</li>
<li>Kobl <code>profiles.id</code> til <code>auth.users.id</code>, ligesom relationen mellem <code>users</code> og <code>posts</code> i Case 1.</li>
<li>Opret automatisk en profil, når en bruger oprettes, med en trigger i databasen.</li>
<li>Byg en profilside, hvor brugeren kan se og redigere sit navn.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Kobl WordPress-indhold og Supabase-brugerdata</strong></summary>
<ul>
<li>Lad brugere gemme favoritter eller skrive kommentarer til WordPress-posts.</li>
<li>Opret en tabel, fx <code>favorites</code> med <code>user_id</code> og <code>post_slug</code>, der refererer til både Supabase-brugeren og WordPress-indholdet.</li>
<li>Diskutér: Hvorfor gemmer vi ikke brugerdata i WordPress, og hvorfor lægger vi ikke indholdet i Supabase?</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Row Level Security</strong></summary>
<ul>
<li>Slå RLS til på dine tabeller, og se, hvad der sker, når der ikke findes nogen policies.</li>
<li>Skriv policies med <code>auth.uid()</code>, så brugere kun kan læse og ændre deres egne data.</li>
<li>Test som bruger, der ikke er logget ind, som bruger, der er logget ind, og som en anden bruger.</li>
<li>Forstå, hvorfor den publishable key godt må ligge i frontend, når RLS beskytter data, og hvorfor <code>service_role</code>-nøglen aldrig må.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Brugerroller og beskyttet adgang</strong></summary>
<ul>
<li>Tilføj en rolle til profilen, fx <code>user</code> og <code>admin</code>.</li>
<li>Beskyt både routes og data: En admin-side skal tjekke rollen på serveren, og policies skal tjekke den i databasen.</li>
<li>Sørg for, at brugere ikke selv kan ændre deres rolle.</li>
<li>Skjul ikke bare knapper i UI'et. Det, brugeren ikke må, skal også afvises af serveren og databasen.</li>
<li>Ekstra: Next.js har to funktioner med hver sin fil til adgang, ligesom <code>notFound()</code> og <code>not-found.js</code>. <code>unauthorized()</code> viser <code>unauthorized.js</code> (401), når brugeren ikke er logget ind. <code>forbidden()</code> viser <code>forbidden.js</code> (403), når brugeren er logget ind, men mangler rollen – fx en almindelig bruger på <code>/admin</code>. De er stadig eksperimentelle og kræver <code>experimental: { authInterrupts: true }</code> i <code>next.config.js</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Overfør til jeres projekt</strong></summary>
<ul>
<li>Lav en datamodel for jeres produkt: Hvilke tabeller, relationer og roller har I brug for?</li>
<li>Beslut, hvilke data der kommer fra WordPress, Supabase eller et andet API.</li>
<li>Skriv ned, hvem der må læse og ændre hvad. Det er grundlaget for jeres policies og for afsnittet om it-sikkerhed.</li>
<li>Begynd på implementeringen i en feature branch.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:** Vil blive tilgængelige her
- **Opgaver:** Vil blive tilgængelige her
- **Next.js:**
  - [Project structure](https://nextjs.org/docs/app/getting-started/project-structure) – oversigt over alle filkonventioner
  - [Error handling](https://nextjs.org/docs/app/getting-started/error-handling)
  - [loading.js](https://nextjs.org/docs/app/api-reference/file-conventions/loading)
  - [not-found.js](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
  - [forbidden](https://nextjs.org/docs/app/api-reference/functions/forbidden) og [unauthorized](https://nextjs.org/docs/app/api-reference/functions/unauthorized) – eksperimentelle, kræver [authInterrupts](https://nextjs.org/docs/app/api-reference/config/next-config-js/authInterrupts)
  - [Inversion of Control](https://martinfowler.com/bliki/InversionOfControl.html) (Martin Fowler)
- **Supabase:**
  - [User Management](https://supabase.com/docs/guides/auth/managing-user-data)
  - [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
  - [Custom Claims and Role-based Access Control](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac)
  - [Understanding API keys](https://supabase.com/docs/guides/api/api-keys)
