import trucker from "@/src/assets/product-trucker.webp";
import capBlack from "@/src/assets/product-cap-black.webp";
import socks from "@/src/assets/product-socks.webp";
import selop from "@/src/assets/product-selop.webp";
import sandals from "@/src/assets/product-sandals.webp";
import bag from "@/src/assets/product-bag.webp";
import vest from "@/src/assets/product-vest.webp";
import parasit from "@/src/assets/product-parasit.webp";
import jersey from "@/src/assets/product-jersey.webp";

export type CatalogStatus = "ready" | "coming-soon";

export interface CatalogItem {
  name: string;
  category: string;
  status: CatalogStatus;
  descId: string;
  descEn: string;
  image?: string;
}

export const CATALOG_ITEMS: CatalogItem[] = [
  // Ready
  { name: "Topi Trucker", category: "Headwear", status: "ready", image: trucker, descId: "Topi trucker dengan jaring belakang, nyaman dan stylish.", descEn: "Trucker cap with mesh back, comfortable and stylish." },
  { name: "Kaos Kaki", category: "Sock", status: "ready", image: socks, descId: "Kaos kaki katun premium, lembut dan menyerap keringat.", descEn: "Premium cotton socks, soft and sweat-absorbing." },
  { name: "Sandal Selop", category: "Footwear", status: "ready", image: selop, descId: "Sandal selop ringan untuk aktivitas santai sehari-hari.", descEn: "Lightweight slip-on sandals for everyday casual wear." },
  { name: "Tas Sepatu", category: "Bag", status: "ready", image: bag, descId: "Tas khusus penyimpanan sepatu, praktis dan tahan lama.", descEn: "Dedicated shoe storage bag, practical and durable." },
  { name: "Jaket Vest", category: "Outerwear", status: "ready", image: vest, descId: "Jaket vest tanpa lengan, cocok untuk layering.", descEn: "Sleeveless vest jacket, perfect for layering." },
  { name: "Jaket Parasit", category: "Outerwear", status: "ready", image: parasit, descId: "Jaket parasit ringan, tahan angin dan gerimis.", descEn: "Lightweight parachute jacket, wind and drizzle resistant." },

  // Coming soon
  { name: "Jersey Dryfit (Jacquard)", category: "Apparel", status: "coming-soon", image: jersey, descId: "Jersey dryfit dengan bahan jacquard, cepat kering dan breathable.", descEn: "Dryfit jersey with jacquard fabric, quick-dry and breathable." },
  { name: "Kaos", category: "T-shirt", status: "coming-soon", descId: "Kaos premium dengan bahan nyaman dan desain minimalis.", descEn: "Premium t-shirt with comfortable fabric and minimal design." },
  { name: "Celana Outdoor Panjang", category: "Apparel", status: "coming-soon", descId: "Celana outdoor panjang, fleksibel untuk aktivitas luar ruang.", descEn: "Long outdoor pants, flexible for outdoor activities." },
  { name: "Celana Outdoor Pendek", category: "Apparel", status: "coming-soon", descId: "Celana outdoor pendek, ringan dan cepat kering.", descEn: "Short outdoor pants, light and quick-drying." },
  { name: "Jaket Parasit 1", category: "Outerwear", status: "coming-soon", image: sandals, descId: "Varian jaket parasit edisi terbaru, desain segar.", descEn: "Latest edition of parachute jacket, fresh design." },
  { name: "Jaket Parasit 2", category: "Outerwear", status: "coming-soon", image: capBlack, descId: "Varian kedua jaket parasit, tampilan elegan.", descEn: "Second variant of parachute jacket, elegant look." },
];