import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useRef, useState } from "react";

export default function Layout() {
  const navbar = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const calculateHeight = () => {
      const navbarHeight = navbar.current?.offsetHeight || 0;
      const windowHeight = window.innerHeight;

      setHeight(windowHeight - navbarHeight);
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
      <div className="flex-1" style={{ minHeight: `${height}px` }}>
        <Outlet />
      </div>

      {/* Footer (hors écran) */}
      <footer className="bg-gray-800">
        Footer
      </footer>
    </div>
  );
}
