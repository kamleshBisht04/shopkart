import logo from "@/assets/logo.png";
import { MapPin, Search } from "lucide-react";
import { FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { CgClose, CgMenuLeft } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu } from "@/const/const";
import { Show, SignInButton, UserButton } from "@clerk/react";

const Navbar = ({
  location,
  getLocation,
  locationDropDown,
  setLocationDropDown,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLocationDown = () => {
    setLocationDropDown((prev) => !prev);
  };

  // 🔥 Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  return (
    <div className="relative z-50 bg-white shadow-md">
      {/* Upper Navbar */}
      <div className="bg-primary/10 py-1">
        <div className="container-custom flex items-center justify-between">
          {/* Left Section */}
          <div className="flex gap-10">
            <NavLink to="/" className="flex items-center text-2xl sm:text-3xl">
              <img src={logo} alt="logo" className="h-12 w-10" />
              <span className="text-danger ml-2 font-serif font-bold">Z</span>
              <span className="text-tertiary font-bold">aptro</span>
            </NavLink>

            {/* Location (Desktop only) */}
            <div className="hidden cursor-pointer items-center gap-1 lg:flex">
              <MapPin
                className={`${location ? "text-green-500" : "text-danger"}`}
              />

              {location ? (
                <div className="text-tertiary mr-1 max-w-6xl leading-tight font-semibold">
                  <p className="text-sm">{location.neighbourhood}</p>
                  <p className="text-xs opacity-80">
                    {location.city}, {location.state} {location.postcode}
                  </p>
                </div>
              ) : (
                <span className="text-tertiary font-semibold">Add Address</span>
              )}

              <FaCaretDown
                onClick={toggleLocationDown}
                className={`cursor-pointer transition-all duration-300 ${
                  location ? "rotate-180 text-green-600" : "text-tertiary"
                }`}
              />
            </div>

            {/* Location Dropdown */}
            <div className="relative">
              {locationDropDown && (
                <div className="absolute top-12 right-0 z-50 w-[250px] rounded-md border bg-white p-4 shadow-lg">
                  <div className="mb-3 flex items-center justify-between">
                    <h1 className="text-sm font-semibold">Change Location</h1>

                    <span
                      onClick={toggleLocationDown}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-gray-100"
                    >
                      <CgClose className="hover:text-danger text-gray-500" />
                    </span>
                  </div>

                  <button
                    onClick={getLocation}
                    className="bg-danger hover:bg-primary w-full rounded-md px-3 py-1.5 text-sm text-white transition"
                  >
                    Detect my location
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-10">
            {/* Search */}
            <div className="group relative hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="border-tertiary focus:border-primary w-[200px] rounded-full border px-3 py-1 transition-all duration-300 group-hover:w-[300px] focus:outline-none"
              />
              <Search className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
            </div>

            {/* Cart */}
            <button className="bg-primary-gradient flex items-center gap-2 rounded-full px-4 py-1 text-white">
              <span className="hidden sm:block">Order</span>
              <FaShoppingCart className="text-lg" />
            </button>

            {/* Auth */}
            <div className="hidden sm:block">
              <Show when="signed-out">
                <SignInButton className="bg-danger rounded-md px-3 py-1 font-semibold text-white" />
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="mr-3 flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 sm:hidden "
            >
              {isMobileMenuOpen ? (
                <MdOutlineClose className="text-xl z-50" />
              ) : (
                <CgMenuLeft className="text-xl z-50" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="bg-background hidden justify-center sm:flex">
        <ul className="flex items-center gap-16 py-3">
          {Menu.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `text-md relative cursor-pointer pb-1 font-medium ${isActive ? "text-primary" : "text-black"} after:bg-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:transition-transform after:duration-300 after:content-[''] ${isActive ? "after:scale-x-100" : "after:scale-x-0"} `
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔥 Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/30"
        />
      )}

      {/* 🔥 Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[200px] transform bg-white p-5 shadow-xl transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menu</h2>
        </div>

        <ul className="flex flex-col gap-4">
          {Menu.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary text-base font-medium"
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          <li className="mt-4">
            <Show when="signed-out">
              <SignInButton className="bg-danger w-full rounded-md px-3 py-2 text-white" />
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
