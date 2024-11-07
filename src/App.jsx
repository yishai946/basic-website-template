import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { useAppContext } from "./context";
import Signup from "./pages/Signup";
import "./styles/App.css"; // Import the CSS file

const { Header, Content } = Layout;

const AppRoutes = () => {
  const { user } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {user ? (
        <>
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

const App = () => {
  const { user } = useAppContext();

  const menuItems = [
    { key: "1", icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
    {
      key: "2",
      icon: <SettingOutlined />,
      label: <Link to="/settings">Settings</Link>,
    },
  ];

  const menuItemsNoUser = [
    { key: "1", icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
  ];

  return (
    <Router>
      <Layout className="layout">
        <Header className="header">
          <div className="logo">MyApp</div>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={user ? menuItems : menuItemsNoUser}
            className="menu"
            style={{ flex: 1, minWidth: 0, justifyContent: "flex-end" }}
          />
        </Header>

        <Content className="content">
          <div className="site-layout-content">
            <AppRoutes />
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
