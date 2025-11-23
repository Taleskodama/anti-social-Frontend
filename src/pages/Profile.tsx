import { useEffect, useState } from "react";
import { Edit, User } from "lucide-react";
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
import PostCard from "../components/PostCard"; // Importante para a aba de posts
import api from "../services/api";

const avatar1 = undefined;

export default function Profile() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Estados para as listas e contagens
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [followers, setFollowers] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);

  useEffect(() => {
    loadFullProfile();
  }, []);

  async function loadFullProfile() {
    try {
      const userId = localStorage.getItem("user_id");
      const userName = localStorage.getItem("user_name");

      if (userId) {
        // 1. Pega dados do Usuário
        const userRes = await api.get(`/users/${userId}`);
        setUser(userRes.data);

        // 2. Pega TODOS os posts e filtra os meus
        // (No futuro o backend teria uma rota /users/:id/posts, mas pro MVP filtramos aqui)
        const postsRes = await api.get("/activities");
        const myPostsFiltered = postsRes.data.filter(
          (p: any) => p.authorId === userId || p.author?.id === userId
        );

        // Formata os posts igual no Feed para usar no PostCard
        const formattedPosts = myPostsFiltered.map((post: any) => {
          let dataPost = new Date();
          const dataVindaDoBanco = post.creationDate || post.created_at;
          if (dataVindaDoBanco) {
            const dbDate = new Date(dataVindaDoBanco);
            if (!isNaN(dbDate.getTime())) {
              dataPost = new Date(dbDate.getTime() - 3 * 60 * 60 * 1000);
            }
          }
          return {
            ...post,
            timestamp: dataPost,
            mediaUrl: post.mediaUrl,
            commentsCount: post.comments?.length || 0,
            likesCount: post.incentives?.length || 0,
            author: { name: userRes.data.name, avatar: avatar1 }, // Garante dados do autor
          };
        });
        setMyPosts(formattedPosts);

        // 3. Pega Seguidores
        const followersRes = await api.get(`/connections/followers/${userId}`);
        setFollowers(followersRes.data);

        // 4. Pega Seguindo
        const followingRes = await api.get(`/connections/following/${userId}`);
        setFollowing(followingRes.data);
      } else {
        // Fallback se não tiver login
        setUser({
          name: userName || "Usuário",
          email: "usuario@exemplo.com",
          bio: "Sem bio ainda.",
        });
      }
    } catch (error) {
      console.error("Erro ao carregar perfil completo", error);
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
                  {/* NÚMEROS REAIS AQUI */}
                  <span className="font-bold text-foreground">
                    {followers.length}
                  </span>{" "}
                  <span className="text-muted-foreground">Seguidores</span>
                </div>
                <div>
                  <span className="font-bold text-foreground">
                    {following.length}
                  </span>{" "}
                  <span className="text-muted-foreground">Seguindo</span>
                </div>
                <div>
                  <span className="font-bold text-foreground">
                    {myPosts.length}
                  </span>{" "}
                  <span className="text-muted-foreground">Posts</span>
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

          {/* ABA DE POSTS */}
          <TabsContent value="posts" className="space-y-6 mt-6">
            {myPosts.length === 0 ? (
              <p className="text-muted-foreground text-center">
                Você ainda não tem publicações.
              </p>
            ) : (
              myPosts.map((post) => (
                <PostCard
                  key={post.id}
                  {...post}
                  // Passamos currentUser para o card saber quem somos
                  currentUser={{ name: userData.name, avatar: avatar1 }}
                />
              ))
            )}
          </TabsContent>

          {/* ABA DE SEGUIDORES */}
          <TabsContent value="followers" className="space-y-4 mt-6">
            {followers.length === 0 ? (
              <p className="text-muted-foreground text-center">
                Ninguém te segue ainda.
              </p>
            ) : (
              followers.map((conn: any) => (
                <Card key={conn.id} className="p-4 flex items-center gap-3">
                  <UserAvatar name={conn.user1?.name || "Anônimo"} />
                  <div>
                    <p className="font-bold">{conn.user1?.name}</p>
                    <p className="text-xs text-muted-foreground">Seguidor</p>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* ABA DE SEGUINDO */}
          <TabsContent value="following" className="space-y-4 mt-6">
            {following.length === 0 ? (
              <p className="text-muted-foreground text-center">
                Você não segue ninguém.
              </p>
            ) : (
              following.map((conn: any) => (
                <Card key={conn.id} className="p-4 flex items-center gap-3">
                  <UserAvatar name={conn.user2?.name || "Anônimo"} />
                  <div>
                    <p className="font-bold">{conn.user2?.name}</p>
                    <p className="text-xs text-muted-foreground">Seguindo</p>
                  </div>
                </Card>
              ))
            )}
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
          onSuccess={loadFullProfile}
        />
      </div>
    </div>
  );
}
