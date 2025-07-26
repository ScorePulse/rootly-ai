import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

interface UserData {
  uid: string;
  name: string;
  email: string;
  isRegistered: boolean;
  isProfileComplete: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  refreshUserData: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userData: null,
  loading: true,
  refreshUserData: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (user: User): Promise<UserData | null> => {
    try {
      console.log("Fetching user data for:", user.uid);
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        console.log("User document data:", data);
        const userData = {
          uid: user.uid,
          name: data.name || "",
          email: data.email || user.email || "",
          isRegistered: data.isRegistered || false,
          isProfileComplete: data.isProfileComplete || false,
        };
        console.log("Processed user data:", userData);
        return userData;
      } else {
        console.log("No user document found for:", user.uid);
      }
      return null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const refreshUserData = async () => {
    if (currentUser) {
      const data = await fetchUserData(currentUser);
      setUserData(data);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setCurrentUser(user);

      if (user) {
        const data = await fetchUserData(user);
        setUserData(data);
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, userData, loading, refreshUserData }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
