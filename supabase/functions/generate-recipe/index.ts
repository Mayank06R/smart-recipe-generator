import { corsHeaders } from '../_shared/cors.ts';

interface GenerateRecipeRequest {
  ingredients: string[];
  preferences?: {
    cuisine?: string;
    dietaryRestrictions?: string[];
    cookingTime?: string;
    difficulty?: string;
  };
}

interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine?: string;
  tips?: string[];
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ingredients, preferences = {} }: GenerateRecipeRequest = await req.json();

    if (!ingredients || ingredients.length === 0) {
      return new Response(
        JSON.stringify({ error: 'At least one ingredient is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create a detailed prompt for recipe generation
    const prompt = createRecipePrompt(ingredients, preferences);

    // For demo purposes, we'll use a mock AI response
    // In production, you would integrate with OpenAI, Anthropic, or Google's Gemini API
    const recipe = await generateRecipeWithAI(prompt, ingredients);

    return new Response(
      JSON.stringify({ recipe }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Recipe generation error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate recipe' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function createRecipePrompt(ingredients: string[], preferences: any): string {
  const basePrompt = `Create a detailed, creative recipe using these ingredients: ${ingredients.join(', ')}.

Requirements:
- Generate a creative, appetizing recipe title
- Write a compelling 2-3 sentence description
- Provide a complete ingredient list with measurements
- Give detailed step-by-step cooking instructions (6-10 steps)
- Include cooking time and serving size
- Assign appropriate difficulty level (Easy/Medium/Hard)
- Add 2-3 helpful cooking tips

${preferences.cuisine ? `Cuisine style: ${preferences.cuisine}` : ''}
${preferences.dietaryRestrictions?.length ? `Dietary restrictions: ${preferences.dietaryRestrictions.join(', ')}` : ''}
${preferences.cookingTime ? `Preferred cooking time: ${preferences.cookingTime}` : ''}

Make the recipe practical, delicious, and achievable for home cooks.`;

  return basePrompt;
}

async function generateRecipeWithAI(prompt: string, ingredients: string[]): Promise<Recipe> {
  // This is a sophisticated mock that creates realistic recipes
  // In production, replace this with actual AI API calls
  
  const recipeTemplates = [
    {
      titlePattern: "Savory {main} with {secondary}",
      cuisines: ["Mediterranean", "Italian", "Asian-Inspired", "American"],
      descriptions: [
        "A delightful fusion of flavors that brings together fresh ingredients in perfect harmony.",
        "This comforting dish combines simple ingredients to create something truly special.",
        "A restaurant-quality meal that's surprisingly easy to make at home."
      ]
    },
    {
      titlePattern: "{main} and {secondary} Delight",
      cuisines: ["Rustic", "Home-style", "Comfort Food"],
      descriptions: [
        "A hearty, satisfying dish that celebrates the natural flavors of fresh ingredients.",
        "This wholesome recipe transforms everyday ingredients into something extraordinary.",
        "A perfect balance of flavors and textures that will become a family favorite."
      ]
    }
  ];

  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const mainIngredient = ingredients[0];
  const secondaryIngredient = ingredients[1] || ingredients[0];
  const template = recipeTemplates[Math.floor(Math.random() * recipeTemplates.length)];
  
  const title = template.titlePattern
    .replace('{main}', capitalizeFirst(mainIngredient))
    .replace('{secondary}', capitalizeFirst(secondaryIngredient));

  const cuisine = template.cuisines[Math.floor(Math.random() * template.cuisines.length)];
  const description = template.descriptions[Math.floor(Math.random() * template.descriptions.length)];

  // Generate detailed ingredients with measurements
  const detailedIngredients = ingredients.map(ingredient => {
    const measurements = {
      'chicken': '1 lb boneless chicken breast, diced',
      'beef': '1 lb ground beef',
      'rice': '2 cups jasmine rice',
      'pasta': '12 oz pasta',
      'tomatoes': '4 large ripe tomatoes, diced',
      'onion': '1 large yellow onion, chopped',
      'garlic': '4 cloves garlic, minced',
      'carrots': '3 medium carrots, sliced',
      'potatoes': '4 medium potatoes, cubed',
      'bell pepper': '2 bell peppers, sliced',
      'mushrooms': '8 oz mushrooms, sliced',
      'cheese': '1 cup shredded cheese',
      'olive oil': '3 tablespoons olive oil',
      'salt': 'Salt to taste',
      'pepper': 'Black pepper to taste'
    };
    
    return measurements[ingredient.toLowerCase()] || `1 cup ${ingredient.toLowerCase()}`;
  });

  // Add common cooking ingredients
  detailedIngredients.push('2 tablespoons olive oil', 'Salt and pepper to taste');

  // Generate cooking instructions
  const instructions = [
    `Prepare all ingredients by washing and chopping the ${ingredients.slice(0, 3).join(', ')}.`,
    `Heat olive oil in a large skillet or pot over medium-high heat.`,
    `Add ${ingredients[0].toLowerCase()} and cook for 3-4 minutes until lightly browned.`,
    ingredients.length > 1 ? `Add ${ingredients.slice(1).join(', ').toLowerCase()} and sauté for another 5 minutes.` : 'Continue cooking for 5 more minutes.',
    `Season generously with salt, pepper, and any additional spices you prefer.`,
    `Reduce heat to medium-low and let simmer for 15-20 minutes, stirring occasionally.`,
    `Taste and adjust seasoning as needed. The flavors should be well-balanced and aromatic.`,
    `Remove from heat and let rest for 2-3 minutes before serving.`,
    `Serve hot and garnish with fresh herbs if available. Enjoy your delicious creation!`
  ];

  const tips = [
    `For best results, let your ${mainIngredient.toLowerCase()} come to room temperature before cooking.`,
    `Don't overcrowd the pan - cook in batches if necessary for better browning.`,
    `This dish pairs wonderfully with a simple green salad or crusty bread.`
  ];

  const cookingTimes = ['25 minutes', '30 minutes', '35 minutes', '40 minutes'];
  const servings = ['3-4 people', '4-5 people', '4-6 people'];
  const difficulties: ('Easy' | 'Medium' | 'Hard')[] = ['Easy', 'Medium'];

  return {
    title,
    description,
    ingredients: detailedIngredients,
    instructions,
    cookingTime: cookingTimes[Math.floor(Math.random() * cookingTimes.length)],
    servings: servings[Math.floor(Math.random() * servings.length)],
    difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
    cuisine,
    tips
  };
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}