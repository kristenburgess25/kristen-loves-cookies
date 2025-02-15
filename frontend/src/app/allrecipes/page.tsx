"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import RecipeCard from "../blog-base/components/RecipeCard";
import {FormControl} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";

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

const FilterContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 2,
  marginBottom: 16,
});

export default function AllRecipesPage() {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = React.useState<Recipe[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("")

  React.useEffect(() => {
    fetch(`${API_URL}/recipes`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setRecipes(data);
          setFilteredRecipes(data)

          // get categories
          const uniqueCategories = [
            ...new Set(data.map((recipe: Recipe) => recipe.category)),
          ];
          setCategories(uniqueCategories)
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

    // Handle category selection
  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const category = event.target.value as string;
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(recipes.filter((recipe) => recipe.category === category));
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, px: 2, padding: "3rem 1rem" }}>
      {loading && <Typography>Loading recipes...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <br />
      {!loading && !error && (
        <div>
                {/* Filter Dropdown */}
      <FilterContainer>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select value={selectedCategory} onChange={handleCategoryChange}>
            <MenuItem value="All">All Recipes</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FilterContainer>
          <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center" }}>
            {filteredRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Box>
  );
}
