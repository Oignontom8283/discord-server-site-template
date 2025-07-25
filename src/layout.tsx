import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import { DataContext } from "./context";
import axios from "axios";
import * as yaml from 'js-yaml'
import { getInviteStatus } from "discord-guildpeek";

export default function Layout() {
  const [height, setHeight] = useState(0);
  const [error, setError] = useState<string | null>(null);

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
  
  const { data, setData } = useContext(DataContext);

  useEffect(() => {
    axios.get('/config.yaml')
      .then(response => {
        const config = yaml.load(response.data) as Record<string, any>;

        getInviteStatus(config.code)
          .then(inviteData => {
            setData({
              invite: inviteData,
              config: config
            });
          })
          .catch(error => {
            console.error("Error fetching invite status:", error);
            setError("Failed to fetch invite status.");
          });
      })
      .catch(error => {
        console.error("Error fetching config:", error);
        setError("Failed to fetch config.");
      });
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    )
  }

  
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
