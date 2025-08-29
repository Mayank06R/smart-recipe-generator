import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Recipe } from '../services/recipeService';

interface RecipeContextType {
  recipes: Recipe[];
  favorites: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt'>) => void;
  removeRecipe: (id: string) => void;
  toggleFavorite: (id: string) => void;
  clearRecipes: () => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const addRecipe = (recipeData: Omit<Recipe, 'id' | 'createdAt'>) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: Date.now().toString(),
      createdAt: new Date(),
      isFavorite: false,
    };
    setRecipes(prev => [newRecipe, ...prev]);
  };

  const removeRecipe = (id: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setRecipes(prev =>
      prev.map(recipe =>
        recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      )
    );
  };

  const clearRecipes = () => {
    setRecipes([]);
  };

  const favorites = recipes.filter(recipe => recipe.isFavorite);

  const contextValue: RecipeContextType = {
    recipes,
    favorites,
    addRecipe,
    removeRecipe,
    toggleFavorite,
    clearRecipes,
  };

  return (
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  );
};