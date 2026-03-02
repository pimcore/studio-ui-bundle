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
import { isEmpty, isNil, isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Select } from '@Pimcore/components/select/select'
import { Text } from '@Pimcore/components/text/text'
import { uuid } from '@Pimcore/utils/uuid'
import { useCustomReportsColumnConfigListQuery } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { type ReportFormData } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-form-state'
import { COLUMN_KEYS } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/column-configuration/constants'
import type { IReportConfigurationSectionProps } from '@Pimcore/modules/reports/reports-editor/types'
import { type IApiErrorDetails } from '@Pimcore/modules/app/error-handler/types'
import { useDebounce } from '@Pimcore/utils/hooks/use-debounce'

interface ISqlAdapterProps extends IReportConfigurationSectionProps {}

const ORDER_BY_DIRECTIONS = [
  { value: 'ASC', label: 'ASC' },
  { value: 'DESC', label: 'DESC' }
]

const createDefaultColumnConfig = (name: string): ReportFormData['columnConfigurations'][0] => ({
  id: uuid(),
  [COLUMN_KEYS.NAME]: name,
  [COLUMN_KEYS.DISPLAY]: true,
  [COLUMN_KEYS.EXPORT]: true,
  [COLUMN_KEYS.ORDER]: true,
  [COLUMN_KEYS.FILTER_TYPE]: null,
  [COLUMN_KEYS.DISPLAY_TYPE]: null,
  [COLUMN_KEYS.FILTER_DRILLDOWN]: null,
  [COLUMN_KEYS.WIDTH]: null,
  [COLUMN_KEYS.LABEL]: '',
  [COLUMN_KEYS.ACTION]: '',
  disableOrderBy: false,
  disableFilterable: false,
  disableDropdownFilterable: false,
  disableLabel: false
})

export const SqlAdapter = ({ currentData, updateFormData }: ISqlAdapterProps): React.JSX.Element => {
  const { t } = useTranslation()

  const debouncedValue = useDebounce(currentData?.dataSourceConfig, 1000)
  const shouldSkipColumnConfigDataRequest = useMemo(() => {
    if (isNil(debouncedValue)) return true

    const keys = Object.keys(debouncedValue)

    return keys.length === 0 || (keys.length === 1 && keys[0] === 'type')
  }, [debouncedValue])

  const { data: columnConfigData, isError, error } = useCustomReportsColumnConfigListQuery({
    name: currentData.name,
    bundleCustomReportsDataSourceConfig: {
      configuration: debouncedValue!
    }
  }, { skip: shouldSkipColumnConfigDataRequest })

  const errorMessage = isError && ('data' in error) && (error.data as IApiErrorDetails)?.message

  useEffect(() => {
    if (!isNil(columnConfigData)) {
      const newColumnNames = columnConfigData.items.map(item => item.name)
      const existingConfig = currentData.columnConfigurations ?? []

      let updatedColumnConfigurations: ReportFormData['columnConfigurations']

      if (isEmpty(existingConfig)) {
        updatedColumnConfigurations = newColumnNames.map(createDefaultColumnConfig)
      } else {
        const existingConfigMap = new Map(existingConfig.map(config => [config.name, config]))
        const finalConfig: ReportFormData['columnConfigurations'] = []

        newColumnNames.forEach(name => {
          if (existingConfigMap.has(name)) {
            finalConfig.push(existingConfigMap.get(name)!)
          } else {
            const defaultConfig = createDefaultColumnConfig(name)
            const itemData = columnConfigData.items.find(item => item.name === name)

            if (!isUndefined(itemData)) {
              Object.assign(defaultConfig, itemData)
            }

            finalConfig.push(defaultConfig)
          }
        })

        updatedColumnConfigurations = finalConfig
      }

      updateFormData?.({
        ...currentData,
        columnConfigurations: updatedColumnConfigurations
      })
    }
  }, [columnConfigData])

  const renderTextAreaItem = ({ label, name }: { label: string, name: string }): React.JSX.Element => (
    <Form.Item
      label={ label }
      name={ name }
    >
      <TextArea data-testid={ `report-source-${name}` } />
    </Form.Item>
  )

  return (
    <FormKit.Panel
      border
      contentPadding={ { top: 'none', right: 'small', bottom: 'small', left: 'small' } }
      theme="fieldset"
      title="Sql"
    >
      {renderTextAreaItem({ label: t('reports.editor.source-definition.sql-select-field'), name: 'sql' })}
      {renderTextAreaItem({ label: t('reports.editor.source-definition.sql-from-field'), name: 'from' })}
      {renderTextAreaItem({ label: t('reports.editor.source-definition.sql-where-field'), name: 'where' })}
      {renderTextAreaItem({ label: t('reports.editor.source-definition.sql-group-by-field'), name: 'groupby' })}
      {renderTextAreaItem({ label: t('reports.editor.source-definition.sql-initial-field-order'), name: 'orderby' })}
      <Form.Item
        label={ t('reports.editor.source-definition.sql-initial-direction-order') }
        name="orderbydir"
      >
        <Select options={ ORDER_BY_DIRECTIONS } />
      </Form.Item>
      {isError && <Text type="danger">{errorMessage}</Text>}
    </FormKit.Panel>
  )
}
