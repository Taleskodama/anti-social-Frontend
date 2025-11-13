import { Hash, TrendingUp, Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/PostCard";
import avatar1 from "@assets/generated_images/Female_user_avatar_94d67f98.png";
import avatar2 from "@assets/generated_images/Male_user_avatar_e6e3dcfc.png";
import avatar3 from "@assets/generated_images/User_avatar_with_glasses_65176678.png";

export default function Trending() {
  const mockHashtags = [
    { tag: "typescript", count: 1234, trend: "+12%" },
    { tag: "webdev", count: 987, trend: "+8%" },
    { tag: "javascript", count: 856, trend: "+15%" },
    { tag: "react", count: 745, trend: "+5%" },
    { tag: "opensource", count: 623, trend: "+20%" },
    { tag: "nodejs", count: 512, trend: "+10%" },
  ];

  const mockTrendingPosts = [
    {
      id: "t1",
      author: { name: "Ana Silva", avatar: avatar1 },
      content: "Acabei de lançar meu novo projeto open source! 🚀 Contribuições são muito bem-vindas. #opensource #typescript",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      likesCount: 234,
      commentsCount: 45,
    },
    {
      id: "t2",
      author: { name: "Carlos Mendes", avatar: avatar2 },
      content: "Tutorial completo de React Hooks que eu gostaria de ter quando comecei. #react #webdev",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      likesCount: 189,
      commentsCount: 34,
    },
    {
      id: "t3",
      author: { name: "Marina Costa", avatar: avatar3 },
      content: "Dicas de performance para aplicações Node.js que podem melhorar muito sua aplicação. Thread 🧵 #nodejs #javascript",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      likesCount: 156,
      commentsCount: 28,
    },
  ];

  const mockTopCreators = [
    { name: "Ana Silva", username: "@anasilva", avatar: avatar1, posts: 45, engagement: "12.3k" },
    { name: "Carlos Mendes", username: "@carlosm", avatar: avatar2, posts: 38, engagement: "9.8k" },
    { name: "Marina Costa", username: "@marinac", avatar: avatar3, posts: 32, engagement: "8.5k" },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Flame className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tendências</h1>
            <p className="text-sm text-muted-foreground">
              Descubra o que está em alta na comunidade
            </p>
          </div>
        </div>

        <Tabs defaultValue="posts">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="posts" data-testid="tab-posts">
              <TrendingUp className="h-4 w-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="hashtags" data-testid="tab-hashtags">
              <Hash className="h-4 w-4 mr-2" />
              Hashtags
            </TabsTrigger>
            <TabsTrigger value="creators" data-testid="tab-creators">
              <Flame className="h-4 w-4 mr-2" />
              Criadores
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6 mt-6">
            {mockTrendingPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </TabsContent>

          <TabsContent value="hashtags" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {mockHashtags.map((hashtag, index) => (
                <Card
                  key={hashtag.tag}
                  className="p-4 hover-elevate cursor-pointer"
                  data-testid={`card-hashtag-${hashtag.tag}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-muted-foreground">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-foreground text-lg">
                            {hashtag.tag}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {hashtag.count.toLocaleString()} posts
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-green-500">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-semibold">{hashtag.trend}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="creators" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {mockTopCreators.map((creator, index) => (
                <Card
                  key={creator.username}
                  className="p-4 hover-elevate"
                  data-testid={`card-creator-${creator.username}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-muted-foreground">
                      #{index + 1}
                    </div>
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{creator.name}</div>
                      <div className="text-sm text-muted-foreground">{creator.username}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">{creator.posts} posts</div>
                      <div className="text-sm text-muted-foreground">
                        {creator.engagement} engajamento
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
