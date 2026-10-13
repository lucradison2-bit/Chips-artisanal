import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

export default function QualityCounter() {
  const { t } = useApp();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const target = 96;
    let current = 0;

    const interval = setInterval(() => {
      current += 2;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setValue(current);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="quality-box"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <h3>{t.quality}</h3>
      <div className="quality-number">{value}%</div>

      <div className="quality-bar">
        <motion.div
          className="quality-fill"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
        ></motion.div>
      </div>
    </motion.div>
  );
      }
