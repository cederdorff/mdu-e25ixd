# RACE - Dynamic User Interface: User management, roller og beskyttet adgang - 10-11-2026

## Formål

I dag får I så meget tid som muligt til jeres projekt. Dagen er delt i to: Først et oplæg med demo, derefter vejledning og projektarbejde.

I oplægget zoomer vi først ud: Hvorfor Next.js – hvad får du forærende, når du bruger et framework? Derefter viser jeg i en demo, hvordan login og data kommer til at hænge sammen. Relationen kender I fra Post App: Et post er lavet af én user. Det nye er, at den, der er logget ind, er en række i `users`. Så får posts en ejer, og kun ejeren kan rette og slette – i appen og i databasen. Til sidst, som ekstra: En admin kan mere end en almindelig bruger.

<img src="https://raw.githubusercontent.com/cederdorff/mdu-e25ixd/main/slides/assets/user-management-datamodel.webp" alt="Tre tabeller: Login i Supabase Auth, users og posts fra Post App. Login og users har samme id. posts.userId peger på users.id." style="max-width: 100%; margin: 0.75rem 0;">

Bagefter bygger I det ind i jeres eget projekt. Har I brug for at prøve det af først, guider opgaven jer igennem hele opsætningen trin for trin i et startprojekt.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at jeres Supabase-projekt ikke står som _Paused_.
- Overvej, hvilke brugerdata jeres gruppeprojekt har brug for, og hvem der må se og ændre dem.
- Genbesøg gerne relationen mellem `users` og `posts` fra Post App og Case 1 i Product optimization:
  - [Slides: Datamodellering, relationer og Supabase](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-05/)
  - [Post App · `posts` og `users` med relation](https://github.com/cederdorff/post-app-supabase/tree/posts-and-users)

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Del 1: Oplæg og demo · hvorfor Next.js → posts får en ejer → kun ejeren kan rette og slette → ekstra: roller. Del 2: Vejledning og projektarbejde.

### Del 1 · Oplæg og demo

<details style="margin-left: 1.5rem;">
<summary><strong>1. Hvorfor Next.js? Det, et framework giver dig</strong></summary>
<ul>
<li>Et framework er ikke bare kode, du kalder. Det kommer med funktionalitet, der allerede virker, og kalder selv din kode på de rigtige tidspunkter – <em>inversion of control</em> fra 26. oktober.</li>
<li>Hvad skulle du selv bygge i React og Vite? Routing med React Router, loading-state med <code>useState</code> og <code>useEffect</code>, fejlhåndtering, en 404-side, en server til hemmelige nøgler og login og HTML, som søgemaskiner kan læse. I Next.js er det en mappe, en fil eller en funktion.</li>
<li>Filkonventionerne i <code>app/</code>: <code>page.js</code>, <code>layout.js</code>, <code>loading.js</code>, <code>error.js</code> og <code>not-found.js</code>. Next.js pakker dem ind i hinanden, så header og footer står, når siden loader eller fejler.</li>
<li>Funktionerne, der passer til filerne: <code>notFound()</code> viser <code>not-found.js</code>, en fejl, du kaster, viser <code>error.js</code>, og <code>redirect()</code> sender brugeren videre. <code>unauthorized()</code> og <code>forbidden()</code> gør det samme for adgang.</li>
<li>Prisen: Du skal følge frameworkets regler. Til gengæld ser alle Next.js-projekter ens ud.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Posts får en ejer · demo</strong></summary>
<ul>
<li>Startprojektet: Login fra 30. oktober plus <code>users</code> og <code>posts</code> med de samme kolonner som i Post App. Hele databasen kommer fra én fil, <code>setup.sql</code> – ingen SQL at skrive.</li>
<li>Fra <code>fetch</code> til Supabase SDK: <code>supabase.from("posts").select()</code> er det samme som jeres <code>fetch</code> fra Post App – bare kortere. SDK'et sender login'et med.</li>
<li>To problemer: Nye posts får et fast <code>CURRENT_USER_ID</code>, og alle kan rette og slette alt.</li>
<li>Den, der er logget ind, er en række i <code>users</code> – med samme <code>id</code> som i login. Ved sign up opretter appen både login'et og rækken i <code>users</code> – et helt almindeligt <code>insert</code>.</li>
<li>Færdigt i startprojektet: Sign up opretter din række, og <code>getCurrentProfile()</code> henter den – navn, titel, billede og rolle.</li>
<li>Nye posts får <code>userId: profile.id</code> – den, der er logget ind, aldrig et id fra formularen.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Kun ejeren kan rette og slette · demo</strong></summary>
<ul>
<li>Skjul ikke bare knapper. Det, brugeren ikke må, skal også afvises på serveren – og i databasen.</li>
<li>Kun ejeren ser <em>Edit</em> og <em>Delete</em>, og siden og Server Actions tjekker det. Alligevel kan alle rette et post direkte med den publishable key fra Thunder Client – uden om alle tjek.</li>
<li>Row Level Security: Reglerne (policies) ligger klar fra <code>setup.sql</code> – fx "kun ejeren må slette". Du slår dem til med ét klik: <em>Enable RLS</em>.</li>
<li>Derfor må den publishable key ligge i frontend, når RLS beskytter data – og derfor må en secret key aldrig.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Ekstra: user og admin · demo</strong></summary>
<ul>
<li><code>users</code> har en kolonne, <code>role</code>, med <code>user</code> eller <code>admin</code>. Den kan kun ændres i <em>Table Editor</em> – ikke fra appen.</li>
<li>Admins ser <em>Delete</em> på alle posts. Reglen i databasen ligger klar fra <code>setup.sql</code>.</li>
<li><code>/admin</code> med <code>unauthorized()</code> og <code>forbidden()</code>, som viser <code>unauthorized.js</code> (401) og <code>forbidden.js</code> (403). De er stadig eksperimentelle og kræver <code>experimental: { authInterrupts: true }</code> i <code>next.config.mjs</code>.</li>
</ul>
</details>

### Del 2 · Vejledning og projektarbejde

<details style="margin-left: 1.5rem;">
<summary><strong>5. Overfør til jeres projekt</strong></summary>
<ul>
<li>Lav en datamodel for jeres produkt: Hvilke tabeller, relationer og roller har I brug for?</li>
<li>Skriv ned, hvem der må læse og ændre hvad. Det er grundlaget for jeres regler og for afsnittet om it-sikkerhed.</li>
<li>Byg det i en feature branch: hent den, der er logget ind, giv data en ejer, tjek på serveren, slå RLS til – og tilføj roller, hvis I har brug for dem.</li>
<li>Har I brug for at se det i et lille projekt først? Følg opgaven trin for trin i startprojektet <code>nextjs-supabase-posts</code> – hver opgave har en løsningsbranch.</li>
<li>Vejledning i grupperne undervejs: Tag jeres datamodel og jeres liste over, hvem der må hvad, med.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:**
  - [User management, roller og beskyttet adgang](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-05/)
  - [PDF-version: User management, roller og beskyttet adgang](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-05/?print-pdf)
- **Guide:**
  - [User management og beskyttet adgang](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-2026-11-10-user-management-roller-og-rls.md) – trin for trin i et startprojekt, med hints og løsninger · opgave 1–4 og ekstra
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
  - [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
  - [Understanding API keys](https://supabase.com/docs/guides/api/api-keys)
  - [JavaScript: Fetch data](https://supabase.com/docs/reference/javascript/select) og [Insert data](https://supabase.com/docs/reference/javascript/insert)
