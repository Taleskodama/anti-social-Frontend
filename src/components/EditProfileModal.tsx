import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import UserAvatar from "./UserAvatar";
import api from "../services/api";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUser: {
    name: string;
    username: string;
    bio?: string;
    avatar?: string;
  };
  onSuccess?: () => void;
}

export default function EditProfileModal({
  open,
  onOpenChange,
  currentUser,
  onSuccess,
}: EditProfileModalProps) {
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio || "");
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (open) {
      setName(currentUser.name);
      setBio(currentUser.bio || "");
      setErrorMessage("");
    }
  }, [open, currentUser]);

  const handleSave = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const userId = localStorage.getItem("user_id");

      await api.put(`/users/${userId}`, {
        name,
        bio,
      });

      console.log("Perfil atualizado!");
      localStorage.setItem("user_name", name);

      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Erro ao salvar:", error);

      if (error.response?.data?.errors?.[0]?.mensagem) {
        setErrorMessage(error.response.data.errors[0].mensagem);
      } else if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Erro ao salvar. Verifique sua conexão.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <UserAvatar src={currentUser.avatar} name={name} size="lg" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
              />
            </div>

            <div className="space-y-2 opacity-50 cursor-not-allowed">
              <Label>Usuário (Gerado pelo email)</Label>
              <Input value={currentUser.username} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Conte sobre você..."
                className="resize-none"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">{bio.length}/160</p>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
              ⚠️ {errorMessage}
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
