# Imagine Technologies Website — Vercel Deployment Guide

## Project Structure
```
imagine-tech/
├── api/
│   └── contact.js       ← Serverless function (sends email on form submit)
├── public/
│   └── index.html       ← Your website
├── package.json
├── vercel.json
└── README.md
```

---

## Step 1 — Get a Gmail App Password (one-time setup)

You need a Gmail account to act as the **sender** (e.g. a dedicated `noreply@gmail.com`, or your own Gmail). Emails will arrive at `acharan@theimaginetechnologies.com`.

1. Go to your Google Account → **Security**
2. Enable **2-Step Verification** (required)
3. Go to **App Passwords** → Select app: "Mail" → Select device: "Other" → name it "Imagine Tech"
4. Google gives you a **16-character password** — copy it, you'll need it in Step 3

---

## Step 2 — Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. From the `imagine-tech/` folder:
   ```bash
   vercel
   ```
   Follow the prompts — choose your account, name the project `imagine-technologies`, and deploy.

---

## Step 3 — Set Environment Variables in Vercel

Go to your Vercel dashboard → Project → **Settings → Environment Variables** and add:

| Variable Name         | Value                          |
|-----------------------|-------------------------------|
| `SENDER_EMAIL`        | your Gmail address (e.g. `yourname@gmail.com`) |
| `SENDER_APP_PASSWORD` | the 16-char App Password from Step 1 |

Then redeploy:
```bash
vercel --prod
```

---

## How it works

- Visitor fills the form and clicks **Book Free Consultation**
- Browser sends a `POST` to `/api/contact`
- Vercel serverless function receives the data
- Nodemailer sends a formatted email to `acharan@theimaginetechnologies.com`
- Visitor sees a success message on screen

---

## Local Testing (optional)

Create a `.env.local` file in the project root:
```
SENDER_EMAIL=yourname@gmail.com
SENDER_APP_PASSWORD=your16charpassword
```

Then run:
```bash
npm install
vercel dev
```

Visit `http://localhost:3000` to test the form locally.
