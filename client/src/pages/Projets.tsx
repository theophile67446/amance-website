import Layout from "@/components/Layout";
import { Link } from "wouter";
import { useState } from "react";
import {
  TreePine,
  HandHeart,
  Stethoscope,
  Home as HomeIcon,
  MapPin,
  ArrowRight,
  Loader,
  Leaf,
  Calendar,
  Heart,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { formatDate } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import ShareActions from "@/components/ShareActions";

const HERO_PROJETS = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80";

export default function Projets() {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const queryInput = activeFilter === "all" ? undefined : { category: activeFilter as any };
  const isEn = i18n.language.startsWith('en');

  const { data: projects = [], isLoading } = trpc.projects.list.useQuery(queryInput);

  const categoryConfig = {
    conservation: { label: t("projects.filters.conservation"), color: "var(--amance-blue-light)" },
    humanitaire: { label: t("projects.filters.humanitaire"), color: "var(--amance-green)" },
    sante: { label: t("projects.filters.sante"), color: "var(--amance-blue)" },
    communautaire: { label: t("projects.filters.communautaire"), color: "var(--amance-green-dark)" },
  };

  const statusConfig = {
    en_cours: { label: t("projects.status.en_cours"), color: "var(--amance-green)", bg: "rgba(42, 100, 60, 0.2)" },
    termine: { label: t("projects.status.termine"), color: "var(--amance-blue)", bg: "rgba(22, 36, 71, 0.2)" },
    planifie: { label: t("projects.status.planifie"), color: "#f59e0b", bg: "rgba(245, 158, 11, 0.2)" },
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, typeof TreePine> = {
      conservation: TreePine,
      humanitaire: HandHeart,
      sante: Stethoscope,
      communautaire: HomeIcon,
    };
    return icons[category] || HomeIcon;
  };

  const getStatusIcon = (status: string) => {
    // Return appropriate icons if needed, using TreePine as default for now as in original
    return TreePine;
  };

  const filters = [
    { value: "all", label: t("projects.filters.all") },
    { value: "conservation", label: t("projects.filters.conservation") },
    { value: "humanitaire", label: t("projects.filters.humanitaire") },
    { value: "sante", label: t("projects.filters.sante") },
    { value: "communautaire", label: t("projects.filters.communautaire") },
  ];

  return (
    <Layout>
      <SEO title={t("projects.hero.seo_title")} description={t("projects.hero.seo_desc")} />
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_PROJETS})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(22,36,71,0.90) 0%, rgba(42,100,60,0.80) 100%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <Leaf size={14} />
            {t("projects.hero.badge")}
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("projects.hero.title")}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
            {t("projects.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: activeFilter === f.value ? "var(--amance-green)" : "oklch(0.97 0.005 240)",
                  color: activeFilter === f.value ? "white" : "var(--amance-blue)",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="mb-8 flex items-center justify-between gap-3 flex-wrap">
            <p className="text-sm text-gray-500" style={{ fontFamily: "Open Sans, sans-serif" }}>
              Aidez-nous a diffuser ces projets autour de vous.
            </p>
            <ShareActions
              title={t("projects.hero.title")}
              summary={t("projects.hero.subtitle")}
              path="/projets"
              compact
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader size={48} className="animate-spin text-gray-300" />
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => {
                const cat = categoryConfig[project.category as keyof typeof categoryConfig] ?? {
                  label: project.category || "Projet",
                  color: "var(--amance-blue)",
                };
                const status = statusConfig[project.status as keyof typeof statusConfig] ?? {
                  label: project.status || "Statut",
                  color: "var(--amance-blue)",
                  bg: "rgba(22, 36, 71, 0.2)",
                };

                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={project.coverImage || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"}
                        alt={(isEn && project.titleEn) ? project.titleEn : project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <div
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: cat.color }}
                        >
                          {(() => {
                            const Icon = getCategoryIcon(project.category);
                            return <Icon size={12} />;
                          })()}
                          {cat.label}
                        </div>
                      </div>
                      <div
                        className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: status.bg, color: status.color }}
                      >
                        {(() => {
                          const Icon = getStatusIcon(project.status);
                          return <Icon size={12} />;
                        })()}
                        {status.label}
                      </div>
                      {project.featured && (
                        <div
                          className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                        >
                          ⭐ {t("projects.card.featured")}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                        <MapPin size={12} />
                        <span>{project.location}</span>
                        <span>·</span>
                        <Calendar size={12} />
                        <span>{project.startDate ? formatDate(project.startDate) : t("projects.card.date_upcoming")}</span>
                      </div>

                      <h3
                        className="text-lg font-bold mb-3"
                        style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                      >
                        {(isEn && project.titleEn) ? project.titleEn : project.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5" style={{ fontFamily: "Open Sans, sans-serif" }}>
                        {(isEn && project.descriptionEn) ? project.descriptionEn : project.description}
                      </p>

                      {/* Impact */}
                      <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-xl" style={{ backgroundColor: "oklch(0.97 0.005 240)" }}>
                        {(Array.isArray(project.impact) ? project.impact : []).map((stat: any, j: number) => (
                          <div key={j} className="text-center">
                            <div
                              className="text-base font-extrabold"
                              style={{ fontFamily: "Montserrat, sans-serif", color: cat.color }}
                            >
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* SDGs */}
                      <div className="flex items-center gap-2 mb-5">
                        <span className="text-xs text-gray-400">ODD :</span>
                        {(Array.isArray(project.sdgs) ? project.sdgs : []).map((sdg: any) => (
                          <span
                            key={sdg}
                            className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: "var(--amance-blue)" }}
                          >
                            {sdg}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/projets/${project.slug}`}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:opacity-90"
                        style={{ backgroundColor: cat.color, fontFamily: "Montserrat, sans-serif" }}
                      >
                        {t("projects.card.learn_more")} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600">{t("projects.card.no_projects")}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, var(--amance-blue-dark) 0%, var(--amance-blue) 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("projects.cta.title")}
          </h2>
          <p className="text-lg text-blue-200 mb-10" style={{ fontFamily: "Open Sans, sans-serif" }}>
            {t("projects.cta.subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/faire-un-don"
              className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 shadow-lg"
              style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
            >
              <Heart size={18} fill="white" />
              {t("projects.cta.cta_donate")}
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white border-2 border-white transition-all duration-300 hover:bg-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--amance-blue)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
            >
              {t("projects.cta.cta_partner")} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
