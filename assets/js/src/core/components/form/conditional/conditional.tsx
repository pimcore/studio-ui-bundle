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
import React, { useCallback, useMemo } from 'react'
import { Form } from '../form'

export interface ConditionalProps {
  /** Evaluate whether children should be rendered based on current form values */
  condition: (formValues: Record<string, unknown>) => boolean
  children: React.ReactNode
  /** Optional: specify field names to watch. When provided, only changes to these
   *  fields trigger re-renders instead of subscribing to all form value changes. */
  watchFields?: string[]
}

const ConditionalWithWatchFields = ({ condition, children, watchFields }: ConditionalProps & { watchFields: string[] }): React.JSX.Element => {
  const form = Form.useFormInstance()

  const selector = useCallback((values: Record<string, unknown>) => {
    return watchFields.map((field) => values[field])
  }, [watchFields])

  const watchedValues = Form.useWatch(selector, form)

  const isTrue = useMemo(() => {
    const values = form.getFieldsValue(true) as Record<string, unknown>
    return condition(values)
  }, [condition, watchedValues])

  return isTrue ? <>{children}</> : <></>
}

const ConditionalWithAllValues = ({ condition, children }: Omit<ConditionalProps, 'watchFields'>): React.JSX.Element => {
  const initialValues = Form.useFormInstance().getFieldsValue(true)
  const values = Form.useWatch((values) => {
    return values
  }) ?? initialValues

  const isTrue = useMemo(() => {
    return condition(values as Record<string, unknown>)
  }, [condition, values])

  return isTrue ? <>{children}</> : <></>
}

export const Conditional = ({ condition, children, watchFields }: ConditionalProps): React.JSX.Element => {
  if (!isUndefined(watchFields)) {
    return (
      <ConditionalWithWatchFields
        condition={ condition }
        watchFields={ watchFields }
      >
        {children}
      </ConditionalWithWatchFields>
    )
  }

  return (
    <ConditionalWithAllValues condition={ condition }>
      {children}
    </ConditionalWithAllValues>
  )
}
