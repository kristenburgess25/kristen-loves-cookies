// "use client"
//
// import * as React from "react";
// import { useParams } from "next/navigation";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import Image from "next/image";
// import IngredientsCard from "./components/IngredientsCard";
// import RecipeDetails from "@/app/recipe/[id]/components/RecipeDetails";
//
// export default function RecipePage() {
//   const { id } = useParams();
//   const [recipe, setRecipe] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);
//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http:/127.0.0.1:8000"; // Default to local dev
//
// React.useEffect(() => {
//   console.log("Current API URL:", API_URL);
//   console.log("Current Recipe ID:", id);
//
//   if (id) {
//     const requestUrl = `${API_URL}/recipes/${id}`;
//     console.log("Fetching from:", requestUrl);
//
//     fetch(requestUrl)
//       .then((res) => {
//         console.log("Raw Response:", res);
//         return res.text(); // First, read response as text
//       })
//       .then((text) => {
//         console.log("Raw Response Body:", text); // Log raw response before parsing
//         try {
//           const data = JSON.parse(text);
//           console.log("Parsed JSON Response:", data);
//
//           if (!data.error) {
//             setRecipe(data);
//           } else {
//             console.error("API Error:", data.error);
//             setError("Recipe not found");
//           }
//         } catch (jsonError) {
//           console.error("JSON Parsing Error:", jsonError);
//           console.error("Response was not valid JSON:", text);
//           setError("Failed to load recipe (invalid response format)");
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching recipe:", error);
//         setLoading(false);
//       });
//   }
// }, [id]);
//
//
//   if (loading) return <Typography>Loading...</Typography>;
//   if (!recipe) return <Typography>Recipe not found!</Typography>;
//
//   return (
//     <Container maxWidth="md" sx={{padding: "5rem 1rem"}}>
//       <Box sx={{ textAlign: "center", my: 4 }}>
//         <Typography variant="h1" color="secondary">{recipe.title}</Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           {recipe.subtitle}
//         </Typography>
//       </Box>
//       <Box sx={{ textAlign: "center", my: 4 }}>
//         <Image
//           src={`/assets/articles/${recipe.hero_image}`}
//           alt={recipe.title}
//           width={800}
//           height={450}
//           style={{ borderRadius: "8px", margin: "auto", height: "20rem", width: "100%", objectFit: "cover" }}
//         />
//       </Box>
//       {/*TODO: Refactor this to only pass image and instructions - if you use it */}
//       {/*<IngredientsCard recipe={recipe}/>*/}
//       <Typography variant="inherit" sx={{ marginBottom: "1rem" }}>
//         {recipe.introduction}
//       </Typography>
//       <RecipeDetails recipe={recipe} />
//       {/*<Box sx={{ display: "flex", flexDirection: "row" }}>*/}
//       {/*  <Box sx={{ width: "40%" }}>*/}
//       {/*    <Typography variant="h4" gutterBottom>*/}
//       {/*      Ingredients*/}
//       {/*    </Typography>*/}
//       {/*    <ul className="ingredients-list">*/}
//       {/*      {recipe.ingredients.map((ingredient, index) => (*/}
//       {/*        <li key={index}>{ingredient}</li>*/}
//       {/*      ))}*/}
//       {/*    </ul>*/}
//       {/*  </Box>*/}
//       {/*  <Box sx={{ width: "60%" }}>*/}
//       {/*    <Typography variant="h4" gutterBottom>*/}
//       {/*      Instructions*/}
//       {/*    </Typography>*/}
//       {/*    <ol>*/}
//       {/*      {recipe.instructions.map((step, index) => (*/}
//       {/*        <li key={index} style={{ margin: '1rem 0'}}>*/}
//       {/*          {step}*/}
//       {/*        </li>*/}
//       {/*      ))}*/}
//       {/*    </ol>*/}
//       {/*  </Box>*/}
//       {/*</Box>*/}
//     </Container>
//   );
// }


// Implementation for using MockData on Prod:
"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import recipesMock from "@/data/recipes.json" assert { type: "json" };
import RecipeDetails from "@/app/recipe/[id]/components/RecipeDetails";

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  console.log("Recipe ID from URL:", id);
  console.log("Mock Recipes Available:", recipesMock);

  // Find the correct recipe in mock data
  React.useEffect(() => {
    if (id) {
      const foundRecipe = recipesMock.find((r) => r.id === id);

      if (foundRecipe) {
        console.log("Recipe Found:", foundRecipe);
        setRecipe(foundRecipe);
      } else {
        console.error("Recipe not found!");
        setError("Recipe not found");
      }

      setLoading(false);
    }
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!recipe) return <Typography>Recipe not found!</Typography>;

  return (
    <Container maxWidth="md" sx={{ padding: "5rem 1rem" }}>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h1" color="secondary">{recipe.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {recipe.subtitle}
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Image
          src={`/assets/articles/${recipe.hero_image}`}
          alt={recipe.title}
          width={800}
          height={450}
          style={{
            borderRadius: "8px",
            margin: "auto",
            height: "20rem",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Typography variant="inherit" sx={{ marginBottom: "1rem" }}>
        {recipe.introduction}
      </Typography>
      <RecipeDetails recipe={recipe} />
    </Container>
  );
}
