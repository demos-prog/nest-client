import { API_URL } from "../constants";
import getAccessToken from "./getAccessToken";

export async function getAllPosts() {
  const res = await fetch(`${API_URL}/posts`, {
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`
    }
  })

  if (res.ok) {
    return res.json()
  } else {
    throw new Error("Error getting Posts");
  }
}