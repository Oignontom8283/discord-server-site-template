import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import { DataContext } from "./context";
import axios from "axios";
import * as yaml from 'js-yaml'
import { getInviteStatus } from "discord-guildpeek";
import { articlesZodShemat, configZodShemat, pagesZodShemat } from "./shemat";
import Alert from "./components/Alert";

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

    // Fetch config file in public directory
    // axios.get('/config.yaml')
    //   .then(response => {
    //     const configRaw = yaml.load(response.data); // transform YAML to JSON

    //     const configParseResult = configZodShemat.safeParse(configRaw);

    //     if (!configParseResult.success) {
    //       setError("Invalid config format.");
    //       return;
    //     }

    //     const config = configParseResult.data;

    //     // Fetch invite status using the code from config
    //     getInviteStatus(config.code)
    //       .then(inviteData => {
            
    //         // Set data in context
    //         setData({
    //           invite: inviteData,
    //           config: config,
              
    //         });

    //         // Set icon
    //         if (inviteData.guild.icon) {
    //           const link = document.createElement('link');
    //           link.rel = 'icon';
    //           link.href = inviteData.guild.icon({ size: 32 });
    //           document.head.appendChild(link);
    //         }
    //       })
    //       .catch(error => {
    //         console.error("Error fetching invite status:", error);
    //         setError("Failed to fetch invite status.");
    //       });
    //   })
    //   .catch(error => {
    //     console.error("Error fetching config:", error);
    //     setError("Failed to fetch config.");
    //   });

    (async () => {
      try {

        // Fetch config file in public directory
        const responseConfig = await axios.get('/config.yaml');
        const configRaw = yaml.load(responseConfig.data); // transform YAML to JSON

        const configParseResult = configZodShemat.safeParse(configRaw);

        if (!configParseResult.success) {
          setError("Invalid config format.");
          return;
        }

        const config = configParseResult.data;

        // Fetch invite status using the code from config
        const inviteData = await getInviteStatus(config.code);

        // Fetch pages
        const responsePages = await axios.get('/pages.yaml');
        const pagesRaw = yaml.load(responsePages.data); // transform YAML to JSON

        const pagesParseResult = pagesZodShemat.safeParse(pagesRaw);

        if (!pagesParseResult.success) {
          setError("Invalid pages format.");
          return;
        }

        const pages = pagesParseResult.data;

        // Fetch articles
        const responseArticles = await axios.get('/articles.yaml');
        const articlesRaw = yaml.load(responseArticles.data); // transform YAML to JSON

        const articlesParseResult = articlesZodShemat.safeParse(articlesRaw);

        if (!articlesParseResult.success) {
          setError("Invalid articles format.");
          return;
        }

        const articles = articlesParseResult.data;


        // Set data in context
        setData({
          invite: inviteData,
          config: config,
          pages: pages,
          articles: articles
        });

        // Set icon
        if (inviteData.guild.icon) {
          const link = document.createElement('link');
          link.rel = 'icon';
          link.href = inviteData.guild.icon({ size: 32 });
          document.head.appendChild(link);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      }
    })()

  }, []);

  // If there's an error, display it
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <Alert alertType="error">{error}</Alert>
      </div>
    );
  }

  // If data is not yet loaded, show a loading spinner
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
