import { API_URL, PostDTO } from "../constants"
import getAccessToken from "./getAccessToken";
import getRole from "./getRole";

export default async function updatePost(postID: number, post: PostDTO) {
  return getRole().then(async (role) => {
    const res = await fetch(`${API_URL}/posts/${postID}?role=${role}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(post)
    })

    if (res.ok) {
      return res.json()
    } else {
      throw new Error("Error editing Post");
    }
  })
}