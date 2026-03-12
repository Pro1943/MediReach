import { useState, useEffect } from "react";
import translations from "./data/translations";
import LanguageSelect from "./pages/LanguageSelect";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import "./index.css";

export default function App() {
  const [lang, setLang] = useState(null);
  const [page, setPage] = useState("lang");

  useEffect(() => {
    const saved = localStorage.getItem("medireach-lang");
    if (saved && translations[saved]) {
      setLang(saved);
      setPage("home");
    }
  }, []);

  function handleLangSelect(code) {
    setLang(code);
    localStorage.setItem("medireach-lang", code);
    setPage("home");
  }

  function handleChangeLang() {
    setPage("lang");
  }

  function handleHome() {
    setPage("home");
  }

  if (page === "lang" || !lang) {
    return <LanguageSelect onSelect={handleLangSelect} />;
  }

  const t = translations[lang];

  if (page === "chat") {
    return <Chat t={t} langCode={lang} onChangeLang={handleChangeLang} onHome={handleHome} />;
  }

  return <Home t={t} onStartChat={() => setPage("chat")} onChangeLang={handleChangeLang} />;
}