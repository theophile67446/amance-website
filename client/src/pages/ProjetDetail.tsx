import { useParams } from "wouter";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Loader, ArrowLeft, MapPin, Users, Calendar, TreePine, Heart } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import ShareActions from "@/components/ShareActions";

export default function ProjetDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const { i18n, t } = useTranslation();
  const { data: project, isLoading } = trpc.projects.getBySlug.useQuery(
    slug!,
    { enabled: !!slug }
  );

  const isEn = i18n.language.startsWith('en');
  const displayTitle = (isEn && project?.titleEn) ? project.titleEn : project?.title;
  const displayDesc = (isEn && project?.descriptionEn) ? project.descriptionEn : project?.description;
  const displayFullDesc = (isEn && project?.fullDescriptionEn) ? project.fullDescriptionEn : project?.fullDescription;

  if (!slug || (!isLoading && !project)) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-32 text-center">
          <p className="text-xl font-bold text-gray-800 mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {t("project_detail.not_found")}
          </p>
          <Link href="/projets" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all shadow-md" 
            style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}>
            <ArrowLeft size={18} /> {t("project_detail.back")}
          </Link>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center py-32">
          <Loader size={48} className="animate-spin text-gray-300" />
        </div>
      </Layout>
    );
  }

  const categoryConfig: Record<string, { label: string; color: string }> = {
    conservation: { label: t("projects.filters.conservation"), color: "var(--amance-blue-light)" },
    humanitaire: { label: t("projects.filters.humanitaire"), color: "var(--amance-green)" },
    sante: { label: t("projects.filters.sante"), color: "var(--amance-blue)" },
    communautaire: { label: t("projects.filters.communautaire"), color: "var(--amance-green-dark)" },
  };

  const cat = categoryConfig[project!.category as keyof typeof categoryConfig] || { label: project!.category, color: "var(--amance-blue)" };

  return (
    <Layout>
      <SEO
        title={displayTitle || t("project_detail.not_found")}
        description={displayDesc || undefined}
        image={project!.coverImage || undefined}
      />
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[60vh] flex flex-col justify-end">
        <img
          src={project!.coverImage || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80"}
          alt={displayTitle || ""}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 w-full">
          <div>
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
              {t("project_detail.back")}
            </Link>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
              <div className="flex-1">
                <div
                  className="inline-block px-4 py-2 rounded-xl text-sm font-bold text-white mb-6 shadow-lg"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.label}
                </div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {displayTitle}
                </h1>
                <p className="text-xl sm:text-2xl text-white/80 max-w-3xl leading-relaxed">{displayDesc}</p>
              </div>
              <div className="hidden lg:block">
                <ShareActions
                  title={displayTitle || ""}
                  summary={displayDesc || ""}
                  path={`/projets/${project!.slug}`}
                  compact
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="bg-white py-12 -mt-10 md:-mt-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Location */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                  <MapPin size={20} style={{ color: cat.color }} />
                </div>
                <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest" style={{ fontFamily: "Montserrat, sans-serif" }}>
                   {t("project_detail.info.location")}
                </h3>
              </div>
              <p className="font-bold text-gray-900">{project!.location || "Cameroon"}</p>
            </div>

            {/* Status */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                  <Calendar size={20} style={{ color: cat.color }} />
                </div>
                <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {t("project_detail.info.status")}
                </h3>
              </div>
              <p className="font-bold text-gray-900">{t(`projects.status.${project!.status}`)}</p>
            </div>

            {/* Beneficiaries */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                  <Users size={20} style={{ color: cat.color }} />
                </div>
                <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {t("project_detail.info.beneficiaries")}
                </h3>
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{project!.beneficiaries || "—"}</p>
            </div>

            {/* Budget */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                  <TreePine size={20} style={{ color: cat.color }} />
                </div>
                <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest" style={{ fontFamily: "Montserrat, sans-serif" }}>
                   {t("project_detail.info.budget")}
                </h3>
              </div>
              <p className="font-bold text-gray-900">{t("project_detail.info.budget_undetermined")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 p-8 rounded-3xl border border-gray-100 bg-gray-50/50 lg:hidden text-center">
            <p className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-widest">{t("project_detail.share")}</p>
            <div className="flex justify-center">
              <ShareActions
                title={displayTitle || ""}
                summary={displayDesc || ""}
                path={`/projets/${project!.slug}`}
              />
            </div>
          </div>

          <h2
            className="text-4xl font-extrabold mb-12"
            style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
          >
            {t("project_detail.about")}
          </h2>
          <div
            className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-8 mb-16 prose max-w-none"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: displayFullDesc || displayDesc || "" }}
            />
          </div>

          {/* Impact Stats */}
          {Array.isArray(project!.impact) && project!.impact.length > 0 && (
            <div className="mb-20">
              <h3
                className="text-2xl font-extrabold mb-10"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
              >
                {t("project_detail.impact")}
              </h3>
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden"
                style={{ backgroundColor: "var(--amance-blue-dark)" }}
              >
                {project!.impact.map((stat: any, idx: number) => (
                  <div key={idx} className="text-center relative z-10">
                    <div
                      className="text-5xl font-extrabold mb-3 text-white"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-blue-100 font-medium">{isEn && stat.labelEn ? stat.labelEn : stat.label}</div>
                  </div>
                ))}
                {/* Decorative circle */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-amance-green/20 rounded-full blur-3xl -mb-10 -mr-10" />
              </div>
            </div>
          )}

          {/* SDGs */}
          {Array.isArray(project!.sdgs) && project!.sdgs.length > 0 && (
            <div className="mb-20">
              <h3
                className="text-2xl font-extrabold mb-8"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
              >
                {t("project_detail.sdgs")}
              </h3>
              <div className="flex flex-wrap gap-4">
                {project!.sdgs.map((sdg: any) => (
                  <div
                    key={sdg}
                    className="flex items-center gap-3 px-6 py-3 rounded-2xl font-bold bg-white border-2 border-gray-100 shadow-sm transition-all hover:border-amance-blue hover:text-amance-blue"
                  >
                     <div className="w-2 h-2 rounded-full bg-amance-blue" />
                    ODD {sdg}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24"
        style={{ background: "linear-gradient(135deg, var(--amance-blue-dark) 0%, var(--amance-blue) 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-8"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("project_detail.cta.title")}
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("project_detail.cta.subtitle")}
          </p>
          <Link
            href="/faire-un-don"
            className="inline-flex items-center gap-3 px-12 py-5 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-2xl"
            style={{ backgroundColor: "var(--amance-green)", color: "white" }}
          >
            <Heart size={24} fill="white" />
            {t("project_detail.cta.button")}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
