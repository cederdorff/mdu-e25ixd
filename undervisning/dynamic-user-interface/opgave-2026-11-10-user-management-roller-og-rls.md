# Opgave: User management og beskyttet adgang - 10-11-2026

## Formål

Opgaven er en guide til det, du så i demoen. Du kender allerede relationen fra Post App: Et post er lavet af én user, og en user kan lave mange posts. I dag kobler du den til login: Nye posts skal tilhøre den, der er logget ind, og kun ejeren må rette og slette dem – i appen og i databasen.

```text
Login                      users                   posts
(Authentication → Users)   id     uuid  <------    userId     uuid
id     uuid  ---------->   name   text             id         uuid
email  text   samme id     mail   text             createdAt  timestamptz
                           title  text             caption    text
                           image  text             image      text
                           role   text
```

**Det nye i dag:** Den, der er logget ind, er en række i `users` – med samme `id` som i login. Resten kender du fra Post App.

<hr style="margin: 2rem 0;">

## Sådan bruger du opgaven

Brug guiden, når du har brug for den. Der er to veje:

- **Direkte i jeres projekt:** Følg trinene i jeres egen app, og brug startprojektet som opslag. Opgave 2–5 virker på samme måde, uanset om jeres tabel hedder `posts`, `bookings` eller noget helt tredje.
- **I startprojektet først:** Vil du se det virke i et lille projekt, før I bygger det ind i jeres eget, så start med opgave 1. Brug dit Supabase-projekt fra 30. oktober – ikke jeres gruppeprojekt, for `setup.sql` sletter og opretter tabellerne `users` og `posts`.

Undervejs:

- Slut hvert trin med **Tjek**.
- Sidder du fast? Fold **Hint** ud – og **Løsning**, når du har prøvet selv.
- Commit og push efter hver opgave med Source Control i VS Code eller GitHub Desktop.
- Du skal ikke skrive SQL. Hele databasen kommer fra én fil, `supabase/setup.sql`.

<hr style="margin: 2rem 0;">

## Oversigt

1. [Kom i gang](#opgave-1)
2. [Din profil](#opgave-2)
3. [Posts får en ejer](#opgave-3)
4. [Kun ejeren kan rette og slette](#opgave-4)
5. [Beskyt databasen](#opgave-5)

**Ekstra, når du er færdig:** [Admin](#ekstra)

Sidder du fast? Se [Fejlfinding](#fejlfinding).

<hr style="margin: 2rem 0;">

<a id="opgave-1"></a>

## Opgave 1: Kom i gang

**Resultat:** Appen viser 10 posts med deres bruger, og du har fundet de ting, der mangler.

### 1.1 Dit eget repository

1. Åbn [nextjs-supabase-posts](https://github.com/cederdorff/nextjs-supabase-posts) på GitHub. Klik på **Use this template → Create a new repository**, giv det et navn, og klik på _Create repository_.
2. Klon dit nye repository i VS Code (_Clone Git Repository_) eller GitHub Desktop (_File → Clone Repository_).
3. Åbn mappen i VS Code, og kør i terminalen:

   ```bash
   npm install
   ```

### 1.2 Gør Supabase klar

Brug dit Supabase-projekt fra 30. oktober. Så har du allerede brugere, og _Confirm email_ er slået fra. Står projektet som _Paused_, så klik på _Resume project_.

1. Kopiér `.env.example` til `.env.local`, og indsæt URL og publishable key fra **Connect** – ligesom sidst. Du kan også kopiere `.env.local` fra dit projekt fra 30. oktober.
2. Åbn **SQL Editor** i Supabase. Indsæt hele indholdet af [`supabase/setup.sql`](https://github.com/cederdorff/nextjs-supabase-posts/blob/main/supabase/setup.sql), og klik på _Run_. Spørger Supabase om en _destructive operation_, så klik på _Run this query_. Foreslår Supabase at slå Row Level Security til, så lad være – det gør du i opgave 5.
3. Åbn _Authentication → Users_, og kopiér _User UID_ på en af dine brugere. Indsæt den i `lib/current-user.js` i stedet for `paste-a-user-uid-here`.
4. Kør `npm run dev`, og åbn [http://localhost:3000](http://localhost:3000).

**Tjek:** Forsiden viser 10 posts med billede og navn.

### 1.3 Samme id to steder

`setup.sql` har givet alle dine brugere en række i tabellen `users`. Og når nogen opretter en ny bruger, kommer de automatisk også i `users`.

Åbn _Authentication → Users_ og _Table Editor → users_ side om side. Find din egen bruger begge steder.

**Tjek:** Din _User UID_ i Authentication er den samme som dit `id` i `users`. Den, der er logget ind, **er** en række i `users`.

### 1.4 Find det, der mangler

Appen virker – men den er ikke sikker. Prøv det selv:

1. **Log ind** som en anden bruger end den i `lib/current-user.js` – eller opret en ny på `/signup`. Opret et post. Hvem står som forfatter?
2. **Åbn `/profile`.** Hvad viser siden – og hvad viser den ikke?
3. **Log ud**, åbn et post, og klik på _Edit_. Kan du rette det? Kan du slette det?

**Tjek:** Du kan svare på de tre spørgsmål.

<details>
<summary><strong>Løsning</strong></summary>

1. Brugeren i `lib/current-user.js` – uanset hvem der er logget ind. Alle nye posts får det faste `CURRENT_USER_ID`, ligesom i Post App.
2. Kun din e-mail. Dit navn, din titel og dit billede står i `users`, men siden henter dem ikke.
3. Ja. Alle kan rette og slette alle posts, også uden at være logget ind.

Det retter du i opgave 2–5.

</details>

**Sidder du fast?**

- **_relation "users" does not exist_ eller tom forside?** Kør hele `supabase/setup.sql` i SQL Editor.
- **0 posts på forsiden?** Du havde ingen brugere, da du kørte `setup.sql`. Opret en bruger på `/signup`, og kør `setup.sql` igen.
- **_Could not create the post_?** `lib/current-user.js` mangler en rigtig _User UID_.

**Startprojektet:** [`main`](https://github.com/cederdorff/nextjs-supabase-posts/tree/main)

<hr style="margin: 2rem 0;">

<a id="opgave-2"></a>

## Opgave 2: Din profil

**Resultat:** `/profile` viser dit navn, din titel og dit billede fra `users`, og du kan rette dem.

### 2.1 Hent din række i users

Fra 30. oktober kender du `getCurrentUser()`. Den giver dig login'et – og id'et står i `user.sub`. Lav en ny funktion i `lib/auth.js`, `getCurrentProfile()`, der henter din række i `users` med det id. Så har du navn, titel, billede og rolle samlet ét sted.

Resten af dagen bruger du `getCurrentProfile()`, når du skal vide, hvem der er logget ind.

<details>
<summary><strong>Hint</strong></summary>

Det er et helt almindeligt `select` – ligesom når du henter ét post:

```js
const { data } = await supabase.from("users").select("*").eq("id", user.sub).maybeSingle();
```

Er ingen logget ind, returnerer funktionen `null`.

</details>

<details>
<summary><strong>Løsning</strong></summary>

```js
export async function getCurrentProfile() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const supabase = await createClient();
  const { data } = await supabase.from("users").select("*").eq("id", user.sub).maybeSingle();

  // Logged in, but no row in users: the user signed up before setup.sql was run
  if (!data) {
    throw new Error(`No row in users with id ${user.sub}. Run supabase/setup.sql again.`);
  }

  return data;
}
```

</details>

### 2.2 Vis profilen

Brug `getCurrentProfile()` på `/profile` i stedet for `getCurrentUser()`. Vis brugeren med komponenten `UserBadge`, som forsiden også bruger.

**Tjek:** `/profile` viser dit navn. Logget ud sendes du stadig til `/login`.

### 2.3 Ret din profil

Lav en formular med navn, titel og billede-URL og en Server Action, `updateProfile`, der gemmer dem i `users`. Brug `defaultValue`, så felterne viser det, der står nu.

Tænk over, **hvilken række** du må ændre: kun din egen. Id'et skal komme fra `getCurrentProfile()` – aldrig fra formularen.

**Tjek:** Ret dit navn og din titel. De står med det samme på `/profile` og i `users` i Supabase.

<details>
<summary><strong>Hint</strong></summary>

En Server Action er sin egen request. Hent profilen igen, og opdatér kun rækken med dit id:

```js
await supabase.from("users").update({ name, title, image }).eq("id", profile.id);
```

</details>

<details>
<summary><strong>Løsning</strong></summary>

```jsx
async function updateProfile(formData) {
  "use server";

  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  const supabase = await createClient();
  await supabase
    .from("users")
    .update({
      name: formData.get("name").trim(),
      title: formData.get("title").trim(),
      image: formData.get("image").trim(),
    })
    .eq("id", profile.id);

  redirect("/profile");
}

export default async function ProfilePage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Profile</h1>
      <UserBadge user={profile} />

      <form action={updateProfile} className="form">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" defaultValue={profile.name} required />

        <label htmlFor="title">Title</label>
        <input id="title" name="title" placeholder="Student" defaultValue={profile.title ?? ""} />

        <label htmlFor="image">Image URL</label>
        <input id="image" name="image" type="url" placeholder="https://..." defaultValue={profile.image ?? ""} />

        <button type="submit">Save</button>
      </form>

      <p>Email: {profile.mail}</p>
      <p>User id: {profile.id}</p>
      <form action={signOut} className="form">
        <button type="submit">Log out</button>
      </form>
    </main>
  );
}
```

</details>

**Løsning:** [Din profil](https://github.com/cederdorff/nextjs-supabase-posts/compare/main...opgave-02-profil) · [branchen `opgave-02-profil`](https://github.com/cederdorff/nextjs-supabase-posts/tree/opgave-02-profil)

<hr style="margin: 2rem 0;">

<a id="opgave-3"></a>

## Opgave 3: Posts får en ejer

**Resultat:** Nye posts tilhører den, der er logget ind, og kun brugere, der er logget ind, kan oprette posts.

### 3.1 Væk med CURRENT_USER_ID

I Post App fik alle nye posts det faste `CURRENT_USER_ID`. Nu ved du, hvem der er logget ind. Slet `lib/current-user.js`. I `app/create/page.js` henter Server Action'en i stedet profilen med `getCurrentProfile()` og bruger `profile.id` som `userId`.

**Tjek:** Opret et post. Dit navn står på det på forsiden. Ret dit navn på `/profile`, og se det skifte på alle dine posts – samme relation som i Post App.

### 3.2 Kræv login

Send brugere, der ikke er logget ind, til `/login` – både på siden og i Server Action'en. Hvorfor begge steder? Siden bestemmer, hvem der **ser** formularen. Server Action'en er en `POST`-request, som alle kan sende – også uden at åbne siden.

**Tjek:** Logget ud sender `/create` dig til `/login`.

<details>
<summary><strong>Løsning</strong></summary>

```jsx
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

async function createPost(formData) {
  "use server";

  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("posts").insert({
    caption: formData.get("caption").trim(),
    image: formData.get("image").trim(),
    userId: profile.id,
  });

  if (error) {
    redirect("/create?error=true");
  }

  redirect("/");
}

export default async function CreatePage({ searchParams }) {
  const { error } = await searchParams;

  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  // ... formularen som før
}
```

</details>

**Sidder du fast?**

- **_Module not found: @/lib/current-user_?** Fjern importen af `CURRENT_USER_ID` øverst i `app/create/page.js`.

**Løsning:** [Posts får en ejer](https://github.com/cederdorff/nextjs-supabase-posts/compare/opgave-02-profil...opgave-03-ejer) · [branchen `opgave-03-ejer`](https://github.com/cederdorff/nextjs-supabase-posts/tree/opgave-03-ejer)

<hr style="margin: 2rem 0;">

<a id="opgave-4"></a>

## Opgave 4: Kun ejeren kan rette og slette

**Resultat:** Kun den, der har lavet et post, ser _Edit_ og _Delete_ og kan rette og slette det.

### 4.1 Skjul knapperne

I `app/posts/[id]/page.js`: Hent profilen, og sammenlign `profile.id` med `post.userId`. Vis kun _Edit_ og _Delete_, når de er ens.

**Tjek:** På dine egne posts ser du knapperne. På de andres – og når du er logget ud – gør du ikke.

<details>
<summary><strong>Hint</strong></summary>

```jsx
const profile = await getCurrentProfile();
const isOwner = profile?.id === post.userId;
```

`?.` giver `undefined` i stedet for en fejl, når ingen er logget ind. Pak formularen ind i `{isOwner && (...)}`.

</details>

### 4.2 Tjek på serveren

En skjult knap stopper ingen. Log ind som en bruger, der ikke ejer et post. Åbn post'et, og tilføj `/update` til URL'en – siden virker stadig. Tilføj samme tjek tre steder:

1. Øverst på `app/posts/[id]/update/page.js`: Send til `/posts/[id]`, hvis brugeren ikke ejer post'et.
2. I Server Action'en `updatePost`.
3. I Server Action'en `deletePost`.

**Tjek:** `/update` på et post, du ikke ejer, sender dig tilbage til post'et. Dine egne posts kan du stadig rette og slette.

<details>
<summary><strong>Løsning</strong></summary>

I `deletePost` og `updatePost` – og øverst på update-siden:

```js
const profile = await getCurrentProfile();

if (profile?.id !== post.userId) {
  redirect(`/posts/${id}`);
}
```

Knapperne på detaljesiden:

```jsx
{isOwner && (
  <form action={deletePost} className={styles.actions}>
    <Link href={`/posts/${post.id}/update`} className="button">
      Edit
    </Link>
    <DeleteButton />
  </form>
)}
```

</details>

### 4.3 Er data nu beskyttet?

Din app tjekker brugeren – men din app er ikke den eneste vej til databasen. Din publishable key er offentlig: Den må gerne ligge i browseren. Prøv selv. Åbn et post, og kopiér id'et fra URL'en. Åbn udviklerværktøjerne, og kør i _Console_ – med din egen URL og key fra `.env.local` og id'et på post'et:

```js
const response = await fetch("https://<dit-projekt>.supabase.co/rest/v1/posts?id=eq.<post-id>", {
  method: "PATCH",
  headers: {
    apikey: "sb_publishable_...",
    "Content-Type": "application/json",
    Prefer: "return=representation"
  },
  body: JSON.stringify({ caption: "Hacked" })
});

await response.json();
```

**Tjek:** Post'et hedder nu _Hacked_ på forsiden – uden login og uden om alle dine tjek. Det løser du i opgave 5. Gem koden i _Console_, så du kan køre den igen.

**Løsning:** [Kun ejeren](https://github.com/cederdorff/nextjs-supabase-posts/compare/opgave-03-ejer...opgave-04-kun-ejeren) · [branchen `opgave-04-kun-ejeren`](https://github.com/cederdorff/nextjs-supabase-posts/tree/opgave-04-kun-ejeren)

<hr style="margin: 2rem 0;">

<a id="opgave-5"></a>

## Opgave 5: Beskyt databasen

**Resultat:** Databasen afviser alt, en bruger ikke må – uanset hvor requesten kommer fra.

### 5.1 Reglerne ligger klar

Databasen kan selv have regler for, hvem der må hvad. Det hedder **Row Level Security** (RLS), og hver regel er en **policy**. `setup.sql` har allerede lavet reglerne – de er bare ikke slået til endnu.

Åbn _Authentication → Policies_ i Supabase, og find reglerne:

| Tabel | Policy | Betyder |
| --- | --- | --- |
| `posts` | _Everyone can read posts_ | Alle må se posts – også uden login |
| `posts` | _Users can create posts as themselves_ | Du må kun oprette posts med dig selv som `userId` |
| `posts` | _Owners can update their posts_ | Kun ejeren må rette |
| `posts` | _Owners can delete their posts_ | Kun ejeren må slette |
| `posts` | _Admins can delete all posts_ | En admin må slette alle posts (se Ekstra) |
| `users` | _Everyone can read users_ | Alle må se navne og billeder |
| `users` | _Users can update their own profile_ | Du må kun rette din egen profil |

**Tjek:** Du kan finde de 7 policies – og ser, at RLS er slået fra på begge tabeller.

### 5.2 Slå RLS til

Klik på _Enable RLS_ ved `posts` og ved `users`.

**Tjek:** Forsiden viser stadig alle posts, og du kan stadig oprette, rette og slette dine egne. _Table Editor_ viser ikke længere **UNRESTRICTED**.

### 5.3 Test som tre brugere

1. **Ikke logget ind:** Kør `fetch`-koden fra 4.3 igen med `"Hacked again"`. Svaret er `[]`, og post'et er uændret. Databasen sagde nej.
2. **Logget ind som dig selv:** Opret, ret og slet et af dine egne posts. Det virker.
3. **Logget ind som en anden:** Fjern midlertidigt `if`'en i `deletePost`, og vis knapperne for alle (`{true && (...)}`). Log ind som en anden bruger, og slet et af dine posts. Post'et er der stadig – appen lod dig, men databasen sagde nej. Sæt koden tilbage bagefter.

**Tjek:** Du kan forklare, hvorfor du både har tjek i appen og regler i databasen.

<details>
<summary><strong>Løsning</strong></summary>

Tjekket i appen giver brugeren en god oplevelse: Knapper, de ikke kan bruge, vises ikke, og de bliver sendt et fornuftigt sted hen. Reglerne i databasen beskytter data: De gælder for alle requests – fra din app, fra _Console_ og fra alle andre, der har din publishable key. Derfor må den publishable key gerne være offentlig, når RLS er slået til. En `sb_secret_`-key springer RLS over og må aldrig ligge i browseren eller på GitHub.

</details>

**Diskutér:** Hvem må se, oprette, rette og slette data i jeres projekt? Skriv det ned som en tabel ligesom i 5.1. Den kan I bruge i afsnittet om it-sikkerhed.

**Sidder du fast?**

- **Tom forside efter 5.2?** Reglerne mangler. Kør `setup.sql` igen, og slå RLS til igen.
- **Sletter eller retter du, men intet sker?** Det er RLS. Databasen giver ingen fejl, når du ikke må ramme nogen rækker. Tjek, at du er logget ind som ejeren.

**Løsning:** Opgave 5 har ingen kodeændringer – det er to klik i Supabase.

<hr style="margin: 2rem 0;">

<a id="ekstra"></a>

## Ekstra: Admin

**Resultat:** En admin kan slette alle posts og se en admin-side, som ingen andre kan åbne.

### E.1 Gør dig selv til admin

`users` har en kolonne, `role`, som er `user` eller `admin`. Alle starter som `user`. Åbn _Table Editor → users_, og ret `role` til `admin` på din egen række.

Kan man så ikke bare rette sin egen rolle fra appen? Nej: `setup.sql` lader kun appen rette `name`, `title` og `image`. Rollen kan kun ændres i _Table Editor_.

### E.2 Vis Delete for admins

Rækken fra `getCurrentProfile()` har også `role`. Vis _Delete_ for ejeren og for admins i `app/posts/[id]/page.js`, men _Edit_ kun for ejeren. Husk tjekket i `deletePost`. Databasen er klar: Policy'en _Admins can delete all posts_ fra 5.1.

**Tjek:** Som admin kan du slette en anden brugers post. Som almindelig bruger kan du ikke.

<details>
<summary><strong>Løsning</strong></summary>

```jsx
const profile = await getCurrentProfile();
const isOwner = profile?.id === post.userId;
const isAdmin = profile?.role === "admin";

async function deletePost() {
  "use server";

  const profile = await getCurrentProfile();

  if (profile?.id !== post.userId && profile?.role !== "admin") {
    redirect(`/posts/${id}`);
  }

  const supabase = await createClient();
  await supabase.from("posts").delete().eq("id", id);

  redirect("/");
}
```

```jsx
{(isOwner || isAdmin) && (
  <form action={deletePost} className={styles.actions}>
    {isOwner && (
      <Link href={`/posts/${post.id}/update`} className="button">
        Edit
      </Link>
    )}
    <DeleteButton />
  </form>
)}
```

</details>

### E.3 En admin-side med unauthorized() og forbidden()

Lav `/admin`, der viser alle posts med en _Delete_-knap ved hver. Next.js har to funktioner med hver sin fil til adgang, ligesom `notFound()` og `not-found.js`:

- `unauthorized()` viser `app/unauthorized.js` (401), når brugeren ikke er logget ind.
- `forbidden()` viser `app/forbidden.js` (403), når brugeren er logget ind, men ikke er admin.

De er stadig eksperimentelle og kræver `experimental: { authInterrupts: true }` i `next.config.mjs`. Genstart `npm run dev` bagefter.

**Tjek:** Logget ud viser `/admin` din `unauthorized.js`. Som almindelig bruger viser den `forbidden.js`. Som admin ser du alle posts og kan slette dem.

**Løsning:** [Admin](https://github.com/cederdorff/nextjs-supabase-posts/compare/opgave-04-kun-ejeren...ekstra-admin) · [branchen `ekstra-admin`](https://github.com/cederdorff/nextjs-supabase-posts/tree/ekstra-admin)

<hr style="margin: 2rem 0;">

<a id="fejlfinding"></a>

## Fejlfinding

| Problem | Løsning |
| --- | --- |
| _relation "users" does not exist_ | Kør hele `supabase/setup.sql` i SQL Editor |
| 0 posts efter `setup.sql` | Du havde ingen brugere. Opret en på `/signup`, og kør `setup.sql` igen |
| _Could not create the post_ i opgave 1 | Indsæt en rigtig _User UID_ i `lib/current-user.js` |
| _No row in users with id …_ | Din bruger mangler en række i `users`. Kør `setup.sql` igen |
| Du retter eller sletter, men intet sker | RLS afviser uden fejl. Er du logget ind som ejeren? |
| _permission denied for table users_ | Du prøver at ændre en kolonne, appen ikke må ændre, fx `role` |
| Du har kørt `setup.sql` igen, og RLS er slået fra | Filen starter forfra. Slå RLS til igen (5.2) |
| _fetch failed_ eller ingen forbindelse | Supabase-projektet er sat på pause. Klik på _Resume project_ |

<hr style="margin: 2rem 0;">

## Materialer

- [nextjs-supabase-posts](https://github.com/cederdorff/nextjs-supabase-posts) – startprojektet på `main` og én løsningsbranch pr. opgave. Hele databasen står i `supabase/setup.sql`
- [Supabase: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase: Understanding API keys](https://supabase.com/docs/guides/api/api-keys) – publishable og secret keys
- [Supabase: JavaScript – Fetch data](https://supabase.com/docs/reference/javascript/select) og [Update data](https://supabase.com/docs/reference/javascript/update)
- [Next.js: forbidden](https://nextjs.org/docs/app/api-reference/functions/forbidden) og [unauthorized](https://nextjs.org/docs/app/api-reference/functions/unauthorized)
