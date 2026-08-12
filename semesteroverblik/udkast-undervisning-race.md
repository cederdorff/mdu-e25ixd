# Planlægningsnoter til RACE-undervisning på 3. semester

Dette er et arbejdsdokument til at udvikle semesterets tekniske progression, undervisningsgange og øvelser. De studenterrettede beskrivelser ligger under [`undervisning/`](../undervisning/).

## 1. Retning for 3. semester

### Faglige mål

På 3. semester skal de studerende:

- samle op på React, webapps og basal JavaScript
- optimere og bygge videre på det, de allerede kan
- blive bedre til at strukturere, læse, forklare og vedligeholde kode
- arbejde videre med Supabase, særligt datamodellering og relationer
- senere arbejde med authentication, authorization og user management
- koble React til Headless WordPress og eventuelt flere datakilder
- få mere rutine i Git, GitHub, issues, branches, pull requests, code review og deployment
- møde relevante komponentbiblioteker, UI-frameworks og nyere værktøjer, når de understøtter læringsmålene

De studerende har desuden efterspurgt Next.js. TypeScript kan også være relevant, hvis der bliver plads til det.

### Didaktiske principper

- **Proces over koderesultat:** Arbejdsproces, valg og dokumentation skal vægte højere end mængden af produceret kode.
- **Forklar koden:** De studerende skal kunne forklare kode, dataflow og beslutninger — også når AI har været en del af processen.
- **AI som vilkår:** Alle har adgang til AI. Det afgørende spørgsmål er derfor: Hvad kan den studerende selv forstå, vurdere og forbedre?
- **Mere lab-undervisning:** Korte oplæg efterfølges af undersøgelser, eksperimenter, sammenligninger og fælles opsamling.
- **De studerende skal opdage:** Undervisningen skal give plads til, at de selv finder problemer, afprøver muligheder og formidler deres fund.
- **Git som løbende praksis:** Git skal integreres naturligt i arbejdet frem for at optræde som et isoleret emne.
- **Code review som læringsaktivitet:** Pull requests og review bruges til at træne læsning, feedback og faglig begrundelse.

## 2. Udgangspunkt fra 2. semester

### React og data

De studerende har bygget React-SPA'er, som via REST kommunikerede med en eller flere Supabase-tabeller. De arbejdede med:

- simpel CRUD
- formularer
- filtrering og sortering i Supabase
- lokal filtrering og sortering med JavaScript
- kobling af data til UI og React-komponenter

Tabellerne blev brugt hver for sig. De arbejdede ikke med relationer mellem data eller tabeller.

### Styling i React

De har mødt flere stylingtilgange:

- klassisk CSS
- CSS Modules
- styled components
- inline styles
- andre relevante variationer

### React og accessibility

De har arbejdet med:

- semantisk HTML
- ARIA-attributter
- formularer og labels
- tastaturnavigation og skærmlæsere
- fokusstyring med React Router
- relevante testværktøjer

### Git, GitHub og deployment

De har arbejdet med:

- Git, GitHub, GitHub Desktop og Source Control i VS Code
- oprettelse, cloning og konfiguration af React- og Vite-projekter
- stage, commit, push og pull
- branches, pull requests og merge
- parallelt arbejde i feature branches
- deployment til GitHub Pages
- environment variables lokalt og online
- krav om offentligt GitHub-repository og online deployment

### Didaktisk udfordring

Det er uklart, hvor sikkert de studerende selv behersker stoffet, og hvor meget AI har løst for dem. Kendt stof skal derfor ikke nødvendigvis undervises forfra, men undersøges gennem diagnostiske øvelser, kodeforklaring, audits og praktisk anvendelse.

## 3. Mulige emner på 3. semester

### Data, Supabase og backend-funktionalitet

- fejlhåndtering og robuste UI-states
- datamodellering og relationer
- Supabase Storage og fil-upload
- authentication, sign in og sign up
- authorization og user management
- realtime
- kombination af Supabase og Headless WordPress som datakilder
- checkout-flow, eksempelvis med Stripe

### React og frontend-stack

- mere React forklaret enkelt og fra fundamentet
- komponentbiblioteker og UI-frameworks, eksempelvis shadcn/ui og Tailwind CSS
- Next.js
- TypeScript
- Framer Motion
- design til kode via MCP

### Data i browseren

- cookies og deres anvendelse
- forskellen mellem cookies, `localStorage` og `sessionStorage`

### Mulige projekter og øvelser

#### Post App

Post App kan skabe en tydelig progression fra kendt CRUD til relationer:

1. Opret og vis posts med kendt CRUD.
2. Tilføj brugerens navn og avatar direkte som felter på hver post.
3. Undersøg problemerne ved duplikerede brugerdata.
4. Opret separate `users`- og `posts`-tabeller.
5. Etablér relationen: Én bruger kan oprette mange posts.
6. Hent og vis relaterede brugerdata sammen med posts.
7. Mulig udvidelse: En post kan have flere forfattere, så en mange-til-mange-relation bliver nødvendig.
8. Senere kan øvelsen udvides med authentication, user management, Storage og realtime.

#### Andre mulige projekter

- et skolesystem
- en løsning med checkout-flow
- en løsning, der kombinerer Supabase og Headless WordPress

Disse idéer kræver afgrænsning, før de placeres i semesteret.

## 4. Foreløbig placering af emner

### Product optimization

Forløbet bør fokusere på:

- diagnostisk opsamling på JavaScript og React
- teknisk audit af eksisterende løsninger
- navngivning, struktur og komponentansvar
- refaktorering og dataflow
- issues, branches, pull requests og code review som anvendt praksis
- datamodellering og relationer i Supabase
- fejlhåndtering og robuste UI-states
- kvalitetssikring, deployment og dokumenteret før/efter-effekt
- faglig dokumentation på portfolioet

Post App kan enten være den eksisterende løsning i Case 1 eller en mindre, fælles labøvelse før arbejdet i casen. Det skal besluttes, når casebriefen udvikles.

### Dynamic User Interface

Forløbet er et mere oplagt sted til:

- Headless WordPress → API → React-interface
- authentication og authorization
- sign in, sign up og user management
- Supabase Storage og eventuelt realtime
- kombination af WordPress og Supabase som datakilder
- eventuelt et UI-framework eller komponentbibliotek

### Backlog og åbne muligheder

Disse emner bør kun inddrages, hvis de understøtter projektet og der er tid:

- Next.js
- TypeScript
- Stripe og checkout
- Framer Motion
- design til kode via MCP
- cookies, `localStorage` og `sessionStorage`
- skolesystem som projektidé

## 5. Progression i Product optimization

1. **React-status og teknisk kvalitet**  
   De studerende anvender kendt stof fra 2. semester som kvalitetskriterier i en teknisk audit. Formålet er at diagnosticere, hvad de sikkert kan anvende og forklare, og hvad der skal genbesøges.
2. **JavaScript for React**  
   Centrale JavaScript-koncepter trænes først isoleret og derefter i React. De studerende skal læse, forudsige, forklare og selv skrive kode.
3. **Case 1: Kick-off og codebase audit**  
   En udleveret React-løsning undersøges. Grupperne etablerer baseline og anvender deres eksisterende Git-kompetencer i et issue-, branch-, pull request- og review-workflow.
4. **Case 1: Refaktorering og komponentarkitektur**  
   Fokus er på komponentansvar, props, state, dataflow, genbrugelig logik, fejlhåndtering og code review.
5. **Case 1: Datamodellering, relationer og Supabase**  
   Der bygges videre på kendt CRUD, filtrering og sortering. Nyt fokus er relationer mellem tabeller, relaterede forespørgsler og et tydeligere datalag. Post App kan bruges som fælles eksempel.
6. **Case 1: Kvalitetssikring, deployment og review**  
   Funktionalitet, accessibility, performance, deployment og før/efter-dokumentation kvalitetssikres gennem kendte teknikker.
7. **Portfolio og faglig dokumentation**  
   De tre cases omsættes til portfolioindhold og faglige refleksioner frem mod den skriftlige prøve.

### Afgrænsning af Case 1

- Casen skal handle om at forbedre en eksisterende React-løsning — ikke om at bygge et nyt produkt fra bunden.
- Optimering, dokumentation og faglig begrundelse vægtes højere end antallet af nye features.
- Git/GitHub, deployment, CRUD, filtrering, formularer og grundlæggende accessibility behandles som kendt stof.
- Kendt stof genbesøges gennem audit, anvendelse og kvalitetssikring frem for grundlæggende gennemgang.
- Next.js, TypeScript og større UI-frameworks holdes som udgangspunkt ude af casen.
- Authentication og authorization placeres senere, medmindre den konkrete case kræver en meget enkel introduktion.

### Case 1 skal stadig afklares

- Hvilken eksisterende løsning skal de studerende optimere?
- Skal alle arbejde med samme kodebase?
- Arbejder de individuelt, i par eller i grupper?
- Skal Post App være selve casen eller en fælles Supabase-lab?
- Hvilke fejl, uhensigtsmæssigheder og forbedringsmuligheder skal bygges ind?
- Hvilke forbedringer er obligatoriske, og hvilke vælger de selv?
- Hvordan dokumenterer de baseline, proces og før/efter-effekt?
- Hvad er casens konkrete output og evalueringskriterier?

## 6. Output og struktur

De studenterrettede undervisningssider skal indeholde:

- Formål
- Forberedelse
- Agenda
- Materialer

Titlerne må tilpasses, så de afspejler dagens tema, men skal være synkroniseret med Canvas-modulerne.

## 7. Noter til de enkelte undervisningsgange

### RACE - Product optimization: React-status og teknisk kvalitet - 19-08-2026

Målet er at komme godt fra start på 3. semester og genbesøge de dele af React- og Web App-forløbet fra 2. semester, som kan forbedres.

Mulige fokuspunkter:

- `.env` lokalt og online
- identitet, logo, favicon, title, description og metadata
- Supabase via REST/fetch sammenlignet med SDK
- navngivning af databaser, tabeller, kolonner, objekter, funktioner, variabler og komponenter
- projekt- og mappestruktur
- en samlet liste over det, de tidligere har arbejdet med
- diagnostik af, hvad de faktisk kan anvende og forklare

[Studenterrettet side](../undervisning/product-optimization/19-08-2026-product-optimization.md)

### LAES/NKKR/RACE - Portfolio feedback - 19-08-2026

Denne eftermiddag ligger uden for selve Product optimization-forløbet. De studerende kan booke en tid og få undervisernes umiddelbare feedback på et portfolio, som ikke er gennemgået på forhånd.

Som forberedelse skal de reflektere over:

- Hvem er jeg som fagperson lige nu?
- Hvad er min faglige profil som multimediedesigner?
- Hvordan afspejler portfolioet min faglige identitet, mine interesser og det, jeg gerne vil være kendt for?
- Hvilke faglige og personlige styrker viser portfolioet bedst?
- Hvilke konkrete eksempler dokumenterer mine kompetencer?
- Hvilket indtryk vil en person, der ikke kender mig, få?
- Hvordan understøtter mine valgte cases de kompetencer, jeg ønsker at vise?
- Hvad er jeg mest tilfreds med?
- Hvad vil jeg ændre eller prioritere, hvis jeg har mere tid?
- Hvilken historie fortæller portfolioet om mig?

[Studenterrettet side](../undervisning/semesterstart/19-08-2026-portfolio-feedback.md)

### RACE - Product optimization: JavaScript for React - 21-08-2026

Målet er at styrke den JavaScript, der er nødvendig for at forstå og arbejde effektivt i React.

Undervisningen kan organiseres som en lab:

1. De studerende løser og forklarer en mindre opgave i almindelig JavaScript.
2. De undersøger et centralt koncept i grupper.
3. De udfylder en fælles koncepthåndbog og præsenterer deres fund.
4. De overfører den samme logik til et React-miljø.
5. De finder og forklarer konceptet i en eksisterende React-komponent.

Koncepterne skal målrettes og afgrænses til det, de faktisk bruger i React.

Mulige ressourcer:

- [JavaScript/React-konceptsamling](https://race.notion.site/f5c3d5bc51b541fa8734bee79f7728fb?v=7b5e10491cf1481e9b146a7e958f590c)
- [JavaScript + React Concepts Opsamling](https://race.notion.site/JavaScript-React-Concepts-Opsamling-2a1bc239db11805e90afd8fd032e87fa)
- [GeeksforGeeks: JavaScript concepts for React](https://www.geeksforgeeks.org/reactjs/top-javascript-concepts-to-know-before-learning-react/)
- [Kent C. Dodds: JavaScript to know for React](https://kentcdodds.com/blog/javascript-to-know-for-react)

[Studenterrettet side](../undervisning/product-optimization/21-08-2026-product-optimization.md)

### RACE - Product optimization: Case 1 · Kick-off og codebase audit - 25-08-2026

Case 1 skal fokusere på forbedring af en udleveret, eksisterende React-løsning. Kodebasen skal først udvikles, så den indeholder realistiske problemer og forbedringsmuligheder.

Mulige indbyggede problemer:

- inkonsistent navngivning og struktur
- for store komponenter
- gentaget kode
- uklart dataflow
- utilstrækkelig loading- og fejlhåndtering
- duplikerede brugerdata i posts
- miljøvariabler eller metadata, der ikke er håndteret korrekt
- svag dokumentation og utydelig Git-historik

[Studenterrettet side](../undervisning/product-optimization/25-08-2026-case-1-react-optimering.md)

### RACE - Product optimization: Case 1 · Refaktorering og komponentarkitektur - 26-08-2026

Fokus på refaktorering i små skridt, komponentansvar, genbrugelig logik, dataflow og fagligt code review.

[Studenterrettet side](../undervisning/product-optimization/26-08-2026-case-1-react-optimering.md)

### RACE - Product optimization: Case 1 · Datamodellering, relationer og Supabase - 01-09-2026

Post App kan bruges til at synliggøre forskellen mellem duplikerede brugerfelter i posts og en normaliseret løsning med separate `users`- og `posts`-tabeller.

[Studenterrettet side](../undervisning/product-optimization/01-09-2026-case-1-react-optimering.md)

### RACE - Product optimization: Case 1 · Kvalitetssikring, deployment og review - 02-09-2026

Fokus på anvendelse af kendte teknikker, quality review, deployment, pull requests, code review og dokumenteret effekt.

[Studenterrettet side](../undervisning/product-optimization/02-09-2026-case-1-react-optimering.md)

### RACE - Product optimization: Portfolio og faglig dokumentation - 12-10-2026

De tre cases skal omsættes til tydelig dokumentation af kompetencer, proces, beslutninger, iterationer og resultater på portfolioet.

[Studenterrettet side](../undervisning/product-optimization/12-10-2026-optimering-af-portfolio.md)

