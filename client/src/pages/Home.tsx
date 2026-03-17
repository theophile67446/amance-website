import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import {
  Heart,
  Users,
  Leaf,
  Stethoscope,
  Home as HomeIcon,
  ArrowRight,
  Quote,
  ChevronRight,
  TreePine,
  HandHeart,
  Building2,
  Globe,
  Star,
  Play,
} from "lucide-react";

// Unsplash images for demo - African/Cameroon context
const HERO_IMAGE = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80";
const PROJECT_IMAGE = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80";
const TESTIMONIAL_IMAGE = "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80";
const NEWS_1 = "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80";
const NEWS_2 = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80";
const NEWS_3 = "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80";

// Animated counter hook
function useCounter(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// Intersection Observer hook
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const domains = [
  {
    icon: HandHeart,
    title: "Aide Humanitaire & Sociale",
    description:
      "Nous apportons une assistance directe aux personnes en situation de précarité : nourriture, abri, soutien psychosocial et aide matérielle d'urgence.",
    color: "var(--amance-green)",
    href: "/nos-actions#humanitaire",
  },
  {
    icon: Stethoscope,
    title: "Santé & Bien-être",
    description:
      "Faciliter l'accès aux soins de santé de base, à l'éducation à l'hygiène et au bien-être pour les communautés rurales et les populations vulnérables.",
    color: "var(--amance-blue)",
    href: "/nos-actions#sante",
  },
  {
    icon: HomeIcon,
    title: "Développement Communautaire",
    description:
      "Renforcer l'autonomie des communautés locales par des projets de développement durable, l'éducation, la formation professionnelle et l'entrepreneuriat.",
    color: "var(--amance-green-dark)",
    href: "/nos-actions#communautaire",
  },
  {
    icon: TreePine,
    title: "Conservation Environnementale",
    description:
      "Protéger la faune et la flore exceptionnelles du Cameroun à travers des programmes d'éducation environnementale et de conservation active de la biodiversité.",
    color: "var(--amance-blue-light)",
    href: "/nos-actions#conservation",
  },
];

const stats = [
  { value: 10000, suffix: "+", label: "Personnes Aidées", icon: Users },
  { value: 5, suffix: "+", label: "Projets de Conservation", icon: Leaf },
  { value: 500, suffix: "+", label: "Familles Accompagnées", icon: Heart },
  { value: 95, suffix: "%", label: "Dons Alloués au Terrain", icon: Globe },
];

const newsItems = [
  {
    image: NEWS_1,
    category: "Terrain",
    date: "15 Mars 2026",
    title: "Distribution alimentaire d'urgence dans la région du Nord-Ouest",
    excerpt:
      "L'équipe AMANCE a organisé une distribution d'aide alimentaire pour plus de 200 familles déplacées dans la région du Nord-Ouest du Cameroun.",
    href: "/actualites/distribution-alimentaire-nord-ouest",
  },
  {
    image: NEWS_2,
    category: "Conservation",
    date: "8 Mars 2026",
    title: "Lancement du programme de reboisement à Buea",
    excerpt:
      "En partenariat avec les autorités locales, AMANCE lance un programme ambitieux de reboisement visant à restaurer 50 hectares de forêt dégradée.",
    href: "/actualites/reboisement-buea",
  },
  {
    image: NEWS_3,
    category: "Communauté",
    date: "1 Mars 2026",
    title: "Formation en agroforesterie pour 80 agriculteurs",
    excerpt:
      "AMANCE a formé 80 agriculteurs des communautés rurales aux techniques d'agroforesterie durable, combinant production alimentaire et protection de l'environnement.",
    href: "/actualites/formation-agroforesterie",
  },
];

const helpWays = [
  {
    icon: Heart,
    title: "Faire un Don",
    description:
      "Votre soutien financier est vital. Il nous permet de planifier nos actions, de répondre aux urgences et de garantir la pérennité de nos projets sur le terrain.",
    cta: "Je Donne Maintenant",
    href: "/faire-un-don",
    primary: true,
    bg: "var(--amance-green)",
  },
  {
    icon: Building2,
    title: "Devenir Partenaire",
    description:
      "Institutions, entreprises, ONG : unissons nos forces pour un impact démultiplié. Contactez-nous pour explorer les synergies et opportunités de collaboration.",
    cta: "Devenir Partenaire",
    href: "/s-impliquer#partenaire",
    primary: false,
    bg: "var(--amance-blue)",
  },
  {
    icon: Users,
    title: "Devenir Bénévole",
    description:
      "Offrez votre temps et vos compétences. Rejoignez une équipe passionnée et vivez une expérience humaine et professionnelle inoubliable sur le terrain au Cameroun.",
    cta: "Rejoindre nos Bénévoles",
    href: "/s-impliquer#benevole",
    primary: false,
    bg: "var(--amance-green-dark)",
  },
];

export default function Home() {
  const { ref: statsRef, inView: statsInView } = useInView();
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(22,36,71,0.92) 0%, rgba(28,58,95,0.85) 50%, rgba(42,100,60,0.75) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white mb-6 transition-all duration-700 ${
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
            >
              <Star size={14} fill="currentColor" style={{ color: "var(--amance-green-light)" }} />
              ONG Camerounaise — Buea, Sud-Ouest
            </div>

            {/* Main Title */}
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 transition-all duration-700 delay-100 ${
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Agir pour{" "}
              <span style={{ color: "var(--amance-green-light)" }}>l'Humain</span>
              <br />
              et la{" "}
              <span style={{ color: "var(--amance-green-light)" }}>Nature</span>
              <br />
              au Cameroun.
            </h1>

            {/* Subtitle */}
            <p
              className={`text-lg md:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl transition-all duration-700 delay-200 ${
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ fontFamily: "Open Sans, sans-serif" }}
            >
              AMANCE s'engage à soulager les souffrances des plus vulnérables et à préserver la
              biodiversité unique du Cameroun. Ensemble, construisons un avenir durable et digne pour tous.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="/faire-un-don"
                className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
              >
                <Heart size={18} fill="white" />
                Faire un Don
              </Link>
              <Link
                href="/nos-actions"
                className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white border-2 border-white transition-all duration-300 hover:bg-white hover:-translate-y-1"
                style={{ fontFamily: "Montserrat, sans-serif" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--amance-blue)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "white";
                }}
              >
                Découvrir nos actions
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Quick Stats */}
            <div
              className={`flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20 transition-all duration-700 delay-500 ${
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {[
                { value: "10 000+", label: "Bénéficiaires" },
                { value: "5+", label: "Projets actifs" },
                { value: "2024", label: "Fondée en" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl font-extrabold text-white"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-green-light)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs uppercase tracking-widest">Défiler</span>
          <div className="w-0.5 h-8 bg-white/30 rounded-full animate-pulse" />
        </div>
      </section>

      {/* ===== SECTION 2: DOMAINES D'INTERVENTION ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: "rgba(82,180,82,0.1)", color: "var(--amance-green)" }}
            >
              <Leaf size={14} />
              Nos Domaines d'Action
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-4"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
            >
              Notre Engagement sur le Terrain
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
              Quatre piliers d'action complémentaires pour un impact global, durable et mesurable
              sur les communautés camerounaises.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((domain, i) => {
              const Icon = domain.icon;
              return (
                <Link
                  key={i}
                  href={domain.href}
                  className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${domain.color}15` }}
                  >
                    <Icon size={28} style={{ color: domain.color }} />
                  </div>
                  <h3
                    className="text-base font-bold mb-3"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                  >
                    {domain.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {domain.description}
                  </p>
                  <div
                    className="flex items-center gap-1 mt-4 text-sm font-semibold transition-colors"
                    style={{ color: domain.color }}
                  >
                    En savoir plus <ChevronRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: IMPACT EN CHIFFRES ===== */}
      <section
        ref={statsRef}
        className="py-24"
        style={{ background: "linear-gradient(135deg, var(--amance-blue-dark) 0%, var(--amance-blue) 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <Star size={14} fill="currentColor" />
              Notre Impact
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-white mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Un Impact Concret, Mesurable et Durable
            </h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
              Chaque action compte. Chaque don transforme des vies. Voici ce que nous avons accompli ensemble.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const count = useCounter(stat.value, 2000, statsInView);
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <div
                    className="text-4xl md:text-5xl font-extrabold text-white mb-2"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-green-light)" }}
                  >
                    {count.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-blue-200 text-sm font-medium" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: PROJET PHARE ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={PROJECT_IMAGE}
                  alt="Projet de reboisement AMANCE"
                  className="w-full h-80 lg:h-96 object-cover"
                />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 max-w-[200px]"
              >
                <div
                  className="text-2xl font-extrabold mb-1"
                  style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-green)" }}
                >
                  50 ha
                </div>
                <div className="text-xs text-gray-600">de forêt reboisée dans la région de l'Est</div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ backgroundColor: "rgba(82,180,82,0.1)", color: "var(--amance-green)" }}
              >
                <TreePine size={14} />
                Projet à la Une
              </div>
              <h2
                className="text-3xl md:text-4xl font-extrabold mb-6"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
              >
                La Forêt de Demain
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6" style={{ fontFamily: "Open Sans, sans-serif" }}>
                Au cœur des forêts camerounaises, notre projet phare de conservation et de reboisement
                combine protection de la biodiversité et développement économique local. Nous formons
                les communautés rurales à l'agroforesterie durable, créant ainsi un modèle réplicable
                à l'échelle nationale.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: "Open Sans, sans-serif" }}>
                Ce projet a déjà permis de reboiser plus de 50 hectares de forêt dégradée, de former
                80 agriculteurs et d'améliorer les revenus de 200 familles rurales. Il s'inscrit
                directement dans les Objectifs de Développement Durable (ODD 13, 15) des Nations Unies.
              </p>

              {/* Impact metrics */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: "50 ha", label: "Reboisés" },
                  { value: "80", label: "Agriculteurs formés" },
                  { value: "200", label: "Familles bénéficiaires" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="text-center p-3 rounded-xl"
                    style={{ backgroundColor: "rgba(82,180,82,0.08)" }}
                  >
                    <div
                      className="text-xl font-extrabold"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-green)" }}
                    >
                      {m.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              <Link
                href="/projets/la-foret-de-demain"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg"
                style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
              >
                En savoir plus sur ce projet
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: COMMENT AIDER ===== */}
      <section className="py-24 bg-amance-gray-light" style={{ backgroundColor: "oklch(0.97 0.005 240)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: "rgba(82,180,82,0.1)", color: "var(--amance-green)" }}
            >
              <HandHeart size={14} />
              Agir Ensemble
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-4"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
            >
              Rejoignez-nous. Chaque Geste Compte.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
              Que vous soyez un particulier, une entreprise ou une institution, il existe un moyen
              de contribuer à notre mission et d'amplifier notre impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {helpWays.map((way, i) => {
              const Icon = way.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: way.bg }}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                  >
                    {way.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed flex-1 mb-6" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {way.description}
                  </p>
                  <Link
                    href={way.href}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: way.bg, fontFamily: "Montserrat, sans-serif" }}
                  >
                    {way.cta}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: ACTUALITÉS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "rgba(82,180,82,0.1)", color: "var(--amance-green)" }}
              >
                <Globe size={14} />
                Actualités
              </div>
              <h2
                className="text-3xl md:text-4xl font-extrabold"
                style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
              >
                Nos Dernières Actualités
              </h2>
            </div>
            <Link
              href="/actualites"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-300 hover:text-white flex-shrink-0"
              style={{
                borderColor: "var(--amance-green)",
                color: "var(--amance-green)",
                fontFamily: "Montserrat, sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--amance-green)";
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "";
                (e.currentTarget as HTMLElement).style.color = "var(--amance-green)";
              }}
            >
              Toutes les actualités <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((news, i) => (
              <Link
                key={i}
                href={news.href}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: "var(--amance-green)" }}
                  >
                    {news.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {news.date}
                  </p>
                  <h3
                    className="text-base font-bold mb-3 line-clamp-2 group-hover:text-amance-green transition-colors"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                  >
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {news.excerpt}
                  </p>
                  <div
                    className="flex items-center gap-1 mt-4 text-sm font-semibold"
                    style={{ color: "var(--amance-green)" }}
                  >
                    Lire la suite <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: TÉMOIGNAGE ===== */}
      <section
        className="py-24"
        style={{ background: "linear-gradient(135deg, oklch(0.97 0.005 240) 0%, oklch(0.93 0.04 145) 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
            style={{ backgroundColor: "rgba(82,180,82,0.1)", color: "var(--amance-green)" }}
          >
            <Quote size={14} />
            Témoignages
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-10 md:p-14 relative">
            <Quote
              size={48}
              className="absolute top-6 left-8 opacity-10"
              style={{ color: "var(--amance-green)" }}
            />
            <blockquote
              className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic relative z-10"
              style={{ fontFamily: "Open Sans, sans-serif" }}
            >
              "Grâce à AMANCE, j'ai pu suivre une formation en agriculture durable. Aujourd'hui,
              je nourris ma famille et vends mes récoltes au marché local. Ils n'ont pas seulement
              changé ma vie — ils ont redonné espoir à tout notre village."
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <img
                src={TESTIMONIAL_IMAGE}
                alt="Marie, bénéficiaire"
                className="w-14 h-14 rounded-full object-cover border-4"
                style={{ borderColor: "var(--amance-green)" }}
              />
              <div className="text-left">
                <div
                  className="font-bold text-base"
                  style={{ fontFamily: "Montserrat, sans-serif", color: "var(--amance-blue)" }}
                >
                  Marie Ngono
                </div>
                <div className="text-sm text-gray-500" style={{ fontFamily: "Open Sans, sans-serif" }}>
                  Bénéficiaire — Programme de développement communautaire, Région du Centre
                </div>
              </div>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mt-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} fill="currentColor" style={{ color: "var(--amance-green)" }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: CALL TO ACTION FINAL ===== */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, var(--amance-blue-dark) 0%, var(--amance-blue) 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Ensemble, nous pouvons faire la différence.
          </h2>
          <p className="text-lg text-blue-200 mb-10 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, sans-serif" }}>
            Rejoignez AMANCE et contribuez à construire un Cameroun plus juste, plus sain et plus vert.
            Chaque contribution, grande ou petite, a un impact réel sur des vies réelles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/faire-un-don"
              className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 shadow-lg"
              style={{ backgroundColor: "var(--amance-green)", fontFamily: "Montserrat, sans-serif" }}
            >
              <Heart size={18} fill="white" />
              Faire un Don Maintenant
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white border-2 border-white transition-all duration-300 hover:bg-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--amance-blue)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
            >
              Nous Contacter
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
