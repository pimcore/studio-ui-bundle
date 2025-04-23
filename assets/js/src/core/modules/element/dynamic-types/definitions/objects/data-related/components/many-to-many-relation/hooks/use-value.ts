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

import type { DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { useTranslation } from 'react-i18next'
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice-enhanced'

export interface ManyToManyRelationValueItem {
  id: number
  type: string
  subtype: string | null
  fullPath: string
  isPublished: boolean | null
}

export type ManyToManyRelationValue = ManyToManyRelationValueItem[]

interface UseValueReturn {
  onDrop: (info: DragAndDropInfo) => void
  deleteItem: (rowIndex: number) => void
  onSearch: (searchTerm: string) => void
  addItems: (items: ManyToManyRelationValueItem[]) => void
  addAssets: (assets: Asset[]) => Promise<void>
  maxRemainingItems?: number
}

export const useValue = (
  value: ManyToManyRelationValue | null,
  setValue: (value: ManyToManyRelationValue | null) => void,
  displayedValue: ManyToManyRelationValue | null,
  setDisplayedValue: (value: ManyToManyRelationValue | null) => void,
  maxItems: number | null,
  allowMultipleAssignments?: boolean
): UseValueReturn => {
  const modal = useAlertModal()
  const { t } = useTranslation()
  const itemIsInValue = (id: number, type: string): boolean => {
    return value?.some(item => item.id === id && item.type === type) ?? false
  }

  const addItems = (items: ManyToManyRelationValueItem[]): void => {
    const newItems = allowMultipleAssignments !== true
      ? items.filter(item => !itemIsInValue(item.id, item.type))
      : items

    setValue([
      ...value ?? [],
      ...newItems
    ])

    setDisplayedValue([
      ...displayedValue ?? [],
      ...newItems
    ])
  }

  const addItem = (item: ManyToManyRelationValueItem): void => {
    addItems([item])
  }

  const onDrop = (info: DragAndDropInfo): void => {
    if (itemIsInValue(info.data.id as number, info.type)) {
      return
    }

    if (maxItems !== null && value !== null && value.length >= maxItems) {
      modal.warn({
        content: t('items-limit-reached', { maxItems })
      })
      return
    }

    let newValue: ManyToManyRelationValueItem | undefined

    if (info.type === 'data-object') {
      newValue = {
        id: info.data.id,
        type: 'object',
        subtype: info.data.className ?? info.data.type,
        isPublished: info.data.published,
        fullPath: info.data.fullPath
      }
    } else if (info.type === 'asset') {
      newValue = {
        id: info.data.id,
        type: info.type,
        subtype: info.data.type,
        isPublished: null,
        fullPath: info.data.fullPath
      }
    }

    if (newValue === undefined) {
      return
    }

    addItem(newValue)
  }

  const deleteItem = (rowIndex: number): void => {
    const filterFunction = (item: ManyToManyRelationValueItem, _index: number): boolean => _index !== rowIndex
    setValue(value === null ? null : value.filter(filterFunction))
    setDisplayedValue(displayedValue === null ? null : displayedValue.filter(filterFunction))
  }

  const onSearch = (searchTerm: string): void => {
    if (searchTerm === '') {
      setDisplayedValue(value)
      return
    }

    if (value === null) {
      return
    }

    const filteredValue = value.filter((item: ManyToManyRelationValueItem) =>
      item.fullPath.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().includes(searchTerm) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subtype?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setDisplayedValue(filteredValue as ManyToManyRelationValue)
  }

  const addAssets = async (assets: Asset[]): Promise<void> => {
    const items = assets.map((asset): ManyToManyRelationValueItem => ({
      id: asset.id,
      type: 'asset',
      subtype: asset.type ?? null,
      isPublished: null,
      fullPath: asset.fullPath ?? ''
    }))

    addItems(items)
  }

  const maxRemainingItems = maxItems === null ? undefined : Math.max(maxItems - (value?.length ?? 0), 0)

  return {
    onDrop,
    deleteItem,
    onSearch,
    addItems,
    addAssets,
    maxRemainingItems
  }
}
