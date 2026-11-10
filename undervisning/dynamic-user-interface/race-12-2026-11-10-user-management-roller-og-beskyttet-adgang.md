# RACE - Dynamic User Interface: User management, roller og beskyttet adgang - 10-11-2026

## Formål

I dag får I så meget tid som muligt til jeres projekt. Dagen er delt i to: Først et oplæg med demo, derefter vejledning og projektarbejde.

I oplægget zoomer vi først ud: Hvorfor Next.js – hvad var bøvlet i React, og hvad løser frameworket for dig? Derefter viser jeg den færdige app i én samlet demo: Posts har en ejer, kun ejeren kan rette og slette – i appen og i databasen – og en admin kan mere end en almindelig bruger. Bagefter kigger vi på fire mønstre bag – stillet som spørgsmål: Hvem er logget ind (authentication)? Hvem ejer post'et (ownership)? Må de rette det (authorization)? Er de admin (role-based access control)? Relationen kender I fra Post App: Et post er lavet af én user. Det nye er, at den, der er logget ind, er en række i `users`.

<img src="https://raw.githubusercontent.com/cederdorff/mdu-e25ixd/main/slides/assets/user-management-datamodel.webp" alt="Tre tabeller: Login i Supabase Auth, users og posts fra Post App. Login og users har samme id. posts.userId peger på users.id." style="max-width: 100%; margin: 0.75rem 0;">

Bagefter arbejder I videre med jeres projekt, der hvor I er. Overvej, om I kan bruge noget fra oplægget. Vil I prøve det af, guider opgaven jer igennem hele opsætningen trin for trin i et startprojekt.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at jeres Supabase-projekt ikke står som _Paused_.
- Overvej, hvilke brugerdata jeres gruppeprojekt har brug for, og hvem der må se og ændre dem.
- Genbesøg gerne relationen mellem `users` og `posts` fra Post App og Case 1 i Product optimization:
  - [Slides: Datamodellering, relationer og Supabase](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-05/)
  - [Post App · `posts` og `users` med relation](https://github.com/cederdorff/post-app-supabase/tree/posts-and-users)

<hr style="margin: 2rem 0;">

## Agenda

### Del 1 · Oplæg og demo

<details style="margin-left: 1.5rem;">
<summary><strong>1. Hvorfor Next.js? Fra komponenter til komplette løsninger</strong></summary>
<ul>
<li>React lærer os at bygge brugergrænseflader. Next.js giver os værktøjerne omkring React til at bygge komplette løsninger – og det meste af tiden skriver vi stadig bare React. Frameworket kalder selv din kode på de rigtige tidspunkter – <em>inversion of control</em> fra 26. oktober.</li>
<li>Client og server: I React og Vite får browseren en tom <code>index.html</code> og skal selv køre React, finde routen, hente data og bygge HTML'en. I Next.js gør serveren det, og browseren får færdig HTML.</li>
<li>Det, der var bøvlet i React: projektstruktur, routing med React Router, layouts, data med <code>useState</code> og <code>useEffect</code>, nøgler i browseren, loading- og fejl-states og én <code>&lt;title&gt;</code> til alle sider. I Next.js er det en mappe, en fil eller en funktion.</li>
<li>Mapper i <code>app/</code> bliver til URL'er, <code>layout.js</code> bliver stående, når siden skifter, og <code>await fetch</code> virker direkte i komponenten. Server components er standard – kun det interaktive får <code>"use client"</code>.</li>
<li>UI-states som filer: <code>loading.js</code>, <code>error.js</code> og <code>not-found.js</code> – én fil per tilstand, og headeren fra <code>layout.js</code> står. Ingen <code>isLoading</code>-state i hver komponent.</li>
<li>Fejlhåndtering og adgang: <code>notFound()</code> og <code>redirect()</code> stopper siden på serveren, før den bliver sendt – i dag bruger vi <code>redirect()</code>, når brugeren ikke må se eller rette noget.</li>
<li><code>metadata</code> giver hver side sin egen titel og beskrivelse i HTML'en.</li>
<li>Prisen: Du skal følge frameworkets regler. Til gengæld ligner alle Next.js-projekter hinanden.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Fire mønstre · demo af den færdige app</strong></summary>
<ul>
<li>Login fra 30. oktober plus <code>users</code> og <code>posts</code> med de samme kolonner som i Post App. Hele databasen kommer fra én fil, <code>setup.sql</code> – ingen SQL at skrive. De 5 brugere fra Post App kan logge ind, fx <code>maria@example.com</code> med <code>postapp123</code>.</li>
<li>Mine posts: Sign up, opret et post med mit navn på, og log ind som Maria – hun kan kun rette og slette sine egne.</li>
<li>Databasen siger nej: En request fra Thunder Client uden om appen bliver afvist. Slår jeg RLS fra, går den igennem.</li>
<li>En admin må mere: <em>Edit</em> og <em>Delete</em> på alle posts.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>Mønster 1 · Hvem er logget ind? · authentication</strong></summary>
<ul>
<li>Fra <code>fetch</code> til Supabase SDK: <code>supabase.from("posts").select()</code> er det samme som jeres <code>fetch</code> fra Post App – bare kortere. SDK'et sender login'et med.</li>
<li>Den, der er logget ind, er en række i <code>users</code> – med samme <code>id</code> som i login. Ved sign up opretter appen både login'et og rækken i <code>users</code> – et helt almindeligt <code>insert</code>.</li>
<li>Færdigt i startprojektet: <code>getCurrentProfile()</code> henter din række – navn, titel, billede og rolle. Vi kalder den <code>currentUser</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>Mønster 2 · Hvem ejer post'et? · ownership</strong></summary>
<ul>
<li>Startprojektet i guiden giver alle nye posts et fast <code>CURRENT_USER_ID</code>.</li>
<li>Nye posts får <code>userId: currentUser.id</code> – den, der er logget ind, aldrig et id fra formularen.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>Mønster 3 · Må de rette det? · authorization</strong></summary>
<ul>
<li>Skjul ikke bare knapper. Det, brugeren ikke må, skal også afvises på serveren – og i databasen.</li>
<li>Kun ejeren ser <em>Edit</em> og <em>Delete</em>, og siden og Server Actions tjekker det. Alligevel kan alle rette et post direkte med den publishable key fra Thunder Client – uden om alle tjek.</li>
<li>Row Level Security: Reglerne (policies) ligger klar fra <code>setup.sql</code> – fx "kun ejeren må slette". Du slår dem til med ét klik: <em>Enable RLS</em>.</li>
<li>Derfor må den publishable key ligge i frontend, når RLS beskytter data – og derfor må en secret key aldrig.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>Mønster 4 · Er de admin? · role-based access control</strong></summary>
<ul>
<li><code>users</code> har en kolonne, <code>role</code>, med <code>user</code> eller <code>admin</code>. Den kan kun ændres i <em>Table Editor</em> – ikke fra appen.</li>
<li>Admins ser <em>Edit</em> og <em>Delete</em> på alle posts – samme tjek i UI'et og på serveren, nu med <code>|| isAdmin</code>.</li>
<li>Reglerne i databasen ligger klar fra <code>setup.sql</code>: <em>Admins can update all posts</em> og <em>Admins can delete all posts</em>.</li>
<li>Opsamling på de fire mønstre: Brug projektet som reference. Kør det, forstå de fire mønstre, og genbrug dem i dit eget projekt – fx ved at give projektet som kontekst til Claude og bede om en forklaring. Tjek bagefter, at det virker i UI'et, på serveren og i databasen.</li>
</ul>
</details>

### Del 2 · Vejledning og projektarbejde

<details style="margin-left: 1.5rem;">
<summary><strong>3. Vejledning og projektarbejde</strong></summary>
<ul>
<li>Arbejd videre, der hvor I er i jeres projekt.</li>
<li>Overvej, om I kan bruge noget fra i dag: Brug de fire mønstre – stil de fire spørgsmål til jeres eget projekt. Svarene kan I også bruge i afsnittet om it-sikkerhed.</li>
<li>Vil I prøve det af? Følg opgaven trin for trin i startprojektet <code>nextjs-supabase-posts</code> – hver opgave har en løsningsbranch.</li>
<li>Vejledning i grupperne undervejs.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:**
  - [User management, roller og beskyttet adgang](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-05/)
  - [PDF-version: User management, roller og beskyttet adgang](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-05/?print-pdf)
- **Guide:**
  - [User management og beskyttet adgang](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-2026-11-10-user-management-roller-og-rls.md) – trin for trin i et startprojekt, med hints og løsninger · opgave 1–5
- **Løsningsrepo:**
  - [nextjs-supabase-posts](https://github.com/cederdorff/nextjs-supabase-posts) – template med startprojektet på `main` og én løsningsbranch pr. opgave
- **Next.js:**
  - [Project structure](https://nextjs.org/docs/app/getting-started/project-structure) – oversigt over alle filkonventioner
  - [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
  - [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
  - [Metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
  - [Error handling](https://nextjs.org/docs/app/getting-started/error-handling)
  - [loading.js](https://nextjs.org/docs/app/api-reference/file-conventions/loading)
  - [not-found.js](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
  - [redirect](https://nextjs.org/docs/app/api-reference/functions/redirect)
  - [Inversion of Control](https://martinfowler.com/bliki/InversionOfControl.html) (Martin Fowler)
- **Supabase:**
  - [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
  - [Understanding API keys](https://supabase.com/docs/guides/api/api-keys)
  - [JavaScript: Fetch data](https://supabase.com/docs/reference/javascript/select) og [Insert data](https://supabase.com/docs/reference/javascript/insert)
