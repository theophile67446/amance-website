import Layout from "@/components/Layout";
import { Link } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";
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

export default function FaireUnDon() {
  const { t } = useTranslation();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10000);
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const impactAmounts = [
    { amount: t("donate_page.impact.items.0.amount"), impact: t("donate_page.impact.items.0.desc"), icon: HomeIcon },
    { amount: t("donate_page.impact.items.1.amount"), impact: t("donate_page.impact.items.1.desc"), icon: HandHeart },
    { amount: t("donate_page.impact.items.2.amount"), impact: t("donate_page.impact.items.2.desc"), icon: Stethoscope },
    { amount: t("donate_page.impact.items.3.amount"), impact: t("donate_page.impact.items.3.desc"), icon: TreePine },
    { amount: t("donate_page.impact.items.4.amount"), impact: t("donate_page.impact.items.4.desc"), icon: Globe },
    { amount: t("donate_page.impact.items.5.amount"), impact: t("donate_page.impact.items.5.desc"), icon: Users },
  ];

  const paymentMethods = [
    {
      icon: Smartphone,
      title: t("donate_page.methods.items.momo.title"),
      description: t("donate_page.methods.items.momo.desc"),
      detail: t("donate_page.methods.items.momo.detail"),
      color: "var(--amance-green)",
    },
    {
      icon: Building,
      title: t("donate_page.methods.items.bank.title"),
      description: t("donate_page.methods.items.bank.desc"),
      detail: t("donate_page.methods.items.bank.detail"),
      color: "var(--amance-blue)",
    },
    {
      icon: Mail,
      title: t("donate_page.methods.items.mail.title"),
      description: t("donate_page.methods.items.mail.desc"),
      detail: t("donate_page.methods.items.mail.detail"),
      color: "var(--amance-green-dark)",
    },
  ];

  const guarantees = t("donate_page.guarantees.items", { returnObjects: true }) as string[];

  const PRESET_AMOUNTS = [
    { value: 5000, label: "5 000 FCFA" },
    { value: 10000, label: "10 000 FCFA" },
    { value: 25000, label: "25 000 FCFA" },
    { value: 50000, label: "50 000 FCFA" },
    { value: 100000, label: "100 000 FCFA" },
  ];

  const handleDonate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert(t("donate_page.box.alert_redirect"));
      setIsProcessing(false);
    }, 1500);
  };

  const finalAmount = selectedAmount === null ? (parseInt(customAmount) || 0) : selectedAmount;

  return (
    <Layout>
      <SEO title={t("donate_page.hero.seo_title")} description={t("donate_page.hero.seo_desc")} />
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <Heart size={14} fill="white" />
            {t("donate_page.hero.badge")}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("donate_page.hero.title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto mb-10" 
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            {t("donate_page.hero.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Interactive Donation Box */}
      <section className="relative -mt-16 z-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 backdrop-blur-sm"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                {t("donate_page.box.title")}
              </h3>
              <p className="text-gray-500">{t("donate_page.box.subtitle")}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt.value}
                  onClick={() => { setSelectedAmount(amt.value); setCustomAmount(""); }}
                  className={`py-4 rounded-2xl font-bold text-lg transition-all duration-300 border-2 ${
                    selectedAmount === amt.value 
                    ? 'border-[#1E5D2A] bg-[#1E5D2A] text-white shadow-lg' 
                    : 'border-gray-100 hover:border-[#1E5D2A] hover:bg-gray-50 text-[#1E5D2A]'
                  }`}
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {amt.label}
                </button>
              ))}
              <div className="relative col-span-2 md:col-span-1">
                <input
                  type="number"
                  placeholder={t("donate_page.box.other_amount")}
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                  className={`w-full h-full py-4 px-6 rounded-2xl font-bold text-lg border-2 transition-all outline-none ${
                    selectedAmount === null 
                    ? 'border-[#F5B100] ring-2 ring-[#F5B100]/20' 
                    : 'border-gray-100 text-gray-500'
                  }`}
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-[#1E5D2A]">FCFA</span>
              </div>
            </div>

            <button
               onClick={handleDonate}
              disabled={finalAmount <= 0 || isProcessing}
              className={`w-full py-5 rounded-2xl text-xl font-bold text-white transition-all shadow-xl flex items-center justify-center gap-3 ${
                finalAmount > 0 ? 'bg-[#1E5D2A] hover:bg-[#152e18] shadow-xl' : 'bg-gray-300 cursor-not-allowed'
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {t("donate_page.box.continue", { amount: finalAmount.toLocaleString() })}
                  <ArrowRight size={22} />
                </>
              )}
            </button>
            <p className="text-center mt-6 text-xs text-gray-400">
               {t("donate_page.box.secure")}
            </p>
          </motion.div>
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
              {t("donate_page.impact.badge")}
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-6"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
            >
              {t("donate_page.impact.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
              {t("donate_page.impact.subtitle")}
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
              {t("donate_page.methods.badge")}
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-6"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
            >
              {t("donate_page.methods.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
              {t("donate_page.methods.subtitle")}
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
              {t("donate_page.methods.cta_info")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-1 text-white"
              style={{ backgroundColor: "var(--amance-blue)", fontFamily: "Montserrat, sans-serif" }}
            >
              {t("donate_page.methods.cta_contact")} <ArrowRight size={16} />
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
              {t("donate_page.guarantees.badge")}
            </div>
            <h2
              className="text-3xl font-extrabold mb-4"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
            >
              {t("donate_page.guarantees.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guarantees && Array.isArray(guarantees) && guarantees.map((g, i) => (
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
              {t("donate_page.guarantees.link_transparency")} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
