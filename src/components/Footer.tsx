import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import khaiLogo from "@/src/assets/khai-logo.jpg";

const STORE_INFO = {
  address: "Jl. Contoh Alamat No. 123, Kecamatan ABC, Kota XYZ, Jawa Timur 60000",
  phone: "+62 822-4576-7700",
  waNumber: "6282245767700",
  email: "hello@sheetcatalog.com",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.6!2d112.75!3d-7.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTYnNDguMCJTIDExMsKwNDUnMDAuMCJF!5e0!3m2!1sid!2sid!4v1600000000000",
};

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={khaiLogo} alt="Khai Apparel" className="w-9 h-9 rounded object-cover" />
              <span className="font-black text-lg tracking-[0.25em] text-foreground">KHAI</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground border-l border-border pl-2.5">Apparel</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {lang === "id"
                ? "Toko online terpercaya untuk kebutuhan apparel, kaos kaki, tas, suvenir, dan kaos premium berkualitas."
                : "Trusted online store for quality apparel, socks, bags, souvenirs, and premium t-shirts."}
            </p>
            <a
              href={`https://api.whatsapp.com/send/?phone=${STORE_INFO.waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-[hsl(142,70%,45%)] hover:text-[hsl(142,70%,40%)] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {lang === "id" ? "Chat WhatsApp" : "Chat WhatsApp"}
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">
              {lang === "id" ? "Menu" : "Menu"}
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: "/", label: lang === "id" ? "Beranda" : "Home" },
                { to: "/products", label: lang === "id" ? "Produk" : "Products" },
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: lang === "id" ? "Kontak" : "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">
              {lang === "id" ? "Kontak" : "Contact"}
            </h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </li>
              <li className="flex gap-2.5 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{STORE_INFO.phone}</span>
              </li>
              <li className="flex gap-2.5 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{STORE_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Mini Map */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">
              {lang === "id" ? "Lokasi" : "Location"}
            </h4>
            <div className="rounded-lg overflow-hidden border border-border h-40">
              <iframe
                src={STORE_INFO.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-xs font-mono">
              © {new Date().getFullYear()} Khai Apparel. {lang === "id" ? "Semua hak dilindungi." : "All rights reserved."}
            </p>
            <div className="flex gap-6 text-muted-foreground text-xs font-mono">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
