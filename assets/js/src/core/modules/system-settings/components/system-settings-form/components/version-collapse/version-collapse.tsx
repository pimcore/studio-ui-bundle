/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { CollapseItem, Form, InputNumber } from '@sdk/components'
import { capitalize, isNil } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface VersionCollapseProps {
  dataType: string
}

export const VersionCollapse = ({ dataType }: VersionCollapseProps): React.JSX.Element => {
  const { t } = useTranslation()
  const daysValue = Form.useWatch([dataType, 'versions', 'days'])
  const stepsValue = Form.useWatch([dataType, 'versions', 'steps'])
  const hasDays = !isNil(daysValue) && daysValue !== ''
  const hasSteps = !isNil(stepsValue) && stepsValue !== ''

  return (
    <CollapseItem
      forceRender
      label={ capitalize(dataType) }
    >
      <Form.Item
        label={ t('system-settings.form.field.version-days') }
        name={ [dataType, 'versions', 'days'] }
      >
        <InputNumber disabled={ hasSteps } />
      </Form.Item>

      <Form.Item
        label={ t('system-settings.form.field.version-count') }
        name={ [dataType, 'versions', 'steps'] }
      >
        <InputNumber disabled={ hasDays } />
      </Form.Item>
    </CollapseItem>
  )
}
