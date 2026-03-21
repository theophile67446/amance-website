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
} from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

const IMG_BENEVOLE = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80";
const IMG_PARTENAIRE = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80";

export default function SImpliquer() {
  const { t } = useTranslation();
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
      toast.error(t("common.error_generic"));
    },
  });

  const handleBenevoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!benevoleForm.firstName || !benevoleForm.lastName || !benevoleForm.email) {
      toast.error(t("common.form_required"));
      return;
    }
    submitRegistration.mutate({ type: "benevole", ...benevoleForm });
  };

  const handlePartenaireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partenaireForm.firstName || !partenaireForm.lastName || !partenaireForm.email) {
      toast.error(t("common.form_required"));
      return;
    }
    submitRegistration.mutate({ type: "partenaire", ...partenaireForm });
  };

  const benefitsBenevole = t("get_involved.volunteer.benefits", { returnObjects: true }) as string[];
  const benefitsPartenaire = t("get_involved.partner.benefits", { returnObjects: true }) as string[];

  return (
    <Layout>
      <SEO title={t("get_involved.hero.seo_title")} description={t("get_involved.hero.seo_desc")} />
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
            {t("get_involved.hero.badge")}
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("get_involved.hero.title")}
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
            {t("get_involved.hero.subtitle")}
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
                {t("get_involved.tabs.volunteer")}
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
                {t("get_involved.tabs.partner")}
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
                {t("get_involved.success.title")}
              </h3>
              <p className="text-gray-600 max-w-md mb-8" style={{ fontFamily: "Open Sans, sans-serif" }}>
                {t("get_involved.success.desc")}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-full font-bold text-white text-sm"
                style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
              >
                {t("get_involved.success.another")}
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
                      {t("get_involved.volunteer.badge")}
                    </div>
                    <h2
                      className="text-3xl font-extrabold mb-6"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                    >
                      {t("get_involved.volunteer.title")}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      {t("get_involved.volunteer.desc")}
                    </p>

                    <div className="relative rounded-2xl overflow-hidden mb-8 h-48">
                      <img src={IMG_BENEVOLE} alt={t("get_involved.volunteer.badge")} className="w-full h-full object-cover" />
                    </div>

                    <h4
                      className="font-bold text-sm uppercase tracking-wide mb-4"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                    >
                      {t("get_involved.volunteer.benefits_title")}
                    </h4>
                    <div className="space-y-3">
                      {benefitsBenevole && Array.isArray(benefitsBenevole) && benefitsBenevole.map((b, i) => (
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
                      {t("get_involved.volunteer.form_title")}
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                          {t("get_involved.volunteer.firstName")}
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
                          {t("get_involved.volunteer.lastName")}
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
                          {t("get_involved.volunteer.email")}
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
                          {t("get_involved.volunteer.phone")}
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
                          {t("get_involved.volunteer.city")}
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
                          {t("get_involved.volunteer.availability.label")}
                        </label>
                        <select
                          value={benevoleForm.availability}
                          onChange={(e) => setBenevoleForm(p => ({ ...p, availability: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 bg-white"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        >
                          <option value="">{t("get_involved.volunteer.availability.select")}</option>
                          <option value="Temps plein">{t("get_involved.volunteer.availability.full")}</option>
                          <option value="Temps partiel">{t("get_involved.volunteer.availability.partial")}</option>
                          <option value="Week-ends">{t("get_involved.volunteer.availability.weekends")}</option>
                          <option value="Vacances">{t("get_involved.volunteer.availability.vacation")}</option>
                          <option value="Ponctuel">{t("get_involved.volunteer.availability.occasional")}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                        {t("get_involved.volunteer.skills.label")}
                      </label>
                      <input
                        type="text"
                        placeholder={t("get_involved.volunteer.skills.placeholder")}
                        value={benevoleForm.skills}
                        onChange={(e) => setBenevoleForm(p => ({ ...p, skills: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                        {t("get_involved.volunteer.motivation.label")}
                      </label>
                      <textarea
                        required rows={4}
                        placeholder={t("get_involved.volunteer.motivation.placeholder")}
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
                        <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> {t("get_involved.volunteer.submitting")}</>
                      ) : (
                        <><Send size={16} /> {t("get_involved.volunteer.submit")}</>
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
                      {t("get_involved.partner.badge")}
                    </div>
                    <h2
                      className="text-3xl font-extrabold mb-6"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                    >
                      {t("get_involved.partner.title")}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      {t("get_involved.partner.desc")}
                    </p>

                    <div className="relative rounded-2xl overflow-hidden mb-8 h-48">
                      <img src={IMG_PARTENAIRE} alt={t("get_involved.partner.badge")} className="w-full h-full object-cover" />
                    </div>

                    <h4
                      className="font-bold text-sm uppercase tracking-wide mb-4"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                    >
                      {t("get_involved.partner.benefits_title")}
                    </h4>
                    <div className="space-y-3">
                      {benefitsPartenaire && Array.isArray(benefitsPartenaire) && benefitsPartenaire.map((b, i) => (
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
                      {t("get_involved.partner.form_title")}
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>{t("get_involved.partner.firstName")}</label>
                        <input type="text" required
                          value={partenaireForm.firstName}
                          onChange={(e) => setPartenaireForm(p => ({ ...p, firstName: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>{t("get_involved.partner.lastName")}</label>
                        <input type="text" required
                          value={partenaireForm.lastName}
                          onChange={(e) => setPartenaireForm(p => ({ ...p, lastName: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>{t("get_involved.partner.organization")}</label>
                      <input type="text" required
                        value={partenaireForm.organization}
                        onChange={(e) => setPartenaireForm(p => ({ ...p, organization: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>{t("get_involved.partner.partnerType.label")}</label>
                      <select
                        value={partenaireForm.partnerType}
                        onChange={(e) => setPartenaireForm(p => ({ ...p, partnerType: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 bg-white"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                      >
                        <option value="">{t("get_involved.partner.partnerType.select")}</option>
                        <option value="ONG / Association">{t("get_involved.partner.partnerType.ong")}</option>
                        <option value="Entreprise privée">{t("get_involved.partner.partnerType.private")}</option>
                        <option value="Institution publique">{t("get_involved.partner.partnerType.public")}</option>
                        <option value="Fondation">{t("get_involved.partner.partnerType.foundation")}</option>
                        <option value="Bailleur de fonds">{t("get_involved.partner.partnerType.donor")}</option>
                        <option value="Université / Recherche">{t("get_involved.partner.partnerType.research")}</option>
                        <option value="Médias">{t("get_involved.partner.partnerType.media")}</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>{t("get_involved.partner.email")}</label>
                        <input type="email" required
                          value={partenaireForm.email}
                          onChange={(e) => setPartenaireForm(p => ({ ...p, email: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>{t("get_involved.partner.website")}</label>
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
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>{t("get_involved.partner.city")}</label>
                        <input type="text"
                          value={partenaireForm.city}
                          onChange={(e) => setPartenaireForm(p => ({ ...p, city: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>{t("get_involved.partner.country")}</label>
                        <input type="text"
                          value={partenaireForm.country}
                          onChange={(e) => setPartenaireForm(p => ({ ...p, country: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
                          style={{ fontFamily: "Open Sans, sans-serif" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>{t("get_involved.partner.motivation.label")}</label>
                      <textarea required rows={4}
                        placeholder={t("get_involved.partner.motivation.placeholder")}
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
                        <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> {t("get_involved.partner.submitting")}</>
                      ) : (
                        <><Send size={16} /> {t("get_involved.partner.submit")}</>
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
