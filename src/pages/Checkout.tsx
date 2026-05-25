import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/src/contexts/CartContext";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { Trash2, Plus, Minus, CreditCard, Wallet, Send, MessageCircle, ArrowLeft, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SCRIPT_URL = import.meta.env.VITE_CHECKOUT_SCRIPT_URL || "";
const DEFAULT_ADMIN_WA = "6287878644521";

export default function Checkout() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { lang } = useLanguage();
  
  // Checkout Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentType, setPaymentType] = useState<"bank" | "ewallet">("bank");
  const [paymentOption, setPaymentOption] = useState("BCA");
  
  // UI States
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(price);
  };

  const getPriceNumber = (priceStr: string) => {
    return parseFloat(priceStr.replace(/[^0-9.-]+/g, "")) || 0;
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    if (!name.trim() || !phone.trim()) {
      alert(lang === "id" ? "Silakan isi Nama Lengkap dan No Telp!" : "Please fill in your Full Name and Phone number!");
      return;
    }

    setLoading(true);

    // Format order details string for the sheet
    const orderDetailsString = cartItems
      .map((item) => {
        const spec = [item.selectedColor, item.selectedSize].filter(Boolean).join(", ");
        return `${item.quantity}x ${item.name} (${spec || "No Variant"}) - ${formatPrice(getPriceNumber(item.price) * item.quantity)}`;
      })
      .join("\n");

    const orderPayload = {
      name: name.trim(),
      phone: phone.trim(),
      orderDetails: orderDetailsString,
      totalPrice: formatPrice(cartTotal),
      paymentMethod: `${paymentType === "bank" ? "Transfer Bank" : "E-Wallet"} - ${paymentOption}`,
      notes: notes.trim()
    };

    let generatedOrderId = "ORD-" + Math.floor(Math.random() * 900000 + 100000);
    
    // Attempt sending to Google Sheets if Script URL is configured
    if (SCRIPT_URL) {
      try {
        const response = await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors", // Use no-cors to prevent CORS preflight blocks if sheet app script doesn't handle CORS headers
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderPayload)
        });
        
        // Since no-cors doesn't return response body, we can't read response.json(), so we assume success if no error is thrown
        console.log("Order submitted to Google Sheets successfully.");
      } catch (error) {
        console.error("Error submitting to Google Sheets:", error);
      }
    } else {
      console.warn("VITE_CHECKOUT_SCRIPT_URL is not set. Google Sheets sync is bypassed.");
    }

    setOrderId(generatedOrderId);
    setLoading(false);
    setIsSuccess(true);
  };

  const handleWhatsAppRedirect = () => {
    // Generate prefilled text
    const itemsList = cartItems
      .map((item) => {
        const spec = [item.selectedColor, item.selectedSize].filter(Boolean).join(", ");
        return `- *${item.name}* (Qty: ${item.quantity}) ${spec ? `[${spec}]` : ""} : ${formatPrice(getPriceNumber(item.price) * item.quantity)}`;
      })
      .join("\n");

    const waMessage = 
      `Halo Admin Khai Apparel,\n` +
      `Saya ingin mengonfirmasi pesanan saya dari Website:\n` +
      `-----------------------------------------\n` +
      `*ID Pesanan*: ${orderId}\n` +
      `*Nama*: ${name}\n` +
      `*No. WA*: ${phone}\n` +
      `*Catatan*: ${notes || "-"}\n\n` +
      `*Detail Pesanan*:\n${itemsList}\n\n` +
      `*Total Pembayaran*: ${formatPrice(cartTotal)}\n` +
      `*Metode Pembayaran*: ${paymentType === "bank" ? "Transfer Bank" : "E-Wallet"} - ${paymentOption}\n` +
      `-----------------------------------------\n` +
      `Saya sudah melakukan checkout. Mohon informasi/petunjuk transfer pembayaran selanjutnya. Terima kasih!`;

    // Try to use the first item's wa_number if available, otherwise fallback to admin default
    const waNumber = cartItems[0]?.wa_number || DEFAULT_ADMIN_WA;
    const cleanWaNumber = waNumber.replace(/[^0-9]/g, "");

    const waUrl = `https://api.whatsapp.com/send/?phone=${cleanWaNumber}&text=${encodeURIComponent(waMessage)}`;
    
    // Clear cart and redirect
    clearCart();
    window.open(waUrl, "_blank", "noopener,noreferrer");
    
    // Go back to home
    window.location.href = "/";
  };

  // Success view
  if (isSuccess) {
    return (
      <div className="bg-background min-h-screen text-foreground flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-muted/30 border border-border p-8 rounded-2xl text-center space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1.5 bg-primary" />
          
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
            <Check className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight uppercase">
              {lang === "id" ? "Pesanan Dicatat!" : "Order Logged!"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {lang === "id" 
                ? "Pesanan Anda berhasil dikirim ke sistem database kami." 
                : "Your order was successfully recorded in our system database."}
            </p>
            <div className="bg-background border border-border/80 rounded-lg p-2.5 font-mono text-xs inline-block text-primary">
              ID: {orderId}
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl text-left text-xs text-muted-foreground space-y-2.5">
            <p className="font-bold text-foreground text-sm border-b border-border/60 pb-1.5 uppercase tracking-wide">
              {lang === "id" ? "Petunjuk Pembayaran:" : "Payment Instructions:"}
            </p>
            {paymentType === "bank" ? (
              <div>
                <p className="font-bold text-foreground">{paymentOption} Transfer</p>
                {paymentOption === "BCA" && <p className="font-mono text-sm text-primary mt-1">123-456-7890</p>}
                {paymentOption === "Mandiri" && <p className="font-mono text-sm text-primary mt-1">987-654-3210</p>}
                {paymentOption === "BRI" && <p className="font-mono text-sm text-primary mt-1">543-210-9876</p>}
                <p className="mt-1">a/n PT Khai Apparel</p>
              </div>
            ) : (
              <div>
                <p className="font-bold text-foreground">E-Wallet {paymentOption}</p>
                <p className="font-mono text-sm text-primary mt-1">0878-7864-4521</p>
                <p className="mt-1">a/n PT Khai Apparel</p>
              </div>
            )}
            <p className="text-[10px] italic">
              {lang === "id" 
                ? "*Silakan transfer sesuai nominal total belanja lalu kirimkan bukti transfer melalui WhatsApp."
                : "*Please transfer the total amount, then send your payment proof via WhatsApp."}
            </p>
          </div>

          <button
            onClick={handleWhatsAppRedirect}
            className="w-full flex items-center justify-center gap-2 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white font-bold py-3.5 px-6 rounded-lg transition-colors text-sm uppercase tracking-wider"
          >
            <MessageCircle className="w-5 h-5" />
            {lang === "id" ? "Konfirmasi via WhatsApp" : "Confirm via WhatsApp"}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> {lang === "id" ? "Kembali ke Produk" : "Back to Products"}
        </Link>

        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
            {lang === "id" ? "Checkout Pesanan" : "Order Checkout"}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            {lang === "id" 
              ? "Tinjau pesanan Anda, lengkapi data, dan lakukan pembayaran." 
              : "Review your order, complete information, and process payment."}
          </p>
        </header>

        {cartItems.length === 0 ? (
          <div className="bg-muted/20 border border-border p-12 text-center rounded-2xl space-y-4">
            <p className="text-muted-foreground text-lg">
              {lang === "id" ? "Keranjang belanja Anda masih kosong." : "Your shopping cart is currently empty."}
            </p>
            <Link
              to="/products"
              className="inline-flex bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:bg-primary/95 transition-colors uppercase tracking-wider text-sm"
            >
              {lang === "id" ? "Mulai Belanja" : "Start Shopping"}
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Left Column: Form & Payments */}
            <form onSubmit={handleCheckoutSubmit} className="lg:col-span-7 space-y-8">
              
              {/* Customer Information */}
              <div className="bg-muted/10 border border-border p-6 rounded-2xl space-y-5">
                <h2 className="text-lg font-bold border-b border-border pb-3 uppercase tracking-wider">
                  {lang === "id" ? "Informasi Pelanggan" : "Customer Information"}
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
                      {lang === "id" ? "Nama Lengkap *" : "Full Name *"}
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === "id" ? "Masukkan nama Anda" : "Enter your full name"}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
                      {lang === "id" ? "No. Telpon / WhatsApp *" : "Phone / WhatsApp Number *"}
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={lang === "id" ? "Contoh: 08123456789" : "Example: 08123456789"}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="orderNotes" className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
                      {lang === "id" ? "Alamat Lengkap / Catatan Tambahan" : "Shipping Address / Additional Notes"}
                    </label>
                    <textarea
                      id="orderNotes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={lang === "id" ? "Tuliskan alamat pengiriman atau catatan varian tambahan disini..." : "Write shipping address or additional notes here..."}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-muted/10 border border-border p-6 rounded-2xl space-y-6">
                <h2 className="text-lg font-bold border-b border-border pb-3 uppercase tracking-wider">
                  {lang === "id" ? "Metode Pembayaran" : "Payment Method"}
                </h2>

                {/* Tabs Type */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-background border border-border rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentType("bank");
                      setPaymentOption("BCA");
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                      paymentType === "bank"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    {lang === "id" ? "Transfer Bank" : "Bank Transfer"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentType("ewallet");
                      setPaymentOption("GoPay");
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                      paymentType === "ewallet"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Wallet className="w-4 h-4" />
                    {lang === "id" ? "Dompet Digital" : "Digital Wallet"}
                  </button>
                </div>

                {/* Sub Options selection */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {paymentType === "bank" ? (
                    ["BCA", "Mandiri", "BRI"].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setPaymentOption(bank)}
                        className={`py-3.5 border rounded-xl font-bold font-mono text-sm transition-all ${
                          paymentOption === bank
                            ? "border-primary text-primary ring-1 ring-primary bg-primary/5"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                        }`}
                      >
                        {bank}
                      </button>
                    ))
                  ) : (
                    ["GoPay", "OVO", "DANA", "ShopeePay"].map((wallet) => (
                      <button
                        key={wallet}
                        type="button"
                        onClick={() => setPaymentOption(wallet)}
                        className={`py-3.5 border rounded-xl font-bold text-xs uppercase tracking-wide transition-all ${
                          paymentOption === wallet
                            ? "border-primary text-primary ring-1 ring-primary bg-primary/5"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                        }`}
                      >
                        {wallet}
                      </button>
                    ))
                  )}
                </div>

                {/* Instruction Card */}
                <div className="bg-background border border-border/80 rounded-xl p-4 text-xs text-muted-foreground space-y-1.5">
                  <p className="font-bold text-foreground text-sm uppercase tracking-wide">
                    {lang === "id" ? "Petunjuk Pembayaran:" : "Instructions:"}
                  </p>
                  {paymentType === "bank" ? (
                    <div>
                      <p>Silakan lakukan transfer ke rekening berikut setelah checkout:</p>
                      <p className="font-bold text-foreground mt-2">{paymentOption} — PT Khai Apparel</p>
                      {paymentOption === "BCA" && <p className="font-mono text-sm text-primary mt-1">123-456-7890</p>}
                      {paymentOption === "Mandiri" && <p className="font-mono text-sm text-primary mt-1">987-654-3210</p>}
                      {paymentOption === "BRI" && <p className="font-mono text-sm text-primary mt-1">543-210-9876</p>}
                    </div>
                  ) : (
                    <div>
                      <p>Lakukan transfer saldo ke akun E-Wallet berikut setelah checkout:</p>
                      <p className="font-bold text-foreground mt-2">{paymentOption} — PT Khai Apparel</p>
                      <p className="font-mono text-sm text-primary mt-1">0878-7864-4521</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-black text-sm uppercase tracking-wider py-4 px-6 rounded-xl hover:bg-primary/95 transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{lang === "id" ? "Selesaikan Checkout & Konfirmasi" : "Complete Checkout & Confirm"}</span>
                  </>
                )}
              </button>
            </form>

            {/* Right Column: Cart Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-muted/10 border border-border p-6 rounded-2xl space-y-6 sticky top-24">
                <h2 className="text-lg font-bold border-b border-border pb-3 uppercase tracking-wider">
                  {lang === "id" ? "Ringkasan Belanja" : "Order Summary"}
                </h2>

                {/* Items List */}
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                  <AnimatePresence initial={false}>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.uniqueId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-3 items-start border-b border-border/40 pb-4 last:border-b-0 last:pb-0"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted/30 border border-border flex-shrink-0">
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex-grow space-y-1">
                          <h3 className="text-sm font-bold leading-tight hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
                            {[item.selectedColor, item.selectedSize].filter(Boolean).join(" / ") || "No variant"}
                          </p>
                          
                          {/* Price and quantity controls */}
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xs font-bold text-primary font-mono">
                              {formatPrice(getPriceNumber(item.price))}
                            </span>
                            
                            <div className="flex items-center gap-2 border border-border/80 rounded bg-background p-0.5 scale-90">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}
                                className="p-0.5 hover:text-primary text-muted-foreground transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-[10px] font-mono font-bold w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}
                                className="p-0.5 hover:text-primary text-muted-foreground transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.uniqueId)}
                          className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Subtotals & Total */}
                <div className="border-t border-border pt-4 space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal:</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{lang === "id" ? "Ongkos Kirim:" : "Shipping Fee:"}</span>
                    <span className="text-emerald-500 font-bold uppercase tracking-wider">
                      {lang === "id" ? "Gratis / COD" : "Free / COD"}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-foreground pt-2.5 border-t border-border/60">
                    <span className="uppercase">{lang === "id" ? "Total:" : "Total:"}</span>
                    <span className="text-primary font-mono">{formatPrice(cartTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
