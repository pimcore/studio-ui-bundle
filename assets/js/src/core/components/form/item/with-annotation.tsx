/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FormItemProps, type Form } from 'antd'
import cn from 'classnames'
import React, { useMemo } from 'react'
import { useFormItemAnnotation } from '../annotations/form-annotations-provider'
import { useStyles } from './with-annotation.styles'

export const withAnnotation = (Component: typeof Form.Item): typeof Form.Item => {
  const FormItemWithAnnotation = (props: FormItemProps): React.JSX.Element => {
    const annotation = useFormItemAnnotation(props.name)
    const { styles } = useStyles()

    return useMemo(() => {
      if (annotation === undefined) {
        return <Component { ...props } />
      }

      // each on its own line: the hint reads as a sentence, the item's own extra follows it
      const extra = annotation.hint !== undefined && props.extra !== undefined
        ? <><div>{annotation.hint}</div><div>{props.extra}</div></>
        : annotation.hint ?? props.extra

      return (
        <Component
          { ...props }
          className={ cn(props.className, styles.annotated, styles[annotation.status]) }
          extra={ extra }
        />
      )
    }, [props, annotation, styles])
  }

  const NewFormItem = FormItemWithAnnotation as typeof Form.Item
  NewFormItem.useStatus = Component.useStatus
  return NewFormItem
}
