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

const PRODUCT_SHEETS = ["Apparel", "Sock", "Bag", "Suvenir", "T-shirt", "Headwear", "Footwear", "Outerwear"];

export const productSheetsService = {
  getCategories(): string[] {
    return PRODUCT_SHEETS;
  },

  async getProducts(category?: string): Promise<Product[]> {
    const filteredStatic = category
      ? CATALOG_ITEMS.filter((item) => item.category.toLowerCase() === category.toLowerCase())
      : CATALOG_ITEMS;

    return filteredStatic.map((item, index) => {
      const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return {
        id: `static-${index}`,
        name: item.name,
        slug: slug,
        price: item.price,
        description: item.descId,
        image_url: item.image || "",
        images: item.image ? [item.image] : [],
        stock: item.stock,
        category: item.category,
        colors: item.colors,
        sizes: item.sizes,
        wa_number: item.wa_number
      };
    });
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const all = await this.getProducts();
    return all.find((p) => p.slug === slug) || null;
  },
};
