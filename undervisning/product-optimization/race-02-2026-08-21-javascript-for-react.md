# RACE - Product optimization: JavaScript for React - 21-08-2026

## Formål

Lad os tage et skridt tilbage og træne de vigtigste JavaScript-koncepter, du skal kunne for at skrive effektiv React-kode.

React er faktisk ikke så svært – det handler primært om komponenter og state – men JavaScript-delen kan være svær.

Derfor træner vi koncepterne i almindelig JavaScript og anvender dem derefter i en React-kontekst.

<hr style="margin: 2rem 0;">

## Forberedelse

- Færdiggør [opgaverne fra sidste undervisning](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-01/#/agenda).
- Genbesøg dine løsninger og projekter fra 2. semester. Find mindst to eksempler på JavaScript- eller React-kode, du har svært ved at forklare eller ikke forstår. Vær klar til at dele ét eksempel med et kort kodeudsnit eller et link til koden.
- Se: [All The JavaScript You Need BEFORE React](https://www.youtube.com/watch?v=bCkfU_wHPcY)
- Skim: [Top 12 JavaScript Concepts to Know Before Learning React](https://www.geeksforgeeks.org/reactjs/top-javascript-concepts-to-know-before-learning-react/)

**Har du brug for et JavaScript/React-recap?**

- Brug efter behov: [Scrimba: Learn JavaScript](https://scrimba.com/learn-javascript-c0v)
- Brug efter behov: [Scrimba: Learn React](https://scrimba.com/learn-react-c0e)

<hr style="margin: 2rem 0;">

## Agenda

Vi går fra egne kodeeksempler til fælles JavaScript-koncepter, træner dem i praksis og kobler dem til React.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Dagens scope: JavaScript for React</strong></summary>
<ul>
<li>Hvorfor er et sikkert JavaScript-fundament vigtigt, når du arbejder med React?</li>
<li>Vi træner JavaScript-koncepterne først og kobler dem derefter til React.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Eksempler fra 2. semester</strong></summary>
<ul>
<li>Tal kort med en medstuderende om den kode, du har fundet.</li>
<li>Del ét eksempel i vores fælles Padlet: et kodeudsnit eller link, hvad du tror koden gør, og hvad du er i tvivl om.</li>
<li>Vi bruger eksemplerne til at finde fælles mønstre og prioritere dagens koncepter.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Sådan arbejder vi: koncept for koncept, i det små</strong></summary>
<ul>
<li>Hvert enkeltkoncept får sin egen firetrins-gennemgang: <strong>forklar + kode</strong>, <strong>flere eksempler på brug</strong>, <strong>eksempel i React</strong> og <strong>én opgave</strong>.</li>
<li>Vi blander ikke flere koncepter sammen på samme slide — fx får <code>function declaration</code>, <code>arrow function</code>, <code>parametre</code> og <code>return values</code> hver deres egen gennemgang.</li>
<li>Alt foregår i dit eget <code>web-app-optimization</code>-projekt: JavaScript-øvelserne ligger i <code>src/playground/</code>, og React-delen bruges direkte i dine komponenter.</li>
<li>Decket er stort (36 små opgaver) — brug det som en modulbank. I når så langt, som tiden rækker.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Moduler <span style="font-weight:400">(opgave 1)</span></strong></summary>
<ul>
<li>Export og import — ét koncept, én opgave: opret <code>src/playground/</code>, og øv <code>export</code>/<code>import</code> mellem filer.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Variabler og datatyper <span style="font-weight:400">(opgave 2–5)</span></strong></summary>
<ul>
<li><code>const</code> · <code>let</code> og <code>var</code> · datatyper (<code>typeof</code>) · sammenligning <code>===</code> vs. <code>==</code> — hvert sit koncept, hver sin opgave.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Functions <span style="font-weight:400">(opgave 6–12)</span></strong></summary>
<ul>
<li>Kerne: function declaration · arrow function · parametre · return values — hvert sit koncept, hver sin opgave (6–9).</li>
<li>Ekstra: default parameters · callback functions · closures — kortere forklar+kode og opgave hver (10–12).</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>7. Objekter og arrays <span style="font-weight:400">(opgave 13–20)</span></strong></summary>
<ul>
<li>Property access · shorthand properties · destructuring (objects) · destructuring (arrays) · rest · spread · immutable opdatering af objekter · immutable opdatering af arrays — otte separate koncepter og opgaver.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>8. Array-metoder og rendering <span style="font-weight:400">(opgave 21–27)</span></strong></summary>
<ul>
<li>Kerne: <code>map</code> · <code>filter</code> · <code>find</code> — hvert sit koncept, hver sin opgave (21–23).</li>
<li>Ekstra: <code>forEach</code> · <code>some</code>/<code>every</code> · <code>includes</code> · <code>reduce</code> — kortere forklar+kode og opgave hver (24–27).</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>9. Udtryk der styrer visning <span style="font-weight:400">(opgave 28–33)</span></strong></summary>
<ul>
<li>Template literals · ternary operator · logisk <code>&amp;&amp;</code> (conditional rendering) · logisk <code>||</code> (fallback-værdier) · optional chaining (<code>?.</code>) · nullish coalescing (<code>??</code>) — seks separate koncepter og opgaver.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>10. Async: fetch med await <span style="font-weight:400">(opgave 34–35)</span></strong></summary>
<ul>
<li>Kerne: <code>async</code>/<code>await</code> med <code>fetch</code> (opgave 34).</li>
<li>Ekstra: promises med <code>.then()</code>/<code>.catch()</code>, sammenlignet med <code>async</code>/<code>await</code> (opgave 35).</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>11. Egen kode og opsamling <span style="font-weight:400">(opgave 36)</span></strong></summary>
<ul>
<li>Find et JavaScript-flow i din egen Web App, og identificér dagens koncepter i koden.</li>
<li>Genbesøg det eksempel, du delte i Padlet. Kan du nu forklare, hvad koden gør, og hvilke koncepter den bruger?</li>
<li>Tilføj din forklaring eller et spørgsmål, du stadig mangler svar på.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:**
  - [JavaScript for React](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/)
  - [PDF-version: JavaScript for React](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/?print-pdf)
- **Opgaver (36, koncept for koncept):**
  - [1 · Export og import](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-1)
  - [2 · const](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-2)
  - [3 · let og var](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-3)
  - [4 · Datatyper](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-4)
  - [5 · Sammenligning: === vs ==](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-5)
  - [6 · Function declaration](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-6)
  - [7 · Arrow function](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-7)
  - [8 · Parametre](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-8)
  - [9 · Return values](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-9)
  - [10 · Ekstra: Default parameters](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-10)
  - [11 · Ekstra: Callback functions](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-11)
  - [12 · Ekstra: Closures](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-12)
  - [13 · Property access](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-13)
  - [14 · Shorthand properties](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-14)
  - [15 · Destructuring (objects)](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-15)
  - [16 · Destructuring (arrays)](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-16)
  - [17 · Rest operator](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-17)
  - [18 · Spread operator](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-18)
  - [19 · Immutable opdatering (objekter)](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-19)
  - [20 · Immutable opdatering (arrays)](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-20)
  - [21 · map](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-21)
  - [22 · filter](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-22)
  - [23 · find](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-23)
  - [24 · Ekstra: forEach](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-24)
  - [25 · Ekstra: some og every](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-25)
  - [26 · Ekstra: includes](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-26)
  - [27 · Ekstra: reduce](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-27)
  - [28 · Template literals](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-28)
  - [29 · Ternary operator](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-29)
  - [30 · Logisk && (conditional rendering)](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-30)
  - [31 · Logisk || (fallback-værdier)](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-31)
  - [32 · Optional chaining (?.)](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-32)
  - [33 · Nullish coalescing (??)](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-33)
  - [34 · async/await](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-34)
  - [35 · Ekstra: Promises (.then/.catch)](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-35)
  - [36 · Din egen kode og Padlet](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-36)
- **Fælles Padlet:**
  - Link vil blive tilgængeligt her
- **JavaScript til React:**
  - [All The JavaScript You Need BEFORE React](https://www.youtube.com/watch?v=bCkfU_wHPcY)
  - [Top 12 JavaScript Concepts to Know Before Learning React](https://www.geeksforgeeks.org/reactjs/top-javascript-concepts-to-know-before-learning-react/)
  - [JavaScript to Know for React](https://kentcdodds.com/blog/javascript-to-know-for-react)
- **Opslagsværker:**
  - [JavaScript.info](https://javascript.info/)
  - [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- **Recap-kurser:**
  - [Scrimba: Learn JavaScript](https://scrimba.com/learn-javascript-c0v)
  - [Scrimba: Learn React](https://scrimba.com/learn-react-c0e)
