import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import bgImage from "../assets/bgimg.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type StockFormData = {
  fuelType: string;
  quantity: number;
  arrivalDate: string;
};

const AddStockForm: React.FC = () => {
  const [stationId, setStationId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<StockFormData>();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await fetch("http://localhost:8080/account/currentuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user");

        const user = await response.json();

        if (user?.stationId) {
          setStationId(user.stationId);
        } else {
          console.error("stationId not found in user response", user);
        }
      } catch (error) {
        console.error("Error fetching current user", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const onSubmit = async (data: StockFormData) => {
    if (!stationId) {
      alert("Station ID not found. Please log in again.");
      return;
    }

    const payload = {
      stationId: stationId,
      fuelType: data.fuelType,
      fuelQuantity: data.quantity,
      arrivalDate: data.arrivalDate,
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Authorization token not found. Please login again.");
        return;
      }

      console.log("Submitting fuel stock with payload:", payload);

      const response = await fetch("http://localhost:8080/fuel-station/receivedFuelQuantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(errorText);
      }

      alert("Fuel stock added successfully!");
      reset();
    } catch (error: any) {
      console.error("Failed to add fuel stock:", error);
      alert("Error adding fuel stock: " + (error?.message || "Unknown error"));
    }
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    padding: "32px 16px",
    minHeight: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
  };

  const formStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    color: "#1f2937",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontWeight: "bold",
    marginBottom: "6px",
    color: "#111827",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#ffffff",
    color: "#000000",
    boxSizing: "border-box",
    fontSize: "1rem",
  };

  const errorStyle: React.CSSProperties = {
    color: "#dc2626",
    fontSize: "14px",
    marginTop: "4px",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#2563eb",
    color: "white",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const headingStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "#000000",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <h2 style={headingStyle}>Add Fuel Stock</h2>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Fuel Type</label>
          <select
            {...register("fuelType", { required: "Fuel type is required" })}
            style={inputStyle}
            defaultValue=""
          >
            <option value="" disabled>
              Select Fuel Type
            </option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </select>
          {errors.fuelType && (
            <p style={errorStyle}>{errors.fuelType.message}</p>
          )}
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Quantity (Litres)</label>
          <input
            type="number"
            step="0.01"
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Must be at least 1 litre" },
            })}
            style={inputStyle}
          />
          {errors.quantity && (
            <p style={errorStyle}>{errors.quantity.message}</p>
          )}
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Arrival Date</label>
          <Controller
            control={control}
            name="arrivalDate"
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <DatePicker
                placeholderText="Select a date"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="yyyy-MM-dd"
                className="react-datepicker__input-text"
                wrapperClassName="datepicker-wrapper"
                style={inputStyle}
              />
            )}
          />
          {errors.arrivalDate && (
            <p style={errorStyle}>{errors.arrivalDate.message}</p>
          )}
        </div>

        <button type="submit" style={buttonStyle} disabled={!stationId}>
          {stationId ? "Add Stock" : "Loading..."}
        </button>
      </form>
    </div>
  );
};

export default AddStockForm;
