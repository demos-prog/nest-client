import { API_URL } from "../constants";
import getAccessToken from "./getAccessToken";

export default async function deleteUser(id?: number) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`
    }
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error(`Failed to delete user: ${res.statusText}`);
}