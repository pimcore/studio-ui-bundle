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
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract,
  type EditMode,
  type GetGridCellDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import { Link, type LinkValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/link'
import _ from 'lodash'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { LinkPreview } from '../components/link/components/link-preview/link-preview'
import { GridCellPreviewWrapper } from '../../grid-cell-preview/grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'

export type LinkObjectDataDefinition = AbstractObjectDataDefinition & {
  allowedTypes?: string[] | null
  allowedTargets?: string[] | null
  disabledFields?: string[] | null
}

export class DynamicTypeObjectDataLink extends DynamicTypeObjectDataAbstract {
  id: string = 'link'
  inheritedMaskOverlay: InheritanceOverlayType = 'manual'
  gridCellEditMode: EditMode = 'edit-modal'

  getObjectDataComponent (props: LinkObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <Link
        { ...props }
        allowedTargets={ _.compact(props.allowedTargets ?? []) }
        allowedTypes={ _.compact(props.allowedTypes ?? []) }
        className={ props.className }
        disabled={ props.noteditable === true }
        disabledFields={ _.compact(props.disabledFields ?? []) }
        inherited={ props.inherited }
      />
    )
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: LinkValue | null = props.cellProps.getValue()

    return (
      <GridCellPreviewWrapper>
        <LinkPreview value={ value } />
      </GridCellPreviewWrapper>
    )
  }
}
