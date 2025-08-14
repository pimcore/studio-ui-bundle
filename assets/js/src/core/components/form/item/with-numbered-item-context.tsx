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
import React from 'react'
import { useNumberedListOptional } from '../controls/numbered-list/provider/numbered-list/use-numbered-list-optional'
import { NumberedFormItem } from '../controls/numbered-list/form-item/numbered-form-item'

export const withNumberedItemContext = (Component: typeof Form.Item): typeof Form.Item => {
  const FormItemWithNumberedListContext = (props: FormItemProps): React.JSX.Element => {
    const hasNumberedContext = useNumberedListOptional() !== undefined

    if (!hasNumberedContext) {
      return <Component { ...props } />
    }

    return (
      <NumberedFormItem
        Component={ Component }
        componentProps={ props }
      />
    )
  }

  const NewFormItem = FormItemWithNumberedListContext as typeof Form.Item
  NewFormItem.useStatus = Component.useStatus
  return NewFormItem
}
