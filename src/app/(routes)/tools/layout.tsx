'use client';

import ToolPageLayout from '@/components/ToolPageLayout';
import { TOOLS } from '@/constants/tools'
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const ToolsLayout = ({children}) => {
  const pathname = usePathname();
  const toolId = pathname.split('/').pop(); // 获取最后一段作为工具ID
  const currentTool = TOOLS.find(tool => tool.id === toolId);
  const title = currentTool?.name || 'MD5 生成器';

  // 在客户端动态更新标题
  useEffect(() => {
    document.title = `${title} - code秘密花园`;
  }, [title]);

  return (
    <ToolPageLayout title={title}>
      {children}
    </ToolPageLayout>
  );
};

export default ToolsLayout;