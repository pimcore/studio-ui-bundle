/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Button } from '@Pimcore/components/button/button'
import { CollapseItem } from '@Pimcore/components/collapse/collapse'
import { Flex } from '@Pimcore/components/flex/flex'
import { ImportModal } from '@Pimcore/components/import-modal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Modal, type IModalProps } from '@Pimcore/components/modal/modal'
import { Space } from '@Pimcore/components/space/space'
import {
  type BulkExportAvailableItem,
  type BulkImportPrepareResponse
} from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { BulkExportItemsTable } from '@Pimcore/modules/bulk-export/components/bulk-export-modal/components/bulk-export-items-table'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import React, { useState, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { type BulkImportItem } from './context/bulk-import-context'
import { useBulkImport } from './hooks/use-bulk-import'
import { isNil } from 'lodash'

interface BulkImportModalProps extends Omit<IModalProps, 'children'> {
  selectedItems: BulkImportItem[]
  selectAll: (items: BulkImportItem[]) => void
  deselectAll: () => void
  toggleItem: (type: string, name: string) => void
  isSelected: (type: string, name: string) => boolean
  closeModal: () => void
}

type Step = 'upload' | 'select'

export const BulkImportModal = (props: BulkImportModalProps): React.JSX.Element => {
  const { selectedItems, selectAll, deselectAll, toggleItem, isSelected, closeModal, ...modalProps } = props
  const { t } = useTranslation()

  const [step, setStep] = useState<Step>('upload')
  const uploadSucceededRef = useRef(false)

  const { fileId, availableItems, setUploadResult, handleImport, reset } = useBulkImport()

  const groupedItems = useMemo(() => {
    return availableItems.reduce<Record<string, BulkExportAvailableItem[]>>((groups, item) => {
      const group = groups[item.type] ?? []
      group.push(item)
      groups[item.type] = group
      return groups
    }, {})
  }, [availableItems])

  const typeOrder = ['class', 'customlayout', 'fieldcollection', 'objectbrick']

  const sortedTypes = useMemo(() => {
    const types = Object.keys(groupedItems)
    return types.sort((a, b) => {
      const indexA = typeOrder.indexOf(a)
      const indexB = typeOrder.indexOf(b)
      if (indexA === -1 && indexB === -1) return a.localeCompare(b)
      if (indexA === -1) return 1
      if (indexB === -1) return -1
      return indexA - indexB
    })
  }, [groupedItems])

  const handleUploadSuccess = (response: unknown): void => {
    const data = response as BulkImportPrepareResponse
    setUploadResult({ fileId: data.fileId, items: data.items })
    const allItems: BulkImportItem[] = data.items.map((item) => ({ type: item.type, name: item.name }))
    selectAll(allItems)
    uploadSucceededRef.current = true
    setStep('select')
  }

  const onImport = (): void => {
    if (isNil(fileId)) return

    handleImport(fileId, selectedItems, t('bulk-import.job-title'))
    closeModal()
  }

  const resetState = (): void => {
    setStep('upload')
    deselectAll()
    reset()
  }

  const handleBack = (): void => {
    resetState()
  }

  const handleClose = (): void => {
    resetState()
    closeModal()
  }

  const handleUploadModalClose = (open: boolean): void => {
    if (!open) {
      if (uploadSucceededRef.current) {
        uploadSucceededRef.current = false
        return
      }
      handleClose()
    }
  }

  const selectFooter = (
    <ModalFooter>
      <Button
        onClick={ handleBack }
      >
        {t('bulk-import.back')}
      </Button>

      <Button
        disabled={ selectedItems.length === 0 }
        onClick={ onImport }
        type='primary'
      >
        {t('bulk-import.import')}
      </Button>
    </ModalFooter>
  )

  return (
    <>
      {step === 'upload' && (
        <ImportModal
          accept='.json,application/json'
          acceptMimeTypes={ ['application/json'] }
          action={ `${getPrefix()}/class/bulk-import/prepare` }
          onOpenChange={ handleUploadModalClose }
          onUploadSuccess={ handleUploadSuccess }
          open={ modalProps.open }
          showSuccessMessage={ false }
          title={ t('bulk-import.title') }
          uploadButtonLabel={ t('bulk-import.next') }
        />
      )}

      {step === 'select' && (
        <Modal
          footer={ selectFooter }
          limitContentHeight
          onCancel={ handleClose }
          open
          size='L'
          title={ t('bulk-import.title') }
        >
          <Flex
            gap={ 'extra-small' }
            vertical
          >
            <Flex gap='small'>
              <Button
                onClick={ () => {
                  const allItems: BulkImportItem[] = availableItems.map((item) => ({
                    type: item.type,
                    name: item.name
                  }))
                  selectAll(allItems)
                } }
                size='small'
              >
                {t('bulk-import.select-all')}
              </Button>

              <Button
                onClick={ deselectAll }
                size='small'
              >
                {t('bulk-import.deselect-all')}
              </Button>
            </Flex>

            <Space direction='vertical'>
              {sortedTypes.map((type) => (
                <CollapseItem
                  defaultActive
                  key={ type }
                  label={ t(`bulk-import.type.${type}`) }
                  theme='default'
                >
                  <BulkExportItemsTable
                    isSelected={ isSelected }
                    items={ groupedItems[type] }
                    toggleItem={ toggleItem }
                  />
                </CollapseItem>
              ))}
            </Space>
          </Flex>
        </Modal>
      )}
    </>
  )
}
