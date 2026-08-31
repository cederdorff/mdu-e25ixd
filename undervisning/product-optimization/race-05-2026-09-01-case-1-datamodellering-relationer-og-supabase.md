# RACE - Product optimization: Case 1 · Datamodellering, relationer og Supabase - 01-09-2026

## Formål

I dag arbejder du med at fordele data på relaterede tabeller og undgå inkonsistente, gentagne oplysninger. Jeg viser princippet med `users` og `posts` i Post App fra 2. semester samt hentning gennem Supabase REST API. Derefter anvender du det på relationerne mellem `venues`, `events` og `registrations` i Mellemrum.

Efter undervisningen skal du kunne:

- identificere data, der gentages og kan blive inkonsistente
- modellere en enkel en-til-mange-relation med primær- og fremmednøgler
- hente relaterede data gennem Supabase REST API og anvende dem i React
- anvende princippet på relationerne mellem `venues`, `events` og `registrations` i Case 1

<hr style="margin: 2rem 0;">

## Forberedelse

- Arbejd videre på Case 1, og sørg for, at Mellemrum og forbindelsen til Supabase fungerer lokalt.
- Medbring din seneste stabile version og din tekniske audit.
- Tænk tilbage på Web App-projektet på 2. semester: Hvilke udfordringer havde du med at strukturere og modellere data? Hvor blev oplysninger gentaget, vanskelige at opdatere eller svære at forbinde?

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Se princippet i Post App → undersøg Mellemrums data → modellér relationerne → begynd implementeringen → verificér arbejdet.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Fra gentagne data til relationer</strong></summary>
<ul>
<li>Tag udgangspunkt i erfaringerne med simple datamodeller og CRUD fra 2. semester.</li>
<li>Undersøg Post App-eksemplet, hvor brugerens navn, mail, titel og billede gemmes direkte på hvert post.</li>
<li>Se, hvordan samme brugerdata bliver gentaget og kan blive inkonsistent, når én bruger opretter flere posts.</li>
<li>Skeln mellem data, der beskriver et post, og data, der beskriver en bruger.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Demonstration: Forbedr Post Appens datamodel</strong></summary>
<ul>
<li>Opdel data i <code>users(id, name, mail, title, image)</code> og <code>posts(id, createdAt, caption, image, userId)</code>.</li>
<li>Brug tabellernes <code>id</code> som primærnøgler og <code>posts.userId</code> som fremmednøgle til <code>users.id</code>.</li>
<li>Læs relationen i begge retninger: En bruger kan oprette mange posts; hvert post tilhører én bruger.</li>
<li>Opret relationen i Supabase, og kontrollér den i Schema Visualizer.</li>
<li>Ret én brugers navn, og se hvordan alle brugerens posts nu kan vise den samme opdaterede oplysning uden at ændre flere postrækker.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Hent relaterede data gennem Supabase REST API</strong></summary>
<ul>
<li>Start enkelt med <code>/posts?select=*,user:users(*)</code>, og se hvordan Supabase indlejrer den relaterede bruger i hvert post.</li>
<li>Udvælg derefter kun de nødvendige felter med <code>/posts?select=id,createdAt,caption,image,userId,user:users(id,name,title,image)</code>.</li>
<li>Sammenlign de to responses, så forbindelsen mellem <code>userId</code>, relationen og det indlejrede brugerobjekt bliver tydelig.</li>
<li>Tilpas React til den nye dataform, fx <code>post.user.name</code>, <code>post.user.title</code> og <code>post.user.image</code>.</li>
<li>Undersøg requestets URL, statuskode og response i browserens Network-panel.</li>
<li>Når et post oprettes, gemmes brugerens <code>id</code> som <code>userId</code> – ikke nye kopier af brugerens oplysninger.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Overfør princippet til Mellemrum</strong></summary>
<ul>
<li>Undersøg den eksisterende datamodel: <code>events</code> gentager venueoplysninger, mens <code>registrations</code> gentager titel, dato og sted fra events.</li>
<li>Modellér <code>venues</code>, <code>events</code> og <code>registrations</code>: Ét venue kan have mange events, og ét event kan have mange tilmeldinger.</li>
<li>Forbind <code>events.venueId</code> med <code>venues.id</code> og <code>registrations.eventId</code> med <code>events.id</code>.</li>
<li>Hent events med deres venue og tilmeldinger med deres event gennem Supabase REST API.</li>
<li>Tilpas tilmeldingsflowet, så en ny tilmelding gemmes med det valgte <code>eventId</code>, og tilpas den interne side til det relaterede response.</li>
<li>Bevar de gamle kolonner, indtil de eksisterende rækker er forbundet, og de nye requests og visninger virker.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Verificér og dokumentér arbejdet</strong></summary>
<ul>
<li>Kontrollér de relationer, du har oprettet, i Schema Visualizer og Table Editor.</li>
<li>Brug Network-panelet og UI'et til at verificere de dele, du har implementeret.</li>
<li>Dokumentér problemet, din model, status og næste skridt i den tekniske audit.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Case 1 og audit:**
  - [Casebeskrivelse: Fra prototype til produktionsklar React-løsning](https://eaaa.instructure.com/courses/30922/pages/case-1-fra-prototype-til-produktionsklar-react-losning)
  - [Teknisk audit af en React-løsning](https://eaaa.instructure.com/courses/30922/pages/teknisk-audit-af-en-react-losning)
- **Fælles eksempel:**
  - [Post App med Supabase](https://github.com/cederdorff/post-app-supabase)
- **Supabase:**
  - [Tables and Data · primærnøgler, fremmednøgler og relationer](https://supabase.com/docs/guides/database/tables)
  - [Querying Joins and Nested Tables](https://supabase.com/docs/guides/database/joins-and-nesting)
  - [Data REST API](https://supabase.com/docs/guides/api)
- **Slides:**
  - Vil blive tilgængelige her
