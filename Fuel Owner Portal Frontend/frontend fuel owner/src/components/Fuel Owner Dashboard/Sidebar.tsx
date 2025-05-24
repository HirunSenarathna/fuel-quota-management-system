import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  CarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define navigation items
  const navigationItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/owner/dashboard"),
    },
    {
      key: "operators",
      icon: <UserOutlined />,
      label: "Operators",
      onClick: () => navigate("/owner/operators"),
    },
    {
      key: "vehicles",
      icon: <CarOutlined />,
      label: "Vehicles",
      onClick: () => navigate("/owner/vehicles"),
    },
    {
      key: "reports",
      icon: <FileTextOutlined />,
      label: "Reports",
      onClick: () => navigate("/owner/reports"),
    },
  ];

  // Determine the current selected key based on the URL path
  const selectedKey = location.pathname.split("/")[2] || "dashboard";

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
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
  );
};

export default Sidebar;
