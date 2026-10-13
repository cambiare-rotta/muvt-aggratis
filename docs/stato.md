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

## Collegamenti

- **Campagna nazionale:** MUVT AGGRATIS è la campagna barese dentro "La guerra non la paghiamo!" di Cambiare Rotta (appello del 10 settembre 2026: https://cambiare-rotta.org/2026/09/10/la-guerra-non-la-paghiamo-contro-carovita-e-carostudi-riprendiamoci-il-diritto-allo-studio-e-il-futuro/). Nel sito c'è una sezione dedicata, con il dato dei 34 miliardi di spesa militare nell'ultima legge di bilancio preso dall'appello.
- **Chi siamo:** porta a https://cambiare-rotta.org/ (menu e pulsante in fondo).
- **Tesseramento:** pagina `public/tesseramento.html` che incornicia il modulo Google https://docs.google.com/forms/d/e/1FAIpQLSebOGkB5fVfU6QFmdLfYamqmrxH1_RYLZsaytOL-kOuoAMx6w/viewform (con `?embedded=true`), più un link di riserva per aprirlo direttamente. Su mobile il pulsante "Tesserati" resta visibile nel menu.
- **Acronimo:** MUVT = **M**ovimento **U**niversitario **V**erso **T**rasporti (Aggratis).

## Da fare

Tutto quello che non si è potuto fare da qui è in [da-fare-a-mano.md](da-fare-a-mano.md).

## Anteprima in locale

Su questo PC non ci sono Node né Python. Basta aprire `public/index.html` nel browser, oppure usare un qualsiasi server statico sulla cartella `public/`.
