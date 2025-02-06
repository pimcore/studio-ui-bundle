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

import React, { useState, useContext } from 'react'
import { Popconfirm } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useTranslation } from 'react-i18next'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { useElementRefresh } from '@Pimcore/modules/element/actions/refresh-element/use-element-refresh'
import {
  useLayoutSelection
} from '@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection'
import { Dropdown, type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { useCustomLayouts } from '@Pimcore/modules/data-object/hooks/use-custom-layouts'
import { Text } from '@Pimcore/components/text/text'

export const ReloadButton = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)
  const [popConfirmOpen, setPopConfirmOpen] = useState<boolean>(false)
  const { refreshElement } = useElementRefresh('data-object')
  const { isLoading, layouts } = useCustomLayouts(id)
  const { setCurrentLayout, currentLayout } = useLayoutSelection()

  if (isLoading) {
    return <></>
  }
  const onOpenChange = (newOpen: boolean): void => {
    if (!newOpen) {
      setPopConfirmOpen(false)
      return
    }

    if (Object.keys(dataObject?.changes ?? {}).length > 0) {
      setPopConfirmOpen(true)
    } else {
      refreshElement(id)
    }
  }

  const onConfirm = (): void => {
    setPopConfirmOpen(false)
    refreshElement(id)
  }

  const onCancel = (): void => {
    setPopConfirmOpen(false)
  }

  const items: ItemType[] = (layouts ?? []).map(layout => ({
    key: `reload-${layout.id}`,
    label: <Text strong={ currentLayout === layout.id }>{ t(layout.name) }</Text>,
    onClick: (): void => {
      setCurrentLayout(layout.id)
      refreshElement(id)
    }
  }))

  return (
    <Popconfirm
      key="reload"
      onCancel={ onCancel }
      onConfirm={ onConfirm }
      onOpenChange={ onOpenChange }
      open={ popConfirmOpen }
      title={ t('toolbar.reload.confirmation') }
    >
      <IconButton
        icon={ { value: 'refresh' } }
      >
        {t('toolbar.reload')}
      </IconButton>

      { items.length > 1 && (
      <Dropdown
        key="switch-layout"
        menu={ { items } }
      >
        <IconButton
          icon={ { value: 'chevron-down' } }
        >
          {t('toolbar.switch-layout')}
        </IconButton>
      </Dropdown>
      ) }
    </Popconfirm>
  )
}
