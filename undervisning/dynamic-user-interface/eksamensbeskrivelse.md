# Dynamic User Interface – Eksamensbeskrivelse

## Dynamic User Interface (15 ECTS)

Dynamic User Interface er en **mundtlig gruppeprøve** på baggrund af et gruppeprojekt. I projektet designer og programmerer I en forbedret version af et eksisterende digitalt produkt.

> **Make it memorable – but don't break it.**

Mange digitale produkter er brugervenlige, men kedelige. I dette projekt tager I udgangspunkt i noget, der allerede virker, og gør det mindeværdigt. I arbejder helt ned i detaljen med motion, microinteractions, feedback, lyd, illustration, tone of voice og personlighed.

### Æstetik + UX = mindeværdigt

Æstetiske og emotionelle virkemidler kan gøre et produkt mere mindeværdigt, men de kan også forsinke, forvirre, ekskludere eller irritere. Projektet er derfor ikke kun en æstetisk øvelse, men en UX-metodisk opgave: I formulerer hypoteser om, hvordan jeres virkemidler kan vække begejstring, og tester og dokumenterer løbende, om de skaber værdi uden at gå ud over brugerens mål.

> **Hvis en effekt eller et greb ikke kan forsvares ud fra brugerens oplevelse, skal den fjernes. Kill your darlings.**

### Inspiration

Lad jer inspirere af fx [Not Boring Software](https://notbor.ing/), der gør helt almindelige værktøjer som vejr, lommeregner og timer til sjove og mindeværdige oplevelser, eller af Duolingo, Spotify Wrapped og Things 3. Fagligt kan I bl.a. læne jer op ad Dan Saffers _Microinteractions_ og Aaron Walters _Designing for Emotion_.

<hr style="margin: 2rem 0;">

## Projektet

I arbejder i grupper af 3-4 studerende.

### 1. Vælg et eksisterende produkt

Vælg et eksisterende digitalt produkt, som I oplever som funktionelt, men kedeligt. Afgræns projektet til **et sammenhængende udsnit af produktet** – typisk ét kerneflow og de skærme, der skal til, for at det fungerer som et rigtigt produkt. Udsnittet skal være stort nok til at bære et designsystem og en datakilde, og lille nok til, at I kan gennemarbejde detaljerne. Jo flere I er i gruppen, jo mere forventes I at nå.

Produktvalg og afgrænsning kvalificeres sammen med underviserne **tirsdag 3. november**. Medbring jeres produktidé, det udsnit og kerneflow, I vil arbejde med, og en kort begrundelse for jeres valg.

### 2. Analysér udgangspunktet

Fastlæg først, hvad brugerens mål med produktet er, og hvilke usability-mål – fx tid, fejl og forståelse – jeres ændringer ikke må forringe. Dokumentér derefter det oprindelige interface, og undersøg, hvad der virker, og hvad der mangler, fx med UX audit, heuristisk evaluering, brugertest eller analyse af konkurrenter.

### 3. Formulér en hypotese om mindeværdighed

Formulér én eller flere hypoteser om, hvordan jeres virkemidler gør kerneflowet mindeværdigt. Brug gerne denne skabelon:

> Vi tror, at **[virkemiddel]** i **[interaktion]** vil få **[brugeren]** til at **[opleve eller gøre noget]**, uden at **[usability-mål]** forringes. Det ved vi, når **[målbart resultat]**.

### 4. Udforsk spektret – fra funktionel til ekspressiv

Udforsk en eller flere nøgleinteraktioner i kerneflowet i tre niveauer, før I lægger jer fast – i Figma, Rive, kode eller en kombination:

- **A – Minimal og funktionel:** Løser opgaven uden ekstra virkemidler.
- **B – Moderat og personlig:** Udvalgte microinteractions, motion og personlighed.
- **C – Ekstrem og ekspressiv:** Må gerne være næsten absurd.

Alle tre versioner skal kunne afprøves af testpersoner, fx som klikbare prototyper eller i kode. De behøver ikke være færdige.

### 5. Test og iterér

Test de tre versioner med brugere – og test igen, efterhånden som jeres løsning tager form. Mål både usability og oplevelse, fx tid, fejl, forståelse, tilfredshed, oplevet personlighed og en "for meget"-score. Det centrale spørgsmål er: **Hvornår begynder det mindeværdige at skade usability – og kan vi måle det?**

Begrund testmetode og antal testpersoner, og vurdér kritisk, hvor sikre resultaterne er. Testpersoner skal give samtykke, og I må ikke bruge rigtige persondata.

### 6. Byg det endelige produkt

Produktet skal være en fungerende, deployet løsning, der:

- bruger virkemidler som motion, microinteractions, feedback, lyd, illustration, tone of voice eller gamification med en tydelig begrundelse
- opbygger virkemidlerne systematisk i et designsystem, fx med tokens for motion, timing og easing samt genbrugelige komponenter i Figma og kode
- er tilgængelig, fx med respekt for `prefers-reduced-motion`, tastaturbetjening, kontrast og mulighed for at slå lyd fra – lyd og animation må ikke være eneste bærer af information
- er bygget i React – fx med Next.js, Tailwind og shadcn/ui
- henter indholdet i kerneflowet fra mindst én datakilde, fx et API, et headless CMS eller Supabase
- tager højde for performance
- tager højde for it-sikkerhed, fx ved at holde hemmelige nøgler ude af klienten og – hvis løsningen har login eller gemmer brugerdata – beskytte adgangen med fx Row Level Security
- er udviklet i ét fælles GitHub-repository med branches og pull requests
- tydeligt viser, at det er et studieprojekt uden tilknytning til virksomheden bag det oprindelige produkt

**Det, I allerede kan, gælder stadig.** Kravene ovenfor er det, der er særligt for dette projekt – ikke alt, hvad der forventes. Produktet skal også leve op til det, I har lært tidligere på uddannelsen, fx fra Product Optimization: robuste UI states med loading, fejl og tomme tilstande, semantisk HTML og tilgængelighed, en gennemtænkt datamodel, målt performance og et Git-flow med pull requests og review. Det samme gælder metoderne, fx UX audit, brugertest og koncept- og brandarbejde.

<hr style="margin: 2rem 0;">

## Det skriftlige materiale

Det skriftlige materiale afleveres som ét PDF-dokument og skal kort og fagligt vise:

1. **Udgangspunkt og problem:** Produkt, udsnit og kerneflow samt problemet med det oprindelige interface. Vis gerne før-billeder.
2. **Hypotese og udforskning:** Hvad ville I opnå, og hvad lærte I af at udforske spektret?
3. **Undersøgelsesresultater:** Hvad viste testene, hvor sikre er resultaterne, og hvordan påvirkede de jeres valg?
4. **Det endelige produkt:** Virkemidler, designsystem, implementering, tilgængelighed, performance og it-sikkerhed.
5. **Proces og samarbejde:** Hvordan planlagde og styrede I processen, og hvordan spillede design og kode sammen?
6. **Faglig refleksion:** Hvornår gør det mindeværdige produktet bedre at bruge – og hvornår står det i vejen? Hvilke effekter fjernede I – og hvorfor? Hvad kunne være næste skridt?

Prioritér punkt 3 og 6 – det er her, projektets faglighed viser sig. De øvrige punkter kan være kortere.

<hr style="margin: 2rem 0;">

## Omfang og aflevering

PDF-dokumentet afleveres **tirsdag 24. november 2026 kl. 12.00 via WISEflow**.

<!-- TODO: Beskriv, hvordan gruppeafleveringen sættes op i WISEflow, når det er afklaret. -->

- **Forside:** Projekttitel, det oprindelige produkt, gruppens navne, hold og uddannelse, antal anslag samt klikbare links til den deployede løsning, GitHub-repositoryet og Figma-filen.
- **Omfang:** Maksimalt fem normalsider svarende til 12.000 anslag inklusive mellemrum. Kun brødteksten tæller. Illustrationer tæller som ét anslag, medmindre det er teksttunge figurer eller tabeller – så tæller teksten i dem med. Forside, indholdsfortegnelse, litteraturliste og bilag tæller ikke med. Bilag indgår ikke i bedømmelsen.
- **Adgang:** Den deployede løsning, repositoryet og Figma-filen skal være tilgængelige via linkene, indtil bedømmelsen er færdig. GitHub-repositoryet skal være offentligt, og Figma-filen skal kunne åbnes af alle med linket. Test linkene i et privat browservindue.
- **`main` er jeres aflevering:** Den deployede løsning skal være bygget fra `main`, og `main` må ikke ændres efter afleveringsfristen, før bedømmelsen er færdig.

### Efter afleveringen

- **24.-27. november:** Forberedelse af pitch
- **Fredag 27. november:** Pitch Day
- **Uge 49:** Optimering og eksamensforberedelse
- **9.-11. december:** Mundtlige eksamener

I uge 49 optimerer I produktet ud fra fx feedback fra Pitch Day eller nye tests. Vælg få, velbegrundede optimeringer frem for mange små – fx et virkemiddel, I justerer eller fjerner – og vær klar til at vise, hvad I har ændret, hvorfor, og hvad det har betydet for oplevelsen. Optimeringerne udvikles på separate branches, der ikke må merges ind i `main`. Vis dem til eksamen fx via en preview-deployment.

<hr style="margin: 2rem 0;">

## Den mundtlige prøve

Prøven varer 40-50 minutter afhængigt af gruppens størrelse:

1. **Gruppepræsentation af produkt, proces og refleksioner:** ca. 15 minutter
2. **Gruppeeksamination:** ca. 10 minutter pr. studerende
3. **Votering og meddelelse af karakter:** 15 minutter

Vis produktet i brug – det mindeværdige skal opleves, ikke kun beskrives. Vis også, hvad I har optimeret efter afleveringen, og hvorfor. Hav en kort skærmoptagelse klar som backup.

Hver studerende skal kunne redegøre for hele projektet – design, kode og proces – ikke kun egne dele.

Eksamensplanen offentliggøres på Canvas.

<hr style="margin: 2rem 0;">

## Forudsætninger og redelighed

For at gå til den mundtlige prøve skal det skriftlige materiale være redeligt, opfylde formkravene og være rettidigt afleveret. Materialet skal give et retvisende billede af gruppens arbejde. Gør kilder, inspiration og anvendte assets tydelige, og følg uddannelsens regler for brug og deklaration af digitale værktøjer og generativ AI.

<hr style="margin: 2rem 0;">

## Bedømmelse

Prøven bedømmes efter 7-trinsskalaen med ekstern censur. Hver studerende får én individuel karakter ud fra en helhedsvurdering af projektet og den mundtlige præstation, herunder jeres optimeringer.

Der lægges især vægt på:

- sammenhæng mellem analyse, hypotese, test og endeligt design
- kvaliteten af detaljerne i det implementerede produkt – også i det, der ikke er nævnt i kravlisten
- valg og anvendelse af dynamiske elementer, datakilde og designsystem
- tilgængelighed, performance og it-sikkerhed
- validiteten af undersøgelsesresultaterne og jeres kritiske vurdering af dem
- refleksionen over balancen mellem mindeværdighed og usability
- planlægning og styring af processen samt samspillet mellem design og kode
- formidling og begrundelse af jeres valg – skriftligt og mundtligt

Hvis du ikke består prøven, går du til omprøve med udgangspunkt i det afleverede projekt.

<hr style="margin: 2rem 0;">

## Tjek før aflevering

- Deployet React-løsning fra `main` med mindst én datakilde og en tydelig markering af, at det er et studieprojekt
- Forside med titel, navne, antal anslag og fungerende links – offentligt repository og Figma-fil, der kan åbnes af alle med linket
- Maksimalt 12.000 anslag inklusive mellemrum
- Kilder, inspiration og brug af AI er deklareret
- PDF afleveret i WISEflow senest tirsdag 24. november 2026 kl. 12.00

<hr style="margin: 2rem 0;">

Beskrivelsen bygger på studieordningens bestemmelser for prøven i [Dynamic User Interface (afsnit 3.6)](https://www.eaaa.dk/media/pazlkzl5/studieordning-multimediedesigner-lokal-del-interactive-design-august-2025-opdateret.pdf) og udgør de præcise krav til projektet, det skriftlige materiale og produktet.
