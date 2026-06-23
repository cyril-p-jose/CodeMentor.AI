# Codementor - Polyglot Code Explorer 🚀

Codementor is a premium, client-only Single Page Application (SPA) designed to solve programming questions and compare optimal implementations in **Python**, **C**, **Java**, and **JavaScript** side-by-side. 

Equipped with time and space complexity metrics, a comparative design board, and a fully interactive browser-based JavaScript console sandbox.

---

## Key Features 🌟

- **Side-by-Side Polyglot View**: Toggle instantly between four languages for any search query.
- **Visual Design Comparison**: View a side-by-side analysis table of paradigm structures, memory mechanisms, and complexity comparisons.
- **Client-Side AI Generation**: Secure client-side connection directly to the official Google Gemini API (`gemini-2.5-flash`).
- **Interactive JS Console Emulator**: Test and run JavaScript solutions in a browser-based console terminal sandbox.
- **Precompiled Demo Mode**: Interactive demo configurations for standard queries (e.g. *Two Sum*, *Fibonacci*, *Bubble Sort*, *String Reverse*, *Prime Check*, *Binary Search*) out-of-the-box.
- **Local Persistence**: Remembers your query history (up to 15 searches) and saves settings inside `localStorage`.

---

## Quick Start 💻

### Local Preview (Zero Installation)
Since Codementor is a static client-side web application, you can run it without installing any dependencies:
1. Clone the repository.
2. Double-click `index.html` to open it in your browser.

### Local Development Server
If you'd like to serve the application on a local port, run either of these commands in the root folder:

**Using Python:**
```bash
python -m http.server 3000
```
Then visit: `http://localhost:3000`

**Using Node.js (Static Server):**
```bash
npx http-server -p 3000
```
Then visit: `http://localhost:3000`

---

## Deployment 🌐

### Deploy to GitHub Pages (Automated)
This repository includes a GitHub Action to deploy your website automatically to GitHub Pages:
1. Push this folder to a new GitHub repository.
2. Navigate to **Settings** > **Pages** in your GitHub repository.
3. Under **Build and deployment**, set the **Source** to **GitHub Actions**.
4. Push a change to your `main` branch, and the site will build and deploy automatically.

### Deploy to Vercel / Netlify / Cloudflare Pages
Simply connect your GitHub repository to your platform of choice. 
- **Build Command**: None (leave empty)
- **Output Directory**: `.` (the root folder)

---

## Configure Gemini API Key 🔑
To generate code for custom/arbitrary questions:
1. Visit [Google AI Studio](https://aistudio.google.com/) and generate a free API Key.
2. Open the **Settings** panel (gear icon) in the bottom-left of the Codementor sidebar.
3. Input your API key and click **Apply Settings**. Your key is stored securely in your browser's local storage.
