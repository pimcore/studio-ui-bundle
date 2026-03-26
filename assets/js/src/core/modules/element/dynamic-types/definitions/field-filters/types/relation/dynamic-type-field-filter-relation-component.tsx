/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { Select } from '@Pimcore/components/select/select'
import { ManyToManyRelation } from '@Pimcore/components/many-to-many-relation/many-to-many-relation'
import { type ManyToManyRelationValue, type ManyToManyRelationValueItem } from '@Pimcore/components/many-to-many-relation/hooks/use-value'

export type RelationFilterEntry = { type: 'asset' | 'object' | 'document', ids: number[] }
export type RelationFilterValue = RelationFilterEntry[] | null

const TYPE_OPTIONS = [
  { label: 'Asset', value: 'asset' },
  { label: 'Object', value: 'object' },
  { label: 'Document', value: 'document' }
]

export const DynamicTypeFieldFilterRelationComponent = (): React.JSX.Element => {
  const { setData, data } = useDynamicFilter()
  const filterValue = data as RelationFilterValue
  const firstEntry = Array.isArray(filterValue) ? filterValue[0] : null

  const [selectedType, setSelectedType] = useState<'asset' | 'object' | 'document'>(firstEntry?.type ?? 'object')
  const [items, setItems] = useState<ManyToManyRelationValue>([])

  useEffect(() => {
    if (filterValue == null || filterValue.length === 0) {
      setItems([])
    }
  }, [data])

  const handleTypeChange = (type: 'asset' | 'object' | 'document'): void => {
    setSelectedType(type)
    setItems([])
    setData(null)
  }

  const handleRelationChange = (value?: ManyToManyRelationValue | null): void => {
    const newItems = value ?? []
    setItems(newItems)
    if (newItems.length === 0) {
      setData(null)
    } else {
      setData([{ type: selectedType, ids: newItems.map((item: ManyToManyRelationValueItem) => item.id) }])
    }
  }

  return (
    <div style={ { display: 'flex', flexDirection: 'column', gap: 8 } }>
      <Select
        onChange={ handleTypeChange }
        options={ TYPE_OPTIONS }
        style={ { width: '100%' } }
        value={ selectedType }
      />
      <ManyToManyRelation
        allowToClearRelation={ true }
        assetsAllowed={ selectedType === 'asset' }
        dataObjectsAllowed={ selectedType === 'object' }
        documentsAllowed={ selectedType === 'document' }
        height={ 150 }
        maxItems={ null }
        onChange={ handleRelationChange }
        pathFormatterClass={ null }
        value={ items }
        width={ null }
      />
    </div>
  )
}
