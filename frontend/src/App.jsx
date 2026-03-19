import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Cart from "@/pages/Cart";
import Navbar from "@/layout/Navbar";
import axios from "axios";

const App = () => {
  const [location, setLocation] = useState();
  const [locationDropDown, setLocationDropDown] = useState(false);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&format=json`;
      try {
        const location = await axios.get(url);
        const exactLocation = location.data.address;
        setLocation(exactLocation);
        setLocationDropDown(false);
        console.log(exactLocation);
      } catch (error) {
        console.log(error);
      }
    });
  };
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <>
      <Navbar
        location={location}
        getLocation={getLocation}
        locationDropDown={locationDropDown}
        setLocationDropDown={setLocationDropDown}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
