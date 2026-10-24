# זקופה מול הסופה

משחק קהל אינטראקטיבי בדפדפן — שני צוותים, קלפים מתהפכים, טיימר וצלילים.

## הפעלה

פתיחה ישירה של `index.html` בדפדפן, או דרך שרת מקומי:

```bash
python3 -m http.server 8000
# ואז: http://localhost:8000
```

> הצלילים דורשים אינטראקציה ראשונה של המשתמש בדף (מגבלת דפדפנים).

## מבנה

- `index.html` — כל המשחק (HTML + CSS + JS בקובץ אחד)
- `intro-*.png`, `title-logo.png`, `question-panel.png` — מסכי פתיחה ורקעים
- `card-*.png`, `icon-*.png` — קלפים ואייקונים
- `team-*.png`, `timer-*.png`, `star-badge.png`, `*-particle.png` — צוותים, טיימר ואפקטים
- `sfx-*.mp3` — צלילים
