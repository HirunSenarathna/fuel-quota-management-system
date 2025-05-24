import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, Typography } from "@mui/material";
import { Tag } from "antd";
import stationService, { Station } from "../../services/stationService";

const StationTable = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setIsLoading(true);
        const data = await stationService.getAllStations();
        setStations(data);
        setError(null);
      } catch (err) {
        console.error("Error in fetching station data:", err);
        setError("Failed to load station data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStations();
  }, []);

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
        size: 200,
        enableSorting: true,
        enableFiltering: true,
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>
                {value === "Not specified" ? (
                  <span style={{ color: "#999" }}>Not specified</span>
                ) : (
                  value
                )}
              </Typography>
            </Box>
          );
        },
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
              <Typography>
                {value !== undefined && value !== null
                  ? value.toLocaleString()
                  : "0"}
              </Typography>
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
          const remainingFuel = row.original.remainingFuelQuantity ?? 0;
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

  // Table instance configuration
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
        maxHeight: "calc(100vh - 200px)",
        overflow: "auto",
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
