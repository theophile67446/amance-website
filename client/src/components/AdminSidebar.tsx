import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Mail,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Menu,
  X,
  UserCheck
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useTranslation } from "react-i18next";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const { t } = useTranslation();

  const NAV_ITEMS = [
    { id: "dashboard", label: t("admin.sidebar.dashboard"), icon: LayoutDashboard },
    { id: "articles", label: t("admin.sidebar.articles"), icon: FileText },
    { id: "projets", label: t("admin.sidebar.projects"), icon: Briefcase },
    { id: "contacts", label: t("admin.sidebar.contacts"), icon: Mail },
    { id: "registrations", label: t("admin.sidebar.registrations"), icon: Users },
    { id: "equipe", label: t("admin.sidebar.team"), icon: UserCheck },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/");
    }
  };

  const handleTabChange = (id: string) => {
    onTabChange(id);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className={`flex items-center border-b border-white/10 flex-shrink-0 ${collapsed ? "justify-center px-3 py-4" : "justify-between px-4 py-4"
          }`}
      >
        {!collapsed && (
          <Link
            href="/"
            className="flex items-center gap-2 group"
            title={t("admin.sidebar.back_to_site")}
          >
            <img
              src="/logo.png"
              alt="AMANCE"
              className="h-8 w-8 object-contain flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://d2xsxph8kpxj0f.cloudfront.net/310519663349492546/QAH5oD3g9NaLpXrMvyrp4h/amance-logo_b61079fb.webp";
              }}
            />
            <span className="text-white font-extrabold text-lg leading-tight font-heading">
              AMANCE
            </span>
          </Link>
        )}
        {collapsed && (
          <Link href="/" title={t("admin.sidebar.back_to_site")}>
            <img
              src="/logo.png"
              alt="AMANCE"
              className="h-8 w-8 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://d2xsxph8kpxj0f.cloudfront.net/310519663349492546/QAH5oD3g9NaLpXrMvyrp4h/amance-logo_b61079fb.webp";
              }}
            />
          </Link>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex-shrink-0"
          aria-label={collapsed ? "Déplier le menu" : "Replier le menu"}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      {/* Admin label */}
      {!collapsed && (
        <div className="px-4 py-3 flex-shrink-0">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
            {t("admin.sidebar.admin_label")}
          </span>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => handleTabChange(id)}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group relative ${isActive
                ? "bg-white/15 text-white shadow-lg"
                : "text-white/60 hover:bg-white/5 hover:text-white"
                } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon
                size={18}
                className={`flex-shrink-0 transition-all duration-200 ${isActive ? "text-amance-green" : "text-white/40 group-hover:text-white/80 group-hover:scale-110"
                  }`}
              />
              {!collapsed && <span className="truncate">{label}</span>}
              {!collapsed && isActive && (
                <div className="ml-auto w-1 h-4 rounded-full bg-amance-green shadow-[0_0_8px_rgba(82,180,82,0.6)]" />
              )}
              {collapsed && isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-amance-green" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Return to site link */}
      <div className="px-2 mt-auto mb-2 flex-shrink-0">
        <Link
          href="/"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/50 hover:bg-white/5 hover:text-white transition-all duration-200 group ${collapsed ? "justify-center" : ""
            }`}
          title={collapsed ? t("admin.sidebar.back_to_site") : undefined}
        >
          <ExternalLink
            size={18}
            className="flex-shrink-0 text-white/30 group-hover:text-white group-hover:scale-110"
          />
          {!collapsed && <span>{t("admin.sidebar.back_to_site")}</span>}
        </Link>
      </div>

      {/* User profile + logout */}
      <div className="border-t border-white/5 px-2 py-4 flex-shrink-0">
        {!collapsed && user && (
          <div className="flex items-center gap-3 px-3 py-2 mb-4 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amance-green to-amance-green-dark flex items-center justify-center flex-shrink-0 shadow-lg p-0.5">
               <div className="w-full h-full rounded-full bg-black/20 flex items-center justify-center">
                  <span className="text-white font-bold text-sm tracking-tighter">
                    {(user.name || user.email || "A").charAt(0).toUpperCase()}
                  </span>
               </div>
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-bold truncate tracking-tight">
                {user.name || user.email}
              </p>
              <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{t("admin.sidebar.role_admin")}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          title={collapsed ? t("admin.sidebar.logout") : undefined}
          className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-white/50 hover:bg-red-500/15 hover:text-red-400 transition-all duration-200 group ${collapsed ? "justify-center" : ""
            }`}
        >
          <LogOut
            size={18}
            className="flex-shrink-0 text-white/30 group-hover:text-red-400 group-hover:scale-110"
          />
          {!collapsed && <span>{t("admin.sidebar.logout")}</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 bg-[#122615] transition-all duration-300 ease-in-out border-r border-white/5 ${collapsed ? "w-20" : "w-64"
          }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile: hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-[70] w-12 h-12 flex items-center justify-center rounded-2xl bg-amance-green text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
        aria-label="Ouvrir le menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile: overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[80] bg-black/60 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile: drawer */}
      <aside
        className={`lg:hidden fixed left-0 top-0 bottom-0 z-[90] w-72 bg-[#122615] transform transition-transform duration-300 ease-out shadow-[10px_0_40px_rgba(0,0,0,0.5)] ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
          aria-label="Fermer le menu"
        >
          <X size={20} />
        </button>
        {sidebarContent}
      </aside>
    </>
  );
}
