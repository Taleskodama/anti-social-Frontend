import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/PostCard";
import CreatePostModal from "@/components/CreatePostModal";
import avatar1 from "@assets/generated_images/Female_user_avatar_94d67f98.png";
import avatar2 from "@assets/generated_images/Male_user_avatar_e6e3dcfc.png";
import avatar3 from "@assets/generated_images/User_avatar_with_glasses_65176678.png";
import avatar4 from "@assets/generated_images/Creative_user_avatar_3958f56e.png";

export default function Feed() {
  const [createPostOpen, setCreatePostOpen] = useState(false);

  const mockPosts = [
    {
      id: "1",
      author: { name: "Ana Silva", avatar: avatar1 },
      content: "Acabei de terminar um projeto incrível! A sensação de ver tudo funcionando é incomparável. Agradeço a todos que me ajudaram nessa jornada. 🚀✨",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      likesCount: 24,
      commentsCount: 5,
    },
    {
      id: "2",
      author: { name: "Carlos Mendes", avatar: avatar2 },
      content: "Bom dia! Alguém tem dicas de recursos para aprender TypeScript? Estou começando agora e quero me aprofundar.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      likesCount: 12,
      commentsCount: 8,
      isLiked: true,
    },
    {
      id: "3",
      author: { name: "Marina Costa", avatar: avatar3 },
      content: "Reflexão do dia: Às vezes, precisamos desacelerar para enxergar melhor o caminho à frente. 🌱",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      likesCount: 45,
      commentsCount: 12,
    },
    {
      id: "4",
      author: { name: "Rafael Santos", avatar: avatar4 },
      content: "Compartilhando um pouco do meu processo criativo. É sempre bom documentar a jornada!",
      mediaUrl: avatar4,
      mediaType: "image" as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      likesCount: 67,
      commentsCount: 15,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Feed</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Últimas atualizações da sua rede
            </p>
          </div>
          <Button
            onClick={() => setCreatePostOpen(true)}
            className="gap-2"
            data-testid="button-create-post"
          >
            <Plus className="h-5 w-5" />
            Criar
          </Button>
        </div>

        <div className="space-y-6">
          {mockPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>

        <div className="text-center py-8 text-sm text-muted-foreground">
          Você viu todas as publicações recentes (últimas 24h)
        </div>
      </div>

      <CreatePostModal
        open={createPostOpen}
        onOpenChange={setCreatePostOpen}
        currentUser={{ name: "Você", avatar: avatar1 }}
      />
    </div>
  );
}
