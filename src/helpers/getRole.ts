import getCurrentEmail from "./getCurrentEmail"
import getuserByEmail from "./getUaserByEmail"

export default async function getRole(): Promise<'admin' | 'user' | undefined> {
  const email = getCurrentEmail()
  if (email) {
    return getuserByEmail(email).then(user => {
      const role = user?.role
      if (role) return role
    })
  } else {
    return Promise.resolve(undefined)
  }
}