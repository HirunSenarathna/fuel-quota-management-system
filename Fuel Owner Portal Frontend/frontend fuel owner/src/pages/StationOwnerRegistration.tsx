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
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Station Owner Registration
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Owner's NIC Number</label>
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
                // Check if the last character is 'v' or 'x', and capitalize it
                if (value.length > 0 && /[vVxX]$/.test(value)) {
                  value =
                    value.slice(0, -1) +
                    value.charAt(value.length - 1).toUpperCase();
                }
                // Update the input value manually
                e.target.value = value;
              }}
              className="w-full border p-2 rounded"
            />
            {errors.nic && (
              <p className="text-red-500 text-sm mt-1">{errors.nic.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">
              Station License Number
            </label>
            <input
              type="text"
              {...register("licenseNo", {
                required: "License number is required",
              })}
              className="w-full border p-2 rounded"
            />
            {errors.licenseNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.licenseNo.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Address Line 1</label>
            <input
              type="text"
              {...register("addressLine1", {
                required: "Address Line 1 is required",
              })}
              className="w-full border p-2 rounded"
            />
            {errors.addressLine1 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.addressLine1.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Address Line 2</label>
            <input
              type="text"
              {...register("addressLine2")}
              className="w-full border p-2 rounded"
              placeholder="(Optional)"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">City</label>
            <Controller
              control={control}
              name="city"
              rules={{ required: "City is required" }}
              render={({
                field,
              }: {
                field: {
                  value: string;
                  onChange: (value: string | undefined) => void;
                  onBlur: () => void;
                  ref: React.Ref<HTMLDivElement>;
                };
              }) => (
                <Select
                  {...field}
                  options={cityOptions}
                  placeholder="Select a city"
                  isSearchable
                  value={cityOptions.find(
                    (option: { label: string; value: string }) =>
                      option.value === field.value
                  )}
                  onChange={(selectedOption: { label: string; value: string } | null) =>
                    field.onChange(selectedOption?.value)
                  }
                  ref={null} // Explicitly set ref to null to avoid type mismatch
                />
              )}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number (10 digits only)",
                },
              })}
              className="w-full border p-2 rounded"
              placeholder="+94#########"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>

          {isSubmitSuccessful && (
            <p className="text-green-600 text-center mt-2">
              Form submitted successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default StationOwnerRegistration;
