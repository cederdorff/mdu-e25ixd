# RACE - Dynamic User Interface: Next.js og headless WordPress - 26-10-2026

## Formål

Indtil nu har vi arbejdet med React og Vite. I dag kaster vi os over React-frameworket Next.js, som vi arbejder med resten af semesteret. Det er stadig React, men med routing, server components og data fetching indbygget. Vi opretter et nyt Next.js-projekt og bruger vores egne WordPress-løsninger som headless CMS.

Målet er en Next.js-app, der henter indhold fra vores WordPress via REST API'et og viser det som en liste eller et grid af cards og på en detaljeside. Appen følger dig resten af forløbet: Vi bygger videre på den med designsystem, login, brugere og motion, og principperne tager vi med over i gruppeprojekterne.

<hr style="margin: 2rem 0;">

## Forberedelse

- Se og kod med på første del af [Learn Next.js på Scrimba](https://scrimba.com/learn-nextjs-c02moisq6a) (gratis): **Build a Next.js App** (ca. 2 timer). Så har du set de grundlæggende begreber, før vi bygger vores egen app.
- Opret testindhold i din WordPress på Simply.com:
  - **Mindst 5 posts** med titel, et par afsnit tekst og gerne et billede i indholdet.
  - Giv hver post et **fremhævet billede** og en **kategori**. Brug mindst 2 forskellige kategorier.
  - **Mindst 1 page** med titlen _About_ og slug `about`, som du kan hente og vise på `/about` i din app.
  - Sørg for, at indholdet er **udgivet**. Kladder kommer ikke med i REST API'et.
- Åbn `https://<dit-domæne>/wp-json/wp/v2/posts` i browseren, og tjek, at du får JSON tilbage. Notér URL'en til din WordPress uden `/` til sidst – den skal du bruge i appen.
  - Virker din egen WordPress ikke endnu, kan du bruge test-URL'en [`https://headless.cederdorff.dk`](https://headless.cederdorff.dk/wp-json/wp/v2/posts), mens du fejlfinder.
  - Får du en fejl, så tjek, at **Permalinks** under _Indstillinger_ ikke står til _Plain_.
  - Tjek også, at et sikkerhedsplugin ikke blokerer REST API'et.
- Sørg for, at du har en opdateret LTS-version af [Node.js](https://nodejs.org/) installeret.

<hr style="margin: 2rem 0;">

## Agenda

**Dagens arbejdsrytme:** Kort input → opret og forstå projektet → routing og layouts → hent posts fra WordPress → byg detaljeside → forside, About og fælles datalag. Vi skriver `fetch` direkte i hver side, så du kan se, hvad der sker, og samler koden i `lib/`, når du selv har mærket gentagelsen. Vi starter så simpelt som muligt og bygger ovenpå, når behovet opstår. CSS er ikke dagens fokus: Kopiér CSS-filerne fra referencerepoet, og brug de samme <code>className</code>s som i repoets komponenter, så du kan bruge tiden på Next.js.

<details style="margin-left: 1.5rem;">
<summary><strong>1. Fra React og Vite til Next.js</strong></summary>
<ul>
<li>Se de første ca. 2 minutter af <a href="https://www.youtube.com/watch?v=Sklc_fQBmcs">Next.js in 100 Seconds</a>. Læg mærke til forskellen på en <em>traditional React app</em> og en Next.js-app: Hvor bliver HTML'en lavet, hvad modtager browseren først, og hvilke ulemper og fordele nævnes?</li>
<li>Client-server-modellen: Browseren (client) sender en request, og serveren sender en response.</li>
<li>Indtil nu: I React og Vite var GitHub Pages en filserver, der sendte en tom <code>index.html</code> og JavaScript. Al React-koden kørte i browseren, som også hentede data fra Supabase.</li>
<li>Med Next.js kører React også på serveren: Serveren henter data fra et API og sender færdig HTML med indholdet. <code>npm run dev</code> starter derfor en rigtig server.</li>
<li>CSR og SSR: At <em>rendere</em> er at omsætte komponenter og data til HTML. Med <strong>Client-Side Rendering</strong> laves HTML'en i browseren med JavaScript, sådan som i Vite. Med <strong>Server-Side Rendering</strong> laves HTML'en på serveren, før den sendes, sådan som Next.js gør som udgangspunkt. Bagefter gør JavaScript siden interaktiv – det kaldes <em>hydration</em>.</li>
<li>Se forskellen selv: Åbn den samme Post App bygget med <a href="https://cederdorff.com/post-app-supabase/">React og Vite</a> og med <a href="https://nextjs-post-app-supabase.vercel.app/">Next.js</a>. Brug <em>Vis sidekilde</em> (<code>⌥⌘U</code>), og søg efter <em>Exploring the streets</em> med <code>⌘F</code>. Brug ikke <em>Elements</em> i DevTools – den viser DOM'en, efter JavaScript har kørt.</li>
<li>Er CSR et problem? Ikke altid. CSR fungerer fint bag login og i værktøjer, hvor brugeren bliver længe. Prisen er en tom side først, svagere SEO og link previews, et vandfald af requests og at alt ligger i browseren. Når indholdet er offentligt og skal vises hurtigt, giver det mening at rendere på serveren.</li>
<li>Hvad er Next.js? Et framework bygget oven på React. React er et <em>library</em>, du kalder, når du har brug for det. Et <em>framework</em> bestemmer strukturen og kalder din kode.</li>
<li>Inversion of control: I Vite starter du selv appen med <code>createRoot</code> og bestemmer, hvilken komponent der hører til hvilken URL. I Next.js er kontrollen vendt om: Du kalder aldrig <code>PostsPage()</code> selv – Next.js kalder den, når nogen besøger <code>/posts</code>. <em>"Don't call us, we'll call you."</em></li>
<li>Hvorfor Next.js, når vi allerede kan React? React løser UI'et. Routing, datahentning, hemmeligheder og første visning måtte du selv løse i Vite. Next.js giver routing, rendering på serveren, datahentning og build i én samlet løsning.</li>
<li>Sammenlign med det, du kender: Komponenter, props, state og hooks virker som før – men routing og datahentning ændrer sig.</li>
<li>Filbaseret routing: Mapper i <code>app/</code> bliver til routes, og <code>page.js</code> er siden.</li>
<li>Server components er standard. Kun komponenter med state, events eller browser-API'er skal have <code>"use client"</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Opret dit Next.js-projekt</strong></summary>
<ul>
<li>Opret en tom mappe til projektet, fx <code>nextjs-wordpress</code>, og åbn den i VS Code. Mappens navn bliver projektets navn, så brug små bogstaver og bindestreger – store bogstaver og mellemrum giver en fejl.</li>
<li>Opret projektet med én kommando i terminalen i VS Code, så alle får samme udgangspunkt. Punktummet betyder, at projektet oprettes i den mappe, du står i:
<pre><code class="language-bash">npx create-next-app@latest . --js --no-tailwind --eslint --app --no-src-dir --import-alias "@/*" --no-react-compiler --cache-components</code></pre>
</li>
<li>Flagene svarer på de spørgsmål, du ellers ville få: JavaScript i stedet for TypeScript, App Router, ESLint og ingen Tailwind CSS. I dag styler vi med almindelig CSS, så fokus er på Next.js. Tailwind CSS tilføjer vi næste gang, når vi bygger designsystemet.</li>
<li>Kør <code>npm run dev</code>, og åbn appen i browseren.</li>
<li>Gennemgå den genererede struktur: <code>app/layout.js</code>, <code>app/page.js</code>, <code>app/globals.css</code>, <code>app/page.module.css</code>, <code>public/</code>, <code>next.config.mjs</code>, <code>package.json</code> og <code>AGENTS.md</code>. Brug slidet om strukturen, og find svar på: Hvilken fil er forsiden? Hvor står <code>&lt;html&gt;</code> og <code>&lt;body&gt;</code>?</li>
<li>Ryd op i templaten: Fjern demoindhold, slet <code>app/page.module.css</code> og SVG-filerne i <code>public/</code>, og opdatér titel, beskrivelse og <code>lang</code> i <code>layout.js</code>, fx <code>lang="da"</code>, hvis dit indhold er på dansk. Kopiér <a href="https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/app/globals.css"><code>app/globals.css</code></a> fra referencerepoet – den indeholder også de globale klasser, du skal bruge senere.</li>
<li><code>create-next-app</code> har allerede oprettet et git-repository med et første commit. Commit din oprydning, og publicér repositoriet på GitHub med Source Control i VS Code (<em>Commit</em> og <em>Publish Branch</em>) eller GitHub Desktop (<em>Add Local Repository</em>, <em>Commit to main</em> og <em>Publish repository</em>). Efter hver opgave committer du og pusher med <em>Sync Changes</em> eller <em>Push origin</em>.</li>
<li>Tjek dit udgangspunkt mod de første commits i referencerepoet.</li>
<li><strong>Sidder du fast?</strong> Får du en fejl om <em>npm naming restrictions</em>, så omdøb mappen til små bogstaver og bindestreger, og kør kommandoen igen.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Routing og layouts</strong></summary>
<ul>
<li>I React Router skrev du selv, hvilken komponent der hører til hvilken URL. I Next.js er mappen URL'en, og filen hedder altid <code>page.js</code>. Kun en mappe i <code>app/</code> med en <code>page.js</code> bliver en route.</li>
<li>Opret routes til <code>/posts</code> og <code>/about</code> med <code>app/posts/page.js</code> og <code>app/about/page.js</code>. Giv også forsiden en kort intro i en <code>&lt;section className={styles.hero}&gt;</code>, og opret <code>app/page.module.css</code> igen.</li>
<li>Komponenter, der ikke selv er sider, lægger du i <code>components/</code> i roden – ved siden af <code>app/</code>. Lav <code>components/Header.js</code> med navigation, og brug <code>Link</code> fra <code>next/link</code> i stedet for <code>&lt;a&gt;</code>. Så skifter kun siden uden fuld reload, og i produktion hentes siden bag linket på forhånd. Lav også en <code>components/Footer.js</code>, fx med appens navn.</li>
<li>Brug <code>layout.js</code> til det, der går igen på alle sider: Vis <code>Header</code> og <code>Footer</code> rundt om <code>{children}</code>, som er den aktuelle side. Lad <code>metadata</code> og fonts fra <code>create-next-app</code> blive stående.</li>
<li>Tilføj en <code>not-found.js</code>, så ukendte routes får en forståelig side, og test den på fx <code>/findes-ikke</code>. Commit og push, når navigationen virker.</li>
<li><strong>CSS:</strong> <a href="https://github.com/cederdorff/nextjs-headless-wordpress/blob/89c1be4/app/page.js"><code>app/page.js</code></a> med <a href="https://github.com/cederdorff/nextjs-headless-wordpress/blob/89c1be4/app/page.module.css"><code>app/page.module.css</code></a> til forsidens intro. <a href="https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/Header.js"><code>components/Header.js</code></a> med <a href="https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/Header.module.css"><code>components/Header.module.css</code></a> og <a href="https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/Footer.module.css"><code>components/Footer.module.css</code></a>. En kopieret <code>.module.css</code> virker kun med de samme <code>className</code>s, så tag komponenten med fra repoet.</li>
<li><strong>Sidder du fast?</strong> Virker en route ikke, skal mappen hedde det samme som URL'en, og filen skal hedde <code>page.js</code>. Kan <code>Header</code> ikke findes, så tjek, at <code>components/</code> ligger i roden, og at importen er <code>@/components/Header</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. WordPress som headless CMS</strong></summary>
<ul>
<li>Indtil nu – WordPress med hoved: Den WordPress, du satte op på Simply.com, gør det hele. PHP henter indholdet i databasen, og temaet bygger HTML'en. Temaet er "hovedet", og indholdet er "kroppen".</li>
<li>Headless – WordPress uden hoved: Next.js er det nye hoved. Browseren spørger Next.js-serveren, og serveren henter indholdet som JSON fra WordPress' REST API – ligesom du hentede JSON fra Supabase' REST API i Product optimization. Redaktøren skriver stadig i admin, men du bestemmer hele brugeroplevelsen. Den samme krop kan også have flere hoveder, fx et website og en app.</li>
<li>Faktisk er din WordPress kun <em>nearly</em> headless – ligesom Næsten Hovedløse Nick: Temaet findes stadig på dit domæne, vi bruger det bare ikke.</li>
<li>Hvorfor headless? Det bedste fra to verdener. Redaktører uden kodeforståelse skriver, uploader og udgiver i et admin, de kender – uden at røre koden. Du som udvikler har frie tøjler til design, designsystem, routes, komponenter og struktur i Next.js – uden at være bundet af et tema eller WordPress' skabeloner. REST API'et er aftalen mellem de to. Prisen er to systemer at drive, og at redaktøren ikke selv kan ændre layoutet.</li>
<li>Undersøg REST API'et i browseren med <em>Pretty print</em> slået til – eller i Thunder Client i VS Code: <code>/wp-json/wp/v2/posts</code>, <code>/wp-json/wp/v2/posts?slug=...</code> og <code>/wp-json/wp/v2/pages?slug=about</code>. Svaret er altid et array – også når der kun er ét match, og et tomt array, når slug'en ikke findes.</li>
<li>Find de felter, du skal bruge: <code>id</code>, <code>slug</code>, <code>date</code>, <code>title.rendered</code>, <code>excerpt.rendered</code> og <code>content.rendered</code>.</li>
<li>Forstå datastrukturen, før du skriver kode: <code>[ ]</code> er et array, som du tilgår med et index eller <code>.map()</code>. <code>{ }</code> er et objekt, som du tilgår med <code>.navn</code>. Følg stien med punktum: <code>posts</code> → <code>posts[0]</code> → <code>posts[0].title</code> → <code>posts[0].title.rendered</code>. Skriver du <code>{post.title}</code>, får du fejlen <em>Objects are not valid as a React child</em>, fordi du stoppede ved objektet.</li>
<li>Læg mærke til, at <code>.rendered</code>-felterne indeholder HTML. Uddraget er pakket ind i <code>&lt;p&gt;</code>, og titler kan indeholde entities som <code>&amp;#8217;</code>. Viser du dem som almindelig tekst, kommer tags og koder med på dine cards.</li>
<li>Notér din WordPress-URL uden <code>/</code> til sidst. Den skal du bruge i næste punkt.</li>
<li><strong>Sidder du fast?</strong> Får du en fejl fra REST API'et, så tjek, at Permalinks under <em>Indstillinger</em> ikke står til <em>Plain</em>, og at et sikkerhedsplugin ikke blokerer REST API'et. Brug test-URL'en <code>https://headless.cederdorff.dk</code>, mens du fejlfinder.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Hent posts i en server component</strong></summary>
<ul>
<li>Dataflowet bag <code>/posts</code>: Browseren beder Next.js-serveren om siden. <code>page.js</code> kører på serveren, læser URL'en fra <code>.env.local</code> og henter posts fra WordPress som et JSON-array. <code>posts.map()</code> bygger HTML'en, som sendes til browseren. Både <code>fetch</code> og URL'en bliver på serveren.</li>
<li>Gem din WordPress-URL uden <code>/</code> til sidst i <code>.env.local</code> i projektets rod ved siden af <code>package.json</code>, fx <code>WORDPRESS_URL=https://dit-domæne.dk</code>, dokumentér variablen i <code>.env.example</code>, og genstart <code>npm run dev</code>. Git ignorerer alle <code>.env*</code>-filer – også <code>.env.example</code>. Tilføj derfor <code>!.env.example</code> under <code>.env*</code> i <code>.gitignore</code>, så eksempelfilen kommer med i dit commit, mens <code>.env.local</code> bliver lokalt. Står der <code>undefined</code> i URL'en, er variablen ikke fundet.</li>
<li>Variabler uden <code>NEXT_PUBLIC_</code> kan kun læses på serveren. Sammenlign med <code>VITE_</code>-variablerne fra Product optimization, som kunne læses i frontend.</li>
<li>Start simpelt: Gør <code>app/posts/page.js</code> <code>async</code>, hent posts med <code>fetch</code> direkte i komponenten – uden <code>useEffect</code> og <code>useState</code>. Log dem først med <code>console.log</code>: Outputtet står i terminalen, fordi koden kører på serveren. Vis derefter titlerne i en <code>&lt;ul&gt;</code>.</li>
<li>Brug stien fra punkt 4: <code>posts</code> er et array, så du bruger <code>.map()</code>, og titlen findes i <code>post.title.rendered</code>.</li>
<li>Byg videre: Lav en <code>PostCard</code>-komponent i <code>components/PostCard.js</code> med en <code>PostCard.module.css</code> ved siden af, og skift <code>&lt;li&gt;</code> ud med <code>&lt;PostCard key={post.id} post={post} /&gt;</code> i <code>posts.map()</code>. Vis posts som et grid af cards med titel, uddrag, dato og link til detaljesiden. Griddet styles med <code>styles.grid</code> fra <code>app/posts/page.module.css</code>. Vis en besked, hvis der ingen posts er. CSS'en til begge kan du kopiere fra referencerepoet.</li>
<li>Læg mærke til fejlen i terminalen om data, der hentes uden for <code>&lt;Suspense&gt;</code>. Det skyldes Cache Components: Siden venter på WordPress ved hver request, og Next.js vil vide, hvad brugeren skal se imens. Tilføj en <code>app/posts/loading.js</code> ved siden af siden. Den vises, mens data hentes – ligesom robuste UI-states i Case 1. Uden den fejler <code>npm run build</code>. Går buildet igennem, så commit og push.</li>
<li>Tommelfingerregel: <strong>Hver route, der henter data, får sin egen <code>loading.js</code>.</strong> En fælles <code>app/loading.js</code> er ikke nok. Når du navigerer fra fx <code>/posts</code> til <code>/about</code>, bliver header og footer i layoutet stående, og kun siden under layoutet skifter. Derfor skal loading-staten ligge i samme mappe som siden.</li>
<li><strong>CSS:</strong> <a href="https://github.com/cederdorff/nextjs-headless-wordpress/blob/88e6baee8faef5e90bb2a1c0718e381c48fc8a56/components/PostCard.js"><code>components/PostCard.js</code></a> med <a href="https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/components/PostCard.module.css"><code>components/PostCard.module.css</code></a> og <a href="https://github.com/cederdorff/nextjs-headless-wordpress/blob/88e6baee8faef5e90bb2a1c0718e381c48fc8a56/app/posts/page.module.css"><code>app/posts/page.module.css</code></a> til griddet.</li>
<li><strong>Sidder du fast?</strong> Står der <code>undefined</code> i URL'en, så tjek stavning og placering af <code>.env.local</code>, og genstart <code>npm run dev</code>. Er <code>posts</code> ikke et array, så log det – outputtet står i terminalen. Får du <em>Module not found</em>, så opret den <code>.module.css</code>, du importerer. Svarer din WordPress ikke, så brug test-URL'en.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Detaljeside med dynamisk route</strong></summary>
<ul>
<li>Opret <code>app/posts/[slug]/page.js</code>, og læs <code>slug</code> fra <code>params</code>. Husk, at <code>params</code> skal <code>await</code>'es.</li>
<li>Hent den enkelte post med <code>?slug=</code>. Svaret er altid et array, også når der kun er ét match. Brug derfor det første element, og kald <code>notFound()</code>, hvis arrayet er tomt.</li>
<li>Giv detaljesiden sin egen <code>app/posts/[slug]/loading.js</code>.</li>
<li>Vis titel, dato og <code>content.rendered</code> i en <code>&lt;div className="wp-content"&gt;</code>. Klassen fra <code>globals.css</code> styler HTML'en fra WordPress, så fx billeder ikke går ud over kanten. Tilføj et <code>Link</code> tilbage til <code>/posts</code>. Commit og push, når et klik på et card åbner detaljesiden, og <code>/posts/findes-ikke</code> viser din not-found-side.</li>
<li>WordPress returnerer indholdet som HTML. Vis det med <code>dangerouslySetInnerHTML</code>, og diskutér, hvorfor det kun er i orden, når du selv kontrollerer kilden.</li>
<li><strong>CSS:</strong> <a href="https://github.com/cederdorff/nextjs-headless-wordpress/blob/main/app/posts/%5Bslug%5D/page.module.css"><code>app/posts/[slug]/page.module.css</code></a>. <code>.wp-content</code> ligger allerede i <code>globals.css</code>.</li>
<li><strong>Sidder du fast?</strong> Er <code>slug</code> <code>undefined</code>, skal mappen hedde <code>[slug]</code> med firkantede parenteser, og <code>params</code> skal <code>await</code>'es. Får du 404, selvom posten findes, så log <code>slug</code> og URL'en, og sammenlign med din WordPress.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>7. Forside, About og et fælles datalag</strong></summary>
<ul>
<li>Vis de 3 seneste posts på forsiden. Skriv <code>fetch</code> direkte i <code>app/page.js</code> igen, og tilføj <code>?per_page=3</code> til URL'en.</li>
<li>Nu skal griddet bruges to steder. Flyt det til en <code>PostList</code>-komponent, så forsiden og <code>/posts</code> kan genbruge den. CSS'en flytter med: Omdøb <code>app/posts/page.module.css</code> til <code>components/PostList.module.css</code>.</li>
<li>Hent din <em>About</em>-page fra WordPress med <code>/pages?slug=about</code>, og vis den på <code>/about</code>. Det er samme mønster som detaljesiden: et array, det første element og <code>notFound()</code>.</li>
<li>Forsiden og About henter nu også data, så de skal have hver deres <code>loading.js</code>: <code>app/loading.js</code> og <code>app/about/loading.js</code>.</li>
<li>Nu henter fire sider data fra WordPress med den samme URL. Skal URL'en ændres, eller skal du tilføje <code>_embed</code>, retter du fire steder. Et fælles datalag samler det ét sted.</li>
<li>Nu henter du data fire steder. Flyt dine <code>fetch</code>-kald til funktioner i <code>lib/wordpress.js</code>: <code>getPosts()</code>, <code>getLatestPosts()</code>, <code>getPostBySlug(slug)</code> og <code>getPageBySlug(slug)</code>. Koden er den samme – den har bare fået et navn og et nyt sted. Gem starten af URL'en i en variabel øverst i filen, fx <code>const API_URL = `${process.env.WORDPRESS_URL}/wp-json/wp/v2`;</code>, så hvert <code>fetch</code> bliver kort. <code>getPostBySlug(slug)</code> og <code>getPageBySlug(slug)</code> returnerer det første element i arrayet, og siden kalder stadig selv <code>notFound()</code>, hvis der ikke kom noget tilbage.</li>
<li>Datoen formaterer du både på dine cards og på detaljesiden. Flyt <code>toLocaleDateString</code> til en <code>formatDate()</code>-funktion i <code>lib/format.js</code>, så datoen ser ens ud overalt.</li>
<li><strong>CSS:</strong> <a href="https://github.com/cederdorff/nextjs-headless-wordpress/blob/15e6817b4edd1177205001de40bd33b5e10d67e7/app/page.js"><code>app/page.js</code></a> med <a href="https://github.com/cederdorff/nextjs-headless-wordpress/blob/15e6817b4edd1177205001de40bd33b5e10d67e7/app/page.module.css"><code>app/page.module.css</code></a> til forsiden.</li>
<li><strong>Sidder du fast?</strong> Ser alt ens ud efter flytningen, er det meningen – datalaget ændrer ikke det, brugeren ser. Test alle fire sider efter hver flytning. Får du en fejl om import, så tjek, at funktionerne er <code>export</code>'et, og at importen er <code>@/lib/wordpress</code>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>8. Arbejd videre</strong></summary>
<ul>
<li>Uden <code>?_embed</code> får du kun id'er som <code>"featured_media": 8</code>. Med <code>?_embed</code> følger billede og kategorier med i <code>_embedded</code>. Følg stien som i punkt 4: <code>post._embedded["wp:featuredmedia"][0].source_url</code>. Brug <code>?.</code> hele vejen, så en post uden billede ikke giver en fejl.</li>
<li>Tilføj <code>_embed</code> til URL'erne i <code>lib/wordpress.js</code> – nu skal du kun rette ét sted. Kun den første parameter får <code>?</code>, resten får <code>&amp;</code>, fx <code>?per_page=3&amp;_embed</code>. Vis fremhævede billeder og kategorier på dine cards. Vis også det fremhævede billede på detaljesiden og About med <code>className="featured-image"</code> fra <code>globals.css</code>. Du finder dem under <code>post._embedded</code> i JSON'en – kig efter dem i browseren først. Brug et almindeligt <code>&lt;img&gt;</code> i dag. Vil du bruge <code>next/image</code>, skal dit WordPress-domæne først tilføjes under <code>images.remotePatterns</code> i <code>next.config.mjs</code>.</li>
<li>Tjek <code>response.ok</code> i funktionerne i <code>lib/wordpress.js</code>, og kast en fejl, hvis WordPress ikke svarer med en status i 200-serien. Tilføj en <code>app/error.js</code>, der viser en fejlbesked og en knap, der kalder <code>retry()</code>.</li>
<li>Sammenlign din løsning med referencerepoet, hvis du sidder fast. Commits følger trinene i opgaverne.</li>
<li>Commit og push dit arbejde. Du skal bruge appen næste gang.</li>
<li><strong>Sidder du fast?</strong> Intet billede? Tjek, at posten har et fremhævet billede i WordPress, og at <code>_embed</code> står i URL'en. Viser forsiden pludselig 10 posts, står der <code>?_embed</code> i stedet for <code>&amp;_embed</code> efter <code>?per_page=3</code>. Får du <em>Cannot read properties of undefined</em>, så brug <code>?.</code> hele vejen ned ad stien.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:**
  - [Next.js og headless WordPress](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/)
  - [PDF-version: Next.js og headless WordPress](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/?print-pdf)
- **Opgaver:**
  - [Opgaver med ekstra hjælp og løsninger](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-2026-10-26-nextjs-og-headless-wordpress.md) – samme opgaver som i slides, med forklaringer, fejlfinding og den fulde løsning
  - [Produktionsdag 28. oktober](https://github.com/cederdorff/mdu-e25ixd/blob/main/undervisning/dynamic-user-interface/opgave-produktionsdag-2026-10-28-nextjs-og-headless-wordpress.md)
  - [Opgaveoversigt](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/opgaver)
  - [Opgave 1 · Opret dit Next.js-projekt](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/opgave-1)
  - [Opgave 2 · Routes, layout og navigation](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/opgave-2)
  - [Opgave 3 · Undersøg dit eget REST API](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/opgave-3)
  - [Opgave 4 · Hent og vis dine posts](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/opgave-4)
  - [Opgave 5 · Byg detaljesiden](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/opgave-5)
  - [Opgave 6 · Forside, About og et fælles datalag](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/opgave-6)
  - [Opgave 7 · Billeder, kategorier og fejlhåndtering](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-01/#/opgave-7)
- **Referencerepo:** [nextjs-headless-wordpress](https://github.com/cederdorff/nextjs-headless-wordpress) – commits følger trinene i opgaverne
- **Next.js:**
  - [Next.js in 100 Seconds](https://www.youtube.com/watch?v=Sklc_fQBmcs) (Fireship) – de første ca. 2 minutter. Resten af videoen bruger den ældre Pages Router.
  - [Learn Next.js på Scrimba](https://scrimba.com/learn-nextjs-c02moisq6a) (gratis kursus) – første del: _Build a Next.js App_
  - [Installation](https://nextjs.org/docs/app/getting-started/installation)
  - [Project structure](https://nextjs.org/docs/app/getting-started/project-structure)
  - [Layouts and pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
  - [Server and client components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
  - [Fetching data](https://nextjs.org/docs/app/getting-started/fetching-data)
  - [Inversion of Control](https://martinfowler.com/bliki/InversionOfControl.html) (Martin Fowler)
- **WordPress:**
  - [REST API Handbook](https://developer.wordpress.org/rest-api/)
  - [Reference: Posts](https://developer.wordpress.org/rest-api/reference/posts/)
  - [Reference: Pages](https://developer.wordpress.org/rest-api/reference/pages/)
