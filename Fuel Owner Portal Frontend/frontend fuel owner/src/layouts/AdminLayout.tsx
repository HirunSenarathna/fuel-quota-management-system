import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  IeOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button, Dropdown, Space, Avatar } from "antd";
import type { MenuProps } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Handle logout function
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    console.log(
      "Token removed from localStorage",
      localStorage.getItem("token")
    );
    navigate("/signin");
  };

  // Define navigation items
  const navigationItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin/dashboard"),
    },
    {
      key: "stations",
      icon: <HomeOutlined />,
      label: "Stations",
      onClick: () => navigate("/admin/stations"),
    },
    {
      key: "analytics",
      icon: <IeOutlined />,
      label: "Reports",
      onClick: () => navigate("/admin/reports"),
    },
  ];

  // Determine the current selected key based on the URL path
  const selectedKey = location.pathname.split("/")[2] || "dashboard";

  // User dropdown menu items
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout, // Use the handleLogout function
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        theme="light"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          boxShadow: "2px 0 8px 0 rgba(0,0,0,0.05)",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <h2 style={{ color: "#1890ff", margin: 0 }}>
            {collapsed ? "FQMS" : "FQMS Admin"}
          </h2>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={navigationItems}
        />
      </Sider>
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
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 64px - 69px - 48px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              overflowY: "auto",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            padding: "24px",
            background: colorBgContainer,
          }}
        >
          Fuel Quota Management System ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
