import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { CATALOG_ITEMS } from "@/src/data/catalogProducts";
import khaiLogo from "@/src/assets/khai-logo.jpg";
import heroJacket from "@/src/assets/product-parasit.webp";

const READY_PREVIEW = CATALOG_ITEMS.filter((p) => p.status === "ready");
const COMING_PREVIEW = CATALOG_ITEMS.filter((p) => p.status === "coming-soon").slice(0, 3);

export default function Home() {
  const { lang } = useLanguage();

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero — split brand showcase */}
      <section className="relative border-b border-border">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <img src={khaiLogo} alt="Khai Apparel" className="w-12 h-12 rounded object-cover" />
              <div className="flex items-center gap-3">
                <span className="font-black text-2xl tracking-[0.25em]">KHAI</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground border-l border-border pl-3">
                  Apparel
                </span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="text-5xl md:text-6xl font-light tracking-tight leading-[1.05]"
            >
              {lang === "id" ? "Burn Your Fear." : "Burn Your Fear."}
              <br />
              <span className="italic font-serif text-primary">
                {lang === "id" ? "Constantly Improving." : "Constantly Improving."}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-md text-muted-foreground text-base md:text-lg leading-relaxed"
            >
              {lang === "id"
                ? "Apparel & aksesoris asli Khai — topi, kaos kaki, sandal, tas, hingga jaket. Dibuat di Indonesia, dirancang untuk dipakai setiap hari."
                : "Authentic Khai apparel & accessories — caps, socks, sandals, bags, and jackets. Made in Indonesia, designed for everyday wear."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-wrap items-center gap-6 pt-2"
            >
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 text-sm tracking-wider uppercase border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
              >
                {lang === "id" ? "Lihat Katalog" : "View Catalog"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://api.whatsapp.com/send/?phone=6282245767700&text=Halo%2C%20saya%20tertarik%20dengan%20produk%20Khai%20Apparel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-muted/40 overflow-hidden">
              <img
                src={heroJacket}
                alt="Khai Apparel jacket"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-background border border-border px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Made in Indonesia
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ready Products */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {lang === "id" ? "Tersedia Sekarang" : "Available Now"}
              </p>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                {lang === "id" ? "Produk Ready" : "Ready Products"}
              </h2>
            </div>
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              {lang === "id" ? "Semua" : "All"} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {READY_PREVIEW.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group bg-background"
              >
                <Link to="/products" className="block">
                  <div className="aspect-[4/5] bg-muted/40 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-serif italic text-3xl text-muted-foreground/40">
                          {item.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 space-y-1.5">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {item.category}
                    </p>
                    <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="space-y-2 mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              {lang === "id" ? "Segera Hadir" : "Coming Soon"}
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              {lang === "id" ? "Akan Release" : "Next Drop"}
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {COMING_PREVIEW.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border bg-background p-8 space-y-4"
              >
                <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-primary border border-primary/40 px-2 py-1">
                  {lang === "id" ? "Segera" : "Soon"}
                </span>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lang === "id" ? item.descId : item.descEn}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              {lang === "id" ? "Lihat semua rencana rilis" : "See all upcoming"}
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal CTA */}
      <section className="border-t border-border">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center space-y-6">
          <img src={khaiLogo} alt="Khai Apparel" className="w-12 h-12 rounded object-cover mx-auto" />
          <h2 className="text-2xl md:text-3xl font-light tracking-tight">
            {lang === "id"
              ? "Punya pertanyaan tentang produk Khai?"
              : "Questions about Khai products?"}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {lang === "id"
              ? "Tim kami siap membantu via WhatsApp."
              : "Our team is ready to help via WhatsApp."}
          </p>
          <a
            href="https://api.whatsapp.com/send/?phone=6282245767700&text=Halo%2C%20saya%20tertarik%20dengan%20produk%20Anda"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm tracking-wider uppercase border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {lang === "id" ? "Hubungi via WhatsApp" : "Contact via WhatsApp"}
          </a>
        </div>
      </section>
    </div>
  );
}
