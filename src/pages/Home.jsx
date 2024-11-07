import React from "react";
import { Button } from "antd";
import { useAppContext } from "../context";
import "../styles/App.css";

const Home = () => {
  const { user } = useAppContext();

  return (
    <div className="center-div">
      <h1>Home</h1>
      <h3>Track your animes all the time from anywhere in the world</h3>
      {!user && (
        <Button type="primary" href="/login" size="large">
          Login
        </Button>
      )}
    </div>
  );
};

export default Home;
