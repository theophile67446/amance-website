import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { useTranslation } from "react-i18next";
import {
  Target,
  Eye,
  Heart,
  Users,
  Shield,
  Globe,
  Award,
  FileText,
  Download,
  CheckCircle,
  Leaf,
} from "lucide-react";

const TEAM_IMAGE = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80";
const ABOUT_HERO = "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=80";

export default function APropos() {
  const { t } = useTranslation();
  const { data: teamMembersData = [] } = trpc.team.list.useQuery();

  const defaultTeamMembers = [
    {
      name: "Fule Ndiba Juliette",
      role: t("about.team.roles.president"),
      title: "BSc Administration",
      location: "Buea",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    },
    {
      name: "Ekanya Georgette Oyang",
      role: t("about.team.roles.sg"),
      title: "Gestion des Ressources Forestières",
      location: "Buea",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
    {
      name: "Gwei Kilah Etienne",
      role: t("about.team.roles.sf"),
      title: "Économiste",
      location: "Buea",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    },
    {
      name: "Simeu Noutchom Alain",
      role: t("about.team.roles.advisor"),
      title: "Zoologiste (PhD)",
      location: "Yaoundé",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: t("about.values.items.integrity.title"),
      description: t("about.values.items.integrity.desc"),
      color: "var(--amance-blue)",
    },
    {
      icon: Heart,
      title: t("about.values.items.compassion.title"),
      description: t("about.values.items.compassion.desc"),
      color: "var(--amance-green)",
    },
    {
      icon: Users,
      title: t("about.values.items.diversity.title"),
      description: t("about.values.items.diversity.desc"),
      color: "var(--amance-blue-light)",
    },
    {
      icon: Globe,
      title: t("about.values.items.impact.title"),
      description: t("about.values.items.impact.desc"),
      color: "var(--amance-green-dark)",
    },
  ];

  const sdgs = [
    { num: 1, label: t("about.goals.items.1") },
    { num: 2, label: t("about.goals.items.2") },
    { num: 3, label: t("about.goals.items.3") },
    { num: 4, label: t("about.goals.items.4") },
    { num: 5, label: t("about.goals.items.5") },
    { num: 6, label: t("about.goals.items.6") },
    { num: 8, label: t("about.goals.items.4") },
    { num: 13, label: "Action climatique" },
    { num: 15, label: "Vie terrestre" },
    { num: 16, label: "Paix & Justice" },
    { num: 17, label: "Partenariats" },
  ];

  const displayedTeamMembers = teamMembersData.length > 0 ? teamMembersData : defaultTeamMembers;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ABOUT_HERO})` }}
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
            {t("about.hero.badge")}
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("about.hero.title")}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
            {t("about.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ backgroundColor: "rgba(82,180,82,0.1)", color: "var(--amance-green)" }}
              >
                <Target size={14} />
                {t("about.mission.badge")}
              </div>
              <h2
                className="text-3xl md:text-4xl font-extrabold mb-8"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
              >
                {t("about.mission.title")}
              </h2>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl border-l-4" style={{ borderColor: "var(--amance-green)", backgroundColor: "rgba(82,180,82,0.05)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Target size={20} style={{ color: "var(--amance-green)" }} />
                    <h3 className="font-bold text-lg" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                      {t("about.mission.mission_title")}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {t("about.mission.mission_desc")}
                  </p>
                </div>

                <div className="p-6 rounded-2xl border-l-4" style={{ borderColor: "var(--amance-blue)", backgroundColor: "rgba(28,58,95,0.05)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Eye size={20} style={{ color: "var(--amance-blue)" }} />
                    <h3 className="font-bold text-lg" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                      {t("about.mission.vision_title")}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {t("about.mission.vision_desc")}
                  </p>
                </div>

                <div className="p-6 rounded-2xl border-l-4" style={{ borderColor: "var(--amance-green-dark)", backgroundColor: "rgba(42,100,60,0.05)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Award size={20} style={{ color: "var(--amance-green-dark)" }} />
                    <h3 className="font-bold text-lg" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                      {t("about.mission.slogan_title")}
                    </h3>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {t("about.mission.slogan_desc")}
                    <br />
                    <span className="text-sm text-gray-500 not-italic">— {t("about.mission.slogan_source")}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Goals */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ backgroundColor: "rgba(28,58,95,0.1)", color: "var(--amance-blue)" }}
              >
                <CheckCircle size={14} />
                {t("about.goals.badge")}
              </div>
              <h2
                className="text-3xl md:text-4xl font-extrabold mb-8"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
              >
                {t("about.goals.title")}
              </h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "var(--amance-green)" }}
                    >
                      <CheckCircle size={14} className="text-white" />
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      {t(`about.goals.items.${i}`)}
                    </p>
                  </div>
                ))}
              </div>

              {/* SDGs */}
              <div className="mt-8 p-6 rounded-2xl" style={{ backgroundColor: "rgba(82,180,82,0.05)" }}>
                <h4 className="font-bold mb-4 text-sm uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                  {t("about.goals.sdgs_title")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sdgs.map((sdg) => (
                    <div
                      key={sdg.num}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: "var(--amance-blue)" }}
                      title={sdg.label}
                    >
                      <span className="font-bold">ODD {sdg.num}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.97 0.005 240)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: "rgba(82,180,82,0.1)", color: "var(--amance-green)" }}
            >
              <Heart size={14} />
              {t("about.values.badge")}
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-4"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
            >
              {t("about.values.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
              {t("about.values.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${value.color}15` }}
                  >
                    <Icon size={28} style={{ color: value.color }} />
                  </div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="equipe" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: "rgba(28,58,95,0.1)", color: "var(--amance-blue)" }}
            >
              <Users size={14} />
              {t("about.team.badge")}
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-4"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
            >
              {t("about.team.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
              {t("about.team.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {displayedTeamMembers.map((member, i) => (
              <div
                key={`${member.name}-${i}`}
                className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative mb-4">
                  <img
                    src={member.image || TEAM_IMAGE}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto border-4"
                    style={{ borderColor: "var(--amance-green)" }}
                  />
                  <div
                    className="absolute -bottom-1 -right-1 left-auto mx-auto w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--amance-green)", marginLeft: "calc(50% + 10px - 12px)" }}
                  >
                    <CheckCircle size={12} className="text-white" />
                  </div>
                </div>
                <h3
                  className="font-bold text-sm mb-1"
                  style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                >
                  {member.name}
                </h3>
                <div
                  className="text-xs font-semibold mb-2 px-2 py-1 rounded-full inline-block"
                  style={{ backgroundColor: "rgba(82,180,82,0.1)", color: "var(--amance-green)" }}
                >
                  {member.role}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "Open Sans, sans-serif" }}>
                  {member.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">{member.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section id="transparence" className="py-24" style={{ background: "linear-gradient(135deg, var(--amance-blue-dark) 0%, var(--amance-blue) 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <FileText size={14} />
              {t("about.transparency.badge")}
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-white mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {t("about.transparency.title")}
            </h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
              {t("about.transparency.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: t("about.transparency.doc1_title"),
                description: t("about.transparency.doc1_desc"),
                type: "PDF",
                year: "2024",
              },
              {
                icon: Award,
                title: t("about.transparency.doc2_title"),
                description: t("about.transparency.doc2_desc"),
                type: "PDF",
                year: "2025",
              },
              {
                icon: Shield,
                title: t("about.transparency.doc3_title"),
                description: t("about.transparency.doc3_desc"),
                type: "PDF",
                year: "2025",
              },
            ].map((doc, i) => {
              const Icon = doc.icon;
              return (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        {doc.title}
                      </h3>
                      <span className="text-xs text-blue-200">{doc.type} · {doc.year}</span>
                    </div>
                  </div>
                  <p className="text-blue-200 text-sm leading-relaxed mb-4" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {doc.description}
                  </p>
                  <button
                    className="flex items-center gap-2 text-sm font-semibold text-white hover:opacity-80 transition-opacity"
                    onClick={() => alert(t("about.transparency.request_note"))}
                  >
                    <Download size={16} />
                    {t("about.transparency.download")}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
