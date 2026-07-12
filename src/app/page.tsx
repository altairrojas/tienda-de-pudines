import { supabase } from '@/lib/supabase';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  emoji: string;
  badge: string | null;
};

const fallbackProducts: Product[] = [
  { id: 1, name: 'Pudín de vainilla', description: 'Suave, cremoso y con vainilla de verdad.', price: 4.5, emoji: '🍮', badge: 'Favorito' },
  { id: 2, name: 'Pudín de chocolate', description: 'Chocolate intenso con textura sedosa.', price: 5, emoji: '🍫', badge: 'Clásico' },
  { id: 3, name: 'Pudín de fresa', description: 'Dulce, fresco y con trocitos de fresa.', price: 5.25, emoji: '🍓', badge: 'Nuevo' },
  { id: 4, name: 'Pudín de caramelo', description: 'Cremoso con una capa brillante de caramelo.', price: 5.5, emoji: '✨', badge: 'Especial' },
  { id: 5, name: 'Pudín de coco', description: 'Tropical, ligero y coronado con coco rallado.', price: 5.25, emoji: '🥥', badge: null },
  { id: 6, name: 'Pudín arcoíris', description: 'Una edición divertida con sabores sorpresa.', price: 6, emoji: '🌈', badge: 'Edición limitada' },
];

async function getProducts(): Promise<Product[]> {
  if (!supabase) return fallbackProducts;

  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, price, emoji, badge')
    .order('id');

  if (error || !data?.length) return fallbackProducts;
  return data as Product[];
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#40251d]">
      <section className="overflow-hidden border-b border-amber-200 bg-[radial-gradient(circle_at_top_left,_#fff1c9,_transparent_42%),linear-gradient(135deg,#fffaf2,#ffe8d1)]">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="text-xl font-black tracking-tight">Pudín Feliz</div>
          <a href="#sabores" className="rounded-full bg-[#6f3d2e] px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5">Ver sabores</a>
        </nav>

        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">Hechos con cariño, cucharada a cucharada</span>
            <h1 className="mt-6 max-w-xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">El postre más feliz del refrigerador.</h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#765247]">Pudines artesanales, cremosos y listos para convertir cualquier día normal en una mini celebración.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#sabores" className="rounded-full bg-[#ef8c59] px-6 py-3 font-extrabold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-1">Elegir mi pudín</a>
              <span className="rounded-full border border-amber-300 bg-white/70 px-6 py-3 font-bold">Desde $4.50</span>
            </div>
          </div>

          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center rounded-[3rem] bg-white/65 shadow-2xl shadow-orange-200/70 ring-1 ring-white">
            <div className="absolute left-8 top-10 text-5xl">✨</div>
            <div className="absolute bottom-12 right-8 text-5xl">🍓</div>
            <div className="text-[10rem] drop-shadow-2xl">🍮</div>
          </div>
        </div>
      </section>

      <section id="sabores" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-[#ef8c59]">Nuestro menú</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">Seis razones para usar cuchara</h2>
          </div>
          <p className="max-w-md text-[#765247]">La tienda usa datos de Supabase cuando las variables están configuradas y muestra este catálogo de ejemplo mientras tanto.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="group rounded-[2rem] border border-amber-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex aspect-[4/3] items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-amber-50 to-orange-100 text-8xl transition group-hover:scale-[1.02]">{product.emoji}</div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  {product.badge && <span className="rounded-full bg-[#ffe4d3] px-3 py-1 text-xs font-black text-[#b9582f]">{product.badge}</span>}
                  <h3 className="mt-3 text-xl font-black">{product.name}</h3>
                </div>
                <span className="rounded-full bg-[#40251d] px-3 py-2 text-sm font-black text-white">${Number(product.price).toFixed(2)}</span>
              </div>
              <p className="mt-3 leading-7 text-[#765247]">{product.description}</p>
              <button className="mt-5 w-full rounded-full border-2 border-[#ef8c59] px-4 py-3 font-black text-[#c76035] transition hover:bg-[#ef8c59] hover:text-white">Añadir a la cesta</button>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-amber-200 bg-white px-6 py-8 text-center text-sm text-[#765247]">Pudín Feliz · Prueba de concepto con Next.js, TypeScript, Tailwind y Supabase.</footer>
    </main>
  );
}
