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
import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract, type EditMode, type GetGridCellDefinitionProps } from '../dynamic-type-object-data-abstract'
import {
  Consent,
  type ConsentValue
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/consent/consent'
import { Consent as ConsentPreview } from '../../grid-cell-preview/consent/consent'

export type ConsentObjectDataDefinition = AbstractObjectDataDefinition & {
  minimumLength: number | null
}

export class DynamicTypeObjectDataConsent extends DynamicTypeObjectDataAbstract {
  id: string = 'consent'
  gridCellEditMode: EditMode = 'edit-modal'

  getObjectDataComponent (props: ConsentObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <Consent
        className={ props.className }
        disabled={ props.noteditable === true }
        value={ props.value }
      />
    )
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: ConsentValue | null = props.cellProps.getValue()

    return <ConsentPreview consent={ value } />
  }
}
