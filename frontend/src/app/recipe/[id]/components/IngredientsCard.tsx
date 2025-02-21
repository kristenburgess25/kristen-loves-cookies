import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import Recipe from "@/types/Recipe";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "40%",
  backgroundColor: theme.palette.background.paper, // Apply theme-based background
  color: theme.palette.text.primary, // Ensure text color adjusts to theme
  "&:hover": {
    backgroundColor: theme.palette.action.hover, // Adjust hover state to match theme
    cursor: "pointer",
  },
}));

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

interface RecipeCardProps {
  recipe: Recipe;
}

const IngredientsCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link href={`/recipe/${recipe.id}`} underline="none">
      <StyledCard variant="outlined">
        <CardMedia
          component="img"
          alt={recipe.title}
          image={`/assets/articles/${recipe.hero_image}` || "/placeholder-image.jpg"}
          sx={{
            width: "100%", // Make sure it doesn't exceed the card width
            height: "auto", // Maintain aspect ratio
            minHeight: 200,
            maxHeight: 200, // Prevents images from being too large
            borderBottom: "1px solid",
            borderColor: "divider",
            objectFit: "cover", // Ensures the image fits well
          }}
        />
        <StyledCardContent>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {recipe.tags?.map((tag, index) => (
              <Chip key={index} label={tag} size="small" />
            ))}
          </Box>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
        </StyledCardContent>
      </StyledCard>
    </Link>
  );
};

export default IngredientsCard;
