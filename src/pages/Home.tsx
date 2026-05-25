import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Flame } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { CATALOG_ITEMS } from "@/src/data/catalogProducts";
import khaiLogo from "@/src/assets/khai-logo.jpg";
import heroSocks from "@/src/assets/product-socks.webp";
import heroCap from "@/src/assets/product-cap-black.webp";
import heroJersey from "@/src/assets/product-jersey.webp";

const READY_PREVIEW = CATALOG_ITEMS.filter((p) => p.status === "ready");
const COMING_PREVIEW = CATALOG_ITEMS.filter((p) => p.status === "coming-soon").slice(0, 3);

export default function Home() {
  const { lang } = useLanguage();

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Spectacular Hero Showcase */}
      <section className="relative overflow-hidden border-b border-border py-16 md:py-24 lg:py-28">
        {/* Futuristic glowing backdrop blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] aspect-square rounded-full bg-orange-500/5 blur-[100px] pointer-events-none" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          {/* Brand Info & Core Copy */}
          <div className="space-y-8 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/20 bg-primary/5 text-primary rounded-full text-xs font-mono tracking-widest uppercase"
            >
              <Flame className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>KHAI APPAREL — EST. 2017</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.85] uppercase"
              >
                <span className="block text-foreground tracking-tighter">Burn Your</span>
                <span className="block text-primary font-serif italic tracking-wide font-black">
                  Fear.
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-lg md:text-xl font-serif italic text-primary/90 font-medium tracking-wide"
              >
                Constantly Improving.
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-lg text-muted-foreground text-base md:text-lg leading-relaxed font-sans"
            >
              {lang === "id"
                ? "Koleksi apparel & aksesoris eksklusif — dari topi, kaos kaki, sandal, tas, hingga jaket. Dirancang dengan presisi tinggi dan diproduksi bangga di Indonesia untuk kenyamanan gaya kasual harian Anda."
                : "Exclusive apparel & accessories collection — ranging from caps, socks, sandals, bags, to jackets. Engineered with high precision and proudly made in Indonesia for your premium daily comfort."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <Link
                to="/products"
                className="group relative inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-black text-sm tracking-wider uppercase py-4 px-8 rounded-lg transition-all duration-300 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
              >
                <span>{lang === "id" ? "Lihat Katalog" : "View Catalog"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="https://api.whatsapp.com/send/?phone=6287878644521&text=Halo%2C%20saya%20tertarik%20dengan%20produk%20Khai%20Apparel"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 text-sm font-bold tracking-wider uppercase text-muted-foreground hover:text-foreground py-3 px-5 transition-colors border border-border/80 hover:border-foreground/40 rounded-lg bg-background/50 backdrop-blur-sm"
              >
                <MessageCircle className="w-4.5 h-4.5 text-emerald-500" />
                <span>WhatsApp</span>
              </a>
            </motion.div>

            {/* Micro stats banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="pt-8 grid grid-cols-3 gap-4 max-w-md border-t border-border/50 text-xs font-mono tracking-widest text-muted-foreground uppercase"
            >
              <div>
                <span className="block text-foreground text-lg font-black tracking-tight mb-1">100%</span>
                <span>Local Craft</span>
              </div>
              <div className="border-l border-border/60 pl-4">
                <span className="block text-foreground text-lg font-black tracking-tight mb-1">Premium</span>
                <span>Materials</span>
              </div>
              <div className="border-l border-border/60 pl-4">
                <span className="block text-foreground text-lg font-black tracking-tight mb-1">Fast</span>
                <span>WA Order</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive Collage Display */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[450px] md:min-h-[500px]">
            {/* Glowing accent circle */}
            <div className="absolute w-72 h-72 rounded-full bg-primary/20 blur-3xl -z-10 animate-pulse" />

            {/* Main Center Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative w-[75%] aspect-[4/5] bg-muted/30 rounded-2xl overflow-hidden border border-border/80 shadow-2xl group"
            >
              <img
                src={heroSocks}
                alt="Khai Apparel Hero"
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-700 hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </motion.div>

            {/* Overlapping Top-Right Card (Apparel Showcase) */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: -30, rotate: 6 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 6 }}
              transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
              className="absolute top-[8%] right-[2%] w-[42%] aspect-square bg-background/90 backdrop-blur-md rounded-2xl p-2.5 border border-border shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-350 cursor-pointer"
            >
              <div className="w-full h-full rounded-xl overflow-hidden bg-muted/10 relative">
                <img src={heroJersey} alt="Khai Jersey" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-[8px] font-mono text-white rounded uppercase tracking-wider">
                  Apparel
                </div>
              </div>
            </motion.div>

            {/* Overlapping Bottom-Left Card (Accessory Showcase) */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: 30, rotate: -8 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: -8 }}
              transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
              className="absolute bottom-[8%] left-[2%] w-[38%] aspect-square bg-background/90 backdrop-blur-md rounded-2xl p-2.5 border border-border shadow-2xl hover:scale-105 hover:translate-y-2 transition-all duration-350 cursor-pointer"
            >
              <div className="w-full h-full rounded-xl overflow-hidden bg-muted/10 relative">
                <img src={heroCap} alt="Khai Cap" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-[8px] font-mono text-white rounded uppercase tracking-wider">
                  Accessory
                </div>
              </div>
            </motion.div>

            {/* Glassmorphic Stamp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-2 right-[15%] bg-background/95 backdrop-blur-md border border-border/80 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>100% INDONESIAN MADE</span>
            </motion.div>
          </div>
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
            {READY_PREVIEW.map((item, i) => {
              const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group bg-background"
                >
                  <Link to={`/products/${slug}`} className="block">
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
              );
            })}
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
            href="https://api.whatsapp.com/send/?phone=6287878644521&text=Halo%2C%20saya%20tertarik%20dengan%20produk%20Anda"
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
