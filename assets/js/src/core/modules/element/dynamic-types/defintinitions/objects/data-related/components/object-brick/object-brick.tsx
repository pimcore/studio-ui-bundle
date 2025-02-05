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

import React from 'react'
import { isArray } from 'lodash'
import { type AbstractObjectDataDefinition } from '../../dynamic-type-object-data-abstract'
import { Collection, type CollectionProps } from '../collection/collection'
import { ObjectBrickAddButton } from './object-brick-add-button'
import { ObjectBrickItem } from './object-brick-item'
import { Form } from '@Pimcore/components/form/form'
import { type ObjectBrickLayoutDefinition } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'

export interface ObjectBrickProps extends AbstractObjectDataDefinition {
  border?: boolean
  maxItems?: number
  allowedTypes: string[]
}

export const ObjectBrick = (props: ObjectBrickProps): React.JSX.Element => {
  const form = Form.useFormInstance()
  const currentValue = Form.useWatch(props.name, form)

  const dropdownItems: DropdownMenuProps['items'] = props.allowedTypes.map((type) => {
    const hasType = (isArray(currentValue) && currentValue.some((fieldValue) => fieldValue.type === type)) ?? false

    return {
      key: type,
      label: type,
      itemIcon: hasType ? <Icon value='close' /> : <Icon value='new' />,
      onClick: () => {
        const fieldValues: ObjectBrickLayoutDefinition[] = form.getFieldValue(props.name)
        const hasType = fieldValues.some((fieldValue) => fieldValue.type === type)

        if (hasType) {
          const newFieldValues = fieldValues.filter((fieldValue) => fieldValue.type !== type)
          form.setFieldsValue({ [props.name]: newFieldValues })
        } else {
          const newField = { type, value: {} }
          form.setFieldsValue({ [props.name]: [...fieldValues, newField] })
        }
      }
    }
  })

  const onTabClose: CollectionProps['onTabClose'] = (event): void => {
    const { tabName, operation } = event
    const fieldValues: ObjectBrickLayoutDefinition[] = form.getFieldValue(props.name)
    const field = fieldValues.findIndex((fieldValue) => fieldValue.type === tabName)

    operation.remove(field)
  }

  return (
    <Collection
      addButtonComponent={ [ObjectBrickAddButton, { allowedTypes: props.allowedTypes }] }
      border={ props.border }
      extra={
        <Dropdown
          menu={ { items: dropdownItems } }
        >
          <IconTextButton
            icon={ { value: 'edit' } }
            type='action'
          >
            Edit
          </IconTextButton>
        </Dropdown>
      }
      extraPosition='start'
      itemComponent={ [ObjectBrickItem, { allowedTypes: props.allowedTypes }] }
      name={ props.name }
      onTabClose={ onTabClose }
      title={ props.title }
      type='tabs'
    />
  )
}
