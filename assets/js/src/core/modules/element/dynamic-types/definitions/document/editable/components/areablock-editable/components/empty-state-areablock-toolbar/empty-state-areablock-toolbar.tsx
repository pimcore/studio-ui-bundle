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
import { type AreaType, type AreablockEditableConfig } from '../../areablock-editable'
import { useAreablockMenu } from '../../hooks/use-areablock-menu'

export interface EmptyStateAreablockToolbarProps {
  areaTypes: AreaType[]
  config?: AreablockEditableConfig
  onClick: (areaType?: string) => Promise<void>
}

export const EmptyStateAreablockToolbar = ({
  areaTypes,
  config,
  onClick
}: EmptyStateAreablockToolbarProps): React.JSX.Element => {
  const { styles } = useAreablockEditableStyles()

  const { menuItems } = useAreablockMenu({
    config,
    onAddArea: (areaType: string) => { void onClick(areaType) }
  })

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

    // Multiple area types - dropdown button with groups support
    return (
      <Dropdown
        menu={ { items: menuItems } }
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
