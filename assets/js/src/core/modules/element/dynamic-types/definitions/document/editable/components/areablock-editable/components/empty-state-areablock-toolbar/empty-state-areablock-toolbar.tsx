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
import { EditableDropzone } from '../../../../helpers/editable-dropzone-sorting/components/editable-dropzone/editable-dropzone'
import { useTranslation } from 'react-i18next'
import { configUtils } from '../../utils/areablock-utils'

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
  const { t } = useTranslation()

  const { menuItems } = useAreablockMenu({
    config,
    onAddArea: (areaType: string) => { void onClick(areaType) }
  })

  const handleDropzoneItem = async (info: any, index: number): Promise<void> => {
    if (info.type === 'areablock-type' && info.data?.areablockType) {
      await onClick(info.data.areablockType)
    }
  }

  const isValidDrop = (info: any): boolean => {
    if (info.type !== 'areablock-type' || info.data?.areablockType == null) {
      return false
    }

    const areablockType = info.data.areablockType
    return configUtils.isTypeAllowed(config, areablockType)
  }

  const renderAddButton = (): React.ReactNode => {
    if (areaTypes.length === 1) {
      return (
        <IconButton
          icon={ { value: 'new' } }
          onClick={ () => { void onClick(areaTypes[0].type) } }
          size="small"
        />
      )
    }

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
    <>
      <ToolStrip
        className={ styles.areablockToolstrip }
        theme="inverse"
      >
        {renderAddButton()}
      </ToolStrip>
      <EditableDropzone
        id="empty-areablock-toolbar-dropzone"
        index={0}
        onDropItem={handleDropzoneItem}
        isValidDrop={isValidDrop}
      />
    </>
  )
}
