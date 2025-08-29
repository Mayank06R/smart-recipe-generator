import React from 'react';
import { Clock, Users, Star, Heart, Share2 } from 'lucide-react';

import { Recipe } from '../services/recipeService';

interface RecipeDisplayProps {
  recipe: Recipe;
  onToggleFavorite?: (recipeId: string) => void;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onToggleFavorite }) => {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Hard: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Recipe Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
              {recipe.title}
            </h2>
            <p className="text-orange-100 text-lg leading-relaxed">
              {recipe.description}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => onToggleFavorite?.(recipe.id)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
            >
              <Heart 
                className={`h-6 w-6 ${recipe.isFavorite ? 'fill-current text-red-200' : 'text-white'}`} 
              />
            </button>
            <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200">
              <Share2 className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Cuisine and Tips */}
        {recipe.cuisine && (
          <div className="mt-4 pt-4 border-t border-orange-400/30">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              {recipe.cuisine} Cuisine
            </span>
          </div>
        )}
        {/* Recipe meta info */}
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-orange-400/30">
          {recipe.cookingTime && (
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-100" />
              <span className="text-orange-100">{recipe.cookingTime}</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-100" />
              <span className="text-orange-100">{recipe.servings}</span>
            </div>
          )}
          {recipe.difficulty && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${difficultyColors[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Recipe Content */}
      <div className="p-6">
        <div className="space-y-8">
          {/* Ingredients */}
          <div className="space-y-4 bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
              Ingredients
            </h3>
            <div className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-white rounded-lg border-l-4 border-orange-400 shadow-sm"
                >
                  <span className="text-gray-800 font-medium">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-4 bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-3 h-3 bg-teal-500 rounded-full mr-3"></span>
              Instructions
            </h3>
            <div className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <div
                  key={index}
                  className="flex space-x-4 p-4 bg-white rounded-lg border-l-4 border-teal-400 shadow-sm"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <p className="text-gray-800 leading-relaxed font-medium">{instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cooking Tips */}
          {recipe.tips && recipe.tips.length > 0 && (
            <div className="space-y-4 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                Chef's Tips
              </h3>
              <div className="space-y-2">
                {recipe.tips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-white rounded-lg border-l-4 border-purple-400 shadow-sm"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      💡
                    </span>
                    <p className="text-gray-800 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recipe Rating */}
      <div className="bg-gray-50 p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="h-5 w-5 text-yellow-400 cursor-pointer hover:text-yellow-500 transition-colors"
                fill="currentColor"
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">Rate this recipe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;