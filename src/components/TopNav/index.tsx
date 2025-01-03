"use client";

import { FC, useState } from "react";
import { AppBar, Toolbar, Box, Stack } from "@mui/material";
import Logo from "./components/Logo";
import Search from "./components/Search";
import SocialLinks from "./components/SocialLinks";

const TopNav: FC<{ title?: string }> = ({ title }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        height: 56,
      }}
    >
      <Toolbar sx={{ gap: 2, height: 56, minHeight: "56px !important" }}>
        <Logo title={title} />
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={1} alignItems="center">
          <Search
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <SocialLinks />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
