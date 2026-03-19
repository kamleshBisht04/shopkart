import logo from "@/assets/logo.png";
import { MapPin, Search } from "lucide-react";
import { FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { CgClose, CgMenuLeft } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
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

  return (
    <div className="relative z-50 bg-white shadow-md duration-200">
      {/* Upper Navbar */}
      <div className="bg-primary/10 py-1">
        <div className="container-custom flex items-center justify-between">
          <div className="flex gap-10">
            <NavLink to="/" className="flex items-center text-2xl sm:text-3xl">
              <img src={logo} alt="Zeptro website logo" className="h-12 w-10" />
              <span className="text-danger ml-2 font-serif font-bold">Z</span>
              <span className="text-tertiary font-bold">aptro</span>
            </NavLink>
            {/* current location navigator */}
            <div className="hidden cursor-pointer items-center gap-2 sm:flex">
              <MapPin className="text-danger" />

              {location ? (
                <div className="text-tertiary mr-1 max-w-6xl leading-tight font-semibold">
                  <p className="text-sm">{location.neighbourhood}</p>
                  <p className="text-xs opacity-80">
                    {location.city} {location.state},{location.postcode}
                  </p>
                </div>
              ) : (
                <span className="text-tertiary font-semibold">Add Address</span>
              )}

              <FaCaretDown
                onClick={toggleLocationDown}
                size={18}
                className={`cursor-pointer transition-all duration-300 ease-in-out hover:scale-125 ${
                  location ? "rotate-180 text-green-600" : "text-tertiary"
                } `}
              />
            </div>
            {/* navigation detect section */}
            <div className="relative">
              {locationDropDown && (
                <div className="absolute top-14 -left-56 z-50 w-[250px] rounded-md border border-gray-200 bg-white p-4 shadow-lg">
                  <div className="mb-3 flex items-center justify-between">
                    <h1 className="text-md font-semibold">Change Location</h1>

                    <CgClose
                      onClick={toggleLocationDown}
                      className="cursor-pointer text-gray-500 hover:text-red-500"
                    />
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

          {/* Right side  */}
          <div className="flex items-center gap-10">
            <div className="group relative hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="focus:border-primary border-tertiary w-[200px] rounded-full border px-3 py-1 transition-all duration-300 group-hover:w-[300px] placeholder:text-gray-800 focus:outline-none"
              />
              <Search className="group-hover:text-text-primary absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
            </div>
            {/* order button */}
            <button className="bg-primary-gradient flex items-center gap-2 rounded-full px-4 py-1 text-white">
              <span className="hidden sm:block">Order</span>
              <div className="relative">
                <FaShoppingCart className="relative text-lg" />
                <span className="bg-background text-tertiary absolute -top-3 -right-8 hidden rounded-full px-2 font-semibold">
                  0
                </span>
              </div>
            </button>
            {/* Dark Mode */}
            {/* <DarkMode/> */}

            {/* signIn */}

            <div className="hidden sm:block">
              <Show when="signed-out">
                <SignInButton className="bg-danger cursor-pointer rounded-md px-3 py-1 font-semibold text-white" />
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>

            {/* Burger Icon (Mobile) */}
            <button
              className="mr-3 sm:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? (
                <MdOutlineClose size={22} />
              ) : (
                <CgMenuLeft size={22} />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Lower Navbar  Desktop Menu */}
      <div className="bg-background hidden justify-center sm:flex">
        <ul className="flex items-center gap-16 py-3">
          {Menu.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `text-md relative cursor-pointer pb-1 font-medium ${isActive ? "text-primary " : "text-black"} after:bg-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:content-[''] ${isActive ? "after:scale-x-100" : ""}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile navbar */}
      {isMobileMenuOpen && (
        <div className="bg-background shadow-md sm:hidden">
          <ul className="flex flex-col gap-4 p-4">
            {Menu.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
