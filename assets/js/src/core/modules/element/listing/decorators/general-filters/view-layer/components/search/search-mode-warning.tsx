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
import { Icon } from '@Pimcore/components/icon/icon'
import { Text } from '@Pimcore/components/text/text'
import { useStyles } from './search-term-filter.styles'

export interface SearchModeWarningProps {
  warning: string | undefined
}

/** The line under a search bar naming a mode's restriction; one render path for every surface. */
export const SearchModeWarning = ({ warning }: SearchModeWarningProps): React.JSX.Element | null => {
  const { styles } = useStyles()

  if (warning === undefined) {
    return null
  }

  return (
    <div className={ styles.warning }>
      <Icon
        options={ { width: 12, height: 12 } }
        value='question-mark-outline'
      />
      <Text>{warning}</Text>
    </div>
  )
}
