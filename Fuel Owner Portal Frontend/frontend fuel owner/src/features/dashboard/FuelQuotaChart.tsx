import React, { useState, useEffect } from "react";
import { Card, Spin } from "antd";
import { Pie } from "@ant-design/charts";

interface FuelQuotaChartProps {
  title?: string;
  loading?: boolean;
}

const FuelQuotaChart: React.FC<FuelQuotaChartProps> = ({
  title = "Fuel Quota Usage",
  loading = false,
}) => {
  // Mock data - replace with actual API data
  const [data, setData] = useState([
    { type: "Remaining", value: 0 },
    { type: "Used", value: 0 },
  ]);

  useEffect(() => {
    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      // Sample data - this would come from your API
      setData([
        { type: "Remaining", value: 6500 },
        { type: "Used", value: 3500 },
      ]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Calculate percentages for display
  const totalQuota = data.reduce((sum, item) => sum + item.value, 0);
  const remainingPercentage =
    totalQuota > 0 ? Math.round((data[0].value / totalQuota) * 100) : 0;

  // Configuration for Ant Design Pie Chart
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    innerRadius: 0.6,
    color: ["#00b96b", "#f5f5f5"],
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#000000",
        },
        content: `${remainingPercentage}%`,
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    legend: {
      position: "bottom",
      layout: "horizontal",
    },
    tooltip: {
      formatter: (datum) => {
        return { name: datum.type, value: `${datum.value} liters` };
      },
    },
  };

  return (
    <Card
      title={title}
      bordered={false}
      style={{ height: "100%", borderRadius: "8px" }}
      bodyStyle={{ height: "calc(100% - 58px)", padding: "24px" }}
    >
      {loading ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin />
        </div>
      ) : (
        <div style={{ height: "100%", position: "relative" }}>
          <div style={{ height: 300 }}>
            <Pie {...config} />
          </div>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            <div style={{ fontSize: "16px", color: "#8c8c8c" }}>
              {data[0].value.toLocaleString()} / {totalQuota.toLocaleString()}{" "}
              liters
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default FuelQuotaChart;
