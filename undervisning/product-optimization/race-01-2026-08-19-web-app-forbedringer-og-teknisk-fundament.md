# RACE - Product optimization: Web App-forbedringer og teknisk fundament - 19-08-2026

## Formål

Undervisningsgangen er et teknisk startskud til 3. semester. Vi forbedrer konkrete mangler fra 2. semesters Web App-forløb i en udleveret React-løsning og overfører derefter principperne til jeres egene Web Apps.

<hr style="margin: 2rem 0;">

## Forberedelse

- Find **GitHub Repo til din Web App fra 2. semester**, og sørg for, at den kan køre lokalt.
- Du skal muligvis genoptage dit Supabase-projekt (resume project), for at få appen til at fungere.
- Har du brug for et React-recap? Begynd eksempelvis med første del af [Scrimba: Learn React](https://scrimba.com/learn-react-c0e), og brug forløbet efter behov.
- Se evt. også de supplerende links under **Materialer**.

<hr style="margin: 2rem 0;">

## Agenda

Vi veksler mellem korte oplæg og arbejde i den udleverede løsning, så du afprøver forbedringerne undervejs.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Introduktion og baseline</strong></summary>
<ul>
<li>Opret dit repository fra starteren, clone det, og åbn projektet i VS Code.</li>
<li>Kør <code>npm install</code> og <code>npm run dev</code>.</li>
<li>Test forsiden, navigationen og en direkte route.</li>
<li>Find synlige fejl, mangler og template-rester.</li>
<li>Gør projektet klar til forbedringerne.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. GitHub-flow og automatisk deployment</strong></summary>
<ul>
<li>Følg først flowet: ændring lokalt → commit → push til <code>main</code> → GitHub Actions → GitHub Pages.</li>
<li>Kontrollér Pages-opsætning, Vites <code>base</code>, routing, billeder og direkte routes efter refresh.</li>
<li>Se, hvordan automatisk deployment gør processen ensartet og reproducerbar.</li>
<li>Find workflow run, job, fejlet step og log i repositoryets <strong>Actions</strong>-fane.</li>
<li>Brug AI til at forstå en fejl og foreslå en afgrænset rettelse. Test, genkør workflowet, og kontrollér build og deployment.</li>
<li>Udvid bagefter flowet med feature branch → pull request → review → merge til <code>main</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Environment variables lokalt og online</strong></summary>
<ul>
<li>Hold konfiguration ude af kildekoden. Brug <code>VITE_SUPABASE_URL</code> og <code>VITE_SUPABASE_APIKEY</code> via <code>import.meta.env</code>.</li>
<li>Brug <code>.env</code> lokalt, dokumentér variablerne i <code>.env.example</code>, og commit ikke din lokale <code>.env</code>-fil.</li>
<li>Opret <code>VITE_SUPABASE_URL</code> og <code>VITE_SUPABASE_APIKEY</code> som Environment variables i GitHub Environment <code>github-pages-deployment</code>.</li>
<li>Husk: <code>VITE_</code>-værdier kan læses i den byggede frontend. <code>.env</code> organiserer konfigurationen, men gør ikke værdier hemmelige.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Identitet, metadata og template-oprydning</strong></summary>
<ul>
<li>Fjern appnavn, logo og andre template-rester.</li>
<li>Opdatér dokumenttitel, meta description, favicon og <code>lang</code>, så identitet og metadata passer til løsningen.</li>
<li>Gennemgå README og setup-guides, og fjern eller omskriv template-specifik dokumentation.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Accessibility tilbage i løsningen</strong></summary>
<ul>
<li>Genbesøg semantisk HTML, ARIA med omtanke, accessible names, labels og alternativ tekst.</li>
<li>Kontrollér tastaturnavigation, synligt fokus, formularfeedback og fokus ved route-skift.</li>
<li>Find og ret konkrete problemer. Accessibility var et fokus på 2. semester, men manglede i mange Web Apps.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Supabase via REST og SDK – kort introduktion</strong></summary>
<ul>
<li>Hvad er REST og SDK, hvad er forskellen, og hvad abstraherer SDK'et?</li>
<li>Brug REST først for at forstå fetch, HTTP og JSON. SDK'et kan bruges senere på semesteret, når forskellene er forstået.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>7. AI og agenter i udviklingsarbejdet</strong></summary>
<ul>
<li>Afklar, hvornår AI er nyttig – og hvornår den ikke er.</li>
<li>Skeln mellem en chat, der svarer, og en agent, der også kan undersøge filer, køre kommandoer og ændre kode.</li>
<li>Brug AI til at genbesøge et af dagens emner og foreslå en konkret forbedring. Giv kun relevant kode, kontekst og det ønskede resultat.</li>
<li>Undersøg først, afgræns opgaven, og ændr ikke noget uden en klar aftale.</li>
<li>Gennemgå altid forslag, kommandoer og ændringer.</li>
<li>AI kan tage fejl. Find kilden i projektet, læs diffet, og kontrollér resultatet med konkrete tests.</li>
<li>Del aldrig private nøgler, tokens, persondata, hele <code>.env</code>-filer eller andre følsomme oplysninger.</li>
<li>Du har ansvaret for at forstå, vælge, teste og forklare løsningen.</li>
<li>Dokumentér også, hvis et AI-forslag var forkert eller blev afvist.</li>
<li>Kontrollér resultatet på mindst to måder, fx med en lokal test og en browser- eller Pages-kontrol.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>8. Forbedr og evaluér din egen Web App</strong></summary>
<ul>
<li>Vælg et af dagens emner, og brug eventuelt AI til at undersøge og forbedre et konkret problem.</li>
<li>Kontrollér forslaget i projektet, test resultatet, og notér hvis et AI-forslag blev afvist eller korrigeret.</li>
<li>Undersøg derefter deployment, routing, data/Supabase, environment variables, template-rester, metadata, identitet og accessibility.</li>
<li>Lav en kort, prioriteret forbedringsliste, og begynd på den vigtigste rettelse, hvis der er tid.</li>
<li>Test effekten, og dokumentér hvad der blev forbedret, og hvordan du ved det.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:**
  - [Web App-forbedringer og teknisk fundament](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-01/)
  - [PDF-version: Web App-forbedringer og teknisk fundament](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-01/?print-pdf)
- **Opgaver:**
  - [Opgave 1 · Kør projektet lokalt](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-01/#/opgave-1)
  - [Opgave 2 · Konfigurér, deploy og kontrollér](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-01/#/opgave-2)
  - [Opgave 3 · Simulér teamsamarbejde](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-01/#/opgave-3)
  - [Opgave 4 · Brug de udleverede værdier](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-01/#/opgave-4)
  - [Opgave 5 · Skift til din egen Supabase](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-01/#/opgave-5)
  - [Opgave 6 · Metadata og identitet](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-01/#/opgave-6)
  - [Opgave 7 · Giv dagens løsning et a11y-løft](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-01/#/opgave-7)
  - [Opgave 8 · Brug AI til en forbedring](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-01/#/opgave-8)
  - [Opgave 9 · Evaluer din egen app](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-01/#/opgave-9)
- **React:**
  - [Scrimba: Learn React](https://scrimba.com/learn-react-c0e)
  - [React: Learn](https://react.dev/learn)
- **Vite og deployment:**
  - [Environment variables](https://vite.dev/guide/env-and-mode)
  - [GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages)
  - [Custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
  - [GitHub Actions-variabler](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables)
- **Supabase:**
  - [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)
  - [Supabase Project Pausing - How to resume](https://supabase.com/docs/guides/platform/free-project-pausing)
