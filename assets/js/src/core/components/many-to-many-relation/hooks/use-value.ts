/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { find, isNil, isUndefined } from 'lodash'
import type { DragAndDropInfo } from '@sdk/components'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type IFormatPathItem, useFormatPath } from '@Pimcore/modules/data-object/hooks/use-format-path'
import { useDataObject } from '@Pimcore/modules/data-object/hooks/use-data-object'
import { isValidPathFormatterConfig } from '../utils/path-formatter'
import { flattenValues } from '@Pimcore/components/many-to-many-relation/utils/helpers'
import { mapToLegacyElementType } from '@Pimcore/modules/element/utils/element-type'

export interface ManyToManyRelationValueItem {
  id: number
  type: string
  subtype: string | null
  fullPath: string
  isPublished: boolean | null
}

export interface DisplayManyToManyRelationValueItem extends ManyToManyRelationValueItem {
  originalPath?: string
  originalIndex?: number
  loading?: boolean
}

export type ManyToManyRelationValue = ManyToManyRelationValueItem[]
export type DisplayManyToManyRelationValue = DisplayManyToManyRelationValueItem[]

interface UseValueReturn {
  onDrop: (info: DragAndDropInfo) => void
  deleteItem: (rowIndex: number) => void
  onSearch: (searchTerm: string) => void
  onOrderChange: (data: ManyToManyRelationValue) => void
  addItems: (items: ManyToManyRelationValueItem[]) => void
  addAssets: (assets: Asset[]) => Promise<void>
  updateDisplayValue: (value: ManyToManyRelationValue | null) => void
  getOriginalIndex: (displayedRowIndex: number) => number
  maxRemainingItems?: number
  pathFormatterConfig?: object
  hasActiveSearch: boolean
}

export const useValue = (
  value: ManyToManyRelationValue | null,
  setValue: (value: ManyToManyRelationValue | null) => void,
  displayedValue: DisplayManyToManyRelationValue | null,
  setDisplayedValue: (value: DisplayManyToManyRelationValue | null) => void,
  maxItems: number | null,
  allowMultipleAssignments?: boolean,
  pathFormatterConfig?: { name: string | undefined, class: string | undefined },
  visibleFieldsValue?: Array<Record<string, any> | undefined>
): UseValueReturn => {
  const { id: dataObjectId } = useDataObject()
  const { formatPath, hasUncachedItems } = useFormatPath()
  const modal = useAlertModal()

  const currentSearchTerm = useRef<string>('')

  const { t } = useTranslation()

  const validatePathFormatting = (
    value: ManyToManyRelationValue | null,
    config: { name?: string, class?: string } | undefined
  ): { value: ManyToManyRelationValue, config: { name: string, class: string }, dataObjectId: number } | false => {
    if (!isValidPathFormatterConfig(config) || value === null || dataObjectId === undefined) {
      return false
    }
    return { value, config, dataObjectId }
  }

  const updateDisplayValueAsync = async (value: ManyToManyRelationValue | null): Promise<void> => {
    const validParams = validatePathFormatting(value, pathFormatterConfig)
    if (validParams === false) {
      const filteredValue = value === null ? null : applySearchFilter(value, currentSearchTerm.current)
      setDisplayedValue(filteredValue)
      return
    }

    const cachedData = await formatPath(validParams.value as IFormatPathItem[], validParams.config.name, validParams.dataObjectId, true)

    const updatedItems = applyFormattingWithLoadingState(validParams.value, cachedData)
    const filteredUpdatedItems = applySearchFilter(updatedItems, currentSearchTerm.current)
    setDisplayedValue(filteredUpdatedItems)

    if (hasUncachedItems(validParams.value as IFormatPathItem[], validParams.config.name, validParams.dataObjectId)) {
      const allData = await formatPath(validParams.value as IFormatPathItem[], validParams.config.name, validParams.dataObjectId, false)
      if (allData !== undefined) {
        const allFormattedItems = getUpdatedDisplayedValue(validParams.value, mapNewValues(validParams.value, allData))
        const filteredAllItems = applySearchFilter(allFormattedItems, currentSearchTerm.current)
        setDisplayedValue(filteredAllItems)
      }
    }
  }

  const updateDisplayValue = (value: ManyToManyRelationValue | null): void => {
    updateDisplayValueAsync(value).catch(error => {
      console.error('Error formatting path:', error)
    })
  }

  useEffect(() => {
    if (validatePathFormatting(displayedValue, pathFormatterConfig) === false) {
      return
    }
    updateDisplayValue(displayedValue)
  }, [])

  const itemIsInValue = (id: number, type: string): boolean => {
    return value?.some(item => item.id === id && item.type === type) ?? false
  }

  function mapNewValues (value: ManyToManyRelationValue, data: { items: Array<{ objectReference: string | number, formatedPath: string | number }> }): DisplayManyToManyRelationValue {
    return value.map((item): DisplayManyToManyRelationValueItem => ({
      ...item,
      originalPath: item.fullPath,
      fullPath: String(data.items.find(i => String(i.objectReference) === `${item.type}_${item.id}`)?.formatedPath ?? item.fullPath)
    }))
  }

  function applySearchFilter (items: DisplayManyToManyRelationValue, searchTerm: string): DisplayManyToManyRelationValue {
    if (searchTerm === '') return items

    const normalizedSearch = searchTerm.toLowerCase()
    const hasVisibleFields = !isNil(visibleFieldsValue)

    return items
      .map((item, originalIndex): DisplayManyToManyRelationValueItem => ({ ...item, originalIndex }))
      .filter((item: DisplayManyToManyRelationValueItem) => {
        let matched: boolean | undefined = false

        if (hasVisibleFields) {
          const visibleItem = find(visibleFieldsValue, (visibleField) => visibleField?.id === item.id)

          if (!isUndefined(visibleItem)) {
            matched = Object.values(visibleItem).some((val) =>
              flattenValues(val).some((str) => str.toLowerCase().includes(normalizedSearch))
            )
          }
        }

        if (!matched) {
          matched =
            item.fullPath.toLowerCase().includes(normalizedSearch) ||
            item.id.toString().includes(searchTerm) ||
            item.type.toLowerCase().includes(normalizedSearch) ||
            item.subtype?.toLowerCase().includes(normalizedSearch)
        }

        return matched
      })
  }

  function applyFormattingWithLoadingState (
    items: ManyToManyRelationValue,
    cachedData?: { items: Array<{ objectReference: string | number, formatedPath: string | number }> }
  ): DisplayManyToManyRelationValue {
    return items.map((item): DisplayManyToManyRelationValueItem => {
      const objectReference = `${item.type}_${item.id}`
      const cachedItem = cachedData?.items.find(cached => String(cached.objectReference) === objectReference)

      return {
        ...item,
        originalPath: item.fullPath,
        fullPath: String(cachedItem?.formatedPath ?? item.fullPath),
        loading: isNil(cachedItem)
      }
    })
  }

  function getUpdatedDisplayedValue (
    items: ManyToManyRelationValue | null,
    newValues: DisplayManyToManyRelationValue
  ): DisplayManyToManyRelationValue {
    if (items === null) return []
    return items.map((item): DisplayManyToManyRelationValueItem => {
      const updatedItem = newValues.find(newItem => newItem.id === item.id)
      return {
        ...item,
        originalPath: item.fullPath,
        fullPath: updatedItem?.fullPath ?? item.fullPath,
        loading: false
      }
    })
  }

  const addItems = (items: ManyToManyRelationValueItem[]): void => {
    const newItems = allowMultipleAssignments !== true
      ? items.filter(item => !itemIsInValue(item.id, item.type))
      : items

    const newValue = [...value ?? [], ...newItems]
    setValue(newValue)

    updateDisplayValue(newValue)
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
        type: mapToLegacyElementType(info.type),
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
    const originalIndex = getOriginalIndex(rowIndex)
    const filterFunction = (item: ManyToManyRelationValueItem, _index: number): boolean => _index !== originalIndex
    setValue(value === null ? null : value.filter(filterFunction))
    updateDisplayValue(value === null ? null : value.filter(filterFunction))
  }

  const onSearch = (searchTerm: string): void => {
    currentSearchTerm.current = searchTerm
    updateDisplayValue(value)
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
    updateDisplayValue(data)
  }

  const getOriginalIndex = (displayedRowIndex: number): number => {
    const displayedItem = displayedValue?.[displayedRowIndex]
    return displayedItem?.originalIndex ?? displayedRowIndex
  }

  const maxRemainingItems = maxItems === null ? undefined : Math.max(maxItems - (value?.length ?? 0), 0)

  return {
    onDrop,
    deleteItem,
    onSearch,
    onOrderChange,
    addItems,
    addAssets,
    updateDisplayValue,
    getOriginalIndex,
    maxRemainingItems,
    hasActiveSearch: (value?.length ?? 0) !== (displayedValue?.length ?? 0)
  }
}
