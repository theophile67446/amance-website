import Layout from "@/components/Layout";
import { Link } from "wouter";
import {
  Heart,
  ArrowRight,
  CheckCircle,
  Shield,
  Globe,
  Users,
  TreePine,
  HandHeart,
  Stethoscope,
  Home as HomeIcon,
  CreditCard,
  Smartphone,
  Building,
  Mail,
} from "lucide-react";

const IMG_DON = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80";

const impactAmounts = [
  { amount: "10 000 FCFA", impact: "Fournitures scolaires pour 2 enfants pendant un trimestre", icon: HomeIcon },
  { amount: "25 000 FCFA", impact: "Kit alimentaire d'urgence pour une famille de 5 personnes", icon: HandHeart },
  { amount: "50 000 FCFA", impact: "Consultation médicale et médicaments pour 10 personnes", icon: Stethoscope },
  { amount: "100 000 FCFA", impact: "Plantation de 50 arbres dans le cadre du reboisement", icon: TreePine },
  { amount: "250 000 FCFA", impact: "Formation d'un agriculteur en agroforesterie durable", icon: Globe },
  { amount: "500 000 FCFA", impact: "Soutien complet d'un orphelin pendant 6 mois", icon: Users },
];

const paymentMethods = [
  {
    icon: Smartphone,
    title: "Mobile Money",
    description: "MTN MoMo ou Orange Money",
    detail: "+237 674 943 368 / +237 689 314 418",
    color: "var(--amance-green)",
  },
  {
    icon: Building,
    title: "Virement Bancaire",
    description: "Transfert bancaire international",
    detail: "Contactez-nous pour les coordonnées bancaires",
    color: "var(--amance-blue)",
  },
  {
    icon: Mail,
    title: "Par Courrier",
    description: "Chèque ou mandat postal",
    detail: "AMANCE, Buea, Région du Sud-Ouest, Cameroun",
    color: "var(--amance-green-dark)",
  },
];

const guarantees = [
  "100% de votre don est utilisé pour les programmes sur le terrain",
  "Rapport d'utilisation des fonds disponible sur demande",
  "Reçu fiscal fourni pour tout don documenté",
  "Transparence totale sur nos finances et activités",
];

export default function FaireUnDon() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMG_DON})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(22,36,71,0.90) 0%, rgba(42,100,60,0.85) 100%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <Heart size={14} fill="white" />
            Faire un Don
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Votre Générosité Change des Vies
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10" style={{ fontFamily: "Open Sans, sans-serif" }}>
            Chaque contribution, quelle que soit sa taille, permet à AMANCE de poursuivre sa mission
            auprès des personnes vulnérables et de préserver la biodiversité camerounaise.
          </p>
          <a
            href="#comment-donner"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-all duration-300 hover:-translate-y-1 shadow-lg"
            style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
          >
            <Heart size={18} fill="white" />
            Faire un Don Maintenant
          </a>
        </div>
      </section>

      {/* Impact of Donation */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ backgroundColor: "rgba(82,180,82,0.1)", color: "var(--amance-green)" }}
            >
              <Heart size={14} />
              Impact de votre don
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-6"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
            >
              Que Représente Votre Don ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
              Chaque montant a un impact concret et mesurable sur le terrain. Voici des exemples
              de ce que votre générosité permet de réaliser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactAmounts.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(82,180,82,0.1)" }}
                  >
                    <Icon size={22} style={{ color: "var(--amance-green)" }} />
                  </div>
                  <div
                    className="text-2xl font-extrabold mb-3"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-green)" }}
                  >
                    {item.amount}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {item.impact}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Donate */}
      <section
        id="comment-donner"
        className="py-24"
        style={{ backgroundColor: "oklch(0.97 0.005 240)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ backgroundColor: "rgba(28,58,95,0.1)", color: "var(--amance-blue)" }}
            >
              <CreditCard size={14} />
              Modalités de don
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-6"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
            >
              Comment Faire un Don ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
              Plusieurs options s'offrent à vous pour soutenir AMANCE, selon votre localisation
              et vos préférences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {paymentMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: `${method.color}15` }}
                  >
                    <Icon size={28} style={{ color: method.color }} />
                  </div>
                  <h3
                    className="text-lg font-extrabold mb-2"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                  >
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {method.description}
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ fontFamily: "Montserrat, sans-serif", color: method.color }}
                  >
                    {method.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: "Open Sans, sans-serif" }}>
              Pour tout renseignement sur les modalités de don, n'hésitez pas à nous contacter.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-1 text-white"
              style={{ backgroundColor: "var(--amance-blue)", fontFamily: "Montserrat, sans-serif" }}
            >
              Nous Contacter <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ backgroundColor: "rgba(82,180,82,0.1)", color: "var(--amance-green)" }}
            >
              <Shield size={14} />
              Nos engagements
            </div>
            <h2
              className="text-3xl font-extrabold mb-4"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
            >
              Votre Don en Toute Confiance
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guarantees.map((g, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: "oklch(0.97 0.005 240)" }}>
                <CheckCircle size={20} style={{ color: "var(--amance-green)" }} className="flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700" style={{ fontFamily: "Open Sans, sans-serif" }}>{g}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/transparence"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
            >
              Voir nos rapports financiers <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
