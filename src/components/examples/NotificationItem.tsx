import NotificationItem from "../NotificationItem";
import avatar1 from "@assets/generated_images/Male_user_avatar_e6e3dcfc.png";
import avatar2 from "@assets/generated_images/User_avatar_with_glasses_65176678.png";

export default function NotificationItemExample() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <NotificationItem
        id="1"
        type="like"
        user={{ name: "João Pedro", avatar: avatar1 }}
        timestamp={new Date(Date.now() - 1000 * 60 * 15)}
      />
      <NotificationItem
        id="2"
        type="comment"
        user={{ name: "Maria Clara", avatar: avatar2 }}
        content="Que incrível! Parabéns pelo projeto."
        timestamp={new Date(Date.now() - 1000 * 60 * 45)}
        isRead
      />
      <NotificationItem
        id="3"
        type="follow"
        user={{ name: "Lucas Santos" }}
        timestamp={new Date(Date.now() - 1000 * 60 * 120)}
      />
    </div>
  );
}
