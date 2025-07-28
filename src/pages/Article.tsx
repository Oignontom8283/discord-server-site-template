import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../context";
import Error404 from "./Error404";
import Markdown from "react-markdown";

export default function Article() {
  const { data } = useContext(DataContext);
  const { id } = useParams<{ id: string }>();

  const article = data?.articles.find(article => article.id === id);

  if (!article) {
    return <Error404 />;
  }

  useEffect(() => {
    document.title = `${article.title} - ${data?.invite.guild.name}`;
  })

  return (
    <div className="flex-1 flex flex-col items-center">
      <div>
        <h1 className="text-3xl font-bold m-12">{article.title}</h1>
        <span className="text-sm opacity-60">Published on {article.date.toLocaleDateString()}</span>
        <div className="flex flex-row gap-3 mt-2">
          <span className="text-xs uppercase font-semibold opacity-60">{article.author}</span>
          <ul className="flex flex-wrap gap-1" title={'Tags: ' + article.tags.join(", ")}>
            {article.tags.map(tag => <li key={tag} className="badge badge-soft badge-info">{tag}</li>)}
          </ul>
        </div>
      </div>
      <div className="prose max-w-[700px] m-10">
        <Markdown>{article.content}</Markdown>
      </div>
    </div>
  )
    
}