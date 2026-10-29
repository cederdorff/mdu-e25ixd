# RACE - Dynamic User Interface: Supabase Auth i Next.js - 30-10-2026

## Formål

I dag tilføjer vi brugere til Next.js-appen med Supabase Auth. I Product optimization brugte vi Supabase via REST for at forstå fetch, HTTP og JSON. Nu skifter vi til Supabase SDK'et, som også håndterer auth og sessioner.

Målet er, at du bygger en lille Next.js-app med sign up, log ind, log ud og en profilside, der kun kan ses af brugere, der er logget ind. Bagefter overfører du det til din headless WordPress-app. Inden kick-off på mandag skal du også have en idé om, hvorvidt jeres produkt har brug for brugere.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at din Next.js-app fra 26. oktober kører lokalt med indhold fra WordPress. Du skal bruge den til sidst.
- Opret et nyt Supabase-projekt til Next.js-appen, eller genoptag et eksisterende (resume project).
- Genbesøg gerne slidet om REST og SDK fra [Product optimization 01](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-01/#/supabase-rest-og-sdk).

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Fra REST til SDK → forstå, hvor sessionen bor → sæt auth op → byg login-flowet → beskyt en side → overfør til jeres projekt.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Fra REST til Supabase SDK</strong></summary>
<ul>
<li>Kort recap: Hvad gjorde vi med REST, og hvad abstraherer SDK'et?</li>
<li>Installér <code>@supabase/supabase-js</code> og <code>@supabase/ssr</code>.</li>
<li>Gem <code>NEXT_PUBLIC_SUPABASE_URL</code> og <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> i <code>.env.local</code>, og dokumentér dem i <code>.env.example</code>.</li>
<li>Den publishable key må gerne være synlig i frontend. Beskyttelsen af data sker med Row Level Security, som vi arbejder med 10. november.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Hvor bor sessionen? Cookies, localStorage og sessionStorage</strong></summary>
<ul>
<li>Sammenlign de tre: Hvem kan læse dem, hvor længe lever de, og sendes de med til serveren?</li>
<li>I Next.js gemmes sessionen i cookies, så både server og browser kan se, om brugeren er logget ind.</li>
<li>Undersøg cookies, <code>localStorage</code> og <code>sessionStorage</code> under <em>Application</em> i browserens udviklerværktøjer.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Startprojektet: Supabase-klienten og proxy.js</strong></summary>
<ul>
<li>Hent startprojektet <code>nextjs-supabase-auth</code>, hvor klienten og <code>proxy.js</code> allerede er sat op, og forbind det til dit Supabase-projekt.</li>
<li>Klienten til server components og Server Actions læser sessionen fra cookies i requesten, som beskrevet i Supabase' guide til Next.js.</li>
<li><code>proxy.js</code> – tidligere <code>middleware.js</code> – fornyer sessionen ved hver request.</li>
<li>Supabase har også en klient til browseren. I dag kører al Supabase-kode på serveren, så den har vi ikke brug for.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Sign up, sign in og sign out</strong></summary>
<ul>
<li>Opret routes til sign up og login – hver med en formular, labels og en fejlbesked.</li>
<li>Formularerne kalder en Server Action, der taler med Supabase på serveren.</li>
<li>Slå e-mailbekræftelse fra under udviklingen, og test flowet fra start til slut.</li>
<li>Tilføj en knap til at logge ud. Ekstra: Vis, om brugeren er logget ind, i headeren.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Beskyttede sider</strong></summary>
<ul>
<li>Opret en profilside, fx <code>app/profile/page.js</code>, som kun kan ses af brugere, der er logget ind.</li>
<li>Tjek brugeren på serveren med <code>supabase.auth.getClaims()</code>, og send brugere, der ikke er logget ind, videre med <code>redirect()</code>. Supabase anbefaler <code>getClaims()</code>, fordi den tjekker, at token'et er ægte.</li>
<li>Ekstra: Beskyt flere routes, og send brugere, der er logget ind, fra login til profilen.</li>
<li>Test siderne både logget ind, logget ud og i et privat browservindue.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Arbejd videre og overfør til jeres projekt</strong></summary>
<ul>
<li>Overfør login til din headless WordPress-app, og lås detaljesiderne, så kun brugere, der er logget ind, kan læse en hel post.</li>
<li>Overvej jeres projektidé: Skal produktet have brugere? Hvad kan en bruger, der er logget ind, som andre ikke kan?</li>
<li>Har produktet brugere, stiller eksamen også krav til it-sikkerhed. Notér, hvilke data der skal beskyttes.</li>
<li>Commit og push dit arbejde.</li>
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
  - [Supabase Auth i din headless WordPress-app](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-2026-10-30-supabase-auth-i-nextjs.md) – overfør login til appen fra 26. oktober
- **Løsningsrepoer:**
  - [nextjs-supabase-auth](https://github.com/cederdorff/nextjs-supabase-auth) – template med startprojektet på `main` og én løsningsbranch pr. opgave
  - [nextjs-headless-wordpress, branchen `supabase-auth`](https://github.com/cederdorff/nextjs-headless-wordpress/tree/supabase-auth) – auth i WordPress-appen
- **Supabase:**
  - [Setting up Server-Side Auth for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)
  - [Creating a Supabase client for SSR](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
  - [Password-based Auth](https://supabase.com/docs/guides/auth/passwords)
- **Next.js:**
  - [Mutating data](https://nextjs.org/docs/app/getting-started/mutating-data)
  - [Proxy](https://nextjs.org/docs/app/getting-started/proxy)
- **Browserens storage:**
  - [MDN: Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)
  - [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
