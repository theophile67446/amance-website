import Layout from "@/components/Layout";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import {
  Home as HomeIcon,
  TreePine,
  ArrowRight,
  CheckCircle,
  Users,
  Leaf,
  Heart,
  BookOpen,
  Sprout,
  Bird,
  GraduationCap,
  Smile,
  Megaphone,
  MapPin,
} from "lucide-react";

const HERO_ACTIONS = "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80";
const IMG_SMILE = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80";
const IMG_EDUCATION = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80";
const IMG_COMMUNAUTAIRE = "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80";
const IMG_CONSERVATION = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80";

export default function NosActions() {
  const { t } = useTranslation();

  const domains = [
    {
      id: "smile",
      icon: Smile,
      title: t("actions.smile.title"),
      subtitle: t("actions.smile.subtitle"),
      description: t("actions.smile.desc"),
      image: IMG_SMILE,
      color: "var(--amance-green)",
      colorLight: "rgba(82,180,82,0.08)",
      activities: t("actions.smile.activities", { returnObjects: true }) as string[],
      impact: [
        { value: "500+", label: t("actions.smile.impact.families") },
        { value: "1 200+", label: t("actions.smile.impact.children") },
        { value: "300+", label: t("actions.smile.impact.people") },
      ],
      subIcons: [Heart, Users, HomeIcon],
    },
    {
      id: "education",
      icon: Megaphone,
      title: t("actions.education.title"),
      subtitle: t("actions.education.subtitle"),
      description: t("actions.education.desc"),
      image: IMG_EDUCATION,
      color: "var(--amance-blue)",
      colorLight: "rgba(28,58,95,0.08)",
      activities: t("actions.education.activities", { returnObjects: true }) as string[],
      impact: [
        { value: "2 000+", label: t("actions.education.impact.sensitized") },
        { value: "50+", label: t("actions.education.impact.campaigns") },
        { value: "800+", label: t("actions.education.impact.students") },
      ],
      subIcons: [Megaphone, BookOpen, GraduationCap],
    },
    {
      id: "communautaire",
      icon: HomeIcon,
      title: t("actions.community.title"),
      subtitle: t("actions.community.subtitle"),
      description: t("actions.community.desc"),
      image: IMG_COMMUNAUTAIRE,
      color: "var(--amance-green-dark)",
      colorLight: "rgba(42,100,60,0.08)",
      activities: t("actions.community.activities", { returnObjects: true }) as string[],
      impact: [
        { value: "80+", label: t("actions.community.impact.trained") },
        { value: "200+", label: t("actions.community.impact.families") },
        { value: "15+", label: t("actions.community.impact.communities") },
      ],
      subIcons: [GraduationCap, Users, Sprout],
    },
    {
      id: "conservation",
      icon: TreePine,
      title: t("actions.conservation.title"),
      subtitle: t("actions.conservation.subtitle"),
      description: t("actions.conservation.desc"),
      image: IMG_CONSERVATION,
      color: "var(--amance-blue-light)",
      colorLight: "rgba(28,100,150,0.08)",
      activities: t("actions.conservation.activities", { returnObjects: true }) as string[],
      impact: [
        { value: "50 ha", label: t("actions.conservation.impact.reforested") },
        { value: "7+", label: t("actions.conservation.impact.partners") },
        { value: "1 000+", label: t("actions.conservation.impact.students") },
      ],
      landscapes: [
        "Parc National de Bakossi",
        "Sanctuaire de Faune de Banyang Mbo",
        "Parc National du Mont Cameroun",
        "Parc National de Korup",
        "Parc National de Takamanda",
        "Sanctuaire Herpéto-Ornithologique du Mont Muanenguba",
        "Parc National de Deng-Deng",
      ],
      subIcons: [TreePine, Bird, Leaf],
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_ACTIONS})` }}
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
            {t("actions.hero.badge")}
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("actions.hero.title")}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
            {t("actions.hero.subtitle")}
          </p>

          {/* Quick Nav */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {domains.map((d) => (
              <a
                key={d.id}
                href={`#${d.id}`}
                className="px-4 py-2 rounded-full text-sm font-semibold text-white border border-white/30 hover:bg-white/20 transition-all duration-200"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {d.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Domains */}
      {domains.map((domain, i) => {
        const Icon = domain.icon;
        const isEven = i % 2 === 0;
        return (
          <section
            key={domain.id}
            id={domain.id}
            className="py-24"
            style={{ backgroundColor: i % 2 === 0 ? "white" : "oklch(0.97 0.005 240)" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${!isEven ? "lg:grid-flow-dense" : ""}`}>
                {/* Image */}
                <div className={`relative ${!isEven ? "lg:col-start-2" : ""}`}>
                  <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={domain.image}
                      alt={domain.title}
                      className="w-full h-80 lg:h-96 object-cover"
                    />
                  </div>
                  {/* Impact badges */}
                  <div className="absolute -bottom-6 left-6 right-6 bg-white rounded-2xl shadow-xl p-4">
                    <div className="grid grid-cols-3 gap-2">
                      {domain.impact.map((stat, j) => (
                        <div key={j} className="text-center">
                          <div
                            className="text-lg font-extrabold"
                            style={{ fontFamily: "Montserrat, sans-serif", color: domain.color }}
                          >
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${!isEven ? "lg:col-start-1 lg:row-start-1" : ""} mt-8 lg:mt-0`}>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                    style={{ backgroundColor: domain.colorLight, color: domain.color }}
                  >
                    <Icon size={14} />
                    {domain.subtitle}
                  </div>
                  <h2
                    className="text-3xl md:text-4xl font-extrabold mb-6"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                  >
                    {domain.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {domain.description}
                  </p>

                  <h4
                    className="font-bold text-sm uppercase tracking-wide mb-4"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                  >
                    {t("actions.common.main_activities")}
                  </h4>
                  <div className="space-y-3 mb-8">
                    {domain.activities && Array.isArray(domain.activities) && domain.activities.map((activity, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: domain.color }} />
                        <span className="text-sm text-gray-700" style={{ fontFamily: "Open Sans, sans-serif" }}>
                          {activity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {"landscapes" in domain && domain.landscapes && (
                    <div className="mb-8 p-4 rounded-2xl" style={{ backgroundColor: domain.colorLight }}>
                      <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wide mb-3" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                        <MapPin size={14} /> {t("actions.conservation.zones_title")}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {domain.landscapes.map((l, j) => (
                          <span key={j} className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: domain.color }}>
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    href="/projets"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg"
                    style={{ backgroundColor: domain.color, fontFamily: "Montserrat, sans-serif" }}
                  >
                    {t("actions.common.see_projects")}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

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
            {t("actions.common.cta_title")}
          </h2>
          <p className="text-lg text-blue-200 mb-10 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
            {t("actions.common.cta_subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/faire-un-don"
              className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 shadow-lg"
              style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
            >
              <Heart size={18} fill="white" />
              {t("actions.common.cta_donate")}
            </Link>
            <Link
              href="/s-impliquer"
              className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white border-2 border-white transition-all duration-300 hover:bg-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--amance-blue)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
            >
              {t("actions.common.cta_involve")} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
