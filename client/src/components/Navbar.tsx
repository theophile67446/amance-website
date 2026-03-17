import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Heart, ChevronDown } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663349492546/QAH5oD3g9NaLpXrMvyrp4h/amance-logo_b61079fb.webp";

const navLinks = [
  { label: "Accueil", href: "/" },
  {
    label: "À Propos",
    href: "/a-propos",
    children: [
      { label: "Mission & Vision", href: "/a-propos#mission" },
      { label: "Notre Équipe", href: "/a-propos#equipe" },
      { label: "Transparence", href: "/a-propos#transparence" },
    ],
  },
  {
    label: "Nos Actions",
    href: "/nos-actions",
    children: [
      { label: "Aide Humanitaire", href: "/nos-actions#humanitaire" },
      { label: "Santé & Bien-être", href: "/nos-actions#sante" },
      { label: "Développement Communautaire", href: "/nos-actions#communautaire" },
      { label: "Conservation Environnementale", href: "/nos-actions#conservation" },
    ],
  },
  { label: "Projets", href: "/projets" },
  { label: "Actualités", href: "/actualites" },
  {
    label: "S'impliquer",
    href: "/s-impliquer",
    children: [
      { label: "Devenir Bénévole", href: "/s-impliquer#benevole" },
      { label: "Devenir Partenaire", href: "/s-impliquer#partenaire" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [location] = useLocation();

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
          ? "bg-white shadow-lg border-b border-gray-100"
          : "bg-white/95 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src={LOGO_URL}
              alt="AMANCE Logo"
              className="h-14 w-14 object-contain"
            />
            <div className="hidden sm:block">
              <div
                className="text-xl font-extrabold leading-tight"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
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
                      ? "text-white"
                      : "text-gray-700 hover:text-white"
                  }`}
                  style={
                    location === link.href
                      ? { backgroundColor: "var(--amance-green)" }
                      : undefined
                  }
                  onMouseEnter={(e) => {
                    if (location !== link.href) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--amance-green)";
                      (e.currentTarget as HTMLElement).style.color = "white";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location !== link.href) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "";
                      (e.currentTarget as HTMLElement).style.color = "";
                    }
                  }}
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
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:text-white transition-colors duration-150"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "var(--amance-green)";
                          (e.currentTarget as HTMLElement).style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "";
                          (e.currentTarget as HTMLElement).style.color = "";
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Donation Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/faire-un-don"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--amance-green-dark)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--amance-green)";
              }}
            >
              <Heart size={16} fill="white" />
              Faire un Don
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-white transition-colors"
                  style={{ fontFamily: "Open Sans, sans-serif" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--amance-green)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "";
                    (e.currentTarget as HTMLElement).style.color = "";
                  }}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 space-y-1 mt-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 rounded-lg text-xs text-gray-500 hover:text-white transition-colors"
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "var(--amance-blue)";
                          (e.currentTarget as HTMLElement).style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "";
                          (e.currentTarget as HTMLElement).style.color = "";
                        }}
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
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
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
