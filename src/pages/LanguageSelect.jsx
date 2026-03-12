import translations from "../data/translations";

const languages = Object.entries(translations).map(([code, t]) => ({
  code,
  name: t.name
}));

export default function LanguageSelect({ onSelect }) {
  return (
    <div className="lang-page">
      <div className="lang-globe">🌍</div>
      <h1 className="lang-title">Choose Your Language</h1>
      <p className="lang-sub">Select the language you're most comfortable with</p>
      <div className="lang-grid">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className="lang-btn"
            onClick={() => onSelect(lang.code)}
          >
            <span className="lang-name">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}