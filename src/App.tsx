
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

// Pages
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import NewInterview from "./pages/NewInterview";
import LiveInterview from "./pages/LiveInterview";
import InterviewInsights from "./pages/InterviewInsights";
import DetailView from "./pages/DetailView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page route - standalone without sidebar */}
          <Route path="/" element={<Landing />} />
          
          {/* Full screen routes - no header or sidebar */}
          <Route path="/interview/live/:id" element={<LiveInterview />} />
          
          {/* Dashboard routes - these show the header and sidebar */}
          <Route path="*" element={
            <SidebarProvider>
              <div className="min-h-screen flex w-full">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/interviews/new" element={<NewInterview />} />
                    <Route path="/interviews/:id" element={<DetailView />} />
                    <Route path="/interview-insights/:id" element={<InterviewInsights />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </div>
            </SidebarProvider>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
