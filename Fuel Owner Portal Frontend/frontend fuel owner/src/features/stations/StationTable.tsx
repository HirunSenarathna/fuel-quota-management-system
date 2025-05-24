import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { Tag } from "antd";

type Station = {
  id?: string;
  stationId: number;
  city: string;
  location?: string;
  licenseNumber: string;
  ownerName?: string;
  ownerFullName: string;
  phoneNumber?: string;
  ownerPhoneNumber: string;
  email?: string;
  fuelType: string;
  remainingFuelQuantity: number;
};

// Sample data defined outside the component
const mockStationData = [
  {
    stationId: 1,
    city: "Colombo",
    licenseNumber: "CM12345",
    ownerFullName: "John Smith",
    ownerPhoneNumber: "+94 77 123 4567",
    email: "john.smith@fuelstation.com",
    fuelType: "Petrol",
    remainingFuelQuantity: 8500,
  },
  {
    stationId: 2,
    city: "Kandy",
    licenseNumber: "KA67890",
    ownerFullName: "Sarah Johnson",
    ownerPhoneNumber: "+94 71 234 5678",
    email: "sarah.j@fuelstation.com",
    fuelType: "Diesel",
    remainingFuelQuantity: 4200,
  },
  {
    stationId: 3,
    city: "Chicago",
    licenseNumber: "CH11223",
    ownerFullName: "Alice Johnson",
    ownerPhoneNumber: "555-123-4567",
    fuelType: "Petrol",
    remainingFuelQuantity: 7000,
  },
  {
    stationId: 4,
    city: "Galle",
    licenseNumber: "GA54321",
    ownerFullName: "Michael Fernando",
    ownerPhoneNumber: "+94 76 345 6789",
    email: "michael.f@fuelstation.com",
    fuelType: "Petrol",
    remainingFuelQuantity: 3500,
  },
  {
    stationId: 5,
    city: "Jaffna",
    licenseNumber: "JA98765",
    ownerFullName: "Priya Kamal",
    ownerPhoneNumber: "+94 75 456 7890",
    email: "priya.k@fuelstation.com",
    fuelType: "Diesel",
    remainingFuelQuantity: 9200,
  },
];

const StationTable = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useRealData, setUseRealData] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setIsLoading(true);

        if (useRealData) {
          // Set a timeout to simulate slow network
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 3000)
          );

          try {
            const response = await Promise.race([
              axios.get(
                "http://localhost:8080/fuel-station/all-remaining-fuel"
              ),
              timeoutPromise,
            ]);

            const data = response.data;

            if (data && data.length > 0) {
              setStations(data);
              setError(null);
              return;
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

  // Define columns
  const columns = useMemo<MRT_ColumnDef<Station>[]>(
    () => [
      {
        accessorKey: "stationId",
        header: "Station ID",
        size: 90,
        enableSorting: true,
        enableFiltering: true,
      },
      {
        accessorKey: "city",
        header: "Location",
        size: 120,
        enableSorting: true,
        enableFiltering: true,
      },
      {
        accessorKey: "licenseNumber",
        header: "License No.",
        size: 120,
        enableSorting: true,
        enableFiltering: true,
      },
      {
        accessorKey: "ownerFullName",
        header: "Owner Name",
        size: 150,
        enableSorting: true,
        enableFiltering: true,
      },
      {
        accessorKey: "ownerPhoneNumber",
        header: "Phone Number",
        size: 140,
        enableSorting: true,
        enableFiltering: true,
      },
      {
        accessorKey: "fuelType",
        header: "Fuel Type",
        size: 100,
        enableSorting: true,
        enableFiltering: true,
      },
      {
        accessorKey: "remainingFuelQuantity",
        header: "Remaining Fuel (L)",
        size: 140,
        enableSorting: true,
        enableFiltering: false,
        Cell: ({ cell }) => {
          const value = cell.getValue<number>();
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>{value.toLocaleString()}</Typography>
            </Box>
          );
        },
      },
      {
        id: "status",
        header: "Status",
        size: 100,
        enableSorting: true,
        enableFiltering: false,
        Cell: ({ row }) => {
          const remainingFuel = row.original.remainingFuelQuantity;
          const LOW_FUEL_THRESHOLD = 5000;

          // Check if fuel is below threshold
          if (remainingFuel < LOW_FUEL_THRESHOLD) {
            return <Tag color="error">Low Quota</Tag>;
          }
          return <Tag color="success">Sufficient</Tag>;
        },
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
    layoutMode: "grid",
    displayColumnDefOptions: {
      "mrt-row-expand": {
        size: 50,
      },
    },
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
        overflowX: "auto",
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
    muiTableHeadRowProps: {
      sx: {
        "& th": {
          backgroundColor: "#fafafa",
        },
      },
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
    <Box
      sx={{
        width: "100%",
        "& .MuiPaper-root": { width: "100%" },
        "& .MuiTable-root": { width: "100%" },
      }}
    >
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
