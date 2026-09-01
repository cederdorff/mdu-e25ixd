# MDU-E25IXD · efterår 2026

Samlet materialeoversigt til 3. semester Interaction Design (IxD), Multimediedesign.

## Semesterstart

| Dato | Undervisningsgang | Materialer |
| --- | --- | --- |
| 17. august | Semesterstart | [Undervisningsside](undervisning/semesterstart/race-00-2026-08-17-semesterstart.md) · [Slides](https://cederdorff.com/mdu-e25ixd/slides/semesterstart/) |
| 19. august | Portfolio-feedback | [Undervisningsside](undervisning/semesterstart/race-01-2026-08-19-portfolio-feedback.md) |

## Product Optimization

### Forløbsmaterialer

- [Eksamensbeskrivelse](undervisning/product-optimization/eksamensbeskrivelse.md)
- [Case 1 · Fra prototype til produktionsklar React-løsning](undervisning/product-optimization/case-1-casebrief.md)
- [Teknisk audit-skabelon](undervisning/product-optimization/teknisk-audit-skabelon.md)
- [JavaScript- og React-koncepter](undervisning/product-optimization/js-concepts.md)

### Undervisningsgange

| Dato | Undervisningsgang | Materialer |
| --- | --- | --- |
| 19. august | Web App-forbedringer og teknisk fundament | [Undervisningsside](undervisning/product-optimization/race-01-2026-08-19-web-app-forbedringer-og-teknisk-fundament.md) · [Slides](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-01/) |
| 21. august | JavaScript for React | [Undervisningsside](undervisning/product-optimization/race-02-2026-08-21-javascript-for-react.md) · [Slides](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/) |
| 25. august | Case 1 · Kick-off, fejlhåndtering og robuste UI-states | [Undervisningsside](undervisning/product-optimization/race-03-2026-08-25-case-1-kick-off-fejlhaandtering-og-robuste-ui-states.md) · [Slides](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-03/) |
| 26. august | Case 1 · Arkitektur, styling og accessibility | [Undervisningsside](undervisning/product-optimization/race-04-2026-08-26-case-1-arkitektur-styling-og-accessibility.md) · [Slides](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-04/) |
| 1. september | Case 1 · Datamodellering, relationer og Supabase | [Undervisningsside](undervisning/product-optimization/race-05-2026-09-01-case-1-datamodellering-relationer-og-supabase.md) |
| 2. september | Case 1 · Performance, Lighthouse og videre arbejde | [Undervisningsside](undervisning/product-optimization/race-06-2026-09-02-case-1-performance-lighthouse-og-videre-arbejde.md) |
| 12. oktober | Portfolio og faglig dokumentation | [Undervisningsside](undervisning/product-optimization/race-07-2026-10-12-portfolio-og-faglig-dokumentation.md) |

## Dynamic User Interface

| Dato | Undervisningsgang | Materialer |
| --- | --- | --- |
| 26. oktober | Dynamic User Interface | [Undervisningsside](undervisning/dynamic-user-interface/race-08-2026-10-26-dynamic-user-interface.md) |
| 29. oktober | Dynamic User Interface | [Undervisningsside](undervisning/dynamic-user-interface/race-09-2026-10-29-dynamic-user-interface.md) |
| 30. oktober | Dynamic User Interface | [Undervisningsside](undervisning/dynamic-user-interface/race-10-2026-10-30-dynamic-user-interface.md) |
| 2. november | Kick-off | [Undervisningsside](undervisning/dynamic-user-interface/race-11-2026-11-02-kick-off.md) |
| 5. november | Dynamic User Interface | [Undervisningsside](undervisning/dynamic-user-interface/race-12-2026-11-05-dynamic-user-interface.md) |
| 10. november | Dynamic User Interface | [Undervisningsside](undervisning/dynamic-user-interface/race-13-2026-11-10-dynamic-user-interface.md) |
| 16. november | Faciliteret vejledning | [Undervisningsside](undervisning/dynamic-user-interface/race-14-2026-11-16-faciliteret-vejledning.md) |
| 23. november | Faciliteret vejledning | [Undervisningsside](undervisning/dynamic-user-interface/race-15-2026-11-23-faciliteret-vejledning.md) |
| 27. november | Pitch Day | [Undervisningsside](undervisning/dynamic-user-interface/race-16-2026-11-27-pitch-day.md) |
| 1. december | Optimering og eksamensforberedelse | [Undervisningsside](undervisning/dynamic-user-interface/race-17-2026-12-01-optimering-og-eksamensforberedelse.md) |
| 3. december | Optimering og eksamensforberedelse | [Undervisningsside](undervisning/dynamic-user-interface/race-18-2026-12-03-optimering-og-eksamensforberedelse.md) |

## Semesteroverblik og planlægning

- [Grafisk semesteroversigt](https://cederdorff.com/mdu-e25ixd/semesteroverblik/semesteroversigt.html)
- [Beskrivelser af forløb og eksamener](semesteroverblik/forloeb-og-eksamen.md)
- [Modulnavne til Canvas](semesteroverblik/canvas-moduler.md)
- [Udkast til RACE-undervisning](semesteroverblik/udkast-undervisning-race.md)

## Arbejd med repoet i Codex

Repoets lokale Codex-standard er **GPT-5.6 Terra med low reasoning**. Det passer til det daglige arbejde med tekst, HTML, CSS og afgrænsede slideændringer. Skift model efter opgaven:

| Opgave | Model og reasoning |
| --- | --- |
| Små tekst-, asset- og stylingrettelser | Luna eller Terra · low |
| Almindelig udvikling af undervisning og slides | Terra · low/medium |
| Ny struktur, svær fejlsøgning eller samlet fagligt review | Sol · medium |

### Anbefalet arbejdsgang

1. Brug én chat per undervisningsgang eller samlet opgave.
2. Saml feedback til en liste, før Codex retter decket igen.
3. Bed om én implementeringsrunde og ét build til sidst.
4. Kontrollér primært de slides, der er ændret.
5. Start en ny chat med en kort status, når emnet eller decket skifter.

Eksempel på en fokuseret opgave:

```text
Opdater product-optimization-06 i én samlet omgang ud fra punkterne nedenfor.
Match det foregående deck i styling, tone og eksisterende modeller.
Genbrug eksisterende komponenter, og bevar syntax highlighting og speaker notes.
Byg én gang til sidst, og kontrollér kun de ændrede slides visuelt.
Hold slutrapporten kort.

- ...
- ...
```

Projektets varige instruktioner ligger i [`AGENTS.md`](AGENTS.md), mens modelstandarden ligger i [`.codex/config.toml`](.codex/config.toml). Projektkonfigurationen indlæses kun, når repoet er markeret som trusted i Codex.
