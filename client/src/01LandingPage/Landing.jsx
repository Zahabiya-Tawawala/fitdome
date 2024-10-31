import { React, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Landing = () => {

  const  navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
const size = "large";
  return (
    <div>
      this is the landing page
      <Button type="primary" size={size} onClick={handleClick}>
        Get Started
      </Button>
    </div>
  );
};

export default Landing;
