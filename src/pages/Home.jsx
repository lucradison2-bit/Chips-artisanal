import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { supabase } from "../supabaseClient";
import { useApp } from "../context/AppContext";
import QualityCounter from "../components/QualityCounter";

export default function Home() {
  const { t } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await supabase
        .from("produits")
        .select("*")
        .eq("actif", true)
        .order("created_at", { ascending: false });

      setProducts(data || []);
      setLoading(false);
    }

    loadProducts();
  }, []);

  return (
    <main>
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="badge">Chips Banane</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>

          <div className="hero-buttons">
            <Link to="/commande" className="btn primary">
              {t.orderNow}
            </Link>

            <a
              className="btn whatsapp"
              href="https://wa.me/261378406247"
              target="_blank"
              rel="noreferrer"
            >
              {t.whatsapp}
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80"
            alt="Chips banane"
          />
        </motion.div>
      </section>

      <section className="ads">
        {[
          { title: t.promo, text: t.promoText },
          { title: t.fresh, text: t.freshText },
          { title: t.fast, text: t.fastText }
        ].map((ad, index) => (
          <motion.div
            className="ad-card"
            key={ad.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            <h3>{ad.title}</h3>
            <p>{ad.text}</p>
          </motion.div>
        ))}
      </section>

      <QualityCounter />

      <section className="products">
        <h2>{t.ourChips}</h2>

        {loading ? (
          <p>{t.loading}</p>
        ) : (
          <div className="product-grid">
            {products.map((item, index) => (
              <motion.article
                className="product-card"
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <img src={item.image_url} alt={item.nom} />

                <div className="product-body">
                  <span className={`taste ${item.gout}`}>
                    {item.gout === "sale" ? t.salty : t.sweet}
                  </span>

                  <h3>{item.nom}</h3>
                  <p>{item.description}</p>

                  <div className="product-footer">
                    <span className="price">{item.prix} Ar</span>
                    <Link to="/commande" className="btn small">
                      {t.order}
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
        }
