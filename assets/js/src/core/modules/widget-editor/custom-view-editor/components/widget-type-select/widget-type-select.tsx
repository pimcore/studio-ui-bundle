/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Select, type SelectProps } from '@Pimcore/components/select/select'
import { container, serviceIds } from '@sdk/app'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { DynamicTypeWidgetTypeRegistry } from '../../dynmic-types/registry/dynamic-type-widget-type-registry'

export const WidgetTypeSelect = (props: SelectProps): React.JSX.Element => {
  const { t } = useTranslation()
  const widgetTypes = container.get<DynamicTypeWidgetTypeRegistry>(serviceIds['DynamicTypes/WidgetEditor/WidgetTypeRegistry']).getDynamicTypes()

  return (
    <Select
      {...props}
      options={widgetTypes.map(widgetType => ({
        label: t(`widget-editor.create-form.widgetType.${widgetType.name}`),
        value: widgetType.id
      }))}
    />
  )
}
