/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FormItemProps } from 'antd'
import { isNil } from 'lodash'
import React, { createContext, useContext, useMemo } from 'react'

export type FormItemAnnotationStatus = 'added' | 'changed' | 'removed' | 'moved'

/** an item rendered with `noStyle` shows nothing: AntD drops its className and extra slot */
export interface FormItemAnnotation {
  status: FormItemAnnotationStatus
  /** rendered under the control, e.g. the value the field had before */
  hint?: React.ReactNode
}

/** keyed by {@link formItemAnnotationKey} of the item's name */
export type FormAnnotations = Record<string, FormItemAnnotation>

const FormAnnotationsContext = createContext<FormAnnotations | undefined>(undefined)

export interface FormAnnotationsProviderProps {
  annotations: FormAnnotations
  children?: React.ReactNode
}

/**
 * Marks form items without the form knowing: every Form.Item below looks its own name up
 * here, so a form built for editing renders as a review with no change to the form.
 */
export const FormAnnotationsProvider = (props: FormAnnotationsProviderProps): React.JSX.Element => {
  const { annotations, children } = props

  return useMemo(() => (
    <FormAnnotationsContext.Provider value={ annotations }>
      {children}
    </FormAnnotationsContext.Provider>
  ), [annotations, children])
}

/** an item name as the annotation map keys it: path segments joined by '.' */
export const formItemAnnotationKey = (name: FormItemProps['name']): string | undefined => {
  if (isNil(name)) {
    return undefined
  }

  return Array.isArray(name) ? name.map(String).join('.') : String(name)
}

export const useFormItemAnnotation = (name: FormItemProps['name']): FormItemAnnotation | undefined => {
  const annotations = useContext(FormAnnotationsContext)
  const key = formItemAnnotationKey(name)

  if (annotations === undefined || key === undefined) {
    return undefined
  }

  return annotations[key]
}
