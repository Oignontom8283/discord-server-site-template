export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Vidéo background */}
      <video
        src="assets/background.mp4"
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
        <div>
          <img src="logo.png" alt="Logo" />
          <h1 className="text-4xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    </div>
  );
}
