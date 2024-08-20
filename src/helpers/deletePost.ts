import { API_URL } from "../constants"
import getAccessToken from "./getAccessToken";
import getRole from "./getRole";

export default async function deletePost(id: number) {
  return getRole().then(async (role) => {
    const res = await fetch(`${API_URL}/posts/${id}?role=${role}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
        "Content-type": "application/json",
      }
    })

    if (res.ok) {
      return res.json()
    } else {
      throw new Error("Error deleting Post");
    }
  })
}