/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@Pimcore/components/form/form'
import { type WidgetConfig } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'
import React, { createContext, useMemo } from 'react'

interface WidgetFormProviderProps {
  children: React.ReactNode
  widget: WidgetConfig
}

export interface WidgetFormContextProps {
  widget: WidgetConfig
  form: ReturnType<typeof Form.useForm>[0]
}

export const WidgetFormContext = createContext<WidgetFormContextProps | undefined>(undefined)

export const WidgetFormProvider = ({ children, widget }: WidgetFormProviderProps): React.JSX.Element => {
  const [form] = Form.useForm()

  const contextValue: WidgetFormContextProps = useMemo(() => ({
    widget,
    form
  }), [widget, form])

  return (
    <WidgetFormContext.Provider value={contextValue}>
      {children}
    </WidgetFormContext.Provider>
  )
}
