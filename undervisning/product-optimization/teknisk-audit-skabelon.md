# Teknisk audit af en React-løsning

En teknisk audit er en systematisk undersøgelse af en eksisterende løsning. Formålet er at finde, dokumentere og prioritere forbedringer — ikke blot at samle personlige præferencer om kode.

## 1. Afgræns løsningen

- Hvad er løsningens formål og vigtigste brugerflows?
- Hvilke dele af produktet og kodebasen undersøger du?
- Hvilke dele ligger uden for din audit?
- Kan løsningen køre lokalt og online, før du ændrer den?

## 2. Etablér en baseline

Dokumentér løsningens udgangspunkt med relevante former for evidens:

- skærmbilleder eller korte skærmoptagelser
- konkrete fil- og komponentnavne
- kodeudsnit eller links til linjer i repositoryet
- fejl fra konsol, netværk eller build
- keyboard-flow og andre accessibility-observationer
- eksisterende deployment og Git-historik
- relevante målinger, når de faktisk siger noget om problemet

## 3. Undersøg løsningen

### Accessibility

- **Semantik:** Bruges HTML-elementer og et heading-hierarki, der beskriver indholdet?
- **ARIA:** Bruges ARIA kun, når HTML ikke er nok – og ikke som erstatning for semantik?
- **Navne:** Kan labels, linktekster, knapper og fejlbeskeder forstås?
- **Tastatur:** Kan alle centrale brugerflows nås og bruges med tastatur, og er fokus altid synligt og logisk?
- **Indhold:** Har billeder passende alt-tekst, og har formularer labels, instruktioner og feedback?
- **React SPA:** Opdateres `document.title`, og flyttes fokus til den nye overskrift med `headingRef.current?.focus()` ved navigation?

Se også [React og Accessibility (a11y)](https://race.notion.site/React-og-Accessibility-a11y-302bc239db1180bba2b8c5bb9639664c).

### Styling

- Er det tydeligt, hvilke styles der hører til hvilke komponenter?
- Ligger komponentrelateret styling tæt på komponenten?
- Er globale styles begrænset til eksempelvis reset, design tokens og reelt globale regler?
- Er der gentagelser, specificity-problemer eller utilsigtede afhængigheder?
- Er navngivning og stylingtilgang konsekvent?
- Fungerer layoutet på relevante skærmstørrelser?

Målet er ikke nødvendigvis at fjerne al global CSS. Målet er tydeligt ansvar og lettere vedligeholdelse.

### Navngivning, struktur og arkitektur

- Er mapper, filer, komponenter, funktioner og variabler navngivet tydeligt og konsekvent?
- Har hver komponent et forståeligt ansvar?
- Er store komponenter kandidater til opdeling?
- Er props, state og dataflow lette at følge?
- Er afledte værdier beregnet frem for gemt som unødvendig state?
- Er gentaget logik samlet i funktioner eller hooks, når det forbedrer koden?
- Er dataadgang adskilt fra præsentationslogik, hvor det giver mening?

### Fejlhåndtering og robuste UI-states

- Har asynkrone handlinger tydelige `loading`, `success`, `empty` og `error` states?
- Håndteres forventede fejl med eksempelvis `try`, `catch` og `finally`?
- Kontrolleres fejl fra fetch, Supabase eller andre API-kald eksplicit?
- Får brugeren en forståelig besked og et relevant næste skridt?
- Kan brugeren prøve igen efter en midlertidig fejl?
- Forhindres gentagne submits eller handlinger, mens en request kører?
- Valideres input både før og efter en request, hvor det er relevant?
- Skal en error boundary beskytte dele af UI'et mod uventede render-fejl?
- Logges tekniske detaljer uden at vise dem direkte til brugeren?

### Supabase og datamodel

- Har tabeller, kolonner og datatyper tydelige og konsekvente navne?
- Findes relevante primærnøgler og fremmednøgler?
- Er relaterede data modelleret som relationer frem for duplikerede felter?
- Understøtter datamodellen de vigtigste brugerflows?
- Hentes kun de data, brugergrænsefladen har brug for?
- Er forespørgsler og mutationer organiseret konsistent?
- Er secrets og environment variables håndteret korrekt?

### Git, deployment og teknisk kvalitet

- Er ændringer opdelt i forståelige issues, feature branches og commits?
- Gør feature branches og commits det tydeligt, hvad der er ændret og hvorfor?
- Bygger projektet uden fejl?
- Er konsollen fri for relevante fejl og advarsler?
- Fungerer miljøvariabler i deployment-miljøet?
- Gennemføres deployment korrekt via GitHub Actions?
- Matcher den publicerede løsning den seneste version på `main`?

## 4. Registrér dine fund

Brug én række pr. fund:

| ID | Område | Fund og evidens | Konsekvens | Forslag | Effekt | Indsats | Verifikation |
|---|---|---|---|---|---|---|---|
| A-01 | Accessibility | Formularfelt mangler label i `PostForm` | Skærmlæserbrugere får ikke feltets formål | Tilføj synlig label og korrekt kobling | Høj | Lav | Gennemfør formularen med tastatur og skærmlæser |

## 5. Prioritér

Prioritér ikke alene efter, hvad der er nemmest eller mest interessant at kode. Vurder:

- konsekvensen for brugeren
- risikoen for fejl eller tab af data
- betydningen for vedligeholdelse og videreudvikling
- om fundet blokerer andre forbedringer
- forventet effekt i forhold til indsatsen

Vælg derefter et realistisk antal forbedringer, og beskriv kort, hvornår hver forbedring kan betragtes som færdig.

## 6. Dokumentér effekten

For hver gennemført forbedring skal du kunne vise:

1. Hvordan fungerede løsningen før?
2. Hvilket problem dokumenterede din audit?
3. Hvad ændrede du — og hvorfor?
4. Hvordan har du verificeret forbedringen?
5. Hvad er stadig ikke løst?

Brug eksempelvis før/efter-skærmbilleder, kode-diffs, testresultater, et keyboard-flow, en forbedret fejltilstand eller en stabil deployment som evidens.
