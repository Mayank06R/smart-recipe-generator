import React, { useState } from 'react';
import { Sparkles, ChefHat, Utensils } from 'lucide-react';
import IngredientInput from '../components/IngredientInput';
import RecipeDisplay from '../components/RecipeDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import { useRecipes } from '../context/RecipeContext';
import { RecipeService, type Recipe } from '../services/recipeService';

const HomePage: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addRecipe, toggleFavorite } = useRecipes();

  const generateRecipe = async () => {
    // Validate ingredients
    const validation = RecipeService.validateIngredients(ingredients);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid ingredients');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setCurrentRecipe(null);

    try {
      // Generate recipe using AI service
      const recipe = await RecipeService.generateRecipe({
        ingredients,
        preferences: {
          // You can add user preferences here later
        }
      });

      setCurrentRecipe(recipe);
      addRecipe(recipe);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate recipe. Please try again.';
      setError(errorMessage);
      console.error('Recipe generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-8">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg">
            <ChefHat className="h-16 w-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
          Smart Recipe
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent block">
            Generator
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Transform your available ingredients into amazing recipes with the power of AI. 
          Simply add what you have, and we'll create something delicious!
        </p>
      </div>

      {/* Main Generator Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Utensils className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-800">What ingredients do you have?</h2>
          </div>
          
          <IngredientInput
            ingredients={ingredients}
            onIngredientsChange={setIngredients}
          />

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <button
              onClick={generateRecipe}
              disabled={isGenerating || ingredients.length === 0}
              className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-amber-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Sparkles className="h-6 w-6" />
              <span>{isGenerating ? 'Generating...' : 'Generate Recipe'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Recipe */}
      {isGenerating && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          <LoadingSpinner />
        </div>
      )}

      {currentRecipe && !isGenerating && (
        <RecipeDisplay
          recipe={currentRecipe}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {/* Features Section */}
      {!currentRecipe && !isGenerating && (
        <div className="grid md:grid-cols-3 gap-6 pt-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">AI-Powered</h3>
            <p className="text-gray-600">Advanced AI creates unique recipes tailored to your ingredients.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Chef Quality</h3>
            <p className="text-gray-600">Professional-grade recipes with detailed instructions.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Zero Waste</h3>
            <p className="text-gray-600">Make the most of what you have and reduce food waste.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;