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
import { Space } from '@sdk/components'
import { Icon } from '@Pimcore/components/icon/icon'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useStyles } from '../icon-selector.styles'

interface IconCardProps {
  icon: ElementIcon
  isSelected: boolean
  onClick: () => void
}

export const IconCard = ({ icon, isSelected, onClick }: IconCardProps): React.JSX.Element => {
  const { styles } = useStyles()

  const getIconDisplayName = (icon: ElementIcon): string => {
    if (icon.type === 'path') {
      return icon.value.split('/').pop()?.replace('.svg', '') ?? icon.value
    }
    return icon.value
  }

  const cardClassName = `${styles.iconCard} ${isSelected ? styles.selectedCard : ''}`

  return (
    <Space
      className={ cardClassName }
      key={ icon.value }
      onClick={ onClick }
      size='mini'
    >
      <Icon
        options={ { height: 24, width: 24 } }
        type={ icon.type }
        value={ icon.value }
      />
      <span className={ styles.iconName }>
        {getIconDisplayName(icon)}
      </span>
    </Space>
  )
}
