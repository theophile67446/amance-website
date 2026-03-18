import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import APropos from "./pages/APropos";
import NosActions from "./pages/NosActions";
import Projets from "./pages/Projets";
import Actualites from "./pages/Actualites";
import Contact from "./pages/Contact";
import SImpliquer from "./pages/SImpliquer";
import FaireUnDon from "./pages/FaireUnDon";
import Transparence from "./pages/Transparence";
import ProjetDetail from "./pages/ProjetDetail";
import ActualiteDetail from "./pages/ActualiteDetail";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import Admin from "./pages/Admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/a-propos" component={APropos} />
      <Route path="/nos-actions" component={NosActions} />
      <Route path="/projets" component={Projets} />
      <Route path="/actualites" component={Actualites} />
      <Route path="/contact" component={Contact} />
      <Route path="/s-impliquer" component={SImpliquer} />
      <Route path="/faire-un-don" component={FaireUnDon} />
      <Route path="/transparence" component={Transparence} />
      <Route path="/projets/:slug" component={ProjetDetail} />
      <Route path="/actualites/:slug" component={ActualiteDetail} />
      <Route path="/admin" component={Admin} />
      <Route path="/mentions-legales" component={MentionsLegales} />
      <Route path="/politique-de-confidentialite" component={PolitiqueConfidentialite} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
