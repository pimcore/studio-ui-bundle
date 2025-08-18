/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { Form } from '../form'

export interface ConditionalProps {
  condition: (formValues: Record<string, unknown>) => boolean
  children: React.ReactNode
}

export const Conditional = ({ condition, children }: ConditionalProps): React.JSX.Element => {
  const initialValues = Form.useFormInstance().getFieldsValue(true)
  const values = Form.useWatch((values) => {
    return values
  }) ?? initialValues

  const isTrue = useMemo(() => {
    return condition(values as Record<string, unknown>)
  }, [condition, values])

  return isTrue ? <>{children}</> : <></>
}
