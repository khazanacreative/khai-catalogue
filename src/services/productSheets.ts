import { CATALOG_ITEMS } from "@/src/data/catalogProducts";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  description: string;
  image_url: string;
  images: string[];
  stock: string;
  category: string;
  colors: string[];
  sizes: string[];
  wa_number: string;
}

const SHEETS_CONFIG = {
  apiKey: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || "AIzaSyCchtBn4Xt0Lq8HaY7bife82s_XryIgkxU",
  spreadsheetId: import.meta.env.VITE_SPREADSHEET_ID || "17nzSLK0wuYpSOdTLBfGwY-ygTEODqSo6jxtt0Bxv7S4",
};

const PRODUCT_SHEETS = ["Apparel", "Sock", "Bag", "Suvenir", "T-shirt"];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseCSV(val: string): string[] {
  if (!val || val === "-") return [];
  return val.split(",").map((s) => s.trim()).filter(Boolean);
}

/**
 * Spreadsheet columns (A-K):
 * A: id | B: name | C: price | D: image_url | E: stock | F: description
 * G: slug | H: colors (comma-sep) | I: sizes (comma-sep) | J: extra_images (comma-sep URLs) | K: wa_number
 */
function parseRows(rows: any[][], category: string): Product[] {
  return rows
    .filter((row) => {
      const val = String(row[1] || "").toLowerCase();
      return val && val !== "name";
    })
    .map((row) => {
      const name = String(row[1] || "");
      const mainImage = String(row[3] || "");
      const extraImages = parseCSV(String(row[9] || ""));
      const allImages = [mainImage, ...extraImages].filter(Boolean);

      return {
        id: String(row[0] || ""),
        name,
        price: String(row[2] || "0"),
        image_url: mainImage,
        images: allImages,
        stock: String(row[4] || "0"),
        description: String(row[5] || ""),
        slug: String(row[6] || "") || slugify(name),
        colors: parseCSV(String(row[7] || "")),
        sizes: parseCSV(String(row[8] || "")),
        wa_number: String(row[10] || ""),
        category,
      };
    });
}

async function fetchSheet(sheetName: string): Promise<Product[]> {
  const { apiKey, spreadsheetId } = SHEETS_CONFIG;
  const range = `${sheetName}!A2:K100`;

  if (apiKey) {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const rows = data.values || [];
        if (rows.length > 0) return parseRows(rows, sheetName);
      }
    } catch (e) {
      console.warn(`API v4 error for ${sheetName}:`, e);
    }
  }

  try {
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
    const res = await fetch(gvizUrl);
    if (!res.ok) throw new Error(`GViz ${res.status}`);
    const text = await res.text();
    const jsonText = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);
    const jsonData = JSON.parse(jsonText);
    const gvizRows = jsonData.table.rows || [];
    return gvizRows
      .map((row: any) => {
        const c = row.c;
        const name = String(c[1]?.v ?? "").trim();
        const mainImage = String(c[3]?.v ?? "");
        const extraImages = parseCSV(String(c[9]?.v ?? ""));
        const allImages = [mainImage, ...extraImages].filter(Boolean);

        return {
          id: String(c[0]?.v ?? ""),
          name,
          price: String(c[2]?.v ?? "0"),
          image_url: mainImage,
          images: allImages,
          stock: String(c[4]?.v ?? "0"),
          description: String(c[5]?.v ?? ""),
          slug: String(c[6]?.v ?? "") || slugify(name),
          colors: parseCSV(String(c[7]?.v ?? "")),
          sizes: parseCSV(String(c[8]?.v ?? "")),
          wa_number: String(c[10]?.v ?? ""),
          category: sheetName,
        };
      })
      .filter((item: Product) => {
        const n = item.name.toLowerCase().trim();
        return n && !n.includes("name") && !n.includes("nama");
      });
  } catch (e) {
    console.warn(`GViz error for ${sheetName}:`, e);
  }

  return [];
}

export const productSheetsService = {
  getCategories(): string[] {
    return PRODUCT_SHEETS;
  },

  async getProducts(category?: string): Promise<Product[]> {
    const sheets = category ? [category] : PRODUCT_SHEETS;
    const results = await Promise.all(sheets.map((s) => fetchSheet(s)));
    const products = results.flat();

    if (products.length === 0) {
      console.warn("All sheets empty or failed to load, falling back to local static catalog.");
      const filteredStatic = category
        ? CATALOG_ITEMS.filter((item) => item.category.toLowerCase() === category.toLowerCase())
        : CATALOG_ITEMS;

      return filteredStatic.map((item, index) => {
        const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return {
          id: `static-${index}`,
          name: item.name,
          slug: slug,
          price: "150000", // Fallback price
          description: item.descId,
          image_url: item.image || "",
          images: item.image ? [item.image] : [],
          stock: item.status === "ready" ? "10" : "0",
          category: item.category,
          colors: item.category === "Apparel" || item.category === "Outerwear" ? ["Black", "White", "Navy"] : [],
          sizes: item.category === "Apparel" || item.category === "Outerwear" ? ["S", "M", "L", "XL"] : [],
          wa_number: "6282245767700"
        };
      });
    }
    return products;
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const all = await this.getProducts();
    return all.find((p) => p.slug === slug) || null;
  },
};
