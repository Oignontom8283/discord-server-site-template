import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";

export default function Layout() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const calculateHeight = () => {
      const navbarHeight = document.getElementById("navbar")?.offsetHeight || 0;
      const windowHeight = window.innerHeight;

      setHeight(windowHeight - navbarHeight + 1);
    }

    calculateHeight();

    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Contenu principal avec padding-bottom pour footer */}
      <div className="flex flex-col" style={{ minHeight: `${height}px` }}>
        <Outlet />
      </div>

      {/* Footer (hors écran) */}
      <Footer />
    </div>
  );
}
