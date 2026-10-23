# Planlægning af Dynamic User Interface

Arbejdsdokument til RACE-undervisningen i Dynamic User Interface. De studenterrettede sider ligger som `race-*.md` i denne mappe, og projektets krav står i [eksamensbeskrivelsen](eksamensbeskrivelse.md).

## Overblik

| # | Dato | Type | Undervisere |
| --- | --- | --- | --- |
| 08 | 26. okt | Faglig undervisning | RACE |
| 09 | 29. okt | Faglig undervisning | NKKR/RACE |
| 10 | 30. okt | Faglig undervisning | RACE |
| 11 | 2. nov | Kick-off | BKI/NKKR/RACE |
| 12 | 10. nov | Faglig undervisning | RACE |
| 13 | 12. nov | Faglig undervisning | RACE |
| 14 | 16. nov | Faciliteret vejledning + morgen-session | NKKR/RACE |
| 15 | 23. nov | Faciliteret vejledning + morgen-session | RACE |
| 16 | 27. nov | Pitch Day | BKI/NKKR/RACE |
| 17 | 1. dec | Optimering og eksamensforberedelse + morgen-session | RACE |
| 18 | 3. dec | Optimering og eksamensforberedelse + morgen-session | NKKR/RACE |

Vigtige datoer i projektet: produktkvalificering 3. november, Student Day 4. november, attenderprøve 17. november, aflevering 24. november kl. 12.00 og mundtlig eksamen 9.-11. december.

NKKR og BKI underviser i forløbet 27/10, 3/11, 6/11, 9/11, 11/11, 13/11, 18/11, 20/11 og 4/12 ifølge [Canvas-modulerne](../../semesteroverblik/canvas-moduler.md). Fordelingen af motion, delight og test afstemmes med dem.

## Progression i de fem faglige undervisningsgange

RACE-gangene dækker forløbets tekniske stack: Next.js, headless CMS, designsystem i kode, Supabase-auth, brugerroller og beskyttet adgang samt motion i kode. De studerende arbejder i deres egen Next.js-app, som udvides gang for gang. Principperne overføres løbende til gruppeprojektet efter princippet **kort input → implementering → overførsel**.

### Før kick-off: fundament og værktøjer

| # | Dato | Tema | Indhold | Hovedoutput |
| --- | --- | --- | --- | --- |
| 08 | 26/10 | Next.js og intro til headless WordPress | App Router, layouts, server components, WordPress REST API (`/wp-json/wp/v2/posts`), liste- og detaljeside (`[slug]`) | En Next.js-app, der viser indhold fra deres egen WordPress |
| 09 | 29/10 | Designsystem fra Figma til kode | Tailwind, shadcn/ui, tokens for farve, typografi og spacing, Figma variables → CSS variables, Figma MCP, kontrast og fokus-states i tokens, tastaturbetjening i shadcn-komponenter | Next.js-appen bruger egne tokens og komponenter |
| 10 | 30/10 | Supabase Auth i Next.js | Fra REST til Supabase SDK, sign up, sign in og sign out, sessioner i cookies sammenlignet med `localStorage` og `sessionStorage`, Supabase-klient på server og client, beskyttede sider | Next.js-appen har login og en side, der kun kan ses af brugere, der er logget ind |

### Efter kick-off: projektet er i gang

| # | Dato | Tema | Indhold | Hovedoutput |
| --- | --- | --- | --- | --- |
| 12 | 10/11 | User management, roller og beskyttet adgang | `profiles`-tabel koblet til `auth.users`, brugerroller, Row Level Security, beskyttelse af routes og data, kombination af WordPress-indhold og Supabase-brugerdata | Next.js-appen har roller, og data er beskyttet med RLS |
| 13 | 12/11 | Motion i kode | Motion (Framer Motion), motion-tokens for duration og easing, microinteractions i React-komponenter, `"use client"` til animerede komponenter, `prefers-reduced-motion`, lyd med mute, animationer med god performance (transform/opacity), varianter A/B/C styret af tokens til test | En microinteraction i projektet, som bruger tokens og respekterer reduced motion |

### Beslutninger

- **JavaScript, ikke TypeScript:** De studerende vælger *No* til TypeScript i `create-next-app`. shadcn/ui sættes op med `"tsx": false` i `components.json`, så komponenterne genereres som JSX.
- **Eget Next.js-projekt fra start:** I gang 08 opretter de studerende selv Next.js-appen med `create-next-app` (TypeScript: No, Tailwind: No, App Router: Yes) og gennemgår den genererede struktur. Tailwind tilføjes først i gang 09, så gang 08 kan fokusere på Next.js. Det forbereder dem på at sætte gruppeprojektet op.
- **Referencerepo i stedet for starter-repo:** RACE laver et referencerepo med den færdige Next.js-app fra gang 08, som bruges som facit og fallback. WordPress-URL'en ligger i en environment variable, så repoet kan pege på enhver WP-side.
- **De studerendes egen WordPress som datakilde:** De studerende fetcher fra den WordPress-løsning, de selv har sat op på Simply.com ugen før. Der er ikke brug for en fælles demo-WP.

### Forberedelse til gang 08

- Opret nogle posts og pages i egen WordPress, gerne med fremhævet billede, kategorier og noget indhold, der kan vises i en liste og på en detaljeside.
- Tjek, at `https://<eget-domæne>/wp-json/wp/v2/posts` returnerer JSON i browseren. Permalinks må ikke stå til *Plain*, og sikkerhedsplugins må ikke blokere REST API'et.

### Begrundelser

- **Headless WordPress allerede 26/10:** De studerende har arbejdet med WordPress ugen før.
- **SDK'et i gang 10:** Product optimization brugte REST og lovede SDK'et "senere på semesteret". Auth gør skiftet til SDK'et naturligt.
- **Auth før kick-off og roller efter:** Grundlæggende auth lægges før kick-off, så grupperne kan vurdere, om deres produkt skal have brugere. Roller og RLS bygger videre på det, når projektet er afgrænset.
- **Kun én gang om motion:** Delight, motion design og test forventes især at blive dækket af NKKR og BKI. RACE-gangen fokuserer på implementeringen.
- **Deployment i en morgen-session:** Deployment kræver, at der er noget at deploye, og at Supabase-auth virker online.

### Git i grupper

Product optimization lovede, at flowet senere udvides til branch → pull request → review → `main`. I gruppeprojektet bliver det relevant med parallelt arbejde, merge conflicts og branch protection på `main`. Emnet introduceres ved kick-off 2/11 eller kort i gang 08 og bruges løbende i resten af forløbet.

## Dækning af eksamenskrav

Hvor kravene i [eksamensbeskrivelsen](eksamensbeskrivelse.md) bliver dækket. Krav uden en RACE-gang skal afstemmes med NKKR og BKI.

| Krav i eksamensbeskrivelsen | Dækkes | Ansvar |
| --- | --- | --- |
| Bygget i React, fx Next.js, Tailwind og shadcn/ui | 08, 09 | RACE |
| Indholdet i kerneflowet hentes fra mindst én datakilde | 08 (WordPress), 10 (Supabase) | RACE |
| Designsystem med tokens og genbrugelige komponenter i Figma og kode | 09 (farve, typografi, spacing), 13 (motion, timing, easing) | RACE/NKKR |
| Motion og microinteractions | 13 | RACE/NKKR/BKI |
| Lyd, illustration, gamification, tone of voice, Rive | 13 (lyd med mute), resten uden for RACE-gangene | NKKR/BKI |
| Tilgængelighed: reduced motion, tastatur, kontrast, lyd fra | 09, 13, tjek 23/11 | RACE |
| Performance | 13 (transform/opacity), 16/11 (Lighthouse) | RACE |
| It-sikkerhed: hemmelige nøgler ude af klienten, login og RLS ved brugerdata | 10, 12, 16/11 | RACE |
| Analyse, hypotese om mindeværdighed, spektret A/B/C og test | 13 (varianter i kode), resten uden for RACE-gangene | NKKR/BKI |
| Deployet løsning fra `main`, markeret som studieprojekt | 16/11, 23/11 | RACE |
| Fælles GitHub-repository med branches og pull requests, `main` som aflevering | Kick-off 2/11 eller 08 (åbent spørgsmål) | RACE |
| Optimeringer på branches med preview-deployment | 1/12 | RACE |
| Hver studerende kan forklare hele projektet og vise det live med backup | 3/12 | RACE/NKKR |

## Morgen-sessioner

Korte, fælles oplæg om morgenen på vejlednings- og optimeringsdagene. Hver morgen har ét kerneemne og et eller to valgfrie emner, som vælges ud fra gruppernes behov.

| Dato | Fase | Kerneemne | Valgfrie emner |
| --- | --- | --- | --- |
| 16/11 | Projektet bygges, en uge før aflevering | **Deployment af Next.js på Vercel:** environment variables, Supabase redirect-URL'er og fejlfinding i build-loggen | **It-sikkerhed:** `service_role`-nøglen aldrig i klienten, tjek af RLS-politikker og brug af `NEXT_PUBLIC_`-variabler. **Performance i Next.js:** `next/image`, `next/font` og Lighthouse på den deployede løsning som dokumentation |
| 23/11 | Dagen før aflevering | **Tjek før aflevering:** links i et privat vindue, deployment fra `main`, markering som studieprojekt og deklaration af kilder og AI | **Tilgængelighedstjek:** tastatur, kontrast, reduced motion og mute – lyd og animation må ikke være eneste bærer af information |
| 1/12 | Optimering | **Branches og preview deployments** til optimeringer uden for `main` | **Code review på tværs af grupper** af pull requests med optimeringer. **Headless WordPress, del 2:** ACF, custom post types og revalidering for grupper med WP som datakilde. **Supabase Realtime** og **Supabase Storage** som mulige optimeringer |
| 3/12 | Eksamensforberedelse | **Forklar koden:** hver studerende forklarer en fil eller et dataflow fra projektet for en studerende fra en anden gruppe. **Demo-drejebog:** produkt, kode og optimeringer vist live, plus en skærmoptagelse som backup | – |

Prioritet: It-sikkerhed og performance 16/11 rammer bedømmelseskriterierne direkte og bør med, hvis tiden er knap. Performance ligger 16/11 frem for 23/11, så grupperne kan nå at rette og dokumentere før aflevering.

## Åbne spørgsmål

- Hvad dækker NKKR og BKI af motion, delight og test, og hvad er NKKR's rolle 29/10?
- Skal alle grupper bruge Supabase-auth, eller kun dem, hvis produkt har brugere?
- Vil NKKR være med i morgen-sessionen 3/12, og hvor lang skal en morgen-session være?
- Skal Git i grupper ligge ved kick-off 2/11 eller i gang 08?
- Hvad indebærer attenderprøven 17/11, og skal morgen-sessionen 16/11 forberede de studerende på den?
- Hvordan sættes gruppeafleveringen op i WISEflow? Den står stadig som TODO i eksamensbeskrivelsen.
