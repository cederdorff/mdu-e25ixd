# Opgave: Supabase Auth i Next.js - 30-10-2026

## Formål

Her er dagens opgaver samlet ét sted. De giver din Next.js-app fra 26. oktober brugere: sign up, log ind, log ud, login-status i headeren, en profilside og posts, som kun kan læses af brugere, der er logget ind.

Slides forklarer teorien. Her står, hvad du skal gøre, trin for trin. Hvert trin linker til det slide, det bygger på. Under hver opgave kan du folde den fulde løsning ud. Koden er den samme som på branchen [`supabase-auth`](https://github.com/cederdorff/nextjs-headless-wordpress/tree/supabase-auth) i referencerepoet, hvor hver opgave har sit eget commit.

<hr style="margin: 2rem 0;">

## Sådan bruger du opgaven

- Fortsæt fra den opgave, du nåede til. Er du i tvivl, så tjek dit projekt mod **Du er klar, når** øverst i de foregående opgaver.
- Slut hvert trin med **Tjek**, så du ved, at det virker, før du går videre.
- Prøv selv først. Sidder du fast, så læs **Sidder du fast?**, og fold først **den fulde løsning** ud, når du har prøvet. Nederst står en samlet [fejlfinding](#fejlfinding).
- Commit og push efter hver opgave med Source Control i VS Code eller GitHub Desktop.
- Referencerepoet er på engelsk. Dine tekster og URL'er må gerne være på dansk.

<hr style="margin: 2rem 0;">

## Oversigt

1. [Supabase i projektet](#opgave-1)
2. [Klienten og proxy.js](#opgave-2)
3. [Sign up](#opgave-3)
4. [Log ind](#opgave-4)
5. [Login-status og log ud i headeren](#opgave-5)
6. [Beskyttede sider](#opgave-6)

Til sidst: [Skal jeres produkt have brugere?](#refleksion) og [fejlfinding](#fejlfinding).

<hr style="margin: 2rem 0;">

## Før du starter

Du skal bruge din Next.js-app fra [26. oktober](opgave-2026-10-26-nextjs-og-headless-wordpress.md) med mindst opgave 6 – forside, posts, detaljeside, About og `lib/wordpress.js`.

**Har du ikke en app, der virker?** Start fra referencerepoets commit for opgave 6:

1. Download [ZIP-filen med opgave 6](https://github.com/cederdorff/nextjs-headless-wordpress/archive/8c165b0.zip), pak den ud, og omdøb mappen, fx til `nextjs-wordpress`.
2. Åbn mappen i VS Code, og kør `npm install` i terminalen.
3. Opret `.env.local` i roden med din WordPress-URL – eller test-URL'en – og kør `npm run dev`:

   ```bash
   WORDPRESS_URL=https://headless.cederdorff.dk
   ```

4. Læg projektet på GitHub. ZIP-filen har ingen git-historik, så du starter et nyt repository:
   - **Source Control i VS Code:** Klik på _Initialize Repository_, skriv en besked, fx _Start from task 6_, klik på _Commit_ og derefter _Publish Branch_.
   - **GitHub Desktop:** Vælg _File → Add Local Repository_, vælg mappen, og klik på _create a repository_. Klik på _Publish repository_.

**Tjek:** [http://localhost:3000/posts](http://localhost:3000/posts) viser posts, og et klik på et card åbner detaljesiden.

<hr style="margin: 2rem 0;">

<a id="opgave-1"></a>

## Opgave 1: Supabase i projektet

Du gør et Supabase-projekt klar til login, installerer SDK'et og gemmer URL og nøgle i miljøvariabler.

**Du er klar, når:** Begge Supabase-pakker står i `package.json`, `.env.local` har tre variabler, og arbejdet er pushet.

### 1.1 Gør Supabase-projektet klar

Genbrug dit projekt fra Product optimization, eller opret et nyt i [dashboardet](https://supabase.com/dashboard).

Gå til _Authentication → Sign In / Providers_, slå **Confirm email** fra, og gem. Så kan du logge ind, så snart du har oprettet en bruger – uden at skulle bekræfte en e-mail først.

**Tjek:** Projektet er aktivt – ikke _Paused_ – og _Confirm email_ er slået fra.

[Slide: Hvad er Supabase Auth?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/supabase-auth) · [Slide: Hvad kan det?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/hvad-kan-auth)

### 1.2 Installér SDK'et

Kør i terminalen i projektet:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

`@supabase/supabase-js` er Supabase' SDK. `@supabase/ssr` gemmer sessionen i cookies, så serveren i Next.js kan se, hvem der er logget ind.

**Tjek:** `package.json` har begge pakker under `dependencies`.

[Slide: Samme kald – to måder](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/sdk-samme-kald)

### 1.3 Miljøvariabler

Klik på **Connect** øverst i dit Supabase-projekt. Kopiér projektets URL og din **publishable key**, der starter med `sb_publishable_`, til `.env.local`:

```bash
WORDPRESS_URL=https://dit-domæne.dk
NEXT_PUBLIC_SUPABASE_URL=https://<dit-projekt>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

- **Kun domænet:** URL'en slutter med `.supabase.co` – ikke med `/rest/v1`.
- **Publishable key må være offentlig.** Brug aldrig en nøgle, der starter med `sb_secret_`.

Tilføj de to variabler – uden dine rigtige værdier – i `.env.example`, og genstart `npm run dev`. Commit og push.

**Tjek:** Source Control viser `package.json`, `package-lock.json` og `.env.example` – men ikke `.env.local`.

[Slide: To nøgler](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/noegler)

**Sidder du fast?**

- **Står dit projekt som _Paused_?** Klik på _Resume project_, og vent et par minutter.
- **Finder du ingen publishable key?** Se under _Project Settings → API Keys_.

<details>
<summary><strong>Se den fulde løsning til opgave 1</strong></summary>

`.env.example`:

```bash
# The URL of your WordPress site without a trailing slash
WORDPRESS_URL=https://your-domain.com

# Supabase: find both values in the Connect panel of your project
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your-key
```

</details>

**Referencerepo:** [Supabase-pakker og miljøvariabler](https://github.com/cederdorff/nextjs-headless-wordpress/commit/d1cb0ae)

<hr style="margin: 2rem 0;">

<a id="opgave-2"></a>

## Opgave 2: Klienten og proxy.js

Du opretter to filer, som du kopierer fra løsningen nedenfor. Du skal ikke kunne skrive dem selv, men du skal kunne forklare, hvad de gør.

**Du er klar, når:** `lib/supabase/server.js` og `proxy.js` findes, `npm run build` går igennem, og arbejdet er pushet.

### 2.1 Klienten

Opret `lib/supabase/server.js`. Den laver en Supabase-klient, der læser sessionen fra cookies i requesten. Al din Supabase-kode i dag kører på serveren og bruger den.

**Tjek:** Filen ligger i en ny mappe, `supabase`, inde i `lib/`.

[Slide: Klienten læser cookies](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/server-klient)

### 2.2 proxy.js

Opret `proxy.js` i **roden** af projektet – ved siden af `package.json`. Next.js kører den før hver request. Den fornyer sessionen, når access token'et er udløbet, så brugeren ikke bliver logget ud efter en time. Før Next.js 16 hed filen `middleware.js`.

**Tjek:** Stop `npm run dev`, og kør `npm run build`. Nederst i outputtet står `ƒ Proxy (Middleware)`. Commit og push.

[Slide: Hvorfor proxy.js?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/proxy) · [Slide: Nøglekortet](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/tokens)

**Sidder du fast?**

- **Ingen `Proxy` i outputtet?** `proxy.js` skal ligge i roden – ikke i `app/`.
- **_Your project's URL and Key are required_?** Tjek navnene i `.env.local`, og genstart `npm run dev`.

<details>
<summary><strong>Se den fulde løsning til opgave 2</strong></summary>

`lib/supabase/server.js`:

```js
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// The Supabase client for the server: Server Components and Server Actions.
// It reads the session from the cookies in the request.
// Create a new client every time you need it – never share one between requests.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components can't write cookies.
          // That's fine, because proxy.js refreshes the session.
        }
      }
    }
  });
}
```

`proxy.js` i roden:

```js
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

// Next.js runs proxy.js before every request that matches the matcher.
// Before Next.js 16 the file was called middleware.js.
// If the access token has expired, Supabase refreshes the session,
// and the new cookies are sent to both the page and the browser.
export async function proxy(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          // The page reads the new cookies from the request
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });

          // The browser saves the new cookies from the response
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));

          // A response with a session must never be cached and shown to someone else
          Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
        }
      }
    }
  );

  // Don't write code between createServerClient and getClaims().
  // getClaims() is what refreshes the session when the access token has expired.
  await supabase.auth.getClaims();

  return response;
}

export const config = {
  matcher: [
    // Every path except static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
```

Koden følger [Supabase' guide til Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs), oversat til JavaScript.

</details>

**Referencerepo:** [Klienten og proxy.js](https://github.com/cederdorff/nextjs-headless-wordpress/commit/b03df31)

<hr style="margin: 2rem 0;">

<a id="opgave-3"></a>

## Opgave 3: Sign up

Du laver en side med en formular, hvor man kan oprette en bruger.

**Du er klar, når:** Du kan oprette en bruger på `/signup`, brugeren står i Supabase, en fejl giver en besked, og arbejdet er pushet.

### 3.1 Formular og Server Action

En **Server Action** er en funktion, der kører på serveren, men som en formular kan kalde. Opret `lib/actions.js` med `"use server"` øverst og en `signUp`-funktion:

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

Opret `app/signup/page.js` med en `<form action={signUp} className="auth-form">` og to felter med `name="email"` og `name="password"`. `formData.get("email")` henter feltet med `name="email"`. Giv hvert felt en `<label>`.

Kopiér CSS'en til `.auth-form` og `.form-error` nederst i [`app/globals.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/supabase-auth/app/globals.css) ind i din egen `globals.css`.

**Tjek:** Opret en bruger på [http://localhost:3000/signup](http://localhost:3000/signup). Du lander på forsiden, og under _Authentication → Users_ i Supabase står din nye bruger.

[Slide: Login-flowet](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/sekvens) · [Slide: Server Action](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/server-action)

### 3.2 Vis en fejl

Prøv at oprette den samme bruger igen. Der sker ingenting – fejlen forsvinder på serveren. Send brugeren tilbage til formularen med `?error=true` i URL'en, når Supabase svarer med en fejl:

```js
const { error } = await supabase.auth.signUp({ email, password });

if (error) {
  redirect("/signup?error=true");
}
```

På siden læser du `searchParams` – ligesom du læste `params` på detaljesiden:

```jsx
export default async function SignUpPage({ searchParams }) {
  const { error } = await searchParams;
```

Vis en besked over formularen, når `error` er sat:

```jsx
{error && (
  <p className="form-error" role="alert">
    Could not sign up. Maybe the email is already in use.
  </p>
)}
```

Siden læser nu URL'en, så den skal have sin egen `app/signup/loading.js` – samme regel som 26. oktober. Giv også password-feltet `minLength={6}`, så browseren selv siger til, hvis adgangskoden er for kort.

**Tjek:** Den samme e-mail to gange giver din fejlbesked, og `npm run build` går igennem.

### 3.3 Find sessionen

Åbn browserens udviklerværktøjer på forsiden. Gå til _Application_ (Chrome) eller _Storage_ (Safari og Firefox), og kig under **Cookies**, **Local storage** og **Session storage**.

**Tjek:** Under Cookies står en cookie, der slutter med `-auth-token`. Det er din session. Commit og push.

[Slide: Cookies, localStorage eller sessionStorage?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/storage)

**Sidder du fast?**

- **Står brugeren i Supabase, men er der ingen `-auth-token`-cookie?** _Confirm email_ er slået til. Slå det fra, som i 1.1, slet brugeren under _Authentication → Users_, og prøv igen.
- **Får du altid fejlbeskeden?** Log `error.message` med `console.log` i `signUp`, og kig i terminalen.
- **_Uncached or runtime data … outside of `<Suspense>`_?** Tilføj `app/signup/loading.js`.

<details>
<summary><strong>Se den fulde løsning til opgave 3</strong></summary>

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

`app/signup/loading.js`:

```jsx
export default function Loading() {
  return (
    <main>
      <p>Loading …</p>
    </main>
  );
}
```

CSS: `.auth-form` og `.form-error` står nederst i [`app/globals.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/supabase-auth/app/globals.css).

</details>

**Referencerepo:** [Sign up](https://github.com/cederdorff/nextjs-headless-wordpress/commit/114e9ad)

<hr style="margin: 2rem 0;">

<a id="opgave-4"></a>

## Opgave 4: Log ind

Login-siden er næsten en kopi af sign up-siden. Kun Server Action'en og teksterne er nye.

**Du er klar, når:** Du kan logge ind på `/login`, en forkert adgangskode giver en fejlbesked, og arbejdet er pushet.

### 4.1 signIn og /login

Tilføj en `signIn`-funktion i `lib/actions.js`. Den ligner `signUp`, men kalder `signInWithPassword` og sender til `/login?error=true` ved fejl:

```js
const { error } = await supabase.auth.signInWithPassword({ email, password });
```

Kopiér `app/signup/` til `app/login/`, og ret siden til: `signIn` i stedet for `signUp`, overskriften _Log in_ og fejlbeskeden _Wrong email or password._

**Tjek:** Log ind med den bruger, du oprettede i opgave 3. Du lander på forsiden.

[Slide: Server Action](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/server-action)

### 4.2 Test

Prøv med en forkert adgangskode og med en e-mail, der ikke findes. Commit og push.

**Tjek:** Begge giver _Wrong email or password._ Supabase siger med vilje ikke, hvad der var forkert, så ingen kan bruge login-siden til at finde ud af, hvem der har en bruger.

**Sidder du fast?**

- **Logger du ind, men ser intet nyt?** Det er rigtigt nok. Headeren viser først login-status i opgave 5. Tjek cookien under _Application_.

<details>
<summary><strong>Se den fulde løsning til opgave 4</strong></summary>

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

`app/login/loading.js` er den samme som `app/signup/loading.js`.

</details>

**Referencerepo:** [Log ind](https://github.com/cederdorff/nextjs-headless-wordpress/commit/3e01b3f)

<hr style="margin: 2rem 0;">

<a id="opgave-5"></a>

## Opgave 5: Login-status og log ud i headeren

Headeren viser din e-mail og _Log out_, når du er logget ind – og _Log in_, når du ikke er.

**Du er klar, når:** Headeren skifter, når du logger ind og ud, `npm run build` går igennem, og arbejdet er pushet.

### 5.1 Hvem er logget ind?

Du skal finde brugeren i headeren, på profilen og på detaljesiden. Saml det i én funktion i `lib/auth.js` – ligesom `lib/wordpress.js` samler kaldene til WordPress:

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

### 5.2 AuthStatus og signOut

Tilføj `signOut` i `lib/actions.js`. Den kalder `supabase.auth.signOut()` og sender brugeren til forsiden.

Lav en `async` komponent, `components/AuthStatus.js`, der kalder `getCurrentUser()`:

- **Ingen bruger:** et `Link` til `/login`.
- **Logget ind:** e-mailen som et `Link` til `/profile` og en `<form action={signOut}>` med en knap.

Kopiér [`components/AuthStatus.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/supabase-auth/components/AuthStatus.module.css).

### 5.3 Vis den i headeren med Suspense

Vis `<AuthStatus />` i `components/Header.js` efter `<ul>`, og kør `npm run build`. Det fejler med _uncached or runtime data … outside of `<Suspense>`_. Headeren står på alle sider, og nu læser den cookies, som først findes, når en bruger sender en request. Pak den ind i `<Suspense>`, så resten af headeren vises med det samme:

```jsx
<Suspense fallback={null}>
  <AuthStatus />
</Suspense>
```

Importér `Suspense` fra `react`.

**Tjek:** `npm run build` går igennem. Headeren viser din e-mail og _Log out_. Efter _Log out_ viser den _Log in_, og cookien er væk. Commit og push.

[Slide: Headeren venter på cookien](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/suspense)

**Sidder du fast?**

- **Viser headeren _Log in_ efter login?** Tjek, at `proxy.js` ligger i roden, og at du skriver `await getCurrentUser()`.
- **Fejl om _async Client Component_?** `AuthStatus` må ikke have `"use client"`.

<details>
<summary><strong>Se den fulde løsning til opgave 5</strong></summary>

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

Nederst i `lib/actions.js`:

```js
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/");
}
```

`components/AuthStatus.js`:

```jsx
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { signOut } from "@/lib/actions";
import styles from "./AuthStatus.module.css";

// Reads the session, so it must be inside <Suspense> (see Header.js)
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
import { Suspense } from "react";
import Link from "next/link";
import AuthStatus from "@/components/AuthStatus";
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
        {/* AuthStatus reads the cookies of the request, so it waits for the request.
            Suspense lets the rest of the header render right away. */}
        <Suspense fallback={null}>
          <AuthStatus />
        </Suspense>
      </nav>
    </header>
  );
}
```

</details>

**Referencerepo:** [Login-status og log ud](https://github.com/cederdorff/nextjs-headless-wordpress/commit/37a4948)

<hr style="margin: 2rem 0;">

<a id="opgave-6"></a>

## Opgave 6: Beskyttede sider

Profilsiden og alle posts kan kun ses af brugere, der er logget ind. Alle andre bliver sendt til `/login`.

**Du er klar, når:** `/profile` og `/posts/<slug>` sender dig til `/login`, når du er logget ud, viser indholdet, når du er logget ind, og arbejdet er pushet.

### 6.1 Profilsiden

Opret `app/profile/page.js`. Tjek brugeren øverst, og kald `redirect("/login")`, hvis der ingen er – ligesom du kaldte `notFound()`, når en post ikke fandtes:

```jsx
const user = await getCurrentUser();

if (!user) {
  redirect("/login");
}
```

Vis `user.email` og `user.sub`. Siden læser cookies, så den skal have sin egen `app/profile/loading.js`.

**Tjek:** Et klik på din e-mail i headeren åbner profilen. Logget ud lander du på `/login`.

[Slide: Én if på serveren](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/beskyt-flow)

### 6.2 Lås detaljesiderne

Sæt det samme tjek øverst i `app/posts/[slug]/page.js` – før posten hentes. Detaljesiden har allerede en `loading.js`.

**Tjek:** Log ud, og klik på et card. Du lander på `/login`. Log ind, og klik igen. Nu kan du læse posten. Test også i et privat vindue.

### 6.3 Er indholdet nu beskyttet?

Log ud, og åbn `/wp-json/wp/v2/posts` på din WordPress.

**Tjek:** Hele indholdet står der stadig. Du har låst **siden** i din app – ikke **data** i WordPress. Data beskytter vi 10. november med Row Level Security. Kør `npm run build`, og commit og push.

[Slide: Skjul ikke bare linket](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/skjul-ikke)

**Sidder du fast?**

- **_redirect is not defined_?** Importér den sammen med `notFound`: `import { notFound, redirect } from "next/navigation";`.
- **Ender du i en løkke mellem siderne?** Tjekket må kun stå på de sider, der skal beskyttes – aldrig på `/login` eller i `app/layout.js`.

<details>
<summary><strong>Se den fulde løsning til opgave 6</strong></summary>

`app/profile/page.js`:

```jsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

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
    </main>
  );
}
```

`app/profile/loading.js`:

```jsx
export default function Loading() {
  return (
    <main>
      <p>Loading your profile …</p>
    </main>
  );
}
```

Starten af `app/posts/[slug]/page.js` – resten af siden er som før:

```jsx
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getPostBySlug } from "@/lib/wordpress";
import { formatDate } from "@/lib/format";
import styles from "./page.module.css";

export default async function PostPage({ params }) {
  // Only logged-in users can read a post
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { slug } = await params;
  const post = await getPostBySlug(slug);
  // ...
}
```

</details>

**Referencerepo:** [Beskyttede sider](https://github.com/cederdorff/nextjs-headless-wordpress/commit/829f006)

<hr style="margin: 2rem 0;">

<a id="refleksion"></a>

## Skal jeres produkt have brugere?

På mandag starter gruppeprojektet. Tag stilling til tre spørgsmål i jeres gruppe, og skriv svarene ned:

1. **Hvad kan en bruger, der er logget ind, som andre ikke kan?** Eller er produktet bedst uden login?
2. **Hvilke data om brugeren skal I gemme?** Jo færre, jo mindre skal I beskytte.
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
| Login virker, men headeren viser _Log in_ | `proxy.js` skal ligge i roden og hedde `proxy.js` – ikke `middleware.js` |
| Redirect-loop | Tjek kun på de sider, der skal beskyttes – aldrig på `/login` |
| _Uncached or runtime data … outside of `<Suspense>`_ | `<Suspense>` om `AuthStatus` og `loading.js` ved siden af sider, der læser cookies eller `searchParams` |
| _fetch failed_ eller ingen forbindelse | Supabase-projektet er sat på pause. Klik på _Resume project_ |

<hr style="margin: 2rem 0;">

## Materialer

- [Slides: Supabase Auth i Next.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/)
- [Referencerepo: branchen `supabase-auth`](https://github.com/cederdorff/nextjs-headless-wordpress/tree/supabase-auth)
- [Supabase: Setting up Server-Side Auth for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Next.js: Proxy](https://nextjs.org/docs/app/getting-started/proxy)
