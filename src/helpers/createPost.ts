import { API_URL, IPostDTO } from "../constants"
import getAccessToken from "./getAccessToken";
import getRole from "./getRole";

export default async function createPost(post: IPostDTO) {
  return getRole().then(async (role) => {
    const res = await fetch(`${API_URL}/posts?role=${role}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(post)
    })

    if (res.ok) {
      return res.json()
    } else {
      throw new Error("Error creating Post");
    }
  })
}