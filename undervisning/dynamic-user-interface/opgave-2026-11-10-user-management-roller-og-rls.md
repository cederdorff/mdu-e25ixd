# Opgave: User management, roller og Row Level Security - 10-11-2026

## Formål

Du bygger videre på login fra 30. oktober i en Next.js-app, der allerede viser posts og users fra Supabase. Login og data hænger bare ikke sammen endnu. Du kobler `users` til `auth.users`, så posts tilhører den bruger, der er logget ind. Derefter beskytter du data, så brugere kun kan ændre deres egne posts, og giver en admin lov til mere.

Sådan ser datamodellen ud, når du er færdig:

```text
auth.users                users                          posts
(Supabase Auth)           id     uuid  PK  <-----------  user_id     uuid  FK
id     uuid   -------->   name   text                    id          bigint PK
email  text   trigger     mail   text                    caption     text
                          title  text                    image       text
                          image  text                    created_at  timestamptz
                          role   text  (user | admin)
```

<hr style="margin: 2rem 0;">

## Sådan bruger du opgaven

- Slut hvert trin med **Tjek**.
- Sidder du fast? Fold **Hint** ud – og **Løsning**, når du har prøvet selv.
- Commit og push efter hver opgave med Source Control i VS Code eller GitHub Desktop.
- SQL kører du i **SQL Editor** i Supabase: Indsæt koden, og klik på _Run_.

<hr style="margin: 2rem 0;">

## Oversigt

1. [Hent startprojektet](#opgave-1)
2. [Kobl users til auth.users](#opgave-2)
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

**Resultat:** Appen viser 10 posts med deres bruger, og du har fundet de tre ting, der er galt.

### 1.1 Dit eget repository

1. Åbn [nextjs-supabase-posts](https://github.com/cederdorff/nextjs-supabase-posts) på GitHub. Klik på **Use this template → Create a new repository**, giv det et navn, og klik på _Create repository_.
2. Klon dit nye repository i VS Code (_Clone Git Repository_) eller GitHub Desktop (_File → Clone Repository_).
3. Åbn mappen i VS Code, og kør i terminalen:

   ```bash
   npm install
   ```

### 1.2 Gør Supabase klar

Brug dit Supabase-projekt fra 30. oktober. Så har du allerede brugere i `auth.users`, og _Confirm email_ er slået fra. Står projektet som _Paused_, så klik på _Resume project_.

1. Kopiér `.env.example` til `.env.local`, og indsæt URL og publishable key fra **Connect** – ligesom sidst. Du kan også kopiere `.env.local` fra dit projekt fra 30. oktober.
2. Åbn **SQL Editor** i Supabase. Indsæt hele indholdet af [`supabase/setup.sql`](https://github.com/cederdorff/nextjs-supabase-posts/blob/main/supabase/setup.sql), og klik på _Run_. Spørger Supabase om en _destructive operation_, så klik på _Run this query_. Filen sletter og opretter tabellerne `users` og `posts`.
3. Kør `npm run dev`, og åbn [http://localhost:3000](http://localhost:3000).

**Tjek:** Forsiden viser 10 posts med billede, navn og titel. Under _Table Editor_ i Supabase findes `users` og `posts`.

### 1.3 Find de tre problemer

Appen virker – men den er ikke sikker. Prøv det selv, og svar på spørgsmålene:

1. **Log ind**, og opret et post på `/create`. Hvem står som forfatter? Find svaret i `lib/current-user.js`.
2. **Log ud**, åbn et post, og klik på _Edit_. Kan du rette det? Kan du slette det?
3. **Åbn _Table Editor_** i Supabase. Hvad står der ved `users` og `posts`?
4. Åbn _Authentication → Users_ og _Table Editor → users_. Findes din egen bruger begge steder?

**Tjek:** Du kan svare på de fire spørgsmål.

<details>
<summary><strong>Løsning</strong></summary>

1. Rasmus Cederdorff – uanset hvem der er logget ind. Alle nye posts får det faste `CURRENT_USER_ID`, ligesom i Post App.
2. Ja. Alle kan rette og slette alle posts, også uden at være logget ind.
3. **UNRESTRICTED**. Row Level Security er slået fra, så alle med din publishable key kan læse og ændre alt.
4. Nej. Din bruger findes i `auth.users`, men ikke i `users`. De to tabeller ved ikke noget om hinanden.

Det retter du i opgave 2–7.

</details>

**Sidder du fast?**

- **_relation "users" does not exist_ eller tom forside?** Kør hele `supabase/setup.sql` i SQL Editor.
- **_column posts.created_at does not exist_?** Dit projekt har en gammel `posts`-tabel fra Post App. Kør `supabase/setup.sql`. Den sletter den gamle tabel.

**Startprojektet:** [`main`](https://github.com/cederdorff/nextjs-supabase-posts/tree/main)

<hr style="margin: 2rem 0;">

<a id="opgave-2"></a>

## Opgave 2: Kobl users til auth.users

**Resultat:** Når nogen opretter en bruger, får de automatisk en række i `users` med samme `id` som i `auth.users`.

### 2.1 To tabeller med navnet users

Supabase har to tabeller med samme navn i hvert sit _schema_:

| | `auth.users` | `users` (`public.users`) |
| --- | --- | --- |
| Hvem ejer den? | Supabase Auth | Dig |
| Hvad står der? | E-mail, adgangskode (krypteret), sidste login | Navn, titel, billede – det, appen viser |
| Hvor ser du den? | _Authentication → Users_ | _Table Editor_ |
| Kan appen læse den? | Nej | Ja |

Appen kan ikke hente andre brugeres navne fra `auth.users`. Derfor gemmer vi dem i `users`. Koblingen er, at en bruger har **samme `id`** i begge tabeller.

**Tjek:** Find din egen bruger under _Authentication → Users_, og kopiér dens _User UID_. Den findes ikke i `users` endnu.

### 2.2 En trigger opretter rækken

En **trigger** er kode, som databasen selv kører, når noget sker. Vi vil have: Når en række oprettes i `auth.users`, så opret en række i `users` med samme `id`. Kør i SQL Editor:

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

<details>
<summary><strong>Sådan læser du SQL'en</strong></summary>

- `CREATE FUNCTION` laver en funktion i databasen. `CREATE TRIGGER` kører den `AFTER INSERT ON auth.users` – efter hver ny bruger.
- `NEW` er den nye række i `auth.users`. `NEW.id` bliver til `users.id`, og `NEW.email` bliver til `mail`.
- `raw_user_meta_data ->> 'name'` er det navn, appen sender med ved sign up (2.3). `COALESCE` bruger det første, der ikke er tomt: navnet – eller delen af e-mailen før `@`.
- `SECURITY DEFINER` betyder, at funktionen kører med databasens rettigheder. Den må altså oprette rækken, selv når Row Level Security er slået til i opgave 6.

</details>

**Tjek:** Opret en ny bruger på `/signup`. Under _Table Editor → users_ står der nu en ny række, og dens `id` er det samme som _User UID_ under _Authentication → Users_.

### 2.3 Navn ved sign up

Lige nu får nye brugere delen af e-mailen før `@` som navn. Tilføj et felt til navnet i formularen på `/signup`, og send det med til Supabase. Alt i `options.data` bliver gemt som `raw_user_meta_data` på brugeren – og det er der, triggeren læser navnet.

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

### 2.4 Brugerne fra før triggeren

Triggeren kører kun for **nye** brugere. Dem, du oprettede 30. oktober, har stadig ingen række i `users`. Kopiér dem én gang:

```sql
INSERT INTO public.users (id, name, mail)
SELECT id, split_part(email, '@', 1), email
FROM auth.users
ON CONFLICT (id) DO NOTHING;
```

`ON CONFLICT (id) DO NOTHING` springer de brugere over, der allerede har en række.

**Tjek:** Alle brugere under _Authentication → Users_ har nu en række i `users` med samme `id`. De 5 brugere fra startprojektet ligger der stadig. De findes ikke i `auth.users`, så ingen kan logge ind som dem.

**Sidder du fast?**

- **_function public.handle_new_user already exists_?** Du har kørt SQL'en før. Triggeren findes altså allerede.
- **_Database error saving new user_ ved sign up?** Triggeren fejler. Tjek, at tabellen `users` findes, og at du har kørt hele SQL'en fra 2.2.

**Løsning:** [Kobl users til auth.users](https://github.com/cederdorff/nextjs-supabase-posts/compare/main...opgave-02-kobl-users) · [branchen `opgave-02-kobl-users`](https://github.com/cederdorff/nextjs-supabase-posts/tree/opgave-02-kobl-users)

<hr style="margin: 2rem 0;">

<a id="opgave-3"></a>

## Opgave 3: Din profil fra users

**Resultat:** `/profile` viser dit navn, din titel og dit billede fra `users`, og du kan rette dem.

### 3.1 Hent din række i users

`getCurrentUser()` giver dig brugeren fra sessionen. Id'et står i `user.sub`. Tilføj en ny funktion i `lib/auth.js`, `getCurrentProfile()`, der henter rækken i `users` med det id.

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

  // Logged in, but no row in users: the user signed up before the trigger existed
  if (!data) {
    throw new Error(`No row in users with id ${user.sub}. Copy the existing users from auth.users (task 2.4).`);
  }

  return data;
}
```

Fejlen hjælper dig, hvis du har sprunget 2.4 over. Uden den ville `/profile` sende dig til `/login`, og `/login` sende dig tilbage igen.

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

Slet `lib/current-user.js`. I `app/create/page.js` henter Server Action'en i stedet brugeren med `getCurrentUser()` og bruger `user.sub` som `user_id`.

**Tjek:** Opret et post. Dit navn står på det på forsiden. Ret dit navn på `/profile`, og se det skifte på alle dine posts – samme relation som i Case 1.

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
    user_id: user.sub,
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
- **_insert or update on table "posts" violates foreign key constraint_?** Din bruger har ingen række i `users`. Kør SQL'en fra 2.4.

**Løsning:** [Opret posts som dig selv](https://github.com/cederdorff/nextjs-supabase-posts/compare/opgave-03-profil...opgave-04-opret-posts) · [branchen `opgave-04-opret-posts`](https://github.com/cederdorff/nextjs-supabase-posts/tree/opgave-04-opret-posts)

<hr style="margin: 2rem 0;">

<a id="opgave-5"></a>

## Opgave 5: Kun dine egne posts

**Resultat:** Kun den, der har skrevet et post, ser _Edit_ og _Delete_ og kan rette og slette det.

### 5.1 Skjul knapperne

I `app/posts/[id]/page.js`: Hent brugeren, og sammenlign `user.sub` med `post.user_id`. Vis kun formularen med _Edit_ og _Delete_, når de er ens.

**Tjek:** På dine egne posts ser du knapperne. På de andres – og når du er logget ud – gør du ikke.

<details>
<summary><strong>Hint</strong></summary>

```jsx
const user = await getCurrentUser();
const isOwner = user?.sub === post.user_id;
```

`?.` giver `undefined` i stedet for en fejl, når `user` er `null`. Pak formularen ind i `{isOwner && (...)}`.

</details>

### 5.2 Tjek på serveren

En skjult knap stopper ingen. Kopiér URL'en til `/posts/1/update`, og åbn den – den virker stadig. Tilføj samme tjek tre steder:

1. Øverst på `app/posts/[id]/update/page.js`: Send til `/posts/[id]`, hvis brugeren ikke ejer post'et.
2. I Server Action'en `updatePost`.
3. I Server Action'en `deletePost`.

**Tjek:** `/posts/1/update` sender dig tilbage til post'et. Dine egne posts kan du stadig rette og slette.

<details>
<summary><strong>Løsning</strong></summary>

I `deletePost` og `updatePost` – og øverst på update-siden:

```js
const user = await getCurrentUser();

if (user?.sub !== post.user_id) {
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

Din app tjekker brugeren – men din app er ikke den eneste vej til databasen. Din publishable key er offentlig: Den må gerne ligge i browseren. Prøv selv. Åbn udviklerværktøjerne på [http://localhost:3000](http://localhost:3000), og kør i _Console_ – med din egen URL og key fra `.env.local`:

```js
const response = await fetch("https://<dit-projekt>.supabase.co/rest/v1/posts?id=eq.1", {
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

**Tjek:** Post 1 hedder nu _Hacked_ på forsiden – uden login og uden om alle dine tjek. Det løser du i opgave 6. Gem koden i _Console_, så du kan køre den igen.

**Løsning:** [Kun dine egne posts](https://github.com/cederdorff/nextjs-supabase-posts/compare/opgave-04-opret-posts...opgave-05-egne-posts) · [branchen `opgave-05-egne-posts`](https://github.com/cederdorff/nextjs-supabase-posts/tree/opgave-05-egne-posts)

<hr style="margin: 2rem 0;">

<a id="opgave-6"></a>

## Opgave 6: Row Level Security

**Resultat:** Databasen afviser alt, en bruger ikke må – uanset hvor requesten kommer fra.

### 6.1 Slå RLS til

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
```

**Tjek:** Genindlæs forsiden. Hvad sker der – og hvorfor kommer der ingen fejl?

<details>
<summary><strong>Løsning</strong></summary>

Forsiden viser 0 posts. Med RLS slået til og ingen **policies** må ingen læse noget. Supabase svarer med en tom liste – ikke en fejl – fordi der ikke er nogen rækker, du må se. RLS starter lukket, og hver policy åbner for præcis det, der er tilladt.

</details>

### 6.2 Policies til at læse

En policy er en regel for én handling: `SELECT`, `INSERT`, `UPDATE` eller `DELETE`. Alle må se posts og brugernes navne – også uden login:

```sql
CREATE POLICY "Everyone can read users"
ON users FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Everyone can read posts"
ON posts FOR SELECT
TO anon, authenticated
USING (true);
```

`anon` er den, der ikke er logget ind. `authenticated` er den, der er. `USING (true)` betyder: alle rækker.

**Tjek:** Forsiden viser posts igen. Prøv at oprette et post. Det fejler, for der er ingen policy til `INSERT`.

### 6.3 Policies til at ændre

`auth.uid()` er id'et på den bruger, der sender requesten – det samme som `user.sub` i din app. Skriv selv de fire policies:

| Tabel | Handling | Hvem | Regel |
| --- | --- | --- | --- |
| `posts` | `INSERT` | `authenticated` | `user_id` er din egen |
| `posts` | `UPDATE` | `authenticated` | `user_id` er din egen |
| `posts` | `DELETE` | `authenticated` | `user_id` er din egen |
| `users` | `UPDATE` | `authenticated` | `id` er din egen |

`USING` bestemmer, hvilke **eksisterende** rækker du må ramme. `WITH CHECK` bestemmer, hvordan en **ny eller ændret** række skal se ud. `INSERT` har kun `WITH CHECK`, `DELETE` kun `USING`, og `UPDATE` har begge.

<details>
<summary><strong>Hint</strong></summary>

```sql
CREATE POLICY "Users can create their own posts"
ON posts FOR INSERT
TO authenticated
WITH CHECK (user_id = (SELECT auth.uid()));
```

Supabase anbefaler `(SELECT auth.uid())` frem for `auth.uid()`. Så bliver den kun beregnet én gang pr. request.

</details>

<details>
<summary><strong>Løsning</strong></summary>

```sql
CREATE POLICY "Users can create their own posts"
ON posts FOR INSERT
TO authenticated
WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can update their own posts"
ON posts FOR UPDATE
TO authenticated
USING (user_id = (SELECT auth.uid()))
WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can delete their own posts"
ON posts FOR DELETE
TO authenticated
USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can update their own row"
ON users FOR UPDATE
TO authenticated
USING (id = (SELECT auth.uid()))
WITH CHECK (id = (SELECT auth.uid()));
```

Der er ingen policy til `INSERT` og `DELETE` på `users`. Rækkerne kommer fra triggeren, som må alt, fordi den er `SECURITY DEFINER`.

</details>

**Tjek:** Du kan oprette, rette og slette dine egne posts og rette din profil. _Table Editor_ viser ikke længere **UNRESTRICTED**.

### 6.4 Test som tre brugere

1. **Ikke logget ind:** Kør `fetch`-koden fra 5.3 igen med `"Hacked again"`. Svaret er `[]`, og post 1 er uændret. Policy'en til `UPDATE` gælder kun `authenticated`.
2. **Logget ind som dig selv:** Opret, ret og slet et af dine egne posts.
3. **Logget ind som en anden:** Fjern midlertidigt `if`'en i `deletePost`, og vis knapperne for alle (`{true && (...)}`). Log ind som en anden bruger, og slet et af dine posts. Post'et er der stadig – appen lod dig, men databasen sagde nej. Sæt koden tilbage bagefter.

**Tjek:** Du kan forklare, hvorfor du både har tjek i appen og policies i databasen.

<details>
<summary><strong>Løsning</strong></summary>

Tjekket i appen giver brugeren en god oplevelse: Knapper, de ikke kan bruge, vises ikke, og de bliver sendt et fornuftigt sted hen. Policies beskytter data: De gælder for alle requests – fra din app, fra _Console_ og fra alle andre, der har din publishable key. Derfor må den publishable key gerne være offentlig, når RLS er slået til. En `sb_secret_`-key springer RLS over og må aldrig ligge i browseren eller på GitHub.

</details>

**Diskutér:** RLS bestemmer, hvilke **rækker** du må se – ikke hvilke kolonner. Alle kan nu læse alle e-mails i `users`. Er det et problem i jeres projekt?

**Sidder du fast?**

- **_new row violates row-level security policy_?** Policy'en til `INSERT` mangler, eller `user_id` er ikke din egen. Tjek, at `createPost` bruger `user.sub`.
- **Sletter eller retter du, men intet sker?** Det er RLS. `UPDATE` og `DELETE` giver ingen fejl, når 0 rækker må rammes. Tjek dine policies under _Authentication → Policies_.
- **_policy already exists_?** Du har kørt den før. Slet den under _Authentication → Policies_, eller spring den over.

**Løsning:** [Row Level Security](https://github.com/cederdorff/nextjs-supabase-posts/compare/opgave-05-egne-posts...opgave-06-rls) · [branchen `opgave-06-rls`](https://github.com/cederdorff/nextjs-supabase-posts/tree/opgave-06-rls) – SQL'en ligger i `supabase/06-row-level-security.sql`

<hr style="margin: 2rem 0;">

<a id="opgave-7"></a>

## Opgave 7: Roller: user og admin

**Resultat:** En admin kan slette alle posts – også dem fra startprojektet – og ingen kan gøre sig selv til admin.

### 7.1 En rolle på brugeren

```sql
ALTER TABLE users
ADD COLUMN role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin'));
```

Alle brugere får rollen `user`. `CHECK` sørger for, at rollen kun kan være `user` eller `admin`. Gør dig selv til admin: Åbn _Table Editor → users_, og ret `role` til `admin` på din egen række.

**Tjek:** Din række har rollen `admin`, alle andre har `user`.

### 7.2 Lås rollen

Policy'en fra 6.3 lader dig rette din egen række – også `role`. Så kunne alle gøre sig selv til admin. RLS bestemmer rækkerne, men **rettigheder** (_grants_) bestemmer kolonnerne:

```sql
REVOKE UPDATE ON users FROM anon, authenticated;
GRANT UPDATE (name, title, image) ON users TO authenticated;
```

**Tjek:** Ret dit navn på `/profile`. Det virker stadig. `role` kan kun ændres i _Table Editor_ eller SQL Editor.

### 7.3 Admins kan slette alle posts

Skriv en policy til `DELETE` på `posts`, der giver lov, når brugeren, der sender requesten, har rollen `admin` i `users`. Har en handling flere policies, er det nok, at én af dem siger ja: Du må slette et post, hvis det er dit – **eller** hvis du er admin.

<details>
<summary><strong>Hint</strong></summary>

Brug `EXISTS` til at spørge: Findes der en række i `users` med mit id og rollen `admin`?

```sql
USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE ...
    )
)
```

</details>

<details>
<summary><strong>Løsning</strong></summary>

```sql
CREATE POLICY "Admins can delete all posts"
ON posts FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE id = (SELECT auth.uid()) AND role = 'admin'
    )
);
```

</details>

### 7.4 Vis Delete for admins

Nu skal detaljesiden bruge rollen. Skift `getCurrentUser()` ud med `getCurrentProfile()` i `app/posts/[id]/page.js` – rækken fra `users` har både `id` og `role`. Vis _Delete_ for ejeren og for admins, men _Edit_ kun for ejeren. Husk tjekket i `deletePost`.

**Tjek:** Som admin kan du slette et af de 10 posts fra startprojektet. Som almindelig bruger kan du ikke.

<details>
<summary><strong>Løsning</strong></summary>

```jsx
const profile = await getCurrentProfile();
const isOwner = profile?.id === post.user_id;
const isAdmin = profile?.role === "admin";

async function deletePost() {
  "use server";

  const profile = await getCurrentProfile();

  if (profile?.id !== post.user_id && profile?.role !== "admin") {
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

**Løsning:** [Roller](https://github.com/cederdorff/nextjs-supabase-posts/compare/opgave-06-rls...opgave-07-roller) · [branchen `opgave-07-roller`](https://github.com/cederdorff/nextjs-supabase-posts/tree/opgave-07-roller) – SQL'en ligger i `supabase/07-roles.sql`

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
| _column posts.created_at does not exist_ | Du har en gammel `posts`-tabel fra Post App. Kør `supabase/setup.sql` |
| _No row in users with id …_ | Din bruger blev oprettet før triggeren. Kør SQL'en fra 2.4 |
| _Database error saving new user_ | Triggeren fejler. Tjek, at `users` findes, og kør SQL'en fra 2.2 igen |
| Forsiden er tom efter 6.1 | Policies til `SELECT` mangler. Se 6.2 |
| _new row violates row-level security policy_ | Policy'en til `INSERT` mangler, eller `user_id` er ikke `user.sub` |
| Du retter eller sletter, men intet sker | RLS afviser uden fejl. Tjek dine policies under _Authentication → Policies_ |
| _permission denied for table users_ | Du prøver at ændre en kolonne uden grant, fx `role`. Se 7.2 |
| Du har kørt `setup.sql` igen, og din profil er væk | Filen sletter `users`. Kør SQL'en fra 2.4 igen. Triggeren findes stadig |
| _fetch failed_ eller ingen forbindelse | Supabase-projektet er sat på pause. Klik på _Resume project_ |

<hr style="margin: 2rem 0;">

## Materialer

- [nextjs-supabase-posts](https://github.com/cederdorff/nextjs-supabase-posts) – startprojektet på `main` og én løsningsbranch pr. opgave
- [Supabase: User Management](https://supabase.com/docs/guides/auth/managing-user-data) – `users` koblet til `auth.users` med en trigger
- [Supabase: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase: Understanding API keys](https://supabase.com/docs/guides/api/api-keys) – publishable og secret keys
- [Supabase: JavaScript – Fetch data](https://supabase.com/docs/reference/javascript/select) og [Update data](https://supabase.com/docs/reference/javascript/update)
- [PostgreSQL: GRANT](https://www.postgresql.org/docs/current/sql-grant.html) – rettigheder til bestemte kolonner
- [Next.js: forbidden](https://nextjs.org/docs/app/api-reference/functions/forbidden) og [unauthorized](https://nextjs.org/docs/app/api-reference/functions/unauthorized)
