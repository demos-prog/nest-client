import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './null_styles.css';
import Auth from './components/Auth/Auth.tsx';
import Login from './components/Login/Login.tsx';
import Admin from './components/Admin/Admin.tsx';
import RequireAuth from './components/RequireAuth/RequireAuth.tsx';
import User from './components/User/User.tsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user",
    element: (
      <RequireAuth>
        <User />
      </RequireAuth>),
  },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <Admin />
      </RequireAuth>),
  },
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "*",
    element: <Auth />,
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
