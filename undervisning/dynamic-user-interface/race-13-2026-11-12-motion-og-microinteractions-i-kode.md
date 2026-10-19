# RACE - Dynamic User Interface: Motion og microinteractions i kode - 12-11-2026

## Formål

I dag implementerer vi motion og microinteractions i kode. I har udforsket jeres interaktioner fra minimal til ekspressiv. Nu skal de bygges, så de føles rigtige, er tilgængelige og ikke går ud over performance.

Projektets regel gælder også i koden: **Hvis en effekt ikke kan forklares ud fra brugerens oplevelse, skal den fjernes.**

Målet er en microinteraction i jeres projekt, som bruger motion-tokens fra jeres designsystem og respekterer `prefers-reduced-motion`.

<hr style="margin: 2rem 0;">

## Forberedelse

- Vælg den interaktion fra jeres projekt, I vil implementere i dag, og hav jeres A/B/C-udforskning klar.
- Sørg for, at jeres projekt kører lokalt.
- Kig gerne i [Motion for React](https://motion.dev/docs/react) for at se, hvad biblioteket kan.

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Formål før effekt → motion-tokens → byg microinteractionen → tilgængelighed og lyd → performance → varianter til test.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Motion med et formål</strong></summary>
<ul>
<li>Brug Dan Saffers model til at beskrive interaktionen: trigger → rules → feedback → loops og modes.</li>
<li>Hvad skal motion gøre for brugeren her? Give feedback, vise en sammenhæng, lede opmærksomheden eller give personlighed?</li>
<li>Formulér det kort, før I skriver kode. Det er også grundlaget for jeres begrundelse i rapporten.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Motion i Next.js</strong></summary>
<ul>
<li>Installér <code>motion</code>, og importér fra <code>motion/react</code>.</li>
<li>Animationer kører i browseren, så animerede komponenter skal have <code>"use client"</code>.</li>
<li>Hold de animerede komponenter små, så resten af siden kan forblive server components.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Motion-tokens i designsystemet</strong></summary>
<ul>
<li>Udvid designsystemet med tokens for duration og easing, fx <code>--duration-fast</code> og <code>--ease-out</code>.</li>
<li>Brug de samme tokens i CSS-transitions og i Motion, så timingen er ens i hele produktet.</li>
<li>Gør tokens til en del af jeres Figma-fil, så design og kode taler om samme timing.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Byg microinteractionen</strong></summary>
<ul>
<li>Brug fx <code>whileHover</code> og <code>whileTap</code> til direkte feedback, <code>AnimatePresence</code> til elementer, der kommer og går, og <code>layout</code> til elementer, der flytter sig.</li>
<li>Kobl motion til UI-states som loading, success og error, så animationen fortæller, hvad der sker.</li>
<li>Test interaktionen med mus, touch og tastatur.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Tilgængelighed og lyd</strong></summary>
<ul>
<li>Respektér <code>prefers-reduced-motion</code>, fx med <code>MotionConfig reducedMotion="user"</code> eller <code>useReducedMotion</code>.</li>
<li>Reduced motion betyder ikke nødvendigvis ingen motion. Erstat fx bevægelse med en fade.</li>
<li>Bruger I lyd, skal den kunne slås fra, og den må ikke være eneste bærer af information.</li>
<li>Test med reduced motion slået til i styresystemet eller i browserens udviklerværktøjer.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Performance</strong></summary>
<ul>
<li>Animér helst <code>transform</code> og <code>opacity</code>. Egenskaber som <code>width</code>, <code>height</code> og <code>top</code> får browseren til at beregne layoutet igen.</li>
<li>Undersøg animationen i Performance-panelet, og se efter tabte frames og lange tasks.</li>
<li>Vær opmærksom på, at animationer ikke forsinker brugerens næste handling.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>7. Varianter til test</strong></summary>
<ul>
<li>Byg interaktionen, så I kan skifte mellem variant A, B og C, fx via tokens eller en URL-parameter som <code>?variant=b</code>.</li>
<li>Så kan I teste versionerne med brugere og måle, hvornår delight begynder at skade usability.</li>
<li>Commit jeres arbejde i en feature branch, og lav en pull request.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:** Vil blive tilgængelige her
- **Opgaver:** Vil blive tilgængelige her
- **Motion:**
  - [Motion for React](https://motion.dev/docs/react)
  - [Accessibility](https://motion.dev/docs/react-accessibility)
- **Tilgængelighed og performance:**
  - [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
  - [web.dev: Animations and performance](https://web.dev/articles/animations-and-performance)
- **Litteratur:**
  - Dan Saffer: _Microinteractions_
  - Aaron Walter: _Designing for Emotion_
