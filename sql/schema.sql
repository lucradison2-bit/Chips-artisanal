create table if not exists public.produits (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  gout text not null check (gout in ('sale', 'sucre')),
  prix integer not null check (prix >= 0),
  image_url text,
  description text,
  actif boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.commandes (
  id uuid primary key default gen_random_uuid(),
  nom_client text not null,
  telephone text not null,
  adresse text not null,
  produit_id uuid references public.produits(id) on delete set null,
  nom_produit text not null,
  quantite integer not null check (quantite > 0),
  prix_total integer not null,
  canal text not null check (canal in ('whatsapp', 'sms', 'appel')),
  created_at timestamptz default now()
);

alter table public.produits enable row level security;
alter table public.commandes enable row level security;

create policy "Produits visibles par tous"
on public.produits
for select
to anon, authenticated
using (actif = true);

create policy "Admin peut ajouter des produits"
on public.produits
for insert
to authenticated
with check (true);

create policy "Admin peut modifier des produits"
on public.produits
for update
to authenticated
using (true)
with check (true);

create policy "Admin peut supprimer des produits"
on public.produits
for delete
to authenticated
using (true);

create policy "Clients peuvent envoyer une commande"
on public.commandes
for insert
to anon, authenticated
with check (true);

create policy "Admin peut voir les commandes"
on public.commandes
for select
to authenticated
using (true);
