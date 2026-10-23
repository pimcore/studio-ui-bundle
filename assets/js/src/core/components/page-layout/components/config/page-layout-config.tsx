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
import { PageLayoutSplit, type PageLayoutSplitOptions } from '../split/page-layout-split'

export interface PageLayoutConfigProps extends PageLayoutSplitOptions {
  variant: 'config'
}

export const PageLayoutConfig = (props: Readonly<PageLayoutConfigProps>): React.JSX.Element => {
  'use memo'

  const {
    leftItem,
    rightItem,
    withDivider = true,
    resizeAble = false,
    withToolbar = true,
    leftItemFullWidth,
    rightItemFullWidth
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
    <PageLayoutSplit
      leftItem={ mergedLeftItem }
      leftItemFullWidth={ leftItemFullWidth }
      resizeAble={ resizeAble }
      rightItem={ mergedRightItem }
      rightItemFullWidth={ rightItemFullWidth }
      withDivider={ withDivider }
      withToolbar={ withToolbar }
    />
  )
}
