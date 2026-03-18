import logo from "@/assets/logo.png";
import { Search } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { CgMenuLeft } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="bg-background">
      {/* Upper Navbar */}
      <div>
        <div className="container-custom flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center text-2xl font-semibold sm:text-3xl"
          >
            <img src={logo} alt="NexGear website logo" className="h-15 w-15" />
            <span>N</span>exGear
          </Link>

          {/* Right side  */}
          <div className="flex items-center gap-5">
            <div className="group relative">
              <input
                type="text"
                placeholder="Search"
                className="focus:border-primary/40 w-[200px] rounded-full border border-gray-300 px-3 py-1 transition-all duration-300 group-hover:w-[300px] focus:outline-none"
              />
              <Search className="group-hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
            </div>
            {/* order button */}
            <button className="from-primary to-secondary flex items-center gap-2 rounded-full bg-gradient-to-r px-4 py-1 text-white">
              <span className="hidden sm:block">Order</span>
              <FaShoppingCart className="text-lg" />
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
      {/* Lower Navbar */}
      <div></div>
    </div>
  );
};

export default Navbar;
