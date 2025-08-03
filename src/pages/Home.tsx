import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import Mustache from "mustache";
import remarkGfm from "remark-gfm";
import Background from "../components/Background";

export default function Home() {

  const { data } = useContext(DataContext);

  const [isTextBackground, setIsTextBackground] = useState(false);

  useEffect(() => {
    document.title = data?.invite.guild.name!;
  }, []);

  return (
    <div className="relative min-h-screen">

      {/* Background */}
      <Background backgroundValue={data?.pages.home.background!} onTypeDetected={(type) => setIsTextBackground(type !== "color")} />

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
            <div className={`prose prose-invert max-w-[110ch] bg-transparent border-transparent backdrop-blur-none p-12 rounded-lg border ${isTextBackground ? "hover:backdrop-blur-sm hover:bg-gray-700/70 hover:border-gray-800" : ""}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
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
