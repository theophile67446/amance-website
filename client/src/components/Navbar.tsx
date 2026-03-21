import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Heart, ChevronDown, Globe, LayoutDashboard, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/_core/hooks/useAuth";

const PRIMARY_LOGO_URL = "/logo.png";
const FALLBACK_LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663349492546/QAH5oD3g9NaLpXrMvyrp4h/amance-logo_b61079fb.webp";

export default function Navbar() {
  const [logoSrc, setLogoSrc] = useState(PRIMARY_LOGO_URL);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [location, setLocation] = useLocation();
  const { t, i18n } = useTranslation();
  const { user, logout, loading } = useAuth();

  const isAdmin = user?.role === "admin";

  const isFrench = i18n.language.startsWith("fr");
  const nextLangLabel = isFrench ? "EN" : "FR";
  const nextLangCode = isFrench ? "en" : "fr";

  const toggleLanguage = () => {
    i18n.changeLanguage(nextLangCode);
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
        { label: t("nav.humanitarian"), href: "/nos-actions#smile" },
        { label: t("nav.health"), href: "/nos-actions#education" },
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
    setMobileExpanded(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMobileSection = (label: string) => {
    setMobileExpanded((prev) => (prev === label ? null : label));
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      setLocation("/");
    } catch {
      // Keep UX non-blocking even if logout endpoint is temporarily unavailable.
      setLocation("/");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/98 backdrop-blur-md shadow-md border-b border-gray-100"
        : "bg-white/90 backdrop-blur-sm shadow-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0">
            <img
              src={logoSrc}
              alt="AMANCE Logo"
              className="h-10 w-10 sm:h-13 sm:w-13 object-contain flex-shrink-0"
              onError={() => {
                if (logoSrc !== FALLBACK_LOGO_URL) {
                  setLogoSrc(FALLBACK_LOGO_URL);
                }
              }}
            />
            <div className="hidden xs:block min-w-0">
              <div className="text-lg sm:text-xl font-extrabold leading-tight font-heading text-amance-blue truncate">
                AMANCE
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500 leading-tight truncate">
                Angel Mary Association
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${location === link.href
                    ? "bg-amance-green text-white"
                    : "text-gray-700 hover:bg-amance-green hover:text-white"
                    }`}
                >
                  {link.label}
                  {link.children && <ChevronDown size={13} />}
                </Link>

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

          <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
            <button
              onClick={toggleLanguage}
              title={isFrench ? "Switch to English" : "Passer en français"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-700 border border-gray-200 hover:border-amance-green hover:text-amance-green transition-colors"
            >
              <Globe size={15} />
              <span>{nextLangLabel}</span>
            </button>
            {isAdmin && !loading && (
              <>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold text-amance-blue border border-gray-200 hover:border-amance-blue hover:bg-amance-blue hover:text-white transition-colors"
                >
                  <LayoutDashboard size={15} />
                  Tableau de bord
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={15} />
                  Déconnexion
                </button>
              </>
            )}
            <Link
              href="/faire-un-don"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-white text-sm bg-amance-green hover:bg-amance-green-dark transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Heart size={14} fill="white" />
              {t("nav.donate")}
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={toggleLanguage}
              title={isFrench ? "Switch to English" : "Passer en français"}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:border-amance-green hover:text-amance-green transition-colors"
            >
              <Globe size={14} />
              <span className="text-xs font-bold">{nextLangLabel}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div
            className="px-3 py-3 space-y-0.5 overflow-y-auto"
            style={{ maxHeight: "calc(100dvh - 4rem)" }}
          >
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => toggleMobileSection(link.label)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={16}
                        className={`flex-shrink-0 text-amance-green transition-transform duration-200 ${mobileExpanded === link.label ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    {mobileExpanded === link.label && (
                      <div className="mt-0.5 mb-1 ml-4 pl-3 border-l-2 border-amance-green/30 space-y-0.5">
                        <Link
                          href={link.href}
                          className="block px-3 py-2 rounded-lg text-sm font-semibold text-amance-blue hover:bg-amance-blue/5 transition-colors"
                        >
                          → Voir tout
                        </Link>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-amance-green hover:text-white transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${location === link.href
                      ? "bg-amance-green text-white"
                      : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                      }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-3 pb-2 border-t border-gray-100 mt-2">
              {isAdmin && !loading && (
                <div className="space-y-2 mb-3">
                  <Link
                    href="/admin"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full font-bold text-sm text-amance-blue border border-amance-blue/30 hover:bg-amance-blue hover:text-white transition-all duration-300"
                  >
                    <LayoutDashboard size={16} />
                    Tableau de bord
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full font-bold text-sm text-red-600 border border-red-200 hover:bg-red-50 transition-all duration-300"
                  >
                    <LogOut size={16} />
                    Déconnexion
                  </button>
                </div>
              )}
              <Link
                href="/faire-un-don"
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full font-bold text-white bg-amance-green hover:bg-amance-green-dark transition-all duration-300 shadow-md"
              >
                <Heart size={16} fill="white" />
                {t("nav.donate")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
