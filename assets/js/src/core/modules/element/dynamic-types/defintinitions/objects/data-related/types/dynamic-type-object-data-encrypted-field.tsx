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
import {
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  DataComponent
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component'
import type { FormItemProps } from 'antd/es/form/FormItem'

export type EncryptedFieldObjectDataDefinition = AbstractObjectDataDefinition & {
  delegateDatatype: string
  delegate: object
}

export class DynamicTypeObjectDataEncryptedField extends DynamicTypeObjectDataAbstract {
  id: string = 'encryptedField'

  getObjectDataComponent (props: EncryptedFieldObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <DataComponent
        className={ props.className }
        datatype="data"
        fieldType={ props.delegateDatatype }
        name={ props.name }
        { ...props.delegate }
      />
    )
  }

  getObjectDataFormItemProps (props: EncryptedFieldObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: null
    }
  }
}
