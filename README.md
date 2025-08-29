# Smart Recipe Generator 🍳

A modern web application that generates delicious recipes based on the ingredients you have. Powered by AI, it offers personalized recipes with a clean, responsive, and interactive UI.

## Features

- Generate recipes using AI based on your ingredients.
- Favorite and manage recipes in a centralized state.
- Responsive, mobile-first design.
- Interactive UI with gradients, animations, and loading states.
- Robust error handling and input validation.

## Technologies Used

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React (Icons)

### Backend & API

- Supabase Edge Functions
- Deno runtime
- CORS handling
- AI prompt engineering for recipe generation

### State Management

- React Context API
- React Hooks (`useState`, `useContext`)

### Development Tools

- ESLint + TypeScript ESLint
- PostCSS + Autoprefixer
- Vite React Plugin

## Architecture

- **Component-based:** Modular, reusable UI components.
- **Service layer:** Business logic separated from UI.
- **Context providers:** Centralized state for recipes and favorites.
- **Type definitions:** Strong typing throughout the app for reliability.

## AI Integration

- Carefully crafted prompts for recipe generation.
- JSON API responses for structured recipe data.
- Input validation and sanitization for accurate results.
- Robust error handling for API failures.

## Installation & Setup

1. **Clone the repository:**
    ```sh
    git clone <repo-url>
    cd smart-recipe-generator
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Add environment variables:**
    ```
    VITE_SUPABASE_URL=your-supabase-url
    VITE_SUPABASE_KEY=your-supabase-key
    ```

4. **Run the development server:**
    ```sh
    npm run dev
    ```

## Usage

- Enter ingredients in the input field.
- Click **Generate Recipe** to get AI-generated recipes.
- Add recipes to favorites for easy access.

## Future Enhancements

- User authentication and personalized profiles.
- Recipe categorization and filtering.
- AI-generated meal plans and nutritional information.

## Screenshots
![Screenshot 1](Screenshot%202025-08-29%20183345.png)
![Screenshot 2](Screenshot%202025-08-29%20183405.png)

