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
import { useFieldCollection } from './providers/use-field-collection'
import { Content } from '@Pimcore/components/content/content'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { ToolStripBox } from '@Pimcore/components/toolstrip/box/tool-strip-box'
import { FieldCollectionToolStrip } from './field-collection-tool-strip'
import { Form } from '@Pimcore/components/form/form'
import { type CollectionItemProps } from '../collection/collection'
import { type FieldCollectionProps } from './field-collection'

export interface FieldCollectionItemProps extends CollectionItemProps {
  field: FormListFieldData
  operation: FormListOperation
  allowedTypes: FieldCollectionProps['allowedTypes']
}

export const FieldCollectionItem = ({ field, operation, name, border, ...props }: FieldCollectionItemProps): React.JSX.Element => {
  const form = Form.useFormInstance()
  const fieldCollection = useFieldCollection()
  const value = form.getFieldValue([name, field.name])

  // @todo handle this cases as errors
  if (value === null || fieldCollection === null) {
    return <></>
  }

  const { data, isLoading } = fieldCollection

  if (isLoading === true) {
    return <Content loading />
  }

  const fieldCollectionType: string = value?.type
  const layoutDefinition = data.items.find(item => item.key === fieldCollectionType)

  if (layoutDefinition === undefined) {
    return <></>
  }

  return (
    <ToolStripBox
      docked={ border }
      renderToolStripStart={ (
        <FieldCollectionToolStrip
          { ...props }
          field={ field }
          label={ fieldCollectionType }
          name={ name }
          operation={ operation }
        />
      ) }
    >
      <FormListProvider
        field={ field }
        fieldSuffix='data'
        operation={ operation }
      >
        {layoutDefinition.children.map((child, index) => {
          return (
            <ObjectComponent
              key={ index }
              { ...child }
            />
          )
        })}
      </FormListProvider>
    </ToolStripBox>

  )
}
