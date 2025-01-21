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

import { Popconfirm } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import ButtonGroup from 'antd/es/button/button-group'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { useElementRefresh } from '@Pimcore/modules/element/actions/refresh-element/use-element-refresh'

export const EditorToolbarContextMenu = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)
  const [popConfirmOpen, setPopConfirmOpen] = useState<boolean>(false)
  const { refreshElement } = useElementRefresh('data-object')

  return (
    <ButtonGroup>
      <Popconfirm
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
      </Popconfirm>
    </ButtonGroup>
  )

  function onOpenChange (newOpen: boolean): void {
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

  function onConfirm (): void {
    setPopConfirmOpen(false)
    refreshElement(id)
  }

  function onCancel (): void {
    setPopConfirmOpen(false)
  }
}
