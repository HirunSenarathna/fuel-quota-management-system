import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, Typography } from "@mui/material";
import axios from "axios";

// Define the Station data type
type Station = {
  id: string;
  location: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
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
  const [useRealData, setUseRealData] = useState(false); // Set to false for now to use mock data

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
        setStations(mockStationData);
        setError(null);
      } catch (err) {
        console.error("Error in fetching station data:", err);
        setError("Failed to load station data");

        // Still try to show mock data even if something went wrong above
        try {
          setStations(mockStationData);
        } catch (mockErr) {
          console.error("Error setting mock data:", mockErr);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStations();
  }, [useRealData]);

  // Define columns using MRT_ColumnDef
  const columns = useMemo<MRT_ColumnDef<Station>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Station ID",
        size: 120,
        enableSorting: true,
        enableFiltering: true,
      },
      {
        accessorKey: "location",
        header: "Location",
        size: 200,
        enableSorting: true,
        enableFiltering: true,
      },
      {
        accessorKey: "ownerName",
        header: "Owner Name",
        size: 150,
        enableSorting: true,
        enableFiltering: true,
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        size: 150,
        enableSorting: true,
        enableFiltering: true,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
        enableSorting: true,
        enableFiltering: true,
      },
    ],
    []
  );

  // Create the table instance
  const table = useMaterialReactTable({
    columns,
    data: stations,
    state: {
      isLoading,
    },
    // Enable all features
    enableGlobalFilter: true,
    enablePagination: true,
    enableSorting: true,
    enableColumnResizing: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    muiSearchTextFieldProps: {
      variant: "outlined",
      placeholder: "Search stations...",
      size: "small",
      sx: { minWidth: "300px" },
    },
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
      density: "comfortable",
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiPaginationProps: {
      color: "primary",
      shape: "rounded",
      size: "medium",
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: "8px",
        overflow: "hidden",
        width: "100%",
      },
    },
    muiTableContainerProps: {
      sx: {
        width: "100%",
      },
    },
    muiTableProps: {
      sx: {
        width: "100%",
        tableLayout: "fixed",
      },
    },
    muiTableBodyRowProps: {
      hover: true,
    },
    renderEmptyRowsFallback: () => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "300px",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          {error || "No stations found"}
        </Typography>
      </Box>
    ),
  });

  return (
    <Box sx={{ width: "100%" }}>
      {error && !stations.length && (
        <Box sx={{ mb: 2 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default StationTable;
