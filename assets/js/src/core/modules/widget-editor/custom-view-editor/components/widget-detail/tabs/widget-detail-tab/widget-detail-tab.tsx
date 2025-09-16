/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useWidgetEditorContext } from '@Pimcore/modules/widget-editor/custom-view-editor/context/hooks/use-widget-editor-context'
import { DynamicTypeWidgetTypeRegistry } from '@Pimcore/modules/widget-editor/custom-view-editor/dynmic-types/registry/dynamic-type-widget-type-registry'
import { container } from '@sdk/app'
import React from 'react'
import { WidgetFormProvider } from '../../../widget-type-form/context/widget-form-provider'
import { WidgetForm } from '../../../widget-type-form/widget-form'

interface WidgetDetailTabProps {
  id: string
}

export const WidgetDetailTab = ({ id }: WidgetDetailTabProps): React.JSX.Element => {
  const { widgets } = useWidgetEditorContext()
  const widget = widgets.find(w => w.id === id)

  if (widget === undefined) {
    return <></>
  }

  const widgetType = container.get<DynamicTypeWidgetTypeRegistry>('DynamicTypes/WidgetEditor/WidgetTypeRegistry').getDynamicType(widget.widgetType)
  const { form: Form } = widgetType!

  return (
    <WidgetFormProvider widget={widget}>
      <WidgetForm form={Form} />
    </WidgetFormProvider>
  )
}
