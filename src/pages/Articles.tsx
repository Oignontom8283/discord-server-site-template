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
    <div className="bg-red-500">
      <h1>Articles</h1>
    </div>
  )
}
