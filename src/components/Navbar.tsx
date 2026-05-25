import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, Globe, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useCart } from "@/src/contexts/CartContext";
import khaiLogo from "@/src/assets/khai-logo.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const { cartCount } = useCart();

  const navLinks = [
    { name: t.home, href: "/" },
    { name: t.products, href: "/products" },
    { name: t.blog, href: "/blog" },
    { name: t.contact, href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={khaiLogo}
              alt="Khai Apparel logo"
              className="w-8 h-8 rounded object-cover"
            />
            <span className="font-black text-lg tracking-[0.2em] text-foreground group-hover:text-primary transition-colors">
              KHAI
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.3em] text-muted-foreground border-l border-border pl-2.5">
              Apparel
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-muted-foreground hover:text-primary transition-colors font-mono text-sm uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "id" ? "en" : "id")}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-mono text-xs uppercase tracking-wider border border-border rounded px-2.5 py-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === "id" ? "EN" : "ID"}
            </button>

            {/* Cart Button */}
            <Link
              to="/checkout"
              className="relative text-muted-foreground hover:text-primary transition-colors p-2 border border-border rounded flex items-center justify-center"
              aria-label="View shopping cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-background">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-primary transition-colors p-2 border border-border rounded"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "id" ? "en" : "id")}
              className="text-muted-foreground hover:text-primary transition-colors font-mono text-xs border border-border rounded px-2 py-1.5"
            >
              {lang === "id" ? "EN" : "ID"}
            </button>
            {/* Cart Button for mobile */}
            <Link
              to="/checkout"
              className="relative text-muted-foreground hover:text-primary transition-colors p-2 flex items-center justify-center"
              aria-label="View shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-background">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-primary p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "md:hidden bg-background border-b border-border transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-muted-foreground hover:text-primary font-mono text-sm uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
