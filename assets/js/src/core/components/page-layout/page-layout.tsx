/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo } from 'react'
import { PageLayoutContent, type PageLayoutContentProps } from './components/content/page-layout-content'
import { PageLayoutSplit, type PageLayoutSplitProps } from './components/split/page-layout-split'

export type { PageLayoutContentProps } from './components/content/page-layout-content'
export type { PageLayoutSplitProps } from './components/split/page-layout-split'
export type { PageLayoutPaneProps } from './components/split/page-layout-pane'

export interface PageLayoutConfigProps extends Omit<PageLayoutSplitProps, 'variant'> {
  variant: 'config'
}

export type PageLayoutProps = PageLayoutContentProps | PageLayoutSplitProps | PageLayoutConfigProps

const Component = (props: Readonly<PageLayoutProps>): React.JSX.Element => {
  switch (props.variant) {
    case 'split':
      return <PageLayoutSplit { ...props } />
    case 'config':
      return (
        <PageLayoutSplit
          { ...props }
          leftItem={ { size: 20, minSize: 170, ...props.leftItem } }
          rightItem={ { size: 80, ...props.rightItem } }
          withDivider={ props.withDivider ?? true }
          withToolbar={ props.withToolbar ?? true }
        />
      )
    default:
      return <PageLayoutContent { ...props } />
  }
}

/**
 * PageLayout - the layout of a page or tab, in one of three variants:
 *
 * - `content`: content with an optional top bar, bottom toolbar and sidebar
 *   (`renderTopBar`, `renderToolbar`, `renderSidebar`)
 * - `split`: two items side by side; item `size` is a percentage (default 50),
 *   `minSize` and `maxSize` are in px; optional divider, resizing and `fullWidth` for one item
 * - `config`: the `split` variant for configuration screens, defaulting to a 20/80 split
 *   with a 170px minimum (no maximum) for the left item, a divider and toolbar alignment
 *
 * @example
 * ```tsx
 * <PageLayout
 *   renderTopBar={ <Header title="Title" /> }
 *   variant="content"
 * >
 *   <MainContent />
 * </PageLayout>
 *
 * <PageLayout
 *   leftItem={ { children: <ConfigTree /> } }
 *   rightItem={ { children: <ConfigForm /> } }
 *   variant="config"
 * />
 * ```
 */
export const PageLayout = memo(Component)
