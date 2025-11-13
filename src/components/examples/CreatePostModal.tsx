import { useState } from "react";
import CreatePostModal from "../CreatePostModal";
import { Button } from "@/components/ui/button";
import avatar1 from "@assets/generated_images/Female_user_avatar_94d67f98.png";

export default function CreatePostModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Criar Publicação</Button>
      <CreatePostModal
        open={open}
        onOpenChange={setOpen}
        currentUser={{ name: "Você", avatar: avatar1 }}
      />
    </div>
  );
}
