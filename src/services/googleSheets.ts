export interface GPost {
  id: string;
  date: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  author: string;
}

const SHEETS_CONFIG = {
  apiKey: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || "AIzaSyCchtBn4Xt0Lq8HaY7bife82s_XryIgkxU",
  spreadsheetId: import.meta.env.VITE_SPREADSHEET_ID || "17nzSLK0wuYpSOdTLBfGwY-ygTEODqSo6jxtt0Bxv7S4",
  sheetName: import.meta.env.VITE_SHEET_NAME || "Blog",
};

const MOCK_POSTS: GPost[] = [
  {
    id: "1",
    date: "2026-05-20",
    slug: "khai-run-club-semangat-koneksi-komunitas-surabaya",
    title: "Khai Run Club: Berlari Bersama Menghubungkan Komunitas Muda",
    content: "Olahraga bukan lagi sekadar rutinitas membakar kalori, melainkan wadah bersosialisasi dan berekspresi bagi anak muda. Inilah yang mendasari lahirnya **Khai Run Club (KRC)**. \n\nDimulai dari kumpul-kumpul santai 5 orang di akhir pekan, kini KRC telah menjadi wadah berkumpulnya puluhan pegiat lari setiap hari Rabu malam. Kami percaya lari tidak harus kompetitif dan melelahkan, melainkan menyenangkan dan menghubungkan satu sama lain.\n\n### Kenapa Harus Gabung Khai Run Club?\n1. **No Runner Left Behind**: Baik kamu pelari maraton berpengalaman maupun pemula yang baru ingin mulai jalan sehat, kami menyesuaikan kecepatan bersama.\n2. **Koneksi Baru**: Tempat bertemu teman-teman kreatif, mahasiswa, hingga profesional muda lintas industri.\n3. **Weekly Night Run**: Menikmati keindahan lanskap kota di bawah terangnya lampu jalanan dengan rute yang variatif.\n\n*\"Di Khai Run Club, kami tidak hanya berbagi keringat, kami berbagi energi positif dan cerita hidup. Dan tentu saja, kami melakukannya dengan gaya!\"* — Rian.\n\nYuk gabung sesi lari minggu ini! Pantau jadwal lengkap dan lokasi kumpul kami melalui Instagram dan WhatsApp grup komunitas Khai.",
    excerpt: "Khai Apparel mengajak anak muda bergerak aktif lewat Khai Run Club. Sebuah inisiatif lari santai mingguan untuk membangun gaya hidup sehat.",
    image_url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=2070&auto=format&fit=crop",
    author: "Rian (Community)"
  },
  {
    id: "2",
    date: "2026-05-22",
    slug: "kebangkitan-streetwear-lokal-kreativitas-tanpa-batas",
    title: "Streetwear Lokal & Ekspresi Diri: Pergerakan Anak Muda Hari Ini",
    content: "Bagi anak muda hari ini, pakaian adalah kanvas untuk mengekspresikan diri. Era di mana brand luar negeri mendominasi gaya jalanan telah bergeser. Kini, brand lokal streetwear menjadi pilihan utama karena membawa cerita yang lebih relevan dan dekat dengan keseharian kita.\n\nKhai Apparel hadir sejak 2017 bukan hanya untuk menjual produk sandang, melainkan untuk mendukung pergerakan kreatif ini. Dari kolaborasi dengan seniman grafiti lokal hingga mensponsori ajang kompetisi skateboard komunitas, kami ingin memastikan kreativitas anak muda terus bergaung.\n\n### Mengapa Streetwear Lokal Makin Kuat?\n- **Desain Otentik**: Menampilkan pesan-pesan sosial, humor lokal, dan estetik jalanan nusantara.\n- **Kualitas Bersaing**: Menggunakan material katun premium dan jahitan rantai kokoh yang tidak kalah dari brand internasional.\n- **Dukungan Komunitas**: Membeli produk lokal berarti mendukung ekosistem kreatif lokal untuk terus tumbuh.\n\nMari bangga menggunakan produk dalam negeri dan jadilah bagian dari pergerakan budaya ini!",
    excerpt: "Mengapa gaya streetwear lokal semakin digandrungi anak muda? Ini tentang kebanggaan produk buatan Indonesia dan wadah berekspresi.",
    image_url: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1974&auto=format&fit=crop",
    author: "Khai Crew"
  },
  {
    id: "3",
    date: "2026-05-24",
    slug: "tips-tampil-sporty-casual-nyaman-aktivitas",
    title: "5 Tips Tampil Sporty & Casual Tanpa Kehilangan Kenyamanan",
    content: "Mobilitas anak muda perkotaan saat ini sangat tinggi. Pagi berolahraga ringan atau bersepeda, siang harus kuliah atau rapat, dan sore dilanjutkan dengan nongkrong bareng komunitas. Membawa baju ganti cadangan yang banyak tentu sangat merepotkan.\n\nSolusinya adalah gaya **Sporty Casual (Athleisure)**. Berikut adalah 5 tips memadukan pakaian kasual agar tetap nyaman berolahraga ringan dan tetap terlihat trendi saat bersosialisasi:\n\n### 1. Pilih Bahan Berdaya Serap Tinggi (Breathable)\nPastikan kaos atau jersey kamu menggunakan bahan katun berkualitas atau dry-fit ringan agar sirkulasi udara tetap terjaga saat kamu mulai aktif bergerak.\n\n### 2. Sediakan Outer Serbaguna\nJaket parasit atau vest dari Khai adalah pilihan terbaik. Mudah dilipat, melindungi dari angin/gerimis saat bersepeda, dan instan membuat penampilanmu lebih rapi saat dipakai di atas kaos polos.\n\n### 3. Topi (Cap) sebagai Penyelamat\nBad hair day setelah berolahraga atau memakai helm? Gunakan trucker cap atau dad hat Khai Apparel untuk menyembunyikannya sekaligus menambahkan aksen gaya street yang kuat.\n\n### 4. Celana Pendek Kasual\nCelana pendek bahan parasut atau kanvas ringan memberikan ruang gerak bebas untuk bersepeda atau berjalan kaki, namun tetap santai dan pantas dipakai nongkrong di kafe.\n\n### 5. Alas Kaki yang Tepat\nSandal selop premium dengan kaos kaki tebal bermotif dari Khai memberikan kenyamanan maksimal untuk pemulihan kaki pasca lari, sekaligus menjadi tren gaya urban yang sedang populer saat ini.\n\nTetap aktif, tetap sehat, dan jangan lupa untuk selalu mengekspresikan diri dengan gaya ternyamanmu!",
    excerpt: "Ingin tampil aktif dan sporty namun tetap santai saat nongkrong? Berikut panduan padu padan apparel kasual untuk berbagai aktivitas harianmu.",
    image_url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop",
    author: "Coach Dimas"
  }
];

export type FetchError = {
  type: "config_missing" | "api_blocked" | "not_public" | "parse_error" | "unknown";
  message: string;
  detail?: string;
};

function parseRows(rows: any[][]): GPost[] {
  return rows
    .filter((row) => row && row.length >= 2 && row[1])
    .map((row) => ({
      id: String(row[0] || ""),
      title: String(row[1] || ""),
      slug: String(row[2] || ""),
      date: String(row[3] || ""),
      author: String(row[4] || ""),
      image_url: String(row[5] || ""),
      excerpt: String(row[6] || ""),
      content: String(row[7] || ""),
    }));
}

export const googleSheetsService = {
  async getPosts(): Promise<GPost[]> {
    const { apiKey, spreadsheetId, sheetName } = SHEETS_CONFIG;

    if (!spreadsheetId) {
      console.warn("Spreadsheet ID missing, using mock data.");
      return MOCK_POSTS;
    }

    const range = `${sheetName}!A2:H100`;

    // 1. Try Google Sheets API v4
    if (apiKey) {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
        console.log("Fetching via Sheets API v4...");
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const rows = data.values || [];
          if (rows.length > 0) {
            console.log(`Sheets API v4: ${rows.length} rows loaded.`);
            return parseRows(rows);
          }
        } else {
          console.warn(`Sheets API v4 failed: ${res.status} ${res.statusText}`);
        }
      } catch (e) {
        console.warn("Sheets API v4 error:", e);
      }
    }

    // 2. Fallback: GViz public endpoint
    try {
      const gvizUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
      console.log("Fetching via GViz fallback...");
      const res = await fetch(gvizUrl);
      if (!res.ok) throw new Error(`GViz fetch failed: ${res.status}`);

      const text = await res.text();
      const jsonText = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);
      const jsonData = JSON.parse(jsonText);
      const gvizRows = jsonData.table.rows || [];

      if (gvizRows.length === 0) return MOCK_POSTS;

      console.log(`GViz: ${gvizRows.length} rows loaded.`);
      return gvizRows.map((row: any) => {
        const c = row.c;
        return {
          id: String(c[0]?.v ?? ""),
          title: String(c[1]?.v ?? ""),
          slug: String(c[2]?.v ?? ""),
          date: String(c[3]?.f ?? c[3]?.v ?? ""),
          author: String(c[4]?.v ?? ""),
          image_url: String(c[5]?.v ?? ""),
          excerpt: String(c[6]?.v ?? ""),
          content: String(c[7]?.v ?? ""),
        };
      });
    } catch (e) {
      console.error("GViz fallback error:", e);
    }

    // 3. Final fallback: mock data
    console.warn("All fetch methods failed, using mock data.");
    return MOCK_POSTS;
  },

  async getPostBySlug(slug: string): Promise<GPost | null> {
    const posts = await this.getPosts();
    return posts.find((p) => p.slug === slug) || null;
  },
};
