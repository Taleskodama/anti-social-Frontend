import { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Check,
  Trash,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import UserAvatar from "./UserAvatar";
import CommentsSection from "./CommentsSection";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import api from "../services/api";

interface PostCardProps {
  id: string;
  author: {
    id?: string;
    name: string;
    avatar?: string;
  };
  content: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  timestamp: Date;
  likesCount: number;
  commentsCount: number;
  sharesCount?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  initialIsFollowing?: boolean;
  currentUser?: {
    name: string;
    avatar?: string;
  };
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onSave?: (id: string) => void;
  onShare?: (id: string) => void;
  onDelete?: () => void; // Função para recarregar o feed ao deletar
}

export default function PostCard({
  id,
  author,
  content,
  mediaUrl,
  mediaType = "image",
  timestamp,
  likesCount,
  commentsCount,
  sharesCount = 0,
  isLiked = false,
  isSaved = false,
  initialIsFollowing = false,
  currentUser = { name: "Você", avatar: undefined },
  onLike,
  onComment,
  onSave,
  onShare,
  onDelete,
}: PostCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [likes, setLikes] = useState(likesCount);
  const [showComments, setShowComments] = useState(false);
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  // Verifica se o post é MEU para mostrar a lixeira
  const currentUserId = localStorage.getItem("user_id");
  const isMyPost = author.id === currentUserId;

  // Atualiza estado se a prop mudar
  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  const safeDate = isNaN(new Date(timestamp).getTime())
    ? new Date()
    : new Date(timestamp);

  // --- SEGUIR ---
  const handleFollowUser = async () => {
    if (!author.id) return;
    try {
      await api.post("/connections", { user2: author.id });
      setIsFollowing(true);
    } catch (error) {
      console.error("Erro ao seguir", error);
    }
  };

  // --- DELETAR ---
  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir este post?")) {
      try {
        await api.delete(`/activities/${id}`);
        if (onDelete) onDelete(); // Recarrega o feed
      } catch (error) {
        console.error("Erro ao deletar", error);
        alert("Erro ao excluir post.");
      }
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    onLike?.(id);
  };

  return (
    <Card className="p-6" data-testid={`card-post-${id}`}>
      <div className="flex gap-3 mb-4">
        <UserAvatar src={author.avatar} name={author.name} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            {/* Lado Esquerdo: Nome + Botão Seguir */}
            <div className="flex items-center gap-2">
              <div
                className="font-semibold text-foreground"
                data-testid={`text-author-${id}`}
              >
                {author.name}
              </div>

              {/* Botão Seguir (Só se não for eu mesmo) */}
              {!isMyPost &&
                (isFollowing ? (
                  <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Seguindo
                  </span>
                ) : (
                  <button
                    onClick={handleFollowUser}
                    className="text-xs font-medium text-blue-500 hover:text-blue-700 flex items-center gap-1 hover:underline"
                  >
                    • Seguir
                  </button>
                ))}
            </div>

            {/* Lado Direito: Botão Deletar (Só se for meu post) */}
            {isMyPost && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-red-500"
                onClick={handleDelete}
                title="Excluir publicação"
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div
            className="text-xs text-muted-foreground font-mono"
            data-testid={`text-timestamp-${id}`}
          >
            {formatDistanceToNow(safeDate, { addSuffix: true, locale: ptBR })}
          </div>
        </div>
      </div>

      <div
        className="text-foreground mb-4 whitespace-pre-wrap"
        data-testid={`text-content-${id}`}
      >
        {content}
      </div>

      {/* Imagem do Post */}
      {mediaUrl && (
        <div className="mb-4 rounded-lg overflow-hidden max-h-[500px]">
          {mediaType === "video" ? (
            <video
              src={mediaUrl}
              controls
              className="w-full h-full object-cover"
              data-testid={`video-media-${id}`}
            />
          ) : (
            <img
              src={mediaUrl}
              alt="Post media"
              className="w-full h-full object-cover"
              data-testid={`img-media-${id}`}
            />
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`gap-2 ${liked ? "text-red-500" : ""}`}
            data-testid={`button-like-${id}`}
          >
            <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
            <span data-testid={`text-likes-${id}`}>{likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="gap-2"
            data-testid={`button-comment-${id}`}
          >
            <MessageCircle className="h-5 w-5" />
            {/* Contagem de Comentários */}
            <span data-testid={`text-comments-${id}`}>{commentsCount}</span>
          </Button>
          {sharesCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              data-testid={`button-share-${id}`}
            >
              <Share2 className="h-5 w-5" />
              <span data-testid={`text-shares-${id}`}>{sharesCount}</span>
            </Button>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={saved ? "text-primary" : ""}
          data-testid={`button-save-${id}`}
        >
          <Bookmark className={`h-5 w-5 ${saved ? "fill-current" : ""}`} />
        </Button>
      </div>

      {showComments && (
        <CommentsSection postId={id} currentUser={currentUser} />
      )}
    </Card>
  );
}
