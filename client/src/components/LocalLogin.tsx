import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader } from "lucide-react";

export default function LocalLogin() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const utils = trpc.useUtils();

  const localLoginMutation = trpc.auth.localLogin.useMutation({
    onSuccess: () => {
      utils.auth.me.refetch();
      setEmail("");
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
    await localLoginMutation.mutateAsync({ email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>AMANCE Admin Login</CardTitle>
          <CardDescription>Development - Local Login</CardDescription>
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
              This is a local development login. Enter the admin email address.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
