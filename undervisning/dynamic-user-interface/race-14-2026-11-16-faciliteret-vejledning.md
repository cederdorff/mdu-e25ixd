# NKKR/RACE - Dynamic User Interface: Faciliteret vejledning - 16-11-2026

## Formål

I dag er der faciliteret vejledning. Det er frivilligt at møde op, og I bruger dagen på jeres projekt. Jeg er tilgængelig fra kl. 8.15 i lokale 4.05.

Dagen starter med et kort oplæg om tre ting, der gør resten af projektet nemmere: Hvordan I sætter projektet rigtigt op, hvordan I samarbejder i gruppen med branches og pull requests, og hvordan I deployer jeres Next.js-app til fx Vercel. Derefter er der vejledning i grupperne.

<hr style="margin: 2rem 0;">

## Forberedelse

- Arbejd videre med jeres projekt.
- Tag jeres spørgsmål med – både til kode, design og opsætning.
- Sørg for, at alle i gruppen har adgang til gruppens repository på GitHub.

<hr style="margin: 2rem 0;">

## Agenda

### Del 1 · Oplæg

<details style="margin-left: 1.5rem;">
<summary><strong>1. Sæt projektet rigtigt op</strong></summary>
<ul>
<li>Ét fælles repository på GitHub, hvor alle i gruppen er inviteret som collaborators.</li>
<li><code>main</code> er den version, der altid virker. Det er den, I deployer og afleverer.</li>
<li>Nøgler ligger i <code>.env.local</code>, som aldrig kommer med i Git. Del dem i gruppen uden om repoet, og hav en <code>.env.example</code> med navnene på variablerne, men uden værdier.</li>
<li>En kort <code>README.md</code>: Hvad er projektet, hvordan kører man det lokalt (<code>npm install</code> og <code>npm run dev</code>), og hvilke environment variables skal man bruge.</li>
<li>Aftal en fælles struktur for mapper og navngivning af komponenter, før I skriver mere kode.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>2. Samarbejd med branches og pull requests</strong></summary>
<ul>
<li><code>main</code> skal være ren: Det er den version, der virker, og den, der bliver deployet. Ingen arbejder direkte i <code>main</code>.</li>
<li>Lav små, afgrænsede feature branches – én opgave pr. branch med et beskrivende navn, fx <code>feature/login-form</code> eller <code>fix/navbar-mobile</code>.</li>
<li>Brug pull requests til at merge ind i <code>main</code>. I kender flowet fra Product Optimization: Hent seneste <code>main</code>, opret en branch, commit, publicér branchen, og opret en pull request på GitHub.</li>
<li>Nyt i gruppen: En anden kigger pull requesten igennem og merger den. Så har mindst to set koden, før den lander i <code>main</code>.</li>
<li>Små branches, der bliver merget hurtigt, giver langt færre merge conflicts. Hent <code>main</code> ofte, og slet branchen, når den er merget.</li>
<li>Det hele kan klares i Source Control i VS Code eller i GitHub Desktop.</li>
</ul>
</details>

<details style="margin-left: 1.5rem;">
<summary><strong>3. Deploy Next.js til Vercel</strong></summary>
<ul>
<li>Log ind på Vercel med GitHub, importér jeres repository, og tryk <em>Deploy</em>. Vercel genkender selv Next.js.</li>
<li>Tilføj de samme environment variables som i <code>.env.local</code> under <em>Settings → Environment Variables</em>, og deploy igen.</li>
<li>Hver gang I merger til <code>main</code>, deployer Vercel en ny version. Hver pull request får sit eget preview-link, som I kan teste, før I merger.</li>
<li>Bruger I Supabase Auth? Tilføj jeres Vercel-URL under <em>Authentication → URL Configuration</em> (Site URL og Redirect URLs), ellers sender login jer tilbage til <code>localhost</code>.</li>
<li>Fejler et deployment, så læs build-loggen. Kør <code>npm run build</code> lokalt for at finde de samme fejl, før I pusher.</li>
<li>Vigtigt for grupper: Vercels gratis Hobby-plan understøtter ikke samarbejde på private repositories – kun commits fra ejeren af Vercel-projektet bliver deployet. Gør repoet public, eller lad Vercel-ejeren stå for at merge til <code>main</code>.</li>
</ul>
</details>

### Del 2 · Vejledning og projektarbejde

<details style="margin-left: 1.5rem;">
<summary><strong>4. Vejledning og projektarbejde</strong></summary>
<ul>
<li>Arbejd videre, der hvor I er i jeres projekt.</li>
<li>Få styr på opsætningen i dag: Fælles repository, en første pull request og et deployment, der virker.</li>
<li>Vejledning i grupperne undervejs.</li>
</ul>
</details>

<hr style="margin: 2rem 0;">

## Materialer

- **Git og GitHub:**
  - [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
  - [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
  - [Source Control i VS Code](https://code.visualstudio.com/docs/sourcecontrol/overview)
  - [GitHub Desktop](https://docs.github.com/en/desktop)
- **Deployment:**
  - [Next.js: Deploying](https://nextjs.org/docs/app/getting-started/deploying)
  - [Vercel: Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
  - [Vercel: Environment variables](https://vercel.com/docs/environment-variables)
  - [Vercel: Troubleshoot project collaboration](https://vercel.com/docs/deployments/troubleshoot-project-collaboration) – Hobby-planen og private repositories
  - [Supabase: Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls)
- **Next.js:**
  - [Environment variables](https://nextjs.org/docs/app/guides/environment-variables)
