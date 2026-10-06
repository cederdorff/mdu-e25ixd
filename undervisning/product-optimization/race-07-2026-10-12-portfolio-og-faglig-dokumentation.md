# RACE - Product optimization: Portfolio og faglig dokumentation - 12-10-2026

## Formål

I dag samler vi trådene frem mod afleveringen. Vi starter med en kort præcisering af, hvad de tre casesider skal indeholde, og hvad der skal afleveres. Derefter sikrer vi, at dine løsninger på Supabase forbliver tilgængelige, så de links, du afleverer, også virker, når opgaven bedømmes, og vi kigger kort på, hvad du skal have klar til WordPress-forløbet i uge 43.

Resten af dagen arbejder du med dine casesider og dit portfolio og får vejledning dér, hvor du har mest brug for det. Målet er, at du går hjem med en klar status på de tre casesider og en konkret plan frem mod afleveringen.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at dit portfolio kan tilgås online.
- Saml dokumentation fra de tre cases: proces, centrale valg, outputs, feedback og resultater.
- Medbring adgang til GitHub-repository og Supabase-projekt for de løsninger, du vil linke til.
- Læs [Product Optimization – eksamen og aflevering](https://eaaa.instructure.com/courses/30922/pages/product-optimization-eksamen-og-aflevering).

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Kort præcisering af casesider og aflevering → Supabase keep-alive → klar til WordPress i uge 43 → faciliteret arbejde med casesider og portfolio → plan frem mod aflevering.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Hvad skal casesiderne indeholde – og hvad skal afleveres?</strong></summary>
<ul>
<li>Du afleverer ét PDF-dokument i WISEflow med tre direkte links – ét til hver caseside. Et link til forsiden af dit portfolio er ikke nok.</li>
<li>Afleveringen er <strong>16. oktober 2026 før kl. 12.00</strong>. Bedømmelsen omfatter casesiderne og det materiale, de linker til.</li>
<li>Hver caseside formidler casen som en kort, faglig casefortælling – ikke som en projektdagbog: <strong>udfordring → undersøgelse → valg → løsning → resultat → refleksion og værdi</strong>.</li>
<li>Hver side skal kort vise: case og udfordring, undersøgelse og prioritering, løsning og faglige valg, resultat og dokumentation, faglig refleksion samt forretningspotentiale.</li>
<li>Teksten på de tre sider må tilsammen fylde maksimalt 12.000 anslag inklusive mellemrum. Vælg det vigtigste, og lad billeder, prototyper og links understøtte – men de vigtigste faglige pointer skal stå på selve siden.</li>
<li>Vis evidens frem for påstande: fx før/efter, målinger, testresultater, feedback eller konkrete eksempler fra dit arbejde.</li>
<li>Løsninger og outputs, der skal linkes til:
<ul>
<li><strong>Case 1:</strong> GitHub-repository og den deployede løsning.</li>
<li><strong>Case 2:</strong> UX Audit Summary og Figma-prototype.</li>
<li><strong>Case 3:</strong> Branddeck, Figma-prototype og visuel gennemgang af koncept og løsning.</li>
</ul>
</li>
<li>Tjek alle links fra casesiderne i et Incognito-vindue – som en udenforstående ville åbne dem:
<ul>
<li>Er GitHub-repositories offentlige, og er Figma-filer og -prototyper delt med <em>Anyone with the link</em>?</li>
<li>Virker den deployede løsning, også ved direkte links og reload af undersider?</li>
<li>Henter løsningen data fra Supabase i den deployede version – ikke kun lokalt?</li>
</ul>
</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Hold din Supabase-løsning kørende med en GitHub Action</strong></summary>
<ul>
<li>Supabase pauser projekter på Free Plan, hvis der er for lidt databaseaktivitet over en periode på 7 dage. Så virker din deployede løsning ikke, når den åbnes fra dit portfolio.</li>
<li>Et projekt, der allerede er pauset, skal først genstartes manuelt med <em>Restore</em> i Supabase-dashboardet.</li>
<li>Løsningen er en planlagt GitHub Action, der henter én række fra en tabel gennem Supabase REST API to gange om ugen.</li>
<li>Læg workflowet i dit <strong>portfolio-repository</strong>. GitHub slår planlagte workflows fra efter 60 dage uden aktivitet i et offentligt repository, og dit portfolio er det repository, du oftest opdaterer.</li>
<li>Opret filen <code>.github/workflows/supabase-keep-alive.yml</code> på din default branch (typisk <code>main</code>):</li>
</ul>
<pre><code class="language-yaml">name: Supabase keep-alive

on:
  schedule:
    - cron: "0 6 * * 1,4" # mandag og torsdag kl. 06 (UTC)
  workflow_dispatch: # gør det muligt at køre workflowet manuelt

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Supabase
        run: |
          curl --fail -sS -o /dev/null \
            "${{ secrets.SUPABASE_URL }}/rest/v1/events?select=id&amp;limit=1" \
            -H "apikey: ${{ secrets.SUPABASE_KEY }}"
</code></pre>
<ul>
<li>Udskift <code>events</code> med en tabel fra dit eget projekt, som din publishable/anon key kan læse.</li>
<li>Tilføj <code>SUPABASE_URL</code> og <code>SUPABASE_KEY</code> under <em>Settings → Secrets and variables → Actions</em> i repositoryet.</li>
<li>Kør workflowet manuelt under <em>Actions → Supabase keep-alive → Run workflow</em>, og kontrollér, at det bliver grønt.</li>
<li>Har du flere Supabase-projekter, tilføjer du et ekstra step med egne secrets for hvert projekt.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Bliv klar til WordPress i uge 43</strong></summary>
<ul>
<li>I uge 43 har I et kort WordPress-forløb med Per Thykjær Jensen. For at I kan gå direkte i gang med at sætte WordPress op, skal du have følgende klar, inden forløbet starter:</li>
<li><strong>Et domænenavn</strong> hos <a href="https://www.simply.com/dk/">Simply.com</a>. Vælg et navn, du kan genbruge senere – fx til dit portfolio.</li>
<li><strong>Et webhotel</strong> hos Simply.com, som domænet er tilknyttet.</li>
<li>Brug rabatkoden <code>EAAA-STUDIE-2026</code>, når du køber.</li>
<li>Kontrollér, at du kan logge ind på dit kontrolpanel hos Simply.com, så du er klar, når forløbet starter.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Arbejd med casesider og portfolio, og få vejledning</strong></summary>
<ul>
<li>Gør status på de tre casesider: Hvad er på plads, hvad mangler, og hvad skal skæres væk?</li>
<li>Prioritér den caseside, der er længst fra at være færdig, eller det punkt, der står svagest på tværs af siderne.</li>
<li>Få vejledning på casefortælling, udvælgelse af evidens, refleksion, forretningspotentiale eller teknisk kvalitet i portfolioet.</li>
<li>Slut dagen med en konkret plan for, hvad du gør på hver caseside frem mod afleveringen 16. oktober.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Eksamen:**
  - [Product Optimization – eksamen og aflevering](https://eaaa.instructure.com/courses/30922/pages/product-optimization-eksamen-og-aflevering)
- **Supabase og GitHub Actions:**
  - [Supabase · Project Pausing](https://supabase.com/docs/guides/platform/free-project-pausing)
  - [GitHub Docs · Events that trigger workflows: schedule](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)
  - [GitHub Docs · Using secrets in GitHub Actions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)
- **Slides:** Vil blive tilgængelige her
