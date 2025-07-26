import { useContext, useRef, useState } from "react";
import { DataContext } from "../context";

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
  const [backgroundVideoSound, setBackgroundVideoSound] = useState(false);

  const { data } = useContext(DataContext);

  console.log("Datacontext", data)

  return (
    <div className="relative min-h-screen">

      {/* Contrôle background video */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-[9999]">
        {/* Play Button */}
        <button
          className="w-8 h-8 bg-gray-800 text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
          onClick={() => toggleBackgroundVideoPlaying()}
        >
          {backgroundVideoPlaying ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-6.364-3.682A1 1 0 007 8.5v7a1 1 0 001.388.924l6.364-3.682a1 1 0 000-1.664z" />
            </svg>
          ) : (
            //TODO: Add pause icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-6.364-3.682A1 1 0 007 8.5v7a1 1 0 001.388.924l6.364-3.682a1 1 0 000-1.664z" />
            </svg>
          )}
        </button>

      </div>

      {/* Vidéo background */}
      <video
        ref={videoRef}
        src="assets/background.mp4"
        autoPlay
        loop
        muted
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
          </div>

        </div>

      </div>
    </div>
  );
}
