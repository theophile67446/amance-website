import { useParams } from "wouter";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { formatDate } from "@/lib/utils";
import { Loader, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import ShareActions from "@/components/ShareActions";

export default function ActualiteDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const { i18n, t } = useTranslation();
  const { data: article, isLoading } = trpc.articles.getBySlug.useQuery(
    slug!,
    { enabled: !!slug }
  );

  const isEn = i18n.language.startsWith('en');
  const displayTitle = (isEn && article?.titleEn) ? article.titleEn : article?.title;
  const displayExcerpt = (isEn && article?.excerptEn) ? article.excerptEn : article?.excerpt;
  const displayContent = (isEn && article?.contentEn) ? article.contentEn : article?.content;

  if (!slug || (!isLoading && !article)) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-32 text-center">
          <p className="text-xl font-bold text-gray-800 mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {t("article_detail.not_found")}
          </p>
          <Link href="/actualites" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all shadow-md" 
            style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}>
            <ArrowLeft size={18} /> {t("article_detail.back")}
          </Link>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center py-32">
          <Loader size={48} className="animate-spin text-gray-300" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={displayTitle || t("article_detail.not_found")}
        description={displayExcerpt || undefined}
        image={article?.coverImage || undefined}
      />
      {/* Hero */}
      <section className="relative h-[28rem] overflow-hidden">
        <img
          src={article?.coverImage || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"}
          alt={displayTitle || ""}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={18} />
              {t("article_detail.back")}
            </Link>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {displayTitle}
            </h1>
            <div className="flex items-center gap-4 text-white/70">
              <span className="text-sm font-semibold">{formatDate(new Date(article!.createdAt))}</span>
              <span className="text-sm">·</span>
              <span
                className="px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider"
                style={{ backgroundColor: "var(--amance-green)" }}
              >
                {t(`news_page.filters.${article!.category}`)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 pb-8 border-b gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">{t("article_detail.published_by")}</p>
              <p className="font-bold text-gray-900" style={{ fontFamily: "Montserrat, sans-serif" }}>{article!.author || t("news_page.card.author_default")}</p>
            </div>
            <ShareActions
              title={displayTitle || ""}
              summary={displayExcerpt || ""}
              path={`/actualites/${article!.slug}`}
              compact
            />
          </div>

          {/* Body */}
          <article
            className="prose prose-lg max-w-none mb-16 prose-img:rounded-2xl"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            {displayExcerpt && (
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-semibold mb-10 border-l-4 pl-6" style={{ borderColor: "var(--amance-green)" }}>
                {displayExcerpt}
              </p>
            )}
            <div
              className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap selection:bg-amance-green/20"
              dangerouslySetInnerHTML={{ __html: displayContent || "" }}
            />
          </article>

          <div className="mb-12 p-8 rounded-3xl border border-gray-100 bg-gray-50/50 text-center">
            <p className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-widest">{t("article_detail.share")}</p>
            <div className="flex justify-center">
              <ShareActions
                title={displayTitle || ""}
                summary={displayExcerpt || ""}
                path={`/actualites/${article!.slug}`}
              />
            </div>
          </div>

          {/* CTA */}
          <div
            className="p-10 rounded-3xl relative overflow-hidden group shadow-xl"
            style={{ backgroundColor: "var(--amance-blue-dark)", color: "white" }}
          >
            <div className="relative z-10 max-w-2xl">
              <h3
                className="text-3xl font-extrabold mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("article_detail.cta.title")}
              </h3>
              <p className="text-blue-100 mb-8 max-w-lg">
                 {t("article_detail.cta.subtitle")}
              </p>
              <Link
                href="/faire-un-don"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-lg"
                style={{ backgroundColor: "var(--amance-green)", color: "white" }}
              >
                {t("article_detail.cta.button")}
                <ArrowLeft className="rotate-180" size={18} />
              </Link>
            </div>
            {/* Background design element */}
            <div className="absolute top-0 right-0 p-4 opacity-10 translate-x-1/4 -translate-y-1/4">
               <div className="w-64 h-64 rounded-full border-[20px] border-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold mb-12"
            style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
          >
            {t("article_detail.related.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center col-span-full">
              <p className="text-gray-500 font-medium">
                {t("article_detail.related.placeholder")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
