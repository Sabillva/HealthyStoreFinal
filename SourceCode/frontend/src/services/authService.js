import { auth } from "../firebase/firebase";

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const getToken = async () => {

  const user = auth.currentUser;

  if (!user) {
    return null;
  }

  return await user.getIdToken();
};