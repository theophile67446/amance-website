import Layout from "@/components/Layout";
import { Link } from "wouter";
import {
  HandHeart,
  Stethoscope,
  Home as HomeIcon,
  TreePine,
  ArrowRight,
  CheckCircle,
  Users,
  Leaf,
  Heart,
  BookOpen,
  Droplets,
  Sprout,
  Bird,
  GraduationCap,
} from "lucide-react";

const HERO_ACTIONS = "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80";
const IMG_HUMANITAIRE = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80";
const IMG_SANTE = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80";
const IMG_COMMUNAUTAIRE = "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80";
const IMG_CONSERVATION = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80";

const domains = [
  {
    id: "humanitaire",
    icon: HandHeart,
    title: "Aide Humanitaire & Sociale",
    subtitle: "Soutien aux personnes en situation de vulnérabilité",
    description:
      "AMANCE apporte une assistance directe et immédiate aux personnes en situation de précarité extrême. Nous intervenons auprès des familles déplacées, des orphelins, des personnes âgées isolées et des personnes en situation de handicap.",
    image: IMG_HUMANITAIRE,
    color: "var(--amance-green)",
    colorLight: "rgba(82,180,82,0.08)",
    activities: [
      "Distribution alimentaire d'urgence aux familles déplacées",
      "Fourniture de matériels scolaires aux enfants défavorisés",
      "Soutien psychosocial et accompagnement des personnes traumatisées",
      "Aide matérielle d'urgence (vêtements, abri, hygiène)",
      "Visites et assistance aux personnes âgées et isolées",
      "Soutien aux orphelins et enfants vulnérables",
    ],
    impact: [
      { value: "500+", label: "Familles assistées" },
      { value: "1 200+", label: "Enfants soutenus" },
      { value: "300+", label: "Personnes âgées accompagnées" },
    ],
    subIcons: [Heart, Users, HomeIcon],
  },
  {
    id: "sante",
    icon: Stethoscope,
    title: "Santé & Bien-être",
    subtitle: "Accès aux soins pour les communautés rurales",
    description:
      "L'accès aux soins de santé reste un défi majeur dans les zones rurales camerounaises. AMANCE facilite l'accès aux soins de base, organise des campagnes de sensibilisation à l'hygiène et au bien-être, et soutient les structures de santé communautaires.",
    image: IMG_SANTE,
    color: "var(--amance-blue)",
    colorLight: "rgba(28,58,95,0.08)",
    activities: [
      "Campagnes de sensibilisation à l'hygiène et la santé publique",
      "Facilitation de l'accès aux soins de santé primaires",
      "Soutien aux femmes enceintes et à la santé maternelle",
      "Prévention des maladies endémiques (paludisme, choléra)",
      "Distribution de médicaments essentiels dans les zones reculées",
      "Formation des relais communautaires en santé de base",
    ],
    impact: [
      { value: "2 000+", label: "Consultations facilitées" },
      { value: "50+", label: "Campagnes de sensibilisation" },
      { value: "800+", label: "Femmes et enfants soutenus" },
    ],
    subIcons: [Stethoscope, Droplets, Heart],
  },
  {
    id: "communautaire",
    icon: HomeIcon,
    title: "Développement Communautaire",
    subtitle: "Autonomisation des communautés rurales",
    description:
      "Nous croyons fermement que le développement durable passe par l'autonomisation des communautés locales. AMANCE met en œuvre des programmes de formation, d'éducation et d'entrepreneuriat qui permettent aux populations de prendre en main leur propre développement.",
    image: IMG_COMMUNAUTAIRE,
    color: "var(--amance-green-dark)",
    colorLight: "rgba(42,100,60,0.08)",
    activities: [
      "Formation professionnelle et développement des compétences",
      "Programmes d'alphabétisation pour adultes",
      "Soutien à l'entrepreneuriat rural et aux micro-entreprises",
      "Construction et réhabilitation d'infrastructures communautaires",
      "Programmes d'éducation pour les enfants déscolarisés",
      "Renforcement des capacités des leaders communautaires",
    ],
    impact: [
      { value: "80+", label: "Agriculteurs formés" },
      { value: "200+", label: "Familles autonomisées" },
      { value: "15+", label: "Communautés touchées" },
    ],
    subIcons: [GraduationCap, Users, Sprout],
  },
  {
    id: "conservation",
    icon: TreePine,
    title: "Conservation Environnementale",
    subtitle: "Protection de la biodiversité camerounaise",
    description:
      "Le Cameroun est l'un des pays les plus riches en biodiversité d'Afrique. AMANCE s'engage à protéger ce patrimoine naturel exceptionnel à travers des programmes de conservation active, d'éducation environnementale et de reboisement.",
    image: IMG_CONSERVATION,
    color: "var(--amance-blue-light)",
    colorLight: "rgba(28,100,150,0.08)",
    activities: [
      "Programmes de reboisement et restauration des forêts dégradées",
      "Éducation environnementale dans les écoles et communautés",
      "Conservation de la faune sauvage (primates, éléphants, etc.)",
      "Sensibilisation à la lutte contre le braconnage",
      "Promotion de l'agroforesterie durable",
      "Partenariats avec les aires protégées et parcs nationaux",
    ],
    impact: [
      { value: "50 ha", label: "Forêt reboisée" },
      { value: "5+", label: "Espèces protégées" },
      { value: "1 000+", label: "Élèves sensibilisés" },
    ],
    subIcons: [TreePine, Bird, Leaf],
  },
];

export default function NosActions() {
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
            Nos Domaines d'Intervention
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Nos Actions sur le Terrain
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
            Quatre domaines d'intervention complémentaires pour un impact global, durable et mesurable
            sur les communautés camerounaises et leur environnement.
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
                {d.title.split(" ")[0]} {d.title.split(" ")[1]}
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
                    Nos activités principales
                  </h4>
                  <div className="space-y-3 mb-8">
                    {domain.activities.map((activity, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: domain.color }} />
                        <span className="text-sm text-gray-700" style={{ fontFamily: "Open Sans, sans-serif" }}>
                          {activity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/projets"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg"
                    style={{ backgroundColor: domain.color, fontFamily: "Montserrat, sans-serif" }}
                  >
                    Voir nos projets dans ce domaine
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
            Soutenez Nos Actions sur le Terrain
          </h2>
          <p className="text-lg text-blue-200 mb-10 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
            Chaque contribution permet à AMANCE d'intensifier ses interventions et d'atteindre
            davantage de personnes vulnérables et de zones naturelles menacées.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/faire-un-don"
              className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 shadow-lg"
              style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
            >
              <Heart size={18} fill="white" />
              Faire un Don
            </Link>
            <Link
              href="/s-impliquer"
              className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white border-2 border-white transition-all duration-300 hover:bg-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--amance-blue)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
            >
              S'impliquer <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
