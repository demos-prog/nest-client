import { API_URL, User } from "../constants";
import getAccessToken from "./getAccessToken";

export default async function editUser(user: { email: string, role: 'admin' | 'user' }, id?: number):Promise<User> {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(user)
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error(`Failed to edit user: ${res.statusText}`);
}