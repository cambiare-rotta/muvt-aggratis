/* Raccoglitore dei messaggi MUVT.
   Script collegato al Foglio Google "MUVT – Messaggi", di proprietà della casella webcambiarerotta@gmail.com.
   Ogni 5 minuti legge le mail arrivate alla casella e le copia nel foglio (una riga per mail).
   Una volta al giorno toglie i messaggi più vecchi di 6 mesi, come promette l'informativa privacy del sito.
   L'app per leggerli è l'altro progetto (apps-script/visore): legge solo questo foglio.
   Primo avvio: eseguire configura() dall'editor. */

var FOGLIO = 'Messaggi';
var COLONNE = ['ID', 'Ricevuto', 'Fonte', 'Nome', 'Contatto', 'Messaggio', 'Oggetto', 'Mittente',
  'Stato', 'Nota', 'Preso da', 'Aggiornato', 'Gmail'];
var GIORNI_CONSERVAZIONE = 183; // 6 mesi (informativa privacy, "Per quanto tempo")
var GIORNI_LETTURA = 3;         // ogni giro rilegge gli ultimi giorni: le mail già nel foglio si saltano per ID
var GIORNI_PRIMO_AVVIO = 180;   // al primo avvio recupera anche quelle già arrivate

function foglio_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(FOGLIO) || ss.insertSheet(FOGLIO);
  if (sh.getLastRow() === 0) {
    sh.appendRow(COLONNE);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, COLONNE.length).setFontWeight('bold');
    sh.setColumnWidth(COLONNE.indexOf('Messaggio') + 1, 420);
  }
  return sh;
}

// da eseguire una volta: crea il foglio, gli inneschi a tempo, e recupera le mail già arrivate
function configura() {
  foglio_();
  // chi usa l'app deve avere il foglio in modifica; l'elenco sta in Accessi.gs (fuori dal repo)
  if (typeof EDITORI !== 'undefined') SpreadsheetApp.getActiveSpreadsheet().addEditors(EDITORI);
  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('raccogli').timeBased().everyMinutes(5).create();
  ScriptApp.newTrigger('pulisci').timeBased().everyDays(1).atHour(3).create();
  var n = raccogli(GIORNI_PRIMO_AVVIO);
  Logger.log('Configurato. Messaggi aggiunti ora: ' + n);
}

function raccogli(giorni) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return 0; // un altro giro è ancora in corso
  try {
    var sh = foglio_();
    var gia = {};
    if (sh.getLastRow() > 1) {
      sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().forEach(function (r) { gia[r[0]] = true; });
    }
    var io = Session.getEffectiveUser().getEmail().toLowerCase();
    var n = typeof giorni === 'number' ? giorni : GIORNI_LETTURA;
    var nuove = [];
    // -in:sent: le risposte mandate da qui non sono messaggi da leggere
    var threads = GmailApp.search('newer_than:' + n + 'd -in:sent', 0, 200);
    threads.forEach(function (t) {
      t.getMessages().forEach(function (msg) {
        var id = msg.getId();
        if (gia[id]) return;
        if (msg.getFrom().toLowerCase().indexOf(io) >= 0 || daIgnorare_(msg.getFrom())) return;
        var x = leggiMail_({
          id: id, threadId: t.getId(), data: msg.getDate(), da: msg.getFrom(),
          oggetto: msg.getSubject(), testo: msg.getPlainBody(), html: msg.getBody()
        });
        nuove.push([x.id, x.data, x.fonte, x.nome, x.contatto, x.messaggio, x.oggetto, x.mittente,
          'nuovo', '', '', '', 'https://mail.google.com/mail/u/0/#all/' + x.threadId]);
        gia[id] = true;
      });
    });
    if (nuove.length) {
      nuove.sort(function (a, b) { return a[1] - b[1]; });
      sh.getRange(sh.getLastRow() + 1, 1, nuove.length, COLONNE.length).setValues(nuove);
    }
    return nuove.length;
  } finally {
    lock.releaseLock();
  }
}

// toglie le righe più vecchie di 6 mesi e manda nel cestino le mail del modulo corrispondenti
function pulisci() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return;
  try {
    var sh = foglio_();
    if (sh.getLastRow() < 2) return;
    var limite = new Date(Date.now() - GIORNI_CONSERVAZIONE * 864e5);
    var righe = sh.getRange(2, 1, sh.getLastRow() - 1, 3).getValues();
    for (var i = righe.length - 1; i >= 0; i--) { // dal fondo, così gli indici non scorrono
      if (!(righe[i][1] instanceof Date) || righe[i][1] >= limite) continue;
      if (righe[i][2] === 'modulo') {
        try { GmailApp.getMessageById(righe[i][0]).moveToTrash(); } catch (e) { /* già cancellata */ }
      }
      sh.deleteRow(i + 2);
    }
  } finally {
    lock.releaseLock();
  }
}
