# RACE - Dynamic User Interface: Supabase Auth i Next.js - 30-10-2026

## Formål

I dag tilføjer vi brugere til Next.js-appen med Supabase Auth. I Product optimization brugte vi Supabase via REST for at forstå fetch, HTTP og JSON. Nu skifter vi til Supabase SDK'et, som også håndterer auth og sessioner.

Målet er, at din Next.js-app har sign up, sign in og sign out og en side, der kun kan ses af brugere, der er logget ind. Inden kick-off på mandag skal du også have en idé om, hvorvidt jeres produkt har brug for brugere.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at din Next.js-app kører lokalt med indhold fra WordPress.
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
<li>Gem <code>NEXT_PUBLIC_SUPABASE_URL</code> og din publishable key i <code>.env.local</code>, og dokumentér dem i <code>.env.example</code>.</li>
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
<summary><strong>3. Supabase-klienter på server og client</strong></summary>
<ul>
<li>Opret én klient til server components og server actions og én til client components, som beskrevet i Supabase' guide til Next.js.</li>
<li>Tilføj filen, der fornyer sessionen ved hver request (<code>proxy.js</code>, tidligere <code>middleware.js</code>).</li>
<li>Forstå, hvorfor der skal være to klienter: Serveren læser cookies fra requesten, mens browseren læser dem direkte.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Sign up, sign in og sign out</strong></summary>
<ul>
<li>Byg formularer til oprettelse og login med labels, fejlbeskeder og tydelig feedback.</li>
<li>Håndtér loading-, fejl- og success-states, ligesom i Case 1.</li>
<li>Beslut, om e-mailbekræftelse skal være slået til under udviklingen, og test flowet fra start til slut.</li>
<li>Vis, om brugeren er logget ind, i layoutet, og tilføj en knap til at logge ud.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Beskyttede sider</strong></summary>
<ul>
<li>Opret en side, fx <code>app/profil/page.js</code>, som kun kan ses af brugere, der er logget ind.</li>
<li>Tjek brugeren på serveren med <code>supabase.auth.getUser()</code>, og send brugere, der ikke er logget ind, videre med <code>redirect()</code>.</li>
<li>Test siden både logget ind, logget ud og i et privat browservindue.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Arbejd videre og overfør til jeres projekt</strong></summary>
<ul>
<li>Gør login-flowet færdigt, og brug komponenterne fra jeres designsystem.</li>
<li>Overvej jeres projektidé: Skal produktet have brugere? Hvad kan en bruger, der er logget ind, som andre ikke kan?</li>
<li>Har produktet brugere, stiller eksamen også krav til it-sikkerhed. Notér, hvilke data der skal beskyttes.</li>
<li>Commit og push dit arbejde.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:** Vil blive tilgængelige her
- **Opgaver:** Vil blive tilgængelige her
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
