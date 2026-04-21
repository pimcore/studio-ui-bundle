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
import { useStyles } from '../../report-configuration.styles'

export const ChartSettings = ({ currentData }: IReportConfigurationSectionProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const CHART_OPTIONS = [
    { value: '', label: t('reports.editor.chart-settings.chart-type.none') },
    { value: CHART_TYPE_PIE, label: t('reports.editor.chart-settings.chart-type.pie-chart') },
    { value: CHART_TYPE_LINE, label: t('reports.editor.chart-settings.chart-type.line-chart') },
    { value: CHART_TYPE_BAR, label: t('reports.editor.chart-settings.chart-type.bar-chart') }
  ]

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
        className={ styles.chartSelect }
        data-testid={ `report-chart-${name}` }
        mode={ mode }
        options={ chartSelectOptions }
      />
    </Form.Item>
  )

  return (
    <FormKit.Panel title={ t('reports.editor.chart-settings.title') }>
      <Form.Item
        label={ t('reports.editor.chart-settings.chart-type') }
        name="chartType"
      >
        <Select
          className={ styles.chartSelect }
          data-testid="report-chart-type"
          options={ CHART_OPTIONS }
        />
      </Form.Item>

      <Conditional
        condition={ (formValues) => formValues.chartType === CHART_TYPE_PIE }
        watchFields={ ['chartType'] }
      >
        <FormKit.Panel
          border
          contentPadding={ { top: 'none', right: 'small', bottom: 'small', left: 'small' } }
          theme="fieldset"
          title={ t('reports.editor.chart-settings.settings') }
        >
          {renderSelectItem({ label: t('reports.editor.chart-settings.pie-label'), name: 'pieLabelColumn' })}
          {renderSelectItem({ label: t('reports.editor.chart-settings.pie-data'), name: 'pieColumn' })}
        </FormKit.Panel>
      </Conditional>
      <Conditional
        condition={ (formValues) => formValues.chartType === CHART_TYPE_LINE }
        watchFields={ ['chartType'] }
      >
        <FormKit.Panel
          border
          theme="fieldset"
          title={ t('reports.editor.chart-settings.settings') }
        >
          {renderSelectItem({ label: t('reports.editor.chart-settings.x-axis'), name: 'xAxis' })}
          {renderSelectItem({ label: t('reports.editor.chart-settings.y-axis'), name: 'yAxis', mode: 'multiple' })}
        </FormKit.Panel>
      </Conditional>
      <Conditional
        condition={ (formValues) => formValues.chartType === CHART_TYPE_BAR }
        watchFields={ ['chartType'] }
      >
        <FormKit.Panel
          border
          theme="fieldset"
          title={ t('reports.editor.chart-settings.settings') }
        >
          {renderSelectItem({ label: t('reports.editor.chart-settings.x-axis'), name: 'xAxis' })}
          {renderSelectItem({ label: t('reports.editor.chart-settings.y-axis'), name: 'yAxis', mode: 'multiple' })}
        </FormKit.Panel>
      </Conditional>
    </FormKit.Panel>
  )
}
