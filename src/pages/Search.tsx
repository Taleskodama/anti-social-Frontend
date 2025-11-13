import { useState } from "react";
import { Search as SearchIcon, Users, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import PostCard from "@/components/PostCard";
import avatar1 from "@assets/generated_images/Male_user_avatar_e6e3dcfc.png";
import avatar2 from "@assets/generated_images/User_avatar_with_glasses_65176678.png";
import avatar3 from "@assets/generated_images/Creative_user_avatar_3958f56e.png";
import avatar4 from "@assets/generated_images/Female_user_avatar_94d67f98.png";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const mockUsers = [
    { id: "1", name: "João Pedro", username: "@joaopedro", avatar: avatar1, followers: 234 },
    { id: "2", name: "Maria Clara", username: "@mariaclara", avatar: avatar2, followers: 456 },
    { id: "3", name: "Rafael Santos", username: "@rafaelsantos", avatar: avatar3, followers: 189 },
  ];

  const mockPosts = [
    {
      id: "sp1",
      author: { name: "Ana Silva", avatar: avatar4 },
      content: "Descobri essa técnica incrível de TypeScript! #typescript #webdev",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      likesCount: 45,
      commentsCount: 12,
    },
    {
      id: "sp2",
      author: { name: "Carlos Mendes", avatar: avatar1 },
      content: "Compartilhando meu projeto open source. Contribuições são bem-vindas! #opensource #javascript",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      likesCount: 67,
      commentsCount: 23,
    },
  ];

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = mockPosts.filter((post) =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Buscar</h1>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar usuários, posts, hashtags..."
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
                <FileText className="h-4 w-4 mr-2" />
                Tudo
              </TabsTrigger>
              <TabsTrigger value="users" data-testid="tab-users">
                <Users className="h-4 w-4 mr-2" />
                Usuários
              </TabsTrigger>
              <TabsTrigger value="posts" data-testid="tab-posts">
                <FileText className="h-4 w-4 mr-2" />
                Posts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6 mt-6">
              {filteredUsers.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Usuários</h3>
                  {filteredUsers.slice(0, 3).map((user) => (
                    <Card key={user.id} className="p-4 hover-elevate" data-testid={`card-user-${user.id}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <UserAvatar src={user.avatar} name={user.name} size="sm" />
                          <div>
                            <div className="font-semibold text-foreground">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.username}</div>
                            <div className="text-xs text-muted-foreground">{user.followers} seguidores</div>
                          </div>
                        </div>
                        <Button size="sm" data-testid={`button-follow-${user.id}`}>Seguir</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

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
                  <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhum resultado encontrado</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="users" className="space-y-4 mt-6">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="p-4 hover-elevate" data-testid={`card-user-${user.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <UserAvatar src={user.avatar} name={user.name} size="sm" />
                      <div>
                        <div className="font-semibold text-foreground">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.username}</div>
                        <div className="text-xs text-muted-foreground">{user.followers} seguidores</div>
                      </div>
                    </div>
                    <Button size="sm" data-testid={`button-follow-${user.id}`}>Seguir</Button>
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
              Encontre usuários, posts e hashtags interessantes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
