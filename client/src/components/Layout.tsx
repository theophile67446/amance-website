import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import AdminToolbar from "./AdminToolbar";
import { useAuth } from "@/_core/hooks/useAuth";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen flex flex-col">
      {isAdmin && <AdminToolbar />}
      <Navbar />
      <main className={`flex-1 ${isAdmin ? "pt-[calc(4rem+2.25rem)] sm:pt-[calc(5rem+2.25rem)]" : "pt-16 sm:pt-20"}`}>
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
