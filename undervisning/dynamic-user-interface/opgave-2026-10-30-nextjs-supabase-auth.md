# Opgave: Next.js og Supabase Auth - 30-10-2026

## Formål

Du bygger en lille Next.js-app med sign up, log ind og en profil, som kun brugere, der er logget ind, kan se. Supabase er allerede sat op i startprojektet.

<img src="https://raw.githubusercontent.com/cederdorff/mdu-e25ixd/main/slides/assets/nextjs-supabase-auth-routes.webp" alt="Routes i appen. /, /signup og /login kan alle se. /profile kræver login. signUp og signIn sender brugeren til /profile, signOut sender til forsiden, og er man ikke logget ind, sender /profile til /login." style="max-width: 100%; margin: 0.75rem 0;">

Det sker i koden, når du bruger siderne:

```text
/signup  -> signUp()         -> supabase.auth.signUp()             -> cookie sat     -> redirect("/profile")
/login   -> signIn()         -> supabase.auth.signInWithPassword() -> cookie sat     -> redirect("/profile")
/profile -> getCurrentUser() -> tjekket på serveren                                  -> vis brugeren, eller redirect("/login")
Log out  -> signOut()        -> supabase.auth.signOut()            -> cookie slettet -> redirect("/")
```

<details>
<summary><strong>Next.js-begreberne kort forklaret</strong></summary>

| Begreb | Hvad er det? | Hvor i dag? |
| --- | --- | --- |
| Route og `page.js` | En mappe i `app/` med en `page.js` bliver til en URL. `app/signup/page.js` er `/signup`. | Opgave 2–4 |
| `layout.js` | Rammen om alle sider. Det, der står rundt om `{children}`, bliver stående, når du navigerer. | Headeren |
| Server Component | En komponent, der kører på serveren. Den kan være `async`, læse cookies og vente på data, før HTML'en sendes. Alle komponenter er Server Components, indtil du skriver `"use client"`. | Alle sider |
| Server Action | En `async` funktion med `"use server"`, som en `<form action={…}>` kan kalde. Next.js sender formularen som en `POST`-request og kører funktionen på serveren. | `signUp`, `signIn`, `signOut` |
| `searchParams` | Det, der står efter `?` i URL'en. Next.js giver det til siden som en prop – et Promise, så du skal bruge `await`. | `?error=true` |
| `redirect()` | Stopper siden eller Server Action'en og sender brugeren til en anden URL. Koden under den kører ikke. | Efter login og på `/profile` |
| `metadata` | Et objekt, som Next.js laver om til `<title>` og beskrivelse i `<head>`. | Titlen i fanen |
| `proxy.js` | Kode, Next.js kører før hver request. Tidligere hed den `middleware.js`. | Fornyer sessionen |
| ○ og ƒ | ○ Static: bygges én gang og er ens for alle. ƒ Dynamic: bygges ved hver request, fordi den læser noget fra requesten. | `npm run build` |

</details>

<hr style="margin: 2rem 0;">

## Sådan bruger du opgaven

- Slut hvert trin med **Tjek**. Trin mærket **valgfri** kan du tage til sidst.
- Sidder du fast? Fold **Hint** ud – og **Løsning**, når du har prøvet selv.
- Commit og push efter hver opgave med Source Control i VS Code eller GitHub Desktop.

<hr style="margin: 2rem 0;">

## Oversigt

1. [Hent startprojektet](#opgave-1)
2. [Sign up](#opgave-2)
3. [Log ind](#opgave-3)
4. [Profilen – den beskyttede route](#opgave-4)

**Ekstra:** [Static eller dynamic?](#static-dynamic) · [5. Flere beskyttede routes](#opgave-5) · [6. Login-status i headeren](#opgave-6)

**Videre:** [Auth i din headless WordPress-app](#videre) · [Fejlfinding](#fejlfinding)

<hr style="margin: 2rem 0;">

<a id="opgave-1"></a>

## Opgave 1: Hent startprojektet

Du laver dit eget repository ud fra startprojektet og forbinder det til dit Supabase-projekt.

**Resultat:** Appen kører lokalt med dine Supabase-nøgler, og projektet ligger på GitHub.

### 1.1 Dit eget repository

1. Åbn [nextjs-supabase-auth](https://github.com/cederdorff/nextjs-supabase-auth) på GitHub. Klik på **Use this template → Create a new repository**, giv det et navn, fx `nextjs-supabase-auth`, og klik på _Create repository_.
2. Klon dit nye repository:
   - **VS Code:** Åbn et nyt vindue, klik på _Clone Git Repository_, og vælg dit repository.
   - **GitHub Desktop:** Vælg _File → Clone Repository_, og vælg dit repository.
3. Åbn mappen i VS Code, og kør i terminalen:

   ```bash
   npm install
   ```

**Tjek:** Dit repository ligger på din egen GitHub-konto, og mappen har nu en `node_modules`.

### 1.2 Gør Supabase klar

Genbrug dit projekt fra Product optimization, eller opret et nyt i [dashboardet](https://supabase.com/dashboard). Gå til _Authentication → Sign In / Providers_, slå **Confirm email** fra, og klik på _Save changes_. Så kan du logge ind med det samme – uden at bekræfte en e-mail først.

<img src="https://raw.githubusercontent.com/cederdorff/mdu-e25ixd/main/slides/assets/supabase-confirm-email.webp" alt="Authentication, Sign In / Providers i Supabase. Under User Signups er Confirm email slået fra og markeret, og knappen Save changes står nederst." style="max-width: 100%; margin: 0.75rem 0; border: 1px solid #ddd; border-radius: 6px;">

Kopiér `.env.example` til en ny fil, `.env.local`, i roden. Klik på **Connect** øverst i Supabase:

<img src="https://raw.githubusercontent.com/cederdorff/mdu-e25ixd/main/slides/assets/supabase-connect-button.webp" alt="Toppen af et Supabase-projekt med knappen Connect markeret til højre for projektets navn." style="max-width: 100%; margin: 0.75rem 0; border: 1px solid #ddd; border-radius: 6px;">

Vælg _Framework_, _Next.js_ og _App Router_. Under fanen `.env.local` står projektets URL og din **publishable key** klar. Kopiér de to linjer ind i din `.env.local`:

<img src="https://raw.githubusercontent.com/cederdorff/mdu-e25ixd/main/slides/assets/supabase-connect-env-local.webp" alt="Panelet Connect to your project med Framework, Next.js og App Router valgt. Under Add files er fanen .env.local åben med NEXT_PUBLIC_SUPABASE_URL og NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY." style="max-width: 100%; margin: 0.75rem 0; border: 1px solid #ddd; border-radius: 6px;">

Panelet viser også `npm install` og filer som `utils/supabase/server.ts`. Dem skal du **ikke** bruge – startprojektet har allerede pakkerne og `lib/supabase/server.js`. Du skal kun bruge `.env.local`.

Sådan ser din `.env.local` ud:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<dit-projekt>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

`NEXT_PUBLIC_` betyder, at variablen også må nå browseren. Det er i orden for en publishable key – aldrig for en secret key.

Kør `npm run dev`, og åbn [http://localhost:3000](http://localhost:3000).

**Tjek:** Forsiden viser fire routes. Et klik på `/signup` giver _Page not found_. Det er rigtigt nok – den route laver du i opgave 2. Source Control viser ikke `.env.local`. Den må ikke komme på GitHub.

[Slide: To nøgler](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/noegler)

### 1.3 Kig i startprojektet

Det meste er det samme som i din WordPress-app: `app/layout.js`, `components/Header.js` og `app/page.js`. To filer er nye, og dem skal du ikke ændre:

| Fil | Hvad gør den? |
| --- | --- |
| `lib/supabase/server.js` | Laver en Supabase-klient, der læser sessionen fra cookies. Du bruger den i al din Supabase-kode i dag. |
| `proxy.js` | Kører før hver request og fornyer sessionen, så brugeren ikke bliver logget ud efter en time. |

**Tjek:** Du kan pege på de to filer og sige med én sætning, hvad de gør.

[Slide: Klienten læser cookies](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/server-klient) · [Slide: Hvorfor proxy.js?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/proxy)

**Sidder du fast?**

- **Ingen _Use this template_-knap?** Log ind på GitHub først.

- **Står dit projekt som _Paused_?** Klik på _Resume project_, og vent et par minutter.
- **_Your project's URL and Key are required_?** Tjek navnene i `.env.local`, og genstart `npm run dev`.
- **Finder du ingen publishable key?** Se under _Project Settings → API Keys_. Brug aldrig en nøgle, der starter med `sb_secret_`.
- **Har du fået `utils/supabase/` eller `.ts`-filer med fra _Connect_?** Slet dem. Startprojektet bruger `lib/supabase/server.js`.

**Startprojektet:** [`main`](https://github.com/cederdorff/nextjs-supabase-auth/tree/main)

<hr style="margin: 2rem 0;">

<a id="opgave-2"></a>

## Opgave 2: Sign up

Du laver routen `/signup` med en formular, der opretter en bruger i Supabase.

**Resultat:** Du kan oprette en bruger på `/signup`, brugeren står i Supabase, og arbejdet er pushet.

### 2.1 Opret routen

Mappen er URL'en, og filen hedder altid `page.js`. Opret `app/signup/page.js` med en `<h1>`, og giv siden `metadata` med titlen _Sign up_. Next.js laver `metadata` om til `<title>` i `<head>`.

**Tjek:** [http://localhost:3000/signup](http://localhost:3000/signup) viser din overskrift i stedet for _Page not found_, og fanen viser din titel.

<details>
<summary><strong>Løsning</strong></summary>

```jsx
export const metadata = {
  title: "Sign up"
};

export default function SignUpPage() {
  return (
    <main>
      <h1>Sign up</h1>
    </main>
  );
}
```

</details>

### 2.2 Formularen

Tilføj en `<form className="auth-form">` med et felt til e-mail, et til adgangskode og en knap. Giv hvert felt en `<label>`, en `name` og en `placeholder`. Det er `name`, du bruger til at hente værdien på serveren. CSS'en til `auth-form` ligger allerede i `app/globals.css`.

**Tjek:** Siden viser en pæn formular. Der sker ingenting, når du klikker på knappen – endnu.

<details>
<summary><strong>Hint</strong></summary>

Et felt består af en `<label>` og et `<input>`. `htmlFor` på labelen peger på inputtets `id`:

```jsx
<label htmlFor="email">Email</label>
<input id="email" name="email" type="email" placeholder="you@example.com" required />
```

Knappen skal have `type="submit"`.

</details>

<details>
<summary><strong>Løsning</strong></summary>

```jsx
<form className="auth-form">
  <label htmlFor="email">Email</label>
  <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />

  <label htmlFor="password">Password</label>
  <input
    id="password"
    name="password"
    type="password"
    placeholder="At least 6 characters"
    autoComplete="new-password"
    minLength={6}
    required
  />

  <button type="submit">Sign up</button>
</form>
```

- `placeholder` viser et eksempel i det tomme felt. Den forsvinder, når brugeren skriver, så den erstatter ikke `<label>`.
- `minLength={6}` får browseren til selv at sige til, hvis adgangskoden er for kort. Supabase kræver mindst 6 tegn.
- `autoComplete` fortæller browseren og password-manageren, hvad feltet er. `new-password` foreslår en ny, stærk adgangskode.

</details>

### 2.3 Server Action

En **Server Action** er en funktion, der kører på serveren, men som en formular kan kalde. `"use server"` øverst i funktionen gør den til en Server Action. Skriv den i `app/signup/page.js` – over komponenten:

```jsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function signUp(formData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  await supabase.auth.signUp({ email, password });

  redirect("/");
}
```

Giv formularen `action={signUp}`. Når brugeren klikker på knappen, sender Next.js formularen som en `POST`-request og kører `signUp` på serveren med felterne i `formData`. `formData.get("email")` henter feltet med `name="email"`. Hele routen står nu i én fil: siden, formularen og funktionen, der kører, når formularen sendes.

<details>
<summary><strong>Løsning</strong></summary>

`signUp` står over komponenten, og formularen kalder den:

```jsx
<form action={signUp} className="auth-form">
```

</details>

**Tjek:** Opret en bruger. Du lander på forsiden, og under _Authentication → Users_ i Supabase står din nye bruger. Klik på genindlæs-knappen over tabellen, hvis den ikke er kommet endnu.

<img src="https://raw.githubusercontent.com/cederdorff/mdu-e25ixd/main/slides/assets/supabase-auth-users.webp" alt="Authentication, Users i Supabase med en tabel over brugere. Hver række har et UID, en e-mail og Email som provider." style="max-width: 100%; margin: 0.75rem 0; border: 1px solid #ddd; border-radius: 6px;">

[Slide: Login-flowet](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/sekvens) · [Slide: Server Action](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/server-action)

### 2.4 Find sessionen

Åbn browserens udviklerværktøjer. Gå til _Application_ (Chrome) eller _Storage_ (Safari og Firefox), og kig under **Cookies**.

**Tjek:** Der står en cookie, der slutter med `-auth-token`. Det er din session. Commit og push.

[Slide: Cookies, localStorage eller sessionStorage?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/storage)

### 2.5 Vis en fejl · valgfri

Virker sign up? Så gør formularen bedre. Opret den samme bruger igen. Der sker ingenting – fejlen forsvinder på serveren. Send brugeren tilbage til `/signup?error=true`, når Supabase svarer med en fejl, og vis en besked på siden, når `error` står i URL'en.

`searchParams` er det, der står efter `?` i URL'en. Next.js giver det til siden som en prop. Det er et Promise, så siden skal være `async` og bruge `await`.

**Tjek:** Den samme e-mail to gange giver din fejlbesked. Commit og push.

<details>
<summary><strong>Hint</strong></summary>

- `supabase.auth.signUp()` svarer med et objekt, der har en `error`. Gem den: `const { error } = await …`.
- Er der en `error`, så `redirect("/signup?error=true")`.
- På siden: `const { error } = await searchParams;`, og vis en `<p>`, når `error` har en værdi.

</details>

<details>
<summary><strong>Løsning: Fejlen i Server Action'en</strong></summary>

```js
const { error } = await supabase.auth.signUp({ email, password });

if (error) {
  redirect("/signup?error=true");
}
```

</details>

<details>
<summary><strong>Løsning: Fejlen på siden</strong></summary>

Læs `searchParams` øverst i komponenten:

```jsx
export default async function SignUpPage({ searchParams }) {
  const { error } = await searchParams;
```

Vis beskeden over formularen:

```jsx
{error && (
  <p className="form-error" role="alert">
    Could not sign up. Maybe the email is already in use.
  </p>
)}
```

</details>

**Sidder du fast?**

- **Står brugeren i Supabase, men er der ingen `-auth-token`-cookie?** _Confirm email_ er slået til. Slå det fra, slet brugeren under _Authentication → Users_, og prøv igen.
- **Får du altid fejlbeskeden?** Log `error.message` med `console.log` i `signUp`, og kig i **terminalen** – ikke i browserens console.
- **_Functions cannot be passed directly to Client Components_?** `"use server"` mangler øverst i `signUp`.

<details>
<summary><strong>Se den fulde løsning til opgave 2</strong></summary>

`app/signup/page.js`:

```jsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Sign up"
};

// A Server Action: "use server" makes it run on the server,
// even though the form in the browser calls it
async function signUp(formData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  // Something went wrong: back to the form with ?error=true in the URL
  if (error) {
    redirect("/signup?error=true");
  }

  redirect("/");
}

export default async function SignUpPage({ searchParams }) {
  // ?error=true is set by signUp when Supabase says no
  const { error } = await searchParams;

  return (
    <main>
      <h1>Sign up</h1>
      {error && (
        <p className="form-error" role="alert">
          Could not sign up. Maybe the email is already in use.
        </p>
      )}
      <form action={signUp} className="auth-form">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="At least 6 characters"
          autoComplete="new-password"
          minLength={6}
          required
        />

        <button type="submit">Sign up</button>
      </form>
      <p>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}
```

</details>

**Løsning:** [Sign up](https://github.com/cederdorff/nextjs-supabase-auth/compare/main...opgave-02-sign-up) · [branchen `opgave-02-sign-up`](https://github.com/cederdorff/nextjs-supabase-auth/tree/opgave-02-sign-up)

<hr style="margin: 2rem 0;">

<a id="opgave-3"></a>

## Opgave 3: Log ind

Login-siden er næsten en kopi af sign up-siden. Kun Server Action'en og teksterne er nye.

**Resultat:** Du kan logge ind på `/login` med din bruger fra opgave 2, og arbejdet er pushet.

### 3.1 Kopiér routen

Kopiér mappen `app/signup/` til `app/login/`, og ret i `app/login/page.js`:

- [ ] `metadata`, `<h1>` og knappen: _Log in_
- [ ] Komponenten: `LoginPage`
- [ ] Adgangskoden: `placeholder="Your password"` og `autoComplete="current-password"`. Fjern `minLength`.
- [ ] Linket nederst: _No account yet?_ og `/signup`
- [ ] Har du lavet 2.5: fejlbeskeden _Wrong email or password._

**Tjek:** [http://localhost:3000/login](http://localhost:3000/login) viser din login-side.

<details>
<summary><strong>Løsning</strong></summary>

```jsx
export const metadata = {
  title: "Log in"
};

// signUp stays here until 3.2

export default async function LoginPage({ searchParams }) {
  const { error } = await searchParams;

  return (
    <main>
      <h1>Log in</h1>
      {error && (
        <p className="form-error" role="alert">
          Wrong email or password.
        </p>
      )}
      <form action={signUp} className="auth-form">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Your password"
          autoComplete="current-password"
          required
        />

        <button type="submit">Log in</button>
      </form>
      <p>
        No account yet? <Link href="/signup">Sign up</Link>
      </p>
    </main>
  );
}
```

Har du ikke lavet 2.5, har siden ingen `searchParams` og ingen fejlbesked.

</details>

### 3.2 signIn

Ret Server Action'en:

- [ ] `signUp` hedder nu `signIn`
- [ ] `supabase.auth.signUp` er nu `supabase.auth.signInWithPassword`
- [ ] Formularen: `action={signIn}`
- [ ] Har du lavet 2.5: `redirect("/login?error=true")` ved fejl

**Tjek:** Log ind med den bruger, du oprettede i opgave 2. Du lander på forsiden. Commit og push.

[Slide: Server Action](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/server-action)

<details>
<summary><strong>Hint</strong></summary>

Kun linjen med `supabase.auth` og URL'en i fejl-`redirect` er anderledes. Resten af funktionen er som `signUp`.

</details>

<details>
<summary><strong>Løsning</strong></summary>

```js
async function signIn(formData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/login?error=true");
  }

  redirect("/");
}
```

Og i formularen: `<form action={signIn} className="auth-form">`.

</details>

### 3.3 Test fejlen · valgfri

Har du lavet fejlbeskeden i 2.5? Prøv med en forkert adgangskode og med en e-mail, der ikke findes. Commit og push.

**Tjek:** Begge giver _Wrong email or password._ Supabase siger med vilje ikke, hvad der var forkert, så ingen kan bruge login-siden til at finde ud af, hvem der har en bruger.

**Sidder du fast?**

- **Logger du ind, men ser intet nyt?** Det er rigtigt nok. Du kan først se, at du er logget ind, når du har lavet profilen i opgave 4. Tjek cookien under _Application_ imens.

<details>
<summary><strong>Se den fulde løsning til opgave 3</strong></summary>

`app/login/page.js`:

```jsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Log in"
};

// The same pattern as signUp, but with signInWithPassword
async function signIn(formData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/login?error=true");
  }

  redirect("/");
}

export default async function LoginPage({ searchParams }) {
  // ?error=true is set by signIn when the email or password is wrong
  const { error } = await searchParams;

  return (
    <main>
      <h1>Log in</h1>
      {error && (
        <p className="form-error" role="alert">
          Wrong email or password.
        </p>
      )}
      <form action={signIn} className="auth-form">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Your password"
          autoComplete="current-password"
          required
        />

        <button type="submit">Log in</button>
      </form>
      <p>
        No account yet? <Link href="/signup">Sign up</Link>
      </p>
    </main>
  );
}
```

</details>

**Løsning:** [Log ind](https://github.com/cederdorff/nextjs-supabase-auth/compare/opgave-02-sign-up...opgave-03-log-ind) · [branchen `opgave-03-log-ind`](https://github.com/cederdorff/nextjs-supabase-auth/tree/opgave-03-log-ind)

<hr style="margin: 2rem 0;">

<a id="opgave-4"></a>

## Opgave 4: Profilen – den beskyttede route

Du laver `/profile`, som viser, hvem der er logget ind, og som sender alle andre til `/login`.

**Resultat:** `/profile` viser din e-mail, når du er logget ind, sender dig til `/login`, når du ikke er, du kan logge ud, og arbejdet er pushet.

### 4.1 Hvem er logget ind?

Opret `lib/auth.js` med én funktion, du kan bruge på alle sider:

```js
import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return data?.claims ?? null;
}
```

`getClaims()` tjekker, at sessionen i cookien er ægte. Du får brugeren tilbage – eller `null`, hvis ingen er logget ind. E-mailen står i `user.email`, og id'et står i `user.sub`.

[Slide: Hvem er logget ind?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/beskyt-kode)

### 4.2 Profilsiden

Opret `app/profile/page.js`. Siden er en **Server Component**. Den kører på serveren og kan derfor læse cookien, før HTML'en sendes. Gør komponenten `async`, kald `await getCurrentUser()`, og vis `user.email` og `user.sub`.

**Tjek:** Logget ind viser `/profile` din e-mail og dit id. Åbn nu `/profile` i et **privat vindue**. Siden fejler, fordi `user` er `null`. Det løser du i næste trin.

<details>
<summary><strong>Hint</strong></summary>

```jsx
export default async function ProfilePage() {
  const user = await getCurrentUser();
```

Importér `getCurrentUser` fra `@/lib/auth`.

</details>

<details>
<summary><strong>Løsning</strong></summary>

```jsx
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "Profile"
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <main>
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      <p>User id: {user.sub}</p>
    </main>
  );
}
```

</details>

### 4.3 Beskyt routen

Tjek brugeren øverst i komponenten, og send til `/login`, hvis der ingen er. `redirect` importerer du fra `next/navigation`.

<img src="https://raw.githubusercontent.com/cederdorff/mdu-e25ixd/main/slides/assets/nextjs-supabase-auth-beskyt-profile.webp" alt="Browseren beder om GET /profile. På serveren kalder ProfilePage await getCurrentUser(). Er der en bruger, vises siden med brugerens e-mail. Er svaret null, kaldes redirect til /login, og indholdet bliver aldrig sendt." style="max-width: 100%; margin: 0.75rem 0;">

**Tjek:** I det private vindue lander du nu på `/login`. Log ind der, og åbn `/profile` igen.

[Slide: Én if på serveren](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/beskyt-flow)

<details>
<summary><strong>Hint</strong></summary>

Én `if` lige efter `getCurrentUser()`: Er der **ikke** en `user`, så `redirect("/login")`.

</details>

<details>
<summary><strong>Løsning</strong></summary>

```jsx
const user = await getCurrentUser();

if (!user) {
  redirect("/login");
}
```

`redirect()` stopper siden og sender brugeren videre. Koden under den kører kun, når der er en bruger, så `user` er aldrig `null` længere nede.

</details>

### 4.4 Log ud og send til profilen

Skriv en Server Action, `signOut`, i `app/profile/page.js`. Den kalder `supabase.auth.signOut()` og sender brugeren til forsiden. Vis en `<form action={signOut} className="auth-form">` med en _Log out_-knap på profilen.

Ret til sidst `redirect("/")` til `redirect("/profile")` i `signUp` og `signIn`. Så ser brugeren med det samme, at det virkede.

**Tjek:** Log ind, og du lander på profilen. Klik på _Log out_. Cookien er væk, og `/profile` sender dig til `/login`. Commit og push.

<details>
<summary><strong>Hint</strong></summary>

`signOut` ligner `signUp`, men har ingen formular-felter – så den skal ikke have `formData`.

</details>

<details>
<summary><strong>Løsning</strong></summary>

Over komponenten i `app/profile/page.js`:

```js
async function signOut() {
  "use server";

  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/");
}
```

Under `user.sub`:

```jsx
<form action={signOut} className="auth-form">
  <button type="submit">Log out</button>
</form>
```

I `signUp` og `signIn`: `redirect("/profile")` i stedet for `redirect("/")`.

</details>

**Sidder du fast?**

- **_redirect is not defined_?** `import { redirect } from "next/navigation";` øverst i filen.
- **Sender `/profile` dig altid til `/login`?** Tjek, at du skriver `await getCurrentUser()`, og at `proxy.js` ligger i roden.
- **Ender du i en løkke mellem siderne?** Tjekket må kun stå på sider, der skal beskyttes – aldrig på `/login`.

<details>
<summary><strong>Se den fulde løsning til opgave 4</strong></summary>

`lib/auth.js`:

```js
import { createClient } from "@/lib/supabase/server";

// Returns the logged-in user, or null if no one is logged in.
// getClaims() checks the access token in the cookie, so it's safe to use on the server.
// The user's id is in user.sub, and the email is in user.email.
export async function getCurrentUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return data?.claims ?? null;
}
```

`app/profile/page.js`:

```jsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Profile"
};

async function signOut() {
  "use server";

  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/");
}

export default async function ProfilePage() {
  // A Server Component: the check runs on the server, before any HTML is sent
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      <p>User id: {user.sub}</p>
      <form action={signOut} className="auth-form">
        <button type="submit">Log out</button>
      </form>
    </main>
  );
}
```

I `signUp` og `signIn` står der nu `redirect("/profile")` i stedet for `redirect("/")`.

</details>

**Løsning:** [Profilen og log ud](https://github.com/cederdorff/nextjs-supabase-auth/compare/opgave-03-log-ind...opgave-04-profil) · [branchen `opgave-04-profil`](https://github.com/cederdorff/nextjs-supabase-auth/tree/opgave-04-profil)

<hr style="margin: 2rem 0;">

<a id="static-dynamic"></a>

## Ekstra: Static eller dynamic?

Ingen ny kode – du kigger på, hvordan Next.js bygger dine routes.

**Resultat:** Du kan forklare, hvorfor nogle routes er ○ og andre er ƒ.

Stop `npm run dev`, og kør `npm run build`. Kig på listen over routes nederst i outputtet:

```text
┌ ○ /
├ ○ /_not-found
├ ƒ /login
├ ƒ /profile
└ ƒ /signup
```

- **○ Static:** Siden bygges én gang og er den samme for alle.
- **ƒ Dynamic:** Siden bygges ved hver request, fordi den læser noget fra requesten. `/profile` læser cookien, og `/login` og `/signup` læser `searchParams`. Svaret afhænger af, hvem der spørger.

**Tjek:** `/` er ○, og `/profile` er ƒ. Har du sprunget fejlbeskederne over, er `/login` og `/signup` også ○ – de læser jo ikke noget fra requesten.

[Slide: Static eller dynamic?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/static-dynamic)

<hr style="margin: 2rem 0;">

<a id="opgave-5"></a>

## Ekstra – Opgave 5: Flere beskyttede routes

Det samme tjek kan beskytte så mange routes, du vil. Og det kan også gå den anden vej.

**Resultat:** `/members` kræver login, og en bruger, der er logget ind, bliver sendt fra `/login` og `/signup` til profilen.

### 5.1 /members

Opret `app/members/page.js` med en tekst, som kun brugere, der er logget ind, må se. Brug det samme tjek som på profilen. Tilføj et link til `/members` i `components/Header.js`.

**Tjek:** Logget ud sender `/members` dig til `/login`. Logget ind ser du siden.

<details>
<summary><strong>Hint</strong></summary>

Kopiér `app/profile/page.js` som udgangspunkt, og fjern `signOut` og formularen.

</details>

<details>
<summary><strong>Løsning</strong></summary>

`app/members/page.js`:

```jsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "Members"
};

export default async function MembersPage() {
  // The same check as on the profile page
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Members only</h1>
      <p>Welcome back, {user.email}. Only logged-in users can see this page.</p>
    </main>
  );
}
```

I `components/Header.js`:

```jsx
<li>
  <Link href="/members">Members</Link>
</li>
```

</details>

**Hvorfor ikke ét tjek i `layout.js`?** Et layout renderes ikke igen, når du navigerer mellem sider, så tjekket ville ikke køre hver gang. Next.js anbefaler at tjekke på hver side – tæt på det, der skal beskyttes.

### 5.2 Den anden vej

Er man allerede logget ind, giver `/login` og `/signup` ingen mening. Tjek brugeren på begge sider, og send til `/profile`, hvis der **er** en.

**Tjek:** Logget ind sender `/login` og `/signup` dig til profilen. Logget ud ser du formularerne. Commit og push.

<details>
<summary><strong>Hint</strong></summary>

Det er det samme tjek som på profilen – bare uden `!`.

</details>

<details>
<summary><strong>Løsning</strong></summary>

Starten af `app/login/page.js` – `app/signup/page.js` får det samme tjek:

```jsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

// signIn and metadata are the same as before

export default async function LoginPage({ searchParams }) {
  const { error } = await searchParams;

  // Already logged in? Then there is nothing to do here
  const user = await getCurrentUser();

  if (user) {
    redirect("/profile");
  }
  // ...
}
```

</details>

**Løsning:** [/members og den anden vej](https://github.com/cederdorff/nextjs-supabase-auth/compare/opgave-04-profil...opgave-05-flere-routes) · [branchen `opgave-05-flere-routes`](https://github.com/cederdorff/nextjs-supabase-auth/tree/opgave-05-flere-routes)

<hr style="margin: 2rem 0;">

<a id="opgave-6"></a>

## Ekstra – Opgave 6: Login-status i headeren

Headeren viser din e-mail og _Log out_, når du er logget ind – og _Log in_, når du ikke er.

**Resultat:** Headeren skifter, når du logger ind og ud, og arbejdet er pushet.

### 6.1 Del signOut

`AuthStatus` skal også kunne logge ud. I stedet for at skrive `signOut` to gange flytter du den til `lib/actions.js` – med `"use server"` øverst i **filen**. Så er alle funktioner i filen Server Actions, og du kan importere dem, hvor du vil:

```js
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/");
}
```

Slet `signOut` fra profilen, og importér den i stedet: `import { signOut } from "@/lib/actions";`.

**Tjek:** _Log out_ på profilen virker stadig.

<details>
<summary><strong>Løsning</strong></summary>

Starten af `app/profile/page.js` – `signOut` er slettet fra filen, og resten er som før:

```jsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { signOut } from "@/lib/actions";
```

</details>

### 6.2 AuthStatus

Lav en `async` Server Component, `components/AuthStatus.js`, der kalder `getCurrentUser()`:

- **Ingen bruger:** et `Link` til `/login`.
- **Logget ind:** e-mailen som et `Link` til `/profile` og en `<form action={signOut}>` med en knap.

Kopiér [`components/AuthStatus.module.css`](https://github.com/cederdorff/nextjs-supabase-auth/blob/opgave-06-header/components/AuthStatus.module.css).

<details>
<summary><strong>Hint</strong></summary>

To `return`: ét inde i `if (!user)` med linket til `/login` og ét til sidst med e-mailen og _Log out_.

</details>

<details>
<summary><strong>Løsning</strong></summary>

```jsx
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { signOut } from "@/lib/actions";
import styles from "./AuthStatus.module.css";

// Shows the email and Log out when the user is logged in – or Log in when not
export default async function AuthStatus() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Link href="/login" className={styles.login}>
        Log in
      </Link>
    );
  }

  return (
    <div className={styles.status}>
      <Link href="/profile" className={styles.email}>
        {user.email}
      </Link>
      <form action={signOut}>
        <button type="submit" className={styles.logout}>
          Log out
        </button>
      </form>
    </div>
  );
}
```

</details>

### 6.3 Vis den i headeren

Vis `<AuthStatus />` i `components/Header.js` efter `<ul>`, og fjern linkene til _Sign up_ og _Log in_ fra listen.

**Tjek:** Headeren viser din e-mail og _Log out_. Efter _Log out_ viser den _Log in_ – uden at du genindlæser siden. Når en Server Action ændrer cookies, bygger Next.js siden og layoutet igen.

<details>
<summary><strong>Løsning</strong></summary>

```jsx
import Link from "next/link";
import AuthStatus from "@/components/AuthStatus";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Supabase Auth
        </Link>
        <ul className={styles.links}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/members">Members</Link>
          </li>
        </ul>
        <AuthStatus />
      </nav>
    </header>
  );
}
```

</details>

### 6.4 Alt er nu dynamic

Kør `npm run build` – som i [Static eller dynamic?](#static-dynamic). Nu er alle routes ƒ – også `/`. Headeren står i layoutet og læser cookien, så hver side afhænger af, hvem der spørger.

**Tjek:** Alle routes er ƒ. Commit og push.

Det er grunden til, at `AuthStatus` skal pakkes ind i `<Suspense>` i din WordPress-app. Med Cache Components skal resten af siden kunne bygges på forhånd, mens kun headerens login-status venter på requesten.

**Sidder du fast?**

- **Fejl om _async Client Component_?** `AuthStatus` må ikke have `"use client"`.

**Løsning:** [Login-status i headeren](https://github.com/cederdorff/nextjs-supabase-auth/compare/opgave-05-flere-routes...opgave-06-header) · [branchen `opgave-06-header`](https://github.com/cederdorff/nextjs-supabase-auth/tree/opgave-06-header)

<hr style="margin: 2rem 0;">

<a id="videre"></a>

## Videre: Auth i din headless WordPress-app

Nu kender du flowet. I [Supabase Auth i din headless WordPress-app](opgave-2026-10-30-supabase-auth-i-nextjs.md) bygger du det samme ind i din WordPress-app og låser detaljesiderne for posts. Fire ting er anderledes:

- **Du kopierer selv** `lib/supabase/server.js` og `proxy.js` fra dit projekt fra i dag.
- **Alle Server Actions ligger i `lib/actions.js`** – ligesom `signOut` i ekstraopgave 6.
- **Cache Components er slået til** i WordPress-appen. Sider, der læser cookies eller `searchParams`, skal have deres egen `loading.js`, og `AuthStatus` skal pakkes ind i `<Suspense>`.
- **Indholdet i WordPress er stadig offentligt.** Du låser siden i din app – ikke data i WordPress.

<hr style="margin: 2rem 0;">

<a id="fejlfinding"></a>

## Fejlfinding

| Problem | Løsning |
| --- | --- |
| _Your project's URL and Key are required_ | Tjek navnene i `.env.local`, og genstart `npm run dev` |
| _Invalid path specified in request URL_ | URL'en må ikke ende på `/rest/v1` – kun `https://<dit-projekt>.supabase.co` |
| Brugeren oprettes, men der kommer ingen session | Slå _Confirm email_ fra, slet brugeren, og opret den igen |
| _Email rate limit exceeded_ | Slå _Confirm email_ fra |
| `/profile` sender dig altid til `/login` | `proxy.js` skal ligge i roden, og du skal skrive `await getCurrentUser()` |
| _Functions cannot be passed directly to Client Components_ | `"use server"` mangler øverst i din Server Action |
| Redirect-loop | Tjek kun på de sider, der skal beskyttes – aldrig på `/login` |
| _fetch failed_ eller ingen forbindelse | Supabase-projektet er sat på pause. Klik på _Resume project_ |

<hr style="margin: 2rem 0;">

## Materialer

- [Slides: Supabase Auth i Next.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/)
- [nextjs-supabase-auth](https://github.com/cederdorff/nextjs-supabase-auth) – startprojektet på `main` og én løsningsbranch pr. opgave
- [Supabase: Setting up Server-Side Auth for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Next.js: Mutating data](https://nextjs.org/docs/app/getting-started/mutating-data) – Server Actions
- [Next.js: Authentication](https://nextjs.org/docs/app/guides/authentication) – fx hvorfor tjekket står på siden og ikke i layoutet
