import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

// Define the Station data type
type Station = {
  id: string;
  location: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
};

// Create a minimal MUI theme with Ant Design's green
const materialTheme = createTheme({
  palette: {
    primary: {
      main: "#00b96b", // Matches Ant Design primary color
    },
  },
  components: {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          width: "100%", // Ensure table container is full width
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          width: "100%", // Ensure table is full width
          tableLayout: "fixed", // This helps with column width distribution
        },
      },
    },
  },
});

const StationTable = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStations = async () => {
      setIsLoading(true);
      setTimeout(() => {
        const sampleData = Array(50)
          .fill(null)
          .map((_, index) => ({
            id: `ST${String(index + 1).padStart(3, "0")}`,
            location: "Sample Location",
            ownerName: "Sample Owner",
            phoneNumber: "+94 71 234 5678",
            email: "sample@email.com",
          }));
        setStations(sampleData);
        setIsLoading(false);
      }, 800);
    };
    fetchStations();
  }, []);

  const columns = useMemo<MRT_ColumnDef<Station>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Station ID",
        size: 120, // Set specific size
      },
      {
        accessorKey: "location",
        header: "Location",
        size: 250, // Increase size for location
      },
      {
        accessorKey: "ownerName",
        header: "Owner Name",
        size: 200, // Set specific size
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        size: 150, // Set specific size
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 220, // Set specific size
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: stations,
    state: {
      isLoading,
    },
    enableRowSelection: false,
    enableGlobalFilter: true,
    enablePagination: true,
    enableSorting: true,
    enableColumnResizing: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    layoutMode: "grid", // Use grid layout for better width distribution
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
        width: "100%", // Make paper full width
      },
    },
    muiTableContainerProps: {
      sx: {
        width: "100%", // Make container full width
      },
    },
    muiTableProps: {
      sx: {
        width: "100%", // Make table full width
        tableLayout: "fixed", // Fixed table layout for better column distribution
      },
    },
    muiTableBodyRowProps: {
      hover: true,
    },
  });

  return (
    <ThemeProvider theme={materialTheme}>
      <Box
        sx={{
          width: "100%", // Ensure the Box is full width
          overflow: "hidden", // Prevent horizontal scrolling if not needed
        }}
      >
        <MaterialReactTable table={table} />
      </Box>
    </ThemeProvider>
  );
};

export default StationTable;
