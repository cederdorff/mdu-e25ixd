# Slides

Reveal.js-præsentationer til 3. semester Interaction Design.

## Struktur

- `shared/deck.js` indeholder den fælles Reveal-konfiguration.
- `shared/theme.css` indeholder semesterets visuelle design og genbrugelige layouts.
- Hver præsentation ligger i sin egen mappe med en `index.html`.
- `index.html` i roden er en samlet indgang til alle præsentationer.

## Lokal visning

```bash
npm run slides:dev
```

Åbn derefter den adresse, Vite viser. Semesterstart findes under `/semesterstart/`.

## Betjening

- `←` og `→`: Skift slide.
- `S`: Åbn presenter view med noter og næste slide.
- `O`: Vis overblik over alle slides.
- `F`: Fuld skærm.
- Tilføj `?print-pdf` til URL'en for Reveal.js' printvisning.

## Ny præsentation

1. Kopiér en eksisterende deck-mappe.
2. Behold importen af `../shared/theme.css` og `../shared/deck.js`.
3. Tilføj deckets `index.html` til `rollupOptions.input` i `vite.config.js`.
4. Tilføj et link på `slides/index.html`.

Brug `data-accent="orange|green|pink|purple"` på et slide for at vælge accentfarve. Brug `chapter` til sektionsslides og `title-slide` til åbningssliden.
