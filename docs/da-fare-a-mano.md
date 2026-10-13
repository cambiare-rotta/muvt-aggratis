# Cose che non sono riuscito a fare da qui

Elenco aggiornato man mano: ogni voce dice perché non si è potuta fare e come farla a mano.

## 1. Primo push su GitHub
- **Perché:** il push chiede il login a GitHub e dalla sessione di Claude non si può aprire la finestra di accesso.
- **Come:** dalla cartella del progetto lanciare `& "C:\Program Files\Git\cmd\git.exe" push -u origin main` e fare il login nel browser che si apre. Dopo il primo login i push successivi funzionano da soli.

## 2. Attivare GitHub Pages
- **Perché:** è un'impostazione del repo su github.com.
- **Come:** repo `LordMarte-A669/muvt` → Settings → Pages → Build and deployment → Source: **GitHub Actions**. Sul piano gratuito il repo deve essere pubblico.

## 3. ~~Loghi~~ (risolto)
Fatto con i file forniti dal committente; vedi [stato.md](stato.md#loghi). Resta un consiglio: se esiste il logo MUVT in alta risoluzione, o meglio in SVG, conviene usare quello. Il file attuale è largo solo 489 px e su schermi grandi o retina si vede un po' morbido.

## 4. Foto dal Canva
- **Perché:** stesso motivo del logo.
- **Come:** esportare la foto dell'autobus "FUORI SERVIZIO" e le altre foto utili in `public/assets/`; poi si inseriscono nel sito.

## 5. Altezza del modulo di tesseramento
- **Perché:** Google Moduli dentro un iframe non comunica la propria altezza alla pagina. Ho messo 1600px; se il modulo è più lungo scorre dentro la cornice.
- **Come:** se dà fastidio, aprire il modulo, misurarne la lunghezza e cambiare `height` in `.frame iframe` dentro `public/tesseramento.html`.

## 6. Controllo su telefono
- **Perché:** la finestra di Chrome controllata da Claude non si è ridimensionata a larghezza mobile.
- **Come:** aprire il sito pubblicato su un telefono, oppure in Chrome premere F12 → icona telefono, e controllare hero, calcolatore e menu.
