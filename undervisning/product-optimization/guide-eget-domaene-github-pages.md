# Guide: Forbind dit domæne fra Simply.com med GitHub Pages

I denne guide får du dit eget domæne til at pege på en hjemmeside, der allerede er publiceret med **GitHub Pages** – fx dit portfolio.

## Forudsætninger

- En hjemmeside på GitHub Pages, fx `https://brugernavn.github.io`
- Et domæne hos Simply.com, fx `mitdomæne.dk`
- Adgang til DNS-administrationen hos Simply.com

Du beholder domænet og DNS-administrationen hos Simply.com. Du kan derfor stadig bruge Simply.com til e-mail, WordPress og andre subdomæner.

<hr style="margin: 2rem 0;">

## 0. Vælg: hele domænet eller et subdomæne?

Skal du også bruge dit webhotel hos Simply.com til WordPress-forløbet i uge 43, så tag stilling til, hvad der skal ligge hvor. Det samme navn kan ikke pege både på GitHub Pages og på Simply.com.

| Løsning | GitHub Pages | WordPress hos Simply.com |
| --- | --- | --- |
| **A – Portfolio på hele domænet** | `mitdomæne.dk` og `www.mitdomæne.dk` | Et subdomæne, fx `wp.mitdomæne.dk` |
| **B – Portfolio på et subdomæne** | Et subdomæne, fx `portfolio.mitdomæne.dk` | `mitdomæne.dk` og `www.mitdomæne.dk` |

- **Løsning A** følger trin 1-6 nedenfor.
- **Løsning B** er den enkleste: Du rører ikke ved de eksisterende records og opretter kun én CNAME-record. Se [Løsning B: Portfolio på et subdomæne](#løsning-b-portfolio-på-et-subdomæne).

<hr style="margin: 2rem 0;">

## 1. Tilføj dit domæne på GitHub

Fortæl først GitHub, hvilket domæne hjemmesiden skal bruge. Gør det, før du ændrer DNS.

1. Åbn det repository, der publicerer din hjemmeside, fx `brugernavn.github.io`.
2. Gå til **Settings → Pages**.
3. Skriv `mitdomæne.dk` i feltet **Custom domain**, og klik på **Save**.

Det er normalt, at GitHub viser en DNS-fejl nu. DNS er endnu ikke sat op.

## 2. Åbn DNS-administrationen hos Simply.com

1. Log ind på [Simply.com](https://www.simply.com/dk/).
2. Åbn kontrolpanelet for `mitdomæne.dk`.
3. Find **DNS-administration**.

Her ser du de DNS-records, der bestemmer, hvor domænet og subdomænerne peger hen.

## 3. Peg domænet på GitHub Pages med A-records

Opret fire **A-records** for selve domænet:

| Type | Navn | Værdi |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

- **A-record:** Forbinder et domænenavn med en IPv4-adresse.
- **`@`:** Betyder selve domænet, `mitdomæne.dk`. Afhængigt af visningen hos Simply.com kan det også være et tomt navnefelt.
- **IP-adresserne:** Tilhører GitHub Pages.

Har domænet allerede A-records, der peger på Simply.coms webhotel, skal du **erstatte** dem. Slet også eventuelle **AAAA-records** (IPv6) for selve domænet, som peger på webhotellet – ellers vil nogle besøgende stadig ende der.

**Vigtigt:** Slet ikke andre records uden at vide, hvad de bruges til. Behold især MX-records og andre mailrelaterede records, hvis du bruger e-mail hos Simply.com.

## 4. Peg www på GitHub Pages med en CNAME-record

Opret eller erstat record'en for `www`:

| Type | Navn | Værdi |
| --- | --- | --- |
| CNAME | `www` | `brugernavn.github.io` |

Erstat `brugernavn` med dit eget GitHub-brugernavn – uden repository-navn. En **CNAME-record** er et alias, der peger på et andet domænenavn.

Findes der allerede en A- eller CNAME-record for `www`, skal du erstatte den i stedet for at oprette en ekstra. GitHub viderestiller automatisk mellem `mitdomæne.dk` og `www.mitdomæne.dk`, når begge er sat korrekt op.

## 5. Aktivér HTTPS

1. Gå tilbage til **Settings → Pages** i dit repository.
2. Vent, til GitHub viser, at DNS-tjekket er gennemført.
3. Sæt flueben i **Enforce HTTPS**.

GitHub opretter selv et certifikat til dit domæne. Er feltet gråt, er certifikatet ikke klar endnu – vent lidt, og prøv igen.

## 6. Test din hjemmeside

Åbn både `https://mitdomæne.dk` og `https://www.mitdomæne.dk` i et privat browservindue. Begge skal vise din hjemmeside.

Virker det ikke med det samme, er DNS-ændringerne sandsynligvis ikke slået igennem endnu. Det tager typisk minutter, men kan tage op til 24 timer. Du kan følge med på [DNS Checker](https://dnschecker.org/).

<hr style="margin: 2rem 0;">

## Løsning B: Portfolio på et subdomæne

Vil du beholde `mitdomæne.dk` til WordPress hos Simply.com, kan dit portfolio i stedet ligge på fx `portfolio.mitdomæne.dk`:

1. Skriv `portfolio.mitdomæne.dk` i **Custom domain** under **Settings → Pages**, og klik på **Save**.
2. Opret én CNAME-record hos Simply.com:

   | Type | Navn | Værdi |
   | --- | --- | --- |
   | CNAME | `portfolio` | `brugernavn.github.io` |

3. Aktivér **Enforce HTTPS**, og test `https://portfolio.mitdomæne.dk`.

De eksisterende records for `mitdomæne.dk` og `www` skal ikke ændres.

<hr style="margin: 2rem 0;">

## Typiske problemer

**Siden er hvid, eller CSS og JavaScript mangler.** Ligger din side i et projekt-repository, fx `brugernavn.github.io/portfolio`, har du sikkert sat `base` i Vite til repository-navnet. På dit eget domæne ligger siden i roden, så `base` skal ændres til `/`:

```js
// vite.config.js
export default defineConfig({
  base: "/",
  // ...
});
```

Bruger du React Router med `basename`, skal den også ændres.

**Custom domain forsvinder igen.** Publicerer du fra en branch, gemmer GitHub domænet i en `CNAME`-fil i repositoryet. Slet den ikke, og pas på, at dit build ikke overskriver den. Publicerer du med GitHub Actions, er der ingen `CNAME`-fil – domænet gemmes kun under **Settings → Pages**.

**Dine andre projekter flytter med.** Sætter du domænet på `brugernavn.github.io`, flytter dine projekt-sider med: `brugernavn.github.io/mellemrum` bliver til `mitdomæne.dk/mellemrum`. De gamle links viderestilles automatisk.

<hr style="margin: 2rem 0;">

## Anbefalet: Verificér dit domæne på GitHub

Verificér domænet på din GitHub-konto, så ingen andre kan overtage det på GitHub Pages, hvis din side på et tidspunkt bliver fjernet.

1. Klik på dit profilbillede på GitHub, og vælg **Settings → Pages**.
2. Klik på **Add a domain**, og skriv `mitdomæne.dk`.
3. Opret den TXT-record, GitHub viser, hos Simply.com.
4. Gå tilbage til GitHub, og klik på **Verify**.

<hr style="margin: 2rem 0;">

## Opsummering

1. Tilføj domænet som **Custom domain** på GitHub.
2. Peg domænet på GitHub Pages med fire A-records – og `www` med en CNAME-record.
3. Aktivér **Enforce HTTPS**.
4. Test begge adresser.

Din hjemmeside hostes gratis på GitHub Pages, men besøgende bruger dit eget domæne. DNS, e-mail og andre subdomæner styrer du fortsat hos Simply.com.

**Dokumentation:**

- [GitHub Docs · Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub Docs · Verifying your custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [Vite · Deploying a Static Site: GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages)
