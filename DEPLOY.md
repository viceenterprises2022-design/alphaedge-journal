# Deploying AlphaEdge Journal to Vercel via GitHub

## 1. Push to GitHub

```bash
# from the unzipped project folder
git init
git add .
git commit -m "Initial: AlphaEdge Journal design system + app kit"

# create a new repo on github.com (e.g. "alphaedge-journal"), then:
git remote add origin git@github.com:YOUR_USERNAME/alphaedge-journal.git
git branch -M main
git push -u origin main
```

## 2. Import on Vercel

1. Go to **https://vercel.com/new**
2. Click **"Import Git Repository"** → pick your new repo
3. Vercel will auto-detect this as a static site. Leave all defaults:
   - **Framework Preset:** Other
   - **Build Command:** *(blank)*
   - **Output Directory:** *(blank — uses repo root)*
4. Click **Deploy**

You'll get a URL like `alphaedge-journal.vercel.app` in ~30s.

## 3. URLs

The included `vercel.json` sets up clean routes:

| Path | Serves |
|---|---|
| `/` | App kit (`ui_kits/app/index.html`) |
| `/marketing` | Marketing site (`ui_kits/marketing/index.html`) |
| `/design-system` | README design system docs |

## 4. Future updates

Every `git push` to `main` auto-deploys. Preview deploys for PRs come for free.
