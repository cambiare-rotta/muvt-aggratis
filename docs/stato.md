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

## Da fare

- **Logo:** il codice cerca `public/assets/logo.png`; se manca mostra la scritta "Cambiare Rotta". I loghi veri sono nel design Canva https://www.canva.com/design/DAHVt9sz8f4/ (post "MUVT… AGGRATIS!", 13 pagine). Il connettore Canva non ha accesso al design e i link firmati delle immagini non si possono scaricare dal browser, quindi vanno **esportati a mano da Canva**: PNG con sfondo trasparente, versione bianca, salvato come `public/assets/logo.png`.
- **Link ai form esterni:** nel design Canva non ci sono link. Vanno incollati nell'oggetto `FORMS` in fondo a `public/index.html` (`adesione`, `segnalazione`). Finché sono vuoti, i pulsanti sono disattivati con la scritta "Link in arrivo".
- **Foto:** nel Canva ci sono foto (l'autobus "FUORI SERVIZIO", ecc.) che potrebbero entrare nel sito una volta esportate.
- **Mobile:** layout responsive, non ancora controllato su un telefono vero.
- **GitHub Pages:** attivare la sorgente "GitHub Actions" nelle impostazioni del repo (vedi [pubblicazione.md](pubblicazione.md)).

## Anteprima in locale

Su questo PC non ci sono Node né Python. Basta aprire `public/index.html` nel browser, oppure usare un qualsiasi server statico sulla cartella `public/`.
