import Layout from "@/components/Layout";
import { useParams, useLocation } from "wouter";
import { TreePine, HandHeart, Stethoscope, Home as HomeIcon, MapPin, Calendar, Leaf, ArrowLeft } from "lucide-react";

const projects = [
  {
    slug: "la-foret-de-demain",
    title: "La Forêt de Demain",
    category: "conservation",
    status: "en_cours",
    location: "Région du Sud-Ouest, Buea",
    startDate: "Janvier 2024",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80",
    description: "Programme ambitieux de reboisement et de conservation de la biodiversité dans la région du Mont Cameroun. Ce projet combine protection de l'environnement et développement économique local par l'agroforesterie.\n\nNotre objectif est de restaurer durablement les écosystèmes forestiers tout en responsabilisant les communautés environnantes pour une gestion responsable des ressources naturelles.",
    impact: [
      { value: "50 ha", label: "Reboisés" },
      { value: "80", label: "Agriculteurs formés" },
      { value: "200", label: "Familles bénéficiaires" },
    ],
    sdgs: [13, 15, 8],
  },
  {
    slug: "aide-alimentaire-urgence",
    title: "Aide Alimentaire d'Urgence",
    category: "humanitaire",
    status: "en_cours",
    location: "Régions du Nord-Ouest et du Sud-Ouest",
    startDate: "Mars 2024",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80",
    description: "Distribution régulière d'aide alimentaire aux familles déplacées et aux personnes vulnérables dans les régions affectées par les crises humanitaires au Cameroun.\n\nEn collaboration avec nos partenaires locaux, nous avons pu fournir des produits de première nécessité à ceux qui en ont le plus besoin, tout en garantissant un suivi sur le long terme.",
    impact: [
      { value: "500+", label: "Familles assistées" },
      { value: "2 500+", label: "Personnes nourries" },
      { value: "12", label: "Distributions organisées" },
    ],
    sdgs: [1, 2],
  },
  {
    slug: "sante-communautaire-rurale",
    title: "Santé Communautaire Rurale",
    category: "sante",
    status: "en_cours",
    location: "Arrondissement de Buea",
    startDate: "Juin 2024",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80",
    description: "Amélioration de l'accès aux soins de santé primaires dans les zones rurales de la région du Sud-Ouest. Formation de relais communautaires et campagnes de prévention.\n\nCe programme novateur décentralise les soins et donne aux communautés les outils pour prévenir les maladies courantes en améliorant l'hygiène et l'assainissement.",
    impact: [
      { value: "2 000+", label: "Consultations facilitées" },
      { value: "50+", label: "Relais formés" },
      { value: "800+", label: "Femmes et enfants" },
    ],
    sdgs: [3, 5],
  },
  {
    slug: "ecoles-vertes",
    title: "Écoles Vertes",
    category: "conservation",
    status: "en_cours",
    location: "Écoles primaires de Buea",
    startDate: "Septembre 2024",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=80",
    description: "Programme d'éducation environnementale dans les écoles primaires et secondaires de la région. Sensibilisation à la biodiversité, au changement climatique et aux gestes écologiques.\n\nEn ciblant la jeunesse, nous formons les leaders de demain et leur inculquons l'importance de préserver et valoriser leur riche patrimoine naturel.",
    impact: [
      { value: "1 000+", label: "Élèves sensibilisés" },
      { value: "15", label: "Écoles partenaires" },
      { value: "30+", label: "Enseignants formés" },
    ],
    sdgs: [4, 13, 15],
  },
  {
    slug: "agroforesterie-durable",
    title: "Agroforesterie Durable",
    category: "communautaire",
    status: "en_cours",
    location: "Villages ruraux, Région du Centre",
    startDate: "Octobre 2024",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80",
    description: "Formation des agriculteurs aux techniques d'agroforesterie permettant de combiner production alimentaire, génération de revenus et protection de l'environnement.\n\nCe projet démontre qu'il est possible de concilier développement socio-économique et respect de la nature dans une approche de croissance verte et pérenne.",
    impact: [
      { value: "80", label: "Agriculteurs formés" },
      { value: "200", label: "Familles bénéficiaires" },
      { value: "30%", label: "Hausse des revenus" },
    ],
    sdgs: [1, 8, 15],
  },
  {
    slug: "soutien-enfants-vulnerables",
    title: "Soutien aux Enfants Vulnérables",
    category: "humanitaire",
    status: "en_cours",
    location: "Buea et environs",
    startDate: "Janvier 2025",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80",
    description: "Programme de soutien scolaire, alimentaire et psychosocial aux enfants orphelins, déplacés et en situation de vulnérabilité dans la région du Sud-Ouest.\n\nNous mettons l'accent sur la résilience et nous efforçons de créer un environnement bienveillant pour ces enfants confrontés à des traumatismes multiples.",
    impact: [
      { value: "1 200+", label: "Enfants soutenus" },
      { value: "300+", label: "Kits scolaires distribués" },
      { value: "50+", label: "Familles d'accueil" },
    ],
    sdgs: [1, 4, 16],
  },
];

const categoryConfig = {
  conservation: { label: "Conservation", color: "var(--amance-blue-light)", icon: TreePine },
  humanitaire: { label: "Humanitaire", color: "var(--amance-green)", icon: HandHeart },
  sante: { label: "Santé", color: "var(--amance-blue)", icon: Stethoscope },
  communautaire: { label: "Communautaire", color: "var(--amance-green-dark)", icon: HomeIcon },
};

export default function ProjetDetail() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Layout>
        <div className="py-32 text-center">
          <h1 className="text-3xl font-bold mb-4 font-heading text-amance-blue flex flex-col items-center">
            Projet Introuvable
          </h1>
          <p className="mb-8 text-gray-600 font-sans">Le projet que vous cherchez n'existe pas ou a été déplacé.</p>
          <button onClick={() => setLocation("/projets")} className="btn-primary">
            Retour aux projets
          </button>
        </div>
      </Layout>
    );
  }

  const cat = categoryConfig[project.category as keyof typeof categoryConfig];
  const CatIcon = cat.icon;

  return (
    <Layout>
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white pb-32">
          <div className="max-w-4xl mx-auto">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg"
              style={{ backgroundColor: cat.color }}
            >
              <CatIcon size={14} />
              {cat.label}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 font-heading leading-tight drop-shadow-md">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium drop-shadow-md">
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-300" /> {project.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-300" /> Démarrage : {project.startDate}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white relative -mt-20 z-10 mx-4 sm:mx-8 md:max-w-5xl md:mx-auto rounded-3xl shadow-xl shadow-gray-200/50 p-8 sm:p-12 mb-20 border border-gray-100 flex flex-col lg:flex-row gap-12">
        
        <div className="flex-1">
          <button
            onClick={() => setLocation("/projets")}
            className="flex items-center gap-2 text-amance-green hover:text-amance-green-dark transition-colors font-semibold text-sm mb-8"
          >
            <ArrowLeft size={16} /> Retour aux projets
          </button>

          <h2 className="text-3xl font-bold font-heading text-amance-blue mb-6">À propos du projet</h2>
          <div className="prose prose-lg prose-gray max-w-none prose-p:font-sans">
            {project.description.split("\n\n").map((para, i) => (
              <p key={i} className="mb-6 text-gray-700 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-12 bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
              <Leaf size={24} className="text-amance-green" /> Objectifs de Développement Durable (ODD)
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.sdgs.map((sdg) => (
                <span
                  key={sdg}
                  className="px-4 py-2 rounded-lg font-bold text-white shadow-sm flex items-center justify-center min-w-[3rem]"
                  style={{ backgroundColor: "var(--amance-blue)" }}
                >
                  ODD {sdg}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold font-heading mb-6 text-amance-blue">Impact en chiffres</h3>
            <div className="space-y-6">
              {project.impact.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-4xl font-extrabold" style={{ color: cat.color }}>
                    {stat.value}
                  </span>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amance-green to-amance-green-dark p-8 rounded-2xl shadow-lg text-white">
            <h3 className="text-2xl font-bold font-heading mb-4">Soutenez cette initiative</h3>
            <p className="text-sm text-green-50 mb-6 font-sans">
              Votre contribution permet de financer directement les actions du projet {project.title} sur le terrain.
            </p>
            <button onClick={() => setLocation("/faire-un-don")} className="w-full py-4 px-6 bg-white text-amance-green font-bold rounded-full hover:bg-gray-50 transition-colors shadow-lg shadow-black/10">
              Faire un don
            </button>
          </div>
        </div>

      </section>
    </Layout>
  );
}
