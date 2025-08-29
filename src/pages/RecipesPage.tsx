import React, { useState } from 'react';
import { Search, Filter, Clock, Heart, Trash2, BookOpen } from 'lucide-react';
import RecipeDisplay from '../components/RecipeDisplay';
import { useRecipes } from '../context/RecipeContext';
import { Recipe } from '../services/recipeService';

const RecipesPage: React.FC = () => {
  const { recipes, favorites, removeRecipe, toggleFavorite } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const displayedRecipes = showFavorites ? favorites : recipes;
  const filteredRecipes = displayedRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg">
            <BookOpen className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Your Recipe Collection
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse, search, and manage all your AI-generated recipes in one place.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search recipes or ingredients..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-400 focus:outline-none transition-colors"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                showFavorites
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart className={`h-5 w-5 ${showFavorites ? 'fill-current' : ''}`} />
              <span className="font-medium">
                {showFavorites ? 'Show All' : 'Favorites Only'}
              </span>
            </button>
            
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">
            {showFavorites ? 'No favorites yet' : 'No recipes found'}
          </h3>
          <p className="text-gray-500 mb-6">
            {showFavorites 
              ? 'Start favoriting recipes to see them here!'
              : searchTerm 
                ? 'Try adjusting your search terms.'
                : 'Generate your first recipe to get started!'
            }
          </p>
          {!showFavorites && !searchTerm && (
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Generate Your First Recipe
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="relative group">
              <RecipeDisplay
                recipe={recipe}
                onToggleFavorite={toggleFavorite}
              />
              
              {/* Recipe Actions */}
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => removeRecipe(recipe.id)}
                  className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors duration-200"
                  title="Delete recipe"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex items-center space-x-2 text-xs text-gray-500 bg-white/90 px-3 py-1 rounded-full">
                  <Clock className="h-3 w-3" />
                  <span>Created {recipe.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;