import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
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

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  hero: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
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
          <Typography gutterBottom variant="caption" component="div">
            {recipe.category}
          </Typography>
          <Typography gutterBottom variant="h3" color="secondary" component="div">
            {recipe.title}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {recipe.subtitle}
          </StyledTypography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {recipe.tags?.map((tag, index) => (
              <Chip key={index} label={tag} size="small" />
            ))}
          </Box>
        </StyledCardContent>
      </StyledCard>
    </Link>
  );
};

export default RecipeCard;
