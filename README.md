# Revenue Leak Audit — Justin Trent

Single-page consulting site for the Revenue Leak Audit and Hermes AI Setup offers.

## Files
- `index.html` — full page markup and copy
- `styles.css` — all styles, mobile-first
- `assets/justin.jpg` — headshot (you provide this)

## Before you deploy: add your photo
Save your headshot to:
```
C:\Users\Justin\Documents\aios-audit\assets\justin.jpg
```
Square crop recommended (the hero displays it as a 1:1 frame). Anything ~600x600px or larger works.

## Deploy to GitHub Pages

From PowerShell, in this folder:

```powershell
cd C:\Users\Justin\Documents\aios-audit
git init
git add .
git commit -m "Initial Revenue Leak Audit site"
gh repo create revenue-leak-audit --public --source=. --remote=origin --push
gh api -X POST repos/Ljjaming/revenue-leak-audit/pages -f "source[branch]=main" -f "source[path]=/"
```

The site will publish at:
```
https://ljjaming.github.io/revenue-leak-audit/
```

Allow 1-2 minutes for the first build. Check status:
```powershell
gh api repos/Ljjaming/revenue-leak-audit/pages
```

## Updating later

```powershell
git add .
git commit -m "Update copy"
git push
```

GitHub Pages rebuilds automatically.

## Local preview

Open `index.html` directly in a browser, or run a quick server:
```powershell
python -m http.server 8000
```
Then visit `http://localhost:8000`.
