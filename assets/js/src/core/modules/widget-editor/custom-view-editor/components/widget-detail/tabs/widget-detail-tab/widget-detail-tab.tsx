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
import React from 'react'
import { WidgetFormProvider } from '../../../widget-type-form/context/widget-form-provider'
import { WidgetForm } from '../../../widget-type-form/widget-form'
import { type WidgetTypeRegistry } from '@Pimcore/modules/widget-editor/custom-view-editor/registry/widget-type-registry'
import { container } from '@sdk/app'

interface WidgetDetailTabProps {
  id: string
}

// TODO: add registry to support different widget types with different forms

export const WidgetDetailTab = ({ id }: WidgetDetailTabProps): React.JSX.Element => {
  const { widgets } = useWidgetEditorContext()
  const widget = widgets.find(w => w.id === id)

  if (widget === undefined) {
    return <></>
  }

  const widgetType = container.get<WidgetTypeRegistry>('WidgetEditor/WidgetTypeRegistry').getWidgetType(widget.widgetType)
  const { form: Form } = widgetType!

  return (
    <WidgetFormProvider widget={ widget }>
      <WidgetForm form={ Form } />
    </WidgetFormProvider>
  )
}
