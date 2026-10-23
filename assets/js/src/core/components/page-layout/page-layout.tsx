/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { PageLayoutContent, type PageLayoutContentProps } from './components/content/page-layout-content'
import { PageLayoutSplit, type PageLayoutSplitProps } from './components/split/page-layout-split'
import { PageLayoutConfig, type PageLayoutConfigProps } from './components/config/page-layout-config'

export type { PageLayoutContentProps } from './components/content/page-layout-content'
export type { PageLayoutSplitOptions, PageLayoutSplitProps } from './components/split/page-layout-split'
export type { PageLayoutConfigProps } from './components/config/page-layout-config'
export type { PageLayoutPaneProps } from './components/pane/page-layout-pane'

export type PageLayoutProps = PageLayoutContentProps | PageLayoutSplitProps | PageLayoutConfigProps

/**
 * PageLayout - the layout of a page or tab, in one of three variants:
 *
 * - `content`: content with an optional top bar, bottom toolbar and sidebar
 *   (`renderTopBar`, `renderToolbar`, `renderSidebar`)
 * - `split`: two items side by side; item `size` is a percentage (default 50),
 *   `minSize` and `maxSize` are in px; optional divider, resizing and full-width flags
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
export const PageLayout = (props: Readonly<PageLayoutProps>): React.JSX.Element => {
  switch (props.variant) {
    case 'split':
      return <PageLayoutSplit { ...props } />
    case 'config':
      return <PageLayoutConfig { ...props } />
    default:
      return <PageLayoutContent { ...props } />
  }
}
