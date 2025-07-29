import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="flex-1 flex items-center justify-center bg-red-100">
      <div className="bg-base-100 rounded-box shadow-lg p-5">
        <h1 className="text-2xl font-bold mb-3">404 - Page Not Found</h1>
        <p className="text-gray-700">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">Go back to Home</Link>
      </div>
    </div>
  );
}