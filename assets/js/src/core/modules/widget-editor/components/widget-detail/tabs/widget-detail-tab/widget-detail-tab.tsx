/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetConfig } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'
import { type DynamicTypeWidgetTypeRegistry } from '@Pimcore/modules/widget-editor/dynmic-types/registry/dynamic-type-widget-type-registry'
import { container } from '@sdk/app'
import React, { memo } from 'react'
import { WidgetFormProvider } from '../../../widget-type-form/context/widget-form-provider'
import { WidgetForm } from '../../../widget-type-form/widget-form'

interface WidgetDetailTabProps {
  widget: WidgetConfig
}

const WidgetDetailTabComponent = ({ widget }: WidgetDetailTabProps): React.JSX.Element => {
  const widgetType = container.get<DynamicTypeWidgetTypeRegistry>('DynamicTypes/WidgetEditor/WidgetTypeRegistry').getDynamicType(widget.widgetType)
  const { form: Form } = widgetType

  return (
    <WidgetFormProvider widget={ widget }>
      <WidgetForm form={ Form } />
    </WidgetFormProvider>
  )
}

export const WidgetDetailTab = memo(WidgetDetailTabComponent, (prevProps, nextProps) => {
  return prevProps.widget === nextProps.widget
})
