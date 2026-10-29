# RACE - Dynamic User Interface: Supabase Auth i Next.js - 30-10-2026

## Formål

I dag tilføjer vi brugere til Next.js-appen med Supabase Auth. I Product optimization brugte vi Supabase via REST for at forstå fetch, HTTP og JSON. Nu skifter vi til Supabase SDK'et, som også håndterer auth og sessioner.

Målet er, at du bygger en lille Next.js-app med sign up, log ind, log ud og en profilside, der kun kan ses af brugere, der er logget ind. Bagefter overfører du det til din headless WordPress-app.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at din headless WordPress-app kører lokalt. Du skal bruge den til sidst.
- Genbrug dit Supabase-projekt fra Product optimization, eller opret et nyt. Står det som _Paused_, så klik på _Resume project_.
- Genbesøg gerne slidet om REST og SDK fra [Product optimization 01](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-01/#/supabase-rest-og-sdk).

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Authentication og Supabase Auth → opgave 1 → hvor bor sessionen? → Next.js på serveren → login-flowet → opgave 2 og 3 → beskyttede sider → opgave 4 → ekstra og WordPress-appen.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Authentication og authorization</strong></summary>
<ul>
<li>Authentication: Hvem er du? Authorization: Hvad må du?</li>
<li>I dag laver vi receptionen – sign up, log ind og log ud – og én simpel dør: Kun brugere, der er logget ind, kan se profilen. Roller og regler for data kommer 10. november.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Supabase Auth – fra REST til SDK · opgave 1</strong></summary>
<ul>
<li>Hvad kan Supabase Auth, og hvem gør hvad: Supabase eller jeres Next.js-app?</li>
<li>Kort recap af REST: SDK'et sender den samme request – og gemmer og fornyer sessionen for dig.</li>
<li><strong>Opgave 1:</strong> Hent startprojektet <code>nextjs-supabase-auth</code>, slå <em>Confirm email</em> fra, og kopiér URL og publishable key til <code>.env.local</code>. Pakkerne, Supabase-klienten og <code>proxy.js</code> er allerede sat op.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Hvor bor sessionen?</strong></summary>
<ul>
<li>HTTP har ingen hukommelse – nøglekortet skal med på hver request.</li>
<li>Cookies, <code>localStorage</code> og <code>sessionStorage</code>: Kun cookies sendes til serveren. Derfor bor sessionen i en cookie i Next.js.</li>
<li>Access token og refresh token: Nøglekortet udløber efter en time og bliver fornyet.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Next.js på serveren</strong></summary>
<ul>
<li>Mappen er routen: <code>app/signup/page.js</code> bliver til <code>/signup</code>, og <code>metadata</code> bliver til <code>&lt;title&gt;</code>.</li>
<li>Server Component eller Server Action? Den ene viser siden, når den hentes. Den anden ændrer noget, når en formular sendes.</li>
<li>Dagens begreber: <code>layout.js</code>, <code>searchParams</code>, <code>redirect()</code>, <code>proxy.js</code> og ○/ƒ i <code>npm run build</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Login-flowet · opgave 2 og 3</strong></summary>
<ul>
<li>Fem skridt fra klik til login: formular → Server Action → Supabase → cookie → redirect.</li>
<li>Hele routen i én fil: siden, formularen og Server Action'en. Klienten læser sessionen fra cookies, og <code>proxy.js</code> fornyer den.</li>
<li><strong>Opgave 2:</strong> <code>/signup</code> med en formular og <code>signUp</code>. Find cookien under <em>Application</em> i udviklerværktøjerne. Valgfri: en fejlbesked med <code>searchParams</code>.</li>
<li><strong>Opgave 3:</strong> <code>/login</code> med <code>signInWithPassword</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Beskyttede sider · opgave 4</strong></summary>
<ul>
<li>Én <code>if</code> på serveren: <code>getCurrentUser()</code> med <code>getClaims()</code> – og <code>redirect("/login")</code>, hvis der ingen bruger er. Supabase anbefaler <code>getClaims()</code>, fordi den tjekker, at token'et er ægte.</li>
<li><strong>Opgave 4:</strong> <code>/profile</code> viser din e-mail, sender alle andre til <code>/login</code> og har en knap til at logge ud. Test i et privat vindue.</li>
<li>Skjul ikke bare linket: I dag beskytter vi siden – ikke data. To nøgler, og hvordan Row Level Security beskytter data 10. november.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>7. Ekstra og videre</strong></summary>
<ul>
<li>Static eller dynamic? Kør <code>npm run build</code>, og forklar ○ og ƒ.</li>
<li>Ekstra: <code>/members</code>, send brugere, der er logget ind, fra login til profilen, og vis login-status i headeren.</li>
<li>Overfør login til din headless WordPress-app, og lås detaljesiderne for posts.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:**
  - [Supabase Auth i Next.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/)
  - [PDF-version: Supabase Auth i Next.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/?print-pdf)
- **Opgaver:**
  - [Overblik i slides](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/opgaver)
  - [Next.js og Supabase Auth](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-2026-10-30-nextjs-supabase-auth.md) – dagens opgave med startprojekt, hints og løsninger
  - [Supabase Auth i din headless WordPress-app](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-2026-10-30-supabase-auth-i-nextjs.md) – overfør login til din headless WordPress-app
- **Løsningsrepoer:**
  - [nextjs-supabase-auth](https://github.com/cederdorff/nextjs-supabase-auth) – template med startprojektet på `main` og én løsningsbranch pr. opgave
  - [nextjs-headless-wordpress, branchen `supabase-auth`](https://github.com/cederdorff/nextjs-headless-wordpress/tree/supabase-auth) – auth i WordPress-appen
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
