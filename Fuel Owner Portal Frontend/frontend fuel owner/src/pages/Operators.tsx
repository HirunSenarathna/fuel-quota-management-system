import React, { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useNavigate } from "react-router-dom";

type Person = {
  fullName: string;
  nic: string;
  contactNo: string;
};

const Operators: React.FC = () => {
  const navigate = useNavigate();

  // const columns = useMemo<MRT_ColumnDef<Person>[]>(
  //   () => [
  //     {
  //       accessorKey: "fullname",
  //       header: "Full Name",
  //       size: 250,
  //     },
  //     {
  //       accessorKey: "nic",
  //       header: "NIC",
  //       size: 150,
  //     },
  //     {
  //       accessorKey: "PhoneNo",
  //       header: "Phone Number",
  //       size: 200,
  //     },
  //     {
  //       accessorKey: "email",
  //       header: "Email",
  //       size: 150,
  //     },
  //   ],
  //   []
  // );

  const [data, setData] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = useMemo<MRT_ColumnDef<Person>[]>(() => [
    { accessorKey: "fullName", header: "Full Name", size: 250 },
    { accessorKey: "nic", header: "NIC", size: 150 },
    { accessorKey: "contactNo", header: "Phone Number", size: 200 },
  ], []);

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        // Step 1: Get current user
        const currentUserResponse = await fetch("http://localhost:8080/account/currentuser", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });

        if (!currentUserResponse.ok) {
          throw new Error("Failed to fetch current user");
        }

        const currentUserData = await currentUserResponse.json();
        console.log("Current user data:", currentUserData);

        const stationId = currentUserData.stationId;

        if (!stationId) {
          throw new Error("Station ID not found in current user data");
        }

        // Step 3: Fetch fuel operators
        const operatorsResponse = await fetch(
          `http://localhost:8080/fuel-operator/all?stationId=${stationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!operatorsResponse.ok) {
          throw new Error("Failed to fetch fuel operators");
        }

        const operatorsDataRaw = await operatorsResponse.json();
        console.log("Raw operators data:", operatorsDataRaw);

        const operatorsData: Person[] = operatorsDataRaw.map((op: any) => ({
          fullName: op.fullName,
          nic: op.nic,
          contactNo: op.contactNo,
        }));

        setData(operatorsData);
      } catch (err: any) {
        console.error("Error while fetching operators:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOperators();
  }, []);

  const table = useMaterialReactTable({
    columns,
    data,
    enablePagination: false,
  });

  if (loading) return <div>Loading operators...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <>
      
      {/* Fixed Button */}
      <button
        onClick={() => navigate("/owner/station-operator-registration")}
        style={{
          position: "fixed",
          bottom: 48,
          right: 48,
          width: "250px",
          padding: "6px 12px",
          fontSize: "1.2rem", // equivalent to Tailwind's text-sm
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
          zIndex: 1000,
        }}
      >
        Add Operator
      </button>
      <div
      style={{
        width: "100%",
        padding: 24,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        overflowX: "auto",
        overflowY: "auto",
        maxHeight: "500px"
      }}
    >
      <MaterialReactTable table={table} />
    </div>

    </>

    
  );
};

export default Operators;
