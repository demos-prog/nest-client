import { CLIENT_URL } from "../constants";

export default function logOut() {
  localStorage.removeItem('myAppUsersData');
  window.location.assign(`${CLIENT_URL}/login`);
}