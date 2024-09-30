import React from "react";
import { auth } from "../../firebaseConfig";
import { Button } from "antd";
import { useAppContext } from "../context";

const Settings = () => {
  const { setUser } = useAppContext();

  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <div>
      <h1>Settings</h1>
      <Button onClick={handleLogout} danger>Logout</Button>
    </div>
  );
};

export default Settings;
