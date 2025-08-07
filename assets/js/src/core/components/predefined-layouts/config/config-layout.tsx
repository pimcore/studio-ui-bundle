import { SplitLayout, SplitLayoutProps } from "@Pimcore/components/split-layout/split-layout";
import React from "react";

export interface ConfigLayoutProps extends SplitLayoutProps {}

/**
 * ConfigLayout - A predefined layout component for configuration interfaces
 * 
 * This component should be used exclusively for configuration screens to maintain
 * consistency across all configuration interfaces. It provides a standardized
 * 25/75 split layout with:
 * - Left panel (25% width, 170px min, 280px max): Configuration navigation/options
 * - Right panel (75% width): Main configuration content
 * - Built-in divider and optional toolbar support
 * 
 * @example
 * ```tsx
 * <ConfigLayout
 *   leftItem={{ children: <ConfigTree /> }}
 *   rightItem={{ children: <ConfigForm /> }}
 * />
 * ```
 */
export const ConfigLayout = (props: ConfigLayoutProps): React.JSX.Element => {
  'use memo'

  const { 
    leftItem,
    rightItem,
    withDivider = true, 
    resizeAble = false, 
    withToolbar = true
  } = props;

  const mergedLeftItem = { 
    size: 25, 
    minSize: 170, 
    maxSize: 280,
    ...leftItem 
  };
  
  const mergedRightItem = { 
    size: 75, 
    ...rightItem 
  };

  return (
    <SplitLayout
      leftItem={mergedLeftItem}
      rightItem={mergedRightItem}
      withDivider={withDivider}
      resizeAble={resizeAble}
      withToolbar={withToolbar}
    />
  );
};
