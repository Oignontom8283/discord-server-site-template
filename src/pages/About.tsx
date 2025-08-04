import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context";
import Markdown from "react-markdown";
import { isTextColorWhite, templateRenderContent, textBackground } from "../utils";
import remarkGfm from "remark-gfm";
import Background from "../components/Background";

export default function About() {

  const { data } = useContext(DataContext);

  const isWhite = isTextColorWhite(data?.pages.about.color!);

  const [isTextBackgrounded, setIsTextBackgrounded] = useState(false);

  useEffect(() => {
    document.title = "About - " + data?.invite.guild.name;
  }, [])

  return <div className="flex-1 flex items-center justify-center">

    <Background backgroundValue={data?.pages.about.background!} onTypeDetected={(type) => setIsTextBackgrounded(type !== "color")} />

    <div className={`prose max-w-2xl p-12 ${isWhite ? "prose-invert" : ""} ${isTextBackgrounded ? textBackground() : ""}`}>
      <Markdown remarkPlugins={[remarkGfm]}>
        {templateRenderContent(data?.pages.about.content || "", data!)}
      </Markdown>
    </div>
  </div>
}