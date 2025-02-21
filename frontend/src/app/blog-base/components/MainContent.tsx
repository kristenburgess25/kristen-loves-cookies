// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Chip from '@mui/material/Chip';
// import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';
// import { styled } from '@mui/material/styles';
// import RecipeCard from './RecipeCard'
//
// const StyledCard = styled(Card)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   padding: 0,
//   height: '100%',
//   backgroundColor: (theme.vars || theme).palette.background.paper,
//   '&:hover': {
//     backgroundColor: 'transparent',
//     cursor: 'pointer',
//   },
// }));
//
// const StyledCardContent = styled(CardContent)({
//   display: 'flex',
//   flexDirection: 'column',
//   gap: 4,
//   padding: 16,
//   flexGrow: 1,
//   '&:last-child': {
//     paddingBottom: 16,
//   },
// });
//
// const StyledTypography = styled(Typography)({
//   display: '-webkit-box',
//   WebkitBoxOrient: 'vertical',
//   WebkitLineClamp: 2,
//   overflow: 'hidden',
//   textOverflow: 'ellipsis',
// });
//
// interface Recipe {
//   id: string;
//   title: string;
//   subtitle: string;
//   category: string;
//   tags: string[];
//   hero: string;
// }
//
// interface RecipeCardProps {
//   recipe: Recipe;
// }
//
// interface MainContentProps {
//   recipes: Recipe[];
// }
//
// const MainContent: React.FC<MainContentProps> = ({ recipes }) => {
//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//       <Typography variant="h2" color="secondary" fontFamily="'Cookie', serif" sx={{margin: 'auto', letterSpacing: "0.2rem" }}>
//         Featured Favorites
//       </Typography>
//       <Grid container spacing={2} columns={12}>
//         {recipes.map((recipe) => (
//           <Grid item xs={12} md={6} key={recipe.id}>
//             <RecipeCard recipe={recipe} />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };
//
// export default MainContent;

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import RecipeCardTile from './RecipeCardTile';
import Recipe from "@/types/Recipe";

const TileContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1rem',
});

interface MainContentProps {
  recipes: Recipe[];
}

const MainContent: React.FC<MainContentProps> = ({ recipes }) => {
  const tilePattern = [
    { md: 8 }, { md: 4 },
    { md: 4 }, { md: 4 }, { md: 4 },
    { md: 6 }, { md: 6 },
    { md: 3 }, { md: 3 }, { md: 3 }, { md: 3 },
    { md: 8 }, { md: 4 },
    { md: 4 }, { md: 4 }, { md: 4 }
  ];

  return (
    <TileContainer>
      <Grid container spacing={2}>
        {recipes.map((recipe, index) => {
          const gridProps = tilePattern[index % tilePattern.length]; // Cycles through the tile pattern
          return (
            <Grid item key={recipe.id} xs={12} sm={6} {...gridProps}>
              <RecipeCardTile recipe={recipe} />
            </Grid>
          );
        })}
      </Grid>
    </TileContainer>
  );
};

export default MainContent;
