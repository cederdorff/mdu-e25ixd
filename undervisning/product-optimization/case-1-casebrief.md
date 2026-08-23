# Case 1 – Fra prototype til produktionsklar React-løsning

> Status: Første udkast til studenterrettet casebrief.

## Kunden

**Mellemrum** er en lokal kultur- og eventplatform, der hjælper brugerne med at finde koncerter, talks, workshops og andre arrangementer.

Virksomheden har fået udviklet en første React-prototype. Den viser arrangementer og gør det muligt at udforske platformens indhold, men løsningen blev udviklet hurtigt for at afprøve idéen. Mellemrum ønsker nu at gøre produktet klar til rigtige brugere og til den videre udvikling af platformen.

## Situationen

Prototypen fungerer, når alt går som forventet, men kvaliteten er ujævn. Virksomheden oplever blandt andet, at løsningen er vanskelig at videreudvikle, at brugeroplevelsen ikke altid er konsistent, og at den ikke håndterer langsomme svar, manglende data og fejl godt nok.

Data hentes fra Supabase gennem Supabase REST API. Den nuværende datamodel blev oprettet hurtigt og indeholder gentagne oplysninger, som gør data vanskelige at vedligeholde. Nogle oplysninger bør i stedet fordeles på relaterede tabeller.

Mellemrum har derfor brug for, at du undersøger den eksisterende løsning og prioriterer de forbedringer, der har størst betydning for brugerne og for den videre udvikling af produktet.

## Din opgave

Du arbejder individuelt og overtager den eksisterende React-løsning. Din opgave er at gøre løsningen mere robust, tilgængelig, vedligeholdelsesvenlig og klar til deployment.

Du skal:

1. undersøge og dokumentere løsningens nuværende tilstand
2. identificere og prioritere væsentlige problemer
3. gennemføre relevante forbedringer
4. verificere effekten af dine ændringer
5. dokumentere de vigtigste valg, fravalg og resultater

Det er ikke målet at ændre mest muligt. Det er vigtigere, at du finder betydningsfulde problemer, prioriterer dem fagligt og kan forklare, hvordan dit arbejde forbedrer produktet.

Det primære fokus er React og kodeforbedringer, der optimerer løsningen. Du må gerne forbedre identiteten og det visuelle lag, hvis du har tid, men det er ikke casens hovedopgave. Visuelle ændringer er især relevante, når de understøtter konsistens, accessibility, feedback eller robuste UI-states.

Du forventes ikke at kunne løse alle dele ved casens start. Vi arbejder med de nødvendige koncepter og teknikker undervejs i forløbet.

Dit arbejde skal samtidig være let at følge og overtage. Repositoryets feature branches og commits skal derfor vise, hvordan løsningen har udviklet sig fra det oprindelige problem til den færdige forbedring.

## Faglige fokusområder

### 1. React-optimering

Undersøg løsningens state, props og dataflow. Se blandt andet efter oplysninger, der er gemt i flere `useState`-variabler, selvom de beskriver det samme, eller state, der kan beregnes ud fra eksisterende data. Den slags kan skabe unødvendige opdateringer og gøre løsningen vanskeligere at holde konsistent.

Optimering skal tage udgangspunkt i et konkret problem eller en observation. Du forventes ikke at bruge `memo`, `useMemo` eller `useCallback` i denne case.

### 2. Robusthed og UI-states

Løsningen skal også fungere, når data er forsinkede, mangler eller ikke kan hentes.

Arbejd med relevante tilstande som:

- loading
- success
- empty
- error

Brugeren skal have forståelig feedback og et relevant næste skridt. Tekniske fejl må ikke blot ende i konsollen eller efterlade en tom brugerflade.

### 3. Kodekvalitet

Undersøg komponentstruktur, ansvar, navngivning og gentagelser. Refaktorér dér, hvor det giver en kodebase, der er lettere at forstå, vedligeholde og videreudvikle.

Skab konsistens i komponenterne og den måde, UI'et giver feedback på. Du må gerne rette visuelle forskelle, der udspringer af inkonsistent kode eller komponentbrug, men du forventes ikke at redesigne hele produktet.

### 4. Accessibility

Forbedr løsningens accessibility. Centrale brugerflows skal blandt andet kunne forstås og anvendes med semantisk HTML, tastatur og tydeligt fokus. Formularer, billeder og dynamiske statusbeskeder skal være tilgængelige, hvor de indgår i løsningen.

### 5. Data og Supabase

Undersøg den eksisterende datamodel og de steder, hvor React-løsningen henter og anvender data.

Du skal arbejde med at:

- finde gentagne eller uhensigtsmæssigt placerede data
- opdele relevante data i flere tabeller
- etablere meningsfulde relationer med primær- og fremmednøgler
- hente de relaterede data fra Supabase
- undgå unødvendige eller gentagne requests
- tilpasse React-løsningen til den forbedrede datamodel
- organisere dataadgangen, så den ikke er unødigt blandet sammen med præsentationslogikken

Den forbedrede datamodel skal understøtte produktets vigtigste brugerflows og være lettere at vedligeholde.

Du forventes ikke at kunne arbejde med primærnøgler, fremmednøgler og relationer fra casens første dag. Vi arbejder med begreberne og den praktiske implementering i undervisningen undervejs.

### 6. Deployment

Den færdige løsning skal kunne bygges og deployes stabilt. Kontrollér blandt andet konfiguration, environment variables, routing, direkte links og genindlæsning af sider.

Den publicerede løsning skal svare til den version, der findes på `main`.

## Arbejdsproces

### 1. Skab en baseline

Kør løsningen lokalt og gennemfør de vigtigste brugerflows, før du ændrer koden. Dokumentér relevante observationer med eksempelvis skærmbilleder, konkrete komponenter, konsolfejl, netværkskald og accessibility-tests.

### 2. Gennemfør en teknisk audit

Undersøg løsningen inden for casens faglige områder. Beskriv de problemer, du finder, deres konsekvens og et muligt løsningsforslag.

### 3. Prioritér

Vurdér fundene ud fra:

- betydningen for brugeren
- risikoen for fejl eller dårlige brugeroplevelser
- betydningen for vedligeholdelse og videreudvikling
- forventet effekt i forhold til indsatsen
- den tid, du har til rådighed

Udvælg derefter et realistisk antal forbedringer.

### 4. Implementér og verificér

Arbejd med én sammenhængende forbedring ad gangen i en tydeligt navngivet feature branch. Opdel arbejdet i forståelige commits, og kontrollér løbende, at den eksisterende funktionalitet stadig virker.

Verificér de vigtigste forbedringer med relevant evidens. Det kan eksempelvis være et keyboard-flow, et kontrolleret netværkskald, en gennemført build, en genindlæst route, et før/efter-skærmbillede eller en afprøvning af loading-, empty- og error states.

### 5. Saml arbejdet og deploy

Når en forbedring er færdig og verificeret, skal du merge din feature branch til `main`.

Arbejd ikke direkte på `main`. Målet er, at en anden udvikler kan følge ændringerne og arbejde videre på løsningen uden først at skulle rekonstruere din proces.

## Det skal du aflevere

Den foreløbige aflevering består af:

- link til det opdaterede GitHub-repository
- en tydelig historik med feature branches og forståelige commits
- link til den deployede løsning
- din tekniske audit og prioriterede optimeringsplan
- en kort beskrivelse af den forbedrede datamodel og dens relationer
- før- og efterdokumentation for udvalgte forbedringer
- en kort refleksion over væsentlige valg, fravalg og resterende udfordringer

Dokumentationen kan samles i repositoryets `README.md` eller i et særskilt dokument, hvis andet ikke aftales.

## Hvad skal din dokumentation vise?

For hver udvalgt forbedring skal du så vidt muligt kunne svare på:

1. Hvordan fungerede løsningen før?
2. Hvilket problem fandt du, og hvilken konsekvens havde det?
3. Hvad ændrede du – og hvorfor?
4. Hvordan har du verificeret forbedringen?
5. Hvad er endnu ikke løst?

## Vurdering af arbejdet

Der lægges især vægt på, om du:

- kan undersøge en eksisterende løsning systematisk
- kan prioritere ud fra effekt frem for personlige præferencer
- kan anvende React og JavaScript på en fagligt begrundet måde
- kan skabe robuste og tilgængelige brugeroplevelser
- kan forbedre en datamodel og arbejde med relationer
- kan skrive kode, som andre kan forstå og arbejde videre med
- kan strukturere feature branches og commits, så udviklingen er tydelig og kan overtages af andre
- kan deploye og kvalitetssikre den samlede løsning
- kan dokumentere og forklare dine beslutninger og deres effekt

## Materialer

- Startprojekt: Tilføjes
- Teknisk audit-skabelon: [Teknisk audit af en React-løsning](./teknisk-audit-skabelon.md)
- Supabase-projekt og data: Tilføjes
- Afleveringssted og deadline: Tilføjes
