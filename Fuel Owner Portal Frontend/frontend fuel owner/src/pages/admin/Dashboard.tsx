import React from "react";
import { Row, Col, Typography } from "antd";
import StatCard from "../../features/dashboard/StatCard";
import StationQuotaChart from "../../features/dashboard/StationQuotaChart";

const { Title } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={4} style={{ marginBottom: 24 }}>
        Dashboard Overview
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <StatCard
            title="Total Registered Vehicles"
            value={50}
            suffix="Vehicles"
            precision={0}
            isPositive={true}
          />
        </Col>
        <Col xs={24} sm={12}>
          <StatCard
            title="Total Registered Fuel Stations"
            value={10}
            suffix="Stations"
            precision={0}
            isPositive={true}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24}>
          <StationQuotaChart title="Station Fuel Quotas" />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
