import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-lg shadow-2xl border-0 overflow-hidden rounded-[2.5rem] bg-white/80 backdrop-blur-md">
        <CardContent className="pt-12 pb-12 text-center px-8 sm:px-12">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center relative">
               <div className="absolute inset-0 bg-red-100/50 rounded-full animate-ping opacity-75" />
               <div className="absolute inset-0 bg-red-50 rounded-full" />
               <AlertCircle className="relative h-12 w-12 text-red-500" />
            </div>
          </div>

          <h1 className="text-6xl font-black text-slate-900 mb-4 tracking-tighter" style={{ fontFamily: "Montserrat, sans-serif" }}>404</h1>

          <h2 className="text-2xl font-bold text-slate-800 mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {t("not_found.title")}
          </h2>

          <p className="text-slate-500 mb-10 leading-relaxed text-lg" style={{ fontFamily: "Open Sans, sans-serif" }}>
            {t("not_found.desc")}
          </p>

          <Button
            onClick={handleGoHome}
            className="w-full sm:w-auto bg-amance-blue hover:bg-amance-blue-dark text-white px-10 py-7 rounded-2xl transition-all duration-300 shadow-xl hover:-translate-y-1 font-bold text-lg"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <Home className="w-5 h-5 mr-3" />
            {t("not_found.button")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
