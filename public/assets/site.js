/* Funzioni comuni ai moduli ("Scrivici" in home, tesseramento) e alle statistiche.
   Espone window.Muvt. Va caricato prima degli script delle pagine. */
(() => {
  // evento anonimo su GoatCounter: solo "è successo X", mai i dati inseriti. Da localhost non conta.
  const conta = (path, title) => {
    try { window.goatcounter && goatcounter.count && goatcounter.count({ event: true, path, title }); } catch {}
  };

  /* Un modulo con le stesse protezioni e lo stesso comportamento dopo l'invio.
     form:      l'elemento <form>
     opzioni:   esca      nome del campo nascosto trappola per i bot
                chiave    nome nel localStorage per il limite di invii
                conferma  riquadro mostrato dopo l'invio (può contenere [data-altro] per "scrivi un altro")
     Le barriere sono solo nel browser: scoraggiano doppi clic e ripetitori semplici, ma chi vuole le aggira.
     I filtri veri contro lo spam stanno sul servizio che riceve i dati. */
  const modulo = (form, { esca, chiave, conferma }) => {
    const aperto = Date.now();
    const bottone = form.querySelector('button[type="submit"]');
    const testoBottone = bottone ? bottone.textContent : "";
    const ATTESA = 60e3, MAX = 5, FINESTRA = 3600e3; // 1 invio al minuto, al massimo 5 all'ora
    const letti = () => {
      try { return JSON.parse(localStorage.getItem(chiave) || "[]").filter(t => Date.now() - t < FINESTRA); }
      catch { return []; }
    };

    if (conferma) {
      const altro = conferma.querySelector("[data-altro]");
      if (altro) altro.addEventListener("click", () => {
        conferma.hidden = true; form.hidden = false;
        const primo = form.querySelector("input:not(.hp), textarea"); if (primo) primo.focus();
      });
    }

    return {
      // true se sembra un bot: campo nascosto compilato, o invio troppo veloce per una persona
      bot: () => Boolean(new FormData(form).get(esca)) || Date.now() - aperto < 3000,
      // testo dell'errore se si sta inviando troppo, altrimenti null
      limite: () => {
        const s = letti();
        if (s.length && Date.now() - s[s.length - 1] < ATTESA) return "Hai appena inviato un modulo: aspetta un minuto prima del prossimo.";
        if (s.length >= MAX) return "Hai raggiunto il limite di invii per quest'ora. Riprova più tardi.";
        return null;
      },
      occupato: sì => {
        if (!bottone) return;
        bottone.disabled = sì; bottone.textContent = sì ? "Invio…" : testoBottone;
      },
      // da chiamare quando l'invio è riuscito: ricorda l'invio, svuota il modulo, mostra la conferma, conta l'evento
      fatto: (evento, titolo) => {
        try { localStorage.setItem(chiave, JSON.stringify([...letti(), Date.now()])); } catch {}
        form.reset();
        if (conferma) { form.hidden = true; conferma.hidden = false; conferma.focus(); }
        conta(evento, titolo);
      },
    };
  };

  window.Muvt = { conta, modulo };
})();
