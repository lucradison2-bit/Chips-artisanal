import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { lang, setLang, theme, setTheme, t } = useApp();

  return (
    <motion.header
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Link to="/" className="brand">
        <span>🍟</span>
        <span>Chips Bridgette</span>
      </Link>

      <nav>
        <Link to="/">{t.home}</Link>
        <Link to="/commande">{t.order}</Link>
        <Link to="/administration">{t.admin}</Link>
      </nav>

      <div className="navbar-controls">
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="fr">FR</option>
          <option value="mg">MG</option>
          <option value="en">EN</option>
        </select>

        <button
          className="theme-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </motion.header>
  );
                                                      }
