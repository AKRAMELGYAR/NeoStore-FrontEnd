import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Home from "./features/home/pages/Home/Home"
import Login from "./features/auth/pages/LogIn/Login"
import Signup from "./features/auth/pages/Signup/Signup"
import Layout from "./components/Layout/Layout"
import { Toaster } from "react-hot-toast"
import ConfirmEmail from "./features/auth/pages/ConfirmEmail/ConfirmEmail"
import ProtectedRoutes from "./features/auth/components/ProtectedRoutes/ProtectedRoutes"
import GuestRoutes from "./features/auth/components/GuestRoutes/GuestRoutes"
import UserProvider from "./features/auth/context/UserContext"
import CartPage from "./features/cart/pages/Cart/CartPage"
import ProductsPage from "./features/products/pages/Products/ProductsPage"
import ProductDetails from "./features/products/pages/ProductDetails/ProductDetails"
import CheckoutPage from "./features/orders/pages/checkOut/checkOut"
import Orders from "./features/orders/pages/orders/orders"


function App() {

  const routes = createBrowserRouter([
    {
      path: "/", element:
        <ProtectedRoutes>
          <Layout />
        </ProtectedRoutes>, children: [
          { path: "/home", element: <Home /> },
          { path: '/product', element: <ProductsPage /> },
          { path: '/product/:productId', element: <ProductDetails /> },
          { path: "/cart", element: <CartPage /> },
          { path: "/checkout", element: <CheckoutPage /> },
          { path: "/orders", element: <Orders /> },
          { index: true, element: <Home /> },

        ]
    },

    {
      path: '/', element:
        <GuestRoutes>
          <Layout />
        </GuestRoutes>, children: [
          { path: "/login", element: <Login /> },
          { path: "/confirm-email", element: <ConfirmEmail /> },
          { path: "/signup", element: <Signup /> },
        ]
    }
  ])

  return (

    <>
      <Toaster position="top-right" />
      <UserProvider>
        <RouterProvider router={routes} />
      </UserProvider>
    </>
  )

}

export default App
