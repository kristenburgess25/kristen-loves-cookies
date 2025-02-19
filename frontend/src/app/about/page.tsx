"use client";

import React from "react";
import { Box, Container, Link, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8, mt: 8 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h2" color="secondary" gutterBottom>
          About Kristen - Who Loves Cookies
        </Typography>
      </Box>

      <Typography variant="body2">
        Welcome to <strong>Kristen Loves Cookies</strong>! My name is Kristen Burgess, and I'm an amateur yet avid baker, here to share my favorite recipes and lessons learned 👩‍🍳 🍪
      </Typography>
      <br />
      <Typography variant="body1">
        I grew up on a cattle ranch in Nebraska, and helping my mom prepare meals for my family and workers on the ranch was a part of life from a very early age. (Ranch cooking = I've been a wizard at frying pretty much any kind of meat or vegetable since the age of 9.) I developed some basic baking skills early, too, but I never really challenged myself or experimented with baking until a few years ago. It started with a Nutella shortbread recipe that a friend posted, and the next thing I knew was I researching the intricacies of laminating dough to make croissants. I've been hooked ever since 🥐
      </Typography>
      <br />
      <Typography variant="body1">
        I am also a professional software engineer/web developer, and this site/app was baked from scratch with my own
        bare hands! (Okay, okay, I let Chat GPT get their hands in the dough a little, too.) If you're a nerd, you can
        check out the code base <Link href="https://github.com/kristenburgess25/kristen-loves-cookies" target="_blank">here</Link>. Submitting issues/features is very welcome! 🤓
        <br/>
        <br/>
        You can also send questions or suggestions to <Link href="mailto:kristenlovescookies@gmail.com">kristenlovescookies@gmail.com</Link>.
        <br/>
        Thanks for stopping by and happy baking! 🧑‍🍳✨
      </Typography>
      <br />
      <Typography variant="h3" fontStyle="italic" color="primary" gutterBottom>
          -Kristen
        </Typography>
    </Container>
  );
}
