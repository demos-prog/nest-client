import getCurrentEmail from "./getCurrentEmail"
import getuserByEmail from "./getUaserByEmail"

export default async function getRole(): Promise<'admin' | 'user' | undefined> {
  const email = getCurrentEmail()
  if (email) {
    const user = await getuserByEmail(email)
    const role = user?.role
    if (role) return role
  } else {
    return Promise.resolve(undefined)
  }
}