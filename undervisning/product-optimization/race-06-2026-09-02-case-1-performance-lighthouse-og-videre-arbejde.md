# RACE - Product optimization: Case 1 · Performance, Lighthouse og videre arbejde - 02-09-2026

## Formål

I dag bruger vi performance som det sidste fælles perspektiv på Case 1. Lighthouse hjælper med at finde mulige problemer, mens Network-panelet, Performance-panelet og den faktiske brugeroplevelse bruges til at undersøge årsagen.

Efter det fælles indspark arbejder du videre med din prioriterede audit og får vejledning dér, hvor du har mest brug for det. Du kan arbejde med et relevant performanceproblem eller en anden central forbedring i Case 1. Målet er ikke en bestemt Lighthouse-score eller en færdig løsning, men at du kan undersøge, prioritere og dokumentere dit arbejde.

<hr style="margin: 2rem 0;">

## Forberedelse

- Sørg for, at din løsning fungerer lokalt, og at din seneste stabile version er deployet.
- Medbring din tekniske audit og din prioriterede liste over forbedringer.
- Du behøver ikke have gennemført en Lighthouse-test på forhånd.

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Kort recap fra relationer og indlejrede data → tag udgangspunkt i brugeren → lav en baseline (måling før ændringen) → undersøg årsagen → vælg en forbedring → mål igen → dokumentér resultat og næste skridt.

<details style="margin-left: 1.5rem;">
<summary><strong>0. Kort recap fra i går</strong></summary>
<ul>
<li>Følg relationen fra <code>posts.userId</code> til den indlejrede <code>post.user</code> gennem formular, request, database og visning.</li>
<li>Brug recap'et som bro til dagens spørgsmål: Hvilke felter har UI'et faktisk brug for at hente?</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>1. Fra brugeroplevelse til Lighthouse-spor</strong></summary>
<ul>
<li>Tag udgangspunkt i konkrete brugerflows og skeln mellem teknisk og oplevet performance.</li>
<li>Se på indlæsning, visuel stabilitet, respons og feedback – ikke kun en samlet score.</li>
<li>Vurdér konsekvensen for brugeren, før du beslutter, om et problem skal prioriteres.</li>
<li>Kør Lighthouse på den deployede løsning for alle centrale sidetyper/routes – ikke kun forsiden. Brug kun en lokal production build som kontrol under udvikling.</li>
<li>Brug Mellemrum-rapportens kontrast som eksempel: Performance 99, men cirka 7,7 MiB overført og et estimeret billedpotentiale på 6,9 MiB. Tallene er spor, ikke løsningen.</li>
<li>Test mobil og desktop hver for sig, og hold route, device, throttling og <code>Clear storage</code> ens, når du sammenligner målinger.</li>
<li>Brug gerne Incognito for at reducere påvirkning fra extensions og eksisterende browserdata.</li>
<li>Kør målingen tre gange, notér et typisk resultat og hvor meget det svinger. Sammenlign ikke localhost direkte med deployment.</li>
<li>En høj score og fraværet af et væsentligt problem er også et gyldigt resultat. Opfind ikke en optimering for at ramme 100.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Brug Network til at undersøge årsagen</strong></summary>
<ul>
<li>Brug Lighthouse-rapporten som et spor, og undersøg derefter de konkrete requests i Network gennem centrale brugerflows.</li>
<li>Se, hvad appen henter, hvornår det bliver hentet, hvor meget der overføres, og om noget bliver hentet flere gange.</li>
<li>Test et første besøg med <code>Disable cache</code> slået til. Til et gentaget besøg: Slå indstillingen fra, load siden én gang for at fylde cachen, ryd loggen, og reload derefter igen under samme forhold.</li>
<li>Ryd Network-loggen før et nyt run, start recording før reload eller klik, og brug kun <code>Preserve log</code>, når et flow navigerer mellem sider.</li>
<li>Brug kun Performance-panelet eller React DevTools Profiler, hvis Network ikke forklarer et langsomt load eller en langsom interaktion.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Billeder, filer og indlæsning</strong></summary>
<ul>
<li>Resize billeder til deres konkrete brug, eksportér som <code>WebP</code> eller <code>AVIF</code>, og sammenlign kvalitet og filstørrelse.</li>
<li>Brug Inspect på <code>&lt;img&gt;</code> til at sammenligne <em>rendered size</em>, <em>intrinsic size</em> og filstørrelse.</li>
<li>For billeder fra Unsplash kan URL-parametre som <code>w</code>, <code>h</code>, <code>q</code>, <code>auto=format</code> og <code>fit</code> bruges til at hente en variant, der passer bedre til den konkrete brug. Brug fx <code>fit=crop</code> sammen med en ønsket bredde og højde. <a href="https://unsplash.com/documentation#dynamically-resizable-images">Se Unsplash: Dynamically resizable images</a>.</li>
<li>Angiv helst billedfilens faktiske pixelmål med <code>width</code> og <code>height</code>. Det reserverer det rigtige aspect ratio; CSS styrer stadig den responsive, viste størrelse.</li>
<li>Brug kun <code>loading="lazy"</code> på billeder under den første viewport – ikke på hero- eller LCP-billedet.</li>
<li>Behold originalen som arbejdsfil, og deploy kun de optimerede billeder, løsningen bruger.</li>
<li>Undersøg også store eller unødvendige fonte, filer og dependencies.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Supabase og data</strong></summary>
<ul>
<li>Brug Network-panelet til at se, hvad der hentes, hvornår det hentes, og hvor meget data der overføres.</li>
<li>Hent kun de nødvendige kolonner og rækker: Start med komponentens render, links og formularer, og lad dens behov styre REST-URL’ens <code>select</code>-felter — også inde i relaterede tabeller.</li>
<li>Se på responsens størrelse, og prioritér kun ændringen, hvis den har tydelig betydning sammenlignet med appens øvrige requests.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. JavaScript og React</strong></summary>
<ul>
<li>Kontrollér mistænkte gentagelser i en production build, så React Strict Mode ikke fejltolkes som et produktionsproblem.</li>
<li>Undersøg kun renderinger med React DevTools Profiler, hvis et konkret brugerflow virker langsomt.</li>
<li>Overvej lazy loading af større routes, hvis målingen viser, at den første JavaScript-indlæsning er et relevant problem.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Arbejd videre med Case 1 og få vejledning</strong></summary>
<ul>
<li>Gør status på din audit, og vælg et performanceproblem eller en anden central forbedring.</li>
<li>Hvis performance allerede er tilfredsstillende, dokumentér konklusionen kort og prioritér noget vigtigere.</li>
<li>Dokumentér problemet og en relevant baseline, og lav én ændring i en tydeligt navngivet feature branch.</li>
<li>Mål igen under de samme forhold, og vurder både forskellen i værktøjerne og betydningen for brugeren.</li>
<li>Få vejledning dér, hvor du har brug for det, og dokumentér resultatet samt næste skridt.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Post App-recap:**
  - [Løsning · posts og users med relation](https://github.com/cederdorff/post-app-supabase/tree/posts-and-users)
  - [Løsning · vælg user i formularen](https://github.com/cederdorff/post-app-supabase/tree/feature/select-post-user)
  - [Løsning · performance-eksempler med målrettede felter og lazy loading](https://github.com/cederdorff/post-app-supabase/tree/feature/performance-examples)
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
