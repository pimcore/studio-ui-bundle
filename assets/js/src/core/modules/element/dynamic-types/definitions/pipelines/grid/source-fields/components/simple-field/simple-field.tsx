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
import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AvailableColumnsContext } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
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

  const sourceFieldConfig = config?.simpleField
  if (sourceFieldConfig === undefined) {
    throw new Error('Source field configuration is missing')
  }

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
        initialValue={ sourceFieldConfig[0]?.key }
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
