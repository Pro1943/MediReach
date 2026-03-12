import Navbar from "../components/Navbar";

export default function Home({ t, onStartChat, onChangeLang }) {
  return (
    <div className="page">
      <Navbar t={t} onChangeLang={onChangeLang} onHome={() => {}} />
      <main>
        <section className="hero">
          <div className="hero-badge">🌍 Free · Global · Always Available</div>
          <h1 className="hero-title">{t.tagline}</h1>
          <p className="hero-sub">{t.subtitle}</p>
          <button className="btn-primary" onClick={onStartChat}>
            {t.cta} →
          </button>
        </section>

        <section className="features">
          {t.features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </section>

        <section className="stats">
          <div className="stat">
            <span className="stat-num">4.5B</span>
            <span className="stat-label">People without easy doctor access</span>
          </div>
          <div className="stat">
            <span className="stat-num">12+</span>
            <span className="stat-label">Languages supported</span>
          </div>
          <div className="stat">
            <span className="stat-num">$0</span>
            <span className="stat-label">Cost forever</span>
          </div>
        </section>
      </main>
      <footer className="footer">{t.disclaimer}</footer>
    </div>
  );
}