'use client'

import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import WorkspaceNav from '@/components/workspace/WorkspaceNav';

const WorkspaceContainer = styled(Box)({
  width: '100vw',
  minHeight: '100vh',
  position: 'relative',
  backgroundColor: '#1a1a1a',
});

const BackgroundImage = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: 'url(/imgs/th.jpeg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'brightness(0.9)',
  zIndex: 0,
});

const BackgroundOverlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  zIndex: 1,
});

const ContentWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  width: '100%',
  minHeight: '100vh',
  zIndex: 2,
});

const Workspace: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const activeTab = pathname.split('/').pop() || 'home';

  const handleTabChange = (newTab: string) => {
    router.push(`/workspace/${newTab}`);
  };

  return (
    <WorkspaceContainer>
      <BackgroundImage />
      <BackgroundOverlay />
      <ContentWrapper>
        <WorkspaceNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        {children}
      </ContentWrapper>
    </WorkspaceContainer>
  );
};

export default Workspace;