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

Virksomheden har fået udviklet en React-prototype. Den grundlæggende funktionalitet findes, men løsningen blev bygget hurtigt for at afprøve idéen. Koden er vanskelig at videreudvikle, brugeroplevelsen er ikke altid konsistent, og løsningen håndterer ikke langsomme svar, manglende data og fejl godt nok. Kunden nævner også, at der er udfordringer med performance.

Data hentes fra Supabase gennem Supabase REST API. Datamodellen indeholder gentagne oplysninger, som bør fordeles på relaterede tabeller. Tilmeldingsflowet er kun påbegyndt: En tilmelding skal registreres i Supabase og forbindes med det valgte event. Den eksisterende interne side skal tilpasses, så den kan vise tilmeldinger sammen med deres relaterede eventdata.

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## Din opgave

Du arbejder individuelt og overtager den eksisterende React-løsning. Undersøg prototypen, prioritér de vigtigste problemer, gennemfør relevante forbedringer, og verificér deres effekt. Målet er en mere robust, tilgængelig og vedligeholdelsesvenlig løsning, der er klar til deployment.

Det er ikke målet at ændre mest muligt. Det er vigtigere, at du finder betydningsfulde problemer, prioriterer dem fagligt og kan forklare værdien af dine forbedringer.

Det primære fokus er React og kodeforbedringer. Du må gerne forbedre identiteten og det visuelle lag, men det er ikke casens hovedopgave. Visuelle ændringer er relevante, når de eksempelvis styrker konsistens, accessibility, feedback, robuste UI-states eller fjerner "template-kode".

Du forventes ikke at kunne løse alle dele ved casens start. Vi arbejder med de nødvendige koncepter og teknikker undervejs i undervisningen. Men det forventes at du arbejder udover den skemalagte undervisning i perioden.

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## Faglige fokusområder

Case 1 bygger videre på [Web App-forbedringer og teknisk fundament](https://eaaa.instructure.com/courses/30922/pages/race-product-optimization-web-app-forbedringer-og-teknisk-fundament-19-08-2026). Relevante forbedringer herfra indgår og verificeres i den samlede løsning.

Fokusområderne er en ramme for din undersøgelse – ikke en tjekliste, hvor alle punkter skal implementeres. Du skal forholde dig til områderne, men prioritere de forbedringer, der har størst betydning for den konkrete løsning. Det beskrevne tilmeldingsflow og en fungerende deployment er centrale krav; de øvrige punkter hjælper dig med at finde, begrunde og verificere relevante forbedringer.

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>1. React-arkitektur og kodekvalitet</strong></summary>

**Struktur og navngivning**

- Tydelig og konsekvent navngivning af mapper, filer, komponenter, funktioner, props og variabler.
- En gennemskuelig mappestruktur og arkitektur, som andre udviklere kan forstå og videreudvikle.

**Komponenter og ansvar**

- En tydelig ansvarsfordeling mellem pages, komponenter, funktioner og dataadgang (_separation of concerns_).
- Komponenter med ét forståeligt hovedansvar (_single responsibility_) og større interfaces sammensat af mindre komponenter (_component composition_).
- Gentaget logik, eksempelvis formatering af datoer og tidspunkter, samlet i funktioner eller hooks, når det gør koden tydeligere og lettere at vedligeholde.

**State og dataflow**

- Et tydeligt, ensrettet flow mellem data, props og state.
- Én tydelig kilde til data (_single source of truth_) og _derived state_, som beregnes ud fra eksisterende data.

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>2. Robusthed, fejlhåndtering og UI-states</strong></summary>

**Datahentning og side effects**

- _Side effects_ som datahentning placeret tydeligt og adskilt fra selve renderingen.

**Fejlhåndtering**

- Eksplicit håndtering af fejl fra API-kald og andre asynkrone handlinger.
- En tydelig forskel mellem tekniske fejloplysninger og forståelige fejlbeskeder til brugeren.

**UI-states og feedback**

- Relevante `loading`, `success`, `empty` og `error` states.
- Validering, forståelig feedback og et relevant næste skridt for brugeren.
- En UI, der også giver mening ved langsomme svar, manglende data og fejl.

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>3. UI-konsistens og accessibility</strong></summary>

Områderne understøtter begge en bedre brugeroplevelse, men vurderes som to forskellige kvaliteter.

**UI-konsistens**

- Konsistente komponenter, formularer, feedbackmønstre og interaktioner.
- Ensartet visning af datoer, tidspunkter, eventtyper, venues og adresser på tværs af løsningen.
- Genbrug af fælles UI-komponenter og formateringslogik, hvor det giver mening.

**Accessibility**

- Semantisk HTML og et logisk heading-hierarki.
- ARIA, når semantisk HTML ikke er tilstrækkeligt.
- Forståelige labels, linktekster, knapper og fejlbeskeder.
- Tastaturbetjening og synligt fokus.
- Passende alt-tekster samt tilgængelige formularer og feedback.
- Opdatering af `document.title` og fokus på den nye overskrift ved navigation i React SPA'en (`myRef.current?.focus()`).

Listen er eksempler. Der findes flere detaljerede informationer her: [React og Accessibility (a11y)](https://race.notion.site/React-og-Accessibility-a11y-302bc239db1180bba2b8c5bb9639664c)

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>4. Datamodel, relationer og Supabase</strong></summary>

Målet er en datamodel, der understøtter produktets vigtigste brugerflows uden unødig duplikering, samt en tydelig dataadgang mellem React og Supabase.

**Datamodel og relationer**

- Modellér `events`, `venues` og `registrations` som relaterede data frem for at gentage de samme oplysninger flere steder.
- Brug tydelige og konsekvente navne, relevante datatyper samt primær- og fremmednøgler.
- Begrund de valgte relationer, og forklar, hvordan de gør data lettere at vedligeholde.

**Tilmeldingsflow**

- Gem en gennemført eventtilmelding i `registrations`, og forbind den med det valgte event gennem en fremmednøgle.
- Tilpas den interne side, så den henter og viser tilmeldinger sammen med relevante data om deres events.
- Kontrollér, at en ny tilmelding både gemmes korrekt i Supabase og vises korrekt i løsningen.

**Dataadgang i React**

- Organisér forespørgsler og mutationer konsistent, og adskil dataadgang fra præsentationslogik, hvor det forbedrer overblikket.
- Hent og anvend relaterede data gennem Supabase REST API, og hent kun de felter, brugergrænsefladen har brug for.
- Undgå unødvendige eller gentagne requests.
- Begrund, om søgning og filtrering skal ske lokalt i React eller gennem Supabase ud fra blandt andet datamængde, antal requests og brugeroplevelse.

**Frivillig udvidelse:** CRUD-funktionalitet til events kan indgå efter casens centrale forbedringer. Udvidelsen omfatter oprettelse, visning, redigering og sletning gennem React-løsningen og Supabase REST API samt validering, forståelige UI-states og tydelig bekræftelse ved eksempelvis sletning.

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>5. Performance</strong></summary>

**Måling og dokumentation**

- Lighthouse og browserens udviklerværktøjer som hjælp til at finde konkrete problemer.
- En baseline før forbedringen og en ny måling efter forbedringen.
- Før- og eftermålinger på deployede produktionsversioner under sammenlignelige forhold. En lokal development-version må ikke sammenlignes direkte med den deployede løsning.
- Gentagne målinger og dokumentation af de vigtigste testforhold, så konklusionen ikke bygger på en enkelt Lighthouse-score.

**Data og requests**

- Omfanget og tidspunktet for Supabase-requests samt unødvendige eller gentagne datahentninger.
- Kontrol i en production build eller den deployede løsning, så React Strict Mode i development ikke fejltolkes som et produktionsproblem.

**Assets og indlæsning**

- Billeder med passende størrelse og format samt lazy loading, hvor det forbedrer indlæsningen.
- Oprydning i kode, assets og dependencies, som løsningen ikke bruger.
- Lazy loading af større side- eller route-komponenter med `React.lazy` og `Suspense`, når det kan forbedre den første indlæsning.

**Rendering**

- Unødvendige beregninger eller renderinger, når de har mærkbar betydning for løsningen.

</details>

<details style="background: #f5f2ea; border: 1px solid #e9e3d6; margin: 0 0 0.75rem; padding: 0.85rem 1rem;">
<summary><strong>6. Deployment</strong></summary>

**Build og konfiguration**

- Et stabilt production build uden fejl.
- Korrekt konfiguration af environment variables, routing og projektets base URL.
- Sammenhæng mellem base URL'en, hostingens adresse og eventuelle undermapper, så routes og filer får korrekte stier.

**Kontrol af den publicerede løsning**

- Gennemfør de centrale brugerflows på den deployede version – ikke kun lokalt.
- Åbn centrale routes via direkte links, og kontrollér, at de også virker efter genindlæsning.
- Kontrollér, at billeder, fonte, stylesheets, scripts og andre assets indlæses fra korrekte stier.
- Afprøv interne og eksterne links, herunder navigation på tværs af routes.
- Undersøg browserens konsol og Network-panel for blandt andet JavaScript-fejl, fejlede requests og `404`-svar.
- Kontrollér, at den publicerede løsning svarer til den seneste version på `main`.

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
- link til den deployede løsning
- historik med feature branches og forståelige commits
- din tekniske audit og prioriterede optimeringsplan
- en kort beskrivelse af den forbedrede datamodel og dens relationer
- før- og efterevidens for udvalgte forbedringer
- en kort refleksion over væsentlige valg, fravalg og resterende udfordringer
- noter om produktets forretningspotentiale: hvilken værdi dine forbedringer kan skabe for Mellemrum og platformens brugere

For hver udvalgt forbedring skal du kunne forklare problemet, konsekvensen, løsningen og din verifikation. Beskriv også kort, hvilken værdi forbedringen kan skabe. Det kan eksempelvis være flere gennemførte tilmeldinger, færre fejl, en bredere brugergruppe eller en løsning, der er lettere at videreudvikle.

Materialet kan samles i repositoryets `README.md` eller i et særskilt arbejdsdokument. Det er ikke den endelige eksamensaflevering. Du skal udvælge og bearbejde det vigtigste, når du senere bygger casesiden på din portfolio.

<hr style="border: 0; border-top: 1px solid #e9e3d6; margin: 3rem 0;">

## Materialer

- [GitHub Repo - Startprojekt: Mellemrum](https://github.com/cederdorff/mellemrum)
- [Deployet nuværende løsning - Startprojekt: Mellemrum](https://cederdorff.com/mellemrum/)
- [Teknisk audit af en React-løsning](https://eaaa.instructure.com/courses/30922/pages/teknisk-audit-af-en-react-losning)
- [Web App-forbedringer og teknisk fundament](https://eaaa.instructure.com/courses/30922/pages/race-product-optimization-web-app-forbedringer-og-teknisk-fundament-19-08-2026)
- [React og Accessibility (a11y)](https://race.notion.site/React-og-Accessibility-a11y-302bc239db1180bba2b8c5bb9639664c)

</div>
