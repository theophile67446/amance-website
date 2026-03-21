import Layout from "@/components/Layout";
import { Scale } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";
import SEO from "@/components/SEO";

export default function MentionsLegales() {
  const { t } = useTranslation();

  return (
    <Layout>
      <SEO title={t("legals.hero.seo_title")} description={t("legals.hero.seo_desc")} />
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-amance-blue/10 text-amance-blue">
              <Scale size={16} />
              {t("legals.hero.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-amance-blue mb-6 font-heading">
              {t("legals.hero.title")}
            </h1>
            <p className="text-xl text-gray-600 font-sans">
              {t("legals.hero.subtitle")}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 sm:p-12 border border-gray-100 prose prose-lg prose-gray max-w-none prose-headings:font-heading prose-p:font-sans">
            <h2 className="text-2xl font-bold text-amance-blue mb-4">{t("legals.body.editor.title")}</h2>
            <p>
              <Trans i18nKey="legals.body.editor.p1" />
            </p>
            <ul>
              <li><strong>{t("legals.body.editor.headquarters")}</strong> {t("legals.body.editor.location")}</li>
              <li><strong>{t("legals.body.editor.phone")}</strong> +237 674 943 368 / +237 689 314 418</li>
              <li><strong>{t("legals.body.editor.email")}</strong> infos@amance.org</li>
            </ul>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">{t("legals.body.property.title")}</h2>
            <p>
              {t("legals.body.property.p1")}
            </p>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">{t("legals.body.liability.title")}</h2>
            <p>
              {t("legals.body.liability.p1")}
              <br /><br />
              {t("legals.body.liability.p2")}
            </p>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">{t("legals.body.hosting.title")}</h2>
            <p>
              {t("legals.body.hosting.p1")}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
