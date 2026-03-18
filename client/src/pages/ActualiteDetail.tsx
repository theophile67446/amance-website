import Layout from "@/components/Layout";
import { useParams, useLocation } from "wouter";
import { Calendar, User, ArrowLeft } from "lucide-react";

const articles = [
  {
    slug: "distribution-alimentaire-nord-ouest",
    title: "Distribution alimentaire d'urgence dans la région du Nord-Ouest",
    content: "L'équipe AMANCE a organisé une distribution d'aide alimentaire pour plus de 200 familles déplacées dans la région du Nord-Ouest du Cameroun. Cette opération s'inscrit dans notre engagement continu à soulager les souffrances des populations vulnérables. \n\nLes denrées distribuées incluent du riz, de l'huile, du sel et d'autres produits de première nécessité. Nous remercions chaleureusement nos partenaires et bénévoles pour leur dévouement exemplaire lors de cette mission complexe.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80",
    category: "Terrain",
    date: "15 Mars 2026",
    author: "Équipe AMANCE",
  },
  {
    slug: "reboisement-buea",
    title: "Lancement du programme de reboisement à Buea",
    content: "En partenariat avec les autorités locales et les communautés riveraines, AMANCE lance un programme ambitieux de reboisement visant à restaurer 50 hectares de forêt dégradée dans la région du Mont Cameroun.\n\nCe projet ne se limite pas à la plantation d'arbres ; il intègre également une forte dimension éducative visant à sensibiliser les jeunes générations à l'importance de la préservation de notre écosystème unique.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80",
    category: "Terrain",
    date: "8 Mars 2026",
    author: "Ngueping Samuel",
  },
  {
    slug: "formation-agroforesterie",
    title: "Formation en agroforesterie pour 80 agriculteurs",
    content: "AMANCE a formé 80 agriculteurs des communautés rurales aux techniques d'agroforesterie durable, combinant production alimentaire et protection de l'environnement.\n\nL'agroforesterie représente une solution d'avenir pour l'agriculture locale. En associant arbres et cultures, les agriculteurs améliorent la fertilité des sols tout en augmentant leurs rendements à moyen et long terme.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80",
    category: "Terrain",
    date: "1 Mars 2026",
    author: "Équipe AMANCE",
  },
  {
    slug: "journee-mondiale-eau",
    title: "AMANCE célèbre la Journée Mondiale de l'Eau",
    content: "À l'occasion de la Journée Mondiale de l'Eau, AMANCE a organisé des campagnes de sensibilisation dans 5 villages de la région du Sud-Ouest sur la gestion durable des ressources en eau.\n\nL'accès à une eau propre reste un défi majeur dans de nombreuses zones rurales. Nos équipes ont animé des ateliers sur les bonnes pratiques d'hygiène et les méthodes de purification de l'eau.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80",
    category: "Actualités",
    date: "22 Mars 2026",
    author: "Ekanya Georgette",
  },
  {
    slug: "rapport-annuel-2025",
    title: "Publication du Rapport d'Activités 2025",
    content: "AMANCE publie son rapport annuel d'activités 2025, témoignant d'une année riche en actions, en défis surmontés et en vies transformées. Plus de 10 000 personnes ont bénéficié de nos programmes.\n\nNous vous invitons à consulter ce document exhaustif qui détaille notre impact dans les domaines de la santé, de l'éducation, et de la conservation environnementale.",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=80",
    category: "Rapport",
    date: "28 Février 2026",
    author: "Gwei Kilah Etienne",
  },
  {
    slug: "partenariat-ong-internationale",
    title: "Nouveau partenariat avec une ONG internationale",
    content: "AMANCE annonce la signature d'un accord de partenariat stratégique avec une ONG internationale pour renforcer ses capacités d'intervention dans le domaine de la conservation environnementale.\n\nCette collaboration nous permettra de déployer de nouvelles technologies pour le suivi écologique et d'étendre nos zones d'intervention pour la protection des espèces menacées.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80",
    category: "Communiqué",
    date: "20 Février 2026",
    author: "Ngueping Samuel",
  },
];

export default function ActualiteDetail() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <Layout>
        <div className="py-32 text-center">
          <h1 className="text-3xl font-bold mb-4 font-heading text-amance-blue flex flex-col items-center">
            Article Introuvable
          </h1>
          <p className="mb-8 text-gray-600 font-sans">L'article que vous cherchez n'existe pas ou a été déplacé.</p>
          <button onClick={() => setLocation("/actualites")} className="btn-primary">
            Retour aux actualités
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Cover */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.image})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </section>

      {/* Content */}
      <section className="py-16 bg-white relative -mt-32 z-10 mx-4 sm:mx-8 md:max-w-4xl md:mx-auto rounded-3xl shadow-xl shadow-gray-200/50 p-8 sm:p-12 mb-20 border border-gray-100">
        <button
          onClick={() => setLocation("/actualites")}
          className="flex items-center gap-2 text-amance-green hover:text-amance-green-dark transition-colors font-semibold text-sm mb-8"
        >
          <ArrowLeft size={16} /> Retour aux actualités
        </button>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-sans mb-6">
          <span className="px-3 py-1 bg-amance-green/10 text-amance-green rounded-full font-bold">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {article.date}
          </span>
          <span className="flex items-center gap-1">
            <User size={14} /> {article.author}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-amance-blue mb-8 leading-tight font-heading">
          {article.title}
        </h1>

        <div className="prose prose-lg prose-gray max-w-none prose-p:font-sans prose-headings:font-heading prose-a:text-amance-green hover:prose-a:text-amance-green-dark">
          {article.content.split("\n\n").map((para, i) => (
            <p key={i} className="mb-6 text-gray-700 leading-relaxed text-lg">
              {para}
            </p>
          ))}
        </div>
      </section>
    </Layout>
  );
}
