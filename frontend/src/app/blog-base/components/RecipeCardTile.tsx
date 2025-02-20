import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import { styled, useTheme } from "@mui/material/styles";
import Image from "next/image";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 350,
  backgroundColor: theme.palette.background.paper,
  "&:hover .overlay": {
    opacity: 1, // Show overlay on hover (desktop)
  },
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: "16px",
  opacity: 0, // Hidden by default (except on mobile)
  transition: "opacity 0.3s ease-in-out",
  [theme.breakpoints.down("md")]: {
    opacity: 1, // Always visible on mobile
  },
}));

interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  hero_image: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCardTile: React.FC<RecipeCardProps> = ({ recipe }) => {
  const theme = useTheme();

  // Overlay Gradient Adjusted for Light/Dark Mode
  const overlayGradient =
    theme.palette.mode === "dark"
      ? "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 90%)"
      : "linear-gradient(to bottom, rgba(255, 247, 230, 0) 0%, rgba(255, 247, 230, 0.8) 90%)";

  return (
    <Link href={`/recipe/${recipe.id}`} underline="none">
      <StyledCard>
        {/*below replaces CardMedia, uses next/image */}
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            src={`/assets/articles/${recipe.hero_image}`}
            alt={recipe.title}
            fill //Automatically scales the image to fit the container
            style={{ objectFit: "cover", borderRadius: "8px" }}
            priority //Ensures above-the-fold images load quickly
          />
        </Box>

        {/* Overlay (Appears on Hover / Always visible on mobile) */}
        <Overlay
          className="overlay"
          sx={{
            background: overlayGradient,
          }}
        >
          <Typography
            variant="h2"
            fontFamily="'Cookie', serif"
            color="secondary"
          >
            {recipe.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.mode === "dark" ? "#e3c5b5" : "#5a3c44",
            }}
          >
            {recipe.subtitle}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
            {recipe.tags?.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0, 0, 0, 0.1)",
                  color: theme.palette.mode === "dark" ? "#fdeacc" : "#1e1013",
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        </Overlay>
      </StyledCard>
    </Link>
  );
};

export default RecipeCardTile;
