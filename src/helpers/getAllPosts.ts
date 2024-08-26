import { API_URL } from "../constants";
import getAccessToken from "./getAccessToken";

export async function getAllPosts(userId?: number, title?: string, take?: number, skip?: number) {
  const queryParams: Record<string, string> = {};
  if (userId) queryParams.userId = userId.toString();
  if (title) queryParams.title = title;
  if (take) queryParams.take = take.toString();
  if (skip) queryParams.skip = skip.toString();

  const queryString = new URLSearchParams(queryParams).toString();

  const res = await fetch(`${API_URL}/posts?${queryString}`, {
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