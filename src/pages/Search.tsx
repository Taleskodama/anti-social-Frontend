import { useState, useEffect } from "react";
import { Search as SearchIcon, Users, FileText, Check } from "lucide-react";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import UserAvatar from "../components/UserAvatar";
import PostCard from "../components/PostCard";
import api from "../services/api";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- NOVO ESTADO: Lista de IDs de quem eu já sigo ---
  const [followingIds, setFollowingIds] = useState<string[]>([]);

  const currentUserId = localStorage.getItem("user_id");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      // 1. Buscar Posts
      const postsRes = await api.get("/activities");
      const formattedPosts = postsRes.data.map((post: any) => ({
        ...post,
        content: post.description || post.title,
        timestamp: post.creationDate ? new Date(post.creationDate) : new Date(),
        author: { name: post.author?.name || "Usuário", avatar: undefined },
        mediaUrl: post.mediaUrl,
        commentsCount: post.comments?.length || 0,
        likesCount: post.incentives?.length || 0,
      }));
      setPosts(formattedPosts);

      // 2. Buscar Usuários
      try {
        const usersRes = await api.get("/users");
        setUsers(usersRes.data);
      } catch (e) {
        console.warn("Rota de listar usuários indisponível.");
      }

      // 3. BUSCAR QUEM EU SIGO (Para pintar os botões corretamente)
      if (currentUserId) {
        try {
          const followingRes = await api.get(
            `/connections/following/${currentUserId}`
          );
          // O backend retorna as conexões, pegamos os IDs dos usuários seguidos (user2)
          const ids = followingRes.data.map((conn: any) => conn.user2.id);
          setFollowingIds(ids);
        } catch (e) {
          console.error("Erro ao carregar seguindo", e);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    } finally {
      setLoading(false);
    }
  }

  // Lógica de Filtro
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = posts.filter(
    (post) =>
      post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- FUNÇÃO DE SEGUIR ATUALIZADA ---
  const handleFollow = async (userId: string) => {
    try {
      await api.post("/connections", { user2: userId });

      // Atualiza visualmente na hora (adiciona o ID na lista)
      setFollowingIds((prev) => [...prev, userId]);
    } catch (error) {
      console.error(error);
      alert("Erro ao seguir. Talvez você já siga este usuário.");
    }
  };

  // Componente auxiliar para renderizar o botão de seguir
  const FollowButton = ({ userId }: { userId: string }) => {
    // Se for eu mesmo, não mostra botão
    if (userId === currentUserId) return null;

    const isFollowing = followingIds.includes(userId);

    if (isFollowing) {
      return (
        <Button
          size="sm"
          variant="ghost"
          className="text-green-600 cursor-default hover:text-green-700 hover:bg-transparent"
        >
          <Check className="h-4 w-4 mr-1" /> Seguindo
        </Button>
      );
    }

    return (
      <Button size="sm" onClick={() => handleFollow(userId)}>
        Seguir
      </Button>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Buscar</h1>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar usuários ou posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
              data-testid="input-search"
            />
          </div>
        </div>

        {searchQuery && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all" data-testid="tab-all">
                <FileText className="h-4 w-4 mr-2" /> Tudo
              </TabsTrigger>
              <TabsTrigger value="users" data-testid="tab-users">
                <Users className="h-4 w-4 mr-2" /> Usuários
              </TabsTrigger>
              <TabsTrigger value="posts" data-testid="tab-posts">
                <FileText className="h-4 w-4 mr-2" /> Posts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6 mt-6">
              {/* USUÁRIOS */}
              {filteredUsers.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Usuários</h3>
                  {filteredUsers.slice(0, 3).map((user) => (
                    <Card key={user.id} className="p-4 hover-elevate">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <UserAvatar name={user.name} size="sm" />
                          <div>
                            <div className="font-semibold text-foreground">
                              {user.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              @{user.email?.split("@")[0]}
                            </div>
                          </div>
                        </div>
                        {/* Botão inteligente */}
                        <FollowButton userId={user.id} />
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* POSTS */}
              {filteredPosts.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Posts</h3>
                  {filteredPosts.slice(0, 3).map((post) => (
                    <PostCard key={post.id} {...post} />
                  ))}
                </div>
              )}

              {filteredUsers.length === 0 && filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Nenhum resultado encontrado
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="users" className="space-y-4 mt-6">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="p-4 hover-elevate">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} size="sm" />
                      <div>
                        <div className="font-semibold text-foreground">
                          {user.name}
                        </div>
                      </div>
                    </div>
                    <FollowButton userId={user.id} />
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="posts" className="space-y-6 mt-6">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </TabsContent>
          </Tabs>
        )}

        {!searchQuery && (
          <div className="text-center py-12">
            <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Busque por qualquer coisa
            </h3>
            <p className="text-muted-foreground">
              Encontre usuários e posts interessantes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
