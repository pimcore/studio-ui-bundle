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
import { Compact } from '@Pimcore/components/compact/compact'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { Text } from '@Pimcore/components/text/text'
import { useStyles } from './search-bar.styles'

export interface SearchBarProps {
  /** Same row, left of the input (e.g. the search modal's type and class selects). */
  prefixControls?: React.ReactNode
  /** Joined to the input's start edge. */
  modeDropdown?: React.ReactNode
  /** Line under the row. */
  warning?: string
  /** The search input. */
  children: React.ReactNode
}

export const SearchBar = ({ prefixControls, modeDropdown, warning, children }: SearchBarProps): React.JSX.Element => {
  const { styles } = useStyles()

  const input = modeDropdown === undefined
    ? children
    : (
      <Compact className='w-full'>
        {modeDropdown}
        {children}
      </Compact>
      )

  return (
    <div className='w-full'>
      {prefixControls === undefined
        ? input
        : (
          <Flex
            className='w-full'
            gap='extra-small'
          >
            {prefixControls}
            {input}
          </Flex>
          )}
      {warning !== undefined && (
        <div className={ styles.warning }>
          <Icon
            options={ { width: 12, height: 12 } }
            value='question-mark-outline'
          />
          <Text>{warning}</Text>
        </div>
      )}
    </div>
  )
}
