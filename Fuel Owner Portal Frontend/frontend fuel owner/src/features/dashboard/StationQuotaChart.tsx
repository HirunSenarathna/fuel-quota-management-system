import React, { useState, useEffect } from "react";
import { Card, Spin, Empty } from "antd";
import { Column } from "@ant-design/charts";
import stationService from "../../services/stationService";

interface StationQuotaChartProps {
  title?: string;
  loading?: boolean;
  style?: React.CSSProperties; // Added style prop
}

interface ChartDataItem {
  stationId: number;
  stationName: string;
  quota: number;
}

const StationQuotaChart: React.FC<StationQuotaChartProps> = ({
  title = "Station Fuel Quotas",
  loading: initialLoading = false,
  style = {}, // Default to empty object
}) => {
  const [data, setData] = useState<ChartDataItem[]>([]);
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStationQuotas = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch real station data using the stationService
        const stations = await stationService.getAllStations();

        // Transform the data for the chart and filter out any stations with null/undefined values
        const formattedData = stations
          .filter(
            (station) =>
              station &&
              station.city &&
              station.remainingFuelQuantity !== undefined &&
              station.remainingFuelQuantity !== null
          )
          .map((station) => ({
            stationId: station.stationId,
            stationName: station.city,
            quota: station.remainingFuelQuantity,
          }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching station quota data:", error);
        setError("Failed to fetch station data");
      } finally {
        setLoading(false);
      }
    };

    fetchStationQuotas();
  }, []);

  // Configuration for the bar chart
  const config = {
    data,
    isStack: false,
    xField: "stationName",
    yField: "quota",
    columnWidthRatio: 0.6,
    color: "#1890ff",
    label: {
      position: "top",
      style: {
        fill: "#1890ff",
        opacity: 0.6,
      },
      formatter: (datum: any) => {
        return datum && datum.quota != null
          ? `${datum.quota.toLocaleString()}`
          : "";
      },
    },
    legend: false,
    tooltip: {
      formatter: (datum: any) => {
        if (!datum || datum.quota == null) {
          return {
            name: "Remaining Fuel",
            value: "N/A",
          };
        }
        return {
          name: "Remaining Fuel",
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
        alias: "Remaining Fuel (Liters)",
      },
    },
    // Added to ensure the chart takes up the full width
    autoFit: true,
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%", 
          }}
        >
          <Spin />
        </div>
      );
    }

    if (error || data.length === 0) {
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%", 
          }}
        >
          <Empty
            description={error || "No station data available"}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      );
    }

    return (
      <div style={{ height: "400px", width: "100%" }}>
        <Column {...config} />
      </div>
    );
  };

  return (
    <Card
      title={title}
      bordered={false}
      style={{
        height: "100%",
        borderRadius: "8px",
        width: "100%", 
        ...style, // Merge with any custom styles
      }}
      bodyStyle={{
        height: "calc(100% - 58px)",
        padding: "24px",
        width: "100%", 
      }}
    >
      {renderContent()}
    </Card>
  );
};

export default StationQuotaChart;
