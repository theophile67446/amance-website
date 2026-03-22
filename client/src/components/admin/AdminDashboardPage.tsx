import { Briefcase, FileText, Mail, UserCheck, Users } from "lucide-react";

import { AdminShell } from "@/components/admin/AdminScaffold";
import { trpc } from "@/lib/trpc";

export function AdminDashboardPage({ navigate }: { navigate: (path: string) => void }) {
  const { data: articles = [] } = trpc.articles.adminList.useQuery();
  const { data: projects = [] } = trpc.projects.adminList.useQuery();
  const { data: contacts = [] } = trpc.contact.adminList.useQuery();
  const { data: registrations = [] } = trpc.registration.adminList.useQuery();
  const { data: teamMembers = [] } = trpc.team.adminList.useQuery();

  const cards = [
    {
      label: "Articles",
      count: articles.length,
      note: `${articles.filter((item: any) => item.published).length} publiés`,
      icon: FileText,
      path: "/admin/articles",
      tone: "bg-amber-50 text-amber-700",
    },
    {
      label: "Projets",
      count: projects.length,
      note: `${projects.filter((item: any) => item.featured).length} mis en avant`,
      icon: Briefcase,
      path: "/admin/projets",
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Messages",
      count: contacts.length,
      note: `${contacts.filter((item: any) => item.status === "nouveau").length} nouveaux`,
      icon: Mail,
      path: "/admin/contacts",
      tone: "bg-blue-50 text-blue-700",
    },
    {
      label: "Inscriptions",
      count: registrations.length,
      note: `${registrations.filter((item: any) => item.status === "nouveau").length} nouvelles`,
      icon: Users,
      path: "/admin/registrations",
      tone: "bg-violet-50 text-violet-700",
    },
    {
      label: "Équipe",
      count: teamMembers.length,
      note: `${teamMembers.filter((item: any) => item.active).length} actifs`,
      icon: UserCheck,
      path: "/admin/equipe",
      tone: "bg-teal-50 text-teal-700",
    },
  ];

  return (
    <AdminShell
      title="Tableau de bord"
      subtitle="La navigation admin a été restructurée en vraies pages: une liste dédiée par module, puis une page distincte pour chaque édition ou consultation."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map(card => (
          <button
            key={card.label}
            type="button"
            onClick={() => navigate(card.path)}
            className="rounded-[28px] border border-[#dde6dc] bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{card.label}</p>
                <p className="mt-3 text-3xl font-black text-[#18361f]">{card.count}</p>
              </div>
              <div className={`rounded-2xl p-3 ${card.tone}`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-5 text-sm font-semibold text-gray-500">{card.note}</p>
          </button>
        ))}
      </div>
    </AdminShell>
  );
}
