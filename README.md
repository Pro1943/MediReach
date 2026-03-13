# 🩺 MediReach
### Healthcare Guidance for Every Human, Everywhere

![MediReach](https://img.shields.io/badge/MediReach-Live-brightgreen) ![Languages](https://img.shields.io/badge/Languages-12-blue) ![Cost](https://img.shields.io/badge/Cost-Free-teal)

🌐 **Live App:** [MediReach](https://medireach12.netlify.app)

---

## 🌍 What is MediReach?

4.5 billion people worldwide lack access to basic healthcare. In rural villages, low-income communities, and underserved regions across the globe, people turn to guesswork when they're sick — because a doctor is either too far, too expensive, or simply not available.

**MediReach** is a free AI-powered health triage assistant that helps anyone understand their symptoms, assess urgency, and know what to do next — in their own language, on any device.

---

## ✨ Features

- 🌍 **12 Languages** — English, Hindi, Bengali, Spanish, French, Swahili, Hausa, Portuguese, Urdu, Tamil, Arabic, Filipino
- 💬 **Hinglish & Benglish Support** — Understands Romanized regional languages (e.g. "Mere sir me dard ho raha hai")
- 🚦 **Smart Urgency System** — Automatically detects and displays Home Care, See a Doctor, or Emergency status
- 📱 **Mobile-First** — Designed for low-bandwidth devices
- 🔒 **Secure Backend** — API keys never exposed to the client
- 💚 **Always Free** — No insurance, no appointments, no cost

---

## 🌱 Why This Matters

> "The best time to build tools for the underserved was yesterday. The second best time is now."

MediReach was built for the person in rural Bihar who can't afford a doctor. For the mother in Lagos who doesn't know if her child's fever is serious. For the farmer in Bangladesh who has no clinic nearby.

It speaks their language. It talks like a friend. And it tells them exactly what to do.

---

## 🚦 How the Urgency System Works

| Badge | Meaning | Example Trigger |
|-------|---------|----------------|
| 🟢 Home Care | Rest, fluids, home remedies | Mild cold, minor headache |
| 🟡 See a Doctor | Visit a clinic within 1-3 days | Persistent fever, infection signs |
| 🔴 Emergency | Go to hospital immediately | Chest pain, difficulty breathing, heavy bleeding |

Once a higher urgency is detected it never downgrades — keeping users safe.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| AI Model | Gemini 3.1 Flash Lite (Google AI) |
| Backend | Next.js API Routes (Vercel) |
| Deployment | Netlify (frontend) + Vercel (backend) |
| Security | CORS origin verification, rate limiting, server-side API keys |

---

## 🏗️ Architecture
```
User → Netlify (React Frontend)
          ↓
     Vercel Backend (Next.js API)
          ↓
     Google Gemini AI
```

API keys are stored exclusively on the server. The frontend never touches them.

---
## 🤖 AI Stack

### Models
| Model | Provider | Purpose |
|-------|---------|---------|
| Gemini 3.1 Flash Lite | Google AI | Core health triage conversations |

### AI-Native Development Tools
| Tool | Purpose |
|------|---------|
| Claude (Anthropic) | Primary development assistant — architecture, debugging, prompt engineering |
| Google AI Studio | API key management, model testing and quota monitoring |

### How AI Accelerated This Build
- **Claude** was used throughout the entire development process — from initial architecture decisions to debugging complex multilingual badge detection logic
- **Prompt engineering** was iteratively refined with Claude to make Gemini respond warmly, simply, and always output structured triage labels
- **Google AI Studio** was used to test model responses and monitor API usage in real time

### Key AI Design Decisions
- Gemini was chosen for its **multilingual capabilities** and **free tier availability** — critical for a tool targeting underserved communities
- The system prompt was engineered to force **simple language** (10-year-old reading level) across all 12 supported languages
- Romanized language detection (Hinglish, Benglish) was added after recognizing that target users rarely type in native scripts

---

## 👨‍💻 Built By

**Pro 1943** — [@pro1943](https://github.com/pro1943)

Built with 💚 for the GenAI Devs Hackathon 2025

---

## ⚠️ Disclaimer

MediReach is not a substitute for professional medical advice. Always consult a real doctor when possible. In a life-threatening emergency, call your local emergency services immediately.

---