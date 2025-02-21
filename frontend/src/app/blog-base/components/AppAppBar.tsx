"use client";

import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import Link from "@mui/material/Link"
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../../shared-theme/ColorModeIconDropdown";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter, usePathname } from "next/navigation";
import Typography from "@mui/material/Typography";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

const handleSearchSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  if (!searchQuery.trim()) return;

  if (pathname === "/allrecipes") {
    // Update search query in URL (without refresh)
    const url = new URL(window.location.href);
    url.searchParams.set("search", searchQuery);
    window.history.pushState({}, "", url.toString());
    window.dispatchEvent(new Event("searchUpdated")); // 🔥 Fire event manually
  } else {
    // Redirect to `/allrecipes` with search query
    router.push(`/allrecipes?search=${encodeURIComponent(searchQuery)}`);
    window.dispatchEvent(new Event("searchUpdated")); // 🔥 Ensure it updates immediately
  }
};

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}>
            {/* <Sitemark /> */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Link href="/" underline="none">
                <Button variant="text" color="info" size="medium">
                  Home
                </Button>
              </Link>
              <Link href="/allrecipes" underline="none">
                <Button variant="text" color="info" size="medium">
                  All Recipes
                </Button>
              </Link>
              <Link href="/about" underline="none">
                <Button variant="text" color="info" size="medium" sx={{ minWidth: 0 }}>
                  About
                </Button>
              </Link>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex"}}>
            <Link href="/" underline="none">
            <Typography variant="h3" fontFamily="'Cookie', serif" color="secondary">
              Kristen Loves Cookies
            </Typography>
            </Link>
          </Box>

          {/* Desktop Search Bar */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
            <form onSubmit={handleSearchSubmit}>
              <OutlinedInput
                size="small"
                placeholder="Search recipes…"
                value={searchQuery}
                onChange={handleSearchChange}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small"/>
                  </InputAdornment>
                }
                sx={{
                  width: "200px",
                  backgroundColor: "background.paper",
                  borderRadius: "8px",
                }}
              />
            </form>
            <ColorModeIconDropdown/>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{display: {xs: "flex", md: "none"}, gap: 1}}>
            <ColorModeIconDropdown size="medium"/>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon/>
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
            <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  {/* Mobile Search Bar */}
                  <OutlinedInput
                    fullWidth
                    size="small"
                    placeholder="Search recipes…"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    }
                    sx={{
                      backgroundColor: "background.paper",
                      borderRadius: "8px",
                    }}
                  />
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Link href="/" underline="none">
                  <MenuItem>Home</MenuItem>
                </Link>
                <Link href="/allrecipes">
                  <MenuItem>All Recipes</MenuItem>
                </Link>
                <Link href="/about">
                 <MenuItem>About</MenuItem>
                </Link>
                <Divider sx={{ my: 3 }} />
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
