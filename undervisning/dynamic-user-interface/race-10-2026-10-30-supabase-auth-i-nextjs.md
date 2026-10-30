# RACE - Dynamic User Interface: Supabase Auth i Next.js - 30-10-2026

## Formål

I dag får appen brugere. Med Supabase Auth bygger du sign up, log ind og en profil, som kun brugere, der er logget ind, kan se – i en lille Next.js-app. Er du hurtigt færdig, bygger du det samme ind i din headless WordPress-app.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at din headless WordPress-app kører lokalt. Du skal bruge den til ekstraopgaven.
- Genbrug dit Supabase-projekt fra Product optimization, eller opret et nyt. Står det som _Paused_, så klik på _Resume project_.

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Authentication og Supabase Auth → opgave 1 → sessionen og tokens → Next.js på serveren → login-flowet → opgave 2 og 3 → beskyttede sider → opgave 4, 5 og 6 → ekstra: WordPress-appen.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Authentication og authorization</strong></summary>
<ul>
<li>Authentication: Hvem er du? Sker én gang – ved login. Authorization: Må du se siden? Sker ved hver side.</li>
<li>Nøglekortet forbinder de to: Login giver dig det, og hver side læser det.</li>
<li>I dag laver vi receptionen – sign up, log ind og log ud – og én simpel dør: Kun brugere, der er logget ind, kan se profilen. Roller og regler for data kommer 10. november.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Supabase Auth og SDK'et · opgave 1</strong></summary>
<ul>
<li>Hvad kan Supabase Auth?</li>
<li>Vi bruger Supabase' SDK: et library med færdige funktioner. De fem, I bruger i dag: <code>createClient()</code>, <code>signUp()</code>, <code>signInWithPassword()</code>, <code>getClaims()</code> og <code>signOut()</code>.</li>
<li><strong>Opgave 1:</strong> Hent startprojektet <code>nextjs-supabase-auth</code>, slå <em>Confirm email</em> fra, og kopiér URL og publishable key til <code>.env.local</code>. Pakkerne, Supabase-klienten og <code>proxy.js</code> er allerede sat op.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Sessionen og tokens – sådan husker appen dig</strong></summary>
<ul>
<li>Session: at du er logget ind. Token: et digitalt bevis, du får ved login, så browseren ikke skal sende din adgangskode igen. Nøglekortet er et token.</li>
<li>HTTP har ingen hukommelse – nøglekortet skal med på hver request.</li>
<li>Cookies, <code>localStorage</code> og <code>sessionStorage</code>: Kun cookies sendes til serveren. Derfor bor sessionen i en cookie i Next.js.</li>
<li>Her ligger sessionen: cookien <code>sb-…-auth-token</code> under <em>Application → Cookies</em> i DevTools.</li>
<li>Access token beviser, hvem du er, og udløber efter en time. Refresh token henter et nyt, så du forbliver logget ind. Hvorfor to? Et stjålet nøglekort virker højst en time, og refresh token'et spærres, når du logger ud.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Next.js på serveren</strong></summary>
<ul>
<li>Begge kører på serveren, men starter forskelligt: En Server Component kører, når siden hentes. En Server Action kører, når formularen sendes.</li>
<li>Server Component er standard – alle komponenter er Server Components, indtil du skriver <code>"use client"</code>. Den kan tjekke, hvem du er, før HTML'en sendes.</li>
<li>Server Action ændrer noget: En funktion med <code>"use server"</code>, som formularen kalder. Den kører på serveren og kan sætte cookien.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Login-flowet · opgave 2 og 3</strong></summary>
<ul>
<li>Fem skridt fra klik til login: formular → Server Action → Supabase → cookie → redirect.</li>
<li><code>name</code> i formularen bliver til <code>formData</code> i Server Action'en.</li>
<li>Hele routen i én fil: siden, formularen og Server Action'en. Klienten læser sessionen fra cookies, og <code>proxy.js</code> fornyer den.</li>
<li><strong>Opgave 2:</strong> <code>/signup</code> med en formular og <code>signUp</code>. Find cookien under <em>Application</em> i udviklerværktøjerne, og vis en fejlbesked med <code>searchParams</code>.</li>
<li><strong>Opgave 3:</strong> <code>/login</code> med <code>signInWithPassword</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Beskyttede sider · opgave 4, 5 og 6</strong></summary>
<ul>
<li>Én <code>if</code> på serveren: <code>getCurrentUser()</code> med <code>getClaims()</code> – og <code>redirect("/login")</code>, hvis der ingen bruger er. Supabase anbefaler <code>getClaims()</code>, fordi den tjekker, at token'et er ægte.</li>
<li><strong>Opgave 4:</strong> <code>/profile</code> viser din e-mail, sender alle andre til <code>/login</code> og har en knap til at logge ud. Test i et privat vindue, og forklar ○ og ƒ i <code>npm run build</code>.</li>
<li><strong>Opgave 5:</strong> <code>/members</code> med det samme tjek – og den anden vej: Brugere, der er logget ind, sendes fra <code>/login</code> og <code>/signup</code> til profilen.</li>
<li><strong>Opgave 6:</strong> Login-status i headeren med <code>AuthStatus</code> og <code>signOut</code> i <code>lib/actions.js</code>.</li>
<li>Skjul ikke bare linket: I dag beskytter vi siden – ikke data. Row Level Security, der beskytter data, kommer 10. november.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>7. Ekstra: WordPress-appen</strong></summary>
<ul>
<li>Ekstraopgave, når du er færdig: Byg det samme ind i din headless WordPress-app i fem trin: projektet klar, sign up, log ind, profilen og låste posts, og login-status i headeren med <code>&lt;Suspense&gt;</code>.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:**
  - [Supabase Auth i Next.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/)
  - [PDF-version: Supabase Auth i Next.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/?print-pdf)
- **Opgaver:**
  - [Next.js og Supabase Auth](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-2026-10-30-nextjs-supabase-auth.md) – dagens opgave med startprojekt, hints og løsninger · opgave 1–6
  - [Supabase Auth i din headless WordPress-app](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-2026-10-30-supabase-auth-i-headless-wordpress.md) – ekstraopgave: det samme login i din egen WordPress-app, i samme rækkefølge
- **Løsningsrepoer:**
  - [nextjs-supabase-auth](https://github.com/cederdorff/nextjs-supabase-auth) – template med startprojektet på `main` og én løsningsbranch pr. opgave
  - [nextjs-headless-wordpress](https://github.com/cederdorff/nextjs-headless-wordpress) – auth i WordPress-appen med én løsningsbranch pr. opgave, fra `auth-01-supabase` til `auth-05-header`
- **Supabase:**
  - [Setting up Server-Side Auth for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)
  - [Creating a Supabase client for SSR](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
  - [Password-based Auth](https://supabase.com/docs/guides/auth/passwords)
- **Next.js:**
  - [Layouts and pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
  - [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
  - [Mutating data](https://nextjs.org/docs/app/getting-started/mutating-data)
  - [Proxy](https://nextjs.org/docs/app/getting-started/proxy)
- **Browserens storage:**
  - [MDN: Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)
  - [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
