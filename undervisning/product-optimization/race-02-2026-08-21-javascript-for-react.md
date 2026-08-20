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

Vi sætter først rammen for dagen, bruger kort eksempler fra 2. semester som afsæt og arbejder derefter koncept for koncept fra JavaScript til React.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Dagens scope: JavaScript for React</strong></summary>
<ul>
<li>Hvorfor er et sikkert JavaScript-fundament vigtigt, når du arbejder med React?</li>
<li>Målet er ikke at lære 40 koncepter udenad, men at kunne genkende, forklare og anvende de mønstre, React bygger på.</li>
<li>Decket er en modulbank: vi prioriterer kernekoncepterne og bruger de markerede ekstra-emner efter behov.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Eksempler fra 2. semester</strong></summary>
<ul>
<li>Find det kodeeksempel frem, du valgte som forberedelse.</li>
<li>Præsentér det for din sidemakker: giv kort kontekst, forklar hvad du tror, koden gør, og peg på det, du er i tvivl om.</li>
<li>Undersøg koden sammen. Kan du bagefter forklare den med dine egne ord?</li>
<li>Hvis eksemplet stadig er uklart, deler du kode eller link, din nuværende forklaring og dit konkrete spørgsmål i <a href="https://padlet.com/race_js/js_react_eksempler">vores fælles Padlet</a>.</li>
<li>Byt roller, og gentag med din sidemakkers eksempel.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Sådan arbejder vi: koncept for koncept, i det små</strong></summary>
<ul>
<li>Hvert kernekoncept følger rytmen: <strong>forstå</strong>, <strong>JavaScript</strong>, <strong>React</strong> og <strong>prøv selv</strong>.</li>
<li>Vi holder koncepterne små, så fx function declarations, parametre, return values og arrow functions kan ses hver for sig.</li>
<li>Alt foregår i dit eget <code>web-app-optimization</code>-projekt. JavaScript-øvelserne ligger i <code>src/sandbox/</code>, og React-delen bruges i komponenter.</li>
<li>Der er 40 små konceptopgaver. I når så langt, som tiden og jeres behov rækker.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Modules og functions <span style="font-weight:400">(koncept 1–7)</span></strong></summary>
<ul>
<li>Kerne: modules, function declarations, parametre og return values samt arrow functions.</li>
<li>Ekstra: default parameters, callback functions og closures.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Objects <span style="font-weight:400">(koncept 8–13)</span></strong></summary>
<ul>
<li>Kerne: objects, property access, shorthand properties og destructuring.</li>
<li>Ekstra: spread syntax og immutable opdatering af objects.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Arrays <span style="font-weight:400">(koncept 14–18)</span></strong></summary>
<ul>
<li>Kerne: arrays og destructuring af arrays.</li>
<li>Ekstra: spread, rest parameters og immutable opdatering af arrays.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>7. Array methods <span style="font-weight:400">(koncept 19–25)</span></strong></summary>
<ul>
<li>Kerne: <code>map()</code>, <code>filter()</code> og <code>find()</code>.</li>
<li>Ekstra: <code>forEach()</code>, <code>some()</code>/<code>every()</code>, <code>includes()</code> og <code>reduce()</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>8. Strings og conditionals <span style="font-weight:400">(koncept 26–32)</span></strong></summary>
<ul>
<li>Kerne: template literals, <code>if</code>/<code>else</code>, ternary, logical AND og optional chaining.</li>
<li>Ekstra: logical OR og nullish coalescing.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>9. Events <span style="font-weight:400">(koncept 33–34)</span></strong></summary>
<ul>
<li>Event handlers og event objectet i almindelig JavaScript og React.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>10. Asynkron JavaScript og API’er <span style="font-weight:400">(koncept 35–40)</span></strong></summary>
<ul>
<li>Kerne: <code>async</code>/<code>await</code>, <code>fetch()</code> samt JSON og <code>response.json()</code>.</li>
<li>Ekstra: <code>.then()</code>/<code>.catch()</code>, <code>try</code>/<code>catch</code> og <code>JSON.parse()</code>/<code>JSON.stringify()</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>11. Egen kode og opsamling</strong></summary>
<ul>
<li>Find et JavaScript-flow i din egen Web App, og identificér dagens koncepter i koden.</li>
<li>Genbesøg dit eksempel fra 2. semester: Kan du nu forklare, hvad koden gør, og hvilke koncepter den bruger?</li>
<li>Notér det næste konkrete spørgsmål, du vil undersøge.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:**
  - [JavaScript for React](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/)
  - [PDF-version: JavaScript for React](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/?print-pdf)
- **Opgaver (40, koncept for koncept):**
  - [1 · Modules: import og export](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-1)
  - [2 · Function declarations](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-2)
  - [3 · Parametre og return values](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-3)
  - [4 · Arrow functions](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-4)
  - [5 · Ekstra: Default parameters](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-5)
  - [6 · Ekstra: Callback functions](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-6)
  - [7 · Ekstra: Closures](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-7)
  - [8 · Objects](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-8)
  - [9 · Property access](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-9)
  - [10 · Shorthand properties](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-10)
  - [11 · Destructuring af objects](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-11)
  - [12 · Ekstra: Spread syntax med objects](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-12)
  - [13 · Ekstra: Immutable opdatering af objects](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-13)
  - [14 · Arrays](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-14)
  - [15 · Destructuring af arrays](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-15)
  - [16 · Ekstra: Spread syntax med arrays](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-16)
  - [17 · Ekstra: Rest syntax og rest parameters](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-17)
  - [18 · Ekstra: Immutable opdatering af arrays](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-18)
  - [19 · map()](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-19)
  - [20 · filter()](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-20)
  - [21 · find()](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-21)
  - [22 · Ekstra: forEach()](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-22)
  - [23 · Ekstra: some() og every()](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-23)
  - [24 · Ekstra: includes()](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-24)
  - [25 · Ekstra: reduce()](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-25)
  - [26 · Template literals](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-26)
  - [27 · if og else](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-27)
  - [28 · Ternary operator](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-28)
  - [29 · Logical AND](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-29)
  - [30 · Ekstra: Logical OR og fallback-værdier](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-30)
  - [31 · Ekstra: Nullish coalescing](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-31)
  - [32 · Optional chaining](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-32)
  - [33 · Event handlers](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-33)
  - [34 · Event object](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-34)
  - [35 · async og await](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-35)
  - [36 · fetch()](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-36)
  - [37 · JSON og response.json()](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-37)
  - [38 · Ekstra: Promises med .then() og .catch()](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-38)
  - [39 · Ekstra: Error handling med try og catch](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-39)
  - [40 · Ekstra: JSON.parse() og JSON.stringify()](https://cederdorff.com/mdu-e25ixd/slides/product-optimization-02/#/opgave-40)
- **Fælles Padlet:**
  - [JavaScript og React – eksempler fra 2. semester](https://padlet.com/race_js/js_react_eksempler)
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
