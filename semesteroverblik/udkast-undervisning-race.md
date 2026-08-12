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

### Ramme for den enkelte undervisningsgang

Hver undervisningsgang varer 3,5 timer. Agendaen skal derfor som udgangspunkt indeholde:

- ét tydeligt hovedoutput
- højst 2–3 korte faglige input
- én stor, sammenhængende arbejdsblok
- en kort verifikation eller opsamling
- tydelig markering af det, de studerende selv skal arbejde videre med

En undervisningsgang skal ikke forsøge at dække alle relevante perspektiver på emnet.

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

Forløbets hovedformål er opsamling på og forbedring af kendt stof fra 2. semester. De studerende skal anvende det kendte mere konsekvent og løfte en eksisterende React-løsning, så den bliver mere tilgængelig, robust og vedligeholdbar.

Forløbet fokuserer på:

- diagnostisk opsamling på JavaScript og React
- teknisk audit af eksisterende løsninger
- kendte accessibility-elementer fra 2. semester, som anvendes og forbedres
- stylingtilgange i React, herunder flytning af komponentrelateret styling tættere på komponenterne
- navngivning, struktur, arkitektur, best practices og komponentopdeling
- fejlhåndtering i både kode og UI
- robuste UI-states: loading, success, empty, error og retry
- datamodellering og relationer i Supabase, eksempelvis at en user er creator af en post
- kvalitetssikring, deployment og dokumenteret før/efter-effekt
- opsamling på Git gennem individuel brug af issues, feature branches og pull requests
- peer code review, selvom produktet udvikles og afleveres individuelt
- deployment via GitHub Actions
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

1. **Web App-forbedringer og teknisk fundament**
   Som startskud til 3. semester skal de studerende forstå og forbedre identificerede mangler fra Web App-forløbet på 2. semester. De arbejder først i en udleveret løsning og overfører derefter forbedringsprincipperne til deres egen Web App. Dagen etablerer et fælles teknisk fundament med fokus på environment-setup, identitet, template-oprydning, accessibility og Supabase via REST sammenlignet med SDK'et.
2. **JavaScript, fejlhåndtering og robuste UI-states**
   Centrale JavaScript-koncepter trænes gennem asynkron kode, `try`/`catch`/`finally` og eksplicit håndtering af loading, success, empty og error i React.
3. **Case 1: Kick-off og codebase audit**  
   En udleveret React-løsning undersøges. Hver studerende etablerer en baseline og arbejder individuelt gennem issues, feature branches og pull requests.
4. **Case 1: Arkitektur, styling og accessibility**
   Fokus er på navngivning, struktur, komponentopdeling og placering af styling tættere på komponenterne. Kendte accessibility-principper anvendes og forbedres.
5. **Case 1: Datamodellering, relationer og Supabase**  
   Der bygges videre på kendt CRUD, filtrering og sortering. Nyt fokus er relationer mellem tabeller, relaterede forespørgsler og et tydeligere datalag. Post App kan bruges som fælles eksempel.
6. **Case 1: PR-review, deployment og dokumenteret effekt**
   De studerende reviewer hinandens pull requests, bearbejder feedback, fletter til `main`, deployer via GitHub Actions og dokumenterer før/efter-effekt.
7. **Portfolio og faglig dokumentation**  
   De tre cases omsættes til portfolioindhold og faglige refleksioner frem mod den skriftlige prøve.

### Afgrænsning af Case 1

- Casen skal handle om at forbedre en eksisterende React-løsning — ikke om at bygge et nyt produkt fra bunden.
- Optimering, dokumentation og faglig begrundelse vægtes højere end antallet af nye features.
- Git/GitHub, deployment, CRUD, filtrering, formularer og grundlæggende accessibility behandles som kendt stof.
- Kendt stof genbesøges gennem audit, anvendelse og kvalitetssikring frem for grundlæggende gennemgang.
- Produktet udvikles og afleveres individuelt. Peer review er en læringsaktivitet og ændrer ikke ejerskabet af løsningen.
- Next.js, TypeScript og større UI-frameworks holdes som udgangspunkt ude af casen.
- Authentication og authorization placeres senere, medmindre den konkrete case kræver en meget enkel introduktion.

### Case 1 skal stadig afklares

- Hvilken eksisterende løsning skal de studerende optimere?
- Skal alle arbejde med samme kodebase?
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

### RACE - Product optimization: Web App-forbedringer og teknisk fundament - 19-08-2026

Målet er at etablere et fælles teknisk fundament for 3. semester ved at forstå og forbedre konkrete mangler fra Web App-forløbet på 2. semester.

Undervisningen følger princippet **kort input → implementering → nyt input → implementering → overførsel**:

1. Manglerne undersøges i en fælles, udleveret React-løsning, som gøres klar i starten.
2. Korte faglige input veksler med implementering og afprøvning i den udleverede løsning.
3. Til sidst overfører de studerende de samme forbedringsprincipper til deres egen Web App og planlægger det videre arbejde.

Dagen afgrænses til:

- et selvstændigt, kort punkt om AI og agenter i udviklingsarbejdet: forskellen på chat og agent, relevante anvendelser, nødvendig kontekst, afgrænsning, begrænsninger og eget ansvar
- tydelige grænser for AI-brug: ingen deling af secrets, ingen blind accept af forslag og altid eget ansvar for forståelse, valg og verifikation
- GitHub-flow og automatisk deployment fra `main` via GitHub Actions til GitHub Pages
- forståelse af workflowets hovedtrin og de dele af templaten, den studerende selv skal konfigurere og kontrollere
- kontrol af Pages-opsætning, permissions, Vites `base`, environment variables og lockfile
- læsning af workflow runs, jobs, steps og logs i repositoryets Actions-fane som udgangspunkt for fejlfinding
- AI-assisteret fejlfinding som et konkret underpunkt til GitHub Actions: læs loggen, få hjælp til at forklare fejlen, afprøv rettelsen og genkør workflowet
- lokal og online håndtering af `VITE_SUPABASE_URL`, `VITE_SUPABASE_APIKEY` og andre environment variables
- `.env.local`, `.env.example`, `.gitignore` og GitHub Actions-variabler
- oprydning af template-rester, identitet og metadata
- genanvendelse af semantisk HTML, labels, alternativ tekst, tastaturnavigation og synligt fokus
- en kort samtale om Supabase via REST og en overordnet forståelse af forskellen til SDK'et, som behandles senere på semesteret
- en prioriteret forbedringsliste til egen Web App, eventuel begyndelse på den vigtigste rettelse og de øvrige tilpasninger som hjemmearbejde

SDK'et, en mere systematisk teknisk audit samt styling og arkitektur behandles senere i semesteret.

[Studenterrettet side](../undervisning/product-optimization/19-08-2026-product-optimization.md)

### LAES/NKKR/RACE - Portfolio feedback - 19-08-2026

Denne eftermiddag ligger uden for selve Product optimization-forløbet. LAES, NKKR og RACE sidder i lokale 4.16A/4.16B kl. 12.00–15.15. De studerende kan komme forbi uden booking og få undervisernes umiddelbare feedback på et portfolio, som ikke er gennemgået på forhånd.

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

### RACE - Product optimization: JavaScript, fejlhåndtering og robuste UI-states - 21-08-2026

Målet er at styrke den JavaScript, der er nødvendig for at forstå og arbejde effektivt i React.

Undervisningen kan organiseres som en lab:

1. De studerende løser og forklarer en mindre opgave i almindelig JavaScript.
2. De undersøger et centralt koncept i grupper.
3. De udfylder en fælles koncepthåndbog og præsenterer deres fund.
4. De arbejder med forventede fejl via `try`, `catch` og `finally`.
5. De overfører den samme logik til et React-miljø med loading, success, empty og error states.
6. De tilføjer forståelig brugerfeedback, retry og beskyttelse mod gentagne handlinger.
7. De finder og forklarer konceptet i en eksisterende React-komponent.

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

### RACE - Product optimization: Case 1 · Arkitektur, styling og accessibility - 26-08-2026

Fokus på refaktorering i små skridt, navngivning, struktur, komponentopdeling, komponentbaseret styling og forbedring af kendte accessibility-elementer.

[Studenterrettet side](../undervisning/product-optimization/26-08-2026-case-1-react-optimering.md)

### RACE - Product optimization: Case 1 · Datamodellering, relationer og Supabase - 01-09-2026

Post App kan bruges til at synliggøre forskellen mellem duplikerede brugerfelter i posts og en normaliseret løsning med separate `users`- og `posts`-tabeller.

[Studenterrettet side](../undervisning/product-optimization/01-09-2026-case-1-react-optimering.md)

### RACE - Product optimization: Case 1 · PR-review, deployment og dokumenteret effekt - 02-09-2026

Fokus på peer review af individuelle pull requests, bearbejdning af feedback, deployment via GitHub Actions og dokumenteret før/efter-effekt.

[Studenterrettet side](../undervisning/product-optimization/02-09-2026-case-1-react-optimering.md)

### RACE - Product optimization: Portfolio og faglig dokumentation - 12-10-2026

De tre cases skal omsættes til tydelig dokumentation af kompetencer, proces, beslutninger, iterationer og resultater på portfolioet.

[Studenterrettet side](../undervisning/product-optimization/12-10-2026-optimering-af-portfolio.md)
