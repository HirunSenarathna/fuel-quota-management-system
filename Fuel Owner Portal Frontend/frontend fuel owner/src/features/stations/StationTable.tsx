import { useMemo, useState, useEffect } from "react";
import { Table, Spin, Empty } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";

// Define the Station data type
type Station = {
  id: string;
  location: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
  key?: string;
};

// Sample data defined outside the component
const mockStationData = [
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

const StationTable = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useRealData, setUseRealData] = useState(true);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setIsLoading(true);

        if (useRealData) {
          // Set a timeout to simulate slow network
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 3000)
          );

          // Try to fetch from the real API with timeout
          try {
            // Replace with your actual API endpoint - could be baseURL + path
            const response = await Promise.race([
              axios.get(
                "http://localhost:8080/fuel-station/all-remaining-fuel"
              ),
              timeoutPromise,
            ]);

            const data = response.data.map((station: any) => ({
              id: station.stationId,
              location: station.city,
              ownerName: station.ownerName,
              phoneNumber: station.phoneNumber,
              email: station.email || "N/A",
              key: station.stationId.toString(),
            }));

            if (data && data.length > 0) {
              setStations(data);
              setError(null);
              return; // Exit early if we have real data
            } else {
              throw new Error("No data received from API");
            }
          } catch (apiError) {
            console.warn("API fetch failed, using mock data:", apiError);
            // Fallback to mock data on API error
            setUseRealData(false);
          }
        }

        // Always use mock data if real data fetch failed or was disabled
        const formattedMockData = mockStationData.map((station) => ({
          ...station,
          key: station.id,
        }));
        setStations(formattedMockData);
        setError(null);
      } catch (err) {
        console.error("Error in fetching station data:", err);
        setError("Failed to load station data");

        // Still try to show mock data even if something went wrong above
        try {
          const formattedMockData = mockStationData.map((station) => ({
            ...station,
            key: station.id,
          }));
          setStations(formattedMockData);
        } catch (mockErr) {
          console.error("Error setting mock data:", mockErr);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStations();
  }, [useRealData]);

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
      ) : stations.length === 0 ? (
        <Empty description={error || "No stations found"} />
      ) : (
        <Table
          columns={columns}
          dataSource={stations}
          pagination={{ pageSize: 10 }}
          rowKey="id"
        />
      )}
    </div>
  );
};

export default StationTable;
