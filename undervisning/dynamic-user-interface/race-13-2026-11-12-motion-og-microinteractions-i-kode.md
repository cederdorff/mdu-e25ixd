# RACE - Dynamic User Interface: Rive og Motion i Next.js - 12-11-2026

## Formål

I dag får I igen så meget tid som muligt til jeres projekt. Dagen starter med et kort oplæg med to demoer, derefter vejledning og projektarbejde.

Først ser vi, hvordan I får en Rive-animation over i React og Next.js – med øjnene fra NKKRs Rive-øvelse som eksempel. Derefter får I en kort introduktion til [Motion for React](https://motion.dev/docs/react), og hvordan I kommer i gang. Hver demo ligger i sit eget lille Next.js-projekt, I kan køre selv.

<hr style="margin: 2rem 0;">

## Forberedelse

- Arbejd videre med jeres projekt.

<hr style="margin: 2rem 0;">

## Agenda

### Del 1 · Oplæg og demo

<details style="margin-left: 1.5rem;">
<summary><strong>1. Fra Rive til Next.js · demo</strong></summary>
<ul>
<li>Motion til UI-elementer, I selv koder. Rive til illustrationer og figurer, som designeren animerer.</li>
<li>Rive runtime: Et library, der afspiller <code>.riv</code>-filen i browseren. Til React: <code>@rive-app/react-webgl2</code>.</li>
<li>Tre trin: Installér pakken, læg <code>eyes.riv</code> i <code>public/</code>, og lav en lille client component med <code>useRive</code> og samme tre værdier som i guidens <code>index.html</code> (<code>src</code>, <code>stateMachine</code>, <code>autoplay</code>). Brug den i en side.</li>
<li>Musen og blinket klarer Rive selv med listeners. Giv forælderen en højde, og kopiér navnet på state machine præcis fra Rive.</li>
<li>Næste skridt: Skal React styre animationen, ændrer React en property i Rive-filens view model, fx <code>isLiked</code>, og Rive animerer resten.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Kom i gang med Motion · demo</strong></summary>
<ul>
<li>Motion for React (tidligere Framer Motion) animerer direkte på elementet med få props.</li>
<li>Tre trin: <code>npm install motion</code>, <code>"use client"</code> og <code>import { motion } from "motion/react"</code>, og sæt <code>motion.</code> foran elementet, fx <code>&lt;motion.div&gt;</code>.</li>
<li>Fem props dækker det meste: <code>whileHover</code>, <code>whileTap</code>, <code>initial</code> → <code>animate</code>, <code>AnimatePresence</code> med <code>exit</code> og <code>layout</code>.</li>
<li>Eksempel 1: Et kort, der løfter sig ved hover og trykkes ned ved klik.</li>
<li>Eksempel 2: En besked, der glider ind og ud igen med <code>AnimatePresence</code>.</li>
<li>Reduced motion: <code>MotionConfig reducedMotion="user"</code> omkring hele appen fjerner bevægelse, men beholder fades.</li>
</ul>
</details>

### Del 2 · Vejledning og projektarbejde

<details style="margin-left: 1.5rem;">
<summary><strong>3. Vejledning og projektarbejde</strong></summary>
<ul>
<li>Arbejd videre, der hvor I er i jeres projekt.</li>
<li>Vil I prøve det af? Sæt øjnene eller jeres egen Rive-animation ind i jeres app, eller giv én interaktion feedback med Motion. Brug demoerne <code>nextjs-rive</code> og <code>nextjs-motion</code> som reference.</li>
<li>Vejledning i grupperne undervejs.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:**
  - [Rive og Motion i Next.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-06/)
  - [PDF-version: Rive og Motion i Next.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-06/?print-pdf)
- **Demo:**
  - [nextjs-rive](https://github.com/cederdorff/nextjs-rive) – øjnene fra Rive i en React-komponent
  - [nextjs-motion](https://github.com/cederdorff/nextjs-motion) – kortet og beskeden med Motion
  - [nextjs-supabase-posts · branch `motion`](https://github.com/cederdorff/nextjs-supabase-posts/tree/motion) – større eksempel: Post App med tre microinteractions
- **Motion:**
  - [Motion for React](https://motion.dev/docs/react)
  - [AnimatePresence](https://motion.dev/docs/react-animate-presence)
  - [Accessibility](https://motion.dev/docs/react-accessibility)
- **Rive:**
  - [Guide: Lav øjne der bevæger og blinker vha. cursor](https://eaaa.instructure.com/courses/30922/pages/guide-lav-ojne-der-bevaeger-og-blinker-vha-cursor) – NKKRs øvelse
  - [Rive: React](https://rive.app/docs/runtimes/react/react)
  - [Rive: Data binding i React](https://rive.app/docs/runtimes/react/data-binding)
- **Tilgængelighed:**
  - [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- **Litteratur:**
  - Dan Saffer: _Microinteractions_
  - Aaron Walter: _Designing for Emotion_
