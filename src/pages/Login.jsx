import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import LoginForm from "../components/LoginForm";
import { useAppContext } from "../context";
import GoogleButton from "../components/GoogleButton";
import "../styles/App.css";

const Login = () => {
  const { setUser } = useAppContext();

  const handleLogin = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      // check if user is verified
      if (!user.emailVerified) {
        alert("Please verify your email address.");
        return;
      }
      const userData = {
        email: user.email,
        name: user.displayName,
        uid: user.uid,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="center-div">
      <h1>Login</h1>
      <LoginForm handleLogin={handleLogin} />
      <GoogleButton />
    </div>
  );
};

export default Login;
