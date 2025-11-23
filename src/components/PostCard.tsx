import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import UserAvatar from "./UserAvatar";
import CommentsSection from "./CommentsSection";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PostCardProps {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  mediaUrl?: string; // Pode vir string ou undefined
  mediaType?: "image" | "video";
  timestamp: Date;
  likesCount: number;
  commentsCount: number;
  sharesCount?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  currentUser?: {
    name: string;
    avatar?: string;
  };
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onSave?: (id: string) => void;
  onShare?: (id: string) => void;
}

export default function PostCard({
  id,
  author,
  content,
  mediaUrl,
  mediaType = "image", // Padrão é imagem
  timestamp,
  likesCount,
  commentsCount,
  sharesCount = 0,
  isLiked = false,
  isSaved = false,
  currentUser = { name: "Você", avatar: undefined },
  onLike,
  onComment,
  onSave,
  onShare,
}: PostCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [likes, setLikes] = useState(likesCount);
  const [showComments, setShowComments] = useState(false);

  // Garante que a data seja válida para evitar erro do date-fns
  const safeDate = isNaN(new Date(timestamp).getTime())
    ? new Date()
    : new Date(timestamp);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    onLike?.(id);
  };

  const handleComment = () => {
    setShowComments(!showComments);
    onComment?.(id);
  };

  const handleSave = () => {
    setSaved(!saved);
    onSave?.(id);
  };

  const handleShare = () => {
    onShare?.(id);
  };

  return (
    <Card className="p-6" data-testid={`card-post-${id}`}>
      <div className="flex gap-3 mb-4">
        <UserAvatar src={author.avatar} name={author.name} />
        <div className="flex-1">
          <div
            className="font-semibold text-foreground"
            data-testid={`text-author-${id}`}
          >
            {author.name}
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

      {/* SE TIVER URL DE MÍDIA, EXIBE AQUI */}
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
            onClick={handleComment}
            className="gap-2"
            data-testid={`button-comment-${id}`}
          >
            <MessageCircle className="h-5 w-5" />
            <span data-testid={`text-comments-${id}`}>{commentsCount}</span>
          </Button>
          {sharesCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
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
          onClick={handleSave}
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
