import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import { Fuel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Fuel Owner Dashboard/Card";
import { getRemainingFuelQuantity } from "../services/fuelService"; 

const FuelOwnerDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(
      "Current authorization status:",
      token ? "Authorized" : "Not authorized"
    );
  }, []);

  const handleAddFuelStock = () => {
    const token = localStorage.getItem("token");
    console.log(
      "Attempting to add fuel stock. Authorization:",
      token ? "Valid" : "Invalid"
    );

    if (!token) {
      console.log("Access denied: No authorization token found");
      return;
    }

    navigate("/owner/add-fuel-stock");
  };

  const [dieselQuantity, setDieselQuantity] = useState<number>(0);
  const [petrolQuantity, setPetrolQuantity] = useState<number>(0);

  useEffect(() => {
    // Fetch and set the remaining fuel quantities
    const fetchRemainingFuel = async () => {
      try {
        const remainingFuel = await getRemainingFuelQuantity();
        console.log("Remaining Fuel Quantity:", remainingFuel);

        // Extract quantities for diesel and petrol
        const diesel = remainingFuel.find(
          (fuel) => fuel.fuelType.toLowerCase() === "diesel" 
        );
        const petrol = remainingFuel.find(
          (fuel) => fuel.fuelType.toLowerCase() === "petrol"
        );

        setDieselQuantity(diesel?.remainingFuelQuantity || 0);
        setPetrolQuantity(petrol?.remainingFuelQuantity || 0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRemainingFuel();
  }, []);

  return (
    <div
      style={{
        position: "relative",
        padding: 24,
        minHeight: "calc(100vh - 64px - 69px - 48px)",
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* Dashboard Cards */}
      <Row gutter={[16, 16]}>
        
        <Col xs={24} sm={12} md={12} lg={12}>
          <Card
            title="Remaining Diesel"
            content={`${dieselQuantity} Liters`}
            icon={<Fuel />}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Card
            title="Remaining Petrol"
            content={`${petrolQuantity} Liters`}
            icon={<Fuel />}
          />
        </Col>
      </Row>

      {/* Add New Fuel Stock Button */}
      <Button
        type="primary"
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          width: 200,
          height: 50,
        }}
        onClick={handleAddFuelStock}
      >
        Add New Fuel Stock
      </Button>
    </div>
  );
};

export default FuelOwnerDashboard;
