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
import { ToolStrip } from '@Pimcore/components/toolstrip/tool-strip'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Dropdown } from 'antd'
import { useAreablockEditableStyles } from '../../areablock-editable.styles'
import { type AreaType } from '../../areablock-editable'
import { useTranslation } from 'react-i18next'

export interface EmptyStateAreablockToolbarProps {
  areaTypes: AreaType[]
  onClick: (areaType?: string) => Promise<void>
}

export const EmptyStateAreablockToolbar = ({
  areaTypes,
  onClick
}: EmptyStateAreablockToolbarProps): React.JSX.Element => {
  const { styles } = useAreablockEditableStyles()
  const { t } = useTranslation()

  const renderAddButton = (): React.ReactNode => {
    if (areaTypes.length === 1) {
      // Single area type - direct button
      return (
        <IconButton
          icon={ { value: 'new' } }
          onClick={ () => { void onClick(areaTypes[0].type) } }
          size="small"
        />
      )
    }

    // Multiple area types - dropdown button
    const dropdownItems = areaTypes.map(areaType => ({
      key: areaType.type,
      label: t(areaType.name),
      onClick: () => { void onClick(areaType.type) }
    }))

    return (
      <Dropdown
        menu={ { items: dropdownItems } }
        placement="bottomLeft"
        trigger={ ['click'] }
      >
        <IconButton
          icon={ { value: 'new' } }
          size="small"
        />
      </Dropdown>
    )
  }

  return (
    <ToolStrip
      className={ styles.areablockToolstrip }
      theme="inverse"
    >
      {renderAddButton()}
    </ToolStrip>
  )
}
