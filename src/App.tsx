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
              <Route component={Feed} />
            </Switch>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function RouterContent() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const publicPaths = ["/", "/login", "/signup", "/forgot-password"];

    if (!token && !publicPaths.includes(location)) {
      setLocation("/login");
    }

    if (token && publicPaths.includes(location)) {
      setLocation("/feed");
    }
  }, [location, setLocation]);

  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot-password" component={ForgotPassword} />

      <Route path="/feed" component={AppRouter} />
      <Route path="/search" component={AppRouter} />
      <Route path="/trending" component={AppRouter} />
      <Route path="/messages" component={AppRouter} />
      <Route path="/activity" component={AppRouter} />
      <Route path="/saved" component={AppRouter} />
      <Route path="/profile" component={AppRouter} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
