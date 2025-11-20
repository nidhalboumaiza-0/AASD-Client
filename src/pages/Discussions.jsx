import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "@/contexts/AuthContextProvider";
import { getConversations, getMessages } from "@/lib/api";
import { Typography } from "antd";
import { CornerDownLeft } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { io } from "socket.io-client";

const Chat = ({ selectedChat }) => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = React.useState(null);
  const [discussion, setDiscussion] = React.useState([]);
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    const newSocket = io("http://127.0.0.1:3000", {
      query: { userId: user?._id }, // replace 'yourUserId' with the actual user ID
    });

    console.log(newSocket);

    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("userConnected", user?._id); // replace 'yourUserId' with the actual user ID
    });

    return () => newSocket.close();
  }, [setSocket, selectedChat]);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", async (message) => {
      console.log("New message:", message);
      console.log(selectedChat);

      const data = await getMessages(selectedChat?.userId);
      const temp = data?.data?.messages?.map((message) => {
        return {
          id: message?.sender?._id,
          message: message?.message,
        };
      });



      setDiscussion(temp);
    });
  }, [socket, selectedChat]);

  const onSend = (userId) => {
    if (socket) socket.emit("sendMessage", userId, message);
    setDiscussion([...discussion, { id: user?._id, message }]);
    setMessage("");
  };

  useEffect(() => {
    const chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;
    console.log(discussion);
  }, [discussion]);

  useEffect(() => {
    async function fetchData() {
      if (selectedChat?.userId) {
        const data = await getMessages(selectedChat?.userId);
        const temp = data?.data?.messages?.map((message) => {
          return {
            id: message?.sender?._id,
            message: message?.message,
          };
        });
        setDiscussion(temp);
      }
    }

    fetchData();
  }, [selectedChat]);

  return (
    <div className="bg-slate-50 dark:bg-black rounded-sm p-3 h-full">
      <div className="flex items-center space-x-2 px-1 cursor-pointer bg-white dark:bg-slate-950 border dark:text-white  rounded-sm py-2 mb-2">
        <Avatar style={{ width: "32px", height: "32px" }}>
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback className="uppercase">
            {selectedChat?.full_name?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <Typography.Text>{selectedChat?.full_name}</Typography.Text>
        </div>
      </div>

      <div className="h-[400px] overflow-y-scroll pb-4" id="chat">
        {discussion?.map((message, index) => {
          return (
            <div
              key={index}
              className={`${message?.id === user?._id ? "flex-row-reverse" : "flex-row"
                } flex my-1 `}
            >
              <div
                className={`${message?.id === user?._id
                  ? "bg-primary"
                  : "bg-white dark:bg-zinc-900"
                  } p-2 rounded-lg max-w-[80%]`}
              >
                <Typography.Text
                  className={`${message?.id === user?._id
                    ? "text-white"
                    : "text-black dark:text-white"
                    }`}
                >
                  {message?.message}
                </Typography.Text>
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          value={message}
          id="message"
          placeholder="Type your message here..."
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <Button
            size="sm"
            className="ml-auto gap-1.5"
            onClick={() => onSend(selectedChat?.userId)}
          >
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const ChatBullets = ({ chatBullets, handleSelectChat }) => {
  return (
    <div className="h-full border p-2 rounded-sm">
      <div className="flex flex-col gap-2">
        {chatBullets?.map((chat, index) => {
          return (
            <div
              key={index}
              className="flex items-center space-x-2 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-sm px-2 py-1 cursor-pointer"
              onClick={() => {
                handleSelectChat(chat);
              }}
            >
              <Avatar style={{ width: "32px", height: "32px" }}>
                <AvatarImage src="error" alt="@shadcn" />
                <AvatarFallback className="uppercase">
                  {chat?.full_name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <Typography.Text>{chat?.full_name}</Typography.Text>
                <br />
                <Typography.Text type="secondary">
                  {chat?.last_message}
                </Typography.Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Discussions = () => {
  const { user } = useContext(AuthContext);
  const [chatBulltes, setChatBulltes] = React.useState([]);
  const [selectedChat, setSelectedChat] = React.useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getConversations();

      if (user?.role === "Patient") {
        const conversations = data?.data?.conversations?.map((conversation) => {
          return {
            userId: conversation?.personnelSante?._id,
            full_name:
              conversation?.personnelSante?.firstName +
              " " +
              conversation?.personnelSante?.lastName,
            last_message:
              conversation?.messages.length > 0
                ? conversation?.messages[conversation?.messages.length - 1]
                  ?.message
                : "",
          };
        });
        setChatBulltes(conversations);
        setSelectedChat(conversations[0]);
      } else {
        const conversations = data?.data?.conversations?.map((conversation) => {
          return {
            userId: conversation?.patient?._id,
            full_name:
              conversation?.patient?.firstName +
              +" " +
              conversation?.patient?.lastName,
            last_message:
              conversation?.messages.length > 0
                ? conversation?.messages[conversation?.messages.length - 1]
                  ?.message
                : "",
          };
        });
        setChatBulltes(conversations);
        setSelectedChat(conversations[0]);
      }
      console.log(data);
    }

    fetchData();
  }, []);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  useEffect(() => {
    console.log(selectedChat);
  }, [selectedChat]);
  return (
    <div>
      <Typography.Title level={3}>Mes discussions 💬</Typography.Title>
      <div className="flex flex-wrap h-[600px]">
        <div className="h-full w-full sm:w-full md:w-1/2 lg:w-1/3 px-2">
          <ChatBullets
            chatBullets={chatBulltes}
            handleSelectChat={handleSelectChat}
          />
        </div>
        <div className="h-full w-full sm:w-full md:w-1/2 lg:w-2/3 px-2">
          <Chat selectedChat={selectedChat} />
        </div>
      </div>
    </div>
  );
};

export default Discussions;
