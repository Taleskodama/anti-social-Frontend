import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import api from "../services/api";
import CreatePostModal from "../components/CreatePostModal";
import PostCard from "../components/PostCard";
import { Button } from "../components/ui/button";

const avatar1 = undefined;

export default function Feed() {
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const userName = localStorage.getItem("user_name") || "Você";
  const currentUserId = localStorage.getItem("user_id");

  const currentUser = { name: userName, avatar: avatar1 };

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const response = await api.get("/activities");

      const postsFormatados = response.data.map((post: any) => {
        let dataPost = new Date();
        const dataVindaDoBanco = post.creationDate || post.created_at;

        if (dataVindaDoBanco) {
          const dbDate = new Date(dataVindaDoBanco);
          if (!isNaN(dbDate.getTime())) {
            dataPost = new Date(dbDate.getTime() - 3 * 60 * 60 * 1000);
          }
        }

        const incentives = post.incentives || [];
        const isLikedByMe = incentives.some(
          (inc: any) =>
            inc.authorId === currentUserId || inc.author?.id === currentUserId
        );

        return {
          id: post.id,
          author: {
            name: post.author?.name || "Usuário",
            avatar: avatar1,
          },
          content: post.description || post.title,
          mediaUrl: post.mediaUrl || undefined,
          mediaType: "image",
          timestamp: dataPost,
          likesCount: incentives.length,
          isLiked: isLikedByMe,

          commentsCount: post.comments ? post.comments.length : 0,
        };
      });

      setPosts(
        postsFormatados.sort((a: any, b: any) => b.timestamp - a.timestamp)
      );
    } catch (error) {
      console.error("Erro ao carregar posts", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLike(postId: string) {
    try {
      await api.post("/incentives", {
        activityId: postId,
        type: "HEART",
      });

      loadPosts();
    } catch (error) {
      console.error("Erro ao curtir:", error);
    }
  }

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
          {loading ? (
            <p className="text-center text-muted-foreground">Carregando...</p>
          ) : posts.length === 0 ? (
            <div className="text-center py-10 border rounded-lg bg-card">
              <p className="text-muted-foreground">Nenhum post encontrado.</p>
              <p className="text-sm text-muted-foreground">
                Seja o primeiro a postar!
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                {...post}
                currentUser={currentUser}
                onLike={handleLike}
              />
            ))
          )}
        </div>

        <div className="text-center py-8 text-sm text-muted-foreground">
          Você viu todas as publicações recentes.
        </div>
      </div>

      <CreatePostModal
        open={createPostOpen}
        onOpenChange={setCreatePostOpen}
        currentUser={currentUser}
        onSuccess={loadPosts}
      />
    </div>
  );
}
