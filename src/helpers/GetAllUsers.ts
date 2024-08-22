import { API_URL } from "../constants"
import getAccessToken from "./getAccessToken";

export default async function getAllUsers(role: string) {
  const res = await fetch(`${API_URL}/users?role=${role}`, {
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`
    },
  })

  if (res.ok) {
    return res.json()
  } else {
    throw new Error("Error getting list of Users");
  }
}