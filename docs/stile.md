# Stile visivo

Ricavato dal profilo Instagram [@cambiarerotta_bari](https://www.instagram.com/cambiarerotta_bari/) (ottobre 2026): campionamento dei pixel degli ultimi 12 post e delle copertine delle storie in evidenza, più una revisione a mano dei post fatta da un secondo agente.

## Palette

| Ruolo | Hex | Dove compare sui post |
|---|---|---|
| Sfondo | `#0E0E0E` | Fondo di quasi tutti i post (20–40% dei pixel) |
| Superficie | `#2A2A2A` | Grigi scuri con texture dietro i titoli |
| Testo | `#F4F4F4` | Titoli bianchi, logo |
| Giallo | `#F5D24E` | Parole chiave nei titoli ("LA LEONARDO È ANCORA QUI", "TUTTO") |
| Rosso | `#A8182A` | Post interamente rossi, barre e box dietro gli slogan |
| Rosso scuro | `#5A0A12` | Ombra della scritta "AGGRATIS!" e sfumature |

L'azzurro `#A8C8E8` che esce dal campionamento viene dal cielo nelle foto dei cortei: non è un colore del marchio.

Contrasto: giallo su nero e bianco su nero sono ottimi. Bianco su rosso va bene per titoli e pulsanti. Mai testo giallo su rosso.

## Font

- **Titoli:** Poppins 900 (il massimo spessore), spesso in corsivo per gli slogan: "AGGRATIS!", "LA GUERRA NON LA PAGHIAMO!".
- **Testi secondari:** Poppins 400/500/700, scelta del committente. Sul web si carica da Google Fonts. Il pacchetto npm `@expo-google-fonts/poppins` contiene lo stesso font, ma è fatto per app Expo/React Native e qui non serve.
- **Scritte giganti condensate** ("MUVT…", "50%", le parole gialle nei riquadri): Anton, che imita i caratteri strettissimi dei manifesti.

## Linguaggio visivo dei post

- **Esiste già un key visual MUVT** (post `/p/DdgmYKUCDva/`, "MUVT… AGGRATIS! LA GUERRA NON LA PAGHIAMO"): "MUVT…" con i puntini, "AGGRATIS!" rosso in corsivo largo e pesantissimo con ombra rosso scuro, retino a punti che sfuma dagli angoli, autobus a retino con "FUORI SERVIZIO" sull'indicatore, fondo chiaro che sfuma nel nero. L'hero del sito lo cita.
- **Composizione:** centrata e impilata, righe di grandezze diverse, parole chiave in giallo, slogan su barre rosse.
- **Foto vere** quasi sempre (cortei, striscioni, bandiere, assemblee), scurite o virate al rosso, con il testo sopra.
- **Logo**, sempre in basso al centro: "CAMBIARE" piccolo e spaziato, "ROTTA" grande con la prima R specchiata (Я), una stella rossa in alto a destra e sotto la riga "ORGANIZZAZIONE GIOVANILE COMUNISTA".
- **Elementi ricorrenti:** retino a punti, megafono, ombre piene sotto i titoli, barre rosse inclinate.

## Revisione dello stile (seconda versione, poi scartata)

Un agente ha confrontato la prima versione con i post Instagram e ha segnalato questi elementi come "da template". La seconda versione li toglieva, ma **al committente piaceva di più la prima**, che quindi è tornata (vedi [stato.md](stato.md)). La lista resta come riferimento, non come regola:

- Hero editoriale allineato a sinistra con paragrafo grigio accanto.
- Liste numerate "01–04" su tre colonne, etichette minuscole spaziate sopra i titoli, righe separate da linee sottili.
- Griglia a tre celle "Diffondi / Partecipa / Mobilitati".
- Striscione giallo inclinato che scorre: loro non lo usano.
- Testo grigio chiaro, pulsante con ombra sfalsata "brutalista".
- Grana tipo pellicola: la loro texture è il retino, non il rumore.
- Logo in solo testo.
- Nessuna foto: è il segnale più evidente.
