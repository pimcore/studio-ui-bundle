/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { useItem } from '@Pimcore/components/form/item/provider/item/use-item'
import { useKeyedListContext } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-value'
import { usePipelineConfig } from '@Pimcore/components/pipeline/provider/pipeline-config/use-pipeline-config'
import { Select, type SelectProps } from '@Pimcore/components/select/select'
import { usePrevious } from '@Pimcore/utils/hooks/use-previous'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ClassificationStoreValueControl, useClassificationStoreFieldActions, type ResolvedClassificationStoreField } from '../../classification-store/classification-store-value-control'
import { type ClassificationStoreFieldOption, resolveClassificationStoreStoreId } from '../../classification-store/classification-store-field-utils'

export const DynamicTypePipelineGridSourceFieldsRelationFieldComponent = (): React.JSX.Element => {
  const { config } = usePipelineConfig()
  const sourceFieldConfig = config?.relationField
  const { name } = useItem()
  const { operations } = useKeyedListContext()
  const currentRelation = Form.useWatch([...name, 'relation'])
  const prevRelation = usePrevious(currentRelation)
  const { t } = useTranslation()

  // The relation's available fields differ per selected relation, so the classification store
  // descriptor is resolved from the currently selected relation's fields.
  const resolveField = (fieldKey: string): ResolvedClassificationStoreField | undefined => {
    const relation = sourceFieldConfig?.find(configOption => configOption.key === currentRelation)
    const storeId = resolveClassificationStoreStoreId(relation?.fields as ClassificationStoreFieldOption[] | undefined, fieldKey)

    return storeId === undefined ? undefined : { storeId, classId: relation?.classIds?.[0] }
  }

  const { onFieldSelect, clearValue } = useClassificationStoreFieldActions({ resolveField })

  useEffect(() => {
    if (prevRelation !== currentRelation && prevRelation !== undefined) {
      operations.update([...name, 'field'], null, false)
      // The relation changed, so any classification store value picked for the old field is stale.
      clearValue()
    }
  }, [currentRelation, name, operations, prevRelation, clearValue])

  if (sourceFieldConfig === undefined) {
    throw new Error('Source field configuration is missing')
  }

  const sourceFieldOptions = sourceFieldConfig.map(configOption => ({
    label: configOption.name,
    value: configOption.key
  }))

  const relationFieldOptions: SelectProps['options'] = []
  sourceFieldConfig.forEach(configOption => {
    const options: SelectProps['options'] = []

    if (configOption.key === currentRelation) {
      configOption.fields.forEach(field => {
        options.push({
          label: field.name,
          value: field.key
        })
      })
    }

    if (options.length > 0) {
      relationFieldOptions.push(...options)
    }
  })

  return (
    <>
      <Flex
        className="w-full"
        gap="extra-small"
      >
        <Form.Item
          className="w-full"
          label={ t('relation') }
          name={ 'relation' }
        >
          <Select options={ sourceFieldOptions } />
        </Form.Item>

        <Form.Item
          className="w-full"
          label={ t('field') }
          name={ 'field' }
        >
          <Select
            disabled={ relationFieldOptions.length === 0 }
            onSelect={ onFieldSelect }
            options={ relationFieldOptions }
          />
        </Form.Item>
      </Flex>

      <ClassificationStoreValueControl resolveField={ resolveField } />
    </>
  )
}
