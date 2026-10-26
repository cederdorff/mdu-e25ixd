# Opgave: Next.js og headless WordPress - 26-10-2026

## Formål

Her er dagens opgaver samlet ét sted. De tager dig fra en tom mappe til en Next.js-app, der henter posts og en About-page fra din egen WordPress via REST API'et.

Opgaverne er de samme som i slides, men med mere hjælp. Hvert trin forklarer, hvad du skal gøre og hvorfor, og linker til det slide, trinnet bygger på. Under hver opgave kan du folde den fulde løsning ud. Koden er den samme som i [referencerepoet](https://github.com/cederdorff/nextjs-headless-wordpress), hvor hver opgave har sit eget commit.

<hr style="margin: 2rem 0;">

## Sådan bruger du opgaven

- Fortsæt fra den opgave, du nåede til. Er du i tvivl, så tjek dit projekt mod **Du er klar, når** øverst i de foregående opgaver.
- Hver opgave er delt i trin, fx 4.2. Slut hvert trin med **Tjek**, så du ved, at det virker, før du går videre.
- Prøv selv først. Sidder du fast, så læs **Sidder du fast?** og brug **Hint**. Fold først **den fulde løsning** ud, når du har prøvet. Du lærer mest ved at skrive koden selv – også når du skriver den af.
- Commit og push efter hver opgave med Source Control i VS Code eller GitHub Desktop. Så kan du altid gå tilbage, og dine commits følger samme trin som referencerepoet.
- CSS er ikke dagens fokus. Kopiér CSS-filerne fra referencerepoet via linkene, og brug de samme `className`s som i repoets komponenter.
- Referencerepoet er på engelsk. Dine tekster må gerne være på dansk.

<hr style="margin: 2rem 0;">

## Oversigt

1. [Opret dit Next.js-projekt](#opgave-1)
2. [Routes, layout og navigation](#opgave-2)
3. [Undersøg dit eget REST API](#opgave-3)
4. [Hent og vis dine posts](#opgave-4)
5. [Byg detaljesiden](#opgave-5)
6. [Forside, About og et fælles datalag](#opgave-6)
7. [Billeder, kategorier og fejlhåndtering](#opgave-7) – til dig, der vil arbejde videre

<hr style="margin: 2rem 0;">

## Før du starter

- Du har en opdateret LTS-version af [Node.js](https://nodejs.org/) installeret. Tjek med `node -v` i terminalen.
- Din WordPress på Simply.com har:
  - **Mindst 5 udgivne posts** med titel, et par afsnit tekst, et **fremhævet billede** og en **kategori**. Brug mindst 2 forskellige kategorier.
  - **1 udgivet page** med titlen _About_ og slug `about`.
  - Kladder kommer ikke med i REST API'et, så tjek, at indholdet er **udgivet**.
- `https://<dit-domæne>/wp-json/wp/v2/posts` giver JSON i browseren.
- **Får du en fejl?** Tjek, at **Permalinks** under _Indstillinger_ ikke står til _Plain_, og at et sikkerhedsplugin ikke blokerer REST API'et. Brug test-URL'en [`https://headless.cederdorff.dk`](https://headless.cederdorff.dk/wp-json/wp/v2/posts), mens du fejlfinder.

<hr style="margin: 2rem 0;">

<a id="opgave-1"></a>

## Opgave 1: Opret dit Next.js-projekt

Du opretter et nyt Next.js-projekt, rydder op i templaten og lægger udgangspunktet på GitHub.

**Du er klar, når:** Appen kører lokalt med din egen titel, og udgangspunktet ligger på GitHub.

### 1.1 Opret projektet

Opret en tom mappe til projektet, fx `nextjs-wordpress`, og åbn den i VS Code. Mappens navn bliver projektets navn, så brug små bogstaver og bindestreger – store bogstaver og mellemrum giver en fejl.

Åbn terminalen i VS Code, og kør kommandoen. Punktummet betyder, at projektet oprettes i den mappe, du står i:

```bash
npx create-next-app@latest . --js --no-tailwind --eslint --app --no-src-dir --import-alias "@/*" --no-react-compiler --cache-components
```

Flagene svarer på de spørgsmål, du ellers ville få: JavaScript i stedet for TypeScript, App Router, ESLint og ingen Tailwind CSS. Så får alle det samme udgangspunkt.

**Tjek:** Mappen indeholder nu blandt andet `app/`, `public/` og `package.json`.

[Slide: Kommandoen](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/kommando)

### 1.2 Kør og undersøg

Kør `npm run dev`, og åbn [http://localhost:3000](http://localhost:3000) i browseren. `npm run dev` starter en rigtig server – ikke kun en filserver som i Vite.

Kig på strukturen, og find svar på:

- Hvilken fil er forsiden? (`app/page.js`)
- Hvor står `<html>` og `<body>`? (`app/layout.js`)

**Tjek:** Startsiden fra `create-next-app` vises på [http://localhost:3000](http://localhost:3000), og du kan pege på de to filer.

[Slide: Strukturen](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/struktur)

### 1.3 Ryd op i templaten

- Lad `app/page.js` vise en `<h1>` og en kort tekst. Fjern import af `Image` og `styles`.
- Slet `app/page.module.css`. Du opretter den igen i opgave 2.
- Ret `metadata` i `app/layout.js` med din egen titel og beskrivelse, og sæt `lang="da"`, hvis dit indhold er på dansk. Lad fonts fra `create-next-app` blive stående.
- Erstat indholdet i `app/globals.css` med [`app/globals.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/app/globals.css) fra referencerepoet. Den indeholder også de globale klasser `wp-content` og `featured-image`, som du skal bruge senere.
- Slet de SVG-filer i `public/`, som templaten brugte.

`Header` og `Footer` i `layout.js` kommer først i opgave 2.

**Tjek:** Browseren viser din `<h1>` og din titel i fanen.

[Slide: layout.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/layout)

### 1.4 Push til GitHub

`create-next-app` har allerede oprettet et git-repository med et første commit. Du skal bare committe din oprydning og publicere repositoriet på GitHub. Brug enten Source Control i VS Code eller GitHub Desktop:

- **Source Control i VS Code:** Åbn _Source Control_ i venstre side (`⌃⇧G`). Skriv en besked, fx _Clean up the template_, og klik på _Commit_. Klik derefter på _Publish Branch_, og vælg, om repositoriet skal være public eller private. VS Code opretter repositoriet på GitHub for dig.
- **GitHub Desktop:** Vælg _File → Add Local Repository_, og vælg projektmappen. Skriv en besked nederst til venstre, og klik på _Commit to main_. Klik derefter på _Publish repository_.

Fremover er det samme to trin efter hver opgave: _Commit_ og _Sync Changes_ i VS Code eller _Commit to main_ og _Push origin_ i GitHub Desktop.

**Tjek:** Dit repository på GitHub viser dine filer og commits.

**Sidder du fast?**

- **Fejl om _npm naming restrictions_?** Omdøb mappen til små bogstaver og bindestreger, og kør kommandoen igen.
- **Spørger kommandoen alligevel om noget?** Tjek, at du har kopieret hele linjen.
- **Ingen _Publish Branch_ eller _Publish repository_?** Log ind på GitHub i VS Code under _Accounts_ nederst til venstre eller i GitHub Desktop under _Settings → Accounts_.
- **Finder Source Control intet repository?** Tjek, at du har åbnet selve projektmappen i VS Code – den mappe, hvor `package.json` ligger.

<details>
<summary><strong>Se den fulde løsning til opgave 1</strong></summary>

`app/page.js`:

```jsx
export default function Home() {
  return (
    <main>
      <h1>Headless WordPress</h1>
      <p>Posts from WordPress will be shown here.</p>
    </main>
  );
}
```

`app/layout.js` – repoet bruger `lang="en"`, fordi indholdet er på engelsk. Er dit indhold på dansk, så brug `lang="da"`:

```jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata = {
  title: "Headless WordPress",
  description: "A Next.js app that fetches content from WordPress through the REST API"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

`app/page.module.css` og SVG-filerne i `public/` er slettet, og `app/globals.css` er kopieret fra [referencerepoet](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/app/globals.css).

</details>

**Referencerepo:** [Oprydning af templaten](https://github.com/cederdorff/nextjs-headless-wordpress/commit/6fc6d02)

<hr style="margin: 2rem 0;">

<a id="opgave-2"></a>

## Opgave 2: Routes, layout og navigation

Du laver siderne `/posts` og `/about`, en header og en footer, der går igen på alle sider, og en side til URL'er, der ikke findes.

**Du er klar, når:** Du kan navigere mellem `/`, `/posts` og `/about` uden fuld reload, `/findes-ikke` viser din not-found-side, og arbejdet er pushet.

### 2.1 Opret routes

I React Router skrev du selv, hvilken komponent der hører til hvilken URL. I Next.js er mappen URL'en, og filen hedder altid `page.js`. Kun en mappe i `app/` med en `page.js` bliver en route.

| Fil                 | URL      |
| ------------------- | -------- |
| `app/page.js`       | `/`      |
| `app/posts/page.js` | `/posts` |
| `app/about/page.js` | `/about` |

Opret `app/posts/page.js` og `app/about/page.js` med en overskrift hver:

```jsx
export default function PostsPage() {
  return (
    <main>
      <h1>Posts</h1>
    </main>
  );
}
```

Giv også forsiden en kort intro i en `<section className={styles.hero}>` i `app/page.js`. Opret `app/page.module.css` igen, og kopiér CSS'en fra repoet: [`app/page.js`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/89c1be4/app/page.js) og [`app/page.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/89c1be4/app/page.module.css).

**Tjek:** [http://localhost:3000/posts](http://localhost:3000/posts) og [http://localhost:3000/about](http://localhost:3000/about) viser dine overskrifter, og forsiden viser din intro.

[Slide: Hvad bliver en route?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/route-regler)

### 2.2 Header og Footer

Komponenter, der ikke selv er sider, lægger du i `components/` i roden – ved siden af `app/`, ikke inde i den.

Lav `components/Header.js` med navigation til `/`, `/posts` og `/about`, og `components/Footer.js`, fx med appens navn. Brug `Link` fra `next/link` i stedet for `<a>`. Så skifter kun siden uden fuld reload, og i produktion hentes siden bag linket på forhånd.

```jsx
import Link from "next/link";

<Link href="/posts">Posts</Link>;
```

Kopiér komponenterne og deres CSS fra repoet. En kopieret `.module.css` virker kun med de samme `className`s, så tag komponenten med:

- [`components/Header.js`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/Header.js) og [`components/Header.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/Header.module.css)
- [`components/Footer.js`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/Footer.js) og [`components/Footer.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/Footer.module.css)

**Tjek:** `components/` ligger ved siden af `app/` og indeholder fire filer: `Header.js`, `Header.module.css`, `Footer.js` og `Footer.module.css`. Du ser dem først i browseren efter 2.3.

[Slide: Link i Header](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/link)

### 2.3 Vis Header og Footer i layoutet

`layout.js` er rammen om alle sider. `{children}` er den aktuelle side. Det, du skriver rundt om `{children}`, bliver stående, når du navigerer.

Importér `Header` og `Footer` øverst i `app/layout.js`, og vis dem rundt om `{children}`:

```jsx
<body>
  <Header />
  {children}
  <Footer />
</body>
```

**Tjek:** Header og footer står på alle tre sider, og et klik i navigationen skifter kun indholdet i midten.

[Slide: layout.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/layout)

### 2.4 Not found og push

Opret `app/not-found.js`. Next.js viser den automatisk, når en URL ikke matcher en route – og senere, når du selv kalder `notFound()`. Giv den en overskrift, en kort tekst og et `Link` tilbage til forsiden. Commit og push, når siden virker.

**Tjek:** [http://localhost:3000/findes-ikke](http://localhost:3000/findes-ikke) viser din not-found-side med header og footer.

[Slide: not-found.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/not-found)

**Sidder du fast?**

- **Route virker ikke?** Mappen skal hedde det samme som URL'en, og filen skal hedde `page.js` – ikke `Page.js` eller `posts.js`.
- **Ingen styling?** Kopiér både komponenten og dens `.module.css`, og læg dem i samme mappe.
- **Module not found: Can't resolve '@/components/Header'?** Tjek, at `components/` ligger i roden ved siden af `app/`, og at filen hedder `Header.js` med stort H.
- **Fuld reload ved klik?** Brug `Link` fra `next/link` i stedet for `<a>`.

<details>
<summary><strong>Se den fulde løsning til opgave 2</strong></summary>

`app/page.js`:

```jsx
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <h1>Stories from Aarhus</h1>
        <p>
          City walks, food and places worth a visit. The content is written in WordPress and presented with Next.js.
        </p>
      </section>
    </main>
  );
}
```

`app/page.module.css`:

```css
.hero {
  max-width: 42rem;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
}

.hero p {
  color: var(--muted);
  font-size: 1.25rem;
}
```

`app/posts/page.js`:

```jsx
export const metadata = {
  title: "Posts"
};

export default function PostsPage() {
  return (
    <main>
      <h1>Posts</h1>
      <p>Posts from WordPress will be shown here.</p>
    </main>
  );
}
```

`app/about/page.js`:

```jsx
export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <p>The About page from WordPress will be shown here.</p>
    </main>
  );
}
```

`components/Header.js`:

```jsx
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Headless WordPress
        </Link>
        <ul className={styles.links}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
```

`components/Footer.js`:

```jsx
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Content from WordPress · Built with Next.js</p>
    </footer>
  );
}
```

`app/layout.js`:

```jsx
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata = {
  title: "Headless WordPress",
  description: "A Next.js app that fetches content from WordPress through the REST API"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

`app/not-found.js`:

```jsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Page not found</h1>
      <p>We could not find what you were looking for.</p>
      <p>
        <Link href="/">Go to the home page</Link>
      </p>
    </main>
  );
}
```

CSS: [`Header.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/Header.module.css) og [`Footer.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/Footer.module.css) ligger ved siden af komponenterne i `components/`.

</details>

**Referencerepo:** [Header, footer, routes og not-found](https://github.com/cederdorff/nextjs-headless-wordpress/commit/89c1be4)

<hr style="margin: 2rem 0;">

<a id="opgave-3"></a>

## Opgave 3: Undersøg dit eget REST API

Før du skriver kode, skal du kende de data, du henter. Du skriver ingen kode i denne opgave. Brug browseren med _Pretty print_ slået til eller Thunder Client i VS Code.

**Du er klar, når:** Du kan forklare, hvad de seks felter skal bruges til, og har noteret din WordPress-URL uden `/` til sidst.

### 3.1 Åbn posts

Åbn `https://<dit-domæne>/wp-json/wp/v2/posts` i browseren. Slå _Pretty print_ til øverst på siden, så JSON'en bliver læsbar.

**Tjek:** Starter svaret med `[`? Så er det et array – en liste af posts.

[Slide: Endpoints](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/endpoints) · [Slide: Pretty print](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/json)

### 3.2 Find felterne

Fold den første post ud, og find de seks felter, du skal bruge: `id`, `slug`, `date`, `title.rendered`, `excerpt.rendered` og `content.rendered`.

Læg mærke til datastrukturen: `[ ]` er et array, som du tilgår med et index eller `.map()`. `{ }` er et objekt, som du tilgår med `.navn`. Skriv stien til titlen og uddraget i første post med punktum.

**Tjek:** Din sti til titlen ender på `.rendered`, fx `posts[0].title.rendered`.

[Slide: Seks felter](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/felter) · [Slide: Stien](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/datastruktur)

<details>
<summary><strong>Hint: Sådan ser en post ud</strong></summary>

Forkortet svar fra `/wp-json/wp/v2/posts` med kun de seks felter. Dit svar har mange flere felter:

```json
[
  {
    "id": 12,
    "date": "2026-10-20T10:00:00",
    "slug": "exploring-the-streets",
    "title": {
      "rendered": "Exploring the streets"
    },
    "content": {
      "rendered": "<p>Første afsnit …</p>\n<p>Andet afsnit …</p>"
    },
    "excerpt": {
      "rendered": "<p>Første afsnit …</p>\n"
    }
  }
]
```

</details>

### 3.3 Test en slug

Kopiér `slug` fra en af dine posts, og åbn `/wp-json/wp/v2/posts?slug=<din-slug>`. Prøv også en slug, der ikke findes, fx `?slug=findes-ikke`.

**Tjek:** Svaret er et array med én post – og et tomt array `[]`, når slug'en ikke findes. Det skal du bruge i opgave 5.

[Slide: Endpoints](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/endpoints)

### 3.4 Hent About

Åbn `/wp-json/wp/v2/pages?slug=about`. Pages har de samme felter som posts.

**Tjek:** Får du et array med din About-page? Får du `[]`, så tjek, at din page er udgivet, og at dens slug er `about`.

[Slide: Endpoints](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/endpoints)

### 3.5 Notér din URL

Notér din WordPress-URL uden `/` til sidst, fx `https://dit-domæne.dk`. Den skal du bruge i opgave 4.

**Tjek:** URL'en slutter med dit domæne – ikke med `/` eller `/wp-json`.

**Sidder du fast?**

- **Fejl eller en HTML-side i stedet for JSON?** Tjek, at Permalinks under _Indstillinger_ ikke står til _Plain_.
- **`401` eller `403`?** Et sikkerhedsplugin blokerer måske REST API'et.
- **Svarer din WordPress slet ikke?** Brug test-URL'en `https://headless.cederdorff.dk`, mens du fejlfinder.

<details>
<summary><strong>Se svarene til opgave 3</strong></summary>

| Felt               | Sti i første post           | Skal bruges til                             |
| ------------------ | --------------------------- | ------------------------------------------- |
| `id`               | `posts[0].id`               | `key` i `.map()`                            |
| `slug`             | `posts[0].slug`             | URL'en til detaljesiden, fx `/posts/<slug>` |
| `date`             | `posts[0].date`             | Datoen på cards og detaljesiden             |
| `title.rendered`   | `posts[0].title.rendered`   | Titlen                                      |
| `excerpt.rendered` | `posts[0].excerpt.rendered` | Uddraget på et card                         |
| `content.rendered` | `posts[0].content.rendered` | Hele indholdet på detaljesiden              |

- `title` er et objekt, ikke en tekst. Skriver du `{post.title}` i React, får du fejlen _Objects are not valid as a React child_, fordi du stoppede ved objektet. Gå hele vejen til `.rendered`.
- `.rendered`-felterne indeholder HTML. Uddraget er pakket ind i `<p>`, og titler kan indeholde entities som `&#8217;`. Derfor viser vi dem med `dangerouslySetInnerHTML` i opgave 4 og 5.
- `?slug=` returnerer altid et array – også når der kun er ét match. Derfor bruger du `posts[0]` i opgave 5.

</details>

<hr style="margin: 2rem 0;">

<a id="opgave-4"></a>

## Opgave 4: Hent og vis dine posts

Du henter dine posts fra WordPress i en server component og viser dem som et grid af cards på `/posts`.

**Du er klar, når:** `/posts` viser dine posts som cards, `npm run build` går igennem, og arbejdet er pushet.

### 4.1 Gem URL'en i en miljøvariabel

Opret `.env.local` i projektets rod ved siden af `package.json`, og skriv din WordPress-URL uden `/` til sidst:

```bash
WORDPRESS_URL=https://dit-domæne.dk
```

Genstart `npm run dev` med `Ctrl+C` og `npm run dev`. Next.js læser kun `.env.local`, når serveren starter.

Variabler uden `NEXT_PUBLIC_` kan kun læses på serveren. Sammenlign med `VITE_`-variablerne fra Product optimization, som kunne læses i frontend.

Opret også `.env.example` med samme variabel, men uden din rigtige URL. Den viser andre, hvilke variabler projektet skal bruge. Git ignorerer alle `.env*`-filer – også `.env.example`. Tilføj derfor `!.env.example` nederst i `.gitignore`, så eksempelfilen kommer med i dit commit, mens `.env.local` bliver lokalt.

**Tjek:** Source Control viser `.env.example` og `.gitignore` som ændringer – men ikke `.env.local`.

[Slide: .env.local](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/env) · [Slide: .env.example](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/env-example)

### 4.2 Hent posts og vis titlerne

Gør `PostsPage` i `app/posts/page.js` `async`, og hent posts med `fetch` direkte i komponenten – uden `useEffect` og `useState`. Komponenten kører på serveren, så den kan vente på data, før HTML'en sendes til browseren.

Start med at logge dine posts med `console.log`. Outputtet står i **terminalen** i VS Code – ikke i browserens console – fordi koden kører på serveren. Vis derefter titlerne i en `<ul>`:

```jsx
export default async function PostsPage() {
  const response = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts`);
  const posts = await response.json();
  console.log(posts);

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title.rendered}</li>
        ))}
      </ul>
    </main>
  );
}
```

**Tjek:** `/posts` viser titlerne på dine posts, og terminalen viser arrayet. Fjern `console.log`, når du har set dine data.

Du ser måske en fejl i terminalen om data, der hentes uden for `<Suspense>`. Den løser du i 4.4.

[Slide: Hent og log](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/hent-log) · [Slide: Vis titlerne](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/hent-direkte)

### 4.3 Vis posts som cards

Lav en `PostCard`-komponent i `components/PostCard.js`, der tager én `post` som prop og viser dato, titel, uddrag og et `Link` til `/posts/<slug>`. Skift `<li>` ud med `PostCard` i `posts.map()`, og pak dem ind i en `<section>` med `styles.grid`:

```jsx
<section className={styles.grid}>
  {posts.map((post) => (
    <PostCard key={post.id} post={post} />
  ))}
</section>
```

Titel og uddrag indeholder HTML fra WordPress. Vis dem med `dangerouslySetInnerHTML`, så `<p>` og entities som `&#8217;` ikke står som tekst på dit card. Du hører mere om, hvorfor det er i orden her, i opgave 5.

Vis en besked, hvis der ingen posts er: `posts.length === 0`.

Kopiér CSS fra repoet:

- [`components/PostCard.js`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/88e6baee8faef5e90bb2a1c0718e381c48fc8a56/components/PostCard.js) og [`components/PostCard.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/PostCard.module.css)
- [`app/posts/page.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/88e6baee8faef5e90bb2a1c0718e381c48fc8a56/app/posts/page.module.css) til griddet

**Tjek:** `/posts` viser et grid af cards med dato, titel og uddrag uden synlige `<p>`-tags. _Read more_ fører til `/posts/<slug>`, som viser din not-found-side, indtil du har lavet opgave 5.

[Slide: Brug PostCard](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/postcard-brug) · [Slide: Indholdet](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/postcard)

<details>
<summary><strong>Hint: Formatér datoen</strong></summary>

`post.date` er en tekst som `"2026-10-20T10:00:00"`. Lav den om til en læsbar dato med `toLocaleDateString`:

```js
const date = new Date(post.date).toLocaleDateString("da-DK", {
  day: "numeric",
  month: "long",
  year: "numeric"
});
```

Repoet bruger `"en-GB"`, fordi indholdet er på engelsk.

</details>

### 4.4 Loading-state, build og push

Med Cache Components venter siden på WordPress ved hver request, og Next.js vil vide, hvad brugeren skal se imens. Opret `app/posts/loading.js` ved siden af `page.js`. Next.js viser den automatisk, mens data hentes – ligesom robuste UI-states i Case 1. Uden den fejler `npm run build`.

**Tommelfingerregel:** Hver route, der henter data, får sin egen `loading.js`. Når du navigerer, bliver header og footer i layoutet stående, og kun siden skifter. Derfor skal loading-staten ligge i samme mappe som siden.

Stop `npm run dev`, kør `npm run build`, og commit og push, når buildet går igennem.

**Tjek:** Fejlen om `<Suspense>` er væk, og `npm run build` slutter uden fejl.

[Slide: loading.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/loading)

**Sidder du fast?**

- **Står der `undefined` i URL'en?** Tjek, at `.env.local` ligger i roden ved siden af `package.json`, at variablen hedder `WORDPRESS_URL` begge steder, og genstart `npm run dev`.
- **`posts.map is not a function`?** `posts` er ikke et array. Log det med `console.log(posts)`, og kig i terminalen. Får du et objekt med `code` og `message`, er det en fejl fra WordPress.
- **_Objects are not valid as a React child_?** Du viser `post.title` i stedet for `post.title.rendered`.
- **Står `<p>` som tekst på dit card?** Brug `dangerouslySetInnerHTML` til titel og uddrag.
- **_Module not found_?** Opret den `.module.css`, du importerer, i samme mappe som komponenten.
- **Fejl om `<Suspense>`, eller fejler `npm run build`?** Tilføj `app/posts/loading.js`.
- **Svarer din WordPress ikke?** Brug test-URL'en `https://headless.cederdorff.dk` i `.env.local`, mens du fejlfinder.

<details>
<summary><strong>Se den fulde løsning til opgave 4</strong></summary>

`.env.local` – kommer ikke med på GitHub:

```bash
WORDPRESS_URL=https://dit-domæne.dk
```

`.env.example`:

```bash
# The URL of your WordPress site without a trailing slash
WORDPRESS_URL=https://your-domain.com
```

Nederst i `.gitignore`:

```bash
# The example environment file is safe to commit
!.env.example
```

`app/posts/page.js`:

```jsx
import PostCard from "@/components/PostCard";
import styles from "./page.module.css";

export const metadata = {
  title: "Posts"
};

export default async function PostsPage() {
  const response = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts`);
  const posts = await response.json();

  return (
    <main>
      <h1>Posts</h1>
      {posts.length === 0 ? (
        <p>There are no posts yet.</p>
      ) : (
        <section className={styles.grid}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      )}
    </main>
  );
}
```

`components/PostCard.js`:

```jsx
import Link from "next/link";
import styles from "./PostCard.module.css";

export default function PostCard({ post }) {
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <article className={styles.card}>
      <time className={styles.date} dateTime={post.date}>
        {date}
      </time>
      <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
      <Link href={`/posts/${post.slug}`} className={styles.link}>
        Read more
      </Link>
    </article>
  );
}
```

`app/posts/loading.js`:

```jsx
export default function Loading() {
  return (
    <main>
      <p>Loading posts …</p>
    </main>
  );
}
```

CSS: [`PostCard.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/PostCard.module.css) ligger i `components/`, og [`page.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/88e6baee8faef5e90bb2a1c0718e381c48fc8a56/app/posts/page.module.css) ligger i `app/posts/`.

</details>

**Referencerepo:** [Hent posts](https://github.com/cederdorff/nextjs-headless-wordpress/commit/dc5fac6) · [Grid af cards](https://github.com/cederdorff/nextjs-headless-wordpress/commit/88e6bae) · [loading.js](https://github.com/cederdorff/nextjs-headless-wordpress/commit/e7b510e)

<hr style="margin: 2rem 0;">

<a id="opgave-5"></a>

## Opgave 5: Byg detaljesiden

Du laver én side, der kan vise alle dine posts: `/posts/<slug>`. Når brugeren klikker på et card, åbner detaljesiden for netop den post.

**Du er klar, når:** Et klik på et card åbner detaljesiden, `/posts/findes-ikke` viser din not-found-side, og arbejdet er pushet.

### 5.1 Opret en dynamisk route

Opret mappen `app/posts/[slug]/` med firkantede parenteser og en `page.js` i den. De firkantede parenteser betyder, at denne del af URL'en er dynamisk: `/posts/exploring-the-streets` giver `slug = "exploring-the-streets"`.

Next.js giver siden `params` som prop. `params` skal `await`'es, før du kan læse `slug`:

```jsx
export default async function PostPage({ params }) {
  const { slug } = await params;
  // ...
}
```

**Tjek:** Vis `slug` i en `<h1>`, og åbn `/posts/test`. Står der _test_?

[Slide: Fra URL til slug](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/slug-flow)

### 5.2 Hent posten

Hent posten med `?slug=` – ligesom du testede i opgave 3. Svaret er altid et array, også når der kun er ét match. Brug derfor det første element, `posts[0]`. Findes slug'en ikke, er arrayet tomt, og `posts[0]` er `undefined`. Så kalder du `notFound()`, og Next.js viser din `not-found.js`:

```jsx
const response = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts?slug=${slug}`);
const posts = await response.json();
const post = posts[0];

if (!post) {
  notFound();
}
```

Husk at importere `notFound` fra `next/navigation`.

**Tjek:** Log `post.title.rendered` med `console.log`. Terminalen viser titlen, når du åbner en rigtig slug, og `/posts/findes-ikke` viser din not-found-side.

[Slide: Hent én post](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/hent-en)

### 5.3 Vis indholdet

Vis titel, dato og `content.rendered`. Indholdet er HTML fra WordPress, så du viser det med `dangerouslySetInnerHTML` i en `<div className="wp-content">`. Klassen fra `globals.css` styler HTML'en, så fx billeder ikke går ud over kanten. Tilføj et `Link` tilbage til `/posts`.

Funktionen hedder `dangerouslySetInnerHTML`, fordi HTML'en indsættes, som den er. Kom den fra brugere, kunne den indeholde skadelig kode. Her er det i orden, fordi du selv kontrollerer indholdet i din WordPress.

Kopiér [`app/posts/[slug]/page.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/app/posts/%5Bslug%5D/page.module.css).

**Tjek:** Et klik på et card viser hele posten med titel, dato og indhold – uden synlige HTML-tags – og linket fører tilbage til `/posts`.

[Slide: Vis posten](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/vis-post)

### 5.4 Loading-state og push

Giv detaljesiden sin egen `app/posts/[slug]/loading.js`. Kør `npm run build`, og commit og push, når buildet går igennem.

**Tjek:** Du ser kort din loading-tekst, når du åbner en post, og `npm run build` slutter uden fejl.

[Slide: loading.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/loading-regel)

**Sidder du fast?**

- **Er `slug` `undefined`?** Mappen skal hedde `[slug]` med firkantede parenteser, og `params` skal `await`'es.
- **404, selvom posten findes?** Log `slug` og URL'en med `console.log`, og sammenlign med `slug` i din WordPress. Tjek også, at linket i `PostCard` er `/posts/${post.slug}`.
- **_Cannot read properties of undefined (reading 'title')_?** Du bruger `posts` i stedet for `posts[0]`, eller `notFound()` står efter den kode, der bruger `post`.
- **Går billeder i indholdet ud over kanten?** Tjek, at `<div>` har `className="wp-content"`, og at du har kopieret `globals.css` fra repoet.

<details>
<summary><strong>Se den fulde løsning til opgave 5</strong></summary>

`app/posts/[slug]/page.js`:

```jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export default async function PostPage({ params }) {
  const { slug } = await params;
  const response = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts?slug=${slug}`);
  // WordPress always returns an array, even for a single match
  const posts = await response.json();
  const post = posts[0];

  if (!post) {
    notFound();
  }

  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <main>
      <article className={styles.post}>
        <Link href="/posts">← All posts</Link>
        <time className={styles.date} dateTime={post.date}>
          {date}
        </time>
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <div className="wp-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </article>
    </main>
  );
}
```

`app/posts/[slug]/loading.js`:

```jsx
export default function Loading() {
  return (
    <main>
      <p>Loading post …</p>
    </main>
  );
}
```

CSS: [`page.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/app/posts/%5Bslug%5D/page.module.css) ligger i `app/posts/[slug]/`. `.wp-content` ligger allerede i `globals.css`.

</details>

**Referencerepo:** [Detaljeside med dynamisk route](https://github.com/cederdorff/nextjs-headless-wordpress/commit/2bb0e75)

<hr style="margin: 2rem 0;">

<a id="opgave-6"></a>

## Opgave 6: Forside, About og et fælles datalag

Du viser de seneste posts på forsiden og din About-page på `/about`. Bagefter samler du alle `fetch`-kald ét sted, så du kun skal rette ét sted, når noget ændrer sig.

**Du er klar, når:** Ingen sider kalder `fetch` direkte, datoen formateres ét sted, `npm run build` går igennem, og arbejdet er pushet.

### 6.1 Forside med de 3 seneste posts

Skriv `fetch` direkte i `app/page.js` igen, og tilføj `?per_page=3` til URL'en, så du kun får de 3 seneste posts. Husk at gøre `Home` `async`.

Nu skal griddet bruges to steder: på forsiden og på `/posts`. Flyt det til en `PostList`-komponent i `components/PostList.js`, der tager `posts` som prop og viser beskeden, hvis der ingen posts er. CSS'en flytter med: Omdøb `app/posts/page.module.css` til `components/PostList.module.css`. Brug derefter `<PostList posts={posts} />` på begge sider.

Forsiden får en overskrift over griddet og et link til alle posts. Udvid `app/page.module.css` med CSS fra repoet: [`app/page.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/15e6817b4edd1177205001de40bd33b5e10d67e7/app/page.module.css). Se også [`app/page.js`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/15e6817b4edd1177205001de40bd33b5e10d67e7/app/page.js) for de `className`s, den bruger.

**Tjek:** Forsiden viser 3 cards, og `/posts` viser stadig alle dine posts.

[Slide: PostList](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/postlist)

### 6.2 About og loading-states

Hent din About-page med `/pages?slug=about` i `app/about/page.js`, og vis titel og indhold. Det er samme mønster som detaljesiden: et array, det første element og `notFound()`, hvis den mangler.

Forsiden og About henter nu også data. Giv dem hver deres `loading.js`: `app/loading.js` og `app/about/loading.js`.

**Tjek:** `/about` viser din About-page fra WordPress, og `npm run build` går stadig igennem.

[Slide: About](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/about) · [Slide: loading.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/loading-regel)

<details>
<summary><strong>Se løsningen til 6.1 og 6.2</strong></summary>

`components/PostList.js`:

```jsx
import PostCard from "@/components/PostCard";
import styles from "./PostList.module.css";

export default function PostList({ posts }) {
  if (posts.length === 0) {
    return <p>There are no posts yet.</p>;
  }

  return (
    <section className={styles.grid}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
```

`app/page.js`:

```jsx
import Link from "next/link";
import PostList from "@/components/PostList";
import styles from "./page.module.css";

export default async function Home() {
  const response = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=3`);
  const posts = await response.json();

  return (
    <main>
      <section className={styles.hero}>
        <h1>Stories from Aarhus</h1>
        <p>
          City walks, food and places worth a visit. The content is written in WordPress and presented with Next.js.
        </p>
      </section>

      <section>
        <h2 className={styles.heading}>Latest posts</h2>
        <PostList posts={posts} />
        <p className={styles.more}>
          <Link href="/posts">See all posts →</Link>
        </p>
      </section>
    </main>
  );
}
```

`app/posts/page.js`:

```jsx
import PostList from "@/components/PostList";

export const metadata = {
  title: "Posts"
};

export default async function PostsPage() {
  const response = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts`);
  const posts = await response.json();

  return (
    <main>
      <h1>Posts</h1>
      <PostList posts={posts} />
    </main>
  );
}
```

`app/about/page.js`:

```jsx
import { notFound } from "next/navigation";

export const metadata = {
  title: "About"
};

export default async function AboutPage() {
  const response = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/pages?slug=about`);
  const pages = await response.json();
  const page = pages[0];

  if (!page) {
    notFound();
  }

  return (
    <main>
      <h1 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
      <div className="wp-content" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </main>
  );
}
```

`app/loading.js`:

```jsx
export default function Loading() {
  return (
    <main>
      <p>Loading the latest posts …</p>
    </main>
  );
}
```

`app/about/loading.js`:

```jsx
export default function Loading() {
  return (
    <main>
      <p>Loading the About page …</p>
    </main>
  );
}
```

</details>

### 6.3 Saml koden i et fælles datalag

Nu henter fire sider data fra WordPress med den samme URL. Skal URL'en ændres, eller skal du tilføje `_embed` i opgave 7, retter du fire steder. Et fælles datalag samler det ét sted.

Opret `lib/wordpress.js` i roden ved siden af `app/` og `components/`. Flyt dine `fetch`-kald til fire funktioner: `getPosts()`, `getLatestPosts()`, `getPostBySlug(slug)` og `getPageBySlug(slug)`. Koden er den samme – den har bare fået et navn og et nyt sted. Gem starten af URL'en i en variabel øverst i filen, så hvert `fetch` bliver kort:

```js
const API_URL = `${process.env.WORDPRESS_URL}/wp-json/wp/v2`;

export async function getPostBySlug(slug) {
  const response = await fetch(`${API_URL}/posts?slug=${slug}`);
  const posts = await response.json();
  return posts[0];
}
```

`getPostBySlug(slug)` og `getPageBySlug(slug)` returnerer det første element i arrayet. Siden kalder stadig selv `notFound()`, hvis der ikke kom noget tilbage – det er siden, der bestemmer, hvad brugeren ser.

Erstat derefter `fetch` på hver side med et kald til funktionen:

```jsx
import { getPosts } from "@/lib/wordpress";

const posts = await getPosts();
```

Flyt én side ad gangen, og test siden, før du går videre til den næste.

**Tjek:** Søg efter `fetch(` i projektet med `⇧⌘F`. Det findes kun i `lib/wordpress.js`, og alle fire sider ser ud som før.

[Slide: Hvorfor?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/datalag-model) · [Slide: lib/wordpress.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/datalag-kode) · [Slide: getPostBySlug](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/datalag-slug)

### 6.4 Formatér datoen ét sted og push

Du formaterer datoen både i `PostCard` og på detaljesiden. Flyt `toLocaleDateString` til en `formatDate()`-funktion i `lib/format.js`, og brug den begge steder. Så ser datoen ens ud overalt.

Kør `npm run build`, og commit og push, når buildet går igennem.

**Tjek:** `toLocaleDateString` findes kun i `lib/format.js`, og datoen ser ens ud på cards og detaljesiden.

[Slide: formatDate()](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/format)

**Sidder du fast?**

- **Ser alt ens ud efter flytningen?** Det er meningen – datalaget ændrer ikke det, brugeren ser. Test alle fire sider efter hver flytning.
- **_Module not found: Can't resolve '@/lib/wordpress'_?** Tjek, at `lib/` ligger i roden ved siden af `app/`, og at filen hedder `wordpress.js`.
- **_getPosts is not a function_ eller _is not exported_?** Tjek, at funktionen har `export` foran, og at du importerer den med `{ }`: `import { getPosts } from "@/lib/wordpress";`.
- **Får du et `Promise` i stedet for data?** Du mangler `await` foran funktionskaldet.
- **Mangler styling på griddet?** Tjek, at `PostList.module.css` ligger i `components/`, og at `PostList.js` importerer `./PostList.module.css`.

<details>
<summary><strong>Se den fulde løsning til opgave 6</strong></summary>

`lib/wordpress.js`:

```js
// All fetch calls to WordPress are collected here, so the pages can reuse them

const API_URL = `${process.env.WORDPRESS_URL}/wp-json/wp/v2`;

export async function getPosts() {
  const response = await fetch(`${API_URL}/posts`);

  const posts = await response.json();
  return posts;
}

export async function getLatestPosts() {
  const response = await fetch(`${API_URL}/posts?per_page=3`);

  const posts = await response.json();
  return posts;
}

export async function getPostBySlug(slug) {
  const response = await fetch(`${API_URL}/posts?slug=${slug}`);

  // WordPress always returns an array, even for a single match
  const posts = await response.json();
  return posts[0];
}

export async function getPageBySlug(slug) {
  const response = await fetch(`${API_URL}/pages?slug=${slug}`);

  // WordPress always returns an array, even for a single match
  const pages = await response.json();
  return pages[0];
}
```

`lib/format.js`:

```js
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
```

`app/page.js`:

```jsx
import Link from "next/link";
import PostList from "@/components/PostList";
import { getLatestPosts } from "@/lib/wordpress";
import styles from "./page.module.css";

export default async function Home() {
  const posts = await getLatestPosts();

  return (
    <main>
      <section className={styles.hero}>
        <h1>Stories from Aarhus</h1>
        <p>
          City walks, food and places worth a visit. The content is written in WordPress and presented with Next.js.
        </p>
      </section>

      <section>
        <h2 className={styles.heading}>Latest posts</h2>
        <PostList posts={posts} />
        <p className={styles.more}>
          <Link href="/posts">See all posts →</Link>
        </p>
      </section>
    </main>
  );
}
```

`app/posts/page.js`:

```jsx
import PostList from "@/components/PostList";
import { getPosts } from "@/lib/wordpress";

export const metadata = {
  title: "Posts"
};

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main>
      <h1>Posts</h1>
      <PostList posts={posts} />
    </main>
  );
}
```

`app/posts/[slug]/page.js`:

```jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/wordpress";
import { formatDate } from "@/lib/format";
import styles from "./page.module.css";

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const date = formatDate(post.date);

  return (
    <main>
      <article className={styles.post}>
        <Link href="/posts">← All posts</Link>
        <time className={styles.date} dateTime={post.date}>
          {date}
        </time>
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <div className="wp-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </article>
    </main>
  );
}
```

`app/about/page.js`:

```jsx
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/wordpress";

export const metadata = {
  title: "About"
};

export default async function AboutPage() {
  const page = await getPageBySlug("about");

  if (!page) {
    notFound();
  }

  return (
    <main>
      <h1 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
      <div className="wp-content" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </main>
  );
}
```

`components/PostCard.js`:

```jsx
import Link from "next/link";
import { formatDate } from "@/lib/format";
import styles from "./PostCard.module.css";

export default function PostCard({ post }) {
  const date = formatDate(post.date);

  return (
    <article className={styles.card}>
      <time className={styles.date} dateTime={post.date}>
        {date}
      </time>
      <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
      <Link href={`/posts/${post.slug}`} className={styles.link}>
        Read more
      </Link>
    </article>
  );
}
```

`components/PostList.js`, `app/loading.js` og `app/about/loading.js` er de samme som i løsningen til 6.1 og 6.2.

</details>

**Referencerepo:** [Forside, About og PostList](https://github.com/cederdorff/nextjs-headless-wordpress/commit/15e6817) · [Fælles datalag](https://github.com/cederdorff/nextjs-headless-wordpress/commit/8c165b0)

<hr style="margin: 2rem 0;">

<a id="opgave-7"></a>

## Opgave 7: Billeder, kategorier og fejlhåndtering

Opgave 7 er til dig, der vil arbejde videre. Du viser fremhævede billeder og kategorier og viser en fejlside, når WordPress ikke svarer.

**Du er klar, når:** Dine cards har billede og kategori, en forkert URL giver din fejlside med en knap, der virker, og arbejdet er pushet.

### 7.1 Hent billeder og kategorier med `_embed`

Uden `?_embed` får du kun id'er som `"featured_media": 8`. Med `?_embed` følger billede og kategorier med i `_embedded`.

Åbn `/wp-json/wp/v2/posts?_embed` i browseren, og find `_embedded` i første post. Fold `wp:featuredmedia` og `wp:term` ud.

Tilføj `_embed` til URL'erne i `lib/wordpress.js` – nu skal du kun rette ét sted. Kun den første parameter får `?`, resten får `&`:

```js
`${API_URL}/posts?_embed`;
`${API_URL}/posts?per_page=3&_embed`;
`${API_URL}/posts?slug=${slug}&_embed`;
```

**Tjek:** Log `posts[0]._embedded` i en af dine sider. Terminalen viser `wp:featuredmedia` og `wp:term`.

[Slide: Hvad sendes med?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/embed-json)

### 7.2 Vis billeder og kategorier

Følg stien ned til billedet og kategorierne i `PostCard`. Brug `?.` hele vejen, så en post uden billede ikke giver en fejl. `wp:term` er et array af arrays: Det første er kategorier, det andet er tags.

```js
const image = post._embedded?.["wp:featuredmedia"]?.[0];
const categories = post._embedded?.["wp:term"]?.[0] ?? [];
```

Vis billedet med et almindeligt `<img>` med `image.source_url` og `image.alt_text`, men kun hvis der er et billede: `{image && ...}`. Vis kategorierne i en `<ul>` med `category.name`.

Vis også det fremhævede billede på detaljesiden og About med `className="featured-image"` fra `globals.css`.

Har du kopieret `PostCard.module.css` og `globals.css` fra `main` i referencerepoet, har du allerede klasserne `image`, `categories` og `featured-image`. Ellers så kopiér dem igen.

Vil du bruge `next/image` i stedet for `<img>`, skal dit WordPress-domæne først tilføjes under `images.remotePatterns` i `next.config.mjs`.

**Tjek:** Dine cards viser billede og kategorier, detaljesiden og About viser det fremhævede billede, og en post uden billede giver ingen fejl.

[Slide: Følg stien](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/embed-vis)

### 7.3 Fejlhåndtering

`fetch` giver ikke selv en fejl, når WordPress svarer med fx `404` eller `500`. Tjek derfor `response.ok` i hver funktion i `lib/wordpress.js`, og kast en fejl, hvis status ikke er i 200-serien:

```js
if (!response.ok) {
  throw new Error(`WordPress responded with ${response.status}`);
}
```

Opret `app/error.js`. Next.js viser den, når en side kaster en fejl. Den skal have `"use client"` øverst, fordi den har en knap med `onClick`. Knappen kalder `retry()`, som prøver at vise siden igen.

**Tjek:** Alle fire funktioner i `lib/wordpress.js` tjekker `response.ok`, og `app/error.js` starter med `"use client"`.

[Slide: response.ok](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/response-ok) · [Slide: error.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/error-js)

### 7.4 Test og push

Stav et endpoint forkert i `lib/wordpress.js`, fx `/postz`, og åbn `/posts`. Ret endpointet igen, og klik på knappen. Kør `npm run build`, og commit og push.

**Tjek:** Med det forkerte endpoint ser du din fejlside. Når du har rettet det, viser knappen dine posts igen.

**Sidder du fast?**

- **Viser forsiden pludselig 10 posts?** Der står `?_embed` i stedet for `&_embed` efter `?per_page=3`. Kun den første parameter får `?`.
- **_Cannot read properties of undefined_?** Brug `?.` hele vejen ned ad stien – en post uden billede har ingen `wp:featuredmedia`.
- **Intet billede?** Tjek, at posten har et fremhævet billede i WordPress, og at `_embed` står i URL'en. Log `post._embedded` for at se, hvad du får.
- **Ingen kategorier, eller kun _Uncategorized_?** Giv dine posts en kategori i WordPress.
- **Fejl om event handlers i `error.js`?** Tilføj `"use client"` som den allerførste linje.
- **Vises fejlsiden ikke?** Tjek, at `throw new Error` står i den funktion, siden bruger, og at `app/error.js` ligger direkte i `app/`.

<details>
<summary><strong>Se den fulde løsning til opgave 7</strong></summary>

`lib/wordpress.js`:

```js
// All fetch calls to WordPress are collected here, so the pages can reuse them

const API_URL = `${process.env.WORDPRESS_URL}/wp-json/wp/v2`;

export async function getPosts() {
  const response = await fetch(`${API_URL}/posts?_embed`);

  if (!response.ok) {
    throw new Error(`WordPress responded with ${response.status}`);
  }

  const posts = await response.json();
  return posts;
}

export async function getLatestPosts() {
  const response = await fetch(`${API_URL}/posts?per_page=3&_embed`);

  if (!response.ok) {
    throw new Error(`WordPress responded with ${response.status}`);
  }

  const posts = await response.json();
  return posts;
}

export async function getPostBySlug(slug) {
  const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed`);

  if (!response.ok) {
    throw new Error(`WordPress responded with ${response.status}`);
  }

  // WordPress always returns an array, even for a single match
  const posts = await response.json();
  return posts[0];
}

export async function getPageBySlug(slug) {
  const response = await fetch(`${API_URL}/pages?slug=${slug}&_embed`);

  if (!response.ok) {
    throw new Error(`WordPress responded with ${response.status}`);
  }

  // WordPress always returns an array, even for a single match
  const pages = await response.json();
  return pages[0];
}
```

`components/PostCard.js`:

```jsx
import Link from "next/link";
import { formatDate } from "@/lib/format";
import styles from "./PostCard.module.css";

export default function PostCard({ post }) {
  // With ?_embed, WordPress includes the featured image and categories in _embedded
  const image = post._embedded?.["wp:featuredmedia"]?.[0];
  const categories = post._embedded?.["wp:term"]?.[0] ?? [];
  const date = formatDate(post.date);

  return (
    <article className={styles.card}>
      {image && <img className={styles.image} src={image.source_url} alt={image.alt_text} />}
      {categories.length > 0 && (
        <ul className={styles.categories}>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      )}
      <time className={styles.date} dateTime={post.date}>
        {date}
      </time>
      <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
      <Link href={`/posts/${post.slug}`} className={styles.link}>
        Read more
      </Link>
    </article>
  );
}
```

`app/posts/[slug]/page.js`:

```jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/wordpress";
import { formatDate } from "@/lib/format";
import styles from "./page.module.css";

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // With ?_embed, WordPress includes the featured image in _embedded
  const image = post._embedded?.["wp:featuredmedia"]?.[0];

  const date = formatDate(post.date);

  return (
    <main>
      <article className={styles.post}>
        <Link href="/posts">← All posts</Link>
        <time className={styles.date} dateTime={post.date}>
          {date}
        </time>
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        {image && <img className="featured-image" src={image.source_url} alt={image.alt_text} />}
        <div className="wp-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </article>
    </main>
  );
}
```

`app/about/page.js`:

```jsx
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/wordpress";

export const metadata = {
  title: "About"
};

export default async function AboutPage() {
  const page = await getPageBySlug("about");

  if (!page) {
    notFound();
  }

  // With ?_embed, WordPress includes the featured image in _embedded
  const image = page._embedded?.["wp:featuredmedia"]?.[0];

  return (
    <main>
      <h1 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
      {image && <img className="featured-image" src={image.source_url} alt={image.alt_text} />}
      <div className="wp-content" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </main>
  );
}
```

`app/error.js`:

```jsx
"use client";

export default function Error({ retry }) {
  return (
    <main>
      <h1>Something went wrong</h1>
      <p>We could not fetch the content from WordPress.</p>
      <button onClick={() => retry()}>Try again</button>
    </main>
  );
}
```

CSS: Klasserne `image` og `categories` ligger i [`PostCard.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/PostCard.module.css), og `featured-image` ligger i [`globals.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/app/globals.css).

</details>

**Referencerepo:** [Billeder og kategorier](https://github.com/cederdorff/nextjs-headless-wordpress/commit/1a96d45) · [Fejlhåndtering](https://github.com/cederdorff/nextjs-headless-wordpress/commit/222b6e4)

<hr style="margin: 2rem 0;">

## Når du er færdig

- Commit og push dit arbejde. Du skal bruge appen næste gang, hvor vi bygger et designsystem ovenpå den.
- Sammenlign din løsning med [referencerepoet](https://github.com/cederdorff/nextjs-headless-wordpress), og læg mærke til, hvor din kode er anderledes.
- Har du tid tilbage, så fortsæt med de næste dele af [Learn Next.js på Scrimba](https://scrimba.com/learn-nextjs-c02moisq6a).

<hr style="margin: 2rem 0;">

## Materialer

- [Slides: Next.js og headless WordPress](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/)
- [Undervisningsside: Next.js og headless WordPress](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/race-08-2026-10-26-nextjs-og-headless-wordpress.md)
- [Produktionsdag 28. oktober](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/2026-10-28-produktionsdag-nextjs-og-headless-wordpress.md)
- [Referencerepo: nextjs-headless-wordpress](https://github.com/cederdorff/nextjs-headless-wordpress) – [commits](https://github.com/cederdorff/nextjs-headless-wordpress/commits/main) følger opgaverne
- [Learn Next.js på Scrimba](https://scrimba.com/learn-nextjs-c02moisq6a) (gratis)
- [Next.js: Layouts and pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Next.js: Fetching data](https://nextjs.org/docs/app/getting-started/fetching-data)
- [WordPress: REST API Handbook](https://developer.wordpress.org/rest-api/)
- [WordPress: Reference: Posts](https://developer.wordpress.org/rest-api/reference/posts/)
