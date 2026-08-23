# Teknisk audit af en React-løsning

<div style="margin: 0 auto; max-width: 1000px;">

<div style="background: #f5f2ea; border-left: 6px solid #ff785a; margin: 0 0 2rem; padding: 1rem 1.5rem;">

En teknisk audit er en systematisk undersøgelse af en eksisterende løsning. Formålet er at finde, dokumentere og prioritere forbedringer — ikke blot at samle personlige præferencer om kode.

Brug skabelonen som støtte til din undersøgelse. Du forventes ikke at finde eller løse problemer under alle punkter. Udvælg de spørgsmål, der er relevante for løsningen, og prioritér de vigtigste fund.

</div>

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## 1. Afgræns løsningen

- Hvad er løsningens formål og vigtigste brugerflows?
- Hvilke dele af produktet og kodebasen undersøger du?
- Hvilke dele ligger uden for din audit?
- Kan løsningen køre lokalt og online, før du ændrer den?

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## 2. Etablér en baseline

Dokumentér løsningens udgangspunkt med relevante former for evidens:

- skærmbilleder eller korte skærmoptagelser
- konkrete fil- og komponentnavne
- kodeudsnit eller links til linjer i repositoryet
- fejl fra konsol, netværk eller build
- keyboard-flow og andre accessibility-observationer
- en Lighthouse-test i Chrome under ensartede forhold
- eksisterende deployment og Git-historik
- relevante målinger, når de faktisk siger noget om problemet

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## 3. Undersøg løsningen

Åbn de områder, der er relevante for din undersøgelse. Du behøver ikke arbejde med alle spørgsmål.

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>1. React-arkitektur og kodekvalitet</strong></summary>

- Er mapper, filer, komponenter, funktioner og variabler navngivet tydeligt og konsekvent?
- Har hver komponent ét forståeligt hovedansvar (*single responsibility*)?
- Er store komponenter kandidater til opdeling?
- Er større interfaces bygget ved at kombinere mindre komponenter med tydelige grænser (*component composition*)?
- Er det ensrettede dataflow gennem props og state let at følge?
- Har data én tydelig kilde (*single source of truth*)?
- Er afledte værdier (*derived state*) beregnet frem for gemt som unødvendig state?
- Er gentaget logik samlet i funktioner eller hooks, når det forbedrer koden?
- Er dataadgang adskilt fra præsentationslogik, hvor det giver mening (*separation of concerns*)?

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>2. Robusthed, datahentning og UI-states</strong></summary>

- Er *side effects* som datahentning placeret tydeligt og holdt adskilt fra renderingen?
- Har asynkrone handlinger tydelige `loading`, `success`, `empty` og `error` states?
- Håndteres forventede fejl med eksempelvis `try`, `catch` og `finally`?
- Kontrolleres fejl fra fetch, Supabase eller andre API-kald eksplicit?
- Får brugeren en forståelig besked og et relevant næste skridt?
- Kan brugeren prøve igen efter en midlertidig fejl?
- Forhindres gentagne submits eller handlinger, mens en request kører?
- Valideres input både før og efter en request, hvor det er relevant?
- Logges tekniske detaljer uden at vise dem direkte til brugeren?

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>3. Accessibility og konsistent UI</strong></summary>

**Konsistens og styling**

- Er det tydeligt, hvilke styles der hører til hvilke komponenter?
- Ligger komponentrelateret styling tæt på komponenten?
- Er globale styles begrænset til eksempelvis reset, design tokens og reelt globale regler?
- Er der gentagelser, konflikter mellem CSS-regler og problemer med specificity?
- Er navngivning og stylingtilgang konsekvent?
- Fungerer layoutet på relevante skærmstørrelser?

**Accessibility**

- **Semantik:** Bruges HTML-elementer og et heading-hierarki, der beskriver indholdet?
- **ARIA:** Bruges ARIA kun, når HTML ikke er nok – og ikke som erstatning for semantik?
- **Navne:** Kan labels, linktekster, knapper og fejlbeskeder forstås?
- **Tastatur:** Kan alle centrale brugerflows nås og bruges med tastatur, og er fokus altid synligt og logisk?
- **Indhold:** Har billeder passende alt-tekst, og har formularer labels, instruktioner og feedback?
- **React SPA:** Opdateres `document.title`, og flyttes fokus til den nye overskrift med `headingRef.current?.focus()` ved navigation?

Målet er tydeligt ansvar, konsistens og en løsning, flere kan bruge. Se også [React og Accessibility (a11y)](https://race.notion.site/React-og-Accessibility-a11y-302bc239db1180bba2b8c5bb9639664c).

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>4. Data og Supabase</strong></summary>

- Er klient–server-grænsen tydelig mellem React, Supabase REST API og databasen?
- Har tabeller, kolonner og datatyper tydelige og konsekvente navne?
- Findes relevante primærnøgler og fremmednøgler?
- Er relaterede data modelleret som relationer frem for duplikerede felter?
- Understøtter datamodellen de vigtigste brugerflows?
- Hentes kun de data, brugergrænsefladen har brug for?
- Hvad hentes fra Supabase, hvornår hentes det, og hvor mange gange sker det i et brugerflow?
- Bør søgning og filtrering ske lokalt i React eller gennem Supabase?
- Er kald, der henter, opretter eller ændrer data, organiseret konsistent?
- Er environment variables og API-nøgler håndteret korrekt?

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>5. Performance</strong></summary>

- Hvad peger en Lighthouse-test i Chrome på, og kan fundene genfindes i løsningen?
- Har billeder en passende størrelse, moderne filformat og tydelige dimensioner?
- Bruges `loading="lazy"` til billeder længere nede på siden – uden at forsinke sidens vigtigste billede?
- Indeholder projektet dependencies, kode eller assets, som ikke længere bruges?
- Er der større side- eller route-komponenter, som med fordel kan indlæses efter behov med `React.lazy` og `Suspense`?
- Hentes kun de data og assets, som siden har brug for?
- Viser Network-panelet unødvendige eller gentagne requests, beregninger eller renderinger med mærkbar betydning?
- Er gentagne requests i development også kontrolleret i en production build, så React Strict Mode ikke fejltolkes som et produktionsproblem?
- Kan en valgt forbedring dokumenteres med en sammenlignelig før- og eftermåling?

En Lighthouse-score er et pejlemærke, ikke et mål i sig selv. Brug testen til at finde konkrete problemer, som har betydning for brugeren.

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>6. Git, deployment og teknisk kvalitet</strong></summary>

- Er ændringer opdelt i forståelige feature branches og commits?
- Gør feature branches og commits det tydeligt, hvad der er ændret og hvorfor?
- Bygger projektet uden fejl?
- Er konsollen fri for relevante fejl og advarsler?
- Fungerer miljøvariabler i deployment-miljøet?
- Gennemføres deployment korrekt via GitHub Actions?
- Matcher den publicerede løsning den seneste version på `main`?

</details>

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## 4. Registrér dine fund

Brug én række pr. fund:

<div style="overflow-x: auto;">

| ID | Område | Fund og evidens | Konsekvens | Forslag | Effekt | Indsats | Verifikation |
|---|---|---|---|---|---|---|---|
| A-01 | Accessibility | E-mailfeltet i tilmeldingsformularen mangler en label | Feltets formål er ikke tydeligt for alle brugere | Tilføj synlig label og korrekt kobling | Høj | Lav | Gennemfør formularen med tastatur og skærmlæser |

</div>

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## 5. Prioritér

Prioritér ikke alene efter, hvad der er nemmest eller mest interessant at kode. Vurder:

- konsekvensen for brugeren
- risikoen for fejl eller tab af data
- betydningen for vedligeholdelse og videreudvikling
- om fundet blokerer andre forbedringer
- forventet effekt i forhold til indsatsen

Vælg derefter et realistisk antal forbedringer, og beskriv kort, hvornår hver forbedring kan betragtes som færdig.

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## 6. Dokumentér effekten

For hver gennemført forbedring skal du kunne vise:

1. Hvordan fungerede løsningen før?
2. Hvilket problem dokumenterede din audit?
3. Hvad ændrede du — og hvorfor?
4. Hvordan har du verificeret forbedringen?
5. Hvad er stadig ikke løst?

Brug eksempelvis før/efter-skærmbilleder, kode-diffs, testresultater, et keyboard-flow, en forbedret fejltilstand eller en stabil deployment som evidens.

</div>
