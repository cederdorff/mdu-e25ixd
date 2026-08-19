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
<summary><strong>3. Sådan arbejder vi: forstå → JavaScript → React</strong></summary>
<ul>
<li>Hvert koncept gennemgås i tre trin: en kort forklaring, et lille eksempel i almindelig JavaScript og derefter det samme koncept i en React-komponent.</li>
<li>Alt foregår i dit eget <code>web-app-optimization</code>-projekt: JavaScript-øvelserne ligger i <code>src/playground/</code>, og React-delen bruges direkte i dine komponenter.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Moduler, import og export</strong></summary>
<ul>
<li>Hvorfor deler vi kode op i filer? Genbrug, overblik og navnerum.</li>
<li>Opret <code>src/playground/</code>, og øv <code>export</code>/<code>import</code> mellem filer.</li>
<li>Find import og export i din egen apps komponenter.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Variabler og datatyper</strong></summary>
<ul>
<li><code>const</code>, <code>let</code> og <code>var</code> (og hvorfor <code>var</code> undgås), datatyper og <code>===</code> vs. <code>==</code>.</li>
<li>Øv i JavaScript, og genkend forskellen på en <code>const</code>-værdi og en <code>useState</code>-værdi i React.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Functions og arrow functions</strong></summary>
<ul>
<li>Parametre, return values, default parameters og callback functions. Ekstra: closures.</li>
<li>Øv i JavaScript, og byg derefter en komponent med et default prop og en <code>onClick</code>-callback.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>7. Objekter, arrays og immutability</strong></summary>
<ul>
<li>Property access, shorthand properties, destructuring samt rest og spread.</li>
<li>Immutable opdatering af objekter og arrays i JavaScript — og af state i React.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>8. Array-metoder og rendering</strong></summary>
<ul>
<li>Array-metoderne <code>map</code>, <code>filter</code> og <code>find</code>. Ekstra: <code>forEach</code>, <code>some</code>, <code>every</code>, <code>includes</code> og <code>reduce</code>.</li>
<li>Øv i JavaScript, og render derefter en filtrerbar liste i React med <code>key</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>9. Udtryk der styrer visning</strong></summary>
<ul>
<li>Template literals, ternary operator, logiske operatorer (<code>&amp;&amp;</code> og <code>||</code>), truthy/falsy, optional chaining (<code>?.</code>) og nullish coalescing (<code>??</code>).</li>
<li>Øv i JavaScript, og brug dem derefter til conditional rendering i React.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>10. Async: fetch med await</strong></summary>
<ul>
<li>Promises og sammenhængen mellem promises og <code>async</code>/<code>await</code>. Ekstra: <code>.then()</code>/<code>.catch()</code> og callbacks.</li>
<li>Øv i JavaScript, og hent derefter data i React med <code>useEffect</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>11. Egen kode og opsamling</strong></summary>
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
- **Opgaver:**
  - [Opgave 1 · Del et eksempel i Padlet](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-1)
  - [Opgave 2 · Byg din playground-mappe](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-2)
  - [Opgave 3 · Find import/export i din app](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-3)
  - [Opgave 4 · Variabler og datatyper i JavaScript](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-4)
  - [Opgave 5 · Variabler og state i React](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-5)
  - [Opgave 6 · Functions i JavaScript](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-6)
  - [Opgave 7 · Functions i React](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-7)
  - [Opgave 8 · Objekter og arrays i JavaScript](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-8)
  - [Opgave 9 · Immutable state i React](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-9)
  - [Opgave 10 · map, filter, find i JavaScript](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-10)
  - [Opgave 11 · Rendering af lister i React](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-11)
  - [Opgave 12 · Udtryk der styrer visning i JavaScript](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-12)
  - [Opgave 13 · Conditional rendering i React](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-13)
  - [Opgave 14 · Async i JavaScript](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-14)
  - [Opgave 15 · Data fetching i React](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-15)
  - [Opgave 16 · Din egen kode og Padlet](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-16)
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
