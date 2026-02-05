import { NavLink } from "react-router-dom";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import { useContext, useState } from "react";
import { UserContext } from "../../features/auth/context/UserContext";
import { useCart } from "../../features/cart/hooks/useCart";
import type { CartItem } from "../../shared/types";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { token, logOut } = useContext(UserContext)
  const { data: cartData } = useCart();
  const items = cartData?.products || [];
  const cartCount = items.reduce((count: number, item: CartItem) => count + item.quantity, 0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-72
        bg-black/95 backdrop-blur-xl
        border-r border-white/10
        shadow-2xl
        transform transition-transform duration-300 ease-in-out
        z-50
        lg:hidden
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8">
            <NavLink to="/home" onClick={closeSidebar}>
              <img src={freshCartLogo} alt="freshCart logo" className="h-8" />
            </NavLink>
            <button
              onClick={closeSidebar}
              className="text-white hover:text-primary-800 transition"
            >
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex flex-col gap-6 flex-1">
            {/* Navigation Links */}
            {token && (
              <div>
                <h3 className="text-white/50 text-xs uppercase tracking-wider mb-3">Navigation</h3>
                <ul className="flex flex-col gap-2">
                  {["home", "product", "orders"].map((item) => (
                    <li key={item}>
                      <NavLink
                        to={`/${item}`}
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                          `
                          block px-4 py-3 rounded-lg
                          text-white
                          transition-all duration-200
                          ${isActive
                            ? "bg-primary-800 font-semibold"
                            : "hover:bg-white/10"
                          }
                          `
                        }
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cart Link */}
            {token && (
              <div>
                <h3 className="text-white/50 text-xs uppercase tracking-wider mb-3">Shopping</h3>
                <NavLink
                  to="/cart"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition"
                >
                  <div className="relative">
                    <i className="fa-solid fa-cart-shopping text-lg"></i>
                    <div className="
                      flex justify-center items-center
                      bg-primary-800
                      h-5 w-5
                      rounded-full
                      absolute -right-2 -top-2
                      text-white text-xs
                    ">
                      {cartCount}
                    </div>
                  </div>
                  <span>Cart</span>
                </NavLink>
              </div>
            )}

            {/* Social Links */}
            <div>
              <h3 className="text-white/50 text-xs uppercase tracking-wider mb-3">Follow Us</h3>
              <ul className="flex gap-4 flex-wrap px-4">
                {["facebook", "x", "instagram", "tiktok", "linkedin", "youtube"].map(icon => (
                  <li key={icon}>
                    <a href="#" target="_blank">
                      <i className={`
                        fa-brands fa-${icon}
                        text-white/70
                        hover:text-primary-800
                        hover:scale-110
                        transition
                        text-lg
                      `}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Auth Links */}
            <div className="mt-auto">
              {!token ? (
                <>
                  <h3 className="text-white/50 text-xs uppercase tracking-wider mb-3">Account</h3>
                  <ul className="flex flex-col gap-2">
                    <li>
                      <NavLink
                        to="/signup"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                          `
                          block px-4 py-3 rounded-lg
                          text-white
                          transition-all duration-200
                          ${isActive
                            ? "bg-primary-800 font-semibold"
                            : "hover:bg-white/10"
                          }
                          `
                        }
                      >
                        SignUp
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                          `
                          block px-4 py-3 rounded-lg
                          text-white
                          transition-all duration-200
                          ${isActive
                            ? "bg-primary-800 font-semibold"
                            : "hover:bg-white/10"
                          }
                          `
                        }
                      >
                        Login
                      </NavLink>
                    </li>
                  </ul>
                </>
              ) : (
                <button
                  onClick={() => {
                    logOut();
                    closeSidebar();
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-red-500/20 hover:text-red-500 transition w-full"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket text-lg"></i>
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Navbar */}
      <nav className="
        bg-black/90
        backdrop-blur
        py-3
        mx-5
        my-4
        rounded-xl
        shadow-xl
        border border-white/10
        sticky top-0 z-1000
      ">
        <div className="container mx-auto flex items-center gap-12 px-6">

          {/* Hamburger Menu - Mobile Only */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white hover:text-primary-800 transition"
          >
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>

          <NavLink to="/home">
            <img src={freshCartLogo} alt="freshCart logo" />
          </NavLink>


          {/* Links - Desktop Only */}
          {token && (
            <ul className="hidden lg:flex gap-5 items-center">
              {["home", "product", "orders"].map((item) => (
                <li key={item}>
                  <NavLink
                    to={`/${item}`}
                    className={({ isActive }) =>
                      `
                    text-white relative
                    before:content-['']
                    before:absolute
                    before:left-0
                    before:-bottom-1
                    before:h-0.5
                    before:bg-primary-800
                    before:w-0
                    before:transition-all
                    before:duration-300
                    hover:before:w-full
                    ${isActive ? "before:w-full font-semibold" : ""}
                    `
                    }
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}

          {/* Cart - Desktop Only */}
          {token && (
            <NavLink to="/cart" className="hidden lg:block relative cursor-pointer group ms-auto">
              <i className="fa-solid fa-cart-shopping text-lg text-white group-hover:text-primary-800 transition"></i>
              <div className="
              flex justify-center items-center
              bg-primary-800
              h-5 w-5
              rounded-full
              absolute right-0 top-0
              translate-x-1/2 -translate-y-1/2
              text-white text-xs
            ">
                {cartCount}
              </div>
            </NavLink>
          )}

          {/* Social - Desktop Only */}
          <ul className={`hidden lg:flex gap-4 items-center ${!token && 'ms-auto'}`}>
            {["facebook", "x", "instagram", "tiktok", "linkedin", "youtube"].map(icon => (
              <li key={icon}>
                <a href="#" target="_blank">
                  <i className={`
                    fa-brands fa-${icon}
                    text-white/70
                    hover:text-primary-800
                    hover:scale-110
                    transition
                  `}></i>
                </a>
              </li>
            ))}
          </ul>

          {/* Auth - Desktop Only */}
          <ul className="hidden lg:flex gap-5 items-center">
            {!token && <>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `
                  text-white relative
                  before:content-['']
                  before:absolute
                  before:left-0
                  before:-bottom-1
                  before:h-0.5
                  before:bg-primary-800
                  before:w-0
                  before:transition-all
                  before:duration-300
                  hover:before:w-full
                  ${isActive ? "before:w-full font-semibold" : ""}
                  `
                  }
                >
                  SignUp
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `
                  text-white relative
                  before:content-['']
                  before:absolute
                  before:left-0
                  before:-bottom-1
                  before:h-0.5
                  before:bg-primary-800
                  before:w-0
                  before:transition-all
                  before:duration-300
                  hover:before:w-full
                  ${isActive ? "before:w-full font-semibold" : ""}
                  `
                  }
                >
                  Login
                </NavLink>
              </li>
            </>}

            {token && <>
              <li onClick={logOut} >
                <i className="fa-solid fa-arrow-right-from-bracket text-lg text-white hover:text-red-500 transition cursor-pointer"></i>
              </li>
            </>}
          </ul>

          {/* Mobile Cart Icon - Visible on mobile when logged in */}
          {token && (
            <NavLink to="/cart" className="lg:hidden relative cursor-pointer group ms-auto">
              <i className="fa-solid fa-cart-shopping text-lg text-white group-hover:text-primary-800 transition"></i>
              <div className="
              flex justify-center items-center
              bg-primary-800
              h-5 w-5
              rounded-full
              absolute right-0 top-0
              translate-x-1/2 -translate-y-1/2
              text-white text-xs
            ">
                {cartCount}
              </div>
            </NavLink>
          )}

        </div>
      </nav>
    </>
  );
}


