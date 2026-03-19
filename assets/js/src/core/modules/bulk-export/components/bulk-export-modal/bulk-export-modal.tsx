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
import { downloadFile } from '@Pimcore/modules/app/utils/download'
import { useClassBulkExportAvailableQuery, useClassBulkExportMutation, type BulkExportAvailableItem } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { theme } from 'antd'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BulkExportItemsTable } from './components/bulk-export-items-table'
import { type BulkExportItem } from './context/bulk-export-context'

interface BulkExportModalProps extends Omit<IModalProps, 'children'> {
  onClose?: () => void
  selectedItems: BulkExportItem[]
  selectAll: (items: BulkExportItem[]) => void
  deselectAll: () => void
  toggleItem: (type: string, name: string) => void
  isSelected: (type: string, name: string) => boolean
  closeModal: () => void
}

export const BulkExportModal = (props: BulkExportModalProps): React.JSX.Element => {
  const { selectedItems, selectAll, deselectAll, toggleItem, isSelected, closeModal, ...modalProps } = props
  const { t } = useTranslation()
  const { token } = theme.useToken()
  const { data, isLoading } = useClassBulkExportAvailableQuery()
  const [triggerExport, { isLoading: isExporting }] = useClassBulkExportMutation()

  const groupedItems = useMemo(() => {
    if (data?.items === undefined) return {}

    return data.items.reduce<Record<string, BulkExportAvailableItem[]>>((groups, item) => {
      const group = groups[item.type] ?? []
      group.push(item)
      groups[item.type] = group
      return groups
    }, {})
  }, [data])

  const allItems = useMemo((): BulkExportItem[] => {
    if (data?.items === undefined) return []
    return data.items.map((item) => ({ type: item.type, name: item.name }))
  }, [data])

  useEffect(() => {
    if (allItems.length > 0 && selectedItems.length === 0) {
      selectAll(allItems)
    }
  }, [allItems])

  const handleSelectAll = (): void => {
    selectAll(allItems)
  }

  const handleDeselectAll = (): void => {
    deselectAll()
  }

  const handleExport = async (): Promise<void> => {
    try {
      const result = await triggerExport({
        bulkExportParameters: {
          items: selectedItems
        }
      })

      if (!('data' in result)) {
        throw new GeneralError('Bulk export failed')
      }

      const blob = result.data instanceof Blob ? result.data : new Blob([JSON.stringify(result.data)], { type: 'application/json' })
      downloadFile('bulk-export.json', blob)

      closeModal()
    } catch {
      throw new GeneralError('Bulk export failed')
    }
  }

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

  const footer = (
    <ModalFooter>
      <Button
        onClick={ modalProps.onCancel as React.MouseEventHandler }
      >
        {t('bulk-export.cancel')}
      </Button>

      <Button
        disabled={ selectedItems.length === 0 || isExporting }
        loading={ isExporting }
        onClick={ handleExport }
        type='primary'
      >
        {t('bulk-export.export')}
      </Button>
    </ModalFooter>
  )

  return (
    <Modal
      { ...modalProps }
      footer={ footer }
      limitContentHeight
      size='L'
      title={ t('bulk-export.title') }
    >
      {isLoading && (
        <Flex
          align='center'
          justify='center'
          style={ { padding: `${token.paddingXL}px 0` } }
        >
          <Spin asContainer />
        </Flex>
      )}

      {!isLoading && (
        <Flex
          gap={ 'extra-small' }
          vertical
        >
          <Flex
            gap='small'
          >
            <Button
              onClick={ handleSelectAll }
              size='small'
            >
              {t('bulk-export.select-all')}
            </Button>

            <Button
              onClick={ handleDeselectAll }
              size='small'
            >
              {t('bulk-export.deselect-all')}
            </Button>
          </Flex>

          <Space
            direction='vertical'
          >
            {sortedTypes.map((type) => (
              <CollapseItem
                defaultActive
                key={ type }
                label={ t(`bulk-export.type.${type}`) }
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
