/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { type IReportConfigurationSectionProps } from '@Pimcore/modules/reports/reports-editor/types'

export const ChartSettings = ({ currentData, updateFormData }: IReportConfigurationSectionProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <FormKit.Panel title={ t('reports.editor.chart-settings.title') }>
      Content
    </FormKit.Panel>
  )
}
