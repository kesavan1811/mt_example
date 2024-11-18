// src/components/Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // You can use react-router for navigation if needed
import "./header.css";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../../Auth/AuthContext";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>MyApp</h1>
      </div>
      <div className="user-info">
        <p>Elon Musk</p>
        <Button
          color="danger"
          variant="solid"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        />
      </div>
    </header>
  );
};

export default Header;
