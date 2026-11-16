# RACE - Dynamic User Interface: Faciliteret vejledning – Samarbejde og deployment - 16-11-2026

## Formål

I dag er der faciliteret vejledning. Det er frivilligt at møde op, og I bruger dagen på jeres projekt. Jeg er tilgængelig fra kl. 8.15 i lokale 4.05.

Dagen starter med et kort oplæg om, hvordan I samarbejder i gruppen og deployer jeres Next.js-app til Vercel. Kort sagt: Arbejd samtidig – uden at ødelægge live-sitet. Målet: intet når `main` uden en pull request, og hvert nyt commit på `main` går live på Vercel. Derefter er der vejledning i grupperne.

<hr style="margin: 2rem 0;">

## Forberedelse

- Arbejd videre med jeres projekt.
- Tag jeres spørgsmål med – både til kode, design og opsætning.
- Aftal, hvem i gruppen der er **tovholder** og laver opsætningen af repo og Vercel. Tovholderen skal have en Vercel-konto, oprettet med *Continue with GitHub*, så Vercel kan se gruppens repo.
- Sørg for, at alle har en GitHub-konto og GitHub Desktop eller VS Code installeret.

<hr style="margin: 2rem 0;">

## Agenda

### Del 1 · Oplæg

<details style="margin-left: 1.5rem;">
<summary><strong>1. Vercel, flowet – og hvorfor I bruger branches og pull requests</strong></summary>
<ul>
<li><strong>Hvad er Vercel?</strong> En hosting-platform, der bygger jeres Next.js-app og lægger den online – automatisk, hver gang <code>main</code> ændrer sig. Lavet af firmaet bag Next.js. I kender GitHub Pages fra Product Optimization: Vercel gør det samme for Next.js – uden workflow-fil. Pages kan kun vise statiske filer, men Next.js kører også kode på serveren. Hobby-planen er gratis og nok til jeres projekt – med et public repo.</li>
<li><strong>Målet: intet når <code>main</code> uden en pull request.</strong> Branch fra nyeste <code>main</code> → små commits → pull request → merge til <code>main</code> → Vercel deployer automatisk.</li>
<li>Vercel deployer, hver gang <code>main</code> får et nyt commit. I jeres flow sker det, når I merger en pull request.</li>
<li><strong>Hvorfor? Arbejd samtidig – uden at ødelægge live-sitet.</strong> Branches = I kan arbejde samtidig. Pull requests = kun det, der er klar, kommer ind i <code>main</code> – og går live.
<ul>
<li><em>Samarbejde:</em> Pusher alle direkte til <code>main</code>, giver to i samme fil konflikter direkte på <code>main</code>. Med branches arbejder I hver i jeres egen branch og løser konflikter dér.</li>
<li><em>Kvalitet:</em> Uden pull requests er der ingen styr på <code>main</code> – alt går direkte live. Med pull requests kommer kun det ind, der er set i en PR.</li>
<li><em>Overblik:</em> <code>fix</code>, <code>update</code>, <code>asdf</code> fortæller ingenting. Pull requesten forklarer hvad og hvorfor.</li>
</ul>
</li>
<li><strong>Én opgave = én kort branch</strong>, fx <code>feature/login-form</code>, <code>fix/navbar-mobile</code> eller <code>feature/post-list</code> – ikke <code>feature/alt-det-nye</code>. Jo kortere tid en branch lever, jo mindre når <code>main</code> at ændre sig, og jo færre konflikter får I. Kan I ikke navngive branchen kort, er den for stor.</li>
<li><strong>Én commit fortæller én ting.</strong> Commit, hver gang et lille stykke virker, og skriv en kort besked, som en anden forstår, fx <em>Add login form</em> eller <em>Validate email field</em> – ikke <em>update</em> eller <em>fix</em>. Så kan I se, hvad der er ændret, finde den commit, der ødelagde noget, og fortryde lige præcis den.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Opsætning – én sætter op, resten kloner</strong></summary>
<ul>
<li><strong>Tovholderen</strong> er den ene i gruppen, der ejer repoet på GitHub og projektet på Vercel.</li>
<li><strong>Repoet skal være public</strong>, så RACE og censor kan se koden. Det løser også Vercel: Hobby-planen blokerer deploys på private repos, når den, der har lavet commit'et, ikke ejer Vercel-projektet. Public betyder, at alle kan <em>se</em> koden – kun collaborators kan ændre den. Nøgler hører derfor aldrig hjemme i koden.</li>
<li><strong>Trin 1 · Start projektet</strong> på en af to måder:
<ul>
<li><em>Fra template:</em> Tryk <em>Use this template → Create a new repository</em> på et af RACE's Next.js-repos, fx <a href="https://github.com/cederdorff/nextjs-supabase-posts">nextjs-supabase-posts</a>, <a href="https://github.com/cederdorff/nextjs-supabase-auth">nextjs-supabase-auth</a> eller <a href="https://github.com/cederdorff/nextjs-headless-wordpress">nextjs-headless-wordpress</a>. Vælg <em>Public</em>, og klon repoet med <em>Code → Open with GitHub Desktop</em> eller i VS Code.</li>
<li><em>Fra bunden:</em> Opret en tom mappe, åbn den i VS Code, og kør:
<pre><code class="language-bash">npx create-next-app@latest . --js --no-tailwind --eslint --app --no-src-dir --import-alias "@/*" --no-react-compiler --cache-components</code></pre>
Publicér derefter med <em>Publish Branch → Publish to GitHub public repository</em> i Source Control eller <em>File → Add Local Repository… → Publish repository</em> i GitHub Desktop (fjern fluebenet ved <em>Keep this code private</em>).</li>
</ul>
</li>
<li><strong>Trin 2 · GitHub:</strong> Inviter gruppen under <em>Settings → Collaborators → Add people</em>. Slå <em>Automatically delete head branches</em> til under <em>Settings → General → Pull Requests</em>.</li>
<li><strong>Trin 3 · Vercel:</strong> Log ind på vercel.com med <em>Continue with GitHub</em>, og importér repoet (<em>Add New… → Project → Import</em>). Next.js og <code>main</code> vælges af sig selv. Læg environment variables ind allerede i import-skærmen – indsæt indholdet af <code>.env.local</code> eller tryk <em>Import .env</em> – før I trykker <em>Deploy</em>.</li>
<li><strong>Jeres live-site:</strong> Del URL'en under <em>Domains</em> på projektets forside (fx <code>jeres-app.vercel.app</code>) med gruppen og RACE. Den viser altid den nyeste <code>main</code>. Brug ikke den lange URL under <em>Deployment</em> – den peger kun på én bestemt version.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. De andre i gruppen – klar på fire trin</strong></summary>
<ol>
<li>Acceptér invitationen (på mail eller under notifikationer på GitHub).</li>
<li>Klon repoet med <em>Code → Open with GitHub Desktop</em> eller i VS Code.</li>
<li>Opret jeres egen <code>.env.local</code>. Nøglerne får I fra tovholderen uden om Git. <code>.env.local</code> står i <code>.gitignore</code> og bliver aldrig committet. Kan I se den under <em>Changes</em>? Så stop, og spørg.</li>
<li>Kør <code>npm install</code> i terminalen i VS Code – og derefter <code>npm run dev</code>.</li>
</ol>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Dagligt workflow – seks trin, hver gang</strong></summary>
<p>Samme trin i GitHub Desktop og Source Control i VS Code – bare forskellige knapper.</p>
<table>
<thead><tr><th>Trin</th><th>GitHub Desktop</th><th>VS Code · Source Control</th></tr></thead>
<tbody>
<tr><td>1. Hent nyeste <code>main</code></td><td><em>Current branch → main → Fetch origin → Pull origin</em></td><td>Klik på branch-navnet nederst til venstre → <em>main</em> → <em>… → Pull</em></td></tr>
<tr><td>2. Lav en branch</td><td><em>Branch → New branch…</em>, fx <code>feature/login-form</code> → <em>Publish branch</em></td><td>Klik på branch-navnet → <em>Create new branch…</em> → <em>Publish Branch</em></td></tr>
<tr><td>3. Commit og push i små skridt</td><td>Skriv en kort besked → <em>Commit to feature/…</em> → <em>Push origin</em></td><td>Skriv en kort besked → <em>Commit</em> → <em>Sync Changes</em></td></tr>
<tr><td>4. Opret pull request</td><td><em>Create Pull Request</em> – vises, når branchen er pushet (eller <em>Branch → Create pull request</em>). Åbner GitHub i browseren.</td><td>Gå til repoet på GitHub → <em>Compare &amp; pull request</em></td></tr>
<tr><td>5. Merge</td><td colspan="2">Ens for begge, på GitHub: <em>Files changed → Conversation → Merge pull request → Confirm merge</em>. Vercel deployer <code>main</code>.</td></tr>
<tr><td>6. Efter merge</td><td>Skift til <em>main</em> → <em>Pull origin</em></td><td>Skift til <em>main</em> → <em>… → Pull</em></td></tr>
</tbody>
</table>
<p>Én opgave pr. branch. Næste opgave starter forfra ved trin 1 – i en ny branch fra den opdaterede <code>main</code>. Bagefter viser decket alle seks trin samlet i GitHub Desktop og VS Code.</p>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Lad en anden merge – og fra merge til live</strong></summary>
<ul>
<li><strong>Best practice – et råd, ikke et krav:</strong> Lad en anden i gruppen kigge pull requesten igennem og merge den: Er tjekkene grønne (<em>All checks have passed</em> – Vercel har bygget branchen – og <em>No conflicts with base branch</em>)? Læs beskrivelsen, kig under <em>Files changed</em>, og skriv en kommentar. Vercel-botten kommenterer af sig selv på pull requesten – I behøver ikke gøre noget. Så har to set koden, før den går live.</li>
<li><strong>Fra merge til live:</strong> Vercel deployer, hver gang <code>main</code> får et nyt commit – også ved et direkte push, og derfor holder I <code>main</code> ren. Vercel siger det selv: <em>“To update your Production Deployment, push to the main branch.”</em> Vercel bygger appen med <code>npm install</code> og <code>npm run build</code> med de environment variables, I har kopieret ind på Vercel (<code>.env.local</code> uploades aldrig), og deployer. Lykkes buildet, er den nye version live. Fejler det, er den gamle version stadig live – læs build-loggen, ret i en ny branch, og merge igen.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>6. Seks vaner, der sparer jer for bøvl</strong></summary>
<ol>
<li><strong>Aftal, hvem der laver hvad.</strong> To, der retter i den samme fil samtidig, giver konflikter.</li>
<li><strong>Hent <code>main</code> ofte.</strong> Før ny branch: skift til <em>main</em> → <em>Pull</em>. Midt i en branch: <em>Branch → Update from main</em>. Pull på en feature-branch henter kun den branch – ikke <code>main</code>.</li>
<li><strong>Navngiv branchen efter opgaven</strong>, fx <code>feature/login-form</code> eller <code>fix/navbar-mobile</code>.</li>
<li><strong>Kør <code>npm run build</code> før pull request.</strong> Det er den samme build, Vercel kører – så fanges fejlen hos jer.</li>
<li><strong>Skriv hvad og hvorfor</strong> i pull requesten – gerne med et skærmbillede.</li>
<li><strong>Hold nøgler ude af Git.</strong> Repoet er public – nøglerne bor i <code>.env.local</code> og på Vercel.</li>
</ol>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>7. Når det driller</strong></summary>
<ul>
<li><strong>Branchen er bagud, eller pull requesten melder konflikt:</strong> <ol><li><em>Hent <code>main</code> ind:</em> <em>Branch → Update from main</em> i GitHub Desktop. I VS Code: <em>⋯ → Pull, Push → Fetch</em> og derefter <em>⋯ → Branch → Merge… → origin/main</em>.</li><li><em>Løs konflikten:</em> GitHub Desktop viser en dialog – vælg <em>Open in Visual Studio Code</em>, løs konflikten, og tryk <em>Continue merge</em> → <em>Push origin</em>. I VS Code: <em>Resolve in Merge Editor → Complete Merge → Sync Changes</em>.</li></ol>Pull requesten opdaterer sig selv.</li>
<li><strong>Deploy fejler:</strong> Læs build-loggen på Vercel, og kør <code>npm run build</code> lokalt.</li>
<li><strong>Login sender jer til <code>localhost</code>:</strong> Tilføj Vercel-URL'en under <em>Supabase → Authentication → URL Configuration</em>.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>8. Gør det så godt, som I kan</strong></summary>
<ul>
<li>Det her er anbefalinger – jeg forventer ikke, at I er verdensmestre i Git.</li>
<li><strong>Skal:</strong> Public repo på GitHub, appen er deployet på Vercel, og <code>main</code> virker.</li>
<li><strong>Anbefalet:</strong> Branches og pull requests, små branches og små commits, de seks gode vaner.</li>
<li><strong>Ekstra godt:</strong> En anden kigger med og merger, og gode beskrivelser i pull requests.</li>
<li>Går noget galt, kan det næsten altid fixes – spørg hellere én gang for meget.</li>
</ul>
</details>

### Del 2 · Vejledning og projektarbejde

<details style="margin-left: 1.5rem;">
<summary><strong>9. Prøv selv i dag – én ændring hele vejen til live</strong></summary>
<ol>
<li><strong>Tovholder:</strong> Opsætning – public repo, gruppen inviteret, Vercel forbundet.</li>
<li><strong>Alle:</strong> Klon og kør – <code>npm install</code>, <code>.env.local</code> og <code>npm run dev</code>.</li>
<li><strong>Én i gruppen:</strong> Første pull request – en lille ændring i en branch, fx en overskrift.</li>
<li><strong>Gerne en anden:</strong> Merge, og find ændringen på produktions-URL'en.</li>
</ol>
<p><strong>I er klar, når:</strong> Alle kan køre appen lokalt, én pull request er merget, og ændringen kan ses live. Derefter arbejder I videre med projektet – med vejledning i grupperne undervejs.</p>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Slides:**
  - [Samarbejde og deployment](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-07/)
  - [PDF-version: Samarbejde og deployment](https://cederdorff.com/mdu-e25ixd/slides/dynamic-user-interface-07/?print-pdf)
- **Next.js-templates:** [nextjs-supabase-posts](https://github.com/cederdorff/nextjs-supabase-posts) · [nextjs-supabase-auth](https://github.com/cederdorff/nextjs-supabase-auth) · [nextjs-headless-wordpress](https://github.com/cederdorff/nextjs-headless-wordpress)
- **Git og GitHub:**
  - [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
  - [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
  - [Source Control i VS Code](https://code.visualstudio.com/docs/sourcecontrol/overview)
  - [GitHub Desktop](https://docs.github.com/en/desktop)
  - [Creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
  - [GitHub Desktop: Syncing your branch](https://docs.github.com/en/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/syncing-your-branch-in-github-desktop)
  - [VS Code: Merge conflicts](https://code.visualstudio.com/docs/sourcecontrol/merge-conflicts)
  - [Inviting collaborators](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository)
  - [Automatic deletion of branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-the-automatic-deletion-of-branches)
  - [Pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)
- **Deployment:**
  - [Vercel: Getting started](https://vercel.com/docs/getting-started-with-vercel) · [Hobby-planen](https://vercel.com/docs/plans/hobby)
  - [Next.js: Deploying](https://nextjs.org/docs/app/getting-started/deploying)
  - [Vercel: Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
  - [Vercel: Environment variables](https://vercel.com/docs/environment-variables)
  - [Vercel: Builds](https://vercel.com/docs/deployments/builds) · [Troubleshoot a build](https://vercel.com/docs/deployments/troubleshoot-a-build)
  - [Vercel: Troubleshoot project collaboration](https://vercel.com/docs/deployments/troubleshoot-project-collaboration) – Hobby-planen og private repositories
  - [Supabase: Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls)
- **Next.js:**
  - [Environment variables](https://nextjs.org/docs/app/guides/environment-variables)
