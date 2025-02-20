import Blog from "./blog-base/Blog";
import recipesMock from "@/data/recipes.json";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/recipes";

async function getRecipes() {
  if (process.env.NODE_ENV === "production") {
    // using mock return for production version for now, until google cloud issues resolved
    console.log("Using mock data for recipes");
    return recipesMock; // Return static JSON in production
  }

  try {
    const res = await fetch(API_URL, { cache: "no-store" }); // Prevents caching in dev
    if (!res.ok) throw new Error("Failed to fetch recipes");
    return await res.json();
  } catch (error) {
    console.error("Error fetching recipes, falling back to mock data:", error);
    return recipesMock; // Fallback to mock data on API failure
  }
}

export default async function Home() {
  const recipes = await getRecipes();
  // const recipes = recipesMock


  return (
    <div>
        <Blog recipes={recipes}/>
    </div>
  );
}


// "use client"
//
// import { useEffect, useState } from "react";
// import Blog from "./blog-base/Blog";
//
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/recipes";
//
// export default function Home() {
//   const [recipes, setRecipes] = useState([]);
//
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) throw new Error("Failed to fetch recipes");
//         const data = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         console.error("Error fetching recipes:", error);
//       }
//     };
//
//     fetchRecipes();
//   }, []);
//
//   return <Blog recipes={recipes} />;
// }
