import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useApp } from "../context/AppContext";

export default function Admin() {
  const { t } = useApp();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    nom: "",
    gout: "sale",
    prix: "",
    image_url: "",
    description: ""
  });

  useEffect(() => {
    checkUser();
    loadProducts();
    loadOrders();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) navigate("/administration");
  }

  async function loadProducts() {
    const { data } = await supabase
      .from("produits")
      .select("*")
      .order("created_at", { ascending: false });

    setProducts(data || []);
  }

  async function loadOrders() {
    const { data } = await supabase
      .from("commandes")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders(data || []);
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const productData = {
      nom: form.nom,
      gout: form.gout,
      prix: Number(form.prix),
      image_url: form.image_url,
      description: form.description
    };

    if (editingId) {
      await supabase.from("produits").update(productData).eq("id", editingId);
    } else {
      await supabase.from("produits").insert(productData);
    }

    setForm({
      nom: "",
      gout: "sale",
      prix: "",
      image_url: "",
      description: ""
    });

    setEditingId(null);
    loadProducts();
  }

  function editProduct(item) {
    setEditingId(item.id);
    setForm({
      nom: item.nom,
      gout: item.gout,
      prix: item.prix,
      image_url: item.image_url,
      description: item.description
    });
  }

  async function deleteProduct(id) {
    await supabase.from("produits").delete().eq("id", id);
    loadProducts();
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/administration");
  }

  return (
    <main className="admin-page">
      <div className="admin-header">
        <h2>{t.admin}</h2>
        <button className="btn message" onClick={logout}>
          {t.logout}
        </button>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{editingId ? t.update : t.addProduct}</h3>

        <label>
          {t.productName}
          <input name="nom" value={form.nom} onChange={handleChange} required />
        </label>

        <label>
          {t.taste}
          <select name="gout" value={form.gout} onChange={handleChange}>
            <option value="sale">{t.salty}</option>
            <option value="sucre">{t.sweet}</option>
          </select>
        </label>

        <label>
          {t.price}
          <input
            type="number"
            name="prix"
            value={form.prix}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          {t.image}
          <input
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            placeholder="https://..."
            required
          />
        </label>

        <label>
          {t.description}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </label>

        <button className="btn primary" type="submit">
          {editingId ? t.update : t.save}
        </button>
      </form>

      <section className="admin-products">
        <h3>{t.ourChips}</h3>

        <div className="admin-list">
          {products.map((item) => (
            <div className="admin-item" key={item.id}>
              <img src={item.image_url} alt={item.nom} />

              <div>
                <strong>{item.nom}</strong>
                <p>{item.prix} Ar</p>
              </div>

              <div className="admin-actions">
                <button onClick={() => editProduct(item)}>{t.update}</button>
                <button onClick={() => deleteProduct(item.id)}>
                  {t.delete}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-orders">
        <h3>{t.orders}</h3>

        {orders.length === 0 ? (
          <p>{t.noOrders}</p>
        ) : (
          <div className="admin-list">
            {orders.map((order) => (
              <div className="admin-item" key={order.id}>
                <div>
                  <strong>{order.nom_client}</strong>
                  <p>{order.telephone}</p>
                  <p>{order.adresse}</p>
                  <p>
                    {order.nom_produit} — {order.quantite} — {order.prix_total} Ar
                  </p>
                  <p className="canal">{order.canal}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
                            }
