import Layout from "@/components/Layout";
import { Link } from "wouter";
import { useState } from "react";
import {
  Globe,
  Calendar,
  User,
  ChevronRight,
  Search,
  Leaf,
  Tag,
} from "lucide-react";

const HERO_BLOG = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80";

const articles = [
  {
    id: 1,
    slug: "distribution-alimentaire-nord-ouest",
    title: "Distribution alimentaire d'urgence dans la région du Nord-Ouest",
    excerpt:
      "L'équipe AMANCE a organisé une distribution d'aide alimentaire pour plus de 200 familles déplacées dans la région du Nord-Ouest du Cameroun. Cette opération s'inscrit dans notre engagement continu à soulager les souffrances des populations vulnérables.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    category: "terrain",
    date: "15 Mars 2026",
    author: "Équipe AMANCE",
    featured: true,
  },
  {
    id: 2,
    slug: "reboisement-buea",
    title: "Lancement du programme de reboisement à Buea",
    excerpt:
      "En partenariat avec les autorités locales et les communautés riveraines, AMANCE lance un programme ambitieux de reboisement visant à restaurer 50 hectares de forêt dégradée dans la région du Mont Cameroun.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    category: "terrain",
    date: "8 Mars 2026",
    author: "Ngueping Samuel",
    featured: true,
  },
  {
    id: 3,
    slug: "formation-agroforesterie",
    title: "Formation en agroforesterie pour 80 agriculteurs",
    excerpt:
      "AMANCE a formé 80 agriculteurs des communautés rurales aux techniques d'agroforesterie durable, combinant production alimentaire et protection de l'environnement.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    category: "terrain",
    date: "1 Mars 2026",
    author: "Équipe AMANCE",
    featured: false,
  },
  {
    id: 4,
    slug: "journee-mondiale-eau",
    title: "AMANCE célèbre la Journée Mondiale de l'Eau",
    excerpt:
      "À l'occasion de la Journée Mondiale de l'Eau, AMANCE a organisé des campagnes de sensibilisation dans 5 villages de la région du Sud-Ouest sur la gestion durable des ressources en eau.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    category: "actualites",
    date: "22 Mars 2026",
    author: "Ekanya Georgette",
    featured: false,
  },
  {
    id: 5,
    slug: "rapport-annuel-2025",
    title: "Publication du Rapport d'Activités 2025",
    excerpt:
      "AMANCE publie son rapport annuel d'activités 2025, témoignant d'une année riche en actions, en défis surmontés et en vies transformées. Plus de 10 000 personnes ont bénéficié de nos programmes.",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
    category: "rapport",
    date: "28 Février 2026",
    author: "Gwei Kilah Etienne",
    featured: false,
  },
  {
    id: 6,
    slug: "partenariat-ong-internationale",
    title: "Nouveau partenariat avec une ONG internationale",
    excerpt:
      "AMANCE annonce la signature d'un accord de partenariat stratégique avec une ONG internationale pour renforcer ses capacités d'intervention dans le domaine de la conservation environnementale.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    category: "communique",
    date: "20 Février 2026",
    author: "Ngueping Samuel",
    featured: false,
  },
];

const categoryConfig: Record<string, { label: string; color: string; bg: string }> = {
  terrain: { label: "Terrain", color: "var(--amance-green)", bg: "rgba(82,180,82,0.1)" },
  actualites: { label: "Actualités", color: "var(--amance-blue)", bg: "rgba(28,58,95,0.1)" },
  rapport: { label: "Rapport", color: "var(--amance-green-dark)", bg: "rgba(42,100,60,0.1)" },
  communique: { label: "Communiqué", color: "var(--amance-blue-light)", bg: "rgba(28,100,150,0.1)" },
};

const filters = [
  { value: "all", label: "Tous" },
  { value: "terrain", label: "Terrain" },
  { value: "actualites", label: "Actualités" },
  { value: "rapport", label: "Rapports" },
  { value: "communique", label: "Communiqués" },
];

export default function Actualites() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = articles.filter((a) => {
    const matchCat = activeFilter === "all" || a.category === activeFilter;
    const matchSearch = search === "" || a.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = articles.filter((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured || activeFilter !== "all" || search !== "");

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BLOG})` }}
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
            <Globe size={14} />
            Actualités & Blog
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Nos Dernières Actualités
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
            Suivez nos actions sur le terrain, nos communiqués officiels et nos rapports d'impact.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Articles */}
          {activeFilter === "all" && search === "" && (
            <div className="mb-16">
              <h2
                className="text-2xl font-extrabold mb-8"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
              >
                À la Une
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featured.map((article) => {
                  const cat = categoryConfig[article.category];
                  return (
                    <Link
                      key={article.id}
                      href={`/actualites/${article.slug}`}
                      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                    >
                      <div className="relative overflow-hidden h-64">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: cat.color }}
                        >
                          {cat.label}
                        </div>
                        <div
                          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                        >
                          ⭐ À la Une
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                          <span className="flex items-center gap-1"><Calendar size={12} />{article.date}</span>
                          <span className="flex items-center gap-1"><User size={12} />{article.author}</span>
                        </div>
                        <h3
                          className="text-lg font-bold mb-3 line-clamp-2"
                          style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                        >
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3" style={{ fontFamily: "Open Sans, sans-serif" }}>
                          {article.excerpt}
                        </p>
                        <div
                          className="flex items-center gap-1 mt-4 text-sm font-semibold"
                          style={{ color: "var(--amance-green)" }}
                        >
                          Lire la suite <ChevronRight size={16} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ fontFamily: "Open Sans, sans-serif", "--tw-ring-color": "var(--amance-green)" } as React.CSSProperties}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className="px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
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
          </div>

          {/* Articles Grid */}
          {(activeFilter !== "all" || search !== "" ? filtered : rest).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(activeFilter !== "all" || search !== "" ? filtered : rest).map((article) => {
                const cat = categoryConfig[article.category];
                return (
                  <Link
                    key={article.id}
                    href={`/actualites/${article.slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: cat.color }}
                      >
                        {cat.label}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1"><Calendar size={12} />{article.date}</span>
                        <span className="flex items-center gap-1"><User size={12} />{article.author}</span>
                      </div>
                      <h3
                        className="text-base font-bold mb-3 line-clamp-2"
                        style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                      >
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3" style={{ fontFamily: "Open Sans, sans-serif" }}>
                        {article.excerpt}
                      </p>
                      <div
                        className="flex items-center gap-1 mt-4 text-sm font-semibold"
                        style={{ color: "var(--amance-green)" }}
                      >
                        Lire la suite <ChevronRight size={16} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500" style={{ fontFamily: "Open Sans, sans-serif" }}>
                Aucun article trouvé pour cette recherche.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
