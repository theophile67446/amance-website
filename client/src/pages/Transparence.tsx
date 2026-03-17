import Layout from "@/components/Layout";
import { Link } from "wouter";
import {
  FileText,
  Download,
  Shield,
  CheckCircle,
  Eye,
  Award,
  BookOpen,
  Scale,
  ArrowRight,
  Heart,
} from "lucide-react";

const documents = [
  {
    title: "Statuts de l'Association AMANCE",
    description: "Document fondateur définissant la mission, les objectifs et la structure organisationnelle d'AMANCE.",
    type: "Statuts",
    year: "2023",
    icon: Scale,
    color: "var(--amance-blue)",
    colorBg: "rgba(28,58,95,0.08)",
  },
  {
    title: "Procès-verbal de l'Assemblée Constitutive",
    description: "Compte-rendu de la réunion fondatrice de l'association, avec liste des membres fondateurs.",
    type: "PV Assemblée",
    year: "2023",
    icon: BookOpen,
    color: "var(--amance-green)",
    colorBg: "rgba(82,180,82,0.08)",
  },
  {
    title: "Récépissé de Reconnaissance Officielle",
    description: "Document officiel délivré par les autorités camerounaises attestant de la légalité d'AMANCE.",
    type: "Reconnaissance légale",
    year: "2023",
    icon: Award,
    color: "var(--amance-green-dark)",
    colorBg: "rgba(42,100,60,0.08)",
  },
  {
    title: "Rapport d'Activités 2024",
    description: "Bilan complet des actions menées en 2024 : projets réalisés, bénéficiaires touchés, ressources mobilisées.",
    type: "Rapport annuel",
    year: "2024",
    icon: FileText,
    color: "var(--amance-blue-light)",
    colorBg: "rgba(28,100,150,0.08)",
  },
  {
    title: "Plan Stratégique 2024-2027",
    description: "Feuille de route stratégique définissant les orientations, objectifs et indicateurs d'impact pour les 3 prochaines années.",
    type: "Plan stratégique",
    year: "2024",
    icon: Eye,
    color: "var(--amance-blue)",
    colorBg: "rgba(28,58,95,0.08)",
  },
  {
    title: "Charte Éthique et Déontologique",
    description: "Principes éthiques guidant les actions d'AMANCE : intégrité, transparence, respect des bénéficiaires.",
    type: "Charte",
    year: "2023",
    icon: Shield,
    color: "var(--amance-green)",
    colorBg: "rgba(82,180,82,0.08)",
  },
];

const principles = [
  {
    icon: Shield,
    title: "Intégrité",
    description: "Nous agissons avec honnêteté et droiture dans toutes nos actions et communications.",
    color: "var(--amance-green)",
  },
  {
    icon: Eye,
    title: "Transparence",
    description: "Nos finances, nos activités et nos résultats sont accessibles à tous nos partenaires et donateurs.",
    color: "var(--amance-blue)",
  },
  {
    icon: CheckCircle,
    title: "Redevabilité",
    description: "Nous rendons compte de l'utilisation des ressources confiées et de l'impact de nos actions.",
    color: "var(--amance-green-dark)",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Nous visons la qualité maximale dans la conception et l'exécution de nos programmes.",
    color: "var(--amance-blue-light)",
  },
];

export default function Transparence() {
  return (
    <Layout>
      {/* Hero */}
      <section
        className="py-32"
        style={{ background: "linear-gradient(135deg, var(--amance-blue-dark) 0%, var(--amance-blue) 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <Shield size={14} />
            Transparence & Gouvernance
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Notre Engagement pour la Transparence
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
            AMANCE s'engage à une transparence totale dans sa gouvernance, ses finances et ses
            activités. Retrouvez ici tous nos documents officiels et rapports d'impact.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-6"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
            >
              Nos Principes de Gouvernance
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
              La confiance de nos partenaires et donateurs repose sur notre engagement indéfectible
              envers ces valeurs fondamentales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: "oklch(0.97 0.005 240)" }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${p.color}15` }}
                  >
                    <Icon size={24} style={{ color: p.color }} />
                  </div>
                  <h3
                    className="text-lg font-extrabold mb-3"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.97 0.005 240)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ backgroundColor: "rgba(28,58,95,0.1)", color: "var(--amance-blue)" }}
            >
              <FileText size={14} />
              Documents officiels
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-6"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
            >
              Nos Documents Officiels
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
              Accédez librement à nos documents institutionnels, rapports d'activités et
              documents légaux attestant de notre légitimité et de notre sérieux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, i) => {
              const Icon = doc.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: doc.colorBg }}
                    >
                      <Icon size={22} style={{ color: doc.color }} />
                    </div>
                    <div>
                      <div
                        className="text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-1"
                        style={{ backgroundColor: doc.colorBg, color: doc.color }}
                      >
                        {doc.type}
                      </div>
                      <div className="text-xs text-gray-400">{doc.year}</div>
                    </div>
                  </div>
                  <h3
                    className="text-base font-extrabold mb-3 flex-1"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                  >
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {doc.description}
                  </p>
                  <button
                    className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
                    style={{ color: doc.color, fontFamily: "Montserrat, sans-serif" }}
                    onClick={() => {
                      // In production, this would link to actual document URLs
                      alert("Document disponible sur demande. Contactez-nous à infos@amance.org");
                    }}
                  >
                    <Download size={16} />
                    Télécharger le document
                  </button>
                </div>
              );
            })}
          </div>

          <div
            className="mt-12 p-6 rounded-2xl text-center"
            style={{ backgroundColor: "rgba(82,180,82,0.08)", border: "1px solid rgba(82,180,82,0.2)" }}
          >
            <Shield size={24} className="mx-auto mb-3" style={{ color: "var(--amance-green)" }} />
            <p className="text-sm text-gray-600" style={{ fontFamily: "Open Sans, sans-serif" }}>
              Vous ne trouvez pas le document que vous cherchez ? Contactez-nous directement à{" "}
              <a href="mailto:infos@amance.org" className="font-semibold" style={{ color: "var(--amance-green)" }}>
                infos@amance.org
              </a>
            </p>
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
            className="text-3xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Faites Confiance à AMANCE
          </h2>
          <p className="text-lg text-blue-200 mb-10" style={{ fontFamily: "Open Sans, sans-serif" }}>
            Notre transparence est le fondement de la confiance que vous nous accordez.
            Rejoignez notre communauté de partenaires et de donateurs engagés.
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
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white border-2 border-white transition-all duration-300 hover:bg-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--amance-blue)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
            >
              Nous Contacter <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
