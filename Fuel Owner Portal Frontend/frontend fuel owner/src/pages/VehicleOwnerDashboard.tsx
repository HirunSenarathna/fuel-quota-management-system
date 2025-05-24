import React from "react";
import { Row, Col, Button, Card as AntCard, Typography } from "antd";
import { DashboardOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const VehicleOwnerDashboard: React.FC = () => {
  const username = "ruvini123";
  const vehicleNumber = "AB-1234";
  const chassisNumber = "XYZ123456789";
  const vehicleType = "Lorry";
  const fuelType = "Diesel";
  const remainingFuel = "10,000 L";
  const renewalDate = "2025-06-30";

  return (
    <div
      style={{
        padding: 24,
        minHeight: "100vh",
        background: "#fff",
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ flex: 1, textAlign: "center" }}>
          <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
            Vehicle Owner
          </Title>
        </div>
        <div style={{ position: "absolute", top: 24, right: 40 }}>
          <Button
            type="primary"
            style={{
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
              fontSize: 16,
              padding: "8px 32px",
              height: "42px",
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Extra gap */}
      <div style={{ height: 40 }} />

      {/* Vehicle details and stats */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <AntCard title="Vehicle Details" bordered={false} style={{ background: "#fafafa" }}>
            <p>
              <Text strong>Username:</Text> {username}
            </p>
            <p>
              <Text strong>Vehicle Number:</Text> {vehicleNumber}
            </p>
            <p>
              <Text strong>Chassis Number:</Text> {chassisNumber}
            </p>
            <p>
              <Text strong>Vehicle Type:</Text> {vehicleType}
            </p>
            <p>
              <Text strong>Fuel Type:</Text> {fuelType}
            </p>
          </AntCard>
        </Col>

        <Col xs={24} md={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <AntCard bordered={false} style={{ textAlign: "center", background: "#fafafa" }}>
                <DashboardOutlined style={{ fontSize: 32, color: "#1890ff", marginBottom: 10 }} />
                <Title level={5}>Remaining Fuel Quota</Title>
                <Text>{remainingFuel}</Text>
              </AntCard>
            </Col>
            <Col span={24}>
              <AntCard bordered={false} style={{ textAlign: "center", background: "#fafafa" }}>
                <CalendarOutlined style={{ fontSize: 32, color: "#1890ff", marginBottom: 10 }} />
                <Title level={5}>Renewal Date</Title>
                <Text>{renewalDate}</Text>
              </AntCard>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Download QR Code button */}
      <div
        style={{
          position: "fixed",
          bottom: 60,
          right: 40,
        }}
      >
        <Button
          type="primary"
          style={{
            backgroundColor: "#00b96b",
            borderColor: "#00b96b",
            fontSize: 16,
            padding: "8px 32px",
            height: "42px",
          }}
        >
          Download QR Code
        </Button>
      </div>
    </div>
  );
};

export default VehicleOwnerDashboard;
