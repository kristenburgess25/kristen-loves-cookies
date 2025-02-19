"use client";

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../shared-theme/AppTheme';
import MainContent from './components/MainContent';
import HeroSection from "./components/HeroSection";
import Quote from "./components/Quote"

export default function Blog(props: BlogParams) {
  const { disableCustomTheme, recipes } = props;

  const Quote1= {
    quote: "I think baking cookies is equal to Queen Victoria running an empire. There's no difference in how seriously you take the job, how seriously you approach your whole life.",
    author: "Martha Stewart"
  }

  const Quote2 = {
    quote: "Home is where the heart is. Heart where the cookie is.",
    author: "Cookie Monster"
  }

  const Quote3 = {
    quote: "You can be miserable before you have a cookie and you can be miserable after you have a cookie, but you can never be miserable while you are eating a cookie.",
   author: "Ina Garten"
  }

  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      {/*<CssBaseline enableColorScheme />*/}
      <Container
        maxWidth="lg"
        component="main"
        sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
      >
        <HeroSection />
        <Quote quote={Quote1.quote} author={Quote1.author} />
        <MainContent recipes={recipes}/>
        <Quote quote={Quote2.quote} author={Quote2.author} />
        <MainContent recipes={recipes}/>
        <Quote quote={Quote3.quote} author={Quote3.author} />
        {/*<Latest />*/}
      </Container>
    </AppTheme>
  );
}