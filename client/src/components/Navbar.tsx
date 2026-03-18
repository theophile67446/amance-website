import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Heart, ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663349492546/QAH5oD3g9NaLpXrMvyrp4h/amance-logo_b61079fb.webp";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [location] = useLocation();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    {
      label: t("nav.about"),
      href: "/a-propos",
      children: [
        { label: t("nav.mission"), href: "/a-propos#mission" },
        { label: t("nav.team"), href: "/a-propos#equipe" },
        { label: t("nav.transparency"), href: "/a-propos#transparence" },
      ],
    },
    {
      label: t("nav.actions"),
      href: "/nos-actions",
      children: [
        { label: t("nav.humanitarian"), href: "/nos-actions#humanitaire" },
        { label: t("nav.health"), href: "/nos-actions#sante" },
        { label: t("nav.community"), href: "/nos-actions#communautaire" },
        { label: t("nav.environment"), href: "/nos-actions#conservation" },
      ],
    },
    { label: t("nav.projects"), href: "/projets" },
    { label: t("nav.news"), href: "/actualites" },
    {
      label: t("nav.getInvolved"),
      href: "/s-impliquer",
      children: [
        { label: t("nav.volunteer"), href: "/s-impliquer#benevole" },
        { label: t("nav.partner"), href: "/s-impliquer#partenaire" },
      ],
    },
    { label: t("nav.contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-1"
          : "bg-white/80 backdrop-blur-sm py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 transition-all duration-300">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src={LOGO_URL}
              alt="AMANCE Logo"
              className="h-14 w-14 object-contain"
            />
            <div className="hidden sm:block">
              <div
                className="text-xl font-extrabold leading-tight font-heading text-amance-blue"
              >
                AMANCE
              </div>
              <div className="text-xs text-gray-500 leading-tight max-w-[200px]">
                Angel Mary Association
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    location === link.href
                      ? "bg-amance-green text-white"
                      : "text-gray-700 hover:bg-amance-green hover:text-white"
                  }`}
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} />}
                </Link>

                {/* Dropdown */}
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm font-sans text-gray-700 hover:bg-amance-green hover:text-white transition-colors duration-150"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA & Lang */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Globe size={16} />
              {i18n.language.toUpperCase()}
            </button>
            <Link
              href="/faire-un-don"
              className="btn-primary"
            >
              <Heart size={16} fill="white" />
              {t("nav.donate")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Globe size={18} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 rounded-lg text-sm font-medium font-sans text-gray-700 hover:bg-amance-green hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 space-y-1 mt-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 rounded-lg text-xs text-gray-500 hover:bg-amance-blue hover:text-white transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/faire-un-don"
                className="btn-primary w-full"
              >
                <Heart size={16} fill="white" />
                Faire un Don
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
