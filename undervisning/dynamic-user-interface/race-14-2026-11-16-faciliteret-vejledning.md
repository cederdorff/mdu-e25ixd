# RACE - Dynamic User Interface: Faciliteret vejledning – Samarbejde og deployment - 16-11-2026

## Formål

I dag er der faciliteret vejledning. Det er frivilligt at møde op, og I bruger dagen på jeres projekt. Jeg er tilgængelig fra kl. 8.15 i lokale 4.05.

Dagen starter med et kort oplæg om, hvordan I samarbejder i gruppen og deployer jeres Next.js-app til Vercel. Reglen er enkel: `main` virker altid. Alt nyt bygges i en kort branch og kommer ind i `main` via en pull request. Derefter er der vejledning i grupperne.

<hr style="margin: 2rem 0;">

## Forberedelse

- Arbejd videre med jeres projekt.
- Tag jeres spørgsmål med – både til kode, design og opsætning.
- Aftal, hvem i gruppen der er **tovholder** og laver opsætningen af repo og Vercel.
- Sørg for, at alle har en GitHub-konto og GitHub Desktop eller VS Code installeret.

<hr style="margin: 2rem 0;">

## Agenda

### Del 1 · Oplæg

<details style="margin-left: 1.5rem;">
<summary><strong>1. Reglen og flowet (GitHub Flow)</strong></summary>
<ul>
<li><code>main</code> virker altid. Alt nyt bygges i en kort branch og kommer ind i <code>main</code> via en pull request.</li>
<li>Vercel deployer automatisk: Hvert nyt commit på <code>main</code> går direkte i produktion – i jeres flow sker det, når I merger en pull request.</li>
<li><strong>Kort sagt: Arbejd samtidig – uden at ødelægge live-sitet.</strong> Branches = I kan arbejde samtidig. Pull requests = kun det, der er klar, kommer ind i <code>main</code> – og går live.</li>
<li>Hvorfor? Når fire personer pusher direkte til <code>main</code>, får I konflikter, en app der pludselig ikke bygger, og ingen ved, hvem der ændrede hvad. Med pull requests får I et fast sted at tale om koden og fanger fejl, før de rammer live-sitet. <code>main</code> er det, der er live – og det, I viser til eksamen. Sådan arbejder stort set alle udviklingsteams – også i praktikken.</li>
<li><strong>Hold branches små:</strong> Én opgave = én kort branch, fx <code>feature/login-form</code> – ikke <code>feature/alt-det-nye</code>. Jo kortere tid en branch lever, jo mindre når <code>main</code> at ændre sig, og jo færre konflikter får I. Små pull requests er også lettere at forstå for resten af gruppen. Kan I ikke navngive branchen kort, er den for stor.</li>
<li><strong>Commit i små skridt:</strong> Commit, hver gang et lille stykke virker, og skriv en kort besked, som en anden forstår, fx <em>Add login form</em> eller <em>Validate email field</em> – ikke <em>update</em> eller <em>fix</em>. Så kan I se præcis, hvad der er ændret, finde den commit, der ødelagde noget, og fortryde lige præcis den.</li>
<li>Flowet: Branch fra nyeste <code>main</code> → commit + push i små skridt (kør <code>npm run build</code> først) → pull request → klar? Nej: ret videre i branchen. Ja: merge → <code>main</code> → Vercel deployer automatisk til produktion.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Opsætning – tovholderen gør det én gang</strong></summary>
<ul>
<li><strong>Repoet skal være public</strong>, så RACE og censor kan se koden. Det løser også Vercel: Hobby-planen blokerer deploys på private repos, når den, der har lavet commit'et, ikke ejer Vercel-projektet. Public betyder, at alle kan <em>se</em> koden – kun collaborators kan ændre den. Nøgler hører derfor aldrig hjemme i koden.</li>
<li><strong>Trin 1 · Start projektet</strong> på en af to måder:
<ul>
<li><em>Fra template:</em> Tryk <em>Use this template → Create a new repository</em> på et af RACE's Next.js-repos, fx <a href="https://github.com/cederdorff/nextjs-supabase-posts">nextjs-supabase-posts</a>, <a href="https://github.com/cederdorff/nextjs-supabase-auth">nextjs-supabase-auth</a> eller <a href="https://github.com/cederdorff/nextjs-headless-wordpress">nextjs-headless-wordpress</a>. Vælg <em>Public</em>, og klon repoet med <em>Code → Open with GitHub Desktop</em> eller i VS Code.</li>
<li><em>Fra bunden:</em> Opret en tom mappe, åbn den i VS Code, og kør:
<pre><code class="language-bash">npx create-next-app@latest . --js --no-tailwind --eslint --app --no-src-dir --import-alias "@/*" --no-react-compiler --cache-components</code></pre>
Publicér derefter med <em>Publish Branch</em> i Source Control eller <em>Publish repository</em> i GitHub Desktop (fjern fluebenet i <em>Keep this code private</em>). Vælg public.</li>
</ul>
</li>
<li><strong>Trin 2 · GitHub:</strong> Inviter gruppen under <em>Settings → Collaborators → Add people</em>. Slå <em>Automatically delete head branches</em> til under <em>Settings → General → Pull Requests</em>.</li>
<li><strong>Trin 3 · Vercel:</strong> Importér repoet på vercel.com (<em>Add New… → Project → Import</em>). Production branch er <code>main</code>. Læg environment variables ind allerede i import-skærmen – indsæt indholdet af <code>.env.local</code> eller tryk <em>Import .env</em> – før I trykker <em>Deploy</em>. Del URL'en under <em>Domains</em> på projektets forside (fx <code>jeres-app.vercel.app</code>) med gruppen og RACE – ikke den lange URL under <em>Deployment</em>, som kun peger på én bestemt version. Den opdateres, hver gang I merger til <code>main</code>.</li>
<li><strong>Fra merge til live:</strong> Vercel deployer, hver gang <code>main</code> får et nyt commit. I jeres flow sker det, når I merger en pull request – men et direkte push til <code>main</code> bliver også deployet, og derfor holder I <code>main</code> ren. Vercel henter koden, kører <code>npm install</code> og <code>npm run build</code> med de environment variables, der ligger på Vercel (ikke dem fra <code>.env.local</code>), og deployer. Lykkes buildet, er den nye version live. Fejler det, er den gamle version stadig live – læs build-loggen, ret i en ny branch, og merge igen.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. De andre i gruppen</strong></summary>
<ul>
<li>Acceptér invitationen (på mail eller under notifikationer på GitHub).</li>
<li>Klon repoet med <em>Code → Open with GitHub Desktop</em> eller i VS Code.</li>
<li>Kør <code>npm install</code> i terminalen i VS Code – og derefter <code>npm run dev</code>.</li>
<li>Opret jeres egen <code>.env.local</code>. Nøglerne får I fra tovholderen uden om Git. <code>.env.local</code> står i <code>.gitignore</code> og bliver aldrig committet.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>4. Dagligt workflow – seks trin</strong></summary>
<p>Samme trin i GitHub Desktop og Source Control i VS Code – bare forskellige knapper.</p>
<table>
<thead><tr><th>Trin</th><th>GitHub Desktop</th><th>VS Code · Source Control</th></tr></thead>
<tbody>
<tr><td>1. Hent nyeste <code>main</code></td><td><em>Current branch → main → Fetch origin → Pull origin</em></td><td>Klik på branch-navnet nederst til venstre → <em>main</em> → <em>… → Pull</em></td></tr>
<tr><td>2. Lav en branch</td><td><em>Branch → New branch…</em>, fx <code>feature/login-form</code> → <em>Publish branch</em></td><td>Klik på branch-navnet → <em>Create new branch…</em> → <em>Publish Branch</em></td></tr>
<tr><td>3. Commit og push i små skridt</td><td>Skriv en kort besked nederst til venstre → <em>Commit to …</em> → <em>Push origin</em></td><td>Skriv en besked i feltet → <em>Commit</em> → <em>Sync Changes</em></td></tr>
<tr><td>4. Opret pull request</td><td><em>Branch → Create pull request</em> (åbner GitHub i browseren)</td><td>Gå til repoet på GitHub → <em>Compare &amp; pull request</em></td></tr>
<tr><td>5. Merge</td><td colspan="2">Ens for begge, på GitHub: Kig ændringerne igennem under <em>Files changed</em>, og tryk <em>Merge pull request</em></td></tr>
<tr><td>6. Efter merge</td><td>Skift til <em>main</em> → <em>Pull origin</em></td><td>Skift til <em>main</em> → <em>Sync Changes</em></td></tr>
</tbody>
</table>
<p><strong>Best practice – et råd, ikke et krav:</strong> Lad en anden i gruppen kigge pull requesten igennem og merge den. Så har to set koden, før den går live.</p>
<p><strong>Seks gode vaner, der sparer jer for bøvl:</strong></p>
<ol>
<li><strong>Aftal, hvem der laver hvad.</strong> To, der retter i den samme fil samtidig, giver konflikter.</li>
<li><strong>Hent <code>main</code> ofte</strong> – hver morgen og før hver ny branch. Så bygger I på det nyeste.</li>
<li><strong>Navngiv branchen efter opgaven</strong>, fx <code>feature/login-form</code> eller <code>fix/navbar-mobile</code>.</li>
<li><strong>Kør <code>npm run build</code> før pull request.</strong> Det er den samme build, Vercel kører – så fanges fejlen hos jer.</li>
<li><strong>Skriv hvad og hvorfor</strong> i pull requesten – gerne med et skærmbillede.</li>
<li><strong>Hold nøgler ude af Git.</strong> Repoet er public – nøglerne bor i <code>.env.local</code> og på Vercel.</li>
</ol>
<p><strong>Gør det så godt, som I kan.</strong> Det her er anbefalinger – jeg forventer ikke, at I er verdensmestre i Git. Det, der <em>skal</em> være på plads, er et public repo, en app deployet på Vercel og en <code>main</code>, der virker. Branches, pull requests, små commits og de gode vaner prøver I at følge. Går noget galt, kan det næsten altid fixes – spørg hellere én gang for meget.</p>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>5. Når det driller</strong></summary>
<ul>
<li><strong>Branchen er bagud, eller pull requesten melder konflikt:</strong> Tryk <em>Update branch</em> på pull requesten på GitHub, eller vælg <em>Branch → Update from main</em> i GitHub Desktop. Løs konflikter i VS Code's merge editor.</li>
<li><strong>Deploy fejler:</strong> Læs build-loggen på Vercel, og kør <code>npm run build</code> lokalt.</li>
<li><strong>En fejl er kommet live:</strong> Buildet lykkedes, men koden har en fejl. Brug <em>Instant Rollback</em> på projektets forside på Vercel, og ret fejlen i en ny branch.</li>
<li><strong>Login sender jer til <code>localhost</code>:</strong> Tilføj Vercel-URL'en under <em>Supabase → Authentication → URL Configuration</em>.</li>
</ul>
</details>

### Del 2 · Vejledning og projektarbejde

<details style="margin-left: 1.5rem;">
<summary><strong>4. Vejledning og projektarbejde</strong></summary>
<ul>
<li>Arbejd videre, der hvor I er i jeres projekt.</li>
<li>Prøv selv i dag: Opsætning, første pull request, merge – og se ændringen live.</li>
<li>Vejledning i grupperne undervejs.</li>
</ul>
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
  - [Keeping your pull request in sync with the base branch](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/keeping-your-pull-request-in-sync-with-the-base-branch)
  - [VS Code: Merge conflicts](https://code.visualstudio.com/docs/sourcecontrol/merge-conflicts)
- **Deployment:**
  - [Next.js: Deploying](https://nextjs.org/docs/app/getting-started/deploying)
  - [Vercel: Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
  - [Vercel: Environment variables](https://vercel.com/docs/environment-variables)
  - [Vercel: Troubleshoot project collaboration](https://vercel.com/docs/deployments/troubleshoot-project-collaboration) – Hobby-planen og private repositories
  - [Supabase: Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls)
- **Next.js:**
  - [Environment variables](https://nextjs.org/docs/app/guides/environment-variables)
