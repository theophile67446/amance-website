import { useMemo, useState } from "react";
import { ArrowLeft, Eye } from "lucide-react";

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
} from "@/components/admin/AdminScaffold";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { formatDate } from "@/lib/utils";

export function AdminContactsPage({
  route,
  navigate,
  setMessage,
}: {
  route: ParsedAdminLocation;
  navigate: (path: string) => void;
  setMessage: (message: string) => void;
}) {
  return route.mode === "view"
    ? <ContactDetail id={route.id} navigate={navigate} setMessage={setMessage} />
    : <ContactsList navigate={navigate} setMessage={setMessage} />;
}

export function AdminRegistrationsPage({
  route,
  navigate,
  setMessage,
}: {
  route: ParsedAdminLocation;
  navigate: (path: string) => void;
  setMessage: (message: string) => void;
}) {
  return route.mode === "view"
    ? <RegistrationDetail id={route.id} navigate={navigate} setMessage={setMessage} />
    : <RegistrationsList navigate={navigate} setMessage={setMessage} />;
}

function ContactsList({ navigate, setMessage }: { navigate: (path: string) => void; setMessage: (message: string) => void }) {
  const utils = trpc.useUtils();
  const { data: contacts = [], isLoading } = trpc.contact.adminList.useQuery();
  const updateStatus = trpc.contact.updateStatus.useMutation();
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => contacts.filter((contact: any) => {
      const q = search.toLowerCase();
      return (`${contact.firstName || ""} ${contact.lastName || ""}`.toLowerCase().includes(q)
        || (contact.email || "").toLowerCase().includes(q)
        || (contact.subject || "").toLowerCase().includes(q));
    }),
    [contacts, search],
  );

  const changeStatus = async (id: number, status: "nouveau" | "lu" | "traite") => {
    try {
      await updateStatus.mutateAsync({ id, status });
      await utils.contact.adminList.invalidate();
      setMessage("Statut du message mis à jour.");
    } catch {
      setMessage("Impossible de changer le statut.");
    }
  };

  return (
    <AdminShell title="Messages" subtitle="La liste des messages et la lecture détaillée sont maintenant séparées.">
      <ContentGrid
        sidebar={
          <SidebarCard title="Recherche" description="Filtrez puis ouvrez une fiche dédiée.">
            <FilterInput value={search} onChange={setSearch} placeholder="Nom, email ou sujet" />
            <div className="rounded-2xl bg-[#f5f8f4] p-4 text-sm text-gray-600">
              <p className="font-semibold text-[#18361f]">{contacts.filter((item: any) => item.status === "nouveau").length} nouveau(x)</p>
            </div>
          </SidebarCard>
        }
      >
        <div className="space-y-4">
          {isLoading ? (
            <Card><CardContent className="py-10 text-center text-gray-500">Chargement des messages…</CardContent></Card>
          ) : filtered.length === 0 ? (
            <EmptyState title="Aucun message" description="Aucun message ne correspond à la recherche actuelle." />
          ) : (
            filtered.map((contact: any) => (
              <Card key={contact.id} className="border-[#dde6dc] shadow-sm">
                <CardContent className="flex flex-col gap-5 p-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <StatusBadge tone={contact.status === "nouveau" ? "info" : contact.status === "traite" ? "success" : "neutral"}>{contact.status}</StatusBadge>
                    <button type="button" onClick={() => navigate(`/admin/contacts/${contact.id}`)} className="mt-3 text-left text-xl font-black text-[#18361f] hover:text-[#2f5a35]">
                      {contact.subject}
                    </button>
                    <p className="mt-2 text-sm text-gray-500">{contact.firstName} {contact.lastName} · {contact.email}</p>
                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">{contact.message}</p>
                  </div>
                  <div className="flex w-full flex-col gap-4 lg:w-[320px]">
                    <div className="grid grid-cols-2 gap-3">
                      <MetaCard label="Date" value={formatDate(contact.createdAt)} />
                      <MetaCard label="Téléphone" value={contact.phone || "-"} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <select value={contact.status} onChange={e => changeStatus(contact.id, e.target.value as "nouveau" | "lu" | "traite")} className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none">
                        <option value="nouveau">Nouveau</option>
                        <option value="lu">Lu</option>
                        <option value="traite">Traité</option>
                      </select>
                      <Button variant="outline" onClick={() => navigate(`/admin/contacts/${contact.id}`)}><Eye className="mr-2 h-4 w-4" />Ouvrir</Button>
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

function ContactDetail({
  id,
  navigate,
  setMessage,
}: {
  id: number | null;
  navigate: (path: string) => void;
  setMessage: (message: string) => void;
}) {
  const utils = trpc.useUtils();
  const { data: contacts = [] } = trpc.contact.adminList.useQuery();
  const updateStatus = trpc.contact.updateStatus.useMutation();
  const contact = useMemo(() => (typeof id === "number" ? contacts.find((item: any) => item.id === id) || null : null), [contacts, id]);

  const changeStatus = async (status: "nouveau" | "lu" | "traite") => {
    if (!contact) return;
    try {
      await updateStatus.mutateAsync({ id: contact.id, status });
      await utils.contact.adminList.invalidate();
      setMessage("Statut du message mis à jour.");
    } catch {
      setMessage("Impossible de changer le statut.");
    }
  };

  return (
    <AdminShell
      title="Lecture du message"
      subtitle="Vue dédiée pour consulter le message sans garder la liste affichée."
      primaryAction={<Button variant="outline" className="h-12 rounded-xl" onClick={() => navigate("/admin/contacts")}><ArrowLeft className="mr-2 h-4 w-4" />Retour aux messages</Button>}
    >
      {!contact ? (
        <EmptyState title="Message introuvable" description="Ce message n’existe pas ou n’est plus disponible." />
      ) : (
        <ContentGrid
          sidebar={
            <SidebarCard title="Métadonnées">
              <MetaCard label="Expéditeur" value={`${contact.firstName} ${contact.lastName}`} />
              <MetaCard label="Email" value={contact.email} />
              <MetaCard label="Téléphone" value={contact.phone || "-"} />
              <MetaCard label="Date" value={formatDate(contact.createdAt)} />
              <div>
                <FieldLabel>Statut</FieldLabel>
                <select value={contact.status} onChange={e => changeStatus(e.target.value as "nouveau" | "lu" | "traite")} className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none">
                  <option value="nouveau">Nouveau</option>
                  <option value="lu">Lu</option>
                  <option value="traite">Traité</option>
                </select>
              </div>
            </SidebarCard>
          }
        >
          <Card className="border-[#dde6dc] shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-[#18361f]">{contact.subject}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap rounded-3xl bg-[#f7faf6] p-6 text-sm leading-7 text-gray-700">{contact.message}</div>
            </CardContent>
          </Card>
        </ContentGrid>
      )}
    </AdminShell>
  );
}

function RegistrationsList({ navigate, setMessage }: { navigate: (path: string) => void; setMessage: (message: string) => void }) {
  const utils = trpc.useUtils();
  const { data: registrations = [], isLoading } = trpc.registration.adminList.useQuery();
  const updateStatus = trpc.registration.updateStatus.useMutation();
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => registrations.filter((registration: any) => {
      const q = search.toLowerCase();
      return (`${registration.firstName || ""} ${registration.lastName || ""}`.toLowerCase().includes(q)
        || (registration.email || "").toLowerCase().includes(q)
        || (registration.organization || "").toLowerCase().includes(q));
    }),
    [registrations, search],
  );

  const changeStatus = async (id: number, status: "nouveau" | "contacte" | "actif" | "inactif") => {
    try {
      await updateStatus.mutateAsync({ id, status });
      await utils.registration.adminList.invalidate();
      setMessage("Statut de l’inscription mis à jour.");
    } catch {
      setMessage("Impossible de changer le statut.");
    }
  };

  return (
    <AdminShell title="Bénévoles & Partenaires" subtitle="La liste des inscriptions est maintenant distincte de la vue détail.">
      <ContentGrid
        sidebar={
          <SidebarCard title="Recherche" description="Nom, email ou organisation.">
            <FilterInput value={search} onChange={setSearch} placeholder="Nom, email ou organisation" />
            <div className="rounded-2xl bg-[#f5f8f4] p-4 text-sm text-gray-600">
              <p className="font-semibold text-[#18361f]">{registrations.filter((item: any) => item.status === "nouveau").length} nouvelle(s)</p>
            </div>
          </SidebarCard>
        }
      >
        <div className="space-y-4">
          {isLoading ? (
            <Card><CardContent className="py-10 text-center text-gray-500">Chargement des inscriptions…</CardContent></Card>
          ) : filtered.length === 0 ? (
            <EmptyState title="Aucune inscription" description="Aucune inscription ne correspond à la recherche actuelle." />
          ) : (
            filtered.map((registration: any) => (
              <Card key={registration.id} className="border-[#dde6dc] shadow-sm">
                <CardContent className="flex flex-col gap-5 p-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge tone={registration.type === "benevole" ? "warning" : "info"}>{registration.type}</StatusBadge>
                      <StatusBadge tone={registration.status === "actif" ? "success" : registration.status === "nouveau" ? "info" : "neutral"}>{registration.status}</StatusBadge>
                    </div>
                    <button type="button" onClick={() => navigate(`/admin/registrations/${registration.id}`)} className="mt-3 text-left text-xl font-black text-[#18361f] hover:text-[#2f5a35]">
                      {registration.firstName} {registration.lastName}
                    </button>
                    <p className="mt-2 text-sm text-gray-500">{registration.email} {registration.organization ? `· ${registration.organization}` : ""}</p>
                    {(registration.motivation || registration.skills) && <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">{registration.motivation || registration.skills}</p>}
                  </div>
                  <div className="flex w-full flex-col gap-4 lg:w-[320px]">
                    <div className="grid grid-cols-2 gap-3">
                      <MetaCard label="Ville" value={registration.city || "-"} />
                      <MetaCard label="Date" value={formatDate(registration.createdAt)} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <select value={registration.status} onChange={e => changeStatus(registration.id, e.target.value as "nouveau" | "contacte" | "actif" | "inactif")} className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none">
                        <option value="nouveau">Nouveau</option>
                        <option value="contacte">Contacté</option>
                        <option value="actif">Actif</option>
                        <option value="inactif">Inactif</option>
                      </select>
                      <Button variant="outline" onClick={() => navigate(`/admin/registrations/${registration.id}`)}><Eye className="mr-2 h-4 w-4" />Ouvrir</Button>
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

function RegistrationDetail({
  id,
  navigate,
  setMessage,
}: {
  id: number | null;
  navigate: (path: string) => void;
  setMessage: (message: string) => void;
}) {
  const utils = trpc.useUtils();
  const { data: registrations = [] } = trpc.registration.adminList.useQuery();
  const updateStatus = trpc.registration.updateStatus.useMutation();
  const registration = useMemo(() => (typeof id === "number" ? registrations.find((item: any) => item.id === id) || null : null), [registrations, id]);

  const changeStatus = async (status: "nouveau" | "contacte" | "actif" | "inactif") => {
    if (!registration) return;
    try {
      await updateStatus.mutateAsync({ id: registration.id, status });
      await utils.registration.adminList.invalidate();
      setMessage("Statut de l’inscription mis à jour.");
    } catch {
      setMessage("Impossible de changer le statut.");
    }
  };

  return (
    <AdminShell
      title="Détail de l’inscription"
      subtitle="Consultation dédiée, séparée de la liste des candidatures."
      primaryAction={<Button variant="outline" className="h-12 rounded-xl" onClick={() => navigate("/admin/registrations")}><ArrowLeft className="mr-2 h-4 w-4" />Retour aux inscriptions</Button>}
    >
      {!registration ? (
        <EmptyState title="Inscription introuvable" description="Cette inscription n’existe pas ou n’est plus disponible." />
      ) : (
        <ContentGrid
          sidebar={
            <SidebarCard title="Métadonnées">
              <MetaCard label="Type" value={registration.type} />
              <MetaCard label="Email" value={registration.email} />
              <MetaCard label="Téléphone" value={registration.phone || "-"} />
              <MetaCard label="Organisation" value={registration.organization || "-"} />
              <MetaCard label="Lieu" value={`${registration.city || "-"}, ${registration.country || "-"}`} />
              <MetaCard label="Date" value={formatDate(registration.createdAt)} />
              <div>
                <FieldLabel>Statut</FieldLabel>
                <select value={registration.status} onChange={e => changeStatus(e.target.value as "nouveau" | "contacte" | "actif" | "inactif")} className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none">
                  <option value="nouveau">Nouveau</option>
                  <option value="contacte">Contacté</option>
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                </select>
              </div>
            </SidebarCard>
          }
        >
          <div className="space-y-6">
            <Card className="border-[#dde6dc] shadow-sm">
              <CardHeader><CardTitle className="text-2xl text-[#18361f]">{registration.firstName} {registration.lastName}</CardTitle></CardHeader>
            </Card>
            <Card className="border-[#dde6dc] shadow-sm">
              <CardHeader><CardTitle className="text-lg text-[#18361f]">Motivation</CardTitle></CardHeader>
              <CardContent><div className="rounded-3xl bg-[#f7faf6] p-6 text-sm leading-7 text-gray-700">{registration.motivation || "Non renseignée"}</div></CardContent>
            </Card>
            <Card className="border-[#dde6dc] shadow-sm">
              <CardHeader><CardTitle className="text-lg text-[#18361f]">Compétences</CardTitle></CardHeader>
              <CardContent><div className="rounded-3xl bg-[#f7faf6] p-6 text-sm leading-7 text-gray-700">{registration.skills || "Non renseignées"}</div></CardContent>
            </Card>
          </div>
        </ContentGrid>
      )}
    </AdminShell>
  );
}
