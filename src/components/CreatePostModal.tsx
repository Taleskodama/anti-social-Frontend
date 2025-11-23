import { useState } from "react";
import { X, Image as ImageIcon, Video, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import UserAvatar from "./UserAvatar";
import api from "../services/api";
import { Button } from "./ui/button";

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUser: {
    name: string;
    avatar?: string;
  };
  onSuccess?: () => void;
}

export default function CreatePostModal({
  open,
  onOpenChange,
  currentUser,
  onSuccess,
}: CreatePostModalProps) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setMediaPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveMedia = () => {
    setMediaPreview(null);
    setMediaFile(null);
  };

  const handlePost = async () => {
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      await api.post("/activities", {
        title: "Publicação",
        description: content,
        mediaUrl: mediaPreview || undefined,
      });

      console.log("Post criado com sucesso!");

      setContent("");
      handleRemoveMedia();
      onOpenChange(false);

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Erro ao publicar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
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
            <div className="font-semibold text-foreground">
              {currentUser.name}
            </div>
          </div>

          <Textarea
            placeholder="No que você está pensando?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-32 resize-none text-base"
            data-testid="input-post-content"
            disabled={isLoading}
          />

          {mediaPreview && (
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={mediaPreview}
                alt="Preview"
                className="w-full max-h-96 object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemoveMedia}
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
                >
                  <span className="cursor-pointer">
                    <ImageIcon className="h-5 w-5" /> Imagem
                  </span>
                </Button>
              </label>
            </div>

            <Button
              onClick={handlePost}
              disabled={!content.trim() || isLoading}
              data-testid="button-post"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Publicando...
                </>
              ) : (
                "Publicar"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
