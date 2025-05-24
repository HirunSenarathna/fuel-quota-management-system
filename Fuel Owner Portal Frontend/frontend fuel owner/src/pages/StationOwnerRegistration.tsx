import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import bgImage from "../assets/bgimg.jpg"; // adjust the path if needed

type FormData = {
  username: string;
  password: string;
  fullName: string;
  nic: string;
  licenseNo: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  phone: string;
};

const StationOwnerRegistration: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [cityOptions, setCityOptions] = useState<
    readonly { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/fuel-station/cities"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }
        const cities = await response.json();
        const options = cities.map((city: string) => ({
          label: city,
          value: city,
        }));
        setCityOptions(options);
      } catch (error) {
        console.error("Failed to load cities:", error);
      }
    };

    fetchCities();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSuccess(false);
      const payload = {
        username: data.username,
        password: data.password,
        fullName: data.fullName,
        nic: data.nic,
        licenseNumber: data.licenseNo, // match Java field name
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        phoneNumber: data.phone,
      };

      console.log("Sending payload:", payload);
      const response = await fetch(
        "http://localhost:8080/fuel-station/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed: Server returned an error");
      }

      const text = await response.text(); // handle plain text response
      console.log("Response text:", text);

      if (text.toLowerCase().includes("success")) {
        setIsSuccess(true);
        alert("Registration successful!");
        reset();
      } else {
        throw new Error(text || "Registration failed");
      }
    } catch (error) {
      setIsSuccess(false);
      console.error("Form submission error:", error);
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      alert("Error submitting form: " + message);
    }
  };

  const formContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    padding: "32px 16px",
    minHeight: "100vh",
    overflowY: "auto",
    backgroundImage: `url(${bgImage})`,
    backgroundColor: "transparent",
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
    maxHeight: "calc(100vh - 128px)", // Keeps form height within viewport + padding
    overflowY: "auto", // Make form scrollable itself if needed
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
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    color: "#000000",
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
    transition: "background-color 0.3s",
    fontWeight: "bold",
  };

  const successStyle: React.CSSProperties = {
    color: "#059669",
    textAlign: "center",
    marginTop: "10px",
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
    <div style={formContainerStyle}>
      <div style={formStyle}>
        <h2 style={headingStyle}>Station Owner Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              style={inputStyle}
            />
            {errors.fullName && (
              <p style={errorStyle}>{errors.fullName.message}</p>
            )}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Owner's NIC Number</label>
            <input
              type="text"
              {...register("nic", {
                required: "NIC is required",
                pattern: {
                  value: /^[0-9]{9}[vVxX]$|^[0-9]{12}$/,
                  message: "Invalid NIC format",
                },
              })}
              onChange={(e) => {
                let value = e.target.value;
                if (value.length > 0 && /[vVxX]$/.test(value)) {
                  value =
                    value.slice(0, -1) +
                    value.charAt(value.length - 1).toUpperCase();
                }
                e.target.value = value;
              }}
              style={inputStyle}
            />
            {errors.nic && <p style={errorStyle}>{errors.nic.message}</p>}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Station License Number</label>
            <input
              type="text"
              {...register("licenseNo", {
                required: "License number is required",
              })}
              style={inputStyle}
            />
            {errors.licenseNo && (
              <p style={errorStyle}>{errors.licenseNo.message}</p>
            )}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Address Line 1</label>
            <input
              type="text"
              {...register("addressLine1", {
                required: "Address Line 1 is required",
              })}
              style={inputStyle}
            />
            {errors.addressLine1 && (
              <p style={errorStyle}>{errors.addressLine1.message}</p>
            )}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Address Line 2</label>
            <input
              type="text"
              {...register("addressLine2")}
              style={inputStyle}
              placeholder="(Optional)"
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>City</label>
            <Controller
              control={control}
              name="city"
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={cityOptions}
                  placeholder="Select a city"
                  isSearchable
                  value={cityOptions.find(
                    (option) => option.value === field.value
                  )}
                  onChange={(selectedOption) =>
                    field.onChange(selectedOption?.value)
                  }
                />
              )}
            />
            {errors.city && <p style={errorStyle}>{errors.city.message}</p>}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Phone Number</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number (10 digits only)",
                },
              })}
              style={inputStyle}
              placeholder="0#########"
            />
            {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              {...register("username", {
                required: "Username is required",
              })}
              style={inputStyle}
            />
            {errors.username && (
              <p style={errorStyle}>{errors.username.message}</p>
            )}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              style={inputStyle}
              placeholder="At least 6 characters"
            />
            {errors.password && (
              <p style={errorStyle}>{errors.password.message}</p>
            )}
          </div>
          <button type="submit" style={buttonStyle}>
            Register
          </button>{" "}
          {isSuccess && <p style={successStyle}>Registration successful!</p>}
        </form>
      </div>
    </div>
  );
};

export default StationOwnerRegistration;
