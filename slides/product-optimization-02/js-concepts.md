# JavaScript for React

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
