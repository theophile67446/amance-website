import { useState } from "react";
import { useLocation } from "wouter";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Edit2, Trash2, AlertCircle } from "lucide-react";

export default function Admin() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("articles");
  const [message, setMessage] = useState("");

  // Vérifier que l'utilisateur est admin
  if (!user || user.role !== "admin") {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Accès refusé. Seuls les administrateurs peuvent accéder à cette page.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Tableau d'Administration
          </h1>
          <p className="text-gray-600">Gérez vos articles, projets et pages</p>
        </div>

        {message && (
          <Alert className="mb-6">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="projets">Projets</TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <ArticlesTab setMessage={setMessage} />
          </TabsContent>

          <TabsContent value="projets">
            <ProjetsTab setMessage={setMessage} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

function ArticlesTab({ setMessage }: { setMessage: (msg: string) => void }) {
  const { data: articles = [] } = trpc.articles.list.useQuery({});
  const createMutation = trpc.articles.create.useMutation();
  const deleteMutation = trpc.articles.delete.useMutation();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "actualites" as const,
    author: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync(form);
      setMessage("✅ Article créé avec succès!");
      setForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        category: "actualites",
        author: "",
      });
    } catch (error) {
      setMessage("❌ Erreur lors de la création");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Formulaire */}
      <Card>
        <CardHeader>
          <CardTitle>Créer un Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Catégorie</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="actualites">Actualités</option>
                <option value="terrain">Terrain</option>
                <option value="rapport">Rapport</option>
                <option value="communique">Communiqué</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Résumé</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full px-3 py-2 border rounded-md h-20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contenu</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-3 py-2 border rounded-md h-32"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image de couverture (URL)</label>
              <Input
                value={form.coverImage}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <Button type="submit" className="w-full" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Création..." : "Créer Article"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Liste */}
      <Card>
        <CardHeader>
          <CardTitle>Articles Récents</CardTitle>
          <CardDescription>{articles.length} articles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {articles.map((article) => (
              <div
                key={article.id}
                className="p-3 border rounded-lg flex justify-between items-start"
              >
                <div className="flex-1">
                  <p className="font-semibold">{article.title}</p>
                  <p className="text-xs text-gray-500">{article.category}</p>
                </div>
                <button
                  onClick={() => deleteMutation.mutate(article.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProjetsTab({ setMessage }: { setMessage: (msg: string) => void }) {
  const { data: projects = [] } = trpc.projects.list.useQuery();
  const createMutation = trpc.projects.create.useMutation();
  const deleteMutation = trpc.projects.delete.useMutation();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    fullDescription: "",
    coverImage: "",
    category: "humanitaire" as const,
    location: "",
    beneficiaries: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync(form);
      setMessage("✅ Projet créé avec succès!");
      setForm({
        title: "",
        slug: "",
        description: "",
        fullDescription: "",
        coverImage: "",
        category: "humanitaire",
        location: "",
        beneficiaries: 0,
      });
    } catch (error) {
      setMessage("❌ Erreur lors de la création");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Formulaire */}
      <Card>
        <CardHeader>
          <CardTitle>Créer un Projet</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Catégorie</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="humanitaire">Humanitaire</option>
                <option value="sante">Santé</option>
                <option value="communautaire">Communautaire</option>
                <option value="conservation">Conservation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description courte</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md h-20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Localisation</label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Création..." : "Créer Projet"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Liste */}
      <Card>
        <CardHeader>
          <CardTitle>Projets</CardTitle>
          <CardDescription>{projects.length} projets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-3 border rounded-lg flex justify-between items-start"
              >
                <div className="flex-1">
                  <p className="font-semibold">{project.title}</p>
                  <p className="text-xs text-gray-500">{project.category}</p>
                </div>
                <button
                  onClick={() => deleteMutation.mutate(project.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
