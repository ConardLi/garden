import { FC, ReactNode, useState } from "react";
import { Box } from "@mui/material";
import ToolsNav from "../ToolsNav";
import TopNav from "../TopNav";

interface ToolLayoutProps {
  children: ReactNode;
  title?: string;
}

const ToolLayout: FC<ToolLayoutProps> = ({ children, title }) => {
  const [isNavOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <TopNav title={title} />
      <ToolsNav open={isNavOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: "56px",
          transition: (theme) =>
            theme.transitions.create(["margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ToolLayout;
