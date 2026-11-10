/* Lettura delle mail: funzioni pure, senza servizi Google, così si provano in Node (apps-script/test).
   Una mail del modulo "Scrivici" arriva da FormSubmit con una tabella Nome / Contatto / Messaggio.
   Se un giorno FormSubmit cambia impaginazione e la tabella non si riconosce, la mail non si perde:
   diventa un messaggio "mail" con tutto il testo. */

var CAMPI_MODULO = ['Nome', 'Contatto', 'Messaggio'];
var VUOTO_MODULO = '(non indicato)'; // quello che il sito manda quando un campo facoltativo è vuoto

function decodificaEntita_(s) {
  return String(s)
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, function (_, n) { return String.fromCharCode(Number(n)); })
    .replace(/&#x([0-9a-f]+);/gi, function (_, n) { return String.fromCharCode(parseInt(n, 16)); })
    .replace(/&amp;/g, '&');
}

// testo leggibile da un pezzo di HTML: gli a capo restano, i tag spariscono
function testoDaHtml_(html) {
  var s = String(html || '')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|tr|h\d)>/gi, '\n')
    .replace(/<[^>]+>/g, '');
  return decodificaEntita_(s).replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

function chiaveCampo_(etichetta) {
  var e = String(etichetta).trim().toLowerCase();
  for (var i = 0; i < CAMPI_MODULO.length; i++) if (CAMPI_MODULO[i].toLowerCase() === e) return CAMPI_MODULO[i];
  return null;
}

// dalla tabella HTML di FormSubmit: righe con due celle, la prima è il nome del campo
function campiDaHtml_(html) {
  var campi = {}, trovati = 0;
  var righe = String(html || '').match(/<tr[\s\S]*?<\/tr>/gi) || [];
  righe.forEach(function (riga) {
    var celle = riga.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/gi) || [];
    if (celle.length !== 2) return;
    var k = chiaveCampo_(testoDaHtml_(celle[0]));
    if (!k || k in campi) return;
    campi[k] = testoDaHtml_(celle[1]);
    trovati++;
  });
  return trovati && 'Messaggio' in campi ? campi : null;
}

// dal testo semplice ("| Nome | TEST |"): il valore va dal nome del campo al campo dopo, anche su più righe
function campiDaTesto_(testo) {
  var t = String(testo || '');
  var segni = [];
  CAMPI_MODULO.forEach(function (k) {
    var m = new RegExp('\\|\\s*' + k + '\\s*\\|', 'i').exec(t);
    if (m) segni.push({ k: k, da: m.index, valore: m.index + m[0].length });
  });
  if (!segni.some(function (s) { return s.k === 'Messaggio'; })) return null;
  segni.sort(function (a, b) { return a.da - b.da; });
  var campi = {};
  segni.forEach(function (s, i) {
    var fine = i + 1 < segni.length ? segni[i + 1].da : t.length;
    var pezzo = t.slice(s.valore, fine);
    var stop = pezzo.search(/\n\s*(Submitted at|Inviato il)\b/i); // dopo l'ultimo campo c'è la data di FormSubmit
    if (stop >= 0) pezzo = pezzo.slice(0, stop);
    campi[s.k] = pezzo.replace(/\|\s*$/, '').trim();
  });
  return campi;
}

function pulisciCampo_(v) {
  var s = String(v == null ? '' : v).trim();
  return s === VUOTO_MODULO ? '' : s;
}

// avvisi automatici dell'account (benvenuto, sicurezza, accessi delle app): non sono messaggi da gestire.
// FormSubmit invece resta: la sua mail di attivazione serve vederla.
function daIgnorare_(da) {
  var email = mittente_(da).email.toLowerCase();
  return /^no-?reply[^@]*@(accounts\.)?google\.com$/.test(email);
}

// "Mario Rossi <mario@x.it>" -> { nome: "Mario Rossi", email: "mario@x.it" }
function mittente_(da) {
  var s = String(da || '').trim();
  var m = /^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/.exec(s);
  if (m) return { nome: m[1].trim(), email: m[2].trim() };
  return { nome: '', email: s };
}

// toglie dal corpo di una mail normale le citazioni della risposta ("Il giorno … ha scritto:" e le righe con ">")
function senzaCitazioni_(testo) {
  var righe = String(testo || '').split(/\r?\n/);
  var fuori = [];
  for (var i = 0; i < righe.length; i++) {
    if (/^(Il giorno|On) .+(ha scritto|wrote):\s*$/i.test(righe[i].trim())) break;
    if (/^>/.test(righe[i])) continue;
    fuori.push(righe[i]);
  }
  return fuori.join('\n').trim();
}

/* Una mail -> un messaggio da mettere nel foglio.
   m = { id, threadId, data (Date), da, oggetto, testo (corpo semplice), html (corpo HTML) } */
function leggiMail_(m) {
  var dalModulo = /formsubmit\.co/i.test(m.da);
  var campi = dalModulo ? (campiDaHtml_(m.html) || campiDaTesto_(m.testo)) : null;
  var chi = mittente_(m.da);
  if (campi) {
    return {
      id: m.id, threadId: m.threadId, data: m.data, fonte: 'modulo',
      nome: pulisciCampo_(campi.Nome), contatto: pulisciCampo_(campi.Contatto),
      messaggio: pulisciCampo_(campi.Messaggio), oggetto: m.oggetto || '', mittente: chi.email
    };
  }
  var corpo = String(m.testo || '').trim() || testoDaHtml_(m.html);
  return {
    id: m.id, threadId: m.threadId, data: m.data, fonte: 'mail',
    nome: chi.nome, contatto: chi.email,
    messaggio: dalModulo ? corpo : senzaCitazioni_(corpo),
    oggetto: m.oggetto || '', mittente: chi.email
  };
}
