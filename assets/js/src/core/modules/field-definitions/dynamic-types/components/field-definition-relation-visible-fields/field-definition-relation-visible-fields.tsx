/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { isString } from 'lodash'
import { Form, Select } from '@sdk/components'
import type { RelationVisibleFieldsConfiguration } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import {
  toRelationVisibleFieldsConfiguration,
  useRelationVisibleFieldsOptions
} from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-relation-visible-fields-options'

export interface FieldDefinitionRelationVisibleFieldsProps {
  fieldtype: NonNullable<RelationVisibleFieldsConfiguration['fieldtype']>
}

const splitVisibleFields = (value: unknown): string[] => {
  return isString(value) ? value.split(',').map((name) => name.trim()).filter((name) => name !== '') : []
}

/**
 * The visible fields picker of the generic relation types (many-to-many relation, advanced many-to-many
 * relation). What can be picked follows the allowed element types, classes and asset types of the field
 * settings as they are being edited; the selection is stored as the comma-separated `visibleFields`.
 */
export const FieldDefinitionRelationVisibleFields = ({ fieldtype }: FieldDefinitionRelationVisibleFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const form = Form.useFormInstance()

  const objectsAllowed = Form.useWatch('objectsAllowed', form)
  const classes = Form.useWatch('classes', form)
  const assetsAllowed = Form.useWatch('assetsAllowed', form)
  const assetTypes = Form.useWatch('assetTypes', form)
  const documentsAllowed = Form.useWatch('documentsAllowed', form)
  const documentTypes = Form.useWatch('documentTypes', form)
  const visibleFields = Form.useWatch<string | undefined>('visibleFields', form)

  const configuration = useMemo(
    () => toRelationVisibleFieldsConfiguration(fieldtype, {
      objectsAllowed, classes, assetsAllowed, assetTypes, documentsAllowed, documentTypes
    }),
    [fieldtype, objectsAllowed, classes, assetsAllowed, assetTypes, documentsAllowed, documentTypes]
  )

  const { groupedOptions, availableFieldNames, isLoading, isReady } = useRelationVisibleFieldsOptions(configuration)

  // Like the object relation types: a selected field the current settings no longer offer is dropped.
  useEffect(() => {
    if (!isReady) {
      return
    }

    const selected = splitVisibleFields(visibleFields)
    const kept = selected.filter((name) => availableFieldNames.has(name))

    if (kept.length !== selected.length) {
      form.setFieldValue('visibleFields', kept.join(','))
    }
  }, [isReady, availableFieldNames, visibleFields, form])

  return (
    <Form.Item
      getValueFromEvent={ (value: string[]) => value.join(',') }
      getValueProps={ (value: string | string[] | undefined) => ({
        value: Array.isArray(value) ? value : splitVisibleFields(value)
      }) }
      label={ t('visible-fields') }
      name="visibleFields"
      tooltip={ t('relations.visible-fields.tooltip') }
    >
      <Select
        loading={ isLoading }
        mode="multiple"
        optionFilterProp="label"
        options={ groupedOptions }
        showSearch
      />
    </Form.Item>
  )
}
