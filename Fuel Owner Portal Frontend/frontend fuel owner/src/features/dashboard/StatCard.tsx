import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Statistic } from "antd";

interface StatCardProps {
  title: string;
  value: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode | string;
  precision?: number;
  isPositive?: boolean;
  loading?: boolean;
  valueStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  precision = 0,
  isPositive,
  loading = false,
  valueStyle,
  style,
  className,
}) => {
  // Default styles for positive/negative values
  const defaultValueStyle =
    isPositive !== undefined
      ? {
          color: isPositive ? "#3f8600" : "#cf1322",
          ...valueStyle,
        }
      : valueStyle;

  // Default prefix for positive/negative values
  const defaultPrefix =
    isPositive !== undefined ? (
      isPositive ? (
        <ArrowUpOutlined />
      ) : (
        <ArrowDownOutlined />
      )
    ) : (
      prefix
    );

  return (
    <Card
      variant="borderless"
      size="small"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%", 
        ...style,
      }}
      className={className}
      bodyStyle={{
        flex: 1,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Statistic
        title={title}
        value={value}
        precision={precision}
        valueStyle={{
          fontSize: "1.5rem",
          ...defaultValueStyle,
        }}
        prefix={defaultPrefix}
        suffix={suffix}
        loading={loading}
      />
    </Card>
  );
};

export default StatCard;
