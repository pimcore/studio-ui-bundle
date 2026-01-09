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
import { useStyles } from './auto-hide-empty-content.styles'
import { useHideParentWhenHidden } from './hooks/use-hide-parent-when-hidden'

export interface AutoHideEmptyContentProps {
  children: React.ReactNode
  contentSelector: string
  parentSelector?: string
}

export const AutoHideEmptyContent = ({
  children,
  contentSelector,
  parentSelector
}: AutoHideEmptyContentProps): React.JSX.Element => {
  const { styles } = useStyles({ contentSelector })
  const { ref } = useHideParentWhenHidden<HTMLDivElement>({
    parentSelector
  })

  return (
    <div
      className={ styles.wrapper }
      ref={ ref }
    >
      {children}
    </div>
  )
}
