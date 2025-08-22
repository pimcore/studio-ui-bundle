/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Select, type SelectProps } from '@Pimcore/components/select/select'
import { Form } from '@Pimcore/components/form/form'
import { Conditional } from '@Pimcore/components/form/conditional/conditional'
import { CHART_TYPE_BAR, CHART_TYPE_LINE, CHART_TYPE_PIE } from '@Pimcore/modules/reports/constants'
import type { IReportConfigurationSectionProps } from '@Pimcore/modules/reports/reports-editor/types'

const CHART_OPTIONS = [
  { value: '', label: 'None' },
  { value: CHART_TYPE_PIE, label: 'Pie Chart' },
  { value: CHART_TYPE_LINE, label: 'Line Chart' },
  { value: CHART_TYPE_BAR, label: 'Bar Chart' }
]

export const ChartSettings = ({ currentData }: IReportConfigurationSectionProps): React.JSX.Element => {
  const { t } = useTranslation()

  const chartSelectOptions = useMemo(() => {
    return currentData.columnConfigurations.map((column) => ({
      value: column.name,
      label: column.name
    }))
  }, [currentData])

  const renderSelectItem = ({ label, name, mode }: { label: string, name: string, mode?: SelectProps['mode'] }): React.JSX.Element => (
    <Form.Item
      label={ label }
      name={ name }
    >
      <Select
        className="w-full"
        mode={ mode }
        options={ chartSelectOptions }
      />
    </Form.Item>
  )

  return (
    <FormKit.Panel title={ t('reports.editor.chart-settings.title') }>
      <Form.Item
        label="Chart Type"
        name="chartType"
      >
        <Select options={ CHART_OPTIONS } />
      </Form.Item>

      <Conditional condition={ (formValues) => formValues.chartType === CHART_TYPE_PIE }>
        <FormKit.Panel
          border
          theme="fieldset"
          title="Settings"
        >
          {renderSelectItem({ label: 'X-Axis', name: 'xAxis' })}
          {renderSelectItem({ label: 'Y-Axis', name: 'yAxis' })}
        </FormKit.Panel>
      </Conditional>
      <Conditional condition={ (formValues) => formValues.chartType === CHART_TYPE_LINE }>
        <FormKit.Panel
          border
          theme="fieldset"
          title="Settings"
        >
          {renderSelectItem({ label: 'X-Axis', name: 'xAxis' })}
          {renderSelectItem({ label: 'Y-Axis', name: 'yAxis', mode: 'multiple' })}
        </FormKit.Panel>
      </Conditional>
      <Conditional condition={ (formValues) => formValues.chartType === CHART_TYPE_BAR }>
        <FormKit.Panel
          border
          theme="fieldset"
          title="Settings"
        >
          {renderSelectItem({ label: 'X-Axis', name: 'xAxis' })}
          {renderSelectItem({ label: 'Y-Axis', name: 'yAxis', mode: 'multiple' })}
        </FormKit.Panel>
      </Conditional>
    </FormKit.Panel>
  )
}
