import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const glowLight = "0px 0px 8px rgba(255, 165, 0, 0.5)"; // Warm glow for light mode
const glowDark = "0px 0px 12px rgba(255, 223, 186, 0.3)"; // Soft buttery glow for dark mode

const HeroContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: theme.palette.text.primary, // Automatically use theme text color
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  textShadow: theme.palette.mode === "dark" ? glowDark : glowLight
}));

const HeroImage = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url("/assets/recipes/cookie-stock-banner.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(0, 0, 0, 0.5)" // Dark overlay
        : "rgba(255, 255, 255, 0.3)", // Light overlay
  },
}));

const HeroContent = styled(Container)({
  position: "relative",
  zIndex: 2, // Ensure text is above overlay
});


export default function HeroSection() {
  return (
    <HeroContainer>
      <HeroImage/>
      <HeroContent>
        <Typography
          variant="h1"
          color="primary"
          fontWeight={700}
          fontSize="6rem"
          fontFamily="'Cookie', serif"
        >
          Kristen Loves Cookies
        </Typography>
        <Typography variant="h5" color="secondary">
          A Recipe Box for Buttery Baked Goodies
        </Typography>
      </HeroContent>
    </HeroContainer>
  );
}
