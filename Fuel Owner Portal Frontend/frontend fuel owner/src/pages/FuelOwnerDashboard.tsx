import React, { useEffect } from "react";
import { Row, Col, Button } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { Fuel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Fuel Owner Dashboard/Card";

const FuelOwnerDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(
      "Current authorization status:",
      token ? "Authorized" : "Not authorized"
    );
  }, []);

  const handleAddFuelStock = () => {
    const token = localStorage.getItem("token");
    console.log(
      "Attempting to add fuel stock. Authorization:",
      token ? "Valid" : "Invalid"
    );

    if (!token) {
      console.log("Access denied: No authorization token found");
      return;
    }

    navigate("/owner/add-fuel-stock");
  };

  return (
    <div
      style={{
        position: "relative",
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

      {/* Add New Fuel Stock Button */}
      <Button
        type="primary"
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          width: 200,
          height: 50,
        }}
        onClick={handleAddFuelStock}
      >
        Add New Fuel Stock
      </Button>
    </div>
  );
};

export default FuelOwnerDashboard;
