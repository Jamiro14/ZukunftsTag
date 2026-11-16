/* Triebwerk: HTML/CSS mission challenge with local progress and live preview. */
(() => {
  const KEY = 'codelab-triebwerk-v2';
  const starterHtml = `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mission Europa</title>
</head>
<body>
  <main class="site">
    <header class="hero">
      <p class="mission-tag">MISSION EUROPA · 2049</p>
      <h1>MISSIONSTITEL HIER ÄNDERN</h1>
      <p class="intro">EINLEITUNG HIER ÄNDERN</p>
      <a class="button" href="#crew">Crew kennenlernen</a>
    </header>
    <section class="crew" id="crew">
      <h2 class="crew-title">CREW-TITEL HIER ÄNDERN</h2>
      <div class="cards">
        <article class="card">
          <span class="card-number">01</span>
          <h3>Pilot*in</h3>
          <p>Findet den Weg durch das All.</p>
        </article>
        <article class="card">
          <span class="card-number">02</span>
          <h3>Biolog*in</h3>
          <p>Erforscht den Ozean unter dem Eis.</p>
        </article>
        <article class="card">
          <span class="card-number">03</span>
          <h3>Ingenieur*in</h3>
          <p>Hält das Raumschiff startklar.</p>
        </article>
      </div>
    </section>
  </main>
</body>
</html>`;
  const starterCss = `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #e9e9e4;
  color: #26352c;
  font-family: Arial, sans-serif;
}

.site {
  max-width: 760px;
  margin: 0 auto;
  padding: 32px 24px 60px;
}

.hero {
  padding: 32px;
  background-color: #ffffff;
  border: 1px solid #d5dad4;
}

.mission-tag {
  color: #64746a;
  font-size: 12px;
  letter-spacing: 2px;
}

h1 {
  margin: 12px 0;
  color: #26352c;
  font-size: 36px;
}

.intro {
  font-size: 16px;
  line-height: 1.6;
}

.button {
  display: inline-block;
  margin-top: 12px;
  padding: 10px 14px;
  background-color: #32483b;
  color: #ffffff;
  text-decoration: none;
  border-radius: 3px;
}

.crew {
  margin-top: 32px;
}

.crew-title {
  font-size: 14px;
  letter-spacing: 1px;
}

.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.card {
  padding: 14px;
  background-color: #ffffff;
  border: 1px solid #d5dad4;
  border-radius: 4px;
}

.card-number {
  color: #64746a;
  font-size: 12px;
}

/* Gilt nur auf schmalen Bildschirmen (Handy) */
@media (max-width: 480px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}`;
  const CH1 = 'Kapitel 1 · Texte';
  const CH2 = 'Kapitel 2 · Farben & Schrift';
  const CH3 = 'Kapitel 3 · Karten & Layout';
  const CH4 = 'Kapitel 4 · Handy';
  const missions = [
    {
      chapter: CH1, file: 'html', title: 'Gib deiner Mission einen Namen',
      text: 'Ganz oben auf der Seite steht noch ein Platzhalter. Ersetze ihn durch einen eigenen Titel.',
      find: '<h1>MISSIONSTITEL HIER ÄNDERN</h1>',
      example: '<h1>Reise zum Eismond</h1>',
      concept: '<h1> ist die wichtigste Überschrift einer Seite. Der Text steht zwischen dem Start-Tag <h1> und dem End-Tag </h1>.',
      hint: 'Lösche nur die Großbuchstaben. <h1> und </h1> müssen stehen bleiben.',
      locate: ['<h1'],
      check: (parsed) => isEditedText(parsed.querySelector('h1'), 'MISSIONSTITEL HIER ÄNDERN')
    },
    {
      chapter: CH1, file: 'html', title: 'Schreib eine Einleitung',
      text: 'Direkt unter dem Titel steht ein zweiter Platzhalter. Erkläre dort in einem Satz, worum es bei deiner Mission geht.',
      find: '<p class="intro">EINLEITUNG HIER ÄNDERN</p>',
      example: '<p class="intro">Wir fliegen zum Mond Europa und suchen Leben unter dem Eis.</p>',
      concept: '<p> steht für „paragraph“, also einen Textabsatz.',
      hint: 'Achte darauf, dass </p> am Ende stehen bleibt.',
      locate: ['class="intro"'],
      check: (parsed) => isEditedText(parsed.querySelector('.intro'), 'EINLEITUNG HIER ÄNDERN')
    },
    {
      chapter: CH1, file: 'html', title: 'Gib deiner Crew einen Namen',
      text: 'Weiter unten beginnt der Bereich mit deiner Crew. Auch seine Überschrift ist noch ein Platzhalter.',
      find: '<h2 class="crew-title">CREW-TITEL HIER ÄNDERN</h2>',
      example: '<h2 class="crew-title">Team Eisbrecher</h2>',
      concept: '<h2> ist die Überschrift für einen Abschnitt – eine Stufe kleiner als <h1>.',
      hint: 'Ideen: Team Europa, Die Eis-Entdecker, Crew Polarstern.',
      locate: ['class="crew-title"'],
      check: (parsed) => isEditedText(parsed.querySelector('.crew-title'), 'CREW-TITEL HIER ÄNDERN')
    },
    {
      chapter: CH1, file: 'html', title: 'Ein Abzeichen für die Pilotin',
      text: 'Jede Crew-Karte hat oben eine Nummer. Ersetze in der ersten Karte die 01 durch ein Emoji.',
      find: '<span class="card-number">01</span>',
      example: '<span class="card-number">🚀</span>',
      concept: '<span> markiert ein kleines Stück Text. Später kann man es mit CSS gestalten.',
      hint: 'Emoji-Auswahl öffnen: Windows-Taste + Punkt, am Mac Ctrl + Cmd + Leertaste. Oder schreib ein Wort wie CAPTAIN.',
      locate: ['class="card-number"'],
      check: (parsed) => isEditedText(parsed.querySelector('.card-number'), '01')
    },
    {
      chapter: CH2, file: 'css', title: 'Neue Hintergrundfarbe',
      text: 'Jetzt kommt CSS: Damit bestimmst du, wie die Seite aussieht. Ändere in der Regel body die Hintergrundfarbe der ganzen Seite.',
      find: 'body {\n  …\n  background-color: #e9e9e4;',
      example: 'background-color: lightblue;',
      concept: 'body ist die ganze Seite. Jede CSS-Zeile hat eine Eigenschaft, einen Doppelpunkt, einen Wert und am Ende ein Semikolon ;',
      hint: 'Farbnamen wie lightblue, pink oder lavender funktionieren. Profis nutzen Codes wie #cde8ff.',
      locate: ['body {', 'background-color'],
      check: (parsed, rules) => changedValue(rules, 'body', 'background-color', ['#e9e9e4', 'rgb(233, 233, 228)'])
    },
    {
      chapter: CH2, file: 'css', title: 'Eine andere Schrift',
      text: 'Bleib in der Regel body. Zwei Zeilen weiter unten steht die Schriftart. Tausche sie aus.',
      find: 'font-family: Arial, sans-serif;',
      example: 'font-family: Georgia, serif;',
      concept: 'font-family wählt die Schriftart. Gibt es die erste Schrift nicht, nimmt der Browser die nächste.',
      hint: 'Probiere Georgia, Verdana, "Courier New" oder monospace.',
      locate: ['body {', 'font-family'],
      check: (parsed, rules) => changedValue(rules, 'body', 'font-family', ['arial, sans-serif'])
    },
    {
      chapter: CH2, file: 'css', title: 'Farbe für den Kopfbereich',
      text: 'Der weiße Kasten oben mit deinem Titel heißt im Code .hero. Gib ihm eine eigene Farbe.',
      find: '.hero {\n  …\n  background-color: #ffffff;',
      example: 'background-color: lavender;',
      concept: 'Der Punkt vor einem Namen bedeutet: Diese Regel gilt für alles, was im HTML class="hero" hat.',
      hint: 'Nimm eine helle Farbe, damit der dunkle Text lesbar bleibt – z. B. lavender oder #fff4d6.',
      locate: ['.hero {', 'background-color'],
      check: (parsed, rules) => changedValue(rules, '.hero', 'background-color', ['#ffffff', '#fff', 'white', 'rgb(255, 255, 255)'])
    },
    {
      chapter: CH2, file: 'css', title: 'Größere Überschrift',
      text: 'Dein Titel soll sofort auffallen. Ändere in der Regel h1 die Schriftgröße auf mindestens 48px.',
      find: 'h1 {\n  …\n  font-size: 36px;',
      example: 'font-size: 56px;',
      concept: 'font-size ist die Textgröße. px steht für Pixel und kommt direkt hinter die Zahl – ohne Leerzeichen.',
      hint: 'Ändere nur die Zahl 36. Sie muss mindestens 48 sein.',
      locate: ['h1 {', 'font-size'],
      check: (parsed, rules) => declarations(rules, 'h1').some((style) => parseFloat(style.getPropertyValue('font-size')) >= 48)
    },
    {
      chapter: CH2, file: 'css', title: 'Knopf in Farbe',
      text: 'Der Knopf „Crew kennenlernen“ ist noch dunkelgrün. Gib ihm in der Regel .button eine kräftige Farbe.',
      find: '.button {\n  …\n  background-color: #32483b;',
      example: 'background-color: tomato;',
      concept: '.button passt zum Link mit class="button" im HTML. So gestaltest du genau diesen Knopf.',
      hint: 'Die Schrift auf dem Knopf ist weiß. Kräftige Farben wie tomato, royalblue oder darkorange passen gut.',
      locate: ['.button {', 'background-color'],
      check: (parsed, rules) => changedValue(rules, '.button', 'background-color', ['#32483b', 'rgb(50, 72, 59)'])
    },
    {
      chapter: CH3, file: 'css', title: 'Runde Ecken',
      text: 'Die Crew-Karten sind fast eckig. Mach ihre Ecken in der Regel .card runder.',
      find: '.card {\n  …\n  border-radius: 4px;',
      example: 'border-radius: 16px;',
      concept: 'border-radius rundet die Ecken ab. Je größer die Zahl, desto runder.',
      hint: 'Mindestens 12px. Bei 16px oder 20px sieht man es deutlich.',
      locate: ['.card {', 'border-radius'],
      check: (parsed, rules) => declarations(rules, '.card').some((style) => parseFloat(style.getPropertyValue('border-radius')) >= 12)
    },
    {
      chapter: CH3, file: 'css', title: 'Karten nebeneinander',
      text: 'Die drei Karten stehen untereinander. Stell sie in der Regel .cards in drei Spalten nebeneinander.',
      find: '.cards {\n  …\n  grid-template-columns: 1fr;',
      example: 'grid-template-columns: repeat(3, 1fr);',
      concept: 'Grid ist ein Raster. 1fr ist eine Spalte. repeat(3, 1fr) heißt: drei gleich breite Spalten.',
      hint: 'Ändere die .cards-Regel weiter oben, nicht die ganz unten bei @media.',
      locate: ['.cards {', 'grid-template-columns'],
      check: (parsed, rules) => rules.some((rule) => !rule.inMedia && matchesSelector(rule, '.cards') && /^(repeat\(3,1fr\)|1fr1fr1fr)$/.test(rule.style.getPropertyValue('grid-template-columns').replace(/\s/g, '')))
    },
    {
      chapter: CH3, file: 'css', title: 'Mehr Abstand',
      text: 'Die Karten kleben fast aneinander. Vergrößere in derselben Regel .cards den Abstand gap.',
      find: 'gap: 10px;',
      example: 'gap: 20px;',
      concept: 'gap ist der Zwischenraum zwischen den Spalten eines Rasters.',
      hint: 'Mindestens 16px.',
      locate: ['.cards {', 'gap'],
      check: (parsed, rules) => declarations(rules, '.cards').some((style) => parseFloat(style.getPropertyValue('gap')) >= 16)
    },
    {
      chapter: CH3, file: 'css', title: 'Mehr Platz für alles',
      text: 'Die ganze Seite ist ziemlich schmal. Erlaube ihr in der Regel .site, breiter zu werden.',
      find: '.site {\n  max-width: 760px;',
      example: 'max-width: 1000px;',
      concept: 'max-width ist die größte erlaubte Breite. margin: 0 auto hält die Seite dabei in der Mitte.',
      hint: 'Nimm eine Zahl größer als 760. Ist deine Vorschau schmal, siehst du den Unterschied erst in einem breiten Fenster.',
      locate: ['.site {', 'max-width'],
      check: (parsed, rules) => declarations(rules, '.site').some((style) => parseFloat(style.getPropertyValue('max-width')) > 760)
    },
    {
      chapter: CH4, file: 'css', title: 'Handy-Ansicht reparieren',
      text: 'Klick oben in der Vorschau auf „Handy“. Die Karten sind dort viel zu eng! Ganz unten in style.css steht eine Regel nur für Handys. Mach dort aus drei Spalten eine.',
      find: '@media (max-width: 480px) {\n  .cards {\n    grid-template-columns: repeat(3, 1fr);',
      example: 'grid-template-columns: 1fr;',
      concept: '@media heißt: Diese Regeln gelten nur, wenn der Bildschirm schmal ist – hier höchstens 480px.',
      hint: 'Ändere nur den Wert innerhalb von @media. 1fr bedeutet: eine Spalte über die ganze Breite.',
      locate: ['@media', 'grid-template-columns'],
      check: (parsed, rules) => declarations(rules, '.cards', true).some((style) => /^(1fr|repeat\(1,1fr\)|100%)$/.test(style.getPropertyValue('grid-template-columns').replace(/\s/g, '')))
    }
  ];
  const bonusMissions = [
    {
      file: 'css', title: 'Lieblingsfarbe als Variable',
      text: 'Lege ganz oben in style.css eine Farbe mit eigenem Namen an. Setze sie dann an zwei Stellen ein, z. B. beim Knopf und beim Titel.',
      example: ':root {\n  --meine-farbe: tomato;\n}\n\n.button {\n  background-color: var(--meine-farbe);\n}',
      concept: 'Variablen beginnen mit zwei Bindestrichen. Mit var() setzt du sie ein. Änderst du die Farbe einmal, ändert sie sich überall.',
      hint: 'Ergänze bei h1 zum Beispiel color: var(--meine-farbe);',
      check: (parsed, rules) => {
        const root = declarations(rules, ':root').some((style) => [...style].some((property) => property.startsWith('--')));
        const uses = rules.filter((rule) => /var\(\s*--/.test(rule.style.cssText)).length;
        return root && uses >= 2;
      }
    },
    {
      file: 'html', title: 'Ein Bild einfügen',
      text: 'Füge in index.html unter deiner Einleitung ein Bild ein. Der alt-Text beschreibt, was darauf zu sehen ist.',
      example: '<img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800" alt="Die Erde aus dem All">',
      concept: 'img steht für „image“. src ist die Adresse des Bildes, alt beschreibt es für Menschen, die es nicht sehen können.',
      hint: 'Ist das Bild zu groß? Ergänze in style.css: img { width: 100%; border-radius: 16px; }',
      check: (parsed) => [...parsed.querySelectorAll('img')].some((image) => image.getAttribute('src') && image.getAttribute('alt')?.trim())
    },
    {
      file: 'css', title: 'Knopf reagiert auf die Maus',
      text: 'Lass den Knopf seine Farbe wechseln, wenn man mit der Maus darüberfährt. Schreib dafür eine neue Regel ans Ende von style.css.',
      example: '.button:hover {\n  background-color: black;\n}',
      concept: ':hover bedeutet „wenn die Maus darüber ist“.',
      hint: 'Fahr danach in der Vorschau mit der Maus über den Knopf.',
      check: (parsed, rules) => rules.some((rule) => /:hover\b/.test(rule.selector))
    }
  ];
  const $ = (selector) => document.querySelector(selector);
  const htmlField = $('#tw-html');
  const cssField = $('#tw-css');
  const frame = $('#tw-preview-frame');
  let state = loadState();
  let activeBonus = -1;
  let updateTimer;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (saved && typeof saved.html === 'string' && typeof saved.css === 'string') {
        return { html: saved.html, css: saved.css, task: Math.max(0, Math.min(missions.length - 1, saved.task || 0)), tab: saved.tab === 'css' ? 'css' : 'html' };
      }
    } catch { /* local storage unavailable */ }
    return { html: starterHtml, css: starterCss, task: 0, tab: 'html' };
  }

  function saveState() {
    state.html = htmlField.value;
    state.css = cssField.value;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* editing still works without persistence */ }
    $('#tw-save-state').textContent = 'Gespeichert';
  }

  function parseDocument() {
    const parsed = new DOMParser().parseFromString(htmlField.value, 'text/html');
    parsed.querySelectorAll('script, iframe, object, embed, base').forEach((node) => node.remove());
    parsed.querySelectorAll('*').forEach((node) => {
      [...node.attributes].forEach((attribute) => {
        if (/^on/i.test(attribute.name) || (/^(href|src|xlink:href)$/i.test(attribute.name) && /^\s*javascript:/i.test(attribute.value))) node.removeAttribute(attribute.name);
      });
    });
    return parsed;
  }

  function collectRules() {
    const style = document.createElement('style');
    style.textContent = cssField.value;
    document.head.append(style);
    const rules = [];
    const visit = (list, inMedia = false) => {
      if (!list) return;
      [...list].forEach((rule) => {
        if (rule.type === CSSRule.STYLE_RULE) rules.push({ selector: rule.selectorText.toLowerCase(), style: rule.style, inMedia });
        else if (rule.type === CSSRule.MEDIA_RULE) visit(rule.cssRules, true);
      });
    };
    try { visit(style.sheet.cssRules); } catch { /* malformed CSS remains visible in the editor */ }
    style.remove();
    return rules;
  }

  function matchesSelector(rule, selector) {
    return rule.selector.split(',').some((part) => part.trim() === selector);
  }

  function declarations(rules, selector, mediaOnly = false) {
    return rules.filter((rule) => matchesSelector(rule, selector) && (!mediaOnly || rule.inMedia)).map((rule) => rule.style);
  }

  function changedValue(rules, selector, property, defaults) {
    return declarations(rules, selector).some((style) => {
      const value = style.getPropertyValue(property).trim().toLowerCase();
      return value && !defaults.includes(value);
    });
  }

  function checkMission(index, parsed, rules) {
    return missions[index].check(parsed, rules);
  }

  function isEditedText(element, placeholder) {
    if (!element) return false;
    const text = element.textContent.trim().replace(/\s+/g, ' ').toLowerCase();
    return Boolean(text) && text !== placeholder.toLowerCase();
  }

  function checkBonus(index, parsed, rules) {
    return bonusMissions[index].check(parsed, rules);
  }

  function completedMissions(parsed, rules) {
    return missions.map((_, index) => checkMission(index, parsed, rules));
  }

  function renderSteps(done) {
    const nav = $('#tw-steps');
    nav.innerHTML = '';
    const unlocked = Math.max(0, done.lastIndexOf(true) + 1);
    missions.forEach((mission, index) => {
      if (index === 0 || missions[index - 1].chapter !== mission.chapter) {
        const heading = document.createElement('div');
        heading.className = 'tw-step-chapter';
        heading.textContent = mission.chapter;
        nav.append(heading);
      }
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tw-step' + (index === state.task && activeBonus < 0 ? ' active' : '') + (done[index] ? ' complete' : '');
      button.disabled = index > unlocked;
      button.innerHTML = `<span class="tw-step-num">${done[index] ? '✓' : index + 1}</span><span>${mission.title}</span>`;
      button.onclick = () => { state.task = index; activeBonus = -1; renderTask(); saveState(); };
      nav.append(button);
    });
  }

  function renderBonus() {
    const container = $('#tw-bonus');
    const done = completedMissions(parseDocument(), collectRules()).every(Boolean);
    container.hidden = !done;
    if (!done) return;
    const list = $('#tw-bonus-list');
    list.innerHTML = '';
    const parsed = parseDocument();
    const rules = collectRules();
    bonusMissions.forEach((mission, index) => {
      const button = document.createElement('button');
      const complete = checkBonus(index, parsed, rules);
      button.type = 'button';
      button.className = 'tw-bonus-item' + (activeBonus === index ? ' active' : '');
      button.className += complete ? ' complete' : '';
      button.innerHTML = `<span class="tw-step-num">${complete ? '✓' : '★'}</span><span>${mission.title}</span>`;
      button.onclick = () => { activeBonus = index; renderTask(); renderBonus(); };
      list.append(button);
    });
  }

  function renderTask() {
    const bonus = activeBonus >= 0;
    const task = bonus ? bonusMissions[activeBonus] : missions[state.task];
    $('#tw-task-chapter').textContent = bonus ? 'Extra-Mission' : task.chapter;
    $('#tw-task-num').textContent = bonus ? `${activeBonus + 1} von ${bonusMissions.length}` : `${state.task + 1} von ${missions.length}`;
    $('#tw-task-title').textContent = task.title;
    $('#tw-task-text').textContent = task.text;
    $('#tw-task-file').textContent = task.file === 'html' ? 'index.html' : 'style.css';
    $('#tw-find-row').hidden = !task.find;
    $('#tw-task-find').textContent = task.find || '';
    $('#tw-example-label').textContent = task.find ? '3 · Ändere, z. B.' : '2 · Schreib, z. B.';
    $('#tw-task-example').textContent = task.example;
    $('#tw-locate').hidden = !task.locate;
    $('#tw-konzept-text').textContent = task.concept;
    $('#tw-hint').textContent = task.hint;
    $('#tw-hint').hidden = true;
    $('#tw-hint-button').setAttribute('aria-expanded', 'false');
    $('#tw-hint-button').innerHTML = 'Tipp anzeigen <span>＋</span>';
    $('#tw-check-message').textContent = '';
    $('#tw-check-message').classList.remove('error');
    $('#tw-check').textContent = bonus ? 'Extra prüfen' : 'Aufgabe prüfen';
    switchTab(task.file);
    const parsed = parseDocument();
    const rules = collectRules();
    $('#tw-check-message').textContent = (bonus ? checkBonus(activeBonus, parsed, rules) : checkMission(state.task, parsed, rules)) ? '✓ Schon erledigt.' : '';
    const done = completedMissions(parsed, rules);
    renderSteps(done);
    renderBonus();
  }

  function renderProgress() {
    const done = completedMissions(parseDocument(), collectRules());
    const count = done.filter(Boolean).length;
    $('#tw-progress-fill').style.width = `${count / missions.length * 100}%`;
    $('#tw-progress-label').textContent = `${count} / ${missions.length}`;
    renderSteps(done);
    renderBonus();
  }

  function renderPreview() {
    const parsed = parseDocument();
    const style = parsed.createElement('style');
    style.textContent = cssField.value;
    parsed.head.append(style);
    frame.srcdoc = '<!doctype html>' + parsed.documentElement.outerHTML;
    const hasContent = Boolean(parsed.body.textContent.trim() || parsed.body.querySelector('img, svg, video'));
    $('#tw-preview-empty').hidden = hasContent;
  }

  function update() {
    saveState();
    renderPreview();
    renderProgress();
  }

  function scheduleUpdate() {
    $('#tw-save-state').textContent = 'Speichert …';
    clearTimeout(updateTimer);
    updateTimer = setTimeout(update, 220);
  }

  function switchTab(tab) {
    state.tab = tab;
    const htmlActive = tab === 'html';
    $('#tw-tab-html').classList.toggle('active', htmlActive);
    $('#tw-tab-css').classList.toggle('active', !htmlActive);
    $('#tw-tab-html').setAttribute('aria-selected', String(htmlActive));
    $('#tw-tab-css').setAttribute('aria-selected', String(!htmlActive));
    $('#tw-pane-html').hidden = !htmlActive;
    $('#tw-pane-css').hidden = htmlActive;
    saveState();
  }

  function formatCss(source) {
    let output = '';
    let buffer = '';
    let depth = 0;
    let grouping = 0;
    let quote = '';
    let comment = false;
    let escaped = false;
    const addLine = (text, indent = depth) => {
      if (text.trim()) output += `${'  '.repeat(Math.max(0, indent))}${text.trim()}\n`;
    };
    const formatDeclaration = (text) => {
      const colon = text.indexOf(':');
      return colon < 0 ? text.trim() : `${text.slice(0, colon).trim()}: ${text.slice(colon + 1).trim()}`;
    };
    const formatHeader = (text) => text.replace(/@media\s*\(([^)]*)\)/g, (_, condition) => `@media (${condition.replace(/:\s*/g, ': ')})`);

    for (let index = 0; index < source.length; index += 1) {
      const character = source[index];
      const next = source[index + 1];
      if (comment) {
        buffer += character;
        if (character === '*' && next === '/') { buffer += next; index += 1; comment = false; }
        continue;
      }
      if (quote) {
        buffer += character;
        if (escaped) escaped = false;
        else if (character === '\\') escaped = true;
        else if (character === quote) quote = '';
        continue;
      }
      if (character === '/' && next === '*') { buffer += '/*'; index += 1; comment = true; continue; }
      if (character === '"' || character === "'") { quote = character; buffer += character; continue; }
      if (character === '(' || character === '[') grouping += 1;
      if (character === ')' || character === ']') grouping = Math.max(0, grouping - 1);
      if (!grouping && character === '{') {
        addLine(`${formatHeader(buffer.trim())} {`);
        buffer = '';
        depth += 1;
      } else if (!grouping && character === ';') {
        addLine(`${formatDeclaration(buffer.trim())};`);
        buffer = '';
      } else if (!grouping && character === '}') {
        if (buffer.trim()) addLine(`${formatDeclaration(buffer.trim())};`);
        buffer = '';
        depth = Math.max(0, depth - 1);
        addLine('}', depth);
      } else if (/\s/.test(character)) {
        if (buffer && !buffer.endsWith(' ')) buffer += ' ';
      } else {
        buffer += character;
      }
    }
    if (buffer.trim()) addLine(depth ? formatDeclaration(buffer.trim()) : buffer.trim());
    return output.trimEnd();
  }

  function formatHtml(source) {
    const parsed = new DOMParser().parseFromString(source, 'text/html');
    const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
    const escapeText = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapeAttribute = (text) => escapeText(text).replace(/"/g, '&quot;');

    function formatNode(node, depth) {
      const indent = '  '.repeat(depth);
      if (node.nodeType === Node.COMMENT_NODE) return [`${indent}<!--${node.nodeValue}-->`];
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue.trim();
        return text ? [`${indent}${escapeText(text)}`] : [];
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return [];

      const tag = node.tagName.toLowerCase();
      const attributes = [...node.attributes].map((attribute) => attribute.value === '' ? ` ${attribute.name}` : ` ${attribute.name}="${escapeAttribute(attribute.value)}"`).join('');
      const opening = `<${tag}${attributes}>`;
      if (voidTags.has(tag)) return [`${indent}${opening}`];
      const children = [...node.childNodes];
      if (!children.length) return [`${indent}${opening}</${tag}>`];

      const hasElements = children.some((child) => child.nodeType === Node.ELEMENT_NODE);
      const hasText = children.some((child) => child.nodeType === Node.TEXT_NODE && child.nodeValue.trim());
      if (!hasElements && !children.some((child) => child.nodeType === Node.COMMENT_NODE)) {
        const text = ['style', 'script'].includes(tag) ? node.textContent.trim() : node.textContent.trim().replace(/\s+/g, ' ');
        if (!text) return [`${indent}${opening}</${tag}>`];
        const content = tag === 'style' ? `\n${'  '.repeat(depth + 1)}${formatCss(text).replace(/\n/g, `\n${'  '.repeat(depth + 1)}`)}\n${indent}` : escapeText(text);
        return [`${indent}${opening}${content}</${tag}>`];
      }
      if (hasElements && hasText) {
        const inline = node.innerHTML.trim().replace(/>\s+</g, '><');
        return [`${indent}${opening}${inline}</${tag}>`];
      }
      const childLines = children.flatMap((child) => formatNode(child, depth + 1));
      return [`${indent}${opening}`, ...childLines, `${indent}</${tag}>`];
    }

    return `<!doctype html>\n${formatNode(parsed.documentElement, 0).join('\n')}`;
  }

  [htmlField, cssField].forEach((field) => {
    field.addEventListener('input', scheduleUpdate);
    field.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      event.preventDefault();
      const start = field.selectionStart;
      field.setRangeText('  ', start, field.selectionEnd, 'end');
      field.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });

  $('#tw-tab-html').onclick = () => switchTab('html');
  $('#tw-tab-css').onclick = () => switchTab('css');
  $('#tw-format').onclick = () => {
    const field = state.tab === 'html' ? htmlField : cssField;
    const cursor = field.selectionStart;
    field.value = state.tab === 'html' ? formatHtml(field.value) : formatCss(field.value);
    field.focus();
    const position = Math.min(cursor, field.value.length);
    field.setSelectionRange(position, position);
    field.dispatchEvent(new Event('input', { bubbles: true }));
  };
  $('#tw-hint-button').onclick = () => {
    const hint = $('#tw-hint');
    hint.hidden = !hint.hidden;
    $('#tw-hint-button').setAttribute('aria-expanded', String(!hint.hidden));
    $('#tw-hint-button').innerHTML = `${hint.hidden ? 'Tipp anzeigen' : 'Tipp verbergen'} <span>${hint.hidden ? '＋' : '−'}</span>`;
  };
  $('#tw-locate').onclick = () => {
    const task = activeBonus >= 0 ? bonusMissions[activeBonus] : missions[state.task];
    if (!task.locate) return;
    switchTab(task.file);
    const field = task.file === 'html' ? htmlField : cssField;
    let position = 0;
    for (const needle of task.locate) {
      const found = field.value.indexOf(needle, position);
      if (found < 0) break;
      position = found;
    }
    const start = field.value.lastIndexOf('\n', position - 1) + 1;
    const lineEnd = field.value.indexOf('\n', position);
    field.focus();
    field.setSelectionRange(start, lineEnd < 0 ? field.value.length : lineEnd);
    const line = field.value.slice(0, start).split('\n').length - 1;
    field.scrollTop = Math.max(0, (line - 4) * (parseFloat(getComputedStyle(field).lineHeight) || 20));
  };
  const setDevice = (phone) => {
    $('#tw-preview-box').classList.toggle('phone', phone);
    $('#tw-device-desktop').classList.toggle('active', !phone);
    $('#tw-device-phone').classList.toggle('active', phone);
    $('#tw-device-desktop').setAttribute('aria-pressed', String(!phone));
    $('#tw-device-phone').setAttribute('aria-pressed', String(phone));
  };
  $('#tw-device-desktop').onclick = () => setDevice(false);
  $('#tw-device-phone').onclick = () => setDevice(true);
  $('#tw-check').onclick = () => {
    const parsed = parseDocument();
    const rules = collectRules();
    const complete = activeBonus >= 0 ? checkBonus(activeBonus, parsed, rules) : checkMission(state.task, parsed, rules);
    const message = $('#tw-check-message');
    message.classList.toggle('error', !complete);
    const last = activeBonus >= 0 || state.task === missions.length - 1;
    message.textContent = !complete ? 'Noch nicht ganz. Vergleiche deine Zeile mit dem Beispiel oben – oder öffne den Tipp.'
      : last ? '✓ Super, geschafft!' : '✓ Super, geschafft! Gleich kommt die nächste Aufgabe.';
    if (complete && activeBonus < 0 && state.task < missions.length - 1) {
      state.task += 1;
      activeBonus = -1;
      window.setTimeout(renderTask, 900);
    } else if (complete && activeBonus < 0) {
      renderBonus();
    }
    saveState();
    renderProgress();
  };
  $('#tw-reset').onclick = () => {
    if (!window.confirm('Deinen Triebwerk-Code wirklich zurücksetzen?')) return;
    state = { html: starterHtml, css: starterCss, task: 0, tab: 'html' };
    activeBonus = -1;
    htmlField.value = state.html;
    cssField.value = state.css;
    switchTab('html');
    update();
    renderTask();
  };
  $('#tw-zur-moduswahl').onclick = () => {
    $('#triebwerk').hidden = true;
    $('#moduswahl').hidden = false;
  };

  htmlField.value = state.html;
  cssField.value = state.css;
  switchTab(state.tab);
  renderTask();
  renderProgress();
  renderPreview();
  window.addEventListener('triebwerk-open', renderTask);
})();