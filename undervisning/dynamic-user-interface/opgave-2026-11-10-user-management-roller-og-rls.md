# Opgave: User management, roller og Row Level Security - 10-11-2026

## Formål

Opgaven er en guide til det, du så i demoen. Du bygger videre på login fra 30. oktober i en Next.js-app, der allerede viser posts og users fra Supabase – med de samme kolonner som i Post App. Login og data hænger bare ikke sammen i appen endnu. Du sørger for, at posts tilhører den bruger, der er logget ind. Derefter beskytter du data, så brugere kun kan ændre deres egne posts, og giver en admin lov til mere.

Sådan ser datamodellen ud:

```text
auth.users                users                          posts
(Supabase Auth)           id     uuid  PK  <-----------  userId     uuid  FK
id     uuid   -------->   name   text                    id         uuid  PK
email  text   trigger     mail   text                    createdAt  timestamptz
                          title  text                    caption    text
                          image  text                    image      text
                          role   text  (user | admin)
```

Kolonnerne er de samme som i Post App. Det nye er, at alle id'er er `uuid`, og at `users.id` er **det samme id** som brugerens login i `auth.users`.

<hr style="margin: 2rem 0;">

## Sådan bruger du opgaven

Brug guiden, når du har brug for den. Der er to veje:

- **Direkte i jeres projekt:** Følg trinene i jeres egen app, og brug startprojektet som opslag. Opgave 3–7 virker på samme måde, uanset om jeres tabel hedder `posts`, `bookings` eller noget helt tredje.
- **I startprojektet først:** Vil du se det virke i et lille projekt, før I bygger det ind i jeres eget, så start med opgave 1. Brug dit Supabase-projekt fra 30. oktober – ikke jeres gruppeprojekt, for `setup.sql` sletter og opretter tabellerne `users` og `posts`.

Undervejs:

- Slut hvert trin med **Tjek**.
- Sidder du fast? Fold **Hint** ud – og **Løsning**, når du har prøvet selv.
- Commit og push efter hver opgave med Source Control i VS Code eller GitHub Desktop.
- Du skal ikke skrive SQL. Databasen sættes op med én fil, `supabase/setup.sql`, og Row Level Security klikker du sammen i Supabase.

<hr style="margin: 2rem 0;">

## Oversigt

1. [Hent startprojektet](#opgave-1)
2. [Users og auth.users](#opgave-2)
3. [Din profil fra users](#opgave-3)
4. [Opret posts som dig selv](#opgave-4)
5. [Kun dine egne posts](#opgave-5)
6. [Row Level Security](#opgave-6)
7. [Roller: user og admin](#opgave-7)

**Ekstra, når du er færdig:** [En admin-side med unauthorized() og forbidden()](#ekstra)

Sidder du fast? Se [Fejlfinding](#fejlfinding).

<hr style="margin: 2rem 0;">

<a id="opgave-1"></a>

## Opgave 1: Hent startprojektet

**Resultat:** Appen viser 10 posts med deres bruger, og du har fundet de fire ting, der mangler.

### 1.1 Dit eget repository

1. Åbn [nextjs-supabase-posts](https://github.com/cederdorff/nextjs-supabase-posts) på GitHub. Klik på **Use this template → Create a new repository**, giv det et navn, og klik på _Create repository_.
2. Klon dit nye repository i VS Code (_Clone Git Repository_) eller GitHub Desktop (_File → Clone Repository_).
3. Åbn mappen i VS Code, og kør i terminalen:

   ```bash
   npm install
   ```

### 1.2 Gør Supabase klar

Brug dit Supabase-projekt fra 30. oktober. Så har du allerede brugere under _Authentication → Users_, og _Confirm email_ er slået fra. Står projektet som _Paused_, så klik på _Resume project_.

1. Kopiér `.env.example` til `.env.local`, og indsæt URL og publishable key fra **Connect** – ligesom sidst. Du kan også kopiere `.env.local` fra dit projekt fra 30. oktober.
2. Åbn **SQL Editor** i Supabase. Indsæt hele indholdet af [`supabase/setup.sql`](https://github.com/cederdorff/nextjs-supabase-posts/blob/main/supabase/setup.sql), og klik på _Run_. Spørger Supabase om en _destructive operation_, så klik på _Run this query_. Foreslår Supabase at slå Row Level Security til, så lad være – det gør du selv i opgave 6.
3. Åbn _Authentication → Users_, og kopiér _User UID_ på en af dine brugere. Indsæt den i `lib/current-user.js` i stedet for `paste-a-user-uid-here`.
4. Kør `npm run dev`, og åbn [http://localhost:3000](http://localhost:3000).

`setup.sql` sletter og opretter `users` og `posts`, giver alle dine brugere en række i `users` og giver de 10 posts fra Post App til den bruger, der blev oprettet først. Du kan køre den igen, hvis du vil starte forfra.

**Tjek:** Forsiden viser 10 posts med billede og navn. Under _Table Editor_ i Supabase findes `users` og `posts`.

### 1.3 Find de fire problemer

Appen virker – men den er ikke sikker. Prøv det selv, og svar på spørgsmålene:

1. **Log ind** som en anden bruger end den i `lib/current-user.js` – eller opret en ny på `/signup`. Opret et post på `/create`. Hvem står som forfatter?
2. **Log ud**, åbn et post, og klik på _Edit_. Kan du rette det? Kan du slette det?
3. **Åbn _Table Editor_** i Supabase. Hvad står der ved `users` og `posts`?
4. **Log ind**, og åbn `/profile`. Hvad viser siden – og hvad viser den ikke?

**Tjek:** Du kan svare på de fire spørgsmål.

<details>
<summary><strong>Løsning</strong></summary>

1. Brugeren i `lib/current-user.js` – uanset hvem der er logget ind. Alle nye posts får det faste `CURRENT_USER_ID`, ligesom i Post App.
2. Ja. Alle kan rette og slette alle posts, også uden at være logget ind.
3. **UNRESTRICTED**. Row Level Security er slået fra, så alle med din publishable key kan læse og ændre alt.
4. Kun din e-mail fra login. Dit navn, din titel og dit billede står i `users`, men profilsiden henter dem ikke.

Det retter du i opgave 2–7.

</details>

**Sidder du fast?**

- **_relation "users" does not exist_ eller tom forside?** Kør hele `supabase/setup.sql` i SQL Editor.
- **0 posts på forsiden?** Du havde ingen brugere, da du kørte `setup.sql`. Opret en bruger på `/signup`, og kør `setup.sql` igen.
- **_Could not create the post_?** `lib/current-user.js` mangler en rigtig _User UID_.

**Startprojektet:** [`main`](https://github.com/cederdorff/nextjs-supabase-posts/tree/main)

<hr style="margin: 2rem 0;">

<a id="opgave-2"></a>

## Opgave 2: Users og auth.users

**Resultat:** Du ved, hvordan `users` hænger sammen med `auth.users`, og nye brugere får deres navn med fra sign up.

### 2.1 To tabeller med navnet users

Supabase har to tabeller med samme navn i hvert sit _schema_:

| | `auth.users` | `users` (`public.users`) |
| --- | --- | --- |
| Hvem ejer den? | Supabase Auth | Dig |
| Hvad står der? | E-mail, adgangskode (krypteret), sidste login | Navn, titel, billede, rolle – det, appen viser |
| Hvor ser du den? | _Authentication → Users_ | _Table Editor_ |
| Kan appen læse den? | Nej | Ja |

Appen kan ikke hente andre brugeres navne fra `auth.users`. Derfor gemmer vi dem i `users`. Koblingen er, at en bruger har **samme `id`** i begge tabeller. I appen står id'et i `user.sub`.

**Tjek:** Find din egen bruger under _Authentication → Users_. Find så rækken i _Table Editor → users_ med det samme `id`.

### 2.2 En trigger opretter rækken

Hvordan kommer nye brugere ind i `users`? `setup.sql` har lavet en **trigger**: kode, som databasen selv kører, når noget sker. Hver gang nogen opretter en bruger, opretter triggeren en række i `users` med samme `id`, navnet fra sign up og e-mailen som `mail`.

Du skal ikke skrive den – den findes allerede. Den virker, uanset om brugeren bliver oprettet fra din app eller i Supabase.

**Tjek:** Opret en ny bruger på `/signup`. Under _Table Editor → users_ står der nu en ny række, og dens `id` er det samme som _User UID_ under _Authentication → Users_.

<details>
<summary><strong>Se triggeren i setup.sql</strong></summary>

```sql
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.users (id, name, mail)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1)),
        NEW.email
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

- `AFTER INSERT ON auth.users`: Kør efter hver ny bruger.
- `NEW` er den nye bruger. `NEW.id` bliver til `users.id`, og `NEW.email` bliver til `mail`.
- `raw_user_meta_data ->> 'name'` er det navn, appen sender med ved sign up (2.3). Mangler det, bruges delen af e-mailen før `@`.

</details>

### 2.3 Navn ved sign up

Lige nu får nye brugere delen af e-mailen før `@` som navn. Tilføj et felt til navnet i formularen på `/signup`, og send det med til Supabase. Alt i `options.data` bliver gemt på brugeren i `auth.users` – og det er der, triggeren læser navnet.

**Tjek:** Opret endnu en bruger med et navn. Navnet står i `users`.

<details>
<summary><strong>Hint</strong></summary>

```js
const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
```

Hent `name` fra `formData` ligesom `email`, og giv inputfeltet `name="name"`.

</details>

<details>
<summary><strong>Løsning</strong></summary>

Server Action'en i `app/signup/page.js`:

```js
const name = formData.get("name");
const email = formData.get("email");
const password = formData.get("password");

const supabase = await createClient();
const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
```

Øverst i formularen:

```jsx
<label htmlFor="name">Name</label>
<input id="name" name="name" placeholder="Your name" autoComplete="name" required />
```

</details>

**Løsning:** [Navn ved sign up](https://github.com/cederdorff/nextjs-supabase-posts/compare/main...opgave-02-kobl-users) · [branchen `opgave-02-kobl-users`](https://github.com/cederdorff/nextjs-supabase-posts/tree/opgave-02-kobl-users)

<hr style="margin: 2rem 0;">

<a id="opgave-3"></a>

## Opgave 3: Din profil fra users

**Resultat:** `/profile` viser dit navn, din titel og dit billede fra `users`, og du kan rette dem.

### 3.1 Hent din række i users

`getCurrentUser()` giver dig brugeren fra sessionen. Id'et står i `user.sub` – og det er det samme som `id` i `users`. Tilføj en ny funktion i `lib/auth.js`, `getCurrentProfile()`, der henter rækken i `users` med det id.

<details>
<summary><strong>Hint</strong></summary>

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

Fejlen hjælper dig, hvis din bruger mangler en række i `users`. Uden den ville `/profile` sende dig til `/login`, og `/login` sende dig tilbage igen.

</details>

### 3.2 Vis profilen

Brug `getCurrentProfile()` på `/profile` i stedet for `getCurrentUser()`. Vis brugeren med komponenten `UserBadge`, som forsiden også bruger.

**Tjek:** `/profile` viser dit navn. Logget ud sendes du stadig til `/login`.

### 3.3 Ret din profil

Lav en formular med navn, titel og billede-URL og en Server Action, `updateProfile`, der gemmer dem i `users`. Brug `defaultValue`, så felterne viser det, der står nu.

Tænk over, **hvilken række** Server Action'en må ændre. Id'et skal komme fra sessionen på serveren – aldrig fra formularen.

**Tjek:** Ret dit navn og din titel. De står med det samme på `/profile` og i `users` i Supabase.

<details>
<summary><strong>Hint</strong></summary>

En Server Action er sin egen request. Hent brugeren igen med `getCurrentUser()`, og opdatér kun rækken, hvor `id` er `user.sub`:

```js
await supabase.from("users").update({ name, title, image }).eq("id", user.sub);
```

</details>

<details>
<summary><strong>Løsning</strong></summary>

```jsx
async function updateProfile(formData) {
  "use server";

  const user = await getCurrentUser();

  if (!user) {
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
    .eq("id", user.sub);

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

**Løsning:** [Din profil fra users](https://github.com/cederdorff/nextjs-supabase-posts/compare/opgave-02-kobl-users...opgave-03-profil) · [branchen `opgave-03-profil`](https://github.com/cederdorff/nextjs-supabase-posts/tree/opgave-03-profil)

<hr style="margin: 2rem 0;">

<a id="opgave-4"></a>

## Opgave 4: Opret posts som dig selv

**Resultat:** Nye posts tilhører den bruger, der er logget ind, og kun brugere, der er logget ind, kan oprette posts.

### 4.1 Væk med CURRENT_USER_ID

Slet `lib/current-user.js`. I `app/create/page.js` henter Server Action'en i stedet brugeren med `getCurrentUser()` og bruger `user.sub` som `userId`.

**Tjek:** Opret et post. Dit navn står på det på forsiden. Ret dit navn på `/profile`, og se det skifte på alle dine posts – samme relation som i Post App.

### 4.2 Kræv login

Send brugere, der ikke er logget ind, til `/login` – både på siden og i Server Action'en. Hvorfor begge steder? Siden bestemmer, hvem der **ser** formularen. Server Action'en er en `POST`-request, som alle kan sende – også uden at åbne siden.

**Tjek:** Logget ud sender `/create` dig til `/login`.

<details>
<summary><strong>Løsning</strong></summary>

```jsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

async function createPost(formData) {
  "use server";

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("posts").insert({
    caption: formData.get("caption").trim(),
    image: formData.get("image").trim(),
    userId: user.sub,
  });

  if (error) {
    redirect("/create?error=true");
  }

  redirect("/");
}

export default async function CreatePage({ searchParams }) {
  const { error } = await searchParams;

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // ... formularen som før
}
```

</details>

**Sidder du fast?**

- **_Module not found: @/lib/current-user_?** Fjern importen af `CURRENT_USER_ID` øverst i `app/create/page.js`.

**Løsning:** [Opret posts som dig selv](https://github.com/cederdorff/nextjs-supabase-posts/compare/opgave-03-profil...opgave-04-opret-posts) · [branchen `opgave-04-opret-posts`](https://github.com/cederdorff/nextjs-supabase-posts/tree/opgave-04-opret-posts)

<hr style="margin: 2rem 0;">

<a id="opgave-5"></a>

## Opgave 5: Kun dine egne posts

**Resultat:** Kun den, der har skrevet et post, ser _Edit_ og _Delete_ og kan rette og slette det.

### 5.1 Skjul knapperne

I `app/posts/[id]/page.js`: Hent brugeren, og sammenlign `user.sub` med `post.userId`. Vis kun formularen med _Edit_ og _Delete_, når de er ens.

**Tjek:** På dine egne posts ser du knapperne. På de andres – og når du er logget ud – gør du ikke.

<details>
<summary><strong>Hint</strong></summary>

```jsx
const user = await getCurrentUser();
const isOwner = user?.sub === post.userId;
```

`?.` giver `undefined` i stedet for en fejl, når `user` er `null`. Pak formularen ind i `{isOwner && (...)}`.

</details>

### 5.2 Tjek på serveren

En skjult knap stopper ingen. Log ind som en bruger, der ikke ejer et post. Åbn post'et, og tilføj `/update` til URL'en – siden virker stadig. Tilføj samme tjek tre steder:

1. Øverst på `app/posts/[id]/update/page.js`: Send til `/posts/[id]`, hvis brugeren ikke ejer post'et.
2. I Server Action'en `updatePost`.
3. I Server Action'en `deletePost`.

**Tjek:** `/update` på et post, du ikke ejer, sender dig tilbage til post'et. Dine egne posts kan du stadig rette og slette.

<details>
<summary><strong>Løsning</strong></summary>

I `deletePost` og `updatePost` – og øverst på update-siden:

```js
const user = await getCurrentUser();

if (user?.sub !== post.userId) {
  redirect(`/posts/${id}`);
}
```

Knappen på detaljesiden:

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

### 5.3 Er data nu beskyttet?

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

**Tjek:** Post'et hedder nu _Hacked_ på forsiden – uden login og uden om alle dine tjek. Det løser du i opgave 6. Gem koden i _Console_, så du kan køre den igen.

**Løsning:** [Kun dine egne posts](https://github.com/cederdorff/nextjs-supabase-posts/compare/opgave-04-opret-posts...opgave-05-egne-posts) · [branchen `opgave-05-egne-posts`](https://github.com/cederdorff/nextjs-supabase-posts/tree/opgave-05-egne-posts)

<hr style="margin: 2rem 0;">

<a id="opgave-6"></a>

## Opgave 6: Row Level Security

**Resultat:** Databasen afviser alt, en bruger ikke må – uanset hvor requesten kommer fra.

Row Level Security (RLS) er regler i databasen. Du laver dem med klik i Supabase – ingen kode i appen.

### 6.1 Slå RLS til

Åbn _Authentication → Policies_ i Supabase. Klik på _Enable RLS_ ved `posts` og ved `users`.

**Tjek:** Genindlæs forsiden. Hvad sker der – og hvorfor kommer der ingen fejl?

<details>
<summary><strong>Løsning</strong></summary>

Forsiden viser 0 posts. Med RLS slået til og ingen **policies** må ingen læse noget. Supabase svarer med en tom liste – ikke en fejl – fordi der ikke er nogen rækker, du må se. RLS starter lukket, og hver policy åbner for præcis det, der er tilladt.

</details>

### 6.2 Alle må læse

En **policy** er en regel for én handling: `SELECT` (læs), `INSERT` (opret), `UPDATE` (ret) eller `DELETE` (slet). Alle må se posts og brugernes navne – også uden login.

1. Klik på _Create policy_ ved `posts`.
2. Vælg skabelonen _Enable read access for all users_. Den giver `SELECT` til alle med reglen `true`.
3. Klik på _Save policy_.
4. Gør det samme ved `users`.

**Tjek:** Forsiden viser posts igen. Prøv at oprette et post. Det fejler, for der er ingen policy til `INSERT`.

### 6.3 Kun dine egne

Nu skal de, der er logget ind, kunne oprette, rette og slette **deres egne** posts og rette **deres egen** profil. Lav en policy for hver række i tabellen: Klik på _Create policy_, giv den et navn, vælg handlingen under _Policy command_ og `authenticated` under _Target roles_, og skriv reglen.

| Tabel | Policy command | Target roles | Reglen |
| --- | --- | --- | --- |
| `posts` | `INSERT` | `authenticated` | `(select auth.uid()) = "userId"` |
| `posts` | `UPDATE` | `authenticated` | `(select auth.uid()) = "userId"` |
| `posts` | `DELETE` | `authenticated` | `(select auth.uid()) = "userId"` |
| `users` | `UPDATE` | `authenticated` | `(select auth.uid()) = id` |

Sådan læser du reglen:

- `auth.uid()` er id'et på den bruger, der sender requesten – det samme som `user.sub` i din app.
- `= "userId"`: Reglen gælder kun posts, hvor `userId` er dit id. `"userId"` står i anførselstegn, fordi navnet har et stort bogstav.
- `authenticated` er den, der er logget ind. `anon` er den, der ikke er.
- Ved `UPDATE` er der to felter: `USING` (hvilke posts du må rette) og `WITH CHECK` (hvordan post'et skal se ud bagefter). Skriv den samme regel i begge.

**Tjek:** Du kan oprette, rette og slette dine egne posts og rette din profil. _Table Editor_ viser ikke længere **UNRESTRICTED**.

### 6.4 Test som tre brugere

1. **Ikke logget ind:** Kør `fetch`-koden fra 5.3 igen med `"Hacked again"`. Svaret er `[]`, og post'et er uændret. Policy'en til `UPDATE` gælder kun `authenticated`.
2. **Logget ind som dig selv:** Opret, ret og slet et af dine egne posts.
3. **Logget ind som en anden:** Fjern midlertidigt `if`'en i `deletePost`, og vis knapperne for alle (`{true && (...)}`). Log ind som en anden bruger, og slet et af dine posts. Post'et er der stadig – appen lod dig, men databasen sagde nej. Sæt koden tilbage bagefter.

**Tjek:** Du kan forklare, hvorfor du både har tjek i appen og policies i databasen.

<details>
<summary><strong>Løsning</strong></summary>

Tjekket i appen giver brugeren en god oplevelse: Knapper, de ikke kan bruge, vises ikke, og de bliver sendt et fornuftigt sted hen. Policies beskytter data: De gælder for alle requests – fra din app, fra _Console_ og fra alle andre, der har din publishable key. Derfor må den publishable key gerne være offentlig, når RLS er slået til. En `sb_secret_`-key springer RLS over og må aldrig ligge i browseren eller på GitHub.

</details>

**Diskutér:** RLS bestemmer, hvilke **rækker** du må se – ikke hvilke kolonner. Alle kan nu læse alle e-mails i `users`. Er det et problem i jeres projekt?

**Sidder du fast?**

- **_new row violates row-level security policy_?** Policy'en til `INSERT` mangler, eller `userId` er ikke dit id. Tjek, at `createPost` bruger `user.sub`.
- **_column "userid" does not exist_?** Du mangler anførselstegn: Skriv `"userId"`.
- **Sletter eller retter du, men intet sker?** Det er RLS. `UPDATE` og `DELETE` giver ingen fejl, når 0 rækker må rammes. Tjek dine policies under _Authentication → Policies_.

**Løsning:** Opgave 6 har ingen kodeændringer – alt sker i Supabase. Dine policies skal se ud som i tabellerne i 6.2 og 6.3.

<hr style="margin: 2rem 0;">

<a id="opgave-7"></a>

## Opgave 7: Roller: user og admin

**Resultat:** En admin kan slette alle posts, og ingen kan gøre sig selv til admin.

### 7.1 Gør dig selv til admin

`users` har allerede kolonnen `role` fra `setup.sql`. Alle brugere har rollen `user`, og den kan kun være `user` eller `admin`. Åbn _Table Editor → users_, og ret `role` til `admin` på din egen række.

**Tjek:** Din række har rollen `admin`, alle andre har `user`.

### 7.2 Rollen er låst

Policy'en fra 6.3 lader dig rette din egen række. Kunne du så ikke bare rette din egen `role` til `admin`? Nej: `setup.sql` giver kun appen lov til at rette `name`, `title` og `image`. RLS bestemmer, hvilke **rækker** du må ændre – rettigheder (_grants_) bestemmer, hvilke **kolonner**.

**Tjek:** Ret dit navn på `/profile`. Det virker stadig. `role` kan kun ændres i _Table Editor_.

### 7.3 Admins kan slette alle posts

Lav en policy mere på `posts`:

| Tabel | Policy command | Target roles | Reglen |
| --- | --- | --- | --- |
| `posts` | `DELETE` | `authenticated` | `is_admin()` |

`is_admin()` er en funktion fra `setup.sql`. Den svarer `true`, når den, der sender requesten, har rollen `admin` i `users`.

Nu har `DELETE` to policies. Det er nok, at én af dem siger ja: Du må slette et post, hvis det er dit – **eller** hvis du er admin.

### 7.4 Vis Delete for admins

Nu skal detaljesiden bruge rollen. Skift `getCurrentUser()` ud med `getCurrentProfile()` i `app/posts/[id]/page.js` – rækken fra `users` har både `id` og `role`. Vis _Delete_ for ejeren og for admins, men _Edit_ kun for ejeren. Husk tjekket i `deletePost`.

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

**Sidder du fast?**

- **Kan du ikke slette som admin?** Tjek, at `role` er præcis `admin` med små bogstaver, og at policy'en fra 7.3 findes under _Authentication → Policies_.
- **_permission denied for table users_, når du gemmer din profil?** `updateProfile` sender en kolonne, du ikke har lov til at ændre. Den må kun sende `name`, `title` og `image`.

**Løsning:** [Roller](https://github.com/cederdorff/nextjs-supabase-posts/compare/opgave-05-egne-posts...opgave-07-roller) · [branchen `opgave-07-roller`](https://github.com/cederdorff/nextjs-supabase-posts/tree/opgave-07-roller)

<hr style="margin: 2rem 0;">

<a id="ekstra"></a>

## Ekstra: En admin-side med unauthorized() og forbidden()

Lav `/admin`, der viser alle posts med en _Delete_-knap ved hver. Next.js har to funktioner med hver sin fil til adgang, ligesom `notFound()` og `not-found.js`:

- `unauthorized()` viser `app/unauthorized.js` (401), når brugeren ikke er logget ind.
- `forbidden()` viser `app/forbidden.js` (403), når brugeren er logget ind, men ikke er admin.

De er stadig eksperimentelle og kræver `experimental: { authInterrupts: true }` i `next.config.mjs`. Genstart `npm run dev` bagefter.

**Tjek:** Logget ud viser `/admin` din `unauthorized.js`. Som almindelig bruger viser den `forbidden.js`. Som admin ser du alle posts og kan slette dem.

**Løsning:** [Admin-siden](https://github.com/cederdorff/nextjs-supabase-posts/compare/opgave-07-roller...ekstra-admin) · [branchen `ekstra-admin`](https://github.com/cederdorff/nextjs-supabase-posts/tree/ekstra-admin)

<hr style="margin: 2rem 0;">

<a id="fejlfinding"></a>

## Fejlfinding

| Problem | Løsning |
| --- | --- |
| _relation "users" does not exist_ | Kør hele `supabase/setup.sql` i SQL Editor |
| 0 posts efter `setup.sql` | Du havde ingen brugere. Opret en på `/signup`, og kør `setup.sql` igen |
| _Could not create the post_ i opgave 1 | Indsæt en rigtig _User UID_ i `lib/current-user.js` |
| _No row in users with id …_ | Din bruger mangler en række i `users`. Kør `setup.sql` igen |
| Forsiden er tom efter 6.1 | Policies til `SELECT` mangler. Se 6.2 |
| _new row violates row-level security policy_ | Policy'en til `INSERT` mangler, eller `userId` er ikke `user.sub` |
| _column "userid" does not exist_ | Anførselstegn mangler i reglen. Skriv `"userId"` |
| Du retter eller sletter, men intet sker | RLS afviser uden fejl. Tjek dine policies under _Authentication → Policies_ |
| _permission denied for table users_ | Du prøver at ændre en kolonne, appen ikke må ændre, fx `role`. Se 7.2 |
| Du har kørt `setup.sql` igen, og dine policies er væk | Filen starter helt forfra med RLS slået fra. Lav policies fra opgave 6 og 7 igen |
| _fetch failed_ eller ingen forbindelse | Supabase-projektet er sat på pause. Klik på _Resume project_ |

<hr style="margin: 2rem 0;">

## Materialer

- [nextjs-supabase-posts](https://github.com/cederdorff/nextjs-supabase-posts) – startprojektet på `main` og én løsningsbranch pr. opgave. Hele databasen står i `supabase/setup.sql`
- [Supabase: User Management](https://supabase.com/docs/guides/auth/managing-user-data) – `users` koblet til `auth.users` med en trigger
- [Supabase: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase: Understanding API keys](https://supabase.com/docs/guides/api/api-keys) – publishable og secret keys
- [Supabase: JavaScript – Fetch data](https://supabase.com/docs/reference/javascript/select) og [Update data](https://supabase.com/docs/reference/javascript/update)
- [Next.js: forbidden](https://nextjs.org/docs/app/api-reference/functions/forbidden) og [unauthorized](https://nextjs.org/docs/app/api-reference/functions/unauthorized)
