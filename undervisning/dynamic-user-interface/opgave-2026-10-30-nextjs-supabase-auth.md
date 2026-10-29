# Opgave: Next.js og Supabase Auth - 30-10-2026

## Formål

I dag bygger du en lille Next.js-app med brugere. Du får et startprojekt, hvor Supabase allerede er sat op, så du kan koncentrere dig om det vigtige: routes, formularer og et tjek på serveren.

Når du er færdig, har appen fire routes. Kun profilen kræver login:

| Route      | Fil                  | Hvem må se den?   |
| ---------- | -------------------- | ----------------- |
| `/`        | `app/page.js`        | Alle · findes allerede |
| `/signup`  | `app/signup/page.js` | Alle              |
| `/login`   | `app/login/page.js`  | Alle              |
| `/profile` | `app/profile/page.js` | Kun brugere, der er logget ind |

Bagefter overfører du det til din headless WordPress-app i [den næste opgave](opgave-2026-10-30-supabase-auth-i-nextjs.md).

<hr style="margin: 2rem 0;">

## Sådan bruger du opgaven

- Slut hvert trin med **Tjek**, så du ved, at det virker, før du går videre.
- Prøv selv først. Sidder du fast, så fold et **Hint** ud. Fold først **den fulde løsning** ud, når du har prøvet.
- Commit og push efter hver opgave med Source Control i VS Code eller GitHub Desktop.
- CSS'en til formularerne ligger allerede i `app/globals.css`. Du skal bare bruge `className="auth-form"`.
- Hver opgave har sin egen løsningsbranch i [nextjs-supabase-auth](https://github.com/cederdorff/nextjs-supabase-auth#løsninger). **Løsning** nederst i hver opgave viser kun det, der er nyt. Koden er på engelsk. Dine tekster må gerne være på dansk.

<hr style="margin: 2rem 0;">

## Oversigt

1. [Hent startprojektet](#opgave-1)
2. [Sign up](#opgave-2)
3. [Log ind](#opgave-3)
4. [Profilen – den beskyttede route](#opgave-4)

**Ekstra:** [5. Flere beskyttede routes](#opgave-5) · [6. Login-status i headeren](#opgave-6)

**Videre:** [Auth i din headless WordPress-app](#videre) · [Skal jeres produkt have brugere?](#refleksion) · [Fejlfinding](#fejlfinding)

<hr style="margin: 2rem 0;">

<a id="opgave-1"></a>

## Opgave 1: Hent startprojektet

Du laver dit eget repository ud fra startprojektet og forbinder det til dit Supabase-projekt.

**Du er klar, når:** Appen kører lokalt med dine Supabase-nøgler, og projektet ligger på GitHub.

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

Genbrug dit projekt fra Product optimization, eller opret et nyt i [dashboardet](https://supabase.com/dashboard). Gå til _Authentication → Sign In / Providers_, slå **Confirm email** fra, og gem. Så kan du logge ind med det samme – uden at bekræfte en e-mail først.

Kopiér `.env.example` til en ny fil, `.env.local`, i roden. Klik på **Connect** øverst i Supabase, og indsæt projektets URL og din **publishable key**:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<dit-projekt>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Kør `npm run dev`, og åbn [http://localhost:3000](http://localhost:3000).

**Tjek:** Forsiden viser tre routes. Et klik på `/signup` giver _Page not found_. Det er rigtigt nok – den route laver du i opgave 2. Source Control viser ikke `.env.local`. Den må ikke komme på GitHub.

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

**Startprojektet:** [`main`](https://github.com/cederdorff/nextjs-supabase-auth/tree/main)

<hr style="margin: 2rem 0;">

<a id="opgave-2"></a>

## Opgave 2: Sign up

Du laver routen `/signup` med en formular, der opretter en bruger i Supabase.

**Du er klar, når:** Du kan oprette en bruger på `/signup`, brugeren står i Supabase, en fejl giver en besked, og arbejdet er pushet.

### 2.1 Opret routen

Mappen er URL'en, og filen hedder altid `page.js` – ligesom 26. oktober. Opret `app/signup/page.js` med en `<h1>`.

**Tjek:** [http://localhost:3000/signup](http://localhost:3000/signup) viser din overskrift i stedet for _Page not found_.

### 2.2 Formularen

Tilføj en `<form className="auth-form">` med et felt til e-mail, et til adgangskode og en knap. Giv hvert felt en `<label>` og en `name`. Det er `name`, du bruger til at hente værdien på serveren.

**Tjek:** Siden viser en pæn formular. Der sker ingenting, når du klikker på knappen – endnu.

<details>
<summary><strong>Hint: Formularen</strong></summary>

```jsx
<form className="auth-form">
  <label htmlFor="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label htmlFor="password">Password · at least 6 characters</label>
  <input id="password" name="password" type="password" minLength={6} required />

  <button type="submit">Sign up</button>
</form>
```

`minLength={6}` får browseren til selv at sige til, hvis adgangskoden er for kort. Supabase kræver mindst 6 tegn.

</details>

### 2.3 Server Action

En **Server Action** er en funktion, der kører på serveren, men som en formular kan kalde. Opret `lib/actions.js`:

```js
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signUp(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  await supabase.auth.signUp({ email, password });

  redirect("/");
}
```

Importér `signUp` i `app/signup/page.js`, og giv formularen `action={signUp}`.

**Tjek:** Opret en bruger. Du lander på forsiden, og under _Authentication → Users_ i Supabase står din nye bruger.

[Slide: Login-flowet](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/sekvens) · [Slide: Server Action](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/server-action)

### 2.4 Find sessionen

Åbn browserens udviklerværktøjer. Gå til _Application_ (Chrome) eller _Storage_ (Safari og Firefox), og kig under **Cookies**.

**Tjek:** Der står en cookie, der slutter med `-auth-token`. Det er din session.

[Slide: Cookies, localStorage eller sessionStorage?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/storage)

### 2.5 Vis en fejl

Opret den samme bruger igen. Der sker ingenting – fejlen forsvinder på serveren. Send brugeren tilbage til `/signup?error=true`, når Supabase svarer med en fejl, og vis en besked på siden, når `error` står i URL'en.

**Tjek:** Den samme e-mail to gange giver din fejlbesked. Commit og push.

<details>
<summary><strong>Hint: Fejlen i Server Action'en</strong></summary>

```js
const { error } = await supabase.auth.signUp({ email, password });

if (error) {
  redirect("/signup?error=true");
}
```

</details>

<details>
<summary><strong>Hint: Fejlen på siden</strong></summary>

Læs `searchParams` – ligesom du læste `params` på detaljesiden. Siden skal være `async`:

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

<details>
<summary><strong>Se den fulde løsning til opgave 2</strong></summary>

`lib/actions.js`:

```js
"use server";

// Server Actions run on the server, even when a form in the browser calls them.

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signUp(formData) {
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
```

`app/signup/page.js`:

```jsx
import Link from "next/link";
import { signUp } from "@/lib/actions";

export const metadata = {
  title: "Sign up"
};

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
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password · at least 6 characters</label>
        <input id="password" name="password" type="password" minLength={6} required />

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

Login-siden er næsten en kopi af sign up-siden. Kun funktionen og teksterne er nye.

**Du er klar, når:** Du kan logge ind på `/login`, en forkert adgangskode giver en fejlbesked, og arbejdet er pushet.

### 3.1 Kopiér routen

Kopiér mappen `app/signup/` til `app/login/`. Ret overskriften og knappen til _Log in_, fejlbeskeden til _Wrong email or password._, og linket nederst til `/signup`.

**Tjek:** [http://localhost:3000/login](http://localhost:3000/login) viser din login-side.

### 3.2 signIn

Tilføj en `signIn`-funktion nederst i `lib/actions.js`. Den ligner `signUp`, men kalder `signInWithPassword` og sender til `/login?error=true` ved fejl. Brug den i formularen på login-siden.

**Tjek:** Log ind med den bruger, du oprettede i opgave 2. Du lander på forsiden.

[Slide: Server Action](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/server-action)

<details>
<summary><strong>Hint: Det, der er anderledes</strong></summary>

```js
const { error } = await supabase.auth.signInWithPassword({ email, password });

if (error) {
  redirect("/login?error=true");
}
```

På siden: `import { signIn } from "@/lib/actions";` og `<form action={signIn} className="auth-form">`.

</details>

### 3.3 Test fejlen

Prøv med en forkert adgangskode og med en e-mail, der ikke findes. Commit og push.

**Tjek:** Begge giver _Wrong email or password._ Supabase siger med vilje ikke, hvad der var forkert, så ingen kan bruge login-siden til at finde ud af, hvem der har en bruger.

**Sidder du fast?**

- **Logger du ind, men ser intet nyt?** Det er rigtigt nok. Du kan først se, at du er logget ind, når du har lavet profilen i opgave 4. Tjek cookien under _Application_ imens.

<details>
<summary><strong>Se den fulde løsning til opgave 3</strong></summary>

Nederst i `lib/actions.js`:

```js
export async function signIn(formData) {
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

`app/login/page.js`:

```jsx
import Link from "next/link";
import { signIn } from "@/lib/actions";

export const metadata = {
  title: "Log in"
};

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
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />

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

**Du er klar, når:** `/profile` viser din e-mail, når du er logget ind, sender dig til `/login`, når du ikke er, du kan logge ud, og arbejdet er pushet.

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

Opret `app/profile/page.js`. Gør komponenten `async`, kald `await getCurrentUser()`, og vis `user.email` og `user.sub`.

**Tjek:** Logget ind viser `/profile` din e-mail og dit id. Åbn nu `/profile` i et **privat vindue**. Siden fejler, fordi `user` er `null`. Det løser du i næste trin.

### 4.3 Beskyt routen

Tjek brugeren øverst i komponenten, og send til `/login`, hvis der ingen er – ligesom du kaldte `notFound()`, når en post ikke fandtes. `redirect` importerer du fra `next/navigation`.

**Tjek:** I det private vindue lander du nu på `/login`. Log ind der, og åbn `/profile` igen.

[Slide: Én if på serveren](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/beskyt-flow)

<details>
<summary><strong>Hint: Tjekket</strong></summary>

```jsx
const user = await getCurrentUser();

if (!user) {
  redirect("/login");
}
```

`redirect()` stopper siden. Koden under den kører kun, når der er en bruger.

</details>

### 4.4 Log ud og send til profilen

Tilføj `signOut` nederst i `lib/actions.js`. Den kalder `supabase.auth.signOut()` og sender brugeren til forsiden. Vis en `<form action={signOut} className="auth-form">` med en _Log out_-knap på profilen.

Ret til sidst `redirect("/")` til `redirect("/profile")` i `signUp` og `signIn`. Så ser brugeren med det samme, at det virkede.

**Tjek:** Log ind, og du lander på profilen. Klik på _Log out_. Cookien er væk, og `/profile` sender dig til `/login`. Commit og push.

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
import { signOut } from "@/lib/actions";

export const metadata = {
  title: "Profile"
};

export default async function ProfilePage() {
  // Check on the server, before anything is sent to the browser
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

Nederst i `lib/actions.js` – og `redirect("/profile")` i stedet for `redirect("/")` i `signUp` og `signIn`:

```js
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/");
}
```

</details>

**Løsning:** [Profilen og log ud](https://github.com/cederdorff/nextjs-supabase-auth/compare/opgave-03-log-ind...opgave-04-profil) · [branchen `opgave-04-profil`](https://github.com/cederdorff/nextjs-supabase-auth/tree/opgave-04-profil)

<hr style="margin: 2rem 0;">

<a id="opgave-5"></a>

## Ekstra – Opgave 5: Flere beskyttede routes

Det samme tjek kan beskytte så mange routes, du vil. Og det kan også gå den anden vej.

**Du er klar, når:** `/members` kræver login, og en bruger, der er logget ind, bliver sendt fra `/login` og `/signup` til profilen.

### 5.1 /members

Opret `app/members/page.js` med en tekst, som kun brugere, der er logget ind, må se. Brug det samme tjek som på profilen. Tilføj et link til `/members` i `components/Header.js`.

**Tjek:** Logget ud sender `/members` dig til `/login`. Logget ind ser du siden.

### 5.2 Den anden vej

Er man allerede logget ind, giver `/login` og `/signup` ingen mening. Tjek brugeren på begge sider, og send til `/profile`, hvis der **er** en.

**Tjek:** Logget ind sender `/login` og `/signup` dig til profilen. Logget ud ser du formularerne. Commit og push.

<details>
<summary><strong>Hint: Den omvendte if</strong></summary>

```jsx
const user = await getCurrentUser();

if (user) {
  redirect("/profile");
}
```

</details>

<details>
<summary><strong>Se den fulde løsning til opgave 5</strong></summary>

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

Starten af `app/login/page.js` – `app/signup/page.js` får det samme tjek:

```jsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { signIn } from "@/lib/actions";

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

**Du er klar, når:** Headeren skifter, når du logger ind og ud, og arbejdet er pushet.

### 6.1 AuthStatus

Lav en `async` komponent, `components/AuthStatus.js`, der kalder `getCurrentUser()`:

- **Ingen bruger:** et `Link` til `/login`.
- **Logget ind:** e-mailen som et `Link` til `/profile` og en `<form action={signOut}>` med en knap.

Kopiér [`components/AuthStatus.module.css`](https://github.com/cederdorff/nextjs-supabase-auth/blob/opgave-06-header/components/AuthStatus.module.css).

### 6.2 Vis den i headeren

Vis `<AuthStatus />` i `components/Header.js` efter `<ul>`, og fjern linkene til _Sign up_ og _Log in_ fra listen.

**Tjek:** Headeren viser din e-mail og _Log out_. Efter _Log out_ viser den _Log in_. Commit og push.

**Sidder du fast?**

- **Fejl om _async Client Component_?** `AuthStatus` må ikke have `"use client"`.

<details>
<summary><strong>Se den fulde løsning til opgave 6</strong></summary>

`components/AuthStatus.js`:

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

`components/Header.js`:

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

**Løsning:** [Login-status i headeren](https://github.com/cederdorff/nextjs-supabase-auth/compare/opgave-05-flere-routes...opgave-06-header) · [branchen `opgave-06-header`](https://github.com/cederdorff/nextjs-supabase-auth/tree/opgave-06-header)

<hr style="margin: 2rem 0;">

<a id="videre"></a>

## Videre: Auth i din headless WordPress-app

Nu kender du flowet. I [Supabase Auth i din headless WordPress-app](opgave-2026-10-30-supabase-auth-i-nextjs.md) bygger du det samme ind i appen fra 26. oktober og låser detaljesiderne for posts. Tre ting er anderledes:

- **Du kopierer selv** `lib/supabase/server.js` og `proxy.js` fra dit projekt fra i dag.
- **Cache Components er slået til** i WordPress-appen. Sider, der læser cookies eller `searchParams`, skal have deres egen `loading.js`, og `AuthStatus` skal pakkes ind i `<Suspense>`.
- **Indholdet i WordPress er stadig offentligt.** Du låser siden i din app – ikke data i WordPress.

<hr style="margin: 2rem 0;">

<a id="refleksion"></a>

## Skal jeres produkt have brugere?

På mandag starter gruppeprojektet. Tag stilling til tre spørgsmål i jeres gruppe, og skriv svarene ned:

1. **Hvad kan en bruger, der er logget ind, som andre ikke kan?** Eller er produktet bedst uden login?
2. **Hvilke routes skal kræve login?** Og hvilke data om brugeren skal I gemme?
3. **Hvem må se og ændre hvad?** Det er grundlaget for jeres afsnit om it-sikkerhed – og for 10. november.

[Slide: Skal jeres produkt have brugere?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/projekt)

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
| Redirect-loop | Tjek kun på de sider, der skal beskyttes – aldrig på `/login` |
| _fetch failed_ eller ingen forbindelse | Supabase-projektet er sat på pause. Klik på _Resume project_ |

<hr style="margin: 2rem 0;">

## Materialer

- [Slides: Supabase Auth i Next.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/)
- [nextjs-supabase-auth](https://github.com/cederdorff/nextjs-supabase-auth) – startprojektet på `main` og én løsningsbranch pr. opgave
- [Supabase: Setting up Server-Side Auth for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Next.js: Mutating data](https://nextjs.org/docs/app/getting-started/mutating-data)
