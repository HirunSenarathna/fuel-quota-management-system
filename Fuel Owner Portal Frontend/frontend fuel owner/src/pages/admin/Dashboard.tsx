import React from "react";
import StatCard from "../../features/dashboard/StatCard";
import FuelQuotaChart from "../../features/dashboard/FuelQuotaChart";
import { Row, Col, Typography } from "antd";

const { Title } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div
      style={{ padding: "24px", background: "#f5f7fa", borderRadius: "8px" }}
    >
      <Title level={4} style={{ marginBottom: "24px" }}>
        Dashboard Overview
      </Title>
      <Row gutter={[16, 16]} justify="start">
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <StatCard
            title="Total Users"
            value={1000}
            prefix={<span style={{ color: "#3f8600" }}>+</span>}
            suffix="users"
            precision={0}
            isPositive={true}
            loading={false}
            valueStyle={{ fontSize: "24px", fontWeight: "bold" }}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <StatCard
            title="Total Quotas"
            value={500}
            prefix={<span style={{ color: "#cf1322" }}>-</span>}
            suffix="quotas"
            precision={0}
            isPositive={false}
            loading={false}
            valueStyle={{ fontSize: "24px", fontWeight: "bold" }}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <StatCard
            title="Total Vehicles"
            value={200}
            prefix={<span style={{ color: "#3f8600" }}>+</span>}
            suffix="vehicles"
            precision={0}
            isPositive={true}
            loading={false}
            valueStyle={{ fontSize: "24px", fontWeight: "bold" }}
          />
        </Col>
      </Row>

      {/* Chart Row */}
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col xs={24}>
          <FuelQuotaChart title="Fuel Quota Remaining" />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
