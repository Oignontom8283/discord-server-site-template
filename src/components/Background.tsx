import { useEffect, useRef, useState } from "react";

function isImage(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
}
function isVideo(url: string): boolean {
  return /\.(mp4|webm|ogg)$/i.test(url);
}
function isColor(value: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(value) || /^#[0-9A-Fa-f]{3}$/.test(value);
}

type BackgroundType = "color" | "image" | "video";

export default function Background({ backgroundValue, onTypeDetected }: { backgroundValue: string, onTypeDetected?: (type: BackgroundType) => void }) {
  const type: BackgroundType = isVideo(backgroundValue)
    ? "video"
    : isImage(backgroundValue)
    ? "image"
    : "color";

  // Notifie the parent component of the detected type
  useEffect(() => {
    if (onTypeDetected) {
      onTypeDetected(type);
    }
  },[type])

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Gère le changement d'état de visibilité (pause auto quand onglet inactif)
  useEffect(() => {
    const handleVisibility = () => {
      const video = videoRef.current;
      if (video) {
        if (document.visibilityState === "hidden") {
          video.pause();
        } else if (isPlaying) {
          video.play();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
    }
    setIsMuted(!isMuted);
  };

  if (type === "video") {
    return (
      <>
        {/* ✅ Boutons contrôles - z-50 pour bien passer au-dessus */}
        <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
          <input
            type="checkbox"
            className="toggle checked:bg-green-300 bg-red-300 text-black"
            title="Play/Pause"
            checked={isPlaying}
            onChange={togglePlay}
          />
          <input
            type="checkbox"
            className="toggle checked:bg-green-300 bg-red-300 text-black"
            title="Mute/Unmute"
            checked={!isMuted}
            onChange={toggleSound}
          />
        </div>

        {/* ✅ Background vidéo seulement */}
        <video
          ref={videoRef}
          src={"/" + backgroundValue}
          autoPlay
          loop
          muted={isMuted}
          disablePictureInPicture
          className="fixed top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none"
        />
      </>
    )

  }

  if (type === "image") {
    return (
      <img
        src={backgroundValue}
        alt=""
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none"
      />
    );
  }

  return (
    <div
      style={{ backgroundColor: backgroundValue }}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
