import React, { useState, useEffect } from "react";
import { Button, Card, message, Space, Table, Typography } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import stationService from "../../services/stationService";
import PDFGenerator, { StationReportItem } from "../../utils/pdfGenerator";

const { Title } = Typography;

// Mock data
const mockStationData: StationReportItem[] = [
  {
    stationId: 1,
    city: "Colombo",
    remainingQuota: 6000,
    totalQuota: 10000,
  },
  {
    stationId: 2,
    city: "Kandy",
    remainingQuota: 4500,
    totalQuota: 8000,
  },
  {
    stationId: 3,
    city: "Galle",
    remainingQuota: 3200,
    totalQuota: 7500,
  },
  {
    stationId: 4,
    city: "Jaffna",
    remainingQuota: 2800,
    totalQuota: 9000,
  },
];

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


      // Using mock
      setTimeout(() => {
        setStationData(mockStationData);
        setLoading(false);
      }, 500);
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
      title: "Remaining Quota (L)",
      dataIndex: "remainingQuota",
      key: "remainingQuota",
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: "Total Quota (L)",
      dataIndex: "totalQuota",
      key: "totalQuota",
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record: StationReportItem) => {
        const percentRemaining =
          (record.remainingQuota / record.totalQuota) * 100;
        const status = percentRemaining < 50 ? "Low Quota" : "Sufficient";
        return (
          <span
            style={{
              color: percentRemaining < 50 ? "#ff4d4f" : "#52c41a",
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
