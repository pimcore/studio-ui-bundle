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
import { Dropdown, Space } from '@sdk/components'
import { useStyles } from '../../areablock-editable.styles'
import { type AreaType, type AreablockEditableConfig } from '../../areablock-editable'
import { useAreablockMenu } from '../../hooks/use-areablock-menu'
import { useAreablockClipboard } from '../../hooks/use-areablock-clipboard'
import { EditableDropzone } from '../../../../helpers/editable-dropzone-sorting/components/editable-dropzone/editable-dropzone'
import { configUtils } from '../../utils/areablock-utils'
import { isNil, isString } from 'lodash'
import { useTranslation } from 'react-i18next'
import { EditableDropzoneContent } from '../../../../helpers/editable-dropzone-sorting/components/editable-dropzone/dropzone-content'
import { InheritanceWrapper } from '../../../inheritance-wrapper/inheritance-wrapper'

interface DropInfo {
  type: string
  data?: {
    areablockType?: string
  }
}

export interface EmptyStateAreablockToolbarProps {
  areaTypes: AreaType[]
  config?: AreablockEditableConfig
  onClick: (areaType?: string) => Promise<void>
  onPasteArea: (element: HTMLElement | null) => void
  isInherited?: boolean
  onOverwrite?: () => void
}

export const EmptyStateAreablockToolbar = ({
  areaTypes,
  config,
  onClick,
  onPasteArea,
  isInherited = false,
  onOverwrite
}: EmptyStateAreablockToolbarProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  const clipboardItem = useAreablockClipboard()
  const canPaste = !isNil(clipboardItem) &&
    !configUtils.isLimitReached(0, config?.limit) &&
    configUtils.isTypePasteable(config, clipboardItem.type)

  const { menuItems } = useAreablockMenu({
    config,
    onAddArea: (areaType: string) => { void onClick(areaType) }
  })

  const handleDropzoneItem = async (info: DropInfo, index: number): Promise<void> => {
    if (isInherited) return
    if (info.type === 'areablock-type' && isString(info.data?.areablockType)) {
      await onClick(info.data.areablockType)
    }
  }

  const isValidDrop = (info: DropInfo): boolean => {
    if (isInherited) return false
    if (info.type !== 'areablock-type' || !isString(info.data?.areablockType)) {
      return false
    }

    const areablockType = info.data.areablockType
    return configUtils.isTypeAllowed(config, areablockType)
  }

  const renderAddButton = (): React.ReactNode => {
    if (areaTypes.length === 1) {
      return (
        <IconButton
          aria-label={ t('areablock.new') }
          icon={ { value: 'new' } }
          onClick={ isInherited ? undefined : () => { void onClick(areaTypes[0].type) } }
          size="small"
          tooltip={ { title: t('areablock.new') } }
        />
      )
    }

    return (
      <Dropdown
        menu={ { items: menuItems } }
        placement="bottomLeft"
        trigger={ isInherited ? [] : ['click'] }
      >
        <IconButton
          aria-label={ t('areablock.new') }
          icon={ { value: 'new' } }
          size="small"
          tooltip={ { title: t('areablock.new') } }
        />
      </Dropdown>
    )
  }

  const renderPasteButton = (): React.ReactNode => (
    <IconButton
      aria-label={ t('areablock.paste') }
      disabled={ !canPaste }
      icon={ { value: 'paste' } }
      onClick={ isInherited ? undefined : () => { onPasteArea(null) } }
      size="small"
      tooltip={ { title: t('areablock.paste') } }
    />
  )

  return (
    <>
      <EditableDropzoneContent />
      <InheritanceWrapper
        isInherited={ isInherited }
        onOverwrite={ onOverwrite }
      >
        <ToolStrip
          additionalIcon={ isInherited ? 'inheritance-active' : undefined }
          className={ styles.areablockToolstrip }
          disabled={ isInherited }
          theme="inverse"
        >
          <Space size="small">
            {renderAddButton()}
            {renderPasteButton()}
          </Space>
        </ToolStrip>
      </InheritanceWrapper>
      {!isInherited && (
        <EditableDropzone
          id="empty-areablock-toolbar-dropzone"
          index={ 0 }
          isValidDrop={ isValidDrop }
          onDropItem={ handleDropzoneItem }
        />
      )}
    </>
  )
}
