import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import FuelOwnerLayout from "../layouts/FuelOwnerLayout";

// Define your Person type
type Person = {
  fullname: string;
  nic: string;
  PhoneNo: string;
  email: string;
};

// Sample data
const data: Person[] = [
  {
    fullname: "Pasan Mayura",
    nic: "123456789v",
    PhoneNo: "071 46245621",
    email: "abc@gmail.com",
  },
  {
    fullname: "John Doe",
    nic: "987654321v",
    PhoneNo: "077 1234567",
    email: "john.doe@example.com",
  },
  {
    fullname: "Jane Smith",
    nic: "456789123v",
    PhoneNo: "075 9876543",
    email: "jane.smith@example.com",
  },
  {
    fullname: "Michael Brown",
    nic: "789123456v",
    PhoneNo: "072 4567890",
    email: "michael.brown@example.com",
  },
  {
    fullname: "Emily Davis",
    nic: "321654987v",
    PhoneNo: "076 6543210",
    email: "emily.davis@example.com",
  },
  {
    fullname: "Pasan Mayura",
    nic: "123456789v",
    PhoneNo: "071 46245621",
    email: "abc@gmail.com",
  },
  {
    fullname: "John Doe",
    nic: "987654321v",
    PhoneNo: "077 1234567",
    email: "john.doe@example.com",
  },
  {
    fullname: "Jane Smith",
    nic: "456789123v",
    PhoneNo: "075 9876543",
    email: "jane.smith@example.com",
  },
  {
    fullname: "Michael Brown",
    nic: "789123456v",
    PhoneNo: "072 4567890",
    email: "michael.brown@example.com",
  },
  {
    fullname: "Emily Davis",
    nic: "321654987v",
    PhoneNo: "076 6543210",
    email: "emily.davis@example.com",
  },
];

const Operators: React.FC = () => {
  // Define table columns using useMemo
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "fullname",
        header: "Full Name",
        size: 250,
      },
      {
        accessorKey: "nic",
        header: "NIC",
        size: 150,
      },
      {
        accessorKey: "PhoneNo",
        header: "Phone Number",
        size: 200,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
    ],
    []
  );

  // Create the MaterialReactTable instance
  const table = useMaterialReactTable({
    columns,
    data,
    enablePagination: false,  
  });

  return (
    <FuelOwnerLayout>
      <div
        style={{
          width: "100%",
          padding: 24,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "500px",
        }}
      >
        {/* Render the MaterialReactTable */}
        <MaterialReactTable table={table} />
      </div>
    </FuelOwnerLayout>
  );
};

export default Operators;
