const BACKEND_URL = "https://backend-snowy-sigma-85.vercel.app/api/medireach";

export async function askGemini(messages, language) {
  const res = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, language })
  });

  const data = await res.json();
  const raw = data.reply ?? "Sorry, I couldn't process that. Please try again.";

  const cleaned = raw
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s/g, '')
    .replace(/\bHOME CARE\b/g, '')
    .replace(/\bSEE A DOCTOR\b/g, '')
    .replace(/\bEMERGENCY\b/g, '')
    .trim();

  return { text: cleaned, raw };
}