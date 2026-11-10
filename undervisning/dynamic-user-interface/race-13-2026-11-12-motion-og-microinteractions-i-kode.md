# RACE - Dynamic User Interface: Motion og microinteractions i kode - 12-11-2026

## Formål

I dag får I igen så meget tid som muligt til jeres projekt. Dagen er delt i to: Først et kort oplæg med demo, derefter vejledning og projektarbejde.

I oplægget ser vi på, hvordan I kommer i gang med motion og microinteractions i kode, når jeres projekt er klar til det – måske ikke i dag, men på et tidspunkt. Vi starter med formålet: Hvad skal motion gøre for brugeren? Derefter viser jeg [Motion for React](https://motion.dev/docs/react) i Next.js med tre små eksempler i Post App fra 10. november, og hvad der skal til, før en animation er klar til et rigtigt produkt.

Bagefter arbejder I videre med jeres projekt, der hvor I er.

<hr style="margin: 2rem 0;">

## Forberedelse

- Arbejd videre med jeres projekt.

<hr style="margin: 2rem 0;">

## Agenda

### Del 1 · Oplæg og demo

<details style="margin-left: 1.5rem;">
<summary><strong>1. Motion med et formål</strong></summary>
<ul>
<li>En microinteraction er et lille, afgrænset øjeblik med ét formål – fx at gemme, like eller slette. Motion er bevægelse, der forklarer, hvad der sker.</li>
<li>Fire grunde til at noget bevæger sig: feedback (jeg har gjort noget), status (der sker noget), sammenhæng (hvor kom det fra?) og personlighed (sådan er vi).</li>
<li>Brug Dan Saffers model til at beskrive interaktionen, før I koder den: trigger → rules → feedback → loops og modes. Én sætning pr. del – det er også jeres begrundelse i rapporten.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Kom i gang med Motion · demo</strong></summary>
<ul>
<li>Tre trin: <code>npm install motion</code>, <code>"use client"</code> og <code>import { motion } from "motion/react"</code>, og sæt <code>motion.</code> foran elementet, fx <code>&lt;motion.div&gt;</code>.</li>
<li>Animationer kører i browseren, så animerede komponenter skal være client components. Hold dem små, så resten af siden kan blive på serveren.</li>
<li>Fem props dækker det meste: <code>whileHover</code>, <code>whileTap</code>, <code>initial</code> → <code>animate</code>, <code>AnimatePresence</code> med <code>exit</code> og <code>layout</code>.</li>
<li>Feedback: Post-cards løfter sig ved hover og focus og trykkes ned ved klik – <code>AnimatedCard</code> er client, indholdet renderes stadig på serveren.</li>
<li>Status: <em>Save</em> skifter til <em>Saving …</em>, mens Server Action'en kører – <code>useFormStatus</code> og <code>AnimatePresence</code>. Teksten bærer informationen, motion viser skiftet.</li>
<li>Bekræftelse: <code>window.confirm</code> er skiftet ud med <em>Delete this post?</em>, der glider ind, hvor brugeren klikkede. Med tastatur lander fokus på <em>Cancel</em>.</li>
<li>Fra Rive til React: Motion til UI-elementer, Rive til illustrationer og figurer, som designeren animerer. Eksportér en <code>.riv</code>-fil, og vis den med <code>useRive</code> fra <code>@rive-app/react-webgl2</code>. React ændrer en property i Rive-filens view model, fx <code>isLiked</code>, og Rive animerer resten. Navnene skal matche Rive-filen præcis. Ældre guides bruger <code>useStateMachineInput</code> – det er afløst af data binding.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Klar til jeres projekt</strong></summary>
<ul>
<li>Motion-tokens: Samme navne og værdier i Figma, CSS (<code>--duration-fast: 150ms</code>) og Motion (<code>duration.fast: 0.15</code>). CSS bruger millisekunder, Motion bruger sekunder.</li>
<li>Reduced motion er ikke ingen motion: <code>MotionConfig reducedMotion="user"</code> fjerner bevægelse, men beholder fades. Med <code>useReducedMotion</code> kan I selv vælge et alternativ, fx variant A.</li>
<li>Lyd skal kunne slås fra og må aldrig være eneste bærer af information.</li>
<li>Performance: Animér <code>transform</code> og <code>opacity</code> – ikke <code>width</code>, <code>height</code> eller <code>top</code>. Hold feedback kort (150–250 ms), så animationen aldrig venter på brugeren.</li>
<li>Varianter til test: <code>?variant=a</code>, <code>b</code> eller <code>c</code> i URL'en og værdierne i <code>lib/motion.js</code>. Så kan I teste, hvornår delight begynder at gå ud over usability.</li>
</ul>
</details>

### Del 2 · Vejledning og projektarbejde

<details style="margin-left: 1.5rem;">
<summary><strong>4. Vejledning og projektarbejde</strong></summary>
<ul>
<li>Arbejd videre, der hvor I er i jeres projekt.</li>
<li>Overvej, om I kan bruge noget fra i dag: Hvad skal motion gøre for brugeren i jeres produkt? Svaret kan I også bruge i rapporten.</li>
<li>Vil I prøve det af? Kør branchen <code>motion</code> i <code>nextjs-supabase-posts</code>, og brug den som reference – fx ved at give den som kontekst til Claude.</li>
<li>Vejledning i grupperne undervejs.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:**
  - [Motion og microinteractions i kode](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-06/)
  - [PDF-version: Motion og microinteractions i kode](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-06/?print-pdf)
- **Løsningsrepo:**
  - [nextjs-supabase-posts · branch `motion`](https://github.com/cederdorff/nextjs-supabase-posts/tree/motion) – Post App fra 10. november med tre microinteractions
  - [Alt det nye i branchen `motion`](https://github.com/cederdorff/nextjs-supabase-posts/compare/opgave-05-roller...motion)
- **Motion:**
  - [Motion for React](https://motion.dev/docs/react)
  - [AnimatePresence](https://motion.dev/docs/react-animate-presence)
  - [Accessibility](https://motion.dev/docs/react-accessibility)
- **Rive:**
  - [Rive: React](https://rive.app/docs/runtimes/react/react)
  - [Rive: Data binding i React](https://rive.app/docs/runtimes/react/data-binding)
- **React:**
  - [useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus)
- **Tilgængelighed og performance:**
  - [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
  - [web.dev: Animations and performance](https://web.dev/articles/animations-and-performance)
- **Litteratur:**
  - Dan Saffer: _Microinteractions_
  - Aaron Walter: _Designing for Emotion_
