# RACE - Product optimization: Case 1 · Performance, Lighthouse og dokumenteret effekt - 02-09-2026

## Formål

I dag undersøger du performance i en React-løsning. Vi bruger Lighthouse og browserens udviklerværktøjer til at finde konkrete problemer og vurdere deres betydning for brugeren.

Vi arbejder med billeder og assets, requests og Supabase-data, React-renderinger og oplevet performance. Målet er ikke en bestemt Lighthouse-score, men at du kan vælge en relevant forbedring og dokumentere dens effekt.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at din løsning fungerer lokalt, og at din seneste stabile version er deployet.
- Medbring din tekniske audit og din prioriterede optimeringsplan.
- Du behøver ikke have gennemført en Lighthouse-test på forhånd.

<hr style="margin: 2rem 0;">

## Agenda

<details style="margin-left: 1.5rem;">
<summary><strong>1. Hvad betyder performance for brugeren?</strong></summary>
<ul>
<li>Skeln mellem teknisk performance og oplevet performance.</li>
<li>Se på indlæsning, visuel stabilitet, respons og feedback.</li>
<li>Tag udgangspunkt i konkrete brugerflows frem for optimering for optimeringens skyld.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Lighthouse og en sammenlignelig baseline</strong></summary>
<ul>
<li>Kør Lighthouse i Chrome, og brug rapporten til at finde områder, der skal undersøges nærmere.</li>
<li>Gentag målinger under de samme forhold, og sammenlign ikke localhost direkte med deployment.</li>
<li>Brug <code>npm run build</code> og <code>npm run preview</code>, når du vil undersøge løsningen uden development-adfærd.</li>
<li>Undersøg også Network-panelet, konsollen og den faktiske brugeroplevelse.</li>
<li>Brug scoren som et pejlemærke – ikke som målet for arbejdet.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Billeder, assets og dependencies</strong></summary>
<ul>
<li>Brug passende billeddimensioner og moderne filformater.</li>
<li>Angiv bredde og højde, så layoutet ikke flytter sig under indlæsning.</li>
<li>Brug <code>loading="lazy"</code> til billeder længere nede på siden.</li>
<li>Undgå lazy loading af sidens vigtigste billede.</li>
<li>Undersøg store eller unødvendige fonte og andre assets.</li>
<li>Find og fjern dependencies, som projektet ikke længere bruger.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Requests, søgning og Supabase-data</strong></summary>
<ul>
<li>Hent kun de kolonner og rækker, som brugergrænsefladen har brug for.</li>
<li>Brug Network-panelet til at se, hvad der hentes fra Supabase, hvornår det hentes, og hvor mange gange det hentes.</li>
<li>Vær opmærksom på, at React Strict Mode kan genkøre effects i development. Kontrollér derfor også en production build, før du vurderer et gentaget request.</li>
<li>Find requests, der er unødvendige, gentagne eller sender mere data end nødvendigt.</li>
<li>Vurdér, om søgning og filtrering skal ske lokalt eller gennem Supabase.</li>
<li>Overvej datamængde, antal requests og brugeroplevelse i dit valg.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. React-renderinger og oplevet performance</strong></summary>
<ul>
<li>Fjern state, der gentager værdier eller kan beregnes ud fra eksisterende data.</li>
<li>Undersøg effects, der udløser unødvendige requests eller opdateringer.</li>
<li>Brug stabile og korrekte <code>key</code>-værdier i lister.</li>
<li>Afprøv <code>React.lazy</code> og <code>Suspense</code> til større side- eller route-komponenter, hvis det reducerer den første indlæsning.</li>
<li>Bevar relevant indhold på skærmen, og giv tydelig feedback under ventetid.</li>
<li>Optimér kun renderinger, når du kan beskrive og dokumentere problemet.</li>
<li>Behold <code>StrictMode</code>; det skal ikke fjernes for at skjule development-adfærd.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Implementér og verificér en forbedring</strong></summary>
<ul>
<li>Vælg ét relevant performancefund fra din audit.</li>
<li>Arbejd med forbedringen i en tydeligt navngivet feature branch.</li>
<li>Gentag testen under de samme forhold.</li>
<li>Dokumentér før, ændring, efter og eventuelle begrænsninger.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Case 1:**
  - [Casebeskrivelse: Fra prototype til produktionsklar React-løsning](https://eaaa.instructure.com/courses/30922/pages/case-1-fra-prototype-til-produktionsklar-react-losning)
- **Audit:**
  - [Teknisk audit af en React-løsning](https://eaaa.instructure.com/courses/30922/pages/teknisk-audit-af-en-react-losning)
