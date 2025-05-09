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
    <Card bordered={false} size="small">
      <Statistic
        title={title}
        value={value}
        precision={precision}
        valueStyle={defaultValueStyle}
        prefix={defaultPrefix}
        suffix={suffix}
        loading={loading}
      />
    </Card>
  );
};

export default StatCard;
