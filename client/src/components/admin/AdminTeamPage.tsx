import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, Edit2, Plus, Trash2 } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { formatDate } from "@/lib/utils";

export function AdminTeamPage({
  route,
  navigate,
  setMessage,
}: {
  route: ParsedAdminLocation;
  navigate: (path: string) => void;
  setMessage: (message: string) => void;
}) {
  if (route.mode === "list") {
    return <TeamList navigate={navigate} setMessage={setMessage} />;
  }

  return <TeamEditor id={route.mode === "edit" ? route.id : null} navigate={navigate} setMessage={setMessage} />;
}

function TeamList({ navigate, setMessage }: { navigate: (path: string) => void; setMessage: (message: string) => void }) {
  const utils = trpc.useUtils();
  const { data: members = [], isLoading } = trpc.team.adminList.useQuery();
  const deleteMutation = trpc.team.delete.useMutation();
  const reorderMutation = trpc.team.reorder.useMutation();
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => members.filter((member: any) => {
      const q = search.toLowerCase();
      return member.name.toLowerCase().includes(q) || member.role.toLowerCase().includes(q);
    }),
    [members, search],
  );

  const moveMember = async (id: number, direction: "up" | "down") => {
    const currentIndex = members.findIndex((member: any) => member.id === id);
    if (currentIndex === -1) return;
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= members.length) return;

    const reordered = [...members];
    const [moved] = reordered.splice(currentIndex, 1);
    reordered.splice(targetIndex, 0, moved);

    try {
      await reorderMutation.mutateAsync({ orderedIds: reordered.map((item: any) => item.id) });
      await utils.team.adminList.invalidate();
      await utils.team.list.invalidate();
      setMessage("Ordre de l’équipe mis à jour.");
    } catch {
      setMessage("Impossible de modifier l’ordre.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer ce membre ?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      await utils.team.adminList.invalidate();
      await utils.team.list.invalidate();
      setMessage("Membre supprimé.");
    } catch {
      setMessage("Impossible de supprimer le membre.");
    }
  };

  return (
    <AdminShell
      title="Équipe"
      subtitle="La gestion de l’équipe est maintenant séparée entre une liste claire et une fiche d’édition par membre."
      primaryAction={
        <Button className="h-12 rounded-xl bg-[#18361f] px-5 text-white hover:bg-[#112718]" onClick={() => navigate("/admin/equipe/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un membre
        </Button>
      }
    >
      <ContentGrid
        sidebar={
          <SidebarCard title="Recherche" description="Filtrez par nom ou rôle.">
            <FilterInput value={search} onChange={setSearch} placeholder="Nom ou rôle" />
            <div className="rounded-2xl bg-[#f5f8f4] p-4 text-sm text-gray-600">
              <p className="font-semibold text-[#18361f]">{members.length} membre(s)</p>
              <p className="mt-1">Les flèches changent l’ordre d’affichage public.</p>
            </div>
          </SidebarCard>
        }
      >
        <div className="space-y-4">
          {isLoading ? (
            <Card><CardContent className="py-10 text-center text-gray-500">Chargement de l’équipe…</CardContent></Card>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="Aucun membre trouvé"
              description="Ajoutez un membre ou ajustez votre recherche."
              action={
                <Button className="bg-[#18361f] hover:bg-[#112718]" onClick={() => navigate("/admin/equipe/new")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un membre
                </Button>
              }
            />
          ) : (
            filtered.map((member: any) => {
              const index = members.findIndex((item: any) => item.id === member.id);
              return (
                <Card key={member.id} className="border-[#dde6dc] shadow-sm">
                  <CardContent className="flex flex-col gap-5 p-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex min-w-0 gap-4">
                      <img src={member.image || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&q=80"} alt={member.name} className="h-16 w-16 rounded-2xl object-cover" />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-black text-[#18361f]">{member.name}</h3>
                          <StatusBadge tone={member.active ? "success" : "neutral"}>{member.active ? "Actif" : "Inactif"}</StatusBadge>
                        </div>
                        <p className="mt-1 text-sm font-semibold text-gray-600">{member.role}</p>
                        <p className="mt-1 text-sm text-gray-500">{member.location || "Localisation non renseignée"}</p>
                        {member.bio && <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">{member.bio}</p>}
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-4 lg:w-[320px]">
                      <div className="grid grid-cols-2 gap-3">
                        <MetaCard label="Ordre" value={`#${index + 1}`} />
                        <MetaCard label="Mise à jour" value={formatDate(member.updatedAt || member.createdAt)} />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" onClick={() => moveMember(member.id, "up")} disabled={index === 0 || reorderMutation.isPending}><ArrowUp className="mr-2 h-4 w-4" />Monter</Button>
                        <Button variant="outline" onClick={() => moveMember(member.id, "down")} disabled={index === members.length - 1 || reorderMutation.isPending}><ArrowDown className="mr-2 h-4 w-4" />Descendre</Button>
                        <Button variant="outline" onClick={() => navigate(`/admin/equipe/${member.id}/edit`)}><Edit2 className="mr-2 h-4 w-4" />Éditer</Button>
                        <Button variant="destructive" onClick={() => handleDelete(member.id)}><Trash2 className="mr-2 h-4 w-4" />Supprimer</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </ContentGrid>
    </AdminShell>
  );
}

function TeamEditor({
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
  const { data: members = [] } = trpc.team.adminList.useQuery();
  const createMutation = trpc.team.create.useMutation();
  const updateMutation = trpc.team.update.useMutation();
  const current = useMemo(() => (isEditing ? members.find((item: any) => item.id === id) || null : null), [members, id, isEditing]);

  const [form, setForm] = useState({
    name: "",
    role: "",
    title: "",
    location: "",
    image: "",
    bio: "",
    active: true,
  });

  useEffect(() => {
    if (!current) return;
    setForm({
      name: current.name,
      role: current.role,
      title: current.title || "",
      location: current.location || "",
      image: current.image || "",
      bio: current.bio || "",
      active: current.active,
    });
  }, [current]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isEditing && current) {
        await updateMutation.mutateAsync({ id: current.id, ...form });
        setMessage("Membre mis à jour.");
      } else {
        await createMutation.mutateAsync(form);
        setMessage("Membre ajouté.");
        navigate("/admin/equipe");
      }
      await utils.team.adminList.invalidate();
      await utils.team.list.invalidate();
    } catch {
      setMessage("Impossible d’enregistrer le membre.");
    }
  };

  return (
    <AdminShell
      title={isEditing ? "Édition d’un membre" : "Ajouter un membre"}
      subtitle="Chaque membre dispose désormais d’une fiche d’édition indépendante."
      primaryAction={
        <Button variant="outline" className="h-12 rounded-xl" onClick={() => navigate("/admin/equipe")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la liste
        </Button>
      }
    >
      <ContentGrid
        sidebar={
          <div className="space-y-4">
            <SidebarCard title="Résumé">
              <MetaCard label="Rôle" value={form.role || "Non renseigné"} />
              <MetaCard label="Localisation" value={form.location || "Non renseignée"} />
              <MetaCard label="Actif" value={form.active ? "Oui" : "Non"} />
            </SidebarCard>
            {form.image && (
              <Card className="overflow-hidden border-[#dde6dc] shadow-sm">
                <CardHeader><CardTitle className="text-lg text-[#18361f]">Photo</CardTitle></CardHeader>
                <CardContent><img src={form.image} alt={form.name || "Photo"} className="h-56 w-full rounded-2xl object-cover" /></CardContent>
              </Card>
            )}
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-[#dde6dc] shadow-sm">
            <CardHeader><CardTitle className="text-xl text-[#18361f]">Profil</CardTitle></CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div><FieldLabel>Nom</FieldLabel><Input value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} required className="h-12" /></div>
              <div><FieldLabel>Rôle</FieldLabel><Input value={form.role} onChange={e => setForm(prev => ({ ...prev, role: e.target.value }))} required className="h-12" /></div>
              <div><FieldLabel>Titre</FieldLabel><Input value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} className="h-12" /></div>
              <div><FieldLabel>Localisation</FieldLabel><Input value={form.location} onChange={e => setForm(prev => ({ ...prev, location: e.target.value }))} className="h-12" /></div>
              <div className="md:col-span-2"><FieldLabel>Photo</FieldLabel><Input value={form.image} onChange={e => setForm(prev => ({ ...prev, image: e.target.value }))} className="h-12" placeholder="https://..." /></div>
              <div className="md:col-span-2"><FieldLabel>Bio</FieldLabel><TextArea value={form.bio} onChange={e => setForm(prev => ({ ...prev, bio: e.target.value }))} className="min-h-[220px]" /></div>
              <div className="md:col-span-2">
                <label className="flex h-12 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700">
                  <input type="checkbox" checked={form.active} onChange={e => setForm(prev => ({ ...prev, active: e.target.checked }))} className="h-4 w-4 rounded border-gray-300" />
                  Membre actif sur la page publique
                </label>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" className="h-12 rounded-xl bg-[#18361f] px-6 text-white hover:bg-[#112718]" disabled={createMutation.isPending || updateMutation.isPending}>
              {createMutation.isPending || updateMutation.isPending ? "Enregistrement..." : isEditing ? "Enregistrer les modifications" : "Ajouter le membre"}
            </Button>
            <Button type="button" variant="outline" className="h-12 rounded-xl" onClick={() => navigate("/admin/equipe")}>Annuler</Button>
          </div>
        </form>
      </ContentGrid>
    </AdminShell>
  );
}
