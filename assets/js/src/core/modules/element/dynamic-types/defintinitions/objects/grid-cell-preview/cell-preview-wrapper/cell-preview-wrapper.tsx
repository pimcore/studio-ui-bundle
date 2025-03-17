import React from 'react';
import { theme } from 'antd';

interface GridPreviewWrapperProps {
  children: React.ReactNode;
}

const GridPreviewWrapper: React.FC<GridPreviewWrapperProps> = ({ children }) => {
  const { useToken } = theme;
  const { token } = useToken();
  const padding = token.sizeXS;

  return (
    <div style={{ padding }}>
      {children}
    </div>
  );
};

export default GridPreviewWrapper;
