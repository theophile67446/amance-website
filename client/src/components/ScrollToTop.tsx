import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Retour en haut de page"
      className="fixed bottom-6 right-4 sm:right-6 z-40 p-3 rounded-full bg-amance-green text-white shadow-lg hover:bg-amance-green-dark hover:-translate-y-1 active:scale-95 transition-all duration-300"
    >
      <ChevronUp size={22} strokeWidth={2.5} />
    </button>
  );
}
