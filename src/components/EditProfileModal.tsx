import { useState } from "react";
import { Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UserAvatar from "./UserAvatar";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUser: {
    name: string;
    username: string;
    bio?: string;
    avatar?: string;
  };
  onSave?: (data: { name: string; username: string; bio: string; avatar?: string }) => void;
}

export default function EditProfileModal({
  open,
  onOpenChange,
  currentUser,
  onSave,
}: EditProfileModalProps) {
  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio || "");
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(currentUser.avatar);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave?.({ name, username, bio, avatar: avatarPreview });
    console.log("Profile updated:", { name, username, bio });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" data-testid="modal-edit-profile">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <UserAvatar src={avatarPreview} name={name} size="lg" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 h-8 w-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover-elevate"
                data-testid="button-change-avatar"
              >
                <Camera className="h-4 w-4 text-primary-foreground" />
              </label>
            </div>
            <p className="text-sm text-muted-foreground">Clique para alterar a foto</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                data-testid="input-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@seuusuario"
                data-testid="input-username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Conte um pouco sobre você..."
                className="resize-none"
                rows={4}
                data-testid="input-bio"
              />
              <p className="text-xs text-muted-foreground">
                {bio.length}/160 caracteres
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-testid="button-cancel"
            >
              Cancelar
            </Button>
            <Button onClick={handleSave} data-testid="button-save">
              Salvar Alterações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
