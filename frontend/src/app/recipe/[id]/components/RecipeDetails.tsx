import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const RecipeDetails = ({ recipe }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      <Grid container spacing={4}>
        {/* Ingredients Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Ingredients
          </Typography>
          <ul className="ingredients-list" style={{ paddingLeft: "1rem" }}>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </Grid>

        {/* Instructions Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Instructions
          </Typography>
          <ol style={{ paddingLeft: "1rem" }}>
            {recipe.instructions.map((step, index) => (
              <li key={index} style={{ margin: "1rem 0" }}>
                {step}
              </li>
            ))}
          </ol>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecipeDetails;
