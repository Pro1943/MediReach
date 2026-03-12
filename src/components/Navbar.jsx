export default function Navbar({ t, onChangeLang, onHome }) {
    return (
      <nav className="navbar">
        <span className="nav-logo" onClick={onHome}>🩺 MediReach</span>
        <div className="nav-links">
          <button className="nav-lang-btn" onClick={onChangeLang}>
            🌍 {t.changeLanguage}
          </button>
        </div>
      </nav>
    );
  }