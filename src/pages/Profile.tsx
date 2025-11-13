import { useState } from "react";
import { UserPlus, UserCheck, Edit } from "lucide-react";
import EditProfileModal from "@/components/EditProfileModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserAvatar from "@/components/UserAvatar";
import PostCard from "@/components/PostCard";
import avatar1 from "@assets/generated_images/Female_user_avatar_94d67f98.png";
import avatar2 from "@assets/generated_images/Male_user_avatar_e6e3dcfc.png";
import avatar3 from "@assets/generated_images/User_avatar_with_glasses_65176678.png";

export default function Profile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(234);
  const [followingCount] = useState(189);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowersCount(isFollowing ? followersCount - 1 : followersCount + 1);
    console.log(isFollowing ? "Unfollowed" : "Followed");
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const mockPosts = [
    {
      id: "p1",
      author: { name: "Ana Silva", avatar: avatar1 },
      content: "Compartilhando meu progresso no projeto! Cada dia aprendendo algo novo. 🚀",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      likesCount: 45,
      commentsCount: 12,
    },
    {
      id: "p2",
      author: { name: "Ana Silva", avatar: avatar1 },
      content: "Reflexão do dia: A jornada é tão importante quanto o destino.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      likesCount: 67,
      commentsCount: 8,
    },
  ];

  const mockFollowers = [
    { id: "1", name: "João Pedro", avatar: avatar2, mutual: true },
    { id: "2", name: "Maria Clara", avatar: avatar3, mutual: false },
    { id: "3", name: "Carlos Mendes", avatar: avatar2, mutual: true },
  ];

  const mockFollowing = [
    { id: "4", name: "Rafael Santos", avatar: avatar3, mutual: true },
    { id: "5", name: "Marina Costa", avatar: avatar1, mutual: true },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <UserAvatar src={avatar1} name="Ana Silva" size="lg" />
            
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground" data-testid="text-profile-name">
                  Ana Silva
                </h1>
                <p className="text-muted-foreground mt-1">@anasilva</p>
              </div>

              <p className="text-foreground">
                Desenvolvedora full-stack apaixonada por criar experiências digitais significativas. 
                Sempre aprendendo e compartilhando conhecimento. ✨
              </p>

              <div className="flex gap-6 text-sm">
                <div>
                  <span className="font-bold text-foreground" data-testid="text-followers-count">
                    {followersCount}
                  </span>{" "}
                  <span className="text-muted-foreground">Seguidores</span>
                </div>
                <div>
                  <span className="font-bold text-foreground" data-testid="text-following-count">
                    {followingCount}
                  </span>{" "}
                  <span className="text-muted-foreground">Seguindo</span>
                </div>
                <div>
                  <span className="font-bold text-foreground">24</span>{" "}
                  <span className="text-muted-foreground">Posts</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleFollow}
                  className="gap-2"
                  variant={isFollowing ? "secondary" : "default"}
                  data-testid="button-follow"
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="h-4 w-4" />
                      Seguindo
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Seguir
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleEdit} data-testid="button-edit-profile">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="posts">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="posts" data-testid="tab-posts">Posts</TabsTrigger>
            <TabsTrigger value="followers" data-testid="tab-followers">Seguidores</TabsTrigger>
            <TabsTrigger value="following" data-testid="tab-following">Seguindo</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6 mt-6">
            {mockPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </TabsContent>

          <TabsContent value="followers" className="space-y-4 mt-6">
            {mockFollowers.map((follower) => (
              <Card key={follower.id} className="p-4 hover-elevate" data-testid={`card-follower-${follower.id}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserAvatar src={follower.avatar} name={follower.name} size="sm" />
                    <div>
                      <div className="font-semibold text-foreground">{follower.name}</div>
                      {follower.mutual && (
                        <div className="text-xs text-muted-foreground">Seguindo você</div>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" data-testid={`button-view-${follower.id}`}>
                    Ver Perfil
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="following" className="space-y-4 mt-6">
            {mockFollowing.map((following) => (
              <Card key={following.id} className="p-4 hover-elevate" data-testid={`card-following-${following.id}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserAvatar src={following.avatar} name={following.name} size="sm" />
                    <div>
                      <div className="font-semibold text-foreground">{following.name}</div>
                      {following.mutual && (
                        <div className="text-xs text-muted-foreground">Segue você</div>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="secondary" data-testid={`button-unfollow-${following.id}`}>
                    Deixar de Seguir
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <EditProfileModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          currentUser={{
            name: "Ana Silva",
            username: "@anasilva",
            bio: "Desenvolvedora full-stack apaixonada por criar experiências digitais significativas. Sempre aprendendo e compartilhando conhecimento. ✨",
            avatar: avatar1,
          }}
        />
      </div>
    </div>
  );
}
