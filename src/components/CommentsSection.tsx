import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import UserAvatar from "./UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import api from "../services/api";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  creationDate: string;
}

interface CommentsSectionProps {
  postId: string;
  currentUser: {
    name: string;
    avatar?: string;
  };
}

export default function CommentsSection({
  postId,
  currentUser,
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, [postId]);

  async function loadComments() {
    try {
      const response = await api.get(`/comments/activity/${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error("Erro ao carregar comentários", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await api.post("/comments", {
        activityId: postId,
        content: newComment,
      });

      setNewComment("");
      loadComments();
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
    }
  };

  return (
    <div className="space-y-4 pt-4 border-t border-border mt-4">
      <h4 className="font-semibold text-foreground">
        Comentários ({comments.length})
      </h4>

      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : comments.length > 0 ? (
        <ScrollArea className="max-h-80">
          <div className="space-y-4 pr-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3"
                data-testid={`comment-${comment.id}`}
              >
                <UserAvatar
                  src={undefined}
                  name={comment.author?.name || "Usuário"}
                  size="sm"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">
                      {comment.author?.name || "Usuário"}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {(() => {
                        const dbDate = new Date(
                          comment.creationDate || Date.now()
                        );
                        const realDate = new Date(
                          dbDate.getTime() - 3 * 60 * 60 * 1000
                        );

                        return formatDistanceToNow(realDate, {
                          addSuffix: true,
                          locale: ptBR,
                        });
                      })()}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <p className="text-sm text-muted-foreground">
          Seja o primeiro a comentar!
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <UserAvatar
          src={currentUser.avatar}
          name={currentUser.name}
          size="sm"
        />
        <div className="flex-1 flex gap-2">
          <Textarea
            placeholder="Escreva um comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="resize-none min-h-[60px]"
            data-testid={`input-comment-${postId}`}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!newComment.trim()}
            data-testid={`button-send-comment-${postId}`}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
