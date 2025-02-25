/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type FormItemProps, type Form } from 'antd'
import React from 'react'
import { useKeyedListOptional } from '../keyed-list/provider/keyed-list/use-keyed-list-optional'
import { KeyedFormItem } from '../keyed-list/form-item/keyed-form-item'

export const withKeyedItemContext = (Component: typeof Form.Item): typeof Form.Item => {
  const FormItemWithKeyedListContext = (props: FormItemProps): React.JSX.Element => {
    const hasKeyedContext = useKeyedListOptional() !== undefined

    if (!hasKeyedContext) {
      return <Component { ...props } />
    }

    return (
      <KeyedFormItem
        Component={ Component }
        componentProps={ props }
      />
    )
  }

  const NewFormItem = FormItemWithKeyedListContext as typeof Form.Item
  NewFormItem.useStatus = Component.useStatus
  return NewFormItem
}
