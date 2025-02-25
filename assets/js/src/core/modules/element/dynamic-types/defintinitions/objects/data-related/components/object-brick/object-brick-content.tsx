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

import React, { useMemo } from 'react'
import { BaseView } from '../../../layout-related/views/base-view'
import { type ObjectBrickProps } from './object-brick'
import { Form } from '@Pimcore/components/form/form'
import { ObjectBrickAddButton } from './object-brick-add-button'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import { useKeyedList } from '@Pimcore/components/form/keyed-list/provider/keyed-list/use-keyed-list'
import { ObjectBrickItem } from './object-brick-item'

export interface ObjectBrickContentProps extends ObjectBrickProps {}

export const ObjectBrickContent = (props: ObjectBrickContentProps): React.JSX.Element => {
  const { values, operations } = useKeyedList()
  const tabItems: ITabsProps['items'] = Object.keys(values).map((key) => {
    return {
      key,
      label: key,
      closable: true,
      forceRender: true,
      children: (
        <Form.Group
          name={ key }
        >
          <ObjectBrickItem type={ key } />
        </Form.Group>
      )
    }
  })

  const onClose: ITabsProps['onClose'] = (key: string) => {
    operations.remove(key)
  }

  return useMemo(() => (
    <BaseView
      border={ props.border }
      collapsed={ props.collapsed }
      collapsible={ props.collapsible }
      contentPadding={ 'none' }
      extra={ <ObjectBrickAddButton allowedTypes={ props.allowedTypes } /> }
      extraPosition='start'
      theme='default'
      title={ props.title }
    >
      <Tabs
        items={ tabItems }
        onClose={ onClose }
      />
    </BaseView>
  ), [values])
}
