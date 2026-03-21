import { useParams } from "wouter";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { formatDate } from "@/lib/utils";
import { Loader, ArrowLeft, Share2 } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

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

  if (!slug) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-lg text-gray-600">Article non trouvé</p>
          <Link href="/actualites" className="text-green-600 hover:underline mt-4 inline-block">
            ← Retour aux actualités
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

  if (!article) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-lg text-gray-600">Article non trouvé</p>
          <Link href="/actualites" className="text-green-600 hover:underline mt-4 inline-block">
            ← Retour aux actualités
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title={displayTitle || "Actualité"} 
        description={displayExcerpt || undefined}
        image={article.coverImage || undefined}
      />
      {/* Hero */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={article.coverImage || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"}
          alt={displayTitle || ""}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-white hover:text-gray-300 mb-4"
            >
              <ArrowLeft size={18} />
              Retour aux actualités
            </Link>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {displayTitle}
            </h1>
            <div className="flex items-center gap-4 text-gray-300">
              <span className="text-sm">{formatDate(new Date(article.createdAt))}</span>
              <span className="text-sm">·</span>
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: "var(--amance-green)" }}
              >
                {article.category}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta */}
          <div className="flex items-center justify-between mb-12 pb-8 border-b">
            <div>
              <p className="text-sm text-gray-500 mb-2">Publié par</p>
              <p className="font-semibold text-gray-900">{article.author || "AMANCE"}</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <Share2 size={18} />
              Partager
            </button>
          </div>

          {/* Body */}
          <article
            className="prose prose-lg max-w-none mb-16"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            <p className="text-xl text-gray-700 leading-relaxed mb-8">{displayExcerpt}</p>
            <div 
              className="text-base text-gray-600 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: displayContent || "" }}
            />
          </article>

          {/* CTA */}
          <div
            className="p-8 rounded-2xl"
            style={{ backgroundColor: "var(--amance-green)", color: "white" }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Vous trouvez ce projet intéressant ?
            </h3>
            <p className="mb-6">Soutenez notre action et contribuez à la réalisation de nos projets.</p>
            <Link
              href="/faire-un-don"
              className="inline-block px-8 py-3 rounded-lg font-bold transition-all hover:opacity-90"
              style={{ backgroundColor: "white", color: "var(--amance-green)" }}
            >
              Faire un don
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-12"
            style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
          >
            Articles Connexes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Placeholder - In production, fetch related articles */}
            <div className="bg-white p-6 rounded-lg">
              <p className="text-gray-600">D'autres articles seront bientôt disponibles...</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
