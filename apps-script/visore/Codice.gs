/* App per leggere i messaggi MUVT (web app di Apps Script).
   Gira con l'account di chi la apre (executeAs USER_ACCESSING): legge e scrive solo il foglio "MUVT – Messaggi".
   Chi può entrare lo decide la condivisione del foglio: chi ce l'ha in modifica usa l'app, gli altri vedono
   "non hai accesso". Così nessuno deve concedere l'accesso alla propria Gmail: le mail le legge il raccoglitore.
   Primo avvio: impostaFoglio('<ID del foglio>') dall'editor, poi Distribuisci → Nuova distribuzione → App web. */

var FOGLIO = 'Messaggi';
var STATI = ['nuovo', 'da rispondere', 'fatto'];

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Messaggi MUVT')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// da eseguire una volta dall'editor con l'ID del foglio (la parte dell'indirizzo tra /d/ e /edit)
function impostaFoglio(id) {
  PropertiesService.getScriptProperties().setProperty('FOGLIO_ID', String(id).trim());
}

function foglio_() {
  // l'ID sta nelle proprietà dello script o in Accessi.gs (file fuori dal repo, caricato con clasp)
  var id = PropertiesService.getScriptProperties().getProperty('FOGLIO_ID') ||
    (typeof FOGLIO_ID !== 'undefined' ? FOGLIO_ID : '');
  if (!id) throw new Error('configurazione');
  return SpreadsheetApp.openById(id).getSheetByName(FOGLIO);
}

function intestazioni_(sh) {
  var h = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  var col = {};
  h.forEach(function (nome, i) { col[nome] = i; });
  return col;
}

function iso_(v) { return v instanceof Date ? v.toISOString() : (v ? String(v) : ''); }

function riga_(r, c) {
  return {
    id: String(r[c['ID']]), ricevuto: iso_(r[c['Ricevuto']]), fonte: r[c['Fonte']],
    nome: r[c['Nome']], contatto: r[c['Contatto']], messaggio: r[c['Messaggio']],
    oggetto: r[c['Oggetto']], stato: r[c['Stato']] || 'nuovo', nota: r[c['Nota']],
    presoDa: r[c['Preso da']], aggiornato: r[c['Aggiornato']], gmail: r[c['Gmail']]
  };
}

// tutti i messaggi, dal più recente; { errore } se il foglio non è raggiungibile
function elenco() {
  var sh;
  try { sh = foglio_(); } catch (e) {
    return { errore: String(e.message) === 'configurazione' ? 'configurazione' : 'accesso' };
  }
  var utente = Session.getActiveUser().getEmail();
  if (sh.getLastRow() < 2) return { utente: utente, messaggi: [] };
  var c = intestazioni_(sh);
  var valori = sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
  var messaggi = valori.filter(function (r) { return r[c['ID']]; }).map(function (r) { return riga_(r, c); });
  messaggi.sort(function (a, b) { return a.ricevuto < b.ricevuto ? 1 : -1; });
  return { utente: utente, messaggi: messaggi };
}

// cambia stato, nota o "preso da" di un messaggio, cercandolo per ID (le righe possono essersi spostate)
function aggiorna(id, campi) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var sh = foglio_();
    var c = intestazioni_(sh);
    var ids = sh.getRange(2, c['ID'] + 1, Math.max(sh.getLastRow() - 1, 1), 1).getValues();
    var i = -1;
    for (var k = 0; k < ids.length; k++) if (String(ids[k][0]) === String(id)) { i = k; break; }
    if (i < 0) throw new Error('Messaggio non trovato: forse è stato cancellato.');
    var r = i + 2;
    var utente = Session.getActiveUser().getEmail();
    if ('stato' in campi) {
      if (STATI.indexOf(campi.stato) < 0) throw new Error('Stato non valido');
      sh.getRange(r, c['Stato'] + 1).setValue(campi.stato);
    }
    if ('nota' in campi) sh.getRange(r, c['Nota'] + 1).setValue(String(campi.nota).slice(0, 2000));
    if ('presoDa' in campi) sh.getRange(r, c['Preso da'] + 1).setValue(campi.presoDa ? utente : '');
    var quando = Utilities.formatDate(new Date(), 'Europe/Rome', 'dd/MM/yyyy HH:mm');
    sh.getRange(r, c['Aggiornato'] + 1).setValue(quando + ' · ' + utente);
    return riga_(sh.getRange(r, 1, 1, sh.getLastColumn()).getValues()[0], c);
  } finally {
    lock.releaseLock();
  }
}
