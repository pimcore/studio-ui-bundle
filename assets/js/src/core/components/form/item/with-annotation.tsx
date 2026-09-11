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
import { useTranslation } from 'react-i18next'
import { Tag } from '@Pimcore/components/tag/tag'
import { type FormItemAnnotationStatus, useFormItemAnnotation } from '../annotations/form-annotations-provider'
import { useStyles } from './with-annotation.styles'

const TAG_COLOR: Record<FormItemAnnotationStatus, string> = {
  added: 'green',
  changed: 'gold',
  removed: 'red',
  moved: 'geekblue'
}

export interface AnnotationTagProps {
  status: FormItemAnnotationStatus
  className?: string
}

// its own component so only an annotated item pays for the translation subscription; exported
// so a grid can mark a row with the very tag a form item carries
export const AnnotationTag = ({ status, className }: AnnotationTagProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Tag
      className={ className }
      color={ TAG_COLOR[status] }
    >
      { t(`form.annotation.${status}`) }
    </Tag>
  )
}

export const withAnnotation = (Component: typeof Form.Item): typeof Form.Item => {
  const FormItemWithAnnotation = (props: FormItemProps): React.JSX.Element => {
    const annotation = useFormItemAnnotation(props.name)
    const { styles } = useStyles()

    return useMemo(() => {
      if (annotation === undefined) {
        return <Component { ...props } />
      }

      const tag = (
        <AnnotationTag
          className={ styles.tag }
          status={ annotation.status }
        />
      )

      // an item can carry its text on the control instead (a switch with a right label), and
      // wrapping the control would break AntD's single-child binding — so a tag with no label
      // to sit next to goes into extra, above the hint and the item's own extra
      const hasLabel = props.label !== undefined
      const hint = annotation.hint === undefined ? undefined : <div>{annotation.hint}</div>
      const ownExtra = props.extra === undefined ? undefined : <div>{props.extra}</div>
      const extra = hasLabel && hint === undefined && ownExtra === undefined
        ? undefined
        : <>{ hasLabel ? null : tag }{ hint }{ ownExtra }</>

      return (
        <Component
          { ...props }
          className={ cn(
            props.className,
            'pimcore-form-item-annotated',
            `pimcore-form-item-annotated--${annotation.status}`,
            hasLabel ? undefined : styles.tagOnControlRow
          ) }
          extra={ extra }
          label={ hasLabel ? <>{ props.label }{ tag }</> : props.label }
        />
      )
    }, [props, annotation, styles])
  }

  const NewFormItem = FormItemWithAnnotation as typeof Form.Item
  NewFormItem.useStatus = Component.useStatus
  return NewFormItem
}
