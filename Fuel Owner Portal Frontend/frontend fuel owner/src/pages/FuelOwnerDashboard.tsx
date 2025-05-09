import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  CarOutlined,
  SettingOutlined,
  LogoutOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Fuel } from 'lucide-react';
import { Layout, Menu, theme, Button, Dropdown, Space, Avatar, MenuProps, Row, Col } from "antd";
import Card from "../components/Fuel Owner Dashboard/Card"; 

const { Header, Content, Footer, Sider } = Layout;

const FuelOwnerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Define navigation items
  const navigationItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin/dashboard"),
    },
    {
      key: "operators",
      icon: <UserOutlined />,
      label: "Operators",
      onClick: () => navigate("/admin/operators"),
    },
    {
      key: "vehicles",
      icon: <CarOutlined />,
      label: "Vehicles",
      onClick: () => navigate("/admin/vehicles"),
    },
    {
      key: "reports",
      icon: <FileTextOutlined />,
      label: "Reports",
      onClick: () => navigate("/admin/reports"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/admin/settings"),
    },
  ];

  const selectedKey = location.pathname.split("/")[2] || "dashboard";

  // User dropdown menu
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
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
        navigate("/login");
      },
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
            {collapsed ? "FQMS" : "FQMS Owner Portal"}
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
            overflow: "initial",
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
            }}
          >
            {/* Dashboard Cards */}
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                  title="Total Revenue"
                  content="$24,000"
                  icon={<DashboardOutlined />}
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                  title="Total Operators"
                  content="1,600"
                  icon={<UserOutlined />}
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                  title="Vehicles"
                  content="450"
                  icon={<CarOutlined />}
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                  title="Remaining  Fuel"
                  content="10 000"
                  icon={<Fuel />}
                />
              </Col>
            </Row>
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

export default FuelOwnerDashboard;