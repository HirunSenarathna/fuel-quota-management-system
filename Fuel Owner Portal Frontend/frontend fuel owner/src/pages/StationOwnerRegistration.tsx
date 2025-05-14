import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

type FormData = {
  fullName: string;
  nic: string;
  licenseNo: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  phone: string;
};

const StationOwnerRegistration: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    reset, // Include reset
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>();

  const [cityOptions, setCityOptions] = useState<
    readonly { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const staticCities = [
      { label: "Colombo", value: "Colombo" },
      { label: "Kandy", value: "Kandy" },
      { label: "Galle", value: "Galle" },
      { label: "Matara", value: "Matara" },
      { label: "Jaffna", value: "Jaffna" },
      { label: "Kurunegala", value: "Kurunegala" },
      { label: "Anuradhapura", value: "Anuradhapura" },
      { label: "Batticaloa", value: "Batticaloa" },
      { label: "Trincomalee", value: "Trincomalee" },
      { label: "Negombo", value: "Negombo" },
    ];
    setCityOptions(staticCities);
  }, []);

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    alert("Registration Successful!");
    reset(); // Clear form fields after successful submission
  };

  const formContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
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
              placeholder="0######### (Do not use +94)"
            />
            {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
          </div>

          <button type="submit" style={buttonStyle}>
            Register
          </button>

          {isSubmitSuccessful && (
            <p style={successStyle}>Form submitted successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default StationOwnerRegistration;
