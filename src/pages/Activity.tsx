import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationItem from "@/components/NotificationItem";
import avatar1 from "@assets/generated_images/Male_user_avatar_e6e3dcfc.png";
import avatar2 from "@assets/generated_images/User_avatar_with_glasses_65176678.png";
import avatar3 from "@assets/generated_images/Creative_user_avatar_3958f56e.png";
import avatar4 from "@assets/generated_images/Female_user_avatar_94d67f98.png";

export default function Activity() {
  const [activeTab, setActiveTab] = useState("all");

  const mockNotifications = {
    likes: [
      {
        id: "l1",
        type: "like" as const,
        user: { name: "João Pedro", avatar: avatar1 },
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        isRead: false,
      },
      {
        id: "l2",
        type: "like" as const,
        user: { name: "Ana Costa", avatar: avatar4 },
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        isRead: true,
      },
    ],
    comments: [
      {
        id: "c1",
        type: "comment" as const,
        user: { name: "Maria Clara", avatar: avatar2 },
        content: "Que incrível! Parabéns pelo projeto.",
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        isRead: false,
      },
      {
        id: "c2",
        type: "comment" as const,
        user: { name: "Pedro Santos", avatar: avatar3 },
        content: "Adorei essa reflexão! Muito verdade.",
        timestamp: new Date(Date.now() - 1000 * 60 * 90),
        isRead: true,
      },
    ],
    follows: [
      {
        id: "f1",
        type: "follow" as const,
        user: { name: "Lucas Santos", avatar: avatar3 },
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
        isRead: false,
      },
      {
        id: "f2",
        type: "follow" as const,
        user: { name: "Carla Oliveira", avatar: avatar4 },
        timestamp: new Date(Date.now() - 1000 * 60 * 180),
        isRead: false,
      },
    ],
  };

  const allNotifications = [
    ...mockNotifications.likes,
    ...mockNotifications.comments,
    ...mockNotifications.follows,
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Atividade</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Acompanhe suas interações e notificações
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4" data-testid="tabs-notifications">
            <TabsTrigger value="all" data-testid="tab-all">
              Todas
            </TabsTrigger>
            <TabsTrigger value="likes" data-testid="tab-likes">
              Curtidas
            </TabsTrigger>
            <TabsTrigger value="comments" data-testid="tab-comments">
              Comentários
            </TabsTrigger>
            <TabsTrigger value="follows" data-testid="tab-follows">
              Seguidores
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {allNotifications.map((notification) => (
              <NotificationItem key={notification.id} {...notification} />
            ))}
          </TabsContent>

          <TabsContent value="likes" className="space-y-4 mt-6">
            {mockNotifications.likes.map((notification) => (
              <NotificationItem key={notification.id} {...notification} />
            ))}
          </TabsContent>

          <TabsContent value="comments" className="space-y-4 mt-6">
            {mockNotifications.comments.map((notification) => (
              <NotificationItem key={notification.id} {...notification} />
            ))}
          </TabsContent>

          <TabsContent value="follows" className="space-y-4 mt-6">
            {mockNotifications.follows.map((notification) => (
              <NotificationItem key={notification.id} {...notification} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
