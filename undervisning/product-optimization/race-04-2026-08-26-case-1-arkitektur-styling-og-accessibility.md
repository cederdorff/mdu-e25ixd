# RACE - Product optimization: Case 1 · Arkitektur, styling og accessibility - 26-08-2026

## Formål

I dag ser vi på, hvordan du kan lave en teknisk audit af en React-løsning. Audit betyder, at du undersøger løsningen systematisk, dokumenterer det, du finder, og vurderer, hvilke forbedringer der er vigtigst.

Undervejs får du faglige indspark om arkitektur, styling og accessibility. Vi ser også på best practice for navngivning samt mappe- og projektstruktur. Til sidst prioriterer du dine fund og begynder på én afgrænset forbedring.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at startprojektet og forbindelsen til Supabase fungerer lokalt.
- Læs [casebeskrivelsen](https://eaaa.instructure.com/courses/30922/pages/case-1-fra-prototype-til-produktionsklar-react-losning) igen, og medbring eventuelle spørgsmål eller observationer fra opsætningen.
- Du behøver ikke have gennemført auditten eller ændret løsningen på forhånd.

<hr style="margin: 2rem 0;">

## Agenda

Vi introducerer auditten, får faglige perspektiver på løsningen og bruger dem i arbejdet med Case 1.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Introduktion til teknisk audit</strong></summary>
<ul>
<li>Hvad er en teknisk audit, og hvordan adskiller den sig fra personlige kodepræferencer?</li>
<li>Afgræns løsningens vigtigste brugerflows og tekniske områder.</li>
<li>Dokumentér udgangspunktet, før du ændrer koden.</li>
<li>Registrér konkrete fund, beskriv deres betydning, og prioritér dem efter effekt og indsats.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Faglige indspark: arkitektur, styling og accessibility</strong></summary>
<ul>
<li>Brug tydelige og konsekvente navne til filer, komponenter, funktioner, props og variabler.</li>
<li>Organisér mapper og filer, så projektets sider, komponenter, data og styling er lette at finde.</li>
<li>Se filer som moduler med et afgrænset ansvar, der forbindes med <code>import</code> og <code>export</code>.</li>
<li><strong>Komponenter og ansvar:</strong> Brug <em>separation of concerns</em>, <em>single responsibility</em> og <em>component composition</em> til at undersøge ansvaret mellem pages, komponenter og services.</li>
<li><strong>State og dataflow:</strong> Følg det ensrettede dataflow, brug én <em>single source of truth</em>, og beregn <em>derived state</em> frem for at gemme den samme information igen.</li>
<li><strong>Kontakt med omverdenen:</strong> Hold <em>side effects</em> adskilt fra renderingen, og undersøg klient–server-grænsen mellem React, Supabase REST API og databasen.</li>
<li>Følg et request fra React i browseren gennem Supabase REST API til databasen og tilbage som data eller fejl.</li>
<li>Vurdér placering, ansvar og konsistens i styling.</li>
<li>Undersøg, om datoer, tidspunkter, eventtyper, venues og adresser vises ensartet, og om gentagen formateringslogik har en tydelig placering.</li>
<li>Undersøg relevante problemer med semantik, labels, tastatur og fokus.</li>
<li>Du skal ikke forbedre alt på én gang. Vælg det vigtigste fund.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Arbejd med auditten</strong></summary>
<ul>
<li>Gennemfør de vigtigste brugerflows, og undersøg relevante filer og komponenter.</li>
<li>Brug audit-skabelonen til at dokumentere fund og evidens.</li>
<li>Beskriv konsekvensen for brugeren, produktet eller den videre udvikling.</li>
<li>Lav en realistisk, prioriteret optimeringsplan.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Begynd på en afgrænset forbedring</strong></summary>
<ul>
<li>Opret en tydeligt navngivet feature branch til den valgte forbedring.</li>
<li>Arbejd i små, kontrollerbare skridt uden at ændre anden funktionalitet.</li>
<li>Verificér forbedringen med relevant evidens.</li>
<li>Dokumentér resultatet og det næste prioriterede fund.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Startprojekt:**
  - [Mellemrum](https://github.com/cederdorff/mellemrum)
- **Case 1:**
  - [Casebeskrivelse: Fra prototype til produktionsklar React-løsning](https://eaaa.instructure.com/courses/30922/pages/case-1-fra-prototype-til-produktionsklar-react-losning)
- **Audit:**
  - [Teknisk audit af en React-løsning](https://eaaa.instructure.com/courses/30922/pages/teknisk-audit-af-en-react-losning)
- **Accessibility:**
  - [React og Accessibility (a11y)](https://race.notion.site/React-og-Accessibility-a11y-302bc239db1180bba2b8c5bb9639664c)
