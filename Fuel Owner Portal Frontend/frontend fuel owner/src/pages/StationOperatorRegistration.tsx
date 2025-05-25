import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const RegisterStationOperatorForm = () => {
  // State hooks for form fields, loading state, and feedback message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [nic, setNic] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stationOwnerId, setStationOwnerId] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/account/currentuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        const ownerId = userData.ownerId || userData.id || userData.stationOwnerId;

        if (ownerId) {
          setStationOwnerId(ownerId);
        } else {
          setMessage({ type: "error", text: "Station Owner ID not found in response." });
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        setMessage({ type: "error", text: "Error fetching current user." });
      }
    };

    if (token) {
      fetchCurrentUser();
    } else {
      setMessage({ type: "error", text: "Authentication token not found." });
    }
  }, [token]);

  // Validate phone number format: starts with 07 + 8 digits, total 10 digits
  const isValidPhoneNumber = (number: string) => {
    const sriLankaPhoneRegex = /^07\d{8}$/;
    return sriLankaPhoneRegex.test(number);
  };

  // Handles form submission with validation
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 10) input = input.slice(0, 10);
    if (input.length > 3) input = input.slice(0, 3) + " " + input.slice(3);
    setPhoneNumber(input);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!username || !password || !fullName || !nic || !phoneNumber) {
      setMessage({ type: "error", text: "All fields are required." });
      return;
    }

    if (!isValidPhoneNumber(phoneNumber.replace(/\s/g, ""))) {
      setMessage({
        type: "error",
        text: "Invalid Phone Number. Format: 07XXXXXXXX",
      });
      return;
    }

    if (!stationOwnerId) {
      setMessage({ type: "error", text: "Station Owner ID is missing." });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8080/fuel-operator/register",
        {
          username,
          password,
          fullName,
          nic,
          contactNo: phoneNumber.replace(/\s/g, ""),
          stationOwnerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage({
        type: "success",
        text: "Station Operator Registered Successfully!",
      });
      setSubmitted(true);
      setUsername("");
      setPassword("");
      setFullName("");
      setNic("");
      setPhoneNumber("");
    } catch (error: any) {
      console.error("Registration error:", error.response || error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to register operator.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Box
        sx={{
          maxWidth: 450,
          mx: "auto",
          p: 4,
          boxShadow: 3,
          borderRadius: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center">
          Register Station Operator
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 2 }}>
          Fill out the form below to register a station operator
        </Typography>

        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        {!submitted && (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              margin="normal"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );

};

export default RegisterStationOperatorForm;
