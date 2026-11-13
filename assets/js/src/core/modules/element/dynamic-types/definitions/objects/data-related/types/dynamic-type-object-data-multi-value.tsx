/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import {
  type AbstractObjectDataDefinition,
  type ColumnMetaGridCellDefinition,
  type DefaultGridCellDefinition,
  DynamicTypeObjectDataAbstract,
  type GetGridCellDefinitionProps,
  type WithEditModalGridCellDefinition
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import { MultiValueEditor, type MultiValueEditorProps } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/multi-value/multi-value-editor'
import { EditFormProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'
import { SaveProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/save-provider'
import {
  SuppressEmptyFieldLabelProvider
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/suppress-empty-field-label-provider'
import { getDefaultGridColumnWidthFromDynamicObjectType } from '@Pimcore/modules/element/dynamic-types/utils/column-helper'
import { CLASSIFICATION_STORE_WRAPPER_TYPES } from '@Pimcore/modules/field-definitions/dynamic-types/utils/classification-store-key-types'
import { delegateDefinitionOf } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/multi-value/multi-value-delegate-props'
import React from 'react'
import { type DynamicTypeObjectDataRegistry } from '../dynamic-type-object-data-registry'

export type MultiValueObjectDataDefinition = AbstractObjectDataDefinition & MultiValueEditorProps

export class DynamicTypeObjectDataMultiValue extends DynamicTypeObjectDataAbstract {
  id: string = 'multiValue'

  /** The value is a list of entries, so clearing it cannot go through null. */
  getEmptyValue (): unknown {
    return []
  }

  getObjectDataComponent (props: MultiValueObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <MultiValueEditor { ...props } />
    )
  }

  /** The editor mounts the edit tab's data components, which need the edit form outside of the edit tab too. */
  getVersionObjectDataComponent (props: MultiValueObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <SaveProvider>
        <EditFormProvider>
          <SuppressEmptyFieldLabelProvider>
            {this.getObjectDataComponent({ ...props, noteditable: true, title: '', tooltip: '' })}
          </SuppressEmptyFieldLabelProvider>
        </EditFormProvider>
      </SaveProvider>
    )
  }

  getGridCellDefinition (props: GetGridCellDefinitionProps): DefaultGridCellDefinition | WithEditModalGridCellDefinition | ColumnMetaGridCellDefinition {
    const objectDataRegistry: DynamicTypeObjectDataRegistry = container.get(serviceIds['DynamicTypes/ObjectDataRegistry'])
    const objectProps: MultiValueObjectDataDefinition = props.objectProps as MultiValueObjectDataDefinition

    const delegateDatatype = objectProps.delegateDatatype ?? ''

    if (!objectDataRegistry.hasDynamicType(delegateDatatype) || CLASSIFICATION_STORE_WRAPPER_TYPES.includes(delegateDatatype)) {
      return {
        mode: 'default',
        type: 'string'
      }
    }

    return objectDataRegistry.getDynamicType(delegateDatatype).getGridCellDefinition({
      ...props,
      objectProps: delegateDefinitionOf(objectProps) as AbstractObjectDataDefinition
    })
  }

  getDefaultGridColumnWidth (props?: MultiValueObjectDataDefinition): number | undefined {
    if (CLASSIFICATION_STORE_WRAPPER_TYPES.includes(props?.delegateDatatype ?? '')) {
      return undefined
    }

    return getDefaultGridColumnWidthFromDynamicObjectType(
      props?.delegateDatatype ?? undefined,
      props
    )
  }
}
