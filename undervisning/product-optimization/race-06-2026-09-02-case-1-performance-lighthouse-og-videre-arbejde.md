# RACE - Product optimization: Case 1 · Performance, Lighthouse og videre arbejde - 02-09-2026

## Formål

I dag bruger vi performance som det sidste fælles perspektiv på Case 1. Lighthouse hjælper med at finde mulige problemer, mens Network-panelet, Performance-panelet og den faktiske brugeroplevelse bruges til at undersøge årsagen.

Efter det fælles indspark arbejder du videre med din prioriterede audit og får vejledning dér, hvor du har mest brug for det. Du kan arbejde med et relevant performancefund eller en anden central forbedring i Case 1. Målet er ikke en bestemt Lighthouse-score eller en færdig løsning, men at du kan undersøge, prioritere og dokumentere dit arbejde.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at din løsning fungerer lokalt, og at din seneste stabile version er deployet.
- Medbring din tekniske audit og din prioriterede liste over forbedringer.
- Du behøver ikke have gennemført en Lighthouse-test på forhånd.

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Kort recap fra relationer og nested data → fælles performanceindspark → etablér en baseline → vurdér om der er et væsentligt fund → arbejd videre med Case 1 → dokumentér status og næste skridt.

<details style="margin-left: 1.5rem;">
<summary><strong>0. Kort recap fra i går</strong></summary>
<ul>
<li>Følg relationen fra <code>posts.userId</code> til den indlejrede <code>post.user</code> gennem formular, request, database og visning.</li>
<li>Brug recap'et som bro til dagens spørgsmål: Hvilke felter har UI'et faktisk brug for at hente?</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>1. Performance med udgangspunkt i brugeren</strong></summary>
<ul>
<li>Tag udgangspunkt i konkrete brugerflows og skeln mellem teknisk og oplevet performance.</li>
<li>Se på indlæsning, visuel stabilitet, respons og feedback – ikke kun en samlet score.</li>
<li>Vurdér konsekvensen for brugeren, før du beslutter, om et fund skal prioriteres.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Fra Lighthouse til et begrundet fund</strong></summary>
<ul>
<li>Kør Lighthouse på den deployede løsning for alle centrale sidetyper/routes – ikke kun forsiden. Brug kun en lokal production build som kontrol under udvikling.</li>
<li>Brug rapporten til at formulere mulige problemer, og undersøg dem videre med Network-panelet gennem de centrale brugerflows.</li>
<li>Brug Mellemrum-rapportens kontrast som eksempel: Performance 99, men cirka 7,7 MiB overført og et estimeret billedpotentiale på 6,9 MiB. Tallene er spor, ikke løsningen.</li>
<li>Skeln tydeligt mellem testvalgene: Incognito reducerer påvirkning fra extensions og eksisterende browserdata; Lighthouse-indstillingen <code>Clear storage</code> vælger mellem et første og et gentaget besøg; <code>Disable cache</code> ændrer cache-scenariet i Network.</li>
<li>Test et første besøg i Network med <code>Disable cache</code> slået til. Til et gentaget besøg: Slå indstillingen fra, load siden én gang for at fylde cachen, ryd loggen, og reload derefter igen under samme forhold.</li>
<li>Ryd Network-loggen før et nyt run, start recording før reload eller klik, og brug kun <code>Preserve log</code>, når et flow navigerer mellem sider.</li>
<li>Brug kun Performance-panelet eller React DevTools Profiler, hvis et load eller en interaktion kræver en dybere undersøgelse.</li>
<li>Gentag målinger under samme forhold, og sammenlign ikke localhost direkte med deployment.</li>
<li>En høj score og fraværet af et væsentligt problem er også et gyldigt resultat. Opfind ikke en optimering for at ramme 100.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Billeder, assets og indlæsning</strong></summary>
<ul>
<li>Resize billeder til deres konkrete brug, eksportér som <code>WebP</code> eller <code>AVIF</code>, og sammenlign kvalitet og filstørrelse.</li>
<li>Brug Inspect på <code>&lt;img&gt;</code> til at sammenligne <em>rendered size</em>, <em>intrinsic size</em> og filstørrelse.</li>
<li>For billeder fra Unsplash kan URL-parametre som <code>w</code>, <code>h</code>, <code>q</code>, <code>auto=format</code> og <code>fit</code> bruges til at hente en variant, der passer bedre til den konkrete brug. Brug fx <code>fit=crop</code> sammen med en ønsket bredde og højde. <a href="https://unsplash.com/documentation#dynamically-resizable-images">Se Unsplash: Dynamically resizable images</a>.</li>
<li>Angiv helst billedfilens faktiske pixelmål med <code>width</code> og <code>height</code>. Det reserverer det rigtige aspect ratio; CSS styrer stadig den responsive, viste størrelse.</li>
<li>Brug kun <code>loading="lazy"</code> på billeder under den første viewport – ikke på hero- eller LCP-billedet.</li>
<li>Behold originalen som arbejdsfil, og deploy kun de optimerede billeder, løsningen bruger.</li>
<li>Undersøg store eller unødvendige fonte, assets og dependencies.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Requests, Supabase og React</strong></summary>
<ul>
<li>Brug Network-panelet til at se, hvad der hentes, hvornår det hentes, og hvor meget data der overføres.</li>
<li>Hent kun de nødvendige kolonner og rækker: Start med komponentens render, links og formularer, og lad dens behov styre REST-URL’ens <code>select</code>-felter — også inde i relaterede tabeller.</li>
<li>Kontrollér mistænkte gentagelser i en production build, så React Strict Mode ikke fejltolkes som et produktionsproblem.</li>
<li>Undersøg kun renderinger med React DevTools Profiler, hvis et konkret brugerflow virker langsomt.</li>
<li>Overvej lazy loading af større routes, hvis målingen viser, at den første JavaScript-indlæsning er et relevant problem.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Arbejd videre med Case 1 og få vejledning</strong></summary>
<ul>
<li>Gør status på din audit, og vælg et performancefund eller en anden central forbedring.</li>
<li>Hvis performance allerede er tilfredsstillende, dokumentér konklusionen kort og prioritér noget vigtigere.</li>
<li>Dokumentér problemet og en relevant baseline, og arbejd videre i en tydeligt navngivet feature branch.</li>
<li>Få vejledning dér, hvor du har brug for det, og dokumentér det, du når, samt næste skridt.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Case 1:**
  - [Casebeskrivelse: Fra prototype til produktionsklar React-løsning](https://eaaa.instructure.com/courses/30922/pages/case-1-fra-prototype-til-produktionsklar-react-losning)
- **Audit:**
  - [Teknisk audit af en React-løsning](https://eaaa.instructure.com/courses/30922/pages/teknisk-audit-af-en-react-losning)
- **Værktøjer:**
  - [Lighthouse](https://developer.chrome.com/docs/lighthouse)
  - [Chrome DevTools · Network](https://developer.chrome.com/docs/devtools/network/overview)
  - [Chrome DevTools · Performance](https://developer.chrome.com/docs/devtools/performance/overview)
  - [React Developer Tools](https://react.dev/learn/react-developer-tools)
  - [Image performance](https://web.dev/learn/performance/image-performance)
- **Slides:**
  - [Performance, Lighthouse og videre arbejde](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-06/)
