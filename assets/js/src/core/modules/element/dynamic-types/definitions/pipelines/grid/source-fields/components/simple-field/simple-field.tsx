/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@Pimcore/components/form/form'
import { usePipelineConfig } from '@Pimcore/components/pipeline/provider/pipeline-config/use-pipeline-config'
import { Select } from '@Pimcore/components/select/select'
import React, { useContext, useEffect, useMemo } from 'react'
import { isArray, isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import { AvailableColumnsContext } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { useItem } from '@Pimcore/components/form/item/provider/item/use-item'
import { useKeyedList } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list'
import { ClassificationStoreValueControl, useClassificationStoreFieldActions } from '../../classification-store/classification-store-value-control'
import { type ClassificationStoreFieldOption, resolveClassificationStoreStoreId } from '../../classification-store/classification-store-field-utils'

interface SimpleFieldOption {
  label: string
  value: string
}

const resolveGroupLabel = (group: unknown, translate: (key: string) => string): string | undefined => {
  if (group === undefined || group === null) {
    return undefined
  }

  let parts: string[] = []

  if (typeof group === 'string') {
    parts = group.split('.')
  } else if (Array.isArray(group)) {
    if (group.length === 0) {
      return undefined
    }

    const firstPath = Array.isArray(group[0]) ? group[0] : group
    parts = (firstPath as unknown[]).map(part => String(part))
  } else {
    return undefined
  }

  const labeledParts = parts.filter(part => part !== '').map(part => translate(part))

  return labeledParts.length > 0 ? labeledParts.join(' / ') : undefined
}

export const DynamicTypePipelineGridSourceFieldsSimpleFieldComponent = (): React.JSX.Element => {
  const { config } = usePipelineConfig()
  const { t } = useTranslation()
  const availableColumnsContext = useContext(AvailableColumnsContext)
  const { name } = useItem()
  const { operations, getValueByKey } = useKeyedList()

  const sourceFieldConfig = config?.simpleField
  if (sourceFieldConfig === undefined) {
    throw new Error('Source field configuration is missing')
  }

  const namePath = useMemo(() => (isArray(name) ? name : [name]), [name])

  // `Form.Item initialValue` IS registered in the keyed-list store on mount
  // (KeyedFormItemControl calls `operations.update(name, initialValue, true)`), but with
  // `isInitialValue: true` KeyedList also folds the value into its own baseline and skips
  // the parent-form propagation — so an untouched pre-selected option never reaches the
  // outer form store and silently disappears from the saved config (see
  // pimcore/platform-version#296). Force-commit the pre-selected first option once via a
  // real (non-initial) `operations.update` call — the same idiom
  // useClassificationStoreFieldActions#clearValue uses to persist a value without an
  // onChange event — so it survives a save even when left unchanged.
  useEffect(() => {
    if (isUndefined(getValueByKey('field')) && !isUndefined(sourceFieldConfig[0]?.key)) {
      operations.update([...namePath, 'field'], sourceFieldConfig[0].key, false)
    }
  }, [])

  const resolveField = (fieldKey: string): { storeId: number } | undefined => {
    const storeId = resolveClassificationStoreStoreId(sourceFieldConfig as ClassificationStoreFieldOption[], fieldKey)

    return storeId === undefined ? undefined : { storeId }
  }

  const { onFieldSelect } = useClassificationStoreFieldActions({ resolveField })

  const sourceFieldOptions = useMemo(() => {
    const groupByKey = new Map<string, string | undefined>()
    for (const column of availableColumnsContext?.availableColumns ?? []) {
      groupByKey.set(String(column.key), resolveGroupLabel(column.group, t))
    }

    const groups = new Map<string, SimpleFieldOption[]>()
    const ungrouped: SimpleFieldOption[] = []

    for (const configOption of sourceFieldConfig) {
      const key = String(configOption.key)
      const option: SimpleFieldOption = {
        label: String(configOption.name),
        value: key
      }
      const groupLabel = groupByKey.get(key)

      if (groupLabel === undefined) {
        ungrouped.push(option)
        continue
      }

      const bucket = groups.get(groupLabel) ?? []
      bucket.push(option)
      groups.set(groupLabel, bucket)
    }

    const groupedOptions = [...groups.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([label, options]) => ({ label, options }))

    return [...groupedOptions, ...ungrouped]
  }, [sourceFieldConfig, availableColumnsContext?.availableColumns, t])

  return (
    <>
      <Form.Item
        label={ t('field') }
        name={ 'field' }
      >
        <Select
          onSelect={ onFieldSelect }
          options={ sourceFieldOptions }
          showSearch
        />
      </Form.Item>

      <ClassificationStoreValueControl resolveField={ resolveField } />
    </>
  )
}
