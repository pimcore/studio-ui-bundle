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

import { type FormListFieldData, type FormListOperation } from 'antd'
import { type FieldCollectionProps } from './field-collection'
import React, { useState } from 'react'
import { FieldCollectionItem } from './field-collection-item'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { CollapseItem, type CollapseItemProps } from '@Pimcore/components/collapse/item/collapse-item'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Space } from '@Pimcore/components/space/space'

interface FieldCollectionContentProps extends FieldCollectionProps {
  fields: FormListFieldData[]
  operation: FormListOperation
}

export const FieldCollectionContent = (props: FieldCollectionContentProps): React.JSX.Element => {
  const { title, fields, operation, allowedTypes, border, collapsed } = props
  const [collapseActive, setCollapseActive] = useState(collapsed ?? false)

  const fieldCollectionDropdownItems: DropdownMenuProps['items'] = allowedTypes.map((type) => {
    return {
      key: type,
      label: type,
      onClick: (e) => {
        e.domEvent.stopPropagation()
        operation.add({ type })
        setCollapseActive(true)
      }
    }
  })

  const onChange: CollapseItemProps['onChange'] = (keys): void => {
    setCollapseActive(keys.length > 0)
  }

  return (
    <CollapseItem
      active={ collapseActive }
      bordered={ border }
      contentPadding={ border === true ? { x: 'none', y: 'small' } : undefined }
      extra={ (
        <>
          {fields.length === 0 && (
            <Dropdown menu={ { items: fieldCollectionDropdownItems } }>
              <IconTextButton
                icon={ { value: 'new' } }
                onClick={ (e) => { e.stopPropagation() } }
              >Add</IconTextButton>
            </Dropdown>
          )}
        </>
      ) }
      extraPosition='start'
      label={ title }
      onChange={ onChange }
    >
      <Space
        className='w-full'
        direction='vertical'
        size='small'
      >
        {fields.length !== 0 && fields.map((field, index) => (
          <FieldCollectionItem
            key={ field.key }
            { ...props }
            field={ field }
            operation={ operation }
          />
        ))}
      </Space>
    </CollapseItem>
  )
}
