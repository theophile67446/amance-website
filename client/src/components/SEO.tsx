import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({ 
  title, 
  description = "AMANCE - Association pour le Maintien de l'Action Naturelle, Culturelle et Environnementale. Agir pour un avenir durable au Cameroun.",
  image = "https://amance.org/og-image.jpg", // Fallback
  url = "https://amance.org",
  type = "website"
}: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | AMANCE`;
    document.title = fullTitle;

    // Update Meta Tags
    const updateMeta = (name: string, content: string, property = false) => {
      let el = document.querySelector(`meta[${property ? 'property' : 'name'}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(property ? 'property' : 'name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', description);
    
    // Open Graph
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', image, true);
    updateMeta('og:url', window.location.href, true);
    updateMeta('og:type', type, true);

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

  }, [title, description, image, url, type]);

  return null;
}
