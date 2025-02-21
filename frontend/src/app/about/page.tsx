"use client";

import React from "react";
import { Box, Container, Link, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8, mt: 8 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h2" color="secondary" gutterBottom>
          About Kristen &mdash; Who Loves Cookies
        </Typography>
      </Box>

      <Typography variant="body2">
        Welcome to <strong>Kristen Loves Cookies</strong>! My name is Kristen Burgess, and I&apos;m an amateur yet avid baker, here to share my favorite recipes and lessons learned 👩‍🍳 🍪
      </Typography>
      <br />
      <Typography variant="body1">
        I grew up on a cattle ranch in Nebraska, and helping my mom prepare meals for my family and workers on the ranch was a part of life from a very early age. (Ranch cooking = I&apos;ve been a wizard at frying pretty much any kind of meat or vegetable since the age of 9.)
        </Typography>
        <Typography variant="body1">
        I developed some basic baking skills early, too, but I never really challenged myself or experimented with baking until a few years ago.
        </Typography>
        <Typography variant="body1">
          It started with a Nutella shortbread recipe that a friend posted, and the next thing I knew, I was researching the intricacies of laminating dough to make croissants. I&apos;ve been hooked ever since 🥐
      </Typography>
      <br />
      <Typography variant="body1">
        I don&apos;t know if you&apos;ve been on many baking blogs lately, but they tend to be exhausting/overwhelming messes; you have to scroll through miles of excessive explanations laden with ads and pop-ups. Even worse yet - many of these blogs plant cookies on your browser! (And not the tasty kind that we love here... the pesky kind that slow down your internet and spy on you and tell Mark Zuckerberg what kind of cookies to advertise to you.) I promise that <strong>Kristen Loves Cookies</strong> will
        always be ad-free and will only have the tastiest of cookies! 🍪✨
      </Typography>
      <br/>
      <Typography variant="body1">
        I am also a professional software engineer/web developer, and this site/app was baked from scratch with my own
        bare hands! (Okay, okay, I let ChatGPT get their hands in the dough a little, too.) If you&apos;re a nerd, you
        can check out the code base <Link href="https://github.com/kristenburgess25/kristen-loves-cookies" target="_blank">here</Link>. Submitting issues/features is very welcome! 🤓
        <br/>
        <br/>
        You can also send questions or suggestions to <Link href="mailto:kristenlovescookies@gmail.com">kristenlovescookies@gmail.com</Link>.
        <br/>
        Thanks for stopping by and happy baking! 🧑‍🍳✨
      </Typography>
      <br />
      <Typography variant="h3" fontStyle="italic" color="primary" gutterBottom>
        &mdash; Kristen
      </Typography>
    </Container>
  );
}
