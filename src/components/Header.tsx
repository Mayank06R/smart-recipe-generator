import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Home, BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg border-b-2 border-orange-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-orange-500 rounded-xl group-hover:bg-orange-600 transition-colors duration-200">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                Smart Recipe Generator
              </h1>
              <p className="text-sm text-gray-600">AI-Powered Cooking Assistant</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-orange-100 text-orange-700 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Generate</span>
            </Link>
            <Link
              to="/recipes"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/recipes') 
                  ? 'bg-orange-100 text-orange-700 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">My Recipes</span>
            </Link>
          </nav>

          {/* Mobile navigation */}
          <nav className="md:hidden flex items-center space-x-1">
            <Link
              to="/"
              className={`p-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-orange-100 text-orange-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home className="h-6 w-6" />
            </Link>
            <Link
              to="/recipes"
              className={`p-2 rounded-lg transition-all duration-200 ${
                isActive('/recipes') 
                  ? 'bg-orange-100 text-orange-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="h-6 w-6" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;