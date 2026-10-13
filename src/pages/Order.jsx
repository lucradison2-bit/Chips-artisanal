import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { supabase } from "../supabaseClient";
import { useApp } from "../context/AppContext";

const PHONE = "261378406247";

export default function Order() {
  const { t } = useApp();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    nom_client: "",
    telephone: "",
    adresse: "",
    produit_id: "",
    quantite: 1
  });

  useEffect(() => {
    async function loadProducts() {
      const { data } = await supabase
        .from("produits")
        .select("*")
        .eq("actif", true);

      setProducts(data || []);

      if (data && data.length > 0) {
        setForm((old) => ({ ...old, produit_id: data[0].id }));
      }
    }

    loadProducts();
  }, []);

  const product = products.find((item) => item.id === form.produit_id);
  const total = product ? product.prix * form.quantite : 0;

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function saveOrder(canal) {
    if (!product) return;

    await supabase.from("commandes").insert({
      nom_client: form.nom_client,
      telephone: form.telephone,
      adresse: form.adresse,
      produit_id: product.id,
      nom_produit: product.nom,
      quantite: Number(form.quantite),
      prix_total: total,
      canal
    });
  }

  const message = `Bonjour, je veux commander des chips banane.
Nom : ${form.nom_client}
Téléphone : ${form.telephone}
Adresse : ${form.adresse}
Produit : ${product?.nom}
Nombre : ${form.quantite}
Total : ${total} Ar`;

  return (
    <main className="order-page">
      <motion.div
        className="order-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>{t.orderTitle}</h2>
        <p>{t.orderText}</p>

        <form>
          <label>
            {t.fullName}
            <input
              name="nom_client"
              value={form.nom_client}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            {t.phone}
            <input
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            {t.address}
            <input
              name="adresse"
              value={form.adresse}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            {t.product}
            <select
              name="produit_id"
              value={form.produit_id}
              onChange={handleChange}
            >
              {products.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nom} — {item.prix} Ar
                </option>
              ))}
            </select>
          </label>

          <label>
            {t.quantity}
            <input
              type="number"
              name="quantite"
              min="1"
              value={form.quantite}
              onChange={handleChange}
              required
            />
          </label>

          <div className="total-box">
            <span>{t.total}</span>
            <strong>{total} Ar</strong>
          </div>

          <div className="order-buttons">
            <a
              className="btn whatsapp"
              href={`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => saveOrder("whatsapp")}
            >
              {t.sendWhatsapp}
            </a>

            <a
              className="btn message"
              href={`sms:${PHONE}?body=${encodeURIComponent(message)}`}
              onClick={() => saveOrder("sms")}
            >
              {t.sendSms}
            </a>

            <a
              className="btn call"
              href={`tel:+${PHONE}`}
              onClick={() => saveOrder("appel")}
            >
              {t.callOrder}
            </a>
          </div>
        </form>
      </motion.div>
    </main>
  );
      }
