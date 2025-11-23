import {
  Home,
  Bell,
  User,
  MessageCircle,
  Search,
  TrendingUp,
  Bookmark,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { useLocation } from "wouter";

import logo from "../assets/logo.jpg";

const menuItems = [
  {
    title: "Feed",
    url: "/feed",
    icon: Home,
  },
  {
    title: "Buscar",
    url: "/search",
    icon: Search,
  },
  {
    title: "Tendências",
    url: "/trending",
    icon: TrendingUp,
  },
  {
    title: "Mensagens",
    url: "/messages",
    icon: MessageCircle,
  },
  {
    title: "Atividade",
    url: "/activity",
    icon: Bell,
  },
  {
    title: "Salvos",
    url: "/saved",
    icon: Bookmark,
  },
  {
    title: "Perfil",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    setLocation("/login");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-6 flex justify-center">
            <img
              src={logo}
              alt="The Anti-Social"
              className="h-48 w-auto object-contain scale-150 mix-blend-screen"
            />
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase()}`}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  data-testid="nav-logout"
                >
                  <LogOut />
                  <span>Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
