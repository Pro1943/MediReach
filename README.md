# 🩺 MediReach

Free AI health guidance for every human, everywhere — in 12 languages.

## Setup

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Add your Gemini API key to `.env`:
   ```
   VITE_GEMINI_API_KEY=your_key_here
   ```
5. Run locally:
   ```bash
   npm run dev
   ```

## Deploy to Vercel

1. Push to GitHub
2. Go to vercel.com → Import project
3. Add `VITE_GEMINI_API_KEY` in Environment Variables
4. Deploy!

## Stack

- React + Vite
- Gemini 2.0 Flash API (free via Google AI Studio)
- Deployed on Vercel

## Languages Supported

English, Hindi, Bengali, Spanish, French, Swahili, Hausa, Portuguese, Urdu, Tamil, Arabic, Filipino