# Case 1 – Fra prototype til produktionsklar React-løsning

<img src="https://images.unsplash.com/photo-1595146463222-19603449c6af?q=80&amp;w=1800&amp;auto=format&amp;fit=crop" alt="Byrum og arkitektur i Aarhus" style="display: block; width: 100%; max-height: 420px; object-fit: cover; object-position: center;">

<div style="background: #173f35; border-bottom: 6px solid #d8ff62; color: #ffffff; margin: 0 0 2rem; padding: 1.5rem 2rem;">
<p style="font-size: 2rem; font-weight: 800; letter-spacing: -0.04em; line-height: 1; margin: 0 0 0.75rem;">mellemrum<span style="color: #d8ff62;">.</span></p>
<p style="font-size: 1.1rem; line-height: 1.5; margin: 0;">Du overtager en eksisterende React-prototype og udvikler den til en mere robust, tilgængelig og vedligeholdelsesvenlig løsning.</p>
</div>

## Case 1 som del af eksamen

Case 1 er den første af tre mindre optimeringscases, som tilsammen danner grundlag for den individuelle skriftlige eksamen. Under casen samler du dokumentation og råmateriale – du skal ikke lave den endelige caseside endnu.

Efter den tredje case får du en uge til at bearbejde materialet og opdatere dit eksisterende portfolio website med én caseside for hver case.

Til eksamen afleverer du et dokument med links til de tre casesider. Det samlede skriftlige materiale på de tre sider må maksimalt fylde fem normalsider.

## Kunden og udfordringen

**Mellemrum** er en lokal kultur- og eventplatform, hvor brugerne kan finde og tilmelde sig koncerter, talks, workshops og andre arrangementer.

Virksomheden har fået udviklet en React-prototype. Den grundlæggende funktionalitet findes, men løsningen blev bygget hurtigt for at afprøve idéen. Koden er vanskelig at videreudvikle, brugeroplevelsen er ikke altid konsistent, og løsningen håndterer ikke langsomme svar, manglende data og fejl godt nok.

Data hentes fra Supabase gennem Supabase REST API. Datamodellen indeholder gentagne oplysninger, som bør fordeles på relaterede tabeller. Tilmeldingsflowet er kun påbegyndt: En tilmelding skal registreres i Supabase og forbindes med det valgte event. Den eksisterende interne side skal tilpasses, så den kan vise tilmeldinger sammen med deres relaterede eventdata.

## Din opgave

Du arbejder individuelt og overtager den eksisterende React-løsning. Undersøg prototypen, prioritér de vigtigste problemer, gennemfør relevante forbedringer, og verificér deres effekt. Målet er en mere robust, tilgængelig og vedligeholdelsesvenlig løsning, der er klar til deployment.

Det er ikke målet at ændre mest muligt. Det er vigtigere, at du finder betydningsfulde problemer, prioriterer dem fagligt og kan forklare værdien af dine forbedringer.

Det primære fokus er React og kodeforbedringer. Du må gerne forbedre identiteten og det visuelle lag, hvis du har tid, men det er ikke casens hovedopgave. Visuelle ændringer er relevante, når de eksempelvis styrker konsistens, accessibility, feedback eller robuste UI-states.

Du forventes ikke at kunne løse alle dele ved casens start. Vi arbejder med de nødvendige koncepter og teknikker undervejs.

## Faglige fokusområder

Case 1 bygger videre på [Web App-forbedringer og teknisk fundament](https://eaaa.instructure.com/courses/30922/pages/race-product-optimization-web-app-forbedringer-og-teknisk-fundament-19-08-2026). Brug det som løsningens baseline, og indarbejd og verificér de relevante forbedringer herfra.

### 1. React-optimering

- Skab et tydeligt flow mellem data, props og state.
- Undgå state, der gentager andre værdier eller kan beregnes ud fra eksisterende data.
- Tag udgangspunkt i konkrete problemer frem for at optimere for optimeringens skyld.

### 2. Robusthed og UI-states

- Håndtér relevante `loading`, `success`, `empty` og `error` states.
- Giv brugeren forståelig feedback og et relevant næste skridt.
- Lad ikke fejl ende som en tom brugerflade eller kun som en besked i konsollen.

### 3. Kodekvalitet

- Forbedr komponenternes opdeling, ansvar og navngivning.
- Reducér uhensigtsmæssige gentagelser, og skab konsistens i kode og UI.
- Organisér løsningen, så andre udviklere kan forstå og videreudvikle den.

### 4. Accessibility

Undersøg blandt andet:

- semantisk HTML og et logisk heading-hierarki
- ARIA, når HTML ikke er tilstrækkeligt
- forståelige labels, linktekster, knapper og fejlbeskeder
- tastaturbetjening og synligt fokus
- passende alt-tekster samt labels og feedback i formularer
- `document.title` og fokus på den nye overskrift ved navigation i React SPA'en

Listen er et udgangspunkt. Brug også [React og Accessibility (a11y)](https://race.notion.site/React-og-Accessibility-a11y-302bc239db1180bba2b8c5bb9639664c) til at undersøge andre relevante problemer.

### 5. Data og Supabase

- Find gentagne eller uhensigtsmæssigt placerede data, og opdel dem i relaterede tabeller med primær- og fremmednøgler.
- Hent og anvend de relaterede data gennem Supabase REST API.
- Vurdér, om søgning og filtrering skal ske lokalt i React eller gennem en forespørgsel til Supabase. Begrund valget ud fra eksempelvis datamængde, antal requests og brugeroplevelse.
- Registrér eventtilmeldinger i en `registrations`-tabel, der forbindes med det valgte event gennem `eventId`.
- Tilpas React-løsningen til den forbedrede datamodel, og hold så vidt muligt dataadgang adskilt fra præsentationslogik.
- Udvikl eller forbedr en intern side, der viser relevante oplysninger om tilmeldinger og deres events.

Den forbedrede datamodel skal understøtte produktets vigtigste brugerflows og være lettere at vedligeholde.

**Frivillig udvidelse:** Hvis du har tid efter casens centrale forbedringer, kan du udvide den interne del af løsningen med CRUD-funktionalitet til events. Det vil sige, at events kan oprettes, vises, redigeres og slettes gennem React-løsningen og Supabase REST API. Husk validering, forståelige UI-states og tydelig bekræftelse ved eksempelvis sletning.

### 6. Deployment

- Kontrollér build, konfiguration, environment variables og routing.
- Afprøv direkte links og genindlæsning af sider i den deployede løsning.
- Sørg for, at den publicerede løsning svarer til versionen på `main`.

## Sådan arbejder du

### 1. Undersøg og prioritér

Kør først løsningen lokalt og gennemfør de vigtigste brugerflows. Brug [audit-skabelonen](./teknisk-audit-skabelon.md) til at dokumentere problemer, konsekvenser og mulige løsninger. Prioritér derefter et realistisk antal forbedringer ud fra effekt, risiko, vedligeholdelse og den tid, du har.

### 2. Implementér

Arbejd med én sammenhængende forbedring ad gangen i en tydeligt navngivet feature branch. Brug forståelige commits, og arbejd ikke direkte på `main`. Historikken skal gøre det let for en anden udvikler at følge og overtage arbejdet.

### 3. Verificér

Vis, at dine vigtigste forbedringer virker. Brug relevant evidens, eksempelvis før/efter-skærmbilleder, et keyboard-flow, kontrollerede netværkskald, afprøvning af UI-states, en gennemført build eller en genindlæst route.

### 4. Saml og deploy

Merge færdige og verificerede forbedringer til `main`, og deploy den samlede løsning. Kontrollér til sidst de centrale brugerflows i den publicerede version.

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

## Materialer

- [Startprojekt: Mellemrum](https://github.com/cederdorff/mellemrum)
- [Teknisk audit af en React-løsning](https://eaaa.instructure.com/courses/30922/pages/teknisk-audit-af-en-react-losning)
- [Web App-forbedringer og teknisk fundament](https://eaaa.instructure.com/courses/30922/pages/race-product-optimization-web-app-forbedringer-og-teknisk-fundament-19-08-2026)
- [React og Accessibility (a11y)](https://race.notion.site/React-og-Accessibility-a11y-302bc239db1180bba2b8c5bb9639664c)
- Supabase-startdata: SQL-filen følger med startprojektet
- Dato for afslutning af Case 1: Tilføjes
