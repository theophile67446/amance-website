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

const HERO_PROJETS = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80";

const categoryConfig = {
  conservation: { label: "Conservation", color: "var(--amance-blue-light)" },
  humanitaire: { label: "Humanitaire", color: "var(--amance-green)" },
  sante: { label: "Santé", color: "var(--amance-blue)" },
  communautaire: { label: "Communautaire", color: "var(--amance-green-dark)" },
};

const statusConfig = {
  en_cours: { label: "En cours", color: "var(--amance-green)", bg: "rgba(42, 100, 60, 0.2)" },
  termine: { label: "Terminé", color: "var(--amance-blue)", bg: "rgba(22, 36, 71, 0.2)" },
  planifie: { label: "Planifié", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.2)" },
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
  const icons: Record<string, typeof TreePine> = {
    en_cours: TreePine,
    termine: TreePine,
    planifie: TreePine,
  };
  return icons[status] || TreePine;
};

const filters = [
  { value: "all", label: "Tous les projets" },
  { value: "conservation", label: "Conservation" },
  { value: "humanitaire", label: "Humanitaire" },
  { value: "sante", label: "Santé" },
  { value: "communautaire", label: "Communautaire" },
];

export default function Projets() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Récupérer les projets depuis l'API
  const { data: projects = [], isLoading } = trpc.projects.list.useQuery({
    category: activeFilter === "all" ? undefined : (activeFilter as any),
  });

  const featured = projects.filter((p) => p.featured);

  return (
    <Layout>
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
            Nos Projets
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Nos Projets & Programmes
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
            Des projets concrets, mesurables et durables qui transforment des vies et préservent
            l'environnement au Cameroun.
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

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader size={48} className="animate-spin text-gray-300" />
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => {
                const cat = categoryConfig[project.category as keyof typeof categoryConfig];
                const status = statusConfig[project.status as keyof typeof statusConfig];

                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={project.coverImage || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"}
                        alt={project.title}
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
                          ⭐ Projet phare
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
                        <span>{project.startDate}</span>
                      </div>

                      <h3
                        className="text-lg font-bold mb-3"
                        style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5" style={{ fontFamily: "Open Sans, sans-serif" }}>
                        {project.description}
                      </p>

                      {/* Impact */}
                      <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-xl" style={{ backgroundColor: "oklch(0.97 0.005 240)" }}>
                        {(Array.isArray(project.impact) ? project.impact : []).map((stat, j) => (
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
                        {(Array.isArray(project.sdgs) ? project.sdgs : []).map((sdg) => (
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
                        En savoir plus <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600">Aucun projet trouvé dans cette catégorie.</p>
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
            Soutenez Nos Projets
          </h2>
          <p className="text-lg text-blue-200 mb-10" style={{ fontFamily: "Open Sans, sans-serif" }}>
            Chaque don, aussi modeste soit-il, contribue directement à la réalisation de ces projets
            et à l'amélioration des conditions de vie de milliers de personnes au Cameroun.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/faire-un-don"
              className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 shadow-lg"
              style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
            >
              <Heart size={18} fill="white" />
              Soutenir un Projet
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white border-2 border-white transition-all duration-300 hover:bg-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--amance-blue)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
            >
              Devenir Partenaire <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
