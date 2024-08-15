import { API_URL } from "../constants"
import getAccessToken from "./getAccessToken";

export default async function getAllUsers() {
  const res = await fetch(`${API_URL}/users/`, {
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`
    },
  })

  if (res.ok) {
    return res.json()
  } else {
    throw new Error("Error finding list of Users");
  }
}