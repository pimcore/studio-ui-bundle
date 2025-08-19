/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { SplitLayout, type SplitLayoutProps } from '@Pimcore/components/split-layout/split-layout'
import React from 'react'

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
  } = props

  const mergedLeftItem = {
    size: 20,
    minSize: 170,
    ...leftItem
  }

  const mergedRightItem = {
    size: 80,
    ...rightItem
  }

  return (
    <SplitLayout
      leftItem={ mergedLeftItem }
      resizeAble={ resizeAble }
      rightItem={ mergedRightItem }
      withDivider={ withDivider }
      withToolbar={ withToolbar }
    />
  )
}
