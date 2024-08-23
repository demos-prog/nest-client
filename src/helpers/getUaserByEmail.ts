import { API_URL, User } from "../constants";
import getAccessToken from "./getAccessToken";

export default async function getuserByEmail(email: string): Promise<User | null> {
  const res = await fetch(`${API_URL}/users/email/${email}`, {
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`
    },
  });

  if (res.ok) {
    const response = await res.json()
    return response
  } else {
    throw new Error("Error finding User");
  }
}