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

import React from 'react'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import {
  getFormattedDropDownMenu,
  useListColumns
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/hooks/use-list'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Button } from '@Pimcore/components/button/button'
import { t } from 'i18next'
import {
  useBatchEdit
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/toolbar/tools/batch-edit-modal/hooks/use-batch-edit'
import {
  BatchEditListContainer
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/toolbar/tools/batch-edit-modal/batch-edit-list-container'
import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Modal } from '@Pimcore/components/modal/modal'

export interface BatchEditModalProps {
  batchEditModalOpen: boolean
  setBatchEditModalOpen: (showBatchEditModal: boolean) => void
}

export const BatchEditModal = ({ batchEditModalOpen, setBatchEditModalOpen }: BatchEditModalProps): React.JSX.Element => {
  const { batchEditDropDownMenu } = useListColumns()
  const { addOrUpdateBatchEdit, resetBatchEdits } = useBatchEdit()

  const onColumnClick = (column: GridColumnConfiguration): void => {
    addOrUpdateBatchEdit(column.key, column.type, '')
  }

  const onClose = (): void => {
    setBatchEditModalOpen(false)
    resetBatchEdits()
  }

  return (
    <Modal
      footer={ <ModalFooter buttonAlignment={ 'space-between' }>
        <Dropdown menu={ {
          items: getFormattedDropDownMenu(batchEditDropDownMenu, onColumnClick)
        } }
        >
          <IconTextButton
            icon='PlusCircleOutlined'
            type='default'
          >
            {t('listing.add-column')}
          </IconTextButton>
        </Dropdown>
        <><IconTextButton
          icon='close'
          onClick={ () => {
            resetBatchEdits()
          } }
          type='link'
          >
          {t('batch-edit.modal-footer.discard-all-changes')}</IconTextButton>
          <Button
            onClick={ onClose }
            type='primary'
          >{t('batch-edit.modal-footer.apply-changes')}</Button>
        </>
      </ModalFooter> }
      onCancel={ () => { setBatchEditModalOpen(false) } }
      open={ batchEditModalOpen }
      size={ 'M' }
      title={ t('batch-edit.modal-title') }
    >
      <BatchEditListContainer />
    </Modal>
  )
}
