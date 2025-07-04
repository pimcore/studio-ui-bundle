/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { DragAndDropInfo } from '@sdk/components'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { useTranslation } from 'react-i18next'
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useEffect } from 'react'
import { useDataObjectHelper } from '@Pimcore/modules/data-object/hooks/use-data-object-helper'
import { useDataObject } from '@Pimcore/modules/data-object/hooks/use-data-object'

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
  onOrderChange: (data: ManyToManyRelationValue) => void
  addItems: (items: ManyToManyRelationValueItem[]) => void
  addAssets: (assets: Asset[]) => Promise<void>
  maxRemainingItems?: number
  pathFormatterConfig?: object
}

export const useValue = (
  value: ManyToManyRelationValue | null,
  setValue: (value: ManyToManyRelationValue | null) => void,
  displayedValue: ManyToManyRelationValue | null,
  setDisplayedValue: (value: ManyToManyRelationValue | null) => void,
  maxItems: number | null,
  allowMultipleAssignments?: boolean,
  pathFormatterConfig?: { name: string | undefined, class: string | undefined }
): UseValueReturn => {
  const { id: dataObjectId } = useDataObject()
  const { formatPath } = useDataObjectHelper()
  const modal = useAlertModal()

  const { t } = useTranslation()
  const itemIsInValue = (id: number, type: string): boolean => {
    return value?.some(item => item.id === id && item.type === type) ?? false
  }

  function mapNewValues (value: ManyToManyRelationValue, data: { items: Array<{ objectReference: string, formatedPath: string }> }): ManyToManyRelationValue {
    return value.map((item) => ({
      ...item,
      fullPath: data.items.find(i => i.objectReference === `object_${item.id}`)?.formatedPath ?? item.fullPath
    }))
  }

  function getNewItems (): ManyToManyRelationValue {
    return value?.filter(item =>
      !(Array.isArray(displayedValue) && displayedValue.some(displayedItem => displayedItem.id === item.id && displayedItem.fullPath !== item.fullPath))
    ) ?? []
  }

  useEffect(() => {
    if (pathFormatterConfig?.name == null || value === null || dataObjectId === undefined) {
      return
    }

    // compare displayedValue and value to get the new one
    const newItems = getNewItems()
    const loadingValue: ManyToManyRelationValue = displayedValue !== null
      ? displayedValue.map(item => ({
        ...item,
        fullPath: item.fullPath,
        loading: newItems.filter((newItem) => newItem.id === item.id).length > 0
      })
      )
      : []

    setDisplayedValue(loadingValue)

    formatPath(newItems, pathFormatterConfig.name, dataObjectId).then((data) => {
      if (data === undefined) return
      const newValues = mapNewValues(newItems, data)

      if (displayedValue === null) {
        return
      }

      const updatedDisplayedValue = displayedValue.map(item => {
        const updatedItem = newValues.find(newItem => newItem.id === item.id)
        return {
          ...item,
          fullPath: updatedItem?.fullPath ?? item.fullPath,
          loading: false
        }
      })
      setDisplayedValue(updatedDisplayedValue)
    }).catch(error => { console.error(error) })
  }, [value])

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
    } else if (info.type === 'document') {
      newValue = {
        id: info.data.id,
        type: info.type,
        subtype: info.data.type,
        isPublished: info.data.published,
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

  const onOrderChange = (data: ManyToManyRelationValue): void => {
    setValue(data)
    setDisplayedValue(data)
  }

  const maxRemainingItems = maxItems === null ? undefined : Math.max(maxItems - (value?.length ?? 0), 0)

  return {
    onDrop,
    deleteItem,
    onSearch,
    onOrderChange,
    addItems,
    addAssets,
    maxRemainingItems
  }
}
