import { auth } from "../firebase";
import { updateUserProfile as updateProfile } from "../api";

export const updateUserProfile = async (data: any) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is signed in.");
  }

  const response = await updateProfile(user.uid, data);
  return response.data;
};
