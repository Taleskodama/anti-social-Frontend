import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Feed from "./pages/Feed";
import Search from "./pages/Search";
import Trending from "./pages/Trending";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Saved from "./pages/Saved";
import NotFound from "./pages/not-found";

// Componente que gerencia o Layout com Sidebar (Área Logada)
function AppRouter() {
  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-2 border-b border-border">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
          </header>
          <main className="flex-1 overflow-auto">
            <Switch>
              <Route path="/feed" component={Feed} />
              <Route path="/search" component={Search} />
              <Route path="/trending" component={Trending} />
              <Route path="/messages" component={Messages} />
              <Route path="/activity" component={Activity} />
              <Route path="/saved" component={Saved} />
              <Route path="/profile" component={Profile} />
              {/* Se não achar rota específica dentro da área logada, volta pro feed ou 404 */}
              <Route component={Feed} />
            </Switch>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// Componente Principal com Lógica de Proteção
function RouterContent() {
  const [location, setLocation] = useLocation();

  // Lógica de Segurança: Roda toda vez que a rota muda
  useEffect(() => {
    const token = localStorage.getItem("token");
    const publicPaths = ["/", "/login", "/signup", "/forgot-password"];

    // 1. Se NÃO tem token e tenta acessar área privada -> Manda pro Login
    if (!token && !publicPaths.includes(location)) {
      setLocation("/login");
    }

    // 2. Se TEM token e tenta acessar Login/Signup -> Manda pro Feed
    if (token && publicPaths.includes(location)) {
      setLocation("/feed");
    }
  }, [location, setLocation]);

  return (
    <Switch>
      {/* Rotas Públicas */}
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot-password" component={ForgotPassword} />

      {/* Rotas Protegidas (Todas usam o layout AppRouter) */}
      <Route path="/feed" component={AppRouter} />
      <Route path="/search" component={AppRouter} />
      <Route path="/trending" component={AppRouter} />
      <Route path="/messages" component={AppRouter} />
      <Route path="/activity" component={AppRouter} />
      <Route path="/saved" component={AppRouter} />
      <Route path="/profile" component={AppRouter} />

      {/* Rota 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Movemos o Switch para dentro do RouterContent para usar os hooks */}
        <RouterContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
