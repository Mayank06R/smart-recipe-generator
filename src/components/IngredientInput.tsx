import React, { useState, KeyboardEvent } from 'react';
import { Plus, X } from 'lucide-react';

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredients,
  onIngredientsChange,
}) => {
  const [inputValue, setInputValue] = useState('');

  const addIngredient = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      onIngredientsChange([...ingredients, trimmed]);
      setInputValue('');
    }
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    onIngredientsChange(newIngredients);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const commonIngredients = [
    'Chicken', 'Rice', 'Pasta', 'Tomatoes', 'Onion', 'Garlic', 'Carrots', 
    'Potatoes', 'Bell Pepper', 'Mushrooms', 'Cheese', 'Olive Oil', 'Salt', 'Pepper'
  ];

  const filteredSuggestions = commonIngredients.filter(
    ingredient => 
      ingredient.toLowerCase().includes(inputValue.toLowerCase()) &&
      !ingredients.includes(ingredient) &&
      inputValue.length > 0
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type an ingredient (e.g., chicken, tomatoes, garlic)"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors duration-200 text-lg"
            />
            
            {/* Suggestions dropdown */}
            {filteredSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                {filteredSuggestions.slice(0, 5).map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInputValue(suggestion);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-orange-50 hover:text-orange-700 transition-colors duration-150"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={addIngredient}
            disabled={!inputValue.trim()}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 font-medium"
          >
            <Plus className="h-5 w-5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Ingredient tags */}
      {ingredients.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700">Your Ingredients:</h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium border border-orange-200 shadow-sm"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(index)}
                  className="ml-2 p-1 hover:bg-orange-200 rounded-full transition-colors duration-150"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick add suggestions */}
      {ingredients.length === 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600">Popular ingredients:</h3>
          <div className="flex flex-wrap gap-2">
            {commonIngredients.slice(0, 8).map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => {
                  onIngredientsChange([...ingredients, ingredient]);
                }}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 transition-colors duration-200"
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;