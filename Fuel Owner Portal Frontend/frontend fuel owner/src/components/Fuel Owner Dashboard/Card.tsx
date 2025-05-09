import React from "react";
import { Card as AntdCard } from "antd";

interface CardProps {
  title: string;
  content: string | React.ReactNode;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, content, icon }) => {
  return (
    <AntdCard
      style={{
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      {icon && <div style={{ fontSize: 32, marginBottom: 16 }}>{icon}</div>}
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 16, color: "#555" }}>{content}</p>
    </AntdCard>
  );
};

export default Card;