import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Package, Loader2 } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { productSheetsService, Product } from "@/src/services/productSheets";

const formatPrice = (price: string) => {
  const num = parseFloat(price.replace(/[^0-9.-]+/g, ""));
  if (isNaN(num)) return price;
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
};

function ProductCard({ item, i }: { item: Product; i: number }) {
  const soon = parseFloat(item.stock) === 0 || !item.stock || item.stock === "0";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className="group"
    >
      <Link 
        to={`/products/${item.slug}`} 
        className="block bg-background border border-border/80 hover:border-primary/50 transition-all rounded-xl overflow-hidden hover:shadow-lg hover:shadow-primary/5 group"
      >
        <div className="relative aspect-[4/5] bg-muted/20 overflow-hidden border-b border-border/50">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.name}
              loading="lazy"
              className={
                "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 " +
                (soon ? "opacity-60" : "")
              }
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/10">
              <span className="font-serif italic text-3xl text-muted-foreground/30">
                {item.name.charAt(0)}
              </span>
            </div>
          )}
          {soon && (
            <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-[10px] uppercase tracking-[0.25em] text-primary border border-primary/30 px-2.5 py-1 rounded">
              Soon
            </span>
          )}
        </div>
        
        <div className="p-5 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
            {item.category}
          </p>
          <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="text-sm font-black text-primary font-mono">
            {soon ? "Coming Soon" : formatPrice(item.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Products() {
  const { lang } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productSheetsService.getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  const ready = products.filter((p) => parseFloat(p.stock) > 0);
  const coming = products.filter((p) => parseFloat(p.stock) === 0 || !p.stock);

  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <header className="space-y-3">
          <p className="text-primary font-mono text-sm uppercase tracking-widest flex items-center gap-2">
            <Package className="w-4 h-4 text-primary" />
            {lang === "id" ? "Katalog Resmi" : "Official Catalog"}
          </p>
          <h1 className="text-4xl font-black tracking-tight">
            {lang === "id" ? "Produk Khai Apparel" : "Khai Apparel Products"}
          </h1>
        </header>

        {error && (
          <div className="bg-destructive/10 text-destructive border border-destructive/20 p-4 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {lang === "id" ? "Belum ada produk yang ditemukan." : "No products found."}
          </div>
        ) : (
          <>
            {/* Ready Section */}
            {ready.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-end justify-between">
                  <h2 className="text-2xl font-light tracking-tight">
                    {lang === "id" ? "Tersedia Sekarang" : "Available Now"}
                  </h2>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">
                    {ready.length} {lang === "id" ? "produk" : "items"}
                  </span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {ready.map((item, i) => (
                    <ProductCard key={item.id} item={item} i={i} />
                  ))}
                </div>
              </section>
            )}

            {/* Coming Soon Section */}
            {coming.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-end justify-between">
                  <h2 className="text-2xl font-light tracking-tight">
                    {lang === "id" ? "Segera Rilis" : "Coming Soon"}
                  </h2>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-mono">
                    {coming.length} {lang === "id" ? "produk" : "items"}
                  </span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {coming.map((item, i) => (
                    <ProductCard key={item.id} item={item} i={i} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
