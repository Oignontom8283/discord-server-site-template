import { useContext } from "react";
import { DataContext } from "../context";
import Alert from "../components/Alert";

export default function Articles() {
  const { data } = useContext(DataContext);

  if (!data?.config.article) {
    return (
      <div className="flex-1 flex items-center justify-center bg-red-100">
        <Alert alertType="warning">Sorry, the articles have been disabled by the site administrator(s).</Alert>
      </div>
    )
  }
  
  return (
    <div className="flex-1 flex flex-col items-center">

      <h1 className="text-2xl font-bold m-5">Articles</h1>
      
      <div className="bg-base-100 rounded-box shadow-lg w-[600px]">
        <span className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</span>
        <ul className="list">
          {data.articles.map(article => (
            <li key={article.id} className="list-row">
              {article.icon && <img src={article.icon} alt="Article Icon" className="w-12 h-12 rounded-box mr-4" />}
              <div>
                <div className="text-sm">{article.title}</div>
                <div className="text-xs uppercase font-semibold opacity-60">{article.author}</div>
              </div>
              <span className="text-xs opacity-60">{article.date}</span>
              <p>{article.content.slice(0, 16)}</p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}
