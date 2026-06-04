# AIOS Audit — Justin Trent

Single-page consulting site for the AIOS Audit and Hermes AI Setup offers.

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
git commit -m "Initial AIOS Audit site"
gh repo create aios-audit --public --source=. --remote=origin --push
gh api -X POST repos/Ljjaming/aios-audit/pages -f "source[branch]=main" -f "source[path]=/"
```

The site will publish at:
```
https://ljjaming.github.io/aios-audit/
```

Allow 1-2 minutes for the first build. Check status:
```powershell
gh api repos/Ljjaming/aios-audit/pages
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
