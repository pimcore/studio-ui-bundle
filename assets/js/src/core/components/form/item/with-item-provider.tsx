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
import React, { useMemo } from 'react'
import { ItemProvider } from './provider/item/item-provider'

export const withItemProvider = (Component: typeof Form.Item): typeof Form.Item => {
  const FormItemWithItemProvider = (props: FormItemProps): React.JSX.Element => {
    return useMemo(() => (
      <ItemProvider item={ props }>
        <Component
          { ...props }
        />
      </ItemProvider>
    ), [props])
  }

  const NewFormItem = FormItemWithItemProvider as typeof Form.Item
  NewFormItem.useStatus = Component.useStatus
  return NewFormItem
}
