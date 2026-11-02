# RACE - Dynamic User Interface: User management, roller og beskyttet adgang - 10-11-2026

## Formål

Sidst fik Next.js-appen login. I dag zoomer vi først ud: Hvad får du forærende, når du bruger et framework som Next.js – routes, loading, fejl- og 404-sider og meget mere? Derefter bygger vi videre med Supabase som datakilde i et startprojekt, der har login fra sidst og viser posts og users. Login og data hænger bare ikke sammen endnu.

Målet er, at `users` er koblet til `auth.users`, at posts tilhører den bruger, der er logget ind, at brugere kun kan ændre deres egne data – beskyttet med Row Level Security – og at en admin kan mere end en almindelig bruger. Bagefter overfører I principperne til jeres gruppeprojekt.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at dit Supabase-projekt fra 30. oktober ikke står som _Paused_. I dag bruger vi det med et nyt startprojekt, så dine brugere fra sidst kan logge ind.
- Overvej, hvilke brugerdata jeres gruppeprojekt har brug for, og hvem der må se og ændre dem.
- Genbesøg gerne relationen mellem `users` og `posts` fra Post App og Case 1 i Product optimization:
  - [Slides: Datamodellering, relationer og Supabase](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-05/)
  - [Post App · `posts` og `users` med relation](https://github.com/cederdorff/post-app-supabase/tree/posts-and-users)

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Kort recap af login-flowet → hvorfor Next.js er et framework → startprojektet → kobl users til auth.users → kun dine egne posts → beskyt data med RLS → roller → overfør til jeres projekt.

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
<li>Filerne gælder for mappen og alle undermapper, og den nærmeste vinder. <code>/posts/[id]</code> kan få sin egen <code>loading.js</code>, mens resten af appen bruger den fælles.</li>
<li>Funktionerne, der passer til filerne: <code>notFound()</code> viser <code>not-found.js</code>, en fejl, du kaster, viser <code>error.js</code>, og <code>redirect()</code> sender brugeren videre. Dem bruger vi til at beskytte sider i dag.</li>
<li>Mere, du får forærende: <code>Link</code> henter siden, før du klikker, koden deles op pr. route, <code>next/image</code> og <code>next/font</code> optimerer billeder og fonte, <code>metadata</code> giver titler til SEO, og <code>proxy.js</code> og Server Actions kører på serveren.</li>
<li>Prisen: Du skal følge frameworkets regler. Filnavne, mapper og grænsen mellem server og client er bestemt på forhånd – til gengæld ser alle Next.js-projekter ens ud.</li>
<li>Tjek din egen app: Hvilke tilstande mangler? Tilføj <code>loading.js</code>, <code>error.js</code> og <code>not-found.js</code>, og test dem med en URL, der ikke findes, og en fejl, du selv kaster. Startprojektet bruger allerede <code>notFound()</code> på <code>/posts/[id]</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Startprojektet · opgave 1</strong></summary>
<ul>
<li>Login fra sidst plus <code>users</code> og <code>posts</code> fra Post App: <code>posts.user_id</code> peger på <code>users.id</code>, og forsiden henter posts med deres bruger i én forespørgsel, <code>select("*, user:users(name, title, image)")</code>.</li>
<li><strong>Opgave 1:</strong> Hent startprojektet <code>nextjs-supabase-posts</code>, kør <code>setup.sql</code> i Supabase, og find de tre problemer: Nye posts får et fast <code>CURRENT_USER_ID</code>, alle kan rette og slette alt, og tabellerne står som <em>UNRESTRICTED</em>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Kobl users til auth.users · opgave 2, 3 og 4</strong></summary>
<ul>
<li>To tabeller med navnet <code>users</code>: <code>auth.users</code> ejes af Supabase Auth og kan ikke læses fra appen. <code>users</code> er din egen med navn, titel og billede. Koblingen er, at brugeren har samme <code>id</code> i begge.</li>
<li>En trigger i databasen opretter rækken i <code>users</code>, når nogen laver en bruger. Navnet fra sign up sendes med i <code>options.data</code>.</li>
<li><strong>Opgave 2:</strong> Kør triggeren, tilføj navn til sign up, og kopiér brugerne fra 30. oktober over i <code>users</code>.</li>
<li><strong>Opgave 3:</strong> <code>/profile</code> viser og retter din egen række i <code>users</code>.</li>
<li><strong>Opgave 4:</strong> Væk med <code>CURRENT_USER_ID</code>. Nye posts får <code>user_id</code> fra sessionen på serveren – aldrig fra formularen.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Kun dine egne posts og Row Level Security · opgave 5 og 6</strong></summary>
<ul>
<li>Skjul ikke bare knapper. Det, brugeren ikke må, skal også afvises på serveren – og i databasen.</li>
<li><strong>Opgave 5:</strong> Kun ejeren ser <em>Edit</em> og <em>Delete</em>, og siden og Server Actions tjekker det. Ret derefter et post direkte med din publishable key fra <em>Console</em> – uden om alle tjek.</li>
<li>RLS starter lukket: Uden policies må ingen noget. Hver policy åbner for én handling, og <code>auth.uid()</code> er den bruger, der sender requesten.</li>
<li><strong>Opgave 6:</strong> Slå RLS til, og skriv policies: Alle kan læse posts og navne, men kun oprette, rette og slette deres egne. Test som bruger, der ikke er logget ind, som dig selv og som en anden.</li>
<li>Derfor må den publishable key ligge i frontend, når RLS beskytter data – og derfor må en secret key aldrig.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Roller: user og admin · opgave 7</strong></summary>
<ul>
<li>En <code>role</code>-kolonne på <code>users</code> med <code>user</code> eller <code>admin</code>.</li>
<li>RLS bestemmer rækkerne, <em>grants</em> bestemmer kolonnerne: Brugere må rette navn, titel og billede – men ikke deres rolle.</li>
<li><strong>Opgave 7:</strong> En policy lader admins slette alle posts – også dem fra startprojektet, som ingen ejer. Detaljesiden viser <em>Delete</em> for ejeren og for admins.</li>
<li>Ekstra: <code>/admin</code> med <code>unauthorized()</code> og <code>forbidden()</code>. Ligesom <code>notFound()</code> og <code>not-found.js</code> viser de <code>unauthorized.js</code> (401), når brugeren ikke er logget ind, og <code>forbidden.js</code> (403), når brugeren mangler rollen. De er stadig eksperimentelle og kræver <code>experimental: { authInterrupts: true }</code> i <code>next.config.mjs</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Overfør til jeres projekt</strong></summary>
<ul>
<li>Lav en datamodel for jeres produkt: Hvilke tabeller, relationer og roller har I brug for?</li>
<li>Beslut, hvilke data brugerne selv opretter, og hvilke der kun må ændres af en admin.</li>
<li>Skriv ned, hvem der må læse og ændre hvad. Det er grundlaget for jeres policies og for afsnittet om it-sikkerhed.</li>
<li>Begynd på implementeringen i en feature branch.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:** Vil blive tilgængelige her
- **Opgaver:**
  - [User management, roller og Row Level Security](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-2026-11-10-user-management-roller-og-rls.md) – dagens opgave med startprojekt, hints og løsninger · opgave 1–7
- **Løsningsrepo:**
  - [nextjs-supabase-posts](https://github.com/cederdorff/nextjs-supabase-posts) – template med startprojektet på `main` og én løsningsbranch pr. opgave
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
  - [JavaScript: Fetch data](https://supabase.com/docs/reference/javascript/select) og [Insert data](https://supabase.com/docs/reference/javascript/insert)
