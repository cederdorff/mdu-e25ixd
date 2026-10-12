# Guide: Forbind dit domæne fra Simply.com med GitHub Pages

Få dit eget domæne til at pege på en hjemmeside, der allerede ligger på **GitHub Pages** – fx dit portfolio. Domænet, DNS og eventuel e-mail bliver hos Simply.com.

**Du skal have:** en side på GitHub Pages, fx `https://brugernavn.github.io`, og et domæne hos Simply.com, fx `mitdomæne.dk`.

## 0. Vælg: hele domænet eller et subdomæne?

Skal du bruge webhotellet hos Simply.com til WordPress i uge 43, skal du vælge, hvad der ligger hvor. Ét navn kan kun pege ét sted hen.

| Løsning | GitHub Pages | WordPress hos Simply.com |
| --- | --- | --- |
| **A** | `mitdomæne.dk` og `www.mitdomæne.dk` | et subdomæne, fx `wp.mitdomæne.dk` |
| **B** | et subdomæne, fx `portfolio.mitdomæne.dk` | `mitdomæne.dk` og `www.mitdomæne.dk` |

Løsning B er den enkleste – se [Løsning B](#løsning-b-portfolio-på-et-subdomæne). Løsning A følger trin 1-4.

## 1. Tilføj domænet på GitHub

Gør det, før du ændrer DNS.

1. Åbn det repository, der publicerer siden, og gå til **Settings → Pages**.
2. Skriv `mitdomæne.dk` i **Custom domain**, og klik på **Save**.

En DNS-fejl er normal på dette tidspunkt.

## 2. Ret DNS hos Simply.com

Log ind på [Simply.com](https://www.simply.com/dk/), åbn `mitdomæne.dk`, og gå til **DNS-administration**. Opret disse records – og **erstat** eksisterende A- eller CNAME-records med samme navn:

| Type | Navn | Værdi |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `brugernavn.github.io` |

- `@` betyder selve domænet. Hos Simply.com kan det være et tomt navnefelt.
- Brug dit eget GitHub-brugernavn – uden repository-navn.
- Slet AAAA-records for selve domænet, som peger på webhotellet.
- Slet ikke andre records. Behold især MX-records, hvis du bruger e-mail hos Simply.com.

## 3. Aktivér HTTPS

Gå tilbage til **Settings → Pages**. Når DNS-tjekket er gennemført, så sæt flueben i **Enforce HTTPS**. Er feltet gråt, er certifikatet ikke klar – det kan tage op til 24 timer.

## 4. Test

Åbn `https://mitdomæne.dk` og `https://www.mitdomæne.dk` i et privat browservindue. DNS-ændringer slår typisk igennem på minutter, men kan tage op til 24 timer. Følg med på [DNS Checker](https://dnschecker.org/).

## Løsning B: Portfolio på et subdomæne

1. Skriv `portfolio.mitdomæne.dk` i **Custom domain** under **Settings → Pages**.
2. Opret én record hos Simply.com, og lad resten være:

   | Type | Navn | Værdi |
   | --- | --- | --- |
   | CNAME | `portfolio` | `brugernavn.github.io` |

3. Aktivér **Enforce HTTPS**, og test `https://portfolio.mitdomæne.dk`.

## Typiske problemer

**Hvid side, eller CSS og JavaScript mangler:** Gælder kun, hvis siden ligger i et projekt-repository, fx `brugernavn.github.io/portfolio`. Så har du sikkert sat `base: "/portfolio/"` i Vite – på dit eget domæne skal den fjernes eller ændres til `/`. Det samme gælder `basename` i React Router. Et `brugernavn.github.io`-repository ligger allerede i roden og kræver ingen ændring.

**Custom domain forsvinder:** Publicerer du fra en branch, gemmer GitHub domænet i en `CNAME`-fil. Slet den ikke, og pas på, at dit build ikke overskriver den. Med GitHub Actions bruges filen ikke.

**Dine projekter flytter med:** Sætter du domænet på `brugernavn.github.io`, ligger dine projekter bagefter på fx `mitdomæne.dk/mellemrum`. Tjek de links, du har afleveret eller delt.

## Anbefalet: Verificér domænet

Så kan ingen andre bruge dit domæne på GitHub Pages. Klik på dit profilbillede → **Settings → Pages → Add a domain**, opret den TXT-record, GitHub viser, hos Simply.com, og klik på **Verify**. Behold TXT-record'en bagefter.

**Dokumentation:** [GitHub Docs · Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) · [GitHub Docs · Verifying your custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
