import React, { useContext } from "react";
import { Avatar, Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useToast } from "../ui/use-toast";
import { AuthContext } from "@/contexts/AuthContextProvider";

const AvatarBubble = ({ image }) => {
  const { toast } = useToast();
  const Navigate = useNavigate();
  const {setUser, setToken, setIsLoggedIn} = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    toast({
      title: "Vers le bien-être et au-delà",
      description: (
        <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-white">Au revoir tu vas nous manquer 😢</p>
        </div>
      ),
    });
    setUser(null);
    setToken(null);
    setIsLoggedIn(null);
    Navigate("/login");
  };

  const items = [
    {
      label: (
        <Link to="/me">
          <UserOutlined /> Mon profil
        </Link>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          <LogoutOutlined /> Déconnexion
        </a>
      ),
      key: "1",
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Avatar
          src={import.meta.env.VITE_API_CDN_SERVER + "/images/" + image}
        />
      </a>
    </Dropdown>
  );
};

export default AvatarBubble;
