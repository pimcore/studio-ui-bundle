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
import { type WidgetTypeRegistry } from '../../registry/widget-type-registry'

export enum WidgetTypes {
  ElementTree = 'element_tree'
}

export const WidgetTypeSelect = (props: SelectProps): React.JSX.Element => {
  const { t } = useTranslation()

  const widgetTypes = container.get<WidgetTypeRegistry>(serviceIds['WidgetEditor/WidgetTypeRegistry']).getAllWidgetTypes()

  return (
    <Select
      { ...props }
      options={ widgetTypes.map(type => ({
        label: t(`widget-editor.create-form.widgetType.${type.id}`),
        value: type.id
      })) }
    />
  )
}
