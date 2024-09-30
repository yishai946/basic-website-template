import { createContext, useContext, useState, useEffect } from "react";
const context = createContext();
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser); // Set the user state
      } catch (error) {
        console.error("Error parsing user JSON:", error);
      }
    }
  }, []);

  useEffect(() => {
    // get usr data from firestore
    if (user) {
      const getUserData = async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUser((prev) => ({ ...prev, ...userData }));
          }
          else{
            // create user data in firestore
            await setDoc(doc(db, "users", user.uid), {
              email: user.email,
              name: user.displayName,
            });
          }
        } catch (error) {
          console.error("Error getting user data:", error);
        }
      };
      getUserData();
    }
  }, [user]);

  return (
    <context.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </context.Provider>
  );
};

export const useAppContext = () => {
  return useContext(context);
};
