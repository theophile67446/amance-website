import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import LocalLogin from "@/components/LocalLogin";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Edit2, Trash2, FileText, Briefcase, Eye, EyeOff, Calendar, MapPin, Mail, Users, CheckCircle, Clock, ArrowUp, ArrowDown } from "lucide-react";

const TAB_LABELS: Record<string, string> = {
  dashboard: "Vue d'ensemble",
  articles: "Actualités & Articles",
  projets: "Projets & Missions",
  contacts: "Messages",
  registrations: "Bénévoles & Partenaires",
  equipe: "Équipe",
};

export default function Admin() {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <LocalLogin />;
  }

  return (
    <AdminLayout>
      {(activeTab, setActiveTab) => <AdminContent activeTab={activeTab} setActiveTab={setActiveTab} />}
    </AdminLayout>
  );
}

function AdminContent({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const [message, setMessage] = useState("");

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardTab setActiveTab={setActiveTab} />;
      case "articles": return <ArticlesTab setMessage={setMessage} />;
      case "projets": return <ProjetsTab setMessage={setMessage} />;
      case "contacts": return <ContactsTab setMessage={setMessage} />;
      case "registrations": return <RegistrationsTab setMessage={setMessage} />;
      case "equipe": return <TeamTab setMessage={setMessage} />;
      default: return <DashboardTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen pb-12 pl-14 lg:pl-0">
      {/* Page header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 sticky top-0 z-30">
        <h1 className="text-xl font-bold text-[#1A361D] font-heading">
          {TAB_LABELS[activeTab] ?? "Administration"}
        </h1>
      </div>

      <div className="px-4 md:px-8 py-8">
        <Card className="shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
          <div className="p-6 md:p-8 bg-white">
            {message && (
              <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                <AlertDescription className="font-medium flex items-center">
                  <span className="mr-2">✨</span> {message}
                </AlertDescription>
              </Alert>
            )}
            {renderTab()}
          </div>
        </Card>
      </div>
    </div>
  );
}

function DashboardTab({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { data: articles = [] } = trpc.articles.adminList.useQuery();
  const { data: projects = [] } = trpc.projects.adminList.useQuery();
  const { data: contacts = [] } = trpc.contact.adminList.useQuery();
  const { data: registrations = [] } = trpc.registration.adminList.useQuery();
  const { data: teamMembers = [] } = trpc.team.adminList.useQuery();

  const publishedArticles = articles.filter((a: any) => a.published).length;
  const unreadMessages = contacts.filter((c: any) => c.status === 'nouveau').length;
  const newRegistrations = registrations.filter((r: any) => r.status === 'nouveau').length;
  const activeMembers = teamMembers.filter((member: any) => member.active).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 pb-6">
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-[#F5B100]"
        onClick={() => setActiveTab("articles")}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium mb-1">Articles</p>
              <h3 className="text-3xl font-bold text-[#1A361D]">{articles.length}</h3>
            </div>
            <div className="p-3 bg-orange-50 rounded-full text-[#F5B100]">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex space-x-2 text-sm">
            <span className="text-green-600 font-medium">{publishedArticles} publiés</span>
          </div>
        </CardContent>
      </Card>

      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-[#1E5D2A]"
        onClick={() => setActiveTab("projets")}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium mb-1">Projets</p>
              <h3 className="text-3xl font-bold text-[#1A361D]">{projects.length}</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-full text-[#1E5D2A]">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex space-x-2 text-sm">
            <span className="text-blue-600 font-medium">{projects.filter(p => p.status === 'en_cours').length} en cours</span>
          </div>
        </CardContent>
      </Card>

      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-blue-500"
        onClick={() => setActiveTab("contacts")}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium mb-1">Messages</p>
              <h3 className="text-3xl font-bold text-[#1A361D]">{contacts.length}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-full text-blue-500">
              <Mail className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex space-x-2 text-sm">
            <span className={`${unreadMessages > 0 ? 'text-red-500 font-bold' : 'text-gray-500'}`}>{unreadMessages} non lus</span>
          </div>
        </CardContent>
      </Card>

      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-purple-500"
        onClick={() => setActiveTab("registrations")}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium mb-1">Inscriptions</p>
              <h3 className="text-3xl font-bold text-[#1A361D]">{registrations.length}</h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-full text-purple-500">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex space-x-2 text-sm">
            <span className={`${newRegistrations > 0 ? 'text-purple-600 font-bold' : 'text-gray-500'}`}>{newRegistrations} nouvelles</span>
          </div>
        </CardContent>
      </Card>

      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-emerald-500"
        onClick={() => setActiveTab("equipe")}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium mb-1">Équipe</p>
              <h3 className="text-3xl font-bold text-[#1A361D]">{teamMembers.length}</h3>
            </div>
            <div className="p-3 bg-emerald-50 rounded-full text-emerald-500">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex space-x-2 text-sm">
            <span className="text-emerald-700 font-medium">{activeMembers} actifs</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ArticlesTab({ setMessage }: { setMessage: (msg: string) => void }) {
  const utils = trpc.useContext();
  const { data: articles = [], isLoading } = trpc.articles.adminList.useQuery();
  const createMutation = trpc.articles.create.useMutation();
  const updateMutation = trpc.articles.update.useMutation();
  const deleteMutation = trpc.articles.delete.useMutation();

  const [editingId, setEditingId] = useState<number | null>(null);

  const defaultForm = {
    title: "",
    titleEn: "",
    slug: "",
    excerpt: "",
    excerptEn: "",
    content: "",
    contentEn: "",
    coverImage: "",
    category: "actualites" as const,
    author: "",
    published: false,
  };

  const [form, setForm] = useState(defaultForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...form });
        setMessage("✅ Article mis à jour avec succès!");
      } else {
        await createMutation.mutateAsync(form);
        setMessage("✅ Article créé avec succès!");
      }
      setForm(defaultForm);
      setEditingId(null);
      utils.articles.adminList.invalidate();
    } catch (error) {
      setMessage("❌ Erreur lors de l'enregistrement");
    }
  };

  const handleEdit = (article: any) => {
    setEditingId(article.id);
    setForm({
      title: article.title,
      titleEn: article.titleEn || "",
      slug: article.slug,
      excerpt: article.excerpt || "",
      excerptEn: article.excerptEn || "",
      content: article.content,
      contentEn: article.contentEn || "",
      coverImage: article.coverImage || "",
      category: article.category,
      author: article.author || "",
      published: article.published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultForm);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Formulaire */}
      <div className="lg:col-span-8">
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-xl flex items-center text-[#1A361D]">
              <Edit2 className="w-5 h-5 mr-3 text-[#F5B100]" />
              {editingId ? "Modifier l'article" : "Créer un nouvel article"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Titre de l'article (FR)</label>
                  <Input
                    className="h-12 border-gray-200 focus:border-[#1E5D2A] focus:ring-[#1E5D2A]"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Titre de l'article (EN)</label>
                  <Input
                    className="h-12 border-gray-200 focus:border-[#1E5D2A] focus:ring-[#1E5D2A]"
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (URL amicale)</label>
                  <Input
                    className="h-12 border-gray-200"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full h-12 px-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                  >
                    <option value="actualites">Actualités</option>
                    <option value="terrain">Terrain</option>
                    <option value="rapport">Rapport</option>
                    <option value="communique">Communiqué</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Auteur</label>
                  <Input
                    className="h-12 border-gray-200"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="Équipe AMANCE"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image de couverture (URL externe)</label>
                <div className="flex gap-4">
                  <Input
                    className="h-12 border-gray-200 flex-1"
                    value={form.coverImage}
                    onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                  />
                  {form.coverImage && (
                    <div className="w-16 h-12 bg-gray-100 rounded-md overflow-hidden border">
                      <img src={form.coverImage} alt="Cover" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Résumé (FR)</label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                    placeholder="Un court texte accrocheur..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Résumé (EN)</label>
                  <textarea
                    value={form.excerptEn}
                    onChange={(e) => setForm({ ...form, excerptEn: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                    placeholder="Short catching text..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contenu complet (FR)</label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md h-64 resize-y focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                    placeholder="Contenu complet en français..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contenu complet (EN)</label>
                  <textarea
                    value={form.contentEn}
                    onChange={(e) => setForm({ ...form, contentEn: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md h-64 resize-y focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                    placeholder="Full content in English..."
                  />
                </div>
              </div>

              {editingId && (
                <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border">
                  <input
                    type="checkbox"
                    id="published"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="w-5 h-5 text-[#1E5D2A] rounded border-gray-300 focus:ring-[#1E5D2A]"
                  />
                  <label htmlFor="published" className="font-medium text-gray-700 cursor-pointer">
                    Publier l'article (visible par le public)
                  </label>
                </div>
              )}

              <div className="flex space-x-4 pt-4 border-t">
                <Button
                  type="submit"
                  className="bg-[#1A361D] hover:bg-[#152e18] text-white flex-1 h-12 text-lg"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {(createMutation.isPending || updateMutation.isPending) ? "Enregistrement..." : (editingId ? "Mettre à jour" : "Créer l'article (Brouillon)")}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={cancelEdit} className="h-12 px-8">
                    Annuler
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Liste */}
      <div className="lg:col-span-4">
        <Card className="border border-gray-100 shadow-sm sticky top-6">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-xl text-[#1A361D]">Articles {articles.length > 0 && `(${articles.length})`}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 p-0">
            {isLoading ? (
              <div className="p-6 text-center text-gray-500">Chargement...</div>
            ) : (
              <div className="max-h-[800px] overflow-y-auto divide-y divide-gray-100">
                {articles.map((article: any) => (
                  <div
                    key={article.id}
                    className={`p-4 hover:bg-gray-50 transition-colors flex flex-col ${editingId === article.id ? 'bg-orange-50/50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 pr-4">
                        <p className="font-bold text-gray-800 line-clamp-2 leading-tight">{article.title}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium capitalize">
                            {article.category}
                          </span>
                          {article.published ? (
                            <span className="text-xs flex items-center text-green-700 bg-green-50 px-2 py-1 rounded font-medium">
                              <Eye className="w-3 h-3 mr-1" /> Publié
                            </span>
                          ) : (
                            <span className="text-xs flex items-center text-orange-700 bg-orange-50 px-2 py-1 rounded font-medium">
                              <EyeOff className="w-3 h-3 mr-1" /> Brouillon
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-3 pt-3 border-t border-gray-50">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 h-8"
                        onClick={() => handleEdit(article)}
                      >
                        <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Modifier
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8"
                        onClick={() => {
                          if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
                            deleteMutation.mutate(article.id, {
                              onSuccess: () => utils.articles.adminList.invalidate()
                            });
                          }
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
                {articles.length === 0 && (
                  <div className="p-8 text-center text-gray-500">Aucun article trouvé.</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProjetsTab({ setMessage }: { setMessage: (msg: string) => void }) {
  const utils = trpc.useContext();
  const { data: projects = [], isLoading } = trpc.projects.adminList.useQuery();
  const createMutation = trpc.projects.create.useMutation();
  const updateMutation = trpc.projects.update.useMutation();
  const deleteMutation = trpc.projects.delete.useMutation();

  const [editingId, setEditingId] = useState<number | null>(null);

  const defaultForm = {
    title: "",
    titleEn: "",
    slug: "",
    description: "",
    descriptionEn: "",
    fullDescription: "",
    fullDescriptionEn: "",
    coverImage: "",
    category: "humanitaire" as const,
    location: "",
    status: "en_cours" as const,
    beneficiaries: 0,
    featured: false
  };

  const [form, setForm] = useState(defaultForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...form, beneficiaries: Number(form.beneficiaries) });
        setMessage("✅ Projet mis à jour avec succès!");
      } else {
        await createMutation.mutateAsync({ ...form, beneficiaries: Number(form.beneficiaries) });
        setMessage("✅ Projet créé avec succès!");
      }
      setForm(defaultForm);
      setEditingId(null);
      utils.projects.adminList.invalidate();
    } catch (error) {
      setMessage("❌ Erreur lors de l'enregistrement");
    }
  };

  const handleEdit = (project: any) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      titleEn: project.titleEn || "",
      slug: project.slug,
      description: project.description || "",
      descriptionEn: project.descriptionEn || "",
      fullDescription: project.fullDescription || "",
      fullDescriptionEn: project.fullDescriptionEn || "",
      coverImage: project.coverImage || "",
      category: project.category,
      location: project.location || "",
      status: project.status || "en_cours",
      beneficiaries: project.beneficiaries || 0,
      featured: project.featured || false
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultForm);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Formulaire */}
      <div className="lg:col-span-8">
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-xl flex items-center text-[#1A361D]">
              <Edit2 className="w-5 h-5 mr-3 text-[#1E5D2A]" />
              {editingId ? "Modifier le projet" : "Créer un nouveau projet"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom du projet (FR)</label>
                  <Input
                    className="h-12 border-gray-200 focus:border-[#1E5D2A]"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom du projet (EN)</label>
                  <Input
                    className="h-12 border-gray-200 focus:border-[#1E5D2A]"
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (URL)</label>
                  <Input
                    className="h-12 border-gray-200"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full h-12 px-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                  >
                    <option value="humanitaire">Humanitaire</option>
                    <option value="sante">Santé</option>
                    <option value="communautaire">Communautaire</option>
                    <option value="conservation">Conservation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Statut</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full h-12 px-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                  >
                    <option value="en_cours">En cours</option>
                    <option value="termine">Terminé</option>
                    <option value="planifie">Planifié</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bénéficiaires</label>
                  <Input
                    type="number"
                    className="h-12 border-gray-200"
                    value={form.beneficiaries}
                    onChange={(e) => setForm({ ...form, beneficiaries: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Localisation</label>
                  <Input
                    className="h-12 border-gray-200"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Région, Ville..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Image de couverture (URL)</label>
                  <div className="flex gap-2">
                    <Input
                      className="h-12 border-gray-200 flex-1"
                      value={form.coverImage}
                      onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                    />
                    {form.coverImage && (
                      <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden border">
                        <img src={form.coverImage} alt="Cover" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description courte (FR)</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description courte (EN)</label>
                  <textarea
                    value={form.descriptionEn}
                    onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description complète (FR)</label>
                  <textarea
                    value={form.fullDescription}
                    onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md h-64 resize-y focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                    placeholder="Description complète en français..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description complète (EN)</label>
                  <textarea
                    value={form.fullDescriptionEn}
                    onChange={(e) => setForm({ ...form, fullDescriptionEn: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md h-64 resize-y focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                    placeholder="Full description in English..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border">
                <input
                  type="checkbox"
                  id="featuredProject"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-5 h-5 text-[#1E5D2A] rounded border-gray-300 focus:ring-[#1E5D2A]"
                />
                <label htmlFor="featuredProject" className="font-medium text-gray-700 cursor-pointer">
                  Mettre en avant sur la page d'accueil (Projet majeur)
                </label>
              </div>

              <div className="flex space-x-4 pt-4 border-t">
                <Button
                  type="submit"
                  className="bg-[#1A361D] hover:bg-[#152e18] text-white flex-1 h-12 text-lg"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {(createMutation.isPending || updateMutation.isPending) ? "Enregistrement..." : (editingId ? "Mettre à jour" : "Créer le projet")}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={cancelEdit} className="h-12 px-8">
                    Annuler
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Liste */}
      <div className="lg:col-span-4">
        <Card className="border border-gray-100 shadow-sm sticky top-6">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-xl text-[#1A361D]">Projets {projects.length > 0 && `(${projects.length})`}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 p-0">
            {isLoading ? (
              <div className="p-6 text-center text-gray-500">Chargement...</div>
            ) : (
              <div className="max-h-[800px] overflow-y-auto divide-y divide-gray-100">
                {projects.map((project: any) => (
                  <div
                    key={project.id}
                    className={`p-4 hover:bg-gray-50 transition-colors flex flex-col ${editingId === project.id ? 'bg-green-50/50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 pr-4">
                        <p className="font-bold text-gray-800 line-clamp-2 leading-tight">{project.title}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium capitalize flex items-center">
                            <MapPin className="w-3 h-3 mr-1" /> {project.location || "N/A"}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded font-medium capitalize ${project.status === 'en_cours' ? 'bg-blue-50 text-blue-700' :
                            project.status === 'termine' ? 'bg-green-50 text-green-700' :
                              'bg-orange-50 text-orange-700'
                            }`}>
                            {project.status.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-3 pt-3 border-t border-gray-50">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 h-8"
                        onClick={() => handleEdit(project)}
                      >
                        <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Modifier
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8"
                        onClick={() => {
                          if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
                            deleteMutation.mutate(project.id, {
                              onSuccess: () => utils.projects.adminList.invalidate()
                            });
                          }
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && (
                  <div className="p-8 text-center text-gray-500">Aucun projet trouvé.</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TeamTab({ setMessage }: { setMessage: (msg: string) => void }) {
  const utils = trpc.useContext();
  const { data: members = [], isLoading } = trpc.team.adminList.useQuery();
  const createMutation = trpc.team.create.useMutation();
  const updateMutation = trpc.team.update.useMutation();
  const deleteMutation = trpc.team.delete.useMutation();
  const reorderMutation = trpc.team.reorder.useMutation();

  const [editingId, setEditingId] = useState<number | null>(null);

  const defaultForm = {
    name: "",
    role: "",
    title: "",
    location: "",
    image: "",
    bio: "",
    active: true,
  };

  const [form, setForm] = useState(defaultForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...form });
        setMessage("✅ Membre mis à jour avec succès!");
      } else {
        await createMutation.mutateAsync(form);
        setMessage("✅ Membre ajouté avec succès!");
      }

      setForm(defaultForm);
      setEditingId(null);
      utils.team.adminList.invalidate();
      utils.team.list.invalidate();
    } catch (error) {
      setMessage("❌ Erreur lors de l'enregistrement du membre");
    }
  };

  const handleEdit = (member: any) => {
    setEditingId(member.id);
    setForm({
      name: member.name,
      role: member.role,
      title: member.title || "",
      location: member.location || "",
      image: member.image || "",
      bio: member.bio || "",
      active: member.active,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultForm);
  };

  const moveMember = async (id: number, direction: "up" | "down") => {
    const currentIndex = members.findIndex((member: any) => member.id === id);
    if (currentIndex === -1) return;

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= members.length) return;

    const reordered = [...members];
    const [moved] = reordered.splice(currentIndex, 1);
    reordered.splice(targetIndex, 0, moved);

    try {
      await reorderMutation.mutateAsync({ orderedIds: reordered.map((member: any) => member.id) });
      utils.team.adminList.invalidate();
      utils.team.list.invalidate();
    } catch (error) {
      setMessage("❌ Erreur lors de la réorganisation");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8">
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-xl flex items-center text-[#1A361D]">
              <Edit2 className="w-5 h-5 mr-3 text-[#1E5D2A]" />
              {editingId ? "Modifier un membre" : "Ajouter un membre"}
            </CardTitle>
            <CardDescription>
              Gérez l'équipe affichée sur la page À Propos avec photo, rôle et ordre d'affichage.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet</label>
                  <Input
                    className="h-12 border-gray-200"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rôle</label>
                  <Input
                    className="h-12 border-gray-200"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="Présidente, Secrétaire..."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Titre / Fonction</label>
                  <Input
                    className="h-12 border-gray-200"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="BSc Administration"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Localisation</label>
                  <Input
                    className="h-12 border-gray-200"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Buea"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Photo (URL)</label>
                <div className="flex gap-4">
                  <Input
                    className="h-12 border-gray-200 flex-1"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://..."
                  />
                  {form.image && (
                    <div className="w-16 h-12 bg-gray-100 rounded-md overflow-hidden border">
                      <img src={form.image} alt="Aperçu" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio courte (optionnel)</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                  placeholder="Présentation courte du membre"
                />
              </div>

              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border">
                <input
                  type="checkbox"
                  id="activeMember"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="w-5 h-5 text-[#1E5D2A] rounded border-gray-300 focus:ring-[#1E5D2A]"
                />
                <label htmlFor="activeMember" className="font-medium text-gray-700 cursor-pointer">
                  Membre actif (visible sur la page publique)
                </label>
              </div>

              <div className="flex space-x-4 pt-4 border-t">
                <Button
                  type="submit"
                  className="bg-[#1A361D] hover:bg-[#152e18] text-white flex-1 h-12 text-lg"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {(createMutation.isPending || updateMutation.isPending)
                    ? "Enregistrement..."
                    : (editingId ? "Mettre à jour" : "Ajouter le membre")}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={cancelEdit} className="h-12 px-8">
                    Annuler
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-4">
        <Card className="border border-gray-100 shadow-sm sticky top-6">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-xl text-[#1A361D]">Membres ({members.length})</CardTitle>
            <CardDescription>
              Utilisez les flèches pour définir l'ordre d'affichage.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 p-0">
            {isLoading ? (
              <div className="p-6 text-center text-gray-500">Chargement...</div>
            ) : (
              <div className="max-h-[800px] overflow-y-auto divide-y divide-gray-100">
                {members.map((member: any, index: number) => (
                  <div key={member.id} className={`p-4 hover:bg-gray-50 transition-colors ${editingId === member.id ? "bg-emerald-50/40" : ""}`}>
                    <div className="flex items-start gap-3">
                      <img
                        src={member.image || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&q=80"}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 truncate">{member.name}</p>
                        <p className="text-sm text-gray-600 truncate">{member.role}</p>
                        <p className="text-xs text-gray-500 truncate">{member.location || "Sans localisation"}</p>
                        <div className="mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${member.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-700"}`}>
                            {member.active ? "Actif" : "Inactif"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => moveMember(member.id, "up")}
                          disabled={index === 0 || reorderMutation.isPending}
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => moveMember(member.id, "down")}
                          disabled={index === members.length - 1 || reorderMutation.isPending}
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" className="h-8" onClick={() => handleEdit(member)}>
                          <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Modifier
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8"
                          onClick={() => {
                            if (window.confirm("Supprimer ce membre de l'équipe ?")) {
                              deleteMutation.mutate(member.id, {
                                onSuccess: () => {
                                  setMessage("✅ Membre supprimé");
                                  utils.team.adminList.invalidate();
                                  utils.team.list.invalidate();
                                },
                              });
                            }
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {members.length === 0 && (
                  <div className="p-8 text-center text-gray-500">Aucun membre enregistré.</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ContactsTab({ setMessage }: { setMessage: (msg: string) => void }) {
  const utils = trpc.useContext();
  const { data: contacts = [], isLoading } = trpc.contact.adminList.useQuery();
  const updateStatus = trpc.contact.updateStatus.useMutation();

  const handleStatusChange = async (id: number, status: "nouveau" | "lu" | "traite") => {
    try {
      await updateStatus.mutateAsync({ id, status });
      utils.contact.adminList.invalidate();
    } catch (error) {
      setMessage("❌ Erreur lors de la mise à jour");
    }
  };

  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
        <CardTitle className="text-xl text-[#1A361D]">Boîte de réception ({contacts.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 text-center text-gray-500">Chargement...</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {contacts.map((contact: any) => (
              <div key={contact.id} className={`p-6 hover:bg-gray-50 ${contact.status === 'nouveau' ? 'bg-blue-50/30' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className={`text-lg hover:underline cursor-pointer ${contact.status === 'nouveau' ? 'font-bold text-blue-900' : 'font-semibold text-gray-800'}`}>
                      {contact.subject}
                    </h4>
                    <p className="text-sm text-gray-500 font-medium">De: {contact.firstName} {contact.lastName} ({contact.email})</p>
                  </div>
                  <select
                    value={contact.status}
                    onChange={(e) => handleStatusChange(contact.id, e.target.value as any)}
                    className={`text-sm rounded-full px-3 py-1 font-medium border ${contact.status === 'nouveau' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      contact.status === 'traite' ? 'bg-green-100 text-green-800 border-green-200' :
                        'bg-gray-100 text-gray-800 border-gray-200'
                      }`}
                  >
                    <option value="nouveau">Nouveau</option>
                    <option value="lu">Lu</option>
                    <option value="traite">Traité</option>
                  </select>
                </div>
                <div className="mt-4 p-4 bg-white border rounded-lg text-gray-700 whitespace-pre-wrap text-sm">
                  {contact.message}
                </div>
              </div>
            ))}
            {contacts.length === 0 && <div className="p-8 text-center text-gray-500">Aucun message de contact.</div>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RegistrationsTab({ setMessage }: { setMessage: (msg: string) => void }) {
  const utils = trpc.useContext();
  const { data: registrations = [], isLoading } = trpc.registration.adminList.useQuery();
  const updateStatus = trpc.registration.updateStatus.useMutation();

  const handleStatusChange = async (id: number, status: "nouveau" | "contacte" | "actif" | "inactif") => {
    try {
      await updateStatus.mutateAsync({ id, status });
      utils.registration.adminList.invalidate();
    } catch (error) {
      setMessage("❌ Erreur lors de la mise à jour");
    }
  };

  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
        <CardTitle className="text-xl text-[#1A361D]">Candidatures Bénévoles & Partenaires ({registrations.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 text-center text-gray-500">Chargement...</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {registrations.map((reg: any) => (
              <div key={reg.id} className={`p-6 hover:bg-gray-50 ${reg.status === 'nouveau' ? 'bg-purple-50/30' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${reg.type === 'benevole' ? 'bg-orange-100 text-orange-800' : 'bg-teal-100 text-teal-800'}`}>
                        {reg.type}
                      </span>
                      <h4 className="text-lg font-bold text-gray-800">
                        {reg.firstName} {reg.lastName} {reg.organization ? `(${reg.organization})` : ''}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Contact: {reg.email} {reg.phone ? `| ${reg.phone}` : ''} | Localisation: {reg.city}, {reg.country}</p>
                  </div>
                  <select
                    value={reg.status}
                    onChange={(e) => handleStatusChange(reg.id, e.target.value as any)}
                    className={`text-sm rounded-full px-3 py-1 font-medium border ${reg.status === 'nouveau' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                      reg.status === 'actif' ? 'bg-green-100 text-green-800 border-green-200' :
                        'bg-gray-100 text-gray-800 border-gray-200'
                      }`}
                  >
                    <option value="nouveau">Nouveau</option>
                    <option value="contacte">Contacté</option>
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                  </select>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reg.motivation && (
                    <div className="p-4 bg-white border rounded-lg">
                      <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Motivation / Description</p>
                      <p className="text-sm text-gray-700">{reg.motivation}</p>
                    </div>
                  )}
                  {reg.skills && (
                    <div className="p-4 bg-white border rounded-lg">
                      <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Compétences / Objectifs</p>
                      <p className="text-sm text-gray-700">{reg.skills}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {registrations.length === 0 && <div className="p-8 text-center text-gray-500">Aucune candidature.</div>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
