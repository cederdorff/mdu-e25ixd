# Opgave: Fra Figma til React/Next.js - 29-10-2026

## Formål

Du bygger den pill og den modal, du har designet i Figma med NKKR, som React-komponenter i Next.js. Du bygger dem to gange:

- **Rul 1:** Du oversætter selv designet til kode med Dev Mode. Du starter med den simpleste version, der virker, og bygger designet ovenpå trin for trin.
- **Rul 2:** En AI-agent læser designet gennem Figma MCP-serveren. Du arbejder i små iterationer, validerer hvert resultat og retter med præcise prompts.

Rul 1 giver dig den forståelse, du skal bruge for at vurdere agentens kode i rul 2.

Opgaverne er de samme som i slides, men med mere hjælp. Hvert trin linker til det slide, det bygger på. Under rul 1 kan du folde den fulde løsning ud. Koden er den samme som på branchen `solution` i [starterrepoet](https://github.com/cederdorff/nextjs-figma-pill-modal/tree/solution), hvor hvert trin har sit eget commit.

<hr style="margin: 2rem 0;">

## Sådan bruger du opgaven

- Hvert trin bygger på det forrige og slutter med **Tjek**. Når tjekket passer, har du en version, der virker. Commit den.
- Sidder du fast i rul 1, så fold løsningen ud, og skriv den af. Det vigtigste er, at du når rul 2 med en komponent, du forstår.
- Dine navne og værdier kommer fra din egen Figma-fil og ser lidt anderledes ud end i eksemplerne. Eksemplerne bruger [demofilen](https://www.figma.com/design/XTTxNnZjIIWPGyvq6Ya5Wj/Figma-%C3%98velse-IXD---Figma--%3E-React?node-id=9-61&m=dev).
- Commit og push med Source Control i VS Code eller GitHub Desktop.
- Kode og kommentarer i repoet er på engelsk. Dine tekster må gerne være på dansk.

<hr style="margin: 2rem 0;">

## Oversigt

1. [Før du starter](#før-du-starter): Starteren kører, og din Figma-fil ligger i dit Education-team.
2. [Rul 1: Den simpleste version først](#rul-1) – trin 1.1–1.5
3. [Rul 2: Byg igen med Figma MCP – i iterationer](#rul-2) – trin 2.1–2.3
4. [Refleksion](#refleksion)
5. [Ekstraopgaver](#ekstraopgaver): en ny variant, pills fra et array, fold ud fra pillen og fra kode til Figma

Hvordan Figma-begreberne bliver til kode, står samlet i [Fra Figma til kode](#fra-figma-til-kode). Opsætning af Figma MCP, adgang til designet og alle prompts står i [tool-guiden](#tool-guide).

<hr style="margin: 2rem 0;">

<a id="fra-figma-til-kode"></a>

## Fra Figma til kode

Brug tabellerne som opslag under rul 1, og når du validerer agentens kode i rul 2. Eksemplerne er fra demofilen.

### Komponenter og instances

| Figma                          | React og Next.js                                         | Eksempel                                            |
| ------------------------------ | -------------------------------------------------------- | --------------------------------------------------- |
| Component set eller component  | En funktion i sin egen fil i `components/` med en CSS Module | `Pill.js` og `Pill.module.css`                  |
| Instance                       | Komponenten brugt i JSX                                  | `<Pill />`                                          |
| Overrides på en instance       | Værdierne til props                                      | `<Pill type="secondary">Fitts's Law</Pill>`         |
| Nested instance                | En komponent inde i en anden komponent                   | En `<Pill>` som lukkeknap inde i `Modal`            |
| Lagnavne                       | HTML-elementer og klassenavne                            | Laget _Separator_ → `<hr className={styles.separator} />` |
| Frame'en med dine komponenter  | En side i `app/`                                         | `app/page.js`                                       |

### Variables bliver til tokens

| Variable-type | Figma                                  | `app/globals.css`                                        |
| ------------- | -------------------------------------- | -------------------------------------------------------- |
| Color         | `Color/Primary` = `#ff3d8b`            | `--color-primary: #ff3d8b;`                              |
| Number        | `Paddings/lg` = `36`                   | `--paddings-lg: 36px;`                                   |
| String        | `font-weight/semi-bold` = `Semi Bold`  | `--font-weight-semi-bold: 600;`                          |
| String        | `font-family/primary` = `Inter`        | `--font-family-primary: var(--font-inter), sans-serif;`  |

- **Navnet:** Små bogstaver, og `/` og mellemrum bliver til `-`. Gruppen i Figma bliver starten af navnet.
- **Brug:** Skriv `var(--color-primary)` i CSS'en. Ret værdien ét sted, og alle komponenter følger med – ligesom i Figma.
- **Værdier uden variable,** fx skyggen på modalen, skriver du direkte i CSS'en. Går en værdi igen flere steder, så lav den til et token.

### Properties bliver til props

| Figma-property | Prop i React                              | Eksempel                                                  |
| -------------- | ----------------------------------------- | --------------------------------------------------------- |
| Variant        | En string, der vælger en klasse           | `type="primary"` → `styles.primary`                       |
| Boolean        | `true` eller `false` og betinget rendering | `{showSeparator && <hr />}`                              |
| Text           | En string eller `children`                | `title="Hick's Law"` eller `<Pill>Hick's Law</Pill>`      |
| Instance swap  | Et element som prop                       | `icon={<ArrowIcon />}`                                    |

Navnene følger med. Hedder din property `showSeparator` i Figma, så hedder prop'en det samme i koden.

### Prop, state eller CSS?

Ikke alle variants bliver til props. Spørg: **Hvem bestemmer værdien?**

| Hvem bestemmer?                                   | Bliver til                | Eksempel fra i dag                                    |
| ------------------------------------------------- | ------------------------- | ----------------------------------------------------- |
| Den, der bruger komponenten                       | **Prop**                  | `Type`, `showSeparator` og teksterne                  |
| Browseren, mens brugeren bruger mus eller tastatur | **CSS**                  | `State=Hover` → `:hover` og `:focus-visible`          |
| Komponenten, der skal huske noget over tid        | **State** med `useState`  | Modalen er åben eller lukket → `isOpen`               |

### Auto layout bliver til flexbox

| Auto layout       | CSS                                                              |
| ----------------- | ---------------------------------------------------------------- |
| Direction         | `display: flex` og `flex-direction: column` eller `row`          |
| Gap               | `gap`                                                            |
| Padding           | `padding`                                                        |
| Alignment         | `align-items` og `justify-content`                               |
| Hug contents      | Ingen bredde. Indholdet bestemmer, fx `display: inline-flex` på pillen |
| Fill container    | `flex: 1` i forælderens retning eller `align-self: stretch` på tværs |
| Fixed             | `width` eller `height` – gerne med `max-width`, så det passer på en mobil |
| Absolute position | `position: absolute`. Brug det kun, når noget skal ligge oven på noget andet |

### Prototype bliver til state og CSS

| Prototype                            | Kode                                                                         |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| While hovering                       | `:hover` i CSS                                                               |
| On click → Open overlay              | `onClick` sætter `isOpen` med `useState`, og `<dialog>` åbnes med `showModal()` |
| Close when clicking outside          | Et klik på backdroppen kalder `onClose`. <kbd>Esc</kbd> virker af sig selv    |
| Smart Animate, fx _Ease out, 300ms_  | `transition: opacity 300ms ease-out`                                         |
| Open overlay, der vokser ud af pillen | En transition, der starter dér, hvor pillen er. Se [ekstra 3a](#ekstra-3a) |
| Change to en anden variant på stedet, fx _Closed_ → _Open_ | `isOpen` og View Transitions API. Se [ekstra 3b](#ekstra-3b) |

[Slide: Fra Figma-begreb til kode](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/mapping) · [Slide: Prop, state eller CSS?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/prop-state-css) · [Slide: Interaktionen](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/mapping-interaktion)

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

Starteren har en tom `Pill` og en tom `Modal`. Kommentarerne i filerne fortæller, i hvilket trin du bygger hvad:

| Fil                        | Fra Figma                              | Trin |
| -------------------------- | -------------------------------------- | ---- |
| `components/Pill.js`       | Component set'et `Pill`                | 1.1  |
| `components/Modal.js`      | Komponenten `Modal`                    | 1.1  |
| `components/PillModal.js`  | Prototypen – den opretter du selv      | 1.2  |
| `app/globals.css`          | Dine variables som tokens              | 1.3  |
| `*.module.css`             | Auto layout og styling                 | 1.3  |
| `app/page.js`              | Siden, der viser komponenterne         |      |

**Tjek:** Browseren viser overskriften _Components_ og en knap med teksten _Pill_.

[Slide: Hent starteren](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/starter) · [Slide: Her havner Figma i koden](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/starter-filer)

<hr style="margin: 2rem 0;">

<a id="rul-1"></a>

## Rul 1: Den simpleste version først

Du oversætter selv designet. Først får du pill og modal til at virke sammen uden design. Derefter bygger du designet ovenpå. Hvert trin virker for sig, så du altid har en version, du kan committe.

| Trin | Du bygger                 | Fra Figma                                 |
| ---- | ------------------------- | ----------------------------------------- |
| 1.1  | `Pill` og `Modal`         | Component set'et og komponenten           |
| 1.2  | `PillModal`               | Prototypen: Klik på pillen åbner modalen  |
| 1.3  | Tokens og CSS             | Variables og auto layout fra Dev Mode     |
| 1.4  | Variants og properties    | `Type`, `State` og `showSeparator`        |
| 1.5  | Animation                 | Smart Animate                             |

**Du er klar, når:** Et klik på pillen åbner modalen med en animation, <kbd>Esc</kbd> og klik udenfor lukker den, alle værdier kommer fra tokens i `globals.css`, og arbejdet er pushet.

[Slide: Hvert trin virker for sig](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/trin)

### 1.1 Byg Pill og Modal

Gør de tomme komponenter i starteren til to små komponenter, der virker. Design kommer i 1.3.

**`Pill`** er en `<button>`. Teksten i pillen bliver til `children`, og `onClick` kommer fra den komponent, der bruger pillen. `type="button"` fortæller browseren, at knappen ikke sender en formular.

```jsx
export default function Pill({ onClick, children }) {
  return (
    <button type="button" className={styles.pill} onClick={onClick}>
      {children}
    </button>
  );
}
```

**`Modal`** er en `<dialog>`. Når du åbner den med `showModal()`, får du gratis fokus i modalen, lukning med <kbd>Esc</kbd> og en backdrop bag den. `open`-attributten alene giver ingen af delene. Derfor bruger `Modal` en `ref` til at kalde `showModal()` og `close()`, når prop'en `isOpen` skifter. `onClose` kører, når modalen lukker, også med <kbd>Esc</kbd>.

```jsx
"use client";

import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

export default function Modal({ isOpen, onClose, title, text }) {
  const dialogRef = useRef(null);

  // showModal() gives focus handling, Esc and a backdrop. The open attribute alone does not.
  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className={styles.modal} aria-label={title} onClose={onClose}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
    </dialog>
  );
}
```

Vis pillen i `app/page.js` med `<Pill>Primary</Pill>`. Vil du se modalen allerede nu, så giv den `isOpen` et øjeblik, og fjern det igen bagefter:

```jsx
<Modal isOpen title="Hick's Law" text="Jo flere valgmuligheder, jo længere tid tager det at vælge." />
```

**Tjek:** Pillen viser din tekst. Med `isOpen` åbner modalen, når siden loader, og <kbd>Esc</kbd> lukker den.

[Slide: En button og en dialog](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/komponenter) · [Slide: Opgave 1.1](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-1-1)

### 1.2 Sæt dem sammen i PillModal

I Figma åbner pillen modalen i prototypen. I React bliver det til en tredje komponent, der sætter `Pill` og `Modal` sammen og husker, om modalen er åben. At bygge en større komponent af mindre kaldes komposition. Det svarer til en instance inde i en anden i Figma.

Opret `components/PillModal.js`. Den bruger `useState`, så den skal have `"use client"` øverst:

```jsx
"use client";

import { useState } from "react";
import Modal from "./Modal";
import Pill from "./Pill";

export default function PillModal({ label, title, text }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Pill onClick={() => setIsOpen(true)}>{label}</Pill>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} text={text} />
    </>
  );
}
```

- **State husker:** `isOpen` er `true` eller `false`. Et klik på pillen sætter den til `true`.
- **`onClose` nulstiller:** Når modalen lukker, fx med <kbd>Esc</kbd>, sætter `onClose` den tilbage til `false`. Ellers tror state, at modalen stadig er åben, og den åbner ikke igen.
- **Props ned, events op:** `PillModal` giver `Pill` en `onClick` og `Modal` en `isOpen`. `Modal` siger til med `onClose`.

Brug `PillModal` i `app/page.js` i stedet for `Pill` og `Modal`:

```jsx
<PillModal
  label="Hick's Law"
  title="Hick's Law"
  text="Jo flere valgmuligheder, jo længere tid tager det at vælge."
/>
<PillModal
  label="Fitts's Law"
  title="Fitts's Law"
  text="Jo større og tættere et mål er, jo hurtigere er det at ramme."
/>
```

**Hvorfor `"use client"` lige dér?** I Next.js er alle komponenter server components, medmindre du skriver `"use client"` øverst. En server component kører kun på serveren, og browseren får færdig HTML. Det kender du fra 26. oktober. `"use client"` er en grænse: Komponenten og alt, den importerer, sendes også som JavaScript til browseren, så den kan huske state og reagere på klik. Sæt derfor kun grænsen dér, hvor der er state, effects eller events:

| Komponent      | `"use client"`? | Hvorfor                                                                   |
| -------------- | --------------- | ------------------------------------------------------------------------- |
| `app/page.js`  | Nej             | Den viser bare komponenterne og forbliver en server component             |
| `PillModal`    | Ja              | `useState` og `onClick`                                                   |
| `Modal`        | Ja              | `useEffect` og `ref`. I 1.1 importerer `page.js` den direkte              |
| `Pill`         | Nej             | Ingen state. Den kører i browseren, fordi `PillModal` importerer den      |

I morgen møder du server og client igen, når Supabase skal bruges begge steder.

**Tjek:** Et klik på pillen åbner modalen, <kbd>Esc</kbd> lukker den, og fokus kommer tilbage til pillen. Nu har du den simpleste `PillModal`, der virker. Commit.

[Slide: PillModal sætter dem sammen](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/pillmodal) · [Slide: Hvorfor use client?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/use-client) · [Slide: Opgave 1.2](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-1-2)

### 1.3 Tokens og CSS fra Dev Mode

Nu skal `PillModal` ligne dit design. Hav Figma i Dev Mode ved siden af VS Code, og find værdierne i _Inspect_-panelet. Se [Dev Mode i tool-guiden](#dev-mode).

**Tokens.** Dine Figma-variables bliver til custom properties i `:root` i `app/globals.css`. Så kan du bruge dem i alle komponenter med `var()`, ligesom du bruger variables i Figma. Find dem under **Local variables**: Gå til Design-tilstand, klik på et tomt sted på canvas, og åbn **Local variables** i panelet til højre.

| Figma                               | `globals.css`                            |
| ----------------------------------- | ---------------------------------------- |
| `Color/Neutral/Grey 900` = `#16161a` | `--color-neutral-grey-900: #16161a;`     |
| `Paddings/lg` = `36`                | `--paddings-lg: 36px;`                   |
| `font-weight/semi-bold` = `Semi Bold` | `--font-weight-semi-bold: 600;`        |

- **Navne:** Små bogstaver. `/` og mellemrum bliver til `-`.
- **Tal:** Number-variables får `px`.
- **Font weight:** `Regular` er `400`, `Medium` er `500`, `Semi Bold` er `600` og `Bold` er `700`.
- **Font:** Fonten indlæses i `app/layout.js` med `next/font`. Bruger dit design en anden font end Inter, så skift den dér, og behold `--font-family-primary` i `globals.css`.

Brug to af dine tokens på `body`, så du kan se, at de virker: `color: var(--color-neutral-grey-900);` og `background: var(--color-neutral-white);`.

**CSS.** Skriv CSS'en i `components/Pill.module.css` og `components/Modal.module.css`. Auto layout bliver til flexbox, og alle værdier, der er en variable i Figma, skal bruge dit token. Værdier uden variable, fx skyggen på modalen, skriver du direkte.

- **`.pill`:** `display: inline-flex`, højde, padding, kant, radius og font. Tilføj `font-family: inherit`, fordi en `<button>` ikke arver fonten af sig selv.
- **`.modal`** er selve `<dialog>`: bredde, baggrund, radius og skygge. Figma siger `500px`. Tilføj `max-width: calc(100% - 32px)`, så modalen også passer på en mobil.
- **`.content`** er auto layout fra Figma: `flex-direction: column`, `gap` og `padding`.

**Klik udenfor.** Et klik på backdroppen rammer selve `<dialog>`, mens et klik på indholdet rammer elementerne inde i den. Læg derfor indholdet i en `<div>`, sæt `padding: 0` på `.modal` og padding på `.content`, og luk kun, når klikket rammer `<dialog>` selv:

```jsx
// A click on the backdrop hits the dialog itself. A click on the content hits the elements inside it.
function handleClick(event) {
  if (event.target === event.currentTarget) {
    onClose();
  }
}

return (
  <dialog ref={dialogRef} className={styles.modal} aria-label={title} onClose={onClose} onClick={handleClick}>
    <div className={styles.content}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
    </div>
  </dialog>
);
```

**Tjek:** Pill og modal ligner Figma, og overskriften har farven fra din variable. Inspicér `<html>` i DevTools, og find dine tokens under `:root`. Klik udenfor lukker modalen, men et klik inde i den gør ikke.

[Slide: Dev Mode](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/dev-mode) · [Slide: Tokens](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/tokens) · [Slide: CSS Modules](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/css) · [Slide: Opgave 1.3](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-1-3)

### 1.4 Variants og properties

Din pill er et component set med to variant-properties, og din modal har en boolean-property. De bliver til tre forskellige ting i koden, fordi det er tre forskellige, der bestemmer værdien (se [Prop, state eller CSS?](#prop-state-eller-css)):

- **`Type` (Primary/Secondary)** er et valg, når pillen bruges. Den bliver til prop'en `type`, der vælger en klasse i CSS'en: `type="primary"` giver klassen `.primary`.
- **`State` (Default/Hover)** sker af sig selv, når brugeren holder musen over. Den bliver ikke til en prop, men til `:hover` og `:focus-visible` i CSS'en, så hover-stilen også virker med tastaturet.
- **`showSeparator`** bliver til en prop med `true` eller `false`. Separatoren vises kun, når den er `true`.

Pas på med navnet: Prop'en `type` er din egen. Den er ikke det samme som `type="button"` på selve `<button>`.

```jsx
export default function Pill({ type = "primary", onClick, children }) {
  return (
    <button type="button" className={`${styles.pill} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

```css
/* Type=Primary -> one class per type. State=Hover -> :hover and :focus-visible */
.primary {
  color: var(--color-primary);
}

.primary:hover,
.primary:focus-visible {
  border-color: var(--color-primary);
}
```

I `Modal` får `showSeparator` standardværdien `true`, ligesom i Figma:

```jsx
export default function Modal({ isOpen, onClose, title, text, showSeparator = true }) {
  // ...
  {showSeparator && <hr className={styles.separator} />}
```

Send `type` og `showSeparator` videre fra `PillModal`, og prøv dem i `app/page.js`:

```jsx
<PillModal type="primary" label="Hick's Law" title="Hick's Law" text="…" />
<PillModal type="secondary" label="Fitts's Law" title="Fitts's Law" text="…" showSeparator={false} />
```

**Tjek:** Begge typer ligner Figma. Hold musen over dem, og tryk <kbd>Tab</kbd>: Hover-stilen og en fokusring er synlige. Separatoren forsvinder, når `showSeparator` er `false`.

[Slide: Prop, state eller CSS?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/prop-state-css) · [Slide: Variants og properties](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/variants) · [Slide: Opgave 1.4](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-1-4)

### 1.5 Smart Animate, tastatur og commit

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

- **Error: useState/useEffect only works in Client Components?** Tilføj `"use client"` øverst i `PillModal.js` og `Modal.js`.
- **Cannot read properties of null (reading 'showModal')?** Tjek, at `ref={dialogRef}` står på `<dialog>`.
- **Modalen åbner kun første gang?** `onClose` skal sætte `isOpen` tilbage til `false`.
- **Ingen farver eller afstande?** Tjek stavningen: `var(--color-primary)` skal matche navnet i `globals.css` præcist, også bindestreger.
- **Modalen lukker, når du klikker inde i den?** Læg indholdet i `<div className={styles.content}>`, og flyt `padding` fra `.modal` til `.content`.
- **Pillen har en anden font?** Tilføj `font-family: inherit` på `.pill`.
- **`styles[type]` virker ikke?** Klassen i CSS'en skal hedde det samme som værdien, fx `.primary` til `type="primary"`.
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

// Figma: the prototype interaction. PillModal puts Pill and Modal together,
// and its state remembers if the modal is open.
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

**Starterrepo:** [1.1 Pill og Modal](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/e0dffad) · [1.2 PillModal](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/7fbde98) · [1.3 Tokens og CSS](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/edef78e) · [1.4 Variants og properties](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/6fcc24c) · [1.5 Transition](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/7be4bc9)

<hr style="margin: 2rem 0;">

<a id="rul-2"></a>

## Rul 2: Byg igen med Figma MCP – i iterationer

Nu bygger du den samme komponent igen, men en AI-agent skriver koden. Agenten læser din Figma-fil gennem Figma MCP-serveren: lag, variables, component properties og et screenshot. Det, den ikke kan se, skal stå i din prompt. Det gælder dit projekts regler, semantik og tilgængelighed.

Du arbejder i små iterationer, ligesom i rul 1:

1. **Prompt:** Én ting ad gangen, med et link til noden i Figma.
2. **Kør:** Se resultatet på `/agent` ved siden af din egen version på `/`.
3. **Validér:** Sammenlign med Figma og din egen kode, test med tastaturet, og brug [tjeklisten](#tjeklisten).
4. **Ret eller commit:** Er noget forkert, så skriv en præcis rettelse, og tag en runde mere. Er det rigtigt, så commit, og gå videre til næste ting.

Agenten bygger i samme rækkefølge som du: `Pill` → `Modal` → `PillModal`. Figma MCP virker også den anden vej, så agenten kan skrive til din Figma-fil. Det prøver du i [ekstra 4](#ekstra-4-fra-kode-til-figma).

**Du er klar, når:** Agentens `PillModal` kører på `/agent` og er valideret og committet, og din egen komponent er opdateret efter en ændring i Figma.

[Slide: Sådan virker Figma MCP](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/mcp) · [Slide: Den iterative model](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/iterationer)

### 2.1 Forbind din agent, og få adgang til designet

1. **Opsæt Figma MCP** i din extension i VS Code: GitHub Copilot, Codex eller Claude Code. Følg [opsætningen i tool-guiden](#opsaetning). Har du et andet setup, der kan bruge MCP, er det også fint.
2. **Giv adgang til designet:** Filen skal ligge i dit Education-team, og du skal logge ind med den Figma-konto, der har adgang til den. Se [Adgang til designkonteksten](#adgang).
3. **Tjek med `whoami`:** Bed agenten: _Kør whoami fra Figma MCP._ Svaret viser din e-mail, din plan og dit seat.

**Tjek:** `whoami` viser din skole-e-mail og Education-planen.

[Slide: Adgang til designet](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/adgang) · [Slide: Opsætning](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opsaetning) · [Slide: Opgave 2.1](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-2-1)

### 2.2 Byg komponenten igen i iterationer

Agenten lægger sine filer i `components/agent/` og viser dem på `/agent`, så din egen version får lov at være i fred.

1. **Regler:** Start en ny chat, og send [de faste regler](#prompt-regler) først. De gælder hele chatten, så du ikke skal gentage dem.
2. **Iteration 1 – `Pill`:** Højreklik på dit component set `Pill` i Figma, og vælg **Copy link to selection**. Send [prompten til Pill](#prompt-pill) med dit link. Validér med tjeklisten, og ret med [en præcis rettelse](#prompt-ret), til pillen er rigtig.
3. **Iteration 2 – `Modal` og `PillModal`:** Kopiér et link til din `Modal`, og send [prompten til Modal og PillModal](#prompt-modal). Validér igen.
4. **Commit agentens version for sig,** fx med beskeden _Add the agent's version_. Så viser diffen i 2.3 kun ændringerne fra 2.3.

<a id="tjeklisten"></a>

**Tjeklisten til hver iteration:**

| Tjek            | Spørgsmål                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| **Sprog**       | Er det JavaScript, eller har agenten skrevet TypeScript, fx `.tsx` og `type PillProps`?                 |
| **Styling**     | Bruger CSS'en dine tokens, eller står der hardcodede værdier, Tailwind-klasser eller `style={{ }}`?     |
| **Semantik**    | Er pillen en `<button>` og modalen en `<dialog>`, eller er det `<div>`s med `onClick`?                 |
| **Tastatur**    | Kan du <kbd>Tab</kbd>'e til pillen, åbne med <kbd>Enter</kbd> og lukke med <kbd>Esc</kbd>? Er fokus synligt? |
| **Hover**       | Er `State=Hover` blevet til `:hover` i CSS, eller til en prop som `state="hover"`?                       |
| **Layout**      | Er auto layout blevet til flexbox, eller er der faste bredder og `position: absolute`?                  |
| **Navne**       | Ligner props og klasser navnene i din Figma-fil?                                                        |
| **Omfang**      | Ændrede agenten kun det, du bad om? Se diffen i Source Control.                                         |

**Tjek:** `/agent` viser agentens `PillModal`, og du har rettet mindst én ting med en præcis prompt. Notér én ting, der blev ens, én ting, du rettede, og én ting, du er i tvivl om.

[Slide: Det skal stå i prompten](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/prompt) · [Slide: Råmaterialet](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/mcp-output) · [Slide: Tjeklisten](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/valider) · [Slide: Opgave 2.2](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-2-2)

### 2.3 Ret i Figma, og opdatér koden

Designet ændrer sig. Det er også en iteration, men nu skal agenten rette din håndkodede komponent i stedet for at bygge en ny.

1. **Ret designet i Figma:** Giv en variable en ny værdi, fx `Color/Primary` eller `border-radius/md`. Ændr også noget i en komponent, fx en lukkeknap i modalen som en instance af din pill.
2. **Opdatér koden:** Kopiér et link til den frame, du har ændret, og send [prompten til en designændring](#prompt-opdater).
3. **Læs diffen:** Åbn **Source Control** i VS Code eller **Changes** i GitHub Desktop, og klik dig igennem hver ændret fil. Det røde er fjernet, og det grønne er tilføjet.
   - Ændrede agenten kun det, du bad om?
   - Blev en ny variable til et token i `globals.css`, eller står værdien direkte i CSS'en?
   - Er `<button>`, `<dialog>` og tastaturet stadig i orden?
4. **Commit:** Fortryd det, du ikke vil have med (**Discard Changes** på en fil). Commit og push resten.

**Tjek:** Din komponent matcher det rettede design, og du kan forklare hver ændring i dit commit.

<details>
<summary><strong>Se et eksempel på 2.3: en lukkeknap i modalen</strong></summary>

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

**Starterrepo:** [2.3 Eksempel: lukkeknap i modalen](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/d5613c1)

[Slide: Opgave 2.3](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opgave-2-3)

**Sidder du fast?**

- **Agenten kan ikke se Figma MCP?** Genstart agenten eller VS Code efter opsætningen. I Copilot skal du bruge **Agent**-tilstand i chatten.
- **Agenten svarer, at den ikke har adgang til filen?** Tjek med `whoami`, at du er logget ind med den konto, der har adgang til filen, og at linket peger på en node, ikke hele filen.
- **TypeScript, Tailwind eller `state="hover"`?** Henvis til reglerne, og send en præcis rettelse.
- **Byggede agenten en ny komponent i 2.3?** Fortryd med **Discard Changes**, og skriv filnavnene i prompten.
- **Rate limit eller for mange kald?** Kør `whoami`. Står der ikke Education, så ligger filen sandsynligvis i _Drafts_. Flyt den til dit Education-team, og brug [plan B](#plan-b), mens du venter.

<hr style="margin: 2rem 0;">

<a id="refleksion"></a>

## Refleksion

Tal med sidemanden, og tag svarene med i den fælles opsamling:

- Hvad kunne agenten se i Figma, og hvad skulle du fortælle den?
- Hvilke fejl ville du ikke have opdaget, hvis du ikke havde bygget komponenten selv først?
- Hvilken rettelse tog flest iterationer, og hvad manglede i din prompt?
- Figma MCP virker begge veje. Hvem bestemmer, når Figma og koden er uenige, og hvor retter I først?
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

**Starterrepo:** [Ekstra 1: Size-variant](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/e7353f8)

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

**Starterrepo:** [Ekstra 2: Pills fra et array](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/2f81745)

### Ekstra 3: Fold ud fra pillen

Der er flere måder at folde pillen ud på. Vælg den, der passer til din prototype:

|                 | 3a: Som overlay fra pillen                            | 3b: På stedet                                                       |
| --------------- | ----------------------------------------------------- | ------------------------------------------------------------------- |
| **Det sker**    | Modalen vokser ud af pillen og lægger sig oven på siden | Pillen folder sig ud til et kort, hvor den er, og resten flytter sig |
| **I Figma**     | _Open overlay_ med Smart Animate                      | _Change to_ en anden variant, fx _Closed_ → _Open_, med Smart Animate |
| **Siden bag**   | Kan ikke bruges, mens modalen er åben                 | Kan stadig bruges                                                   |
| **Element**     | `<dialog>` med `showModal()`                          | `<button aria-expanded>`. Det er ikke en modal                      |
| **Animation**   | `translate` og `scale` fra pillens position           | View Transitions API                                                |

[Slide: To måder at folde ud](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/fold-ud)

<a id="ekstra-3a"></a>

#### 3a: Som overlay fra pillen

I din prototype kan Smart Animate få modalen til at vokse ud af pillen. I koden er det stadig en transition. Den starter bare dér, hvor pillen er, i stedet for midt på skærmen. Mønstret kaldes også _container transform_.

Det er ikke en ny variant. Pillen og modalen har de samme props og den samme state. Det er kun bevægelsen mellem lukket og åben, der ændrer sig.

1. **Mål pillen:** Giv pillen en `handleOpen(event)` som `onClick` i `PillModal`. `event.currentTarget.getBoundingClientRect()` giver pillens position. Modalen åbner midt på skærmen, så gem afstanden fra skærmens midte til pillens midte i state, fx `origin`.
2. **Giv tallene til CSS:** Send `origin` til `Modal`, og sæt dem som custom properties med `style` på `<dialog>`. Ellers bruger vi ikke `style`, men her kendes værdien først, når brugeren klikker.
3. **Start dér:** I `Modal.module.css` ligger den lukkede modal lille oven på pillen med `translate` og `scale`. Tilføj `translate` til `transition` og til `@starting-style`.
4. **Mindre bevægelse:** Har brugeren bedt om mindre bevægelse (`prefers-reduced-motion`), så lad modalen kun fade.

**Tjek:** Hver pill åbner sin modal ud fra sig selv, og modalen folder sig ind i pillen igen, når den lukker. Firefox lukker stadig uden animation.

[Slide: To måder at folde ud](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/fold-ud) · [Slide: Overlay fra pillen](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/udfold)

<details>
<summary><strong>Se løsningen til ekstra 3a</strong></summary>

`components/PillModal.js` – `handleOpen` måler pillen, før modalen åbner:

```jsx
const [isOpen, setIsOpen] = useState(false);
const [origin, setOrigin] = useState({ x: 0, y: 0 });

// The modal opens in the middle of the screen. Measure how far the pill is from there,
// so the modal can unfold from the pill.
function handleOpen(event) {
  const pill = event.currentTarget.getBoundingClientRect();
  setOrigin({
    x: pill.left + pill.width / 2 - window.innerWidth / 2,
    y: pill.top + pill.height / 2 - window.innerHeight / 2
  });
  setIsOpen(true);
}

return (
  <>
    <Pill type={type} size={size} onClick={handleOpen}>
      {label}
    </Pill>
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      origin={origin}
      title={title}
      text={text}
      showSeparator={showSeparator}
    />
  </>
);
```

`components/Modal.js` – `origin` bliver til to custom properties på `<dialog>`:

```jsx
export default function Modal({ isOpen, onClose, origin = { x: 0, y: 0 }, title, text, showSeparator = true }) {
  const dialogRef = useRef(null);

  // The pill's position as CSS custom properties. Modal.module.css starts the animation there.
  const originStyle = { "--origin-x": `${origin.x}px`, "--origin-y": `${origin.y}px` };

  // ...

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      style={originStyle}
      aria-label={title}
      onClose={onClose}
      onClick={handleClick}
    >
```

`components/Modal.module.css` – erstatter animationen fra 1.5:

```css
/* Smart Animate -> transition. Closed is the state the modal animates from and back to.
   Closed, the modal is small and sits on top of the pill, so it unfolds from there. */
.modal {
  opacity: 0;
  scale: 0.2;
  translate: var(--origin-x) var(--origin-y);
  transition:
    opacity 300ms ease-out,
    scale 300ms ease-out,
    translate 300ms ease-out,
    overlay 300ms ease-out allow-discrete,
    display 300ms ease-out allow-discrete;
}

.modal[open] {
  opacity: 1;
  scale: 1;
  translate: 0 0;
}

/* .modal::backdrop and .modal[open]::backdrop are the same as in 1.5 */

/* Where the animation starts when the modal opens */
@starting-style {
  .modal[open] {
    opacity: 0;
    scale: 0.2;
    translate: var(--origin-x) var(--origin-y);
  }

  .modal[open]::backdrop {
    background: rgb(22 22 26 / 0);
  }
}

/* Less motion for users who have asked for it: the modal only fades */
@media (prefers-reduced-motion: reduce) {
  .modal,
  .modal[open] {
    scale: none;
    translate: none;
  }
}
```

</details>

**Starterrepo:** [Ekstra 3a: Fold modalen ud fra pillen](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/dbb62d8)

<a id="ekstra-3b"></a>

#### 3b: På stedet, så resten flytter sig

Her folder pillen sig ud til et kort, hvor den er, og de andre pills flytter sig og gør plads. I Figma er det en variant: Pillen får fx `State=Closed` og `State=Open`, og prototypen skifter mellem dem med **Change to** og Smart Animate.

I koden er det ikke en modal længere. Resten af siden kan stadig bruges, så der er ingen `<dialog>`, ingen backdrop og ingen lukning med <kbd>Esc</kbd>. Pillen er en knap, der folder indhold ud og ind. Det mønster hedder _disclosure_, og `aria-expanded` fortæller skærmlæsere, om indholdet er foldet ud. Varianten `Open` bliver til state, fordi komponenten selv skal huske den (se [Prop, state eller CSS?](#prop-state-eller-css)).

1. **Ny komponent:** Opret `components/PillDisclosure.js` med `"use client"` og `isOpen` i state. Vis pillen, og vis indholdet fra modalen under den, når `isOpen` er `true`.
2. **`aria-expanded`:** Giv `Pill` `...props`, så du kan sende `aria-expanded={isOpen}` videre til `<button>`.
3. **Kortet:** Giv elementet rundt om pillen og indholdet en klasse med kant, radius, padding og bredde, når det er åbent. Kanten har samme farve som pillens, så det ser ud, som om pillen vokser.
4. **Animation:** Pak ændringen ind i `document.startViewTransition()`. Browseren tager et billede før og efter og animerer imellem dem, også af de pills, der flytter sig. `flushSync` får React til at opdatere siden med det samme, så billedet bagefter er rigtigt.
5. **Navne:** Hvert element, der skal animere for sig, skal have et unikt `view-transition-name`. Lav det med `useId()`, fordi der er flere pills på siden.
6. **Smart Animate:** Sæt varighed og easing på `::view-transition-group(*)` i `app/globals.css`. Det kan ikke ligge i en CSS Module, fordi selektoren ikke har en klasse. Slå animationen fra under `prefers-reduced-motion`.

**Tjek:** Pillen folder sig ud til et kort, hvor den er, og de andre pills glider på plads. Et klik mere folder kortet sammen igen. <kbd>Tab</kbd> og <kbd>Enter</kbd> virker, og fokus bliver på pillen. Browsere uden View Transitions skifter uden animation. Derfor tjekker koden `document.startViewTransition` først.

[Slide: To måder at folde ud](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/fold-ud) · [Slide: Fold ud på stedet](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/paa-stedet)

<details>
<summary><strong>Se løsningen til ekstra 3b</strong></summary>

`components/Pill.js` – andre props, fx `aria-expanded`, sendes videre til `<button>`:

```jsx
export default function Pill({ type = "primary", size = "md", onClick, children, ...props }) {
  return (
    <button type="button" className={`${styles.pill} ${styles[type]} ${styles[size]}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
```

`components/PillDisclosure.js`:

```jsx
"use client";

import { useId, useState } from "react";
import { flushSync } from "react-dom";
import Pill from "./Pill";
import styles from "./PillDisclosure.module.css";

// Figma: the variants Closed and Open with "Change to" and Smart Animate.
// The pill opens where it is and makes room. The rest of the page can still be used,
// so it is not a modal: the pill is a button with aria-expanded, and there is no <dialog>.
export default function PillDisclosure({ type, size, label, text, showSeparator = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  // The View Transitions API takes a picture before and after the change and animates between them.
  // flushSync makes React update the page right away, so the "after" picture is correct.
  function handleClick() {
    if (!document.startViewTransition) {
      setIsOpen(!isOpen);
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => setIsOpen(!isOpen));
    });
  }

  // Each element that should animate on its own needs a unique view-transition-name
  return (
    <div className={`${styles.item} ${isOpen ? styles.open : ""}`} style={{ viewTransitionName: `item${id}` }}>
      <Pill
        type={type}
        size={size}
        onClick={handleClick}
        aria-expanded={isOpen}
        style={{ viewTransitionName: `pill${id}` }}
      >
        {label}
      </Pill>
      {isOpen && (
        <div className={styles.content}>
          {showSeparator && <hr className={styles.separator} />}
          <p className={styles.text}>{text}</p>
        </div>
      )}
    </div>
  );
}
```

`components/PillDisclosure.module.css`:

```css
/* Figma: the variant Open. Closed, the item is only the pill. Open, it becomes a card around the pill.
   align-self keeps the item at the top, so the other pills do not move down when a card opens. */
.item {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  align-items: flex-start;
  gap: var(--gaps-md);
}

/* The card gets the same border as the pill, so the pill looks like it grows into the card */
.open {
  width: 500px;
  max-width: 100%;
  padding: var(--paddings-lg);
  border: 1px solid var(--color-neutral-grey-200);
  border-radius: var(--border-radius-md);
  background: var(--color-neutral-white);
}

/* The same content as in the modal */
.content {
  display: flex;
  flex-direction: column;
  gap: var(--gaps-md);
}

/* .separator and .text are the same as in Modal.module.css */
```

`app/globals.css` – nederst:

```css
/* View transitions (extra 3b): Smart Animate, ease out, 300ms */
::view-transition-group(*) {
  animation-duration: 300ms;
  animation-timing-function: ease-out;
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none;
  }
}
```

`app/page.js` – de samme love, men med `PillDisclosure`:

```jsx
<h2>På stedet</h2>
<div className={styles.pills}>
  {laws.map((law) => (
    <PillDisclosure
      key={law.title}
      type={law.type}
      size={law.size}
      label={law.title}
      text={law.text}
      showSeparator={law.showSeparator}
    />
  ))}
</div>
```

</details>

**Starterrepo:** [Ekstra 3b: Fold ud på stedet](https://github.com/cederdorff/nextjs-figma-pill-modal/commit/c9360ea)

### Ekstra 4: Fra kode til Figma

Figma MCP virker begge veje. Agenten kan også skrive til din Figma-fil, så designet følger med, når du ændrer koden.

1. Ret noget i koden, fx `--border-radius-md` i `app/globals.css` eller hover-farven på pillen.
2. Kopiér et link til din frame i Figma, og send prompten nedenfor til agenten.
3. Tjek i Figma: Har agenten rettet den eksisterende variable og komponent, eller har den lavet nye?

```text
Jeg har ændret designet i koden: <beskriv ændringen, fx --border-radius-md er nu 16px i app/globals.css>

Opdatér mit Figma-design, så det matcher koden: <indsæt dit link>
- Ret den eksisterende variable i stedet for at lave en ny.
- Ret de eksisterende komponenter Pill og Modal. Lav ikke nye komponenter.
- Fortæl bagefter, hvad du har ændret i Figma.
```

Agenten skriver til Figma med værktøjet `use_figma`. Det kræver, at du kan redigere filen, og det virker bedst med Figma's skills, som følger med Figma-pluginnet til din agent. Arbejd gerne i en kopi af din fil. Du kan altid gå tilbage i Figma's versionshistorik.

[Slide: Sådan virker Figma MCP](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/mcp) · [Slide: Ekstraopgaver](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/ekstra)

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

<a id="adgang"></a>

### Adgang til designkonteksten

Agenten kan kun læse det, du giver den adgang til. Fire ting skal være på plads:

1. **Filen ligger i dit Education-team,** ikke i _Drafts_. Så har du Dev Mode og Education-planens grænser for Figma MCP.
2. **Du er logget ind med den rigtige konto.** Første gang åbner browseren. Log ind med den Figma-konto, der har adgang til filen, og klik **Allow access**.
3. **Du giver agenten et link til en node.** Højreklik på dit component set, din komponent eller din frame, og vælg **Copy link to selection**. Linket indeholder et `node-id`, så agenten ved, præcis hvad den skal læse. Link til én komponent ad gangen, ikke til hele filen.
4. **Du tjekker med `whoami`,** at agenten bruger den rigtige konto og plan.

Remote-serveren arbejder ud fra links. Den læser den node, linket peger på, ikke det, du har markeret i Figma. Figma skriver: _"Getting design context and code from files is link-based."_

Kilde: [Figma: Remote server installation](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/), tjekket 29. oktober 2026.

[Slide: Adgang til designet](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/adgang)

<a id="opsaetning"></a>

### Opsætning af Figma MCP i VS Code

Vi bruger VS Code med en AI-extension. Vælg én af de tre nedenfor. Har du allerede et andet setup med en agent, der kan bruge MCP, så brug det, og følg [Figma's guide](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) til din agent.

Alle tre bruger Figma's **remote MCP-server** på `https://mcp.figma.com/mcp`. Den kræver ikke Figma-appen. Første gang logger du ind med din Figma-konto i browseren og klikker **Allow access**.

**GitHub Copilot**

Copilot er indbygget i VS Code.

1. Åbn kommandopaletten (<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> eller <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>), og vælg **MCP: Open User Configuration**.
2. Indsæt serveren i `mcp.json`, og gem:

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

3. Klik **Start** over `figma` i filen, og giv adgang med **Allow access**.
4. Vælg **Agent** i Copilot Chat. Ellers kan Copilot ikke bruge MCP-værktøjerne.

**Codex**

1. Installér Codex-extensionen fra OpenAI i VS Code, og log ind.
2. Klik på tandhjulet i Codex-panelet, og vælg **MCP servers** → **Add server**.
3. Skriv `figma` som navn, vælg **Streamable HTTP**, og indsæt `https://mcp.figma.com/mcp` som URL.
4. Gem, og vælg **Restart extension**. Klik **Authenticate**, når Codex beder dig logge ind.

Codex-extensionen deler opsætning med Codex CLI. Bruger du terminalen, så kør `codex mcp add figma --url https://mcp.figma.com/mcp` og derefter `codex mcp login figma`.

**Claude Code**

1. Installér Claude Code-extensionen fra Anthropic i VS Code, og log ind.
2. Skriv `/plugins` i Claude Code-panelet, og installér `figma` fra den officielle marketplace. Pluginnet indeholder også Figma's skills.
3. Skriv `/mcp`, vælg **figma**, og log ind. Klik **Allow access** i browseren.

Finder du ikke pluginnet, så tilføj serveren i `/mcp`-dialogen med navnet `figma`, typen HTTP og URL'en `https://mcp.figma.com/mcp`. Du kan også køre kommandoen i terminalen i VS Code og derefter logge ind med `/mcp`:

```bash
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
```

Kilder, tjekket 28. oktober 2026: [Figma: Remote server installation](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) · [OpenAI: Codex og MCP](https://learn.chatgpt.com/docs/extend/mcp) · [Claude Code: VS Code](https://code.claude.com/docs/en/vs-code)

[Slide: Opsætning](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/opsaetning)

<a id="whoami"></a>

### Seat og grænser: `whoami`

Bed agenten: _Kør whoami fra Figma MCP._ Svaret viser din e-mail, dine planer og dit seat på hver plan. `whoami` tæller ikke med i grænserne.

| Plan og seat                                 | Grænse for kald, der læser fra Figma |
| -------------------------------------------- | ------------------------------------ |
| Education                                    | 200 pr. dag og 10 pr. minut          |
| Starter, eller View- og Collab-seat          | 20 pr. måned                         |

Værktøjer, der skriver til Figma, og `whoami` tæller ikke med i grænserne.

Kilde: [Figma: Rate limits & access](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/), tjekket 28. oktober 2026. Figma kan ændre grænserne.

[Slide: Adgang til designet](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/adgang)

<a id="plan-b"></a>

### Plan B: Når MCP ikke virker

- **Makkerprogrammering:** Sæt dig sammen med en, hvis MCP virker. Skriv prompten sammen, og gennemgå koden sammen.
- **Screenshot plus CSS fra Dev Mode:** Tag et screenshot af din pill og din modal, kopiér CSS'en fra Dev Mode, og indsæt begge dele i agentens chat sammen med prompten. Agenten kan så ikke selv læse variables og properties, så skriv dem med i prompten.

[Slide: Adgang til designet](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/adgang)

<a id="prompts"></a>

### Prompts

En god prompt fortæller agenten det, den ikke kan se i Figma. Den har fem dele:

| Del                | Hvad                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------- |
| **Reglerne**       | Sprog, styling, semantik og tilgængelighed. Send dem én gang først i chatten.            |
| **Linket**         | Den node i Figma, agenten skal læse. Én komponent ad gangen.                             |
| **Opgaven**        | Én ting: én komponent eller én rettelse.                                                 |
| **Stedet**         | Hvilke filer agenten må lave og røre.                                                    |
| **Svaret**         | Bed agenten forklare, hvilke props og tokens den brugte. Så kan du validere.             |

<a id="prompt-regler"></a>

#### Faste regler – send dem først

```text
Regler for hele chatten:
- Projektet er Next.js med App Router og JavaScript. Skriv ikke TypeScript.
- Brug CSS Modules og de tokens, der ligger i app/globals.css. Ingen Tailwind, inline styles eller hardcodede værdier, hvor der findes et token.
- Pillen er en <button type="button">. Modalen er en <dialog>, der åbnes med showModal(), så fokus og Esc virker.
- Hover og fokus laves med :hover og :focus-visible i CSS, ikke som props.
- Smart Animate bliver til CSS transitions.
- Brug kun "use client" i komponenter, der har brug for state eller effects.
- Lav kun det, jeg beder om, og forklar kort, hvad du har gjort. Sig til, hvis noget ikke kan ses i Figma.
```

<a id="prompt-pill"></a>

#### Iteration 1: Pill

```text
Byg komponenten Pill fra mit Figma-design: <link til component set'et Pill>

Læs designet, dets variables og component properties med Figma MCP.
Læg den i components/agent/Pill.js med en CSS Module, og vis begge typer på en ny side i app/agent/page.js. Rør ikke de andre filer i components/.
Fortæl bagefter, hvilke props og tokens du har brugt.
```

<a id="prompt-modal"></a>

#### Iteration 2: Modal og PillModal

```text
Byg nu komponenten Modal fra: <link til komponenten Modal>

Læg den i components/agent/Modal.js. Prop'en showSeparator viser eller skjuler separatoren.
Sæt derefter Pill og Modal sammen i components/agent/PillModal.js, så et klik på pillen åbner modalen. Klik udenfor og Esc lukker den.
Vis to PillModals på app/agent/page.js.
```

<a id="prompt-ret"></a>

#### En præcis rettelse

Sig, hvad der er forkert, hvad det skal være, og at agenten kun skal rette det:

```text
Hover er lavet som en prop: state="hover".
Lav det i stedet med :hover og :focus-visible i Pill.module.css, og fjern prop'en.
Ret kun det.
```

<a id="prompt-opdater"></a>

#### Opdatér efter en designændring (2.3)

```text
Jeg har rettet designet i Figma: <indsæt dit link>

Opdatér de eksisterende komponenter i components/Pill.js, components/Modal.js og deres CSS Modules, så de matcher det rettede design. Byg ikke nye komponenter, og rør ikke components/agent/.
- Har en variable fået en ny værdi, så ret token'et i app/globals.css.
- Er der kommet en ny variable, så tilføj den som token i app/globals.css med samme navngivning som de andre.
- Lav kun de ændringer, designet kræver, og forklar kort hver ændring bagefter.
```

Prompten til den anden vej, fra kode til Figma, står i [ekstra 4](#ekstra-4-fra-kode-til-figma).

[Slide: Det skal stå i prompten](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/prompt) · [Slide: Den iterative model](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/#/iterationer)

<hr style="margin: 2rem 0;">

## Når du er færdig

- Commit og push dit arbejde.
- Sammenlign din løsning med branchen [`solution`](https://github.com/cederdorff/nextjs-figma-pill-modal/commits/solution) i starterrepoet.
- Gem dine noter fra 2.2 og refleksionen. De er gode at have med, når I skal bygge komponenter fra jeres eget design i gruppeprojektet.

<hr style="margin: 2rem 0;">

## Materialer

- [Slides: Fra Figma til React/Next.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-02/)
- [Undervisningsside: Fra Figma til React/Next.js](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/race-09-2026-10-29-fra-figma-til-react-nextjs.md)
- [Starterrepo: nextjs-figma-pill-modal](https://github.com/cederdorff/nextjs-figma-pill-modal) – [commits på `solution`](https://github.com/cederdorff/nextjs-figma-pill-modal/commits/solution) følger trinnene
- [Demofil i Figma](https://www.figma.com/design/XTTxNnZjIIWPGyvq6Ya5Wj/Figma-%C3%98velse-IXD---Figma--%3E-React?node-id=9-61&m=dev)
- [Figma: Guide to Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)
- [Figma: Guide to the Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- [Figma: Remote server installation](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)
- [Figma: Tools and prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/) – værktøjerne, der læser fra og skriver til Figma
- [Figma: Rate limits & access](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)
- [React: Passing props to a component](https://react.dev/learn/passing-props-to-a-component)
- [React: Conditional rendering](https://react.dev/learn/conditional-rendering)
- [React: State: a component's memory](https://react.dev/learn/state-a-components-memory)
- [MDN: The dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
- [MDN: @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)
- [MDN: getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [MDN: View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [React: flushSync](https://react.dev/reference/react-dom/flushSync)
- [WAI-ARIA: Disclosure pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
