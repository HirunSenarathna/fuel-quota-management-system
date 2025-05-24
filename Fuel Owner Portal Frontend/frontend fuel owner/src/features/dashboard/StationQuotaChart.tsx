import React, { useState, useEffect } from "react";
import { Card, Spin } from "antd";
import { Column } from "@ant-design/charts";

interface StationQuotaChartProps {
  title?: string;
  loading?: boolean;
}

const StationQuotaChart: React.FC<StationQuotaChartProps> = ({
  title = "Station Fuel Quotas",
  loading: initialLoading = false,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(initialLoading);

  useEffect(() => {
    const fetchStationQuotas = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          const mockStationData = [
            {
              stationId: "ST001",
              city: "Colombo",
              ownerName: "John Smith",
              totalQuota: 10000,
              remainingQuota: 6500,
            },
            {
              stationId: "ST002",
              city: "Kandy",
              ownerName: "Sarah Johnson",
              totalQuota: 8000,
              remainingQuota: 3200,
            },
            {
              stationId: "ST003",
              city: "Galle",
              ownerName: "Michael Fernando",
              totalQuota: 12000,
              remainingQuota: 7800,
            },
            {
              stationId: "ST004",
              city: "Jaffna",
              ownerName: "Priya Kamal",
              totalQuota: 9000,
              remainingQuota: 2100,
            },
            {
              stationId: "ST005",
              city: "Negombo",
              ownerName: "David Perera",
              totalQuota: 7500,
              remainingQuota: 4300,
            },
          ];

          // Transform data into format needed for the chart
          const formattedData = mockStationData.flatMap((station) => [
            {
              stationId: station.stationId,
              stationName: `${station.city} (${station.stationId})`,
              quota: station.remainingQuota,
              type: "Remaining Quota",
            },
            {
              stationId: station.stationId,
              stationName: `${station.city} (${station.stationId})`,
              quota: station.totalQuota - station.remainingQuota,
              type: "Used Quota",
            },
          ]);

          setData(formattedData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching station quota data:", error);
        setLoading(false);
      }
    };

    fetchStationQuotas();
  }, []);

  // Configuration for the bar chart
  const config = {
    data,
    isStack: true,
    xField: "stationName",
    yField: "quota",
    seriesField: "type",
    label: {
      position: "middle",
      layout: [
        { type: "interval-adjust-position" },
        { type: "interval-hide-overlap" },
        { type: "adjust-color" },
      ],
    },

    color: ["#1890ff", "#f5f5f5"],
    legend: {
      position: "top",
    },
    tooltip: {
      formatter: (datum: any) => {
        return {
          name: datum.type,
          value: `${datum.quota.toLocaleString()} liters`,
        };
      },
    },
    yAxis: {
      title: {
        text: "Liters",
      },
    },
    xAxis: {
      title: {
        text: "Station",
      },
      label: {
        autoRotate: true,
      },
    },
    interactions: [{ type: "element-highlight" }],
    state: {
      active: {
        style: {
          lineWidth: 2,
          stroke: "#000",
        },
      },
    },
    meta: {
      stationName: {
        alias: "Station",
      },
      quota: {
        alias: "Fuel Quota (Liters)",
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
        <div style={{ height: "400px", width: "100%" }}>
          <Column {...config} />
        </div>
      )}
    </Card>
  );
};

export default StationQuotaChart;
