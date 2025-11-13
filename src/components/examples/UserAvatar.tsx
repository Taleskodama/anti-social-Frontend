import UserAvatar from "../UserAvatar";

export default function UserAvatarExample() {
  return (
    <div className="flex gap-4 items-center p-8">
      <UserAvatar name="João Silva" size="sm" />
      <UserAvatar name="Maria Santos" size="md" />
      <UserAvatar name="Pedro Costa" size="lg" />
    </div>
  );
}
