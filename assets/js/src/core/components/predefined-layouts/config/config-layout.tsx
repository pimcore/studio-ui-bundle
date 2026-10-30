/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { PageLayout } from '@Pimcore/components/page-layout/page-layout'
import { type LegacySplitLayoutProps } from '@Pimcore/components/split-layout/legacy-split-layout-props'
import React from 'react'

/**
 * @deprecated Use `PageLayoutConfigProps` (with `variant: 'config'`) instead.
 * This type is kept for backward compatibility and will be removed in the next major version.
 */
export interface ConfigLayoutProps extends LegacySplitLayoutProps {}

/**
 * ConfigLayout - A predefined layout component for configuration interfaces
 *
 * This component should be used exclusively for configuration screens to maintain
 * consistency across all configuration interfaces. It provides a standardized
 * 20/80 split layout with:
 * - Left panel (20% width, 170px min, no max): Configuration navigation/options
 * - Right panel (80% width): Main configuration content
 * - Built-in divider and toolbar alignment (`withDivider` and `withToolbar` default to true)
 * - `leftItemFullWidth` and `rightItemFullWidth` are ignored
 *
 * @deprecated Use `PageLayout` with `variant="config"` instead: `resizeAble` became `resizable`, drop the ignored
 * full-width flags, the other props and defaults are the same. This alias is kept for backward compatibility and
 * will be removed in the next major version.
 *
 * @example
 * ```tsx
 * <ConfigLayout
 *   leftItem={{ children: <ConfigTree /> }}
 *   rightItem={{ children: <ConfigForm /> }}
 * />
 * ```
 */
export const ConfigLayout = (props: LegacySplitLayoutProps): React.JSX.Element => {
  'use memo'

  const {
    leftItem,
    rightItem,
    withDivider,
    resizeAble,
    withToolbar
  } = props

  return (
    <PageLayout
      leftItem={ leftItem }
      resizable={ resizeAble }
      rightItem={ rightItem }
      variant="config"
      withDivider={ withDivider }
      withToolbar={ withToolbar }
    />
  )
}
