
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/admin/AdminPanel";
import ProductDetails from "./pages/ProductDetails";
import CategoryProducts from "./pages/CategoryProducts";
import Auth from "./pages/Auth";
import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./components/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            } />
            <Route path="/category/:slug" element={<CategoryProducts />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
