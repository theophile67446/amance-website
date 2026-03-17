import Layout from "@/components/Layout";
import { Link } from "wouter";
import { useState } from "react";
import {
  TreePine,
  HandHeart,
  Stethoscope,
  Home as HomeIcon,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  Leaf,
  Heart,
  CheckCircle,
  Clock,
} from "lucide-react";

const HERO_PROJETS = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80";

const projects = [
  {
    id: 1,
    slug: "la-foret-de-demain",
    title: "La Forêt de Demain",
    category: "conservation",
    status: "en_cours",
    location: "Région du Sud-Ouest, Buea",
    startDate: "Janvier 2024",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    description:
      "Programme ambitieux de reboisement et de conservation de la biodiversité dans la région du Mont Cameroun. Ce projet combine protection de l'environnement et développement économique local par l'agroforesterie.",
    impact: [
      { value: "50 ha", label: "Reboisés" },
      { value: "80", label: "Agriculteurs formés" },
      { value: "200", label: "Familles bénéficiaires" },
    ],
    featured: true,
    sdgs: [13, 15, 8],
  },
  {
    id: 2,
    slug: "aide-alimentaire-urgence",
    title: "Aide Alimentaire d'Urgence",
    category: "humanitaire",
    status: "en_cours",
    location: "Régions du Nord-Ouest et du Sud-Ouest",
    startDate: "Mars 2024",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    description:
      "Distribution régulière d'aide alimentaire aux familles déplacées et aux personnes vulnérables dans les régions affectées par les crises humanitaires au Cameroun.",
    impact: [
      { value: "500+", label: "Familles assistées" },
      { value: "2 500+", label: "Personnes nourries" },
      { value: "12", label: "Distributions organisées" },
    ],
    featured: true,
    sdgs: [1, 2],
  },
  {
    id: 3,
    slug: "sante-communautaire-rurale",
    title: "Santé Communautaire Rurale",
    category: "sante",
    status: "en_cours",
    location: "Arrondissement de Buea",
    startDate: "Juin 2024",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    description:
      "Amélioration de l'accès aux soins de santé primaires dans les zones rurales de la région du Sud-Ouest. Formation de relais communautaires et campagnes de prévention.",
    impact: [
      { value: "2 000+", label: "Consultations facilitées" },
      { value: "50+", label: "Relais formés" },
      { value: "800+", label: "Femmes et enfants" },
    ],
    featured: false,
    sdgs: [3, 5],
  },
  {
    id: 4,
    slug: "ecoles-vertes",
    title: "Écoles Vertes",
    category: "conservation",
    status: "en_cours",
    location: "Écoles primaires de Buea",
    startDate: "Septembre 2024",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
    description:
      "Programme d'éducation environnementale dans les écoles primaires et secondaires de la région. Sensibilisation à la biodiversité, au changement climatique et aux gestes écologiques.",
    impact: [
      { value: "1 000+", label: "Élèves sensibilisés" },
      { value: "15", label: "Écoles partenaires" },
      { value: "30+", label: "Enseignants formés" },
    ],
    featured: false,
    sdgs: [4, 13, 15],
  },
  {
    id: 5,
    slug: "agroforesterie-durable",
    title: "Agroforesterie Durable",
    category: "communautaire",
    status: "en_cours",
    location: "Villages ruraux, Région du Centre",
    startDate: "Octobre 2024",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    description:
      "Formation des agriculteurs aux techniques d'agroforesterie permettant de combiner production alimentaire, génération de revenus et protection de l'environnement.",
    impact: [
      { value: "80", label: "Agriculteurs formés" },
      { value: "200", label: "Familles bénéficiaires" },
      { value: "30%", label: "Hausse des revenus" },
    ],
    featured: false,
    sdgs: [1, 8, 15],
  },
  {
    id: 6,
    slug: "soutien-enfants-vulnerables",
    title: "Soutien aux Enfants Vulnérables",
    category: "humanitaire",
    status: "en_cours",
    location: "Buea et environs",
    startDate: "Janvier 2025",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    description:
      "Programme de soutien scolaire, alimentaire et psychosocial aux enfants orphelins, déplacés et en situation de vulnérabilité dans la région du Sud-Ouest.",
    impact: [
      { value: "1 200+", label: "Enfants soutenus" },
      { value: "300+", label: "Kits scolaires distribués" },
      { value: "50+", label: "Familles d'accueil" },
    ],
    featured: false,
    sdgs: [1, 4, 16],
  },
];

const categoryConfig = {
  conservation: { label: "Conservation", color: "var(--amance-blue-light)", icon: TreePine },
  humanitaire: { label: "Humanitaire", color: "var(--amance-green)", icon: HandHeart },
  sante: { label: "Santé", color: "var(--amance-blue)", icon: Stethoscope },
  communautaire: { label: "Communautaire", color: "var(--amance-green-dark)", icon: HomeIcon },
};

const statusConfig = {
  en_cours: { label: "En cours", color: "var(--amance-green)", bg: "rgba(82,180,82,0.1)", icon: Clock },
  termine: { label: "Terminé", color: "var(--amance-blue)", bg: "rgba(28,58,95,0.1)", icon: CheckCircle },
  planifie: { label: "Planifié", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: Calendar },
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

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

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

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => {
              const cat = categoryConfig[project.category as keyof typeof categoryConfig];
              const status = statusConfig[project.status as keyof typeof statusConfig];
              const CatIcon = cat.icon;
              const StatusIcon = status.icon;

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <div
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: cat.color }}
                      >
                        <CatIcon size={12} />
                        {cat.label}
                      </div>
                    </div>
                    <div
                      className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: status.bg, color: status.color }}
                    >
                      <StatusIcon size={12} />
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
                      {project.impact.map((stat, j) => (
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
                      {project.sdgs.map((sdg) => (
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
