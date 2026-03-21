import Layout from "@/components/Layout";
import { ShieldCheck } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";
import SEO from "@/components/SEO";

export default function PolitiqueConfidentialite() {
  const { t } = useTranslation();

  const collectionItems = t("privacy.body.collect.items", { returnObjects: true }) as string[];
  const usageItems = t("privacy.body.usage.items", { returnObjects: true }) as string[];

  return (
    <Layout>
      <SEO title={t("privacy.hero.seo_title")} description={t("privacy.hero.seo_desc")} />
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-amance-green/10 text-amance-green">
              <ShieldCheck size={16} />
              {t("privacy.hero.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-amance-blue mb-6 font-heading">
              {t("privacy.hero.title")}
            </h1>
            <p className="text-xl text-gray-600 font-sans">
              {t("privacy.hero.subtitle")}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 sm:p-12 border border-gray-100 prose prose-lg prose-gray max-w-none prose-headings:font-heading prose-p:font-sans">
            <p className="lead text-xl text-gray-700 font-semibold mb-8">
              {t("privacy.body.lead")}
            </p>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">{t("privacy.body.collect.title")}</h2>
            <p>
              {t("privacy.body.collect.p1")}
            </p>
            <ul>
              {collectionItems && Array.isArray(collectionItems) && collectionItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">{t("privacy.body.usage.title")}</h2>
            <p>
              {t("privacy.body.usage.p1")}
            </p>
            <ul>
              {usageItems && Array.isArray(usageItems) && usageItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">{t("privacy.body.sharing.title")}</h2>
            <p>
              <Trans i18nKey="privacy.body.sharing.p1" />
            </p>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">{t("privacy.body.rights.title")}</h2>
            <p>
              {t("privacy.body.rights.p1")}
              <br /><br />
              <Trans i18nKey="privacy.body.rights.p2" />
            </p>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">{t("privacy.body.security.title")}</h2>
            <p>
              {t("privacy.body.security.p1")}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
