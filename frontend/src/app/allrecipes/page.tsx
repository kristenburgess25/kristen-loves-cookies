"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RecipeCard from "../blog-base/components/RecipeCard";
import { FormControl, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import recipesMock from "@/data/recipes.json";
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface Recipe {
   id: string;
  title: string;
  subtitle: string;
  category: string;
  tags?: string[]; // Optional if it's missing in JSON
  hero_image: string; // ✅ Matches the actual JSON field
}

const FilterContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 2,
  marginBottom: 16,
  marginRight: "1rem",
});

export default function AllRecipesPage() {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = React.useState<Recipe[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  console.log("Mock Data Type:", typeof recipesMock);
console.log("First Recipe:", recipesMock[0]);

  console.log("Mock Data:", recipesMock);
  console.log("Mock Data:", Array.isArray(recipesMock) ? "Array Loaded" : "Not an Array", recipesMock);


  // Fetch recipes on mount
  // below is for use with mockData on prod until gcloud issues resolved
useEffect(() => {
  setRecipes(recipesMock);
  setFilteredRecipes(recipesMock);
  // Extract unique categories
  const uniqueCategories = [
    ...new Set(recipesMock.map((recipe) => recipe.category)),
  ];
  setCategories(uniqueCategories);

  setLoading(false);
  setLoading(false); // Ensure loading state is turned off
}, []);

 // when using external DB
  // React.useEffect(() => {
  //  if (recipesMock?.length) {
  //    console.log('recipes mock in use effect IF', recipesMock)
  //   setRecipes([...recipesMock]); // Force React to detect changes
  //   setFilteredRecipes([...recipesMock]);
  // }
  //   // if (process.env.NODE_ENV === "production") {
  //   //   setRecipes(recipesMock);
  //   //   setFilteredRecipes(recipesMock);
  //   // }
  //   // else
  //   //   fetch(`${API_URL}/recipes`)
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     if (!data.error) {
  //   //       setRecipes(data);
  //   //       setFilteredRecipes(data);
  //   //
  //   //       // Get unique categories
  //   //       const uniqueCategories = [
  //   //         ...new Set(data.map((recipe: Recipe) => recipe.category)),
  //   //       ];
  //   //       setCategories(uniqueCategories);
  //   //     } else {
  //   //       setError("Failed to fetch recipes.");
  //   //     }
  //   //     setLoading(false);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.error("Error fetching recipes:", err);
  //   //     setError("An error occurred.");
  //   //     setLoading(false);
  //   //   });
  // }, []);

  // Update search term when URL query changes
  useEffect(() => {
    const updatedSearchQuery = searchParams.get("search") || "";
    setSearchTerm(updatedSearchQuery);
  }, [searchParams]);

  // Filter recipes when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredRecipes(recipes);
      return;
    }

    // Filter recipes dynamically
    const filtered = recipes.filter((recipe) =>
      [recipe.title, recipe.subtitle, recipe.category, ...(recipe.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);

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

  // Clear Search Function
  const handleClearSearch = () => {
    setSearchTerm("");
    router.push("/allrecipes"); // Reset URL
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

          {/* Search Heading with Clear Button */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h4">
              {searchTerm ? `Showing results for "${searchTerm}"` : "Browse all recipes"}
            </Typography>
            {searchTerm && (
              <Button variant="outlined" color="primary" sx={{ mr: '1rem' }} onClick={handleClearSearch}>
                Clear Search
              </Button>
            )}
          </Box>

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
