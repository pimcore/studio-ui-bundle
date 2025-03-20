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

import { Form } from '@Pimcore/components/form/form'
import React, { type ComponentType, type ReactNode } from 'react'
import { CollectionContent } from './content/collection-content'
import { type FormListFieldData, type FormListOperation } from 'antd'
import { type BaseViewProps } from '../../../layout-related/views/base-view'

export interface CollectionOnTabCloseEvent {
  tabName: string
  fields: FormListFieldData[]
  operation: FormListOperation
}

export interface CollectionProps {
  name: string | number | Array<string | number>
  itemComponent: [ComponentType<CollectionItemProps>, Record<string, any>]
  addButtonComponent: [ComponentType<CollectionAddButtonProps>, Record<string, any>]
  title?: ReactNode
  border?: boolean
  collapsed?: boolean
  collapsible?: boolean
  maxItems?: number
  disallowAdd?: boolean
  disallowDelete?: boolean
  disallowReorder?: boolean
  type?: 'list' | 'tabs'
  onTabClose?: (event: CollectionOnTabCloseEvent) => void
  extra?: BaseViewProps['extra']
  extraPosition?: BaseViewProps['extraPosition']
  inherited?: boolean
}

export interface CollectionItemProps extends Omit<CollectionProps, 'itemComponent'> {
  fields: FormListFieldData[]
  field: FormListFieldData
  operation: FormListOperation
}

export interface CollectionAddButtonProps extends Omit<CollectionProps, 'addButtonComponent'> {
  operation: FormListOperation
}

export const Collection = ({
  border = false,
  collapsed = false,
  collapsible = false,
  disallowAdd = false,
  disallowDelete = false,
  disallowReorder = false,
  type = 'list',
  ...props
}: CollectionProps): React.JSX.Element => {
  return (
    <Form.List name={ props.name }>
      {(fields, operation) => (
        <CollectionContent
          border={ border }
          collapsed={ collapsed }
          collapsible={ collapsible }
          disallowAdd={ disallowAdd }
          disallowDelete={ disallowDelete }
          disallowReorder={ disallowReorder }
          type={ type }
          { ...props }
          fields={ fields }
          operation={ operation }
        />
      )}
    </Form.List>
  )
}
