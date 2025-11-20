import React, { useContext } from "react";
import {
  HomeOutlined,
  FileTextOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  WechatOutlined,
  FileDoneOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContextProvider";
import { useToast } from "../ui/use-toast";

const { Sider } = Layout;

const LayoutSider = () => {
  const { user, setUser, setToken, setIsLoggedIn } = useContext(AuthContext);

  const { toast } = useToast();
  const Navigate = useNavigate();

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
    Navigate("/login");
    setUser(null);
    setToken(null);
    setIsLoggedIn(null);
  };

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link to="/">Accueil</Link>,
    },
    user?.role === "Patient" && {
      key: "2.1",
      icon: <PlusCircleOutlined />,
      label: <Link to="/requests/new">Nouvelle demande</Link>,
    },
    {
      key: "3",
      icon: <FileDoneOutlined />,
      label: <Link to="/consultations">Mes consultations</Link>,
    },
    {
      key: "4",
      icon: <WechatOutlined />,
      label: <Link to="/discussions">Mes discussions</Link>,
    },
    {
      key: "5",
      icon: <LogoutOutlined />,
      label: (
        <a
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          Déconnexion
        </a>
      ),
    },
  ];
  return (
    <Sider breakpoint="lg" theme="light" collapsedWidth="0">
      <div
        className="demo-logo-vertical text-white flex items-center justify-center text-lg font-bold"
        style={{ letterSpacing: "2px" }}
      >
        AASD
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menuItems}
      />
    </Sider>
  );
};

export default LayoutSider;
