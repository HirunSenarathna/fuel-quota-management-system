import React, { useState } from "react";
import { Layout, theme, Button, Dropdown, Space, Avatar, MenuProps } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import Sidebar from "../components/Fuel Owner Dashboard/Sidebar";

const { Header, Content } = Layout;

interface FuelOwnerLayoutProps {
  children: React.ReactNode;
}

const FuelOwnerLayout: React.FC<FuelOwnerLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "divider",
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => {
        // logout logic
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "all 0.2s",
          width: "100%",
        }}
      >
        <Header
          style={{
            padding: "0px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Button type="text">
              <Space>
                <Avatar icon={<UserOutlined />} />
                Admin User
              </Space>
            </Button>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 24px 0",
            overflow: "auto",
            width: "auto",
          }}
        >
          {children}
        </Content>
        
      </Layout>
    </Layout>
  );
};

export default FuelOwnerLayout;