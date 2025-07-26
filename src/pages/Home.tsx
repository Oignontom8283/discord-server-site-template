import { useContext, useRef, useState } from "react";
import { DataContext } from "../context";
import { Link } from "react-router-dom";

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

  const { data } = useContext(DataContext);

  console.log("Datacontext", data)

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
        src="assets/background.mp4"
        muted={!backgroundVideoSound}
        autoPlay
        loop
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen text-white">

        <div className="flex flex-col items-center justify-center">

          <div className="flex flex-col items-center justify-center text-center p-24">
            <img src={data?.invite.guild.icon({})} alt="Logo" className="w-64 h-64 rounded-full" />
            <h1 className="text-4xl font-bold mb-4">{data?.invite.guild.name}</h1>
            <p className="font-bold italic">{data?.invite.guild.description}</p>
            <div className="flex flex-grow items-center mt-8">
              <a href={`https://discord.gg/${data?.invite.guild.id}`} className="btn btn-primary mt-4" target="_blank" rel="noopener noreferrer">
                Join the Guild
              </a>
              <Link to="/about" className="btn btn-soft bg-gray-200 border-gray-300 mt-4 ml-4">
                About Us
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
