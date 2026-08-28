# 🚀 How to Deploy Your Random Tech Joke Worker (Baby Steps Guide)

Follow these simple, easy steps to launch your free Cloudflare Worker. Once launched, your GitHub README will display a completely new, non-repeating tech joke every single time someone views or refreshes your profile!

---

### Step 1: Open PowerShell or Terminal in this folder
Open your terminal inside:
```powershell
cd "C:\Users\Public\Downloads\chrome downloads\acro readme"
```

---

### Step 2: Log in to Cloudflare (One-time only)
Run this command:
```powershell
npx wrangler login
```
- A browser window will pop up asking you to log in or authorize your Cloudflare account.
- Click **"Allow"**.
- Your terminal will say: `Successfully logged in`.

---

### Step 3: Deploy the Worker
Run this single command:
```powershell
npx wrangler deploy
```
Wrangler will upload your `worker.js` and print your live URL:
```text
Uploaded acro-jokes-worker (X.XX sec)
Deployed acro-jokes-worker triggers
  https://acro-jokes-worker.<your-cloudflare-subdomain>.workers.dev
```

---

### Step 4: Add Your Live URL to `README.md`
Open `README.md` and find the **RANDOM TECH JOKE SECTION** (around line 52):
Change:
```markdown
<!-- RANDOM TECH JOKE SECTION -->
<p align="center">
  <img src="assets/tech_joke.svg" alt="Random Tech Joke" width="100%" style="max-width: 680px;" />
</p>
```
To your live worker URL:
```markdown
<!-- RANDOM TECH JOKE SECTION -->
<p align="center">
  <img src="https://acro-jokes-worker.<your-subdomain>.workers.dev" alt="Random Tech Joke" width="100%" style="max-width: 680px;" />
</p>
```

Commit & push:
```powershell
git add README.md
git commit -m "Connect live dynamic joke worker"
git push origin main
```

---

### Alternative (No Terminal / Browser Dashboard Method):
If you prefer not to use the terminal:
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Workers & Pages** ➔ **Create application** ➔ **Create Worker**.
3. Name it `acro-jokes-worker` and click **Deploy**.
4. Click **Edit code**, delete whatever is in the editor, and paste the exact code from [`worker.js`](worker.js).
5. Click **Deploy**.
6. Copy the worker URL and paste it into `README.md`!
