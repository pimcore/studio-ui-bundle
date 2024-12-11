/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'

export interface CollapseHeaderProps {
  label?: React.ReactNode
  subLabel?: React.ReactNode
  extra?: React.ReactNode
  extraPosition?: 'start' | 'end'
  expandIcon?: React.ReactNode
  expandIconPosition?: 'start' | 'end' | 'left' | 'right'
}

export const CollapseHeader = ({ label, subLabel, extra, extraPosition, expandIcon, expandIconPosition }: CollapseHeaderProps): React.JSX.Element => {
  const extraAdjustment = extraPosition === 'start' ? 'flex-start' : 'flex-end'

  return (
    <Flex
      align='center'
      gap={ 'extra-small' }
    >
      <div className='collapse-header__title-container'>
        <Flex
          align='center'
          gap={ 'mini' }
        >
          {(expandIconPosition === 'start' || expandIconPosition === 'left') && expandIcon}
          <Text strong>{label}</Text>
          {(expandIconPosition === 'end' || expandIconPosition === 'right') && expandIcon}
        </Flex>

        {subLabel !== undefined && (
        <Text
          className='collapse-header__subtitle'
          type='secondary'
        >{subLabel}</Text>
        )}
      </div>

      {extra !== undefined && (
        <Flex
          className='collapse-header__extra'
          justify={ extraAdjustment }
        >
          {extra}
        </Flex>
      )}
    </Flex>
  )
}
