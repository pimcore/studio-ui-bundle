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

import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { ReloadPopconfirm, type ReloadPopconfirmHandle } from '@Pimcore/components/reload-popconfirm/reload-popconfirm'
import { isString } from 'lodash'

export const ReloadButton = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)
  const { refreshElement } = useElementRefresh('data-object')
  const { isLoading, layouts } = useCustomLayouts(id)
  const { setCurrentLayout, currentLayout } = useLayoutSelection()
  const [selectedLayout, setSelectedLayout] = useState<string | null>()
  const popconfirmRef = useRef<ReloadPopconfirmHandle>(null)

  useEffect(() => {
    if (isString(selectedLayout)) {
      popconfirmRef.current?.refresh()
    }
  }, [selectedLayout])

  if (isLoading) {
    return <></>
  }

  const hasDataChanged = (): boolean => {
    return Object.keys(dataObject?.changes ?? {}).length > 0
  }

  const onReload = (): void => {
    refreshElement(id, true)
  }

  const onReloadLayout = (): void => {
    if (isString(selectedLayout)) {
      setCurrentLayout(selectedLayout)
    }

    refreshElement(id, true)
  }

  const onCancelLayoutChange = (): void => {
    setSelectedLayout(null)
  }

  const items: ItemType[] = (layouts ?? []).map(layout => ({
    key: `reload-${layout.id}`,
    label: <Text strong={ currentLayout === layout.id }>{ t(layout.name) }</Text>,
    onClick: (): void => {
      setSelectedLayout(layout.id)
    }
  }))

  return (
    <>
      <ReloadPopconfirm
        hasDataChanged={ hasDataChanged }
        key="reload"
        onReload={ onReload }
        title={ t('toolbar.reload.confirmation') }
      >
        <IconButton
          icon={ { value: 'refresh' } }
        >
          {t('toolbar.reload')}
        </IconButton>

      </ReloadPopconfirm>

      { items.length > 1 && (
      <>
        <ReloadPopconfirm
          hasDataChanged={ hasDataChanged }
          key="reload"
          onCancel={ onCancelLayoutChange }
          onReload={ onReloadLayout }
          ref={ popconfirmRef }
          title={ t('toolbar.reload.confirmation') }
        />
        <Dropdown
          key="switch-layout"
          menu={ { items } }
          trigger={ ['hover'] }
        >

          <IconButton
            icon={ { value: 'chevron-down' } }
            onClick={ (e) => { e.stopPropagation() } }
          >
            {t('toolbar.switch-layout')}
          </IconButton>
        </Dropdown>
      </>
      ) }
    </>
  )
}
