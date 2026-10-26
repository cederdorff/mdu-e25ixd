# Produktionsdag - 28-10-2026

## Formål

Målet er en færdig Next.js-app, der henter posts og en About-page fra din WordPress – og at du kan forklare, hvad der sker i den. Du skal bruge appen torsdag, hvor vi bygger et designsystem ovenpå den.

**Først** vælger du spor 1 eller 2. **Derefter** vælger du ekstraopgaver og/eller Scrimba.

<hr style="margin: 2rem 0;">

## Først: Spor 1 eller spor 2

### Spor 1: Arbejd videre

Fortsæt i dit projekt fra den opgave, du nåede til mandag. Brug [opgaverne i slides](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/opgaver) eller [opgaverne med ekstra hjælp](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-2026-10-26-nextjs-og-headless-wordpress.md) – samme opgaver med forklaringer, **Tjek**, fejlfinding og løsninger. Slut af med opgave 7.

### Spor 2: Start forfra

Nåede du det meste mandag? Byg appen forfra i en ny mappe med [opgaverne med ekstra hjælp](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-2026-10-26-nextjs-og-headless-wordpress.md) fra 1.1 – uden at kigge i din gamle kode. Brug **Sidder du fast?** og slides, før du folder løsningen ud. Publicér projektet som et nyt repository, og brug det projekt, du er gladest for, torsdag.

<hr style="margin: 2rem 0;">

## Derefter: Ekstraopgaver og/eller Scrimba

Lav en eller flere – i den rækkefølge, du vil. Ekstraopgaverne er åbne: Brug dokumentationen, og spørg, når du sidder fast.

### Ekstraopgave: Deploy med Vercel

1. Tjek, at `npm run build` går igennem, og at dit arbejde er pushet.
2. Importér dit repository på [Vercel](https://vercel.com/new) med din GitHub-konto.
3. Tilføj `WORDPRESS_URL` under _Environment Variables_ før deploy – `.env.local` ligger ikke på GitHub.
4. Deploy, og åbn din app. Push en ændring: Hvad sker der?

Se [Deploying](https://nextjs.org/docs/app/getting-started/deploying) og [Environment Variables](https://vercel.com/docs/environment-variables).

### Ekstraopgave: Flere felter med ACF

**I WordPress-admin på Simply.com:**

1. Installér pluginet [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/) under _Plugins → Tilføj nyt_.
2. Opret en field group under _ACF → Field Groups_ med 2–3 felter, fx sted eller læsetid. Sæt _Location Rules_ til _Post Type_ er lig med _Post_, og slå **Show in REST API** til under _Group Settings_.
3. Udfyld felterne på dine posts, og find dem under `acf` i `/wp-json/wp/v2/posts`, fx `post.acf.location`.

**I din Next.js-app:**

4. Vis felterne på detaljesiden og dine cards med `?.`, så posts uden felterne ikke giver en fejl.

Se [ACF og WP REST API](https://www.advancedcustomfields.com/resources/wp-rest-api-integration/).

### Ekstraopgave: Din egen post type

**I WordPress-admin** – kræver ACF fra ekstraopgaven ovenfor:

1. Opret en post type under _ACF → Post Types_, fx `places`. Den er i REST API'et som standard.
2. Giv den en field group med **Show in REST API**, og opret 3–5 udgivne eksempler. Tjek `/wp-json/wp/v2/places`.

**I din Next.js-app:**

3. Byg samme mønster som til posts: `getPlaces()` og `getPlaceBySlug(slug)` i `lib/wordpress.js`, `/places` og `/places/[slug]` med `notFound()` og `loading.js` samt et link i `Header`.

Se [Registering a Custom Post Type](https://www.advancedcustomfields.com/resources/registering-a-custom-post-type/).

### Scrimba

Fortsæt med [Learn Next.js på Scrimba](https://scrimba.com/learn-nextjs-c02moisq6a) efter første del, _Build a Next.js App_. Læg mærke til, hvad der er det samme som i vores app, og hvad der er anderledes.

<hr style="margin: 2rem 0;">

## Materialer

- [Slides: Next.js og headless WordPress](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/)
- [Opgaver med ekstra hjælp og løsninger](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-2026-10-26-nextjs-og-headless-wordpress.md)
- [Undervisningsside: Next.js og headless WordPress](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/race-08-2026-10-26-nextjs-og-headless-wordpress.md)
- [Referencerepo: nextjs-headless-wordpress](https://github.com/cederdorff/nextjs-headless-wordpress) – [commits](https://github.com/cederdorff/nextjs-headless-wordpress/commits/main) følger opgaverne
