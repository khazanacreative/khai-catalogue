import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";

const CONTACT_INFO = {
  address: "Natura Residences Cluster Springfield A5-11, Buduran, Sidoarjo, Jawa Timur, Indonesia 61252",
  phone: "+62 878-7864-4521",
  waNumber: "6287878644521",
  email: "hello@sheetcatalog.com",
  hours: { id: "Senin - Sabtu, 08:00 - 17:00 WIB", en: "Monday - Saturday, 08:00 - 17:00 WIB" },
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2736173007323!2d112.7303038!3d-7.4349174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e6b840cf200d%3A0xeab50d4ff156a93b!2sNatura%20Residences!5e0!3m2!1sid!2sid!4v1700000000000",
};

export default function Contact() {
  const { lang } = useLanguage();

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="text-primary font-mono text-sm uppercase tracking-widest">
              {lang === "id" ? "Hubungi Kami" : "Contact Us"}
            </p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              {lang === "id" ? "Ada Pertanyaan?" : "Have Questions?"}
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              {lang === "id"
                ? "Jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda menemukan produk yang tepat."
                : "Don't hesitate to reach out. Our team is ready to help you find the right product."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
            <div className="space-y-6">
              <ContactItem icon={<MapPin className="w-5 h-5 text-primary" />} label={lang === "id" ? "Alamat" : "Address"} value={CONTACT_INFO.address} />
              <ContactItem icon={<Phone className="w-5 h-5 text-primary" />} label={lang === "id" ? "Telepon" : "Phone"} value={CONTACT_INFO.phone} />
              <ContactItem icon={<Mail className="w-5 h-5 text-primary" />} label="Email" value={CONTACT_INFO.email} />
              <ContactItem icon={<Clock className="w-5 h-5 text-primary" />} label={lang === "id" ? "Jam Operasional" : "Operating Hours"} value={lang === "id" ? CONTACT_INFO.hours.id : CONTACT_INFO.hours.en} />
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://api.whatsapp.com/send/?phone=${CONTACT_INFO.waNumber}&text=${encodeURIComponent(
                lang === "id" ? "Halo, saya ingin bertanya tentang produk Anda." : "Hello, I'd like to ask about your products."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white font-bold py-4 px-6 rounded-lg transition-colors text-base uppercase tracking-wider"
            >
              <MessageCircle className="w-5 h-5" />
              {lang === "id" ? "Chat via WhatsApp" : "Chat via WhatsApp"}
            </a>
          </motion.div>

          {/* Google Maps */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="rounded-lg overflow-hidden border border-border h-full min-h-[400px]">
              <iframe
                src={CONTACT_INFO.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
        <p className="text-foreground">{value}</p>
      </div>
    </div>
  );
}
