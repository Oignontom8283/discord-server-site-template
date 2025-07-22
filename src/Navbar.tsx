import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? "tab-active" : "";
  return (
    <div className="flex justify-center p-1" data-theme="dark">
      <ul className="tabs tabs-border ">

        {/* <input type="radio" name="my_tabs_2" className="tab" aria-label="Tab 1" />
        <input type="radio" name="my_tabs_2" className="tab" aria-label="Tab 2" />
        <input type="radio" name="my_tabs_2" className="tab" aria-label="Tab 3" /> */}

        <Link to="/"><li className={`tab ${isActive("/")}`}>Home</li></Link>
        <Link to="/about"><li className={`tab ${isActive("/about")}`}>About</li></Link>
        <Link to="/articles"><li className={`tab ${isActive("/articles")}`}>Articles</li></Link>
        
        {/* Add more tabs as needed */}

      </ul>
    </div>
  );
}
