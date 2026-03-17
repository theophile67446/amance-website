import Layout from "@/components/Layout";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  Users,
  Building2,
  Heart,
  ArrowRight,
  CheckCircle,
  Send,
  Leaf,
  Globe,
  Clock,
  Star,
} from "lucide-react";
import { toast } from "sonner";

const IMG_BENEVOLE = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80";
const IMG_PARTENAIRE = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80";

const benefitsBenevole = [
  "Expérience de terrain enrichissante au Cameroun",
  "Développement de compétences professionnelles",
  "Réseau international de professionnels engagés",
  "Attestation officielle de bénévolat",
  "Immersion culturelle authentique",
  "Impact direct et mesurable sur des vies réelles",
];

const benefitsPartenaire = [
  "Visibilité sur nos supports de communication",
  "Rapports d'impact réguliers et transparents",
  "Accès à notre réseau de partenaires internationaux",
  "Contribution à des ODD mesurables",
  "Co-branding sur les projets soutenus",
  "Invitation aux événements et missions de terrain",
];

export default function SImpliquer() {
  const [activeTab, setActiveTab] = useState<"benevole" | "partenaire">("benevole");
  const [submitted, setSubmitted] = useState(false);

  const [benevoleForm, setBenevoleForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "Cameroun",
    motivation: "",
    availability: "",
    skills: "",
  });

  const [partenaireForm, setPartenaireForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    website: "",
    partnerType: "",
    city: "",
    country: "",
    motivation: "",
  });

  const submitRegistration = trpc.registration.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: () => {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    },
  });

  const handleBenevoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!benevoleForm.firstName || !benevoleForm.lastName || !benevoleForm.email) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    submitRegistration.mutate({ type: "benevole", ...benevoleForm });
  };

  const handlePartenaireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partenaireForm.firstName || !partenaireForm.lastName || !partenaireForm.email) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    submitRegistration.mutate({ type: "partenaire", ...partenaireForm });
  };

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
            <Heart size={14} />
            S'Impliquer avec AMANCE
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Rejoignez Notre Mission
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
            Que vous souhaitiez offrir votre temps, vos compétences ou établir un partenariat
            stratégique, AMANCE vous accueille avec enthousiasme.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Switcher */}
          <div className="flex justify-center mb-16">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => { setActiveTab("benevole"); setSubmitted(false); }}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300"
                style={{
                  backgroundColor: activeTab === "benevole" ? "var(--amance-green)" : "transparent",
                  color: activeTab === "benevole" ? "white" : "var(--amance-blue)",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <Users size={16} />
                Devenir Bénévole
              </button>
              <button
                onClick={() => { setActiveTab("partenaire"); setSubmitted(false); }}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300"
                style={{
                  backgroundColor: activeTab === "partenaire" ? "var(--amance-blue)" : "transparent",
                  color: activeTab === "partenaire" ? "white" : "var(--amance-blue)",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <Building2 size={16} />
                Devenir Partenaire
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(82,180,82,0.1)" }}
              >
                <CheckCircle size={40} style={{ color: "var(--amance-green)" }} />
              </div>
              <h3
                className="text-2xl font-extrabold mb-4"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
              >
                Inscription reçue avec succès !
              </h3>
              <p className="text-gray-600 max-w-md mb-8" style={{ fontFamily: "Open Sans, sans-serif" }}>
                Merci pour votre engagement ! Notre équipe examinera votre candidature et vous
                contactera dans les plus brefs délais pour la suite du processus.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-full font-bold text-white text-sm"
                style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
              >
                Soumettre une autre candidature
              </button>
            </div>
          ) : (
            <>
              {/* Bénévole Section */}
              {activeTab === "benevole" && (
                <div id="benevole" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  {/* Info */}
                  <div>
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                      style={{ backgroundColor: "rgba(82,180,82,0.1)", color: "var(--amance-green)" }}
                    >
                      <Users size={14} />
                      Bénévolat
                    </div>
                    <h2
                      className="text-3xl font-extrabold mb-6"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                    >
                      Devenez Bénévole AMANCE
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      Rejoignez une équipe de passionnés et contribuez directement à améliorer les
                      conditions de vie des communautés camerounaises. Votre temps et vos compétences
                      ont une valeur inestimable pour nous.
                    </p>

                    <div className="relative rounded-2xl overflow-hidden mb-8 h-48">
                      <img src={IMG_BENEVOLE} alt="Bénévoles AMANCE" className="w-full h-full object-cover" />
                    </div>

                    <h4
                      className="font-bold text-sm uppercase tracking-wide mb-4"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                    >
                      Ce que vous y gagnez
                    </h4>
                    <div className="space-y-3">
                      {benefitsBenevole.map((b, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle size={16} style={{ color: "var(--amance-green)" }} className="flex-shrink-0" />
                          <span className="text-sm text-gray-700" style={{ fontFamily: "Open Sans, sans-serif" }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleBenevoleSubmit} className="space-y-5">
                    <h3
                      className="text-xl font-extrabold mb-6"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                    >
                      Formulaire d'Inscription Bénévole
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                          Prénom *
                        </label>
                        <input
                          type="text" name="firstName" required
                          value={benevoleForm.firstName}
                          onChange={(e) => setBenevoleForm(p => ({ ...p, firstName: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                          Nom *
                        </label>
                        <input
                          type="text" name="lastName" required
                          value={benevoleForm.lastName}
                          onChange={(e) => setBenevoleForm(p => ({ ...p, lastName: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                          E-mail *
                        </label>
                        <input
                          type="email" required
                          value={benevoleForm.email}
                          onChange={(e) => setBenevoleForm(p => ({ ...p, email: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          value={benevoleForm.phone}
                          onChange={(e) => setBenevoleForm(p => ({ ...p, phone: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                          Ville
                        </label>
                        <input
                          type="text"
                          value={benevoleForm.city}
                          onChange={(e) => setBenevoleForm(p => ({ ...p, city: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                          Disponibilité
                        </label>
                        <select
                          value={benevoleForm.availability}
                          onChange={(e) => setBenevoleForm(p => ({ ...p, availability: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 bg-white"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        >
                          <option value="">Sélectionner</option>
                          <option value="Temps plein">Temps plein</option>
                          <option value="Temps partiel">Temps partiel</option>
                          <option value="Week-ends">Week-ends uniquement</option>
                          <option value="Vacances">Pendant les vacances</option>
                          <option value="Ponctuel">Missions ponctuelles</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                        Compétences & Domaines d'expertise
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: médecine, informatique, agriculture, communication..."
                        value={benevoleForm.skills}
                        onChange={(e) => setBenevoleForm(p => ({ ...p, skills: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                        Motivation *
                      </label>
                      <textarea
                        required rows={4}
                        placeholder="Pourquoi souhaitez-vous rejoindre AMANCE ?"
                        value={benevoleForm.motivation}
                        onChange={(e) => setBenevoleForm(p => ({ ...p, motivation: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 resize-none"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitRegistration.isPending}
                      className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-sm transition-all duration-300 hover:-translate-y-1 shadow-md disabled:opacity-60"
                      style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
                    >
                      {submitRegistration.isPending ? (
                        <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Envoi...</>
                      ) : (
                        <><Send size={16} /> Soumettre ma Candidature</>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* Partenaire Section */}
              {activeTab === "partenaire" && (
                <div id="partenaire" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  {/* Info */}
                  <div>
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                      style={{ backgroundColor: "rgba(28,58,95,0.1)", color: "var(--amance-blue)" }}
                    >
                      <Building2 size={14} />
                      Partenariat
                    </div>
                    <h2
                      className="text-3xl font-extrabold mb-6"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                    >
                      Devenez Partenaire d'AMANCE
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      Institutions, entreprises, fondations, ONG : unissons nos forces pour un impact
                      démultiplié. AMANCE recherche des partenaires partageant nos valeurs d'intégrité,
                      de compassion et d'impact durable.
                    </p>

                    <div className="relative rounded-2xl overflow-hidden mb-8 h-48">
                      <img src={IMG_PARTENAIRE} alt="Partenaires AMANCE" className="w-full h-full object-cover" />
                    </div>

                    <h4
                      className="font-bold text-sm uppercase tracking-wide mb-4"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                    >
                      Avantages du partenariat
                    </h4>
                    <div className="space-y-3">
                      {benefitsPartenaire.map((b, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle size={16} style={{ color: "var(--amance-blue)" }} className="flex-shrink-0" />
                          <span className="text-sm text-gray-700" style={{ fontFamily: "Open Sans, sans-serif" }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handlePartenaireSubmit} className="space-y-5">
                    <h3
                      className="text-xl font-extrabold mb-6"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                    >
                      Formulaire de Partenariat
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>Prénom *</label>
                        <input type="text" required
                          value={partenaireForm.firstName}
                          onChange={(e) => setPartenaireForm(p => ({ ...p, firstName: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>Nom *</label>
                        <input type="text" required
                          value={partenaireForm.lastName}
                          onChange={(e) => setPartenaireForm(p => ({ ...p, lastName: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>Organisation / Entreprise *</label>
                      <input type="text" required
                        value={partenaireForm.organization}
                        onChange={(e) => setPartenaireForm(p => ({ ...p, organization: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>Type de partenaire</label>
                      <select
                        value={partenaireForm.partnerType}
                        onChange={(e) => setPartenaireForm(p => ({ ...p, partnerType: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 bg-white"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                      >
                        <option value="">Sélectionner</option>
                        <option value="ONG / Association">ONG / Association</option>
                        <option value="Entreprise privée">Entreprise privée</option>
                        <option value="Institution publique">Institution publique</option>
                        <option value="Fondation">Fondation</option>
                        <option value="Bailleur de fonds">Bailleur de fonds</option>
                        <option value="Université / Recherche">Université / Recherche</option>
                        <option value="Médias">Médias</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>E-mail *</label>
                        <input type="email" required
                          value={partenaireForm.email}
                          onChange={(e) => setPartenaireForm(p => ({ ...p, email: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>Site web</label>
                        <input type="url"
                          value={partenaireForm.website}
                          onChange={(e) => setPartenaireForm(p => ({ ...p, website: e.target.value }))}
                          placeholder="https://..."
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>Ville</label>
                        <input type="text"
                          value={partenaireForm.city}
                          onChange={(e) => setPartenaireForm(p => ({ ...p, city: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>Pays</label>
                        <input type="text"
                          value={partenaireForm.country}
                          onChange={(e) => setPartenaireForm(p => ({ ...p, country: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>Proposition de partenariat *</label>
                      <textarea required rows={4}
                        placeholder="Décrivez votre proposition et les synergies envisagées..."
                        value={partenaireForm.motivation}
                        onChange={(e) => setPartenaireForm(p => ({ ...p, motivation: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 resize-none"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitRegistration.isPending}
                      className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-sm transition-all duration-300 hover:-translate-y-1 shadow-md disabled:opacity-60"
                      style={{ backgroundColor: "var(--amance-blue)", fontFamily: "Montserrat, sans-serif" }}
                    >
                      {submitRegistration.isPending ? (
                        <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Envoi...</>
                      ) : (
                        <><Send size={16} /> Soumettre ma Proposition</>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
