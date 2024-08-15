export default function getCurrentEmail(): string | null {
  const usersData = localStorage.getItem('myAppUsersData')
  if (usersData) {
    return JSON.parse(usersData).email
  }
  return null
}