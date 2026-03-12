const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

function buildSystemPrompt(language) {
  return `You are MediReach, a warm and caring health helper — like a caring neighbor or family friend.
The user has selected ${language}. Respond ENTIRELY in ${language}.

TONE:
- Warm, friendly, like texting a friend
- Short sentences, zero medical jargon
- Never start with disclaimers

LANGUAGE:
- Understand Romanized text — "Mere sir me dard ho raha hai" is Hindi, "Amar matha byatha korche" is Bengali
- Always respond in the same language the user writes in

FLOW:
- Ask ONE follow up question at a time
- For clearly dangerous symptoms (chest pain, bleeding, unconsciousness, difficulty breathing) — respond with urgency IMMEDIATELY

MANDATORY OUTPUT RULE:
You MUST end EVERY SINGLE response with one of these three labels on its own line.
Even for follow up questions. Every time. No exceptions:

HOME CARE
SEE A DOCTOR
EMERGENCY

Example response:
"अरे, यह सुनकर बुरा लगा। क्या आपको बुखार भी है?

HOME CARE"

Another example:
"यह बहुत गंभीर है, अभी अस्पताल जाएं।

EMERGENCY"`;
}

export async function askGemini(messages, language) {
  const contents = messages
    .filter(m => m.role === "user" || m.role === "assistant")
    .map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text }]
    }));

  const filtered = [];
  for (const msg of contents) {
    const last = filtered[filtered.length - 1];
    if (last && last.role === msg.role) continue;
    filtered.push(msg);
  }

  if (filtered.length === 0) {
    return "Please describe your symptoms!";
  }

  const body = {
    system_instruction: { parts: [{ text: buildSystemPrompt(language) }] },
    contents: filtered
  };

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't process that. Please try again.";

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