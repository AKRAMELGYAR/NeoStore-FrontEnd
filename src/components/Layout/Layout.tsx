import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import AIChat from "../AIChat/AIChat";


export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <AIChat />
    </>
  )
}