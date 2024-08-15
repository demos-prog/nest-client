import { API_URL } from "../constants"

export default async function validateToken(access_token: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/auth/${access_token}`)

  if (res.ok) {
    await res.json()
    return true
  } else {
    return false
  }
}