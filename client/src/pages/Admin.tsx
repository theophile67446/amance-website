import { useEffect, useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import LocalLogin from "@/components/LocalLogin";
import AdminLayout from "@/components/AdminLayout";
import AdminWorkspace from "@/components/admin/AdminWorkspace";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Edit2, Trash2, FileText, Briefcase, Eye, EyeOff, MapPin, Mail, Users, ArrowUp, ArrowDown, Search, List, LayoutGrid, Phone, Globe, Building2, Clock } from "lucide-react";

import { useTranslation } from "react-i18next";

type AdminTab = "dashboard" | "articles" | "projets" | "contacts" | "registrations" | "equipe";
type AdminEditorMode = "browse" | "create" | "edit" | "view";
type SyncAdminSearch = (mutator: (params: URLSearchParams) => void, options?: { replace?: boolean }) => void;

const ADMIN_TABS: AdminTab[] = ["dashboard", "articles", "projets", "contacts", "registrations", "equipe"];

function getAdminSearchParams(search: string) {
  return new URLSearchParams(search);
}

function getAdminTabFromSearch(search: string): AdminTab {
  const tab = getAdminSearchParams(search).get("tab");
  return ADMIN_TABS.includes(tab as AdminTab) ? (tab as AdminTab) : "dashboard";
}

function getAdminModeFromSearch(search: string): AdminEditorMode {
  const mode = getAdminSearchParams(search).get("mode");
  return ["browse", "create", "edit", "view"].includes(mode || "") ? (mode as AdminEditorMode) : "browse";
}

function getAdminIdFromSearch(search: string): number | null {
  const value = getAdminSearchParams(search).get("id");
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export default function Admin() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [adminSearch, setAdminSearch] = useState(() => window.location.search);

  const activeTab = useMemo(() => getAdminTabFromSearch(adminSearch), [adminSearch]);

  const syncAdminSearch: SyncAdminSearch = (mutator, options) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    mutator(params);

    const nextSearch = params.toString();
    const nextUrl = `${url.pathname}${nextSearch ? `?${nextSearch}` : ""}`;

    if (options?.replace) {
      window.history.replaceState({}, "", nextUrl);
    } else {
      window.history.pushState({}, "", nextUrl);
    }

    setAdminSearch(nextSearch ? `?${nextSearch}` : "");
  };

  const handleTabChange = (tab: string) => {
    if (!ADMIN_TABS.includes(tab as AdminTab)) return;

    syncAdminSearch((params) => {
      params.set("tab", tab);
      params.delete("mode");
      params.delete("id");
    });
  };

  useEffect(() => {
    const onPopState = () => setAdminSearch(window.location.search);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const params = getAdminSearchParams(adminSearch);
    if (!params.get("tab")) {
      syncAdminSearch((nextParams) => {
        nextParams.set("tab", "dashboard");
      }, { replace: true });
    }
  }, [adminSearch]);

  if (!user || user.role !== "admin") {
    return <LocalLogin />;
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <AdminContent activeTab={activeTab} setActiveTab={handleTabChange} adminSearch={adminSearch} syncAdminSearch={syncAdminSearch} />
    </AdminLayout>
  );
}

function AdminContent({
  activeTab,
  setActiveTab,
  adminSearch,
  syncAdminSearch,
}: {
  activeTab: AdminTab;
  setActiveTab: (tab: string) => void;
  adminSearch: string;
  syncAdminSearch: SyncAdminSearch;
}) {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");

  const TAB_LABELS: Record<string, string> = {
    dashboard: t("admin.sidebar.dashboard"),
    articles: t("admin.sidebar.articles"),
    projets: t("admin.sidebar.projects"),
    contacts: t("admin.sidebar.contacts"),
    registrations: t("admin.sidebar.registrations"),
    equipe: t("admin.sidebar.team"),
  };

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardTab setActiveTab={setActiveTab} />;
      case "articles": return <ArticlesTab setMessage={setMessage} adminSearch={adminSearch} syncAdminSearch={syncAdminSearch} />;
      case "projets": return <ProjetsTab setMessage={setMessage} adminSearch={adminSearch} syncAdminSearch={syncAdminSearch} />;
      case "contacts": return <ContactsTab setMessage={setMessage} adminSearch={adminSearch} syncAdminSearch={syncAdminSearch} />;
      case "registrations": return <RegistrationsTab setMessage={setMessage} adminSearch={adminSearch} syncAdminSearch={syncAdminSearch} />;
      case "equipe": return <TeamTab setMessage={setMessage} adminSearch={adminSearch} syncAdminSearch={syncAdminSearch} />;
      default: return <DashboardTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen pb-12 pl-14 lg:pl-0">
      {/* Page header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 sticky top-0 z-30">
        <h1 className="text-xl font-bold text-[#1A361D] font-heading">
          {TAB_LABELS[activeTab] ?? t("admin.sidebar.admin_label")}
        </h1>
      </div>

      <div className="px-4 py-8 md:px-8">
        {message && (
          <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
            <AlertDescription className="flex items-center font-medium">
              <span className="mr-2">✨</span> {message}
            </AlertDescription>
          </Alert>
        )}
        {renderTab()}
      </div>
    </div>
  );
}

function DashboardTab({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { t } = useTranslation();
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
              <p className="text-gray-500 font-medium mb-1">{t("admin.dashboard.articles.title")}</p>
              <h3 className="text-3xl font-bold text-[#1A361D]">{articles.length}</h3>
            </div>
            <div className="p-3 bg-orange-50 rounded-full text-[#F5B100]">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex space-x-2 text-sm">
            <span className="text-green-600 font-medium">{publishedArticles} {t("admin.dashboard.articles.unit")}</span>
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
              <p className="text-gray-500 font-medium mb-1">{t("admin.dashboard.projects.title")}</p>
              <h3 className="text-3xl font-bold text-[#1A361D]">{projects.length}</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-full text-[#1E5D2A]">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex space-x-2 text-sm">
            <span className="text-blue-600 font-medium">{projects.filter(p => p.status === 'en_cours').length} {t("admin.dashboard.projects.unit")}</span>
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
              <p className="text-gray-500 font-medium mb-1">{t("admin.dashboard.messages.title")}</p>
              <h3 className="text-3xl font-bold text-[#1A361D]">{contacts.length}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-full text-blue-500">
              <Mail className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex space-x-2 text-sm">
            <span className={`${unreadMessages > 0 ? 'text-red-500 font-bold' : 'text-gray-500'}`}>{unreadMessages} {t("admin.dashboard.messages.unit")}</span>
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
              <p className="text-gray-500 font-medium mb-1">{t("admin.dashboard.registrations.title")}</p>
              <h3 className="text-3xl font-bold text-[#1A361D]">{registrations.length}</h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-full text-purple-500">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex space-x-2 text-sm">
            <span className={`${newRegistrations > 0 ? 'text-purple-600 font-bold' : 'text-gray-500'}`}>{newRegistrations} {t("admin.dashboard.registrations.unit")}</span>
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
              <p className="text-gray-500 font-medium mb-1">{t("admin.dashboard.team.title")}</p>
              <h3 className="text-3xl font-bold text-[#1A361D]">{teamMembers.length}</h3>
            </div>
            <div className="p-3 bg-emerald-50 rounded-full text-emerald-500">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex space-x-2 text-sm">
            <span className="text-emerald-700 font-medium">{activeMembers} {t("admin.dashboard.team.unit")}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ArticlesTab({
  setMessage,
  adminSearch,
  syncAdminSearch,
}: {
  setMessage: (msg: string) => void;
  adminSearch: string;
  syncAdminSearch: SyncAdminSearch;
}) {
  const { t } = useTranslation();
  const utils = trpc.useContext();
  const { data: articles = [], isLoading } = trpc.articles.adminList.useQuery();
  const createMutation = trpc.articles.create.useMutation();
  const updateMutation = trpc.articles.update.useMutation();
  const deleteMutation = trpc.articles.delete.useMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [screenMode, setScreenMode] = useState<AdminEditorMode>("browse");
  const [searchTerm, setSearchTerm] = useState("");
  const [articlesView, setArticlesView] = useState<"list" | "grid">("list");
  const [articleStatusFilter, setArticleStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortBy, setSortBy] = useState<"date" | "status" | "author">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [pageSize, setPageSize] = useState<10 | 25 | 50>(10);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [bulkPending, setBulkPending] = useState(false);

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

  const selectedArticle = useMemo(
    () => articles.find((article: any) => article.id === editingId) || null,
    [articles, editingId],
  );

  const filteredArticles = useMemo(
    () => articles.filter((article: any) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        article.title.toLowerCase().includes(q)
        || (article.slug || "").toLowerCase().includes(q)
        || (article.author || "").toLowerCase().includes(q);

      const matchesStatus =
        articleStatusFilter === "all"
        || (articleStatusFilter === "published" && article.published)
        || (articleStatusFilter === "draft" && !article.published);

      return matchesSearch && matchesStatus;
    }),
    [articles, searchTerm, articleStatusFilter],
  );

  const sortedArticles = useMemo(() => {
    const items = [...filteredArticles];
    items.sort((a: any, b: any) => {
      if (sortBy === "author") {
        const av = (a.author || "").toLowerCase();
        const bv = (b.author || "").toLowerCase();
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }

      if (sortBy === "status") {
        const av = a.published ? 1 : 0;
        const bv = b.published ? 1 : 0;
        return sortDir === "asc" ? av - bv : bv - av;
      }

      const av = new Date(a.publishedAt || a.createdAt || 0).getTime();
      const bv = new Date(b.publishedAt || b.createdAt || 0).getTime();
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return items;
  }, [filteredArticles, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedArticles.length / pageSize));
  const paginatedArticles = useMemo(
    () => sortedArticles.slice((page - 1) * pageSize, page * pageSize),
    [sortedArticles, page, pageSize],
  );

  const allPageSelected = paginatedArticles.length > 0 && paginatedArticles.every((article: any) => selectedIds.includes(article.id));

  useEffect(() => {
    setPage(1);
  }, [searchTerm, articleStatusFilter, sortBy, sortDir, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const toggleSort = (column: "date" | "status" | "author") => {
    if (sortBy === column) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortBy(column);
    setSortDir("desc");
  };

  const toggleSelectAllPage = () => {
    if (allPageSelected) {
      setSelectedIds((prev) => prev.filter((id) => !paginatedArticles.some((article: any) => article.id === id)));
      return;
    }
    setSelectedIds((prev) => Array.from(new Set([...prev, ...paginatedArticles.map((article: any) => article.id)])));
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const runBulkPublish = async (published: boolean) => {
    if (selectedIds.length === 0 || bulkPending) return;
    setBulkPending(true);
    try {
      await Promise.all(selectedIds.map((id) => updateMutation.mutateAsync({ id, published })));
      setMessage(published ? t("admin.articles.bulk_messages.publish_success") : t("admin.articles.bulk_messages.draft_success"));
      setSelectedIds([]);
      await utils.articles.adminList.invalidate();
    } catch {
      setMessage(t("admin.articles.bulk_messages.error"));
    } finally {
      setBulkPending(false);
    }
  };

  const runBulkDelete = async () => {
    if (selectedIds.length === 0 || bulkPending) return;
    if (!window.confirm(t("admin.articles.bulk_messages.delete_confirm", { count: selectedIds.length }))) return;

    setBulkPending(true);
    try {
      await Promise.all(selectedIds.map((id) => deleteMutation.mutateAsync(id)));
      setMessage(t("admin.articles.bulk_messages.delete_success"));
      setSelectedIds([]);
      await utils.articles.adminList.invalidate();
    } catch {
      setMessage(t("admin.articles.bulk_messages.error"));
    } finally {
      setBulkPending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...form });
        setMessage(t("admin.articles.update_success"));
      } else {
        await createMutation.mutateAsync(form);
        setMessage(t("admin.articles.create_success"));
      }
      setForm(defaultForm);
      setEditingId(null);
      setScreenMode("browse");
      syncAdminSearch((params) => {
        params.set("tab", "articles");
        params.delete("mode");
        params.delete("id");
      }, { replace: true });
      await utils.articles.adminList.invalidate();
    } catch {
      setMessage(t("admin.articles.error_save"));
    }
  };

  const loadArticle = (article: any) => {
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
  };

  useEffect(() => {
    const mode = getAdminModeFromSearch(adminSearch);
    const id = getAdminIdFromSearch(adminSearch);

    if (mode === "create") {
      setEditingId(null);
      setForm(defaultForm);
      setScreenMode("create");
      return;
    }

    if (mode === "edit" && id !== null) {
      const article = articles.find((item: any) => item.id === id);
      if (article) {
        loadArticle(article);
        setScreenMode("edit");
        return;
      }
    }

    setEditingId(null);
    setForm(defaultForm);
    setScreenMode("browse");
  }, [adminSearch, articles]);

  const handleCreate = () => {
    setEditingId(null);
    setForm(defaultForm);
    setScreenMode("create");
    syncAdminSearch((params) => {
      params.set("tab", "articles");
      params.set("mode", "create");
      params.delete("id");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = (article: any) => {
    loadArticle(article);
    setScreenMode("edit");
    syncAdminSearch((params) => {
      params.set("tab", "articles");
      params.set("mode", "edit");
      params.set("id", String(article.id));
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultForm);
    setScreenMode("browse");
    syncAdminSearch((params) => {
      params.set("tab", "articles");
      params.delete("mode");
      params.delete("id");
    });
  };

  return (
    <AdminWorkspace
      mode={screenMode}
      title={t("admin.sidebar.articles")}
      collectionLabel={t("admin.workspace.collection_label")}
      description={t("admin.articles.collection_description")}
      count={articles.length}
      createLabel={t("admin.articles.form_title_create")}
      createDisabled={createMutation.isPending || updateMutation.isPending}
      onCreate={handleCreate}
      backLabel={t("admin.workspace.back_to_collection")}
      onBack={cancelEdit}
      editorBadge={screenMode === "edit" ? t("admin.workspace.mode_edit") : t("admin.workspace.mode_create")}
      editorTitle={screenMode === "edit" ? (selectedArticle?.title || t("admin.articles.form_title_edit")) : t("admin.articles.form_title_create")}
      editorDescription={screenMode === "edit" ? (form.slug ? `/${form.slug}` : undefined) : t("admin.articles.editor_description")}
      accentClassName="bg-[radial-gradient(circle_at_top_left,_rgba(245,177,0,0.18),_transparent_42%),linear-gradient(180deg,#ffffff_0%,#fffaf0_100%)]"
      editorContent={(
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
            <CardTitle className="flex items-center text-xl text-[#1A361D]">
              <Edit2 className="mr-3 h-5 w-5 text-[#F5B100]" />
              {screenMode === "edit" ? t("admin.articles.form_title_edit") : t("admin.articles.form_title_create")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.articles.label_title_fr")}</label>
                  <Input
                    className="h-12 border-gray-200 focus:border-[#1E5D2A] focus:ring-[#1E5D2A]"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.articles.label_title_en")}</label>
                  <Input
                    className="h-12 border-gray-200 focus:border-[#1E5D2A] focus:ring-[#1E5D2A]"
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.articles.label_slug")}</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.articles.label_category")}</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full h-12 px-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                  >
                    <option value="actualites">{t("common.categories.actualites")}</option>
                    <option value="terrain">{t("common.categories.terrain")}</option>
                    <option value="rapport">{t("common.categories.rapport")}</option>
                    <option value="communique">{t("common.categories.communique")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.articles.label_author")}</label>
                  <Input
                    className="h-12 border-gray-200"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="Équipe AMANCE"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.articles.label_cover")}</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.articles.label_excerpt_fr")}</label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                    placeholder="Un court texte accrocheur..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.articles.label_excerpt_en")}</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.articles.label_content_fr")}</label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md h-64 resize-y focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                    placeholder="Contenu complet en français..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.articles.label_content_en")}</label>
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
                    {t("admin.articles.label_published")}
                  </label>
                </div>
              )}

              <div className="flex space-x-4 pt-4 border-t">
                <Button
                  type="submit"
                  className="bg-[#1A361D] hover:bg-[#152e18] text-white flex-1 h-12 text-lg"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {(createMutation.isPending || updateMutation.isPending) ? t("common.saving") : (screenMode === "edit" ? t("common.update") : t("common.create_draft"))}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit} className="h-12 px-8">
                  {t("common.cancel")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      collectionContent={(
        <Card className="overflow-hidden border border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-xl text-[#1A361D]">{t("admin.sidebar.articles")} {articles.length > 0 && `(${articles.length})`}</CardTitle>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Button
                type="button"
                size="sm"
                variant={articleStatusFilter === "all" ? "default" : "outline"}
                className={articleStatusFilter === "all" ? "bg-[#1A361D] hover:bg-[#152e18]" : ""}
                onClick={() => setArticleStatusFilter("all")}
              >
                {t("admin.projects.filter_all")}
              </Button>
              <Button
                type="button"
                size="sm"
                variant={articleStatusFilter === "published" ? "default" : "outline"}
                className={articleStatusFilter === "published" ? "bg-emerald-700 hover:bg-emerald-800" : ""}
                onClick={() => setArticleStatusFilter("published")}
              >
                {t("admin.articles.status.published")}
              </Button>
              <Button
                type="button"
                size="sm"
                variant={articleStatusFilter === "draft" ? "default" : "outline"}
                className={articleStatusFilter === "draft" ? "bg-amber-600 hover:bg-amber-700" : ""}
                onClick={() => setArticleStatusFilter("draft")}
              >
                {t("admin.articles.status.draft")}
              </Button>

              <div className="ml-auto inline-flex items-center gap-1 border rounded-md bg-white p-1">
                <Button
                  type="button"
                  size="icon"
                  variant={articlesView === "list" ? "secondary" : "ghost"}
                  className="h-8 w-8"
                  onClick={() => setArticlesView("list")}
                  aria-label={t("admin.projects.table.project")}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant={articlesView === "grid" ? "secondary" : "ghost"}
                  className="h-8 w-8"
                  onClick={() => setArticlesView("grid")}
                  aria-label={t("admin.projects.table.project")}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="relative mt-3">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("admin.projects.search_placeholder")}
                className="pl-9 h-10 bg-white"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="text-xs text-gray-500">
                {t("admin.projects.results_count", { count: sortedArticles.length })}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{t("admin.projects.per_page")}</span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value) as 10 | 25 | 50)}
                  className="h-8 px-2 text-xs border rounded-md bg-white"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0 p-0">
            {isLoading ? (
              <div className="p-6 text-center text-gray-500">{t("admin.projects.loading")}</div>
            ) : (
              <div>
                <div className="p-3 border-b bg-gray-50/70 flex items-center justify-between gap-2 flex-wrap">
                  <p className="text-xs text-gray-600">
                    {selectedIds.length > 0 ? t("admin.projects.selection_count", { count: selectedIds.length }) : t("admin.projects.no_selection")}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8" disabled={selectedIds.length === 0 || bulkPending} onClick={() => runBulkPublish(true)}>
                      {t("admin.articles.bulk.publish")}
                    </Button>
                    <Button size="sm" variant="outline" className="h-8" disabled={selectedIds.length === 0 || bulkPending} onClick={() => runBulkPublish(false)}>
                      {t("admin.articles.bulk.draft")}
                    </Button>
                    <Button size="sm" variant="destructive" className="h-8" disabled={selectedIds.length === 0 || bulkPending} onClick={runBulkDelete}>
                      {t("admin.articles.bulk.delete")}
                    </Button>
                  </div>
                </div>

                {articlesView === "list" ? (
                  <div className="divide-y divide-gray-100">
                    <div className="grid grid-cols-[44px_1.6fr_1fr_0.9fr_0.9fr_140px] gap-2 px-3 py-2 text-xs font-semibold text-gray-500 bg-white sticky top-0 z-10 border-b">
                      <input type="checkbox" checked={allPageSelected} onChange={toggleSelectAllPage} className="w-4 h-4" />
                      <span>{t("admin.articles.table.article")}</span>
                      <button type="button" className="text-left hover:text-gray-700" onClick={() => toggleSort("author")}>{t("admin.articles.table.author")}</button>
                      <button type="button" className="text-left hover:text-gray-700" onClick={() => toggleSort("status")}>{t("admin.articles.table.status")}</button>
                      <button type="button" className="text-left hover:text-gray-700" onClick={() => toggleSort("date")}>{t("admin.articles.table.date")}</button>
                      <span className="text-right">{t("admin.projects.table.actions")}</span>
                    </div>

                    {paginatedArticles.map((article: any) => (
                      <div
                        key={article.id}
                        className={`grid grid-cols-[44px_1.6fr_1fr_0.9fr_0.9fr_140px] gap-2 px-3 py-3 items-center hover:bg-gray-50 ${editingId === article.id ? "bg-orange-50/50 border-l-4 border-l-[#F5B100]" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(article.id)}
                          onChange={() => toggleSelectOne(article.id)}
                          className="w-4 h-4"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-gray-800 truncate">{article.title}</p>
                          <p className="text-xs text-gray-500 truncate">/{article.slug}</p>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{article.author || "-"}</p>
                        <div>
                          {article.published ? (
                            <span className="text-xs inline-flex items-center text-green-700 bg-green-50 px-2 py-1 rounded font-medium"><Eye className="w-3 h-3 mr-1" />{t("admin.articles.status.published")}</span>
                          ) : (
                            <span className="text-xs inline-flex items-center text-orange-700 bg-orange-50 px-2 py-1 rounded font-medium"><EyeOff className="w-3 h-3 mr-1" />{t("admin.articles.status.draft")}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{article.publishedAt ? formatDate(article.publishedAt) : formatDate(article.createdAt)}</p>
                        <div className="flex justify-end gap-1">
                          <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => handleEdit(article)} aria-label={t("common.update")}>
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="h-8 w-8"
                            onClick={() => {
                              if (window.confirm(t("admin.articles.confirm_delete"))) {
                                deleteMutation.mutate(article.id, { onSuccess: () => utils.articles.adminList.invalidate() });
                              }
                            }}
                            aria-label="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 grid grid-cols-1 gap-3">
                    {paginatedArticles.map((article: any) => (
                      <div
                        key={article.id}
                        className={`p-4 rounded-xl border border-gray-200 hover:bg-gray-50/80 transition-colors flex flex-col ${editingId === article.id ? 'bg-orange-50/50 border-l-4 border-l-[#F5B100]' : ''}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 pr-4">
                            <p className="font-bold text-gray-800 line-clamp-2 leading-tight">{article.title}</p>
                            <p className="text-xs text-gray-500 mt-1">/{article.slug} {article.author ? `- ${article.author}` : ""}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium capitalize">{article.category}</span>
                              {article.published ? (
                                <span className="text-xs flex items-center text-green-700 bg-green-50 px-2 py-1 rounded font-medium"><Eye className="w-3 h-3 mr-1" /> Publié</span>
                              ) : (
                                <span className="text-xs flex items-center text-orange-700 bg-orange-50 px-2 py-1 rounded font-medium"><EyeOff className="w-3 h-3 mr-1" /> Brouillon</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 mt-3 pt-3 border-t border-gray-50">
                          <Button size="sm" variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-700 h-8" onClick={() => handleEdit(article)}>
                            <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Modifier
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-8"
                            onClick={() => {
                              if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
                                deleteMutation.mutate(article.id, { onSuccess: () => utils.articles.adminList.invalidate() });
                              }
                            }}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-3 border-t bg-white flex items-center justify-between">
                  <p className="text-xs text-gray-500">Page {page} / {totalPages}</p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8" disabled={page <= 1} onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
                      Precedent
                    </Button>
                    <Button size="sm" variant="outline" className="h-8" disabled={page >= totalPages} onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}>
                      Suivant
                    </Button>
                  </div>
                </div>

                {paginatedArticles.length === 0 && (
                  <div className="p-8 text-center text-gray-500">Aucun article trouvé.</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    />
  );
}

function ProjetsTab({
  setMessage,
  adminSearch,
  syncAdminSearch,
}: {
  setMessage: (msg: string) => void;
  adminSearch: string;
  syncAdminSearch: SyncAdminSearch;
}) {
  const { t } = useTranslation();
  const utils = trpc.useContext();
  const { data: projects = [], isLoading } = trpc.projects.adminList.useQuery();
  const createMutation = trpc.projects.create.useMutation();
  const updateMutation = trpc.projects.update.useMutation();
  const deleteMutation = trpc.projects.delete.useMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [screenMode, setScreenMode] = useState<AdminEditorMode>("browse");
  const [projectSearch, setProjectSearch] = useState("");
  const [projectsView, setProjectsView] = useState<"list" | "grid">("list");
  const [projectStatusFilter, setProjectStatusFilter] = useState<"all" | "en_cours" | "termine" | "planifie">("all");
  const [projectSortBy, setProjectSortBy] = useState<"date" | "status" | "location">("date");
  const [projectSortDir, setProjectSortDir] = useState<"asc" | "desc">("desc");
  const [projectPageSize, setProjectPageSize] = useState<10 | 25 | 50>(10);
  const [projectPage, setProjectPage] = useState(1);
  const [selectedProjectIds, setSelectedProjectIds] = useState<number[]>([]);
  const [projectBulkPending, setProjectBulkPending] = useState(false);

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

  const selectedProject = useMemo(
    () => projects.find((project: any) => project.id === editingId) || null,
    [projects, editingId],
  );

  const filteredProjects = useMemo(
    () => projects.filter((project: any) => {
      const q = projectSearch.toLowerCase();
      const matchesSearch = (
        project.title.toLowerCase().includes(q)
        || (project.location || "").toLowerCase().includes(q)
        || (project.status || "").toLowerCase().includes(q)
      );

      const matchesStatus = projectStatusFilter === "all" || project.status === projectStatusFilter;

      return matchesSearch && matchesStatus;
    }),
    [projects, projectSearch, projectStatusFilter],
  );

  const sortedProjects = useMemo(() => {
    const items = [...filteredProjects];
    items.sort((a: any, b: any) => {
      if (projectSortBy === "location") {
        const av = (a.location || "").toLowerCase();
        const bv = (b.location || "").toLowerCase();
        return projectSortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }

      if (projectSortBy === "status") {
        const statusWeight = { en_cours: 3, planifie: 2, termine: 1 } as Record<string, number>;
        const av = statusWeight[a.status || ""] || 0;
        const bv = statusWeight[b.status || ""] || 0;
        return projectSortDir === "asc" ? av - bv : bv - av;
      }

      const av = new Date(a.startDate || a.createdAt || 0).getTime();
      const bv = new Date(b.startDate || b.createdAt || 0).getTime();
      return projectSortDir === "asc" ? av - bv : bv - av;
    });
    return items;
  }, [filteredProjects, projectSortBy, projectSortDir]);

  const totalProjectPages = Math.max(1, Math.ceil(sortedProjects.length / projectPageSize));
  const paginatedProjects = useMemo(
    () => sortedProjects.slice((projectPage - 1) * projectPageSize, projectPage * projectPageSize),
    [sortedProjects, projectPage, projectPageSize],
  );

  const allProjectPageSelected = paginatedProjects.length > 0 && paginatedProjects.every((project: any) => selectedProjectIds.includes(project.id));

  useEffect(() => {
    setProjectPage(1);
  }, [projectSearch, projectStatusFilter, projectSortBy, projectSortDir, projectPageSize]);

  useEffect(() => {
    if (projectPage > totalProjectPages) setProjectPage(totalProjectPages);
  }, [projectPage, totalProjectPages]);

  const toggleProjectSort = (column: "date" | "status" | "location") => {
    if (projectSortBy === column) {
      setProjectSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setProjectSortBy(column);
    setProjectSortDir("desc");
  };

  const toggleSelectAllProjectsPage = () => {
    if (allProjectPageSelected) {
      setSelectedProjectIds((prev) => prev.filter((id) => !paginatedProjects.some((project: any) => project.id === id)));
      return;
    }
    setSelectedProjectIds((prev) => Array.from(new Set([...prev, ...paginatedProjects.map((project: any) => project.id)])));
  };

  const toggleSelectProject = (id: number) => {
    setSelectedProjectIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const runBulkProjectStatus = async (status: "en_cours" | "termine" | "planifie") => {
    if (selectedProjectIds.length === 0 || projectBulkPending) return;
    setProjectBulkPending(true);
    try {
      await Promise.all(selectedProjectIds.map((id) => updateMutation.mutateAsync({ id, status })));
      setMessage(t("admin.projects.bulk_messages.status_success", { count: selectedProjectIds.length }));
      setSelectedProjectIds([]);
      await utils.projects.adminList.invalidate();
    } catch {
      setMessage(t("admin.projects.bulk_messages.status_error"));
    } finally {
      setProjectBulkPending(false);
    }
  };

  const runBulkProjectDelete = async () => {
    if (selectedProjectIds.length === 0 || projectBulkPending) return;
    if (!window.confirm(t("admin.projects.bulk_messages.delete_confirm", { count: selectedProjectIds.length }))) return;

    setProjectBulkPending(true);
    try {
      await Promise.all(selectedProjectIds.map((id) => deleteMutation.mutateAsync(id)));
      setMessage(t("admin.projects.bulk_messages.delete_success"));
      setSelectedProjectIds([]);
      await utils.projects.adminList.invalidate();
    } catch {
      setMessage(t("admin.projects.bulk_messages.delete_error"));
    } finally {
      setProjectBulkPending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...form, beneficiaries: Number(form.beneficiaries) });
        setMessage(t("admin.projects.update_success"));
      } else {
        await createMutation.mutateAsync({ ...form, beneficiaries: Number(form.beneficiaries) });
        setMessage(t("admin.projects.create_success"));
      }
      setForm(defaultForm);
      setEditingId(null);
      setScreenMode("browse");
      syncAdminSearch((params) => {
        params.set("tab", "projets");
        params.delete("mode");
        params.delete("id");
      }, { replace: true });
      await utils.projects.adminList.invalidate();
    } catch {
      setMessage(t("admin.projects.error_save"));
    }
  };

  const loadProject = (project: any) => {
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
      featured: project.featured || false,
    });
  };

  useEffect(() => {
    const mode = getAdminModeFromSearch(adminSearch);
    const id = getAdminIdFromSearch(adminSearch);

    if (mode === "create") {
      setEditingId(null);
      setForm(defaultForm);
      setScreenMode("create");
      return;
    }

    if (mode === "edit" && id !== null) {
      const project = projects.find((item: any) => item.id === id);
      if (project) {
        loadProject(project);
        setScreenMode("edit");
        return;
      }
    }

    setEditingId(null);
    setForm(defaultForm);
    setScreenMode("browse");
  }, [adminSearch, projects]);

  const handleCreate = () => {
    setEditingId(null);
    setForm(defaultForm);
    setScreenMode("create");
    syncAdminSearch((params) => {
      params.set("tab", "projets");
      params.set("mode", "create");
      params.delete("id");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = (project: any) => {
    loadProject(project);
    setScreenMode("edit");
    syncAdminSearch((params) => {
      params.set("tab", "projets");
      params.set("mode", "edit");
      params.set("id", String(project.id));
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultForm);
    setScreenMode("browse");
    syncAdminSearch((params) => {
      params.set("tab", "projets");
      params.delete("mode");
      params.delete("id");
    });
  };

  return (
    <AdminWorkspace
      mode={screenMode}
      title={t("admin.sidebar.projects")}
      collectionLabel={t("admin.workspace.collection_label")}
      description={t("admin.projects.collection_description")}
      count={projects.length}
      createLabel={t("admin.projects.form_title_create")}
      createDisabled={createMutation.isPending || updateMutation.isPending}
      onCreate={handleCreate}
      backLabel={t("admin.workspace.back_to_collection")}
      onBack={cancelEdit}
      editorBadge={screenMode === "edit" ? t("admin.workspace.mode_edit") : t("admin.workspace.mode_create")}
      editorTitle={screenMode === "edit" ? (selectedProject?.title || t("admin.projects.form_title_edit")) : t("admin.projects.form_title_create")}
      editorDescription={screenMode === "edit" ? (form.slug ? `/${form.slug}` : undefined) : t("admin.projects.editor_description")}
      accentClassName="bg-[radial-gradient(circle_at_top_left,_rgba(30,93,42,0.16),_transparent_45%),linear-gradient(180deg,#ffffff_0%,#f5fbf6_100%)]"
      editorContent={(
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-xl flex items-center text-[#1A361D]">
              <Edit2 className="w-5 h-5 mr-3 text-[#1E5D2A]" />
              {screenMode === "edit" ? t("admin.projects.form_title_edit") : t("admin.projects.form_title_create")}
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
                  {(createMutation.isPending || updateMutation.isPending) ? t("common.saving") : (screenMode === "edit" ? t("common.update") : t("admin.projects.form_title_create"))}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit} className="h-12 px-8">
                  {t("common.cancel")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      collectionContent={(
        <Card className="overflow-hidden border border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-xl text-[#1A361D]">Projets {projects.length > 0 && `(${projects.length})`}</CardTitle>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Button
                type="button"
                size="sm"
                variant={projectStatusFilter === "all" ? "default" : "outline"}
                className={projectStatusFilter === "all" ? "bg-[#1A361D] hover:bg-[#152e18]" : ""}
                onClick={() => setProjectStatusFilter("all")}
              >
                {t("admin.projects.filter_all")}
              </Button>
              <Button
                type="button"
                size="sm"
                variant={projectStatusFilter === "en_cours" ? "default" : "outline"}
                className={projectStatusFilter === "en_cours" ? "bg-blue-700 hover:bg-blue-800" : ""}
                onClick={() => setProjectStatusFilter("en_cours")}
              >
                {t("admin.projects.filter_active")}
              </Button>
              <Button
                type="button"
                size="sm"
                variant={projectStatusFilter === "termine" ? "default" : "outline"}
                className={projectStatusFilter === "termine" ? "bg-emerald-700 hover:bg-emerald-800" : ""}
                onClick={() => setProjectStatusFilter("termine")}
              >
                {t("admin.projects.filter_finished")}
              </Button>
              <Button
                type="button"
                size="sm"
                variant={projectStatusFilter === "planifie" ? "default" : "outline"}
                className={projectStatusFilter === "planifie" ? "bg-amber-600 hover:bg-amber-700" : ""}
                onClick={() => setProjectStatusFilter("planifie")}
              >
                {t("admin.projects.filter_planned")}
              </Button>

              <div className="ml-auto inline-flex items-center gap-1 border rounded-md bg-white p-1">
                <Button
                  type="button"
                  size="icon"
                  variant={projectsView === "list" ? "secondary" : "ghost"}
                  className="h-8 w-8"
                  onClick={() => setProjectsView("list")}
                  aria-label="Affichage liste"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant={projectsView === "grid" ? "secondary" : "ghost"}
                  className="h-8 w-8"
                  onClick={() => setProjectsView("grid")}
                  aria-label="Affichage grille"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="relative mt-3">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                placeholder={t("admin.projects.search_placeholder", "Rechercher par titre, lieu ou statut...")}
                className="pl-9 h-10 bg-white"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="text-xs text-gray-500">{t("admin.projects.results_count", { count: sortedProjects.length })}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{t("admin.projects.per_page")}</span>
                <select
                  value={projectPageSize}
                  onChange={(e) => setProjectPageSize(Number(e.target.value) as 10 | 25 | 50)}
                  className="h-8 px-2 text-xs border rounded-md bg-white"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0 p-0">
            {isLoading ? (
              <div className="p-6 text-center text-gray-500">{t("admin.projects.loading")}</div>
            ) : (
              <div>
                <div className="p-3 border-b bg-gray-50/70 flex items-center justify-between gap-2 flex-wrap">
                  <p className="text-xs text-gray-600">
                    {selectedProjectIds.length > 0 ? t("admin.projects.selection_count", { count: selectedProjectIds.length }) : t("admin.projects.no_selection")}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button size="sm" variant="outline" className="h-8" disabled={selectedProjectIds.length === 0 || projectBulkPending} onClick={() => runBulkProjectStatus("en_cours")}>
                      {t("admin.projects.bulk.active")}
                    </Button>
                    <Button size="sm" variant="outline" className="h-8" disabled={selectedProjectIds.length === 0 || projectBulkPending} onClick={() => runBulkProjectStatus("planifie")}>
                      {t("admin.projects.bulk.plan")}
                    </Button>
                    <Button size="sm" variant="outline" className="h-8" disabled={selectedProjectIds.length === 0 || projectBulkPending} onClick={() => runBulkProjectStatus("termine")}>
                      {t("admin.projects.bulk.finish")}
                    </Button>
                    <Button size="sm" variant="destructive" className="h-8" disabled={selectedProjectIds.length === 0 || projectBulkPending} onClick={runBulkProjectDelete}>
                      {t("admin.projects.bulk.delete")}
                    </Button>
                  </div>
                </div>

                {projectsView === "list" ? (
                  <div className="divide-y divide-gray-100">
                    <div className="grid grid-cols-[44px_1.5fr_1fr_0.9fr_0.9fr_140px] gap-2 px-3 py-2 text-xs font-semibold text-gray-500 bg-white sticky top-0 z-10 border-b">
                      <input type="checkbox" checked={allProjectPageSelected} onChange={toggleSelectAllProjectsPage} className="w-4 h-4" />
                      <span>{t("admin.projects.table.project")}</span>
                      <button type="button" className="text-left hover:text-gray-700" onClick={() => toggleProjectSort("location")}>{t("admin.projects.table.location")}</button>
                      <button type="button" className="text-left hover:text-gray-700" onClick={() => toggleProjectSort("status")}>{t("admin.projects.table.status")}</button>
                      <button type="button" className="text-left hover:text-gray-700" onClick={() => toggleProjectSort("date")}>{t("admin.projects.table.date")}</button>
                      <span className="text-right">{t("admin.projects.table.actions")}</span>
                    </div>

                    {paginatedProjects.map((project: any) => (
                      <div
                        key={project.id}
                        className={`grid grid-cols-[44px_1.5fr_1fr_0.9fr_0.9fr_140px] gap-2 px-3 py-3 items-center hover:bg-gray-50 ${editingId === project.id ? "bg-green-50/50" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedProjectIds.includes(project.id)}
                          onChange={() => toggleSelectProject(project.id)}
                          className="w-4 h-4"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-gray-800 truncate">{project.title}</p>
                          <p className="text-xs text-gray-500 truncate">/{project.slug}</p>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{project.location || "N/A"}</p>
                        <span className={`text-xs px-2 py-1 rounded font-medium capitalize w-fit ${project.status === 'en_cours' ? 'bg-blue-50 text-blue-700' : project.status === 'termine' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                          {project.status.replace("_", " ")}
                        </span>
                        <p className="text-xs text-gray-500">{project.startDate ? formatDate(project.startDate) : formatDate(project.createdAt)}</p>
                        <div className="flex justify-end gap-1">
                          <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => handleEdit(project)} aria-label={t("admin.projects.table.actions")}>
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="h-8 w-8"
                            onClick={() => {
                              if (window.confirm(t("admin.projects.confirm_delete"))) {
                                deleteMutation.mutate(project.id, { onSuccess: () => utils.projects.adminList.invalidate() });
                              }
                            }}
                            aria-label={t("admin.projects.bulk.delete")}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 grid grid-cols-1 gap-3">
                    {paginatedProjects.map((project: any) => (
                      <div
                        key={project.id}
                        className={`p-4 rounded-xl border border-gray-200 hover:bg-gray-50/80 transition-colors flex flex-col ${editingId === project.id ? 'bg-green-50/50' : ''}`}
                      >
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <div className="flex-1 pr-2">
                            <p className="font-bold text-gray-800 line-clamp-2 leading-tight">{project.title}</p>
                            <p className="text-xs text-gray-500 mt-1">/{project.slug} - {project.beneficiaries || 0} {t("admin.projects.label_beneficiaries")}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium capitalize flex items-center"><MapPin className="w-3 h-3 mr-1" /> {project.location || "N/A"}</span>
                              <span className={`text-xs px-2 py-1 rounded font-medium capitalize ${project.status === 'en_cours' ? 'bg-blue-50 text-blue-700' : project.status === 'termine' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                                {project.status.replace("_", " ")}
                              </span>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={selectedProjectIds.includes(project.id)}
                            onChange={() => toggleSelectProject(project.id)}
                            className="w-4 h-4 mt-1"
                          />
                        </div>

                        <div className="flex justify-end space-x-2 mt-3 pt-3 border-t border-gray-50">
                          <Button size="sm" variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-700 h-8" onClick={() => handleEdit(project)}>
                            <Edit2 className="w-3.5 h-3.5 mr-1.5" /> {t("admin.projects.table.actions")}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-8"
                            onClick={() => {
                              if (window.confirm(t("admin.projects.confirm_delete"))) {
                                deleteMutation.mutate(project.id, { onSuccess: () => utils.projects.adminList.invalidate() });
                              }
                            }}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-3 border-t bg-white flex items-center justify-between">
                  <p className="text-xs text-gray-500">{t("admin.projects.pagination.page", { current: projectPage, total: totalProjectPages })}</p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8" disabled={projectPage <= 1} onClick={() => setProjectPage((prev) => Math.max(1, prev - 1))}>
                      {t("admin.projects.pagination.prev")}
                    </Button>
                    <Button size="sm" variant="outline" className="h-8" disabled={projectPage >= totalProjectPages} onClick={() => setProjectPage((prev) => Math.min(totalProjectPages, prev + 1))}>
                      {t("admin.projects.pagination.next")}
                    </Button>
                  </div>
                </div>

                {paginatedProjects.length === 0 && (
                  <div className="p-8 text-center text-gray-500">{t("admin.projects.empty_results")}</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    />
  );
}

function TeamTab({
  setMessage,
  adminSearch,
  syncAdminSearch,
}: {
  setMessage: (msg: string) => void;
  adminSearch: string;
  syncAdminSearch: SyncAdminSearch;
}) {
  const { t } = useTranslation();
  const utils = trpc.useContext();
  const { data: members = [], isLoading } = trpc.team.adminList.useQuery();
  const createMutation = trpc.team.create.useMutation();
  const updateMutation = trpc.team.update.useMutation();
  const deleteMutation = trpc.team.delete.useMutation();
  const reorderMutation = trpc.team.reorder.useMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [screenMode, setScreenMode] = useState<AdminEditorMode>("browse");
  const [memberSearch, setMemberSearch] = useState("");

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

  const selectedMember = useMemo(
    () => members.find((member: any) => member.id === editingId) || null,
    [members, editingId],
  );

  const filteredMembers = useMemo(
    () => members.filter((member: any) => {
      const q = memberSearch.toLowerCase();
      return member.name.toLowerCase().includes(q) || member.role.toLowerCase().includes(q);
    }),
    [members, memberSearch],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...form });
        setMessage(t("admin.team.update_success"));
      } else {
        await createMutation.mutateAsync(form);
        setMessage(t("admin.team.create_success"));
      }

      setForm(defaultForm);
      setEditingId(null);
      setScreenMode("browse");
      syncAdminSearch((params) => {
        params.set("tab", "equipe");
        params.delete("mode");
        params.delete("id");
      }, { replace: true });
      await utils.team.adminList.invalidate();
      await utils.team.list.invalidate();
    } catch {
      setMessage(t("admin.team.error_save"));
    }
  };

  const loadMember = (member: any) => {
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
  };

  useEffect(() => {
    const mode = getAdminModeFromSearch(adminSearch);
    const id = getAdminIdFromSearch(adminSearch);

    if (mode === "create") {
      setEditingId(null);
      setForm(defaultForm);
      setScreenMode("create");
      return;
    }

    if (mode === "edit" && id !== null) {
      const member = members.find((item: any) => item.id === id);
      if (member) {
        loadMember(member);
        setScreenMode("edit");
        return;
      }
    }

    setEditingId(null);
    setForm(defaultForm);
    setScreenMode("browse");
  }, [adminSearch, members]);

  const handleCreate = () => {
    setEditingId(null);
    setForm(defaultForm);
    setScreenMode("create");
    syncAdminSearch((params) => {
      params.set("tab", "equipe");
      params.set("mode", "create");
      params.delete("id");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = (member: any) => {
    loadMember(member);
    setScreenMode("edit");
    syncAdminSearch((params) => {
      params.set("tab", "equipe");
      params.set("mode", "edit");
      params.set("id", String(member.id));
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultForm);
    setScreenMode("browse");
    syncAdminSearch((params) => {
      params.set("tab", "equipe");
      params.delete("mode");
      params.delete("id");
    });
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
      setMessage(t("admin.team.error_reorder"));
    }
  };

  return (
    <AdminWorkspace
      mode={screenMode}
      title={t("admin.sidebar.team")}
      collectionLabel={t("admin.workspace.collection_label")}
      description={t("admin.team.desc")}
      count={members.length}
      createLabel={t("admin.team.form_title_add")}
      createDisabled={createMutation.isPending || updateMutation.isPending}
      onCreate={handleCreate}
      backLabel={t("admin.workspace.back_to_collection")}
      onBack={cancelEdit}
      editorBadge={screenMode === "edit" ? t("admin.workspace.mode_edit") : t("admin.workspace.mode_create")}
      editorTitle={screenMode === "edit" ? (selectedMember?.name || t("admin.team.form_title_edit")) : t("admin.team.form_title_add")}
      editorDescription={screenMode === "edit" ? selectedMember?.role : t("admin.team.editor_description")}
      accentClassName="bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_42%),linear-gradient(180deg,#ffffff_0%,#f3fbf7_100%)]"
      editorContent={(
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-xl flex items-center text-[#1A361D]">
              <Edit2 className="w-5 h-5 mr-3 text-[#1E5D2A]" />
              {screenMode === "edit" ? t("admin.team.form_title_edit") : t("admin.team.form_title_add")}
            </CardTitle>
            <CardDescription>
              {t("admin.team.desc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {selectedMember && (
                <div className="p-4 border rounded-lg bg-emerald-50/40 flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold text-emerald-800">{t("admin.team.editing_now")}</span>
                  <span className="text-emerald-900">{selectedMember.name}</span>
                  <span className="text-emerald-700">({selectedMember.role})</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.team.label_name")}</label>
                  <Input
                    className="h-12 border-gray-200"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.team.label_role")}</label>
                  <Input
                    className="h-12 border-gray-200"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder={t("admin.team.placeholder_role")}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.team.label_title")}</label>
                  <Input
                    className="h-12 border-gray-200"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="BSc Administration"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.team.label_location")}</label>
                  <Input
                    className="h-12 border-gray-200"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder={t("admin.team.placeholder_location")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.team.label_image")}</label>
                <div className="flex gap-4">
                  <Input
                    className="h-12 border-gray-200 flex-1"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder={t("admin.team.placeholder_image")}
                  />
                  {form.image && (
                    <div className="w-16 h-12 bg-gray-100 rounded-md overflow-hidden border">
                      <img src={form.image} alt="Aperçu" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("admin.team.label_bio")}</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E5D2A]"
                  placeholder={t("admin.team.label_bio")}
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
                  {t("admin.team.label_active")}
                </label>
              </div>

              <div className="flex space-x-4 pt-4 border-t">
                <Button
                  type="submit"
                  className="bg-[#1A361D] hover:bg-[#152e18] text-white flex-1 h-12 text-lg"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {(createMutation.isPending || updateMutation.isPending)
                    ? t("common.saving")
                    : (screenMode === "edit" ? t("common.update") : t("admin.team.form_title_add"))}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit} className="h-12 px-8">
                  {t("common.cancel")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      collectionContent={(
        <Card className="overflow-hidden border border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-xl text-[#1A361D]">{t("admin.sidebar.team")} ({members.length})</CardTitle>
            <CardDescription>
              {t("admin.team.desc")}
            </CardDescription>
            <div className="relative mt-3">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                placeholder={t("admin.projects.search_placeholder")}
                className="pl-9 h-10 bg-white"
              />
            </div>
          </CardHeader>
          <CardContent className="pt-0 p-0">
            {isLoading ? (
              <div className="p-6 text-center text-gray-500">{t("admin.projects.loading")}</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredMembers.map((member: any) => {
                  const index = members.findIndex((candidate: any) => candidate.id === member.id);
                  return (
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
                          <p className="text-xs text-gray-500 truncate">{member.location || t("common.no_location")}</p>
                          <div className="mt-2">
                            <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-600 mr-2">
                              {t("common.order")} #{index + 1}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${member.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-700"}`}>
                              {member.active ? t("common.active") : t("common.inactive")}
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
                            <Edit2 className="w-3.5 h-3.5 mr-1.5" /> {t("common.update")}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-8"
                            onClick={() => {
                              if (window.confirm(t("admin.team.confirm_delete"))) {
                                deleteMutation.mutate(member.id, {
                                  onSuccess: () => {
                                    setMessage(t("admin.team.delete_success"));
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
                  );
                })}
                {filteredMembers.length === 0 && (
                  <div className="p-8 text-center text-gray-500">{t("common.no_results")}</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    />
  );
}

function ContactsTab({
  setMessage,
  adminSearch,
  syncAdminSearch,
}: {
  setMessage: (msg: string) => void;
  adminSearch: string;
  syncAdminSearch: SyncAdminSearch;
}) {
  const { t } = useTranslation();
  const utils = trpc.useContext();
  const { data: contacts = [], isLoading } = trpc.contact.adminList.useQuery();
  const updateStatus = trpc.contact.updateStatus.useMutation();
  const [screenMode, setScreenMode] = useState<AdminEditorMode>("browse");
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [contactSearch, setContactSearch] = useState("");

  const selectedContact = useMemo(
    () => contacts.find((contact: any) => contact.id === selectedContactId) || null,
    [contacts, selectedContactId],
  );

  const filteredContacts = useMemo(
    () => contacts.filter((contact: any) => {
      const q = contactSearch.toLowerCase();
      return (
        (contact.subject || "").toLowerCase().includes(q)
        || (contact.email || "").toLowerCase().includes(q)
        || `${contact.firstName || ""} ${contact.lastName || ""}`.toLowerCase().includes(q)
      );
    }),
    [contacts, contactSearch],
  );

  const handleStatusChange = async (id: number, status: "nouveau" | "lu" | "traite") => {
    try {
      await updateStatus.mutateAsync({ id, status });
      await utils.contact.adminList.invalidate();
    } catch {
      setMessage(t("common.error_generic"));
    }
  };

  useEffect(() => {
    const mode = getAdminModeFromSearch(adminSearch);
    const id = getAdminIdFromSearch(adminSearch);

    if (mode === "view" && id !== null) {
      const contact = contacts.find((item: any) => item.id === id);
      if (contact) {
        setSelectedContactId(contact.id);
        setScreenMode("view");
        return;
      }
    }

    setSelectedContactId(null);
    setScreenMode("browse");
  }, [adminSearch, contacts]);

  const openContact = (contact: any) => {
    setSelectedContactId(contact.id);
    setScreenMode("view");
    syncAdminSearch((params) => {
      params.set("tab", "contacts");
      params.set("mode", "view");
      params.set("id", String(contact.id));
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeContact = () => {
    setSelectedContactId(null);
    setScreenMode("browse");
    syncAdminSearch((params) => {
      params.set("tab", "contacts");
      params.delete("mode");
      params.delete("id");
    });
  };

  return (
    <AdminWorkspace
      mode={screenMode}
      title={t("admin.sidebar.contacts")}
      collectionLabel={t("admin.workspace.collection_label")}
      description={t("admin.contacts.collection_description")}
      count={contacts.length}
      backLabel={t("admin.workspace.back_to_collection")}
      onBack={closeContact}
      editorBadge={t("admin.workspace.mode_view")}
      editorTitle={selectedContact?.subject || t("admin.contacts.title")}
      editorDescription={selectedContact ? `${selectedContact.firstName} ${selectedContact.lastName}` : t("admin.contacts.editor_description")}
      accentClassName="bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_42%),linear-gradient(180deg,#ffffff_0%,#f5f9ff_100%)]"
      editorContent={selectedContact ? (
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="text-xl text-[#1A361D]">{selectedContact.subject}</CardTitle>
                <CardDescription className="mt-2 text-sm text-gray-600">
                  {t("admin.contacts.label_from")}: {selectedContact.firstName} {selectedContact.lastName}
                </CardDescription>
              </div>
              <select
                value={selectedContact.status}
                onChange={(e) => handleStatusChange(selectedContact.id, e.target.value as any)}
                className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium"
              >
                <option value="nouveau">{t("admin.contacts.status.nouveau")}</option>
                <option value="lu">{t("admin.contacts.status.lu")}</option>
                <option value="traite">{t("admin.contacts.status.traite")}</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400"><Mail className="h-4 w-4" /> {t("admin.contacts.label_email")}</p>
                <p className="mt-3 text-sm font-semibold text-gray-800 break-all">{selectedContact.email}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400"><Phone className="h-4 w-4" /> {t("admin.contacts.label_phone")}</p>
                <p className="mt-3 text-sm font-semibold text-gray-800">{selectedContact.phone || "-"}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400"><Clock className="h-4 w-4" /> {t("admin.contacts.label_date")}</p>
                <p className="mt-3 text-sm font-semibold text-gray-800">{formatDate(selectedContact.createdAt)}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{t("admin.contacts.table_status")}</p>
                <p className="mt-3 text-sm font-semibold text-gray-800">{t(`admin.contacts.status.${selectedContact.status}`)}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{t("admin.contacts.label_message")}</p>
              <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-gray-700">{selectedContact.message}</div>
            </div>
          </CardContent>
        </Card>
      ) : <div />}
      collectionContent={(
        <Card className="overflow-hidden border border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-xl text-[#1A361D]">{t("admin.sidebar.contacts")} ({contacts.length})</CardTitle>
            <div className="relative mt-3 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={contactSearch}
                onChange={(e) => setContactSearch(e.target.value)}
                placeholder={t("admin.contacts.search_placeholder")}
                className="pl-9 h-10 bg-white"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 text-center text-gray-500">{t("admin.projects.loading")}</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredContacts.map((contact: any) => (
                  <div key={contact.id} className={`p-6 hover:bg-gray-50 ${contact.status === 'nouveau' ? 'bg-blue-50/30' : ''}`}>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <button type="button" className={`text-left text-lg hover:underline ${contact.status === 'nouveau' ? 'font-bold text-blue-900' : 'font-semibold text-gray-800'}`} onClick={() => openContact(contact)}>
                          {contact.subject}
                        </button>
                        <p className="mt-1 text-sm font-medium text-gray-500">{t("admin.contacts.label_from")}: {contact.firstName} {contact.lastName} ({contact.email})</p>
                        <p className="mt-4 line-clamp-3 text-sm text-gray-700">{contact.message}</p>
                      </div>
                      <div className="flex flex-col items-start gap-3 lg:items-end">
                        <select
                          value={contact.status}
                          onChange={(e) => handleStatusChange(contact.id, e.target.value as any)}
                          className={`text-sm rounded-full px-3 py-1 font-medium border ${contact.status === 'nouveau' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            contact.status === 'traite' ? 'bg-green-100 text-green-800 border-green-200' :
                              'bg-gray-100 text-gray-800 border-gray-200'
                            }`}
                        >
                          <option value="nouveau">{t("admin.contacts.status.nouveau")}</option>
                          <option value="lu">{t("admin.contacts.status.lu")}</option>
                          <option value="traite">{t("admin.contacts.status.traite")}</option>
                        </select>
                        <Button type="button" variant="outline" size="sm" onClick={() => openContact(contact)}>
                          {t("admin.contacts.open_details")}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredContacts.length === 0 && <div className="p-8 text-center text-gray-500">{t("admin.contacts.empty")}</div>}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    />
  );
}

function RegistrationsTab({
  setMessage,
  adminSearch,
  syncAdminSearch,
}: {
  setMessage: (msg: string) => void;
  adminSearch: string;
  syncAdminSearch: SyncAdminSearch;
}) {
  const { t } = useTranslation();
  const utils = trpc.useContext();
  const { data: registrations = [], isLoading } = trpc.registration.adminList.useQuery();
  const updateStatus = trpc.registration.updateStatus.useMutation();
  const [screenMode, setScreenMode] = useState<AdminEditorMode>("browse");
  const [selectedRegistrationId, setSelectedRegistrationId] = useState<number | null>(null);
  const [registrationSearch, setRegistrationSearch] = useState("");

  const selectedRegistration = useMemo(
    () => registrations.find((registration: any) => registration.id === selectedRegistrationId) || null,
    [registrations, selectedRegistrationId],
  );

  const filteredRegistrations = useMemo(
    () => registrations.filter((reg: any) => {
      const q = registrationSearch.toLowerCase();
      return (
        `${reg.firstName || ""} ${reg.lastName || ""}`.toLowerCase().includes(q)
        || (reg.email || "").toLowerCase().includes(q)
        || (reg.organization || "").toLowerCase().includes(q)
        || (reg.city || "").toLowerCase().includes(q)
      );
    }),
    [registrations, registrationSearch],
  );

  const handleStatusChange = async (id: number, status: "nouveau" | "contacte" | "actif" | "inactif") => {
    try {
      await updateStatus.mutateAsync({ id, status });
      await utils.registration.adminList.invalidate();
    } catch {
      setMessage(t("common.error_generic"));
    }
  };

  useEffect(() => {
    const mode = getAdminModeFromSearch(adminSearch);
    const id = getAdminIdFromSearch(adminSearch);

    if (mode === "view" && id !== null) {
      const registration = registrations.find((item: any) => item.id === id);
      if (registration) {
        setSelectedRegistrationId(registration.id);
        setScreenMode("view");
        return;
      }
    }

    setSelectedRegistrationId(null);
    setScreenMode("browse");
  }, [adminSearch, registrations]);

  const openRegistration = (registration: any) => {
    setSelectedRegistrationId(registration.id);
    setScreenMode("view");
    syncAdminSearch((params) => {
      params.set("tab", "registrations");
      params.set("mode", "view");
      params.set("id", String(registration.id));
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeRegistration = () => {
    setSelectedRegistrationId(null);
    setScreenMode("browse");
    syncAdminSearch((params) => {
      params.set("tab", "registrations");
      params.delete("mode");
      params.delete("id");
    });
  };

  return (
    <AdminWorkspace
      mode={screenMode}
      title={t("admin.sidebar.registrations")}
      collectionLabel={t("admin.workspace.collection_label")}
      description={t("admin.registrations.collection_description")}
      count={registrations.length}
      backLabel={t("admin.workspace.back_to_collection")}
      onBack={closeRegistration}
      editorBadge={t("admin.workspace.mode_view")}
      editorTitle={selectedRegistration ? `${selectedRegistration.firstName} ${selectedRegistration.lastName}` : t("admin.registrations.title")}
      editorDescription={selectedRegistration ? t(`admin.registrations.type.${selectedRegistration.type}`) : t("admin.registrations.editor_description")}
      accentClassName="bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.14),_transparent_42%),linear-gradient(180deg,#ffffff_0%,#fbf7ff_100%)]"
      editorContent={selectedRegistration ? (
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="text-xl text-[#1A361D]">{selectedRegistration.firstName} {selectedRegistration.lastName}</CardTitle>
                <CardDescription className="mt-2 text-sm text-gray-600">
                  {selectedRegistration.organization || t(`admin.registrations.type.${selectedRegistration.type}`)}
                </CardDescription>
              </div>
              <select
                value={selectedRegistration.status}
                onChange={(e) => handleStatusChange(selectedRegistration.id, e.target.value as any)}
                className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium"
              >
                <option value="nouveau">{t("admin.registrations.status.nouveau")}</option>
                <option value="contacte">{t("admin.registrations.status.contacte")}</option>
                <option value="actif">{t("admin.registrations.status.actif")}</option>
                <option value="inactif">{t("admin.registrations.status.inactif")}</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400"><Mail className="h-4 w-4" /> {t("admin.registrations.label_email")}</p>
                <p className="mt-3 text-sm font-semibold text-gray-800 break-all">{selectedRegistration.email}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400"><Phone className="h-4 w-4" /> {t("admin.registrations.label_phone")}</p>
                <p className="mt-3 text-sm font-semibold text-gray-800">{selectedRegistration.phone || "-"}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400"><MapPin className="h-4 w-4" /> {t("admin.registrations.label_location")}</p>
                <p className="mt-3 text-sm font-semibold text-gray-800">{selectedRegistration.city || "-"}, {selectedRegistration.country || "-"}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400"><Clock className="h-4 w-4" /> {t("admin.registrations.label_date")}</p>
                <p className="mt-3 text-sm font-semibold text-gray-800">{formatDate(selectedRegistration.createdAt)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{t("admin.registrations.label_type")}</p>
                <p className="mt-3 text-sm font-semibold text-gray-800">{t(`admin.registrations.type.${selectedRegistration.type}`)}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400"><Building2 className="h-4 w-4" /> {t("admin.registrations.label_organization")}</p>
                <p className="mt-3 text-sm font-semibold text-gray-800">{selectedRegistration.organization || "-"}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{t("admin.registrations.label_availability")}</p>
                <p className="mt-3 text-sm font-semibold text-gray-800">{selectedRegistration.availability || "-"}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{t("admin.registrations.table_status")}</p>
                <p className="mt-3 text-sm font-semibold text-gray-800">{t(`admin.registrations.status.${selectedRegistration.status}`)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{t("admin.registrations.label_motivation")}</p>
                <p className="mt-4 text-sm leading-7 text-gray-700">{selectedRegistration.motivation || "-"}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{t("admin.registrations.label_skills")}</p>
                <p className="mt-4 text-sm leading-7 text-gray-700">{selectedRegistration.skills || "-"}</p>
              </div>
            </div>

            {(selectedRegistration.partnerType || selectedRegistration.website) && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{t("admin.registrations.label_partner_type")}</p>
                  <p className="mt-4 text-sm leading-7 text-gray-700">{selectedRegistration.partnerType || "-"}</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400"><Globe className="h-4 w-4" /> {t("admin.registrations.label_website")}</p>
                  <p className="mt-4 break-all text-sm leading-7 text-gray-700">{selectedRegistration.website || "-"}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : <div />}
      collectionContent={(
        <Card className="overflow-hidden border border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-xl text-[#1A361D]">{t("admin.sidebar.registrations")} ({registrations.length})</CardTitle>
            <div className="relative mt-3 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={registrationSearch}
                onChange={(e) => setRegistrationSearch(e.target.value)}
                placeholder={t("admin.registrations.search_placeholder")}
                className="pl-9 h-10 bg-white"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 text-center text-gray-500">{t("admin.projects.loading")}</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredRegistrations.map((reg: any) => (
                  <div key={reg.id} className={`p-6 hover:bg-gray-50 ${reg.status === 'nouveau' ? 'bg-purple-50/30' : ''}`}>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${reg.type === 'benevole' ? 'bg-orange-100 text-orange-800' : 'bg-teal-100 text-teal-800'}`}>
                            {t(`admin.registrations.type.${reg.type}`)}
                          </span>
                          <button type="button" className="text-left text-lg font-bold text-gray-800 hover:underline" onClick={() => openRegistration(reg)}>
                            {reg.firstName} {reg.lastName} {reg.organization ? `(${reg.organization})` : ""}
                          </button>
                        </div>
                        <p className="text-sm font-medium text-gray-500">{t("admin.registrations.label_contact")}: {reg.email} {reg.phone ? `| ${reg.phone}` : ""} | {t("admin.registrations.label_location")}: {reg.city}, {reg.country}</p>
                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                          {reg.motivation && <p className="line-clamp-3 text-sm text-gray-700">{reg.motivation}</p>}
                          {reg.skills && <p className="line-clamp-3 text-sm text-gray-700">{reg.skills}</p>}
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-3 lg:items-end">
                        <select
                          value={reg.status}
                          onChange={(e) => handleStatusChange(reg.id, e.target.value as any)}
                          className={`text-sm rounded-full px-3 py-1 font-medium border ${reg.status === 'nouveau' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                            reg.status === 'actif' ? 'bg-green-100 text-green-800 border-green-200' :
                              'bg-gray-100 text-gray-800 border-gray-200'
                            }`}
                        >
                          <option value="nouveau">{t("admin.registrations.status.nouveau")}</option>
                          <option value="contacte">{t("admin.registrations.status.contacte")}</option>
                          <option value="actif">{t("admin.registrations.status.actif")}</option>
                          <option value="inactif">{t("admin.registrations.status.inactif")}</option>
                        </select>
                        <Button type="button" variant="outline" size="sm" onClick={() => openRegistration(reg)}>
                          {t("admin.registrations.open_details")}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredRegistrations.length === 0 && <div className="p-8 text-center text-gray-500">{t("admin.registrations.empty")}</div>}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    />
  );
}
