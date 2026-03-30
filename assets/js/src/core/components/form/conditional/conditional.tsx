/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import React, { useMemo } from 'react'
import { Form } from '../form'

export interface ConditionalProps {
  /** Evaluate whether children should be rendered based on current form values */
  condition: (formValues: Record<string, unknown>) => boolean
  children: React.ReactNode
  /** Optional: specify a single field name to watch. When provided, only changes to this
   *  field trigger re-renders instead of subscribing to all form value changes. */
  watchField?: string
}

const ConditionalWithWatchField = ({ condition, children, watchField }: ConditionalProps & { watchField: string }): React.JSX.Element => {
  const form = Form.useFormInstance()
  const watchedValue = Form.useWatch(watchField, form)

  const isTrue = useMemo(() => {
    const values = form.getFieldsValue(true) as Record<string, unknown>
    return condition(values)
  }, [condition, watchedValue])

  return isTrue ? <>{children}</> : <></>
}

const ConditionalWithAllValues = ({ condition, children }: ConditionalProps): React.JSX.Element => {
  const initialValues = Form.useFormInstance().getFieldsValue(true)
  const values = Form.useWatch((values) => {
    return values
  }) ?? initialValues

  const isTrue = useMemo(() => {
    return condition(values as Record<string, unknown>)
  }, [condition, values])

  return isTrue ? <>{children}</> : <></>
}

export const Conditional = ({ condition, children, watchField }: ConditionalProps): React.JSX.Element => {
  if (!isUndefined(watchField)) {
    return (
      <ConditionalWithWatchField
        condition={ condition }
        watchField={ watchField }
      >
        {children}
      </ConditionalWithWatchField>
    )
  }

  return (
    <ConditionalWithAllValues condition={ condition }>
      {children}
    </ConditionalWithAllValues>
  )
}
