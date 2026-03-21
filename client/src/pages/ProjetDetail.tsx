import { useParams } from "wouter";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Loader, ArrowLeft, MapPin, Users, Calendar, TreePine, Heart, Link as LinkIcon } from "lucide-react";
import { Link } from "wouter";

export default function ProjetDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const { data: project, isLoading } = trpc.projects.getBySlug.useQuery(
    { slug: slug! },
    { enabled: !!slug }
  );

  if (!slug) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-lg text-gray-600">Projet non trouvé</p>
          <Link href="/projets" className="text-green-600 hover:underline mt-4 inline-block">
            ← Retour aux projets
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

  if (!project) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-lg text-gray-600">Projet non trouvé</p>
          <Link href="/projets" className="text-green-600 hover:underline mt-4 inline-block">
            ← Retour aux projets
          </Link>
        </div>
      </Layout>
    );
  }

  const categoryConfig: Record<string, { label: string; color: string }> = {
    conservation: { label: "Conservation", color: "var(--amance-blue-light)" },
    humanitaire: { label: "Humanitaire", color: "var(--amance-green)" },
    sante: { label: "Santé", color: "var(--amance-blue)" },
    communautaire: { label: "Communautaire", color: "var(--amance-green-dark)" },
  };

  const cat = categoryConfig[project.category as keyof typeof categoryConfig];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        <img
          src={project.coverImage || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80"}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 text-white hover:text-gray-300 mb-6"
            >
              <ArrowLeft size={20} />
              Retour aux projets
            </Link>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div
                  className="inline-block px-4 py-2 rounded-full text-sm font-bold text-white mb-4"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.label}
                </div>
                <h1
                  className="text-5xl xl:text-6xl font-extrabold text-white mb-4"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {project.title}
                </h1>
              </div>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl">{project.description}</p>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="bg-white py-12 -mt-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Location */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={24} style={{ color: cat.color }} />
                <h3 className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Localisation
                </h3>
              </div>
              <p className="text-gray-700">{project.location || "Cameroun"}</p>
            </div>

            {/* Period */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={24} style={{ color: cat.color }} />
                <h3 className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Statut
                </h3>
              </div>
              <p className="text-gray-700">{project.status || "En cours"}</p>
            </div>

            {/* Beneficiaries */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users size={24} style={{ color: cat.color }} />
                <h3 className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Bénéficiaires
                </h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{project.beneficiaries || "—"}</p>
            </div>

            {/* Budget */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <TreePine size={24} style={{ color: cat.color }} />
                <h3 className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Budget
                </h3>
              </div>
              <p className="text-lg font-semibold text-gray-900">À déterminer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold mb-12"
            style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
          >
            À propos du projet
          </h2>
          <div
            className="text-lg text-gray-700 leading-relaxed space-y-6 mb-12"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            <p>{project.description}</p>
            {project.fullDescription && <p>{project.fullDescription}</p>}
          </div>

          {/* Impact Stats */}
          {Array.isArray(project.impact) && project.impact.length > 0 && (
            <div className="mb-16">
              <h3
                className="text-2xl font-bold mb-8"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
              >
                Impact mesurable
              </h3>
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-xl"
                style={{ backgroundColor: "rgba(42, 100, 60, 0.1)" }}
              >
                {project.impact.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div
                      className="text-4xl font-extrabold mb-2"
                      style={{ fontFamily: "Montserrat, sans-serif", color: cat.color }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SDGs */}
          {Array.isArray(project.sdgs) && project.sdgs.length > 0 && (
            <div className="mb-16">
              <h3
                className="text-2xl font-bold mb-8"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
              >
                Objectifs de Développement Durable
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.sdgs.map((sdg) => (
                  <span
                    key={sdg}
                    className="px-4 py-2 rounded-full font-semibold text-white"
                    style={{ backgroundColor: "var(--amance-blue)" }}
                  >
                    ODD {sdg}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, var(--amance-blue-dark) 0%, var(--amance-blue) 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Soutenez ce Projet
          </h2>
          <p className="text-lg text-blue-200 mb-10">
            Chaque don contribue directement à la réalisation de ce projet et améliore la vie de nos
            bénéficiaires.
          </p>
          <Link
            href="/faire-un-don"
            className="inline-block px-12 py-4 rounded-full text-lg font-bold text-white transition-all hover:shadow-lg"
            style={{ backgroundColor: "var(--amance-green)" }}
          >
            <Heart size={20} className="inline mr-2" />
            Soutenir ce Projet
          </Link>
        </div>
      </section>
    </Layout>
  );
}
