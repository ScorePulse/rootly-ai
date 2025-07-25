import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export const useAuth = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return { logout };
};
