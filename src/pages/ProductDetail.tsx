import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productSheetsService, Product } from "@/src/services/productSheets";
import { Loader2, ArrowLeft, Tag, Package, ChevronLeft, ChevronRight, MessageCircle, Plus, Minus, Check, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import MarkdownContent from "@/src/components/MarkdownContent";
import { cn } from "@/src/lib/utils";
import { useCart } from "@/src/contexts/CartContext";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { t, lang } = useLanguage();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    if (product.colors.length > 0 && !selectedColor) {
      alert(lang === "id" ? "Silakan pilih warna terlebih dahulu!" : "Please select a color first!");
      return;
    }
    if (product.sizes.length > 0 && !selectedSize) {
      alert(lang === "id" ? "Silakan pilih ukuran terlebih dahulu!" : "Please select a size first!");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image_url: product.image_url,
      quantity,
      selectedColor,
      selectedSize,
      wa_number: product.wa_number
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;
      try {
        const data = await productSheetsService.getProductBySlug(slug);
        setProduct(data);
        if (data?.colors.length) setSelectedColor(data.colors[0]);
        if (data?.sizes.length) setSelectedSize(data.sizes[0]);
      } catch (err) {
        setError("Product not found.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  const formatPrice = (price: string) => {
    const num = parseFloat(price);
    if (isNaN(num)) return price;
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
  };


  const images = product?.images.length ? product.images : product?.image_url ? [product.image_url] : [];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-background min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-destructive font-medium">{error || "Product not found"}</p>
          <Link to="/products" className="inline-block text-primary hover:opacity-80 font-bold text-sm uppercase tracking-wider">
            ← {t.back}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen text-foreground">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 font-mono text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image Slider */}
          {images.length > 0 && (
            <div className="space-y-3">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
                <img
                  src={images[currentImage]}
                  alt={`${product.name} - ${currentImage + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage((i) => (i - 1 + images.length) % images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImage((i) => (i + 1) % images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 hover:bg-background transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImage(idx)}
                          className={cn(
                            "w-2 h-2 rounded-full transition-colors",
                            idx === currentImage ? "bg-primary" : "bg-foreground/30"
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={cn(
                        "w-16 h-16 flex-shrink-0 rounded border overflow-hidden transition-all",
                        idx === currentImage ? "border-primary ring-1 ring-primary" : "border-border opacity-60 hover:opacity-100"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Info */}
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono uppercase tracking-wider border border-border rounded px-2.5 py-1">
                <Tag className="w-3 h-3" />
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                {product.name}
              </h1>
            </div>

            <p className="text-3xl text-primary font-black">
              {formatPrice(product.price)}
            </p>

            {product.stock && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                <Package className="w-4 h-4" />
                Stock: {product.stock}
              </div>
            )}

            {/* Color Picker */}
            {product.colors.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                  Warna
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "px-4 py-2 rounded border text-sm font-mono transition-colors",
                        selectedColor === color
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:text-primary hover:border-primary"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Picker */}
            {product.sizes.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                  Ukuran
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-4 py-2 rounded border text-sm font-mono transition-colors",
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:text-primary hover:border-primary"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2 pt-2">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                Jumlah
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 border border-border rounded-lg hover:text-primary hover:border-primary transition-colors bg-background"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono font-bold text-base w-8 text-center select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 border border-border rounded-lg hover:text-primary hover:border-primary transition-colors bg-background"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Order Buttons (Cart & WhatsApp) */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3.5 px-6 rounded-lg hover:bg-primary/90 hover:scale-[1.01] transition-all text-base uppercase tracking-wider shadow-md shadow-primary/10"
              >
                <ShoppingBag className="w-5 h-5" />
                {lang === "id" ? "Tambah ke Keranjang" : "Add to Cart"}
              </button>
              
              <a
                href={`https://api.whatsapp.com/send/?phone=${(product.wa_number || "6287878644521").replace(/[^0-9]/g, "")}&text=${encodeURIComponent(
                  `Halo, saya tertarik dengan produk *${product.name}* (${formatPrice(product.price)})` +
                  (selectedColor ? `\nWarna: ${selectedColor}` : "") +
                  (selectedSize ? `\nUkuran: ${selectedSize}` : "")
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white font-bold py-3.5 px-6 rounded-lg transition-colors text-base uppercase tracking-wider"
              >
                <MessageCircle className="w-5 h-5" />
                Beli via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Floating Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-500 text-white font-sans px-5 py-4 rounded-xl shadow-2xl border border-emerald-400"
            >
              <div className="bg-white/20 p-1.5 rounded-full">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm">
                  {lang === "id" ? "Berhasil Ditambahkan!" : "Successfully Added!"}
                </p>
                <p className="text-xs text-white/90 font-medium">
                  {product.name} ({quantity}x)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Description - Full Width Below */}
        <div className="mt-12 border-t border-border pt-8">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
            {t.productDescription}
          </h3>
          <MarkdownContent content={product.description} />
        </div>
      </motion.div>
    </div>
  );
}
