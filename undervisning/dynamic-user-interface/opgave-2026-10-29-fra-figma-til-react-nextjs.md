# Opgave: Fra Figma til React/Next.js - 29-10-2026

## Formål

Du bygger den pill og den modal, du har designet i Figma med NKKR, som React-komponenter i Next.js. Du bygger dem to gange:

- **Rul 1:** Du oversætter selv designet til kode med Dev Mode ved siden af.
- **Rul 2:** En AI-agent læser designet gennem Figma MCP-serveren. Du sammenligner dens kode med din egen, retter designet i Figma og lader agenten opdatere din komponent.

Rul 1 giver dig den forståelse, du skal bruge for at vurdere agentens kode i rul 2.

Opgaverne er de samme som i slides, men med mere hjælp. Hvert trin linker til det slide, det bygger på. Under rul 1 kan du folde den fulde løsning ud. Koden er den samme som på branchen `solution` i [starterrepoet](https://github.com/cederdorff/nextjs-figma-pill-modal/tree/solution), hvor hvert trin har sit eget commit.

<hr style="margin: 2rem 0;">

## Sådan bruger du opgaven

- Tiden ved hvert trin er et pejlemærke, så alle når rul 1, 2a og 2b. Er du bagud, så fold løsningen ud, og skriv den af.
- Slut hvert trin med **Tjek**, så du ved, at det virker, før du går videre.
- Dine navne og værdier kommer fra din egen Figma-fil og ser lidt anderledes ud end i eksemplerne. Eksemplerne bruger [demofilen](https://www.figma.com/design/XTTxNnZjIIWPGyvq6Ya5Wj/Figma-%C3%98velse-IXD---Figma--%3E-React?node-id=9-61&m=dev).
- Commit og push med Source Control i VS Code eller GitHub Desktop efter rul 1, 2a og 2b.
- Kode og kommentarer i repoet er på engelsk. Dine tekster må gerne være på dansk.

<hr style="margin: 2rem 0;">

## Oversigt

| Tid  | Del                                                        | Min. |
| ---- | ---------------------------------------------------------- | ---- |
| 0:00 | Intro: Fra Figma-anatomi til React-anatomi                 | 10   |
| 0:10 | [Før du starter](#før-du-starter): Starteren kører         | 5    |
| 0:15 | [Rul 1: Håndkod komponenten](#rul-1)                       | 40   |
| 0:55 | Pause                                                      | 10   |
| 1:05 | MCP kort fortalt                                           | 5    |
| 1:10 | [Rul 2a: Byg den igen med Figma MCP](#rul-2a)              | 25   |
| 1:35 | [Rul 2b: Ret i Figma, og opdatér koden](#rul-2b)           | 15   |
| 1:50 | [Refleksion](#refleksion)                                  | 10   |

Bliver du hurtigt færdig, så tag [ekstraopgaverne](#ekstraopgaver). Opsætning af Figma MCP, Dev Mode og prompts står i [tool-guiden](#tool-guide).

<hr style="margin: 2rem 0;">

## Før du starter

**Du er klar, når:** Starteren kører på [http://localhost:3000](http://localhost:3000), og din Figma-fil ligger i dit Education-team.

1. **Din Figma-fil:** Læg filen med din pill og din modal i dit Education-team, ikke i _Drafts_. Så har du Dev Mode og Education-planens grænser for Figma MCP. Er din komponent ikke færdig, så duplikér [demofilen](https://www.figma.com/design/XTTxNnZjIIWPGyvq6Ya5Wj/Figma-%C3%98velse-IXD---Figma--%3E-React?node-id=9-61&m=dev), og arbejd videre i din kopi.
2. **Starteren:** Åbn [nextjs-figma-pill-modal](https://github.com/cederdorff/nextjs-figma-pill-modal), og klik **Use this template** → **Create a new repository**. Giv det et navn med små bogstaver og bindestreger.
3. **Klon dit nye repo** med GitHub Desktop (**Clone a repository**) eller i VS Code (**Source Control** → **Clone Repository**), og åbn mappen i VS Code.
4. **Kør appen:** Åbn terminalen i VS Code, og kør:

```bash
npm i
npm run dev
```

**Tjek:** Browseren viser overskriften _Components_ og en knap med teksten _Pill_.

[Slide: Hent starteren](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/starter) · [Slide: Det har du fået](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/starter-filer)

<hr style="margin: 2rem 0;">

<a id="rul-1"></a>

## Rul 1: Håndkod komponenten med Dev Mode

Du oversætter selv designet. Hav Figma i Dev Mode ved siden af VS Code, og find værdierne i _Inspect_-panelet. Se [Dev Mode i tool-guiden](#dev-mode).

**Du er klar, når:** Et klik på pillen åbner modalen med en animation, <kbd>Esc</kbd> og klik udenfor lukker den, alle værdier kommer fra tokens i `globals.css`, og arbejdet er pushet.

### 1.1 Overfør variables til tokens · 8 min

Dine Figma-variables bliver til custom properties i `:root` i `app/globals.css`. Så kan du bruge dem i alle komponenter med `var()`, ligesom du bruger variables i Figma.

Find dine variables under **Local variables**: Gå til Design-tilstand, klik på et tomt sted på canvas, og åbn **Local variables** i panelet til højre. Skriv dem ind i grupperne i `globals.css`:

| Figma                               | `globals.css`                            |
| ----------------------------------- | ---------------------------------------- |
| `Color/Neutral/Grey 900` = `#16161a` | `--color-neutral-grey-900: #16161a;`     |
| `Paddings/lg` = `36`                | `--paddings-lg: 36px;`                   |
| `font-weight/semi-bold` = `Semi Bold` | `--font-weight-semi-bold: 600;`        |

- **Navne:** Små bogstaver. `/` og mellemrum bliver til `-`.
- **Tal:** Number-variables får `px`.
- **Font weight:** `Regular` er `400`, `Medium` er `500`, `Semi Bold` er `600` og `Bold` er `700`.
- **Font:** Fonten indlæses i `app/layout.js` med `next/font`. Bruger dit design en anden font end Inter, så skift den dér, og behold `--font-family-primary` i `globals.css`.

Brug derefter to af dine tokens på `body`, så du kan se, at de virker:

```css
body {
  color: var(--color-neutral-grey-900);
  background: var(--color-neutral-white);
}
```

**Tjek:** Overskriften har farven fra din variable. Inspicér `<html>` i browserens DevTools, og find dine tokens under `:root`.

[Slide: Variables bliver til tokens](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/tokens) · [Slide: Opgave 1.1](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-1-1)

### 1.2 Byg pillen · 10 min

Din pill er et component set med to variant-properties. De bliver til to forskellige ting i koden:

- **`Type` (Primary/Secondary)** er et valg, når pillen bruges. Den bliver til prop'en `type`, der vælger en klasse i CSS'en: `type="primary"` giver klassen `.primary`.
- **`State` (Default/Hover)** sker af sig selv, når brugeren holder musen over. Den bliver ikke til en prop, men til `:hover` og `:focus-visible` i CSS'en, så hover-stilen også virker med tastaturet.
- **Teksten** i pillen bliver til `children`, ligesom tekst i en almindelig `<button>`.

Pas på med navnet: Prop'en `type` er din egen. Den er ikke det samme som `type="button"` på selve `<button>`, som fortæller browseren, at knappen ikke sender en formular.

```jsx
export default function Pill({ type = "primary", onClick, children }) {
  return (
    <button type="button" className={`${styles.pill} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

Skriv CSS'en i `components/Pill.module.css`. Auto layout bliver til flexbox, og alle værdier, der er en variable i Figma, skal bruge dit token. Brug `font-family: inherit`, fordi en `<button>` ikke arver fonten af sig selv.

Vis begge typer i `app/page.js`:

```jsx
<Pill type="primary">Primary</Pill>
<Pill type="secondary">Secondary</Pill>
```

**Tjek:** De to pills ligner dem i Figma. Hold musen over dem, og tryk <kbd>Tab</kbd>: Hover-stilen og en fokusring er synlige.

[Slide: Variants bliver til props og CSS](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/pill) · [Slide: Pill.module.css](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/pill-css) · [Slide: Opgave 1.2](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-1-2)

### 1.3 Åbn og luk modalen · 10 min

I Figma åbner pillen modalen som et overlay i prototypen. I React bliver det til state: `isOpen` er `true` eller `false`, og et klik skifter den.

Opret `components/PillModal.js`. Den holder state og forbinder pillen med modalen. Den bruger `useState` og et `onClick`, så den skal have `"use client"` øverst:

```jsx
"use client";

import { useState } from "react";
import Modal from "./Modal";
import Pill from "./Pill";

export default function PillModal({ type, label, title, text }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Pill type={type} onClick={() => setIsOpen(true)}>
        {label}
      </Pill>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} text={text} />
    </>
  );
}
```

Modalen er en `<dialog>`. Når du åbner den med `showModal()`, får du gratis fokus i modalen, lukning med <kbd>Esc</kbd> og en backdrop bag den. `open`-attributten alene giver ingen af delene. Derfor bruger `Modal.js` en `ref` til at kalde `showModal()` og `close()`, når `isOpen` skifter:

```jsx
const dialogRef = useRef(null);

useEffect(() => {
  if (isOpen) {
    dialogRef.current.showModal();
  } else {
    dialogRef.current.close();
  }
}, [isOpen]);
```

`onClose` på `<dialog>` holder state i sync, når brugeren trykker <kbd>Esc</kbd>. Klik udenfor kræver lidt ekstra kode: Et klik på backdroppen rammer selve `<dialog>`, mens et klik på indholdet rammer elementerne inde i den. Læg derfor indholdet i en `<div>`, og luk kun, når klikket rammer `<dialog>` selv.

Brug `PillModal` i `app/page.js` i stedet for de to `Pill`s:

```jsx
<PillModal
  type="primary"
  label="Hick's Law"
  title="Hick's Law"
  text="Jo flere valgmuligheder, jo længere tid tager det at vælge."
/>
```

**Tjek:** Et klik på pillen åbner modalen (endnu uden styling). <kbd>Esc</kbd> og klik udenfor lukker den. Et klik inde i modalen lukker den ikke.

[Slide: Hvorfor `<dialog>`?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/dialog) · [Slide: PillModal](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/pillmodal) · [Slide: Modal.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/modal-js) · [Slide: Opgave 1.3](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-1-3)

### 1.4 Modalens indhold og CSS · 7 min

Din boolean-property `showSeparator` bliver til en prop med `true` eller `false`. Separatoren vises kun, når den er `true`:

```jsx
{showSeparator && <hr className={styles.separator} />}
<h2 className={styles.title}>{title}</h2>
<p className={styles.text}>{text}</p>
```

Giv `showSeparator` standardværdien `true` i `Modal`, og send den videre fra `PillModal`. Prøv `showSeparator={false}` på en af dine pills i `page.js`.

Skriv CSS'en i `components/Modal.module.css` med dine tokens:

- **`.modal`** er selve `<dialog>`: baggrund, border-radius, skygge og bredde. Sæt `padding: 0`, så et klik på `<dialog>` altid er et klik på backdroppen.
- **`.content`** er auto layout fra Figma: `flex-direction: column`, `gap` og `padding`.
- **Faste bredder:** Figma siger `500px`. Tilføj `max-width: calc(100% - 32px)`, så modalen også passer på en mobil.

**Tjek:** Modalen ligner den i Figma, og separatoren forsvinder, når `showSeparator` er `false`.

[Slide: Boolean bliver til betinget rendering](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/separator) · [Slide: Modal.module.css](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/modal-css) · [Slide: Opgave 1.4](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-1-4)

### 1.5 Smart Animate, tastatur og commit · 5 min

Smart Animate i Figma bliver til `transition` i CSS. Find varigheden og easing i din prototype, fx _Ease out, 300ms_.

- **Pillen:** Tilføj `transition` på `border-color` og `color` i `.pill`.
- **Modalen:** En `<dialog>` skifter fra `display: none` til synlig. Det kan CSS kun animere med to tricks: `@starting-style` fortæller, hvor animationen starter, når modalen åbner, og `allow-discrete` på `display` og `overlay` holder modalen synlig, mens den animerer ud.

```css
.modal {
  opacity: 0;
  scale: 0.95;
  transition:
    opacity 300ms ease-out,
    scale 300ms ease-out,
    overlay 300ms ease-out allow-discrete,
    display 300ms ease-out allow-discrete;
}

.modal[open] {
  opacity: 1;
  scale: 1;
}

@starting-style {
  .modal[open] {
    opacity: 0;
    scale: 0.95;
  }
}
```

Test med tastaturet: <kbd>Tab</kbd> til pillen, åbn med <kbd>Enter</kbd>, og luk med <kbd>Esc</kbd>. Fokus skal komme tilbage til pillen. Commit og push.

**Tjek:** Modalen fader ind og ud. Du kan bruge den med tastaturet alene.

[Slide: Smart Animate bliver til transition](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/transition) · [Slide: Opgave 1.5](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-1-5)

**Sidder du fast?**

- **Ingen farver eller afstande?** Tjek stavningen: `var(--color-primary)` skal matche navnet i `globals.css` præcist, også bindestreger.
- **Pillen har en anden font?** Tilføj `font-family: inherit` på `.pill`.
- **`styles[type]` virker ikke?** Klassen i CSS'en skal hedde det samme som værdien, fx `.primary` til `type="primary"`.
- **Error: useState only works in Client Components?** Tilføj `"use client"` øverst i `PillModal.js` og `Modal.js`.
- **Cannot read properties of null (reading 'showModal')?** Tjek, at `ref={dialogRef}` står på `<dialog>`.
- **Modalen lukker, når du klikker inde i den?** Læg indholdet i `<div className={styles.content}>`, og flyt `padding` fra `.modal` til `.content`.
- **Modalen animerer ikke ud?** Du har brug for både `overlay` og `display` med `allow-discrete`. Firefox animerer endnu ikke `overlay`, så dér lukker modalen uden animation.

<details>
<summary><strong>Se den fulde løsning til rul 1</strong></summary>

`app/globals.css` – tokens fra demofilen:

```css
:root {
  /* Color */
  --color-primary: #ff3d8b;
  --color-secondary: #473dff;
  --color-neutral-white: #ffffff;
  --color-neutral-grey-200: #d6d6d0;
  --color-neutral-grey-800: #55554f;
  --color-neutral-grey-900: #16161a;

  /* Typography – the font itself is loaded in app/layout.js */
  --font-family-primary: var(--font-inter), sans-serif;
  --font-size-sm: 16px;
  --font-size-md: 18px;
  --font-size-lg: 32px;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semi-bold: 600;

  /* Spacing: gaps and paddings */
  --gaps-md: 12px;
  --paddings-sm: 20px;
  --paddings-lg: 36px;

  /* Sizes */
  --btn-height-md: 46px;

  /* Border radius */
  --border-radius-md: 24px;
  --border-radius-full: 9999px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  color: var(--color-neutral-grey-900);
  background: var(--color-neutral-white);
  font-family: var(--font-family-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
```

`components/Pill.js`:

```jsx
import styles from "./Pill.module.css";

// Figma: the component set "Pill" with the variants Type and State.
// Type becomes a prop that picks a class. State=Hover is handled in CSS, so it is not a prop.
export default function Pill({ type = "primary", onClick, children }) {
  return (
    <button type="button" className={`${styles.pill} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

`components/Pill.module.css`:

```css
/* Auto layout -> flexbox */
.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--btn-height-md);
  padding: 0 var(--paddings-sm);
  border: 1px solid var(--color-neutral-grey-200);
  border-radius: var(--border-radius-full);
  background: var(--color-neutral-white);
  font-family: inherit;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  letter-spacing: -0.01em; /* Figma: -1% */
  cursor: pointer;
  /* Smart Animate -> transition */
  transition:
    border-color 200ms ease-out,
    color 200ms ease-out;
}

/* Type=Primary and Type=Secondary -> one class per type */
.primary {
  color: var(--color-primary);
}

.secondary {
  color: var(--color-neutral-grey-900);
}

/* State=Hover -> :hover and :focus-visible */
.primary:hover,
.primary:focus-visible {
  border-color: var(--color-primary);
}

.secondary:hover,
.secondary:focus-visible {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
}

.pill:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

`components/PillModal.js`:

```jsx
"use client";

import { useState } from "react";
import Modal from "./Modal";
import Pill from "./Pill";

// Figma: the prototype interaction. A click on the pill opens the modal, and a click outside closes it.
export default function PillModal({ type, label, title, text, showSeparator }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Pill type={type} onClick={() => setIsOpen(true)}>
        {label}
      </Pill>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        text={text}
        showSeparator={showSeparator}
      />
    </>
  );
}
```

`components/Modal.js`:

```jsx
"use client";

import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

// Figma: the component "Modal" with the boolean property showSeparator.
export default function Modal({ isOpen, onClose, title, text, showSeparator = true }) {
  const dialogRef = useRef(null);

  // showModal() gives focus handling, Esc and a backdrop. The open attribute alone does not.
  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  // A click on the backdrop hits the dialog itself. A click on the content hits the elements inside it.
  function handleClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <dialog ref={dialogRef} className={styles.modal} aria-label={title} onClose={onClose} onClick={handleClick}>
      <div className={styles.content}>
        {showSeparator && <hr className={styles.separator} />}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
      </div>
    </dialog>
  );
}
```

`components/Modal.module.css`:

```css
/* The dialog itself. The padding sits on .content, so a click on the dialog is always a click on the backdrop. */
.modal {
  width: 500px;
  max-width: calc(100% - 32px);
  margin: auto;
  padding: 0;
  border: none;
  border-radius: var(--border-radius-md);
  background: var(--color-neutral-white);
  box-shadow: 0 20px 48px -12px rgb(0 0 0 / 0.12);
}

/* Auto layout -> flexbox */
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gaps-md);
  padding: var(--paddings-lg);
}

/* Separator, title and text */
.separator {
  width: 40px;
  height: 5px;
  border: none;
  border-radius: 3px;
  background: var(--color-primary);
}

.title {
  color: var(--color-neutral-grey-900);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semi-bold);
  line-height: normal;
  letter-spacing: -0.02em; /* Figma: -2% */
}

.text {
  color: var(--color-neutral-grey-800);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: 25px;
}

/* Smart Animate -> transition. Closed is the state the modal animates from and back to. */
.modal {
  opacity: 0;
  scale: 0.95;
  transition:
    opacity 300ms ease-out,
    scale 300ms ease-out,
    overlay 300ms ease-out allow-discrete,
    display 300ms ease-out allow-discrete;
}

.modal[open] {
  opacity: 1;
  scale: 1;
}

.modal::backdrop {
  background: rgb(22 22 26 / 0);
  transition:
    background 300ms ease-out,
    overlay 300ms ease-out allow-discrete,
    display 300ms ease-out allow-discrete;
}

.modal[open]::backdrop {
  background: rgb(22 22 26 / 0.4);
}

/* Where the animation starts when the modal opens */
@starting-style {
  .modal[open] {
    opacity: 0;
    scale: 0.95;
  }

  .modal[open]::backdrop {
    background: rgb(22 22 26 / 0);
  }
}
```

`app/page.js`:

```jsx
import PillModal from "@/components/PillModal";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <h1>Components</h1>
      <div className={styles.pills}>
        <PillModal
          type="primary"
          label="Hick's Law"
          title="Hick's Law"
          text="Jo flere valgmuligheder, jo længere tid tager det at vælge."
        />
        <PillModal
          type="secondary"
          label="Fitts's Law"
          title="Fitts's Law"
          text="Jo større og tættere et mål er, jo hurtigere er det at ramme."
          showSeparator={false}
        />
      </div>
    </main>
  );
}
```

</details>

**Starterrepo:** [1.1 Tokens](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/c22f3a2) · [1.2 Pill](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/8a5a360) · [1.3 Åbn og luk](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/e5681b3) · [1.4 Indhold og CSS](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/f88d70e) · [1.5 Transition](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/7dca707)

<hr style="margin: 2rem 0;">

<a id="rul-2a"></a>

## Rul 2a: Byg den igen med Figma MCP

Du bygger den samme komponent igen, men nu skriver en AI-agent koden. Agenten læser din Figma-fil gennem Figma MCP-serveren. Du lægger dens version i sin egen mappe, så du kan sammenligne den med din egen.

**Du er klar, når:** Agentens version kører på `/agent`, du har noteret, hvad der blev ens, og hvad du skulle rette, og agentens version er committet for sig.

### 2.1 Forbind din agent til Figma MCP · 10 min

Følg vejledningen til din agent i [tool-guiden](#opsaetning): Claude Code, Codex, GitHub Copilot i VS Code eller Cursor. Du logger ind med din Figma-konto i browseren og klikker **Allow access**.

Bed derefter agenten om at køre `whoami` fra Figma MCP. Svaret viser, hvilken e-mail du er logget ind med, og hvilken plan og hvilket seat du har. `whoami` tæller ikke med i dine grænser.

**Tjek:** `whoami` viser din skole-e-mail og Education-planen.

[Slide: Hvad er MCP?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/mcp) · [Slide: Opsætning](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opsaetning) · [Slide: whoami og grænser](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/whoami) · [Slide: Opgave 2.1](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-2-1)

### 2.2 Byg komponenten med agenten · 8 min

Højreklik på den frame i Figma, der indeholder din pill og din modal, og vælg **Copy link to selection**. Kopiér [prompten til 2a](#prompt-2a), indsæt dit link, og send den til agenten.

Prompten fortæller agenten det, den ikke kan se i Figma: at projektet bruger JavaScript, tokens i `globals.css` og CSS Modules, at pillen skal være en `<button>`, og at modalen skal være en `<dialog>`. Agenten lægger sine filer i `components/agent/` og viser dem på en ny side, så din egen version får lov at være i fred.

**Tjek:** [http://localhost:3000/agent](http://localhost:3000/agent) viser agentens pill, og den åbner en modal.

[Slide: Prompten til 2a](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/prompt-2a) · [Slide: Opgave 2a](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-2a)

### 2.3 Sammenlign med din egen version · 7 min

Åbn `/` og `/agent` side om side, og læg filerne ved siden af hinanden i VS Code. Notér svarene på tjeklisten:

| Tjek            | Spørgsmål                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| **Sprog**       | Er det JavaScript, eller har agenten skrevet TypeScript, fx `.tsx` og `type PillProps`?                 |
| **Styling**     | Bruger CSS'en dine tokens, eller står der hardcodede værdier, Tailwind-klasser eller `style={{ }}`?     |
| **Semantik**    | Er pillen en `<button>` og modalen en `<dialog>`, eller er det `<div>`s med `onClick`?                 |
| **Tastatur**    | Kan du <kbd>Tab</kbd>'e til pillen, åbne med <kbd>Enter</kbd> og lukke med <kbd>Esc</kbd>? Er fokus synligt? |
| **Hover**       | Er `State=Hover` blevet til `:hover` i CSS, eller til en prop som `state="hover"`?                       |
| **Layout**      | Er auto layout blevet til flexbox, eller er der faste bredder og `position: absolute`?                  |
| **Navne**       | Ligner props og klasser navnene i din Figma-fil?                                                        |
| **Tid**         | Hvad gik hurtigst: at skrive selv eller at prompte og rette bagefter?                                   |

Ret de fejl, du finder, enten selv eller ved at bede agenten om det. Commit agentens version for sig, fx med beskeden _Add the agent's version_. Så viser diffen i 2b kun ændringerne fra 2b.

**Tjek:** Du har mindst tre noter: én ting, der blev ens, én ting, du rettede, og én ting, du er i tvivl om.

[Slide: Det sender Figma MCP](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/mcp-output) · [Slide: Sammenlign](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/sammenlign) · [Slide: Opgave 2a](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-2a)

**Sidder du fast?**

- **Agenten kan ikke se Figma MCP?** Genstart agenten eller VS Code efter opsætningen. I Copilot skal du bruge **Agent**-tilstand i chatten.
- **Agenten svarer, at den ikke har adgang til filen?** Tjek, at du er logget ind med den konto, der har adgang til filen, og at linket peger på en frame, ikke hele filen.
- **Rate limit eller for mange kald?** Kør `whoami`. Står der ikke Education, så ligger filen sandsynligvis i _Drafts_. Flyt den til dit Education-team. Brug [plan B](#plan-b), mens du venter.
- **Ingen MCP?** Brug [plan B](#plan-b).

<hr style="margin: 2rem 0;">

<a id="rul-2b"></a>

## Rul 2b: Ret i Figma, og opdatér koden

Designet ændrer sig. Nu beder du agenten opdatere din håndkodede komponent i stedet for at bygge en ny. Bagefter gennemgår du diffen, før du committer.

**Du er klar, når:** Din håndkodede komponent matcher det rettede design, du har læst hele diffen i Source Control, og arbejdet er pushet.

### 2.4 Ret designet i Figma · 4 min

Lav mindst to ændringer i din Figma-fil:

- **En variable:** Giv en variable en ny værdi, fx `Color/Primary` eller `border-radius/md`.
- **En komponent:** Ændr noget i pillen eller modalen. Tilføj fx en lukkeknap i modalen som en instance af din pill, eller giv hover en ny farve.

**Tjek:** Ændringerne kan ses i Figma, og du har kopieret et link til den frame, du har ændret.

[Slide: Opgave 2b](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-2b)

### 2.5 Bed agenten opdatere komponenten · 5 min

Kopiér [prompten til 2b](#prompt-2b), indsæt dit link, og send den til agenten. Prompten beder agenten rette de eksisterende filer, rette tokens i `globals.css` i stedet for at hardcode nye værdier og forklare hver ændring.

**Tjek:** Siden på `/` viser det rettede design.

[Slide: Prompten til 2b](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/prompt-2b) · [Slide: Opgave 2b](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-2b)

### 2.6 Gennemgå diffen, og commit · 6 min

Åbn **Source Control** i VS Code eller **Changes** i GitHub Desktop, og klik dig igennem hver ændret fil. Det røde er fjernet, og det grønne er tilføjet.

- **Ændrede agenten kun det, du bad om?** Er der filer i diffen, du ikke havde forventet?
- **Blev en ny variable til et token** i `globals.css`, eller står værdien direkte i CSS'en?
- **Er `<button>`, `<dialog>` og tastaturet stadig i orden?** Test igen med <kbd>Tab</kbd>, <kbd>Enter</kbd> og <kbd>Esc</kbd>.
- **Kan du forklare hver linje?** Du har ansvaret for koden, også den, agenten har skrevet.

Fortryd det, du ikke vil have med (**Discard Changes** på en fil). Commit og push resten.

**Tjek:** Du kan forklare hver ændring i dit commit.

[Slide: Læs diffen](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/diff) · [Slide: Opgave 2b](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-2b)

<details>
<summary><strong>Se et eksempel på 2b: en lukkeknap i modalen</strong></summary>

Her har modalen i Figma fået en lukkeknap, der er en instance af `Pill`. En nested instance i Figma bliver til en komponent i en komponent i React. Knappen hjælper også brugere på touchskærme, hvor der ikke er en <kbd>Esc</kbd>-tast.

`components/Modal.js`:

```jsx
import Pill from "./Pill";

// ...

<p className={styles.text}>{text}</p>
{/* Figma: a nested instance of Pill. A close button also helps on touch screens without Esc. */}
<Pill type="secondary" onClick={onClose}>
  Luk
</Pill>
```

</details>

**Starterrepo:** [2b Lukkeknap i modalen](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/7f7fd0d)

<hr style="margin: 2rem 0;">

<a id="refleksion"></a>

## Refleksion · 10 min

Tal med sidemanden, og tag svarene med i den fælles opsamling:

- Hvad kunne agenten se i Figma, og hvad skulle du fortælle den?
- Hvilke fejl ville du ikke have opdaget, hvis du ikke havde bygget komponenten selv først?
- Hvornår var agenten hurtigst, og hvornår tog det længere tid at rette end at skrive selv?
- Hvordan kan du navngive og strukturere din Figma-fil, så koden bliver bedre næste gang?

[Slide: Refleksion](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/refleksion)

<hr style="margin: 2rem 0;">

<a id="ekstraopgaver"></a>

## Ekstraopgaver

### Ekstra 1: En ny variant

Tilføj en ny variant-property til din pill i Figma, fx `Size` med `Small` og `Medium`. Lav de variables, den kræver, fx `btn-height/sm`. Byg den i koden, enten selv eller med agenten:

- `Size` bliver til prop'en `size`, der vælger en klasse, præcis som `type`.
- Flyt `height` og `font-size` fra `.pill` til `.sm` og `.md`.
- Giv `size` standardværdien `"md"`, så dine eksisterende pills ikke ændrer sig.

<details>
<summary><strong>Se løsningen til ekstra 1</strong></summary>

`components/Pill.js`:

```jsx
export default function Pill({ type = "primary", size = "md", onClick, children }) {
  return (
    <button type="button" className={`${styles.pill} ${styles[type]} ${styles[size]}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

`components/Pill.module.css` – `height` og `font-size` er flyttet fra `.pill`:

```css
/* Size=Small and Size=Medium -> one class per size */
.sm {
  height: var(--btn-height-sm);
  font-size: var(--font-size-sm);
}

.md {
  height: var(--btn-height-md);
  font-size: var(--font-size-md);
}
```

`app/globals.css`:

```css
--btn-height-sm: 36px;
```

Send også `size` videre fra `PillModal` til `Pill`.

</details>

**Starterrepo:** [Ekstra 1: Size-variant](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/46ae0de)

### Ekstra 2: Flere pills fra et array

Lav et array med indholdet til flere pills, fx fire UX-love, og vis dem med `map`. Hver `PillModal` har sin egen state, så hver pill åbner sin egen modal.

<details>
<summary><strong>Se løsningen til ekstra 2</strong></summary>

`app/page.js`:

```jsx
import PillModal from "@/components/PillModal";
import styles from "./page.module.css";

// One object per pill. Each PillModal has its own state, so each pill opens its own modal.
const laws = [
  {
    title: "Hick's Law",
    text: "Jo flere valgmuligheder, jo længere tid tager det at vælge.",
    type: "primary"
  },
  {
    title: "Fitts's Law",
    text: "Jo større og tættere et mål er, jo hurtigere er det at ramme.",
    type: "secondary",
    showSeparator: false
  },
  {
    title: "Jakob's Law",
    text: "Brugerne forventer, at dit site virker som de sites, de allerede kender.",
    type: "primary"
  },
  {
    title: "Miller's Law",
    text: "Vi kan kun holde omkring 7 (± 2) ting i arbejdshukommelsen ad gangen.",
    type: "secondary",
    size: "sm"
  }
];

export default function Home() {
  return (
    <main className={styles.page}>
      <h1>Components</h1>
      <div className={styles.pills}>
        {laws.map((law) => (
          <PillModal
            key={law.title}
            type={law.type}
            size={law.size}
            label={law.title}
            title={law.title}
            text={law.text}
            showSeparator={law.showSeparator}
          />
        ))}
      </div>
    </main>
  );
}
```

</details>

**Starterrepo:** [Ekstra 2: Pills fra et array](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/ca446bb)

[Slide: Ekstraopgaver](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/ekstra)

<hr style="margin: 2rem 0;">

<a id="tool-guide"></a>

## Tool-guide

<a id="dev-mode"></a>

### Dev Mode: variables, properties og CSS

Dev Mode kræver et Full- eller Dev-seat, og det har du på Education-planen. Filen skal ligge i dit Education-team.

- **Skift til Dev Mode** med knappen i toolbaren eller <kbd>Shift</kbd> + <kbd>D</kbd>. Samme genvej skifter tilbage.
- **Properties:** Vælg dit component set eller en instance. Øverst i _Inspect_-panelet står variants og component properties, fx `Type`, `State` og `showSeparator`.
- **CSS:** Vælg et lag. _Inspect_-panelet viser CSS for laget. Er en værdi en variable, står variablens navn i CSS'en med værdien som fallback. Brug dit eget token-navn fra `globals.css` i stedet.
- **Variables på et lag:** _Inspect_-panelet viser de styles og variables, laget bruger.
- **Alle variables:** Gå til Design-tilstand, klik på et tomt sted på canvas, og åbn **Local variables**.
- **Prototype:** Find varighed og easing for Smart Animate under **Prototype** i Design-tilstand.

[Slide: Dev Mode](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/dev-mode)

<a id="opsaetning"></a>

### Opsætning af Figma MCP

Du bruger Figma's **remote MCP-server** på `https://mcp.figma.com/mcp`. Den kræver ikke Figma-appen. Første gang logger du ind med din Figma-konto i browseren og klikker **Allow access**. Vælg den agent, du plejer at bruge.

**Claude Code**

Installér Figma-pluginnet i terminalen, og genstart Claude Code:

```bash
claude plugin install figma@claude-plugins-official
```

Skriv `/plugin` i Claude Code, vælg fanen **Installed**, vælg `figma`, og tryk <kbd>Enter</kbd> for at logge ind. Skriv `/plugin` igen, og tjek, at `figma` står som forbundet.

Virker pluginnet ikke, så tilføj serveren manuelt, start en ny session, skriv `/mcp`, vælg **figma** og **Authenticate**:

```bash
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
```

**Codex**

I Codex-appen: Klik **Plugins** øverst til venstre, klik **+** ved Figma og **Install Figma**, og giv adgang med **Allow access**.

I Codex CLI eller Codex i VS Code: Kør kommandoen, og log ind, når du bliver bedt om det:

```bash
codex mcp add figma --url https://mcp.figma.com/mcp
```

**GitHub Copilot i VS Code**

Åbn kommandopaletten (<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> eller <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>), og vælg **MCP: Open User Configuration**. Indsæt serveren i `mcp.json`, og gem:

```json
{
  "inputs": [],
  "servers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "type": "http"
    }
  }
}
```

Klik **Start** over `figma` i filen, og giv adgang med **Allow access**. Brug **Agent**-tilstand i Copilot Chat, ellers kan Copilot ikke bruge MCP-værktøjerne.

**Cursor**

Åbn chatten, skriv `/add-plugin figma`, og klik **Add Plugin**. Åbn derefter **Cursor Settings** → **Tools & MCP**, klik **Connect** ved Figma, og giv adgang med **Allow access**.

Virker pluginnet ikke, så tilføj en custom MCP-server under **Tools & MCP** med denne konfiguration, og klik **Connect**:

```json
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

Kilde: [Figma: Remote server installation](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/), tjekket 28. oktober 2026.

[Slide: Opsætning](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opsaetning)

<a id="whoami"></a>

### Seat og grænser: `whoami`

Bed agenten: _Kør whoami fra Figma MCP._ Svaret viser din e-mail, dine planer og dit seat på hver plan. `whoami` tæller ikke med i grænserne.

| Plan og seat                                 | Grænse for kald, der læser fra Figma |
| -------------------------------------------- | ------------------------------------ |
| Education                                    | 200 pr. dag og 10 pr. minut          |
| Starter, eller View- og Collab-seat          | 20 pr. måned                         |

Kilde: [Figma: Rate limits & access](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/), tjekket 28. oktober 2026. Figma kan ændre grænserne.

[Slide: whoami og grænser](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/whoami)

<a id="plan-b"></a>

### Plan B: Når MCP ikke virker

- **Makkerprogrammering:** Sæt dig sammen med en, hvis MCP virker. Skriv prompten sammen, og gennemgå koden sammen.
- **Screenshot plus CSS fra Dev Mode:** Tag et screenshot af din pill og din modal, kopiér CSS'en fra Dev Mode, og indsæt begge dele i agentens chat sammen med prompten. Agenten kan så ikke selv læse variables og properties, så skriv dem med i prompten.

[Slide: whoami og grænser](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/whoami)

<a id="prompt-2a"></a>

### Prompt til 2a

```text
Byg komponenterne Pill og Modal fra mit Figma-design: <indsæt dit link>

Brug Figma MCP-serveren til at læse designet, dets variables og component properties.

Projektet er Next.js med App Router og JavaScript. Følg disse regler:
- Skriv JavaScript, ikke TypeScript.
- Læg de nye filer i components/agent/, og vis komponenterne på en ny side i app/agent/page.js. Rør ikke de andre filer i components/.
- Brug CSS Modules og de tokens, der allerede ligger i app/globals.css. Ingen Tailwind, inline styles eller hardcodede værdier, hvor der findes et token.
- Pillen er en <button type="button">. Prop'en type vælger Primary eller Secondary. Hover og fokus laves med :hover og :focus-visible i CSS.
- Modalen er en <dialog>, der åbnes med showModal(), så fokus og Esc virker. Klik udenfor lukker den. Prop'en showSeparator viser eller skjuler separatoren.
- Et klik på pillen åbner modalen. Brug kun "use client" i de komponenter, der har brug for state eller effects.
- Smart Animate bliver til en CSS transition.

Forklar kort bagefter, hvilke filer du har lavet, og hvilke tokens du har brugt.
```

<a id="prompt-2b"></a>

### Prompt til 2b

```text
Jeg har rettet designet i Figma: <indsæt dit link>

Opdatér de eksisterende komponenter i components/Pill.js, components/Modal.js og deres CSS Modules, så de matcher det rettede design. Byg ikke nye komponenter, og rør ikke components/agent/.
- Har en variable fået en ny værdi, så ret token'et i app/globals.css.
- Er der kommet en ny variable, så tilføj den som token i app/globals.css med samme navngivning som de andre.
- Behold JavaScript, CSS Modules, <button> og <dialog>.
- Lav kun de ændringer, designet kræver, og forklar kort hver ændring bagefter.
```

[Slide: Prompten til 2a](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/prompt-2a) · [Slide: Prompten til 2b](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/prompt-2b)

<hr style="margin: 2rem 0;">

## Når du er færdig

- Commit og push dit arbejde.
- Sammenlign din løsning med branchen [`solution`](https://github.com/cederdorff/nextjs-figma-pill-modal/commits/solution) i starterrepoet.
- Gem dine noter fra 2.3 og refleksionen. De er gode at have med, når I skal bygge komponenter fra jeres eget design i gruppeprojektet.

<hr style="margin: 2rem 0;">

## Materialer

- [Slides: Fra Figma til React/Next.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/)
- [Undervisningsside: Fra Figma til React/Next.js](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/race-09-2026-10-29-fra-figma-til-react-nextjs.md)
- [Starterrepo: nextjs-figma-pill-modal](https://github.com/cederdorff/nextjs-figma-pill-modal) – [commits på `solution`](https://github.com/cederdorff/nextjs-figma-pill-modal/commits/solution) følger trinnene
- [Demofil i Figma](https://www.figma.com/design/XTTxNnZjIIWPGyvq6Ya5Wj/Figma-%C3%98velse-IXD---Figma--%3E-React?node-id=9-61&m=dev)
- [Figma: Guide to Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)
- [Figma: Guide to the Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- [Figma: Remote server installation](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)
- [Figma: Rate limits & access](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)
- [React: Passing props to a component](https://react.dev/learn/passing-props-to-a-component)
- [React: Conditional rendering](https://react.dev/learn/conditional-rendering)
- [React: State: a component's memory](https://react.dev/learn/state-a-components-memory)
- [MDN: The dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
- [MDN: @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)
