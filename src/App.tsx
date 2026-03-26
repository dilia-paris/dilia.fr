import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import HomePage from "./pages/HomePage";
import DiliaPage from "./pages/DiliaPage";
import DiliettaPage from "./pages/DiliettaPage";
import LaCavePage from "./pages/LaCavePage";
import DistributionPage from "./pages/DistributionPage";
import LegalPage from "./pages/LegalPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Redirect root to default language */}
            <Route path="/" element={<Navigate to="/fr" replace />} />
            
            {/* French routes */}
            <Route path="/fr" element={<HomePage />} />
            <Route path="/fr/dilia" element={<DiliaPage />} />
            <Route path="/fr/dilietta" element={<DiliettaPage />} />
            <Route path="/fr/la-cave" element={<LaCavePage />} />
            <Route path="/fr/distribution" element={<DistributionPage />} />
            <Route path="/fr/legal" element={<LegalPage />} />
            
            {/* English routes */}
            <Route path="/en" element={<HomePage />} />
            <Route path="/en/dilia" element={<DiliaPage />} />
            <Route path="/en/dilietta" element={<DiliettaPage />} />
            <Route path="/en/la-cave" element={<LaCavePage />} />
            <Route path="/en/distribution" element={<DistributionPage />} />
            <Route path="/en/legal" element={<LegalPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </LanguageProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
