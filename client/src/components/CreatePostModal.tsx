import { useState } from "react";
import { X, Image as ImageIcon, Video } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import UserAvatar from "./UserAvatar";

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUser: {
    name: string;
    avatar?: string;
  };
  onPost?: (content: string, media?: File) => void;
}

export default function CreatePostModal({
  open,
  onOpenChange,
  currentUser,
  onPost,
}: CreatePostModalProps) {
  const [content, setContent] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (content.trim()) {
      onPost?.(content, mediaFile || undefined);
      console.log("Post created:", { content, hasMedia: !!mediaFile });
      setContent("");
      setMediaPreview(null);
      setMediaFile(null);
      onOpenChange(false);
    }
  };

  const handleRemoveMedia = () => {
    setMediaPreview(null);
    setMediaFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl" data-testid="modal-create-post">
        <DialogHeader>
          <DialogTitle>Criar Publicação</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-3">
            <UserAvatar src={currentUser.avatar} name={currentUser.name} />
            <div className="font-semibold text-foreground">{currentUser.name}</div>
          </div>

          <Textarea
            placeholder="No que você está pensando?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-32 resize-none text-base"
            data-testid="input-post-content"
          />

          {mediaPreview && (
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={mediaPreview}
                alt="Preview"
                className="w-full max-h-96 object-cover"
                data-testid="img-media-preview"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemoveMedia}
                data-testid="button-remove-media"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaSelect}
                className="hidden"
                id="media-upload"
              />
              <label htmlFor="media-upload">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  type="button"
                  asChild
                  data-testid="button-add-image"
                >
                  <span className="cursor-pointer">
                    <ImageIcon className="h-5 w-5" />
                    Imagem
                  </span>
                </Button>
              </label>
              <label htmlFor="media-upload">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  type="button"
                  asChild
                  data-testid="button-add-video"
                >
                  <span className="cursor-pointer">
                    <Video className="h-5 w-5" />
                    Vídeo
                  </span>
                </Button>
              </label>
            </div>

            <Button
              onClick={handlePost}
              disabled={!content.trim()}
              data-testid="button-post"
            >
              Publicar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
