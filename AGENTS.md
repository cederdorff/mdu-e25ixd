# Repository guidance

## Formål og sprog

- Repoet indeholder undervisningsmateriale og Reveal.js-slides til Interaction Design.
- Skriv elevvendt indhold på naturligt dansk; behold tekniske termer på engelsk, når det er mest præcist.
- Match tone, begreber og undervisningsmodeller fra tidligere materiale. Opfind ikke en ny model, hvis en eksisterende kan genbruges.

## Arbejd fokuseret

- Læs kun filer, der er relevante for den aktuelle undervisningsgang, plus den nærmeste tidligere reference.
- Bevar brugerens eksisterende ændringer, og undgå brede reformateringer.
- Saml relaterede rettelser i én implementeringsrunde og hold værktøjsoutput samt slutrapport kort.
- Brug kun webresearch, når opgaven kræver aktuelle fakta, eksterne kilder eller verifikation.

## Reveal.js-slides

- Match tidligere Reveal.js-decks i struktur, styling og tone.
- Genbrug `slides/shared/`, eksisterende modeller, komponenter og mønstre fra det nærmeste relevante deck.
- Bevar et klart match mellem undervisningssiden i `undervisning/` og det tilhørende deck i `slides/`.
- Brug beskrivende filnavne med små bogstaver og bindestreger til assets i `slides/assets/`.
- Angiv altid sprog på Markdown-kodeblokke og en relevant `language-*`-klasse på HTML `<code>`-elementer, så syntax highlighting virker.
- Brug ikke speaker notes eller `<aside class="notes">` i Reveal.js-slides. Fjern dem, hvis de findes i det deck, du redigerer.
- Angiv nødvendige kildehenvisninger synligt på slidet eller i den tilhørende undervisningsside.
- Kontrollér tekstombrydning, overlap og billedbeskæring på ændrede slides.

## Verifikation

- Ved ændringer i Reveal.js HTML/CSS: saml build og visuel QA til sidst, og kør `npm run slides:build` én gang efter den samlede rettelsesrunde.
- Kontrollér primært ændrede slides; gennemgå hele decket ved større struktur- eller stylingændringer.
- Ved rene Markdown- eller README-rettelser er et slide-build normalt ikke nødvendigt.
