# App dei messaggi (Apps Script)

Per leggere i messaggi del modulo "Scrivici" (e ogni altra mail che arriva a `webcambiarerotta@gmail.com`) in una pagina comoda invece che nella casella.

```
mail a webcambiarerotta  ──(ogni 5 min)──▶  raccoglitore  ──▶  Foglio "MUVT – Messaggi"  ◀──  visore (app web)
```

- **`raccoglitore/`**: script **collegato al Foglio**, di proprietà di `webcambiarerotta`. Legge le mail (anche quelle già lette o archiviate degli ultimi giorni), riconosce la tabella di FormSubmit e scrive una riga per mail: ID, Ricevuto, Fonte (`modulo` o `mail`), Nome, Contatto, Messaggio, Oggetto, Mittente, Stato, Nota, Preso da, Aggiornato, link Gmail. Se la tabella non si riconosce, la mail entra lo stesso come `mail` con tutto il testo. Ogni notte toglie le righe più vecchie di 6 mesi e manda nel cestino le mail del modulo corrispondenti (lo promette l'informativa privacy).
- **`visore/`**: **app web separata**. Gira con l'account di chi la apre e tocca solo il Foglio. Mostra l'elenco (Da fare, Nuovi, Da rispondere, Fatti, Tutti), una ricerca, e per ogni messaggio:
  - i pulsanti per rispondere, scelti in base al contatto: mail, WhatsApp e chiamata, Instagram;
  - lo stato;
  - "Me ne occupo io";
  - una nota condivisa.

  Aprire un messaggio nuovo lo segna "da rispondere".

**Perché due script:** se fosse uno solo, chi apre l'app dovrebbe concedere l'accesso alla propria Gmail. Così Gmail la legge solo `webcambiarerotta`, e gli altri concedono solo l'accesso ai fogli.

**Chi può usare l'app:** chi ha il Foglio condiviso **in modifica**. Per dare o togliere l'accesso a qualcuno: Foglio → Condividi.

## Com'è installato (10/11/2026, con clasp e l'account webcambiarerotta)

- Foglio "MUVT – Messaggi" con il raccoglitore collegato, e progetto separato "MUVT – App messaggi" pubblicato come app web, versione 1.
- Gli id (script, Foglio, distribuzione) stanno nei `.clasp.json` e in `Accessi.gs` di ogni cartella. Sono esclusi dal repo: in `Accessi.gs` ci sono anche gli indirizzi di chi riceve il Foglio.
- **Aggiornare dopo una modifica:** dalla cartella, `npx -y @google/clasp@3.4.1 push --force`. Per il visore poi `npx -y @google/clasp@3.4.1 update-deployment <id della distribuzione>`, così l'URL non cambia. Gli id si vedono con `clasp list-deployments`.
- **Attenzione:** `clasp create-script` riscrive `appsscript.json` con quello di default (fuso di New York, nessun permesso). Va rimesso quello del repo prima del push.

## Installazione a mano (alternativa a clasp, tutto con l'account webcambiarerotta)

1. **Foglio e raccoglitore**
   - Su Google Drive crea un Foglio Google chiamato `MUVT – Messaggi`.
   - Dal Foglio apri Estensioni → Apps Script.
   - Copia `raccoglitore/Codice.gs` e `raccoglitore/Lettura.gs` in due file dell'editor.
   - Impostazioni progetto → spunta "Mostra il file manifest", poi incolla `raccoglitore/appsscript.json` in `appsscript.json`.
   - Scegli la funzione `configura` e premi **Esegui**. Accetta le autorizzazioni: lettura e cestino di Gmail, il Foglio, gli inneschi.
   - Nel Foglio compare la scheda `Messaggi` con le mail degli ultimi 6 mesi.
2. **Visore**
   - Su https://script.google.com crea un **Nuovo progetto** separato, chiamato `MUVT – App messaggi`.
   - Copia `visore/Codice.gs` e `visore/Index.html` (file HTML chiamato `Index`) e il manifest `visore/appsscript.json`.
   - Nell'editor esegui una volta `impostaFoglio('ID')`, mettendo al posto di ID la parte dell'indirizzo del Foglio tra `/d/` e `/edit`. Il modo più semplice: aggiungi temporaneamente la funzione `function x(){ impostaFoglio('…') }`, eseguila e poi toglila.
   - Distribuisci → Nuova distribuzione → tipo **App web**. Esegui come: **Utente che accede all'app web**. Chi ha accesso: **Chiunque abbia un account Google**.
   - Copia l'URL `…/exec`: è l'app. Il Foglio comunque non lo vede chi non ce l'ha condiviso.
3. **Accessi:** condividi il Foglio in modifica con le persone di Cambiare Rotta che devono rispondere, e manda loro l'URL dell'app. Al primo accesso Google chiede di autorizzare l'app a usare i fogli.

Dopo una modifica al visore: Distribuisci → Gestisci distribuzioni → modifica → Nuova versione (l'URL resta lo stesso).

## Test

`node apps-script/test/run_tests.js` prova le parti pure:
- il riconoscimento della tabella di FormSubmit, su un campione vero in `test/formsubmit-testo.txt`;
- le mail normali;
- il tipo di contatto, WhatsApp, le date relative, i filtri.

Il resto (Gmail, Foglio, app web) si prova solo dentro Apps Script.

## Limiti noti

- **Nuovi messaggi:** compaiono entro 5 minuti dall'arrivo della mail, perché il raccoglitore gira a intervalli; l'app si aggiorna da sola ogni minuto.
- **"Apri in Gmail":** funziona solo da chi è collegato a `webcambiarerotta`.
- **Copia per Cambiare Rotta:** la pulizia dei 6 mesi tocca solo la casella `webcambiarerotta`. La copia in `cambiarerotta.bari@gmail.com` va cancellata da loro.
- **Mail di FormSubmit:** finché il modulo non è attivato non arrivano mail di FormSubmit da leggere (vedi `docs/da-fare-a-mano.md`, punto 8.1). Comparirà però la mail "Activate FormSubmit" stessa.
