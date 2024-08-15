import { API_URL, User } from "../constants";
import getAccessToken from "./getAccessToken";

export default async function getuserByEmail(email: string): Promise<User | null> {
  const res = await fetch(`${API_URL}/users/userEmail/${email}`, {
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`
    },
  });

  if (res.ok) {
    return res.json()
  } else {
    throw new Error("Error finding User");
  }
}