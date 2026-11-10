// Test delle parti pure degli script (zero dipendenze): node apps-script/test/run_tests.js
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const qui = __dirname;
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(qui, '../raccoglitore/Lettura.gs'), 'utf8'), ctx);
const html = fs.readFileSync(path.join(qui, '../visore/Index.html'), 'utf8');
const puro = /\/\/ <puro>([\s\S]*?)\/\/ <\/puro>/.exec(html)[1];
vm.runInContext(puro, ctx);
const { Puro } = vm.runInContext('({ Puro })', ctx);

let ok = 0, ko = 0;
function prova(nome, fn) {
  try { fn(); ok++; } catch (e) { ko++; console.log('FALLITO: ' + nome + '\n  ' + e.message); }
}

// testo semplice di una mail vera di FormSubmit (10/11/2026, messaggio di prova)
const VERO = fs.readFileSync(path.join(qui, 'formsubmit-testo.txt'), 'utf8');
const DA_FS = 'FormSubmit <submissions@formsubmit.co>';

prova('testo vero di FormSubmit', () => {
  const c = ctx.campiDaTesto_(VERO);
  assert.equal(c.Nome, 'TEST');
  assert.equal(c.Contatto, '(non indicato)');
  assert.equal(c.Messaggio, 'Prova di attivazione del modulo Scrivici. Si può cancellare.');
});

prova('mail del modulo dal testo: campo vuoto diventa stringa vuota', () => {
  const x = ctx.leggiMail_({ id: 'a', threadId: 't', data: new Date(0), da: DA_FS, oggetto: '[MUVT] Messaggio dal sito', testo: VERO, html: '' });
  assert.equal(x.fonte, 'modulo');
  assert.equal(x.nome, 'TEST');
  assert.equal(x.contatto, '');
});

const TABELLA = `<table class="data"><tr><th>Name</th><th>Value</th></tr>
<tr><td>Nome</td><td>Anna &amp; Co</td></tr>
<tr><td>Contatto</td><td>+39 333 123 4567</td></tr>
<tr><td style="x">Messaggio</td><td>Prima riga<br>seconda riga con | barra e &lt;tag&gt;</td></tr></table>`;

prova('tabella HTML stile FormSubmit, anche su più righe', () => {
  const c = ctx.campiDaHtml_(TABELLA);
  assert.equal(c.Nome, 'Anna & Co');
  assert.equal(c.Contatto, '+39 333 123 4567');
  assert.equal(c.Messaggio, 'Prima riga\nseconda riga con | barra e <tag>');
});

prova("l'HTML vince sul testo", () => {
  const x = ctx.leggiMail_({ id: 'b', threadId: 't', data: new Date(0), da: DA_FS, oggetto: '', testo: VERO, html: TABELLA });
  assert.equal(x.nome, 'Anna & Co');
});

prova('testo semplice con messaggio su più righe', () => {
  const t = '| Nome | Luca |\n\n| Contatto | luca@x.it |\n\n| Messaggio | riga uno\nriga due |\n\nSubmitted at Tue, Nov 10, 2026';
  const c = ctx.campiDaTesto_(t);
  assert.equal(c.Messaggio, 'riga uno\nriga due');
  assert.equal(c.Contatto, 'luca@x.it');
});

prova('FormSubmit cambia formato: la mail resta, con tutto il testo', () => {
  const x = ctx.leggiMail_({ id: 'c', threadId: 't', data: new Date(0), da: DA_FS, oggetto: 'Nuovo', testo: 'Formato nuovo: Nome=Pia, Testo=ciao', html: '' });
  assert.equal(x.fonte, 'mail');
  assert.match(x.messaggio, /Nome=Pia/);
});

prova('mail normale: mittente e citazioni tolte', () => {
  const x = ctx.leggiMail_({ id: 'd', threadId: 't', data: new Date(0), da: '"Giulia Bianchi" <giulia@uniba.it>', oggetto: 'Assemblea',
    testo: 'Ci vediamo giovedì?\n\nIl giorno mar 10 nov 2026 alle 18:00 MUVT <web@x.it> ha scritto:\n> testo vecchio', html: '' });
  assert.equal(x.fonte, 'mail');
  assert.equal(x.nome, 'Giulia Bianchi');
  assert.equal(x.contatto, 'giulia@uniba.it');
  assert.equal(x.messaggio, 'Ci vediamo giovedì?');
});

prova('mail solo HTML', () => {
  const x = ctx.leggiMail_({ id: 'e', threadId: 't', data: new Date(0), da: 'x@y.it', oggetto: '', testo: '', html: '<p>Ciao&nbsp;a tutti</p><p>Seconda</p>' });
  assert.equal(x.messaggio, 'Ciao a tutti\nSeconda');
  assert.equal(x.contatto, 'x@y.it');
});

prova('avvisi automatici di Google ignorati, FormSubmit e persone no', () => {
  assert.equal(ctx.daIgnorare_('Google <no-reply@accounts.google.com>'), true);
  assert.equal(ctx.daIgnorare_('Google <no-reply@google.com>'), true);
  assert.equal(ctx.daIgnorare_('FormSubmit <submissions@formsubmit.co>'), false);
  assert.equal(ctx.daIgnorare_('"Giulia" <giulia@gmail.com>'), false);
  assert.equal(ctx.daIgnorare_('Assistenza <support@google.com>'), false);
});

prova('tipo di contatto', () => {
  assert.equal(Puro.tipoContatto(''), 'nessuno');
  assert.equal(Puro.tipoContatto('mario@gmail.com'), 'email');
  assert.equal(Puro.tipoContatto('333 123 4567'), 'telefono');
  assert.equal(Puro.tipoContatto('+39 333-123-4567'), 'telefono');
  assert.equal(Puro.tipoContatto('@cambiarerotta_bari'), 'instagram');
  assert.equal(Puro.tipoContatto('instagram.com/pippo.b'), 'instagram');
  assert.equal(Puro.tipoContatto('scrivetemi al bar'), 'altro');
});

prova('numero WhatsApp', () => {
  assert.equal(Puro.numeroWhatsApp('333 123 4567'), '393331234567');
  assert.equal(Puro.numeroWhatsApp('+39 333 123 4567'), '393331234567');
  assert.equal(Puro.numeroWhatsApp('0039 333 1234567'), '393331234567');
});

prova('utente Instagram', () => {
  assert.equal(Puro.utenteInstagram('@cambiarerotta_bari'), 'cambiarerotta_bari');
  assert.equal(Puro.utenteInstagram('https://www.instagram.com/pippo.b/'), 'pippo.b');
});

prova('quando', () => {
  const n = new Date(2026, 10, 10, 18, 0);
  assert.equal(Puro.quando(new Date(2026, 10, 10, 17, 59, 50).toISOString(), n), 'adesso');
  assert.equal(Puro.quando(new Date(2026, 10, 10, 17, 48).toISOString(), n), '12 min fa');
  assert.equal(Puro.quando(new Date(2026, 10, 10, 9, 5).toISOString(), n), 'oggi 09:05');
  assert.equal(Puro.quando(new Date(2026, 10, 9, 18, 40).toISOString(), n), 'ieri 18:40');
  assert.equal(Puro.quando(new Date(2026, 10, 3, 8, 0).toISOString(), n), '3 nov 08:00');
  assert.equal(Puro.quando(new Date(2025, 0, 3, 8, 0).toISOString(), n), '3 gen 2025 08:00');
});

prova('filtri e ricerca', () => {
  const m = { stato: 'fatto', nome: 'Anna', contatto: '', messaggio: 'Bus 12 in ritardo', nota: '' };
  assert.equal(Puro.passaFiltro(m, 'aperti', ''), false);
  assert.equal(Puro.passaFiltro(m, 'tutti', 'bus'), true);
  assert.equal(Puro.passaFiltro(m, 'fatto', 'treno'), false);
  assert.equal(Puro.passaFiltro({ messaggio: 'x' }, 'nuovo', ''), true); // stato vuoto vale "nuovo"
});

console.log(`${ok} ok, ${ko} falliti`);
process.exit(ko ? 1 : 0);
