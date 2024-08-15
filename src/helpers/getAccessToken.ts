export default function getAccessToken(): string | null {
  const usersData = localStorage.getItem('myAppUsersData')
  if (usersData) {
    return JSON.parse(usersData).access_token
  }
  return null
}