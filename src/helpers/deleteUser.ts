import { API_URL } from "../constants";
import getAccessToken from "./getAccessToken";

export default async function deleteUser(role: 'admin' | 'user', id?: number) {
  const res = await fetch(`${API_URL}/users/${id}?role=${role}`, {
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