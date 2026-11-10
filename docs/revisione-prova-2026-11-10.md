# Revisione di `prova/` (10 novembre 2026)

Confronto tra `public/` (sito pubblicato) e `prova/` (versione alternativa fatta oggi applicando [critica-2026-11-10.md](critica-2026-11-10.md)). **Nessun file in `public/` o `prova/` è stato toccato.**

**Come:**
- `git diff --no-index public prova`. Cambiano solo 3 file: `index.html` (+166/−73), `tesseramento.html` (1 riga), `assets/site.css` (1 riga). `site.js`, `privacy.html`, `404.html`, `sitemap.xml`, foto e QR sono identici.
- Misure prese con Chrome headless su copie nella scratchpad (con `<base>` verso le cartelle vere): a 360 e 390 px (pagina in un iframe 360×640 e 390×640) e su desktop (finestra 1440, area utile 1424 px). I valori sono indicativi: i font arrivano dalla rete.
- I numeri di riga si riferiscono a `prova/index.html`, salvo dove indicato.

## In breve

L'agente ha applicato quasi tutta la critica, e le correzioni di accessibilità sono fatte bene. Ma l'obiettivo principale (pagina più corta, azioni più vicine) **non è stato raggiunto**, e c'è un effetto collaterale grave:

| Misura a 360×640 | `public` | `prova` |
|---|---|---|
| Altezza pagina | 9.697 px (15,2 schermi) | 9.555 px (14,9 schermi), cioè **−1,5%** |
| Inizio del calcolatore `#conti` | 2.095 px (schermo 4) | **3.280 px (schermo 6)** |
| Verdetto del calcolatore | 2.930 px | 4.117 px |
| "Tesserati" nell'apertura | non c'era | 681 px, **appena sotto il primo schermo** |
| `#unisciti` | 6.792 px | 6.627 px |
| `#condividi` | 8.590 px | 8.426 px |
| Altezza della foto nel carosello | 405 px | 243 px |

Su desktop (1424 px) il calcolatore scende da 1.901 a 2.648 px, e la pagina passa da 8.885 a 8.730 px.

Fondere bonus, discrepanze e "perché" in un blocco solo **prima** del calcolatore ha spinto in basso di circa due schermi la parte che la critica chiama "la cosa più persuasiva del sito". Nella persona Casey, chi esce al quarto schermo oggi il calcolatore lo vede. Con `prova` no.

---

## 1. Tabella delle modifiche

| # | Dove | Cosa cambia | Verdetto | Perché |
|---|---|---|---|---|
| 1 | `index.html:2` | Commento `<!-- VERSIONE ALTERNATIVA … -->` prima di `<html>` | **sensata in prova, da togliere** prima di pubblicare | Serve a distinguere la cartella, ma online non deve finire. |
| 2 | `:5`, `:157-158`, `:499` | `<script>` in testa che aggiunge `html.js`; `.rv` nascosto solo con `html.js .rv` | **sensata ma incompleta** | Risolve il caso "JS bloccato" (P4). Ma se `site.js` non si carica, `const { conta } = Muvt;` (`:848`) lancia un errore e ferma tutto lo script. `html.js` però c'è già, quindi 50%, verdetto e chiusura dell'acronimo restano invisibili. |
| 3 | `:586`, `:646`, `:734` | `.rv` solo su 50%, verdetto e "Perché studiare…"; tolto da campagna nazionale, calcolatore, discrepanze, "perché", h2 di Unisciti e Condividi, celle | **sensata** | È esattamente la richiesta di P4 ("due o tre momenti"). |
| 4 | `:75`, `:354`, `:422` | `.kicker` da 12 a 14 px (15 su desktop), `.label` a 14 px | **sensata** | Richiesta di P5. La regola `.label` a 14 px duplica quella desktop di `site.css`, ma non fa danni. |
| 5 | `:122-126`, `:537` | Riga gialla "Trasporti gratuiti per chi studia a Bari" dentro l'`h1`, sotto il logo | **sensata** | Richiesta da taste-skill e dalla persona Jordan: ora l'`h1` dice cos'è, a chi legge e a Google. |
| 6 | `:128-131`, `:543-546` | "Fai i conti ↓" da link piccolo a due `.cta`: "Tesserati" (giallo) e "Fai i conti ↓" (`.alt`) | **dubbia nell'esecuzione** | L'idea è quella di P1. Però: (a) a 360×640 e 390×640 il bottone parte a 680 px, cioè fuori dal primo schermo; (b) su telefono ci sono due "Tesserati" a pochi cm (barra in alto + apertura); (c) chi arriva dal QR non è ancora convinto, e "Fai i conti" come prima azione forse rende di più. Va almeno portato nel primo schermo. |
| 7 | `:357-371`, `:431-432`, `:552-557` | Nuova barra `nav.scorciatoie` **appiccicata in alto** (sticky) su telefono e tablet: Fai i conti · Vogliamo · Foto · Condividi (l'ultima in giallo) | **dubbia** | La critica chiedeva "una riga di scorciatoie sotto l'apertura": che resti fissa non l'ha chiesto nessuno, e toglie 54 px di schermo per sempre. La voce evidenziata è "Condividi", mentre la barra in alto con "Tesserati" scorre via: su telefono, dopo l'apertura, **non c'è più un Tesserati a portata**. "Vogliamo" da sola è monca (nel menu è "Cosa vogliamo"). Manca "Il bonus". Nessuno sforamento a 360 px (misurato: 345 = 345). |
| 8 | `:582-619` | `#bonus` fonde tre sezioni: 50% + "Perché lo sconto non basta" + le 4 discrepanze + "Il trasporto pubblico… deve essere gratuito" | **dubbia** | Fa quello che chiedeva P2, ma (a) la pagina si accorcia solo dell'1,5%; (b) il blocco ora sta **prima** del calcolatore, che scende di circa 1.200 px; (c) i testi accorciati hanno perso argomenti (vedi §2). Meglio: 50% e "perché" → calcolatore → discrepanze e chiusa, oppure il blocco fuso dopo il calcolatore, come stavano le discrepanze in `public`. |
| 9 | `:593`, `:597-612` | Testi delle discrepanze accorciati "a una frase per punto" | **dubbia** | Richiesta di P2, ma la frase 4 è diventata illogica e la 3 ha perso un argomento (§2). |
| 10 | `:614-617` | `<blockquote>` diventa `<p class="chiusa">`; i due paragrafi del "perché" diventano una frase | **da rivedere** | Togliere `blockquote` è giusto (non era una citazione). Ma la frase unica cancella la parte più politica del testo (§2). Perde anche la fascia grigia `--surface` che dava ritmo. |
| 11 | `:647-652`, `:220-222`, `:403` | Blocco `.dopo-conto` dopo il verdetto: frase + "Tesserati a Cambiare Rotta" + "Oppure fai girare la pagina →" | **sensata** l'idea, **testo da cambiare** | È la richiesta di P1. Però la frase ripete il verdetto subito sopra (§4, G1). Il link "fai girare" non era chiesto, ma serve all'obiettivo "condividere": va bene. |
| 12 | JS `:1003` | `dopoConto` cambia testo secondo la soglia ("Il bonus non ti tocca?" / "Anche col bonus paghi?") | **da togliere** | Nessuno l'ha chiesto, e in entrambi i casi ripete parola per parola il verdetto della riga sopra. Basta una frase fissa. |
| 13 | `:661-666`, `:374-377`, `:404`, JS `:907-911` | `.foto-forti`: 4 foto sempre visibili sopra il carosello; un tocco apre quella foto nel carosello | **dubbia** | Era una delle opzioni di P8, che la critica stessa chiamava "gusto, non errore", e la scelta era nelle domande per Mario. Problemi: usa le miniature `mini/*.webp`, che sono **168×112 px**, allargate a circa 155 px (telefono, schermo 2-3x) e 290 px (desktop), quindi **sgranate**. Gli attributi dicono 400×300, che non è nemmeno il loro rapporto. La prima (foto02) è anche la prima del carosello, subito sotto. Aggiunge circa 240 px su telefono, contro l'obiettivo di accorciare. |
| 14 | `:476` | Carosello su telefono: area da 4:5 a **4:3** ("4:3 come le foto") | **da togliere** | Nessuno l'ha chiesto, e la premessa è falsa: **10 foto su 19 sono verticali**, 1200×1600 (03, 04, 05, 06, 07, 09, 10, 16, 17, 19). A 360 px una foto verticale ora è alta 243 px e larga circa 180, in un riquadro largo 309: metà galleria rimpicciolita. |
| 15 | `:282` | Righe spente dell'acronimo da `#3d3d3d` a `#6a6a6a` | **sensata** | Ora 3,6:1 sul nero, sopra il minimo di 3:1 per il testo grande. L'effetto "si accendono" resta. |
| 16 | `:303-311`, `:433-434`, `:755-785` | `#contatti` a tutta larghezza: modulo a sinistra, `aside.altri-contatti` a destra (Instagram, mail, assemblee) | **sensata** su desktop, **dubbia** nei dettagli | Risolve P6. Ma sotto i 600 px l'aside è `display:none`. L'ultima riga ripete la cella "Partecipa" 40 righe sopra. "Preferisci scriverci altrove?" ha il tono di un servizio clienti (§4). Mettere l'indirizzo in chiaro attira spam, ma la critica lo proponeva: va deciso consapevolmente. |
| 17 | `:305-306` | Campi di "Scrivici" `#1a1a1a` con bordo `#9a9a9a` | **sensata**, ma incoerente | Ora i campi si vedono. Però sono colori fissi scritti a mano (la critica diceva `--text-muted`), e valgono solo nella home: in `tesseramento.html` i campi restano `#000` con bordo bianco. Due stili di campo nello stesso sito (euristica 4). |
| 18 | `:769` | "Invia" diventa "Invia il messaggio" | **sensata** | Richiesta di taste-skill. |
| 19 | `:335` | Pulsanti secondari di Condividi a 16 px, bordo 3 px, alti 52 px | **sensata** | Richiesta di P5. |
| 20 | `:500` | `prefers-reduced-motion`: ferma la freccia che rimbalza | **sensata** (ridondante) | Già coperta dalla regola globale di `site.css` (`animation: none !important`). |
| 21 | `tesseramento.html:75`, `site.css:161` | "Sei dei nostri" da `h3` a `h2`; CSS `.conferma h2, .conferma h3` | **sensata** | Richiesta di P7. Il selettore `h3` non è morto: lo usa ancora la conferma di "Scrivici" in home. |
| 22 | `:591-613` | Effetto collaterale: le discrepanze (`h3`) ora stanno sotto l'`h2` "Perché lo sconto non basta" | **sensata** | In `public` stavano sotto l'`h2` del calcolatore, una gerarchia sbagliata. |

**Aggiunte non chieste:** 7 (barra appiccicata), 12 (testo che cambia), 14 (4:3), la riga Instagram/mail su mobile nascosta e la frase sulle assemblee in 16, l'evento `foto-forte-aperta` in 13, il link "fai girare" in 11.

---

## 2. Drift di contenuto

### Cifre
Ogni cifra di `prova` esiste in `public` e nelle fonti dei docs. **Nessuna inventata, nessuna persa.**

| Cifra | Dove in `prova` | Fonte |
|---|---|---|
| 50% | `:542`, `:588`, `:643` | campagna.md |
| ottobre 2026 – maggio 2027, 8 mesi | `:542`, `:642`, JS `:989` | campagna.md |
| 13.000 € | `:542`, `:607`, JS `:995` | campagna.md |
| 15.748,78 € | `:607`, `:637`, JS `:995` | campagna.md |
| 34 miliardi | `:576` | appello nazionale (stato.md) |
| 35 €, 18.000 €, 280 € | `:627-643` | valori di esempio del calcolatore (stato.md) |

Due imprecisioni **ereditate** da `public`, quindi non drift:
- `:542` dice "ISEE **sotto** i 13.000 €", ma la fonte e il calcolatore dicono "fino a" (≤).
- `:576` dice "nell'ultima legge di bilancio": nei docs c'è solo "34 miliardi di spesa militare" dall'appello. Va controllato sulla fonte.

### Argomenti persi o indeboliti (tutti nel blocco fuso `#bonus`)

| Testo in `public` | In `prova` | Effetto |
|---|---|---|
| "Lo Stato investe nei servizi solo quando rendono profitto a qualcuno: fondi speculativi o piccoli prenditori." | **sparito** | È la frase più politica (anticapitalista) della pagina. Toglierla è una scelta politica che non spettava all'agente. |
| "Non è un caso: il trasporto è stato appaltato e piegato alle logiche della privatizzazione." | "Appaltato e privatizzato, …" | Si perde il nesso di causa ("non è un caso"). La privatizzazione diventa un aggettivo. |
| "il servizio è diventato meno capillare **e più scadente**" | "sempre meno capillare" | Perso "più scadente". |
| "**Al sud la situazione è disastrosa**, e dentro la stessa città **le periferie stanno peggio del centro**." | "al sud e nelle periferie va peggio che altrove" | Indebolito ("disastrosa" diventa "peggio"), e "altrove" non vuol dire niente. Perso il confronto periferie-centro. |
| "Negli ultimi decenni…" | sparito | Persa la profondità storica. |
| ISEE: "Resta fuori chi supera la soglia di poco **ed è comunque schiacciato da trasporti e affitto**." | "chi supera di poco resta fuori" | Perso il perché l'esclusione fa male. |
| Risparmio illusorio: "**il costo annuale** … resta troppo alto. Uno sconto parziale non compensa anni di rincari." | "Anche dimezzato, arrivare all'università dai paesi vicini costa troppo e non compensa anni di rincari." | Perso "annuale", e la frase è diventata **illogica**: il soggetto di "non compensa" è "arrivare all'università". |
| "…fa il pendolare **ogni giorno**." | "…fa il pendolare." | Minore. |
| Etichetta "Le discrepanze" | sparita | Era il termine del documento del collettivo. Minore. |

### Tono e ordine
- Il tono generale resta. Le frasi riscritte dall'agente però sono più da comunicato di quelle originali: "Appaltato e privatizzato, …" e "Preferisci scriverci altrove?" (§4).
- L'**ordine** cambia il racconto. In `public` si fa prima il conto personale, poi arrivano gli argomenti. In `prova` gli argomenti vengono prima, e il conto due schermi dopo.
- Testi aggiunti dall'agente: la riga dell'`h1` (chiesta), le due frasi di `dopoConto`, "Oppure fai girare la pagina →", "Preferisci scriverci altrove?", "Oppure passa alle assemblee di dipartimento in Uniba e Poliba.", le etichette `aria-label` delle 4 foto (riprese dagli alt: corrette).

---

## 3. Drift di codice

### CSS morto o ridondante
- **Morto:** `.why .cols`, `.why blockquote`, `.why blockquote em`, `.why p` (`:243-250`). La sezione `.why` non esiste più. Le regole desktop `.why` le ha tolte, quelle di base no.
- **Ridondante:**
  - `line-height: 1.1` subito sovrascritto dalla scorciatoia `font:` in `.hero h1.mark .riga` (`:123-124`);
  - `margin-right: 6px` in `.hero-azioni .cta` (c'è già in `site.css`);
  - `.hero-azioni .cta i { animation: none }` nella regola reduce (c'è già la regola globale);
  - `.label { font-size: 14px }` (`site.css` lo mette già a 14 px su desktop).
- **HTML:** il rientro di `.chiusa-blocco` (`:614-617`) e dei `div` aggiunti in `#contatti` (`:755-785`) è sbagliato. Solo estetica del sorgente.

### Id e ancore
- Nessun id tolto. Unico nuovo: `dopoConto`.
- Tutte le ancore esistono: `#bonus`, `#conti`, `#vogliamo`, `#foto`, `#condividi`, `#unisciti`, `#contatti`, `#campagna`. Anche quelle che `tesseramento.html` e `privacy.html` puntano sulla home (`./#bonus`, `./#conti`, `./#vogliamo`).
- `scroll-margin-top: 54px` vale solo per `section[id]`. `#contatti` è un `div`, ma nessun link ci punta.

### JS
- Nessuno script punta a elementi spariti (`.why`, `.scrolldown` non sono usati nel JS).
- Fragilità del ripiego (riga 2 della tabella): `html.js` viene messo prima di sapere se gli script gireranno. Basta che `site.js` non si carichi (rete, blocco) e il verdetto resta invisibile. Soluzioni:
  - aggiungere `js` alla fine dello script principale;
  - oppure togliere `.rv` dal verdetto, che è il momento più forte e non dovrebbe mai dipendere dallo script.

### Eventi GoatCounter

| Evento | `public` | `prova` | Nota |
|---|---|---|---|
| clic-tesserati | 2 link (menu, fondo) | **4 link** (menu, apertura, dopo il calcolatore, fondo) | Stesso nome per tutti: **non si può sapere quale bottone funziona**, che è proprio la cosa da misurare con questa prova. I numeri non sono confrontabili con quelli di prima. Servono nomi diversi (es. `clic-tesserati-apertura`, `-conti`, `-fondo`, `-menu`). |
| clic-instagram | 2 link | 3 link (+ aside) | |
| clic-cambiare-rotta-org | = | = | |
| hashtag-copiato | = | = | |
| calcolatore-usato | = | = | |
| galleria-vista | `#foto .slider` al 40% | uguale, ma il carosello ora è sotto le 4 foto | Scatta più tardi: i numeri non sono confrontabili. |
| galleria-sfogliata | = | = | I tocchi sulle 4 foto non lo fanno scattare (sono fuori da `#slider`). |
| fondo-pagina | `#unisciti` | = | |
| link-condiviso, link-copiato, qr-tutto-schermo | = | = | |
| messaggio-inviato | = | = | |
| tesseramento-inviato (tesseramento.html) | = | = | |
| **foto-forte-aperta** | — | **nuovo** | Non è nella lista eventi di `da-fare-a-mano.md`. |

Non hanno evento: la barra delle scorciatoie, "Oppure fai girare la pagina →" e il `mailto:`.

### Accessibilità
- **Migliorate:**
  - `h1` con testo vero;
  - gerarchia delle discrepanze;
  - `h2` in tesseramento;
  - contrasto dell'acronimo (3,6:1);
  - etichette a 14 px;
  - contenuto visibile senza JS;
  - le 4 foto hanno `aria-label` giusti e `alt=""`.
- **Contrasti nuovi:** giallo su `#2A2A2A` circa 9,4:1, bordo `#9a9a9a` su `#1a1a1a` circa 6:1. Tutto a posto.
- **Movimento:** la regola globale di `site.css` spegne tutto con "riduci movimento", e `scrollIntoView` rispetta `reduce`. Nessuna regressione.
- **Da verificare:**
  - il contorno di focus dei link della barra (3 px, distanza 3 px) viene probabilmente tagliato sopra e sotto da `overflow-x: auto` sulla barra;
  - su Safari < 16, `html, body { overflow-x: hidden }` (ripiego senza `clip`) può impedire allo sticky di attaccarsi.
- **Due landmark `nav`** (menu e scorciatoie): va bene, hanno etichette diverse.

### Immagini
- Foto in evidenza da 168×112 ingrandite (riga 13 della tabella) e area 4:3 con 10 foto verticali (riga 14).
- **Ereditato da `public`:** tutte le `<img>` del carosello hanno `width="1600" height="1200"`, anche le 10 verticali. È sbagliato, ma non è drift.

---

## 4. Testi che suonano da IA

Riscritture senza fatti o cifre nuovi, senza toccare gli slogan ufficiali, senza dialetto oltre "muvt/aggratis". Una riscrittura è più lunga dell'attuale solo dove serve a recuperare un argomento perso (§2), ed è segnato.

Punteggiatura: nel testo visibile non ci sono lineette lunghe (solo nei `<title>`, dove vanno bene). I due punti invece sono tanti (`:593`, `:603`, `:607`, `:616`, `:754`): da diradare.

### Gravi (si nota subito)

| # | Dove | Attuale | Proposta | Perché |
|---|---|---|---|---|
| G1 | `index.html:649` + JS `:1003` | "Il bonus non ti tocca? Unisciti alla campagna." / "Anche col bonus paghi? Unisciti alla campagna." | Una frase fissa, senza JS: **"Questi soldi non dovremmo pagarli. Organizziamoci."** | Ripete parola per parola il verdetto rosso della riga sopra ("Il bonus non ti tocca: paghi tutto…" / "Anche col bonus paghi…"): sembra un modello che riempie uno schema. "Organizziamoci" si aggancia a "Organizzati, tesserati." della pagina tesseramento. |
| G2 | `:616` | "Appaltato e privatizzato, il servizio costa sempre di più ed è sempre meno capillare: al sud e nelle periferie va peggio che altrove." | **"Prezzi su, servizio giù. Non è un caso: i trasporti sono stati appaltati e privatizzati. Al sud è un disastro, e in ogni città le periferie stanno peggio del centro. Lo Stato investe solo dove qualcuno ci guadagna."** (più lunga, per recuperare §2). Versione corta: "Appalti e privatizzazioni: prezzi su, servizio giù. Al sud è un disastro." | Il participio in apertura, la simmetria "sempre di più / sempre meno" e il vago "peggio che altrove" sono da riassunto automatico. E la frase ha mangiato tre argomenti. |
| G3 | `:611` | "Anche dimezzato, arrivare all'università dai paesi vicini costa troppo e non compensa anni di rincari." | "Anche a metà prezzo, venire dai paesi vicini costa troppo in un anno. E uno sconto non ripaga anni di rincari." | È illogica: è lo sconto che non compensa, non "arrivare all'università". Recupera anche "annuale". |
| G4 | `:593` | "Sembra un aiuto, ma è una misura insufficiente e selettiva: non tocca i veri problemi di chi studia fuori sede o fa il pendolare." | "Sembra un aiuto. Ma è poco, e solo per pochi. Chi studia fuori sede o fa il pendolare ogni giorno resta coi problemi di prima." | "Misura insufficiente e selettiva" e "i veri problemi" sono lessico da comunicato. Nessuno studente parla così. Recupera "ogni giorno". |
| G5 | `:717` | "Mobilità reale significa servizi frequenti, capillari e gratuiti. Non sconti parziali su abbonamenti già costosi." | "Bus e navette che passano spesso, arrivano ovunque e non costano niente. Altro che mezzo sconto su abbonamenti già cari." | Definizione astratta ("X reale significa"), triade di aggettivi e "Non Y" in chiusa: tre tic in due frasi. |
| G6 | `:780`, `:783` | "Preferisci scriverci altrove?" … "Oppure passa alle assemblee di dipartimento in Uniba e Poliba." | "O scrivici direttamente:" e via la seconda riga | La prima è da assistenza clienti. La seconda ripete la cella "Partecipa" (`:744`). |

### Minori

| # | Dove | Attuale | Proposta | Perché |
|---|---|---|---|---|
| m1 | `:574` | "MUVT AGGRATIS è la lotta sui trasporti che a Bari porta avanti La guerra non la paghiamo!, la campagna nazionale di Cambiare Rotta contro carovita e carostudi in tutte le università del paese." | "MUVT AGGRATIS è la lotta di Bari sui trasporti dentro **La guerra non la paghiamo!**, la campagna nazionale di Cambiare Rotta contro carovita e carostudi." | Frase da 35 parole con incisi a catena, da comunicato. |
| m2 | `:575` | "…Intanto la spesa militare cresce ogni anno ed entra negli atenei con accordi con la filiera bellica." | "…Intanto la spesa militare cresce ogni anno, e la filiera bellica entra negli atenei con i suoi accordi." | "con accordi con" è goffo. |
| m3 | `:599` | "Le tariffe salgono da anni, senza nessun intervento strutturale." | "Le tariffe salgono da anni, e di interventi veri neanche l'ombra." | "Intervento strutturale" è burocratese. |
| m4 | `:607` | "…: chi supera di poco resta fuori." | "Vale solo con ISEE/ISEEU fino a 13.000 € (15.748,78 € con 3 o più figli). Chi sta poco sopra resta fuori, e trasporti e affitto li paga pieni." | Recupera l'argomento perso (§2) e toglie i due punti. |
| m5 | `:705` | "Basta con la carenza cronica di alloggi. Servono nuovi studentati pubblici e la riconversione di quelli privati." | "Mancano alloggi da anni. Servono nuovi studentati pubblici, e quelli privati vanno riconvertiti." | "Carenza cronica" e il nome astratto "riconversione" sono da comunicato. |
| m6 | `:709` | "Ha liberalizzato gli affitti, aprendo la strada a speculazione e rincari. Va abolita per tornare a tutelare il diritto alla casa." | "Ha liberalizzato gli affitti: da lì speculazione e rincari. Va abolita. La casa è un diritto." | "Aprendo la strada a" e "tutelare il diritto" sono formule. |
| m7 | `:721` | "Per monitorare di continuo studentati, affitti e le esigenze di chi fa il pendolare." | "Per seguire sempre, da vicino, studentati, affitti e pendolari." | "Monitorare le esigenze" è linguaggio da ente. |
| m8 | `:734` | "Perché studiare non deve essere un lusso." | "Studiare non è un lusso." | Il "Perché" è appeso, e la versione affermativa è più da corteo. |
| m9 | `:745` | "Scendi in piazza con noi alle prossime iniziative." | "Scendi in piazza con noi." | "Alle prossime iniziative" è un invito generico e non aggiunge niente. |
| m10 | `:754` | "Domande, proposte, una segnalazione sui trasporti: il messaggio arriva a Cambiare Rotta Bari." | "Una domanda, una proposta, un problema coi trasporti? Scrivici." | Triade + due punti + frase di servizio. |
| m11 | `:775` | "Grazie per averci scritto." | "Ricevuto, grazie!" | Formula da modulo automatico. |
| m12 | `tesseramento.html:40` | "…Tesserati a Cambiare Rotta e costruisci con noi la campagna MUVT AGGRATIS nelle università di Bari." | "…Tesserati a Cambiare Rotta e porta MUVT AGGRATIS nelle università di Bari con noi." | "Costruisci con noi la campagna" è da volantino generico. La prima frase ("Per vincere servono più persone, non più sconti.") è buona: tenerla. |

**Da non toccare**, anche se hanno la forma "X, non Y" o lo schema della triade:
- "Il trasporto pubblico, per essere davvero pubblico, deve essere gratuito." (tesi della campagna);
- "Pretendi diritti, non elemosine.";
- "Non vogliamo metà dello sconto…";
- "Il bonus non ti tocca: paghi tutto, 280 €." (la critica lo indica come il momento più forte);
- le tre celle Diffondi / Partecipa / Mobilitati (scelta del committente).

---

## Da correggere in `prova/` prima di pubblicare (in ordine di importanza)

1. **Rimettere il calcolatore in alto:** 50% e "perché" → calcolatore → discrepanze e chiusa. Oggi è sceso di circa 1.200 px su telefono (dallo schermo 4 al 6).
2. **Recuperare gli argomenti persi** del blocco "perché" (lo Stato investe solo dove c'è profitto, il sud "disastroso", periferie contro centro, "non è un caso", chi sta poco sopra la soglia schiacciato da trasporti e affitto) e correggere la frase illogica del risparmio illusorio (G2, G3, m4).
3. **`dopoConto`:** togliere il testo che cambia e mettere una frase fissa che non ripeta il verdetto (G1).
4. **Galleria:**
   - tornare al 4:5 su telefono, perché 10 foto su 19 sono verticali;
   - per le 4 foto in evidenza, usare immagini vere (non le miniature 168×112), oppure toglierle e lasciare la scelta a Mario come previsto dalla critica. Toglierle accorcia anche la pagina.
5. **"Tesserati" nel primo schermo** a 360×640 (oggi è a 681 px). Per esempio: bottoni prima del paragrafo del bonus, o paragrafo più corto.
6. **Barra delle scorciatoie:**
   - voce gialla "Tesserati" (non "Condividi"), perché il Tesserati in alto scorre via;
   - "Cosa vogliamo" per intero;
   - decidere con Mario se deve restare appiccicata in alto.
7. **GoatCounter:** eventi distinti per ogni bottone "Tesserati". Senza, non si saprà mai se la prova ha funzionato. Aggiungere `foto-forte-aperta` alla lista in `da-fare-a-mano.md`, se resta.
8. **Ripiego senza JS** davvero robusto: `js` messo solo a script riuscito, oppure niente `.rv` sul verdetto.
9. **Contatti:** togliere la riga che ripete "Partecipa", cambiare "Preferisci scriverci altrove?" (G6), uniformare i campi con `tesseramento.html` usando le variabili invece dei colori fissi.
10. **Pulizia:** CSS `.why` morto, commento "VERSIONE ALTERNATIVA", rientri.
11. **Testi minori** (G4, G5, m1-m12).
12. **Prova su un telefono vero** (iPhone e Android), soprattutto per la barra appiccicata e il contorno di focus.

---

## Applicato il 10/11

Correzioni fatte in `prova/` (index.html, tesseramento.html, `assets/foto/medie/` nuova). `public/` non toccato.

**Misure a 360×640** (iframe in Chrome, stesso metodo):

| | `prova` prima | `prova` dopo |
|---|---|---|
| Altezza pagina | 9.555 px | 9.856 px |
| "Tesserati" nell'apertura | 681 px (fuori dal primo schermo) | **473–519 px (dentro)** |
| Inizio calcolatore | 3.280 px | **2.155 px** |
| Verdetto | 4.117 px | **2.994 px** |
| "Tesserati" dopo il conto | — | 3.109 px |

A 390×780: Tesserati 496–542, calcolatore 2.184, verdetto 3.038. La pagina è più alta di 300 px soprattutto per il carosello tornato a 4:5 (+160 px) e per il blocco "ragioni" diventato sezione a sé: il guadagno vero è che calcolatore, verdetto e "Tesserati" arrivano più di un schermo prima.

**Corretti:**
1. Ordine: 50% + "Perché lo sconto non basta" → calcolatore → "Le quattro ragioni" + chiusa (sezione `.perche`). Campagna nazionale non spostata (decisione del committente).
2. Apertura: su telefono i pulsanti stanno sotto il claim e prima del paragrafo; etichetta su una riga (sotto 420 px "· Bari 2026/27" si nasconde, lo dice già la riga sotto il logo); riga gialla più piccola (15–22 px, peso 800) per non competere col claim.
3. Barra su telefono: Conti · Richieste · Condividi · **Tesserati** (giallo). Nessuna voce monca, sta in 339 px.
4. Dopo il verdetto una frase fissa, "Questi soldi non dovremmo pagarli. Organizziamoci." (G1): via il testo che cambiava con l'ISEE.
5. Argomenti recuperati: "Da decenni…", "Non è un caso", appalti e privatizzazione, sud "un disastro", periferie peggio del centro, "Lo Stato investe nei servizi solo quando rendono profitto a qualcuno: fondi speculativi o piccoli prenditori" (identica all'originale), chi sta appena sopra la soglia schiacciato da trasporti e affitto, "in un anno" nel risparmio illusorio (G3 corretta).
6. Testi: G1–G6 e m1–m12 applicati (m6 riformulato: "Ha liberalizzato gli affitti, e da lì sono arrivati speculazione e rincari. Va abolita. La casa è un diritto."); "Diffondi" → "Metti #MUVTAGGRATIS nelle storie e nel gruppo del corso."; meno due punti.
7. Galleria: carosello di nuovo 4:5 su telefono; foto in evidenza da 800×600 (`assets/foto/medie/`, 01, 08, 11, 13, ~280 KB in tutto, caricate solo quando servono), nessuna uguale alla prima del carosello (foto02).
8. Rosso dello slogan "non la paghiamo!" da #A8182A (2,6:1) a #D2203A (3,7:1).
9. GoatCounter: ogni "Tesserati" manda `clic-tesserati` (totale, come prima) **e** `clic-tesserati-<posizione>`: `menu`, `apertura`, `barra`, `dopo-conti`, `unisciti`. Resta `foto-forte-aperta` (da aggiungere alla lista in `da-fare-a-mano.md` quando si porta in `public`).
10. Ripiego senza JS: la classe che nasconde le `.rv` (`rv-pronto`) la mette lo script solo dopo aver acceso l'osservatore; senza `site.js` le statistiche tacciono (`conta` vuoto) e il modulo Scrivici non invia ma rimanda alla mail. Provato togliendo `site.js`: calcolatore, galleria e verdetto funzionano, nessun errore.
11. Contatti: via la riga sulle assemblee e "Preferisci scriverci altrove?" (ora "O scrivici direttamente"); via i colori dei campi scritti a mano, i campi sono quelli di `site.css` come in tesseramento.
12. Via il CSS morto `.why`, `.bonus-blocco`, l'animazione ridondante in "riduci movimento".

**Verificato:** nessuno sforamento a 360, 390 e desktop; calcolatore (ISEE 5.000 → 280/140 €, 18.000 → 280/280 €); fisarmonica; foto in evidenza che apre la foto giusta nel carosello; QR a tutto schermo (focus sulla X, Esc chiude); console senza errori. Moduli non inviati.

**Resta:**
- Da verificare sulla fonte, non cambiati: "ISEE **sotto** i 13.000 €" nell'apertura (fonte e calcolatore dicono "fino a") e "34 miliardi … **nell'ultima legge di bilancio**".
- Campagna nazionale prima del bonus: tutti e due i giudici la sposterebbero dopo il calcolatore. È una decisione del committente: da chiedere.
- Barra appiccicata in alto: decidere con Mario se tenerla.
- Commento "VERSIONE ALTERNATIVA" in testa a `index.html`: da togliere quando si porta in `public`.
- Prova su un telefono vero.

## Decisioni di Mario (10/11/2026)

- La campagna nazionale resta subito dopo l'apertura (non si sposta dopo il calcolatore).
- "ISEE sotto i 13.000 €" e "34 miliardi nell'ultima legge di bilancio" restano come sono.
- La barra delle scorciatoie su telefono resta com'è in `prova/`.
