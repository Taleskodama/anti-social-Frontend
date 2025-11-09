import { Bookmark } from "lucide-react";
import PostCard from "@/components/PostCard";
import avatar1 from "@assets/generated_images/Female_user_avatar_94d67f98.png";
import avatar2 from "@assets/generated_images/Male_user_avatar_e6e3dcfc.png";

export default function Saved() {
  const mockSavedPosts = [
    {
      id: "saved1",
      author: { name: "Ana Silva", avatar: avatar1 },
      content: "Tutorial completo de React Hooks que salvei para revisar depois. Muito útil!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      likesCount: 156,
      commentsCount: 23,
      isSaved: true,
    },
    {
      id: "saved2",
      author: { name: "Carlos Mendes", avatar: avatar2 },
      content: "Dicas de performance para Node.js que não quero esquecer. Thread completa 🧵",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      likesCount: 234,
      commentsCount: 45,
      isSaved: true,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Bookmark className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Posts Salvos</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Seus posts favoritos em um só lugar
            </p>
          </div>
        </div>

        {mockSavedPosts.length > 0 ? (
          <div className="space-y-6">
            {mockSavedPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bookmark className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum post salvo ainda
            </h3>
            <p className="text-muted-foreground">
              Salve posts interessantes para ler depois
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
