/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  type AbstractObjectDataDefinition,
  DynamicTypeObjectDataAbstract
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import { MultiValueEditor, type MultiValueEditorProps } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/multi-value/multi-value-editor'
import { EditFormProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'
import { SaveProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/save-provider'
import {
  SuppressEmptyFieldLabelProvider
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/suppress-empty-field-label-provider'
import React from 'react'

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
            {this.getObjectDataComponent({ ...props, title: '', tooltip: '' })}
          </SuppressEmptyFieldLabelProvider>
        </EditFormProvider>
      </SaveProvider>
    )
  }
}
