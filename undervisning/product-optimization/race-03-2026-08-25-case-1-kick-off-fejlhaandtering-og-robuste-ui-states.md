# RACE - Product optimization: Case 1 · Kick-off, fejlhåndtering og robuste UI-states - 25-08-2026

## Formål

Start Case 1 ved at undersøge fejlhåndtering og UI-states i en eksisterende React-løsning. Du skal finde konkrete problemer og begynde at gøre løsningen mere robust for både brugeren og udvikleren.

Efter undervisningen skal du have dokumenteret en baseline, oprettet prioriterede issues og implementeret din første forbedring i en feature branch.

## Forberedelse

- Sørg for, at Git og Node.js fungerer på din computer. Det forventes, at du kan clone, committe, pushe og arbejde i en branch.
- Genbesøg principperne fra 19. august og JavaScript-koncepterne fra 21. august.

## Agenda

1. Introduktion til Case 1, krav, rammer og dokumentation.
2. Kør løsningen lokalt, og etablér en baseline med skærmbilleder og kendte problemer.
3. Undersøg løsningens asynkrone flows:
   - Hvad sker der under loading?
   - Hvad vises ved success, tomme resultater og fejl?
   - Kan brugeren forstå problemet og prøve igen?
4. Kort fagligt input:
   - forskellige fejltyper: validering, netværk, API, manglende data og kodefejl
   - `try`, `catch` og `finally` omkring asynkrone operationer
   - kontrol af response og fejl fra fetch eller Supabase
   - loading-, success-, empty-, error- og retry-states i React
5. Omsæt fund til prioriterede issues med tydelige acceptkriterier.
6. Arbejd individuelt: issue → feature branch → implementering → pull request.
7. Test forbedringen i både kode og UI, og dokumentér den første før/efter-effekt.

## Materialer

- **Slides:** Vil blive tilgængelige her
- **Opgaver:** Casebrief, øvelse om fejlhåndtering og UI-states samt [skabelon til teknisk audit](teknisk-audit-skabelon.md)
- **Links:** Vil blive tilgængelige her
