# RACE - Dynamic User Interface: User management, roller og beskyttet adgang - 10-11-2026

## Formål

Sidst fik lab-appen login. I dag bygger vi videre med user management, brugerroller og beskyttet adgang til data. Vi kobler også de to datakilder: Indholdet kommer fra WordPress, mens brugerdata gemmes i Supabase.

Målet er, at lab-appen har profiler, at brugere kan gemme eller tilføje noget til WordPress-indholdet, og at data er beskyttet med Row Level Security. Bagefter overfører I principperne til jeres gruppeprojekt.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at din lab-app kører lokalt med login fra 30. oktober.
- Overvej, hvilke brugerdata jeres gruppeprojekt har brug for, og hvem der må se og ændre dem.
- Genbesøg gerne relationen mellem `users` og `posts` fra Case 1 i Product optimization.

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Kort recap af login-flowet → profiler → kobl WordPress og Supabase → beskyt data med RLS → roller → overfør til jeres projekt.

<details style="margin-left: 1.5rem;">
<summary><strong>0. Kort recap af login-flowet</strong></summary>
<ul>
<li>Følg en bruger fra sign in over cookie og session til en beskyttet side.</li>
<li>Hvor tjekker vi brugeren, og hvorfor sker det på serveren?</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>1. Profiler: auth.users og profiles</strong></summary>
<ul>
<li><code>auth.users</code> håndteres af Supabase og kan ikke tilgås direkte fra appen. Brugerdata som navn og billede gemmes derfor i en <code>profiles</code>-tabel.</li>
<li>Kobl <code>profiles.id</code> til <code>auth.users.id</code>, ligesom relationen mellem <code>users</code> og <code>posts</code> i Case 1.</li>
<li>Opret automatisk en profil, når en bruger oprettes, med en trigger i databasen.</li>
<li>Byg en profilside, hvor brugeren kan se og redigere sit navn.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Kobl WordPress-indhold og Supabase-brugerdata</strong></summary>
<ul>
<li>Lad brugere gemme favoritter eller skrive kommentarer til WordPress-posts.</li>
<li>Opret en tabel, fx <code>favorites</code> med <code>user_id</code> og <code>post_slug</code>, der refererer til både Supabase-brugeren og WordPress-indholdet.</li>
<li>Diskutér: Hvorfor gemmer vi ikke brugerdata i WordPress, og hvorfor lægger vi ikke indholdet i Supabase?</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Row Level Security</strong></summary>
<ul>
<li>Slå RLS til på dine tabeller, og se, hvad der sker, når der ikke findes nogen policies.</li>
<li>Skriv policies med <code>auth.uid()</code>, så brugere kun kan læse og ændre deres egne data.</li>
<li>Test som bruger, der ikke er logget ind, som bruger, der er logget ind, og som en anden bruger.</li>
<li>Forstå, hvorfor den publishable key godt må ligge i frontend, når RLS beskytter data, og hvorfor <code>service_role</code>-nøglen aldrig må.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Brugerroller og beskyttet adgang</strong></summary>
<ul>
<li>Tilføj en rolle til profilen, fx <code>user</code> og <code>admin</code>.</li>
<li>Beskyt både routes og data: En admin-side skal tjekke rollen på serveren, og policies skal tjekke den i databasen.</li>
<li>Sørg for, at brugere ikke selv kan ændre deres rolle.</li>
<li>Skjul ikke bare knapper i UI'et. Det, brugeren ikke må, skal også afvises af serveren og databasen.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Overfør til jeres projekt</strong></summary>
<ul>
<li>Lav en datamodel for jeres produkt: Hvilke tabeller, relationer og roller har I brug for?</li>
<li>Beslut, hvilke data der kommer fra WordPress, Supabase eller et andet API.</li>
<li>Skriv ned, hvem der må læse og ændre hvad. Det er grundlaget for jeres policies og for afsnittet om it-sikkerhed.</li>
<li>Begynd på implementeringen i en feature branch.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:** Vil blive tilgængelige her
- **Opgaver:** Vil blive tilgængelige her
- **Supabase:**
  - [User Management](https://supabase.com/docs/guides/auth/managing-user-data)
  - [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
  - [Custom Claims and Role-based Access Control](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac)
  - [Understanding API keys](https://supabase.com/docs/guides/api/api-keys)
