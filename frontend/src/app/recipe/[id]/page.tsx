import * as React from "react";
import { useParams } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (id) {
      fetch(`/api/recipes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setRecipe(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching recipe:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!recipe) return <Typography>Recipe not found!</Typography>;

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2">{recipe.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {recipe.subtitle}
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Image
          src={`/assets/articles/${recipe.hero}`}
          alt={recipe.title}
          width={800}
          height={450}
          style={{ borderRadius: "8px" }}
        />
      </Box>
      <Typography variant="h4" gutterBottom>
        Ingredients
      </Typography>
      <ul>
        {recipe.recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Instructions
      </Typography>
      <ol>
        {recipe.recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </Container>
  );
}
