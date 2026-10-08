# Dynamic User Interface – Eksamensbeskrivelse

## Dynamic User Interface (15 ECTS)

Dynamic User Interface er en **mundtlig gruppeprøve** på baggrund af et gruppeprojekt. I projektet designer og programmerer I en forbedret version af et eksisterende digitalt produkt.

Projektets omdrejningspunkt er:

> **Make it memorable – but don't break it.**

Mange digitale produkter er brugervenlige, men kedelige. De løser opgaven, men ingen husker oplevelsen. I dette projekt skal I tage udgangspunkt i noget, der allerede virker, og gøre det lækkert. I skal arbejde helt ned i detaljen med motion, microinteractions, feedback, lyd, illustration, tone of voice og personlighed – og samtidig dokumentere, at produktet stadig understøtter brugerens mål.

Lad jer inspirere af fx [Not Boring Software](https://notbor.ing/), der laver helt almindelige værktøjer som vejr, lommeregner og timer til sjove, overraskende og mindeværdige oplevelser. Andre eksempler, der bruger forskellige virkemidler:

- **Duolingo** – karakter, humor og gamification med streaks og belønninger
- **Spotify Wrapped** – brugerens egne data formidlet som en personlig, delbar historie
- **Family** (wallet-app) – flydende transitions og microinteractions, der forklarer, hvad der sker
- **Things 3** – rolige, præcise detaljer, der viser, at delight ikke behøver at være højlydt

Fagligt kan I bl.a. læne jer op ad Dan Saffers _Microinteractions_ og Aaron Walters _Designing for Emotion_.

<hr style="margin: 2rem 0;">

## Fra usability til delight

Godt UX handler ikke kun om at fjerne friktion. Overraskelse, humor, animation, personlighed og ekspressivitet kan gøre et produkt mere mindeværdigt og skabe en emotionel relation til brugeren. Men effekter kan også forsinke, forvirre, ekskludere eller irritere.

Projektet bevæger sig derfor langs denne akse:

**usability → delight → emotion → personality → memorability → validation**

Det betyder, at et "sjovt interface" ikke er en æstetisk øvelse alene. Det er en UX-metodisk opgave, hvor I formulerer hypoteser om delight og undersøger, om det faktisk skaber værdi for brugeren.

Projektet har én gennemgående regel:

> **Hvis en effekt ikke kan forklares ud fra brugerens oplevelse, skal den fjernes.**

<hr style="margin: 2rem 0;">

## Projektet

I arbejder i grupper af 3-4 studerende.

### 1. Vælg et eksisterende produkt

Vælg et eksisterende digitalt produkt, som I oplever som funktionelt, men kedeligt. Det kan fx være en app, en webapp eller en del af et website.

Afgræns projektet til **ét centralt flow eller én til tre centrale interaktioner**, som I redesigner og implementerer i høj kvalitet. Det er bedre at gøre lidt helt færdigt og gennemarbejdet end at gøre meget halvt.

Gruppens produktvalg og afgrænsning kvalificeres sammen med underviserne **tirsdag 3. november**. Kom forberedt med jeres valg af produkt, det flow eller de interaktioner, I vil arbejde med, og en kort begrundelse.

### 2. Analysér udgangspunktet

Dokumentér det oprindelige interface, og undersøg, hvad der virker, og hvad der mangler. Brug relevante metoder fra semesteret, fx UX audit, heuristisk evaluering, brugertest eller analyse af konkurrenter og inspirationskilder.

### 3. Formulér en delight-hypotese

Formulér, hvad I vil ændre, og hvorfor I tror, det skaber værdi. Brug gerne denne skabelon:

> Vi tror, at **[virkemiddel]** i **[interaktion]** vil få **[brugeren]** til at **[opleve eller gøre noget]**, uden at **[usability-mål]** forringes. Det ved vi, når **[målbart resultat]**.

### 4. Udforsk spektret – fra funktionel til ekspressiv

Udforsk samme interaktion i tre niveauer, før I lægger jer fast:

- **A – Minimal og funktionel:** Løser opgaven uden ekstra virkemidler.
- **B – Moderat delight:** Udvalgte microinteractions, motion og personlighed.
- **C – Ekstrem og ekspressiv:** Må gerne være næsten absurd – animation, lyd, karakter, humor, transitions.

Versionerne kan være prototyper i Figma, Rive, kode eller en kombination. Formålet er at finde ud af, hvor grænsen går.

### 5. Test og iterér

Test versionerne med brugere, og brug resultaterne som grundlag for jeres endelige design. Mål både usability og oplevelse, fx:

- tid til at løse opgaven
- fejl
- forståelse
- tilfredshed
- oplevet personlighed
- en "for meget"-score

Begrund jeres valg af testmetode og antal testpersoner, og forhold jer kritisk til, hvor sikre resultaterne er. Testpersoner skal give samtykke, og I må ikke bruge rigtige persondata i tests eller i produktet.

Det centrale spørgsmål er: **Hvornår begynder delight at skade usability – og kan vi måle det?**

### 6. Design og byg det forbedrede produkt

Implementér det endelige design som en fungerende, deployet løsning. Produktet skal:

- være bygget i React – fx med Next.js, Tailwind og shadcn/ui, som vi har arbejdet med i forløbet
- anvende mindst én datakilde, fx et API, et headless CMS eller Supabase, så indholdet er dynamisk
- bruge virkemidler som motion, microinteractions, lyd, illustration eller gamification med en tydelig begrundelse
- opbygge virkemidlerne systematisk i et designsystem, fx med tokens for motion, timing og easing samt genbrugelige komponenter i både Figma og kode
- være tilgængeligt – fx med respekt for `prefers-reduced-motion`, tastaturbetjening, tilstrækkelig kontrast og mulighed for at slå lyd fra, og lyd og animation må ikke være eneste bærer af information
- tage højde for performance, så effekter ikke gør produktet langsomt eller tungt
- tage højde for it-sikkerhed, hvis løsningen håndterer brugere, data eller beskyttet adgang

Værktøjer som [Rive](https://rive.app/), Lottie og Motion må gerne indgå, men vælg dem ud fra, hvad oplevelsen kræver.

Løsningen er et studieprojekt. Gør det tydeligt i produktet, at det ikke er tilknyttet virksomheden bag det oprindelige produkt.

<hr style="margin: 2rem 0;">

## Det samlede eksamensmateriale

Jeres eksamensmateriale består af:

1. **Det forbedrede produkt** – en deployet, fungerende løsning.
2. **Kode og designfiler** – link til GitHub-repository og Figma-fil.
3. **Skriftligt materiale som ét PDF-dokument til WISEflow** på maksimalt fem normalsider med undersøgelsesresultater og faglige refleksioner over projekt og produkt. På forsiden skal der være direkte links til den deployede løsning, GitHub-repositoryet og Figma-filen.

<hr style="margin: 2rem 0;">

## Hvad skal det skriftlige materiale vise?

Det skriftlige materiale skal kort og fagligt vise sammenhængen:

**udgangspunkt → hypotese → udforskning → test → valg → produkt → refleksion**

Det skal indeholde:

1. **Udgangspunkt og problem:** Hvilket produkt og hvilken interaktion har I valgt, og hvad er problemet med det oprindelige interface? Vis gerne før-billeder.
2. **Delight-hypotese:** Hvad ville I opnå, og hvordan ville I vide, om det lykkedes?
3. **Udforskning og iteration:** Hvordan udforskede I spektret fra funktionel til ekspressiv, og hvad lærte I af det?
4. **Undersøgelsesresultater:** Hvad viste jeres brugertests, og hvordan påvirkede resultaterne jeres valg?
5. **Det endelige design og produkt:** Hvilke virkemidler endte I med, hvordan er de implementeret og systematiseret i jeres designsystem, og hvordan har I sikret tilgængelighed, performance og eventuelt it-sikkerhed?
6. **Proces og samarbejde:** Hvordan planlagde og styrede I processen, og hvordan arbejdede I med design og kode i samspil?
7. **Faglig refleksion:** Hvornår er delight godt UX? Hvilke effekter fjernede I – og hvorfor? Hvad kunne være næste skridt?

<hr style="margin: 2rem 0;">

## Omfang og aflevering

Eksamensmaterialet afleveres **tirsdag 24. november 2026 kl. 12.00 via WISEflow**.

<!-- TODO: Beskriv, hvordan gruppeafleveringen sættes op i WISEflow, når det er afklaret. -->

Efter afleveringen ser forløbet sådan ud:

- **24.-27. november:** Forberedelse af pitch
- **Fredag 27. november:** Pitch Day
- **Uge 49:** Optimering og eksamensforberedelse
- **9.-11. december:** Mundtlige eksamener

Det skriftlige materiale må fylde **maksimalt fem normalsider svarende til 12.000 anslag inklusive mellemrum**. Kun brødteksten tæller med. Illustrationer tæller som ét anslag, medmindre det er teksttunge figurer eller tabeller. Forside, indholdsfortegnelse, litteraturliste og bilag tæller ikke med. Bilag indgår ikke i bedømmelsen.

Forsiden af PDF-dokumentet skal indeholde gruppens navne, hold og uddannelse samt links til den deployede løsning, GitHub-repositoryet og Figma-filen.

Det skriftlige materiale skrives som udgangspunkt på dansk.

Produktet, repositoryet og Figma-filen skal være tilgængelige via de afleverede links frem til, at bedømmelsen er færdig. GitHub-repositoryet skal være offentligt, og Figma-filen skal kunne åbnes af alle med linket. Test linkene i et privat browservindue, hvor I ikke er logget ind.

**`main`-branchen er jeres aflevering.** Den deployede løsning skal være bygget fra `main`, og `main` må ikke ændres efter afleveringsfristen, før bedømmelsen er færdig.

### Optimering efter afleveringen

I uge 49 arbejder I videre med at optimere produktet ud fra fx feedback fra Pitch Day, nye tests eller jeres egne vurderinger. Optimeringerne udvikles på separate branches og må ikke merges ind i `main`. Vis dem til eksamen fx via en preview-deployment af jeres branch.

Til den mundtlige prøve viser og begrunder I, hvad I har forbedret og hvorfor. Optimeringen indgår i bedømmelsen som en del af den mundtlige præstation.

<hr style="margin: 2rem 0;">

## Den mundtlige prøve

Den mundtlige prøve varer 40-50 minutter afhængigt af antallet af studerende i gruppen:

1. **Gruppepræsentation af produkt, proces og refleksioner:** ca. 15 minutter
2. **Gruppeeksamination:** ca. 10 minutter pr. studerende i gruppen
3. **Votering og meddelelse af karakter:** 15 minutter

Eksamensplanen med tidspunkter for de enkelte grupper offentliggøres på Canvas.

Brug præsentationen til at vise produktet i brug. Delight skal opleves – ikke kun beskrives.

Præsentationen skal også vise, hvad I har optimeret efter afleveringen, og hvordan forbedringerne bygger på feedback, test eller nye indsigter.

Hav en kort skærmoptagelse af produktet klar som backup, hvis demoen fejler.

Eksaminationen foregår i gruppen, men karakteren er individuel. Hver studerende skal derfor kunne redegøre for hele projektet – både design, kode og proces – og ikke kun for egne dele.

<hr style="margin: 2rem 0;">

## Forudsætninger og redelighed

For at gå til den mundtlige prøve skal det skriftlige materiale være redeligt, opfylde formkravene og være rettidigt afleveret.

Materialet skal give et retvisende billede af gruppens arbejde. Gør kilder, inspiration og anvendte assets tydelige, og følg uddannelsens regler for brug og deklaration af digitale værktøjer og generativ AI.

<hr style="margin: 2rem 0;">

## Bedømmelse

Prøven bedømmes efter 7-trinsskalaen med ekstern censur. Hver studerende får én individuel karakter ud fra en helhedsvurdering af projektet og den mundtlige præstation. Den mundtlige præstation omfatter også præsentationen af og refleksionen over jeres optimeringer.

I bedømmelsen lægges der især vægt på:

- en tydelig sammenhæng mellem analyse, hypotese, test og endeligt design
- kvaliteten og gennemarbejdningen af detaljerne i det implementerede produkt
- hvordan dynamiske elementer, datakilde og designsystem er udvalgt og anvendt
- tilgængelighed, performance og eventuelt it-sikkerhed
- validiteten af jeres undersøgelsesresultater og jeres kritiske vurdering af dem
- den faglige refleksion over balancen mellem delight og usability
- evnen til at formidle og begrunde jeres valg – både skriftligt og mundtligt

Hvis du ikke består prøven, går du til omprøve med udgangspunkt i det afleverede projekt.

<hr style="margin: 2rem 0;">

## Tjek før aflevering

- Et deployet, fungerende produkt bygget i React med mindst én datakilde
- Fungerende links på forsiden til den deployede løsning, et offentligt GitHub-repository og en Figma-fil, der kan åbnes af alle med linket
- Skriftligt materiale på maksimalt 12.000 anslag inklusive mellemrum med hypotese, undersøgelsesresultater og faglig refleksion
- Tilgængelighed, performance og eventuelt it-sikkerhed er håndteret og beskrevet
- Kilder, inspiration og brug af AI er deklareret
- Det fremgår af produktet, at det er et studieprojekt
- Ét PDF-dokument med gruppens navne, hold og uddannelse afleveret i WISEflow senest tirsdag 24. november 2026 kl. 12.00
- Den deployede løsning er bygget fra `main`, og optimeringer efter afleveringen ligger på separate branches, der ikke merges ind i `main`

<hr style="margin: 2rem 0;">

Beskrivelsen bygger på studieordningens bestemmelser for prøven i [Dynamic User Interface (afsnit 3.6)](https://www.eaaa.dk/media/pazlkzl5/studieordning-multimediedesigner-lokal-del-interactive-design-august-2025-opdateret.pdf) og udgør de præcise krav til projektet, det skriftlige materiale og produktet.
