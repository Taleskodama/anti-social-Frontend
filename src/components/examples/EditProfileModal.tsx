import { useState } from "react";
import EditProfileModal from "../EditProfileModal";
import { Button } from "@/components/ui/button";
import avatar1 from "@assets/generated_images/Female_user_avatar_94d67f98.png";

export default function EditProfileModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Editar Perfil</Button>
      <EditProfileModal
        open={open}
        onOpenChange={setOpen}
        currentUser={{
          name: "Ana Silva",
          username: "@anasilva",
          bio: "Desenvolvedora apaixonada por tecnologia",
          avatar: avatar1,
        }}
      />
    </div>
  );
}
