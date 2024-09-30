import {
  HomeOutlined,
  SettingOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useAppContext } from "./context";
import AnimeList from "./pages/AnimeList";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
const { Header, Content, Footer } = Layout;

const AppRoutes = () => {
  const { user } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {user ? (
        <>
          <Route path="/anime-list" element={<AnimeList />} />
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
  const { user, setUser } = useAppContext();

  const menuItems = [
    { key: "1", icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: <Link to="/anime-list">Anime List</Link>,
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: <Link to="/settings">Settings</Link>,
    },
  ];

  const menuItemsNoUser = [
    { key: "1", icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
  ];

  return (
    <Router>
      <Layout className="layout" style={{backgroundColor: "white"}}>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={user ? menuItems : menuItemsNoUser}
            style={{ flex: 1 }}
          />
        </Header>

        <Content style={{ padding: "0 50px", flex: 1 }}>
          <div className="site-layout-content" style={{ marginTop: "50px" }}>
            <AppRoutes />
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
