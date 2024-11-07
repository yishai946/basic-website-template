import React from "react";
import SignupForm from "../components/SignupForm";
import { useAppContext } from "../context";
import GoogleButton from "../components/GoogleButton";
import "../styles/App.css";
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Spin } from "antd";

const Signup = () => {
  const { loading, setLoading } = useAppContext();

  const handleSignup = async (email, password, name) => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await updateProfile(user, { displayName: name });
      await sendEmailVerification(user);
      // alert the user to verify their email
      alert("Please verify your email address.");
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.displayName,
      });
      // navigate the user to the login page
      window.location.href = "/";
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
