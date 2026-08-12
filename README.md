# MDU-E25IXD · efterår 2026

Materialer til 3. semester Interaction Design (IxD), Multimediedesign.

## Semesteroverblik

- [Grafisk semesteroversigt](semesteroverblik/semesteroversigt.html)
- [Modulnavne til Canvas](semesteroverblik/canvas-moduler.md)
- [Beskrivelser af forløb og eksamener](semesteroverblik/forloeb-og-eksamen.md)

## Undervisning (RACE)

### Semesterstart

- [JEBN/RACE - Semesterstart - 17-08-2026](undervisning/semesterstart/17-08-2026-semesterstart.md)

### Product Optimization

- [RACE - Product optimization: Web App-forbedringer og teknisk fundament - 19-08-2026](undervisning/product-optimization/19-08-2026-product-optimization.md)
- [LAES/NKKR/RACE - Portfolio feedback - 19-08-2026](undervisning/semesterstart/19-08-2026-portfolio-feedback.md)
- [RACE - Product optimization: JavaScript, fejlhåndtering og robuste UI-states - 21-08-2026](undervisning/product-optimization/21-08-2026-product-optimization.md)
- [RACE - Product optimization: Case 1 · Kick-off og codebase audit - 25-08-2026](undervisning/product-optimization/25-08-2026-case-1-react-optimering.md)
- [RACE - Product optimization: Case 1 · Arkitektur, styling og accessibility - 26-08-2026](undervisning/product-optimization/26-08-2026-case-1-react-optimering.md)
- [RACE - Product optimization: Case 1 · Datamodellering, relationer og Supabase - 01-09-2026](undervisning/product-optimization/01-09-2026-case-1-react-optimering.md)
- [RACE - Product optimization: Case 1 · PR-review, deployment og dokumenteret effekt - 02-09-2026](undervisning/product-optimization/02-09-2026-case-1-react-optimering.md)
- [RACE - Product optimization: Portfolio og faglig dokumentation - 12-10-2026](undervisning/product-optimization/12-10-2026-optimering-af-portfolio.md)

### Dynamic User Interface

- [RACE - Dynamic User Interface - 26-10-2026](undervisning/dynamic-user-interface/26-10-2026-dynamic-user-interface.md)
- [NKKR/RACE - Dynamic User Interface - 29-10-2026](undervisning/dynamic-user-interface/29-10-2026-dynamic-user-interface.md)
- [RACE - Dynamic User Interface - 30-10-2026](undervisning/dynamic-user-interface/30-10-2026-dynamic-user-interface.md)
- [BKI/NKKR/RACE - Dynamic User Interface: Kick-off - 02-11-2026](undervisning/dynamic-user-interface/02-11-2026-kick-off.md)
- [RACE - Dynamic User Interface - 05-11-2026](undervisning/dynamic-user-interface/05-11-2026-dynamic-user-interface.md)
- [RACE - Dynamic User Interface - 10-11-2026](undervisning/dynamic-user-interface/10-11-2026-dynamic-user-interface.md)
- [NKKR/RACE - Dynamic User Interface: Faciliteret vejledning - 16-11-2026](undervisning/dynamic-user-interface/16-11-2026-faciliteret-vejledning.md)
- [RACE - Dynamic User Interface: Faciliteret vejledning - 23-11-2026](undervisning/dynamic-user-interface/23-11-2026-faciliteret-vejledning.md)
- [BKI/NKKR/RACE - Dynamic User Interface: Pitch Day - 27-11-2026](undervisning/dynamic-user-interface/27-11-2026-pitch-day.md)
- [RACE - Dynamic User Interface: Optimering og eksamensforberedelse - 01-12-2026](undervisning/dynamic-user-interface/01-12-2026-optimering-og-eksamensforberedelse.md)
- [NKKR/RACE - Dynamic User Interface: Optimering og eksamensforberedelse - 03-12-2026](undervisning/dynamic-user-interface/03-12-2026-optimering-og-eksamensforberedelse.md)

Materialer til undervisningsgangene placeres under [`undervisning/`](undervisning/).

## Synkronisering til Canvas

Undervisningssider kan konverteres fra Markdown til Canvas-HTML og oprettes eller opdateres via Canvas API.

### Første opsætning

1. Kør `npm install`.
2. Kopiér `.env.example` til `.env`.
3. Udfyld `CANVAS_BASE_URL`, `CANVAS_COURSE_ID` og `CANVAS_ACCESS_TOKEN` i `.env`.

`.env` er ignoreret af Git. Canvas-tokenet må aldrig committes eller deles.

### Vis siden uden at ændre Canvas

```bash
npm run canvas:preview -- undervisning/product-optimization/19-08-2026-product-optimization.md
```

### Opret eller opdatér siden som kladde

```bash
npm run canvas:sync -- undervisning/product-optimization/19-08-2026-product-optimization.md
```

Tilføj `--publish` for at publicere siden og `--notify` for at bede Canvas om at sende en opdateringsnotifikation:

```bash
npm run canvas:sync -- undervisning/product-optimization/19-08-2026-product-optimization.md --publish --notify
```

Scriptet bruger Markdown-filens H1 som Canvas-titel. En side med samme titel opdateres; ellers oprettes en ny. Eksisterende sider beholder deres publiceringsstatus, medmindre `--publish` bruges.

Hvis siden allerede er placeret i ét Canvas-modul, opdaterer `canvas:sync` også modulets navn og modulpunktets titel, så de matcher siden. Publiceringsstatus, placering og øvrige modulindstillinger bevares. Hvis siden ikke ligger i et modul eller ligger i flere moduler, ændres modulnavne ikke automatisk.
