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
import { Spin } from '@Pimcore/components/spin/spin'
import { GeneralError } from '@Pimcore/modules/app/error-handler'
import {
  useClassBulkImportPrepareMutation,
  useClassBulkImportMutation,
  type BulkExportAvailableItem
} from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { useExecutionEngine } from '@Pimcore/modules/execution-engine/hooks/use-execution-engine'
import { theme } from 'antd'
import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BulkImportItemsTable } from './components/bulk-import-items-table'
import { BulkImportUploadStep } from './components/bulk-import-upload-step'
import { type BulkImportItem } from './context/bulk-import-context'
import { BulkImportJob } from '../../jobs/bulk-import-job'
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
  const { token } = theme.useToken()

  const [step, setStep] = useState<Step>('upload')
  const [fileId, setFileId] = useState<string | null>(null)
  const [availableItems, setAvailableItems] = useState<BulkExportAvailableItem[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [triggerPrepare, { isLoading: isPreparing }] = useClassBulkImportPrepareMutation()
  const [, { isLoading: isImporting }] = useClassBulkImportMutation()
  const executionEngine = useExecutionEngine()

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

  const handleUpload = async (): Promise<void> => {
    if (isNil(selectedFile)) return

    try {
      const result = await triggerPrepare({ body: { file: selectedFile as unknown as Blob } })

      if (!('data' in result) || isNil(result.data)) {
        throw new GeneralError('Bulk import prepare failed')
      }

      const { fileId: newFileId, items } = result.data
      setFileId(newFileId)
      setAvailableItems(items)

      const allItems: BulkImportItem[] = items.map((item) => ({ type: item.type, name: item.name }))
      selectAll(allItems)

      setStep('select')
    } catch {
      throw new GeneralError('Bulk import prepare failed')
    }
  }

  const handleImport = async (): Promise<void> => {
    if (isNil(fileId)) return

    const job = new BulkImportJob({
      fileId,
      items: selectedItems,
      title: t('bulk-import.job-title'),
      onFinish: () => {
        // Job finished — file cleanup is handled inside BulkImportJob
      }
    })

    void executionEngine.runJob(job)
    closeModal()
  }

  const resetState = (): void => {
    setStep('upload')
    setFileId(null)
    setAvailableItems([])
    deselectAll()
    setSelectedFile(null)
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
        onClick={ handleUpload }
        type='primary'
      >
        {t('bulk-import.next')}
      </Button>
    </ModalFooter>
  )

  const selectFooter = (
    <ModalFooter>
      <Button
        disabled={ isPreparing || isImporting }
        onClick={ handleBack }
      >
        {t('bulk-import.back')}
      </Button>

      <Button
        disabled={ selectedItems.length === 0 || isImporting }
        loading={ isImporting }
        onClick={ handleImport }
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
      onCancel={ handleClose }
      size='L'
      styles={ { body: { maxHeight: '60vh', overflowY: 'auto' } } }
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
        <>
          {availableItems.length === 0 && (
            <Flex
              align='center'
              justify='center'
              style={ { padding: `${token.paddingXL}px 0` } }
            >
              <Spin asContainer />
            </Flex>
          )}

          {availableItems.length > 0 && (
            <Flex
              gap={ 'extra-small' }
              vertical
            >
              <Flex gap='small'>
                <Button
                  onClick={ () => {
                    const allItems: BulkImportItem[] = availableItems.map((item) => ({ type: item.type, name: item.name }))
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
                    <BulkImportItemsTable
                      isSelected={ isSelected }
                      items={ groupedItems[type] }
                      toggleItem={ toggleItem }
                    />
                  </CollapseItem>
                ))}
              </Space>
            </Flex>
          )}
        </>
      )}
    </Modal>
  )
}
