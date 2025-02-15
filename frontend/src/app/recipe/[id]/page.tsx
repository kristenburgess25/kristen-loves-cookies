"use client"

import * as React from "react";
import { useParams } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http:/127.0.0.1:8000"; // Default to local dev

React.useEffect(() => {
  console.log("Current API URL:", API_URL);
  console.log("Current Recipe ID:", id);

  if (id) {
    const requestUrl = `${API_URL}/recipes/${id}`;
    console.log("Fetching from:", requestUrl);

    fetch(requestUrl)
      .then((res) => {
        console.log("Raw Response:", res);
        return res.text(); // First, read response as text
      })
      .then((text) => {
        console.log("Raw Response Body:", text); // Log raw response before parsing
        try {
          const data = JSON.parse(text);
          console.log("Parsed JSON Response:", data);

          if (!data.error) {
            setRecipe(data);
          } else {
            console.error("API Error:", data.error);
            setError("Recipe not found");
          }
        } catch (jsonError) {
          console.error("JSON Parsing Error:", jsonError);
          console.error("Response was not valid JSON:", text);
          setError("Failed to load recipe (invalid response format)");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      });
  }
}, [id]);


  if (loading) return <Typography>Loading...</Typography>;
  if (!recipe) return <Typography>Recipe not found!</Typography>;

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2">{recipe.title}</Typography>
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
          style={{ borderRadius: "8px" }}
        />
      </Box>
      <Typography variant="h4" gutterBottom>
        Ingredients
      </Typography>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Instructions
      </Typography>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </Container>
  );
}
