import { Home, Bell, User, MessageCircle, Search, TrendingUp, Bookmark, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation } from "wouter";

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
    console.log("Logout clicked");
    setLocation("/login");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-6">
            <h2 className="text-xl font-bold text-foreground">The Anti-Social</h2>
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
                <SidebarMenuButton onClick={handleLogout} data-testid="nav-logout">
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
