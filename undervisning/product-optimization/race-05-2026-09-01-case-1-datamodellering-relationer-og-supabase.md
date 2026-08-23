# RACE - Product optimization: Case 1 · Datamodellering, relationer og Supabase - 01-09-2026

## Formål

At bygge videre på de studerendes erfaring med simpel CRUD ved at forbedre løsningens datamodel og gøre kommunikationen mellem React og Supabase mere overskuelig og robust.

Efter undervisningen skal du kunne modellere en enkel relation mellem tabeller, hente relaterede data med Supabase og adskille dataadgang fra præsentationslogik.

<hr style="margin: 2rem 0;">

## Forberedelse

- Medbring den seneste version af din løsning.
- Find de steder, hvor løsningen bruger den CRUD, filtrering eller sortering, I arbejdede med på 2. semester.
- Notér, om løsningen bruger Supabase SDK, direkte REST-kald eller begge dele.

<hr style="margin: 2rem 0;">

## Agenda

<details style="margin-left: 1.5rem;">
<summary><strong>1. Fra gentagne data til relationer</strong></summary>
<ul>
<li>Fra flere isolerede tabeller til en sammenhængende datamodel.</li>
<li>Post App-eksempel: Gem først navn og avatar direkte på hver post.</li>
<li>Undersøg konsekvenserne af duplikerede og inkonsistente brugerdata.</li>
<li>Primærnøgler, fremmednøgler og relationen: Én bruger kan have mange posts.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Opdel og forbind data</strong></summary>
<ul>
<li>Opdel data i <code>users</code> og <code>posts</code>.</li>
<li>Forbind tabellerne med en fremmednøgle.</li>
<li>Hent de relaterede data med Supabase SDK.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Supabase SDK og REST</strong></summary>
<ul>
<li>Sammenlign Supabase SDK med den kendte REST- og <code>fetch</code>-tilgang.</li>
<li>Undersøg, hvordan de to tilgange beskriver den samme forespørgsel.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Dataadgang og robuste UI-states</strong></summary>
<ul>
<li>Saml forespørgsler og mutationer i et tydeligt data- eller service-lag.</li>
<li>Håndtér loading, fejl, tomme resultater og brugerfeedback konsistent.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Overfør princippet til Case 1</strong></summary>
<ul>
<li>Arbejd med relationen i den eksisterende case-løsning.</li>
<li>Vurdér, om datamodellen og koden er blevet lettere at forstå og videreudvikle.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:**
  - Vil blive tilgængelige her
- **Opgaver:**
  - Datamodellerings- og Supabase-øvelse vil blive tilgængelig her
- **Links:**
  - Vil blive tilgængelige her
