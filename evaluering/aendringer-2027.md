# Ændringer 2027 · analyse pr. forløb

Gælder hold MDU-E26IXD: 2. semester forår 2027 og 3. semester efterår 2027. Det er samme hold, så hele progressionen over de fire forløb kan planlægges samlet.

Grundlag: [2-semester/feedback.md](2-semester/feedback.md), [3-semester/feedback.md](3-semester/feedback.md) og oversigterne. Evidensen er ét gennemløb og RACE's egne noter. Der er ingen formelle evalueringsdata.

## Temaer

| Tema | Evidens | Rammer |
| --- | --- | --- |
| For højt tempo | Studerende, begge semestre | Alle fire forløb |
| Mere fordybelse i JavaScript og React | Studerende | 2.1, 2.2, 3.1 |
| React giver struktur | Studerende | 2.1 |
| For mange nye teknologier (Next.js) | RACE | 3.2 |

## Bærende princip

**Én stak, bygget op over fire forløb.** Der kommer ikke nye frameworks til. Hvert forløb går dybere i det samme:

| Forløb | Stak | Nyt i forløbet |
| --- | --- | --- |
| 2.1 Customer Experience | JS + React + React Router (declarative) + lokal JSON | Komponenter, props, state, routing |
| 2.2 Web Application | + fetch/useEffect + Supabase REST | Data, forms, CRUD, filter/sort |
| 3.1 Product Optimization | Samme | Robusthed, arkitektur, datamodellering, a11y, performance |
| 3.2 Dynamic User Interface | + WordPress REST API + Supabase Auth | Auth, roller, motion i kode |

## 2. semester · Forløb 1 · Customer Experience

**Mål:** Solidt JS-fundament og React så simpelt som muligt. Webshop med flere sider.

- **Justér – JS først, i projektet:** De første gange er ren JavaScript (arrays, objekter, map/filter/find, moduler, template literals) på webshoppens egne produktdata. Det skal ikke være en løsrevet recap.
- **Justér – React i mindre bidder:** Komponenter, JSX, props, liste-rendering og useState. Et nyt koncept ad gangen, og hvert koncept bliver øvet, før det næste kommer.
- **Behold – React Router, kun declarative mode:** `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink` og `useParams` til produktoversigt og -detaljeside.
- **Justér – data som importeret JSON:** `import products from "./data/products.json"`. Så slipper de for fetch og useEffect i dette forløb, og en detaljeside er bare `find()` på et id.
- **Justér – styling uden CSS Modules:** CSS Modules var svært i 2026 (RACE). Brug almindelig CSS: én `global.css` med CSS-variabler (tokens fra Figma-designsystemet) og en CSS-fil pr. komponent, der importeres direkte (`import "./ProductCard.css"`). Klassenavne følger komponentnavnet (`.product-card`, `.product-card__title`). Der er ingen sammenligning af styling-tilgange. A11y fylder som semantik, labels og fokus, ikke som et særskilt emne.
- **Flyt – Git før kick-off:** Repo, Source Control og GitHub Pages før projektstart. I 2026 kom det to uger efter.
- **Erstat – platforme:** Notion-øvelser, PDF-slides og react-products/react-router-spa samles i `mdu-e26ixd` med Reveal-slides og ét gennemgående eksempelprojekt.
- **Drop:** useEffect, data fetching og styling-sammenligning (useEffect og fetch flyttes til 2.2).

## 2. semester · Forløb 2 · Web Application

**Mål:** Fra statiske data til rigtige data, med samme React-grundlag.

- **Ny start:** Det, der blev droppet i 2.1, kommer her: async/await, fetch og useEffect, med loading- og error-states fra første øvelse.
- **Behold:** Supabase REST, forms og CRUD, filter/sort. Materialet fra `web-app-supabase` flyttes ind i `mdu-e26ixd`.
- **Justér – HTTP/REST:** RACE 9 var selvstudie. Det er et fundament for resten, så lav det som undervisning eller en guidet øvelse.
- **Justér – til stede i projektperioden:** I 2026 var der ingen RACE-gange de sidste fire uger før EXPO. Tilføj faciliteret vejledning eller produktionsdage, ligesom på 3. semester.
- **Afklar:** Skal en del af de tekniske gange ligge efter kick-off, så de rammer, når grupperne har brug for dem?

## 3. semester · Forløb 1 · Product Optimization

**Mål:** Fordybelse og kvalitet i den kendte stak.

- **Behold – Case 1:** Robuste UI-states, arkitektur, datamodellering med relationer, a11y og performance er præcis den fordybelse, der efterspørges.
- **Justér – samme stak som 2. semester:** Case 1-prototypen skal bruge Vite, React Router (declarative) og Supabase REST, så det eneste nye er kvaliteten, ikke værktøjet.
- **Justér – "JavaScript for React":** Fra gennemgang til målrettet repetition af de koncepter, der volder problemer i Case 1 (fx async, immutability og array-metoder).
- **Justér – CSS Modules som bevidst optimering:** CSS Modules introduceres først her, under "Arkitektur, styling og accessibility", som svar på et konkret problem i prototypen (klassekonflikter, global CSS der vokser). Det skal ikke være et krav fra start.
- **Afklar – hul i kode 4. sep.–12. okt.:** I 2026 var Case 2 (LAES, Vuuh onboarding: UX audit, interaction redesign, a11y design check) og Case 3 (NKKR, La Rouge: branding og designsystem i Figma) rene designcases, og Company Day lå imellem. Det giver fem uger uden kode. Mulighed: Case 3-designsystemet omsættes til CSS-variabler og et par React-komponenter. Det skal aftales med NKKR.

## 3. semester · Forløb 2 · Dynamic User Interface

**Mål:** Avanceret interaktion og brugerstyring uden at skifte framework.

- **Drop – Next.js:** Gælder race-08, -09 og -10 med opgaver og produktionsdag. Alt bygges i React + Vite + React Router.
- **Erstat – headless WordPress:** Hent via WordPress REST API med fetch. Det kender de fra Web App.
- **Erstat – Supabase Auth:** Brug Supabase Auth i en React SPA. Beskyttede routes laves med React Router.
- **Behold:** Fra Figma til React, user management, roller og RLS, motion og microinteractions, faciliteret vejledning og pitch.
- **Justér – tempo før kick-off:** WordPress og Auth lå inden for fem dage (26.–30. okt.). Spred dem, eller lad Auth komme efter kick-off.
- **Justér – eksamensbeskrivelse:** "bygget i React – fx med Next.js" ændres, så eksemplet passer til stakken.
- **Besluttet – deployment på GitHub Pages:** Alle forløb deployer til GitHub Pages. React Router-apps skal have SPA-fallback (`404.html`) og `base` i Vite, så det skal være på plads i skabelonen fra 2.1. Det samme setup bruges hele vejen igennem.
- **Justér – styling:** DUI-eksemplerne i 2026 brugte CSS Modules (via Next.js). Fortsæt med den CSS-tilgang, de har lært i 3.1.

## Usikkerheder

- Evidensen er tynd. "For højt tempo" kan skyldes mængden af emner, rækkefølgen eller niveauforskelle mellem studerende. Hvis du kan, så spørg kort på holdet eller hos kollegerne.
- Ændringerne i 2.1 og 2.2 kræver koordinering med MNOR/LAES/BKI, især om hvornår kick-off og Git ligger.
- At droppe Next.js fjerner server-side rendering og SEO som emne. Det er en bevidst fravalg, men det kan være værd at nævne for de studerende.
