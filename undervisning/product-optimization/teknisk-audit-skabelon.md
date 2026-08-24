# Teknisk audit af en React-løsning

<div style="margin: 0 auto; max-width: 1000px;">

<div style="background: #f5f2ea; border-left: 6px solid #ff785a; margin: 0 0 2rem; padding: 1rem 1.5rem;">

En teknisk audit er en systematisk undersøgelse af en eksisterende løsning. Formålet er at finde, dokumentere og prioritere forbedringer — ikke blot at samle personlige præferencer om kode.

Brug de seks fokusområder til at undersøge løsningen. Du behøver ikke finde eller løse problemer inden for dem alle. Tilmeldingsflowet og den deployede løsning skal dog fungere ved casens afslutning. Derudover vælger og prioriterer du de fund, der har størst betydning.

</div>

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## 1. Afgræns løsningen

- Beskriv kort løsningens formål og vigtigste brugerflows.
- Afgræns, hvilke dele du undersøger – og hvad du ikke undersøger.
- Kontrollér, at løsningen fungerer lokalt og online, før du ændrer den.

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## 2. Etablér en baseline

Dokumentér udgangspunktet, før du ændrer løsningen. Vælg kun evidens, der hjælper med at vise et konkret problem, eksempelvis:

- skærmbilleder, skærmoptagelser eller keyboard-flow
- kodeudsnit samt fejl fra konsol, Network-panel eller build
- Lighthouse-målinger, deployment og relevant Git-historik

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## 3. Undersøg løsningen

Åbn de områder, der er relevante for din undersøgelse. Du behøver ikke arbejde med alle spørgsmål.

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>1. React-arkitektur og kodekvalitet</strong></summary>

**Struktur og navngivning**

- Er projektets struktur og navngivning tydelig og konsekvent, så andre kan finde rundt og videreudvikle løsningen?

**Komponenter og ansvar**

- Har komponenterne forståelige hovedansvar, og bør store komponenter opdeles eller sammensættes af mindre dele (*single responsibility* og *component composition*)?
- Er dataadgang og præsentationslogik adskilt, hvor det forbedrer overblikket (*separation of concerns*)?
- Er gentaget logik samlet i funktioner eller hooks, når det gør koden lettere at vedligeholde?

**State og dataflow**

- Er dataflowet gennem props og state let at følge?
- Har data én tydelig kilde, og beregnes afledte værdier frem for at blive gemt som unødvendig state (*single source of truth* og *derived state*)?

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>2. Robusthed, fejlhåndtering og UI-states</strong></summary>

**Datahentning og side effects**

- Er *side effects* som datahentning placeret tydeligt og holdt adskilt fra renderingen?

**Fejlhåndtering**

- Håndteres forventede fejl fra fetch, Supabase og andre asynkrone handlinger eksplicit?
- Holdes tekniske fejloplysninger adskilt fra de beskeder, brugeren ser?

**UI-states og feedback**

- Har asynkrone handlinger tydelige `loading`, `success`, `empty` og `error` states?
- Får brugeren forståelig feedback og et relevant næste skridt, eksempelvis mulighed for at prøve igen?
- Valideres input, og forhindres gentagne handlinger, mens en request kører?

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>3. UI-konsistens og accessibility</strong></summary>

**UI-konsistens**

- Er komponenter, formularer, feedbackmønstre og interaktioner konsistente på tværs af løsningen?
- Vises datoer, tidspunkter, eventtyper, venues og adresser i et ensartet format på tværs af sider og komponenter?
- Er styling organiseret tydeligt uden unødvendige gentagelser eller konflikter, og fungerer layoutet på relevante skærmstørrelser?

**Accessibility**

- **Semantik:** Bruges semantisk HTML og et logisk heading-hierarki, og anvendes ARIA kun, når HTML ikke er tilstrækkeligt?
- **Indhold og navne:** Er linktekster, knapper og fejlbeskeder forståelige, har billeder passende alt-tekst, og har formularer labels og feedback?
- **Tastatur:** Kan alle centrale brugerflows nås og bruges med tastatur, og er fokus altid synligt og logisk?
- **React SPA:** Opdateres `document.title`, og flyttes fokus til den nye overskrift, eksempelvis med `myRef.current?.focus()`, ved navigation?

Målet er tydeligt ansvar, konsistens og en løsning, flere kan bruge. Se også [React og Accessibility (a11y)](https://race.notion.site/React-og-Accessibility-a11y-302bc239db1180bba2b8c5bb9639664c).

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>4. Datamodel, relationer og Supabase</strong></summary>

**Datamodel og relationer**

- Har tabeller, kolonner, datatyper samt primær- og fremmednøgler tydelige og konsekvente navne?
- Understøtter relationerne de vigtigste brugerflows uden unødvendigt duplikerede data?

**Tilmeldingsflow i Case 1**

- Gemmes en tilmelding i `registrations` og forbindes den korrekt med det valgte event?
- Henter og viser den interne side tilmeldinger sammen med relevante eventdata?
- Kan en ny tilmelding verificeres både i Supabase og i brugergrænsefladen?

**Dataadgang i React**

- Er grænsen mellem React, Supabase REST API og databasen tydelig, og er forespørgsler og mutationer organiseret konsistent?
- Hentes kun de nødvendige data, uden unødvendige eller gentagne requests?
- Er valget mellem lokal søgning og filtrering i React eller forespørgsler til Supabase begrundet?

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>5. Performance</strong></summary>

- Peger Lighthouse og browserens udviklerværktøjer på konkrete problemer med betydning for brugeren?
- Har billeder passende størrelse, format, dimensioner og loading-strategi?
- Indeholder projektet kode, assets eller dependencies, som ikke bruges?
- Er lazy loading af større routes eller komponenter relevant for den første indlæsning?
- Viser Network-panelet unødvendige requests eller renderinger, og er fund fra development kontrolleret i en production build?
- Er før- og eftermålinger foretaget flere gange på deployede produktionsversioner under sammenlignelige og dokumenterede forhold?

En Lighthouse-score er et pejlemærke, ikke et mål i sig selv. Brug testen til at finde konkrete problemer, som har betydning for brugeren.

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>6. Git, deployment og teknisk kvalitet</strong></summary>

- Gør feature branches og commits det tydeligt, hvad der er ændret og hvorfor?
- Gennemføres production build og deployment uden fejl?
- Fungerer environment variables, routing og base URL på hostingens adresse og eventuelle undermapper?
- Matcher den publicerede løsning den seneste version på `main`?
- Fungerer centrale brugerflows i den publicerede løsning?
- Kan centrale routes åbnes via direkte links og genindlæses uden fejl?
- Indlæses assets og virker interne og eksterne links fra de korrekte stier?
- Er konsollen og Network-panelet fri for relevante fejl, fejlede requests og `404`-svar?

</details>

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## 4. Registrér dine fund

Registrér kun konkrete fund, som kan få betydning for din prioritering. Brug én række pr. fund:

<div style="overflow-x: auto;">

| Område | Fund og evidens | Konsekvens | Forslag | Prioritet | Verifikation |
|---|---|---|---|---|---|
| Accessibility | E-mailfeltet mangler en label | Feltets formål er ikke tydeligt for alle brugere | Tilføj en synlig label | Høj | Gennemfør formularen med tastatur og skærmlæser |

</div>

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## 5. Prioritér

Prioritér fundene ud fra:

- konsekvensen for brugeren og risikoen for fejl
- betydningen for vedligeholdelse eller andre forbedringer
- forventet effekt i forhold til indsatsen

Vælg derefter et realistisk antal forbedringer, og beskriv kort, hvornår hver forbedring kan betragtes som færdig.

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## 6. Dokumentér effekten

For hver gennemført forbedring skal du kort dokumentere:

1. **Problem:** Hvad viste din audit, og hvilken konsekvens havde det?
2. **Løsning:** Hvad ændrede du – og hvorfor?
3. **Verifikation:** Hvordan viste du, at forbedringen virker?
4. **Værdi og refleksion:** Hvilken værdi skaber den, og hvad er eventuelt stadig ikke løst?

Brug eksempelvis før/efter-skærmbilleder, kode-diffs, testresultater, et keyboard-flow, en forbedret fejltilstand eller en stabil deployment som evidens.

</div>
