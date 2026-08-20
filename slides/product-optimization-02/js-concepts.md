# JavaScript for React

## Indhold

### Functions

1. Modules: `import` & `export`
2. Function declarations
3. Parametre og return values
4. Arrow functions
5. **Ekstra:** Default parameters
6. **Ekstra:** Callback functions
7. **Ekstra:** Closures

### Objects

8. Objects
9. Property access
10. Shorthand properties
11. Destructuring af objects
12. **Ekstra:** Spread syntax med objects
13. **Ekstra:** Immutable opdatering af objects

### Arrays

14. Arrays
15. Destructuring af arrays
16. **Ekstra:** Spread syntax med arrays
17. **Ekstra:** Rest syntax / Rest parameters
18. **Ekstra:** Immutable opdatering af arrays

### Array methods

19. `map()`
20. `filter()`
21. `find()`
22. **Ekstra:** `forEach()`
23. **Ekstra:** `some()` og `every()`
24. **Ekstra:** `includes()`
25. **Ekstra:** `reduce()`

### Strings og conditionals

26. Template literals
27. `if` / `else`
28. Ternary operator `? :`
29. Logical AND `&&`
30. Logical OR `||` og fallback-værdier
31. Nullish coalescing `??`
32. Optional chaining `?.`

### Events

33. Event handlers
34. Event object

### Asynkron JavaScript og API’er

35. `async` / `await`
36. `fetch()`
37. JSON og `response.json()`
38. **Ekstra:** Promises med `.then()` / `.catch()`
39. **Ekstra:** Error handling med `try` / `catch`
40. **Ekstra:** `JSON.parse()` / `JSON.stringify()`

---

## Setup · Sandbox

Vi arbejder videre i React-projektet **`web-app-optimization`**.

For at kunne eksperimentere med JavaScript og React uden at blande øvelserne sammen med resten af projektet, opretter vi en `sandbox`-mappe:

```text
src/
├── App.jsx
└── sandbox/
    └── sandbox.js
```

### Opret `sandbox.js`

`sandbox.js` bliver vores entry point til JavaScript-øvelser.

```js
// src/sandbox/sandbox.js

console.log("Sandbox is running 🚀");
```

Importér `sandbox.js` i `App.jsx`, så filen bliver kørt:

```jsx
// src/App.jsx

import "./sandbox/sandbox.js";
```

Start projektet og åbn browserens console. Her skulle du gerne se:

```text
Sandbox is running 🚀
```

> **Sandboxen er til eksperimenter.** Her kan du frit oprette, ændre og slette filer og kode undervejs.

---

# 1 · Modules: `import` & `export`

## Hvad er det?

Modules gør det muligt at dele JavaScript-kode op i flere filer.

En fil kan **exportere** værdier, funktioner eller komponenter, som andre filer derefter kan **importere**.

```js
// students.js

export const students = ["Anna", "Peter", "Sara"];
```

```js
// sandbox.js

import { students } from "./students.js";

console.log(students);
```

## Hvorfor bruger vi det?

Modules hjælper os med at organisere og genbruge kode i stedet for at samle hele applikationen i én stor fil.

Vi kan fx have data og funktioner i separate filer:

```text
sandbox/
├── sandbox.js
├── students.js
└── greetings.js
```

og importere det, vi har brug for:

```js
import { students } from "./students.js";
import { sayHi } from "./greetings.js";
```

I React bruger vi modules hele tiden til fx komponenter, funktioner og data.

## Hvordan bruges det?

Vi kan exportere en variabel fra en fil:

```js
// students.js

export const students = ["Anna", "Peter", "Sara"];
```

og importere den i `sandbox.js`:

```js
// sandbox.js

import { students } from "./students.js";

console.log(students);
```

Vi kan også exportere funktioner:

```js
// greetings.js

export function sayHi(name) {
  return `Hello, ${name}!`;
}
```

og importere dem:

```js
// sandbox.js

import { sayHi } from "./greetings.js";

console.log(sayHi("Peter"));
```

## I React

React components er også JavaScript modules.

En component kan exporteres fra sin egen fil:

```jsx
// Student.jsx

export default function Student() {
  return <p>Anna</p>;
}
```

og importeres i en anden component:

```jsx
// App.jsx

import Student from "./sandbox/Student";

export default function App() {
  return (
    <main>
      <h1>Students</h1>
      <Student />
    </main>
  );
}
```

Du vil også ofte møde imports fra packages:

```js
import { useState } from "react";
```

Princippet er det samme: Vi importerer noget, som er eksporteret fra et andet module.

## Prøv selv

### JavaScript

1. Opret `teachers.js` i `sandbox`.
2. Opret et array med tre undervisere og exportér det.
3. Importér `teachers` i `sandbox.js`.
4. Print arrayet med `console.log()`.
5. Kontrollér resultatet i browserens console.

#### Ekstra

Opret en ny fil `greetings.js`.

I filen skal du:

- oprette en funktion `sayHi(name)`
- få funktionen til at returnere en hilsen med det navn, den modtager
- exportere funktionen

Importér derefter `sayHi` i `sandbox.js` og brug funktionen:

```js
console.log(sayHi("Anna"));
```

Resultatet skal være:

```text
Hello, Anna!
```

### React

1. Opret `Teacher.jsx` i `sandbox`.
2. Lav en `Teacher` component, der viser navnet på en underviser.
3. Exportér komponenten.
4. Importér `Teacher` i `App.jsx`.
5. Vis komponenten med `<Teacher />`.

#### Ekstra

Udvid `Teacher`, så komponenten modtager `name` og `email` som props.

Du skal kunne bruge komponenten sådan:

```jsx
<Teacher name="Morten" email="morten@example.com" />
```

Vis både navn og email i komponenten.

Brug derefter `Teacher` flere gange med forskellige værdier:

```jsx
<Teacher name="Morten" email="morten@example.com" />
<Teacher name="Anna" email="anna@example.com" />
```

---

# 2 · Function declarations

## Hvad er det?

En function declaration bruges til at oprette en funktion:

```js
function sayHi() {
  console.log("Hello!");
}
```

En funktion er en blok kode, som vi kan køre, når vi har brug for den.

Funktionen bliver først kørt, når vi **kalder** den:

```js
sayHi();
```

## Hvorfor bruger vi det?

Funktioner gør det muligt at samle og genbruge kode.

Uden en funktion kunne vi fx skrive:

```js
console.log("Welcome!");
console.log("Welcome!");
console.log("Welcome!");
```

Med en funktion kan vi definere koden én gang og bruge den flere gange:

```js
function showWelcome() {
  console.log("Welcome!");
}

showWelcome();
showWelcome();
showWelcome();
```

## Hvordan bruges det?

En function declaration består af `function`, et navn, parenteser `()` og en blok `{}`:

```js
function showMessage() {
  console.log("Hello!");
}
```

Funktionen kaldes ved at skrive dens navn efterfulgt af `()`:

```js
showMessage();
```

En funktion kan indeholde flere statements:

```js
function showProfile() {
  const name = "Anna";
  const education = "Multimedia Design";

  console.log(name);
  console.log(education);
}

showProfile();
```

Senere ser vi på, hvordan funktioner kan modtage **parametre** og sende værdier tilbage med **`return`**.

## I React

React components er også funktioner:

```jsx
function Welcome() {
  return <h2>Welcome!</h2>;
}
```

I stedet for selv at kalde funktionen:

```js
Welcome();
```

bruger vi komponenten i JSX:

```jsx
<Welcome />
```

Fx:

```jsx
function Welcome() {
  return <h2>Welcome!</h2>;
}

function App() {
  return (
    <main>
      <h1>My App</h1>
      <Welcome />
    </main>
  );
}
```

React bruger `Welcome`-funktionen som en component og viser det JSX, funktionen returnerer.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

1. Opret funktionen `showWelcomeMessage()`.
2. Funktionen skal skrive `"Welcome to the sandbox!"` i browserens console.
3. Kald funktionen tre gange.
4. Kontrollér resultatet i browserens console.

#### Ekstra

Opret tre funktioner:

- `showTitle()`
- `showDescription()`
- `showFooter()`

Hver funktion skal skrive sin egen tekst i browserens console.

Opret derefter funktionen `showPage()`:

```js
function showPage() {
  // Kald de tre funktioner her
}
```

Når du kalder:

```js
showPage();
```

skal alle tre tekster vises i browserens console.

### React

Opret `Welcome.jsx` i `sandbox`.

1. Opret en `Welcome` component med en function declaration.
2. Komponenten skal vise en overskrift og en kort tekst.
3. Exportér `Welcome`.
4. Importér komponenten i `App.jsx`.
5. Vis komponenten med `<Welcome />`.

#### Ekstra

Opret yderligere to components i `sandbox`:

```text
Introduction.jsx
Contact.jsx
```

Hver component skal returnere sit eget JSX.

Exportér og importér komponenterne, og brug dem sammen i `App.jsx`:

```jsx
<Welcome />
<Introduction />
<Contact />
```

---

# 3 · Parametre og return values

## Hvad er det?

Parametre gør det muligt at sende værdier ind i en funktion:

```js
function sayHi(name) {
  console.log(`Hello, ${name}!`);
}

sayHi("Anna");
```

Her er `name` en parameter, mens `"Anna"` er den værdi, vi sender med, når funktionen kaldes.

En funktion kan også sende en værdi tilbage med `return`:

```js
function getGreeting(name) {
  return `Hello, ${name}!`;
}

const greeting = getGreeting("Anna");
console.log(greeting);
```

## Hvorfor bruger vi det?

Parametre gør funktioner fleksible, fordi den samme funktion kan arbejde med forskellige værdier:

```js
function sayHi(name) {
  console.log(`Hello, ${name}!`);
}

sayHi("Anna");
sayHi("Peter");
sayHi("Sara");
```

`return` gør det muligt at bruge resultatet fra en funktion et andet sted i koden:

```js
function double(number) {
  return number * 2;
}

const result = double(5);
console.log(result);
```

## Hvordan bruges det?

En funktion kan have én parameter:

```js
function square(number) {
  return number * number;
}

console.log(square(4));
```

eller flere parametre:

```js
function add(a, b) {
  return a + b;
}

console.log(add(2, 3));
```

Når JavaScript møder `return`, afsluttes funktionen, og værdien sendes tilbage:

```js
function getMessage() {
  return "Hello!";
}

const message = getMessage();
console.log(message);
```

## I React

React components kan modtage data gennem props. Props fungerer som input til komponentens funktion:

```jsx
function Greeting({ name }) {
  return <h2>Hello, {name}!</h2>;
}
```

Komponenten kan bruges med forskellige værdier:

```jsx
<Greeting name="Anna" />
<Greeting name="Peter" />
```

React components bruger også `return` til at sende det JSX tilbage, som skal vises:

```jsx
function Profile({ name, education }) {
  return (
    <section>
      <h2>{name}</h2>
      <p>{education}</p>
    </section>
  );
}
```

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

1. Opret funktionen `sayHi(name)`.
2. Funktionen skal bruge parameteren `name` i en hilsen.
3. Kald funktionen med mindst tre forskellige navne.
4. Kontrollér resultatet i browserens console.

Opret derefter funktionen:

```js
function calculateTotal(price, quantity) {
  // returnér den samlede pris
}
```

Kald funktionen og gem resultatet i en variabel:

```js
const total = calculateTotal(100, 3);
console.log(total);
```

#### Ekstra

Opret funktionen `createUser(name, email)`.

Funktionen skal returnere et object med `name` og `email`.

```js
const user = createUser("Anna", "anna@example.com");

console.log(user);
```

Resultatet skal ligne:

```js
{
  name: "Anna",
  email: "anna@example.com"
}
```

### React

Opret `Greeting.jsx` i `sandbox`.

1. Opret en `Greeting` component, der modtager `name` som prop.
2. Vis navnet i en hilsen.
3. Exportér komponenten.
4. Importér `Greeting` i `App.jsx`.
5. Brug komponenten mindst tre gange med forskellige navne.

```jsx
<Greeting name="Anna" />
<Greeting name="Peter" />
<Greeting name="Sara" />
```

#### Ekstra

Opret `Profile.jsx` i `sandbox`.

Komponenten skal modtage:

- `name`
- `education`
- `email`

Vis alle tre værdier i komponentens JSX.

Brug derefter `Profile` med forskellige props, fx:

```jsx
<Profile name="Anna" education="Multimedia Design" email="anna@example.com" />
```

---

# 4 · Arrow functions

## Hvad er det?

En arrow function er en anden måde at skrive en funktion på i JavaScript.

En function declaration:

```js
function sayHi(name) {
  return `Hello, ${name}!`;
}
```

kan skrives som en arrow function:

```js
const sayHi = (name) => {
  return `Hello, ${name}!`;
};
```

Arrow functions bruger `=>` i stedet for keywordet `function`.

## Hvorfor bruger vi det?

Arrow functions giver en kortere måde at skrive funktioner på og bruges meget i moderne JavaScript.

Du har fx allerede mødt arrow functions sammen med `map()`:

```js
const numbers = [1, 2, 3];

const doubledNumbers = numbers.map((number) => number * 2);

console.log(doubledNumbers);
```

Her er `(number) => number * 2` den funktion, som `map()` bruger på hvert element i arrayet.

## Hvordan bruges det?

En function declaration:

```js
function double(number) {
  return number * 2;
}
```

kan skrives som:

```js
const double = (number) => {
  return number * 2;
};
```

Hvis funktionen kun returnerer én værdi, kan den forkortes:

```js
const double = (number) => number * 2;
```

Det kaldes **implicit return**.

En arrow function kan også have flere parametre:

```js
const add = (a, b) => a + b;

console.log(add(2, 3));
```

Hvis funktionen indeholder flere statements, bruger vi `{}` og `return`:

```js
const calculateTotal = (price, quantity) => {
  const total = price * quantity;

  return total;
};
```

## I React

Arrow functions bruges ofte til event handlers:

```jsx
function Button() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

Du har også mødt arrow functions sammen med `map()`:

```jsx
const students = ["Anna", "Peter", "Sara"];

function StudentList() {
  return (
    <ul>
      {students.map((student) => (
        <li key={student}>{student}</li>
      ))}
    </ul>
  );
}
```

Her er `(student) => ...` den funktion, som `map()` bruger på hvert element i `students`.

Vi arbejder mere med `map()` senere.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Omskriv denne function declaration til en arrow function:

```js
function sayHi(name) {
  return `Hello, ${name}!`;
}
```

Kald funktionen og kontrollér resultatet i browserens console.

Omskriv derefter:

```js
function multiply(a, b) {
  return a * b;
}
```

til en arrow function med implicit return.

#### Ekstra

Opret tre arrow functions:

- `double(number)` skal returnere tallet ganget med 2
- `getFullName(firstName, lastName)` skal returnere det fulde navn
- `calculatePrice(price, quantity)` skal returnere den samlede pris

Test funktionerne:

```js
console.log(double(5));
console.log(getFullName("Anna", "Jensen"));
console.log(calculatePrice(100, 3));
```

### React

Opret `Button.jsx` i `sandbox`.

1. Opret en `Button` component.
2. Opret `handleClick` som en arrow function.
3. Funktionen skal skrive `"Button clicked!"` i browserens console.
4. Brug `handleClick` som `onClick` på en button.
5. Exportér komponenten og importér den i `App.jsx`.

```jsx
<button onClick={handleClick}>Click me</button>
```

#### Ekstra

Opret et array med tre navne:

```jsx
const students = ["Anna", "Peter", "Sara"];
```

Brug `map()` og en arrow function til at vise navnene som en liste:

```jsx
<ul>
  {students.map((student) => (
    // Vis student her
  ))}
</ul>
```

---

# 5 · Ekstra: Default parameters

## Hvad er det?

Default parameters gør det muligt at give en parameter en standardværdi:

```js
function sayHi(name = "Guest") {
  return `Hello, ${name}!`;
}
```

Hvis vi kalder funktionen uden at sende en værdi med, bruges standardværdien:

```js
console.log(sayHi());
// Hello, Guest!
```

Sender vi en værdi med, bruges den i stedet:

```js
console.log(sayHi("Anna"));
// Hello, Anna!
```

## Hvorfor bruger vi det?

Default parameters er nyttige, når en funktion skal kunne bruges, selvom en værdi ikke bliver sendt med.

Uden en default parameter:

```js
function sayHi(name) {
  return `Hello, ${name}!`;
}

console.log(sayHi());
// Hello, undefined!
```

Med en default parameter:

```js
function sayHi(name = "Guest") {
  return `Hello, ${name}!`;
}

console.log(sayHi());
// Hello, Guest!
```

## Hvordan bruges det?

En default value skrives direkte ved parameteren:

```js
function calculatePrice(price, quantity = 1) {
  return price * quantity;
}
```

Hvis `quantity` ikke sendes med, bruges `1`:

```js
console.log(calculatePrice(100));
// 100
```

Vi kan stadig sende vores egen værdi:

```js
console.log(calculatePrice(100, 3));
// 300
```

Arrow functions kan også bruge default parameters:

```js
const sayHi = (name = "Guest") => `Hello, ${name}!`;
```

## I React

Default parameters kan fx bruges til at give en prop en standardværdi:

```jsx
function Greeting({ name = "Guest" }) {
  return <h2>Hello, {name}!</h2>;
}
```

Hvis vi ikke sender `name` med:

```jsx
<Greeting />
```

vises:

```text
Hello, Guest!
```

Sender vi en værdi med:

```jsx
<Greeting name="Anna" />
```

vises:

```text
Hello, Anna!
```

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret funktionen:

```js
function createGreeting(name, greeting = "Hello") {
  // ...
}
```

Funktionen skal returnere en hilsen.

Test den både med og uden en værdi til `greeting`:

```js
console.log(createGreeting("Anna"));
console.log(createGreeting("Anna", "Good morning"));
```

### React

Opret `Greeting.jsx` i `sandbox`.

Lad komponenten modtage både `name` og `greeting` med default values:

```jsx
function Greeting({ name = "Guest", greeting = "Hello" }) {
  // ...
}
```

Test komponenten med forskellige props:

```jsx
<Greeting />

<Greeting name="Anna" />

<Greeting
  name="Peter"
  greeting="Good morning"
/>
```

Kontrollér, hvordan resultatet ændrer sig, alt efter hvilke props du sender med.

---

# 6 · Ekstra: Callback functions

## Hvad er det?

En callback function er en funktion, som bliver sendt med til en anden funktion og kørt senere.

```js
function sayHi(name) {
  console.log(`Hello, ${name}!`);
}

function greetUser(callback) {
  callback("Anna");
}

greetUser(sayHi);
```

Her sender vi `sayHi` med som callback.

## Hvorfor bruger vi det?

Callbacks gør det muligt at lade en funktion bestemme, hvad der skal ske på et bestemt tidspunkt.

Du har allerede mødt callbacks sammen med `map()`:

```js
const numbers = [1, 2, 3];

const doubledNumbers = numbers.map((number) => number * 2);
```

Her er:

```js
(number) => number * 2;
```

en callback function, som `map()` kalder for hvert element i arrayet.

## Hvordan bruges det?

En callback kan være en navngivet funktion:

```js
function showName(name) {
  console.log(name);
}

function processUser(callback) {
  callback("Anna");
}

processUser(showName);
```

Den kan også skrives direkte som en arrow function:

```js
function processUser(callback) {
  callback("Anna");
}

processUser((name) => {
  console.log(name);
});
```

Callbacks bruges ofte med array methods, events og asynkron kode.

## I React

I React bruger vi callbacks hele tiden.

En event handler er fx en callback:

```jsx
function Button() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

`handleClick` bliver ikke kørt med det samme. React kalder funktionen, når brugeren klikker på knappen.

Callbacks bruges også med `map()`:

```jsx
const students = ["Anna", "Peter", "Sara"];

function StudentList() {
  return (
    <ul>
      {students.map((student) => (
        <li key={student}>{student}</li>
      ))}
    </ul>
  );
}
```

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret funktionen:

```js
function processName(name, callback) {
  // ...
}
```

Funktionen skal kalde `callback` med værdien fra `name`.

Opret derefter en callback:

```js
const showName = (name) => {
  console.log(name);
};
```

Test funktionen:

```js
processName("Anna", showName);
```

Prøv derefter at sende callback-funktionen direkte med som en arrow function.

### React

Opret `ActionButton.jsx` i `sandbox`.

Lad komponenten modtage en callback gennem en prop:

```jsx
function ActionButton({ onAction }) {
  return <button onClick={onAction}>Run action</button>;
}
```

Brug komponenten i `App.jsx`:

```jsx
<ActionButton onAction={() => console.log("Action running!")} />
```

Kontrollér, at callback-funktionen bliver kørt, når du klikker på knappen.

---

# 7 · Ekstra: Closures

## Hvad er det?

En closure opstår, når en funktion husker værdier fra det scope, hvor den blev oprettet.

```js
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}
```

Vi kan bruge funktionen sådan:

```js
const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

Den indre funktion kan stadig bruge `count`, selv efter `createCounter()` er færdig med at køre.

## Hvorfor bruger vi det?

Closures gør det muligt for funktioner at huske værdier mellem kald.

```js
function createGreeting(greeting) {
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = createGreeting("Hello");

console.log(sayHello("Anna"));
console.log(sayHello("Peter"));
```

Funktionen `sayHello` husker værdien `"Hello"`.

## Hvordan bruges det?

En closure opstår typisk, når vi har en funktion inde i en anden funktion:

```js
function outer() {
  const message = "Hello";

  function inner() {
    console.log(message);
  }

  return inner;
}
```

Når vi gemmer den returnerede funktion:

```js
const showMessage = outer();
```

kan den stadig bruge `message`:

```js
showMessage();
// Hello
```

Den indre funktion har altså adgang til værdier fra den ydre funktion.

## I React

Closures er en del af almindelig JavaScript og bruges indirekte mange steder i React.

Et simpelt eksempel er en event handler, som bruger en værdi fra komponenten:

```jsx
function Greeting() {
  const name = "Anna";

  const handleClick = () => {
    console.log(`Hello, ${name}!`);
  };

  return <button onClick={handleClick}>Say hello</button>;
}
```

`handleClick` kan bruge `name`, fordi funktionen blev oprettet i det samme scope.

Du behøver ikke kunne alle detaljer om closures for at arbejde med React, men det er nyttigt at vide, at funktioner kan huske værdier fra det sted, hvor de blev oprettet.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret funktionen:

```js
function createMultiplier(number) {
  // ...
}
```

Funktionen skal returnere en ny funktion, som ganger sit input med `number`.

Du skal fx kunne skrive:

```js
const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### React

Opret `GreetingButton.jsx` i `sandbox`.

Lav en component med en lokal variabel:

```jsx
function GreetingButton() {
  const name = "Anna";

  const handleClick = () => {
    // brug name her
  };

  return <button onClick={handleClick}>Say hello</button>;
}
```

Når der klikkes på knappen, skal browserens console vise:

```text
Hello, Anna!
```

Bemærk, at `handleClick` kan bruge `name`, selvom `name` ikke sendes med som parameter.

---

# 8 · Objects

## Hvad er det?

Et object bruges til at samle relaterede værdier i én struktur.

```js
const student = {
  name: "Anna",
  age: 24,
  education: "Multimedia Design"
};
```

Et object består af properties med et navn og en værdi.

Her er `name`, `age` og `education` properties på objectet `student`.

## Hvorfor bruger vi det?

Objects gør det lettere at samle data, der hører sammen.

Uden et object kunne vi fx skrive:

```js
const name = "Anna";
const age = 24;
const education = "Multimedia Design";
```

Med et object kan vi samle værdierne:

```js
const student = {
  name: "Anna",
  age: 24,
  education: "Multimedia Design"
};
```

Det gør data nemmere at organisere og sende videre som én samlet værdi.

## Hvordan bruges det?

Et object oprettes med `{}`:

```js
const product = {
  name: "Keyboard",
  price: 799,
  inStock: true
};
```

Properties kan indeholde forskellige datatyper:

```js
const user = {
  name: "Peter",
  age: 31,
  isStudent: false,
  skills: ["JavaScript", "React"]
};
```

Et object kan også indeholde andre objects:

```js
const student = {
  name: "Anna",
  contact: {
    email: "anna@example.com",
    phone: "12345678"
  }
};
```

Vi arbejder med, hvordan vi læser properties fra objects i næste koncept.

## I React

Objects bruges hele tiden i React til fx data og props.

```jsx
const student = {
  name: "Anna",
  education: "Multimedia Design"
};

function Student() {
  return (
    <article>
      <h2>{student.name}</h2>
      <p>{student.education}</p>
    </article>
  );
}
```

Vi sender også ofte et helt object som prop:

```jsx
function App() {
  const student = {
    name: "Anna",
    education: "Multimedia Design"
  };

  return <Student student={student} />;
}
```

Komponenten kan derefter modtage objectet:

```jsx
function Student({ student }) {
  return (
    <article>
      <h2>{student.name}</h2>
      <p>{student.education}</p>
    </article>
  );
}
```

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret et object med navnet `course` med følgende properties:

- `title`
- `teacher`
- `duration`
- `isActive`

Giv properties passende værdier.

Print hele objectet i browserens console:

```js
console.log(course);
```

#### Ekstra

Opret et `product` object med:

- `name`
- `price`
- `inStock`
- `categories`

`categories` skal være et array med mindst to værdier.

Print hele objectet i console.

### React

Opret `Course.jsx` i `sandbox`.

Opret et `course` object:

```jsx
const course = {
  title: "JavaScript",
  teacher: "Anna",
  duration: 5
};
```

Vis værdierne fra objectet i JSX.

#### Ekstra

Flyt `course` objectet til `App.jsx` og send det videre som en prop:

```jsx
<Course course={course} />
```

Vis derefter værdierne i `Course`-komponenten.

---

# 9 · Property access

## Hvad er det?

Property access bruges til at læse værdier fra et object.

```js
const student = {
  name: "Anna",
  age: 24
};

console.log(student.name);
```

Her bruger vi `student.name` til at få værdien fra property'en `name`.

## Hvorfor bruger vi det?

Når data er samlet i et object, har vi brug for en måde at hente de enkelte værdier på.

```js
const product = {
  name: "Keyboard",
  price: 799,
  inStock: true
};
```

Vi kan fx hente produktets navn og pris:

```js
console.log(product.name);
console.log(product.price);
```

## Hvordan bruges det?

Den mest almindelige måde er **dot notation**:

```js
const user = {
  name: "Peter",
  email: "peter@example.com"
};

console.log(user.name);
console.log(user.email);
```

Vi kan også bruge **bracket notation**:

```js
console.log(user["name"]);
console.log(user["email"]);
```

Bracket notation er især nyttig, hvis property-navnet ligger i en variabel:

```js
const property = "name";

console.log(user[property]);
```

Nested objects tilgås på samme måde:

```js
const student = {
  name: "Anna",
  contact: {
    email: "anna@example.com"
  }
};

console.log(student.contact.email);
```

## I React

I React bruger vi ofte property access til at vise data fra objects:

```jsx
const student = {
  name: "Anna",
  education: "Multimedia Design"
};

function Student() {
  return (
    <article>
      <h2>{student.name}</h2>
      <p>{student.education}</p>
    </article>
  );
}
```

Det samme gælder, når et object kommer ind som prop:

```jsx
function Student({ student }) {
  return (
    <article>
      <h2>{student.name}</h2>
      <p>{student.education}</p>
    </article>
  );
}
```

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret et object:

```js
const course = {
  title: "JavaScript",
  teacher: "Anna",
  duration: 5
};
```

Print hver property separat med dot notation:

```js
console.log(course.title);
console.log(course.teacher);
console.log(course.duration);
```

Prøv derefter at hente én af værdierne med bracket notation.

#### Ekstra

Opret et nested object:

```js
const student = {
  name: "Anna",
  contact: {
    email: "anna@example.com",
    phone: "12345678"
  }
};
```

Print både `email` og `phone` i browserens console.

### React

Opret `StudentCard.jsx` i `sandbox`.

Lad komponenten modtage et `student` object som prop:

```jsx
function StudentCard({ student }) {
  // ...
}
```

Vis `name`, `email` og `education` med property access.

Brug komponenten fra `App.jsx` med et object, du selv opretter.

#### Ekstra

Tilføj et nested `contact` object til `student` og vis `student.contact.email` i komponenten.

---

# 10 · Shorthand properties

## Hvad er det?

Shorthand properties er en kortere måde at oprette object properties på, når variabelnavnet og property-navnet er det samme.

Uden shorthand:

```js
const name = "Anna";
const age = 24;

const student = {
  name: name,
  age: age
};
```

Med shorthand:

```js
const student = {
  name,
  age
};
```

## Hvorfor bruger vi det?

Shorthand properties gør object-kode kortere og lettere at læse.

```js
const name = "Anna";
const email = "anna@example.com";
const education = "Multimedia Design";

const student = {
  name,
  email,
  education
};
```

JavaScript bruger automatisk variabelnavnet som property-navn.

## Hvordan bruges det?

Hvis vi har variabler:

```js
const title = "JavaScript";
const teacher = "Anna";
const duration = 5;
```

kan vi oprette et object sådan:

```js
const course = {
  title,
  teacher,
  duration
};
```

Det svarer til:

```js
const course = {
  title: title,
  teacher: teacher,
  duration: duration
};
```

Shorthand kan også bruges sammen med almindelige properties:

```js
const name = "Keyboard";
const price = 799;

const product = {
  name,
  price,
  inStock: true
};
```

## I React

Shorthand properties bruges ofte, når vi samler værdier i et object.

```jsx
function App() {
  const name = "Anna";
  const education = "Multimedia Design";

  const student = {
    name,
    education
  };

  return <Student student={student} />;
}
```

Det er især nyttigt, når flere værdier allerede findes som variabler og skal samles i ét object.

```jsx
const title = "JavaScript";
const teacher = "Anna";

const course = {
  title,
  teacher
};
```

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret variablerne:

```js
const name = "Anna";
const age = 24;
const email = "anna@example.com";
```

Brug shorthand properties til at oprette et `student` object.

Print objectet i browserens console.

#### Ekstra

Opret variablerne:

```js
const title = "React";
const teacher = "Peter";
const duration = 6;
```

Opret et `course` object med shorthand properties og tilføj samtidig:

```js
isActive: true;
```

### React

Opret nogle lokale variabler i `App.jsx`:

```jsx
const name = "Anna";
const education = "Multimedia Design";
const email = "anna@example.com";
```

Saml dem i et `student` object med shorthand properties:

```jsx
const student = {
  name,
  education,
  email
};
```

Send derefter objectet videre til en component:

```jsx
<StudentCard student={student} />
```

Vis værdierne i komponenten med property access.

#### Ekstra

Tilføj en ny variabel `age` og få den med i `student` objectet uden at ændre de eksisterende properties.

---

# 11 · Destructuring af objects

## Hvad er det?

Destructuring gør det muligt at hente properties fra et object og gemme dem i variabler.

```js
const student = {
  name: "Anna",
  age: 24
};

const { name, age } = student;

console.log(name);
console.log(age);
```

I stedet for at skrive `student.name` og `student.age` flere gange kan vi hente værdierne ud på én gang.

## Hvorfor bruger vi det?

Destructuring kan gøre koden kortere og lettere at læse.

Uden destructuring:

```js
const student = {
  name: "Anna",
  education: "Multimedia Design"
};

const name = student.name;
const education = student.education;
```

Med destructuring:

```js
const { name, education } = student;
```

Variabelnavnene matcher som udgangspunkt property-navnene i objectet.

## Hvordan bruges det?

Vi skriver de properties, vi vil hente, mellem `{}`:

```js
const product = {
  name: "Keyboard",
  price: 799,
  inStock: true
};

const { name, price } = product;

console.log(name);
console.log(price);
```

Vi behøver ikke hente alle properties:

```js
const { inStock } = product;

console.log(inStock);
```

Vi kan også destructure et nested object:

```js
const student = {
  name: "Anna",
  contact: {
    email: "anna@example.com"
  }
};

const { contact } = student;

console.log(contact.email);
```

## I React

Destructuring bruges meget i React, især med props.

Uden destructuring:

```jsx
function Student(props) {
  return (
    <article>
      <h2>{props.name}</h2>
      <p>{props.education}</p>
    </article>
  );
}
```

Med destructuring:

```jsx
function Student({ name, education }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{education}</p>
    </article>
  );
}
```

Her destructurer vi `name` og `education` direkte fra props-objectet.

Komponenten kan fx bruges sådan:

```jsx
<Student name="Anna" education="Multimedia Design" />
```

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret et object:

```js
const course = {
  title: "JavaScript",
  teacher: "Anna",
  duration: 5
};
```

Brug destructuring til at hente `title` og `teacher` ud i variabler.

Print værdierne i browserens console.

#### Ekstra

Opret et `product` object med properties:

- `name`
- `price`
- `inStock`
- `category`

Brug destructuring til kun at hente `name`, `price` og `category`.

Brug derefter værdierne til at skrive en kort produkttekst i console.

### React

Opret `CourseCard.jsx` i `sandbox`.

Lad komponenten modtage props:

```jsx
<CourseCard title="JavaScript" teacher="Anna" duration={5} />
```

Destructure `title`, `teacher` og `duration` direkte i komponentens parameter:

```jsx
function CourseCard({ title, teacher, duration }) {
  // ...
}
```

Vis alle tre værdier i komponentens JSX.

#### Ekstra

Tilføj en ny prop `level` og få den med i destructuringen og i komponentens output.

---

# 12 · Ekstra: Spread syntax med objects

## Hvad er det?

Spread syntax `...` gør det muligt at kopiere properties fra et object ind i et nyt object.

```js
const student = {
  name: "Anna",
  age: 24
};

const copy = {
  ...student
};

console.log(copy);
```

`copy` indeholder de samme properties som `student`.

## Hvorfor bruger vi det?

Spread syntax er nyttig, når vi vil oprette et nyt object ud fra et eksisterende object.

```js
const student = {
  name: "Anna",
  age: 24
};

const updatedStudent = {
  ...student,
  age: 25
};
```

Her kopierer vi først alle properties fra `student` og overskriver derefter `age`.

## Hvordan bruges det?

Vi skriver `...` foran det object, vi vil kopiere properties fra:

```js
const user = {
  name: "Peter",
  email: "peter@example.com"
};

const copy = {
  ...user
};
```

Vi kan samtidig tilføje nye properties:

```js
const userWithRole = {
  ...user,
  role: "student"
};
```

Og vi kan overskrive eksisterende properties:

```js
const updatedUser = {
  ...user,
  name: "Anna"
};
```

Rækkefølgen er vigtig. Properties, der kommer sidst, overskriver tidligere værdier.

## I React

Spread syntax bruges ofte i React, når vi arbejder med objects i state eller samler props.

```jsx
const student = {
  name: "Anna",
  education: "Multimedia Design"
};

const updatedStudent = {
  ...student,
  education: "Web Development"
};
```

Du vil også møde spread syntax, når props sendes videre:

```jsx
const student = {
  name: "Anna",
  education: "Multimedia Design"
};

<Student {...student} />;
```

Det svarer til:

```jsx
<Student name={student.name} education={student.education} />
```

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret et object:

```js
const course = {
  title: "JavaScript",
  teacher: "Anna",
  duration: 5
};
```

Opret derefter et nyt object `updatedCourse`, som kopierer alle properties fra `course` og ændrer `duration` til `6`.

Print både `course` og `updatedCourse` i browserens console.

### React

Opret et `student` object i `App.jsx`:

```jsx
const student = {
  name: "Anna",
  education: "Multimedia Design"
};
```

Send alle properties videre til en component med spread syntax:

```jsx
<Student {...student} />
```

Lad `Student` modtage `name` og `education` som props og vise dem i JSX.

---

# 13 · Ekstra: Immutable opdatering af objects

## Hvad er det?

En immutable opdatering betyder, at vi ikke ændrer det eksisterende object direkte.

I stedet opretter vi et nyt object med de ændringer, vi ønsker.

Direkte ændring:

```js
const student = {
  name: "Anna",
  age: 24
};

student.age = 25;
```

Immutable opdatering:

```js
const updatedStudent = {
  ...student,
  age: 25
};
```

`student` er stadig det oprindelige object, mens `updatedStudent` er et nyt object.

## Hvorfor bruger vi det?

Immutable opdateringer gør det tydeligt, hvornår data ændrer sig, fordi vi opretter en ny værdi i stedet for at ændre den eksisterende.

```js
const student = {
  name: "Anna",
  age: 24
};

const updatedStudent = {
  ...student,
  age: 25
};

console.log(student.age); // 24
console.log(updatedStudent.age); // 25
```

Det er især vigtigt i React, hvor state normalt skal opdateres uden at ændre den eksisterende værdi direkte.

## Hvordan bruges det?

Vi kan kombinere spread syntax med den property, vi vil ændre:

```js
const product = {
  name: "Keyboard",
  price: 799,
  inStock: true
};

const updatedProduct = {
  ...product,
  price: 699
};
```

Vi kan også tilføje en ny property:

```js
const productWithCategory = {
  ...product,
  category: "Accessories"
};
```

Det oprindelige object bliver ikke ændret.

## I React

I React bruger vi ofte immutable opdateringer sammen med state.

```jsx
const [student, setStudent] = useState({
  name: "Anna",
  age: 24
});
```

Vi ændrer ikke objectet direkte:

```jsx
student.age = 25;
```

I stedet opretter vi et nyt object:

```jsx
setStudent({
  ...student,
  age: 25
});
```

React får dermed en ny object-reference og kan reagere på ændringen.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret et object:

```js
const product = {
  name: "Keyboard",
  price: 799,
  inStock: true
};
```

Opret et nyt object `updatedProduct`, hvor `price` ændres til `699` uden at ændre det oprindelige `product` object.

Print begge objects og kontrollér, at `product.price` stadig er `799`.

### React

Opret en component med state:

```jsx
const [student, setStudent] = useState({
  name: "Anna",
  age: 24
});
```

Lav en button, der opdaterer `age` til `25` med en immutable opdatering:

```jsx
setStudent({
  ...student,
  age: 25
});
```

Vis både `name` og `age` i JSX og kontrollér, at værdien ændres, når du klikker på knappen.

---

# 14 · Arrays

## Hvad er det?

Et array bruges til at samle flere værdier i én struktur.

```js
const students = ["Anna", "Peter", "Sara"];
```

Et array kan fx indeholde en liste af navne, produkter eller andre værdier.

Hvert element i et array har en position, som kaldes et **index**. Det første element har index `0`.

```js
console.log(students[0]); // Anna
console.log(students[1]); // Peter
```

## Hvorfor bruger vi det?

Arrays er nyttige, når vi har flere værdier, der hører sammen.

I stedet for:

```js
const student1 = "Anna";
const student2 = "Peter";
const student3 = "Sara";
```

kan vi samle værdierne i et array:

```js
const students = ["Anna", "Peter", "Sara"];
```

Nu kan vi arbejde med alle vores studerende som én samlet liste.

Arrays bruges rigtig meget i React, fordi vi ofte arbejder med lister af data.

## Hvordan bruges det?

Et array oprettes med `[]`:

```js
const colors = ["red", "green", "blue"];
```

Vi kan hente et element ved hjælp af dets index:

```js
console.log(colors[0]); // red
console.log(colors[2]); // blue
```

Vi kan se, hvor mange elementer et array indeholder med `length`:

```js
console.log(colors.length); // 3
```

Et array kan også indeholde objects:

```js
const students = [
  {
    id: 1,
    name: "Anna",
    education: "Multimedia Design"
  },
  {
    id: 2,
    name: "Peter",
    education: "Web Development"
  },
  {
    id: 3,
    name: "Sara",
    education: "Multimedia Design"
  }
];
```

Vi kan kombinere index og property access:

```js
console.log(students[0].name); // Anna
console.log(students[0].education); // Multimedia Design

console.log(students[1].name); // Peter
console.log(students[1].education); // Web Development
```

## I React

I React arbejder vi ofte med arrays af data.

```jsx
const students = [
  {
    id: 1,
    name: "Anna",
    education: "Multimedia Design"
  },
  {
    id: 2,
    name: "Peter",
    education: "Web Development"
  },
  {
    id: 3,
    name: "Sara",
    education: "Multimedia Design"
  }
];
```

Vi kan fx vise et bestemt element fra arrayet:

```jsx
function Student() {
  return (
    <article>
      <h2>{students[0].name}</h2>
      <p>{students[0].education}</p>
    </article>
  );
}
```

Ofte vil vi dog vise **alle** elementerne i et array.

Det gør vi typisk med `map()`:

```jsx
{
  students.map((student) => (
    <article key={student.id}>
      <h2>{student.name}</h2>
      <p>{student.education}</p>
    </article>
  ));
}
```

Vi arbejder meget mere med `map()` senere.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret et array med mindst fire kurser:

```js
const courses = ["JavaScript", "React", "WordPress", "UX"];
```

1. Print hele arrayet i browserens console.
2. Print det første element.
3. Print det tredje element.
4. Print antallet af elementer med `length`.

#### Ekstra

Opret et array med tre student objects:

```js
const students = [
  {
    id: 1,
    name: "Anna",
    education: "Multimedia Design"
  }
  // ...
];
```

Tilføj selv de sidste to studerende.

Brug index og property access til at printe:

- navnet på den første studerende
- uddannelsen på den første studerende
- navnet på den anden studerende
- uddannelsen på den anden studerende
- navnet på den tredje studerende

### React

Opret `StudentList.jsx` i `sandbox`.

Opret et array med tre student objects:

```jsx
const students = [
  {
    id: 1,
    name: "Anna",
    education: "Multimedia Design"
  },
  {
    id: 2,
    name: "Peter",
    education: "Web Development"
  },
  {
    id: 3,
    name: "Sara",
    education: "Multimedia Design"
  }
];
```

Vis navn og uddannelse på den første og anden studerende i JSX ved hjælp af deres index:

```jsx
<h2>{students[0].name}</h2>
<p>{students[0].education}</p>

<h2>{students[1].name}</h2>
<p>{students[1].education}</p>
```

Exportér komponenten og vis den i `App.jsx`.

#### Ekstra

Prøv nu at vise **alle** studerende med den `map()`-syntax, du tidligere har mødt i React:

```jsx
{
  students.map((student) => (
    <article key={student.id}>
      <h2>{student.name}</h2>
      <p>{student.education}</p>
    </article>
  ));
}
```

Tilføj en fjerde studerende til arrayet og kontrollér, at den automatisk bliver vist.

---

# 15 · Destructuring af arrays

## Hvad er det?

Destructuring gør det muligt at hente værdier fra et array og gemme dem i variabler.

```js
const students = ["Anna", "Peter", "Sara"];

const [firstStudent, secondStudent] = students;

console.log(firstStudent); // Anna
console.log(secondStudent); // Peter
```

Ved arrays bestemmer **rækkefølgen**, hvilken værdi variablen får.

## Hvorfor bruger vi det?

Destructuring kan gøre det kortere og tydeligere at hente værdier fra et array.

Uden destructuring:

```js
const students = ["Anna", "Peter", "Sara"];

const firstStudent = students[0];
const secondStudent = students[1];
```

Med destructuring:

```js
const [firstStudent, secondStudent] = students;
```

Begge dele giver samme resultat.

## Hvordan bruges det?

Vi skriver variablerne mellem `[]`:

```js
const colors = ["red", "green", "blue"];

const [firstColor, secondColor] = colors;

console.log(firstColor); // red
console.log(secondColor); // green
```

Variabelnavnene bestemmer vi selv:

```js
const courses = ["JavaScript", "React"];

const [firstCourse, secondCourse] = courses;
```

Det er altså positionen i arrayet, der bestemmer værdien.

Vi kan også springe værdier over:

```js
const students = ["Anna", "Peter", "Sara"];

const [firstStudent, , thirdStudent] = students;

console.log(firstStudent); // Anna
console.log(thirdStudent); // Sara
```

## I React

Du har allerede mødt array destructuring, hvis du har arbejdet med `useState`:

```jsx
const [name, setName] = useState("Anna");
```

`"Anna"` er startværdien for vores state.

`useState()` giver os to værdier:

- `name` – den nuværende værdi
- `setName` – en funktion, der kan ændre værdien

Vi kan tænke på det nogenlunde sådan:

```js
const result = useState("Anna");

const name = result[0];
const setName = result[1];
```

Med array destructuring kan vi i stedet skrive:

```jsx
const [name, setName] = useState("Anna");
```

Det er derfor, syntaxen med `[]` ofte dukker op, når vi arbejder med state i React.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret et array:

```js
const courses = ["JavaScript", "React", "WordPress"];
```

Brug destructuring til at hente de første to værdier:

```js
const [firstCourse, secondCourse] = courses;
```

Print begge variabler i browserens console.

#### Ekstra

Opret et array med fire farver:

```js
const colors = ["red", "green", "blue", "yellow"];
```

Brug destructuring til kun at hente den første og tredje farve.

Print begge værdier i browserens console.

### React

Opret `NameChanger.jsx` i `sandbox`.

Importér `useState`:

```jsx
import { useState } from "react";
```

Opret state med array destructuring:

```jsx
const [name, setName] = useState("Anna");
```

Vis `name` i JSX:

```jsx
<p>{name}</p>
```

Tilføj en button, der ændrer værdien til `"Peter"`:

```jsx
<button onClick={() => setName("Peter")}>Change name</button>
```

Exportér komponenten og vis den i `App.jsx`.

Kontrollér, at navnet ændres fra `Anna` til `Peter`, når du klikker på knappen.

---

# 16 · Ekstra: Spread syntax med arrays

## Hvad er det?

Spread syntax `...` **pakker værdierne fra et array ud**, så de fx kan bruges i et nyt array.

```js
const students = ["Anna", "Peter"];

const copy = [...students];

console.log(copy);
// ["Anna", "Peter"]
```

`copy` indeholder de samme værdier som `students`, men er et nyt array.

Tænk på spread som: **pak værdierne ud**.

## Hvorfor bruger vi det?

Spread syntax er nyttig, når vi vil oprette et nyt array ud fra et eksisterende array.

Vi kan fx tilføje en værdi:

```js
const students = ["Anna", "Peter"];

const newStudents = [...students, "Sara"];

console.log(newStudents);
// ["Anna", "Peter", "Sara"]
```

Det oprindelige `students` array bliver ikke ændret.

## Hvordan bruges det?

Vi skriver `...` foran det array, vi vil pakke værdier ud fra:

```js
const colors = ["red", "green"];

const newColors = [...colors, "blue"];
```

Vi kan også tilføje en værdi i starten:

```js
const newColors = ["yellow", ...colors];
```

Eller samle flere arrays:

```js
const frontend = ["HTML", "CSS"];
const programming = ["JavaScript", "React"];

const courses = [...frontend, ...programming];

console.log(courses);
```

Resultatet bliver:

```js
["HTML", "CSS", "JavaScript", "React"];
```

## I React

Spread syntax bruges ofte, når vi arbejder med arrays i state.

```jsx
const [students, setStudents] = useState(["Anna", "Peter"]);
```

Hvis vi vil tilføje `"Sara"`, kan vi oprette et nyt array:

```jsx
setStudents([...students, "Sara"]);
```

Det eksisterende array bliver ikke ændret. I stedet får React et nyt array med de eksisterende værdier plus `"Sara"`.

Det mønster arbejder vi videre med under immutable opdatering af arrays.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret et array:

```js
const courses = ["JavaScript", "React"];
```

Brug spread syntax til at oprette et nyt array `moreCourses`, som også indeholder `"WordPress"`.

Print både `courses` og `moreCourses` i browserens console.

### React

Opret `StudentList.jsx` i `sandbox`.

Opret state med to navne:

```jsx
const [students, setStudents] = useState(["Anna", "Peter"]);
```

Lav en button, der tilføjer `"Sara"` med spread syntax:

```jsx
<button onClick={() => setStudents([...students, "Sara"])}>Add student</button>
```

Vis `students` i komponenten med den `map()`-syntax, du tidligere har mødt.

Kontrollér, at `"Sara"` bliver tilføjet, når du klikker på knappen.

---

# 17 · Ekstra: Rest syntax / Rest parameters

## Hvad er det?

Rest syntax `...` **samler flere værdier** i fx et nyt array.

Spread og rest bruger den samme `...` syntax, men gør næsten det modsatte:

- **Spread** → pakker værdier **ud**
- **Rest** → samler værdier **ind**

Du har lige set `...` som spread:

```js
const students = ["Anna", "Peter"];

const newStudents = [...students, "Sara"];
```

Her **pakker spread værdierne ud** i det nye array.

Med rest gør vi det modsatte og **samler de resterende værdier ind**:

```js
const students = ["Anna", "Peter", "Sara"];

const [firstStudent, ...otherStudents] = students;

console.log(firstStudent);
// Anna

console.log(otherStudents);
// ["Peter", "Sara"]
```

Samme `...` syntax bruges altså til to forskellige ting afhængigt af, hvor den står: **spread pakker ud, rest samler ind**.

## Hvorfor bruger vi det?

Rest er nyttigt, når vi vil arbejde med én eller flere værdier separat og samle resten.

```js
const courses = ["JavaScript", "React", "WordPress", "UX"];

const [firstCourse, ...otherCourses] = courses;

console.log(firstCourse);
// JavaScript

console.log(otherCourses);
// ["React", "WordPress", "UX"]
```

## Hvordan bruges det?

Rest kan bruges sammen med destructuring:

```js
const colors = ["red", "green", "blue"];

const [firstColor, ...otherColors] = colors;
```

Rest bruges også i funktioner som **rest parameters**:

```js
function showStudents(...students) {
  console.log(students);
}

showStudents("Anna", "Peter", "Sara");
```

Resultatet er et array:

```js
["Anna", "Peter", "Sara"];
```

Det betyder, at funktionen kan modtage et vilkårligt antal argumenter.

## I React

Rest syntax kan fx bruges, når vi destructurer props:

```jsx
function Student({ name, ...otherProps }) {
  console.log(name);
  console.log(otherProps);

  return <h2>{name}</h2>;
}
```

Hvis komponenten bruges sådan:

```jsx
<Student name="Anna" education="Multimedia Design" email="anna@example.com" />
```

bliver `name` hentet ud separat, mens de resterende props bliver samlet i `otherProps`.

Du behøver ikke bruge dette mønster ofte endnu, men du vil møde det i React-kode.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret et array:

```js
const courses = ["JavaScript", "React", "WordPress", "UX"];
```

Brug destructuring og rest syntax til at gemme det første kursus i `firstCourse` og resten i `otherCourses`.

Print begge værdier i browserens console.

### React

Opret `Student.jsx` i `sandbox`.

Lad komponenten modtage:

```jsx
<Student name="Anna" education="Multimedia Design" email="anna@example.com" />
```

Brug rest syntax til at hente `name` separat og samle de resterende props:

```jsx
function Student({ name, ...otherProps }) {
  // ...
}
```

Vis `name` i JSX og print `otherProps` i browserens console.

---

# 18 · Ekstra: Immutable opdatering af arrays

## Hvad er det?

En immutable opdatering betyder, at vi ikke ændrer det eksisterende array direkte.

I stedet opretter vi et nyt array med de ændringer, vi ønsker.

Direkte ændring:

```js
const students = ["Anna", "Peter"];

students.push("Sara");
```

`push()` ændrer det eksisterende array.

En immutable opdatering kan i stedet laves med spread:

```js
const students = ["Anna", "Peter"];

const updatedStudents = [...students, "Sara"];
```

Nu er `students` uændret, og `updatedStudents` er et nyt array.

## Hvorfor bruger vi det?

Immutable opdateringer er især vigtige, når vi arbejder med state i React.

Vi vil bevare den eksisterende værdi og oprette en ny:

```js
const students = ["Anna", "Peter"];

const updatedStudents = [...students, "Sara"];

console.log(students);
// ["Anna", "Peter"]

console.log(updatedStudents);
// ["Anna", "Peter", "Sara"]
```

## Hvordan bruges det?

Med spread syntax kan vi fx tilføje et element til slutningen:

```js
const colors = ["red", "green"];

const updatedColors = [...colors, "blue"];
```

Eller til starten:

```js
const updatedColors = ["blue", ...colors];
```

I begge tilfælde opretter vi et **nyt array** i stedet for at ændre det eksisterende.

Senere ser vi, hvordan `map()` og `filter()` kan bruges til andre typer immutable opdateringer.

## I React

Forestil dig, at vi har et array i state:

```jsx
const [students, setStudents] = useState(["Anna", "Peter"]);
```

Vi bør ikke ændre state direkte:

```jsx
students.push("Sara");
```

I stedet opretter vi et nyt array:

```jsx
setStudents([...students, "Sara"]);
```

Det nye array indeholder de eksisterende studerende plus `"Sara"`.

Det samme princip gælder for objects: **Vi ændrer ikke state direkte — vi opretter en ny værdi.**

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret et array:

```js
const courses = ["JavaScript", "React"];
```

Opret et nyt array `updatedCourses`, hvor `"WordPress"` bliver tilføjet uden at ændre `courses`.

Print begge arrays:

```js
console.log(courses);
console.log(updatedCourses);
```

Kontrollér, at det oprindelige array stadig kun indeholder `"JavaScript"` og `"React"`.

### React

Opret `CourseList.jsx` i `sandbox`.

Opret state:

```jsx
const [courses, setCourses] = useState(["JavaScript", "React"]);
```

Lav en button, der tilføjer `"WordPress"` med en immutable opdatering:

```jsx
<button onClick={() => setCourses([...courses, "WordPress"])}>Add course</button>
```

Vis kurserne med `map()`.

Kontrollér, at `"WordPress"` bliver tilføjet til listen, når du klikker på knappen.

---

# 19 · `map()`

## Hvad er det?

`map()` er en array method, der går igennem hvert element i et array og returnerer et **nyt array**.

```js
const numbers = [1, 2, 3];

const doubledNumbers = numbers.map((number) => number * 2);

console.log(doubledNumbers);
// [2, 4, 6]
```

`map()` ændrer ikke det oprindelige array.

## Hvorfor bruger vi det?

Vi bruger `map()`, når vi vil gøre noget med **hvert element** i et array og få et nyt array tilbage.

Fx kan vi hente navnene fra et array med student objects:

```js
const students = [
  {
    id: 1,
    name: "Anna",
    education: "Multimedia Design"
  },
  {
    id: 2,
    name: "Peter",
    education: "Web Development"
  },
  {
    id: 3,
    name: "Sara",
    education: "Multimedia Design"
  }
];

const names = students.map((student) => student.name);

console.log(names);
// ["Anna", "Peter", "Sara"]
```

Tænk på `map()` som:

**Hvad skal hvert element blive til?**

## Hvordan bruges det?

`map()` modtager en callback function:

```js
students.map((student) => {
  // gør noget med student
});
```

Callback-funktionen bliver kørt én gang for hvert element i arrayet.

Her:

```js
const names = students.map((student) => student.name);
```

sker der i princippet dette:

```text
Anna   → "Anna"
Peter  → "Peter"
Sara   → "Sara"
```

Resultaterne bliver samlet i et nyt array:

```js
["Anna", "Peter", "Sara"];
```

Vi kan også returnere noget helt andet:

```js
const messages = students.map((student) => `Hello, ${student.name}!`);

console.log(messages);
```

Resultatet bliver:

```js
["Hello, Anna!", "Hello, Peter!", "Hello, Sara!"];
```

Det vigtige er, at callback-funktionen **returnerer den nye værdi** for hvert element.

## I React

I React bruger vi ofte `map()` til at vise et array som en liste af JSX-elementer.

```jsx
const students = [
  {
    id: 1,
    name: "Anna",
    education: "Multimedia Design"
  },
  {
    id: 2,
    name: "Peter",
    education: "Web Development"
  },
  {
    id: 3,
    name: "Sara",
    education: "Multimedia Design"
  }
];
```

Vi kan bruge `map()` til at lave hvert student object om til JSX:

```jsx
function StudentList() {
  return (
    <section>
      {students.map((student) => (
        <article key={student.id}>
          <h2>{student.name}</h2>
          <p>{student.education}</p>
        </article>
      ))}
    </section>
  );
}
```

Her kan vi tænke:

```text
student object → JSX
student object → JSX
student object → JSX
```

`map()` returnerer altså en liste af JSX-elementer, som React kan vise.

### `key`

Når vi bruger `map()` til at vise en liste i React, skal hvert element have en unik `key`:

```jsx
<article key={student.id}>
```

Vi bruger typisk et unikt `id` fra vores data.

`key` hjælper React med at holde styr på elementerne i listen.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret et array:

```js
const products = [
  {
    id: 1,
    name: "Keyboard",
    price: 799
  },
  {
    id: 2,
    name: "Mouse",
    price: 399
  },
  {
    id: 3,
    name: "Monitor",
    price: 1999
  }
];
```

Brug `map()` til at oprette et nyt array, der kun indeholder produktnavnene.

Resultatet skal være:

```js
["Keyboard", "Mouse", "Monitor"];
```

Print det nye array i browserens console.

#### Ekstra

Brug det samme `products` array.

Opret et nyt array med tekster på formen:

```text
Keyboard costs 799 kr.
Mouse costs 399 kr.
Monitor costs 1999 kr.
```

Brug `map()` og template literals til at oprette teksterne.

### React

Opret `ProductList.jsx` i `sandbox`.

Brug dette array:

```jsx
const products = [
  {
    id: 1,
    name: "Keyboard",
    price: 799
  },
  {
    id: 2,
    name: "Mouse",
    price: 399
  },
  {
    id: 3,
    name: "Monitor",
    price: 1999
  }
];
```

Brug `map()` til at vise alle produkter:

```jsx
{
  products.map((product) => (
    <article key={product.id}>
      <h2>{product.name}</h2>
      <p>{product.price} kr.</p>
    </article>
  ));
}
```

Exportér `ProductList` og vis komponenten i `App.jsx`.

Tilføj derefter et nyt produkt til `products` og kontrollér, at det automatisk bliver vist.

#### Ekstra

Opret en separat `Product.jsx` component.

Lad `ProductList` bruge `map()` til at vise en `Product` component for hvert produkt:

```jsx
{
  products.map((product) => <Product key={product.id} name={product.name} price={product.price} />);
}
```

Lad `Product` modtage `name` og `price` som props og vise dem i JSX.

---

# 20 · `filter()`

## Hvad er det?

`filter()` er en array method, der bruges til at vælge bestemte elementer fra et array.

```js
const numbers = [1, 2, 3, 4, 5];

const largeNumbers = numbers.filter((number) => number > 3);

console.log(largeNumbers);
// [4, 5]
```

`filter()` returnerer et **nyt array** og ændrer ikke det oprindelige array.

## Hvorfor bruger vi det?

Vi bruger `filter()`, når kun nogle af elementerne i et array skal med.

Fx kan vi finde alle studerende på en bestemt uddannelse:

```js
const students = [
  {
    id: 1,
    name: "Anna",
    education: "Multimedia Design"
  },
  {
    id: 2,
    name: "Peter",
    education: "Web Development"
  },
  {
    id: 3,
    name: "Sara",
    education: "Multimedia Design"
  }
];

const multimediaStudents = students.filter((student) => student.education === "Multimedia Design");

console.log(multimediaStudents);
```

Det nye array indeholder kun Anna og Sara.

Tænk på `filter()` som:

**Hvilke elementer skal med?**

## Hvordan bruges det?

`filter()` modtager en callback function:

```js
students.filter((student) => {
  // returnér true eller false
});
```

For hvert element skal resultatet være `true` eller `false`.

```js
const multimediaStudents = students.filter((student) => student.education === "Multimedia Design");
```

Vi kan tænke på det sådan:

```text
Anna  → Multimedia Design → true  → med
Peter → Web Development   → false → ikke med
Sara  → Multimedia Design → true  → med
```

Resultatet bliver et nyt array med de elementer, hvor betingelsen var `true`.

Vi kan også filtrere tal:

```js
const prices = [299, 799, 1299, 399];

const cheapPrices = prices.filter((price) => price < 500);

console.log(cheapPrices);
// [299, 399]
```

## I React

I React bruger vi ofte `filter()` til at bestemme, hvilke data der skal vises.

```jsx
const products = [
  {
    id: 1,
    name: "Keyboard",
    price: 799
  },
  {
    id: 2,
    name: "Mouse",
    price: 399
  },
  {
    id: 3,
    name: "Monitor",
    price: 1999
  }
];
```

Vi kan fx kun vise produkter, der koster under 1000 kr.:

```jsx
const cheapProducts = products.filter((product) => product.price < 1000);
```

Derefter kan vi bruge `map()` til at vise resultatet:

```jsx
{
  cheapProducts.map((product) => (
    <article key={product.id}>
      <h2>{product.name}</h2>
      <p>{product.price} kr.</p>
    </article>
  ));
}
```

Her har metoderne to forskellige opgaver:

```text
filter() → vælger hvilke produkter der skal med
map()    → laver produkterne om til JSX
```

Det er meget almindeligt at kombinere `filter()` og `map()` i React.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret et array:

```js
const products = [
  {
    id: 1,
    name: "Keyboard",
    price: 799
  },
  {
    id: 2,
    name: "Mouse",
    price: 399
  },
  {
    id: 3,
    name: "Monitor",
    price: 1999
  },
  {
    id: 4,
    name: "Headphones",
    price: 599
  }
];
```

Brug `filter()` til at oprette et nyt array med produkter, der koster mindre end `800`.

Print resultatet i browserens console.

Hvilke produkter forventer du at få tilbage?

#### Ekstra

Brug det samme array og opret:

```js
const expensiveProducts = // ...
```

`expensiveProducts` skal kun indeholde produkter, der koster `800` eller mere.

Print både `products` og `expensiveProducts`.

Kontrollér, at det oprindelige `products` array ikke er blevet ændret.

### React

Opret `FilteredProducts.jsx` i `sandbox`.

Brug det samme `products` array.

Filtrér først produkterne:

```jsx
const cheapProducts = products.filter((product) => product.price < 800);
```

Brug derefter `map()` til at vise `cheapProducts`:

```jsx
{
  cheapProducts.map((product) => (
    <article key={product.id}>
      <h2>{product.name}</h2>
      <p>{product.price} kr.</p>
    </article>
  ));
}
```

Exportér komponenten og vis den i `App.jsx`.

Ændr værdien `800` og se, hvordan listen ændrer sig.

#### Ekstra

Opret en variabel:

```jsx
const maxPrice = 1000;
```

Brug `maxPrice` i dit filter i stedet for at skrive prisen direkte:

```jsx
const filteredProducts = products.filter((product) => product.price <= maxPrice);
```

Prøv forskellige værdier for `maxPrice` og se, hvilke produkter der bliver vist.

---

# 21 · `find()`

## Hvad er det?

`find()` er en array method, der bruges til at finde **ét element** i et array.

```js
const numbers = [10, 20, 30, 40];

const number = numbers.find((number) => number > 20);

console.log(number);
// 30
```

`find()` returnerer det **første element**, der matcher betingelsen.

Tænk på `find()` som:

**Hvilket enkelt element leder jeg efter?**

## Hvorfor bruger vi det?

Vi bruger `find()`, når vi skal finde ét bestemt element i et array.

Det er især nyttigt med arrays af objects:

```js
const students = [
  {
    id: 1,
    name: "Anna",
    education: "Multimedia Design"
  },
  {
    id: 2,
    name: "Peter",
    education: "Web Development"
  },
  {
    id: 3,
    name: "Sara",
    education: "Multimedia Design"
  }
];

const student = students.find((student) => student.id === 2);

console.log(student);
```

Resultatet er hele Peter-objectet:

```js
{
  id: 2,
  name: "Peter",
  education: "Web Development"
}
```

## Hvordan bruges det?

`find()` modtager en callback function med en betingelse:

```js
students.find((student) => student.id === 2);
```

Vi kan tænke på det sådan:

```text
Anna  → id === 2 → false
Peter → id === 2 → true  → fundet!
```

Når `find()` finder det første match, returneres elementet.

Det er en vigtig forskel fra `filter()`:

```js
const result = students.filter((student) => student.education === "Multimedia Design");
```

`filter()` returnerer et **array**:

```js
[
  { id: 1, name: "Anna", education: "Multimedia Design" },
  { id: 3, name: "Sara", education: "Multimedia Design" }
];
```

Men:

```js
const result = students.find((student) => student.education === "Multimedia Design");
```

`find()` returnerer kun det **første match**:

```js
{
  id: 1,
  name: "Anna",
  education: "Multimedia Design"
}
```

Hvis `find()` ikke finder noget, får vi:

```js
undefined;
```

Fx:

```js
const student = students.find((student) => student.id === 10);

console.log(student);
// undefined
```

## I React

I React bruger vi ofte `find()` til at finde et bestemt object ud fra et `id`.

Forestil dig, at vi har produkter:

```jsx
const products = [
  {
    id: 1,
    name: "Keyboard",
    price: 799
  },
  {
    id: 2,
    name: "Mouse",
    price: 399
  },
  {
    id: 3,
    name: "Monitor",
    price: 1999
  }
];
```

Hvis vi kender produktets `id`, kan vi finde produktet:

```jsx
const productId = 2;

const product = products.find((product) => product.id === productId);
```

Nu indeholder `product`:

```js
{
  id: 2,
  name: "Mouse",
  price: 399
}
```

Vi kan derefter vise produktet i JSX:

```jsx
function ProductDetails() {
  const productId = 2;

  const product = products.find((product) => product.id === productId);

  return (
    <article>
      <h2>{product.name}</h2>
      <p>{product.price} kr.</p>
    </article>
  );
}
```

Det mønster er meget almindeligt på fx en detail-side, hvor vi skal finde ét bestemt produkt ud fra dets `id`.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret et array:

```js
const products = [
  {
    id: 1,
    name: "Keyboard",
    price: 799
  },
  {
    id: 2,
    name: "Mouse",
    price: 399
  },
  {
    id: 3,
    name: "Monitor",
    price: 1999
  }
];
```

Brug `find()` til at finde produktet med `id` `2`.

Gem resultatet:

```js
const product = // ...
```

Print `product` i browserens console.

Print derefter produktets navn:

```js
console.log(product.name);
```

#### Ekstra

Prøv at finde produktet med:

```js
id === 10;
```

Print resultatet i browserens console.

Hvilken værdi får du, når der ikke findes et match?

### React

Opret `ProductDetails.jsx` i `sandbox`.

Brug det samme `products` array.

Opret:

```jsx
const productId = 2;
```

Brug `find()` til at finde produktet:

```jsx
const product = products.find((product) => product.id === productId);
```

Vis produktets navn og pris i JSX:

```jsx
<article>
  <h2>{product.name}</h2>
  <p>{product.price} kr.</p>
</article>
```

Exportér `ProductDetails` og vis komponenten i `App.jsx`.

Prøv derefter at ændre:

```jsx
const productId = 2;
```

til:

```jsx
const productId = 3;
```

Kontrollér, at et andet produkt bliver vist.

#### Ekstra

Lad `ProductDetails` modtage `productId` som prop:

```jsx
function ProductDetails({ productId }) {
  // ...
}
```

Brug komponenten fra `App.jsx`:

```jsx
<ProductDetails productId={2} />
```

Prøv derefter med forskellige `id`-værdier.

---

# 22 · Ekstra: `forEach()`

## Hvad er det?

`forEach()` er en array method, der kører en funktion én gang for hvert element i et array.

```js
const students = ["Anna", "Peter", "Sara"];

students.forEach((student) => {
  console.log(student);
});
```

Resultatet bliver:

```text
Anna
Peter
Sara
```

## Hvorfor bruger vi det?

`forEach()` er nyttig, når vi vil **gøre noget for hvert element** i et array uden at oprette et nyt array.

Fx:

```js
const products = [
  { id: 1, name: "Keyboard", price: 799 },
  { id: 2, name: "Mouse", price: 399 }
];

products.forEach((product) => {
  console.log(`${product.name}: ${product.price} kr.`);
});
```

En vigtig forskel fra `map()` er:

```text
map()     → returnerer et nyt array
forEach() → returnerer ikke et nyt array
```

## Hvordan bruges det?

`forEach()` modtager en callback function:

```js
students.forEach((student) => {
  console.log(student);
});
```

Callback-funktionen bliver kørt én gang for hvert element.

Brug derfor typisk `forEach()`, når du vil **udføre en handling**, og `map()`, når hvert element skal **blive til noget nyt**.

## I React

I React bruger vi normalt `map()` – ikke `forEach()` – når vi vil vise en liste:

```jsx
{
  students.map((student) => <p key={student.id}>{student.name}</p>);
}
```

`map()` passer til JSX, fordi den returnerer et nyt array med de JSX-elementer, React skal vise.

`forEach()` vil du stadig møde i almindelig JavaScript-kode, hvor noget skal gøres for hvert element.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret:

```js
const courses = ["JavaScript", "React", "WordPress"];
```

Brug `forEach()` til at printe hvert kursus i browserens console.

### React

Opret et array med student objects.

Prøv først at bruge `forEach()` på arrayet og print hvert navn i browserens console.

Brug derefter `map()` til at vise de samme studerende i JSX.

Sammenlign de to metoder:

**Hvorfor bruger vi `map()` til JSX i stedet for `forEach()`?**

---

# 23 · Ekstra: `some()` og `every()`

## Hvad er det?

`some()` og `every()` bruges til at undersøge elementerne i et array.

`some()` undersøger, om **mindst ét element** matcher en betingelse:

```js
const prices = [299, 799, 1299];

const hasExpensiveProduct = prices.some((price) => price > 1000);

console.log(hasExpensiveProduct);
// true
```

`every()` undersøger, om **alle elementer** matcher:

```js
const prices = [299, 799, 1299];

const allUnder2000 = prices.every((price) => price < 2000);

console.log(allUnder2000);
// true
```

Begge methods returnerer enten `true` eller `false`.

## Hvorfor bruger vi det?

Vi bruger dem, når vi skal svare på spørgsmål om et array:

```text
some()  → Er der mindst én?
every() → Gælder det for alle?
```

Fx:

```js
const students = [
  { name: "Anna", active: true },
  { name: "Peter", active: false },
  { name: "Sara", active: true }
];

const hasActiveStudents = students.some((student) => student.active);

const allStudentsActive = students.every((student) => student.active);
```

## Hvordan bruges det?

Begge methods modtager en callback med en betingelse:

```js
students.some((student) => student.active);
```

```js
students.every((student) => student.active);
```

Resultatet er altid en boolean:

```js
true;
```

eller:

```js
false;
```

## I React

Resultatet kan fx bruges til conditional rendering:

```jsx
const hasAvailableProducts = products.some((product) => product.inStock);
```

Derefter kan værdien bruges i JSX:

```jsx
{
  hasAvailableProducts && <p>Some products are available</p>;
}
```

`some()` og `every()` er derfor nyttige, når UI'et afhænger af data i et array.

## Prøv selv

### JavaScript

Opret:

```js
const products = [
  { name: "Keyboard", inStock: true },
  { name: "Mouse", inStock: false },
  { name: "Monitor", inStock: true }
];
```

Brug `some()` til at undersøge, om mindst ét produkt er på lager.

Brug derefter `every()` til at undersøge, om alle produkter er på lager.

Print begge resultater.

### React

Brug det samme `products` array.

Brug `some()` til at oprette:

```jsx
const hasAvailableProducts = // ...
```

Vis kun denne tekst, hvis mindst ét produkt er på lager:

```jsx
<p>Products are available</p>
```

---

# 24 · Ekstra: `includes()`

## Hvad er det?

`includes()` bruges til at undersøge, om et array indeholder en bestemt værdi.

```js
const courses = ["JavaScript", "React", "WordPress"];

console.log(courses.includes("React"));
// true

console.log(courses.includes("Python"));
// false
```

`includes()` returnerer enten `true` eller `false`.

## Hvorfor bruger vi det?

Vi bruger `includes()`, når vi vil spørge:

**Findes denne værdi i arrayet?**

```js
const roles = ["student", "teacher", "admin"];

const isAdmin = roles.includes("admin");

console.log(isAdmin);
// true
```

Det er en enkel måde at kontrollere, om en bestemt værdi findes.

## Hvordan bruges det?

Vi kalder `includes()` på arrayet og sender den værdi med, vi leder efter:

```js
const skills = ["HTML", "CSS", "JavaScript"];

skills.includes("JavaScript");
// true
```

`includes()` leder efter selve værdien.

Hvis du arbejder med objects og skal undersøge en property, vil methods som `some()` eller `find()` ofte være mere relevante.

## I React

`includes()` kan fx bruges til at kontrollere valgte værdier:

```jsx
const selectedCategories = ["JavaScript", "React"];

const isReactSelected = selectedCategories.includes("React");
```

Resultatet kan bruges i JSX:

```jsx
{
  isReactSelected && <p>React is selected</p>;
}
```

## Prøv selv

### JavaScript

Opret:

```js
const technologies = ["HTML", "CSS", "JavaScript", "React"];
```

Brug `includes()` til at undersøge:

- om `"React"` findes
- om `"Vue"` findes

Print begge resultater i browserens console.

### React

Opret et array:

```jsx
const selectedSkills = ["JavaScript", "React"];
```

Brug `includes()` til at undersøge, om `"React"` er valgt.

Hvis den er valgt, skal du vise:

```jsx
<p>React is selected</p>
```

---

# 25 · Ekstra: `reduce()`

## Hvad er det?

`reduce()` bruges til at samle værdierne fra et array til **én samlet værdi**.

Fx kan vi lægge tal sammen:

```js
const prices = [100, 200, 300];

const total = prices.reduce((sum, price) => sum + price, 0);

console.log(total);
// 600
```

Tænk på `reduce()` som:

**Hvordan samler jeg arrayet til én værdi?**

## Hvorfor bruger vi det?

`reduce()` er nyttig til fx at beregne:

- en samlet pris
- et samlet antal
- en gennemsnitsværdi
- andre værdier baseret på hele arrayet

Fx:

```js
const products = [
  { name: "Keyboard", price: 799 },
  { name: "Mouse", price: 399 },
  { name: "Monitor", price: 1999 }
];

const totalPrice = products.reduce((total, product) => total + product.price, 0);

console.log(totalPrice);
// 3197
```

## Hvordan bruges det?

`reduce()` ser lidt anderledes ud end de andre array methods:

```js
products.reduce((total, product) => total + product.price, 0);
```

Her er:

```js
total;
```

den værdi, vi løbende samler resultatet i.

```js
product;
```

er det aktuelle element i arrayet.

Og:

```js
0;
```

er startværdien for `total`.

Vi kan tænke på eksemplet sådan:

```text
0
+ 799
+ 399
+ 1999
= 3197
```

## I React

`reduce()` kan fx bruges til at beregne en samlet pris, som skal vises i UI'et:

```jsx
const totalPrice = products.reduce((total, product) => total + product.price, 0);
```

Derefter kan resultatet vises:

```jsx
<p>Total: {totalPrice} kr.</p>
```

`reduce()` er mere avanceret end `map()`, `filter()` og `find()`, så du behøver ikke bruge den, hvis en enklere array method løser problemet.

## Prøv selv

### JavaScript

Opret:

```js
const cart = [
  { name: "Keyboard", price: 799 },
  { name: "Mouse", price: 399 },
  { name: "Headphones", price: 599 }
];
```

Brug `reduce()` til at beregne den samlede pris.

Print resultatet i browserens console.

### React

Brug det samme `cart` array.

Beregn den samlede pris med `reduce()`:

```jsx
const totalPrice = // ...
```

Vis derefter resultatet i JSX:

```jsx
<p>Total: {totalPrice} kr.</p>
```

---

# 26 · Template literals

## Hvad er det?

Template literals er en måde at skrive strings på med backticks `` ` `` i stedet for almindelige citationstegn.

```js
const name = "Anna";

const message = `Hello, ${name}!`;

console.log(message);
// Hello, Anna!
```

Med `${...}` kan vi indsætte værdier direkte i en string.

## Hvorfor bruger vi det?

Template literals gør det lettere at kombinere tekst og værdier.

Uden template literals:

```js
const name = "Anna";
const age = 24;

const message = "Anna is " + age + " years old";
```

Med template literals:

```js
const message = `${name} is ${age} years old`;
```

Det gør koden kortere og lettere at læse.

## Hvordan bruges det?

Template literals skrives med backticks:

```js
const course = "JavaScript";

const message = `Welcome to ${course}!`;
```

Vi kan indsætte flere værdier:

```js
const product = "Keyboard";
const price = 799;

const message = `${product} costs ${price} kr.`;
```

Vi kan også bruge udtryk direkte i `${...}`:

```js
const price = 100;
const quantity = 3;

const message = `Total: ${price * quantity} kr.`;

console.log(message);
// Total: 300 kr.
```

Template literals kan også gå over flere linjer:

```js
const message = `Hello Anna,
Welcome to JavaScript.`;
```

## I React

I React bruger vi ofte template literals, når vi skal bygge tekst ud fra data.

```jsx
function Product({ name, price }) {
  const message = `${name} costs ${price} kr.`;

  return <p>{message}</p>;
}
```

De bruges også ofte til dynamiske værdier i attributes:

```jsx
function Profile({ id }) {
  const imageUrl = `/images/users/${id}.jpg`;

  return <img src={imageUrl} alt="Profile" />;
}
```

Du vil derfor ofte møde template literals, når strings skal indeholde værdier fra props, state eller data.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret variablerne:

```js
const name = "Anna";
const education = "Multimedia Design";
const semester = 3;
```

Brug en template literal til at oprette en tekst på formen:

```text
Anna studies Multimedia Design on semester 3.
```

Print teksten i browserens console.

#### Ekstra

Opret:

```js
const product = "Keyboard";
const price = 799;
const quantity = 2;
```

Brug en template literal til at vise både produktnavn, antal og samlet pris.

Resultatet skal fx være:

```text
2 x Keyboard costs 1598 kr.
```

### React

Opret `ProductMessage.jsx` i `sandbox`.

Lad komponenten modtage:

```jsx
<ProductMessage name="Keyboard" price={799} />
```

Brug en template literal til at oprette en tekst i komponenten:

```jsx
const message = `${name} costs ${price} kr.`;
```

Vis `message` i JSX.

#### Ekstra

Tilføj en prop `quantity`.

Beregn den samlede pris inde i template literal'en og vis fx:

```text
2 x Keyboard costs 1598 kr.
```

---

# 27 · `if` / `else`

## Hvad er det?

`if` / `else` bruges til at lade JavaScript træffe en beslutning baseret på en betingelse.

```js
const age = 20;

if (age >= 18) {
  console.log("You are an adult");
} else {
  console.log("You are under 18");
}
```

Hvis betingelsen er `true`, køres koden i `if`.

Hvis betingelsen er `false`, køres koden i `else`.

Tænk på det som:

**Hvis dette er sandt → gør dette. Ellers → gør noget andet.**

## Hvorfor bruger vi det?

Vi bruger `if` / `else`, når noget i vores kode skal afhænge af en betingelse.

```js
const isLoggedIn = true;

if (isLoggedIn) {
  console.log("Welcome!");
} else {
  console.log("Please log in");
}
```

Her afhænger resultatet af værdien i `isLoggedIn`.

Betingelser bruges hele tiden i applikationer:

```text
Er brugeren logget ind?
Er produktet på lager?
Er formularen udfyldt?
Er prisen under 500?
```

Resultatet af sådan en sammenligning er typisk en boolean:

```js
true;
```

eller:

```js
false;
```

## Hvordan bruges det?

En `if` starter med en betingelse:

```js
if (condition) {
  // kør denne kode
}
```

Fx:

```js
const price = 399;

if (price < 500) {
  console.log("Cheap product");
}
```

Vi kan tilføje `else`, hvis der skal ske noget andet, når betingelsen er `false`:

```js
const price = 799;

if (price < 500) {
  console.log("Cheap product");
} else {
  console.log("Expensive product");
}
```

Vi kan fx bruge comparison operators i vores betingelser:

```js
price < 500;
price > 500;
price <= 500;
price >= 500;
price === 500;
price !== 500;
```

Resultatet af sammenligningen er enten `true` eller `false`.

Vi kan også have flere muligheder med `else if`:

```js
const price = 799;

if (price < 500) {
  console.log("Cheap");
} else if (price < 1000) {
  console.log("Medium");
} else {
  console.log("Expensive");
}
```

JavaScript stopper ved den første betingelse, der er `true`.

## I React

I React kan vi bruge `if` / `else` til at bestemme, hvad en component skal returnere.

```jsx
function ProductStatus({ inStock }) {
  if (inStock) {
    return <p>In stock</p>;
  } else {
    return <p>Out of stock</p>;
  }
}
```

Komponenten kan bruges sådan:

```jsx
<ProductStatus inStock={true} />
```

eller:

```jsx
<ProductStatus inStock={false} />
```

Vi kan også skrive det uden `else`, fordi `return` afslutter funktionen:

```jsx
function ProductStatus({ inStock }) {
  if (inStock) {
    return <p>In stock</p>;
  }

  return <p>Out of stock</p>;
}
```

I React vil vi ofte have brug for conditionals **inde i JSX**.

Her kan vi ikke skrive en almindelig `if` direkte:

```jsx
return <main>// if kan ikke skrives direkte her</main>;
```

I stedet bruger vi ofte en **ternary operator** eller `&&`.

Det ser vi på i de næste koncepter.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret:

```js
const product = {
  name: "Keyboard",
  price: 799,
  inStock: true
};
```

Brug `if` / `else` til at undersøge `inStock`.

Hvis produktet er på lager, skal du printe:

```text
Keyboard is in stock
```

Ellers skal du printe:

```text
Keyboard is out of stock
```

Ændr `inStock` mellem `true` og `false` og kontrollér resultatet.

#### Ekstra

Brug `product.price` til at placere produktet i en priskategori:

```text
under 500   → Cheap
under 1000  → Medium
ellers      → Expensive
```

Brug:

```js
if
else if
else
```

Print resultatet i browserens console.

### React

Opret `ProductStatus.jsx` i `sandbox`.

Lad komponenten modtage:

```jsx
<ProductStatus name="Keyboard" inStock={true} />
```

Brug `if` / `else` til at vise enten:

```text
Keyboard is in stock
```

eller:

```text
Keyboard is out of stock
```

Exportér komponenten og vis den i `App.jsx`.

Prøv derefter:

```jsx
<ProductStatus name="Keyboard" inStock={false} />
```

og kontrollér, at teksten ændrer sig.

#### Ekstra

Tilføj en `price` prop:

```jsx
<ProductStatus name="Keyboard" price={799} inStock={true} />
```

Brug `if` / `else if` / `else` til at bestemme, om produktet er:

```text
Cheap
Medium
Expensive
```

Vis produktets navn, pris og priskategori i JSX.

---

# 28 · Ternary operator `? :`

## Hvad er det?

Ternary operator `? :` er en kort måde at vælge mellem **to værdier** baseret på en betingelse.

```js
const isLoggedIn = true;

const message = isLoggedIn ? "Welcome!" : "Please log in";

console.log(message);
// Welcome!
```

Vi kan læse den sådan:

```text
betingelse ? hvis true : hvis false
```

Altså:

**Er betingelsen sand? Brug denne værdi. Ellers brug den anden.**

## Hvorfor bruger vi det?

En ternary operator kan ofte bruges, når en simpel `if / else` skal vælge mellem to værdier.

Med `if / else`:

```js
const inStock = true;

let message;

if (inStock) {
  message = "In stock";
} else {
  message = "Out of stock";
}
```

Med en ternary operator:

```js
const message = inStock ? "In stock" : "Out of stock";
```

Begge eksempler træffer den samme beslutning.

Ternary operator er især nyttig i React, fordi den kan bruges **direkte inde i JSX**.

## Hvordan bruges det?

En ternary operator består af tre dele:

```js
condition ? valueIfTrue : valueIfFalse;
```

Fx:

```js
const age = 20;

const message = age >= 18 ? "Adult" : "Under 18";
```

Her er:

```js
age >= 18;
```

betingelsen.

```js
"Adult";
```

værdien, hvis betingelsen er `true`.

Og:

```js
"Under 18";
```

værdien, hvis betingelsen er `false`.

Vi kan også bruge properties fra objects:

```js
const product = {
  name: "Keyboard",
  inStock: true
};

const status = product.inStock ? "In stock" : "Out of stock";

console.log(status);
```

En ternary operator er bedst til **enkle valg mellem to værdier**.

Hvis logikken bliver stor eller svær at læse, er `if / else` ofte tydeligere.

## I React

Ternary operators er meget almindelige i React, fordi de kan bruges direkte i JSX.

```jsx
function ProductStatus({ inStock }) {
  return <p>{inStock ? "In stock" : "Out of stock"}</p>;
}
```

Her bestemmer `inStock`, hvilken tekst React viser.

Vi kan også vælge mellem forskellige JSX-elementer:

```jsx
function UserStatus({ isLoggedIn }) {
  return <section>{isLoggedIn ? <p>Welcome back!</p> : <p>Please log in</p>}</section>;
}
```

Hvis:

```js
isLoggedIn === true;
```

vises:

```text
Welcome back!
```

Ellers vises:

```text
Please log in
```

Det kaldes **conditional rendering**, fordi vi bestemmer, hvad React skal vise ud fra en betingelse.

### Fra `if / else` til ternary

Det forrige eksempel kunne også være skrevet med `if / else`:

```jsx
function UserStatus({ isLoggedIn }) {
  if (isLoggedIn) {
    return <p>Welcome back!</p>;
  }

  return <p>Please log in</p>;
}
```

Men hvis beslutningen skal være **inde i vores JSX**, er ternary operator ofte praktisk:

```jsx
{
  isLoggedIn ? <p>Welcome back!</p> : <p>Please log in</p>;
}
```

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret:

```js
const product = {
  name: "Keyboard",
  price: 799,
  inStock: true
};
```

Brug en ternary operator til at oprette:

```js
const status = // ...
```

`status` skal være:

```text
In stock
```

hvis `product.inStock` er `true`.

Ellers skal den være:

```text
Out of stock
```

Print resultatet i browserens console.

Ændr derefter `inStock` til `false` og kontrollér resultatet.

#### Ekstra

Brug `product.price` og en ternary operator til at oprette:

```js
const priceCategory = // ...
```

Hvis produktet koster mindre end `1000`, skal værdien være:

```text
Cheap
```

Ellers:

```text
Expensive
```

Print resultatet i browserens console.

### React

Opret `ProductStatus.jsx` i `sandbox`.

Lad komponenten modtage:

```jsx
<ProductStatus name="Keyboard" inStock={true} />
```

Vis produktets navn:

```jsx
<h2>{name}</h2>
```

Brug derefter en ternary operator direkte i JSX til at vise enten:

```text
In stock
```

eller:

```text
Out of stock
```

Fx:

```jsx
<p>{inStock ? "In stock" : "Out of stock"}</p>
```

Exportér komponenten og vis den i `App.jsx`.

Prøv komponenten med både:

```jsx
<ProductStatus name="Keyboard" inStock={true} />
```

og:

```jsx
<ProductStatus name="Mouse" inStock={false} />
```

#### Ekstra

Tilføj en `price` prop:

```jsx
<ProductStatus name="Keyboard" price={799} inStock={true} />
```

Brug en ternary operator til også at vise:

```text
Cheap
```

hvis prisen er under `1000`, og ellers:

```text
Expensive
```

---

# 29 · Logical AND `&&`

## Hvad er det?

Logical AND `&&` er en logical operator.

Den bruges til at undersøge, om **begge sider er truthy**:

```js
const isLoggedIn = true;
const isAdmin = true;

console.log(isLoggedIn && isAdmin);
// true
```

Hvis én af værdierne er `false`, bliver resultatet `false`:

```js
const isLoggedIn = true;
const isAdmin = false;

console.log(isLoggedIn && isAdmin);
// false
```

Vi kan tænke på `&&` som:

**Dette OG dette skal være sandt.**

## Hvorfor bruger vi det?

`&&` er nyttig, når noget kun skal ske, hvis en betingelse er opfyldt.

```js
const inStock = true;

inStock && console.log("Product is available");
```

Hvis `inStock` er `true`, bliver teksten printet.

Hvis:

```js
const inStock = false;
```

bliver `console.log()` ikke kørt.

Det er især nyttigt i React, når vi kun vil vise noget under bestemte betingelser.

## Hvordan bruges det?

Vi kan bruge `&&` mellem flere betingelser:

```js
const age = 20;
const hasTicket = true;

if (age >= 18 && hasTicket) {
  console.log("Welcome!");
}
```

Her skal begge betingelser være `true`:

```text
age >= 18  → true
hasTicket  → true
```

Derfor bliver koden i `if` kørt.

Hvis én af dem er `false`, bliver den ikke kørt.

Vi kan også bruge `&&` til kun at udføre noget, hvis en værdi er truthy:

```js
const inStock = true;

inStock && console.log("In stock");
```

Det mønster møder vi ofte i React.

## I React

I React bruges `&&` ofte til **conditional rendering**.

Forestil dig, at vi kun vil vise en besked, hvis et produkt er på lager:

```jsx
function Product({ name, inStock }) {
  return (
    <article>
      <h2>{name}</h2>

      {inStock && <p>In stock</p>}
    </article>
  );
}
```

Hvis:

```jsx
inStock === true;
```

viser React:

```html
<p>In stock</p>
```

Hvis `inStock` er `false`, bliver teksten ikke vist.

### Ternary eller `&&`?

I det forrige koncept brugte vi ternary:

```jsx
{
  inStock ? <p>In stock</p> : <p>Out of stock</p>;
}
```

Her har vi **to muligheder**:

```text
true  → In stock
false → Out of stock
```

Med `&&`:

```jsx
{
  inStock && <p>In stock</p>;
}
```

har vi kun én:

```text
true  → vis "In stock"
false → vis ingenting
```

En god huskeregel er derfor:

```text
? :  → vælg mellem to ting
&&   → vis noget, hvis betingelsen er true
```

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret:

```js
const product = {
  name: "Keyboard",
  price: 799,
  inStock: true
};
```

Brug `&&` til kun at printe produktets navn, hvis produktet er på lager:

```js
product.inStock && console.log(product.name);
```

Ændr derefter:

```js
inStock: false;
```

Hvad sker der nu?

#### Ekstra

Tilføj:

```js
const isLoggedIn = true;
const isAdmin = true;
```

Brug `&&` sammen med en `if`:

```js
if (isLoggedIn && isAdmin) {
  console.log("Welcome admin");
}
```

Prøv forskellige kombinationer af `true` og `false`.

Hvornår bliver teksten printet?

### React

Opret `ProductCard.jsx` i `sandbox`.

Lad komponenten modtage:

```jsx
<ProductCard name="Keyboard" price={799} inStock={true} />
```

Vis altid produktets navn og pris.

Brug derefter `&&` til kun at vise:

```jsx
<p>In stock</p>
```

hvis `inStock` er `true`.

Fx:

```jsx
function ProductCard({ name, price, inStock }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{price} kr.</p>

      {inStock && <p>In stock</p>}
    </article>
  );
}
```

Prøv komponenten med både:

```jsx
<ProductCard name="Keyboard" price={799} inStock={true} />
```

og:

```jsx
<ProductCard name="Mouse" price={399} inStock={false} />
```

Hvad er forskellen på det, der bliver vist?

#### Ekstra

Tilføj en prop:

```jsx
onSale={true}
```

Brug `&&` til kun at vise:

```jsx
<p>On sale!</p>
```

når `onSale` er `true`.

Prøv derefter forskellige kombinationer af `inStock` og `onSale`.

---

# 30 · Ekstra: Logical OR `||` og fallback-værdier

## Hvad er det?

Logical OR `||` er en logical operator.

Den kan bruges til at vælge en **fallback-værdi**, hvis den første værdi ikke findes eller er falsy.

```js
const username = "";

const displayName = username || "Guest";

console.log(displayName);
// Guest
```

Her bruges `"Guest"`, fordi `username` er en tom string.

Tænk på det som:

**Brug denne værdi – ellers brug fallback-værdien.**

## Hvorfor bruger vi det?

`||` er nyttig, når vi gerne vil have en standardværdi, hvis en anden værdi mangler.

```js
const name = "";

const displayName = name || "Unknown";

console.log(displayName);
// Unknown
```

Hvis `name` har en værdi:

```js
const name = "Anna";

const displayName = name || "Unknown";

console.log(displayName);
// Anna
```

JavaScript bruger altså den første værdi, hvis den er truthy.

Ellers går den videre til værdien efter `||`.

## Hvordan bruges det?

Syntaxen er:

```js
value || fallback;
```

Fx:

```js
const title = "";

const displayTitle = title || "Untitled";

console.log(displayTitle);
// Untitled
```

Det virker også med `undefined`:

```js
const user = {
  name: "Anna"
};

const email = user.email || "No email";

console.log(email);
// No email
```

Her findes `email` ikke på objectet og værdien bliver derfor `undefined`.

Fallback-værdien `"No email"` bliver derfor brugt.

### Vær opmærksom på `0`

`||` betragter flere værdier som falsy.

Det gælder fx:

```js
false;
0;
("");
undefined;
null;
```

Det kan nogle gange give et resultat, vi ikke forventer:

```js
const quantity = 0;

const displayQuantity = quantity || 1;

console.log(displayQuantity);
// 1
```

Men `0` var måske en helt gyldig værdi.

Hvis vi kun ønsker en fallback ved `null` eller `undefined`, kan vi i stedet bruge `??`.

Det ser vi på i næste koncept.

## I React

I React kan `||` bruges til fallback-værdier i JSX.

```jsx
function Profile({ name }) {
  return (
    <article>
      <h2>{name || "Unknown user"}</h2>
    </article>
  );
}
```

Hvis vi bruger:

```jsx
<Profile name="Anna" />
```

vises:

```text
Anna
```

Hvis `name` er en tom string:

```jsx
<Profile name="" />
```

vises:

```text
Unknown user
```

Vi kan også oprette fallback-værdien før JSX:

```jsx
function Product({ name, category }) {
  const displayCategory = category || "No category";

  return (
    <article>
      <h2>{name}</h2>
      <p>{displayCategory}</p>
    </article>
  );
}
```

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret:

```js
const student = {
  name: "Anna",
  nickname: ""
};
```

Brug `||` til at oprette:

```js
const displayName = // ...
```

Hvis `nickname` har en værdi, skal den bruges.

Ellers skal `"No nickname"` bruges.

Print resultatet i browserens console.

Ændr derefter:

```js
nickname: "Annie";
```

Hvad bliver resultatet nu?

### React

Opret `StudentProfile.jsx` i `sandbox`.

Lad komponenten modtage:

```jsx
<StudentProfile name="Anna" nickname="" />
```

Vis altid `name`.

Brug derefter `||` til at vise `nickname` med `"No nickname"` som fallback:

```jsx
<p>{nickname || "No nickname"}</p>
```

Prøv derefter:

```jsx
<StudentProfile name="Anna" nickname="Annie" />
```

Kontrollér, hvordan resultatet ændrer sig.

---

# 31 · Ekstra: Nullish coalescing `??`

## Hvad er det?

Nullish coalescing `??` bruges til at give en **fallback-værdi**, hvis en værdi er `null` eller `undefined`.

```js
const username = undefined;

const displayName = username ?? "Guest";

console.log(displayName);
// Guest
```

Hvis den første værdi findes, bliver den brugt:

```js
const username = "Anna";

const displayName = username ?? "Guest";

console.log(displayName);
// Anna
```

Tænk på `??` som:

**Brug denne værdi – medmindre den er `null` eller `undefined`.**

## Hvorfor bruger vi det?

I det forrige koncept så vi, at `||` også bruger fallback ved værdier som `0` og en tom string `""`.

```js
const quantity = 0;

const displayQuantity = quantity || 1;

console.log(displayQuantity);
// 1
```

Det kan være et problem, fordi `0` måske er en helt gyldig værdi.

Med `??`:

```js
const quantity = 0;

const displayQuantity = quantity ?? 1;

console.log(displayQuantity);
// 0
```

Her beholder JavaScript værdien `0`.

Fallback-værdien bruges kun ved:

```js
null;
undefined;
```

## Hvordan bruges det?

Syntaxen minder meget om `||`:

```js
value ?? fallback;
```

Fx:

```js
const product = {
  name: "Keyboard",
  discount: undefined
};

const discount = product.discount ?? 0;

console.log(discount);
// 0
```

Hvis `discount` har en værdi:

```js
const product = {
  name: "Keyboard",
  discount: 20
};

const discount = product.discount ?? 0;

console.log(discount);
// 20
```

### `||` eller `??`?

Forskellen bliver tydelig med værdien `0`:

```js
const quantity = 0;

console.log(quantity || 1);
// 1

console.log(quantity ?? 1);
// 0
```

Med `||` kan fx `0`, `false` og `""` udløse fallback-værdien.

Med `??` bruges fallback kun ved:

```js
null;
undefined;
```

Hvis `0`, `false` eller `""` er gyldige værdier i dine data, er `??` derfor ofte et bedre valg.

## I React

I React kan `??` bruges, når data måske mangler.

```jsx
function Product({ name, stock }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>Stock: {stock ?? "Unknown"}</p>
    </article>
  );
}
```

Hvis vi bruger:

```jsx
<Product name="Keyboard" stock={10} />
```

vises:

```text
Stock: 10
```

Og hvis værdien mangler:

```jsx
<Product name="Keyboard" />
```

vises:

```text
Stock: Unknown
```

Det vigtige er, at `0` stadig fungerer:

```jsx
<Product name="Keyboard" stock={0} />
```

viser:

```text
Stock: 0
```

Det giver mening, fordi produktet godt kan have **0 på lager**.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret:

```js
const product = {
  name: "Keyboard",
  stock: undefined
};
```

Brug `??` til at oprette:

```js
const stock = // ...
```

Hvis `product.stock` mangler, skal fallback-værdien være:

```text
Unknown
```

Print resultatet i browserens console.

Ændr derefter:

```js
stock: 0;
```

Hvad bliver resultatet nu?

### React

Opret `ProductStock.jsx` i `sandbox`.

Lad komponenten modtage:

```jsx
<ProductStock name="Keyboard" stock={0} />
```

Vis produktets navn og brug `??` til at vise `"Unknown"`, hvis `stock` mangler:

```jsx
<p>Stock: {stock ?? "Unknown"}</p>
```

Prøv komponenten med:

```jsx
<ProductStock name="Keyboard" stock={10} />
```

```jsx
<ProductStock name="Keyboard" stock={0} />
```

og:

```jsx
<ProductStock name="Keyboard" />
```

Sammenlign resultaterne.

Hvad sker der med `0`, og hvornår bliver `"Unknown"` vist?

---

# 32 · Optional chaining `?.`

## Hvad er det?

Optional chaining `?.` bruges til sikkert at tilgå properties, som måske ikke findes.

Forestil dig dette object:

```js
const student = {
  name: "Anna",
  contact: {
    email: "anna@example.com"
  }
};
```

Vi kan hente email sådan:

```js
console.log(student.contact.email);
// anna@example.com
```

Men hvis `contact` ikke findes:

```js
const student = {
  name: "Anna"
};

console.log(student.contact.email);
```

får vi en fejl, fordi JavaScript forsøger at læse `email` fra noget, der er `undefined`.

Med optional chaining kan vi skrive:

```js
console.log(student.contact?.email);
// undefined
```

JavaScript stopper, hvis `contact` ikke findes, i stedet for at give en fejl.

## Hvorfor bruger vi det?

Når vi arbejder med data, kan nogle værdier mangle.

```js
const student = {
  name: "Anna",
  contact: {
    email: "anna@example.com"
  }
};
```

En anden student har måske ikke `contact`:

```js
const student = {
  name: "Peter"
};
```

Hvis vi skriver:

```js
student.contact.email;
```

risikerer vi en fejl.

Med optional chaining:

```js
student.contact?.email;
```

får vi i stedet:

```js
undefined;
```

Det gør `?.` særligt nyttigt, når vi arbejder med data fra fx APIs, hvor nogle properties måske ikke findes.

## Hvordan bruges det?

Optional chaining skrives med `?.`:

```js
object.property?.property;
```

Fx:

```js
const student = {
  name: "Anna",
  contact: {
    email: "anna@example.com"
  }
};

const email = student.contact?.email;

console.log(email);
// anna@example.com
```

Hvis `contact` mangler:

```js
const student = {
  name: "Anna"
};

const email = student.contact?.email;

console.log(email);
// undefined
```

Vi kan også bruge optional chaining flere steder:

```js
const city = student.contact?.address?.city;
```

Hvis `contact` eller `address` ikke findes, stopper JavaScript og returnerer `undefined`.

### Optional chaining sammen med `??`

Optional chaining bruges ofte sammen med en fallback-værdi.

```js
const student = {
  name: "Anna"
};

const email = student.contact?.email ?? "No email";

console.log(email);
// No email
```

Her har de to operators hver sin opgave:

```text
?.  → prøv sikkert at hente værdien
??  → brug en fallback, hvis værdien mangler
```

## I React

Optional chaining er nyttigt i React, når vi viser data, hvor nogle properties måske mangler.

```jsx
function Student({ student }) {
  return (
    <article>
      <h2>{student.name}</h2>
      <p>{student.contact?.email}</p>
    </article>
  );
}
```

Hvis `contact` findes, bliver email vist.

Hvis `contact` ikke findes, får komponenten ikke en fejl.

Vi kan kombinere det med `??`:

```jsx
function Student({ student }) {
  return (
    <article>
      <h2>{student.name}</h2>
      <p>{student.contact?.email ?? "No email"}</p>
    </article>
  );
}
```

Nu får brugeren også en fallback-tekst, hvis email mangler.

Det er et mønster, du ofte vil møde, når React-components viser data:

```jsx
student.contact?.email ?? "No email";
```

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret:

```js
const student = {
  name: "Anna",
  contact: {
    email: "anna@example.com"
  }
};
```

Brug optional chaining til at hente:

```js
student.contact?.email;
```

Print resultatet i browserens console.

Fjern derefter `contact` fra objectet:

```js
const student = {
  name: "Anna"
};
```

Kør koden igen.

Hvilken værdi får du?

### React

Opret `StudentContact.jsx` i `sandbox`.

Lad komponenten modtage et `student` object:

```jsx
function StudentContact({ student }) {
  // ...
}
```

Brug komponenten med:

```jsx
const student = {
  name: "Anna",
  contact: {
    email: "anna@example.com"
  }
};
```

Vis navn og email:

```jsx
<h2>{student.name}</h2>
<p>{student.contact?.email}</p>
```

Fjern derefter `contact` fra objectet og kontrollér, at komponenten stadig virker.

#### Ekstra

Kombinér optional chaining med `??`:

```jsx
<p>{student.contact?.email ?? "No email"}</p>
```

Prøv komponenten både med og uden `contact`.

Forklar med dine egne ord, hvad de to operators gør:

```text
?.
??
```

---

# 33 · Event handlers

## Hvad er det?

En event handler er en funktion, der bliver kørt, når en bestemt hændelse sker.

Det kan fx være, når en bruger:

- klikker på en button
- skriver i et input field
- sender en form

I React kan vi fx reagere på et klik med `onClick`:

```jsx
function Button() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

Her er `handleClick` vores **event handler**.

Funktionen bliver kørt, når brugeren klikker på knappen.

## Hvorfor bruger vi det?

Event handlers gør vores applikationer interaktive.

Uden events kan brugeren se vores interface, men ikke rigtig interagere med det.

I React møder vi fx ofte:

```jsx
onClick;
onChange;
onSubmit;
```

De forskellige events bruges til forskellige typer interaktion.

## Hvordan bruges det?

En event handler er bare en funktion:

```js
const handleClick = () => {
  console.log("Clicked!");
};
```

I React kan vi give funktionen til `onClick`:

```jsx
<button onClick={handleClick}>Click me</button>
```

Bemærk forskellen på:

```jsx
onClick = { handleClick };
```

og:

```jsx
onClick={handleClick()}
```

Når vi skriver:

```jsx
onClick = { handleClick };
```

giver vi **funktionen** til React.

React kalder derefter funktionen, når brugeren klikker.

Hvis vi skriver:

```jsx
onClick={handleClick()}
```

kalder vi funktionen med det samme, når komponenten bliver kørt.

Derfor bruger vi normalt:

```jsx
onClick = { handleClick };
```

En event handler kan også kalde andre funktioner:

```js
const showMessage = () => {
  console.log("Hello!");
};

const handleClick = () => {
  showMessage();
};
```

## I React

Event handlers bruges hele tiden i React.

```jsx
function ProductButton({ name }) {
  const handleClick = () => {
    console.log(`Selected: ${name}`);
  };

  return <button onClick={handleClick}>Select {name}</button>;
}
```

Komponenten kan fx bruges sådan:

```jsx
<ProductButton name="Keyboard" />
```

Når brugeren klikker, bliver dette printet:

```text
Selected: Keyboard
```

Du vil også møde event handlers skrevet direkte i JSX:

```jsx
<button onClick={() => console.log("Clicked!")}>Click me</button>
```

Det kan være fint til meget simpel kode.

Hvis event handleren skal gøre flere ting, er en navngivet funktion ofte lettere at læse.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret:

```js
const product = {
  name: "Keyboard",
  price: 799
};
```

Opret derefter en funktion:

```js
const handleSelectProduct = () => {
  // ...
};
```

Når funktionen kaldes:

```js
handleSelectProduct();
```

skal den printe:

```text
Selected: Keyboard
```

Brug `product.name` og en template literal.

#### Ekstra

Udvid funktionen, så den også bruger `price`.

Resultatet skal være:

```text
Keyboard costs 799 kr.
```

### React

Opret `ProductButton.jsx` i `sandbox`.

Lad komponenten modtage:

```jsx
<ProductButton name="Keyboard" />
```

Opret en event handler:

```jsx
const handleClick = () => {
  console.log(`Selected: ${name}`);
};
```

Tilføj en button:

```jsx
<button onClick={handleClick}>Select {name}</button>
```

Exportér komponenten og vis den i `App.jsx`.

Prøv derefter komponenten flere gange:

```jsx
<ProductButton name="Keyboard" />
<ProductButton name="Mouse" />
<ProductButton name="Monitor" />
```

Kontrollér, at den rigtige værdi bliver printet, afhængigt af hvilken button du klikker på.

#### Ekstra

Tilføj en `price` prop:

```jsx
<ProductButton name="Keyboard" price={799} />
```

Når brugeren klikker på knappen, skal event handleren printe:

```text
Keyboard costs 799 kr.
```

---

# 34 · Event object

## Hvad er det?

Når en event handler bliver kørt, får den information om den event, der er sket.

Denne information ligger i et **event object**.

```jsx
const handleClick = (event) => {
  console.log(event);
};
```

React sender automatisk event objectet med, når event handleren bliver kaldt.

```jsx
<button onClick={handleClick}>Click me</button>
```

Her indeholder `event` information om klikket.

## Hvorfor bruger vi det?

Event objectet giver os adgang til information om det element, brugeren interagerer med.

Det er især nyttigt med inputs.

```jsx
const handleChange = (event) => {
  console.log(event.target.value);
};
```

Hvis brugeren skriver i et input, kan vi bruge:

```js
event.target.value;
```

til at få den aktuelle værdi.

Det er et meget almindeligt mønster i React.

## Hvordan bruges det?

Event objectet modtages som en parameter:

```js
const handleClick = (event) => {
  console.log(event);
};
```

Vi kalder ofte parameteren:

```js
event;
```

eller kort:

```js
e;
```

Begge dele virker:

```js
const handleClick = (e) => {
  console.log(e);
};
```

En vigtig property er:

```js
event.target;
```

`target` er det element, der udløste eventen.

Med et input:

```jsx
<input onChange={handleChange} />
```

kan vi skrive:

```jsx
const handleChange = (event) => {
  console.log(event.target);
};
```

Og hvis vi vil have værdien fra inputtet:

```jsx
const handleChange = (event) => {
  console.log(event.target.value);
};
```

## I React

Event objectet bruges meget sammen med forms og inputs.

```jsx
function NameInput() {
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return <input type="text" onChange={handleChange} />;
}
```

Hver gang brugeren skriver noget, bliver `handleChange` kørt.

Hvis brugeren skriver:

```text
Anna
```

vil:

```js
event.target.value;
```

indeholde:

```text
Anna
```

Event objectet kan også bruges med andre events:

```jsx
const handleSubmit = (event) => {
  event.preventDefault();
};
```

Her bruger vi `preventDefault()` til at stoppe browserens normale form-submit.

```jsx
function Form() {
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Prøv selv

### JavaScript

Event objects kommer normalt fra browser-events, så denne øvelse laves i React-delen.

Fokusér i stedet på at genkende strukturen:

```js
const handleChange = (event) => {
  console.log(event.target.value);
};
```

Her er:

```text
event
```

objectet med information om eventen.

```text
event.target
```

elementet, der udløste eventen.

```text
event.target.value
```

værdien fra elementet.

### React

Opret `NameInput.jsx` i `sandbox`.

Opret en event handler:

```jsx
const handleChange = (event) => {
  console.log(event.target.value);
};
```

Opret et input:

```jsx
<input type="text" onChange={handleChange} />
```

Exportér komponenten og vis den i `App.jsx`.

Skriv noget i input-feltet og kontrollér browserens console.

Hver gang du skriver, skal den aktuelle værdi blive printet.

#### Ekstra

Tilføj state:

```jsx
const [name, setName] = useState("");
```

Opdatér state i event handleren:

```jsx
const handleChange = (event) => {
  setName(event.target.value);
};
```

Vis værdien under input-feltet:

```jsx
<p>{name}</p>
```

Nu skal teksten opdatere sig, mens du skriver.

---

---

# 35 · `async` / `await`

## Hvad er det?

Nogle ting i JavaScript tager tid.

Det kan fx være at:

- hente data fra et API
- læse data fra en database
- vente på et svar fra en server

Her bruger vi ofte `async` og `await`.

```js
const getData = async () => {
  const data = await somethingThatTakesTime();

  console.log(data);
};
```

`async` fortæller, at funktionen arbejder med asynkron kode.

`await` fortæller JavaScript, at vi skal vente på resultatet, før vi arbejder videre med det.

Tænk på det som:

```text
async → funktionen arbejder med noget, der kan tage tid
await → vent på resultatet
```

## Hvorfor bruger vi det?

JavaScript skal ofte arbejde med data, som ikke er tilgængelige med det samme.

Det kan fx være data fra et API:

```text
send request
↓
vent på svar
↓
modtag data
↓
arbejd videre
```

Med `await` kan vi vente på resultatet, før vi bruger det:

```js
const data = await somethingThatTakesTime();

console.log(data);
```

Det gør asynkron kode lettere at læse, fordi koden stadig kan skrives i en naturlig rækkefølge.

## Hvordan bruges det?

For at bruge `await` inde i en funktion markerer vi funktionen med `async`:

```js
async function getData() {
  const data = await somethingThatTakesTime();

  console.log(data);
}
```

Det samme kan skrives som en arrow function:

```js
const getData = async () => {
  const data = await somethingThatTakesTime();

  console.log(data);
};
```

Bemærk placeringen af `async`:

```js
const getData = async () => {
  // ...
};
```

Når funktionen er oprettet, kan vi kalde den som andre funktioner:

```js
getData();
```

Det vigtigste at huske er:

```text
async → sættes på funktionen
await → bruges inde i funktionen
```

I næste koncept bruger vi `await` sammen med `fetch()` til faktisk at hente data.

## I React

I React bruger vi ofte `async` på event handlers, når en handling skal vente på noget.

```jsx
function GetProducts() {
  const handleGetProducts = async () => {
    console.log("Getting products...");
  };

  return <button onClick={handleGetProducts}>Get products</button>;
}
```

Her er `handleGetProducts` en almindelig event handler, som vi har arbejdet med tidligere.

Forskellen er, at den nu er markeret med:

```js
async;
```

Det betyder, at vi senere kan bruge `await` inde i funktionen.

I næste koncept gør vi netop det, når vi introducerer `fetch()`.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret en almindelig arrow function:

```js
const getData = () => {
  console.log("Getting data...");
};
```

Gør derefter funktionen `async`:

```js
const getData = async () => {
  console.log("Getting data...");
};
```

Kald funktionen:

```js
getData();
```

Kontrollér resultatet i browserens console.

Målet er her at blive fortrolig med syntaxen:

```js
const getData = async () => {
  // await kan bruges her
};
```

### React

Opret `GetProducts.jsx` i `sandbox`.

Opret en event handler:

```jsx
const handleGetProducts = async () => {
  console.log("Getting products...");
};
```

Tilføj en button:

```jsx
<button onClick={handleGetProducts}>Get products</button>
```

Exportér komponenten og vis den i `App.jsx`.

Klik på knappen og kontrollér browserens console.

I næste koncept udvider vi den samme event handler med `fetch()` og `await`.

---

# 36 · `fetch()`

## Hvad er det?

`fetch()` bruges til at hente data fra en URL.

Det kan fx være data fra et API:

```js
const response = await fetch("https://example.com/products");
```

Her sender `fetch()` en request til URL'en og venter på et response fra serveren.

Vi bruger `await`, fordi det kan tage tid at få svaret tilbage.

## Hvorfor bruger vi det?

Mange webapplikationer henter data fra en server eller et API.

Det kan fx være:

- produkter
- brugere
- posts
- kurser

Med `fetch()` kan JavaScript sende en request til en URL:

```js
const response = await fetch("https://example.com/products");
```

Tænk på det som:

```text
fetch(url)
    ↓
send request
    ↓
vent på serveren
    ↓
response
```

`response` er serverens svar på vores request.

Det er endnu ikke selve de data, vi vil arbejde med.

Dem læser vi fra responset i næste koncept.

## Hvordan bruges det?

Vi bruger typisk `fetch()` inde i en `async` function:

```js
const getProducts = async () => {
  const response = await fetch("https://example.com/products");

  console.log(response);
};
```

Her sker der tre ting:

```text
1. fetch() sender en request
2. await venter på svaret
3. response indeholder serverens response
```

URL'en sendes med som argument til `fetch()`:

```js
fetch("https://example.com/products");
```

Vi kan hente fra forskellige endpoints ved at ændre URL'en:

```js
await fetch("https://example.com/products");
```

```js
await fetch("https://example.com/users");
```

## I React

Vi kan nu udvide event handleren fra det forrige koncept:

```jsx
function GetProducts() {
  const handleGetProducts = async () => {
    const response = await fetch("https://example.com/products");

    console.log(response);
  };

  return <button onClick={handleGetProducts}>Get products</button>;
}
```

Når brugeren klikker på knappen:

```text
click
↓
handleGetProducts()
↓
fetch()
↓
await
↓
response
```

Vi har nu fået et response fra serveren.

I næste koncept bruger vi `response.json()` til at læse de JSON-data, der ligger i responset.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret:

```js
const getPost = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

  console.log(response);
};
```

Kald funktionen:

```js
getPost();
```

Åbn browserens console og undersøg det `Response` object, du får tilbage.

Prøv derefter at ændre:

```text
/posts/1
```

til:

```text
/posts/2
```

Kør funktionen igen.

### React

Arbejd videre i `GetProducts.jsx` fra det forrige koncept.

Udvid event handleren:

```jsx
const handleGetProducts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  console.log(response);
};
```

Klik på knappen og kontrollér browserens console.

Du skal kunne se et `Response` object.

I næste koncept læser vi data fra dette response med:

```js
response.json();
```

---

# 37 · JSON og `response.json()`

## Hvad er det?

Når vi henter data fra et API, kommer data ofte i formatet **JSON**.

JSON kan fx se sådan ud:

```json
{
  "id": 1,
  "name": "Keyboard",
  "price": 799
}
```

Når vi bruger `fetch()`, får vi først et `Response` object:

```js
const response = await fetch("https://example.com/products");
```

For at få fat i JSON-dataen fra responset bruger vi:

```js
const data = await response.json();
```

Nu kan vi arbejde med `data` som almindelig JavaScript-data.

## Hvorfor bruger vi det?

Et response fra `fetch()` er ikke direkte de data, vi vil arbejde med.

```js
const response = await fetch(url);
```

Vi skal først læse data fra responset:

```js
const data = await response.json();
```

Hele flowet ser derfor typisk sådan ud:

```js
const response = await fetch(url);
const data = await response.json();

console.log(data);
```

Tænk på det som:

```text
fetch(url)
↓
response
↓
response.json()
↓
data
```

Det er `data`, vi normalt arbejder videre med.

## Hvordan bruges det?

Vi bruger `response.json()` efter `fetch()`:

```js
const getPost = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

  const data = await response.json();

  console.log(data);
};
```

Hvis API'et returnerer et object, kan vi bruge property access:

```js
console.log(data.title);
```

Hvis API'et returnerer et array, kan vi bruge de array methods, vi allerede kender:

```js
data.map(...);
data.filter(...);
data.find(...);
```

Det er derfor data fra et API hurtigt kommer til at ligne de objects og arrays, vi allerede har arbejdet med.

## I React

Vi kan nu udvide vores event handler, så den faktisk læser data fra responset:

```jsx
function GetPosts() {
  const handleGetPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    const data = await response.json();

    console.log(data);
  };

  return <button onClick={handleGetPosts}>Get posts</button>;
}
```

Nu er hele flowet samlet:

```text
click
↓
fetch()
↓
response
↓
response.json()
↓
data
```

`data` er et array, så vi kan arbejde videre med det på samme måde som andre arrays.

Fx:

```js
const titles = data.map((post) => post.title);

console.log(titles);
```

## Prøv selv

### JavaScript

Arbejd videre med funktionen fra det forrige koncept:

```js
const getPost = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

  const data = await response.json();

  console.log(data);
};
```

Kald funktionen:

```js
getPost();
```

Undersøg `data` i browserens console.

Prøv derefter at printe enkelte properties:

```js
console.log(data.id);
console.log(data.title);
console.log(data.body);
```

### React

Arbejd videre med din component fra det forrige koncept.

Hent posts:

```jsx
const handleGetPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  const data = await response.json();

  console.log(data);
};
```

Klik på knappen og undersøg arrayet i browserens console.

Brug derefter `map()` til kun at hente titlerne:

```js
const titles = data.map((post) => post.title);

console.log(titles);
```

Kontrollér, at du får et nyt array med post-titler.

---

# 38 · Ekstra: Promises med `.then()` / `.catch()`

## Hvad er det?

En Promise repræsenterer en værdi, som vi får på et senere tidspunkt.

Du har allerede arbejdet med Promises:

```js
const response = await fetch("https://jsonplaceholder.typicode.com/posts");
```

`fetch()` returnerer en Promise, fordi det tager tid at få et response fra serveren.

Indtil nu har vi ventet på resultatet med `await`.

Promises kan også håndteres med `.then()`:

```js
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

## Hvorfor bruger vi det?

`async` / `await` og `.then()` er to måder at arbejde med Promises på.

Den kode, du allerede kender:

```js
const getPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  const data = await response.json();

  console.log(data);
};
```

kan også skrives med `.then()`:

```js
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

Du behøver ikke foretrække `.then()` frem for `async` / `await`.

Det vigtigste er at kunne genkende syntaxen, fordi du vil møde den i eksisterende JavaScript-kode og dokumentation.

## Hvordan bruges det?

`.then()` kører, når en Promise har fået sit resultat:

```js
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```

Vi kan tænke på flowet sådan:

```text
fetch()
↓
Promise
↓
.then(response)
↓
response.json()
↓
.then(data)
```

Hvis noget går galt, kan vi tilføje `.catch()`:

```js
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

`.catch()` bruges til at håndtere fejl i Promise-kæden.

## I React

Du kan også møde `.then()` i React-kode:

```jsx
function GetPosts() {
  const handleGetPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return <button onClick={handleGetPosts}>Get posts</button>;
}
```

Det gør grundlæggende det samme som vores tidligere version med `async` / `await`.

Til almindelig brug kan du fortsat bruge den syntax, du allerede kender:

```js
const response = await fetch(url);
const data = await response.json();
```

Det vigtigste her er at kunne **genkende**, at `.then()` og `.catch()` bruges til at arbejde med Promises.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Hent en post med `.then()`:

```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

Kontrollér resultatet i browserens console.

Tilføj derefter `.catch()`:

```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Sammenlign koden med den version, du tidligere har skrevet med `async` / `await`.

### React

Arbejd videre med din component fra de tidligere `fetch()`-øvelser.

Omskriv event handleren, så den bruger `.then()` i stedet for `async` / `await`:

```jsx
const handleGetPosts = () => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};
```

Klik på knappen og kontrollér, at du får de samme data som tidligere.

---

# 39 · Ekstra: Error handling med `try` / `catch`

## Hvad er det?

`try` / `catch` bruges til at håndtere fejl i JavaScript.

```js
try {
  // kode der kan fejle
} catch (error) {
  // hvad skal der ske, hvis noget fejler?
}
```

Når vi arbejder med `async` / `await`, kan vi fx bruge `try` / `catch` omkring vores `fetch()`-kode:

```js
const getPosts = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
```

## Hvorfor bruger vi det?

Når vi henter data, kan noget gå galt.

Det kan fx være:

- serveren kan ikke nås
- forbindelsen bliver afbrudt
- noget andet i den asynkrone kode fejler

Med `try` / `catch` kan vi bestemme, hvad der skal ske, hvis koden fejler.

Tænk på det som:

```text
try
↓
forsøg at køre koden
↓
fejl?
↓
catch
```

I `catch` kan vi fx vise eller logge en fejlbesked:

```js
catch (error) {
  console.log("Something went wrong");
}
```

## Hvordan bruges det?

Koden, vi vil forsøge at køre, placeres i `try`:

```js
try {
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
}
```

Hvis der opstår en fejl, hopper JavaScript til `catch`:

```js
catch (error) {
  console.log(error);
}
```

`error` indeholder information om fejlen.

Vi kan fx læse fejlbeskeden:

```js
catch (error) {
  console.log(error.message);
}
```

Sammen med `async` / `await` ser mønsteret typisk sådan ud:

```js
const getData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
```

## I React

I React kan vi bruge samme mønster i en event handler:

```jsx
function GetPosts() {
  const handleGetPosts = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return <button onClick={handleGetPosts}>Get posts</button>;
}
```

Her forsøger `try` at hente data.

Hvis noget fejler, bliver koden i `catch` kørt i stedet.

Senere kan vi fx bruge det til at vise en fejlbesked til brugeren i UI'et.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Tag din tidligere `fetch()`-kode og placer den i `try` / `catch`:

```js
const getPost = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
```

Kald funktionen:

```js
getPost();
```

Kontrollér, at data stadig bliver hentet.

Prøv derefter at ændre URL'en til en ugyldig adresse, så requestet fejler.

Kontrollér, hvad der bliver skrevet i browserens console.

### React

Arbejd videre med din component fra de tidligere `fetch()`-øvelser.

Pak din `fetch()`-kode ind i `try` / `catch`:

```jsx
const handleGetPosts = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
```

Kontrollér først, at requestet virker.

Prøv derefter en ugyldig URL og undersøg fejlen i browserens console.

---

# 40 · Ekstra: `JSON.parse()` / `JSON.stringify()`

## Hvad er det?

`JSON.stringify()` bruges til at lave JavaScript-data om til en JSON-string.

```js
const student = {
  name: "Anna",
  age: 24
};

const json = JSON.stringify(student);

console.log(json);
```

Resultatet bliver en string:

```json
{ "name": "Anna", "age": 24 }
```

`JSON.parse()` gør det modsatte.

Den laver en JSON-string om til JavaScript-data:

```js
const json = '{"name":"Anna","age":24}';

const student = JSON.parse(json);

console.log(student);
```

Nu kan vi arbejde med `student` som et almindeligt JavaScript object.

## Hvorfor bruger vi det?

Når data skal gemmes eller sendes, bliver det ofte repræsenteret som tekst.

Fx kan et object:

```js
const student = {
  name: "Anna",
  age: 24
};
```

laves om til JSON:

```js
const json = JSON.stringify(student);
```

og senere laves tilbage til et object:

```js
const studentAgain = JSON.parse(json);
```

Tænk på det som:

```text
JavaScript data
↓
JSON.stringify()
↓
JSON string
↓
JSON.parse()
↓
JavaScript data
```

## Hvordan bruges det?

### `JSON.stringify()`

Object til JSON-string:

```js
const product = {
  name: "Keyboard",
  price: 799
};

const json = JSON.stringify(product);

console.log(json);
```

Arrays kan også konverteres:

```js
const courses = ["JavaScript", "React", "WordPress"];

const json = JSON.stringify(courses);
```

### `JSON.parse()`

JSON-string til JavaScript:

```js
const json = `
{
  "name": "Keyboard",
  "price": 799
}
`;

const product = JSON.parse(json);

console.log(product.name);
// Keyboard
```

Efter `JSON.parse()` kan vi bruge almindelig property access:

```js
product.name;
product.price;
```

## I React

Du bruger normalt ikke `JSON.parse()` direkte sammen med `fetch()`.

Når vi skriver:

```js
const data = await response.json();
```

sørger `response.json()` allerede for, at JSON-data bliver lavet om til JavaScript-data.

Derfor kan vi bagefter arbejde direkte med:

```js
data.map(...);
data.filter(...);
data.find(...);
```

`JSON.stringify()` kan fx være nyttig, hvis du vil undersøge data:

```jsx
function Debug({ data }) {
  return <pre>{JSON.stringify(data)}</pre>;
}
```

Eller med lidt mere læsevenlig formatering:

```jsx
<pre>{JSON.stringify(data, null, 2)}</pre>
```

Det kan være praktisk, når du vil se strukturen på et object eller array under udvikling.

## Prøv selv

### JavaScript

Arbejd videre i `sandbox.js`.

Opret:

```js
const student = {
  name: "Anna",
  education: "Multimedia Design",
  semester: 3
};
```

Brug:

```js
JSON.stringify();
```

til at lave `student` om til en JSON-string.

Print resultatet i browserens console.

Brug derefter:

```js
JSON.parse();
```

til at lave JSON-stringen tilbage til et JavaScript object.

Print objectet og kontrollér, at du igen kan bruge:

```js
student.name;
student.education;
```

### React

Opret `DebugData.jsx` i `sandbox`.

Lad komponenten modtage et object:

```jsx
<DebugData
  data={{
    name: "Anna",
    education: "Multimedia Design"
  }}
/>
```

Vis objectet som JSON med:

```jsx
<pre>{JSON.stringify(data, null, 2)}</pre>
```

Kontrollér, hvordan objectet bliver vist i browseren.

Prøv derefter at sende et array med objects som `data`.
