import { motion } from "motion/react";
import { Package } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { CATALOG_ITEMS, CatalogItem } from "@/src/data/catalogProducts";

function ProductCard({ item, i }: { item: CatalogItem; i: number }) {
  const soon = item.status === "coming-soon";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className="group bg-background"
    >
      <div className="relative aspect-[4/5] bg-muted/40 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className={
              "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 " +
              (soon ? "opacity-60" : "")
            }
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-serif italic text-3xl text-muted-foreground/40">
              {item.name.charAt(0)}
            </span>
          </div>
        )}
        {soon && (
          <span className="absolute top-3 left-3 bg-background/90 backdrop-blur text-[10px] uppercase tracking-[0.25em] text-primary border border-primary/40 px-2 py-1">
            Soon
          </span>
        )}
      </div>
      <div className="p-5 space-y-1.5">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {item.category}
        </p>
        <h3 className="text-sm font-medium">{item.name}</h3>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const { lang } = useLanguage();
  const ready = CATALOG_ITEMS.filter((c) => c.status === "ready");
  const coming = CATALOG_ITEMS.filter((c) => c.status === "coming-soon");

  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <header className="space-y-3">
          <p className="text-primary font-mono text-sm uppercase tracking-widest">
            <Package className="w-4 h-4 inline mr-2" />
            {lang === "id" ? "Katalog" : "Catalog"}
          </p>
          <h1 className="text-4xl font-black tracking-tight">
            {lang === "id" ? "Produk Khai Apparel" : "Khai Apparel Products"}
          </h1>
        </header>

        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-light tracking-tight">
              {lang === "id" ? "Tersedia" : "Available"}
            </h2>
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {ready.length} {lang === "id" ? "produk" : "items"}
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {ready.map((item, i) => (
              <ProductCard key={item.name} item={item} i={i} />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-light tracking-tight">
              {lang === "id" ? "Akan Release" : "Coming Soon"}
            </h2>
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary">
              {coming.length} {lang === "id" ? "produk" : "items"}
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {coming.map((item, i) => (
              <ProductCard key={item.name} item={item} i={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
