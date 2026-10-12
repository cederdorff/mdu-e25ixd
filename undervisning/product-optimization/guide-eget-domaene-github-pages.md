# Guide: Forbind dit domæne fra Simply.com med GitHub Pages

Få `domæne.dk` og `www.domæne.dk` til at vise din side på `brugernavn.github.io` – fx dit portfolio. Domænet, DNS og eventuel e-mail bliver hos Simply.com.

**Du skal have:** et `brugernavn.github.io`-repository, der er publiceret med GitHub Pages, og et domæne hos Simply.com.

**Bemærk:** Kun `domæne.dk` og `www.domæne.dk` flyttes til GitHub Pages. Subdomæner opretter og styrer du fortsat hos Simply.com – se [Subdomæner hos Simply.com](#subdomæner-hos-simplycom).

## 1. Tilføj domænet på GitHub

Gør det, før du ændrer DNS.

1. Åbn repositoryet `brugernavn.github.io`, og gå til **Settings → Pages**.
2. Skriv `domæne.dk` i **Custom domain**, og klik på **Save**.

En DNS-fejl er normal på dette tidspunkt.

## 2. Ret DNS hos Simply.com

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
- Brug dit eget GitHub-brugernavn i CNAME-record'en.
- Slet ikke andre records. Behold især MX-records, hvis du bruger e-mail hos Simply.com.

## 3. Aktivér HTTPS

Gå tilbage til **Settings → Pages**. Når DNS-tjekket er gennemført, så sæt flueben i **Enforce HTTPS**. Er feltet gråt, er certifikatet ikke klar endnu – det kan tage op til 24 timer.

## 4. Test

Åbn `https://domæne.dk` og `https://www.domæne.dk` i et privat browservindue. Begge skal vise din side – `www` viderestilles automatisk til `domæne.dk`.

DNS-ændringer slår typisk igennem på minutter, men kan tage op til 24 timer. Følg med på [DNS Checker](https://dnschecker.org/).

## Subdomæner hos Simply.com

Subdomæner har deres egne DNS-records og påvirkes ikke af ændringerne for `@` og `www`. Du kan derfor fortsat oprette subdomæner i kontrolpanelet hos Simply.com og fx bruge webhotellet til WordPress i uge 43:

| Adresse | Hostes hos |
| --- | --- |
| `domæne.dk` og `www.domæne.dk` | GitHub Pages |
| `wp.domæne.dk` | Simply.com |

Pas blot på, at du ikke ændrer records for `@` og `www`, når du opretter subdomæner.

## Typiske problemer

**Custom domain forsvinder:** Publicerer du fra en branch, gemmer GitHub domænet i en `CNAME`-fil i repositoryet. Slet den ikke, og pas på, at dit build ikke overskriver den. Publicerer du med GitHub Actions, bruges filen ikke.

**Dine projekter flytter med:** Dine andre GitHub Pages-projekter ligger bagefter på fx `domæne.dk/mellemrum` i stedet for `brugernavn.github.io/mellemrum`. Tjek de links, du har afleveret eller delt.

## Anbefalet: Verificér domænet

Så kan ingen andre bruge dit domæne på GitHub Pages. Klik på dit profilbillede → **Settings → Pages → Add a domain**, opret den TXT-record, GitHub viser, hos Simply.com, og klik på **Verify**. Behold TXT-record'en bagefter.

**Dokumentation:** [GitHub Docs · Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) · [GitHub Docs · Verifying your custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
