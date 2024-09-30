import React from "react";
import SignupForm from "../components/SignupForm";
import { useAppContext } from "../context";
import GoogleButton from "../components/GoogleButton";
import "../styles/App.css";
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Spin } from "antd";

const Signup = () => {
  const { setUser, loading, setLoading } = useAppContext();

  const handleSignup = async (email, password, name) => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await updateProfile(user, { displayName: name });
      const userData = {
        email: user.email,
        name: user.displayName,
        uid: user.uid,
      };
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.displayName,
      });
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-div">
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <h1>Sign Up</h1>
          <SignupForm handleSignup={handleSignup} />
          <GoogleButton />
        </>
      )}
    </div>
  );
};

export default Signup;
