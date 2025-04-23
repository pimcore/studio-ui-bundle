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

import { type CollectionContentBaseProps } from '../collection-content'
import React from 'react'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import { BaseView } from '../../../../../layout-related/views/base-view'
import { Form } from '@Pimcore/components/form/form'

export interface CollectionContentTabsProps extends CollectionContentBaseProps {}

export const CollectionContentTabs = (props: CollectionContentTabsProps): React.JSX.Element => {
  const { itemComponent, ...baseItemProps } = props
  const [ItemComponent, additionalItemProps] = itemComponent
  const form = Form.useFormInstance()

  const itemProps = {
    ...baseItemProps,
    ...additionalItemProps
  }

  const items: ITabsProps['items'] = props.fields.map((field) => {
    const itemValue = form.getFieldValue([props.name, field.name])

    return {
      key: itemValue.type,
      label: itemValue.type,
      children: (
        <ItemComponent
          field={ field }
          key={ field.name }
          { ...itemProps }
        />
      )
    }
  })

  function onClose (tabName: string): void {
    if (props.onTabClose !== undefined) {
      props.onTabClose({ tabName, fields: props.fields, operation: props.operation })
    }
  }

  return (
    <BaseView
      border={ props.border }
      collapsed={ props.collapsed }
      collapsible={ props.collapsible }
      contentPadding={ 'none' }
      extra={ props.extra }
      extraPosition={ props.extraPosition }
      theme='default'
      title={ props.title }
    >
      <Tabs
        items={ items }
        onClose={ onClose }
      />
    </BaseView>
  )
}
