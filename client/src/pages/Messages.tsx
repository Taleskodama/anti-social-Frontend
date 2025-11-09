import { useState } from "react";
import { Send, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import avatar1 from "@assets/generated_images/Male_user_avatar_e6e3dcfc.png";
import avatar2 from "@assets/generated_images/User_avatar_with_glasses_65176678.png";
import avatar3 from "@assets/generated_images/Creative_user_avatar_3958f56e.png";
import avatar4 from "@assets/generated_images/Female_user_avatar_94d67f98.png";

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState("1");
  const [newMessage, setNewMessage] = useState("");

  const mockConversations = [
    {
      id: "1",
      user: { name: "João Pedro", avatar: avatar1 },
      lastMessage: "Vamos marcar aquele café?",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      unread: 2,
    },
    {
      id: "2",
      user: { name: "Maria Clara", avatar: avatar2 },
      lastMessage: "Obrigada pela ajuda!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unread: 0,
    },
    {
      id: "3",
      user: { name: "Rafael Santos", avatar: avatar3 },
      lastMessage: "Você viu meu último post?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      unread: 1,
    },
  ];

  const mockMessages = {
    "1": [
      {
        id: "m1",
        text: "Oi! Como você está?",
        sender: "João Pedro",
        isMine: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: "m2",
        text: "Oi João! Estou bem, e você?",
        sender: "Você",
        isMine: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 28),
      },
      {
        id: "m3",
        text: "Muito bem também! Vamos marcar aquele café?",
        sender: "João Pedro",
        isMine: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
      },
    ],
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const currentChat = mockConversations.find((c) => c.id === selectedChat);
  const messages = mockMessages[selectedChat as keyof typeof mockMessages] || [];

  return (
    <div className="h-screen">
      <div className="h-full max-w-6xl mx-auto p-6">
        <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 p-4 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Mensagens</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas..."
                  className="pl-10"
                  data-testid="input-search-messages"
                />
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="space-y-2">
                {mockConversations.map((conversation) => (
                  <Card
                    key={conversation.id}
                    className={`p-3 cursor-pointer hover-elevate ${
                      selectedChat === conversation.id ? "border-primary" : ""
                    }`}
                    onClick={() => setSelectedChat(conversation.id)}
                    data-testid={`card-conversation-${conversation.id}`}
                  >
                    <div className="flex gap-3">
                      <UserAvatar src={conversation.user.avatar} name={conversation.user.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-foreground truncate">
                            {conversation.user.name}
                          </div>
                          {conversation.unread > 0 && (
                            <div
                              className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center"
                              data-testid={`badge-unread-${conversation.id}`}
                            >
                              {conversation.unread}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono mt-1">
                          {formatDistanceToNow(conversation.timestamp, { addSuffix: true, locale: ptBR })}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>

          <Card className="md:col-span-2 flex flex-col">
            {currentChat && (
              <>
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <UserAvatar src={currentChat.user.avatar} name={currentChat.user.name} size="sm" />
                  <div>
                    <div className="font-semibold text-foreground" data-testid="text-current-chat-name">
                      {currentChat.user.name}
                    </div>
                    <div className="text-xs text-muted-foreground">Online</div>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
                        data-testid={`message-${message.id}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.isMine
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          <div className="text-sm">{message.text}</div>
                          <div className="text-xs opacity-70 mt-1 font-mono">
                            {formatDistanceToNow(message.timestamp, { addSuffix: true, locale: ptBR })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                      data-testid="input-new-message"
                    />
                    <Button type="submit" size="icon" data-testid="button-send-message">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
