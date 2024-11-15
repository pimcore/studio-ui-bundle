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
import { type BlockProps } from './block'
import React from 'react'
import { Accordion, type AccordionProps } from '@Pimcore/components/accordion/accordion'
import { FormListProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/form-list-provider/form-list-provider'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { Button } from '@Pimcore/components/button/button'
import { Box } from '@Pimcore/components/box/box'

interface BlockContentProps extends BlockProps {
  fields: FormListFieldData[]
  operation: FormListOperation
}

export const BlockContent = ({ title, fields, operation, children }: BlockContentProps): React.JSX.Element => {
  const items: AccordionProps['items'] = fields.map((field) => {
    return {
      title: <>{title} {field.name}</>,
      forceRender: true,
      children: (
        <FormListProvider
          field={ field }
          operation={ operation }
        >
          {
            Array.isArray(children)
              ? children.map((child, index) => {
                return (
                  <ObjectComponent
                    key={ index }
                    { ...child }
                  />
                )
              })
              : undefined
          }
        </FormListProvider>
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
                <Button onClick={ () => { operation.add() } }>New</Button>
              </Box>

              { fields.length > 0 && <Accordion items={ items } /> }
            </>
          )
        }
      ] }
    />
  )
}
