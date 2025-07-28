import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../context";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import Mustache from "mustache";

export default function Home() {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [backgroundVideoPlaying, toggleBackgroundVideoPlaying] = (() => {
    const [state, setState] = useState(true);
    return [state, () => {
      if (videoRef.current) {
        if (state) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
      }
      setState(!state);
    }] as const;
  })();

  const [backgroundVideoSound, setBackgroundVideoSound] = (() => {
    const [state, setState] = useState(false);
    return [state, () => {
      if (videoRef.current) {
        videoRef.current.muted = !state;
      }
      setState(!state);
    }] as const;
  })();

  // Pause video when tab is not visible
  // and resume when it is visible again.
  useEffect(() => {
    const changeVisibility = () => {
      if (videoRef.current) {
        if (document.visibilityState === "hidden") {
          videoRef.current.pause();
        } else {
          if (backgroundVideoPlaying) {
            videoRef.current.play();
          }
        }
      }
    }
    document.addEventListener("visibilitychange", changeVisibility);
    return () => {
      document.removeEventListener("visibilitychange", changeVisibility);
    };
  }, [backgroundVideoPlaying]);


  const { data } = useContext(DataContext);

  useEffect(() => {
    document.title = data?.invite.guild.name!;
  }, []);

  return (
    <div className="relative min-h-screen">

      {/* Contrôle background video */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-[100]">
        {/* Play Button */}
        <input type="checkbox" className="toggle checked:bg-green-300 bg-red-300 text-black" title="Play/Pause" checked={backgroundVideoPlaying} onChange={toggleBackgroundVideoPlaying} />

        {/* Sound Button */}
        <input type="checkbox" className="toggle checked:bg-green-300 bg-red-300 text-black" title="Mute/Unmute" checked={backgroundVideoSound} onChange={setBackgroundVideoSound} />

      </div>

      {/* Vidéo background */}
      <video
        ref={videoRef}
        src={data?.pages.home.background}
        muted={!backgroundVideoSound}
        autoPlay
        loop
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">

        <div className="flex flex-col items-center justify-center text-white">

          <div className="flex flex-col items-center justify-center text-center p-24">
            <img src={data?.invite.guild.icon({})} alt="Logo" className="w-64 h-64 rounded-full" />
            <h1 className="text-4xl font-bold mb-1">{data?.invite.guild.name}</h1>

            {/* members indicator */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="flex items-center justify-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>{data?.invite.guild.onlines} online</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
                <span>{data?.invite.guild.members} members</span>
              </div>
            </div>

            <p className="font-bold italic">{data?.invite.guild.description}</p>
            
            <div className="flex flex-grow items-center mt-4">

              <a href={data?.config.join} className="btn btn-primary shadow-none bg-[#1D863B] hover:bg-[#2B7739] border-none text-white mt-4" target="_blank" rel="noopener noreferrer">
                Join the Guild
              </a>
              <Link to="/about" className="btn btn-soft bg-slate-300/70 border-none hover:bg-slate-400 shadow-none mt-4 ml-4">
                About Us
              </Link>
            </div>

          </div>
          
          {/* Markdown Content */}
          <div className="max-w-2xl mx-auto px-4 mb-24">
            <div className="prose prose-invert max-w-[110ch] bg-transparent border-transparent hover:bg-gray-700/70 backdrop-blur-none hover:backdrop-blur-sm p-12 rounded-lg hover:border-gray-800 border">
              <ReactMarkdown>
                {Mustache.render(data?.pages.home.content || "", {
                  guild: data?.invite.guild,
                  channel: data?.invite.channel,
                  user: data?.invite.inviter,
                  config: data?.config,
                })}
              </ReactMarkdown>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
