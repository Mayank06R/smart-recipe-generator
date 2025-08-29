import { supabase } from '../lib/supabase';

export interface GenerateRecipeRequest {
  ingredients: string[];
  preferences?: {
    cuisine?: string;
    dietaryRestrictions?: string[];
    cookingTime?: string;
    difficulty?: string;
  };
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine?: string;
  tips?: string[];
  isFavorite?: boolean;
  createdAt: Date;
}

export class RecipeService {
  static async generateRecipe(request: GenerateRecipeRequest): Promise<Recipe> {
    try {
      const { data, error } = await supabase.functions.invoke('generate-recipe', {
        body: request
      });

      if (error) {
        throw new Error(`Recipe generation failed: ${error.message}`);
      }

      if (!data?.recipe) {
        throw new Error('No recipe data received from AI service');
      }

      // Transform the response into our Recipe interface
      const recipe: Recipe = {
        id: Date.now().toString(),
        ...data.recipe,
        isFavorite: false,
        createdAt: new Date()
      };

      return recipe;
    } catch (error) {
      console.error('Recipe generation error:', error);
      throw new Error('Failed to generate recipe. Please try again.');
    }
  }

  static validateIngredients(ingredients: string[]): { isValid: boolean; error?: string } {
    if (!ingredients || ingredients.length === 0) {
      return { isValid: false, error: 'Please add at least one ingredient' };
    }

    if (ingredients.length > 20) {
      return { isValid: false, error: 'Please use 20 or fewer ingredients for best results' };
    }

    const invalidIngredients = ingredients.filter(ing => 
      ing.trim().length < 2 || ing.trim().length > 50
    );

    if (invalidIngredients.length > 0) {
      return { isValid: false, error: 'Each ingredient should be 2-50 characters long' };
    }

    return { isValid: true };
  }
}