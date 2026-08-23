# Case 1 – Fra prototype til produktionsklar React-løsning

## Case 1 som del af eksamen

Case 1 er den første af tre mindre optimeringscases, som tilsammen danner grundlag for den individuelle skriftlige eksamen.

Du skal ikke lave den endelige portfolioside under denne case. Efter den tredje case får du en uge til at bearbejde dit materiale og opdatere dit eksisterende portfolio website med én case-/produktside for hver case.

Til eksamen afleverer du et dokument med links til de tre casesider. Det samlede skriftlige materiale på de tre sider må maksimalt fylde fem normalsider.

## Kunden og udfordringen

**Mellemrum** er en lokal kultur- og eventplatform, hvor brugerne kan finde og tilmelde sig koncerter, talks, workshops og andre arrangementer.

Virksomheden har fået udviklet en React-prototype. Den grundlæggende funktionalitet findes, men løsningen blev bygget hurtigt for at afprøve idéen. Koden er vanskelig at videreudvikle, brugeroplevelsen er ikke altid konsistent, og løsningen håndterer ikke langsomme svar, manglende data og fejl godt nok.

Data hentes fra Supabase gennem Supabase REST API. Datamodellen indeholder gentagne oplysninger, som bør fordeles på relaterede tabeller. Når en bruger tilmelder sig et event, skal tilmeldingen registreres i Supabase. Mellemrum har også brug for en intern side med et overblik over tilmeldinger og de tilhørende events.

Din opgave er at undersøge prototypen, prioritere de vigtigste problemer og gøre løsningen mere robust, tilgængelig, vedligeholdelsesvenlig og klar til deployment.

## Din opgave

Du arbejder individuelt med den eksisterende React-løsning. Du skal:

1. gennemføre en teknisk audit og dokumentere løsningens udgangspunkt
2. identificere og prioritere problemer med betydning for brugerne og produktet
3. gennemføre relevante forbedringer
4. verificere effekten af de vigtigste ændringer
5. dokumentere dine valg, fravalg og resultater

Det er ikke målet at ændre mest muligt. Det er vigtigere, at du finder betydningsfulde problemer, prioriterer dem fagligt og kan forklare værdien af dine forbedringer.

Det primære fokus er React og kodeforbedringer. Du må gerne forbedre identiteten og det visuelle lag, hvis du har tid, men det er ikke casens hovedopgave. Visuelle ændringer er relevante, når de eksempelvis styrker konsistens, accessibility, feedback eller robuste UI-states.

Du forventes ikke at kunne løse alle dele ved casens start. Vi arbejder med de nødvendige koncepter og teknikker undervejs.

## Faglige fokusområder

Case 1 bygger videre på [Web App-forbedringer og teknisk fundament](./race-01-2026-08-19-web-app-forbedringer-og-teknisk-fundament.md). Indarbejd og verificér de relevante forbedringer herfra, eksempelvis environment variables, deployment, routing, metadata, oprydning af template-rester og accessibility.

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

- Find gentagne eller uhensigtsmæssigt placerede data.
- Opdel relevante data i tabeller med meningsfulde primær- og fremmednøgler.
- Hent og anvend relaterede data gennem Supabase REST API.
- Registrér eventtilmeldinger i en `registrations`-tabel, der forbindes med det valgte event gennem `event_id`.
- Tilpas React-løsningen til den forbedrede datamodel, og hold så vidt muligt dataadgang adskilt fra præsentationslogik.
- Udvikl eller forbedr en intern side, der viser relevante oplysninger om tilmeldinger og deres events.

Den forbedrede datamodel skal understøtte produktets vigtigste brugerflows og være lettere at vedligeholde. Vi arbejder med relationer og den praktiske implementering undervejs i undervisningen.

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

Når casen slutter, skal du have dokumentation og råmateriale, som senere kan bearbejdes til en kort case-/produktside på din portfolio:

- link til det opdaterede GitHub-repository
- en tydelig historik med feature branches og forståelige commits
- link til den deployede løsning
- din tekniske audit og prioriterede optimeringsplan
- en kort beskrivelse af den forbedrede datamodel og dens relationer
- før- og efterevidens for udvalgte forbedringer
- en kort refleksion over væsentlige valg, fravalg og resterende udfordringer
- noter om produktets forretningspotentiale og værdien af dine forbedringer

For hver forbedring skal du kunne forklare problemet, konsekvensen, din løsning og den måde, du verificerede resultatet på. Kobl også arbejdet til produktets værdi: eksempelvis en bedre brugeroplevelse, færre fejl, lettere videreudvikling eller et mere pålideligt tilmeldingsflow.

Materialet kan samles i repositoryets `README.md` eller i et særskilt arbejdsdokument. Det er ikke den endelige eksamensaflevering, og du skal udvælge og bearbejde det vigtigste, når du senere bygger portfoliosiden.

## Materialer

- Startprojekt: Tilføjes
- [Teknisk audit af en React-løsning](./teknisk-audit-skabelon.md)
- [Web App-forbedringer og teknisk fundament](./race-01-2026-08-19-web-app-forbedringer-og-teknisk-fundament.md)
- [React og Accessibility (a11y)](https://race.notion.site/React-og-Accessibility-a11y-302bc239db1180bba2b8c5bb9639664c)
- Supabase-projekt og data: Tilføjes
- Dato for afslutning af Case 1: Tilføjes
