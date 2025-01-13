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
import { FormListProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/form-list-provider/form-list-provider'
import { type FormListFieldData, type FormListOperation } from 'antd'
import { Content } from '@Pimcore/components/content/content'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { Form } from '@Pimcore/components/form/form'
import { type CollectionItemProps } from '../collection/collection'
import { type ObjectBrickProps } from './object-brick'
import { useObjectBrick } from './providers/use-object-brick'
import { Box } from '@Pimcore/components/box/box'

export interface ObjectBrickItemProps extends CollectionItemProps {
  field: FormListFieldData
  operation: FormListOperation
  allowedTypes: ObjectBrickProps['allowedTypes']
}

export const ObjectBrickItem = ({ field, operation, name, border, ...props }: ObjectBrickItemProps): React.JSX.Element => {
  const form = Form.useFormInstance()
  const objectBrick = useObjectBrick()
  const value = form.getFieldValue([name, field.name])

  // @todo handle this cases as errors
  if (value === null || objectBrick === null) {
    return <></>
  }

  const { data, isLoading } = objectBrick

  if (isLoading === true) {
    return <Content loading />
  }

  const objectBrickType: string = value?.type
  const layoutDefinition = data.items.find(item => item.key === objectBrickType)

  if (layoutDefinition === undefined) {
    return <></>
  }

  return (
    <FormListProvider
      field={ field }
      fieldSuffix='data'
      operation={ operation }
    >
      <Box padding={ { x: 'small', y: 'small', top: 'none' } }>
        {layoutDefinition.children.map((child, index) => {
          return (
            <ObjectComponent
              key={ index }
              { ...child }
            />
          )
        })}
      </Box>
    </FormListProvider>
  )
}
