# Dynamic User Interface – eksamen og aflevering

## Dynamic User Interface eksamen (15 ECTS)

Dynamic User Interface afsluttes med en **mundtlig gruppeprøve** på baggrund af et gruppeprojekt. I projektet designer og programmerer I en forbedret version af et eksisterende digitalt produkt.

Projektets omdrejningspunkt er:

> **Make it memorable – but don't break it.**

Mange digitale produkter er brugervenlige, men kedelige. De løser opgaven, men ingen husker oplevelsen. I dette projekt skal I tage udgangspunkt i noget, der allerede virker, og gøre det lækkert. I skal arbejde helt ned i detaljen med motion, microinteractions, feedback, lyd, illustration, tone of voice og personlighed – og samtidig dokumentere, at produktet stadig understøtter brugerens mål.

Lad jer inspirere af fx [Not Boring Software](https://notbor.ing/), der laver helt almindelige værktøjer som vejr, lommeregner og timer til sjove, overraskende og mindeværdige oplevelser.

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

Det centrale spørgsmål er: **Hvornår begynder delight at skade usability – og kan vi måle det?**

### 6. Design og byg det forbedrede produkt

Implementér det endelige design som en fungerende, deployet løsning. Produktet skal:

- være bygget med de teknologier, vi har arbejdet med i forløbet, fx Next.js og React, Tailwind og shadcn/ui
- indeholde dynamiske elementer og dynamisk indhold, fx via API'er, headless CMS eller Supabase
- bruge virkemidler som motion, microinteractions, lyd, illustration eller gamification med en tydelig begrundelse
- være tilgængeligt – fx med respekt for `prefers-reduced-motion`, tastaturbetjening, tilstrækkelig kontrast og mulighed for at slå lyd fra, og lyd og animation må ikke være eneste bærer af information
- tage højde for performance, så effekter ikke gør produktet langsomt eller tungt
- tage højde for it-sikkerhed, hvis løsningen håndterer brugere, data eller beskyttet adgang

Værktøjer som [Rive](https://rive.app/), Lottie og Motion må gerne indgå, men vælg dem ud fra, hvad oplevelsen kræver.

<hr style="margin: 2rem 0;">

## Det samlede eksamensmateriale

Jeres eksamensmateriale består af:

1. **Det forbedrede produkt** – en deployet, fungerende løsning.
2. **Kode og designfiler** – link til GitHub-repository og Figma-fil.
3. **Skriftligt materiale** på maksimalt fem normalsider med undersøgelsesresultater og faglige refleksioner over projekt og produkt.
4. **Ét PDF-dokument til WISEflow** med det skriftlige materiale og direkte links til produkt, repository og Figma.

<hr style="margin: 2rem 0;">

## Hvad skal det skriftlige materiale vise?

Det skriftlige materiale skal kort og fagligt vise sammenhængen:

**udgangspunkt → hypotese → udforskning → test → valg → produkt → refleksion**

Det skal indeholde:

1. **Udgangspunkt og problem:** Hvilket produkt og hvilken interaktion har I valgt, og hvad er problemet med det oprindelige interface? Vis gerne før-billeder.
2. **Delight-hypotese:** Hvad ville I opnå, og hvordan ville I vide, om det lykkedes?
3. **Udforskning og iteration:** Hvordan udforskede I spektret fra funktionel til ekspressiv, og hvad lærte I af det?
4. **Undersøgelsesresultater:** Hvad viste jeres brugertests, og hvordan påvirkede resultaterne jeres valg?
5. **Det endelige design og produkt:** Hvilke virkemidler endte I med, hvordan er de implementeret, og hvordan har I sikret tilgængelighed, performance og eventuelt it-sikkerhed?
6. **Proces og samarbejde:** Hvordan planlagde og styrede I processen, og hvordan arbejdede I med design og kode i samspil?
7. **Faglig refleksion:** Hvornår er delight godt UX? Hvilke effekter fjernede I – og hvorfor? Hvad kunne være næste skridt?

<hr style="margin: 2rem 0;">

## Omfang og aflevering

Eksamensmaterialet afleveres **24. november 2026 før kl. 12.00 via WISEflow**.

Det skriftlige materiale må fylde **maksimalt fem normalsider svarende til 12.000 anslag inklusive mellemrum**. Kun brødteksten tæller med. Illustrationer tæller som ét anslag, medmindre det er teksttunge figurer eller tabeller. Forside, indholdsfortegnelse, litteraturliste og bilag tæller ikke med. Bilag indgår ikke i bedømmelsen.

PDF-dokumentet skal indeholde gruppens navne, hold og uddannelse.

Det skriftlige materiale skrives som udgangspunkt på dansk.

Produktet, repositoryet og Figma-filen skal være tilgængelige via de afleverede links frem til, at bedømmelsen er færdig.

<hr style="margin: 2rem 0;">

## Den mundtlige prøve

Den mundtlige prøve varer 40-50 minutter afhængigt af antallet af studerende i gruppen:

1. **Gruppepræsentation af produkt, proces og refleksioner:** ca. 15 minutter
2. **Gruppeeksamination:** ca. 10 minutter pr. studerende i gruppen
3. **Votering og meddelelse af karakter:** 15 minutter

Brug præsentationen til at vise produktet i brug. Delight skal opleves – ikke kun beskrives.

<hr style="margin: 2rem 0;">

## Forudsætninger og redelighed

For at gå til den mundtlige prøve skal det skriftlige materiale være redeligt, opfylde formkravene og være rettidigt afleveret.

Materialet skal give et retvisende billede af gruppens arbejde. Gør kilder, inspiration og anvendte assets tydelige, og følg uddannelsens regler for brug og deklaration af digitale værktøjer og generativ AI.

<hr style="margin: 2rem 0;">

## Bedømmelse

Prøven bedømmes efter 7-trinsskalaen med ekstern censur. Hver studerende får én individuel karakter ud fra en helhedsvurdering af projektet og den mundtlige præstation.

Hvis du ikke består prøven, går du til omprøve med udgangspunkt i det afleverede projekt.

<hr style="margin: 2rem 0;">

## Tjek før aflevering

- Et deployet, fungerende produkt med dynamiske elementer
- Fungerende links til produkt, GitHub-repository og Figma-fil
- Skriftligt materiale på maksimalt 12.000 anslag inklusive mellemrum med hypotese, undersøgelsesresultater og faglig refleksion
- Tilgængelighed, performance og eventuelt it-sikkerhed er håndteret og beskrevet
- Kilder, inspiration og brug af AI er deklareret
- Ét PDF-dokument med gruppens navne, hold og uddannelse afleveret i WISEflow senest 24. november 2026 før kl. 12.00

<hr style="margin: 2rem 0;">

Beskrivelsen bygger på studieordningens bestemmelser for prøven i Dynamic User Interface (afsnit 3.6). De konkrete krav og øvrige afleveringsoplysninger offentliggøres på Canvas.
