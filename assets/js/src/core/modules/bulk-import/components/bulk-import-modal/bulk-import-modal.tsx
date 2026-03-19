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
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Modal, type IModalProps } from '@Pimcore/components/modal/modal'
import { Space } from '@Pimcore/components/space/space'
import { type BulkExportAvailableItem } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { BulkExportItemsTable } from '@Pimcore/modules/bulk-export/components/bulk-export-modal/components/bulk-export-items-table'
import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BulkImportUploadStep } from './components/bulk-import-upload-step'
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const { fileId, availableItems, isPreparing, handleUpload, handleImport, reset } = useBulkImport()

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

  const onUpload = async (): Promise<void> => {
    if (isNil(selectedFile)) return

    const { items } = await handleUpload(selectedFile)
    const allItems: BulkImportItem[] = items.map((item) => ({ type: item.type, name: item.name }))
    selectAll(allItems)
    setStep('select')
  }

  const onImport = (): void => {
    if (isNil(fileId)) return

    handleImport(fileId, selectedItems, t('bulk-import.job-title'))
    closeModal()
  }

  const resetState = (): void => {
    setStep('upload')
    setSelectedFile(null)
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

  const uploadFooter = (
    <ModalFooter>
      <Button onClick={ handleClose }>
        {t('bulk-import.cancel')}
      </Button>

      <Button
        disabled={ isNil(selectedFile) || isPreparing }
        loading={ isPreparing }
        onClick={ onUpload }
        type='primary'
      >
        {t('bulk-import.next')}
      </Button>
    </ModalFooter>
  )

  const selectFooter = (
    <ModalFooter>
      <Button
        disabled={ isPreparing }
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
    <Modal
      { ...modalProps }
      footer={ step === 'upload' ? uploadFooter : selectFooter }
      limitContentHeight
      onCancel={ handleClose }
      size='L'
      title={ t('bulk-import.title') }
    >
      {step === 'upload' && (
        <BulkImportUploadStep
          isPreparing={ isPreparing }
          onFileSelect={ setSelectedFile }
          selectedFile={ selectedFile }
        />
      )}

      {step === 'select' && (
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
      )}
    </Modal>
  )
}
