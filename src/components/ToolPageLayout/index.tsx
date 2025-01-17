"use client";

import { FC, ReactNode } from "react";
import { Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ToolLayout from "../ToolLayout";
import { useTitle } from "../../hooks/useTitle";

interface ToolPageLayoutProps {
  title: string;
  children: ReactNode;
}

const ToolPageLayout: FC<ToolPageLayoutProps> = ({ title, children }) => {
  useTitle(title);

  return (
    <ToolLayout title={title}>
      <Container sx={{ py: 2, px: { xs: 2, sm: 4 } }}>
        <div style={{ maxWidth: "1200px", paddingTop: 20 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ height: "100%" }}
          >
            {/* <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              {title}
            </Typography>
          </Stack> */}

            {children}
          </motion.div>
        </div>
      </Container>
    </ToolLayout>
  );
};

export default ToolPageLayout;
