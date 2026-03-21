import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LocalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const utils = trpc.useUtils();
  const { t } = useTranslation();

  const localLoginMutation = trpc.auth.localLogin.useMutation({
    onSuccess: () => {
      utils.auth.me.refetch();
      setEmail("");
      setPassword("");
      setError("");
    },
    onError: (err) => {
      setError(err.message || t("admin.login.error_failed"));
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError(t("admin.login.error_email"));
      return;
    }
    if (!password) {
      setError(t("admin.login.error_password"));
      return;
    }
    await localLoginMutation.mutateAsync({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 selection:bg-amance-green/20">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-10">
           <img
              src="/logo.png"
              alt="AMANCE"
              className="h-20 w-20 object-contain drop-shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://d2xsxph8kpxj0f.cloudfront.net/310519663349492546/QAH5oD3g9NaLpXrMvyrp4h/amance-logo_b61079fb.webp";
              }}
            />
        </div>
        
        <Card className="w-full shadow-2xl border-0 overflow-hidden rounded-3xl">
          <div className="h-2 bg-amance-green" />
          <CardHeader className="pt-10 pb-6 text-center">
            <div className="flex justify-center mb-4">
               <div className="w-12 h-12 rounded-2xl bg-amance-green/10 flex items-center justify-center text-amance-green">
                  <ShieldCheck size={28} />
               </div>
            </div>
            <CardTitle className="text-2xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "Montserrat, sans-serif" }}>
                {t("admin.login.title")}
            </CardTitle>
            <CardDescription className="text-gray-500 font-medium pt-1">
                {t("admin.login.desc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-10">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-100 rounded-2xl">
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription className="font-semibold">{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-widest leading-none" style={{ fontSize: '10px' }}>
                    {t("admin.login.email_label")}
                </label>
                <Input
                  type="email"
                  placeholder={t("admin.login.email_placeholder")}
                  className="h-14 border-gray-100 bg-gray-50/50 rounded-2xl focus:border-amance-green focus:bg-white transition-all shadow-sm pl-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={localLoginMutation.isPending}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-widest leading-none" style={{ fontSize: '10px' }}>
                    {t("admin.login.password_label")}
                </label>
                <Input
                  type="password"
                  placeholder={t("admin.login.password_placeholder")}
                  className="h-14 border-gray-100 bg-gray-50/50 rounded-2xl focus:border-amance-green focus:bg-white transition-all shadow-sm pl-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={localLoginMutation.isPending}
                />
              </div>
              <Button
                type="submit"
                className="w-full h-14 rounded-2xl bg-amance-blue hover:bg-amance-blue-dark active:scale-[0.98] transition-all text-white font-bold text-lg shadow-xl hover:shadow-amance-blue/20"
                disabled={localLoginMutation.isPending}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {localLoginMutation.isPending ? (
                  <>
                    <Loader className="mr-3 h-5 w-5 animate-spin" />
                    {t("admin.login.submitting")}
                  </>
                ) : (
                  t("admin.login.submit")
                )}
              </Button>
              <div className="pt-4">
                <p className="text-[11px] text-gray-400 text-center leading-relaxed px-4">
                    {t("admin.login.footer_info")}
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-12 text-center">
           <p className="text-gray-400 text-sm font-medium">
             © {new Date().getFullYear()} AMANCE Association
           </p>
        </div>
      </div>
    </div>
  );
}
