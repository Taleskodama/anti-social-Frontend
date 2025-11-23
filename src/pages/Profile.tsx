import { useEffect, useState } from "react";
import { UserPlus, UserCheck, Edit } from "lucide-react";
// Imports corrigidos (../)
import EditProfileModal from "../components/EditProfileModal";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import UserAvatar from "../components/UserAvatar";
import api from "../services/api";

const avatar1 = undefined;

export default function Profile() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const userId = localStorage.getItem("user_id");
      const userName = localStorage.getItem("user_name");

      if (userId) {
        // --- CORREÇÃO AQUI: Mudei de /user para /users (Plural) ---
        const response = await api.get(`/users/${userId}`);
        setUser(response.data);
      } else {
        setUser({
          name: userName || "Usuário",
          email: "usuario@exemplo.com",
          bio: "Sem bio ainda.",
        });
      }
    } catch (error) {
      console.error(
        "Erro ao carregar perfil. Verifique se a rota é /users",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return <div className="p-10 text-center">Carregando perfil...</div>;

  const userData = user || { name: "Usuário", email: "usuario" };
  const displayUsername = userData.email
    ? `@${userData.email.split("@")[0]}`
    : "@usuario";

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <UserAvatar src={avatar1} name={userData.name} size="lg" />

            <div className="flex-1 space-y-4">
              <div>
                <h1
                  className="text-3xl font-bold text-foreground"
                  data-testid="text-profile-name"
                >
                  {userData.name}
                </h1>
                <p className="text-muted-foreground mt-1">{displayUsername}</p>
              </div>

              <p className="text-foreground">
                {userData.bio ||
                  "Este usuário ainda não escreveu uma biografia."}
              </p>

              {userData.developmentGoals && (
                <p className="text-sm text-blue-500 font-medium mt-2">
                  Meta Atual: {userData.developmentGoals}
                </p>
              )}

              <div className="flex gap-6 text-sm">
                <div>
                  <span className="font-bold text-foreground">0</span>{" "}
                  <span className="text-muted-foreground">Seguidores</span>
                </div>
                <div>
                  <span className="font-bold text-foreground">0</span>{" "}
                  <span className="text-muted-foreground">Seguindo</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setEditModalOpen(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="posts">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="followers">Seguidores</TabsTrigger>
            <TabsTrigger value="following">Seguindo</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6 mt-6">
            <p className="text-muted-foreground text-center">
              Ainda não há posts para exibir.
            </p>
          </TabsContent>

          <TabsContent value="followers" className="space-y-4 mt-6">
            <p className="text-muted-foreground text-center">
              Sua lista de seguidores aparecerá aqui.
            </p>
          </TabsContent>
        </Tabs>

        <EditProfileModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          currentUser={{
            name: userData.name,
            username: displayUsername,
            bio: userData.bio,
            avatar: avatar1,
          }}
          onSuccess={loadProfile}
        />
      </div>
    </div>
  );
}
