# Opgave: Supabase Auth i din headless WordPress-app - 30-10-2026

## Formål

Du bygger det samme login ind i din headless WordPress-app fra 26. oktober: sign up, log ind, en profil og posts, som kun brugere, der er logget ind, kan læse. Lav [Next.js og Supabase Auth](opgave-2026-10-30-nextjs-supabase-auth.md) først. Opgaverne her følger den samme rækkefølge, og koden er næsten den samme.

Det sker i koden, når du bruger siderne:

```text
/signup       -> signUp()         -> supabase.auth.signUp()             -> cookie sat     -> redirect("/profile")
/login        -> signIn()         -> supabase.auth.signInWithPassword() -> cookie sat     -> redirect("/profile")
/profile      -> getCurrentUser() -> tjekket på serveren                                  -> vis brugeren, eller redirect("/login")
/posts/[slug] -> getCurrentUser() -> tjekket på serveren                                  -> vis posten, eller redirect("/login")
Log out       -> signOut()        -> supabase.auth.signOut()            -> cookie slettet -> redirect("/")
```

**Det er anderledes end i Next.js og Supabase Auth:**

- **Supabase er ikke sat op.** I opgave 1 installerer du SDK'et og kopierer klienten, `proxy.js` og CSS'en fra dit projekt fra i dag.
- **Cache Components er slået til.** Sider, der læser cookies eller `searchParams`, skal have deres egen `loading.js`, og `AuthStatus` skal pakkes ind i `<Suspense>`.
- **Du låser detaljesiderne for posts.** Men indholdet i WordPress er stadig offentligt – du låser siden i din app, ikke data i WordPress.

<hr style="margin: 2rem 0;">

## Sådan bruger du opgaven

- Slut hvert trin med **Tjek**. Trin mærket **valgfri** kan du tage til sidst.
- Sidder du fast? Fold **Hint** ud – og **Løsning**, når du har prøvet selv.
- Commit og push efter hver opgave med Source Control i VS Code eller GitHub Desktop.

<hr style="margin: 2rem 0;">

## Oversigt

1. [Gør projektet klar](#opgave-1)
2. [Sign up](#opgave-2)
3. [Log ind](#opgave-3)
4. [Profilen og låste posts](#opgave-4)
5. [Login-status i headeren](#opgave-5)

**Til sidst:** [Skal jeres produkt have brugere?](#refleksion)

Sidder du fast? Se [Fejlfinding](#fejlfinding).

<hr style="margin: 2rem 0;">

## Før du starter

Du skal bruge din WordPress-app fra [26. oktober](opgave-2026-10-26-nextjs-og-headless-wordpress.md) med mindst opgave 6 – forside, posts, detaljeside, About og `lib/wordpress.js`. Åbn den i VS Code, og kør `npm run dev`.

**Tjek:** [http://localhost:3000/posts](http://localhost:3000/posts) viser posts, og et klik på et card åbner detaljesiden.

**Har du ikke en app, der virker?** Brug referencerepoet som template:

1. Åbn [nextjs-headless-wordpress](https://github.com/cederdorff/nextjs-headless-wordpress) på GitHub. Klik på **Use this template → Create a new repository**, giv det et navn, fx `nextjs-headless-wordpress`, og klik på _Create repository_.
2. Klon dit nye repository:
   - **VS Code:** Åbn et nyt vindue, klik på _Clone Git Repository_, og vælg dit repository.
   - **GitHub Desktop:** Vælg _File → Clone Repository_, og vælg dit repository.
3. Åbn mappen i VS Code, og kør i terminalen:

   ```bash
   npm install
   ```

4. Kopiér `.env.example` til en ny fil, `.env.local`, i roden, og skriv URL'en til din WordPress – eller test-URL'en:

   ```bash
   WORDPRESS_URL=https://headless.cederdorff.dk
   ```

5. Kør `npm run dev`, og lav tjekket ovenfor.

<hr style="margin: 2rem 0;">

<a id="opgave-1"></a>

## Opgave 1: Gør projektet klar

**Resultat:** Supabase er sat op i din WordPress-app – ligesom i startprojektet fra [Next.js og Supabase Auth](opgave-2026-10-30-nextjs-supabase-auth.md#opgave-1).

### 1.1 Installér SDK'et

Brug det samme Supabase-projekt som i Next.js og Supabase Auth – så virker dine brugere fra i dag også her, og _Confirm email_ er allerede slået fra. Kør i terminalen:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

`@supabase/supabase-js` er Supabase' SDK. `@supabase/ssr` gemmer sessionen i cookies, så serveren i Next.js kan se, hvem der er logget ind.

**Tjek:** `package.json` har begge pakker under `dependencies`.

[Slide: Vi bruger Supabase' SDK](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/sdk)

### 1.2 Miljøvariabler

Kopiér de to Supabase-linjer fra `.env.local` i dit projekt fra i dag – eller hent dem under **Connect** i Supabase – ind i `.env.local` her. Sådan ser din `.env.local` ud:

```bash
WORDPRESS_URL=https://dit-domæne.dk
NEXT_PUBLIC_SUPABASE_URL=https://<dit-projekt>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Tilføj de to variabler – uden dine rigtige værdier – i `.env.example`, og genstart `npm run dev`.

**Tjek:** Source Control viser `package.json`, `package-lock.json` og `.env.example` – men ikke `.env.local`.

[Slide: To nøgler](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/noegler)

### 1.3 Klienten og proxy.js

Kopiér de to filer fra dit projekt fra i dag – eller fra løsningen nedenfor. Du skal ikke kunne skrive dem selv, men du skal kunne forklare, hvad de gør.

- `lib/supabase/server.js` – klienten, der læser sessionen fra cookies i requesten.
- `proxy.js` – i **roden**, ved siden af `package.json`. Next.js kører den før hver request, og den fornyer sessionen.

**Tjek:** Stop `npm run dev`, og kør `npm run build`. Nederst i outputtet står `ƒ Proxy (Middleware)`.

[Slide: Klienten læser cookies](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/server-klient) · [Slide: Hvorfor proxy.js?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/proxy)

### 1.4 CSS og links i headeren

Kopiér CSS'en til `.auth-form` og `.form-error` nederst i [`app/globals.css`](https://github.com/cederdorff/nextjs-supabase-auth/blob/main/app/globals.css) fra startprojektet ind i din egen `app/globals.css`. Tilføj så links til `/profile`, `/signup` og `/login` i `components/Header.js` – ligesom headeren i startprojektet.

**Tjek:** Headeren viser de tre nye links. Et klik på _Sign up_ giver _Page not found_ – den route laver du i opgave 2.

<details>
<summary><strong>Løsning</strong></summary>

I `components/Header.js` – under _About_:

```jsx
<li>
  <Link href="/profile">Profile</Link>
</li>
<li>
  <Link href="/signup">Sign up</Link>
</li>
<li>
  <Link href="/login">Log in</Link>
</li>
```

</details>

**Sidder du fast?**

- **Står dit projekt som _Paused_?** Klik på _Resume project_, og vent et par minutter.
- **_Your project's URL and Key are required_?** Tjek navnene i `.env.local`, og genstart `npm run dev`.
- **Ingen `Proxy` i outputtet?** `proxy.js` skal ligge i roden – ikke i `app/`.

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

CSS'en nederst i `app/globals.css`:

```css
/* The forms for sign up, log in and log out */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 24rem;
  margin: 1.5rem 0;
}

.auth-form input {
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--surface);
  color: var(--foreground);
  font: inherit;
}

.auth-form input::placeholder {
  color: var(--muted);
}

.auth-form button {
  padding: 0.75rem;
  border: 0;
  border-radius: 0.5rem;
  background: var(--accent);
  color: #ffffff;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.form-error {
  margin-bottom: 1rem;
  color: #d4380d;
}
```

Koden følger [Supabase' guide til Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs), oversat til JavaScript.

</details>

**Løsning:** [Gør projektet klar](https://github.com/cederdorff/nextjs-headless-wordpress/compare/main...auth-01-supabase) · [branchen `auth-01-supabase`](https://github.com/cederdorff/nextjs-headless-wordpress/tree/auth-01-supabase)

<hr style="margin: 2rem 0;">

<a id="opgave-2"></a>

## Opgave 2: Sign up

**Resultat:** Du kan oprette en bruger på `/signup`, og brugeren står i Supabase.

Det er den samme side som i [opgave 2 i Next.js og Supabase Auth](opgave-2026-10-30-nextjs-supabase-auth.md#opgave-2). Byg den igen trin for trin, eller kopiér `app/signup/page.js` fra dit projekt fra i dag og gennemgå den.

### 2.1 Opret routen

Opret `app/signup/page.js` med en `<h1>`, og giv siden `metadata` med titlen _Sign up_.

**Tjek:** [http://localhost:3000/signup](http://localhost:3000/signup) viser din overskrift i stedet for _Page not found_, og fanen viser din titel.

### 2.2 Formularen

Tilføj en `<form className="auth-form">` med et felt til e-mail, et til adgangskode og en knap. Giv hvert felt en `<label>`, en `name` og en `placeholder`. Det er `name`, du bruger til at hente værdien på serveren.

**Tjek:** Siden viser en pæn formular. Der sker ingenting, når du klikker på knappen – endnu.

[Slide: name bliver til formData](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/formdata)

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

</details>

### 2.3 Server Action

Skriv Server Action'en i `app/signup/page.js` – over komponenten:

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

Giv formularen `action={signUp}`.

**Tjek:** Opret en bruger. Du lander på forsiden, og under _Authentication → Users_ i Supabase står din nye bruger.

[Slide: Server Action](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/next-server-action) · [Slide: Login-flowet](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/sekvens)

### 2.4 Find sessionen

Åbn browserens udviklerværktøjer. Gå til _Application_ (Chrome) eller _Storage_ (Safari og Firefox), og kig under **Cookies**.

<img src="https://raw.githubusercontent.com/cederdorff/mdu-e25ixd/main/slides/assets/nextjs-supabase-auth-devtools-cookie.webp" alt="Chrome DevTools, Application, Cookies. Øverst står cookien sb-…-auth-token med en værdi, der starter med base64-." style="max-width: 100%; margin: 0.75rem 0; border: 1px solid #ddd; border-radius: 6px;">

**Tjek:** Der står en cookie, der slutter med `-auth-token`. Det er din session.

[Slide: Her ligger sessionen](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/cookie-skaerm)

### 2.5 Vis en fejl · valgfri

Opret den samme bruger igen. Send brugeren tilbage til `/signup?error=true`, når Supabase svarer med en fejl, og vis en besked på siden, når `error` står i URL'en – ligesom du læste `params` på detaljesiden.

Siden læser nu URL'en, så den skal have sin egen `app/signup/loading.js` – samme regel som 26. oktober.

**Tjek:** Den samme e-mail to gange giver din fejlbesked, og `npm run build` går igennem.

[Slide: Hele routen i én fil](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/route-fil)

<details>
<summary><strong>Hint</strong></summary>

- `supabase.auth.signUp()` svarer med et objekt, der har en `error`. Gem den: `const { error } = await …`.
- Er der en `error`, så `redirect("/signup?error=true")`.
- På siden: `const { error } = await searchParams;`, og vis en `<p>`, når `error` har en værdi.

</details>

**Sidder du fast?**

- **Står brugeren i Supabase, men er der ingen `-auth-token`-cookie?** _Confirm email_ er slået til. Slå det fra, slet brugeren under _Authentication → Users_, og prøv igen.
- **Får du altid fejlbeskeden?** Log `error.message` med `console.log` i `signUp`, og kig i **terminalen** – ikke i browserens console.
- **_Uncached or runtime data … outside of `<Suspense>`_?** Tilføj `app/signup/loading.js`.

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

</details>

**Løsning:** [Sign up](https://github.com/cederdorff/nextjs-headless-wordpress/compare/auth-01-supabase...auth-02-sign-up) · [branchen `auth-02-sign-up`](https://github.com/cederdorff/nextjs-headless-wordpress/tree/auth-02-sign-up)

<hr style="margin: 2rem 0;">

<a id="opgave-3"></a>

## Opgave 3: Log ind

**Resultat:** Du kan logge ind på `/login` med din bruger fra opgave 2.

### 3.1 Kopiér routen

Kopiér mappen `app/signup/` til `app/login/`, og ret i `app/login/page.js`:

- [ ] `metadata`, `<h1>` og knappen: _Log in_
- [ ] Komponenten: `LoginPage`
- [ ] Adgangskoden: `placeholder="Your password"` og `autoComplete="current-password"`. Fjern `minLength`.
- [ ] Linket nederst: _No account yet?_ og `/signup`
- [ ] Har du lavet 2.5: fejlbeskeden _Wrong email or password._

`app/login/loading.js` kommer med, når du kopierer mappen.

**Tjek:** [http://localhost:3000/login](http://localhost:3000/login) viser din login-side.

### 3.2 signIn

Ret Server Action'en:

- [ ] `signUp` hedder nu `signIn`
- [ ] `supabase.auth.signUp` er nu `supabase.auth.signInWithPassword`
- [ ] Formularen: `action={signIn}`
- [ ] Har du lavet 2.5: `redirect("/login?error=true")` ved fejl

**Tjek:** Log ind med den bruger, du oprettede i opgave 2. Du lander på forsiden.

[Slide: Server Action](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/next-server-action) · [Slide: Vi bruger Supabase' SDK](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/sdk)

### 3.3 Test fejlen · valgfri

Har du lavet fejlbeskeden i 2.5? Prøv med en forkert adgangskode og med en e-mail, der ikke findes.

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

`app/login/loading.js` er den samme som `app/signup/loading.js`.

</details>

**Løsning:** [Log ind](https://github.com/cederdorff/nextjs-headless-wordpress/compare/auth-02-sign-up...auth-03-log-ind) · [branchen `auth-03-log-ind`](https://github.com/cederdorff/nextjs-headless-wordpress/tree/auth-03-log-ind)

<hr style="margin: 2rem 0;">

<a id="opgave-4"></a>

## Opgave 4: Profilen og låste posts

**Resultat:** `/profile` og `/posts/<slug>` viser indholdet, når du er logget ind, og sender alle andre til `/login`. Du kan logge ud.

### 4.1 Hvem er logget ind?

Opret `lib/auth.js` med én funktion, du kan bruge på alle sider – ligesom `lib/wordpress.js` samler kaldene til WordPress:

```js
import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return data?.claims ?? null;
}
```

`getClaims()` tjekker, at sessionen i cookien er ægte. Du får brugeren tilbage – eller `null`, hvis ingen er logget ind. E-mailen står i `user.email`, og id'et står i `user.sub`.

[Slide: Hvem er logget ind?](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/beskyt-kode) · [Slide: Server Component](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/next-server-component)

### 4.2 Profilsiden

Opret `app/profile/page.js`. Gør komponenten `async`, kald `await getCurrentUser()`, og vis `user.email` og `user.sub`. Siden læser cookies, så den skal have sin egen `app/profile/loading.js`.

**Tjek:** Logget ind viser `/profile` din e-mail og dit id. Åbn nu `/profile` i et **privat vindue**. Siden fejler, fordi `user` er `null`. Det løser du i næste trin.

### 4.3 Beskyt routen

Tjek brugeren øverst i komponenten, og send til `/login`, hvis der ingen er – ligesom du kaldte `notFound()`, når en post ikke fandtes.

**Tjek:** I det private vindue lander du nu på `/login`. Log ind der, og åbn `/profile` igen.

[Slide: Én if på serveren](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/beskyt-flow)

<details>
<summary><strong>Løsning</strong></summary>

```jsx
const user = await getCurrentUser();

if (!user) {
  redirect("/login");
}
```

`redirect()` stopper siden og sender brugeren videre. Koden under den kører kun, når der er en bruger.

</details>

### 4.4 Log ud og send til profilen

Skriv en Server Action, `signOut`, i `app/profile/page.js`. Den kalder `supabase.auth.signOut()` og sender brugeren til forsiden. Vis en `<form action={signOut} className="auth-form">` med en _Log out_-knap på profilen.

Ret til sidst `redirect("/")` til `redirect("/profile")` i `signUp` og `signIn`.

**Tjek:** Log ind, og du lander på profilen. Klik på _Log out_. Cookien er væk, og `/profile` sender dig til `/login`.

<details>
<summary><strong>Hint</strong></summary>

`signOut` ligner `signUp`, men har ingen formular-felter – så den skal ikke have `formData`.

</details>

### 4.5 Lås detaljesiderne

Sæt det samme tjek øverst i `app/posts/[slug]/page.js` – før posten hentes. Detaljesiden har allerede en `loading.js`.

**Tjek:** Log ud, og klik på et card. Du lander på `/login`. Log ind, og klik igen. Nu kan du læse posten.

### 4.6 Er indholdet nu beskyttet?

Log ud, og åbn `/wp-json/wp/v2/posts` på din WordPress.

**Tjek:** Hele indholdet står der stadig. Du har låst **siden** i din app – ikke **data** i WordPress. Data beskytter vi 10. november med Row Level Security.

[Slide: Skjul ikke bare linket](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/#/skjul-ikke)

**Sidder du fast?**

- **_redirect is not defined_?** Importér den sammen med `notFound` på detaljesiden: `import { notFound, redirect } from "next/navigation";`.
- **Sender `/profile` dig altid til `/login`?** Tjek, at du skriver `await getCurrentUser()`, og at `proxy.js` ligger i roden.
- **Ender du i en løkke mellem siderne?** Tjekket må kun stå på sider, der skal beskyttes – aldrig på `/login` eller i `app/layout.js`.

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

I `signUp` og `signIn` står der nu `redirect("/profile")` i stedet for `redirect("/")`.

</details>

**Løsning:** [Profilen og låste posts](https://github.com/cederdorff/nextjs-headless-wordpress/compare/auth-03-log-ind...auth-04-profil) · [branchen `auth-04-profil`](https://github.com/cederdorff/nextjs-headless-wordpress/tree/auth-04-profil)

<hr style="margin: 2rem 0;">

<a id="opgave-5"></a>

## Opgave 5: Login-status i headeren

**Resultat:** Headeren viser din e-mail og _Log out_, når du er logget ind – og _Log in_, når du ikke er.

Det er den samme komponent som i [ekstraopgave 6 i Next.js og Supabase Auth](opgave-2026-10-30-nextjs-supabase-auth.md#opgave-6). Det nye er `<Suspense>` i 5.3.

### 5.1 Del signOut

Flyt `signOut` til `lib/actions.js` – med `"use server"` øverst i **filen**. Så er alle funktioner i filen Server Actions, og du kan importere dem, hvor du vil:

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

### 5.2 AuthStatus

Lav en `async` Server Component, `components/AuthStatus.js`, der kalder `getCurrentUser()`:

- **Ingen bruger:** et `Link` til `/login`.
- **Logget ind:** e-mailen som et `Link` til `/profile` og en `<form action={signOut}>` med en knap.

Kopiér [`components/AuthStatus.module.css`](https://github.com/cederdorff/nextjs-headless-wordpress/blob/auth-05-header/components/AuthStatus.module.css).

<details>
<summary><strong>Hint</strong></summary>

To `return`: ét inde i `if (!user)` med linket til `/login` og ét til sidst med e-mailen og _Log out_.

</details>

### 5.3 Vis den i headeren med Suspense

Vis `<AuthStatus />` i `components/Header.js` efter `<ul>`, fjern linkene til _Sign up_ og _Log in_, og kør `npm run build`. Det fejler med _uncached or runtime data … outside of `<Suspense>`_. Headeren står på alle sider, og nu læser den cookies, som først findes, når en bruger sender en request. Pak den ind i `<Suspense>`, så resten af headeren vises med det samme:

```jsx
<Suspense fallback={null}>
  <AuthStatus />
</Suspense>
```

Importér `Suspense` fra `react`.

**Tjek:** `npm run build` går igennem. Headeren viser din e-mail og _Log out_. Efter _Log out_ viser den _Log in_ – uden at du genindlæser siden.

**Sidder du fast?**

- **Viser headeren _Log in_ efter login?** Tjek, at `proxy.js` ligger i roden, og at du skriver `await getCurrentUser()`.
- **Fejl om _async Client Component_?** `AuthStatus` må ikke have `"use client"`.

<details>
<summary><strong>Se den fulde løsning til opgave 5</strong></summary>

`lib/actions.js`:

```js
"use server";

// "use server" at the top of the file: every exported function is a Server Action.
// signOut lives here, because both the profile page and AuthStatus use it.

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/");
}
```

Starten af `app/profile/page.js` – `signOut` er slettet fra filen, og resten er som før:

```jsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { signOut } from "@/lib/actions";
```

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
          <li>
            <Link href="/profile">Profile</Link>
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

**Løsning:** [Login-status i headeren](https://github.com/cederdorff/nextjs-headless-wordpress/compare/auth-04-profil...auth-05-header) · [branchen `auth-05-header`](https://github.com/cederdorff/nextjs-headless-wordpress/tree/auth-05-header)

<hr style="margin: 2rem 0;">

<a id="refleksion"></a>

## Skal jeres produkt have brugere?

På mandag starter gruppeprojektet. Tag stilling til tre spørgsmål i jeres gruppe, og skriv svarene ned:

1. **Hvad kan en bruger, der er logget ind, som andre ikke kan?** Eller er produktet bedst uden login?
2. **Hvilke data om brugeren skal I gemme?** Jo færre, jo mindre skal I beskytte.
3. **Hvem må se og ændre hvad?** Det er grundlaget for jeres afsnit om it-sikkerhed – og for 10. november.

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
| _Uncached or runtime data … outside of `<Suspense>`_ | `loading.js` ved siden af sider, der læser cookies eller `searchParams`, og `<Suspense>` om `AuthStatus` |
| Redirect-loop | Tjek kun på de sider, der skal beskyttes – aldrig på `/login` |
| _fetch failed_ eller ingen forbindelse | Supabase-projektet er sat på pause. Klik på _Resume project_ |

<hr style="margin: 2rem 0;">

## Materialer

- [Slides: Supabase Auth i Next.js](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-03/)
- [nextjs-headless-wordpress](https://github.com/cederdorff/nextjs-headless-wordpress) – din app fra 26. oktober på `main` og én løsningsbranch pr. opgave, fra `auth-01-supabase` til `auth-05-header`
- [Next.js og Supabase Auth](opgave-2026-10-30-nextjs-supabase-auth.md) – den samme kode i en lille app
- [Supabase: Setting up Server-Side Auth for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Next.js: Authentication](https://nextjs.org/docs/app/guides/authentication) – fx hvorfor tjekket står på siden og ikke i layoutet
