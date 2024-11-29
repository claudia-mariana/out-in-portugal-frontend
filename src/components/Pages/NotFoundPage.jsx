import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray ">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-blue mb-4">404 - Page Not Found</h1>
          <p className="text-gray mb-4">The page you are looking for does not exist.</p>
          <Link to="/" className="text-blue-medium hover:text-yellow font-semibold">
            Home
          </Link>
        </div>
      </div>
    );
  }
  
  export default NotFoundPage;