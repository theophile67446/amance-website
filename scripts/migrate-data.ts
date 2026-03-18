/**
 * Script de migration des données hardcodées vers la base de données
 * Usage: npx tsx scripts/migrate-data.ts
 */

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { articles, projects } from "../drizzle/schema";

// Données d'articles hardcodées actuellement dans ActualiteDetail.tsx
const articlesData = [
  {
    slug: "distribution-alimentaire-nord-ouest",
    title: "Distribution alimentaire d'urgence dans la région du Nord-Ouest",
    excerpt: "Distribution d'aide alimentaire pour plus de 200 familles déplacées",
    content: "L'équipe AMANCE a organisé une distribution d'aide alimentaire pour plus de 200 familles déplacées dans la région du Nord-Ouest du Cameroun. Cette opération s'inscrit dans notre engagement continu à soulager les souffrances des populations vulnérables.\n\nLes denrées distribuées incluent du riz, de l'huile, du sel et d'autres produits de première nécessité. Nous remercions chaleureusement nos partenaires et bénévoles pour leur dévouement exemplaire lors de cette mission complexe.",
    coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80",
    category: "terrain" as const,
    author: "Équipe AMANCE",
    published: true,
    publishedAt: new Date("2026-03-15"),
  },
  {
    slug: "reboisement-buea",
    title: "Lancement du programme de reboisement à Buea",
    excerpt: "Programme ambitieux de reboisement de 50 hectares de forêt dégradée",
    content: "En partenariat avec les autorités locales et les communautés riveraines, AMANCE lance un programme ambitieux de reboisement visant à restaurer 50 hectares de forêt dégradée dans la région du Mont Cameroun.\n\nCe projet ne se limite pas à la plantation d'arbres ; il intègre également une forte dimension éducative visant à sensibiliser les jeunes générations à l'importance de la préservation de notre écosystème unique.",
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80",
    category: "terrain" as const,
    author: "Ngueping Samuel",
    published: true,
    publishedAt: new Date("2026-03-08"),
  },
  {
    slug: "formation-agroforesterie",
    title: "Formation en agroforesterie pour 80 agriculteurs",
    excerpt: "Formation aux techniques d'agroforesterie durable pour agriculteurs ruraux",
    content: "AMANCE a formé 80 agriculteurs des communautés rurales aux techniques d'agroforesterie durable, combinant production alimentaire et protection de l'environnement.\n\nL'agroforesterie représente une solution d'avenir pour l'agriculture locale. En associant arbres et cultures, les agriculteurs améliorent la fertilité des sols tout en augmentant leurs rendements à moyen et long terme.",
    coverImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80",
    category: "terrain" as const,
    author: "Équipe AMANCE",
    published: true,
    publishedAt: new Date("2026-03-01"),
  },
  {
    slug: "journee-mondiale-eau",
    title: "AMANCE célèbre la Journée Mondiale de l'Eau",
    excerpt: "Campagnes de sensibilisation sur la gestion durable des ressources en eau",
    content: "À l'occasion de la Journée Mondiale de l'Eau, AMANCE a organisé des campagnes de sensibilisation dans 5 villages de la région du Sud-Ouest sur la gestion durable des ressources en eau.\n\nL'accès à une eau propre reste un défi majeur dans de nombreuses zones rurales. Nos équipes ont animé des ateliers sur les bonnes pratiques d'hygiène et les méthodes de purification de l'eau.",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80",
    category: "actualites" as const,
    author: "Ekanya Georgette",
    published: true,
    publishedAt: new Date("2026-03-22"),
  },
  {
    slug: "rapport-annuel-2025",
    title: "Publication du Rapport d'Activités 2025",
    excerpt: "Rapport annuel d'activités 2025 avec plus de 10 000 bénéficiaires",
    content: "AMANCE publie son rapport annuel d'activités 2025, témoignant d'une année riche en actions, en défis surmontés et en vies transformées. Plus de 10 000 personnes ont bénéficié de nos programmes.\n\nNous vous invitons à consulter ce document exhaustif qui détaille notre impact dans les domaines de la santé, de l'éducation, et de la conservation environnementale.",
    coverImage: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=80",
    category: "rapport" as const,
    author: "Gwei Kilah Etienne",
    published: true,
    publishedAt: new Date("2026-02-28"),
  },
  {
    slug: "partenariat-ong-internationale",
    title: "Nouveau partenariat avec une ONG internationale",
    excerpt: "Accord de partenariat stratégique pour renforcer les interventions",
    content: "AMANCE annonce la signature d'un accord de partenariat stratégique avec une ONG internationale pour renforcer ses capacités d'intervention dans le domaine de la conservation environnementale.\n\nCette collaboration nous permettra de déployer de nouvelles technologies pour le suivi écologique et d'étendre nos zones d'intervention pour la protection des espèces menacées.",
    coverImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80",
    category: "communique" as const,
    author: "Ngueping Samuel",
    published: true,
    publishedAt: new Date("2026-02-20"),
  },
];

// Données de projets hardcodées actuellement dans ProjetDetail.tsx
const projectsData = [
  {
    slug: "la-foret-de-demain",
    title: "La Forêt de Demain",
    description: "Programme ambitieux de reboisement et de conservation de la biodiversité dans la région du Mont Cameroun. Ce projet combine protection de l'environnement et développement économique local par l'agroforesterie.",
    fullDescription: "Notre objectif est de restaurer durablement les écosystèmes forestiers tout en responsabilisant les communautés environnantes pour une gestion responsable des ressources naturelles.",
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80",
    category: "conservation" as const,
    status: "en_cours" as const,
    location: "Région du Sud-Ouest, Buea",
    startDate: new Date("2024-01-01"),
    beneficiaries: 200,
    impact: JSON.stringify([
      { value: "50 ha", label: "Reboisés" },
      { value: "80", label: "Agriculteurs formés" },
      { value: "200", label: "Familles bénéficiaires" },
    ]),
    featured: true,
  },
  {
    slug: "aide-alimentaire-urgence",
    title: "Aide Alimentaire d'Urgence",
    description: "Distribution régulière d'aide alimentaire aux familles déplacées et aux personnes vulnérables dans les régions affectées par les crises humanitaires au Cameroun.",
    fullDescription: "En collaboration avec nos partenaires locaux, nous avons pu fournir des produits de première nécessité à ceux qui en ont le plus besoin, tout en garantissant un suivi sur le long terme.",
    coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80",
    category: "humanitaire" as const,
    status: "en_cours" as const,
    location: "Régions du Nord-Ouest et du Sud-Ouest",
    startDate: new Date("2024-03-01"),
    beneficiaries: 2500,
    impact: JSON.stringify([
      { value: "500+", label: "Familles assistées" },
      { value: "2 500+", label: "Personnes nourries" },
      { value: "12", label: "Distributions organisées" },
    ]),
    featured: false,
  },
  {
    slug: "sante-communautaire-rurale",
    title: "Santé Communautaire Rurale",
    description: "Amélioration de l'accès aux soins de santé primaires dans les zones rurales de la région du Sud-Ouest. Formation de relais communautaires et campagnes de prévention.",
    fullDescription: "Ce programme novateur décentralise les soins et donne aux communautés les outils pour prévenir les maladies courantes en améliorant l'hygiène et l'assainissement.",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80",
    category: "sante" as const,
    status: "en_cours" as const,
    location: "Arrondissement de Buea",
    startDate: new Date("2024-06-01"),
    beneficiaries: 800,
    impact: JSON.stringify([
      { value: "2 000+", label: "Consultations facilitées" },
      { value: "50+", label: "Relais formés" },
      { value: "800+", label: "Femmes et enfants" },
    ]),
    featured: false,
  },
  {
    slug: "ecoles-vertes",
    title: "Écoles Vertes",
    description: "Programme d'éducation environnementale dans les écoles primaires et secondaires de la région. Sensibilisation à la biodiversité, au changement climatique et aux gestes écologiques.",
    fullDescription: "En ciblant la jeunesse, nous formons les leaders de demain et leur inculquons l'importance de préserver et valoriser leur riche patrimoine naturel.",
    coverImage: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=80",
    category: "conservation" as const,
    status: "en_cours" as const,
    location: "Écoles primaires de Buea",
    startDate: new Date("2024-09-01"),
    beneficiaries: 1000,
    impact: JSON.stringify([
      { value: "1 000+", label: "Élèves sensibilisés" },
      { value: "15", label: "Écoles partenaires" },
      { value: "30+", label: "Enseignants formés" },
    ]),
    featured: true,
  },
  {
    slug: "agroforesterie-durable",
    title: "Agroforesterie Durable",
    description: "Formation des agriculteurs aux techniques d'agroforesterie permettant de combiner production alimentaire, génération de revenus et protection de l'environnement.",
    fullDescription: "Ce projet démontre qu'il est possible de concilier développement socio-économique et respect de la nature dans une approche de croissance verte et pérenne.",
    coverImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80",
    category: "communautaire" as const,
    status: "en_cours" as const,
    location: "Villages ruraux, Région du Centre",
    startDate: new Date("2024-10-01"),
    beneficiaries: 200,
    impact: JSON.stringify([
      { value: "80", label: "Agriculteurs formés" },
      { value: "200", label: "Familles bénéficiaires" },
      { value: "30%", label: "Hausse des revenus" },
    ]),
    featured: false,
  },
  {
    slug: "soutien-enfants-vulnerables",
    title: "Soutien aux Enfants Vulnérables",
    description: "Programme de soutien scolaire, alimentaire et psychosocial aux enfants orphelins, déplacés et en situation de vulnérabilité dans la région du Sud-Ouest.",
    fullDescription: "Nous mettons l'accent sur la résilience et nous efforçons de créer un environnement bienveillant pour ces enfants confrontés à des traumatismes multiples.",
    coverImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80",
    category: "humanitaire" as const,
    status: "en_cours" as const,
    location: "Buea et environs",
    startDate: new Date("2025-01-01"),
    beneficiaries: 1200,
    impact: JSON.stringify([
      { value: "1 200+", label: "Enfants soutenus" },
      { value: "300+", label: "Kits scolaires distribués" },
      { value: "50+", label: "Familles d'accueil" },
    ]),
    featured: true,
  },
];

async function migrate() {
  try {
    console.log("🚀 Démarrage de la migration des données...\n");

    // Créer la connexion
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    const db = drizzle(connection);

    // Insérer les articles
    console.log("📝 Migration des articles...");
    for (const article of articlesData) {
      try {
        await db.insert(articles).values(article).onDuplicateKeyUpdate({
          set: article,
        });
        console.log(`  ✅ ${article.title}`);
      } catch (error) {
        console.error(`  ❌ Erreur pour ${article.title}:`, error);
      }
    }

    // Insérer les projets
    console.log("\n🚀 Migration des projets...");
    for (const project of projectsData) {
      try {
        await db.insert(projects).values(project).onDuplicateKeyUpdate({
          set: project,
        });
        console.log(`  ✅ ${project.title}`);
      } catch (error) {
        console.error(`  ❌ Erreur pour ${project.title}:`, error);
      }
    }

    console.log("\n✨ Migration terminée avec succès !");
    console.log(`✅ ${articlesData.length} articles migré(s)`);
    console.log(`✅ ${projectsData.length} projets migré(s)`);

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur lors de la migration:", error);
    process.exit(1);
  }
}

migrate();
