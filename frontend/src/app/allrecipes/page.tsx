"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import RecipeCard from "../blog-base/components/RecipeCard";

// ✅ Load API URL from .env properly
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  hero: string;
}

export default function AllRecipesPage() {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch(`${API_URL}/recipes`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setRecipes(data);
        } else {
          setError("Failed to fetch recipes.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        setError("An error occurred.");
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, px: 2, padding: "3rem 0" }}>
      {loading && <Typography>Loading recipes...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <br />
      {!loading && !error && (
        <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center" }}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
