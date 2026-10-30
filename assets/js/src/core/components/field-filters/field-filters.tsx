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
import { useTranslation } from 'react-i18next'
import { Select } from '../select/select'
import { type FilterOperator } from '../dynamic-filter/filter-operator'
import { useEmptyFilterSupport } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/utils/empty-filter-support'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'

export interface FieldFiltersProps {
  data: IDynamicFilter[]
  onChange?: (data: IDynamicFilter[]) => void
  onCommit?: (data: IDynamicFilter[]) => void
}

const VALUE_MODE = 'value'

export const FieldFilters = ({ data, onChange, onCommit }: FieldFiltersProps): React.JSX.Element => {
  const { t } = useTranslation()
  const emptyFilterSupported = useEmptyFilterSupport()
  const { getType } = useDynamicTypeResolver()
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

  /**
   * Only a filter type of its own knows whether the field can be searched for "no value" and whether it has a value
   * filter next to it. Anything else (or an unknown type) keeps filtering by value only.
   */
  const getOperatorSupport = (filter: IDynamicFilter): { empty: boolean, value: boolean } => {
    if (!emptyFilterSupported) {
      return { empty: false, value: true }
    }

    const fieldFilterType = getType({ target: 'FIELD_FILTER', dynamicTypeIds: [filter.type, filter.frontendType ?? ''] })

    if (!(fieldFilterType instanceof DynamicTypeFieldFilterAbstract)) {
      return { empty: false, value: true }
    }

    return {
      empty: fieldFilterType.isEmptyFilterAvailable(filter.frontendType ?? null),
      value: fieldFilterType.isFilterAvailable(filter.frontendType ?? null)
    }
  }

  const onOperatorChange = (filter: IDynamicFilter, mode: string): void => {
    setData(withUpdatedFilter(filter, { operator: mode === VALUE_MODE ? undefined : mode as FilterOperator }))
  }

  const renderBody = (filter: IDynamicFilter): React.JSX.Element => {
    const dynamicFilter = (
      <DynamicFilter
        { ...filter }
        onChange={ (data) => { onFilterChange(filter, data) } }
        onCommit={ onCommit === undefined ? undefined : (data) => { onFilterCommit(filter, data) } }
      />
    )

    const operatorSupport = getOperatorSupport(filter)

    if (!operatorSupport.empty) {
      return dynamicFilter
    }

    const options = [
      ...(operatorSupport.value ? [{ value: VALUE_MODE, label: t('grid.filter.operator.value') }] : []),
      { value: 'empty', label: t('grid.filter.operator.empty') },
      { value: 'notEmpty', label: t('grid.filter.operator.not-empty') }
    ]

    return (
      <Flex
        gap="extra-small"
        vertical
      >
        <Select
          aria-label={ t('grid.filter.operator.label') }
          onChange={ (mode: string) => { onOperatorChange(filter, mode) } }
          options={ options }
          style={ { width: '100%' } }
          value={ filter.operator ?? VALUE_MODE }
        />

        {filter.operator === undefined && operatorSupport.value && dynamicFilter}
      </Flex>
    )
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
      body: renderBody(filter),
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
            aria-label={ t('remove') }
            icon={ { value: 'close' } }
            key={ 'remove' }
            onClick={ () => { onRemoveClick(filter) } }
            tooltip={ { title: t('remove') } }
          />
        </Flex>
      )
    }
  })

  return useMemo(() => (
    <StackList items={ items } />
  ), [items])
}
