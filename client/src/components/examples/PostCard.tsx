import PostCard from "../PostCard";
import avatar1 from "@assets/generated_images/Female_user_avatar_94d67f98.png";

export default function PostCardExample() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <PostCard
        id="1"
        author={{ name: "Ana Silva", avatar: avatar1 }}
        content="Acabei de terminar um projeto incrível! A sensação de ver tudo funcionando é incomparável. 🚀"
        timestamp={new Date(Date.now() - 1000 * 60 * 30)}
        likesCount={24}
        commentsCount={5}
      />
      <PostCard
        id="2"
        author={{ name: "Carlos Mendes" }}
        content="Bom dia! Alguém tem dicas de recursos para aprender TypeScript?"
        timestamp={new Date(Date.now() - 1000 * 60 * 60 * 2)}
        likesCount={12}
        commentsCount={8}
        isLiked
      />
    </div>
  );
}
