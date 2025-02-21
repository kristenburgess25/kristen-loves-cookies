import * as React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const QuoteContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "2rem auto",
  textAlign: "center",
  padding: "2rem",
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 247, 230, 0.1)" : "rgba(0, 0, 0, 0.05)",
  // borderLeft: `5px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0px 4px 12px rgba(255, 247, 230, 0.2)"
      : "0px 4px 12px rgba(0, 0, 0, 0.1)",
}));

const QuoteText = styled(Typography)(({ theme }) => ({
  // fontFamily: "'Cookie', serif",
  fontSize: "1.5rem", // Default size for desktop
  fontWeight: 600,
  lineHeight: 1.3,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem", // 🔥 Smaller font for mobile
  },
}));

const QuoteAuthor = styled(Typography)(({ theme }) => ({
  fontFamily: "'Cookie', serif",
  fontSize: "2rem", // Default
  fontWeight: 500,
  marginTop: "1rem",
  // color: theme.palette.text.secondary,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem", // 🔥 Slightly smaller on mobile
  },
}));

interface QuoteProps {
  quote: string;
  author: string;
}

const Quote: React.FC<QuoteProps> = ({ quote, author }) => {
  return (
    <QuoteContainer>
      <QuoteText color="primary">&ldquo;{quote}&rdquo;</QuoteText>
      <QuoteAuthor color="secondary">&mdash; {author}</QuoteAuthor>
    </QuoteContainer>
  );
};

export default Quote;
