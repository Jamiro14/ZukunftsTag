/* =========================================================
   SCHRITTE – Die Lektionen. Jeder Schritt hat mehrere Designs
   (Varianten). Ein Schritt gilt als geschafft, sobald im Code
   des Kindes alle Eigenschaften einer Variante vorkommen.
   Hier kannst du Schritte ändern, ergänzen oder umsortieren.
   ========================================================= */

const SCHRITTE = [
  {
    id: 'schrift', icon: '🔤', titel: 'Schrift',
    text: 'Deine Seite sieht aus wie ein altes Schulbuch. Mit font-family bestimmst du, welche Schrift benutzt wird.',
    tipp: 'Profi-Tipp: line-height bestimmt den Abstand zwischen den Zeilen. Probier mal 2 statt 1.6!',
    varianten: [
      { name: 'Modern',   kachel: 'font-family:Inter;font-weight:700', zeichen: 'Aa',
        code: "body {\n  font-family: 'Inter', sans-serif;\n  line-height: 1.6;\n}" },
      { name: 'Rund',     kachel: 'font-family:Nunito;font-weight:800', zeichen: 'Aa',
        code: "body {\n  font-family: 'Nunito', sans-serif;\n  line-height: 1.6;\n}" },
      { name: 'Elegant',  kachel: "font-family:'Playfair Display';font-weight:700", zeichen: 'Aa',
        code: "body {\n  font-family: 'Playfair Display', serif;\n  line-height: 1.6;\n}" },
      { name: 'Computer', kachel: "font-family:'Space Mono';font-weight:700", zeichen: 'Aa',
        code: "body {\n  font-family: 'Space Mono', monospace;\n  line-height: 1.6;\n}" },
    ],
  },
  {
    id: 'hintergrund', icon: '🎨', titel: 'Hintergrund',
    text: 'Jetzt bekommt deine Seite Farbe. background ist der Hintergrund, color ist die Farbe der Schrift.',
    tipp: 'Profi-Tipp: Farben schreibt man oft als Code mit # davor. #ff0000 ist Rot – probier es aus!',
    varianten: [
      { name: 'Hell',     kachel: 'background:#f5f7fb;color:#1f2937',
        code: 'body {\n  background: #f5f7fb;\n  color: #1f2937;\n}' },
      { name: 'Lila',     kachel: 'background:linear-gradient(135deg,#e0e7ff,#fce7f3);color:#1f2937',
        code: 'body {\n  background: linear-gradient(135deg, #e0e7ff, #fce7f3);\n  color: #1f2937;\n}' },
      { name: 'Mint',     kachel: 'background:linear-gradient(135deg,#d1fae5,#e0f2fe);color:#1f2937',
        code: 'body {\n  background: linear-gradient(135deg, #d1fae5, #e0f2fe);\n  color: #1f2937;\n}' },
      { name: 'Dunkel',   kachel: 'background:#0f172a;color:#e2e8f0',
        code: 'body {\n  background: #0f172a;\n  color: #e2e8f0;\n}' },
    ],
  },
  {
    id: 'layout', icon: '📐', titel: 'Alles in die Mitte',
    text: 'Gute Webseiten haben Platz zum Atmen. Wir packen alles in die Mitte und machen Abstand zum Rand.',
    tipp: 'Profi-Tipp: max-width ist die größte Breite. Ändere 760px in 400px und schau, was passiert.',
    varianten: [
      { name: 'Schmal', kachel: 'background:linear-gradient(90deg,#e2e8f0 30%,#6366f1 30% 70%,#e2e8f0 70%)', zeichen: '',
        code: '.seite {\n  max-width: 600px;\n  margin: 0 auto;\n  padding: 60px 24px;\n}\n\n.kopf {\n  text-align: center;\n}' },
      { name: 'Normal', kachel: 'background:linear-gradient(90deg,#e2e8f0 18%,#6366f1 18% 82%,#e2e8f0 82%)', zeichen: '',
        code: '.seite {\n  max-width: 760px;\n  margin: 0 auto;\n  padding: 60px 24px;\n}\n\n.kopf {\n  text-align: center;\n}' },
      { name: 'Breit',  kachel: 'background:linear-gradient(90deg,#e2e8f0 6%,#6366f1 6% 94%,#e2e8f0 94%)', zeichen: '',
        code: '.seite {\n  max-width: 960px;\n  margin: 0 auto;\n  padding: 60px 24px;\n}\n\n.kopf {\n  text-align: center;\n}' },
    ],
  },
  {
    id: 'avatar', icon: '😀', titel: 'Profilbild',
    text: 'Dein Bild ist noch ganz klein. Wir machen es groß und geben ihm eine schöne Form.',
    tipp: 'Profi-Tipp: border-radius macht Ecken rund. 50% ist ein perfekter Kreis.',
    varianten: [
      { name: 'Kreis', kachel: 'background:#fff;border-radius:50%;box-shadow:0 6px 16px rgba(0,0,0,.15)', zeichen: '🙂',
        code: '.avatar {\n  width: 120px;\n  height: 120px;\n  margin: 0 auto;\n  display: grid;\n  place-items: center;\n  font-size: 64px;\n  background: white;\n  border-radius: 50%;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);\n}' },
      { name: 'Bunt', kachel: 'background:linear-gradient(135deg,#6366f1,#ec4899);border-radius:50%', zeichen: '🙂',
        code: '.avatar {\n  width: 120px;\n  height: 120px;\n  margin: 0 auto;\n  display: grid;\n  place-items: center;\n  font-size: 64px;\n  background: linear-gradient(135deg, #6366f1, #ec4899);\n  border-radius: 50%;\n}' },
      { name: 'Eckig', kachel: 'background:#fff;border-radius:28%;box-shadow:0 6px 16px rgba(0,0,0,.15)', zeichen: '🙂',
        code: '.avatar {\n  width: 120px;\n  height: 120px;\n  margin: 0 auto;\n  display: grid;\n  place-items: center;\n  font-size: 64px;\n  background: white;\n  border-radius: 32px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);\n}' },
      { name: 'Ring', kachel: 'background:#fff;border-radius:50%;border:4px solid #6366f1', zeichen: '🙂',
        code: '.avatar {\n  width: 120px;\n  height: 120px;\n  margin: 0 auto;\n  display: grid;\n  place-items: center;\n  font-size: 64px;\n  background: white;\n  border-radius: 50%;\n  border: 5px solid #6366f1;\n}' },
    ],
  },
  {
    id: 'titel', icon: '📰', titel: 'Überschrift',
    text: 'Die Überschrift ist das Erste, was man sieht. h1 heißt „Überschrift Nummer 1“ – die wichtigste.',
    tipp: 'Profi-Tipp: font-weight geht von 100 (ganz dünn) bis 900 (ganz dick).',
    varianten: [
      { name: 'Fett',    kachel: 'font-family:Inter;font-weight:800;color:#1f2937', zeichen: 'Hallo',
        code: 'h1 {\n  font-size: 48px;\n  font-weight: 800;\n  margin: 24px 0 8px;\n}' },
      { name: 'Farbig',  kachel: 'font-family:Inter;font-weight:800;color:#4f46e5', zeichen: 'Hallo',
        code: 'h1 {\n  font-size: 48px;\n  font-weight: 800;\n  margin: 24px 0 8px;\n  color: #4f46e5;\n}' },
      { name: 'Verlauf', kachel: 'font-family:Inter;font-weight:800;background:linear-gradient(90deg,#6366f1,#ec4899);-webkit-background-clip:text;background-clip:text;color:transparent', zeichen: 'Hallo',
        code: 'h1 {\n  font-size: 48px;\n  font-weight: 800;\n  margin: 24px 0 8px;\n  background: linear-gradient(90deg, #6366f1, #ec4899);\n  -webkit-background-clip: text;\n  color: transparent;\n}' },
      { name: 'Dünn',    kachel: 'font-family:Inter;font-weight:300;letter-spacing:-1px;color:#1f2937', zeichen: 'Hallo',
        code: 'h1 {\n  font-size: 52px;\n  font-weight: 300;\n  letter-spacing: -2px;\n  margin: 24px 0 8px;\n}' },
    ],
  },
  {
    id: 'raster', icon: '🧩', titel: 'Kästchen nebeneinander',
    text: 'Deine drei Kästchen stehen untereinander. Mit einem Grid (Raster) stellst du sie nebeneinander.',
    tipp: 'Profi-Tipp: gap ist der Abstand zwischen den Kästchen. Mach ihn mal ganz groß!',
    varianten: [
      { name: '3 nebeneinander', kachel: 'background:repeating-linear-gradient(90deg,#6366f1 0 28%,transparent 28% 36%)', zeichen: '',
        code: '.karten {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n  margin-top: 48px;\n}' },
      { name: 'Automatisch', kachel: 'background:repeating-linear-gradient(90deg,#6366f1 0 44%,transparent 44% 56%)', zeichen: '',
        code: '.karten {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n  margin-top: 48px;\n}' },
      { name: 'Untereinander', kachel: 'background:repeating-linear-gradient(180deg,#6366f1 0 26%,transparent 26% 37%)', zeichen: '',
        code: '.karten {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n  margin-top: 48px;\n}' },
    ],
  },
  {
    id: 'karte', icon: '🃏', titel: 'Kästchen-Design',
    text: 'Jetzt sehen deine Kästchen aus wie echte Karten. padding ist der Platz innen, box-shadow ist ein Schatten.',
    tipp: 'Profi-Tipp: Bei rgba(0, 0, 0, 0.08) ist die letzte Zahl, wie durchsichtig der Schatten ist.',
    varianten: [
      { name: 'Weich',  kachel: 'background:#fff;border-radius:12px;box-shadow:0 4px 14px rgba(0,0,0,.12)', zeichen: '',
        code: '.karte {\n  background: white;\n  color: #1f2937;\n  padding: 24px;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n}' },
      { name: 'Glas',   kachel: 'background:rgba(255,255,255,.5);border:1px solid #fff;border-radius:12px', zeichen: '',
        code: '.karte {\n  background: rgba(255, 255, 255, 0.5);\n  color: #1f2937;\n  backdrop-filter: blur(10px);\n  border: 1px solid white;\n  padding: 24px;\n  border-radius: 16px;\n}' },
      { name: 'Comic',  kachel: 'background:#fff;border:2px solid #1f2937;border-radius:10px;box-shadow:4px 4px 0 #1f2937', zeichen: '',
        code: '.karte {\n  background: white;\n  color: #1f2937;\n  padding: 24px;\n  border: 2px solid #1f2937;\n  border-radius: 12px;\n  box-shadow: 6px 6px 0 #1f2937;\n}' },
      { name: 'Dunkel', kachel: 'background:#1e293b;border:1px solid #334155;border-radius:12px', zeichen: '',
        code: '.karte {\n  background: #1e293b;\n  color: #e2e8f0;\n  padding: 24px;\n  border: 1px solid #334155;\n  border-radius: 16px;\n}' },
    ],
  },
  {
    id: 'knopf', icon: '🔘', titel: 'Knopf',
    text: 'Unter deinem Text steht ein Link. Wir machen daraus einen richtigen Knopf, den man gerne anklickt.',
    tipp: 'Profi-Tipp: text-decoration: none; nimmt den Unterstrich vom Link weg.',
    varianten: [
      { name: 'Pille',     kachel: 'background:#4f46e5;color:#fff;border-radius:999px;font-weight:600;font-family:Inter', zeichen: 'Klick',
        code: '.knopf {\n  display: inline-block;\n  margin-top: 24px;\n  padding: 14px 28px;\n  background: #4f46e5;\n  color: white;\n  border-radius: 999px;\n  text-decoration: none;\n  font-weight: 600;\n}' },
      { name: 'Schwarz',   kachel: 'background:#111;color:#fff;border-radius:8px;font-weight:600;font-family:Inter', zeichen: 'Klick',
        code: '.knopf {\n  display: inline-block;\n  margin-top: 24px;\n  padding: 14px 28px;\n  background: #111111;\n  color: white;\n  border-radius: 8px;\n  text-decoration: none;\n  font-weight: 600;\n}' },
      { name: 'Verlauf',   kachel: 'background:linear-gradient(90deg,#6366f1,#ec4899);color:#fff;border-radius:999px;font-weight:600;font-family:Inter', zeichen: 'Klick',
        code: '.knopf {\n  display: inline-block;\n  margin-top: 24px;\n  padding: 14px 28px;\n  background: linear-gradient(90deg, #6366f1, #ec4899);\n  color: white;\n  border-radius: 999px;\n  text-decoration: none;\n  font-weight: 600;\n}' },
      { name: 'Umrandet',  kachel: 'border:2px solid #1f2937;color:#1f2937;border-radius:999px;font-weight:600;font-family:Inter', zeichen: 'Klick',
        code: '.knopf {\n  display: inline-block;\n  margin-top: 24px;\n  padding: 12px 26px;\n  border: 2px solid currentColor;\n  color: inherit;\n  border-radius: 999px;\n  text-decoration: none;\n  font-weight: 600;\n}' },
    ],
  },
  {
    id: 'bewegung', icon: '✨', titel: 'Bewegung',
    text: 'Moderne Seiten reagieren auf die Maus. :hover bedeutet „wenn die Maus darüber ist“. Fahr danach mal über deine Kästchen!',
    tipp: 'Profi-Tipp: transition macht die Bewegung weich. 0.3s heißt 0,3 Sekunden – probier mal 2s.',
    varianten: [
      { name: 'Hochspringen', kachel: 'background:#fff;border-radius:10px;box-shadow:0 10px 18px rgba(0,0,0,.15);transform:translateY(-6px)', zeichen: '⬆',
        code: '.karte {\n  transition: transform 0.3s;\n}\n\n.karte:hover {\n  transform: translateY(-8px);\n}' },
      { name: 'Größer',       kachel: 'background:#fff;border-radius:10px;box-shadow:0 6px 14px rgba(0,0,0,.12);transform:scale(1.08)', zeichen: '⤢',
        code: '.karte {\n  transition: transform 0.3s;\n}\n\n.karte:hover {\n  transform: scale(1.05);\n}' },
      { name: 'Kippen',       kachel: 'background:#fff;border-radius:10px;box-shadow:0 6px 14px rgba(0,0,0,.12);transform:rotate(-4deg)', zeichen: '↺',
        code: '.karte {\n  transition: transform 0.3s;\n}\n\n.karte:hover {\n  transform: rotate(-2deg);\n}' },
    ],
  },
  {
    id: 'feinschliff', icon: '💎', titel: 'Feinschliff',
    text: 'Zum Schluss die kleinen Details: großer Einleitungstext, größere Bilder in den Kästchen und eine leise Fußzeile.',
    tipp: 'Profi-Tipp: opacity ist die Durchsichtigkeit. 1 = ganz sichtbar, 0 = unsichtbar.',
    varianten: [
      { name: 'Klassisch', kachel: 'background:#fff;color:#64748b;font-family:Inter', zeichen: 'Aa',
        code: '.intro {\n  font-size: 20px;\n  opacity: 0.75;\n}\n\n.karte-icon {\n  font-size: 36px;\n}\n\nfooter {\n  text-align: center;\n  margin-top: 60px;\n  opacity: 0.5;\n}' },
      { name: 'Icon-Blasen', kachel: 'background:#fff;font-family:Inter', zeichen: '🟣',
        code: '.intro {\n  font-size: 20px;\n  opacity: 0.75;\n}\n\n.karte-icon {\n  font-size: 28px;\n  width: 56px;\n  height: 56px;\n  display: grid;\n  place-items: center;\n  background: #eef2ff;\n  border-radius: 14px;\n}\n\nfooter {\n  text-align: center;\n  margin-top: 60px;\n  opacity: 0.5;\n}' },
    ],
  },
];

const START_EMOJIS = ['🦊', '🐼', '🐸', '🦄', '🐙', '🦖', '🐱', '🐶', '🤖', '👾', '🚀', '⚽', '🎮', '🎨', '🌈', '⭐'];
