

## Perbaikan Link WhatsApp untuk Kompatibilitas Desktop

### Masalah
Link `https://wa.me/...` kadang hanya membuka WhatsApp Web di browser, bukan WhatsApp Desktop, tergantung pengaturan browser pengguna.

### Solusi
Gunakan protocol `https://api.whatsapp.com/send` sebagai alternatif yang lebih reliabel untuk desktop, atau tambahkan fallback `whatsapp://send` untuk memicu deep link ke aplikasi desktop.

### Perubahan

**1. Semua file yang menggunakan link WhatsApp** (`Footer.tsx`, `Home.tsx`, `Contact.tsx`, `ProductDetail.tsx`):
- Ganti format URL dari `https://wa.me/{number}` menjadi `https://api.whatsapp.com/send/?phone={number}&text=...`
- Format `api.whatsapp.com` lebih konsisten membuka aplikasi desktop ketika tersedia

**2. `ProductDetail.tsx`** — perbaikan tambahan:
- Hapus fungsi `handleBuyWhatsApp` yang menggunakan `window.open()` (rentan diblokir pop-up blocker)
- Sudah menggunakan tag `<a>` langsung, jadi cukup update URL format-nya saja

### File yang diubah
- `src/components/Footer.tsx`
- `src/pages/Home.tsx`
- `src/pages/Contact.tsx`
- `src/pages/ProductDetail.tsx`

