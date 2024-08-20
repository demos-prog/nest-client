import { API_URL, User } from "../constants";
import getAccessToken from "./getAccessToken";

export default async function getUserById(id: number): Promise<User | null> {
  const res = await fetch(`${API_URL}/users/${id}`, {
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