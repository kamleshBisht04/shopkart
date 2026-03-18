import logo from "@/assets/logo.png";
import { MapPin, Search } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { CgMenuLeft } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useState } from "react";

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Products", link: "/products" },
  { id: 3, name: "About", link: "/about" },
  { id: 4, name: "Contact", link: "/contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = false;
  return (
    <div className="relative z-50 bg-white shadow-md duration-200">
      {/* Upper Navbar */}
      <div className="bg-primary/10">
        <div className="container-custom flex items-center justify-between">
          <div className="flex gap-10">
            <Link
              to="/"
              className="text-tertiary flex items-center text-2xl font-semibold sm:text-3xl"
            >
              <img src={logo} alt="Zeptro website logo" className="h-11 w-11" />
              <span className="font-serif text-red-500">Z</span>aptro
            </Link>
            <div className="flex cursor-pointer items-center gap-1">
              <MapPin />
              <span className="font-semibold">
                {location ? <div></div> : "Add Address"}
              </span>
            </div>
          </div>

          {/* Right side  */}
          <div className="flex items-center gap-5">
            <div className="group relative hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="focus:border-primary w-[200px] rounded-full border border-gray-300 px-3 py-1 transition-all duration-300 group-hover:w-[300px] focus:outline-none"
              />
              <Search className="group-hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
            </div>
            {/* order button */}
            <button className="from-primary to-secondary flex items-center gap-2 rounded-full bg-gradient-to-r px-4 py-1 text-white">
              <span className="hidden sm:block">Order</span>
              <div className="relative">
                <FaShoppingCart className="relative text-lg" />
                <span className="bg-background text-tertiary absolute -top-3 -right-8 rounded-full px-2 font-semibold">
                  0
                </span>
              </div>
            </button>
            {/* Dark Mode */}
            {/* <DarkMode/> */}

            {/* Burger Icon (Mobile) */}
            <button
              className="sm:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? (
                <CgMenuLeft size={22} />
              ) : (
                <MdOutlineClose size={22} />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Lower Navbar  Desktop Menu */}
      <div className="bg-background hidden justify-center sm:flex">
        <ul className="flex items-center gap-16 py-3">
          {Menu.map((item) => (
            <li>
              <Link className="hover:text-primary duration-200">
                {item.name}
              </Link>
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
                <Link
                  to={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
