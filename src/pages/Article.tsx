import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../context";
import Error404 from "./Error404";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * The width of the article content area. (in pixels)
 */
const width = 700;

export default function Article() {
  const { data } = useContext(DataContext);
  const { id } = useParams<{ id: string }>();

  if (!data?.articles || !id) {
    return <Error404 />;
  }

  const article = data?.articles.find(article => article.id === id);

  if (!article) {
    return <Error404 />;
  }

  useEffect(() => {
    document.title = `${article.title} - ${data?.invite.guild.name}`;
  })

  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="flex flex-col items-center">
        
        {/* Display the article icon if it exists */}
        {article && <img src={'/' + article.icon}  className="mt-8 rounded-box max-h-64"/>}
         
        <h1 className="text-3xl font-bold m-12">{article.title}</h1>

        <div className="flex flex-col items-start gap-3 m-5 bg-base-100 rounded-box shadow-lg p-5" style={{ width: `${width}px` }}>

          <div className="flex flex-row gap-3 mt-2 items-center">
            <span className="text-sm opacity-60" title={`Published on ${article.date.toLocaleString()}`}>Published on {article.date.toLocaleDateString()}</span>
            <span className="text-xs uppercase font-semibold opacity-60" title={`Author: ${article.author}`}>{article.author}</span>
          </div>
          <ul className="flex flex-wrap gap-1" title={'Tags: ' + article.tags.join(", ")}>
            {article.tags.map(tag => <li key={tag} className="badge badge-soft badge-info">{tag}</li>)}
          </ul>

        </div>

      </div>
      <div className="prose m-10" style={{ maxWidth: `${width}px` }}>
        <Markdown remarkPlugins={[remarkGfm]}>{article.content}</Markdown>
      </div>
    </div>
  )
    
}