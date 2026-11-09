/* =========================================================
   APP – Steuerung: Start, Schritte, Code-Editor, Vorschau.
   Gespeichert wird im Browser (localStorage) pro Kind.
   ========================================================= */

const SPEICHER = 'codelab-kinder';
const $ = (sel) => document.querySelector(sel);

let kinder = laden();
let aktivId = null;
let k = null;                       // Daten des aktiven Kindes
let gewaehltesEmoji = START_EMOJIS[0];
let geschaffte = new Set();         // IDs der geschafften Schritte
let vorhanden = new Set();          // was im Code steht ("selektor|eigenschaft")

/* ---------------- Speichern ---------------- */

function laden() {
  try { return JSON.parse(localStorage.getItem(SPEICHER)) || {}; } catch { return {}; }
}
function speichern() {
  if (!aktivId) return;
  kinder[aktivId] = k;
  try { localStorage.setItem(SPEICHER, JSON.stringify(kinder)); } catch { /* voll? egal */ }
}

function neuesKind(name, emoji) {
  return {
    name, emoji,
    intro: 'Heute ist Zukunftstag und ich baue meine allererste eigene Webseite. Jede Zeile Code habe ich selbst eingefügt!',
    karten: [
      { icon: '⚽', titel: 'Mein Hobby', text: 'Fußball spielen und mit Freunden draußen sein.' },
      { icon: '🐶', titel: 'Mein Lieblingstier', text: 'Hunde – weil sie immer gute Laune haben.' },
      { icon: '🚀', titel: 'Später werde ich …', text: 'Vielleicht Programmierer*in? Mal sehen!' },
    ],
    css: '/* Hier kommt dein Code hin */\n\n',
    schritt: 0,
    wahl: {},
  };
}

/* ================= START ================= */

function zeigeStart() {
  aktivId = null;
  $('#labor').hidden = true;
  $('#start').hidden = false;

  const wahl = $('#neu-emojis');
  wahl.innerHTML = '';
  START_EMOJIS.forEach(e => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = e;
    b.className = e === gewaehltesEmoji ? 'gewaehlt' : '';
    b.onclick = () => { gewaehltesEmoji = e; zeigeStart(); };
    wahl.appendChild(b);
  });

  const ids = Object.keys(kinder);
  $('#profile').hidden = ids.length === 0;
  const liste = $('#profil-liste');
  liste.innerHTML = '';
  ids.forEach(id => {
    const kind = kinder[id];
    const fertig = SCHRITTE.filter(s => schrittGeschafft(s, vorhandeneEigenschaften(leseCss(kind.css).regeln))).length;
    const el = document.createElement('div');
    el.className = 'profil';
    el.innerHTML = `
      <button class="profil-knopf">
        <span class="profil-emoji">${htmlSicher(kind.emoji)}</span>
        <span><b>${htmlSicher(kind.name)}</b><small>${fertig} von ${SCHRITTE.length} Schritten</small></span>
      </button>
      <button class="profil-weg" title="Löschen">✕</button>`;
    el.querySelector('.profil-knopf').onclick = () => oeffne(id);
    el.querySelector('.profil-weg').onclick = () => {
      if (!confirm(`Die Seite von ${kind.name} wirklich löschen?`)) return;
      delete kinder[id];
      localStorage.setItem(SPEICHER, JSON.stringify(kinder));
      zeigeStart();
    };
    liste.appendChild(el);
  });
}

$('#neu-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const feld = $('#neu-name');
  const name = feld.value.trim();
  if (!name) { feld.classList.add('wackel'); feld.focus(); setTimeout(() => feld.classList.remove('wackel'), 450); return; }
  const id = 'kind-' + Date.now();
  kinder[id] = neuesKind(name, gewaehltesEmoji);
  feld.value = '';
  oeffne(id);
  speichern();
});

/* ================= LABOR ================= */

function oeffne(id) {
  aktivId = id;
  k = Object.assign(neuesKind('', '🙂'), kinder[id]);
  $('#start').hidden = true;
  $('#labor').hidden = false;
  $('#topbar-name').textContent = k.name;
  $('#topbar-emoji').textContent = k.emoji;

  code.value = k.css;
  zeichneCode();
  analysiere(false);
  ladeVorschau();
  zeigeSchritt(k.schritt);
}

/* ---------------- Schritte (links) ---------------- */

function zeigeSchritt(nr) {
  nr = Math.max(0, Math.min(SCHRITTE.length - 1, nr));
  k.schritt = nr;
  speichern();
  const s = SCHRITTE[nr];
  if (k.wahl[s.id] == null) k.wahl[s.id] = 0;

  $('#schritt-icon').textContent = s.icon;
  $('#schritt-nummer').textContent = `Schritt ${nr + 1} von ${SCHRITTE.length}`;
  $('#schritt-titel').textContent = s.titel;
  $('#schritt-text').textContent = s.text;
  $('#schritt-tipp').textContent = s.tipp;
  $('#btn-zurueck').disabled = nr === 0;
  $('#btn-weiter').textContent = nr === SCHRITTE.length - 1 ? 'Fertig ✓' : 'Weiter →';

  aktualisiereSchritt();
  document.querySelector('.seitenleiste').scrollTop = 0;
}

/** Alles, was sich ändert, wenn der Code sich ändert */
function aktualisiereSchritt() {
  const s = SCHRITTE[k.schritt];
  const wahl = k.wahl[s.id] || 0;

  // Punkte oben
  const punkte = $('#schritt-punkte');
  punkte.innerHTML = '';
  SCHRITTE.forEach((sch, i) => {
    const b = document.createElement('button');
    b.className = 'punkt' + (i === k.schritt ? ' aktiv' : '') + (geschaffte.has(sch.id) ? ' fertig' : '');
    b.title = `${i + 1}. ${sch.titel}`;
    b.textContent = geschaffte.has(sch.id) ? '✓' : i + 1;
    b.onclick = () => zeigeSchritt(i);
    punkte.appendChild(b);
  });

  // Status
  const status = $('#schritt-status');
  const fertig = geschaffte.has(s.id);
  status.textContent = fertig ? '✓ Geschafft' : 'Offen';
  status.className = 'schritt-status' + (fertig ? ' fertig' : '');
  $('#btn-weiter').classList.toggle('pulsieren', fertig && k.schritt < SCHRITTE.length - 1);

  // Varianten
  const box = $('#varianten');
  box.innerHTML = '';
  s.varianten.forEach((v, i) => {
    const b = document.createElement('button');
    const drin = variantenAnteil(v, vorhanden) === 1;
    b.className = 'variante' + (i === wahl ? ' gewaehlt' : '') + (drin ? ' drin' : '');
    b.innerHTML = `
      <span class="kachel" style="${v.kachel}">${v.zeichen ?? 'Aa'}</span>
      <span class="v-name">${v.name}</span>
      ${drin ? '<span class="v-haken">✓</span>' : ''}`;
    b.onclick = () => { k.wahl[s.id] = i; speichern(); aktualisiereSchritt(); };
    box.appendChild(b);
  });

  // Vorlage-Code
  const variante = s.varianten[wahl];
  $('#vorlage').innerHTML = faerbeCss(variante.code);

  // Was fehlt noch?
  let fehlt = $('#schritt-fehlt');
  if (!fehlt) {
    fehlt = document.createElement('div');
    fehlt.id = 'schritt-fehlt';
    $('#schritt-tipp').before(fehlt);
  }
  const b = benoetigt(variante.code);
  const offen = b.filter(x => !vorhanden.has(x));
  if (fertig) {
    fehlt.className = 'meldung meldung-gut';
    fehlt.innerHTML = '🎉 <b>Super!</b> Der Code funktioniert. Schau dir deine Seite an – dann geht\'s weiter.';
  } else if (offen.length < b.length) {
    fehlt.className = 'meldung meldung-fast';
    fehlt.innerHTML = '<b>Fast!</b> Das fehlt noch oder hat einen Fehler:<br>' +
      offen.map(x => { const [sel, eig] = x.split('|'); return `<code>${htmlSicher(sel)} → ${htmlSicher(eig)}</code>`; }).join(' ');
  } else {
    fehlt.className = '';
    fehlt.innerHTML = '';
  }
}

$('#btn-zurueck').onclick = () => zeigeSchritt(k.schritt - 1);
$('#btn-weiter').onclick = () => {
  if (k.schritt === SCHRITTE.length - 1) {
    if (geschaffte.size === SCHRITTE.length) $('#fertig-fenster').hidden = false;
    else zeigeToast(`Noch ${SCHRITTE.length - geschaffte.size} Schritte offen – die grauen Punkte oben!`);
    return;
  }
  zeigeSchritt(k.schritt + 1);
};

/* Kopieren */
$('#btn-kopieren').onclick = async () => {
  const s = SCHRITTE[k.schritt];
  const text = s.varianten[k.wahl[s.id] || 0].code;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Notlösung für ältere Browser
    const t = document.createElement('textarea');
    t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
  }
  const btn = $('#btn-kopieren');
  btn.textContent = '✓ Kopiert!';
  btn.classList.add('kopiert');
  setTimeout(() => { btn.textContent = '📋 Kopieren'; btn.classList.remove('kopiert'); }, 1500);
  code.classList.add('blinken');
  setTimeout(() => code.classList.remove('blinken'), 1600);
};

$('#kbd-taste').textContent = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘ Cmd' : 'Strg';

/* ---------------- Code-Editor (unten) ---------------- */

const code = $('#code');
const farbig = $('#code-farbig');
const zeilen = $('#zeilen');
let fehlerZeilen = new Set();

function zeichneCode() {
  farbig.innerHTML = faerbeCss(code.value) + '\n ';
  const anzahl = code.value.split('\n').length;
  let html = '';
  for (let i = 1; i <= anzahl; i++) html += `<div${fehlerZeilen.has(i) ? ' class="fehler"' : ''}>${i}</div>`;
  zeilen.innerHTML = html + '<div>&nbsp;</div>';
  scrollSync();
}

function scrollSync() {
  farbig.scrollTop = code.scrollTop;
  farbig.scrollLeft = code.scrollLeft;
  zeilen.scrollTop = code.scrollTop;
}
code.addEventListener('scroll', scrollSync);

let analyseTimer;
code.addEventListener('input', () => {
  k.css = code.value;
  zeichneCode();
  clearTimeout(analyseTimer);
  analyseTimer = setTimeout(() => { analysiere(true); speichern(); }, 250);
});

/* Tab = Einrücken, Enter = automatisch einrücken */
function einfuegen(text) {
  if (!document.execCommand('insertText', false, text)) code.setRangeText(text, code.selectionStart, code.selectionEnd, 'end');
  code.dispatchEvent(new Event('input'));
}
code.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') { e.preventDefault(); einfuegen('  '); }
  if (e.key === 'Enter') {
    e.preventDefault();
    const vorher = code.value.slice(0, code.selectionStart);
    const zeile = vorher.split('\n').pop();
    let einzug = zeile.match(/^\s*/)[0];
    if (zeile.trim().endsWith('{')) einzug += '  ';
    einfuegen('\n' + einzug);
  }
  if (e.key === '}') {
    // Einzug zurücknehmen, wenn die Zeile nur Leerzeichen hat
    const start = code.selectionStart;
    const zeilenAnfang = code.value.lastIndexOf('\n', start - 1) + 1;
    const bisher = code.value.slice(zeilenAnfang, start);
    if (bisher.length >= 2 && !bisher.trim()) {
      e.preventDefault();
      code.setSelectionRange(start - 2, start);
      einfuegen('}');
    }
  }
});

/** Liest den Code, zeigt Fehler, prüft Schritte, aktualisiert die Vorschau */
function analysiere(mitFeier) {
  const { regeln, fehler } = leseCss(code.value);
  vorhanden = vorhandeneEigenschaften(regeln);

  // Fehler anzeigen
  fehlerZeilen = new Set(fehler.map(f => f.zeile));
  zeichneCode();
  const status = $('#code-status');
  const liste = $('#fehler-liste');
  if (fehler.length) {
    status.textContent = `⚠ ${fehler.length} ${fehler.length === 1 ? 'Fehler' : 'Fehler'}`;
    status.className = 'code-status fehler';
    liste.hidden = false;
    liste.innerHTML = fehler.slice(0, 3).map(f => `<div><b>Zeile ${f.zeile}:</b> ${htmlSicher(f.text)}</div>`).join('')
      + (fehler.length > 3 ? `<div class="mehr">… und ${fehler.length - 3} weitere</div>` : '');
  } else {
    status.textContent = '✓ Alles richtig';
    status.className = 'code-status ok';
    liste.hidden = true;
  }

  // Schritte prüfen
  const vorher = geschaffte;
  geschaffte = new Set(SCHRITTE.filter(s => schrittGeschafft(s, vorhanden)).map(s => s.id));
  if (mitFeier) {
    SCHRITTE.forEach((s, i) => {
      if (geschaffte.has(s.id) && !vorher.has(s.id)) zeigeToast(`🎉 Schritt ${i + 1} „${s.titel}“ geschafft!`);
    });
    if (geschaffte.size === SCHRITTE.length && vorher.size < SCHRITTE.length) {
      setTimeout(() => { $('#fertig-fenster').hidden = false; }, 900);
    }
  }

  // Fortschritt oben
  $('#fortschritt-fuell').style.width = (geschaffte.size / SCHRITTE.length * 100) + '%';
  $('#fortschritt-text').textContent = `${geschaffte.size} von ${SCHRITTE.length}`;

  aktualisiereVorschauCss();
  if (k) aktualisiereSchritt();
}

$('#btn-leeren').onclick = () => {
  if (!confirm('Wirklich den ganzen Code löschen? Deine Seite wird dann wieder langweilig.')) return;
  code.value = '';
  code.dispatchEvent(new Event('input'));
  code.focus();
};

/* ---------------- Vorschau (rechts oben) ---------------- */

const frame = $('#vorschau');
const SCHRIFTEN_LINK = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Nunito:wght@400;700;800&family=Playfair+Display:wght@400;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">';

/** Das HTML der Kinder-Seite. Absichtlich ganz schlicht – das Aussehen kommt NUR vom Code der Kinder. */
function seitenHtml(kind, css) {
  const karten = kind.karten.map(c => `
      <div class="karte">
        <div class="karte-icon">${htmlSicher(c.icon)}</div>
        <h3>${htmlSicher(c.titel)}</h3>
        <p>${htmlSicher(c.text)}</p>
      </div>`).join('');
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Die Seite von ${htmlSicher(kind.name)}</title>
${SCHRIFTEN_LINK}
<style id="kinder-code">
${css.replace(/<\/style/gi, '')}
</style>
</head>
<body>
  <div class="seite">
    <header class="kopf">
      <div class="avatar">${htmlSicher(kind.emoji)}</div>
      <h1>Hallo, ich bin ${htmlSicher(kind.name)}!</h1>
      <p class="intro">${htmlSicher(kind.intro)}</p>
      <a class="knopf" href="#">👋 Sag Hallo</a>
    </header>
    <section class="karten">${karten}
    </section>
    <footer>Gemacht am Zukunftstag ${new Date().getFullYear()} · mit HTML &amp; CSS</footer>
  </div>
</body>
</html>`;
}

function ladeVorschau() {
  frame.onload = () => {
    aktualisiereVorschauCss();
    // Klick auf den Knopf soll nichts kaputt machen
    frame.contentDocument.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      e.preventDefault();
      a.animate([{ transform: 'scale(1)' }, { transform: 'scale(0.92)' }, { transform: 'scale(1)' }], { duration: 250 });
    });
  };
  frame.srcdoc = seitenHtml(k, k.css);
  $('#adresse').textContent = `www.${k.name.toLowerCase().replace(/[^a-z0-9äöüß]/g, '') || 'meine-seite'}.de`;
}

function aktualisiereVorschauCss() {
  const stil = frame.contentDocument && frame.contentDocument.getElementById('kinder-code');
  if (stil) stil.textContent = code.value;
}

/* Groß anschauen */
$('#btn-vollbild').onclick = () => { document.body.classList.add('vollbild'); $('#btn-vollbild-zu').hidden = false; };
$('#btn-vollbild-zu').onclick = () => { document.body.classList.remove('vollbild'); $('#btn-vollbild-zu').hidden = true; };

/* ---------------- Topbar ---------------- */

$('#btn-wechseln').onclick = () => { speichern(); kinder = laden(); zeigeStart(); };

function herunterladen() {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([seitenHtml(k, k.css)], { type: 'text/html' }));
  a.download = `webseite-${k.name.toLowerCase().replace(/[^a-z0-9äöüß]/gi, '') || 'ich'}.html`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  zeigeToast('⬇ Deine Seite wurde heruntergeladen!');
}
$('#btn-download').onclick = herunterladen;
$('#fertig-download').onclick = herunterladen;
$('#fertig-zu').onclick = () => { $('#fertig-fenster').hidden = true; };

/* ---------------- Meine Infos ---------------- */

$('#btn-infos').onclick = () => {
  $('#info-name').value = k.name;
  $('#info-intro').value = k.intro;
  $('#info-karten').innerHTML = k.karten.map((c, i) => `
    <label class="label">Kästchen ${i + 1}</label>
    <div class="info-karte">
      <input class="eingabe info-icon" data-i="${i}" data-feld="icon" value="${htmlSicher(c.icon)}" maxlength="4">
      <input class="eingabe" data-i="${i}" data-feld="titel" value="${htmlSicher(c.titel)}" maxlength="30">
    </div>
    <input class="eingabe" data-i="${i}" data-feld="text" value="${htmlSicher(c.text)}" maxlength="90">`).join('');
  $('#infos-fenster').hidden = false;
};
$('#infos-abbrechen').onclick = () => { $('#infos-fenster').hidden = true; };
$('#infos-form').addEventListener('submit', (e) => {
  e.preventDefault();
  k.name = $('#info-name').value.trim() || k.name;
  k.intro = $('#info-intro').value.trim();
  document.querySelectorAll('#info-karten [data-i]').forEach(inp => { k.karten[inp.dataset.i][inp.dataset.feld] = inp.value; });
  $('#topbar-name').textContent = k.name;
  speichern();
  ladeVorschau();
  $('#infos-fenster').hidden = true;
});

/* ---------------- Toast ---------------- */

let toastTimer;
function zeigeToast(text) {
  const t = $('#toast');
  t.textContent = text;
  t.hidden = false;
  t.style.animation = 'none'; void t.offsetWidth; t.style.animation = '';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 3000);
}

/* ---------------- Los ---------------- */
zeigeStart();
