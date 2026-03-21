import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader } from "lucide-react";

export default function LocalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const utils = trpc.useUtils();

  const localLoginMutation = trpc.auth.localLogin.useMutation({
    onSuccess: () => {
      utils.auth.me.refetch();
      setEmail("");
      setPassword("");
      setError("");
    },
    onError: (err) => {
      setError(err.message || "Login failed");
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter an email");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    await localLoginMutation.mutateAsync({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>AMANCE Admin Login</CardTitle>
          <CardDescription>Restricted local admin access</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                type="email"
                placeholder="mimb.nout@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={localLoginMutation.isPending}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={localLoginMutation.isPending}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={localLoginMutation.isPending}
            >
              {localLoginMutation.isPending ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
            <p className="text-xs text-gray-500 text-center">
              In production, this login only works for the configured admin email and password.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
