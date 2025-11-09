import CommentsSection from "../CommentsSection";
import avatar1 from "@assets/generated_images/Female_user_avatar_94d67f98.png";
import avatar2 from "@assets/generated_images/Male_user_avatar_e6e3dcfc.png";

export default function CommentsSectionExample() {
  const mockComments = [
    {
      id: "c1",
      author: { name: "João Pedro", avatar: avatar2 },
      content: "Muito bom! Adorei esse post.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <CommentsSection
        postId="example"
        comments={mockComments}
        currentUser={{ name: "Você", avatar: avatar1 }}
      />
    </div>
  );
}
