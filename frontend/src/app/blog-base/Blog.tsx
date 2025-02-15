"use client";

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../shared-theme/AppTheme';
import MainContent from './components/MainContent';
import Latest from './components/Latest';

export default function Blog(props: BlogParams) {
  const { disableCustomTheme, recipes } = props;

  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      <CssBaseline enableColorScheme />

      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent recipes={recipes} />
        {/*<Latest />*/}
      </Container>
    </AppTheme>
  );
}