import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, Typography } from "@mui/material";
import axios from "axios";

// Define the FuelTransaction data type
type FuelTransaction = {
  transactionId: number;
  vehicleNumber: string;
  stationId: number;
  stationName: string;
  fuelType: string;
  quantity: number;
  dateTime: string;
};

// Mock data for fuel transactions
const mockTransactionData = [
  {
    transactionId: 1001,
    vehicleNumber: "CAR-1234",
    stationId: 1,
    stationName: "Colombo Fuel Station",
    fuelType: "Petrol",
    quantity: 15,
    dateTime: "2023-05-10T08:30:00",
  },
  {
    transactionId: 1002,
    vehicleNumber: "VAN-5678",
    stationId: 2,
    stationName: "Kandy Fuel Station",
    fuelType: "Diesel",
    quantity: 25,
    dateTime: "2023-05-11T10:15:00",
  },
  {
    transactionId: 1003,
    vehicleNumber: "BUS-9012",
    stationId: 1,
    stationName: "Colombo Fuel Station",
    fuelType: "Diesel",
    quantity: 50,
    dateTime: "2023-05-12T14:20:00",
  },
  {
    transactionId: 1004,
    vehicleNumber: "BIKE-3456",
    stationId: 3,
    stationName: "Galle Fuel Station",
    fuelType: "Petrol",
    quantity: 5,
    dateTime: "2023-05-13T16:45:00",
  },
  {
    transactionId: 1005,
    vehicleNumber: "TRUCK-7890",
    stationId: 4,
    stationName: "Jaffna Fuel Station",
    fuelType: "Diesel",
    quantity: 60,
    dateTime: "2023-05-14T09:30:00",
  },
  {
    transactionId: 1006,
    vehicleNumber: "CAR-2468",
    stationId: 2,
    stationName: "Kandy Fuel Station",
    fuelType: "Petrol",
    quantity: 20,
    dateTime: "2023-05-15T11:20:00",
  },
  {
    transactionId: 1007,
    vehicleNumber: "VAN-1357",
    stationId: 5,
    stationName: "Negombo Fuel Station",
    fuelType: "Diesel",
    quantity: 30,
    dateTime: "2023-05-16T13:10:00",
  },
];

const FuelTransactionTable = () => {
  const [transactions, setTransactions] = useState<FuelTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useRealData, setUseRealData] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);

        if (useRealData) {
          // Set a timeout to simulate slow network
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 3000)
          );

          try {
            const response = await Promise.race([
              axios.get("http://localhost:8080/fuel-transaction/all"),
              timeoutPromise,
            ]);

            const data = response.data;

            if (data && data.length > 0) {
              setTransactions(data);
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
        setTransactions(mockTransactionData);
        setError(null);
      } catch (err) {
        console.error("Error in fetching transaction data:", err);
        setError("Failed to load transaction data");

        try {
          setTransactions(mockTransactionData);
        } catch (mockErr) {
          console.error("Error setting mock data:", mockErr);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [useRealData]);

  // Format date for better display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Define columns for the transaction table
  const columns = useMemo<MRT_ColumnDef<FuelTransaction>[]>(
    () => [
      {
        accessorKey: "transactionId",
        header: "Transaction ID",
        size: 100,
        enableSorting: true,
        enableFiltering: true,
      },
      {
        accessorKey: "vehicleNumber",
        header: "Vehicle No.",
        size: 120,
        enableSorting: true,
        enableFiltering: true,
      },
      {
        accessorKey: "stationName",
        header: "Station Name",
        size: 150,
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
        accessorKey: "quantity",
        header: "Quantity (L)",
        size: 110,
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
        accessorKey: "dateTime",
        header: "Date & Time",
        size: 160,
        enableSorting: true,
        enableFiltering: false,
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>{formatDate(value)}</Typography>
            </Box>
          );
        },
      },
    ],
    []
  );

  // Create the table instance
  const table = useMaterialReactTable({
    columns,
    data: transactions,
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
      placeholder: "Search transactions...",
      size: "small",
      sx: { minWidth: "300px" },
    },
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
      density: "comfortable",
      sorting: [{ id: "dateTime", desc: true }], // Sort by date descending by default
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
          {error || "No transactions found"}
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
      {error && !transactions.length && (
        <Box sx={{ mb: 2 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default FuelTransactionTable;
