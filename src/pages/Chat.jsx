import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { askGemini } from "../hooks/useGemini";

function getBadge(text, badges) {
  const lines = text.toUpperCase().split("\n");
  if (lines.some(l => l.trim() === "EMERGENCY")) return { label: badges.emergency, cls: "badge-red" };
  if (lines.some(l => l.trim() === "SEE A DOCTOR")) return { label: badges.doctor, cls: "badge-yellow" };
  if (lines.some(l => l.trim() === "HOME CARE")) return { label: badges.home, cls: "badge-green" };
  return null;
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const URGENCY_RANK = { "badge-red": 3, "badge-yellow": 2, "badge-green": 1 };

export default function Chat({ t, langCode, onChangeLang, onHome }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: t.welcomeMessage, time: new Date(), isWelcome: true }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentBadge, setCurrentBadge] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    const userMsg = { role: "user", text: trimmed, time: new Date() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    try {
      const { text: reply, raw } = await askGemini(updated, t.name);
      const newMsg = { role: "assistant", text: reply, time: new Date(), isWelcome: false };
      const detected = getBadge(raw, t.badges);
      if (detected) {
        const newRank = URGENCY_RANK[detected.cls] ?? 0;
        const oldRank = URGENCY_RANK[currentBadge?.cls] ?? 0;
        if (newRank > oldRank) setCurrentBadge(detected);
      }
      setMessages([...updated, newMsg]);
    } catch {
      setMessages([...updated, { role: "assistant", text: "Something went wrong. Please check your connection and try again.", time: new Date(), isWelcome: false }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="chat-page">
      <Navbar t={t} onChangeLang={onChangeLang} onHome={onHome} />
      <div className="chat-header-bar">
        <span className="chat-title">🩺 {t.chatHeader}</span>
        <span className="online-dot">● {t.online}</span>
      </div>

      {currentBadge && (
        <div className={`sticky-badge ${currentBadge.cls}`}>
          {currentBadge.label}
        </div>
      )}

      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`msg-row ${msg.role === "user" ? "msg-user" : "msg-ai"}`}>
            <div className={`bubble ${msg.role === "user" ? "bubble-user" : "bubble-ai"}`}>
              <p>{msg.text}</p>
              <span className="msg-time">{formatTime(msg.time)}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="msg-row msg-ai">
            <div className="bubble bubble-ai thinking">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="thinking-text">{t.thinking}</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-bar">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={t.placeholder}
          disabled={loading}
        />
        <button className="send-btn" onClick={sendMessage} disabled={loading}>
          {t.send}
        </button>
      </div>
      <div className="chat-disclaimer">{t.disclaimer}</div>
    </div>
  );
}