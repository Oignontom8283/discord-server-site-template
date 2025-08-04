import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Background from "../components/Background";
import { isTextColorWhite, textBackground } from "../utils";

export default function Articles() {
  const { data } = useContext(DataContext);
  const isWhite = isTextColorWhite(data?.pages.articles.color!);

  const [search, setSearch] = useState("");

  const [isTextBackgrounded, setIsTextBackgrounded] = useState(false);

  useEffect(() => {
    document.title = "Articles - " + data?.invite.guild.name;
  }, []);

  if (!data?.config.article) {
    return (
      <div className="flex-1 flex items-center justify-center bg-red-100">
        <Alert alertType="warning">Sorry, the articles have been disabled by the site administrator(s).</Alert>
      </div>
    )
  }
  
  return (
    <div className={`flex-1 flex flex-col items-center ${isWhite ? "text-white" : ''}`}>

      <Background backgroundValue={data.pages.articles.background} onTypeDetected={(type) => setIsTextBackgrounded(type !== "color")} />

      <h1 className="text-2xl font-bold m-5">Articles</h1>

      {/* Sub title */}
      <div className={`prose m-5 ${isWhite ? "prose-invert" : ""} ${isTextBackgrounded ? textBackground() : ""}`}>
        <Markdown remarkPlugins={[remarkGfm]}>
          {data.pages.articles.sub_title}
        </Markdown>
      </div>

      <div className="bg-base-100 rounded-box shadow-lg w-[600px] text-black">
        
        <div className="flex justify-between p-3"> 
          
          {/* Articles informations */}
          <span className="p-4 pb-2 text-xs opacity-60 tracking-wide">All Articles : {data.articles.length}</span>
          
          {/* Search input */}
          <label className="input ml-auto" title="Search articles by title">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" className="grow" placeholder="Search" onChange={(e) => setSearch(e.target.value)} value={search} />
          </label>
        </div>
        
        <ul className="list m-3 gap-2">

          {data.articles
          .filter(article => article.title.toLowerCase().includes(search.toLowerCase().trim()))
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .map(article => (
            <Link to={`/article/${article.id}`} key={article.id} className="">
              <li className="list-row hover:bg-base-200 p-2">

                {article.icon && <img src={"/" + article.icon} alt="Article Icon" className="w-20 max-h-20 rounded-box mr-1" /> || <div className="w-20 max-h-20 mr-1" />}

                <div>
                  <span className="text-sm" title={article.title}>{article.title}</span>

                  <div className="list-col-grow flex flex-col mt-2">
                    <div className="flex flex-row gap-3">
                      <div className="text-xs uppercase font-semibold opacity-60" title={"Author: " + article.author}>{article.author}</div>
                      <span className="text-xs opacity-60" title={"Published on " + article.date.toLocaleString()}>{article.date.toLocaleDateString()}</span>
                    </div>

                    <ul className=" flex flex-wrap gap-1 mt-2" title={'Tags: ' + article.tags.join(", ")}>
                      {article.tags.map(tag => <li key={tag} className="badge badge-soft badge-info">{tag}</li>)}
                    </ul>

                  </div>
                </div>
                
                {/* <p className="break-words overflow-hidden">{article.content.slice(0, 100)}</p> */}
              </li>
            </Link>
          ))}

        </ul>
      </div>
      
      {/* Content */}
      <div className={`prose max-w-2xl p-12 mt-5 ${isWhite ? "prose-invert" : ""} ${isTextBackgrounded ? textBackground() : ""}`}>
        <Markdown remarkPlugins={[remarkGfm]}>
          {data.pages.articles.content}
        </Markdown>
      </div>

    </div>
  )
}
