# Guide: Forbind dit domæne fra Simply.com med GitHub Pages

Få `domæne.dk` og `www.domæne.dk` til at vise dit portfolio fra GitHub Pages. Domænet, DNS og eventuel e-mail bliver hos Simply.com.

**Du skal have:** et portfolio, der er publiceret med GitHub Pages, og et domæne hos Simply.com.

**Bemærk:** Kun `domæne.dk` og `www.domæne.dk` flyttes til GitHub Pages. Subdomæner opretter og styrer du fortsat hos Simply.com – se [Subdomæner hos Simply.com](#subdomæner-hos-simplycom).

## Start her: Er du A eller B?

Åbn dit portfolio i browseren. Står der noget efter `github.io/` i adressen?

| Din adresse | Du er | Custom domain sættes på | Trin 2 |
| --- | --- | --- | --- |
| `brugernavn.github.io` | **A** | repositoryet `brugernavn.github.io` | Spring over |
| `brugernavn.github.io/portfolio-navn` | **B** | repositoryet `portfolio-navn` | Skal gøres |

## 1. Tilføj domænet på GitHub

Gør det, før du ændrer DNS.

1. Åbn det repository, dit portfolio ligger i:
   - **A:** `brugernavn.github.io`
   - **B:** `portfolio-navn`
2. Gå til **Settings → Pages**.
3. Skriv `domæne.dk` i **Custom domain**, og klik på **Save**.

En DNS-fejl er normal på dette tidspunkt. Sæt kun domænet på ét repository.

## 2. Kun B: Ret base path

> **Kun B.** Er du **A**, så gå videre til [trin 3](#3-ret-dns-hos-simplycom).

En projektside ligger i en undermappe, så du har sikkert sat repository-navnet som base path. På dit eget domæne ligger siden i roden, så base path skal være `/`. Ellers får du en hvid side, eller CSS og JavaScript mangler.

```js
// vite.config.js
export default defineConfig({
  base: "/", // før: "/portfolio-navn/"
});
```

Bruger du React Router, så fjern `basename="/portfolio-navn"` fra `<BrowserRouter>`, eller ret den til `/`. Commit og push, så siden bygges og publiceres igen.

## 3. Ret DNS hos Simply.com

Log ind på [Simply.com](https://www.simply.com/dk/), åbn `domæne.dk`, og gå til **DNS-administration**. Opret disse records, og **erstat** eksisterende A-, AAAA- og CNAME-records for `@` og `www`:

| Type | Navn | Værdi |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `brugernavn.github.io` |

- `@` betyder selve domænet. Hos Simply.com kan det være et tomt navnefelt.
- CNAME-record'en peger altid på `brugernavn.github.io` med dit eget GitHub-brugernavn – også hvis du er **B**. Skriv ikke `/portfolio-navn` i værdien.
- Slet ikke andre records. Behold især MX-records, hvis du bruger e-mail hos Simply.com.

## 4. Aktivér HTTPS

Gå tilbage til **Settings → Pages**. Når DNS-tjekket er gennemført, så sæt flueben i **Enforce HTTPS**. Er feltet gråt, er certifikatet ikke klar endnu – det kan tage op til 24 timer.

## 5. Test

Åbn `https://domæne.dk` og `https://www.domæne.dk` i et privat browservindue. Begge skal vise dit portfolio – `www` viderestilles automatisk til `domæne.dk`. Den gamle adresse – `brugernavn.github.io` (**A**) eller `brugernavn.github.io/portfolio-navn` (**B**) – viderestilles også til `domæne.dk`.

Klik rundt på siden, og genindlæs en underside. Er du **B**, og mangler CSS eller billeder, så tjek trin 2.

DNS-ændringer slår typisk igennem på minutter, men kan tage op til 24 timer. Følg med på [DNS Checker](https://dnschecker.org/).

## Subdomæner hos Simply.com

Det gælder både for **A** og **B**: Subdomæner har deres egne DNS-records og påvirkes ikke af ændringerne for `@` og `www`. Du kan derfor fortsat oprette subdomæner i kontrolpanelet hos Simply.com og fx bruge webhotellet til WordPress i uge 43:

| Adresse | Hostes hos |
| --- | --- |
| `domæne.dk` og `www.domæne.dk` | GitHub Pages |
| `wp.domæne.dk` | Simply.com |

Pas blot på, at du ikke ændrer records for `@` og `www`, når du opretter subdomæner.

## Typiske problemer

**Hvid side, eller CSS og JavaScript mangler (B):** `base` i Vite eller `basename` i React Router peger stadig på `/portfolio-navn/`. Se trin 2.

**Custom domain forsvinder:** Publicerer du fra en branch, gemmer GitHub domænet i en `CNAME`-fil i repositoryet. Slet den ikke, og pas på, at dit build ikke overskriver den. Publicerer du med GitHub Actions, bruges filen ikke.

**Dine projekter flytter med (A):** Dine andre GitHub Pages-projekter ligger bagefter på fx `domæne.dk/mellemrum` i stedet for `brugernavn.github.io/mellemrum`. Tjek de links, du har afleveret eller delt. Er du **B**, flytter kun portfolioet.

## Anbefalet: Verificér domænet

Så kan ingen andre bruge dit domæne på GitHub Pages. Klik på dit profilbillede → **Settings → Pages → Add a domain**, opret den TXT-record, GitHub viser, hos Simply.com, og klik på **Verify**. Behold TXT-record'en bagefter.

**Dokumentation:** [GitHub Docs · Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) · [GitHub Docs · Verifying your custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
