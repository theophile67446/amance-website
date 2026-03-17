import { Link } from "wouter";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Heart, ArrowRight } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663349492546/QAH5oD3g9NaLpXrMvyrp4h/amance-logo_b61079fb.webp";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--amance-blue-dark)" }} className="text-white">
      {/* Newsletter Banner */}
      <div style={{ backgroundColor: "var(--amance-green)" }} className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3
                className="text-xl font-bold text-white mb-1"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Restez informé de nos actions
              </h3>
              <p className="text-green-100 text-sm">
                Recevez nos actualités, rapports d'impact et appels à l'action directement dans votre boîte mail.
              </p>
            </div>
            <form
              className="flex gap-2 w-full md:w-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                className="flex-1 md:w-72 px-4 py-3 rounded-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:opacity-90 flex-shrink-0"
                style={{ backgroundColor: "var(--amance-blue)", fontFamily: "Montserrat, sans-serif" }}
              >
                S'inscrire <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <img src={LOGO_URL} alt="AMANCE Logo" className="h-16 w-16 object-contain" />
                <div>
                  <div
                    className="text-xl font-extrabold text-white"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    AMANCE
                  </div>
                  <div className="text-xs text-gray-400">Cameroun</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-5" style={{ fontFamily: "Open Sans, sans-serif" }}>
                <em>"Speak up for those who cannot speak for themselves"</em>
                <br />
                <span className="text-xs text-gray-400">— Proverbes 31:8</span>
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--amance-green)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)";
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className="text-sm font-bold uppercase tracking-wider mb-5"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-green-light)" }}
              >
                Navigation
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Accueil", href: "/" },
                  { label: "À Propos", href: "/a-propos" },
                  { label: "Nos Actions", href: "/nos-actions" },
                  { label: "Nos Projets", href: "/projets" },
                  { label: "Actualités", href: "/actualites" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                      style={{ fontFamily: "Open Sans, sans-serif" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors"
                        style={{ backgroundColor: "var(--amance-green)" }}
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div>
              <h4
                className="text-sm font-bold uppercase tracking-wider mb-5"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-green-light)" }}
              >
                Nos Domaines
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Aide Humanitaire & Sociale", href: "/nos-actions#humanitaire" },
                  { label: "Santé & Bien-être", href: "/nos-actions#sante" },
                  { label: "Développement Communautaire", href: "/nos-actions#communautaire" },
                  { label: "Conservation Environnementale", href: "/nos-actions#conservation" },
                  { label: "Éducation Environnementale", href: "/nos-actions#conservation" },
                  { label: "S'impliquer", href: "/s-impliquer" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2"
                      style={{ fontFamily: "Open Sans, sans-serif" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "var(--amance-green)" }}
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="text-sm font-bold uppercase tracking-wider mb-5"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-green-light)" }}
              >
                Contact
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--amance-green-light)" }} />
                  <span className="text-gray-300 text-sm" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    Buea, Division du Fako<br />
                    Région du Sud-Ouest<br />
                    Cameroun
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="flex-shrink-0" style={{ color: "var(--amance-green-light)" }} />
                  <a
                    href="tel:+237674943368"
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                    style={{ fontFamily: "Open Sans, sans-serif" }}
                  >
                    +237 674 943 368
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="flex-shrink-0" style={{ color: "var(--amance-green-light)" }} />
                  <a
                    href="tel:+237689314418"
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                    style={{ fontFamily: "Open Sans, sans-serif" }}
                  >
                    +237 689 314 418
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="flex-shrink-0" style={{ color: "var(--amance-green-light)" }} />
                  <a
                    href="mailto:infos@amance.org"
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                    style={{ fontFamily: "Open Sans, sans-serif" }}
                  >
                    infos@amance.org
                  </a>
                </li>
              </ul>

              <div className="mt-6">
                <Link
                  href="/faire-un-don"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full text-sm font-bold text-white transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
                >
                  <Heart size={16} fill="white" />
                  Faire un Don
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-6" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-xs" style={{ fontFamily: "Open Sans, sans-serif" }}>
              © {new Date().getFullYear()} AMANCE — Angel Mary Association for the Needy and Conservation Education. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/mentions-legales" className="text-gray-400 hover:text-white text-xs transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-de-confidentialite" className="text-gray-400 hover:text-white text-xs transition-colors">
                Confidentialité
              </Link>
              <span className="text-gray-500 text-xs flex items-center gap-1">
                Fait avec <Heart size={10} fill="currentColor" style={{ color: "var(--amance-green-light)" }} /> au Cameroun
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
