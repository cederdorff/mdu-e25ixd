# RACE - Product optimization: Portfolio og faglig dokumentation - 12-10-2026

## Formål

I dag samler vi trådene frem mod afleveringen. Vi starter med at kigge kort på, hvad du skal have klar til WordPress-forløbet i uge 43. Derefter sikrer vi, at dine løsninger på Supabase forbliver tilgængelige, så de links, du afleverer, også virker, når opgaven bedømmes. Til sidst præciserer vi kort, hvad de tre casesider skal indeholde, og hvad der skal afleveres.

Resten af dagen arbejder du med dine casesider og dit portfolio og får vejledning dér, hvor du har mest brug for det. Målet er, at du går hjem med en klar status på de tre casesider og en konkret plan frem mod afleveringen.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at dit portfolio kan tilgås online.
- Saml dokumentation fra de tre cases: proces, centrale valg, outputs, feedback og resultater.
- Medbring adgang til GitHub-repository og Supabase-projekt for de løsninger, du vil linke til.
- Læs [Product Optimization – eksamen og aflevering](https://eaaa.instructure.com/courses/30922/pages/product-optimization-eksamen-og-aflevering).

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Klar til WordPress i uge 43 → Supabase keep-alive → kort præcisering af casesider og aflevering → faciliteret arbejde med casesider og portfolio → plan frem mod aflevering.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Bliv klar til WordPress i uge 43</strong></summary>
<ul>
<li><strong>Hvad skal du have klar?</strong> I uge 43 – tirsdag til torsdag den 20.–22. oktober – har I et kort WordPress-forløb med Per Thykjær Jensen. For at I kan gå direkte i gang med at sætte WordPress op, skal du have <strong>et domæne og et webhotel, hvor du kan installere WordPress</strong>, klar, inden forløbet starter.</li>
<li><strong>Anbefalet: Simply.com.</strong> Bestil et <code>.dk</code>-domæne med et webhotel – <em>Basic Suite</em>, <em>Standard Suite</em> eller <em>Pro Suite</em> – hos <a href="https://www.simply.com/dk/">Simply.com</a>, og brug rabatkoden <code>EAAA-STUDIE-2026</code>. <strong>Husk at vælge <em>PHP</em> og <em>24 mnd</em> under <em>Produktdetaljer</em></strong> – så er webhotellet gratis i to år, og du betaler kun 9 kr. i alt for domænet det første år. Vælg et navn, du kan genbruge senere – fx til dit portfolio.<br>
<img src="https://raw.githubusercontent.com/cederdorff/mdu-e25ixd/main/slides/assets/simply-basic-suite-rabatkode.webp" alt="Bestilling hos Simply.com af et .dk-domæne med Basic Suite i 24 måneder. Med rabatkoden EAAA-STUDIE-2026 er Basic Suite gratis, og prisen bliver 9,00 kr. i alt." style="max-width: 100%; margin: 0.75rem 0; border: 1px solid #ddd; border-radius: 6px;">
<img src="https://raw.githubusercontent.com/cederdorff/mdu-e25ixd/main/slides/assets/simply-produktdetaljer-php-24-mdr.webp" alt="Produktdetaljer i bestillingen hos Simply.com med produkttypen PHP og betalingsperioden 24 mnd valgt." style="max-width: 100%; margin: 0.75rem 0; border: 1px solid #ddd; border-radius: 6px;"></li>
<li><strong>Bagefter fornyes det til normalpris:</strong> domænet efter det første år (109 kr./år for et <code>.dk</code>-domæne) og Basic Suite efter de 24 måneder (69,95 kr./md. eller 839,40 kr./år). Vil du ikke fortsætte, så opsig webhotellet og domænet i kontrolpanellet, inden de fornyes.</li>
<li><strong>Domænet kan også pege på GitHub Pages,</strong> som vi har brugt meget. Med et <a href="https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site">custom domain</a> kan dit portfolio fx ligge på dit eget domæne i stedet for <code>brugernavn.github.io</code> – som <a href="https://cederdorff.com">cederdorff.com</a>. Så kan du beholde domænet, også selvom du opsiger webhotellet.</li>
<li><strong>Har du allerede et domæne og webhotel</strong> et andet sted, kan du bruge det. De fleste udbydere har en one-click installer til WordPress.</li>
<li><strong>Vil du ikke have dit eget domæne,</strong> så aftal at arbejde sammen med en medstuderende, der har et.</li>
<li><strong>Tjek dit login:</strong> Kontrollér, at du kan logge ind i kontrolpanelet hos din udbyder, så du er klar, når forløbet starter.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Hold dine Supabase-løsninger kørende med en GitHub Action</strong></summary>
<ul>
<li><strong>Problemet:</strong> Mange af de løsninger, du linker til fra dine casesider, bruger Supabase – fx Mellemrum fra Case 1. Supabase pauser gratis projekter, hvis databasen ikke bliver brugt i ca. en uge. Så virker løsningen ikke, når den åbnes fra dit portfolio.</li>
<li><strong>Løsningen:</strong> En lille GitHub Action, der automatisk bruger databasen to gange om ugen.</li>
<li><strong>Gør det:</strong> Følg guiden <a href="https://github.com/cederdorff/post-app-supabase/blob/main/docs/supabase-keep-alive.md">Hold dit Supabase-projekt i live med GitHub Actions</a> for <strong>hvert repository, der bruger Supabase</strong>, og kontrollér, at kørslen bliver grøn.</li>
<li><strong>Allerede pauset?</strong> Så skal du først starte det igen med <em>Restore project</em> i Supabase-dashboardet.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Hvad skal casesiderne indeholde – og hvad skal afleveres?</strong></summary>
<ul>
<li><strong>Aflevering:</strong> Ét PDF-dokument i WISEflow med dit navn, hold, uddannelse og tre direkte links – ét til hver caseside. Et link til forsiden af dit portfolio er ikke nok. Frist: <strong>16. oktober 2026 før kl. 12.00</strong>.</li>
<li><strong>Bedømmelse:</strong> Omfatter casesiderne og det materiale, de linker til.</li>
<li><strong>Casefortælling – ikke projektdagbog:</strong> udfordring → undersøgelse → valg → løsning → resultat → refleksion og værdi.</li>
<li><strong>Indhold på hver side:</strong> Vis kort case og udfordring, undersøgelse og prioritering, løsning og faglige valg, resultat og dokumentation, faglig refleksion samt forretningspotentiale. Se uddybningen af hvert punkt, herunder forretningspotentiale, i <a href="https://eaaa.instructure.com/courses/30922/pages/product-optimization-eksamen-og-aflevering">Product Optimization – eksamen og aflevering</a>.</li>
<li><strong>Evidens frem for påstande:</strong> Vis fx før/efter, målinger, testresultater, feedback eller konkrete eksempler fra dit arbejde.</li>
<li><strong>Eget bidrag og kilder:</strong> Gør dem tydelige – se <em>Formkrav og redelighed</em> og <em>Tjek før aflevering</em> i eksamensbeskrivelsen.</li>
<li><strong>Maks. 12.000 anslag i alt</strong> inklusive mellemrum på de tre sider. Kun brødteksten tæller; illustrationer tæller som ét anslag, medmindre det er teksttunge figurer eller tabeller. Vælg det vigtigste, og lad billeder, prototyper og links understøtte – men de vigtigste faglige pointer skal stå på selve siden.</li>
<li><strong>Sprog og synlighed:</strong> Skriv som udgangspunkt på dansk – eller på engelsk, hvis det passer bedre til dit portfolio. Siderne behøver ikke være i navigationen, men gør dem gerne synlige.</li>
<li><strong>Ingen rettelser efter aflevering:</strong> Du må ikke rette casesiderne, før bedømmelsen er færdig. Andre sider på dit portfolio må du gerne rette.</li>
<li><strong>Link til løsninger og outputs:</strong>
<ul>
<li><strong>Case 1:</strong> GitHub-repository og den deployede løsning.</li>
<li><strong>Case 2:</strong> UX Audit Summary og Figma-prototype.</li>
<li><strong>Case 3:</strong> Branddeck, Figma-prototype og visuel gennemgang af koncept og løsning.</li>
</ul>
</li>
<li><strong>Tjek alle links i et Incognito-vindue</strong> – som en udenforstående ville åbne dem:
<ul>
<li>Er GitHub-repositories offentlige, og er Figma-filer og -prototyper delt med <em>Anyone with the link</em>?</li>
<li>Virker den deployede løsning, også ved direkte links og reload af undersider?</li>
<li>Henter løsningen data fra Supabase i den deployede version – ikke kun lokalt?</li>
</ul>
</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Arbejd med casesider og portfolio, og få vejledning</strong></summary>
<ul>
<li><strong>Gør status</strong> på de tre casesider: Hvad er på plads, hvad mangler, og hvad skal skæres væk?</li>
<li><strong>Prioritér</strong> den caseside, der er længst fra at være færdig, eller det punkt, der står svagest på tværs af siderne.</li>
<li><strong>Få vejledning</strong> på casefortælling, udvælgelse af evidens, refleksion, forretningspotentiale eller teknisk kvalitet i portfolioet.</li>
<li><strong>Lav en plan:</strong> Slut dagen med en konkret plan for, hvad du gør på hver caseside frem mod afleveringen 16. oktober.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Eksamen:**
  - [Product Optimization – eksamen og aflevering](https://eaaa.instructure.com/courses/30922/pages/product-optimization-eksamen-og-aflevering)
- **Supabase og GitHub Actions:**
  - [Guide · Hold dit Supabase-projekt i live med GitHub Actions](https://github.com/cederdorff/post-app-supabase/blob/main/docs/supabase-keep-alive.md)
  - [Supabase · Project Pausing](https://supabase.com/docs/guides/platform/free-project-pausing)
  - [GitHub Docs · Events that trigger workflows: schedule](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)
  - [GitHub Docs · Using secrets in GitHub Actions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)
- **Domæne og webhotel:**
  - [Simply.com · Basic Suite](https://www.simply.com/dk/hosting/basicsuite/)
  - [Simply.com · Prisændring på .dk-domæner](https://blog.simply.com/2021/dkhostmaster-haever-prisen-pa-dk-domaener/)
  - [GitHub Docs · Configuring a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
