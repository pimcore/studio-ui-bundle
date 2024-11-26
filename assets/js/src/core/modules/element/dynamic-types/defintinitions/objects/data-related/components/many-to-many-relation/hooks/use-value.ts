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

export interface ManyToManyRelationValueItem {
  id: number
  type: string
  subType: string | null
  fullPath: string
  published: boolean
}

export type ManyToManyRelationValue = ManyToManyRelationValueItem[]

interface UseValueReturn {
  onDrop: (info: DragAndDropInfo) => void
  deleteItem: (id: number, type: string) => void
  onSearch: (searchTerm: string) => void
}

export const useValue = (
  value: ManyToManyRelationValue | null,
  setValue: (value: ManyToManyRelationValue | null) => void,
  displayedValue: ManyToManyRelationValue | null,
  setDisplayedValue: (value: ManyToManyRelationValue | null) => void,
  maxItems: number | null
): UseValueReturn => {
  const modal = useAlertModal()
  const { t } = useTranslation()
  const itemIsInValue = (id: number, type: string): boolean => {
    return value?.some(item => item.id === id && item.type === type) ?? false
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
        type: info.type,
        subType: info.data.className ?? info.data.type,
        published: info.data.published,
        fullPath: info.data.fullPath
      }
    } else if (info.type === 'asset') {
      newValue = {
        id: info.data.id,
        type: info.type,
        subType: info.data.type,
        published: info.data.published,
        fullPath: info.data.fullPath
      }
    }

    if (newValue === undefined) {
      return
    }

    setValue([
      ...value ?? [],
      newValue
    ])

    setDisplayedValue([
      ...displayedValue ?? [],
      newValue
    ])
  }

  const deleteItem = (id: number, type: string): void => {
    const filterFunction = (item: ManyToManyRelationValueItem): boolean => item.id !== id || item.type !== type
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
        (item.subType !== null && item.subType.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    setDisplayedValue(filteredValue as ManyToManyRelationValue)
  }

  return {
    onDrop,
    deleteItem,
    onSearch
  }
}
