import { useContext, useEffect } from "react"
import { DataContext } from "../context";

export default function About() {

  const { data } = useContext(DataContext);

  useEffect(() => {
    document.title = "About - " + data?.invite.guild.name;
  }, [])

  return <div>

  </div>
}