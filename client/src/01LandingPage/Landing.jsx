import { React, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const size = "large";

const handleGymRegister = () => {
    navigate("/gymRegister");
  };

  return (
    <div>
      this is the landing page
      <Button type="primary" size={size} onClick={handleLogin}>
        Get Started
      </Button>
      <Button type="primary" size={size} onClick={handleGymRegister}>
        Gym Registration
      </Button>
    </div>
  );
};

export default Landing;
