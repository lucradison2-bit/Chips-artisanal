import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

const PHONE = "261378406247";
const PHONE_DISPLAY = "+261 37 84 062 47";
const OWNER = "Bridgette Kalozandry";

export default function Footer() {
  const { t } = useApp();

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2>{OWNER}</h2>
      <p>
        <a href={`tel:+${PHONE}`}>{PHONE_DISPLAY}</a>
      </p>

      <div className="footer-buttons">
        <a
          className="btn whatsapp"
          href={`https://wa.me/${PHONE}`}
          target="_blank"
          rel="noreferrer"
        >
          {t.whatsapp}
        </a>

        <a className="btn message" href={`sms:${PHONE}`}>
          {t.message}
        </a>

        <a className="btn call" href={`tel:+${PHONE}`}>
          {t.call}
        </a>
      </div>

      <p className="copyright">
        © {new Date().getFullYear()} Chips Bridgette
      </p>
    </motion.footer>
  );
}
