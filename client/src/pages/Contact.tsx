import Layout from "@/components/Layout";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
    },
    onError: () => {
      toast.error(t("common.error_generic"));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContact.mutate(form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            <Mail size={14} />
            {t("contact.hero.badge")}
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("contact.hero.title")}
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
            {t("contact.hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2
                className="text-2xl font-extrabold mb-8"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
              >
                {t("contact.info.title")}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(82,180,82,0.1)" }}
                  >
                    <MapPin size={20} style={{ color: "var(--amance-green)" }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                      {t("contact.info.address_label")}
                    </h4>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      {t("contact.info.address_val")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(28,58,95,0.1)" }}
                  >
                    <Phone size={20} style={{ color: "var(--amance-blue)" }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                      {t("contact.info.phone_label")}
                    </h4>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      <a href="tel:+237674943368" className="hover:text-green-600 transition-colors">+237 674 943 368</a><br />
                      <a href="tel:+237689314418" className="hover:text-green-600 transition-colors">+237 689 314 418</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(82,180,82,0.1)" }}
                  >
                    <Mail size={20} style={{ color: "var(--amance-green)" }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                      {t("contact.info.email_label")}
                    </h4>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      <a href="mailto:infos@amance.org" className="hover:text-green-600 transition-colors">infos@amance.org</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(28,58,95,0.1)" }}
                  >
                    <Clock size={20} style={{ color: "var(--amance-blue)" }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                      {t("contact.info.hours_label")}
                    </h4>
                    <pre className="text-sm text-gray-600 font-sans whitespace-pre-line">
                      {t("contact.info.hours_val")}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-bold text-sm mb-4" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                  {t("contact.info.follow_us")}
                </h4>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, href: "#", label: "Facebook" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: Instagram, href: "#", label: "Instagram" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 text-white"
                      style={{ backgroundColor: "var(--amance-blue)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--amance-green)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--amance-blue)"; }}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
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
                    {t("contact.form.success_title")}
                  </h3>
                  <p className="text-gray-600 max-w-md mb-8" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {t("contact.form.success_desc")}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-full font-bold text-white text-sm"
                    style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {t("contact.form.send_another")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2
                    className="text-2xl font-extrabold mb-8"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                  >
                    {t("contact.form.title")}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                        {t("contact.form.first_name")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder={t("contact.form.placeholder_first_name")}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                        {t("contact.form.last_name")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder={t("contact.form.placeholder_last_name")}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                        {t("contact.form.email")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t("contact.form.placeholder_email")}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                        {t("contact.form.phone")}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder={t("contact.form.placeholder_phone")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                      {t("contact.form.subject")} <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-white"
                      style={{ fontFamily: "Open Sans, sans-serif" }}
                    >
                      <option value="">{t("contact.form.placeholder_subject")}</option>
                      <option value="Demande d'information">{t("contact.form.subjects.info")}</option>
                      <option value="Proposition de partenariat">{t("contact.form.subjects.partnership")}</option>
                      <option value="Don et soutien financier">{t("contact.form.subjects.donation")}</option>
                      <option value="Bénévolat">{t("contact.form.subjects.volunteer")}</option>
                      <option value="Médias et presse">{t("contact.form.subjects.media")}</option>
                      <option value="Autre">{t("contact.form.subjects.other")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}>
                      {t("contact.form.message")} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t("contact.form.placeholder_message")}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                      style={{ fontFamily: "Open Sans, sans-serif" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitContact.isPending}
                    className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {submitContact.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t("contact.form.submitting")}
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        {t("contact.form.submit")}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
