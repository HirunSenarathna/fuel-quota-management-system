import React from "react";
import { Typography } from "antd";
import FuelTransactionTable from "../../features/dashboard/FuelTransactionTable";

const { Title } = Typography;

const FuelTransactionPage: React.FC = () => {
  return (
    <div
      style={{ padding: "24px", background: "#f5f7fa", borderRadius: "8px" }}
    >
      <Title level={4} style={{ marginBottom: "24px" }}>
        Fuel Transactions
      </Title>

      <div
        style={{
          background: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <FuelTransactionTable />
      </div>
    </div>
  );
};

export default FuelTransactionPage;
