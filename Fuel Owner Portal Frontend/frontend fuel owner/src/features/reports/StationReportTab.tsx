import React, { useState, useEffect } from "react";
import { Button, Card, message, Space, Table, Typography } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import stationService from "../../services/stationService";
import PDFGenerator, { StationReportItem } from "../../utils/pdfGenerator";

const { Title } = Typography;

const StationReportTab: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [stationData, setStationData] = useState<StationReportItem[]>([]);

  // Load station data when component mounts
  useEffect(() => {
    fetchStationData();
  }, []);

  const fetchStationData = async () => {
    try {
      setLoading(true);

      // Get data from the station service
      const stations = await stationService.getAllStations();

      // Transform the data to match our report format
      const reportData: StationReportItem[] = stations.map((station) => ({
        stationId: station.stationId,
        city: station.city,
        licenseNumber: station.licenseNumber,
        ownerName: station.ownerFullName,
        fuelType: station.fuelType,
        remainingQuota: station.remainingFuelQuantity,
      }));

      setStationData(reportData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch station data:", error);
      message.error("Failed to fetch station data");
      setLoading(false);
    }
  };

  const generatePDF = () => {
    if (stationData.length === 0) {
      message.warning("No station data available to generate report");
      return;
    }

    const success = PDFGenerator.generateStationReport(stationData);

    if (success) {
      message.success("Station report generated successfully");
    } else {
      message.error("Failed to generate station report");
    }
  };

  const columns = [
    {
      title: "Station ID",
      dataIndex: "stationId",
      key: "stationId",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "License No.",
      dataIndex: "licenseNumber",
      key: "licenseNumber",
    },
    {
      title: "Owner Name",
      dataIndex: "ownerName",
      key: "ownerName",
    },
    {
      title: "Fuel Type",
      dataIndex: "fuelType",
      key: "fuelType",
      render: (text: string) =>
        text || <span style={{ color: "#999" }}>Not specified</span>,
    },
    {
      title: "Remaining Quota (L)",
      dataIndex: "remainingQuota",
      key: "remainingQuota",
      render: (value: number) => value.toLocaleString(),
    },
    // Total Quota column removed
    {
      title: "Status",
      key: "status",
      render: (_, record: StationReportItem) => {
        // Status now determined by threshold
        const status =
          record.remainingQuota < 5000 ? "Low Quota" : "Sufficient";
        return (
          <span
            style={{
              color: record.remainingQuota < 5000 ? "#ff4d4f" : "#52c41a",
              fontWeight: "bold",
            }}
          >
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Title level={5}>Station Report</Title>

        <Button
          type="primary"
          icon={<FileTextOutlined />}
          onClick={generatePDF}
          loading={loading}
        >
          Generate PDF Report
        </Button>

        <Table
          columns={columns}
          dataSource={stationData}
          rowKey="stationId"
          pagination={{ pageSize: 10 }}
          bordered
          size="middle"
          loading={loading}
        />
      </Space>
    </Card>
  );
};

export default StationReportTab;
