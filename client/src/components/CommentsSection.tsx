import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "./UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date;
}

interface CommentsSectionProps {
  postId: string;
  comments?: Comment[];
  currentUser: {
    name: string;
    avatar?: string;
  };
  onAddComment?: (postId: string, content: string) => void;
}

export default function CommentsSection({
  postId,
  comments = [],
  currentUser,
  onAddComment,
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState<Comment[]>(comments);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        author: currentUser,
        content: newComment,
        timestamp: new Date(),
      };
      setLocalComments([...localComments, comment]);
      onAddComment?.(postId, newComment);
      console.log("Comment added:", { postId, content: newComment });
      setNewComment("");
    }
  };

  return (
    <div className="space-y-4 pt-4 border-t border-border mt-4">
      <h4 className="font-semibold text-foreground">
        Comentários ({localComments.length})
      </h4>

      {localComments.length > 0 && (
        <ScrollArea className="max-h-80">
          <div className="space-y-4 pr-4">
            {localComments.map((comment) => (
              <div key={comment.id} className="flex gap-3" data-testid={`comment-${comment.id}`}>
                <UserAvatar src={comment.author.avatar} name={comment.author.name} size="sm" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">
                      {comment.author.name}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {formatDistanceToNow(comment.timestamp, { addSuffix: true, locale: ptBR })}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <UserAvatar src={currentUser.avatar} name={currentUser.name} size="sm" />
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
