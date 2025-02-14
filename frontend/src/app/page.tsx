const API_URL = process.env.NEXT_PUBLIC_API_URL + "/recipes";
import Blog from "./blog-base/Blog";

async function getRecipes() {
  const res = await fetch(API_URL, { cache: "no-store" }); // Prevents caching in dev
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return res.json();
}

export default async function Home() {
  const recipes = await getRecipes();

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
