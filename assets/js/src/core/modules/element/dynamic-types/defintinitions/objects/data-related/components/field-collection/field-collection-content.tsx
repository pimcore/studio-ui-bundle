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
import React from 'react'
import { Accordion, type AccordionProps } from '@Pimcore/components/accordion/accordion'
import { Button } from '@Pimcore/components/button/button'
import { Box } from '@Pimcore/components/box/box'
import { FieldCollectionItem } from './field-collection-item'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'

interface FieldCollectionContentProps extends FieldCollectionProps {
  fields: FormListFieldData[]
  operation: FormListOperation
}

export const FieldCollectionContent = (props: FieldCollectionContentProps): React.JSX.Element => {
  const { title, fields, operation, allowedTypes } = props
  const fieldCollectionDropdownItems: DropdownMenuProps['items'] = allowedTypes.map((type) => {
    return {
      key: type,
      label: type,
      onClick: () => { operation.add({ type }) }
    }
  })

  const items: AccordionProps['items'] = fields.map((field) => {
    return {
      title: <>{title} {field.name}</>,
      forceRender: true,
      children: (
        <FieldCollectionItem
          { ...props }
          field={ field }
          operation={ operation }
        />
      )
    }
  })

  return (
    <Accordion
      bordered
      ghost
      items={ [
        {
          title: <>{title}</>,
          forceRender: true,
          children: (
            <>
              <Box padding={ { bottom: 'small' } }>
                <Dropdown menu={ { items: fieldCollectionDropdownItems } }>
                  <Button>New</Button>
                </Dropdown>
              </Box>

              { fields.length > 0 && <Accordion items={ items } /> }
            </>
          )
        }
      ] }
    />
  )
}
