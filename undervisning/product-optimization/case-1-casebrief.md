# Case 1 – Fra prototype til produktionsklar React-løsning

<div role="img" aria-label="Byrum og arkitektur i Aarhus" style="align-items: flex-end; background: linear-gradient(90deg, rgba(12, 42, 34, 0.94) 0%, rgba(12, 42, 34, 0.72) 50%, rgba(12, 42, 34, 0.22) 100%), url('https://images.unsplash.com/photo-1595146463222-19603449c6af?q=80&amp;w=1800&amp;auto=format&amp;fit=crop') center / cover; border-bottom: 6px solid #d8ff62; color: #ffffff; display: flex; margin: 0 0 2.5rem; min-height: 360px; padding: 2rem;">
<div style="max-width: 760px;">
<p style="color: #d8ff62; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.14em; margin: 0 0 0.85rem; text-transform: uppercase;">Case 1 · React-optimering</p>
<p style="font-size: 2.5rem; font-weight: 800; letter-spacing: -0.05em; line-height: 1; margin: 0 0 0.85rem;">mellemrum<span style="color: #d8ff62;">.</span></p>
<p style="font-size: 1.1rem; line-height: 1.5; margin: 0;">Du overtager en eksisterende React-prototype og udvikler den til en mere robust, tilgængelig og vedligeholdelsesvenlig løsning.</p>
</div>
</div>

<div style="margin: 0 auto; max-width: 1000px;">

<div style="background: #f5f2ea; border-left: 6px solid #ff785a; margin: 0 0 2rem; padding: 1rem 1.5rem;">

## Case 1 som del af eksamen

**Periode:** Case 1 løber fra 24/08/2026 til 04/09/2026.

Case 1 er den første af tre mindre optimeringscases, som tilsammen danner grundlag for den individuelle skriftlige eksamen. Under casen samler du dokumentation og råmateriale – du skal ikke lave den endelige caseside endnu.

Efter den tredje case får du en uge til at bearbejde materialet og opdatere dit eksisterende portfolio website med én caseside for hver case.

Til eksamen afleverer du et dokument med links til de tre casesider. Det samlede skriftlige materiale på de tre sider må maksimalt fylde fem normalsider.

</div>

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## Kunden og udfordringen

**Mellemrum** er en lokal kultur- og eventplatform, hvor brugerne kan finde og tilmelde sig koncerter, talks, workshops og andre arrangementer.

Virksomheden har fået udviklet en React-prototype. Den grundlæggende funktionalitet findes, men løsningen blev bygget hurtigt for at afprøve idéen. Koden er vanskelig at videreudvikle, brugeroplevelsen er ikke altid konsistent, og løsningen håndterer ikke langsomme svar, manglende data og fejl godt nok.

Data hentes fra Supabase gennem Supabase REST API. Datamodellen indeholder gentagne oplysninger, som bør fordeles på relaterede tabeller. Tilmeldingsflowet er kun påbegyndt: En tilmelding skal registreres i Supabase og forbindes med det valgte event. Den eksisterende interne side skal tilpasses, så den kan vise tilmeldinger sammen med deres relaterede eventdata.

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## Din opgave

Du arbejder individuelt og overtager den eksisterende React-løsning. Undersøg prototypen, prioritér de vigtigste problemer, gennemfør relevante forbedringer, og verificér deres effekt. Målet er en mere robust, tilgængelig og vedligeholdelsesvenlig løsning, der er klar til deployment.

Det er ikke målet at ændre mest muligt. Det er vigtigere, at du finder betydningsfulde problemer, prioriterer dem fagligt og kan forklare værdien af dine forbedringer.

Det primære fokus er React og kodeforbedringer. Du må gerne forbedre identiteten og det visuelle lag, hvis du har tid, men det er ikke casens hovedopgave. Visuelle ændringer er relevante, når de eksempelvis styrker konsistens, accessibility, feedback eller robuste UI-states.

Du forventes ikke at kunne løse alle dele ved casens start. Vi arbejder med de nødvendige koncepter og teknikker undervejs.

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## Faglige fokusområder

Case 1 bygger videre på [Web App-forbedringer og teknisk fundament](https://eaaa.instructure.com/courses/30922/pages/race-product-optimization-web-app-forbedringer-og-teknisk-fundament-19-08-2026), som fungerer som løsningens baseline. Relevante forbedringer herfra indgår og verificeres i den samlede løsning.

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>1. React-arkitektur og kodekvalitet</strong></summary>

**Struktur og navngivning**

- Tydelig og konsekvent navngivning af mapper, filer, komponenter, funktioner, props og variabler.
- En gennemskuelig mappestruktur og arkitektur, som andre udviklere kan forstå og videreudvikle.

**Komponenter og ansvar**

- En tydelig ansvarsfordeling mellem pages, komponenter, funktioner og dataadgang (*separation of concerns*).
- Komponenter med ét forståeligt hovedansvar (*single responsibility*) og større interfaces sammensat af mindre komponenter (*component composition*).
- Gentaget logik, eksempelvis formatering af datoer og tidspunkter, samlet i funktioner eller hooks, når det gør koden tydeligere og lettere at vedligeholde.

**State og dataflow**

- Et tydeligt, ensrettet flow mellem data, props og state.
- Én tydelig kilde til data (*single source of truth*) og *derived state*, som beregnes ud fra eksisterende data.

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>2. Robusthed, fejlhåndtering og UI-states</strong></summary>

**Datahentning og side effects**

- *Side effects* som datahentning placeret tydeligt og adskilt fra selve renderingen.

**Fejlhåndtering**

- Eksplicit håndtering af fejl fra API-kald og andre asynkrone handlinger.
- En tydelig forskel mellem tekniske fejloplysninger og forståelige fejlbeskeder til brugeren.

**UI-states og feedback**

- Relevante `loading`, `success`, `empty` og `error` states.
- Validering, forståelig feedback og et relevant næste skridt for brugeren.
- En brugerflade, der også giver mening ved langsomme svar, manglende data og fejl.

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>3. Accessibility og konsistent UI</strong></summary>

Området handler om en konsistent og tilgængelig brugeroplevelse og omfatter blandt andet:

- visuel konsistens i komponenter, formularer, feedback og interaktioner
- ensartet visning af datoer, tidspunkter, eventtyper, venues og adresser på tværs af løsningen
- semantisk HTML og et logisk heading-hierarki
- ARIA, når HTML ikke er tilstrækkeligt
- forståelige labels, linktekster, knapper og fejlbeskeder
- tastaturbetjening og synligt fokus
- passende alt-tekster samt labels og feedback i formularer
- `document.title` og fokus på den nye overskrift ved navigation i React SPA'en

Listen er et udgangspunkt. [React og Accessibility (a11y)](https://race.notion.site/React-og-Accessibility-a11y-302bc239db1180bba2b8c5bb9639664c) fungerer som en supplerende oversigt over andre relevante problemer.

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>4. Data og Supabase</strong></summary>

- Relaterede tabeller med primær- og fremmednøgler frem for gentagne eller uhensigtsmæssigt placerede data.
- Hentning og anvendelse af relaterede data gennem Supabase REST API.
- En tydelig klient–server-grænse, hvor React håndterer brugerfladen, mens Supabase leverer og gemmer data.
- Et begrundet valg mellem lokal søgning og filtrering i React eller forespørgsler til Supabase ud fra blandt andet datamængde, antal requests og brugeroplevelse.
- Eventtilmeldinger i en `registrations`-tabel, der forbindes med det valgte event gennem `eventId`.
- En React-løsning tilpasset den forbedrede datamodel med dataadgang adskilt fra præsentationslogik, hvor det giver mening.
- En intern side med relevante oplysninger om tilmeldinger og deres events.

Den forbedrede datamodel skal understøtte produktets vigtigste brugerflows og være lettere at vedligeholde.

**Frivillig udvidelse:** CRUD-funktionalitet til events kan indgå efter casens centrale forbedringer. Udvidelsen omfatter oprettelse, visning, redigering og sletning gennem React-løsningen og Supabase REST API samt validering, forståelige UI-states og tydelig bekræftelse ved eksempelvis sletning.

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>5. Performance</strong></summary>

**Måling og dokumentation**

- Lighthouse og browserens udviklerværktøjer som hjælp til at finde konkrete problemer.
- Sammenlignelig før- og efterdokumentation af relevante forbedringer.

**Data og requests**

- Omfanget og tidspunktet for Supabase-requests samt unødvendige eller gentagne datahentninger.

**Assets og indlæsning**

- Billeder med passende størrelse og format samt lazy loading, hvor det forbedrer indlæsningen.
- Oprydning i kode, assets og dependencies, som løsningen ikke bruger.
- Lazy loading af større side- eller route-komponenter med `React.lazy` og `Suspense`, når det kan forbedre den første indlæsning.

**Rendering**

- Unødvendige beregninger eller renderinger, når de har mærkbar betydning for løsningen.

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>6. Deployment</strong></summary>

- Et stabilt build samt korrekt konfiguration af environment variables og routing.
- Direkte links og genindlæsning af sider i den deployede løsning.
- Sammenhæng mellem den publicerede løsning og den seneste version på `main`.

</details>

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## Sådan arbejder du

### 1. Undersøg og prioritér

Kør først løsningen lokalt og gennemfør de vigtigste brugerflows. Brug [audit-skabelonen](https://eaaa.instructure.com/courses/30922/pages/teknisk-audit-af-en-react-losning) til at dokumentere problemer, konsekvenser og mulige løsninger. Prioritér derefter et realistisk antal forbedringer ud fra effekt, risiko, vedligeholdelse og den tid, du har.

### 2. Implementér

Arbejd med én sammenhængende forbedring ad gangen i en tydeligt navngivet feature branch. Brug forståelige commits, og arbejd ikke direkte på `main`. Historikken skal gøre det let for en anden udvikler at følge og overtage arbejdet.

### 3. Verificér

Vis, at dine vigtigste forbedringer virker. Brug relevant evidens, eksempelvis før/efter-skærmbilleder, et keyboard-flow, kontrollerede netværkskald, afprøvning af UI-states, en gennemført build eller en genindlæst route.

### 4. Saml og deploy

Merge færdige og verificerede forbedringer til `main`, og deploy den samlede løsning. Kontrollér til sidst de centrale brugerflows i den publicerede version.

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## Det skal du have klar efter Case 1

Når casen slutter, skal du have dokumentation og råmateriale, som senere kan bearbejdes til en kort caseside på din portfolio:

- link til det opdaterede GitHub-repository
- en tydelig historik med feature branches og forståelige commits
- link til den deployede løsning
- din tekniske audit og prioriterede optimeringsplan
- en kort beskrivelse af den forbedrede datamodel og dens relationer
- før- og efterevidens for udvalgte forbedringer
- en kort refleksion over væsentlige valg, fravalg og resterende udfordringer
- noter om produktets forretningspotentiale: hvilken værdi dine forbedringer kan skabe for Mellemrum og platformens brugere

For hver udvalgt forbedring skal du kunne forklare problemet, konsekvensen, løsningen og din verifikation. Beskriv også kort, hvilken værdi forbedringen kan skabe. Det kan eksempelvis være flere gennemførte tilmeldinger, færre fejl, en bredere brugergruppe eller en løsning, der er lettere at videreudvikle.

Materialet kan samles i repositoryets `README.md` eller i et særskilt arbejdsdokument. Det er ikke den endelige eksamensaflevering, og du skal udvælge og bearbejde det vigtigste, når du senere bygger portfoliosiden.

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## Materialer

- [Startprojekt: Mellemrum](https://github.com/cederdorff/mellemrum)
- [Se den udleverede Mellemrum-løsning](https://cederdorff.com/mellemrum/)
- [Teknisk audit af en React-løsning](https://eaaa.instructure.com/courses/30922/pages/teknisk-audit-af-en-react-losning)
- [Web App-forbedringer og teknisk fundament](https://eaaa.instructure.com/courses/30922/pages/race-product-optimization-web-app-forbedringer-og-teknisk-fundament-19-08-2026)
- [React og Accessibility (a11y)](https://race.notion.site/React-og-Accessibility-a11y-302bc239db1180bba2b8c5bb9639664c)

</div>
