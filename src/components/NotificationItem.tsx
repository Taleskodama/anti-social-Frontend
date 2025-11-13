import { Heart, MessageCircle, UserPlus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface NotificationItemProps {
  id: string;
  type: "like" | "comment" | "follow";
  user: {
    name: string;
    avatar?: string;
  };
  content?: string;
  timestamp: Date;
  isRead?: boolean;
  onAcceptFollow?: (id: string) => void;
  onRejectFollow?: (id: string) => void;
}

export default function NotificationItem({
  id,
  type,
  user,
  content,
  timestamp,
  isRead = false,
  onAcceptFollow,
  onRejectFollow,
}: NotificationItemProps) {
  const getIcon = () => {
    switch (type) {
      case "like":
        return <Heart className="h-5 w-5 text-red-500" />;
      case "comment":
        return <MessageCircle className="h-5 w-5 text-primary" />;
      case "follow":
        return <UserPlus className="h-5 w-5 text-primary" />;
    }
  };

  const getMessage = () => {
    switch (type) {
      case "like":
        return "curtiu sua publicação";
      case "comment":
        return "comentou em sua publicação";
      case "follow":
        return "quer seguir você";
    }
  };

  const handleAccept = () => {
    onAcceptFollow?.(id);
    console.log(`Follow request ${id} accepted`);
  };

  const handleReject = () => {
    onRejectFollow?.(id);
    console.log(`Follow request ${id} rejected`);
  };

  return (
    <Card
      className={`p-4 hover-elevate ${!isRead ? "border-l-4 border-l-primary" : ""}`}
      data-testid={`card-notification-${id}`}
    >
      <div className="flex gap-3">
        {!isRead && (
          <div className="w-2 h-2 rounded-full bg-primary mt-2" data-testid="indicator-unread" />
        )}
        <div className="flex-shrink-0">{getIcon()}</div>
        <UserAvatar src={user.avatar} name={user.name} size="sm" />
        <div className="flex-1">
          <div className="text-sm">
            <span className="font-semibold text-foreground" data-testid={`text-username-${id}`}>
              {user.name}
            </span>{" "}
            <span className="text-muted-foreground">{getMessage()}</span>
          </div>
          {content && (
            <div className="text-sm text-muted-foreground mt-1" data-testid={`text-content-${id}`}>
              "{content}"
            </div>
          )}
          <div className="text-xs text-muted-foreground font-mono mt-1" data-testid={`text-timestamp-${id}`}>
            {formatDistanceToNow(timestamp, { addSuffix: true, locale: ptBR })}
          </div>
          {type === "follow" && (
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                onClick={handleAccept}
                data-testid={`button-accept-${id}`}
              >
                Aceitar
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleReject}
                data-testid={`button-reject-${id}`}
              >
                Recusar
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
