import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Edit2, Eye, Plus, Trash2 } from "lucide-react";

import { ParsedAdminLocation } from "@/components/admin/adminRouting";
import {
  AdminShell,
  ContentGrid,
  EmptyState,
  FieldLabel,
  FilterInput,
  MetaCard,
  SidebarCard,
  StatusBadge,
  TextArea,
} from "@/components/admin/AdminScaffold";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { formatDate } from "@/lib/utils";

export function AdminArticlesPage({
  route,
  navigate,
  setMessage,
}: {
  route: ParsedAdminLocation;
  navigate: (path: string) => void;
  setMessage: (message: string) => void;
}) {
  if (route.mode === "list") {
    return <ArticlesList navigate={navigate} setMessage={setMessage} />;
  }

  return <ArticleEditor id={route.mode === "edit" ? route.id : null} navigate={navigate} setMessage={setMessage} />;
}

function ArticlesList({ navigate, setMessage }: { navigate: (path: string) => void; setMessage: (message: string) => void }) {
  const utils = trpc.useUtils();
  const { data: articles = [], isLoading } = trpc.articles.adminList.useQuery();
  const updateMutation = trpc.articles.update.useMutation();
  const deleteMutation = trpc.articles.delete.useMutation();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  const filtered = useMemo(
    () => articles.filter((article: any) => {
      const q = search.toLowerCase();
      const matchesSearch =
        article.title.toLowerCase().includes(q)
        || (article.slug || "").toLowerCase().includes(q)
        || (article.author || "").toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "all"
        || (statusFilter === "published" && article.published)
        || (statusFilter === "draft" && !article.published);
      return matchesSearch && matchesStatus;
    }),
    [articles, search, statusFilter],
  );

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer cet article ?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      await utils.articles.adminList.invalidate();
      await utils.articles.list.invalidate();
      setMessage("Article supprimé.");
    } catch {
      setMessage("Impossible de supprimer l’article.");
    }
  };

  const togglePublished = async (article: any) => {
    try {
      await updateMutation.mutateAsync({ id: article.id, published: !article.published });
      await utils.articles.adminList.invalidate();
      await utils.articles.list.invalidate();
      setMessage(article.published ? "Article repassé en brouillon." : "Article publié.");
    } catch {
      setMessage("Impossible de changer le statut.");
    }
  };

  return (
    <AdminShell
      title="Actualités & Articles"
      subtitle="Cette page sert uniquement à lister et retrouver les contenus. Chaque édition se fait sur une page dédiée avec son propre lien."
      primaryAction={
        <Button className="h-12 rounded-xl bg-[#18361f] px-5 text-white hover:bg-[#112718]" onClick={() => navigate("/admin/articles/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel article
        </Button>
      }
    >
      <ContentGrid
        sidebar={
          <SidebarCard title="Filtrer" description="Retrouvez rapidement un article à modifier.">
            <FilterInput value={search} onChange={setSearch} placeholder="Titre, slug ou auteur" />
            <div className="grid gap-2">
              {[
                { value: "all", label: "Tous" },
                { value: "published", label: "Publiés" },
                { value: "draft", label: "Brouillons" },
              ].map(option => (
                <Button
                  key={option.value}
                  type="button"
                  variant={statusFilter === option.value ? "default" : "outline"}
                  className={statusFilter === option.value ? "justify-start bg-[#18361f] hover:bg-[#112718]" : "justify-start"}
                  onClick={() => setStatusFilter(option.value as "all" | "published" | "draft")}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            <div className="rounded-2xl bg-[#f5f8f4] p-4 text-sm text-gray-600">
              <p className="font-semibold text-[#18361f]">{filtered.length} résultat(s)</p>
              <p className="mt-1">Le formulaire n’est plus mélangé à la liste.</p>
            </div>
          </SidebarCard>
        }
      >
        <div className="space-y-4">
          {isLoading ? (
            <Card><CardContent className="py-10 text-center text-gray-500">Chargement des articles…</CardContent></Card>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="Aucun article trouvé"
              description="Ajustez les filtres ou créez un nouvel article."
              action={
                <Button className="bg-[#18361f] hover:bg-[#112718]" onClick={() => navigate("/admin/articles/new")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Créer un article
                </Button>
              }
            />
          ) : (
            filtered.map((article: any) => (
              <Card key={article.id} className="overflow-hidden border-[#dde6dc] shadow-sm">
                <CardContent className="p-0">
                  <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge tone={article.published ? "success" : "warning"}>{article.published ? "Publié" : "Brouillon"}</StatusBadge>
                        <Badge variant="outline" className="rounded-full px-2.5 py-1 text-xs">{article.category}</Badge>
                      </div>
                      <button type="button" onClick={() => navigate(`/admin/articles/${article.id}/edit`)} className="mt-3 text-left text-xl font-black text-[#18361f] hover:text-[#2f5a35]">
                        {article.title}
                      </button>
                      <p className="mt-2 text-sm text-gray-500">/{article.slug}</p>
                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">{article.excerpt || article.content}</p>
                    </div>
                    <div className="flex w-full flex-col gap-4 lg:w-[310px]">
                      <div className="grid grid-cols-2 gap-3">
                        <MetaCard label="Auteur" value={article.author || "Équipe AMANCE"} />
                        <MetaCard label="Date" value={formatDate(article.publishedAt || article.createdAt)} />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" onClick={() => navigate(`/admin/articles/${article.id}/edit`)}>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Éditer
                        </Button>
                        <Button variant="outline" onClick={() => togglePublished(article)}>{article.published ? "Dépublier" : "Publier"}</Button>
                        <Button variant="outline" asChild>
                          <a href={`/actualites/${article.slug}`} target="_blank" rel="noreferrer">
                            <Eye className="mr-2 h-4 w-4" />
                            Voir
                          </a>
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(article.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ContentGrid>
    </AdminShell>
  );
}

function ArticleEditor({
  id,
  navigate,
  setMessage,
}: {
  id: number | null;
  navigate: (path: string) => void;
  setMessage: (message: string) => void;
}) {
  const isEditing = typeof id === "number";
  const utils = trpc.useUtils();
  const { data: articles = [] } = trpc.articles.adminList.useQuery();
  const createMutation = trpc.articles.create.useMutation();
  const updateMutation = trpc.articles.update.useMutation();
  const current = useMemo(() => (isEditing ? articles.find((item: any) => item.id === id) || null : null), [articles, id, isEditing]);

  const [form, setForm] = useState({
    title: "",
    titleEn: "",
    slug: "",
    excerpt: "",
    excerptEn: "",
    content: "",
    contentEn: "",
    coverImage: "",
    category: "actualites" as "actualites" | "terrain" | "communique" | "rapport",
    author: "",
    published: false,
  });

  useEffect(() => {
    if (!current) return;
    setForm({
      title: current.title,
      titleEn: current.titleEn || "",
      slug: current.slug,
      excerpt: current.excerpt || "",
      excerptEn: current.excerptEn || "",
      content: current.content || "",
      contentEn: current.contentEn || "",
      coverImage: current.coverImage || "",
      category: current.category,
      author: current.author || "",
      published: current.published,
    });
  }, [current]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isEditing && current) {
        await updateMutation.mutateAsync({ id: current.id, ...form });
        setMessage("Article mis à jour.");
      } else {
        await createMutation.mutateAsync({
          title: form.title,
          titleEn: form.titleEn,
          slug: form.slug,
          excerpt: form.excerpt,
          excerptEn: form.excerptEn,
          content: form.content,
          contentEn: form.contentEn,
          coverImage: form.coverImage,
          category: form.category,
          author: form.author,
        });
        setMessage("Brouillon créé.");
        navigate("/admin/articles");
      }
      await utils.articles.adminList.invalidate();
      await utils.articles.list.invalidate();
    } catch {
      setMessage("Impossible d’enregistrer l’article.");
    }
  };

  return (
    <AdminShell
      title={isEditing ? "Édition d’article" : "Créer un article"}
      subtitle={isEditing ? "Fiche dédiée à un seul contenu." : "Création dans une page séparée de la liste."}
      primaryAction={
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="h-12 rounded-xl" onClick={() => navigate("/admin/articles")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </Button>
          {current?.slug && (
            <Button variant="outline" className="h-12 rounded-xl" asChild>
              <a href={`/actualites/${current.slug}`} target="_blank" rel="noreferrer">
                <Eye className="mr-2 h-4 w-4" />
                Voir la page
              </a>
            </Button>
          )}
        </div>
      }
    >
      <ContentGrid
        sidebar={
          <div className="space-y-4">
            <SidebarCard title="Résumé de la fiche">
              <MetaCard label="Statut" value={form.published ? "Publié" : "Brouillon"} />
              <MetaCard label="Slug" value={form.slug || "Non défini"} />
              <MetaCard label="Catégorie" value={form.category} />
            </SidebarCard>
            {form.coverImage && (
              <Card className="overflow-hidden border-[#dde6dc] shadow-sm">
                <CardHeader><CardTitle className="text-lg text-[#18361f]">Aperçu visuel</CardTitle></CardHeader>
                <CardContent><img src={form.coverImage} alt="Aperçu article" className="h-48 w-full rounded-2xl object-cover" /></CardContent>
              </Card>
            )}
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-[#dde6dc] shadow-sm">
            <CardHeader><CardTitle className="text-xl text-[#18361f]">Informations générales</CardTitle></CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div><FieldLabel>Titre (FR)</FieldLabel><Input value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} required className="h-12" /></div>
              <div><FieldLabel>Titre (EN)</FieldLabel><Input value={form.titleEn} onChange={e => setForm(prev => ({ ...prev, titleEn: e.target.value }))} className="h-12" /></div>
              <div><FieldLabel>Slug</FieldLabel><Input value={form.slug} onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))} required className="h-12" /></div>
              <div><FieldLabel>Auteur</FieldLabel><Input value={form.author} onChange={e => setForm(prev => ({ ...prev, author: e.target.value }))} className="h-12" placeholder="Équipe AMANCE" /></div>
              <div>
                <FieldLabel>Catégorie</FieldLabel>
                <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value as typeof prev.category }))} className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none">
                  <option value="actualites">Actualités</option>
                  <option value="terrain">Terrain</option>
                  <option value="communique">Communiqué</option>
                  <option value="rapport">Rapport</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex h-12 w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700">
                  <input type="checkbox" checked={form.published} onChange={e => setForm(prev => ({ ...prev, published: e.target.checked }))} className="h-4 w-4 rounded border-gray-300" disabled={!isEditing} />
                  Publier cet article
                  {!isEditing && <span className="ml-auto text-xs text-gray-400">Après création</span>}
                </label>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#dde6dc] shadow-sm">
            <CardHeader><CardTitle className="text-xl text-[#18361f]">Image & résumés</CardTitle></CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2"><FieldLabel>Image de couverture</FieldLabel><Input value={form.coverImage} onChange={e => setForm(prev => ({ ...prev, coverImage: e.target.value }))} className="h-12" placeholder="https://..." /></div>
              <div><FieldLabel>Résumé (FR)</FieldLabel><TextArea value={form.excerpt} onChange={e => setForm(prev => ({ ...prev, excerpt: e.target.value }))} /></div>
              <div><FieldLabel>Résumé (EN)</FieldLabel><TextArea value={form.excerptEn} onChange={e => setForm(prev => ({ ...prev, excerptEn: e.target.value }))} /></div>
            </CardContent>
          </Card>

          <Card className="border-[#dde6dc] shadow-sm">
            <CardHeader><CardTitle className="text-xl text-[#18361f]">Contenu</CardTitle></CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div><FieldLabel>Contenu (FR)</FieldLabel><TextArea value={form.content} onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))} className="min-h-[420px]" required /></div>
              <div><FieldLabel>Contenu (EN)</FieldLabel><TextArea value={form.contentEn} onChange={e => setForm(prev => ({ ...prev, contentEn: e.target.value }))} className="min-h-[420px]" /></div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" className="h-12 rounded-xl bg-[#18361f] px-6 text-white hover:bg-[#112718]" disabled={createMutation.isPending || updateMutation.isPending}>
              {createMutation.isPending || updateMutation.isPending ? "Enregistrement..." : isEditing ? "Enregistrer les modifications" : "Créer le brouillon"}
            </Button>
            <Button type="button" variant="outline" className="h-12 rounded-xl" onClick={() => navigate("/admin/articles")}>Annuler</Button>
          </div>
        </form>
      </ContentGrid>
    </AdminShell>
  );
}
