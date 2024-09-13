import { Flex as AntFlex, FlexProps as AntFlexProps, theme } from 'antd';
import React from 'react';

export interface FlexProps extends Omit<AntFlexProps, 'gap'> {
  gap?: number | 'mini' | 'extra-small'  | 'small' | 'normal' | 'medium' | 'large' | 'extra-large' | 'maxi';
}

const { useToken } = theme;

export const Flex = ({ gap = 0, ...props }: FlexProps): React.JSX.Element => {
  const { token } = useToken();
  let internalGap = gap;

  if (typeof gap === 'string') {
    internalGap = transferSizingToToken(gap);
  }

  return <AntFlex gap={internalGap} {...props} />;

  function transferSizingToToken(sizing: string): number {
    switch (sizing) {
      case 'mini':
        return token.sizeXXS;
      case 'extra-small':
        return token.sizeXS;
      case 'small':
        return token.sizeSM;
      case 'normal':
        return token.size
      case 'medium':
        return token.sizeMD;
      case 'large':
        return token.sizeLG;
      case 'extra-large':
        return token.sizeXL;
      case 'maxi':
        return token.sizeXXL;
      default:
        return 0;
    }
  }
}

