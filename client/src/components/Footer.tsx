import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Heart, ArrowRight } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663349492546/QAH5oD3g9NaLpXrMvyrp4h/amance-logo_b61079fb.webp";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-amance-blue-dark text-white">
      {/* Newsletter Banner */}
      <div className="bg-white/5 border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold font-heading text-white mb-2">
                {t("footer.newsletter.title")}
              </h3>
              <p className="text-gray-300 text-sm font-sans max-w-lg mx-auto lg:mx-0">
                {t("footer.newsletter.subtitle")}
              </p>
            </div>
            <form
              className="flex gap-2 w-full md:w-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={t("footer.newsletter.placeholder")}
                className="flex-1 md:w-80 px-5 py-3.5 rounded-full font-sans text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-amance-green shadow-inner"
              />
              <button
                type="submit"
                className="btn-primary"
              >
                {t("footer.newsletter.button")} <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4 lg:pr-8">
              <div className="flex items-center gap-3 mb-5">
                <img src={LOGO_URL} alt="AMANCE Logo" className="h-16 w-16 object-contain" />
                <div>
                  <div className="text-xl font-extrabold font-heading text-white">
                    AMANCE
                  </div>
                  <div className="text-xs text-gray-400">{t("footer.brand.location")}</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm font-sans leading-relaxed mb-5">
                <em>{t("footer.brand.tagline")}</em>
                <br />
                <span className="text-xs text-gray-400">— {t("footer.brand.source")}</span>
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
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-amance-green transition-all duration-200 hover:scale-110"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-bold font-heading uppercase tracking-widest text-amance-green-light mb-6">
                {t("footer.sections.nav")}
              </h4>
              <ul className="space-y-3">
                {[
                  { label: t("nav.home"), href: "/" },
                  { label: t("nav.about"), href: "/a-propos" },
                  { label: t("nav.actions"), href: "/nos-actions" },
                  { label: t("nav.projects"), href: "/projets" },
                  { label: t("nav.news"), href: "/actualites" },
                  { label: t("nav.contact"), href: "/contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white text-sm font-sans transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-amance-green transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold font-heading uppercase tracking-widest text-amance-green-light mb-6">
                {t("footer.sections.domains")}
              </h4>
              <ul className="space-y-3">
                {[
                  { label: t("nav.humanitarian"), href: "/nos-actions#smile" },
                  { label: t("nav.health"), href: "/nos-actions#education" },
                  { label: t("nav.community"), href: "/nos-actions#communautaire" },
                  { label: t("nav.environment"), href: "/nos-actions#conservation" },
                  { label: t("nav.getInvolved"), href: "/s-impliquer" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white text-sm font-sans transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-amance-green" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold font-heading uppercase tracking-widest text-amance-green-light mb-6">
                {t("footer.sections.contact")}
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5 text-amance-green-light" />
                  <span className="text-gray-300 text-sm font-sans">
                    Buea, Division du Fako<br />
                    Région du Sud-Ouest<br />
                    Cameroun
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="flex-shrink-0 text-amance-green-light" />
                  <a
                    href="tel:+237674943368"
                    className="text-gray-300 font-sans hover:text-white text-sm transition-colors"
                  >
                    +237 674 943 368
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="flex-shrink-0 text-amance-green-light" />
                  <a
                    href="tel:+237689314418"
                    className="text-gray-300 font-sans hover:text-white text-sm transition-colors"
                  >
                    +237 689 314 418
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="flex-shrink-0 text-amance-green-light" />
                  <a
                    href="mailto:infos@amance.org"
                    className="text-gray-300 font-sans hover:text-white text-sm transition-colors"
                  >
                    infos@amance.org
                  </a>
                </li>
              </ul>

              <div className="mt-8">
                <Link
                  href="/faire-un-don"
                  className="btn-primary w-full"
                >
                  <Heart size={16} fill="white" />
                  {t("nav.donate")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 font-sans text-xs">
              {t("footer.bottom.copyright", { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center gap-4">
              <Link href="/mentions-legales" className="text-gray-400 hover:text-white text-xs transition-colors">
                {t("footer.bottom.legal")}
              </Link>
              <Link href="/politique-de-confidentialite" className="text-gray-400 hover:text-white text-xs transition-colors">
                {t("footer.bottom.privacy")}
              </Link>
              <span className="text-gray-500 font-sans text-xs flex items-center gap-1">
                {t("footer.bottom.made_with")} <Heart size={10} fill="currentColor" className="text-amance-green-light" /> {t("footer.bottom.at")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
