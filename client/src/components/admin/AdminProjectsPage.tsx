import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Edit2, Eye, MapPin, Plus, Trash2 } from "lucide-react";

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

export function AdminProjectsPage({
  route,
  navigate,
  setMessage,
}: {
  route: ParsedAdminLocation;
  navigate: (path: string) => void;
  setMessage: (message: string) => void;
}) {
  if (route.mode === "list") {
    return <ProjectsList navigate={navigate} setMessage={setMessage} />;
  }

  return <ProjectEditor id={route.mode === "edit" ? route.id : null} navigate={navigate} setMessage={setMessage} />;
}

function ProjectsList({ navigate, setMessage }: { navigate: (path: string) => void; setMessage: (message: string) => void }) {
  const utils = trpc.useUtils();
  const { data: projects = [], isLoading } = trpc.projects.adminList.useQuery();
  const updateMutation = trpc.projects.update.useMutation();
  const deleteMutation = trpc.projects.delete.useMutation();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "en_cours" | "termine" | "planifie">("all");

  const filtered = useMemo(
    () => projects.filter((project: any) => {
      const q = search.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(q)
        || (project.slug || "").toLowerCase().includes(q)
        || (project.location || "").toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    }),
    [projects, search, statusFilter],
  );

  const toggleFeatured = async (project: any) => {
    try {
      await updateMutation.mutateAsync({ id: project.id, featured: !project.featured });
      await utils.projects.adminList.invalidate();
      await utils.projects.list.invalidate();
      setMessage(project.featured ? "Projet retiré de la mise en avant." : "Projet mis en avant.");
    } catch {
      setMessage("Impossible de modifier la mise en avant.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer ce projet ?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      await utils.projects.adminList.invalidate();
      await utils.projects.list.invalidate();
      setMessage("Projet supprimé.");
    } catch {
      setMessage("Impossible de supprimer le projet.");
    }
  };

  return (
    <AdminShell
      title="Projets & Missions"
      subtitle="La liste et l’édition sont maintenant séparées. Chaque projet a sa page d’édition indépendante."
      primaryAction={
        <Button className="h-12 rounded-xl bg-[#18361f] px-5 text-white hover:bg-[#112718]" onClick={() => navigate("/admin/projets/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau projet
        </Button>
      }
    >
      <ContentGrid
        sidebar={
          <SidebarCard title="Filtrer" description="Recherchez un projet à ouvrir.">
            <FilterInput value={search} onChange={setSearch} placeholder="Titre, slug ou lieu" />
            <div className="grid gap-2">
              {[
                { value: "all", label: "Tous" },
                { value: "en_cours", label: "En cours" },
                { value: "termine", label: "Terminés" },
                { value: "planifie", label: "Planifiés" },
              ].map(option => (
                <Button
                  key={option.value}
                  type="button"
                  variant={statusFilter === option.value ? "default" : "outline"}
                  className={statusFilter === option.value ? "justify-start bg-[#18361f] hover:bg-[#112718]" : "justify-start"}
                  onClick={() => setStatusFilter(option.value as typeof statusFilter)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </SidebarCard>
        }
      >
        <div className="space-y-4">
          {isLoading ? (
            <Card><CardContent className="py-10 text-center text-gray-500">Chargement des projets…</CardContent></Card>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="Aucun projet trouvé"
              description="Ajustez les filtres ou créez un nouveau projet."
              action={
                <Button className="bg-[#18361f] hover:bg-[#112718]" onClick={() => navigate("/admin/projets/new")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Créer un projet
                </Button>
              }
            />
          ) : (
            filtered.map((project: any) => (
              <Card key={project.id} className="overflow-hidden border-[#dde6dc] shadow-sm">
                <CardContent className="p-0">
                  <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge tone={project.status === "en_cours" ? "success" : project.status === "planifie" ? "warning" : "neutral"}>
                          {project.status.replace("_", " ")}
                        </StatusBadge>
                        {project.featured && <StatusBadge tone="info">Mis en avant</StatusBadge>}
                        <Badge variant="outline" className="rounded-full px-2.5 py-1 text-xs">{project.category}</Badge>
                      </div>
                      <button type="button" onClick={() => navigate(`/admin/projets/${project.id}/edit`)} className="mt-3 text-left text-xl font-black text-[#18361f] hover:text-[#2f5a35]">
                        {project.title}
                      </button>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {project.location || "Lieu non défini"}</span>
                        <span>/{project.slug}</span>
                      </div>
                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">{project.description}</p>
                    </div>
                    <div className="flex w-full flex-col gap-4 lg:w-[320px]">
                      <div className="grid grid-cols-2 gap-3">
                        <MetaCard label="Bénéficiaires" value={project.beneficiaries ?? 0} />
                        <MetaCard label="Création" value={formatDate(project.createdAt)} />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" onClick={() => navigate(`/admin/projets/${project.id}/edit`)}>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Éditer
                        </Button>
                        <Button variant="outline" onClick={() => toggleFeatured(project)}>{project.featured ? "Retirer de la une" : "Mettre en avant"}</Button>
                        <Button variant="outline" asChild>
                          <a href={`/projets/${project.slug}`} target="_blank" rel="noreferrer">
                            <Eye className="mr-2 h-4 w-4" />
                            Voir
                          </a>
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(project.id)}>
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

function ProjectEditor({
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
  const { data: projects = [] } = trpc.projects.adminList.useQuery();
  const createMutation = trpc.projects.create.useMutation();
  const updateMutation = trpc.projects.update.useMutation();
  const current = useMemo(() => (isEditing ? projects.find((item: any) => item.id === id) || null : null), [projects, id, isEditing]);

  const [form, setForm] = useState({
    title: "",
    titleEn: "",
    slug: "",
    description: "",
    descriptionEn: "",
    fullDescription: "",
    fullDescriptionEn: "",
    coverImage: "",
    category: "humanitaire" as "humanitaire" | "sante" | "communautaire" | "conservation",
    location: "",
    status: "en_cours" as "en_cours" | "termine" | "planifie",
    beneficiaries: 0,
    featured: false,
  });

  useEffect(() => {
    if (!current) return;
    setForm({
      title: current.title,
      titleEn: current.titleEn || "",
      slug: current.slug,
      description: current.description || "",
      descriptionEn: current.descriptionEn || "",
      fullDescription: current.fullDescription || "",
      fullDescriptionEn: current.fullDescriptionEn || "",
      coverImage: current.coverImage || "",
      category: current.category,
      location: current.location || "",
      status: current.status || "en_cours",
      beneficiaries: current.beneficiaries || 0,
      featured: current.featured || false,
    });
  }, [current]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isEditing && current) {
        await updateMutation.mutateAsync({ id: current.id, ...form, beneficiaries: Number(form.beneficiaries) });
        setMessage("Projet mis à jour.");
      } else {
        await createMutation.mutateAsync({ ...form, beneficiaries: Number(form.beneficiaries) });
        setMessage("Projet créé.");
        navigate("/admin/projets");
      }
      await utils.projects.adminList.invalidate();
      await utils.projects.list.invalidate();
    } catch {
      setMessage("Impossible d’enregistrer le projet.");
    }
  };

  return (
    <AdminShell
      title={isEditing ? "Édition de projet" : "Créer un projet"}
      subtitle={isEditing ? "Fiche de projet dédiée." : "Création dans un écran séparé de la liste."}
      primaryAction={
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="h-12 rounded-xl" onClick={() => navigate("/admin/projets")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </Button>
          {current?.slug && (
            <Button variant="outline" className="h-12 rounded-xl" asChild>
              <a href={`/projets/${current.slug}`} target="_blank" rel="noreferrer">
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
            <SidebarCard title="Informations rapides">
              <MetaCard label="Statut" value={form.status.replace("_", " ")} />
              <MetaCard label="Catégorie" value={form.category} />
              <MetaCard label="Lieu" value={form.location || "Non défini"} />
              <MetaCard label="Mis en avant" value={form.featured ? "Oui" : "Non"} />
            </SidebarCard>
            {form.coverImage && (
              <Card className="overflow-hidden border-[#dde6dc] shadow-sm">
                <CardHeader><CardTitle className="text-lg text-[#18361f]">Aperçu visuel</CardTitle></CardHeader>
                <CardContent><img src={form.coverImage} alt="Aperçu projet" className="h-48 w-full rounded-2xl object-cover" /></CardContent>
              </Card>
            )}
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-[#dde6dc] shadow-sm">
            <CardHeader><CardTitle className="text-xl text-[#18361f]">Cadre du projet</CardTitle></CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div><FieldLabel>Nom du projet (FR)</FieldLabel><Input value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} required className="h-12" /></div>
              <div><FieldLabel>Nom du projet (EN)</FieldLabel><Input value={form.titleEn} onChange={e => setForm(prev => ({ ...prev, titleEn: e.target.value }))} className="h-12" /></div>
              <div><FieldLabel>Slug</FieldLabel><Input value={form.slug} onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))} required className="h-12" /></div>
              <div><FieldLabel>Localisation</FieldLabel><Input value={form.location} onChange={e => setForm(prev => ({ ...prev, location: e.target.value }))} className="h-12" /></div>
              <div>
                <FieldLabel>Catégorie</FieldLabel>
                <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value as typeof prev.category }))} className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none">
                  <option value="humanitaire">Humanitaire</option>
                  <option value="sante">Santé</option>
                  <option value="communautaire">Communautaire</option>
                  <option value="conservation">Conservation</option>
                </select>
              </div>
              <div>
                <FieldLabel>Statut</FieldLabel>
                <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value as typeof prev.status }))} className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none">
                  <option value="en_cours">En cours</option>
                  <option value="termine">Terminé</option>
                  <option value="planifie">Planifié</option>
                </select>
              </div>
              <div><FieldLabel>Bénéficiaires</FieldLabel><Input type="number" value={form.beneficiaries} onChange={e => setForm(prev => ({ ...prev, beneficiaries: Number(e.target.value) || 0 }))} className="h-12" /></div>
              <div className="flex items-end">
                <label className="flex h-12 w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm(prev => ({ ...prev, featured: e.target.checked }))} className="h-4 w-4 rounded border-gray-300" />
                  Afficher en mise en avant
                </label>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#dde6dc] shadow-sm">
            <CardHeader><CardTitle className="text-xl text-[#18361f]">Image & descriptions</CardTitle></CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2"><FieldLabel>Image de couverture</FieldLabel><Input value={form.coverImage} onChange={e => setForm(prev => ({ ...prev, coverImage: e.target.value }))} className="h-12" placeholder="https://..." /></div>
              <div><FieldLabel>Description courte (FR)</FieldLabel><TextArea value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} required /></div>
              <div><FieldLabel>Description courte (EN)</FieldLabel><TextArea value={form.descriptionEn} onChange={e => setForm(prev => ({ ...prev, descriptionEn: e.target.value }))} /></div>
              <div><FieldLabel>Description complète (FR)</FieldLabel><TextArea value={form.fullDescription} onChange={e => setForm(prev => ({ ...prev, fullDescription: e.target.value }))} className="min-h-[320px]" /></div>
              <div><FieldLabel>Description complète (EN)</FieldLabel><TextArea value={form.fullDescriptionEn} onChange={e => setForm(prev => ({ ...prev, fullDescriptionEn: e.target.value }))} className="min-h-[320px]" /></div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" className="h-12 rounded-xl bg-[#18361f] px-6 text-white hover:bg-[#112718]" disabled={createMutation.isPending || updateMutation.isPending}>
              {createMutation.isPending || updateMutation.isPending ? "Enregistrement..." : isEditing ? "Enregistrer les modifications" : "Créer le projet"}
            </Button>
            <Button type="button" variant="outline" className="h-12 rounded-xl" onClick={() => navigate("/admin/projets")}>Annuler</Button>
          </div>
        </form>
      </ContentGrid>
    </AdminShell>
  );
}
