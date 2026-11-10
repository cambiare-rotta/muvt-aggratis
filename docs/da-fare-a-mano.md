# Cose che non sono riuscito a fare da qui

Elenco aggiornato man mano: ogni voce dice perché non si è potuta fare e come farla a mano.

## 1. ~~Primo push su GitHub~~ (fatto il 13 ottobre 2026)
Repo `cambiare-rotta/muvt-aggratis` (pubblico), autori dei commit con l'indirizzo noreply di GitHub. Il remote usa `https://cambiare-rotta@github.com/…` perché git su questo PC è collegato anche a un altro account.

## 2. ~~Attivare GitHub Pages~~ (fatto il 13 ottobre 2026)
Sorgente "GitHub Actions". Sito online su https://cambiare-rotta.github.io/muvt-aggratis/. Se un deploy fallisce con "Get Pages site failed", Pages non è attivo: Settings → Pages → Source → GitHub Actions, poi "Re-run jobs".

## 3. ~~Loghi~~ (risolto)
Fatto con i file forniti dal committente; vedi [stato.md](stato.md#loghi). Resta un consiglio: se esiste il logo MUVT in alta risoluzione, o meglio in SVG, conviene usare quello. Il file attuale è largo solo 489 px e su schermi grandi o retina si vede un po' morbido.

## 4. ~~Foto~~ (risolto)
Le 19 foto delle mobilitazioni (21 dagli zip, tolte le n. 10 e 20 del carosello) (zip di WhatsApp) sono nella galleria "Le nostre mobilitazioni"; gli originali stanno in `foto_originali/`. Il consenso di chi è ritratto c'è (le foto le hanno scattate loro stessi). La foto dell'autobus "FUORI SERVIZIO" del Canva non c'è ancora.

## 5. ~~Altezza del modulo di tesseramento~~ (non serve più)
Il modulo non è più un iframe di Google: è un modulo nostro in `public/tesseramento.html` che invia le risposte al Google Moduli di Cambiare Rotta. **Da fare:** un invio di prova dal sito pubblicato (nome "TEST") per controllare che la riga arrivi nel foglio, poi cancellare la riga.

## 6. Controllo su un telefono vero
- **Perché:** il sito è stato provato in riquadri larghi come telefoni e tablet (vedi [stato.md](stato.md#mobile-first-13-ottobre-2026)), ma non su un dispositivo reale. Restano da vedere Safari su iPhone, la tastiera, lo scorrimento vero e la velocità.
- **Come:** aprire il sito pubblicato su un iPhone e su un Android e provare l'animazione del logo, i cursori del calcolatore, le rivendicazioni a fisarmonica e il modulo di tesseramento.

## 7. Pulizia in Canva e in Download
- **Cosa:** nell'account Canva c'è la copia di lavoro "Copia di Copia di U", con 3 pagine in più (2–4) usate per separare i livelli del logo. In Download ci sono `muvt-cunei-canva.png` e `muvt-scritta-canva.png`.
- **Come:** vanno tenuti finché il logo va bene; poi la copia Canva si può eliminare. Il design originale "Copia di U" non è stato toccato.

## 8. Dopo la pubblicazione (13 ottobre 2026)
- **Fatti:** filtro Gmail con l'etichetta `MUVT`, informativa privacy riletta.
- **Da fare, in quest'ordine:**
  1. **Modulo "Scrivici":** mandare un messaggio di prova dal sito pubblicato e cliccare il link di FormSubmit nella casella `cambiarerotta.bari@gmail.com`. Finché non si fa, i messaggi non arrivano.
  2. **Tesseramento:** un invio di prova (nome "TEST") dal sito pubblicato; controllare che la riga arrivi nel foglio Google e cancellarla.
  3. **Telefono vero** (iPhone e Android): solo dopo che i due punti sopra sono passati, vedi punto 6.
- **Statistiche:** GoatCounter, https://tesla-analysis.goatcounter.com/. Da localhost non conta. Lo script è bloccato da alcune estensioni anti-tracciamento (nel Chrome usato per i test risultava bloccato), quindi chi le usa non viene contato: è un limite normale di ogni strumento di statistiche. Link con `?ref=volantino`, `?ref=instagram` ecc. per sapere da dove arrivano. Eventi: clic-tesserati, clic-instagram, clic-cambiare-rotta-org, hashtag-copiato, calcolatore-usato, galleria-vista, galleria-sfogliata, fondo-pagina, messaggio-inviato, tesseramento-inviato.
- **Anteprima social:** `og:image` punta a `https://cambiare-rotta.github.io/muvt-aggratis/assets/og.jpg`. Per ripulire la cache dell'anteprima: Sharing Debugger di Facebook.
- **Privacy:** durata di conservazione del tesseramento ("finché resti iscritta o iscritto") è un'ipotesi, da confermare.

## 9. Google Search Console (dal 10 novembre 2026)
- **Perché non è fatto:** in Chrome era aperto l'account Google personale di Mario, non quello del collettivo. La proprietà va registrata con l'account di Cambiare Rotta (es. `cambiarerotta.bari@gmail.com`), così resta al collettivo.
- **Già pronto nel sito:** canonical, sitemap (`https://cambiare-rotta.github.io/muvt-aggratis/sitemap.xml`), dati strutturati, titolo con "MUVT AGGRATIS".
- **Come fare (10 minuti):**
  1. Entrare in https://search.google.com/search-console con l'account Google di Cambiare Rotta.
  2. "Aggiungi proprietà" → **Prefisso URL** (non "Dominio": github.io non è nostro) → `https://cambiare-rotta.github.io/muvt-aggratis/`.
  3. Metodo **File HTML**: scaricare il file `googleXXXX.html`, metterlo in `public/`, commit e push, aspettare che il workflow Pages finisca (1–2 minuti), poi "Verifica". In alternativa il metodo **Tag HTML**: la riga `<meta name="google-site-verification" …>` va nella `<head>` di `public/index.html`. Il file o il tag vanno lasciati lì per sempre, altrimenti la verifica decade.
  4. Menu **Sitemap** → inviare `sitemap.xml`.
  5. **Controllo URL** → incollare l'indirizzo della home → "Richiedi indicizzazione".
- **Tempi:** di solito da qualche giorno a un paio di settimane prima che "MUVT AGGRATIS" su Google mostri il sito. Per controllare: cercare `site:cambiare-rotta.github.io/muvt-aggratis`.
- **Aiuta molto:** il link al sito nella bio di Instagram `@cambiarerotta_bari` e, se possibile, su cambiare-rotta.org: Google trova e pesa le pagine anche dai link che le puntano.
