/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import {
  type AbstractObjectDataDefinition, type ColumnMetaGridCellDefinition, type DefaultGridCellDefinition, DynamicTypeObjectDataAbstract,
  type GetGridCellDefinitionProps,
  type WithEditModalGridCellDefinition
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  DataComponent
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component'
import type { FormItemProps } from 'antd/es/form/FormItem'
import { container } from '@Pimcore/app/depency-injection'
import { type DynamicTypeObjectDataRegistry } from '../dynamic-type-object-data-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { EditFormProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'
import { SaveProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/save-provider'

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

  getVersionObjectDataComponent (props: EncryptedFieldObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <SaveProvider>
        <EditFormProvider>
          {this.getObjectDataComponent(props)}
        </EditFormProvider>
      </SaveProvider>
    )
  }

  getObjectDataFormItemProps (props: EncryptedFieldObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: null
    }
  }

  getGridCellDefinition (props: GetGridCellDefinitionProps): DefaultGridCellDefinition | WithEditModalGridCellDefinition | ColumnMetaGridCellDefinition {
    const objectDataRegistry: DynamicTypeObjectDataRegistry = container.get(serviceIds['DynamicTypes/ObjectDataRegistry'])
    const objectProps: EncryptedFieldObjectDataDefinition = props.objectProps as EncryptedFieldObjectDataDefinition

    if (!objectDataRegistry.hasDynamicType(objectProps.delegateDatatype)) {
      return {
        mode: 'default',
        type: 'string'
      }
    }

    const dynType = objectDataRegistry.getDynamicType(objectProps.delegateDatatype)
    return dynType.getGridCellDefinition(props)
  }

  getDefaultGridColumnWidth (): number | undefined {
    return 350
  }
}
