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
  price: string;
  colors: string[];
  sizes: string[];
  stock: string;
  wa_number: string;
  image?: string;
}

export const CATALOG_ITEMS: CatalogItem[] = [
  // Ready
  {
    name: "Topi Trucker",
    category: "Headwear",
    status: "ready",
    image: trucker,
    descId: "Topi trucker dengan jaring belakang, nyaman dan stylish untuk dipakai sehari-hari.",
    descEn: "Trucker cap with mesh back, comfortable and stylish for everyday wear.",
    price: "85000",
    colors: ["Black", "Navy", "Gray"],
    sizes: ["One Size"],
    stock: "15",
    wa_number: "6287878644521"
  },
  {
    name: "Kaos Kaki",
    category: "Sock",
    status: "ready",
    image: socks,
    descId: "Kaos kaki katun premium, lembut dan menyerap keringat dengan baik.",
    descEn: "Premium cotton socks, soft and sweat-absorbing.",
    price: "25000",
    colors: ["White", "Black", "Gray"],
    sizes: ["One Size"],
    stock: "50",
    wa_number: "6287878644521"
  },
  {
    name: "Sandal Selop",
    category: "Footwear",
    status: "ready",
    image: selop,
    descId: "Sandal selop ringan untuk aktivitas santai sehari-hari.",
    descEn: "Lightweight slip-on sandals for everyday casual wear.",
    price: "95000",
    colors: ["Black", "Brown"],
    sizes: ["39", "40", "41", "42", "43"],
    stock: "25",
    wa_number: "6287878644521"
  },
  {
    name: "Tas Sepatu",
    category: "Bag",
    status: "ready",
    image: bag,
    descId: "Tas khusus penyimpanan sepatu, praktis, tahan air, dan tahan lama.",
    descEn: "Dedicated shoe storage bag, practical and durable.",
    price: "65000",
    colors: ["Black", "Navy"],
    sizes: ["One Size"],
    stock: "30",
    wa_number: "6287878644521"
  },
  {
    name: "Jaket Vest",
    category: "Outerwear",
    status: "ready",
    image: vest,
    descId: "Jaket vest tanpa lengan, cocok untuk layering aktivitas luar ruangan.",
    descEn: "Sleeveless vest jacket, perfect for layering.",
    price: "185000",
    colors: ["Black", "Olive"],
    sizes: ["M", "L", "XL"],
    stock: "15",
    wa_number: "6287878644521"
  },
  {
    name: "Jaket Parasit",
    category: "Outerwear",
    status: "ready",
    image: parasit,
    descId: "Jaket parasit ringan, tahan angin dan gerimis tipis.",
    descEn: "Lightweight parachute jacket, wind and drizzle resistant.",
    price: "225000",
    colors: ["Navy", "Black", "Red"],
    sizes: ["M", "L", "XL"],
    stock: "12",
    wa_number: "6287878644521"
  },

  // Coming soon
  {
    name: "Jersey Dryfit (Jacquard)",
    category: "Apparel",
    status: "coming-soon",
    image: jersey,
    descId: "Jersey dryfit dengan bahan jacquard berkualitas, cepat kering dan breathable.",
    descEn: "Dryfit jersey with jacquard fabric, quick-dry and breathable.",
    price: "145000",
    colors: ["Black", "Red", "Blue"],
    sizes: ["S", "M", "L", "XL"],
    stock: "0",
    wa_number: "6287878644521"
  },
  {
    name: "Kaos",
    category: "T-shirt",
    status: "coming-soon",
    descId: "Kaos premium dengan bahan katun bambu yang nyaman dan desain minimalis.",
    descEn: "Premium t-shirt with comfortable fabric and minimal design.",
    price: "110000",
    colors: ["Black", "White", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    stock: "0",
    wa_number: "6287878644521"
  },
  {
    name: "Celana Outdoor Panjang",
    category: "Apparel",
    status: "coming-soon",
    descId: "Celana outdoor panjang, fleksibel dan kuat untuk aktivitas luar ruang.",
    descEn: "Long outdoor pants, flexible for outdoor activities.",
    price: "195000",
    colors: ["Black", "Dark Gray"],
    sizes: ["28", "30", "32", "34"],
    stock: "0",
    wa_number: "6287878644521"
  },
  {
    name: "Celana Outdoor Pendek",
    category: "Apparel",
    status: "coming-soon",
    descId: "Celana outdoor pendek, ringan, kuat, dan cepat kering.",
    descEn: "Short outdoor pants, light and quick-drying.",
    price: "135000",
    colors: ["Black", "Olive", "Navy"],
    sizes: ["28", "30", "32", "34"],
    stock: "0",
    wa_number: "6287878644521"
  },
  {
    name: "Jaket Parasit 1",
    category: "Outerwear",
    status: "coming-soon",
    image: sandals,
    descId: "Varian jaket parasit edisi terbaru dengan kombinasi warna segar.",
    descEn: "Latest edition of parachute jacket, fresh design.",
    price: "235000",
    colors: ["Emerald", "Black"],
    sizes: ["M", "L", "XL"],
    stock: "0",
    wa_number: "6287878644521"
  },
  {
    name: "Jaket Parasit 2",
    category: "Outerwear",
    status: "coming-soon",
    image: capBlack,
    descId: "Varian kedua jaket parasit premium dengan tampilan lebih elegan.",
    descEn: "Second variant of parachute jacket, elegant look.",
    price: "235000",
    colors: ["Cream", "Navy"],
    sizes: ["M", "L", "XL"],
    stock: "0",
    wa_number: "6287878644521"
  }
];