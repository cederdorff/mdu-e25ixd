# Case 1 – arbejdsnoter

> Status: Udkast til videre udvikling. Dokumentet samler idéer og beslutninger til den første af eksamensforløbets tre cases.

Studenterrettet udkast: [Case 1 – Fra prototype til produktionsklar React-løsning](./case-1-casebrief.md)

## Fagligt fokus

Case 1 omhandler:

- React-optimering
- Robusthed og UI-states
- Kodekvalitet
- Accessibility
- Data og Supabase
- Deployment

De studerende arbejder individuelt med en eksisterende React-løsning. Deres opgave er at undersøge, prioritere, optimere og videreudvikle løsningen.

## Grundidé

En mindre virksomhed har fået udviklet en React-prototype, som endnu ikke er klar til lancering. Den centrale brugerrejse fungerer, men løsningen bærer præg af at være udviklet hurtigt som en MVP:

- Komponenterne er ikke opdelt hensigtsmæssigt, og enkelte komponenter har for mange ansvarsområder.
- State og rendering håndteres nogle steder uhensigtsmæssigt.
- Design, komponenter og brugerfeedback er ikke konsekvente.
- Løsningen er ikke tilstrækkeligt optimeret for accessibility.
- Fejlhåndtering, loading states og empty states mangler eller er kun løst overfladisk.
- Data hentes fra Supabase gennem Supabase REST API.
- Datamodellen er ikke struktureret hensigtsmæssigt og indeholder data, som burde være fordelt på flere relaterede tabeller.
- Løsningen er ikke gjort ordentligt klar til deployment.

Problemerne skal hænge naturligt sammen frem for at ligne isolerede øvelser. De studerende skal overtage løsningen og gøre den mere robust, tilgængelig, vedligeholdelsesvenlig og produktionsklar.

## Kunde og kontekst

Casen kan knyttes til en fiktiv kunde, så opgaven får en realistisk kontekst, uden at vi er bundet af en virkelig kundes systemer og ønsker.

### Foreløbigt forslag: Mellemrum

**Mellemrum** er en lokal kultur- og eventplatform, der hjælper brugere med at finde koncerter, talks, workshops og andre arrangementer. Virksomheden har fået udviklet en første React-prototype og ønsker nu at lancere løsningen offentligt.

Den eksisterende løsning kan indeholde:

- en forside med kommende arrangementer
- søgning og filtrering
- kort med arrangementer
- en detaljeside for det enkelte arrangement
- favoritter eller tilmelding
- data fra Supabase gennem Supabase REST API
- routing mellem siderne

Event- og oplevelsesdomænet giver naturligt mulighed for at arbejde med lister, filtrering, billeder, data, navigation og forskellige UI-states.

## Foreløbig caseformulering

> I er blevet bedt om at gennemgå og videreudvikle en eksisterende React-løsning. I skal identificere væsentlige problemer, prioritere jeres indsats og dokumentere, hvordan jeres ændringer forbedrer løsningen for både brugerne og den virksomhed, der skal arbejde videre med den.

De studerende skal ikke blot rette en række på forhånd udpegede fejl. De skal tage ansvar for løsningens samlede kvalitet og kunne begrunde deres prioriteringer og valg.

## Faglige arbejdsområder

### 1. React-optimering

Undersøg state, rendering og dataflow. Foretag relevante optimeringer dér, hvor de skaber en reel forbedring.

Mulige fokuspunkter:

- placering og håndtering af state
- oplysninger gemt i flere state-variabler, selvom de beskriver det samme
- afledt state, der kan beregnes ud fra eksisterende data
- unødvendige opdateringer som følge af uhensigtsmæssig state
- gentagne beregninger under rendering
- props og dataflow
- konkrete observationer før en optimering
- `memo`, `useMemo` og `useCallback` er ikke en del af casens forventede niveau

### 2. Robusthed og UI-states

Løsningen skal kunne håndtere andet end det forventede succesforløb.

Mulige fokuspunkter:

- loading states
- error states
- empty states
- success states
- langsomme svar
- manglende eller ufuldstændige data
- uventede brugerhandlinger
- tydelig feedback og mulige næste handlinger

### 3. Kodekvalitet

Koden skal være lettere at forstå, vedligeholde og videreudvikle.

Mulige fokuspunkter:

- passende komponentinddeling
- tydelig navngivning
- genbrug af komponenter og logik
- fjernelse af gentagelser
- overskuelig filstruktur
- oprydning i debugging-kode og gamle filer
- konsistent kode og ansvar
- ensartet komponentbrug og brugerfeedback
- visuelle rettelser, når de understøtter konsistens, accessibility eller robuste UI-states
- redesign og større arbejde med identitet er sekundært og kun relevant, hvis den studerende har tid

### 4. Accessibility

Løsningen skal kunne anvendes af flere brugere og med forskellige input- og hjælpemidler.

Mulige fokuspunkter:

- semantisk HTML
- tastaturbetjening
- synligt og logisk fokus
- formularfelter og labels
- alternativ tekst til billeder
- tilgængelige fejlmeddelelser og statusbeskeder
- overskriftsstruktur
- kontrast og læsbarhed

### 5. Data og Supabase

Løsningen skal have en tydelig og stabil håndtering af data.

Mulige fokuspunkter:

- data hentet gennem Supabase REST API
- API-kald og datahåndtering
- unødvendige eller gentagne requests
- validering og normalisering af data
- håndtering af manglende værdier
- analyse af en uhensigtsmæssig, flad datamodel
- opdeling af data i relevante tabeller
- relationer mellem eksempelvis arrangementer, kategorier, venues og arrangører
- tilpasning af forespørgsler og React-kode til den forbedrede datamodel

### 6. Deployment

Løsningen skal kunne bygges, konfigureres og fungere stabilt i et produktionsmiljø.

Mulige fokuspunkter:

- miljøvariabler
- konfiguration uden hardcodede adresser
- produktionsbuild
- routing ved direkte links og genindlæsning
- deployment af den færdige løsning

## Problemer, der kan bygges ind i startprojektet

Startprojektet skal føles som en rigtig, lidt forsømt løsning – ikke som en samling isolerede skolefejl.

Mulige indbyggede problemer:

- En meget stor `HomePage` med flere forskellige ansvarsområder.
- Uhensigtsmæssig komponentopdeling og komponenter med for mange ansvarsområder.
- Gentaget markup og gentaget logik.
- Visuelle komponenter, der løser samme opgave på forskellige måder.
- Inkonsistente afstande, farver, knapper, kort og feedbackmønstre.
- Forkerte eller manglende `key`-værdier.
- State, der kunne udledes af anden state eller eksisterende data.
- Filtrering og sortering direkte under rendering.
- Unødvendige eller gentagne API-kald.
- Manglende eller utilstrækkelige loading-, error- og empty states.
- Komponenter, der går i stykker ved manglende værdier.
- Klikbare `div`-elementer i stedet for semantiske elementer.
- Formularfelter uden tilknyttede labels.
- Manglende eller dårlig fokusmarkering.
- Billeder uden meningsfuld alternativ tekst.
- Fejlmeddelelser, der kun vises i konsollen.
- API-adresser hardcodet direkte i komponenterne.
- En enkelt Supabase-tabel med gentagne værdier og felter, der med fordel kan flyttes til relaterede tabeller.
- Forespørgsler og komponenter, der er tæt koblet til den uhensigtsmæssige datamodel.
- Problemer ved genindlæsning af en route efter deployment.
- Utydelige navne, gamle filer og efterladt debugging-kode.

Nogle problemer skal være forholdsvis tydelige. Andre skal de studerende selv opdage gennem test, React DevTools, Lighthouse og gennemlæsning af koden.

## Mulige afleveringsprodukter

Afleveringen kan holdes enkel og bestå af:

- link til den deployede løsning
- link til repository
- en tydelig historik med afgrænsede feature branches og forståelige commits
- en kort kvalitetsrapport eller dokumentation i `README.md`
- dokumentation af de vigtigste fund og prioriteringer
- før- og eftereksempler på udvalgte forbedringer
- en kort refleksion over fravalg og resterende udfordringer

De studerende skal ikke bedømmes på antallet af ændringer, men på deres evne til at finde, prioritere, implementere og forklare relevante forbedringer.

## Mulig arbejdsproces

1. Undersøg den udleverede løsning.
2. Identificér problemer og forbedringsmuligheder.
3. Prioritér arbejdet ud fra effekt, risiko og den tilgængelige tid.
4. Dokumentér løsningens udgangspunkt.
5. Implementér hver sammenhængende forbedring i en afgrænset feature branch med forståelige commits.
6. Merge færdige og verificerede branches til `main`.
7. Deploy løsningen.
8. Dokumentér effekten og begrund de vigtigste valg og fravalg.

## Principper for casen

- Casen skal have et troværdigt produkt- og kundeperspektiv.
- Det primære fokus skal være React og kodeforbedringer, der optimerer løsningen.
- Identitet og større visuelle forbedringer er sekundære, mens konsistens, accessibility og tydelig brugerfeedback fortsat er en del af kerneopgaven.
- Der skal være plads til forskellige fagligt forsvarlige løsninger.
- De studerende skal undersøge og prioritere – ikke blot følge en facitliste.
- De studerende forventes ikke at kunne løse alle dele ved casens start; de nødvendige koncepter og teknikker introduceres undervejs.
- React-optimering skal tage udgangspunkt i observerede problemer frem for tilfældig brug af optimeringsteknikker.
- Tilgængelighed, robusthed og datahåndtering skal være en del af produktets kvalitet, ikke løsrevne ekstraopgaver.
- Dokumentation skal vise sammenhængen mellem problem, beslutning, ændring og effekt.
- Feature branches og commits skal gøre udviklingen let at følge og overtage for andre udviklere.

## Åbne beslutninger

- Skal kunden være helt fiktiv, eller skal casen placeres i konteksten af en eksisterende virksomhed?
- Skal **Mellemrum** og eventplatformen være den endelige retning?
- Hvilken eksisterende funktionalitet skal startprojektet indeholde?
- Hvordan skal Supabase-projektet udleveres og administreres under casen?
- Skal alle arbejde i deres eget Supabase-projekt, eller skal der anvendes en fælles read-only startdatabase?
- Hvor meget af arbejdet med tabeller, relationer og migrering af eksisterende data skal de studerende selv udføre?
- Hvilke Supabase REST-forespørgsler og relationer forventes de at kunne arbejde med?
- Hvor lang tid får de studerende til casen?
- Hvilke krav er obligatoriske, og hvilke er mulige udvidelser?
- Hvordan skal casen indgå i det samlede eksamensforløb og vurderingsgrundlag?
- Hvilke værktøjer og målinger forventes de at anvende?
- Hvor stor en del af problemerne skal være bevidst indbygget og dokumenteret for underviseren?

## Næste skridt

- Beslut kunde, produkt og den centrale brugerrejse.
- Afgræns startprojektets funktionalitet.
- Beslut caseperiodens længde og arbejdsform.
- Formulér læringsmål og obligatoriske krav.
- Videreudvikl og færdiggør den studenterrettede casebrief.
- Planlæg startprojektets indbyggede problemer og underviserens facit-/observationsliste.
- Fastlæg afleveringsform og kriterier for feedback eller bedømmelse.
