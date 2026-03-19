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
import { Flex } from '@Pimcore/components/flex/flex'
import { type GapType } from '@Pimcore/types/components/types'

export type ItemSpacerSize = 'none' | 'mini' | 'extra-small' | 'small' | 'normal' | 'medium' | 'large' | 'extra-large' | 'maxi'

export interface ItemSpacerProps {
  children: React.ReactNode
  direction?: 'vertical' | 'horizontal'
  size?: ItemSpacerSize
  className?: string
}

export const ItemSpacer = ({
  children,
  direction = 'vertical',
  size = 'extra-small',
  className
}: ItemSpacerProps): React.JSX.Element => {
  const classes = ['w-full', className].filter(Boolean).join(' ')
  const gap: GapType = size === 'none' ? 0 : size

  return (
    <Flex
      className={ classes }
      gap={ gap }
      vertical={ direction === 'vertical' }
    >
      { children }
    </Flex>
  )
}
