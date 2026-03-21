import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { useTranslation } from "react-i18next";
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
    titleKey: "domains.humanitarian.title",
    descKey: "domains.humanitarian.desc",
    color: "bg-amance-green/15 text-amance-green",
    href: "/nos-actions#humanitaire",
  },
  {
    icon: Stethoscope,
    titleKey: "domains.health.title",
    descKey: "domains.health.desc",
    color: "bg-amance-blue/15 text-amance-blue",
    href: "/nos-actions#sante",
  },
  {
    icon: HomeIcon,
    titleKey: "domains.community.title",
    descKey: "domains.community.desc",
    color: "bg-amance-green-dark/15 text-amance-green-dark",
    href: "/nos-actions#communautaire",
  },
  {
    icon: TreePine,
    titleKey: "domains.environment.title",
    descKey: "domains.environment.desc",
    color: "bg-amance-blue-light/15 text-amance-blue-light",
    href: "/nos-actions#conservation",
  },
];

const stats = [
  { value: 10000, suffix: "+", labelKey: "impact.stat1_label", icon: Users },
  { value: 5, suffix: "+", labelKey: "impact.stat2_label", icon: Leaf },
  { value: 500, suffix: "+", labelKey: "impact.stat3_label", icon: Heart },
  { value: 95, suffix: "%", labelKey: "impact.stat4_label", icon: Globe },
];

const newsItems = [
  {
    image: NEWS_1,
    categoryKey: "news.categories.terrain",
    dateKey: "news.item1.date",
    titleKey: "news.item1.title",
    excerptKey: "news.item1.excerpt",
    href: "/actualites/distribution-alimentaire-nord-ouest",
  },
  {
    image: NEWS_2,
    categoryKey: "news.categories.conservation",
    dateKey: "news.item2.date",
    titleKey: "news.item2.title",
    excerptKey: "news.item2.excerpt",
    href: "/actualites/reboisement-buea",
  },
  {
    image: NEWS_3,
    categoryKey: "news.categories.community",
    dateKey: "news.item3.date",
    titleKey: "news.item3.title",
    excerptKey: "news.item3.excerpt",
    href: "/actualites/formation-agroforesterie",
  },
];

const helpWays = [
  {
    icon: Heart,
    titleKey: "help.donation.title",
    descKey: "help.donation.desc",
    ctaKey: "help.donation.cta",
    href: "/faire-un-don",
    primary: true,
    bg: "bg-amance-green",
  },
  {
    icon: Building2,
    titleKey: "help.partner.title",
    descKey: "help.partner.desc",
    ctaKey: "help.partner.cta",
    href: "/s-impliquer#partenaire",
    primary: false,
    bg: "bg-amance-blue",
  },
  {
    icon: Users,
    titleKey: "help.volunteer.title",
    descKey: "help.volunteer.desc",
    ctaKey: "help.volunteer.cta",
    href: "/s-impliquer#benevole",
    primary: false,
    bg: "bg-amance-green-dark",
  },
];

export default function Home() {
  const { ref: statsRef, inView: statsInView } = useInView();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative pt-24 pb-10 md:pt-32 md:pb-48 lg:pt-48 lg:pb-64 overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-900/80 to-amance-green-dark/60" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium font-sans text-white mb-6 backdrop-blur-md bg-white/15 transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            <Star size={14} fill="currentColor" className="text-amance-green-light" />
            {t("hero.badge")}
          </div>

          <h1
            className={`text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold font-heading text-white leading-[1.1] mb-8 transition-all duration-700 delay-100 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            style={{ textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
          >
            {t("hero.title1")} <span className="text-amance-green-light relative inline-block">
              {t("hero.title2")}
            </span>
            <br />
            {t("hero.title3")}
          </h1>

          <p
            className={`text-lg md:text-xl text-gray-300 font-sans leading-relaxed mb-10 max-w-2xl mx-auto transition-all duration-700 delay-200 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className={`flex flex-col sm:flex-row w-full sm:w-auto justify-center items-center gap-4 sm:gap-5 transition-all duration-700 delay-300 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            <Link
              href="/faire-un-don"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 shadow-[0_8px_30px_rgb(5,150,105,0.4)] hover:shadow-[0_8px_30px_rgb(5,150,105,0.6)] bg-amance-green hover:bg-amance-green-dark hover:-translate-y-1"
            >
              <Heart size={18} fill="white" />
              {t("hero.cta_donate")}
            </Link>
            <Link
              href="/nos-actions"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:-translate-y-1"
            >
              {t("hero.cta_discover")}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Stats */}
        <div className="relative mt-8 md:mt-0 md:absolute md:bottom-0 left-0 w-full border-t border-white/10 bg-black/30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-32">
              {[
                { value: t("hero.stat1_val"), label: t("hero.stat1_label") },
                { value: t("hero.stat2_val"), label: t("hero.stat2_label") },
                { value: t("hero.stat3_val"), label: t("hero.stat3_label") },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-amance-green-light mb-2 sm:mb-3">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-sm font-sans text-gray-300 uppercase tracking-[0.18em] sm:tracking-widest font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: DOMAINES D'INTERVENTION ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-sans bg-amance-green/10 text-amance-green mb-4"
            >
              <Leaf size={14} />
              {t("domains.badge")}
            </div>
            <h2
              className="section-title"
            >
              {t("domains.title")}
            </h2>
            <p className="section-subtitle">
              {t("domains.subtitle")}
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
                  className="group card-amance p-8 flex flex-col"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${domain.color}`}
                  >
                    <Icon size={28} />
                  </div>
                  <h3
                    className="text-lg font-bold font-heading text-amance-blue mb-3 group-hover:text-amance-green transition-colors"
                  >
                    {t(domain.titleKey)}
                  </h3>
                  <p className="text-sm text-gray-600 font-sans leading-relaxed flex-1">
                    {t(domain.descKey)}
                  </p>
                  <div
                    className="flex items-center gap-1 mt-6 text-sm font-bold transition-colors text-amance-green group-hover:translate-x-1"
                  >
                    {t("common.learn_more")} <ChevronRight size={16} />
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
        className="py-24 gradient-blue"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-sans mb-4 text-white bg-white/10 backdrop-blur-md"
            >
              <Star size={14} fill="currentColor" />
              {t("impact.badge")}
            </div>
            <h2
              className="text-3xl md:text-5xl font-extrabold font-heading text-white mb-4"
            >
              {t("impact.title")}
            </h2>
            <p className="text-lg text-blue-100 font-sans max-w-2xl mx-auto">
              {t("impact.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const count = useCounter(stat.value, 2000, statsInView);
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-white/10 backdrop-blur-md"
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <div
                    className="text-4xl md:text-6xl font-extrabold font-heading text-amance-green-light mb-4"
                  >
                    {count.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-blue-100 text-sm font-medium font-sans tracking-wide uppercase">
                    {t(stat.labelKey)}
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
                  alt={t("featured_project.alt")}
                  className="w-full h-80 lg:h-96 object-cover"
                />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-6 -right-6 bg-white rounded-3xl shadow-xl p-6 max-w-[220px]"
              >
                <div
                  className="text-3xl font-extrabold font-heading text-amance-green mb-1"
                >
                  50 ha
                </div>
                <div className="text-xs font-sans text-gray-600 leading-relaxed">{t("featured_project.floating_badge")}</div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-sans mb-6 bg-amance-green/10 text-amance-green"
              >
                <TreePine size={14} />
                {t("featured_project.badge")}
              </div>
              <h2
                className="section-title"
              >
                {t("featured_project.title")}
              </h2>
              <p className="text-gray-600 font-sans leading-relaxed mb-6">
                {t("featured_project.desc1")}
              </p>
              <p className="text-gray-600 font-sans leading-relaxed mb-8">
                {t("featured_project.desc2")}
              </p>

              {/* Impact metrics */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: "50 ha", labelKey: "featured_project.metric1_label" },
                  { value: "80", labelKey: "featured_project.metric2_label" },
                  { value: "200", labelKey: "featured_project.metric3_label" },
                ].map((m) => (
                  <div
                    key={m.labelKey}
                    className="text-center p-4 rounded-2xl bg-amance-green/5 border border-amance-green/10"
                  >
                    <div
                      className="text-2xl font-extrabold font-heading text-amance-green"
                    >
                      {m.value}
                    </div>
                    <div className="text-xs font-sans text-gray-500 mt-1">{t(m.labelKey)}</div>
                  </div>
                ))}
              </div>

              <Link
                href="/projets/la-foret-de-demain"
                className="btn-primary"
              >
                {t("featured_project.cta")}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: COMMENT AIDER ===== */}
      <section className="py-24 bg-amance-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-sans mb-4 bg-amance-green/10 text-amance-green"
            >
              <HandHeart size={14} />
              {t("help.badge")}
            </div>
            <h2
              className="section-title"
            >
              {t("help.title")}
            </h2>
            <p className="section-subtitle">
              {t("help.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {helpWays.map((way, i) => {
              const Icon = way.icon;
              return (
                <div
                  key={i}
                  className="card-amance p-8 flex flex-col group hover:-translate-y-3"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${way.bg}`}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3
                    className="text-2xl font-bold font-heading text-amance-blue mb-4"
                  >
                    {t(way.titleKey)}
                  </h3>
                  <p className="text-gray-600 font-sans leading-relaxed flex-1 mb-8">
                    {t(way.descKey)}
                  </p>
                  <Link
                    href={way.href}
                    className={`flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold font-heading text-white text-sm transition-all duration-300 ${way.bg} hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1`}
                  >
                    {t(way.ctaKey)}
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-sans mb-4 bg-amance-green/10 text-amance-green"
              >
                <Globe size={14} />
                {t("news.badge")}
              </div>
              <h2
                className="section-title"
              >
                {t("news.title")}
              </h2>
            </div>
            <Link
              href="/actualites"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold font-heading text-amance-green border-2 border-amance-green transition-all duration-300 hover:bg-amance-green hover:text-white hover:-translate-y-1 flex-shrink-0"
            >
              {t("news.all_news")} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((news, i) => (
              <Link
                key={i}
                href={news.href}
                className="group card-amance hover:-translate-y-3 flex flex-col"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={news.image}
                    alt={t(news.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold font-heading uppercase tracking-wider text-white bg-amance-green shadow-lg"
                  >
                    {t(news.categoryKey)}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-sm font-sans font-semibold text-amance-green mb-3">
                    {t(news.dateKey)}
                  </p>
                  <h3
                    className="text-xl font-bold font-heading text-amance-blue mb-4 line-clamp-2 group-hover:text-amance-green transition-colors"
                  >
                    {t(news.titleKey)}
                  </h3>
                  <p className="text-gray-600 font-sans leading-relaxed flex-1 line-clamp-3">
                    {t(news.excerptKey)}
                  </p>
                  <div
                    className="flex items-center gap-1 mt-6 text-sm font-bold text-amance-green transition-transform group-hover:translate-x-1"
                  >
                    {t("common.read_more")} <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: TÉMOIGNAGE ===== */}
      <section
        className="py-24 bg-amance-gray-light"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-sans mb-8 bg-amance-green/10 text-amance-green"
          >
            <Quote size={14} />
            {t("testimonials.badge")}
          </div>

          <div className="card-amance p-10 md:p-14 relative overflow-visible">
            <Quote
              size={64}
              className="absolute -top-8 -left-8 text-amance-green/20 rotate-180"
            />
            <blockquote
              className="text-2xl md:text-3xl font-heading font-medium text-amance-blue leading-relaxed mb-10 relative z-10"
            >
              {t("testimonials.quote")}
            </blockquote>

            <div className="flex flex-col items-center justify-center gap-4">
              <img
                src={TESTIMONIAL_IMAGE}
                alt={t("testimonials.name")}
                className="w-20 h-20 rounded-full object-cover border-4 border-amance-green shadow-lg"
              />
              <div className="text-center">
                <div
                  className="font-bold font-heading text-lg text-amance-blue"
                >
                  {t("testimonials.name")}
                </div>
                <div className="text-sm font-sans text-gray-500 mt-1">
                  {t("testimonials.role")}
                </div>
              </div>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mt-8">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={20} fill="currentColor" className="text-amance-accent" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: CALL TO ACTION FINAL ===== */}
      <section
        className="py-32 gradient-hero"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-6xl font-extrabold font-heading text-white mb-8 leading-tight"
          >
            {t("final_cta.title")}
          </h2>
          <p className="text-xl font-sans text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("final_cta.subtitle")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/faire-un-don"
              className="btn-primary"
            >
              <Heart size={20} fill="white" />
              {t("final_cta.cta_donate")}
            </Link>
            <Link
              href="/contact"
              className="btn-outline-white"
            >
              {t("final_cta.cta_contact")}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
