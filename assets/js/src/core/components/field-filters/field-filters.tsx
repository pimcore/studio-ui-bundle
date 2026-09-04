/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useState } from 'react'
import { type IDynamicFilter } from '../dynamic-filter/provider/dynamic-filter-provider'
import { StackList, type StackListProps } from '../stack-list/stack-list'
import { DynamicFilter } from '../dynamic-filter/dynamic-filter'
import { IconButton } from '../icon-button/icon-button'
import { Tag } from '../tag/tag'
import { Flex } from '../flex/flex'
import { Tooltip } from '../tooltip/tooltip'
import { PermissionBasedLanguageSelectionControl } from '@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control'

export interface FieldFiltersProps {
  data: IDynamicFilter[]
  onChange?: (data: IDynamicFilter[]) => void
  onCommit?: (data: IDynamicFilter[]) => void
}

export const FieldFilters = ({ data, onChange, onCommit }: FieldFiltersProps): React.JSX.Element => {
  const [_data, _setData] = useState(data)

  const setData = (data: IDynamicFilter[]): void => {
    _setData(data)

    if (onChange !== undefined) {
      onChange(data)
    }
  }

  useEffect(() => {
    _setData(data)
  }, [data])

  /**
   * Classification store filters share one id across groups and keys, so they are only
   * identified together with their config; every other type is unique by id alone.
   */
  const isSameFilter = (candidate: IDynamicFilter, filter: IDynamicFilter): boolean => {
    if (filter.type === 'dataobject.classificationstore') {
      return candidate.id === filter.id &&
        candidate.config?.keyId === filter.config?.keyId &&
        candidate.config?.groupId === filter.config?.groupId
    }

    return candidate.id === filter.id
  }

  const withUpdatedFilter = (filter: IDynamicFilter, changes: Partial<IDynamicFilter>): IDynamicFilter[] => {
    const index = _data.findIndex((f) => isSameFilter(f, filter))
    const updatedData = [..._data]
    updatedData[index] = { ...updatedData[index], ...changes }

    return updatedData
  }

  const onFilterChange = (filter: IDynamicFilter, data: any): void => {
    setData(withUpdatedFilter(filter, { data }))
  }

  const onFilterCommit = (filter: IDynamicFilter, data: any): void => {
    const updatedData = withUpdatedFilter(filter, { data })
    setData(updatedData)

    if (onCommit !== undefined) {
      onCommit(updatedData)
    }
  }

  const onLanguageSelectionChanged = (filter: IDynamicFilter, locale: string | null): void => {
    setData(withUpdatedFilter(filter, { locale }))
  }

  const onRemoveClick = (filter: IDynamicFilter): void => {
    setData(_data.filter((f) => !isSameFilter(f, filter)))
  }

  const items: StackListProps['items'] = _data.map((filter) => {
    let key = filter.id

    const isClassificationStore = filter.type === 'dataobject.classificationstore'

    if (isClassificationStore) {
      key = `${filter.id}-${JSON.stringify({ keyId: filter.config.keyId, groupId: filter.config?.groupId })}`
    }

    return {
      id: filter.id,
      key,
      title: filter.id,
      children: <Tooltip title={ filter.nameTooltip }>
        <Tag>{filter.translationKey}</Tag>
      </Tooltip>,
      body: (
        <DynamicFilter
          { ...filter }
          onChange={ (data) => { onFilterChange(filter, data) } }
          onCommit={ onCommit === undefined ? undefined : (data) => { onFilterCommit(filter, data) } }
        />
      ),
      renderRightToolbar: (
        <Flex gap="mini">
          {filter.localizable === true && (
            <PermissionBasedLanguageSelectionControl
              customKeys={ isClassificationStore ? ['default'] : [] }
              isNullable
              key={ 'language' }
              onChange={ (locale) => { onLanguageSelectionChanged(filter, locale) } }
              value={ filter.locale === undefined ? null : filter.locale }
            />
          )}
          <IconButton
            icon={ { value: 'close' } }
            key={ 'remove' }
            onClick={ () => { onRemoveClick(filter) } }
          />
        </Flex>
      )
    }
  })

  return useMemo(() => (
    <StackList items={ items } />
  ), [items])
}
