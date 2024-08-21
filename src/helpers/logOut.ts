export default function logOut() {
  localStorage.removeItem('myAppUsersData');
  window.location.assign(`http://localhost:5173/login`);
}