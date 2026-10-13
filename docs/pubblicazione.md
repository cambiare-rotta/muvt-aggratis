# Pubblicazione: GitHub Pages

**Online dal 13 ottobre 2026:** https://cambiare-rotta.github.io/muvt-aggratis/ (repo `cambiare-rotta/muvt-aggratis`, pubblico).

**Decisione (13 ottobre 2026):** il sito va su GitHub Pages, non su Cloudflare Workers. La configurazione Wrangler è stata tolta.

## Come funziona

- Il workflow `.github/workflows/pages.yml` pubblica la cartella `public/` a ogni push su `main`.
- **Da fare una sola volta su GitHub:** nel repo `cambiare-rotta/muvt-aggratis` andare in **Settings → Pages → Build and deployment → Source** e scegliere **GitHub Actions**. Senza questo passaggio il workflow fallisce.
- Indirizzo: `https://cambiare-rotta.github.io/muvt-aggratis/`
- Sul piano gratuito il repo deve essere **pubblico**.

## Note

- La pubblicazione da branch serve solo dalla radice o da `/docs`. Qui `docs/` contiene la documentazione, quindi si usa il workflow Actions con `path: public`.
- `public/404.html` ha il link "Torna alla campagna" verso `/muvt-aggratis/`. Se si passa a un dominio proprio va cambiato in `/`.
- Tutti gli altri percorsi nel sito sono relativi (`assets/logo.webp`) e funzionano sia sotto `/muvt-aggratis/` sia con un dominio proprio.
- L'indirizzo contiene il nome utente personale. Per toglierlo: un dominio proprio (Settings → Pages → Custom domain) oppure spostare il repo in un'organizzazione GitHub del collettivo.

## Perché non i Workers

Il sito è statico, senza form né database. Pages pubblica da solo a ogni push, non serve un account Cloudflare e non serve Node su questo PC. I Workers tornerebbero utili solo se un giorno servisse logica lato server, come un form di adesione gestito in proprio.
