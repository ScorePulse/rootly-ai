import { auth } from "../firebase";
import api from "../api";

export const updateUserProfile = async (data: any) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is signed in.");
  }

  const token = await user.getIdToken();
  const response = await api.put(`/users/profile/${user.uid}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
