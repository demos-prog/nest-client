export default function logOut() {
  localStorage.removeItem('myAppUsersData');
  window.location.reload();
}