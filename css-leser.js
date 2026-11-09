/* =========================================================
   CSS-LESER – liest den Code der Kinder wirklich:
   1. färbt ihn ein (wie in einem echten Code-Editor)
   2. findet Fehler und erklärt sie kindgerecht
   3. prüft, welche Schritte geschafft sind
   ========================================================= */

function htmlSicher(text) {
  return String(text ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ---------------- 1. Einfärben ---------------- */

function faerbeCss(code) {
  const teile = code.match(/\/\*[\s\S]*?(\*\/|$)|[{}:;]|[^{}:;\/]+|\//g) || [];
  let html = '', tiefe = 0, imWert = false;

  for (const t of teile) {
    const e = htmlSicher(t);
    if (t.startsWith('/*'))      html += `<span class="t-kommentar">${e}</span>`;
    else if (t === '{')        { tiefe++; imWert = false; html += `<span class="t-klammer">{</span>`; }
    else if (t === '}')        { tiefe = Math.max(0, tiefe - 1); imWert = false; html += `<span class="t-klammer">}</span>`; }
    else if (t === ';')        { imWert = false; html += `<span class="t-zeichen">;</span>`; }
    else if (t === ':' && tiefe > 0 && !imWert) { imWert = true; html += `<span class="t-zeichen">:</span>`; }
    else if (tiefe === 0)        html += `<span class="t-selektor">${e}</span>`;
    else if (imWert)             html += `<span class="t-wert">${e}</span>`;
    else                         html += `<span class="t-eigenschaft">${e}</span>`;
  }
  return html;
}

/* ---------------- 2. Lesen & Fehler finden ---------------- */

/**
 * Liest CSS-Code und gibt zurück:
 *  regeln: [{ selektoren: ['.karte'], eigenschaften: [{ name, wert, gueltig, zeile }] }]
 *  fehler: [{ zeile, text }]
 */
function leseCss(code) {
  const regeln = [], fehler = [];
  let i = 0, zeile = 1;
  const n = code.length;

  const weiter = () => { if (code[i] === '\n') zeile++; i++; };

  while (i < n) {
    // Kommentare überspringen
    if (code.startsWith('/*', i)) {
      const ende = code.indexOf('*/', i + 2);
      const bis = ende === -1 ? n : ende + 2;
      while (i < bis) weiter();
      continue;
    }

    // ---- außerhalb: Selektor lesen bis {
    let selektor = '', selektorZeile = zeile;
    while (i < n && code[i] !== '{' && code[i] !== '}') {
      if (code.startsWith('/*', i)) break;
      if (!selektor.trim()) selektorZeile = zeile;
      selektor += code[i]; weiter();
    }
    if (code.startsWith('/*', i)) continue;
    if (i >= n) {
      if (selektor.trim()) fehler.push({ zeile: selektorZeile, text: `Nach „${selektor.trim()}“ fehlt eine öffnende Klammer {` });
      break;
    }
    if (code[i] === '}') {
      fehler.push({ zeile, text: 'Hier ist eine schließende Klammer } zu viel.' });
      weiter();
      continue;
    }

    // jetzt steht i auf {
    const klammerZeile = zeile;
    weiter();
    selektor = selektor.trim();

    // @media, @keyframes usw. – für Profis: einfach überspringen
    if (selektor.startsWith('@')) {
      let tiefe = 1;
      while (i < n && tiefe > 0) { if (code[i] === '{') tiefe++; if (code[i] === '}') tiefe--; weiter(); }
      if (tiefe > 0) fehler.push({ zeile: klammerZeile, text: 'Am Ende fehlt eine schließende Klammer }' });
      continue;
    }

    if (!selektor) fehler.push({ zeile: klammerZeile, text: 'Vor der Klammer { muss stehen, WAS du gestalten willst – zum Beispiel h1 oder .karte' });

    const regel = { selektoren: selektor.split(',').map(normalSelektor).filter(Boolean), eigenschaften: [] };
    regeln.push(regel);

    // ---- innen: Eigenschaften lesen bis }
    let geschlossen = false;
    while (i < n) {
      let text = '', start = zeile, hatInhalt = false;
      while (i < n && code[i] !== ';' && code[i] !== '}' && code[i] !== '{') {
        if (code.startsWith('/*', i)) {
          const ende = code.indexOf('*/', i + 2);
          const bis = ende === -1 ? n : ende + 2;
          while (i < bis) weiter();
          continue;
        }
        if (!hatInhalt && code[i].trim()) { start = zeile; hatInhalt = true; }
        text += code[i]; weiter();
      }

      if (text.trim()) pruefeEigenschaft(text, start, regel, fehler);

      if (i >= n) break;
      if (code[i] === '{') {
        fehler.push({ zeile, text: 'Hier fehlt vorher eine schließende Klammer }' });
        geschlossen = true;   // so tun, als wäre die Regel zu – damit es weitergeht
        // zurück zum Selektor-Lesen: den bisherigen Text als neuen Selektor nehmen ist zu kompliziert,
        // also überspringen wir den Block
        let tiefe = 0;
        while (i < n) { if (code[i] === '{') tiefe++; if (code[i] === '}') { tiefe--; if (tiefe === 0) { weiter(); break; } } weiter(); }
        break;
      }
      const zeichen = code[i];
      weiter();
      if (zeichen === '}') { geschlossen = true; break; }
    }
    if (!geschlossen) fehler.push({ zeile: klammerZeile, text: `Bei „${selektor}“ fehlt am Ende die schließende Klammer }` });
  }

  return { regeln, fehler };
}

function normalSelektor(s) {
  return s.trim().replace(/\s+/g, ' ').replace(/\s*([>+~])\s*/g, '$1').toLowerCase();
}

function pruefeEigenschaft(text, zeile, regel, fehler) {
  const roh = text.trim();
  const doppelpunkt = roh.indexOf(':');

  if (doppelpunkt === -1) {
    fehler.push({ zeile, text: `„${kurz(roh)}“ – hier fehlt ein Doppelpunkt :` });
    return;
  }

  const name = roh.slice(0, doppelpunkt).trim().toLowerCase();
  let wert = roh.slice(doppelpunkt + 1).trim();

  // Typischer Fehler: Semikolon vergessen → nächste Zeile hängt mit dran
  const zeilen = wert.split('\n');
  if (zeilen.length > 1 && zeilen.slice(1).some(z => z.includes(':'))) {
    fehler.push({ zeile, text: `Am Ende von „${name}: ${kurz(zeilen[0].trim())}“ fehlt ein Semikolon ;` });
    return;
  }

  if (!name) { fehler.push({ zeile, text: 'Vor dem Doppelpunkt : fehlt der Name der Eigenschaft.' }); return; }
  if (!wert) { fehler.push({ zeile, text: `Bei „${name}“ fehlt nach dem Doppelpunkt ein Wert.` }); return; }

  const pruefWert = wert.replace(/\s*!important\s*$/i, '');
  let gueltig = true;

  if (!name.startsWith('--')) {
    if (!CSS.supports(name, 'inherit')) {
      gueltig = false;
      fehler.push({ zeile, text: `„${name}“ kennt der Browser nicht. Ist da ein Tippfehler?` });
    } else if (!CSS.supports(name, pruefWert)) {
      gueltig = false;
      fehler.push({ zeile, text: `„${kurz(wert)}“ passt nicht zu ${name}. Schau nochmal genau hin!` });
    }
  }

  regel.eigenschaften.push({ name, wert, gueltig, zeile });
}

function kurz(t) { return t.length > 28 ? t.slice(0, 26) + '…' : t; }

/* ---------------- 3. Geschaffte Schritte ---------------- */

/** Macht aus den Regeln eine Liste "selektor|eigenschaft" (nur gültige) */
function vorhandeneEigenschaften(regeln) {
  const set = new Set();
  regeln.forEach(r => r.selektoren.forEach(sel => r.eigenschaften.forEach(e => {
    if (e.gueltig) set.add(sel + '|' + e.name);
  })));
  return set;
}

/** Welche Eigenschaften braucht eine Variante? (wird einmal aus ihrem Code gelesen) */
const benoetigtCache = new Map();
function benoetigt(code) {
  if (!benoetigtCache.has(code)) benoetigtCache.set(code, [...vorhandeneEigenschaften(leseCss(code).regeln)]);
  return benoetigtCache.get(code);
}

/** Ist ein Schritt geschafft? Ja, wenn alle Eigenschaften IRGENDEINER Variante vorkommen. */
function schrittGeschafft(schritt, vorhanden) {
  return schritt.varianten.some(v => benoetigt(v.code).every(x => vorhanden.has(x)));
}

/** Wie viel von einer Variante ist schon da? (0 bis 1) */
function variantenAnteil(variante, vorhanden) {
  const b = benoetigt(variante.code);
  return b.filter(x => vorhanden.has(x)).length / b.length;
}
