import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signin from "./pages/Signin.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";
import Categore from "./pages/Categore.jsx";
import Products from "./pages/Products.jsx";
import Notfound from "./pages/Notfound.jsx";
import Hero from "./pages/Hero.jsx";
import Root from "./rotes/Root.jsx";
import ProtectedRoutes from "./pages/ProtectedRoutes.jsx";
import NonProtectedRoutes from "./pages/NonProtectedRoutes.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendCode from './Auth/SendCode.jsx';
import ForgetPassword from './Auth/ForgetPassword.jsx';
import CategorisDetails from './pages/CategorisDetails.jsx';
import { CartProvider } from './Contextcart/Cart.jsx';
import Order from './pages/Order.jsx';
import Orders from "./pages/Orders.jsx";
import Logout from "./pages/Logout.jsx";
import Profile from './pages/Profile/Profile.jsx';


import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '*',
        element: <Notfound />
      },
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/Signin",
        element: <NonProtectedRoutes><Signin /></NonProtectedRoutes>
      },
      {
        path: "/Login",
        element: <Login />
      },
      {
        path: 'sendcode',
        element: <SendCode />
      },
      {
        path: 'ForgetPassword',
        element: <ForgetPassword />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/Categore",
        element: <Categore />
      },
      {
        path: '/products/category/:categoryId',
        element: <CategorisDetails />
      },
      {
        path: "/Hero",
        element: <Hero />
      },
      {
        path: "/Profile",
        element: <Profile />
      },
      {
        path: '/products/:productId',
        element: <ProtectedRoutes><Products /></ProtectedRoutes>
      },
      {
        path: '/Order',
        element: <ProtectedRoutes><Order /></ProtectedRoutes>
      },
      {
        path: '/Orders',
        element: <Orders />
      },
      {
        path: '/Logout',
        element: <Logout />
      },
    ]
  },
]);

export default function App() {
  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </CartProvider>
    </>
  )
}
