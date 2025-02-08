"use client";

import { FC, ReactNode } from "react";
import { Container, Typography, Paper, Box, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import ToolLayout from "../ToolLayout";
import Footer from "../Footer";
import { TOOLS } from "@/constants/tools";

interface Props {
  children: ReactNode;
  title?: string;
}

const ToolPageLayout: FC<Props> = ({ children, title }) => {
  const pathname = usePathname();
  const toolId = pathname.split("/tools/")[1];
  const tool = TOOLS.find((t) => t.id === toolId);

  return (
    <ToolLayout title={title}>
      <Container sx={{ py: 2, px: { xs: 2, sm: 4 } }}>
        <div style={{ maxWidth: "1200px", paddingTop: 20 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}

            {tool?.detailDescription && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 2,
                    background: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.02)",
                    border: "1px solid",
                    borderColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.7)"
                          : "rgba(0, 0, 0, 0.6)",
                      lineHeight: 1.6,
                    }}
                  >
                    {tool.detailDescription}
                  </Typography>
                </Paper>
              </motion.div>
            )}
          </motion.div>

          <Divider
            sx={{
              my: 6,
              borderColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
            }}
          />

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              background: (theme) =>
                theme.palette.mode === "dark" ? "#f5f5fb" : "#f5f5fb",
              border: "1px solid",
              borderColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
            }}
          >
            <Footer />
          </Paper>
        </div>
      </Container>
    </ToolLayout>
  );
};

export default ToolPageLayout;
