import React from "react";
import { Typography } from "antd";
import StationTable from "../features/admin/station/StationTable";

const { Title } = Typography;

const StationPage: React.FC = () => {
  return (
    <div
      style={{ padding: "24px", background: "#f5f7fa", borderRadius: "8px" }}
    >
      <Title level={4} style={{ marginBottom: "24px" }}>
        Fuel Stations
      </Title>

      <div
        style={{
          background: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <StationTable />
      </div>
    </div>
  );
};

export default StationPage;
