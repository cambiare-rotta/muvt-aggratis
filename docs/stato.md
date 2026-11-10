# Stato del lavoro (13 ottobre 2026)

## Storia del design

1. **Prima versione:** fondo nero, Anton gigante allineato a sinistra, striscione giallo che scorre, lista numerata, blocco rosso delle rivendicazioni.
2. **Seconda versione:** rifatta seguendo la revisione dello stile (vedi [stile.md](stile.md)). Hero centrato che cita il post Instagram, retino, autobus, barre rosse. **Bocciata dal committente:** "prima era molto più carino".
3. **Versione attuale:** ritorno alla prima, resa dinamica e interattiva. Dalle richieste del committente: Poppins per i testi secondari e titoli al massimo dello spessore (Poppins 900 / Anton).

## Parti interattive (`public/index.html`)

- Lettere del titolo che salgono una alla volta; barratura animata di "metà dello sconto".
- Barra gialla di avanzamento lettura in alto.
- Blocchi che compaiono scorrendo la pagina.
- "50%" che conta da 0 e poi viene barrato.
- **Calcolatore "Fai i conti":** prezzo dell'abbonamento mensile, ISEE, casella "3 o più figli". Mostra il costo di 8 mesi (ottobre–maggio) senza bonus, con il bonus (solo sotto soglia) e con MUVT AGGRATIS (0 €). Il prezzo di partenza, 35 €, è solo un esempio da regolare: non è una tariffa ufficiale.
- Rivendicazioni a fisarmonica (si aprono e si chiudono).
- Righe dell'acronimo che si accendono scorrendo.
- Pulsante "Copia l'hashtag" con avviso a comparsa.
- Striscione che scorre, si ferma passandoci sopra.
- Con "riduci movimento" attivo nel sistema le animazioni sono spente.

## Loghi

I loghi veri hanno sostituito le scritte fatte a mano.

- **`public/assets/logo.webp`** (Cambiare Rotta, 404×112, 11,6 KB): bianco con stella rossa su sfondo trasparente. Ricavato dal logo ufficiale https://cambiare-rotta.org/wp-content/uploads/2021/09/cropped-CAMBIARE_ROTTA_final_logosito-1.png (2964×822, 36 KB), ridimensionato al doppio dell'altezza a cui viene mostrato (56 px) per gli schermi retina. Script: `tools/ridimensiona.ps1`.
  - La prima copia ricevuta era un JPG con il logo bianco su sfondo bianco: le lettere erano perse, inutilizzabile. **Il logo bianco va sempre esportato in PNG trasparente, mai in JPG.**
- **Logo della campagna in due livelli** (951×369, stesso riquadro, quindi sovrapposti combaciano al pixel):
  - `public/assets/muvt-scritta.webp` (97 KB): "MUVT", "…", "AGGRATIS!" e la barretta scura accanto alla M;
  - `public/assets/muvt-cunei.webp` (5,6 KB): i tre triangoli.
  - **Provenienza:** elementi originali del design Canva (pagina 1, gruppo di 7 elementi), non ridisegnati. Sono stati copiati in una copia del design ("Copia di Copia di U", nell'account Canva del committente), separati su due pagine ed esportati in PNG 1080×1350 su fondo bianco: la trasparenza in Canva è a pagamento. Poi il bianco è stato tolto in modo esatto, senza cambiare i colori, con `tools/livelli-logo.ps1`, che ritaglia tutti i livelli con lo stesso riquadro. Rispetto al primo JPG (489 px) la risoluzione è quasi doppia.
  - **Animazione nell'hero:** la scritta entra "a timbro". Poi i tre cunei arrivano uno alla volta da sinistra, accelerando, si piantano nella scritta e vibrano; la scritta sussulta a ogni colpo. I cunei sono la stessa immagine usata tre volte, ciascuna ritagliata (`clip-path`) su un triangolo, con ritagli contigui e senza sovrapposizioni. A fine animazione il logo è identico all'originale.
  - L'unica aggiunta è il contorno bianco sottile con ombra, tipo adesivo, sul contenitore: il rosso scuro di "MUVT" su fondo nero altrimenti quasi sparisce.
  - `tools/togli-bianco.ps1` è lo script del primo tentativo (dal JPG). Non serve più per il logo, ma è utile per immagini con rumore JPEG.

## Mobile first (13 ottobre 2026)

Il CSS di `index.html` è scritto **mobile first**: le regole di base sono per il telefono (da 360 px) e si aggiungono livelli con `min-width`:
- **≥600 px**, telefoni grandi e tablet in verticale: discrepanze più larghe, "Unisciti" su 3 colonne, pulsanti affiancati;
- **≥900 px**, desktop: menu completo, colonne affiancate nell'hero, nella sezione nazionale, nel bonus, nel calcolatore e nel "perché", grana da fotocopia;
- **≥1400 px**, schermi grandi: contenuto un po' più largo, logo fino a 800 px.

Accorgimenti per il telefono:
- niente scorrimento laterale: lo striscione inclinato sbordava di 6 px; `overflow-x: clip` su `html` e `body`, con `hidden` per i Safari vecchi;
- zone da toccare di almeno 44 px (menu, link, casella, pulsanti); cursori del calcolatore con maniglia grande e riempimento giallo;
- la grana sovrapposta (fissa e in fusione) è attiva solo da 900 px, perché su telefono appesantisce lo scorrimento; la barra di lettura si aggiorna una volta per fotogramma;
- discrepanze con il numero accanto al titolo, rivendicazioni con il +/× disegnato in CSS, pulsanti finali a tutta larghezza;
- "metà dello sconto" su una riga sola, così la barra rossa animata si vede; ci sta anche a 360 px;
- numeri con il punto delle migliaia sempre ("5.000 €"): `toLocaleString` in italiano non lo mette a 4 cifre;
- margine in basso per la barra di sistema degli iPhone (`safe-area-inset-bottom`).

Anche `tesseramento.html` è mobile first: su telefono il modulo è alto 2000 px, perché è più stretto e quindi più lungo, e "← Torna alla campagna" diventa "← campagna" sotto i 420 px.

**Come è stato provato:** la finestra di Chrome controllata da Claude non si ridimensiona, quindi il sito è stato caricato in riquadri di 360, 390, 414 e 768 px. A ogni larghezza è stato misurato lo sforamento orizzontale (zero) e sono state controllate a vista tutte le sezioni. Manca ancora una prova su un telefono vero.

Gli script usano .NET da Windows PowerShell, perché su questo PC non ci sono Python né Node.

## Gerarchia delle campagne

La campagna nazionale **"La guerra non la paghiamo!" ha la priorità** su quella territoriale, ma **MUVT AGGRATIS resta la protagonista del sito**. Quindi:
- in apertura il logo MUVT è l'elemento principale; l'etichetta rossa sopra dice "La guerra non la paghiamo! · Bari 2026/27" e porta alla sezione nazionale;
- la sezione nazionale ("Dentro la campagna nazionale") è la **prima dopo l'apertura**, prima del bonus e del calcolatore.

## Collegamenti

- **Campagna nazionale:** appello del 10 settembre 2026 https://cambiare-rotta.org/2026/09/10/la-guerra-non-la-paghiamo-contro-carovita-e-carostudi-riprendiamoci-il-diritto-allo-studio-e-il-futuro/. Il dato dei 34 miliardi di spesa militare viene da lì.
- **Chi siamo:** porta a https://cambiare-rotta.org/ (menu e pulsante in fondo).
- **Tesseramento:** pagina `public/tesseramento.html` che incornicia il modulo Google https://docs.google.com/forms/d/e/1FAIpQLSebOGkB5fVfU6QFmdLfYamqmrxH1_RYLZsaytOL-kOuoAMx6w/viewform (con `?embedded=true`), più un link di riserva per aprirlo direttamente. Su mobile il pulsante "Tesserati" resta visibile nel menu.
- **Acronimo:** MUVT = **M**ovimento **U**niversitario **V**erso **T**rasporti (Aggratis).

## Da fare

Tutto quello che non si è potuto fare da qui è in [da-fare-a-mano.md](da-fare-a-mano.md).

## Anteprima in locale

Su questo PC non ci sono Node né Python. Basta aprire `public/index.html` nel browser, oppure usare un qualsiasi server statico sulla cartella `public/`.

## Foglio di stile comune (13 ottobre 2026)
- `public/assets/site.css` raccoglie ciò che è uguale in tutte le pagine: variabili, intestazione (logo, voci, "Tesserati"; nelle pagine interne c'è anche "← Campagna" su telefono), piè di pagina, bottoni (`.cta`, `.copy`), componenti dei moduli (`.box`, `.box.hot`, `.modulo`, `.scelta`, `.assenso`, `.esito`, `.conferma`) e struttura delle pagine interne (`.page`, `.prose`).
- Dentro `index.html` resta solo il CSS della home (hero, striscione, calcolatore, rivendicazioni, galleria). `tesseramento.html` e `privacy.html` non hanno CSS proprio.
- Per cambiare un colore, un bottone o un campo si modifica `site.css` in un posto solo.

## Sezione "Condividi" e indicizzazione (10 novembre 2026)

**Sezione "Condividi"** (`#condividi`, dopo "Unisciti", voce "Condividi" nel menu): serve a far girare la pagina di persona e nei gruppi.
- QR grande, scuro su bianco con la sua zona di rispetto, in `public/assets/qr.svg`. Codifica `https://cambiare-rotta.github.io/muvt-aggratis/?ref=qr`, così GoatCounter conta chi arriva inquadrandolo. Generato una volta con il pacchetto npm `qrcode` 1.5.4 (correzione d'errore Q, margine 4) e controllato decodificandolo con `jsqr`: nel sito non c'è nessuna libreria. **Se cambia l'indirizzo del sito il QR va rigenerato.**
- Toccando il QR, o "QR a tutto schermo", si apre un riquadro bianco a tutto schermo da far inquadrare a un'altra persona. Si chiude con la X, con Esc o con il tasto indietro del telefono (l'apertura aggiunge un passo alla cronologia); il focus va sulla X e alla chiusura torna al pulsante di partenza.
- "Condividi" apre il menu di condivisione del telefono (`navigator.share`) con `?ref=condiviso`; dove non c'è, copia il link. "Copia il link" copia l'indirizzo con `?ref=link`.
- Eventi GoatCounter nuovi: `link-condiviso`, `link-copiato`, `qr-tutto-schermo`.
- Provata in riquadri da 360, 390 e 768 px e su desktop: nessuno sforamento orizzontale; menu completo su una riga da 1000 px.

**Indicizzazione su Google** (per trovarlo cercando "MUVT AGGRATIS" o "Cambiare Rotta Bari"):
- `<link rel="canonical">` e `og:url` assoluti su home, tesseramento e privacy: le visite con `?ref=…` contano come la stessa pagina.
- Titolo della home con le parole che si cercano ("MUVT AGGRATIS — Trasporti gratuiti per chi studia a Bari | Cambiare Rotta Bari"), descrizione con Uniba e Poliba.
- Dati strutturati JSON-LD nella home: `WebSite` "MUVT AGGRATIS" e `Organization` "Cambiare Rotta Bari" con Instagram e cambiare-rotta.org.
- `public/sitemap.xml` con le tre pagine pubbliche; la 404 ha `noindex`.
- **Niente robots.txt:** per un sito di progetto GitHub Pages il file andrebbe alla radice dell'host (`cambiare-rotta.github.io/robots.txt`, cioè un repo `cambiare-rotta.github.io` a parte). Oggi quell'indirizzo dà 404, e per Google vuol dire "tutto permesso".
- Search Console: vedi [da-fare-a-mano.md](da-fare-a-mano.md).
