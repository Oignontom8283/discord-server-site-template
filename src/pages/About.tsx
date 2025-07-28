import { useContext, useEffect } from "react"
import { DataContext } from "../context";
import Markdown from "react-markdown";
import { templateRenderContent } from "../utils";

export default function About() {

  const { data } = useContext(DataContext);

  useEffect(() => {
    document.title = "About - " + data?.invite.guild.name;
  }, [])

  return <div className="flex-1 flex items-center justify-center">
    <div className="prose max-w-2xl p-12">
      <Markdown>
        {templateRenderContent(data?.pages.about.content || "", data!)}
      </Markdown>
    </div>
  </div>
}