import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
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
    <Link href={`/recipe/${recipe.id}`}>
      <StyledCard variant="outlined">
        <CardMedia
          component="img"
          alt={recipe.title}
          image={`/assets/articles/${recipe.hero_image}` || '/placeholder-image.jpg'} // Placeholder for now
          sx={{ aspectRatio: '16 / 9', borderBottom: '1px solid', borderColor: 'divider' }}
        />
        <StyledCardContent>
          <Typography gutterBottom variant="caption" component="div">
            {recipe.category}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {recipe.title}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {recipe.subtitle}
          </StyledTypography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {recipe.tags?.map((tag, index) => (
              <Chip key={index} label={tag} size="small" />
  ))}
          </Box>
        </StyledCardContent>
      </StyledCard>
    </Link>
  );
};

interface MainContentProps {
  recipes: Recipe[];
}

const MainContent: React.FC<MainContentProps> = ({ recipes }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h3" sx={{margin: 'auto'}}>
        Featured Favorites
      </Typography>
      <Grid container spacing={2} columns={12}>
        {recipes.map((recipe) => (
          <Grid item xs={12} md={6} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainContent;
