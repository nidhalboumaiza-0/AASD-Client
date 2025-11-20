import React, { useContext } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import AvatarBubble from "@/components/custom/avatar-bubble";
import LayoutSider from "@/components/custom/layout-sider";
import { AuthContext } from "@/contexts/AuthContextProvider";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { user } = useContext(AuthContext);

  return (
    <Layout className="h-[100vh] overflow-hidden">
      <LayoutSider />
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
          }}
          className="flex items-center justify-end px-4"
        >
          <AvatarBubble image={user?.profilePicture} />
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
          className="overflow-y-scroll"
        >
          <div
            style={{
              padding: 24,
              minHeight: 730,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          AASD ©{new Date().getFullYear()} Created with ❤️
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
