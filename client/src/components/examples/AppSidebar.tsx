import { AppSidebar } from "../AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Conteúdo Principal</h1>
          <p className="text-muted-foreground mt-2">
            A sidebar aparece à esquerda com navegação completa.
          </p>
        </main>
      </div>
    </SidebarProvider>
  );
}
