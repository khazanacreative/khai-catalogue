# Khai Catalogue

Katalog resmi Khai Apparel. Aplikasi web modern berbasis React dan Vite untuk menampilkan katalog produk apparel, topi, kaos kaki, sandal, tas, dan jaket berkualitas tinggi, dengan integrasi pemesanan langsung melalui WhatsApp.

## Fitur Utama

- **Katalog Produk Dinamis**: Menampilkan berbagai produk dari kategori yang berbeda secara rapi dan estetik.
- **Integrasi Google Sheets**: Data produk dan artikel blog diambil secara dinamis menggunakan Google Sheets API untuk pengelolaan konten yang mudah tanpa memerlukan backend database yang rumit.
- **Pemesanan WhatsApp Instan**: Klik tombol beli untuk langsung membuka percakapan WhatsApp dengan detail produk, ukuran, dan warna yang dipilih otomatis terisi dalam pesan template.
- **Multi-bahasa & Tema**: Mendukung perpindahan bahasa (Indonesia & Inggris) serta mode gelap (Dark Mode) dan terang (Light Mode).
- **Desain Responsif & Premium**: Layout modern yang responsif dan dioptimalkan untuk perangkat mobile dan desktop.

## Cara Menjalankan secara Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru recommended)
- `npm` atau `bun`

### Langkah-langkah

1. **Instal Dependensi**:
   ```bash
   npm install
   ```

2. **Konfigurasi Environment**:
   Salin file `.env.example` menjadi `.env.local` atau `.env` dan masukkan API Key yang sesuai:
   ```bash
   cp .env.example .env.local
   ```
   Isi variabel-variabel berikut di dalam file `.env.local`:
   - `GEMINI_API_KEY`: API Key dari Google AI Studio (jika diperlukan untuk fitur AI).
   - `VITE_GOOGLE_SHEETS_API_KEY`: Google Sheets API Key.
   - `VITE_SPREADSHEET_ID`: ID Google Spreadsheet sumber data katalog.

3. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan secara lokal di [http://localhost:3000](http://localhost:3000).

## Deploy

Proyek ini siap dideploy ke platform seperti **Vercel**, **Netlify**, atau platform hosting statis lainnya. Konfigurasi `vercel.json` telah disediakan untuk memastikan routing SPA React Router bekerja dengan baik (termasuk redirect/rewrite semua request ke `index.html`).
