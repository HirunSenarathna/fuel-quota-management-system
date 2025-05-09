import { useMemo, useState, useEffect } from "react";
import { Table, Spin, Empty, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";

const { Text } = Typography;

// Define the Station data type
type Station = {
  id: string;
  location: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
  key?: string;
};

const StationTable = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get("/api/stations");
        const data = response.data.map((station: Station) => ({
          ...station,
          key: station.id,
        }));
        setStations(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching stations:", err);
        setError("Failed to load station data");

        // Fallback to sample data if API call fails
        const sampleData = [
          {
            id: "ST001",
            location: "Colombo, Main Street",
            ownerName: "John Smith",
            phoneNumber: "+94 77 123 4567",
            email: "john.smith@fuelstation.com",
          },
          {
            id: "ST002",
            location: "Kandy, Temple Road",
            ownerName: "Sarah Johnson",
            phoneNumber: "+94 71 234 5678",
            email: "sarah.j@fuelstation.com",
          },
          {
            id: "ST003",
            location: "Galle, Marine Drive",
            ownerName: "Michael Fernando",
            phoneNumber: "+94 76 345 6789",
            email: "michael.f@fuelstation.com",
          },
          {
            id: "ST004",
            location: "Jaffna, Hospital Road",
            ownerName: "Priya Kamal",
            phoneNumber: "+94 75 456 7890",
            email: "priya.k@fuelstation.com",
          },
          {
            id: "ST005",
            location: "Negombo, Beach Road",
            ownerName: "David Perera",
            phoneNumber: "+94 78 567 8901",
            email: "david.p@fuelstation.com",
          },
        ];
        setStations(
          sampleData.map((station) => ({ ...station, key: station.id }))
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStations();
  }, []);

  // Define columns
  const columns: ColumnsType<Station> = useMemo(
    () => [
      {
        title: "Station ID",
        dataIndex: "id",
        key: "id",
        width: 120,
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
        width: 200,
      },
      {
        title: "Owner Name",
        dataIndex: "ownerName",
        key: "ownerName",
        width: 150,
      },
      {
        title: "Phone Number",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        width: 150,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 200,
      },
    ],
    []
  );

  return (
    <div style={{ padding: "20px" }}>
      {isLoading ? (
        <Spin size="large" />
      ) : error ? (
        <Text type="danger">{error}</Text>
      ) : stations.length === 0 ? (
        <Empty description="No stations found" />
      ) : (
        <Table
          columns={columns}
          dataSource={stations}
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default StationTable;
