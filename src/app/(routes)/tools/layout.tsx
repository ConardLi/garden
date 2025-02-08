"use client";

import ToolPageLayout from "@/components/ToolPageLayout";
import { TOOLS } from "@/constants/tools";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ToolsLayout = ({ children }) => {
  const pathname = usePathname();
  // 获取 tools/ 后面的所有路径作为工具 ID
  const toolId = pathname.split("/tools/")[1];
  const currentTool = TOOLS.find((tool) => tool.id === toolId);
  const title = currentTool?.name || "工具箱";
  const desc = currentTool?.detailDescription || "";

  // 在客户端动态更新标题
  useEffect(() => {
    document.title = `${title} - ${desc} - 花园工具箱`;
  }, [title]);

  return <ToolPageLayout title={title}>{children}</ToolPageLayout>;
};

export default ToolsLayout;
