/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinitionAbstractFormFieldsProps } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { Form, Input, InputNumber, Switch, TextArea } from '@sdk/components'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { OperationalGrid } from '@Pimcore/components/operational-grid/operational-grid'
import { isArray, isNumber } from 'lodash'
import { type ColumnDef } from '@tanstack/react-table'

interface ColumnConfigItem {
  key: string | number
  label: string
}

export const FieldDefinitionTableFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')

  // form instance and watched values
  const form = Form.useFormInstance()
  const cols = Form.useWatch<number | null>('cols') ?? 0
  const colsFixed = Form.useWatch<boolean>('colsFixed') ?? false
  const columnConfigActivated = Form.useWatch<boolean>('columnConfigActivated') ?? false
  const columnConfig = Form.useWatch<ColumnConfigItem[]>('columnConfig') ?? []

  const gridColumns = useMemo<Array<ColumnDef<ColumnConfigItem>>>(() => [
    { id: 'key', header: t('key'), accessorKey: 'key' },
    { id: 'label', header: t('label'), accessorKey: 'label' }
  ], [t])

  const ensureColumnConfigSize = (count: number): void => {
    const current = isArray(columnConfig) ? [...columnConfig] : []
    const parsed = isNumber(count) ? count : 0
    const desired = Math.max(0, parsed)

    if (current.length < desired) {
      for (let i = current.length; i < desired; i++) {
        current.push({ key: i, label: String(i) })
      }
    } else if (current.length > desired) {
      current.splice(desired)
    }

    form.setFieldValue('columnConfig', current)
  }

  return (
    <>
      <Form.Item
        label={ t('width') }
        name="width"
        tooltip={ t('width-tooltip') }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('height') }
        name="height"
        tooltip={ t('height-tooltip') }
      >
        <Input />
      </Form.Item>

      {!isCustomLayout && (
        <>
          <Form.Item
            label={ t('rows') }
            name="rows"
          >
            <InputNumber
              min={ 0 }
              precision={ 0 }
            />
          </Form.Item>

          <Form.Item name="rowsFixed">
            <Switch labelRight={ t('rows-fixed') } />
          </Form.Item>

          <Form.Item
            label={ t('cols') }
            name="cols"
          >
            <InputNumber
              min={ 0 }
              onChange={ (value) => { if (columnConfigActivated && !isCustomLayout) ensureColumnConfigSize(Number(value ?? 0)) } }
              precision={ 0 }
            />
          </Form.Item>

          <Form.Item name="colsFixed">
            <Switch
              labelRight={ t('cols-fixed') }
              onChange={ (checked: boolean) => {
                if (!checked) {
                  form.setFieldValue('columnConfigActivated', false)
                }
              } }
            />
          </Form.Item>

          {!isCustomLayout && colsFixed && (
            <Form.Item name="columnConfigActivated">
              <Switch
                labelRight={ t('activate-column-configuration') }
                onChange={ (checked: boolean) => {
                  if (checked) {
                    ensureColumnConfigSize(cols)
                  }
                } }
              />
            </Form.Item>
          )}

          {!isCustomLayout && columnConfigActivated && (
          <Form.Item
            name="columnConfig"
            valuePropName="value"
          >
            <OperationalGrid
              columns={ gridColumns }
              enableMultipleRowSelection={ false }
              enableRowSelection={ false }
              onChange={ (value) => { form.setFieldValue('columnConfig', value) } }
              value={ columnConfig }
            >
              <OperationalGrid.Grid />
            </OperationalGrid>
          </Form.Item>
          )}

          <Form.Item
            label={ t('data') }
            name="data"
            tooltip={ t('table-data-tooltip') }
          >
            <TextArea rows={ 6 } />
          </Form.Item>
        </>
      )}
    </>
  )
}
