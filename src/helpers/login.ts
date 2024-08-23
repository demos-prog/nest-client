import { API_URL, IUserLogin } from "../constants";

export default async function login(userData: IUserLogin) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      "Content-type": "application/json; charset=utf-8"
    }
  })

  if (res.ok) {
    return await res.json()
  } else {
    throw new Error("Error Log in");
  }
}