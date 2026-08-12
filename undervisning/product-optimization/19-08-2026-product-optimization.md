# RACE - Product optimization: Web App-forbedringer og teknisk fundament - 19-08-2026

## Formål

Undervisningsgangen er et teknisk startskud til 3. semester. Du forbedrer konkrete mangler fra 2. semesters Web App-forløb i en udleveret React-løsning og overfører derefter principperne til din egen Web App. Dagens output er en forbedret løsning og en prioriteret liste til din egen Web App.

## Forberedelse

- Find **koden til din Web App fra 2. semester**, og sørg for, at den kan køre lokalt.
- Kontrollér repository og online deployment. Du skal muligvis genoptage dit Supabase-projekt.
- Har du brug for et React-recap? Begynd eksempelvis med første del af [Scrimba: Learn React](https://scrimba.com/learn-react-c0e), og brug forløbet efter behov.
- Se også de supplerende links under **Materialer**.

## Agenda

Vi veksler mellem korte oplæg og arbejde i den udleverede løsning, så du afprøver forbedringerne undervejs.

<details>
<summary><strong>1. Introduktion og baseline</strong></summary>
<ul>
<li>Start den udleverede løsning.</li>
<li>Find synlige fejl, mangler og template-rester.</li>
<li>Gør projektet klar til forbedringerne.</li>
</ul>
</details>

<details>
<summary><strong>2. AI og agenter i udviklingsarbejdet</strong></summary>
<ul>
<li>Afklar, hvornår AI er nyttig – og hvornår den ikke er.</li>
<li>Skeln mellem en chat, der svarer, og en agent, der også kan undersøge filer, køre kommandoer og ændre kode.</li>
<li>Brug AI til at forklare fejl, undersøge logs, opstille hypoteser og foreslå små rettelser. Giv kun den relevante fejl, kontekst og det ønskede resultat.</li>
<li>Afgræns opgaven, og gennemgå altid forslag, kommandoer og ændringer.</li>
<li>Del aldrig private nøgler, tokens, hele <code>.env</code>-filer eller andre hemmelige oplysninger.</li>
<li>Du har ansvaret for at forstå, vælge, teste og forklare løsningen.</li>
<li>Hvad gør RACE? Og hvad gør de ude i branchen?</li>
</ul>
</details>

<details>
<summary><strong>3. GitHub-flow og automatisk deployment</strong></summary>
<ul>
<li>Repetér flowet: feature branch → pull request → <code>main</code> → GitHub Actions → GitHub Pages.</li>
<li>Se, hvordan automatisk deployment gør processen ensartet og reproducerbar.</li>
<li>Kontrollér Pages-opsætning, permissions, Vites <code>base</code>, environment variables og lockfile.</li>
<li>Find workflow run, job, fejlet step og log i repositoryets <strong>Actions</strong>-fane.</li>
<li>Brug AI til at forstå en fejl og foreslå en afgrænset rettelse. Test, genkør workflowet, og kontrollér build og deployment.</li>
</ul>
</details>

<details>
<summary><strong>4. Environment variables lokalt og online</strong></summary>
<ul>
<li>Hold konfiguration ude af kildekoden. Brug <code>VITE_SUPABASE_URL</code> og <code>VITE_SUPABASE_APIKEY</code> via <code>import.meta.env</code>.</li>
<li>Brug <code>.env.local</code> lokalt, dokumentér variablerne i <code>.env.example</code>, og commit ikke din lokale <code>.env</code>-fil.</li>
<li>Opret variablerne separat i GitHub Actions.</li>
<li>Husk: <code>VITE_</code>-værdier kan læses i den byggede frontend. <code>.env</code> organiserer konfigurationen, men gør ikke værdier hemmelige.</li>
</ul>
</details>

<details>
<summary><strong>5. Identitet, metadata og template-oprydning</strong></summary>
<ul>
<li>Fjern appnavn, logo og andre template-rester.</li>
<li>Opdatér dokumenttitel, meta description, favicon og <code>lang</code>, så identitet og metadata passer til løsningen.</li>
</ul>
</details>

<details>
<summary><strong>6. Accessibility tilbage i løsningen</strong></summary>
<ul>
<li>Genbesøg semantisk HTML, labels, alternativ tekst, tastaturnavigation og synligt fokus.</li>
<li>Find og ret konkrete problemer. Accessibility var et fokus på 2. semester, men manglede i mange Web Apps.</li>
</ul>
</details>

<details>
<summary><strong>7. Supabase via REST og SDK – kort introduktion</strong></summary>
<ul>
<li>Hvad er REST og SDK, hvad er forskellen, og hvad abstraherer SDK'et?</li>
<li>Behold REST i løsningen. Vi vender tilbage til SDK'et senere på semesteret.</li>
</ul>
</details>

<details>
<summary><strong>8. Gennemgå din egen Web App</strong></summary>
<ul>
<li>Undersøg deployment, environment variables, template-rester, metadata, identitet og accessibility.</li>
<li>Lav en kort, prioriteret forbedringsliste, og begynd på den vigtigste rettelse, hvis der er tid.</li>
<li>Fortsæt resten som hjemmearbejde.</li>
</ul>
</details>

## Materialer

- **Slides:** Vil blive tilgængelige her
- **Opgaver:** Udleveret React-løsning, forbedringskrav og tjekliste til egen Web App vil blive tilgængelige her
- **React:** [Scrimba: Learn React](https://scrimba.com/learn-react-c0e) · [React: Learn](https://react.dev/learn)
- **Vite og deployment:** [Environment variables](https://vite.dev/guide/env-and-mode) · [GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages) · [Custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) · [GitHub Actions-variabler](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables)
- **AI og Supabase:** [OpenAI Codex](https://developers.openai.com/codex/) · [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)
