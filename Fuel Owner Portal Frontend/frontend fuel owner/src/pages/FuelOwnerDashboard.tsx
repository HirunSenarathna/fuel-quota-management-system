import React from "react";
import { Row, Col } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { Fuel } from "lucide-react";
import Card from "../components/Fuel Owner Dashboard/Card";

const FuelOwnerDashboard: React.FC = () => {
  return (
    <div
      style={{
        padding: 24,
        minHeight: "calc(100vh - 64px - 69px - 48px)",
        background: "#fff",
        borderRadius: 8,
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
          <Card title="Vehicles" content="450" icon={<CarOutlined />} />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Remaining Fuel" content="10,000" icon={<Fuel />} />
        </Col>
      </Row>
    </div>
  );
};

export default FuelOwnerDashboard;
