import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import React, { Suspense } from "react";

// Lazy load page components for code splitting
const HomePage = React.lazy(() => import("./pages/HomePage"));
const DiliaPage = React.lazy(() => import("./pages/DiliaPage"));
const DiliettaPage = React.lazy(() => import("./pages/DiliettaPage"));
const LaCavePage = React.lazy(() => import("./pages/LaCavePage"));
const DistributionPage = React.lazy(() => import("./pages/DistributionPage"));
const LegalPage = React.lazy(() => import("./pages/LegalPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse text-sm tracking-wide opacity-60">Loading...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Suspense fallback={<LoadingFallback />}>
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
          </Suspense>
        </TooltipProvider>
      </LanguageProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
