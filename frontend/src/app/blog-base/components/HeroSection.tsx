import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeroContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "400px", // Adjust height as needed
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "#fff", // Ensure text is readable on dark overlay
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
}));

const HeroImage = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url("/assets/recipes/cookie-stock-banner.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "brightness(0.5)", // Dark overlay effect
});

const HeroContent = styled(Container)({
  position: "relative",
  zIndex: 2, // Ensure text is above the overlay
});

export default function HeroSection() {
  return (
    <HeroContainer>
      <HeroImage />
      <HeroContent>
        <Typography variant="h1" fontWeight={700} gutterBottom>
          Kristen Loves Cookies
        </Typography>
        <Typography variant="h5">
          A Recipe Box for Buttery Baked Goodies
        </Typography>
      </HeroContent>
    </HeroContainer>
  );
}
