# Cose che non sono riuscito a fare da qui

Elenco aggiornato man mano: ogni voce dice perché non si è potuta fare e come farla a mano.

## 1. Primo push su GitHub
- **Perché:** il push chiede il login a GitHub e dalla sessione di Claude non si può aprire la finestra di accesso.
- **Come:** dalla cartella del progetto lanciare `& "C:\Program Files\Git\cmd\git.exe" push -u origin main` e fare il login nel browser che si apre. Dopo il primo login i push successivi funzionano da soli.

## 2. Attivare GitHub Pages
- **Perché:** è un'impostazione del repo su github.com.
- **Come:** repo `cambiare-rotta/muvt-aggratis` (da creare o trasferire dal repo personale `LordMarte-A669/muvt`, poi `git remote set-url origin …`) → Settings → Pages → Build and deployment → Source: **GitHub Actions**. Sul piano gratuito il repo deve essere pubblico.

## 3. ~~Loghi~~ (risolto)
Fatto con i file forniti dal committente; vedi [stato.md](stato.md#loghi). Resta un consiglio: se esiste il logo MUVT in alta risoluzione, o meglio in SVG, conviene usare quello. Il file attuale è largo solo 489 px e su schermi grandi o retina si vede un po' morbido.

## 4. ~~Foto~~ (risolto)
Le 21 foto delle mobilitazioni (zip di WhatsApp) sono nella galleria "Le nostre mobilitazioni"; gli originali stanno in `foto_originali/`. Il consenso di chi è ritratto c'è (le foto le hanno scattate loro stessi). La foto dell'autobus "FUORI SERVIZIO" del Canva non c'è ancora.

## 5. ~~Altezza del modulo di tesseramento~~ (non serve più)
Il modulo non è più un iframe di Google: è un modulo nostro in `public/tesseramento.html` che invia le risposte al Google Moduli di Cambiare Rotta. **Da fare:** un invio di prova dal sito pubblicato (nome "TEST") per controllare che la riga arrivi nel foglio, poi cancellare la riga.

## 6. Controllo su un telefono vero
- **Perché:** il sito è stato provato in riquadri larghi come telefoni e tablet (vedi [stato.md](stato.md#mobile-first-13-ottobre-2026)), ma non su un dispositivo reale. Restano da vedere Safari su iPhone, la tastiera, lo scorrimento vero e la velocità.
- **Come:** aprire il sito pubblicato su un iPhone e su un Android e provare l'animazione del logo, i cursori del calcolatore, le rivendicazioni a fisarmonica e il modulo di tesseramento.

## 7. Pulizia in Canva e in Download
- **Cosa:** nell'account Canva c'è la copia di lavoro "Copia di Copia di U", con 3 pagine in più (2–4) usate per separare i livelli del logo. In Download ci sono `muvt-cunei-canva.png` e `muvt-scritta-canva.png`.
- **Come:** vanno tenuti finché il logo va bene; poi la copia Canva si può eliminare. Il design originale "Copia di U" non è stato toccato.

## 8. Dopo la pubblicazione
- **Attivare il modulo:** mandare un messaggio di prova dal sito pubblicato e cliccare il link di FormSubmit nella casella `cambiarerotta.bari@gmail.com`. Finché non si fa, i messaggi non arrivano.
- **Filtro Gmail:** oggetto `[MUVT]` → etichetta `MUVT` (con il colore che si sceglie).
- **Statistiche:** GoatCounter, https://tesla-analysis.goatcounter.com/. Da localhost non conta; si controlla solo dal sito pubblicato. Link con `?ref=volantino`, `?ref=instagram` ecc. per sapere da dove arrivano. Eventi: clic-tesserati, clic-instagram, clic-cambiare-rotta-org, hashtag-copiato, calcolatore-usato, galleria-vista, galleria-sfogliata, fondo-pagina, messaggio-inviato.
- **Anteprima social:** `og:image` in `public/index.html` punta a `https://cambiare-rotta.github.io/muvt-aggratis/assets/og.jpg`. Se l'indirizzo del sito cambia va aggiornato. Per ripulire la cache dell'anteprima: Sharing Debugger di Facebook.
- **Informativa privacy:** da scrivere insieme a chi risponde dei dati per Cambiare Rotta.
